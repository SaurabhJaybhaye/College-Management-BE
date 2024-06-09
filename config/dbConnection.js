const mongoose = require("mongoose");
const { MESSAGES, ERROR_TITLES } = require("../constants/errorConstants");
const seedDatabase = require("./seedDatabase");
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

		await seedDatabase();
	} catch (error) {
		console.error(ERROR_TITLES.DB_CONNECTION_FAILS, error);
	}
};

module.exports = connectDb;
