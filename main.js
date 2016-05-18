'use strict';
const util = require('./util');
const Student = require('./Student');
const Students = require('./Students');
const Group = require('./Group');

let main = function() {
	const studentCount = 70;
	const groupSize = 4;

	// Ceate a list of students with randomized preferences
	const students = new Students();
	util.range(studentCount).forEach((val) => 
		students.add(new Student('Student ' + val)));
	students.each(student =>
		student.generateRandomPreferences(studentCount, groupSize, 10, students));

	// Optimize Groupings
}
main();