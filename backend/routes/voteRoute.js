const express = require("express");
const {
  giveVotes,
  getVotesComputed,
  getClassVotes,
  getDepartMentVotes,
  CriteriaVotes,
  getRequiredVotes,
} = require("../controllers/voteController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");

let router = express.Router();

router
  .route("/vote")
  .post(isAuthenticated, authorisedRoles("Student"), giveVotes);
router
  .route("/getcomputedvotes/:id")
  .get(
    isAuthenticated,
    authorisedRoles(["Admin", "Teacher"]),
    getVotesComputed
  );
router
  .route("/getclassvotes")
  .post(isAuthenticated, authorisedRoles(["Admin", "Teacher"]), getClassVotes);

router
  .route("/getrequiredvotes/:id")
  .get(isAuthenticated, authorisedRoles("Admin"), getRequiredVotes);
router
  .route("/getdepartmentvotes/:dept")
  .get(
    isAuthenticated,
    authorisedRoles(["Teacher", "Admin"]),
    getDepartMentVotes
  );
module.exports = router;

router.route("/votesbycriteria").get(isAuthenticated, CriteriaVotes);
