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
	pickRandom() {
		return this.students[
		  Object.keys(this.students)[
		    Math.floor(Object.keys(this.students).length * Math.random())
		  ]
		];
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