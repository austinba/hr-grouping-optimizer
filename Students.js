'use strict';

class Students {
	constructor() {
		this.students = {};
		this._length = 0;
	}
	add(student) {
		this._length++;
		return this.students[student.name] = student;
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
	get length() {
		return this._length;
	}
}

module.exports = Students;