'use strict';
const Students = require('./Students');
const Student = require('./Student');
const util = require('./util');

class Group extends Students{
	constructor() {
		super();
	}
	points() {
		const self = this;
		let points = 0;
		this.each(studentA => {
			self.each(studentB => {
				if(studentA !== studentB) {
					// console.log(studentA.name, ':', studentB.name);
					points += studentA.pointsWhenGroupedWith(studentB);
				}
			});
		});
		return points;
	}
	toString() {
		return util.formatStringLen('Points(' + this.points() + ')', 15) + '|| ' + super.toString();
	}
}
module.exports = Group;
// let group = new Group();
// group.add(new Student('amy'));

// console.log(group);