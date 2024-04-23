const express = require("express");
const router = express.Router();
const {
  getAllDepartment,
  postDepartment,
} = require("../controller/departmentController");

const validateToken = require("../middleware/validateTokenHandler");

//router.use(validateToken);
router.route("/").get(getAllDepartment).post(postDepartment);
module.exports = router;
