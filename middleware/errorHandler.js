// imports
const { ERROR_CODES, ERROR_TITLES } = require("../constants/errorConstants");

const errorHandler = (err, req, resp, next) => {
	const statusCode = resp.statusCode ? resp.statusCode : 500;
	switch (statusCode) {
		case ERROR_CODES.VALIDATION_ERROR:
			resp.json({
				title: ERROR_TITLES.VALIDATION_FAILED,
				message: err.message,
				stackTrace: err.stack,
			});
			break;
		case ERROR_CODES.NOT_FOUND:
			resp.json({
				title: ERROR_TITLES.NOT_FOUND,
				message: err.message,
				stackTrace: err.stack,
			});
			break;
		case ERROR_CODES.UNAUTHORIZED:
			resp.json({
				title: ERROR_TITLES.UNAUTHORIZED,
				message: err.message,
				stackTrace: err.stack,
			});
			break;
		case ERROR_CODES.FORBIDDEN:
			resp.json({
				title: ERROR_TITLES.FORBIDDEN,
				message: err.message,
				stackTrace: err.stack,
			});
			break;
		case ERROR_CODES.SERVER_ERROR:
			resp.json({
				title: ERROR_TITLES.SEVER_NOT_FOUND,
				message: err.message,
				stackTrace: err.stack,
			});
			break;
		default:
			resp.json({ error: ERROR_TITLES.NO_ERROR });
			break;
	}
};
module.exports = errorHandler;
