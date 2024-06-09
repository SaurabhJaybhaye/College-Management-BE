const express = require("express");
const router = express.Router();
const {
	getAllRoles,
	postRole,
	getRole,
	putRole,
	deleteRole,
} = require("../controller/roleController");
const validateToken = require("../middleware/validateTokenHandler");

const { PERMISSIONS } = require("../constants/permissions");

router.use((req, resp, next) =>
	validateToken(PERMISSIONS.READ_ROLE, req, resp, next)
);
router.route("/").get(getAllRoles);
router.use((req, resp, next) =>
	validateToken(PERMISSIONS.WRITE_ROLE, req, resp, next)
);
router.route("/").post(postRole);
router.route("/:id").get(getRole).put(putRole).delete(deleteRole);

module.exports = router;
