const Course = require("../models/courseModel");
const Class = require("../models/classModel");

async function removeCourseAndClassOnDeletion(departmentId) {
	try {
		// Find all courses in the department
		const coursesToDelete = await Course.find({ department: departmentId });

		// Extract course IDs for further deletion
		const courseIds = coursesToDelete.map((course) => course._id);

		// Delete all classes associated with the courses
		await Class.deleteMany({ course: { $in: courseIds } });

		// Delete all courses in the department
		const result = await Course.deleteMany({ department: departmentId });

		return result.deletedCount; // Return the number of courses deleted
	} catch (error) {
		throw new Error(
			`Failed to delete course from department: ${error.message}`
		);
	}
}

module.exports = {
	removeCourseAndClassOnDeletion,
};
