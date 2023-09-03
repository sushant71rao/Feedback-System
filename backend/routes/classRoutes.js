const express = require("express");
const {
  AddClass,
  ShowClass,
  updateClass,
  deleteClass,
} = require("../controllers/classController");
const { isAuthenticated, authorisedRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/addclass").post(AddClass);
router.route("/showclass").get(isAuthenticated, ShowClass);
router
  .route("/updateclass")
  .post(isAuthenticated, authorisedRoles("Admin"), updateClass);

router
  .route("/deleteclass")
  .delete(isAuthenticated, authorisedRoles("Admin"), deleteClass);

module.exports = router;
