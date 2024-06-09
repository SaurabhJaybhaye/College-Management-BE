// utils/removeClassFromCourse.js
const Class = require("../models/classModel");
const Department = require("../models/departmentModel");

async function removeCourseFromDepartment(courseId, departmentId) {
	try {
		const department = await Department.findById(departmentId);
		if (!department) {
			throw new Error("Department not found");
		}
		department.courses = department.courses.filter(
			(c) => c.toString() !== courseId.toString()
		);
		await department.save();
	} catch (error) {
		throw new Error(
			`Failed to remove course from department: ${error.message}`
		);
	}
}

async function deleteClassesOnCourseDelete(courseId) {
	try {
		// Find all classes associated with the course
		const classesToDelete = await Class.find({ course: courseId });

		// Delete each class
		for (const cls of classesToDelete) {
			await Class.findByIdAndDelete(cls._id);
		}

		return classesToDelete.length; // Return the number of classes deleted
	} catch (error) {
		throw new Error(`Failed to delete classes: ${error.message}`);
	}
}

async function updateDepartmentWithNewCourse(courseId, departmentId) {
	try {
		const department = await Department.findById(departmentId);
		if (!department) {
			throw new Error("Department not found");
		}
		department.courses.push(courseId);
		await department.save();
	} catch (error) {
		throw new Error(`Failed to update department: ${error.message}`);
	}
}

module.exports = {
	removeCourseFromDepartment,
	updateDepartmentWithNewCourse,
	deleteClassesOnCourseDelete,
};
