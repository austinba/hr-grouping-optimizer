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
	generateRandomPreferences(classSize, countPrevPairs, maxPrefListSize, students) {
		const setPreferencesFromStudentList = prefs => {
			const unassignedStudents = students.namesToArray();
			prefs.forEach(category => {
		  	const cat = category[0];
		  	const listsize = category[1];
		  	// TODO: pick from a list of students, prevent repicks
		  	this.preferences[cat] = util.range(listsize).map(() =>
		  		util.dropRandomItemFromArray(unassignedStudents));
		  }); 
		};
		// choose likes, personal dislikes, and technical dislikes from same student set
		setPreferencesFromStudentList(
			[['likes', util.randInt(maxPrefListSize+1)],
		 	 ['dislikesPers', util.randInt(maxPrefListSize+1)], 
		 	 ['dislikesTech', util.randInt(maxPrefListSize+1)]]
		);
		// choose previous pairs from different dataset
		setPreferencesFromStudentList([['previousPairs', countPrevPairs]]);
		return this;
	}
	get name() {
		return this._name;
	}
}

module.exports = Student;