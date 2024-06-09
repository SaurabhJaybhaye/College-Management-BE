const express = require("express");
const router = express.Router();
const {
	getAllEmployeeTypes,
	getEmployeeType,
	postEmployeeType,
	putEmployeeType,
	deleteEmployeeType,
} = require("../controller/employeeTypeController");
const validateToken = require("../middleware/validateTokenHandler");

const { PERMISSIONS } = require("../constants/permissions");

router.use((req, resp, next) =>
	validateToken(PERMISSIONS.READ_EMPLOYEE_TYPE, req, resp, next)
);
router.route("/").get(getAllEmployeeTypes);
router.use((req, resp, next) =>
	validateToken(PERMISSIONS.WRITE_EMPLOYEE_TYPE, req, resp, next)
);
router.route("/").post(postEmployeeType);
router
	.route("/:id")
	.get(getEmployeeType)
	.put(putEmployeeType)
	.delete(deleteEmployeeType);

module.exports = router;
