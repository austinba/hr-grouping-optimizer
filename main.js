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

	// let grp = new Group();
	// grp.add(new Student('austin'));
	// grp.add(new Student('ben'));
	// let grp2 = new Group();
	// grp2.add(new Student('jordan'));
	// grp2.add(new Student('carl'));
	// let grp3 = new Group();
	// grp3.add(new Student('toby'));
	// grp3.add(new Student('mac'));

	// let grps = new Groups();
	// grps.add(grp);
	// grps.add(grp2);
	// grps.add(grp3);
	// console.log(grps.pick(1));
	// console.log('\n');
	// console.log('Groups assigned randomly:');
	// groups.each((group, index) => 
	// console.log(util.formatStringLen('Group ' + index + ':', 11), group.toString()));
	// console.log('Total Points in Starting Config:', groups.points());
	// let stud = groups[0].pickRandom();
	// console.log(stud);
	// groups[0].drop(stud);
	// console.log(groups[0]);
	// Compute points by group
	//console.log(groups.map(group => group.points()));
}
main();


// haven't tested points computation completedly