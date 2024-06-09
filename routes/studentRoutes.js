const express = require("express");
const router = express.Router();
const {
	getAllStudents,
	postStudent,
	updateStudent,
	deleteStudent,
	getStudent,
	uploadStudents,
} = require("../controller/studentController");
const validateToken = require("../middleware/validateTokenHandler");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const { PERMISSIONS } = require("../constants/permissions");

router.use((req, resp, next) =>
	validateToken(PERMISSIONS.READ_STUDENT, req, resp, next)
);
router.route("/").get(getAllStudents);
router.use((req, resp, next) =>
	validateToken(PERMISSIONS.WRITE_STUDENT, req, resp, next)
);
router.route("/").post(postStudent);

router.route("/upload").post(uploadMiddleware, uploadStudents);
router.route("/:id").get(getStudent).put(updateStudent).delete(deleteStudent);

module.exports = router;
