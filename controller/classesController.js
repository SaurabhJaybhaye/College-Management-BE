// imports
const { FIELDS } = require("../constants/errorConstants");
const Class = require("../models/classModel");
const asyncHandler = require("express-async-handler");
const {
	isMandatory,
	exist,
	notFound,
	updated,
	added,
	deleted,
} = require("../utils/common");
const Course = require("../models/courseModel");
const {
	removeClassFromCourse,
	updateCourseWithNewClass,
} = require("../utils/classUpdater");
const Department = require("../models/departmentModel");
// get functions
const getAllClass = asyncHandler(async (req, resp) => {
	const { dept } = req.query;
	if (dept) {
		try {
			const department = await Department.findById(dept).populate({
				path: "courses",
				populate: {
					path: "classes",
					model: "Class",
				},
			});

			if (!department) {
				return resp.status(404).json({ error: "Department not found" });
			}

			const classes = department.courses.reduce((acc, course) => {
				acc.push(...course.classes);
				return acc;
			}, []);

			resp.status(200).json({ data: classes, success: true });
		} catch (error) {
			resp.status(500).json({ error: error.message });
		}
	} else {
		try {
			const allClasses = await Class.find({})
				.populate("subjects")
				.populate("course");
			resp.status(200).json({ data: allClasses, success: true });
		} catch (error) {
			resp.status(500).json({ error: error.message });
		}
	}
});

const getClass = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	try {
		const classData = await Class.findById(id)
			.populate("subjects")
			.populate("course");
		resp.status(200).json({ data: classData, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postClass = asyncHandler(async (req, resp) => {
	const { name, course, subjects } = req.body;
	const requiredFields = [
		{ field: name, errorMessage: isMandatory(FIELDS.NAME) },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const courseData = await Course.findById(course);
	if (!courseData) {
		return resp.status(400).json({ error: notFound("Course") });
	}

	const oldClassName = await Class.findOne({ name });
	if (oldClassName) {
		resp.status(400).json({ error: exist(`Class with name ${name}`) });
	}

	const newClass = await Class.create({
		name,
		course,
		subjects,
	});
	await newClass.save();

	await updateCourseWithNewClass(course, newClass._id);
	const respData = {
		...newClass._doc,
		success: true,
		message: added(name),
	};
	return resp.status(201).json(respData);
});

const putClass = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	const { name, course, subjects } = req.body;

	const courseData = await Course.findById(course);
	if (!courseData) {
		return resp.status(400).json({ error: notFound("Course") });
	}

	try {
		const updatedClass = await Class.findByIdAndUpdate(
			id,
			{ name, course, subjects },
			{ new: true }
		);

		if (!updatedClass) {
			return resp.status(404).json({ error: notFound(`Class with ${id} `) });
		}

		resp.status(200).json({
			data: updatedClass,
			success: true,
			message: updated(name),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// delete function
const deleteClass = asyncHandler(async (req, resp) => {
	const { id } = req.params;

	try {
		const deletedClass = await Class.findByIdAndDelete(id);

		if (!deletedClass) {
			return resp.status(404).json({ error: notFound(`Class with ${id}`) });
		}

		await removeClassFromCourse(deletedClass.course, id);

		resp.status(200).json({
			data: deletedClass,
			success: true,
			message: deleted("Class"),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

module.exports = {
	getAllClass,
	postClass,
	getClass,
	putClass,
	deleteClass,
};
