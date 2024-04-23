// imports
const { ERROR_TITLES, MESSAGES } = require("../constants/errorConstants");
const Role = require("../models/roleModel");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
// get functions
const getAllRoles = asyncHandler(async (req, resp) => {
	try {
		const allRoles = await Role.find({});
		resp.status(200).json(allRoles);
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postRole = asyncHandler(async (req, resp) => {
	const { name, permissions } = req.body;
	const requiredFields = [
		{ field: name, errorMessage: ERROR_TITLES.MANDATORY_NAME },
		{ field: permissions, errorMessage: ERROR_TITLES.MANDATORY_PERMISSIONS },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldRoleName = await Role.findOne({ name });
	if (oldRoleName) {
		resp.status(400).json({ error: ERROR_TITLES.ROLE_EXIST });
	}

	const newRole = await Role.create({
		name,
		roleId: uuidv4(),
		permissions,
	});
	await newRole.save();

	const respData = {
		...newRole._doc,
		success: true,
		message: MESSAGES.ROLE_ADDED,
	};
	return resp.status(201).json(respData);
});

module.exports = {
	getAllRoles,
	postRole,
};
