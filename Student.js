'use strict';
const util = require('./util');

class Student {
	constructor(name) {
		this._name = name;
		// instatiate preferences
		this.preferences = {
			likes: [],
			dislikesPers: [],
			dislikesTech: [],
			previousPairs: []
		};
	}
	pointsWhenGroupedWith(student) {
		let points = 0;
		if(this.preferences.likes.indexOf(student.name) >= 0) points += 1;
		if(this.preferences.dislikesPers.indexOf(student.name) >= 0) points -= 2;
		if(this.preferences.dislikesTech.indexOf(student.name) >= 0) points -= 2;
		if(this.preferences.previousPairs.indexOf(student.name) >= 0) points -= 0.25;
		// console.log(' ', points);
		return points;
	}
	generateRandomPreferences(classSize, countPrevPairs, maxPrefListSize, students) {
		const setPreferencesFromStudentList = prefs => {
			const unassignedStudents = students.namesToArray();
			prefs.forEach(category => {
		  	const cat = category[0];
		  	const listsize = category[1];
		  	// TODO: pick from a list of students, prevent repicks
		  	this.preferences[cat] = util.range(listsize).map(() =>
		  		unassignedStudents.splice(util.randInt(unassignedStudents.length), 1)[0]);
		  }); 
		};
		setPreferencesFromStudentList(
			[['likes', util.randInt(maxPrefListSize+1)],
		 	 ['dislikesPers', util.randInt(maxPrefListSize+1)], 
		 	 ['dislikesTech', util.randInt(maxPrefListSize+1)]]
		);
		setPreferencesFromStudentList([['previousPairs', countPrevPairs]]);
		return this;
	}
	get name() {
		return this._name;
	}
}

module.exports = Student;