'use strict';
const Students = require('./Students');
const Student = require('./Student');

class Group extends Students{
	constructor() {
		super();
	}
}

// let group = new Group();
// group.add(new Student('amy'));

// console.log(group);