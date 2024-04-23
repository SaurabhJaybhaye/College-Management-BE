const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	departmentId: {
		type: String,
		required: true,
		unique: true,
	},
	class: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Class",
	},
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
