// imports
const { MESSAGES, ERROR_TITLES } = require("../constants/errorConstants");
const Staff = require("../models/staffModel");
const StaffType = require("../models/staffTypeModel");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

// get functions
const getAllStaff = asyncHandler(async (req, resp) => {
	try {
		const allStaff = await Staff.find({}).populate("role");
		resp.status(200).json(allStaff);
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

const getAllStaffTypes = asyncHandler(async (req, resp) => {
	try {
		const allStaffTypes = await StaffType.find({});
		resp.status(200).json(allStaffTypes);
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postStaff = asyncHandler(async (req, resp) => {
	const {
		name,
		email,
		password,
		role,
		phone,
		address,
		gender,
		dateOfBirth,
		joiningDate,
		HOD,
		department,
		classTeacherOf,
		subject,
		employeeType,
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

	const oldEmail = await Staff.findOne({ email });
	if (oldEmail) {
		resp.status(400).json({ error: ERROR_TITLES.EMAIL_EXIST });
	}

	// const hashPassword = await bcrypt.hash(password, 10);
	const newStaff = await Staff.create({
		name,
		email,
		password,
		role,
		phone,
		address,
		gender,
		dateOfBirth,
		joiningDate,
		staffId: uuidv4(),
		HOD,
		department,
		classTeacherOf,
		subject,
		employeeType,
	});
	await newStaff.save();
	const respData = {
		...newStaff._doc,
		success: true,
		message: MESSAGES.STAFF_ADDED,
	};
	return resp.status(201).json(respData);
});

const postStaffType = asyncHandler(async (req, resp) => {
	const { title } = req.body;
	const requiredFields = [
		{ field: title, errorMessage: ERROR_TITLES.MANDATORY_NAME },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldStaffType = await StaffType.findOne({ title });
	if (oldStaffType) {
		resp.status(400).json({ error: ERROR_TITLES.STAFF_TYPE_EXIST });
	}

	const newStaffType = await StaffType.create({
		title,
		staffTypeId: uuidv4(),
	});
	await newStaffType.save();

	const respData = {
		...newStaffType._doc,
		success: true,
		message: MESSAGES.CLASS_ADDED,
	};
	return resp.status(201).json(respData);
});

module.exports = {
	getAllStaff,
	getAllStaffTypes,
	postStaff,
	postStaffType,
};
