const mongoose = require("mongoose");

const employeeTypeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
});

const employeeType = mongoose.model("employeeType", employeeTypeSchema);

module.exports = employeeType;
