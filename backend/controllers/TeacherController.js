const catchAsyncError = require("../middlewares/catchAsyncError");
const Teacher = require("../models/teacherModel");
const ErrorHandler = require("../utils/ErrorHandler");
const sendEmail = require("../utils/sendEmail");

const ApiFeatures = require("../utils/apifeatures");
const { updateuser, deleteuser } = require("../utils/commonControls");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const { Classes } = require("../models/classModels");
const { default: mongoose } = require("mongoose");
const Vote = require("../models/votesModel");

exports.AddTeacher = catchAsyncError(async (req, res, next) => {
  const teacher = await Teacher.create({
    ...req.body,
    PASSWORD: process.env.TEACHER_PASS,
  });

  if (req.body.Classes != undefined) {
    var updateClass = await Classes.updateMany(
      { _id: { $in: req.body.Classes } },
      { $push: { TEACHERS: teacher._id } }
    );
  }
  res.status(200).json({
    success: true,
    teacher,
    updateClass,
  });
});
exports.getAllTeachers = catchAsyncError(async (req, res, next) => {
  let teachers = [];
  if (req.user.Role == "Student") {
    let classarr = await Classes.findOne(
      { CLASS: req.user.class },
      { _id: 0, TEACHERS: 1 }
    );
    classarr = classarr.TEACHERS.map((e) => {
      return new mongoose.Types.ObjectId(e);
    });

    teachers = await Teacher.find(
      {
        _id: { $in: classarr },
      },
      { NAME: 1, DEPARTMENT: 1 }
    );
  } else {
    let apifeatures = new ApiFeatures(Teacher, req).search().filter();
    teachers = await apifeatures.query;
  }
  res.status(200).json({
    success: true,
    teachers,
  });
});
exports.DeptTeachers = catchAsyncError(async (req, res, next) => {
  let apifeature = new ApiFeatures(
    Teacher.find({ DEPARTMENT: req.params.DEPARTMENT }),
    req
  );
  let teacher = await apifeature.query;
  if (!teacher) {
    return next(new ErrorHandler("TEACHER NOT FOUND", 404));
  }
  res.status(200).json({
    success: true,
    teacher,
  });
});

exports.LoginTeacher = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter valid email and password", 400));
  }
  const teacher = await Teacher.findOne({ EMAIL: email });
  if (!teacher) {
    return next(new ErrorHandler("Please enter valid email and password", 400));
  }
  // check the password is correct or not
  const isValidPassword = await teacher.comparePassword(password);

  if (!isValidPassword) {
    return next(
      new ErrorHandler("Please enter correct email and password", 400)
    );
  }
  sendToken(teacher, 200, res, req);
});
exports.ChangePassword = catchAsyncError(async (req, res, next) => {
  let teacher = await Teacher.findById(req.user._id);
  let { oldPassword, currentPassword } = req.body;
  let isValid = await teacher.comparePassword(oldPassword);
  if (!isValid) {
    return next(
      new ErrorHandler("Incorrect Old Password...Please try Again", 401)
    );
  }

  let encryptPass = await bcrypt.hash(currentPassword, 10);
  await Teacher.updateOne({ _id: req.user._id }, { PASSWORD: encryptPass });
  res.status(201).json({
    success: true,
    message: "password changed successfully",
  });
});
exports.UpdateTeacher = updateuser(Teacher);
exports.DeleteTeacher = deleteuser(Teacher);

exports.ForgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await Teacher.findOne({ EMAIL: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  //get resetpasstoken
  let token = await user.getResetPassToken();
  user.save({ validateBeforeSave: false });

  const reseturl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${token}`;
  const message = `Your reset Token is: \n\n ${reseturl}\n\nIgnore if you not Requested`;

  try {
    await sendEmail({
      email: user.EMAIL,
      subject: "Feedback System Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      status: `Email sent to ${user.EMAIL}`,
    });
  } catch (err) {
    user.resetPassToken = undefined;
    user.resetPassExpire = undefined;
    user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message, 500));
  }
});
