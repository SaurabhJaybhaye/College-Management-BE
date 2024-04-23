const express = require("express");
const router = express.Router();
const { getAllRoles, postRole } = require("../controller/roleController");
const validateToken = require("../middleware/validateTokenHandler");

//router.use(validateToken);
router.route("/").get(getAllRoles).post(postRole);
module.exports = router;
