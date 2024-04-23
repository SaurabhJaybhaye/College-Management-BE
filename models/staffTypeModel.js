const mongoose = require("mongoose");

const staffTypeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	staffTypeId: {
		type: String,
		required: true,
		unique: true,
	},
});

const StaffType = mongoose.model("StaffType", staffTypeSchema);

module.exports = StaffType;
