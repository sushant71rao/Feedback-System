const express = require("express");
const {
  AddStudent,
  getStudents,
  LoginStudent,
  logoutStudent,
  UpdateStudent,
  DeleteStudent,
} = require("../controllers/StudentController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");

let router = express.Router();

router
  .route("/addstudent")
  .put(isAuthenticated, authorisedRoles(["Admin", "Teacher"]), AddStudent);
router
  .route("/getstudents")
  .get(isAuthenticated, authorisedRoles("Admin"), getStudents);

router.route("/loginstudent").put(LoginStudent);
router
  .route("/updatestudent")
  .post(isAuthenticated, authorisedRoles(["Student", "Admin"]), UpdateStudent);
module.exports = router;
router
  .route("/deletestudent")
  .delete(isAuthenticated, authorisedRoles("Admin"), DeleteStudent);
