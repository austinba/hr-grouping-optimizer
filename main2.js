'use strict';
const Student = require('./Student2');
const util = require('./util');
const objFn = require('./objectiveFunction');
const groupSize = 4;
const classSize = 70;

const main2 = function() {

	// Generate students list with random preferences (replace with import)
	const students = util.range(70).map(i => new Student('Student '+i));
	util.forEachDefined(students, student =>
		student.generateRandomPreferences(classSize, 12, 10, students)); // 12 previous pairs, 10 max prefs per category

  // Randomly place students into groups
  // groupConfiguration[group#][student#]
  let unassignedStudents = students.slice();
	const groupCount = Math.ceil(classSize / groupSize);
  const groupConfiguration = util.range(groupCount).map(() => []);
	for (let j=0; j<groupSize; j++) {
		for (let i=0; i<groupCount && i*j<classSize; i++) {
			groupConfiguration[i]
			  .push(util.dropRandomItemFromArray(unassignedStudents));
		}
	}

	console.log(groupConfiguration);
	console.log(objFn.forAGroupConfiguration(groupConfiguration));

};

main2();