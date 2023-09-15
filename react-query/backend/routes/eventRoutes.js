const express = require("express");
const router = express.Router();
const { createEvent, uploadEventImage, getAllEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/eventControllers");

router.route("/").get(getAllEvents).post(createEvent);
router.route("/:id").get(getEventById).put(updateEvent).delete(deleteEvent);
router.route("/upload").post(uploadEventImage);

module.exports = router;
