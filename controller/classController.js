// imports
const { ERROR_TITLES, MESSAGES } = require("../constants/errorConstants");
const Class = require("../models/classModel");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
// get functions
const getAllClasses = asyncHandler(async (req, resp) => {
	try {
		const allClasses = await Class.find({});
		resp.status(200).json(allClasses);
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postClass = asyncHandler(async (req, resp) => {
	const { name } = req.body;
	const requiredFields = [
		{ field: name, errorMessage: ERROR_TITLES.MANDATORY_NAME },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldClassName = await Class.findOne({ name });
	if (oldClassName) {
		resp.status(400).json({ error: ERROR_TITLES.CLASS_EXIST });
	}

	const newClass = await Class.create({
		name,
		classId: uuidv4(),
	});
	await newClass.save();

	const respData = {
		...newClass._doc,
		success: true,
		message: MESSAGES.CLASS_ADDED,
	};
	return resp.status(201).json(respData);
});

module.exports = {
	getAllClasses,
	postClass,
};
