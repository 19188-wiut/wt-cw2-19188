const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

// Route to GET all events
router.get("/", eventsController.listEvents);
router.get("/new", eventsController.showAddEventForm);
router.post("/", eventsController.addEvent);
router.get("/edit/:id", eventsController.showEditEventForm);
router.get("/delete/:id", eventsController.deleteEvent);
router.post("/update/:id", eventsController.updateEvent);

module.exports = router;
