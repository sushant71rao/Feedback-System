const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
const teachers = require("./routes/teacherRoutes");
const Votes = require("./routes/voteRoute");
const classes = require("./routes/classRoutes");
const students = require("./routes/studentRoute");
const ErrorMiddleWare = require("./middlewares/error");
const sessionRoute = require("./routes/sessionRoute");
const questionRoutes = require("./routes/questionRoutes");
var cors = require("cors");
// const path = require("path");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", teachers);
app.use("/api", Votes);
app.use("/api", classes);
app.use("/api", students);
app.use("/api", sessionRoute);
app.use("/api", questionRoutes);

// app.use(express.static(path.join(__dirname, "../frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
// });

app.use(ErrorMiddleWare);
module.exports = app;
