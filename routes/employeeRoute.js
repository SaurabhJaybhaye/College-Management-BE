const express = require("express");
const router = express.Router();

const {
	getAllEmployee,
	postEmployee,
	getEmployee,
	putEmployee,
	deleteEmployee,
	uploadEmployee,
} = require("../controller/employeeController");
const validateToken = require("../middleware/validateTokenHandler");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const { PERMISSIONS } = require("../constants/permissions");

router.use((req, resp, next) =>
	validateToken(PERMISSIONS.READ_EMPLOYEE, req, resp, next)
);
router.route("/").get(getAllEmployee);
router.use((req, resp, next) =>
	validateToken(PERMISSIONS.WRITE_EMPLOYEE, req, resp, next)
);
router.route("/").post(postEmployee);
router.route("/upload").post(uploadMiddleware, uploadEmployee);
router.route("/:id").get(getEmployee).put(putEmployee).delete(deleteEmployee);

module.exports = router;
