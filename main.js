'use strict';
const util = require('./util');
const objFn = require('./objectiveFunction');
const students = require('./exampleStudentLists/1.json')
const groupSize = 4;

// annealing parameters
const startTemp = 1000;
const endTemp = 0.1;
const k = 1;
const iterations = 100000;

const main2 = function() {
  const groupConfig = randomizeGroupConfig(students); // Group Configuration: listing of all groups and contained students groupConfig[group][student]

  // optimization loop
	let bestConfig = util.deepCopyArray(groupConfig);
	let bestScore = objFn.forAGroupConfig(bestConfig);

	let currentTemp = startTemp;
	const decrement = (startTemp - endTemp) / iterations;
	for(let i=0; i<iterations; i++) {
		// test a random student swap
		randomlySwapTwoStudentsFromDifferentGroups(groupConfig, Math.exp(-k/currentTemp));
		currentTemp -= decrement;

		let score = objFn.forAGroupConfig(groupConfig);
		if(score > bestScore) { // check if this is the best score so far
			bestScore = score;
			bestConfig = util.deepCopyArray(groupConfig);
			console.log(score+0.1, Math.exp(-k/currentTemp));
		}
	}
	return(bestScore);
};

const randomizeGroupConfig = function(students) {
// generates an initial random group configuration from an array of students
  let unassignedStudents = students.slice();  // copy students array
	const groupCount = Math.ceil(students.length / groupSize);

	// create 2D array and populate
  const groupConfiguration = util.range(groupCount).map(() => []);
	for (let j=0; j<groupSize; j++) {
		for (let i=0; i<groupCount && i*j<students.length; i++) {
			groupConfiguration[i]
			  .push(util.dropRandomItemFromArray(unassignedStudents));
		}
	}
	return groupConfiguration;
}

const randomlySwapTwoStudentsFromDifferentGroups = function(groupConfiguration, probOfKeepingWorseResult) {
	const groupCount = groupConfiguration.length;
	const group1 = util.randInt(groupCount);
	let group2 = util.randInt(groupCount - 1);
	group2 = group2<group1 ? group2 : group2+1; // choice2 !== choice1
	const student1 = util.randInt(groupSize);
	const student2 = util.randInt(groupSize);

	// check base case points
	const baseCasePoints = objFn.forAGroup(groupConfiguration[group1]) +
		                     objFn.forAGroup(groupConfiguration[group2]);

	// swap students
	let temp = groupConfiguration[group1][student1];
	groupConfiguration[group1][student1] = groupConfiguration[group2][student2];
  groupConfiguration[group2][student2] = temp;

  // check points in both groups
	const newCasePoints = objFn.forAGroup(groupConfiguration[group1]) +
		                     objFn.forAGroup(groupConfiguration[group2]);

  // unswap if not desired
  if (newCasePoints < baseCasePoints && Math.random() < probOfKeepingWorseResult) {
		let temp = groupConfiguration[group1][student1];
		groupConfiguration[group1][student1] = groupConfiguration[group2][student2];
	  groupConfiguration[group2][student2] = temp;  	
  }
}

main2();

// let res = util.range(50).map(() => main2());
// console.log(res);
// console.log('average:', res.reduce((memo, val) => memo + val)/2);