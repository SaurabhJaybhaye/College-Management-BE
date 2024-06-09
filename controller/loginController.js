const Employee = require("../models/employeeModel");
const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { addToRevocationList } = require("../middleware/revocationList");
// post login

const loginUser = asyncHandler(async (req, resp) => {
	const { email, password } = req.body;
	// checking for required fields
	if (!email || !password) {
		resp.status(400).json({ error: "All Fields are Mandatory!" });
		return; // Add return to exit the function
	}
	// checking if user is registered, then compare password with hashPassword
	let user = await Student.findOne({ email }).populate("role");

	if (!user) {
		user = await Employee.findOne({ email }).populate("role");
	}

	if (user && user.password === password) {
		// create an accessToken for the user where user object passes info or payload which we want or need in the token
		// process.env.ACCESS_TOKEN_SECRET is used for embedded information
		// expiresIn is used for setting expire token time
		const accessToken = await jwt.sign(
			{
				user: {
					name: user.name,
					email: user.email,
					role: user.role,
				},
			},
			process.env.ACCESS_TOKEN_SECRET, // Fixed typo in ACCESS_TOKEN_SECRET
			{
				expiresIn: "2h",
			}
		);
		resp.status(200).json({
			accessToken,
			userData: user,
			success: true,
		});
	} else {
		resp.status(400).json({ error: "Email or Password is not Valid" });
	}
});

// logout  user
const logoutUser = asyncHandler(async (req, resp) => {
	const accessToken = req.headers.authorization.split(" ")[1];

	// Add the token to a blacklist or revocation list
	await addToRevocationList(accessToken);

	resp.status(200).json({ message: "Logged out successfully" });
});

module.exports = {
	loginUser,
	logoutUser,
};
