const express = require("express");
const router = express.Router();

const {
  getAllStaff,
  getAllStaffTypes,
  postStaffType,
  postStaff,
} = require("../controller/staffController");
const validateToken = require("../middleware/validateTokenHandler");

//router.use(validateToken);
router.route("/").get(getAllStaff).post(postStaff);
router.route("/type").get(getAllStaffTypes).post(postStaffType);

module.exports = router;
