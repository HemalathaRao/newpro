const express = require("express");

const router = express.Router();

const { check, validationResult } = require("express-validator");
const {
  getCategories,
  addCategory,
  deleteCategory,
  getCategoryEvent,
  updateCategory,
  eventPhotoUpload,
} = require("../controllers/category");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const Category = require("../models/Category");

router
  .route("/")
  .get(
    advancedResults(Category, {
      path: "events",
      select: "name",
    }),
    getCategories
  )
  .post(protect, authorize("admin"), addCategory);

router
  .route("/:categoryId")
  .get(getCategoryEvent)
  .put(protect, authorize("admin"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

  router
  .route("/photo")
  .post(protect, authorize("college", "admin"), eventPhotoUpload);

router.route("/:categoryId/events").get(getCategoryEvent);

module.exports = router;
