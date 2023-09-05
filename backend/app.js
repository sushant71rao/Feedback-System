const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const teachers = require("./routes/teacherRoutes");
const Votes = require("./routes/voteRoute");
const classes = require("./routes/classRoutes");
const students = require("./routes/studentRoute");
const ErrorMiddleWare = require("./middlewares/error");
const sessionRoute = require("./routes/sessionRoute");
const questionRoutes = require("./routes/questionRoutes");
var cors = require("cors");
const path = require("path");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200,
    Headers: true,
    exposedHeaders: "Set-Cookie",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", teachers);
app.use("/api", Votes);
app.use("/api", classes);
app.use("/api", students);
app.use("/api", sessionRoute);
app.use("/api", questionRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

app.use(ErrorMiddleWare);
module.exports = app;
