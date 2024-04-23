const mongoose = require("mongoose");
const { GENDER } = require("../constants/constants");

const studentSchema = new mongoose.Schema({
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
	PRN: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role",
	},
	class: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Class",
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Department",
	},
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
