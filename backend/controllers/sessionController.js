const catchAsyncError = require("../middlewares/catchAsyncError");
const sessionModel = require("../models/sessionmodel");
const ApiFeatures = require("../utils/apifeatures");
const { Student } = require("../models/classModels");
const { updateuser, deleteuser } = require("../utils/commonControls");
const Vote = require("../models/votesModel");
const { default: mongoose } = require("mongoose");

exports.createSession = catchAsyncError(async (req, res, next) => {
  const updateAll = await sessionModel.updateMany(
    { isActive: true },
    { $set: { isActive: false } }
  );
  const studentsUpdate = await Student.updateMany(
    {},
    { $set: { whomVoted: [] } }
  );
  const session = await sessionModel.create(req.body);
  res.status(201).json({
    success: true,
    session,
    SessionUpdate: updateAll,
    studentUpdate: studentsUpdate,
  });
});

exports.getSessions = catchAsyncError(async (req, res, next) => {
  let apifeatures = new ApiFeatures(sessionModel, req).search().filter();
  const session = await apifeatures.query;
  // console.log("hi");
  res.status(201).json({
    success: true,
    session,
  });
});

exports.updateSession = updateuser(sessionModel);
exports.deleteSession = catchAsyncError(async (req, res) => {
  const votesDelete = await Vote?.deleteMany({ Session_id: req.query._id });
  req.query._id
    ? (user = await sessionModel.deleteOne({
        _id: new mongoose.Types.ObjectId(req.query._id),
      }))
    : "";
  res.status(200).json({
    success: true,
    user,
    Vote,
  });
});
