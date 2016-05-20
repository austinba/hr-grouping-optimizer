'use strict';
const util = require('./util');
const forAStudentTowardAGroup = function(student, group) {
	let points = 0;
	util.forEachDefined(group, otherStudent => {
		if(otherStudent !== undefined && student !== otherStudent) {
			if(student.likes.indexOf(otherStudent.id) >= 0) points += 1;
			if(student.dislikesPers.indexOf(otherStudent.id) >= 0) points -= 2;
			if(student.dislikesTech.indexOf(otherStudent.id) >= 0) points -= 2;
			if(student.previousPairs.indexOf(otherStudent.id) >= 0) points -= 0.5;
		}
	});
	return points;
}
const forAGroup = function(group) {
	let points = 0;
	util.forEachDefined(group, student => {
		points += this.forAStudentTowardAGroup(student, group);
	});
	return points;
}
const forAGroupConfig = function(groupsArray) {
	let points = 0;
	groupsArray.forEach(group => {
		points += this.forAGroup(group);
	});
	return points;
}

exports.forAStudentTowardAGroup = forAStudentTowardAGroup;
exports.forAGroup = forAGroup;
exports.forAGroupConfig = forAGroupConfig;
