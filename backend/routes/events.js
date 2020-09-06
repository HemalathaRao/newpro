const express = require("express");

const {
  getEvents,
  getEvent,
  getCategoryEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  eventPhotoUpload,
} = require("../controllers/events");
const reviewRouter = require("./reviews");

const Event = require("../models/Events");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");
router.use("/:eventId/reviews", reviewRouter);

router
  .route("/photo")
  .post(protect, authorize("college", "admin"), eventPhotoUpload);

router
  .route("/")
  .get(
    advancedResults(Event, {
      path: "category",
      select: "catname",
    }),
    getEvents
  )
  .post(protect, authorize("college", "admin"), addEvent);

router
  .route("/:eventId")
  .get(getEvent)
  .put(protect, authorize("college", "admin"), updateEvent)
  .delete(protect, authorize("college", "admin"), deleteEvent);

module.exports = router;
