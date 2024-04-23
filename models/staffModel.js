const mongoose = require("mongoose");
const { GENDER } = require("../constants/constants");

const staffSchema = new mongoose.Schema({
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
	staffId: {
		type: String,
		required: true,
		unique: true,
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
	subject: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Subject",
	},
	employeeType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "staffType",
	},
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
