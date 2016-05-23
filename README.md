# Team Grouping Optimizer
This script optimizes students into learning groups based on preferences and anti-preferences, and renders the result in a visually appealing format.

## Run
```
node main.js
```
The output table requires >106 columns for correct formatting, so expand the bash window as necessary. Or send output to a file.

```
node main.js > output
```



## Files
* **main.js** -- Application entry point
* **objectiveFunction.js** -- Objective function (contains weightings)
* **displayGroupings.js** -- Formats output into tables
* **util.js** -- Misc utility functions
* **generateARandomStudentList.js** -- Produces a sample JSON input file for testing (see *Input*)
* **exampleStudentLists** -- Folder of sample JSON input files for testing

## Configuration
### main.js
```
// Optimization Parameters
const startTemp = 350;      // Default: 350
const endTemp = 5;          // Default: 5
const iterations = 100000;  // Default: 100000

const main = function() {
    // Grouping Parameters
    const studentsCSV = 'dataCSVs/origTemplate.csv';
    const groupSize = 4;
    const runCount = 3;
    optimizeMultipleGroups(runCount, loadFile(studentsCSV), groupSize);
}

```

**studentsCSV** the the CSV file, which contains the list of students and their preferences.

**groupSize** is the maximum group size (odd-one-out groups may have n-1 group sizee)

**Optimization Parameters** These are optimized for the objective function weightings used in the example. Optimization can be refreshed by running an expanded temperature range on a dataset, and noting the temperature range where the most point jumps occur.


### objectiveFunction.js
```
'use strict';
const util = require('./util');

const pointsForLike = 1;             // Default: 1
const pointsForDislikePers = -2;     // Default: -2
const pointsForDislikeTech = -2;     // Default: -2
const pointsForPreviousPairs = -0.5; // Default: -0.5
```

## Use Instructions
### Input
Input is to be JSON formatted as an array of objects with the following parameters:

* **id** Unique student id (names could be inserted here but may be slower -- hasn't been tested)
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

## Sample Output
```
+========================================================================================================+
+                                  GROUPING OPTIONS (SORTED BY POINTS)                                   +
+========================================================================================================+

==========================================================================================================
=============================================== Grouping 1 (71.0 Points) =================================
GROUP           | STUDENT         | STUDENT ID      | #LIKES          | #DISLIKES TECH  | #DISLIKES PERS  
----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 0         | Snake           | 18              | 3 / 20          | - / 3           | - / 1           
(9 Points)      | Mongoose        | 12              | - / -           | - / 1           | - / -           
                | Xylophone       | 23              | 3 / 25          | - / -           | - / 1           
                | Uuvula          | 20              | 3 / 19          | - / -           | - / -           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 1         | Elephant        | 4               | 2 / 7           | - / -           | - / -           
(10 Points)     | Bikini          | 27              | 3 / 38          | - / -           | - / -           
                | Donkey          | 3               | 2 / 9           | - / -           | - / -           
                | Egg             | 30              | 3 / 12          | - / 1           | - / -           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 2         | Quail           | 16              | 1 / 7           | - / 1           | - / 1           
(9 Points)      | Nickleback      | 13              | 3 / 16          | - / -           | - / 3           
                | Kill            | 36              | 2 / 4           | - / -           | - / -           
                | Caterpillar     | 2               | 3 / 35          | - / 1           | - / 2           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 3         | Youngster       | 24              | 2 / 5           | - / 1           | - / 2           
(7 Points)      | Violin          | 21              | 2 / 3           | - / 3           | - / 1           
                | Cat             | 28              | - / -           | - / 1           | - / 3           
                | Flick           | 31              | 3 / 37          | - / -           | - / 1           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 4         | Intelligent     | 34              | 1 / 7           | - / 2           | - / 2           
(9 Points)      | Alabama         | 26              | 2 / 3           | - / -           | - / -           
                | Great           | 32              | 3 / 32          | - / 2           | - / 2           
                | Apple           | 0               | 3 / 36          | - / 1           | - / -           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 5         | Jupiter         | 9               | 3 / 8           | - / 7           | - / -           
(11 Points)     | Gargoyle        | 6               | 2 / 7           | - / -           | - / -           
                | Heat            | 33              | 3 / 16          | - / 7           | - / 3           
                | Koala           | 10              | 3 / 8           | - / -           | - / -           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 6         | Platypus        | 15              | 3 / 8           | - / -           | - / -           
(9 Points)      | Fringle         | 5               | 1 / 3           | - / 1           | - / -           
                | Humid           | 7               | 2 / 14          | - / -           | - / -           
                | Wonky           | 22              | 3 / 16          | - / -           | - / 2           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 7         | Train           | 19              | 1 / 10          | - / -           | - / -           
(3 Points)      | Dumby           | 29              | 1 / 5           | - / 1           | - / -           
                | Lumpy           | 11              | 1 / 7           | - / 1           | - / 1           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 8         | Octopus         | 14              | - / -           | - / 1           | - / -           
(1 Points)      | Zebra           | 25              | - / -           | - / -           | - / -           
                | Railroad        | 17              | 1 / 6           | - / -           | - / -           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 9         | Banana          | 1               | - / 2           | - / -           | - / -           
(3 Points)      | Juggle          | 35              | 2 / 9           | - / 4           | - / 3           
                | Interstellar    | 8               | 1 / 6           | - / -           | - / 3           
==========================================================================================================
```

