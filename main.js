'use strict';
const util = require('./util');
const Student = require('./Student');
const Students = require('./Students');
const Group = require('./Group');


let main = function() {
	const studentCount = 70;
	const groupSize = 4;

	// Create a list of students with randomized preferences
	const students = new Students();
	util.range(studentCount).forEach((val) => 
		students.add(new Student('Student ' + val)));
	students.each(student =>
		student.generateRandomPreferences(studentCount, groupSize, 10, students));

	// Create groups
	const groups = [];
	util.loop(Math.ceil(studentCount/groupSize), () => groups.push(new Group()));

	// Randomly assign students to groups
	let unassignedStudents = students.toArray();
	util.loop(groupSize, () => {
		groups.forEach(group => {
			if(unassignedStudents.length > 0) {
				group.add(
					unassignedStudents.splice(util.randInt(unassignedStudents.length), 1)[0]);
			}
		});
	});

	// Compute points by group
	console.log(groups.map(group => group.points()));
}
main();