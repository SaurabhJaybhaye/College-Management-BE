// utils/removeClassFromCourse.js
const Course = require("../models/courseModel");

async function removeClassFromCourse(courseId, classId) {
	try {
		const course = await Course.findById(courseId);
		if (!course) {
			throw new Error("Course not found");
		}
		course.classes = course.classes.filter(
			(c) => c.toString() !== classId.toString()
		);
		await course.save();
	} catch (error) {
		throw new Error(`Failed to remove class from course: ${error.message}`);
	}
}

async function updateCourseWithNewClass(courseId, classId) {
	try {
		const course = await Course.findById(courseId);
		if (!course) {
			throw new Error("Course not found");
		}
		course.classes.push(classId);
		await course.save();
	} catch (error) {
		throw new Error(`Failed to update course: ${error.message}`);
	}
}

module.exports = { removeClassFromCourse, updateCourseWithNewClass };
