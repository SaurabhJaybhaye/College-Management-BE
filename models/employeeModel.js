const mongoose = require("mongoose");
const { GENDER } = require("../constants/constants");
const { invalidFormat } = require("../utils/common");

const validateTeachesField = (value) => {
	if (!value || typeof value !== "object") {
		return false;
	}

	// Check if all keys are valid class IDs (ObjectIds) and all values are arrays of valid subject IDs (ObjectIds)
	for (const key in value) {
		if (
			!mongoose.Types.ObjectId.isValid(key) ||
			!Array.isArray(value[key]) ||
			value[key].some((id) => !mongoose.Types.ObjectId.isValid(id))
		) {
			return false;
		}
	}

	return true;
};

const employeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
		unique: true,
	},
	address: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
		enum: [GENDER.MALE, GENDER.FEMALE, GENDER.OTHER],
		default: GENDER.MALE,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	joiningDate: {
		type: Date,
		required: true,
	},
	HOD: {
		type: Boolean,
		default: false,
	},
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Department",
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role",
	},
	classTeacherOf: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Class",
	},
	teaches: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Subject",
			},
		],
	},
	employeeType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "employeeType",
	},
	image: {
		type: String,
	},
});

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;
