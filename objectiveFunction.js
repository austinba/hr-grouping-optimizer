'use strict';

const forAGroup = function(studentsArray) {
	let points = 0;
	studentsArray.forEach(student => {
		points += this.forAStudentTowardAGroup(student, studentsArray);
	});
	return points;
}
const forAStudentTowardAGroup = function(student, studentsArray) {
	let points = 0;
	studentsArray.forEach(otherStudent => {
		if(student !== otherStudent) {
			if(student.preferences.likes.indexOf(otherStudent.name) >= 0) points += 1;
			if(student.preferences.dislikesPers.indexOf(otherStudent.name) >= 0) points -= 2;
			if(student.preferences.dislikesTech.indexOf(otherStudent.name) >= 0) points -= 2;
			if(student.preferences.previousPairs.indexOf(otherStudent.name) >= 0) points -= 0.5;
		}
	});
	return points;
}

exports.forAGroup = forAGroup;
exports.forAStudentTowardAGroup = forAStudentTowardAGroup;
