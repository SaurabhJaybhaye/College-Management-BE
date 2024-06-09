const express = require("express");
const router = express.Router();
const {
	getAllClass,
	postClass,
	getClass,
	putClass,
	deleteClass,
} = require("../controller/classesController");
const { PERMISSIONS } = require("../constants/permissions");

const validateToken = require("../middleware/validateTokenHandler");

router.use((req, resp, next) =>
	validateToken(PERMISSIONS.READ_CLASS, req, resp, next)
);
router.route("/").get(getAllClass);
router.use((req, resp, next) =>
	validateToken(PERMISSIONS.WRITE_CLASS, req, resp, next)
);
router.route("/").post(postClass);
router.route("/:id").get(getClass).put(putClass).delete(deleteClass);

module.exports = router;
