'use strict';
const Students = require('./Students');
const Student = require('./Student');
const objFn = require('./objectiveFunction');
const util = require('./util');

class Group extends Students{
	constructor() {
		super();
	}
	points() {
		return objFn.forAGroup(this.toArray());
	}
	toString() {
		return util.formatStringLen('Points(' + this.points() + ')', 15) + '|| ' + super.toString();
	}
}
module.exports = Group;