const express = require("express");
const {
  getColleges,
  getCollege,
  createCollege,
  updateCollege,
  deleteCollege,
  getMe,
  // getVendorsInRadius,
  collegePhotoUpload,
} = require("../controllers/colleges");

const College = require("../models/College");

// Include other resource routers
const EventsRouter = require("./events");
const reviewRouter = require("./reviews");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:collegeId/events", EventsRouter);
router.use("/:collegeId/reviews", reviewRouter);

// router.route("/radius/:zipcode/:distance").get(getVendorsInRadius);

router
  .route("/photo")
  .post(protect, authorize("college", "admin"), collegePhotoUpload);

router
  .route("/")
  .get(advancedResults(College, "Events"), getColleges)
  .post(protect, authorize("college", "admin"), createCollege);

router
  .route("/:collegeId")
  .get(getCollege)
  .put(protect, authorize("college", "admin"), updateCollege)
  .delete(protect, authorize("college", "admin"), deleteCollege);

  router
.get("/:id/me",protect,getMe)

module.exports = router;
