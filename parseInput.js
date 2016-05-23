'use strict';
const fs = require('fs');
const LIKE = 'I would especially enjoy working with this person.'
const DISLIKETECH = 'I would refuse to work with this person, due to THEIR TECHNICAL ABILITIES';
const DISLIKEPERS = 'I would refuse to work with this person, due to OUR INTERPERSONAL ISSUES';

const loadFile = function(path) {
	let preferences = [];
	let firstRow;
	let lastRow;
	let result = [];
	let contents =[];

	// Load file
	try {
		contents = CSVToArray(fs.readFileSync(path).toString());
	} catch (e) {
		console.error('Error loading file', '"'+path+'"');
	}
	if(!contents) {
		console.error('Error converting CSV for file', '"'+path+'"');
		return [];
	}

	// Find beginning and end of dataset and truncate contents[] to those rows
	let row = 0;
	while(contents[row][0] === '') {
		row++;
	}
	firstRow = row;
	while(contents[row] !== undefined && contents[row][0] !== '') {
		row++;
	}
	lastRow = row-1;
	contents = contents.slice(firstRow, lastRow);

	// convert to objects
	contents.forEach((row, index) => {
		let student = {};
		student.id = index;
		student.name = row[0];
		student.likes = [];
		student.dislikesPers = [];
		student.dislikesTech = [];
		student.previousPairs = []; // not used, but part of optimization algorithm
		row.slice(1).forEach((item, i) => {
			if(item.includes(LIKE)) student.likes.push(i);
			if(item.includes(DISLIKEPERS)) student.dislikesPers.push(i);
			if(item.includes(DISLIKETECH)) student.dislikesTech.push(i);
		});
		result.push(student);
	});
	return result;
}

// Return array of string values, or NULL if CSV string not well formed.
// Source: http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
function CSVToArray( strData, strDelimiter ){
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r?\\n]*))"
        ),
        "gi"
        );
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec( strData )){
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            arrData.push( [] );
        }
        var strMatchedValue;
        if (arrMatches[ 2 ]){
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    return( arrData );
}



module.exports = loadFile;