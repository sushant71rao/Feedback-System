const catchAsyncError = require("../middlewares/catchAsyncError");
const { Student } = require("../models/classModels");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/apifeatures");
const { updateuser, deleteuser } = require("../utils/commonControls");
const sendToken = require("../utils/jwtToken");

exports.AddStudent = catchAsyncError(async (req, res, next) => {
  const student = await Student.create({
    ...req.body,
    password: process.env.STUDENT_PASS,
  });
  res.status(200).json({
    success: true,
    student,
  });
});

exports.getStudents = catchAsyncError(async (req, res, next) => {
  const features = new ApiFeatures(Student.find(), req.query).search().filter();
  const student = await features.query;
  if (!student) {
    res.status(404).json({
      success: false,
      message: "No students found",
    });
  }
  // console.log(data.class.CLASS);
  res.status(200).json({
    success: true,
    student,
  });
});

exports.LoginStudent = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    return next(new ErrorHandler("Please enter valid email and password", 400));
  }
  const student = await Student.findOne({ email: email });
  if (!student) {
    return next(new ErrorHandler("Please enter valid email and password", 401));
  }
  // check the password is correct or not
  const isValidPassword = await student.comparePassword(password);

  if (!isValidPassword) {
    return next(
      new ErrorHandler("Please enter correct email and password", 400)
    );
  }
  sendToken(student, 200, res);
});

exports.UpdateStudent = updateuser(Student);
exports.DeleteStudent = deleteuser(Student);
