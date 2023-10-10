const asyncHandler = require("express-async-handler");
const uploadFile = require("../middleware/upload");
const Events = require("../models/event");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
const { logEvents } = require("../middleware/logger");

// @desc    Create New Event
// @route   POST /api/event
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, eventDate, eventTime, eventLocation, eventImage } = req.body;
  if (!title || !eventDate || !eventTime || !eventLocation) {
    return res.status(400).json({ message: "Fields Cannot be empty" });
  }
  const events = await Events.create({
    title,
    description,
    eventDate,
    eventTime,
    eventLocation,
    eventImage,
    userId: req?.user?.userId,
  });

  res.status(201).json({ data: events });
});

// @desc    Upload Event Image
// @route   POST /api/event/upload
// @access  Private
const uploadEventImage = asyncHandler(async (req, res) => {
  try {
    await uploadFile(req, res);
    res.status(200).json({ uploadedFile: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// @desc    Get List All Events
// @route   GET /api/event
// @access Public
const getAllEvents = asyncHandler(async (req, res) => {
  const query = req.query;
  const params = Object.values(query);
  let responses = await Events.findAll();
  if (params.length > 0) {
    responses = await Events.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${params[0]}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${params[0]}%`,
            },
          },
          {
            eventLocation: {
              [Op.iLike]: `%${params[0]}%`,
            },
          },
        ],
      },
    });
  }
  res.status(200).json({ data: responses });
});

// @desc    Get Event by Id
// @route   GET /api/event/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const eventsId = req.params.id;
  if (!eventsId) {
    return res.status(400).json({ message: "Events Id Required" });
  }

  const response = await Events.findByPk(eventsId);
  if (!response) {
    return res.status(404).json({ message: "Event Not Found" });
  }

  return res.status(200).json({ data: response });
});

// @desc    Update Event
// @route   PUT /api/event/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const eventsId = req.params.id;
  if (!eventsId) {
    return res.status(400).json({ message: "Events Id Required" });
  }

  const existingEvent = await Events.findByPk(eventsId);
  if (!existingEvent) {
    return res.status(404).json({ message: "Event Not Found" });
  }

  if (parseInt(existingEvent.userId) == parseInt(req?.user?.userId)) {
    const { title, description, eventDate, eventTime, eventLocation, eventImage } = req.body;
    existingEvent.title = title || existingEvent.title;
    existingEvent.description = description || existingEvent.description;
    existingEvent.eventDate = eventDate || existingEvent.eventDate;
    existingEvent.eventTime = eventTime || existingEvent.eventTime;
    existingEvent.eventLocation = eventLocation || existingEvent.eventLocation;
    existingEvent.eventImage = eventImage || existingEvent.eventImage;

    await existingEvent.save();
    res.status(200).json({ message: "Event Updated" });
  }

  return res.status(401).json({ message: "UnAuthorized" });
});

// @desc    Delete Event
// @route   DELETE /api/event/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const eventsId = req.params.id;
  if (!eventsId) {
    return res.status(400).json({ message: "Events Id Required" });
  }

  const existingEvent = await Events.findByPk(eventsId);
  if (!existingEvent) {
    return res.status(404).json({ message: "Event Not Found" });
  }

  if (parseInt(existingEvent.userId) == parseInt(req?.user?.userId)) {
    const isImageDeleted = true;
    const deletedEventImagePath = path.join(__dirname, "..", "public/uploads/", existingEvent.eventImage);
    if (existingEvent?.eventImage !== "") {
      await fs.promises.unlink(deletedEventImagePath, (err) => {
        if (err) {
          isImageDeleted = false;
          logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log");
          return res.status(500).json({ message: err });
        }
      });
    }

    if (isImageDeleted) {
      await existingEvent.destroy();
    }

    res.status(200).json({ message: "Event Deleted" });
  }

  return res.status(401).json({ message: "UnAuthorized" });
});

module.exports = {
  createEvent,
  uploadEventImage,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
