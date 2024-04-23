const jwt = require("jsonwebtoken");
const { isTokenRevoked } = require("./revocationList"); // Assuming you have the revocationList file

const authenticateUser = async (req, resp, next) => {
	const accessToken = req.headers.authorization.split(" ")[1];

	// Check if the token is in the list of revoked tokens
	if (await isTokenRevoked(accessToken)) {
		resp.status(401).json({ error: "Token has been revoked" });
	}

	try {
		// Verify the token and extract user information
		const decoded = await jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);
		req.user = decoded.user;
		next();
	} catch (error) {
		resp.status(401).json({ error: "Invalid Token" });
	}
};

module.exports = authenticateUser;
