const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  postStudent,
} = require("../controller/studentController");
const validateToken = require("../middleware/validateTokenHandler");

//router.use(validateToken);
router.route("/").get(getAllStudents).post(postStudent);
module.exports = router;
