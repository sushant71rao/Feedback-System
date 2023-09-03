const express = require("express");

const {
  createSession,
  getSessions,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/addsession")
  .put(isAuthenticated, authorisedRoles("Admin"), createSession);
router.route("/getsessions").get(isAuthenticated, getSessions);
router.route("/updatesession").post(updateSession);
router.route("/deletesession").delete(deleteSession);
module.exports = router;
