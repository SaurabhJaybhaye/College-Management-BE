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
	MANDATORY_STD_ID: "EmpId is mandatory",
	MANDATORY_PASSWORD: "Password is mandatory",
	MANDATORY_EMAIL: "Email is mandatory",
	MANDATORY_ADDRESS: "Address is mandatory",
	MANDATORY_GENDER: "Gender is mandatory",
	MANDATORY_DOB: "Date of Birth is mandatory",
	MANDATORY_JOINING_DATE: "Joining Date is mandatory",
	MANDATORY_DEPARTMENT: "Department is mandatory",
	MANDATORY_ROLE: "Role is mandatory",
	MANDATORY_HOD: "HOD is mandatory",
	MANDATORY_PHONE: "Phone number is mandatory",
	MANDATORY_PERMISSIONS: "Permissions are mandatory",
	MANDATORY_CLASS_ID: "Class id is mandatory",
	ROLE_EXIST: "Role name already exist",
	CLASS_EXIST: "Class name already exist",
	SUBJECT_EXIST: "Subject already exist",
	EMAIL_EXIST: "Email already exist",
	STAFF_TYPE_EXIST: "Staff with this title already exist"
};

exports.ERROR_MESSAGES = {
	DB_CONNECTION_FAILS: "Error connecting to MongoDB:",
};

exports.MESSAGES = {
	DB_CONNECTED: "Connected to MongoDB :",
	ROLE_ADDED: "Role added successfully",
	CLASS_ADDED: "Class added successfully",
	DEPARTMENT_ADDED: "Department added successfully",
	SUBJECT_ADDED: "Subject added successfully",
	STUDENT_ADDED: "Student added successfully",
	STAFF_ADDED: "Employee added successfully",
};
