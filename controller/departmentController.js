// imports
const { FIELDS } = require("../constants/errorConstants");
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
	removeCourseAndClassOnDeletion,
} = require("../utils/departmentUpdater");
// get functions
const getAllDepartment = asyncHandler(async (req, resp) => {
	try {
		const allDepartment = await Department.find({}).populate("courses");
		resp.status(200).json({ data: allDepartment, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});
const getDepartment = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	try {
		const department = await Department.findById(id).populate("courses");
		resp.status(200).json({ data: department, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postDepartment = asyncHandler(async (req, resp) => {
	const { name, courses } = req.body;
	const requiredFields = [
		{ field: name, errorMessage: isMandatory(FIELDS.NAME) },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldDepartmentName = await Department.findOne({ name });
	if (oldDepartmentName) {
		resp.status(400).json({ error: exist(`Department with name ${name}`) });
	}

	const newDepartment = await Department.create({
		name,
		courses,
	});
	await newDepartment.save();

	const respData = {
		...newDepartment._doc,
		success: true,
		message: added(name),
	};
	return resp.status(201).json(respData);
});

const putDepartment = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	const { name, courses } = req.body;

	try {
		const updatedDepartment = await Department.findByIdAndUpdate(
			id,
			{ name, courses },
			{ new: true }
		);

		if (!updatedDepartment) {
			return resp
				.status(404)
				.json({ error: notFound(`Department with ${id} `) });
		}

		resp.status(200).json({
			data: updatedDepartment,
			success: true,
			message: updated(name),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// delete function
const deleteDepartment = asyncHandler(async (req, resp) => {
	const { id } = req.params;

	try {
		await removeCourseAndClassOnDeletion(id);
		const deletedDepartment = await Department.findByIdAndDelete(id);

		if (!deletedDepartment) {
			return resp
				.status(404)
				.json({ error: notFound(`Department with ${id}`) });
		}

		resp.status(200).json({
			data: deletedDepartment,
			success: true,
			message: deleted("Department"),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

module.exports = {
	getAllDepartment,
	postDepartment,
	getDepartment,
	putDepartment,
	deleteDepartment,
};
