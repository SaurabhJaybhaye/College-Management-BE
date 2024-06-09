// imports
const { FIELDS } = require("../constants/errorConstants");
const Course = require("../models/courseModel");
const Department = require("../models/departmentModel");

const asyncHandler = require("express-async-handler");
const {
	isMandatory,
	exist,
	notFound,
	updated,
	added,
	deleted,
} = require("../utils/common");
const {
	removeCourseFromDepartment,
	updateDepartmentWithNewCourse,
	deleteClassesOnCourseDelete,
} = require("../utils/courseUpdated");
// get functions
const getAllCourse = asyncHandler(async (req, resp) => {
	try {
		const allCourse = await Course.find({})
			.populate("classes")
			.populate("department");
		resp.status(200).json({ data: allCourse, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});
const getCourse = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	try {
		const course = await Course.findById(id)
			.populate("classes")
			.populate("department");
		resp.status(200).json({ data: course, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postCourse = asyncHandler(async (req, resp) => {
	const { name, department, classes } = req.body;
	const requiredFields = [
		{ field: name, errorMessage: isMandatory(FIELDS.NAME) },
		{ field: name, errorMessage: isMandatory(FIELDS.DEPARTMENT) },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const departmentData = await Department.findById(department);
	if (!departmentData) {
		return resp.status(400).json({ error: notFound("Department") });
	}

	const oldCourseName = await Course.findOne({ name });
	if (oldCourseName) {
		resp.status(400).json({ error: exist(`Course with name ${name}`) });
	}

	const newCourse = await Course.create({
		name,
		classes,
		department,
	});
	await newCourse.save();

	await updateDepartmentWithNewCourse(newCourse._id, department);

	const respData = {
		...newCourse._doc,
		success: true,
		message: added(name),
	};
	return resp.status(201).json(respData);
});

const putCourse = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	const { name, department, classes } = req.body;

	try {
		const updatedCourse = await Course.findByIdAndUpdate(
			id,
			{ name, classes, department },
			{ new: true }
		);

		const departmentData = await Department.findById(department);
		if (!departmentData) {
			return resp.status(400).json({ error: notFound("Department") });
		}

		if (!updatedCourse) {
			return resp.status(404).json({ error: notFound(`Course with ${id} `) });
		}

		resp.status(200).json({
			data: updatedCourse,
			success: true,
			message: updated(name),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// delete function
const deleteCourse = asyncHandler(async (req, resp) => {
	const { id } = req.params;

	try {
		await deleteClassesOnCourseDelete(id);

		const deletedCourse = await Course.findByIdAndDelete(id);

		if (!deletedCourse) {
			return resp.status(404).json({ error: notFound(`Course with ${id}`) });
		}

		await removeCourseFromDepartment(id, deletedCourse.department);
		resp.status(200).json({
			data: deletedCourse,
			success: true,
			message: deleted("Course"),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

module.exports = {
	getAllCourse,
	postCourse,
	getCourse,
	putCourse,
	deleteCourse,
};
