const Student = require("../models/studentModel"); // Update with your actual model path
const Role = require("../models/roleModel"); // Update with your actual model path
const Class = require("../models/classModel"); // Update with your actual model path
const Course = require("../models/courseModel"); // Update with your actual model path
const Department = require("../models/departmentModel"); // Update with your actual model path
const Subject = require("../models/subjectModel");
const EmployeeType = require("../models/employeeTypeModel");
const Employee = require("../models/employeeModel");
const seedDatabase = async () => {
	try {
		// Check if initial data exists
		const studentsCount = await Student.countDocuments();
		const rolesCount = await Role.countDocuments();
		const classesCount = await Class.countDocuments();
		const coursesCount = await Course.countDocuments();
		const departmentsCount = await Department.countDocuments();
		const subjectCount = await Subject.countDocuments();
		const employeeTypeCount = await EmployeeType.countDocuments();
		const employeeCount = await Employee.countDocuments();
		let departmentResp = "";
		let courseResp = "";

		// Seed roles
		if (rolesCount === 0) {
			const roles = [
				{
					name: "SuperAdmin",
					permissions: ["*"],
					isRoleDeleted: false,
				},
				{
					name: "Student",
					permissions: [
						"READ_COURSE",
						"READ_SUBJECT",
						"READ_CLASS",
						"READ_DEPARTMENT",
					],
					isRoleDeleted: false,
				},
			];
			await Role.insertMany(roles);
		}

		// Seed departments
		if (departmentsCount === 0) {
			const departments = [{ name: "MCA", courses: [] }];
			departmentResp = await Department.insertMany(departments);
		}

		// Seed courses
		if (coursesCount === 0) {
			const courses = [
				{ name: "MCA AI ML Course", department: departmentResp[0]._id },
			];
			courseResp = await Course.insertMany(courses);
		}

		// Seed classes
		if (classesCount === 0) {
			const classes = [{ name: "MCA FY", course: courseResp[0]._id }];
			await Class.insertMany(classes);
		}

		// Seed EmployeeType
		if (employeeTypeCount === 0) {
			const employeeType = [{ title: "Teacher" }];
			await EmployeeType.insertMany(employeeType);
		}

		// Seed Subject
		if (subjectCount === 0) {
			const subject = [{ name: "DSA" }];
			await Subject.insertMany(subject);
		}

		// Seed students
		if (studentsCount === 0) {
			const students = [
				{
					name: "Shubham",
					image: "",
					email: "shubham@demo.com",
					password: "Shubham@123",
					phone: "1234567899",
					address: "Pune",
					gender: "Male",
					dateOfBirth: "1998-07-03T00:00:00.000Z",
					PRN: "01",
					role: await Role.findOne({ name: "Student" }),
					class: await Class.findOne({ name: "MCA FY" }),
					course: await Course.findOne({ name: "MCA AI ML Course" }),
					department: await Department.findOne({ name: "MCA" }),
				},
			];
			await Student.insertMany(students);
		}

		// Seed Employee
		if (employeeCount === 0) {
			const employee = [
				{
					name: "Saurabh",
					image: "",
					email: "saurabh@demo.com",
					password: "Saurabh@123",
					phone: "7219191098",
					address: "Pune",
					gender: "Male",
					dateOfBirth: "1999-02-05T00:00:00.000Z",
					joiningDate: "1999-07-03T00:00:00.000Z",
					HOD: true,
					role: await Role.findOne({ name: "SuperAdmin" }),
					class: await Class.findOne({ name: "MCA FY" }),
					course: await Course.findOne({ name: "MCA AI ML Course" }),
					department: await Department.findOne({ name: "MCA" }),
				},
			];
			await Employee.insertMany(employee);
		}

		console.log("Database seeded successfully");
	} catch (error) {
		console.error("Error seeding database:", error);
	}
};

module.exports = seedDatabase;
