// imports
const { ERROR_TITLES, MESSAGES } = require("../constants/errorConstants");
const Department = require("../models/departmentModel");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
// get functions
const getAllDepartment = asyncHandler(async (req, resp) => {
	try {
		const allDepartment = await Department.find({});
		resp.status(200).json(allDepartment).populate("class");
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postDepartment = asyncHandler(async (req, resp) => {
	const { name, classId } = req.body;
	const requiredFields = [
		{ field: name, errorMessage: ERROR_TITLES.MANDATORY_NAME },
		{ field: classId, errorMessage: ERROR_TITLES.MANDATORY_CLASS_ID },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldDepartmentName = await Department.findOne({ name });
	if (oldDepartmentName) {
		resp.status(400).json({ error: ERROR_TITLES.CLASS_EXIST });
	}

	const newDepartment = await Department.create({
		name,
		departmentId: uuidv4(),
		class: classId,
	});
	await newDepartment.save();

	const respData = {
		...newDepartment._doc,
		success: true,
		message: MESSAGES.DEPARTMENT_ADDED,
	};
	return resp.status(201).json(respData);
});

module.exports = {
	getAllDepartment,
	postDepartment,
};
