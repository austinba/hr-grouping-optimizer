'use strict';
const Students = require('./Students');
const Student = require('./Student');

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
}

module.exports = Group;
// let group = new Group();
// group.add(new Student('amy'));

// console.log(group);