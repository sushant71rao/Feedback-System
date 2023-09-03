const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("./ErrorHandler");
const mongoose = require("mongoose");
const sendToken = require("./jwtToken");
exports.updateuser = (model) => {
  return catchAsyncError(async (req, res, next) => {
    let id = req.body._id;
    console.log(id);
    delete req.body._id;
    console.log(
      await model.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: req.body }
      )
    );
    const user = await model.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: req.body }
    );
    // console.log(user);
    res.status(200).json({
      success: true,
      user,
    });
  });
};

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});

exports.deleteuser = (model) => {
  return catchAsyncError(async (req, res) => {
    req.query._id
      ? (user = await model.deleteOne({
          _id: new mongoose.Types.ObjectId(req.query._id),
        }))
      : "";
    
    res.status(200).json({
      success: true,
      user,
    });
  });
};

exports.LoginUser = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorHandler("Please enter valid email and password", 400)
      );
    }
    const user = await model.findOne({ EMAIL: email });
    if (!user) {
      return next(
        new ErrorHandler("Please enter valid email and password", 400)
      );
    }
    // check the password is correct or not
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return next(
        new ErrorHandler("Please enter correct email and password", 400)
      );
    }
    sendToken(model, 200, res);
  });
};
