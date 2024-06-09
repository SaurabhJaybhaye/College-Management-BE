const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
	subjects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Subject",
		},
	],
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
