const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
// const geocoder = require("../utils/geocoder");
const Student = require("../models/Student");

// profile

exports.getMe = asyncHandler(async (req, res, next) => {
  if(req.params.id){

  
  const student = await Student.find({user:req.params.id});
    return res.status(200).json({
      success:true,
      data:student,

    });
  }
  else{
  res.status(200).json(res.advancedResults);
  }
});

// @desc      Get all student
// @route     GET /api/v1/student
// @access    Public
exports.getStudents = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single student
// @route     GET /api/v1/student/:id
// @access    Public
exports.getStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.studentId);

  if (!student) {
    return next(
      new ErrorResponse(
        `Student not found with id of ${req.params.studentId}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: student });
});

// @desc      Create new student
// @route     POST /api/v1/student
// @access    Private
exports.createStudent = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published student
  const publishStudent = await Student.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one student
  if (publishStudent && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already  a Student`,
        400
      )
    );
  }

  const student = await Student.create(req.body);

  res.status(201).json({
    success: true,
    data: student,
  });
});

// @desc      Update student
// @route     PUT /api/v1/student/:id
// @access    Private
exports.updateStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.studentId);

  if (!student) {
    return next(
      new ErrorResponse(
        `Student not found with id of ${req.params.studentId}`,
        404
      )
    );
  }

  // Make sure user is student owner
  if (student.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this student`,
        401
      )
    );
  }

  students = await Student.findByIdAndUpdate(req.params.studentId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: students });
});

// @desc      Delete student
// @route     DELETE /api/v1/student/:studentId
// @access    Private
exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.studentId);

  if (!student) {
    return next(
      new ErrorResponse(
        `Student not found with id of ${req.params.studentId}`,
        404
      )
    );
  }

  // Make sure user is student owner
  if (student.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.studentId} is not authorized to delete this student`,
        401
      )
    );
  }

  student.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Get student within a radius
// @route     GET DELETE /api/v1/student/radius/:zipcode/:distance
// @access    Private
exports.getStudentInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const student = await Student.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: student.length,
    data: student,
  });
});

// @desc      Upload photo for student
// @route     PUT /api/v1/student/:studentId/photo
// @access    Private
exports.studentPhotoUpload = asyncHandler(async (req, res, next) => {
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