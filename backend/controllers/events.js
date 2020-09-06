const path = require("path");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Events = require("../models/Events");
const College = require("../models/College");
const Category = require("../models/Category");

// @desc      Get events
// @route     GET /api/v1/events
// @route     GET /api/v1/colleges/:collegesId/events
// @access    Public
exports.getEvents = asyncHandler(async (req, res, next) => {
  if (req.params.collegeId) {
    const events = await Events.find({ user: req.params.collegeId });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single event
// @route     GET api/v1/colleges/:collegesId/events/:eventId
// @access    Public
exports.getEvent = asyncHandler(async (req, res, next) => {
  const event = await Events.findById(req.params.eventId)
    .populate({
      path: "category",
    })
    .populate({ path: "college" });

  if (!event) {
    return next(
      new ErrorResponse(`No events with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc      Add event
// @route     POST api/v1/colleges/:collegesId/events
// @access    Private
exports.addEvent = asyncHandler(async (req, res, next) => {
  // req.body.college = req.params.collegeId;
  req.body.user = req.user.id;

  const college = await College.findOne({ user: req.user.id });

  if (!college) {
    return next(
      new ErrorResponse(`No college with the id of ${req.params.collegeId}`),
      404
    );
  }

  // Make sure user is event owner
  if (college.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a events by ${college._id}`,
        401
      )
    );
  }

  const category = await Category.findById(req.body.category);
  req.body.college = college.id;
  req.body.catname = category.catname;
  const event = await Events.create(req.body);

  res.status(200).json({
    success: true,
    data: event,
  });
});


// @desc      Update event
// @route     PUT /api/v1/colleges/:collegesId/events/:eventId
// @access    Private
exports.updateEvent = asyncHandler(async (req, res, next) => {
  let event = await await Events.findById(req.params.eventId);

  if (!event) {
    return next(
      new ErrorResponse(`No Event with the id of ${req.params.eventId}`),
      404
    );
  }

  // Make sure user is event owner
  if (event.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update event ${event._id}`,
        401
      )
    );
  }

  event = await Events.findByIdAndUpdate(req.params.eventId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc      Delete event
// @route     DELETE /api/v1/colleges/:collegesId/events/:eventId
// @access    Private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Events.findById(req.params.eventId);

  if (!event) {
    return next(
      new ErrorResponse(`No Event with the id of ${req.params.eventId}`),
      404
    );
  }

  // Make sure user is event owner
  if (event.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete event ${event._id}`,
        401
      )
    );
  }

  await event.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
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
