// imports
const Role = require("../models/roleModel");
const Employee = require("../models/employeeModel");
const Student = require("../models/studentModel");

const asyncHandler = require("express-async-handler");
const {
	notFound,
	isMandatory,
	exist,
	added,
	updated,
	deleted,
} = require("../utils/common");
// get functions
const getAllRoles = asyncHandler(async (req, resp) => {
	try {
		const allRoles = await Role.find({});
		resp.status(200).json({ data: allRoles, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

const getRole = asyncHandler(async (req, resp) => {
	const { id } = req.params;

	try {
		const role = await Role.findById(id);

		if (!role) {
			return resp.status(404).json({ error: notFound(`Role with id ${id} `) });
		}

		resp.status(200).json({ data: role, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postRole = asyncHandler(async (req, resp) => {
	const { name, permissions } = req.body;
	const requiredFields = [
		{ field: name, errorMessage: isMandatory(`name`) },
		{ field: permissions, errorMessage: isMandatory("permissions Field") },
	];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldRoleName = await Role.findOne({ name });
	if (oldRoleName) {
		resp.status(400).json({ error: exist(`Role with name ${name}`) });
	}

	const newRole = await Role.create({
		name,
		permissions,
	});
	await newRole.save();

	const respData = {
		...newRole._doc,
		success: true,
		message: added(name),
	};
	return resp.status(201).json(respData);
});

// update functions
const putRole = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	const { name, permissions } = req.body;

	try {
		const updatedRole = await Role.findByIdAndUpdate(
			id,
			{ name, permissions },
			{ new: true }
		);

		if (!updatedRole) {
			return resp.status(404).json({ error: notFound(`Role with ${id}`) });
		}

		resp.status(200).json({
			data: updatedRole,
			success: true,
			message: updated(name),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// delete function
const deleteRole = asyncHandler(async (req, resp) => {
	const { id } = req.params;

	try {
		const empWithRole = await Employee.findOne({ role: id });
		const stdWithRole = await Student.findOne({ role: id });

		if (empWithRole) {
			return resp.status(400).json({
				error: `Role is allocated to ${empWithRole.name}. Cannot delete.`,
			});
		}
		if (stdWithRole) {
			return resp.status(400).json({
				error: `Role is allocated to ${stdWithRole.name}. Cannot delete.`,
			});
		}
		const deletedRole = await Role.findByIdAndDelete(id);

		if (!deletedRole) {
			return resp.status(404).json({ error: notFound(`Role with ${id}`) });
		}

		resp.status(200).json({
			data: deletedRole,
			success: true,
			message: deleted("Role"),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

module.exports = {
	getAllRoles,
	postRole,
	getRole,
	putRole,
	deleteRole,
};
