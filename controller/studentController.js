const { FIELDS } = require("../constants/errorConstants");
const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");
const {
	isMandatory,
	exist,
	added,
	notFound,
	deleted,
	updated,
} = require("../utils/common");
const Department = require("../models/departmentModel");
const Role = require("../models/roleModel");
const Class = require("../models/classModel");
const Course = require("../models/courseModel");
const xlsx = require("xlsx");
const mongoose = require("mongoose");

const getAllStudents = asyncHandler(async (req, resp) => {
	try {
		const query = req.query;
		const allStudents = await Student.find(query)
			.populate({
				path: "role",
				select: "name permissions",
			})
			.populate({
				path: "class",
				select: "name",
			})
			.populate({
				path: "course",
				select: "name",
			})
			.populate({
				path: "department",
				select: "name",
			})
			.select(
				"_id name image email password phone address gender dateOfBirth PRN role class course department"
			);

		resp.status(200).json({ data: allStudents, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

const getStudent = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	try {
		const student = await Student.findById(id)
			.populate({
				path: "role",
				select: "name permissions",
			})
			.populate({
				path: "class",
				select: "name",
			})
			.populate({
				path: "course",
				select: "name",
			})
			.populate({
				path: "department",
				select: "name",
			})
			.select(
				"_id name image email password phone address gender dateOfBirth PRN role class course department"
			);
		if (!student) {
			return resp
				.status(404)
				.json({ error: notFound(`Student with id ${id} `) });
		}
		resp.status(200).json({ data: student, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

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
		image,
	} = req.body;
	const requiredFields = [
		{ field: name, errorMessage: isMandatory(FIELDS.NAME) },
		{ field: email, errorMessage: isMandatory(FIELDS.EMAIL) },
		{ field: password, errorMessage: isMandatory(FIELDS.PASSWORD) },
		{ field: role, errorMessage: isMandatory(FIELDS.ROLE) },
		{ field: phone, errorMessage: isMandatory(FIELDS.PHONE) },
		{ field: address, errorMessage: isMandatory(FIELDS.ADDRESS) },
		{ field: gender, errorMessage: isMandatory(FIELDS.GENDER) },
		{ field: dateOfBirth, errorMessage: isMandatory(FIELDS.DATE) },
		{ field: department, errorMessage: isMandatory(FIELDS.DEPARTMENT) },
		{ field: classId, errorMessage: isMandatory(FIELDS.CLASS) },
		{ field: course, errorMessage: isMandatory(FIELDS.COURSE) },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldEmail = await Student.findOne({ email });
	if (oldEmail) {
		resp.status(400).json({ error: exist(`${email}`) });
	}
	const departmentData = await Department.findById(department);
	if (!departmentData) {
		return resp.status(400).json({ error: notFound(FIELDS.DEPARTMENT) });
	}

	const roleData = await Role.findById(role);
	if (!roleData) {
		return resp.status(400).json({ error: notFound(FIELDS.ROLE) });
	}

	const newStudent = await Student.create({
		name,
		email,
		password,
		role,
		phone,
		address,
		gender,
		dateOfBirth,
		PRN: Math.floor(Math.random() * 1000),
		class: classId,
		course,
		department,
		image,
	});
	await newStudent.save();
	const respData = {
		...newStudent._doc,
		success: true,
		message: added(FIELDS.STUDENT),
	};
	return resp.status(201).json(respData);
});

const uploadStudents = asyncHandler(async (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}

	try {
		// Read the uploaded file
		const workbook = xlsx.readFile(req.file.path);
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];
		const rows = xlsx.utils.sheet_to_json(sheet);

		// Iterate through the rows and insert data into the Student collection
		for (const row of rows) {
			// Find the role, class, course, and department IDs from the provided names
			const roleData = await Role.findOne({ name: row.role });
			const classData = await Class.findOne({ name: row.class });
			const courseData = await Course.findOne({ name: row.course });
			const departmentData = await Department.findOne({ name: row.department });

			// Handle case where any of the provided names do not exist in the database
			if (!roleData || !classData || !courseData || !departmentData) {
				return res
					.status(400)
					.send(`Invalid data in row: ${JSON.stringify(row)}`);
			}

			const student = new Student({
				name: row.name,
				image: row.image || "",
				email: row.email,
				password: row.password,
				phone: row.phone,
				address: row.address,
				gender: row.gender,
				dateOfBirth: new Date(row.dateOfBirth),
				PRN: row.PRN,
				role: roleData._id,
				class: classData._id,
				course: courseData._id,
				department: departmentData._id,
			});

			await student.save();
		}

		res.status(200).send("File uploaded and data inserted successfully.");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

const updateStudent = asyncHandler(async (req, resp) => {
	try {
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
			classId,
			course,
			department,
			image,
		} = req.body;
		const updateData = req.body;
		const requiredFields = [
			{ field: name, errorMessage: isMandatory(FIELDS.NAME) },
			{ field: email, errorMessage: isMandatory(FIELDS.EMAIL) },
			{ field: password, errorMessage: isMandatory(FIELDS.PASSWORD) },
			{ field: role, errorMessage: isMandatory(FIELDS.ROLE) },
			{ field: phone, errorMessage: isMandatory(FIELDS.PHONE) },
			{ field: address, errorMessage: isMandatory(FIELDS.ADDRESS) },
			{ field: gender, errorMessage: isMandatory(FIELDS.GENDER) },
			{ field: dateOfBirth, errorMessage: isMandatory(FIELDS.DATE) },
			{ field: department, errorMessage: isMandatory(FIELDS.DEPARTMENT) },
			{ field: classId, errorMessage: isMandatory(FIELDS.CLASS) },
			{ field: course, errorMessage: isMandatory(FIELDS.COURSE) },
		];

		for (const { field, errorMessage } of requiredFields) {
			if (!field) {
				resp.status(400).json({ error: errorMessage });
			}
		}
		const oldEmail = await Student.findOne({ email });

		const departmentData = await Department.findById(department);
		if (!departmentData) {
			return resp.status(400).json({ error: notFound(FIELDS.DEPARTMENT) });
		}

		const roleData = await Role.findById(role);
		if (!roleData) {
			return resp.status(400).json({ error: notFound(FIELDS.ROLE) });
		}
		const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
			new: true,
		});
		if (!updatedStudent) {
			return resp.status(404).json({ error: notFound(FIELDS.STUDENT) });
		}
		resp.status(200).json({
			data: updatedStudent,
			success: true,
			message: updated(FIELDS.STUDENT),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

const deleteStudent = asyncHandler(async (req, resp) => {
	try {
		const { id } = req.params;
		const deletedStudent = await Student.findByIdAndDelete(id);
		if (!deletedStudent) {
			return resp.status(404).json({ error: notFound(FIELDS.STUDENT) });
		}
		resp.status(200).json({
			data: deletedStudent,
			success: true,
			message: deleted(FIELDS.STUDENT),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

module.exports = {
	getAllStudents,
	postStudent,
	updateStudent,
	deleteStudent,
	getStudent,
	uploadStudents,
};
