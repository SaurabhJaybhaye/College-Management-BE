const express = require("express");
const router = express.Router();
const {
	getAllDepartment,
	postDepartment,
	getDepartment,
	putDepartment,
	deleteDepartment,
} = require("../controller/departmentController");

const validateToken = require("../middleware/validateTokenHandler");
const { PERMISSIONS } = require("../constants/permissions");

router.use((req, resp, next) =>
	validateToken(PERMISSIONS.READ_DEPARTMENT, req, resp, next)
);
router.route("/").get(getAllDepartment);
router.use((req, resp, next) =>
	validateToken(PERMISSIONS.WRITE_DEPARTMENT, req, resp, next)
);
router.route("/").post(postDepartment);
router
	.route("/:id")
	.get(getDepartment)
	.put(putDepartment)
	.delete(deleteDepartment);

module.exports = router;
