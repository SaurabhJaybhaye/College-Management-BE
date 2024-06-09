// imports
const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const cors = require("cors"); // Add this line
const app = express();
const port = process.env.PORT || 7000;
connectDb();
app.use(cors());
//passer for getting data from client to server side
// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/classes", require("./routes/classesRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/employee", require("./routes/employeeRoute"));
app.use("/api/employeeTypes", require("./routes/employeeTypeRoute"));
app.use("/api/login", require("./routes/loginRoutes"));

// localhost API listener
app.listen(port, () => {
	console.log("port=", port);
});
