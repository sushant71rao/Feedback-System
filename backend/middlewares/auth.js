const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const teacherModel = require("../models/teacherModel");
const { Student } = require("../models/classModels");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login First"));
  }
  const DecodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  let teacher = await teacherModel.findById(DecodedData.id);
  if (!teacher) {
    let student = await Student.findById(DecodedData.id);
    if (!student) {
      return next(new ErrorHandler("no user found", 404));
    }
    req.user = student;
    next();
  } else {
    req.user = teacher;
    // console.log("hi");
    next();
  }
});

exports.authorisedRoles = (roles) => {
  return (req, res, next) => {
    if (!roles?.includes(req.user.Role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.Role} is unauthorised for this operation`,
          403
        )
      );
    }
    next();
  };
};
