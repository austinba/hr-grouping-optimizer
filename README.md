# Preferenced-Based Group Optimizer
This is an optimizer for grouping students based on preferences.  This uses a simulated annealing algorithm.

## Files
* **main.js** -- Application entry point
* **objectiveFunction.js** -- Objective function (contains weightings)
* **parseGroupings.js** -- Formats output into tables
* **util.js** -- Misc utility functions
* **generateARandomStudentList.js** -- Produces a sample JSON input file for testing (see *Input*)
* **exampleStudentLists** -- Folder of sample JSON input files for testing

## Use Instructions
### Input
Input is to be JSON formatted as an array of objects with the following parameters:

* **id** Unique student id (string should work but may be slower)
* **name** Student name
* **previousPairs** Former pairs of the student (default is -0.5 points, can be changed in *objectiveFunction.js*)
* **likes** Students this student requests to be paired with (+1 point)
* **dislikesPers** Students this student rejects to be paired with for personal reasons (-2 points)
* **dislikesTech** Studnets this student rejects to be paired with for technical reasons (-2 points)


#### example.json

```
[
  {
    "id": 0,
    "name": "Student 0",
    "previousPairs": [11,46,50,56,20,1,60,49,57,68,19,63],
    "likes": [47,20,61],
    "dislikesPers": [24,11,4,32,14,45,64],
    "dislikesTech": [38,7,46,21,9,13]
  },
  {
    "id": 1,
    "name": "Student 1",
    "previousPairs": [29,32,4,48,23,43,49,0,11,54,41,16],
    "likes": [13],
    "dislikesPers": [],
    "dislikesTech": [16]
  },
  ...
}
```

## Configuration
### main.js
```
// Group Parameters
const students = require('./exampleStudentLists/average.json')
const groupSize = 4;

// Optimization Parameters
const startTemp = 350;      // Default: 350
const endTemp = 5;          // Default: 5
const iterations = 100000;  // Default: 100000
const runCount = 3;         // Default: 3
```

Update **students** to require the JSON file containing preferences of the students in the cohort.

Adjust the other parameters as necessary. Start and end temperatures (For simulated annealing) are optimized for the objective function weightings described above. Optimization was done by bracketing temperatures observed to generate the most advances in points for groupings.


### objectiveFunction.js
'''
'use strict';
const util = require('./util');

const pointsForLike = 1;             // Default: 1
const pointsForDislikePers = -2;     // Default: -2
const pointsForDislikeTech = -2;     // Default: -2
const pointsForPreviousPairs = -0.5; // Default: -0.5
'''
