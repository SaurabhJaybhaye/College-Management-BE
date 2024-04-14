exports.ERROR_CODES = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  VALIDATION_ERROR: 400,
  SERVER_ERROR: 500,
  DUPLICATE_VALUE_ERROR: 409,
};

exports.ERROR_TITLES = {
  VALIDATION_FAILED: "Validation Failed",
  NOT_FOUND: "Not Found",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  SEVER_NOT_FOUND: "Server Not Found",
  NO_ERROR: "No Error all good!",
  UNAUTHORIZED_TOKEN: "Token is not authorized",
  MISSING_TOKEN: "Token is missing or user is Unauthorized",
  MANDATORY_NAME: "Name is mandatory",
  MANDATORY_STDID: "StdId is mandatory",
  MANDATORY_PASSWORD: "Password is mandatory",
  MANDATORY_EMAIL: "Email is mandatory",
  DATABASE_CONNECTION: "Error connecting to MongoDB:",
};

exports.MESSAGES = {
  DB_CONNECTED: "Connected to MongoDB :",
};
