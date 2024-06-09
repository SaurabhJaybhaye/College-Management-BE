const express = require("express");
const router = express.Router();
const {
	postSubject,
	getAllSubject,
	getSubject,
	putSubject,
	deleteSubject,
} = require("../controller/subjectController");
const validateToken = require("../middleware/validateTokenHandler");

const { PERMISSIONS } = require("../constants/permissions");

router.use((req, resp, next) =>
	validateToken(PERMISSIONS.READ_SUBJECT, req, resp, next)
);
router.route("/").get(getAllSubject);
router.use((req, resp, next) =>
	validateToken(PERMISSIONS.WRITE_SUBJECT, req, resp, next)
);
router.route("/").post(postSubject);
router.route("/:id").get(getSubject).put(putSubject).delete(deleteSubject);

module.exports = router;
