// imports
const Subject = require("../models/subjectModel");
const asyncHandler = require("express-async-handler");
const {
	notFound,
	isMandatory,
	exist,
	added,
	updated,
	deleted,
} = require("../utils/common");
const Class = require("../models/classModel");
// get functions
const getAllSubject = asyncHandler(async (req, resp) => {
	try {
		const allSubject = await Subject.find({});
		resp.status(200).json({ data: allSubject, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});
const getSubject = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	try {
		const subject = await Subject.findById(id);
		if (!subject) {
			return resp
				.status(404)
				.json({ error: notFound(`Subject with id ${id} `) });
		}
		resp.status(200).json({ data: subject, success: true });
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// post functions
const postSubject = asyncHandler(async (req, resp) => {
	const { name } = req.body;
	const requiredFields = [{ field: name, errorMessage: isMandatory("name") }];

	for (const { field, errorMessage } of requiredFields) {
		if (!field) {
			resp.status(400).json({ error: errorMessage });
		}
	}

	const oldSubjectName = await Subject.findOne({ name });
	if (oldSubjectName) {
		resp.status(400).json({ error: exist(`Subject with name ${name}`) });
	}

	const newSubject = await Subject.create({
		name,
	});
	await newSubject.save();

	const respData = {
		...newSubject._doc,
		success: true,
		message: added(name),
	};
	return resp.status(201).json(respData);
});

// update functions
const putSubject = asyncHandler(async (req, resp) => {
	const { id } = req.params;
	const { name } = req.body;

	try {
		const updatedSubject = await Subject.findByIdAndUpdate(
			id,
			{ name },
			{ new: true }
		);

		if (!updatedSubject) {
			return resp.status(404).json({ error: notFound(`Subject with ${id}`) });
		}

		resp.status(200).json({
			data: updatedSubject,
			success: true,
			message: updated(name),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

// delete function
const deleteSubject = asyncHandler(async (req, resp) => {
	const { id } = req.params;

	try {
		const classWithSubject = await Class.findOne({ subjects: id });
		if (classWithSubject) {
			return resp.status(400).json({
				error: `Subject is allocated to ${classWithSubject.name}. Cannot delete.`,
			});
		}

		const deletedSubject = await Subject.findByIdAndDelete(id);

		if (!deletedSubject) {
			return resp.status(404).json({ error: notFound(`Subject with ${id}`) });
		}

		resp.status(200).json({
			data: deletedSubject,
			success: true,
			message: deleted("Subject"),
		});
	} catch (error) {
		resp.status(500).json({ error: error.message });
	}
});

module.exports = {
	getAllSubject,
	postSubject,
	getSubject,
	putSubject,
	deleteSubject,
};
