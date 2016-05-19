'use strict';
const util = require('./util');

class Students {
	constructor() {
		this.students = {};
		this._length = 0;
	}
	add(student) {
		this._length++;
		return this.students[student.name] = student;
	}
	drop(student) {
		this._length--;
		delete this.students[student.name];
		return student;
	}
	duplicate() {
		const students = new this.constructor();
		this.each(student => students.add(student));
		return students;
	}
	// pickRandom() {
	// 	return this.students[
	// 	  Object.keys(this.students)[
	// 	    Math.floor(Object.keys(this.students).length * Math.random())
	// 	  ]
	// 	];
	// }
	pick(count) { // returns an array of n randomly selected students
		const results = [];
		let students = this.toArray();
		console.log(students.length);
		util.loop(count, () => {
			results.push(util.dropRandomItemFromArray(students));
			console.log(students.length);
		});
		return results;
	}
	each(callback) {
		for(let name in this.students) {
			callback(this.students[name], name);
		}
	}
	toArray() {
		const arr = [];
		this.each(student => arr.push(student));
		return arr;
	}
	namesToArray() {
		const arr = [];
		this.each((student, name) => arr.push(name));
		return arr;
	}
	toString() {
		const colWidth = 12;
		const cols = 5;
		let i = 0;
		let str = '';
		this.each((student,name) => {
			str += util.formatStringLen(name, colWidth)
			str += i === this.length-1 ? '' : ((i+1) % cols === 0 ? '\n' : ' | ');
			i++;
		})
		return str;
	}
	get length() {
		return this._length;
	}
}

module.exports = Students;