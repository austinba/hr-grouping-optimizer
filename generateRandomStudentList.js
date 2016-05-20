'use strict';
const util = require('./util');
const groupSize = 4;
const classSize = 70;

const generateRandomPreferences = function() {
	// Generate students list with random preferences (replace with import)
	const studentIds = util.range(70);
	const studentNames = studentIds.map(i => 'Student ' + i);
	const studentPrefs = studentNames.map((name,id)=> ({id, name}));

	studentPrefs.forEach(student => {
		let unassignedStudents = studentIds.slice();
		const thisStudentId = unassignedStudents.indexOf(student.id);
		if(thisStudentId>=0) unassignedStudents.splice(thisStudentId,1); // don't pick current student
		student.previousPairs = util.dropNRandomItemsFromArray(unassignedStudents.slice(), util.randInt(12)); // prev pair can be on other lists
		student.likes = util.dropNRandomItemsFromArray(unassignedStudents, util.randInt(8));
		student.dislikesPers = util.dropNRandomItemsFromArray(unassignedStudents, util.randInt(12));
		student.dislikesTech = util.dropNRandomItemsFromArray(unassignedStudents, util.randInt(12));
	})
	return studentPrefs;
};
let prefs = generateRandomPreferences();
console.log(JSON.stringify(prefs, null, 2))