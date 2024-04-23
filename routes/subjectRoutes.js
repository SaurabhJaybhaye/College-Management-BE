const express = require("express");
const router = express.Router();
const {
  postSubject,
  getAllSubject,
} = require("../controller/subjectController");
const validateToken = require("../middleware/validateTokenHandler");

//router.use(validateToken);
router.route("/").get(getAllSubject).post(postSubject);
module.exports = router;
