// imports
const { MESSAGES, ERROR_TITLES } = require("../constants/errorConstants");
const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

// get functions
const getAllStudents = asyncHandler(async (req, resp) => {
	try {
		const allStudents = await Student.find({}).populate("role");
		resp.status(200).json(allStudents);
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postStudent = asyncHandler(async (req, resp) => {
	const {
		name,
		email,
		password,
		role,
		phone,
		address,
		gender,
		dateOfBirth,
		classId,
		course,
		department,
	} = req.body;
	const requiredFields = [
		{ field: name, errorMessage: ERROR_TITLES.MANDATORY_NAME },
		{ field: email, errorMessage: ERROR_TITLES.MANDATORY_EMAIL },
		{ field: password, errorMessage: ERROR_TITLES.MANDATORY_PASSWORD },
		{ field: role, errorMessage: ERROR_TITLES.MANDATORY_ROLE },
		{ field: phone, errorMessage: ERROR_TITLES.MANDATORY_PHONE },
		{ field: address, errorMessage: ERROR_TITLES.MANDATORY_ADDRESS },
		{ field: gender, errorMessage: ERROR_TITLES.MANDATORY_GENDER },
		{ field: dateOfBirth, errorMessage: ERROR_TITLES.MANDATORY_DOB },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldEmail = await Student.findOne({ email });
	if (oldEmail) {
		resp.status(400).json({ error: ERROR_TITLES.EMAIL_EXIST });
	}

	// const hashPassword = await bcrypt.hash(password, 10);
	const newStudent = await Student.create({
		name,
		email,
		password,
		role,
		phone,
		address,
		gender,
		dateOfBirth,
		PRN: uuidv4(),
		class: classId,
		course,
		department,
	});
	await newStudent.save();
	const respData = {
		...newStudent._doc,
		success: true,
		message: MESSAGES.STUDENT_ADDED,
	};
	return resp.status(201).json(respData);
});

module.exports = {
	getAllStudents,
	postStudent,
};
