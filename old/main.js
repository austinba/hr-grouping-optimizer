'use strict';
const util = require('./util');
const Student = require('./Student');
const Students = require('./Students');
const Group = require('./Group');
const Groups = require('./Groups');


let main = function() {
	const studentCount = 70;
	const groupSize = 4;

	// Create a list of students with randomized preferences
	const students = new Students();
	util.loop(studentCount, val => 
		students.add(new Student('Student ' + val)));
	students.each(student =>
		student.generateRandomPreferences(studentCount, groupSize, 10, students));

	console.log('Class with random preferences generated:')
	console.log(students.toString());

	// Create groups
	const groups = new Groups();
	util.loop(Math.ceil(studentCount/groupSize), () => groups.add(new Group()));

	// Randomly assign students to groups
	let unassignedStudents = students.toArray();
	util.loop(groupSize, () => {
		groups.each(group => {
			if(unassignedStudents.length > 0) {
				group.add(
					unassignedStudents.splice(util.randInt(unassignedStudents.length), 1)[0]);
			}
		});
	});


	console.log('\nGroups assigned randomly:');
	groups.each((group, index) => 
	console.log(util.formatStringLen('Group ' + index + ':', 11), group.toString()));
	console.log('Total Points in Starting Config:', groups.points());

}
main();


// haven't tested points computation completedly