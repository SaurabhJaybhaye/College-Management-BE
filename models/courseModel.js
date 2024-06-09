const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	classes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Class",
		},
	],
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Department",
		required: true,
	},
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
