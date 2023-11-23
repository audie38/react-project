const router = require("express").Router();
const protect = require("../middleware/authHandler");
const { createNewEvent, getAllEventsList, getEventById, updateEvent, deleteEvent } = require("../controller/eventController");

router.route("/").get(getAllEventsList).post(protect, createNewEvent);
router.route("/:id").get(getEventById).put(protect, updateEvent).delete(protect, deleteEvent);

module.exports = router;
