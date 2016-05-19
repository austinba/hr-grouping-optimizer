'use strict';
const util = require('./util');
const forAStudentTowardAGroup = function(student, group) {
	let points = 0;
	util.forEachDefined(group, otherStudent => {
		if(otherStudent !== undefined && student !== otherStudent) {
			if(student.preferences.likes.indexOf(otherStudent.name) >= 0) points += 1;
			if(student.preferences.dislikesPers.indexOf(otherStudent.name) >= 0) points -= 2;
			if(student.preferences.dislikesTech.indexOf(otherStudent.name) >= 0) points -= 2;
			if(student.preferences.previousPairs.indexOf(otherStudent.name) >= 0) points -= 0.5;
			console.log(points);
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
const forAGroupConfiguration = function(groupsArray) {
	let points = 0;
	groupsArray.forEach(group => {
		points += this.forAGroup(group);
	});
	return points;
}

exports.forAStudentTowardAGroup = forAStudentTowardAGroup;
exports.forAGroup = forAGroup;
exports.forAGroupConfiguration = forAGroupConfiguration;
