// imports
const { ERROR_TITLES, MESSAGES } = require("../constants/errorConstants");
const Subject = require("../models/subjectModel");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
// get functions
const getAllSubject = asyncHandler(async (req, resp) => {
	try {
		const allSubject = await Subject.find({});
		resp.status(200).json(allSubject);
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postSubject = asyncHandler(async (req, resp) => {
	const { name } = req.body;
	const requiredFields = [
		{ field: name, errorMessage: ERROR_TITLES.MANDATORY_NAME },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldSubjectName = await Subject.findOne({ name });
	if (oldSubjectName) {
		resp.status(400).json({ error: ERROR_TITLES.SUBJECT_EXIST });
	}

	const newSubject = await Subject.create({
		name,
		subjectId: uuidv4(),
	});
	await newSubject.save();

	const respData = {
		...newSubject._doc,
		success: true,
		message: MESSAGES.SUBJECT_ADDED,
	};
	return resp.status(201).json(respData);
});

module.exports = {
	getAllSubject,
	postSubject,
};
