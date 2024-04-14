const mongoose = require("mongoose");
const { ERROR_TITLES, MESSAGES } = require("../shared/constants");
const connectDb = async () => {
  // MongoDB connection URL
  const dbURI = process.env.DATABASE_URL;
  // Connect to MongoDB
  try {
    const connect = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      MESSAGES.DB_CONNECTED,
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error(ERROR_TITLES.DATABASE_CONNECTION, error);
  }
};

module.exports = connectDb;
