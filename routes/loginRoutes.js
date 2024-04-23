const express = require("express");
const router = express.Router();
const { loginUser } = require("../controller/loginController");

router.route("/").post(loginUser);
module.exports = router;
