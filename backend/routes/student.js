const express = require("express");
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getMe,
  // getVendorsInRadius,
  studentPhotoUpload,
} = require("../controllers/student");

const Student = require("../models/Student");

// Include other resource routers
// const regRouter = require("./registerlist");
// const reviewRouter = require("./reviews");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
// router.use("/reg", regRouter);
// router.use("/:publicId/reviews", reviewRouter);

// router.route("/radius/:zipcode/:distance").get(getVendorsInRadius);

router
  .route("/photo")
  .post(protect, authorize("student", "admin"), studentPhotoUpload);

router
  .route("/")
  .get(advancedResults(Student), getStudents)
  .post(protect, authorize("student", "admin"), createStudent);

router
  .route("/:studentId")
  .get(getStudent)
  .put(protect, authorize("student", "admin"), updateStudent)
  .delete(protect, authorize("student", "admin"), deleteStudent);

router
.get("/:id/me",protect,getMe)

module.exports = router;
