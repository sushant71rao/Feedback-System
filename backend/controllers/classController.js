const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const { Classes } = require("../models/classModels");
const { updateuser, deleteuser } = require("../utils/commonControls");

exports.AddClass = catchAsyncError(async (req, res, next) => {
  const newClass = await Classes.create(req.body);
  res.status(200).json({
    success: true,
    newClass,
  });
});

exports.ShowClass = catchAsyncError(async (req, res, next) => {
  let apifeature = new ApiFeatures(Classes.find({}, { __v: 0 }), req)
    .search()
    .filter();
  const classes = await apifeature.query;
  res.json({
    classes,
  });
});

exports.updateClass = updateuser(Classes);

exports.deleteClass = deleteuser(Classes);
