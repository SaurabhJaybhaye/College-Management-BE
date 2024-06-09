// imports
const { MESSAGES, ERROR_TITLES } = require("../constants/errorConstants");
const Employee = require("../models/employeeModel");
const Role = require("../models/roleModel");
const Department = require("../models/departmentModel");
const Class = require("../models/classModel");
const EmployeeType = require("../models/employeeTypeModel");
const asyncHandler = require("express-async-handler");
const {
	added,
	isMandatory,
	updated,
	notFound,
	deleted,
	invalidFormat,
} = require("../utils/common");
const xlsx = require("xlsx");

// get functions
const getAllEmployee = asyncHandler(async (req, resp) => {
	try {
		const allEmployee = await Employee.find({})
			.populate("role")
			.populate("department");
		resp.status(200).json({ data: allEmployee, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

const getEmployee = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	try {
		const employee = await Employee.findById(id)
			.populate("role")
			.populate("department")
			.populate("employeeType")
			.populate("classTeacherOf");
		resp.status(200).json({ data: employee, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postEmployee = asyncHandler(async (req, resp) => {
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
		teaches,
		employeeType,
		image,
	} = req.body;
	const requiredFields = [
		{ field: name, errorMessage: isMandatory(name) },
		{ field: email, errorMessage: isMandatory(email) },
		{ field: password, errorMessage: isMandatory(password) },
		{ field: role, errorMessage: isMandatory(role) },
		{ field: phone, errorMessage: isMandatory(phone) },
		{ field: address, errorMessage: isMandatory(address) },
		{ field: gender, errorMessage: isMandatory(gender) },
		{ field: dateOfBirth, errorMessage: isMandatory(dateOfBirth) },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			return resp.status(400).json({ error: errorMessage });
		}
	}

	const oldEmail = await Employee.findOne({ email });
	if (oldEmail) {
		return resp.status(400).json({ error: ERROR_TITLES.EMAIL_EXIST });
	}

	const newEmployee = new Employee({
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
		teaches,
		employeeType,
		image,
	});
	await newEmployee.save();
	const respData = {
		...newEmployee._doc,
		success: true,
		message: added(name),
	};
	return resp.status(201).json(respData);
});

const putEmployee = asyncHandler(async (req, resp) => {
	const { id } = req.params;
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
		teaches,
		employeeType,
		image,
	} = req.body;
	const requiredFields = [
		{ field: name, errorMessage: isMandatory(name) },
		{ field: email, errorMessage: isMandatory(email) },
		{ field: password, errorMessage: isMandatory(password) },
		{ field: role, errorMessage: isMandatory(role) },
		{ field: phone, errorMessage: isMandatory(phone) },
		{ field: address, errorMessage: isMandatory(address) },
		{ field: gender, errorMessage: isMandatory(gender) },
		{ field: dateOfBirth, errorMessage: isMandatory(dateOfBirth) },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			return resp.status(401).json({ error: errorMessage });
		}
	}

	const employee = await Employee.findByIdAndUpdate(
		id,
		{
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
			teaches,
			employeeType,
			image,
		},
		{ new: true }
	);
	await employee.save();
	const respData = {
		...employee._doc,
		success: true,
		message: updated(name),
	};
	return resp.status(201).json(respData);
});

const deleteEmployee = asyncHandler(async (req, resp) => {
	const { id } = req.params;

	try {
		const deletedEmployee = await Employee.findByIdAndDelete(id);

		if (!deletedEmployee) {
			return resp.status(404).json({ error: notFound(`Employee with ${id}`) });
		}

		resp.status(200).json({
			data: deletedEmployee,
			success: true,
			message: deleted("Employee"),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

const uploadEmployee = asyncHandler(async (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}

	try {
		// Read the uploaded file
		const workbook = xlsx.readFile(req.file.path);
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];
		const rows = xlsx.utils.sheet_to_json(sheet);

		// Iterate through the rows and insert data into the Employee collection
		for (const row of rows) {
			// Find the role, class, employeeType, and department IDs from the provided names
			const roleData = await Role.findOne({ name: row.role });
			const classData = await Class.findOne({ name: row.classTeacherOf });
			const departmentData = await Department.findOne({ name: row.department });
			const employeeTypeData = await EmployeeType.findOne({
				title: row.employeeType,
			});

			// Handle case where any of the provided names do not exist in the database
			if (!roleData || !classData || !departmentData || !employeeTypeData) {
				console.log(roleData, classData, departmentData, employeeTypeData);

				return res
					.status(400)
					.send(`Invalid data in row: ${JSON.stringify(row)}`);
			}

			const employee = new Employee({
				name: row.name,
				email: row.email,
				password: row.password,
				phone: row.phone,
				address: row.address,
				gender: row.gender,
				dateOfBirth: new Date(row.dateOfBirth),
				joiningDate: new Date(row.joiningDate),
				HOD: row.HOD || false,
				department: departmentData._id,
				role: roleData._id,
				classTeacherOf: classData._id,
				employeeType: employeeTypeData._id,
				image: row.image || "",
				teaches: row.teaches,
			});

			await employee.save();
		}

		res.status(200).send("File uploaded and data inserted successfully.");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = {
	getAllEmployee,
	postEmployee,
	getEmployee,
	putEmployee,
	deleteEmployee,
	uploadEmployee,
};
