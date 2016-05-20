'use strict';
const util = require('./util');
const objFn = require('./objectiveFunction');

// Annealing Parameters
const startTemp = 350;
const endTemp = 5;
const iterations = 100000;
const runCount = 10;
let _incTemps = [];  // tracker for temps where improvements happened -- for optimizing paraameters


const students = require('./exampleStudentLists/relaxed.json')
const groupSize = 4;

const main = function(runCount, students, groupSize) {
	let groupingOptions = [];
	for(let i=0; i<runCount; i++) {
		console.log('Generating Grouping Option #' + i)
		groupingOptions.push(optimizer(students, groupSize));
		console.log('\n');
	}
	groupingOptions = groupingOptions.sort((groupingA, groupingB) => objFn.forAGroupConfig(groupingA)<objFn.forAGroupConfig(groupingB));
	console.log('Points:', groupingOptions.map(grouping => objFn.forAGroupConfig(grouping)));
}

// OPTIMIZER inputs: 'students' array of preferences and 'groupSize'
const optimizer = function(students, groupSize) {

	// Start with a completely randomized group configuration
  const groupConfig = randomizeGroupConfig(students, groupSize);

  // Initialize variables for annealing / optimization
	let bestConfig = util.deepCopyArray(groupConfig);
	let bestScore = objFn.forAGroupConfig(bestConfig);
	const decrement = Math.exp(Math.log(startTemp / endTemp) / iterations);

	// Loop while randomly swapping students and decreasing temperature (represents probability of taking a sub-optimal swap)
	process.stdout.write('Current Best Score:  ');
	for(let i=0; i<iterations; i++) {
		const currentTemp = startTemp / Math.pow(decrement, i);
		randomlySwapTwoStudentsFromDifferentGroups(groupConfig, currentTemp);
		const score = objFn.forAGroupConfig(groupConfig);

		// Save best scoring group configuration
		if(score > bestScore) {
			bestScore = score;
			bestConfig = util.deepCopyArray(groupConfig);
			_incTemps.push(currentTemp);
			process.stdout.write(score + '(' + Math.round(currentTemp) + '°)  ');
		} 
	}
	// For Optimizing Annealing Parameters: Output temperatures where improvements happened
	// console.log(JSON.stringify(__incTemps))
	return bestConfig;
};


//--------------------------------
//TODO:  Do not allow swaps that put two undefineds in the same group
//--------------------------------

// RANDOMIZE GROUP CONFIG Creates an initial group configuration using students list
const randomizeGroupConfig = function(students, groupSize) {
  let unassignedStudents = students.slice();
	const groupCount = Math.ceil(students.length / groupSize);

	// Create 2D array[groupID][studentInGroupIndex] and populate with students
  const groupConfiguration = util.range(groupCount).map(() => []);
	for (let j=0; j<groupSize; j++) {
		for (let i=0; i<groupCount && i*j<students.length; i++) {
			groupConfiguration[i]
			  .push(util.dropRandomItemFromArray(unassignedStudents));
		}
	}
	return groupConfiguration;
}

// RANDOMLY SWAP TWO STUDENTS FROM DIFFERENT GROUPS Tests a swap and saves it if 
const randomlySwapTwoStudentsFromDifferentGroups = function(groupConfiguration, currentTemp) {
	const groupCount = groupConfiguration.length;

	// Randomly select the two groups, and the two students within those groups to swap
	let group1 = util.randInt(groupCount);
	let group2 = util.randInt(groupCount - 1); // group 2 should not be the same as group 1
	    group2 = group2<group1 ? group2 : group2+1;
	const student1 = util.randInt(groupConfiguration[group1].length);
	const student2 = util.randInt(groupConfiguration[group2].length);

	// Check points count before swapping
	const baseCasePoints = objFn.forAGroup(groupConfiguration[group1]) +
		                     objFn.forAGroup(groupConfiguration[group2]);

	// Swap the students
	let temp = groupConfiguration[group1][student1];
	groupConfiguration[group1][student1] = groupConfiguration[group2][student2];
  groupConfiguration[group2][student2] = temp;


  // Check points count after swapping
	const testCasePoints = objFn.forAGroup(groupConfiguration[group1]) +
		                     objFn.forAGroup(groupConfiguration[group2]);

  // Unswap if configuration is disadvantaged AND a high temperature does not override decision
  if (testCasePoints < baseCasePoints &&
  	  Math.random() > Math.exp(-(baseCasePoints-testCasePoints)*100/currentTemp))
  {
		let temp = groupConfiguration[group1][student1];
	  groupConfiguration[group1][student1] = groupConfiguration[group2][student2];
		groupConfiguration[group2][student2] = temp;  	
  }
}

// Run the optimizer
main(runCount, students, groupSize);