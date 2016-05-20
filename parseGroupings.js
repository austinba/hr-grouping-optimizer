'use strict';
const objFn = require('./objectiveFunction');
const util = require('./util.js');
const columnWidth = 16;

const parseAllGroupingOptions = function(groupingOptions) {
		// Pretty headers & footers for output
	console.log('\n\n');
	console.log('+==========================================================================================================================+');
	console.log('+                                           GROUPING OPTIONS (SORTED BY POINTS)                                            +');
	console.log('+==========================================================================================================================+\n');
	groupingOptions.forEach((grouping, i) => {
		console.log('============================================================================================================================');
		console.log('=============================================== Grouping ' + util.formatStringLen(i+1, 2) + 
			'(' + util.formatStringLen(objFn.forAGrouping(grouping)+0.0001, 4) + ' Points) ===================================================');
		console.log(parseGrouping(grouping));
	console.log('============================================================================================================================\n\n');
	});
}
// PARSE GROUPING: Display groupings in an intelligible way
const parseGrouping = function(grouping) {
	const headers = ['GROUP', 'STUDENT', 'STUDENT ID', '#PREV PAIRS', '#LIKES', '#DISLIKES TECH', '#DISLIKES PERS'];
	const separator = headers.map(() => '------------------------')
	const table = [];
	table.push(headers);

	grouping.forEach((group, groupID)=> {
		table.push(separator);
		group.forEach((student, i) => {
			const row = [];
			if(i === 0) {
				row.push('Group ' + groupID);
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

			row.push((nPrevPairs || '-') + ' / ' + (student.previousPairs.length || '-'));
			row.push((nLikes || '-') + ' / ' + (student.likes.length || '-'));
			row.push((nDislikesTech || '-') + ' / ' + (student.dislikesTech.length || '-'));
			row.push((nDislikesPers || '-') + ' / ' + (student.dislikesPers.length || '-'));
			table.push(row);
		})
	});
	return table.map(row => row.map(value => util.formatStringLen(value, columnWidth)).join('| ')).join('\n'); 
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
module.exports.allGroupings = parseAllGroupingOptions;
module.exports.singleGrouping = parseGrouping;