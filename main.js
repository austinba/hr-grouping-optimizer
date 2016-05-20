'use strict';
const util = require('./util');
const objFn = require('./objectiveFunction');
const students = require('./exampleStudentLists/relaxed.json')

let _incTemps = [];  // used only to 
// annealing parameters: optimize these by checking at what temperatures bests are being hit
const startTemp = 3.5;
const endTemp = .05;
const iterations = 100000;
const groupSize = 4;

// OPTIMIZER
const optimizer = function() {
	// Start with a completely randomized group configuration
  const groupConfig = randomizeGroupConfig(students);

  // Initialize variables for annealing / optimization
	let bestConfig = util.deepCopyArray(groupConfig);
	let bestScore = objFn.forAGroupConfig(bestConfig);
	const decrement = Math.exp(Math.log(startTemp / endTemp) / iterations);

	for(let i=0; i<iterations; i++) {
		const currentTemp = startTemp / Math.pow(decrement, i);
		randomlySwapTwoStudentsFromDifferentGroups(groupConfig, currentTemp);
		const score = objFn.forAGroupConfig(groupConfig);

		// Save best scoring group configuration
		if(score > bestScore) {
			bestScore = score;
			bestConfig = util.deepCopyArray(groupConfig);
			_incTemps.push(currentTemp);
			console.log(score, currentTemp);
		} 
	}
	// For Optimizing Annealing Parameters: Output temperatures where improvements happened
	// console.log(JSON.stringify(__incTemps))
	return bestScore;
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

const randomlySwapTwoStudentsFromDifferentGroups = function(groupConfiguration, currentTemp) {
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
  if (newCasePoints < baseCasePoints && // keep all where better
  	  Math.random() > Math.exp(-(baseCasePoints-newCasePoints)/currentTemp)) // keep sometimes when worse, depending on how much worse and temperature
  {
		let temp = groupConfiguration[group1][student1];
	  groupConfiguration[group1][student1] = groupConfiguration[group2][student2];
		groupConfiguration[group2][student2] = temp;  	
  }
}

optimizer();

// let res = util.range(50).map(() => main2());
// console.log(res);
// console.log('average:', res.reduce((memo, val) => memo + val)/2);