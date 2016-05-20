'use strict';
const grouping = require('./exampleGrouping1.json');
const objFn = require('./objectiveFunction');
const util = require('./util.js');

// PARSE GROUPING: Display groupings in an intelligible way
const parseGrouping = function(grouping) {
	const headers = ['GROUP', 'STUDENT', 'STUDENT ID', '#PREV PAIRS', '#LIKES', '#DISLIKES TECH', '#DISLIKES PERS'];
	const separator = headers.map(() => '------------------------')
	const columnWidths = [7, 12, 15, 15, 15, 15];
	const table = [];
	table.push(headers);

	grouping.forEach((group, groupID)=> {
		table.push(separator);
		group.forEach((student, i) => {
			const row = [];
			if(i === 0) {
				row.push(' Group ' + groupID);
			} else if (i === 1) {
				row.push('(' + objFn.forAGroup(group) + ' Points)');
			} else {
				row.push('');
			}
			row.push(student.name);
			row.push(student.id);

			const nPrevPairs = countInGroup(student, group, 'previousPairs');
			const nLikes = countInGroup(student, group, 'likes');
			const nDislikesTech = countInGroup(student, group, 'dislikesTech');
			const nDislikesPers = countInGroup(student, group, 'dislikesPers');

			row.push((nPrevPairs || '-') + ' / ' + student.previousPairs.length);
			row.push((nLikes || '-') + ' / ' + student.likes.length);
			row.push((nDislikesTech || '-') + ' / ' + student.dislikesTech.length);
			row.push((nDislikesPers || '-') + ' / ' + student.dislikesPers.length);
			table.push(row);
		})
	});
	return table.map(row => row.map(value => util.formatStringLen(value, 16)).join('| ')).join('\n'); 
}
const countInGroup = function(student, group, category) {
	let count = 0;
	group.forEach(otherStudent => {
		if(student !== otherStudent && student[category].indexOf(otherStudent.id) >= 0) {
			count++;
		}
	});
	return count;
}
module.exports = parseGrouping;