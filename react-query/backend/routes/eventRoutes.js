const express = require("express");
const router = express.Router();
const protect = require("../middleware/authHandler");
const { createEvent, uploadEventImage, getAllEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/eventControllers");

router.route("/").get(getAllEvents).post(protect, createEvent);
router.route("/:id").get(getEventById).put(protect, updateEvent).delete(protect, deleteEvent);
router.route("/upload").post(protect, uploadEventImage);

module.exports = router;
