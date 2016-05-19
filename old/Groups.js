'use strict';
const util = require('./util');
class Groups {
	constructor() {
		this._length = 0;
		this.groups = [];
	}
	add(group) {
		this.groups.push(group);
	}
	each(callback) {
		this.groups.forEach(callback);
	}
	points() {
		let points = 0;
		this.each(group => points += group.points());
		return points;
	}
	pick(count) { // returns an array of n randomly selected groups
		const results = [];
		let groups = this.groups.slice();
		util.loop(count, () => results.push(util.dropRandomItemFromArray(groups)));
		return results;
	}
	get length() {
		return this._length;
	}
}

module.exports = Groups;