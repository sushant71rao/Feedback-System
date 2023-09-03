const catchAsyncError = require("../middlewares/catchAsyncError");
const Teacher = require("../models/teacherModel");
const { Student, Classes } = require("../models/classModels");
const Vote = require("../models/votesModel");
const ErrorHandler = require("../utils/ErrorHandler");
const sessionModel = require("../models/sessionmodel");
const ApiFeatures = require("../utils/apifeatures");
const { default: mongoose, Mongoose } = require("mongoose");
const teacherModel = require("../models/teacherModel");

exports.giveVotes = catchAsyncError(async (req, res, next) => {
  let { isActive } = await sessionModel.findOne(
    { Name: req.body.Session_id },
    { isActive: 1 }
  );
  if (!isActive) {
    return next(
      new ErrorHandler("The sesssion has Expired ...Please try another Session")
    );
  }
  req.body.T_Id = new mongoose.Types.ObjectId(req.body.T_Id);
  let teacher = await Teacher.findById(req.body.T_Id);
  if (!teacher) {
    return next(new ErrorHandler("Teacher not found"), 404);
  }
  if (req.user?.whomVoted.includes(teacher._id)) {
    return next(
      new ErrorHandler(
        "You have voted this teacher in this Session hence you cant vote again",
        208
      )
    );
  }

  let votes = await Vote.create({
    T_Id: req.body.T_Id,
    Session_id: req.body.Session_id,
    Class: req.user.class,
    q0: req.body.q0,
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3,
    q4: req.body.q4,
    q5: req.body.q5,
    q6: req.body.q6,
    q7: req.body.q7,
  });
  // .log("hi");
  let student = await Student.updateOne(
    { _id: req.user._id },
    { $push: { whomVoted: req.body.T_Id } }
  );

  res.status(200).json({
    success: true,
    votes,
    student,
  });
});

let voteComputer = async (tid, req) => {
  apifeatures = new ApiFeatures(Vote, req).criteria(tid);

  // console.log(req.params);

  let votes = await apifeatures.query;
  // console.log(req.query);
  if (votes.length == 0 || !votes) {
    return;
  }
  if (votes?.length > 1) {
    let sumVotes = [];
    votes.map((e, i) => {
      let temp = {};
      temp = {
        info: {
          T_Id: req.params.dept || typeof tid == typeof [] ? e._id : tid,
          Class:
            req.query.Class != undefined
              ? typeof req.query.Class != typeof ""
                ? req.query.Class[i]
                : req.query.Class
              : "",
          Session_id:
            req.params.id == "Session_id"
              ? e._id
              : typeof req.query.Session_id == typeof ""
              ? req.query.Session_id
              : req.query.Session_id == undefined
              ? ""
              : req.query.Session_id[i],
          count: e.count,
          Avg: e.Avg,
          criteria: req.params,
        },
        voteValue: {
          q0: e.q0,
          q1: e.q1,
          q2: e.q2,
          q3: e.q3,
          q4: e.q4,
          q5: e.q5,
          q6: e.q6,
          q7: e.q7,
        },
      };
      sumVotes.push(temp);
    });
    return sumVotes;
  }
  votes = votes[0];
  // .log(typeof votes);

  let sumVotes = {
    info: {
      T_Id: tid?.length == undefined && req.params.dept ? votes._id : tid,
      Class: req.query.Class != undefined ? req.query.Class : "",
      Session_id:
        req.query.criteria == "Session_id"
          ? new mongoose.Types.ObjectId(votes._id)
          : req.query.Session_id
          ? req.query.Session_id
          : "",
      count: votes.count,
      Avg: votes.Avg,
      criteria: req.query,
    },
    voteValue: {
      q0: votes.q0,
      q1: votes.q1,
      q2: votes.q2,
      q3: votes.q3,
      q4: votes.q4,
      q5: votes.q5,
      q6: votes.q6,
      q7: votes.q7,
    },
  };
  return sumVotes;
};

exports.voteComputer;

exports.getVotesComputed = catchAsyncError(async (req, res, next) => {
  tid = req.user._id;
  // .log(req.query);
  let sumVotes = await voteComputer(tid, req);
  // console.log(sumVotes);
  if (sumVotes == undefined) {
    return next(new ErrorHandler("no votes found", 404));
  }
  res.status(200).json({
    success: "true",
    votes: sumVotes,
  });
});

exports.getRequiredVotes = catchAsyncError(async (req, res, next) => {
  tid = req.params.id;
  // .log(req.query);
  let sumVotes = await voteComputer(tid, req);
  // console.log(sumVotes);
  if (sumVotes == undefined) {
    return next(new ErrorHandler("no votes found", 404));
  }
  res.status(200).json({
    success: "true",
    votes: sumVotes,
  });
});

exports.getClassVotes = catchAsyncError(async (req, res, next) => {
  var ClassVotes = [];
  const teacherArray = req.body.TEACHERS;
  let votes = await voteComputer(teacherArray, req);

  if (votes == undefined && votes.length == 0) {
    return next(new ErrorHandler("No votes Found", 404));
  }

  res.status(200).json({
    success: true,
    votes,
  });
});

exports.getDepartMentVotes = catchAsyncError(async (req, res, next) => {
  let DeptVotes = await voteComputer(null, req);
  // console.log(DeptVotes);
  // console.log("KKK");
  res.status(200).json({
    DepartmentVotes: DeptVotes.length == undefined ? [DeptVotes] : DeptVotes,
  });
});

exports.CriteriaVotes = catchAsyncError(async (req, res, next) => {
  let param = "";
  if (req.user.Role == "Teacher") {
    param = req.user._id;
  } else {
    param = req.body._id;
  }
  let apifeatures = new ApiFeatures(Vote, req.query).criteria(param);
  let FilteredVotes = await apifeatures.query;

  if (!FilteredVotes) {
    return next(new ErrorHandler("Problem fetching votes", 401));
  }
  res.status(200).json({
    success: true,
    FilteredVotes,
  });
});
