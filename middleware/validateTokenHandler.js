const { ERROR_TITLES } = require("../constants/errorConstants");

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (params, req, resp, next) => {
	let token;
	let authHeader = req.headers.authorization || req.headers.Authorization;
	if (authHeader && authHeader.startsWith("Bearer")) {
		token = authHeader.split(" ")[1];

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				resp.status(401).json({ error: ERROR_TITLES.UNAUTHORIZED_TOKEN });
			}
			req.user = decoded.user;
			const user_has_permissions =
				req.user.role.permissions.includes(params) ||
				req.user.role.permissions.includes("*");
			if (!user_has_permissions) {
				resp.status(403).json({ error: ERROR_TITLES.FORBIDDEN });
			}
			next();
		});
	}
	if (!token) {
		resp.status(401).json({ error: ERROR_TITLES.MISSING_TOKEN });
	}
});

module.exports = validateToken;
