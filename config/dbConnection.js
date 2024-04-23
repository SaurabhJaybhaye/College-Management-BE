const mongoose = require("mongoose");
const { MESSAGES, ERROR_MESSAGES } = require("../constants/errorConstants");
const connectDb = async () => {
	// MongoDB connection URL
	const dbURI = process.env.DATABASE_URL;
	// Connect to MongoDB
	try {
		const connect = await mongoose.connect(dbURI);

		console.log(
			MESSAGES.DB_CONNECTED,
			connect.connection.host,
			connect.connection.name
		);
	} catch (error) {
		console.error(ERROR_MESSAGES.DB_CONNECTION_FAILS, error);
	}
};

module.exports = connectDb;
