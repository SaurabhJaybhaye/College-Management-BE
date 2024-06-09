const multer = require("multer");

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Export the middleware for use in routes
const uploadMiddleware = upload.single("file");

module.exports = uploadMiddleware;
