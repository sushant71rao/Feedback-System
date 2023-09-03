const express = require("express");
const {
  addQuestions,
  getQuestions,
  updateQuestions,
} = require("../controllers/QuestionController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");

let router = express.Router();

router
  .route("/addquestions")
  .post(isAuthenticated, authorisedRoles("Admin"), addQuestions);

router.route("/getquestions").get(isAuthenticated, getQuestions);
router
  .route("/updatequestions/:id")
  .put(isAuthenticated, authorisedRoles("Admin"), updateQuestions);
module.exports = router;
