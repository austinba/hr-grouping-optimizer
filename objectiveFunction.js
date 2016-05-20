'use strict';
const util = require('./util');

const pointsForLike = 1;             // Default: 1
const pointsForDislikePers = -2;     // Default: -2
const pointsForDislikeTech = -2;     // Default: -2
const pointsForPreviousPairs = -0.5; // Default: -0.5

const forAStudentTowardAGroup = function(student, group) {
	let points = 0;
	util.forEachDefined(group, otherStudent => {
		if(otherStudent !== undefined && student !== otherStudent) {
			if(student.likes.indexOf(otherStudent.id) >= 0) points += pointsForLike;
			if(student.dislikesPers.indexOf(otherStudent.id) >= 0) points += pointsForDislikePers;
			if(student.dislikesTech.indexOf(otherStudent.id) >= 0) points += pointsForDislikeTech;
			if(student.previousPairs.indexOf(otherStudent.id) >= 0) points += pointsForPreviousPairs;
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
const forAGrouping = function(groupsArray) {
	let points = 0;
	groupsArray.forEach(group => {
		points += this.forAGroup(group);
	});
	return points;
}

exports.forAStudentTowardAGroup = forAStudentTowardAGroup;
exports.forAGroup = forAGroup;
exports.forAGrouping = forAGrouping;
