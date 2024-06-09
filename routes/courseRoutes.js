const express = require("express");
const router = express.Router();
const {
	getAllCourse,
	postCourse,
	getCourse,
	putCourse,
	deleteCourse,
} = require("../controller/coursesController");

const validateToken = require("../middleware/validateTokenHandler");
const { PERMISSIONS } = require("../constants/permissions");

router.use((req, resp, next) =>
	validateToken(PERMISSIONS.READ_COURSE, req, resp, next)
);
router.route("/").get(getAllCourse);
router.use((req, resp, next) =>
	validateToken(PERMISSIONS.WRITE_COURSE, req, resp, next)
);
router.route("/").post(postCourse);
router.route("/:id").get(getCourse).put(putCourse).delete(deleteCourse);

module.exports = router;
