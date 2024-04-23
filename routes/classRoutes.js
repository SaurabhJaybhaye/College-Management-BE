const express = require("express");
const { getAllClasses, postClass } = require("../controller/classController");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

//router.use(validateToken);
router.route("/").get(getAllClasses).post(postClass);
module.exports = router;
