const EmployeeType = require("../models/employeeTypeModel");
const asyncHandler = require("express-async-handler");
const {
	notFound,
	isMandatory,
	exist,
	added,
	updated,
	deleted,
} = require("../utils/common");
const getAllEmployeeTypes = asyncHandler(async (req, resp) => {
	try {
		const allEmployeeTypes = await EmployeeType.find({});
		resp.status(200).json({ data: allEmployeeTypes, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

const getEmployeeType = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	try {
		const employeeType = await EmployeeType.findById(id);
		if (!employeeType) {
			return resp
				.status(404)
				.json({ error: notFound(`Employee Type with id ${id} `) });
		}
		resp.status(200).json({ data: employeeType, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

const postEmployeeType = asyncHandler(async (req, resp) => {
	const { title } = req.body;
	const requiredFields = [{ field: title, errorMessage: isMandatory(`title`) }];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldTitle = await EmployeeType.findOne({ title });
	if (oldTitle) {
		resp
			.status(400)
			.json({ error: exist(`Employee type with title ${oldTitle}`) });
	}

	const newEmployeeType = await EmployeeType.create({
		title,
	});
	await newEmployeeType.save();

	const respData = {
		...newEmployeeType._doc,
		success: true,
		message: added(title),
	};
	return resp.status(201).json(respData);
});

const putEmployeeType = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	const { title } = req.body;

	try {
		const updatedEmployeeType = await EmployeeType.findByIdAndUpdate(
			id,
			{ title },
			{ new: true }
		);

		if (!updatedEmployeeType) {
			return resp
				.status(404)
				.json({ error: notFound(`EmployeeType with ${id}`) });
		}

		resp.status(200).json({
			data: updatedEmployeeType,
			success: true,
			message: updated(title),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// delete function
const deleteEmployeeType = asyncHandler(async (req, resp) => {
	const { id } = req.params;

	try {
		const deletedEmployeeType = await EmployeeType.findByIdAndDelete(id);

		if (!deletedEmployeeType) {
			return resp
				.status(404)
				.json({ error: notFound(`EmployeeType with ${id}`) });
		}

		resp.status(200).json({
			data: deletedEmployeeType,
			success: true,
			message: deleted("EmployeeType"),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

module.exports = {
	getAllEmployeeTypes,
	getEmployeeType,
	postEmployeeType,
	putEmployeeType,
	deleteEmployeeType,
};
