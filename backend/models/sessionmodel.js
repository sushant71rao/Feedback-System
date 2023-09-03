const mongoose = require("mongoose");

let sessionSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

let sessionModel = mongoose.model("Session", sessionSchema);

module.exports = sessionModel;
