const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const classSchema = new mongoose.Schema({
  CLASS: {
    type: String,
    required: [true, "Please enter Class"],
    unique: true,
  },
  DEPARTMENT: {
    type: String,
    required: [true, "Please enter Department"],
  },
  TEACHERS: {
    type: [],
  },
});

const studentSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  Role: {
    type: "string",
    default: "Student",
  },
  whomVoted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TEACHER",
    },
  ],
  resetPassToken: String,
  resetPassExpire: Date,
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // console.log("p");
  this.password = await bcrypt.hash(this.password, 10);
});

studentSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

studentSchema.methods.comparePassword = async function (EnteredPassword) {
  console.log("hi");
  return bcrypt.compare(EnteredPassword, this.password);
};

exports.Student = mongoose.model("Student", studentSchema);

exports.Classes = mongoose.model("Classe", classSchema);
