const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const College = require("../models/College");


exports.getMe = asyncHandler(async (req, res, next) => {
  if(req.params.id){

  
  const college = await College.find({user:req.params.id});
    return res.status(200).json({
      success:true,
      data:college,

    });
  }
  else{
  res.status(200).json(res.advancedResults);
  }
});


// @desc      Get all clleges
// @route     GET /api/v1/colleges
// @access    Public
exports.getColleges = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single college
// @route     GET /api/v1/colleges/:collegeId
// @access    Public
exports.getCollege = asyncHandler(async (req, res, next) => {
  const college = await College.findById(req.params.collegeId);

  if (!college) {
    return next(
      new ErrorResponse(
        `College not found with id of ${req.params.collegeId}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: college });
});

// @desc      Create new college
// @route     POST /api/v1/colleges
// @access    Private
exports.createCollege = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published college
  const publishedcollege = await College.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one college
  if (publishedcollege && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already  a college`,
        400
      )
    );
  }

  const college = await College.create(req.body);

  res.status(201).json({
    success: true,
    data: college,
  });
});

// @desc      Update college
// @route     PUT /api/v1/college/:collegeId
// @access    Private
exports.updateCollege = asyncHandler(async (req, res, next) => {
  let college = await College.findById(req.params.collegeId);

  if (!college) {
    return next(
      new ErrorResponse(
        `College not found with id of ${req.params.collegeId}`,
        404
      )
    );
  }

  // Make sure user is college owner
  if (college.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.collegeId} is not authorized to update this college`,
        401
      )
    );
  }

  college = await College.findByIdAndUpdate(req.params.collegeId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: college });
});

// @desc      Delete college
// @route     DELETE /api/v1/college/:collegeId
// @access    Private
exports.deleteCollege = asyncHandler(async (req, res, next) => {
  const college = await College.findById(req.params.collegeId);

  if (!college) {
    return next(
      new ErrorResponse(
        `College not found with id of ${req.params.collegeId}`,
        404
      )
    );
  }

  // Make sure user is college owner
  if (college.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.collegeId} is not authorized to delete this college`,
        401
      )
    );
  }

  college.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Upload photo for student
// @route     PUT /api/v1/student/:studentId/photo
// @access    Private
exports.collegePhotoUpload = asyncHandler(async (req, res, next) => {
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