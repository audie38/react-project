const asyncHandler = require("express-async-handler");
const Event = require("../model/Event");
const { Op } = require("sequelize");
const { RESP_CODE_OK, RESP_STATUS_OK } = require("../config/const");
const path = require("path");
const fs = require("fs");

// @desc    Create New Event
// @route   POST /api/v2/event
// @access  Private
const createNewEvent = asyncHandler(async (req, res) => {
  const { title, description, eventDate, eventTime, eventLocation, eventImage } = req.body;
  if (!title || !eventDate || !eventTime || !eventLocation) {
    return res.status(400).json({ message: "Incomplete Data" });
  }
  const newEvent = await Event.create({
    title,
    description,
    eventDate,
    eventTime,
    eventLocation,
    eventImage,
    userId: req?.user?.userId,
  });

  if (newEvent) {
    return res.status(201).json({
      code: RESP_CODE_OK,
      status: RESP_STATUS_OK,
      data: {
        eventId: newEvent.eventId,
        title,
        description,
        eventDate,
        eventTime,
        eventLocation,
        eventImage,
        userId: newEvent.userId,
      },
    });
  }

  return res.status(500).json({ message: "Internal Server Error" });
});

// @desc    Get List of All Event
// @route   GET /api/v2/event
// @access  Public
const getAllEventsList = asyncHandler(async (req, res) => {
  const query = req.query;
  const params = Object.values(query);
  const queryParameter = params[0];
  let responses = await Event.findAll();
  if (params.length > 0) {
    responses = await Event.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${queryParameter}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${queryParameter}%`,
            },
          },
          {
            eventLocation: {
              [Op.like]: `%${queryParameter}%`,
            },
          },
        ],
      },
    });
  }
  return res.status(200).json({
    code: RESP_CODE_OK,
    status: RESP_STATUS_OK,
    data: responses,
  });
});

// @desc    Get Event By Event Id
// @route   GET /api/v2/event/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  if (!eventId) {
    return res.status(400).json({ message: "Invalid Event Id" });
  }
  const response = await Event.findByPk(eventId);
  if (!response) {
    return res.status(404).json({ message: "Event Not Found" });
  }
  return res.status(200).json({
    code: RESP_CODE_OK,
    status: RESP_STATUS_OK,
    data: response,
  });
});

// @desc    Update Event
// @route   PUT /api/v2/event/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  if (!eventId) {
    return res.status(400).json({ message: "Invalid Event Id" });
  }
  const existingEvent = await Event.findByPk(eventId);
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

    if (eventImage != undefined || eventImage != null) {
      if (existingEvent?.eventImage !== null && existingEvent?.eventImage !== "") {
        const rawLocation = existingEvent?.eventImage.replace(`${req.get("host")}/api/v2/asset/img/`, "");

        const deletedImgPath = path.join(__dirname, "..", "public/uploads/", rawLocation);
        if (fs.existsSync(deletedImgPath)) {
          await fs.promises.unlink(deletedImgPath, (err) => {
            if (err) {
              return res.status(500).json({ message: err });
            }
          });
        }
      }
      existingEvent.eventImage = eventImage;
    }

    const updatedEvent = await existingEvent.save();
    if (updatedEvent) {
      return res.status(200).json({
        code: RESP_CODE_OK,
        status: RESP_STATUS_OK,
        data: {
          eventId: updatedEvent.eventId,
          title: updatedEvent.title,
          description: updatedEvent.description,
          eventDate: updatedEvent.eventDate,
          eventTime: updatedEvent.eventTime,
          eventLocation: updatedEvent.eventLocation,
          eventImage: updatedEvent.eventImage,
          userId: updatedEvent.userId,
        },
      });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(401).json({ message: "UnAuthorized" });
});

// @desc    Delete Event
// @route   DELETE /api/v2/event/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  if (!eventId) {
    return res.status(400).json({ message: "Invalid Event Id" });
  }
  const existingEvent = await Event.findByPk(eventId);
  if (!existingEvent) {
    return res.status(404).json({ message: "Event Not Found" });
  }
  if (parseInt(existingEvent.userId) == parseInt(req?.user?.userId)) {
    let isImageDeleted = true;
    if (existingEvent?.eventImage !== null && existingEvent?.eventImage !== "") {
      const rawLocation = existingEvent?.eventImage.replace(`${req.get("host")}/api/v2/asset/img/`, "");
      const deletedImgPath = path.join(__dirname, "..", "public/uploads/", rawLocation);
      if (fs.existsSync(deletedImgPath)) {
        await fs.promises.unlink(deletedImgPath, (err) => {
          if (err) {
            isImageDeleted = false;
            return res.status(500).json({ message: err });
          }
        });
      }
    }
    if (isImageDeleted) {
      const eventDeleted = await existingEvent.destroy();
      if (eventDeleted) {
        return res.status(200).json({
          code: RESP_CODE_OK,
          status: RESP_STATUS_OK,
        });
      }
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(401).json({ message: "UnAuthorized" });
});

module.exports = {
  createNewEvent,
  getAllEventsList,
  getEventById,
  updateEvent,
  deleteEvent,
};
