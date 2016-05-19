'use strict';
const util = require('./util');
const groupSize = 4;
const classSize = 70;

const generateRandomPreferences = function() {

	// Generate students list with random preferences (replace with import)
	const studentNames = util.range(70).map(i => 'Student ' + i);
	const studentPrefs = studentNames.map(() => ({}));
	let unassignedStudents = studentNames.slice();
	studentPrefs.forEach((student, index) => {
		studentPrefs[i].likes = util.dropNRandomItemsFromArray(unassignedStudents, util.randInt(11));
	})
	// console.log(studentPrefs);
};
generateRandomPreferences(studentPrefs);