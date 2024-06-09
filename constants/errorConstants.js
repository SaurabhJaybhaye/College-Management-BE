exports.ERROR_CODES = {
	NOT_FOUND: 404,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	VALIDATION_ERROR: 400,
	SERVER_ERROR: 500,
	DUPLICATE_VALUE_ERROR: 409,
};

exports.FIELDS = {
	EMAIL: "Email",
	NAME: "Name",
	EmpId: "EmpId",
	PASSWORD: "Password",
	ADDRESS: "Address",
	GENDER: "Gender",
	DATE: "Date of Birth",
	DEPARTMENT: "Department",
	JOINING_DATE: "Joining Date",
	PHONE: "Phone number",
	ROLE: "Role",
	PERMISSIONS: "Permissions",
	SUBJECT: "Subject",
	CLASS: "Class",
	COURSE: "Course",
	STUDENT: "Student",
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
	DB_CONNECTION_FAILS: "Error connecting to MongoDB:",
};

exports.MESSAGES = {
	DB_CONNECTED: "Connected to MongoDB :",
};
