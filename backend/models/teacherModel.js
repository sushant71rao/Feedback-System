const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
let Teacher = new mongoose.Schema({
  NAME: {
    type: String,
    require: [true, "PLEASE ENTER NAME"],
  },
  DEPARTMENT: {
    type: String,
    require: [true, "PLEASE ENTER DEPARTMENT"],
  },
  QUALIFICATION: {
    type: Array,
  },
  EMAIL: {
    type: String,
    unique: true,
    require: [true, "PLEASE ENTER EMAIL"],
    validate: [validator.isEmail, "Please Enter Valid Email"],
  },
  PASSWORD: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  Role: {
    type: String,
    default: "Teacher",
  },
  resetPassToken: String,
  resetPassExpire: Date,
});

Teacher.pre("save", async function (next) {
  if (!this.isModified("PASSWORD")) {
    next();
  }
  this.PASSWORD = await bcrypt.hash(this.PASSWORD, 10);
});

Teacher.methods.getResetPassToken = function () {
  const Token = crypto.randomBytes(20).toString("hex");
  const tokenCrypto = crypto.createHash("sha256").update(Token).digest("hex");

  this.resetPassToken = tokenCrypto;

  //validity for 15 minutes
  this.resetPassExpire = Date.now() + 15 * 60 * 1000;
  return Token;
};
Teacher.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

Teacher.methods.comparePassword = async function (EnteredPassword) {
  return bcrypt.compare(EnteredPassword, this.PASSWORD);
};

module.exports = mongoose.model("TEACHER", Teacher);
