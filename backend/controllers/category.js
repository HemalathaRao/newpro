const path = require("path");
const ErrorResponse = require("../utils/errorResponse");

const Category = require("../models/Category");
const Event = require("../models/Events");

const asyncHandler = require("../middleware/async");
// @desc      Get events
// @route     GET /api/v1/category/:categoryId/events/
// @access    Public
exports.getCategoryEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.find({
    category: req.params.categoryId,
  })
    .populate({
      path: "college",
      select: "name description",
    })
    .populate({
      path: "category",
    });

  if (!event) {
    return next(
      new ErrorResponse(`No event with the id of ${req.params.id}`),
      404
    );
  }
  res.status(200).json({
    success: true,
    count: event.length,
    data: event,
  });
});

// @desc      Get category

// @route     GET /api/category/
// @access    Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single category
// @route     GET /api/category/:categoryId
// @access    Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const event = await Event.find({ category: req.params.categoryId });

  if (!event) {
    return next(new ErrorResponse(`No Event in this category`), 404);
  }

  res.status(200).json({
    success: true,
    data: Event,
  });
});

// @desc      Add category
// @route     POST /api/category/
// @access    Private
exports.addCategory = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published category
  const categorypublished = await Category.findOne({
    user: req.user.id,
  });

  // if (req.body.catname === categorypublished.catname) {
  //   return next(new ErrorResponse(`Same Category `, 400));
  // }
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category,
  });
});

// @desc      Update category
// @route     PUT /api/v1/category/:categoryId
// @access    Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc      Delete Category
// @route     DELETE /api/category/:categoryId
// @access    Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.categoryId);
    if (!category) {
      return next(
        new ErrorResponse(`No Category with id ${req.params.categoryId}`, 400)
      );
    }
    await Category.findByIdAndRemove(req.params.categoryId);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @desc      Upload photo for event
// @route     PUT /api/v1/colleges/:collegesId/events/:eventId/photo
// @access    Private

exports.eventPhotoUpload = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.mv(
    `${__dirname}/../../frontend/public/uploads/${file.name}`,
    async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }

      const files = `/uploads/${file.name}`;

      res.status(200).json({
        success: true,
        data: files,
      });
    }
  );


//   res.status(200).json({
//     success: true,
//     data: file.name,
//   });
// });
});
