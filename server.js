// imports
const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors"); // Add this line
const authenticateUser = require("./middleware/authenticateUser");
const app = express();
const port = process.env.PORT || 7000;
connectDb();
app.use(cors());
//passer for getting data from client to server side
app.use(express.json());

// setting Routes
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/staffs", require("./routes/staffRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/classes", require("./routes/classRoutes"));
app.use("/api/department", require("./routes/departmentRoutes"));
app.use("/api/subject", require("./routes/subjectRoutes"));
app.use("/api/login", require("./routes/loginRoutes"));

// localhost API listener
app.listen(port, () => {
	console.log("port=", port);
});
