'use strict';
const util = require('./util');
const objFn = require('./objectiveFunction');

// Optimization Parameters
const startTemp = 350;    // Default: 350
const endTemp = 5;        // Default: 5
const iterations = 1000;  // Default: 100000
const runCount = 10;      // Default: 10

// Other Parameters
const students = require('./exampleStudentLists/relaxed.json')
const groupSize = 4;

// MAIN runs the optimizer multiple times to create a set of groupings to choose from
const main = function(runCount, students, groupSize) {
	let groupingOptions = [];
	for(let i=0; i<runCount; i++) {
		console.log('Generating Grouping Option #' + i)
		groupingOptions.push(optimizer(students, groupSize));
		console.log('\n');
	}
	groupingOptions = groupingOptions.sort((groupingA, groupingB) => objFn.forAGrouping(groupingA)<objFn.forAGrouping(groupingB));
	console.log('Points:', groupingOptions.map(grouping => objFn.forAGrouping(grouping)));
	console.log(groupingOptions);
}

// OPTIMIZER inputs: 'students' array of preferences and 'groupSize'
const optimizer = function(students, groupSize) {

	// Start with a completely randomized grouping
  const grouping = randomizeGrouping(students, groupSize);

  // Initialize variables for annealing / optimization
	let besting = util.deepCopyArray(grouping);
	let bestScore = objFn.forAGrouping(besting);
	let bestGrouping = [[]];
	const decrement = Math.exp(Math.log(startTemp / endTemp) / iterations);

	// Loop while randomly swapping students and decreasing temperature (represents probability of taking a sub-optimal swap)
	process.stdout.write('Current Best Score:  ');
	for(let i=0; i<iterations; i++) {
		const currentTemp = startTemp / Math.pow(decrement, i);
		randomlySwapTwoStudentsFromDifferentGroups(grouping, currentTemp);
		const score = objFn.forAGrouping(grouping);

		// Save best scoring grouping
		if(score > bestScore) {
			bestScore = score;
			bestGrouping = util.deepCopyArray(grouping);
			process.stdout.write(score + '(' + Math.round(currentTemp) + '°)  ');
		} 
	}
	return bestGrouping;
};


//--------------------------------
//TODO:  Do not allow swaps that put two undefineds in the same group
//--------------------------------

// RANDOMIZE GROUPING Creates an initial grouping using students list
const randomizeGrouping = function(students, groupSize) {
  let unassignedStudents = students.slice();
	const groupCount = Math.ceil(students.length / groupSize);

	// Create 2D array[groupID][studentInGroupIndex] and populate with students
  const grouping = util.range(groupCount).map(() => []);
	for (let j=0; j<groupSize; j++) {
		for (let i=0; i<groupCount && i*j<students.length; i++) {
			if(unassignedStudents.length > 0) {
				grouping[i]
				  .push(util.dropRandomItemFromArray(unassignedStudents));				
			}
		}
	}
	return grouping;
}

// RANDOMLY SWAP TWO STUDENTS FROM DIFFERENT GROUPS Tests a swap and saves it if 
const randomlySwapTwoStudentsFromDifferentGroups = function(grouping, currentTemp) {
	const groupCount = grouping.length;

	// Randomly select the two groups, and the two students within those groups to swap
	let group1 = util.randInt(groupCount);
	let group2 = util.randInt(groupCount - 1); // group 2 should not be the same as group 1
	    group2 = group2<group1 ? group2 : group2+1;
	const student1 = util.randInt(grouping[group1].length);
	const student2 = util.randInt(grouping[group2].length);

	// Check points count before swapping
	const baseCasePoints = objFn.forAGroup(grouping[group1]) +
		                     objFn.forAGroup(grouping[group2]);

	// Swap the students
	let temp = grouping[group1][student1];
	grouping[group1][student1] = grouping[group2][student2];
  grouping[group2][student2] = temp;


  // Check points count after swapping
	const testCasePoints = objFn.forAGroup(grouping[group1]) +
		                     objFn.forAGroup(grouping[group2]);

  // Unswap if grouping is disadvantaged AND a high temperature does not override decision
  if (testCasePoints < baseCasePoints &&
  	  Math.random() > Math.exp(-(baseCasePoints-testCasePoints)*100/currentTemp))
  {
		let temp = grouping[group1][student1];
	  grouping[group1][student1] = grouping[group2][student2];
		grouping[group2][student2] = temp;  	
  }
}

// Run the optimizer
main(runCount, students, groupSize);