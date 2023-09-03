const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  T_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TEACHER",
    required: [true, "The ID field is required."],
  },
  Class: { type: String, required: true },
  Session_id: {
    type: "String",
    required: [true, "please enter the session of the votes"],
  },
  q0: {
    type: Number,
    required: [true, "The q0 field is required."],
  },
  q1: {
    type: Number,
    required: [true, "The q1 field is required."],
  },
  q2: {
    type: Number,
    required: [true, "The q2 field is required."],
  },
  q3: {
    type: Number,
    required: [true, "The q3 field is required."],
  },
  q4: {
    type: Number,
    required: [true, "The q4 field is required."],
  },
  q5: {
    type: Number,
    required: [true, "The q5 field is required."],
  },
  q6: {
    type: Number,
    required: [true, "The q6 field is required."],
  },
  q7: {
    type: Number,
    required: [true, "The q7 field is required."],
  },
  count: {
    type: Number,
    default: 1,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
