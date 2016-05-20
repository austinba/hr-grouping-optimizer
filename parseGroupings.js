const grouping = require('./exampleGrouping1.json');
const util = require('./util.js');

// PARSE GROUPING: Display groupings in an intelligible way
const parseGrouping = function(grouping) {
	const headers = ['GROUP', 'STUDENT', 'STUDENT ID', '#PREV PAIRS', '#LIKES', '#DISLIKES TECH', '#DISLIKES PERS'];
	const columnWidths = [7, 12, 15, 15, 15, 15];
	const table = [];
	table.push(headers);

	grouping.forEach((group, groupID)=> group.forEach(student => {
		const row = ['Group ' + groupID, student.name, student.id];
		row.push('? / ' + student.previousPairs.length);
		row.push('? / ' + student.likes.length);
		row.push('? / ' + student.dislikesTech.length);
		row.push('? / ' + student.dislikesPers.length);
		table.push(row);
	}))


	console.log(table.map(row => row.map(value => util.formatStringLen(value, 16)).join('| ')).join('\n')) 
}
module.exports = parseGrouping;

parseGrouping(grouping);