'use strict';
const util = require('./util');

class Student {
	constructor(name) {
		this._name = name;
		// instatiate preferences
		this._preferences = {
			likes: [],
			dislikesPers: [],
			dislikesTech: [],
			previousPairs: []
		};
	}
	generateRandomPreferences(classSize, countPrevPairs, maxPrefListSize, students) {
		const setPreferencesFromStudentList = prefs => {
			const unassignedStudents = students.toArray();
			prefs.forEach(category => {
		  	const cat = category[0];
		  	const listsize = category[1];
		  	// TODO: pick from a list of students, prevent repicks
		  	this._preferences[cat] = util.range(listsize).map(() =>
		  		unassignedStudents.splice(util.randInt(unassignedStudents.length), 1));
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