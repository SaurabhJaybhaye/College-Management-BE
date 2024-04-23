const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	notificationId: {
		type: String,
		required: true,
		unique: true,
	},
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
