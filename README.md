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
// Group Parameters
const students = require('./exampleStudentLists/average.json')
const groupSize = 4;

// Optimization Parameters
const startTemp = 350;      // Default: 350
const endTemp = 5;          // Default: 5
const iterations = 100000;  // Default: 100000
const runCount = 3;         // Default: 3
```

**students** refers to the the JSON file, which contains the list of students and their preferences.  Format instructions are listed under *Input*.

**groupSize** refers to the maximum group size (odd-one-out groups may have n-1 group sizee)

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
============================================================================================================================
=============================================== Grouping 1 (60.0 Points) ===================================================
GROUP           | STUDENT         | STUDENT ID      | #PREV PAIRS     | #LIKES          | #DISLIKES TECH  | #DISLIKES PERS  
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 0         | Student 66      | 66              | - / 12          | 1 / 3           | - / -           | - / 4           
(3 Points)      | Student 37      | 37              | - / 12          | - / 2           | - / 6           | - / 6           
                | Student 23      | 23              | - / 12          | 1 / 3           | - / -           | - / 5           
                | Student 54      | 54              | - / 12          | 1 / 6           | - / 1           | - / 1           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 1         | Student 62      | 62              | - / 12          | - / -           | - / 2           | - / -           
(0.5 Points)    | Student 25      | 25              | - / 12          | - / 5           | - / 1           | - / -           
                | Student 7       | 7               | 1 / 12          | 1 / 7           | - / 3           | - / 7           
                | Student 46      | 46              | - / 12          | - / 1           | - / -           | - / 3           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 2         | Student 5       | 5               | - / 12          | - / -           | - / 6           | - / 5           
(2 Points)      | Student 21      | 21              | - / 12          | 1 / 1           | - / 4           | - / -           
                | Student 4       | 4               | - / 12          | - / -           | - / 2           | - / -           
                | Student 38      | 38              | - / 12          | 1 / 6           | - / 6           | - / 3           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 3         | Student 2       | 2               | 1 / 12          | 1 / 1           | - / 7           | - / 7           
(3 Points)      | Student 9       | 9               | - / 12          | 1 / 7           | - / 5           | - / 6           
                | Student 61      | 61              | 1 / 12          | - / 6           | - / 5           | - / 2           
                | Student 11      | 11              | - / 12          | 2 / 9           | - / 2           | - / 6           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 4         | Student 3       | 3               | 1 / 12          | 3 / 8           | - / 3           | - / 6           
(3.5 Points)    | Student 10      | 10              | - / 12          | - / 7           | - / 2           | - / 2           
                | Student 16      | 16              | - / 12          | 1 / 8           | - / 2           | - / 1           
                | Student 39      | 39              | - / 12          | - / 2           | - / -           | - / 3           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 5         | Student 1       | 1               | - / 12          | - / 1           | - / 1           | - / -           
(4.5 Points)    | Student 35      | 35              | 1 / 12          | 1 / 2           | - / 3           | - / 2           
                | Student 50      | 50              | - / 12          | 2 / 8           | - / -           | - / 7           
                | Student 28      | 28              | - / 12          | 2 / 3           | - / 4           | - / 6           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 6         | Student 34      | 34              | - / 12          | - / 4           | - / 7           | - / 6           
(4.5 Points)    | Student 40      | 40              | 1 / 12          | 1 / 3           | - / -           | - / 2           
                | Student 59      | 59              | - / 12          | 3 / 9           | - / 6           | - / 3           
                | Student 30      | 30              | - / 12          | 1 / 7           | - / 3           | - / 2           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 7         | Student 53      | 53              | - / 12          | 1 / 8           | - / 7           | - / 1           
(3 Points)      | Student 52      | 52              | - / 12          | 1 / 7           | - / 7           | - / 4           
                | Student 19      | 19              | - / 12          | 1 / 1           | - / -           | - / -           
                | Student 64      | 64              | - / 12          | - / 4           | - / 3           | - / 7           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 8         | Student 31      | 31              | 1 / 12          | 1 / 5           | - / 5           | - / 3           
(4 Points)      | Student 24      | 24              | 1 / 12          | - / -           | - / 6           | - / 3           
                | Student 58      | 58              | - / 12          | 1 / 8           | - / 6           | - / 7           
                | Student 43      | 43              | - / 12          | 3 / 7           | - / -           | - / 6           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 9         | Student 67      | 67              | - / 12          | - / 2           | - / 3           | - / 3           
(4 Points)      | Student 44      | 44              | - / 12          | 1 / 9           | - / 6           | - / 1           
                | Student 55      | 55              | - / 12          | 3 / 8           | - / 2           | - / -           
                | Student 29      | 29              | - / 12          | - / 3           | - / 7           | - / 1           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 10        | Student 13      | 13              | - / 12          | 1 / 3           | - / 6           | - / 5           
(3 Points)      | Student 17      | 17              | - / 12          | - / 1           | - / 6           | - / 6           
                | Student 69      | 69              | 1 / 12          | 1 / 5           | - / 3           | - / 6           
                | Student 26      | 26              | 1 / 12          | 2 / 8           | - / 4           | - / 7           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 11        | Student 12      | 12              | - / 12          | - / 2           | - / 6           | - / -           
(4 Points)      | Student 20      | 20              | - / 12          | 2 / 5           | - / 1           | - / -           
                | Student 41      | 41              | - / 12          | - / 6           | - / 1           | - / 3           
                | Student 32      | 32              | - / 12          | 2 / 5           | - / 7           | - / 7           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 12        | Student 14      | 14              | - / 12          | 1 / 8           | - / 5           | - / 3           
(3 Points)      | Student 27      | 27              | - / 12          | - / -           | - / 4           | - / 1           
                | Student 33      | 33              | - / 12          | 1 / 4           | - / 5           | - / 4           
                | Student 8       | 8               | - / 12          | 1 / 6           | - / 7           | - / 1           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 13        | Student 68      | 68              | - / 12          | - / 9           | - / 3           | - / 1           
(4 Points)      | Student 18      | 18              | - / 12          | 1 / 4           | - / 2           | - / 1           
                | Student 57      | 57              | 1 / 12          | 2 / 9           | - / 1           | - / 6           
                | Student 65      | 65              | 1 / 12          | 2 / 9           | - / 7           | - / 3           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 14        | Student 60      | 60              | - / 12          | 2 / 9           | - / -           | - / -           
(4 Points)      | Student 22      | 22              | - / 12          | - / 5           | - / -           | - / 4           
                | Student 56      | 56              | - / 12          | - / -           | - / 1           | - / 6           
                | Student 51      | 51              | - / 12          | 2 / 8           | - / -           | - / 2           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 15        | Student 15      | 15              | 1 / 12          | - / 6           | - / 5           | - / 6           
(6 Points)      | Student 48      | 48              | - / 12          | 1 / 9           | - / 4           | - / 3           
                | Student 36      | 36              | - / 12          | 3 / 9           | - / 1           | - / 7           
                | Student 45      | 45              | 1 / 12          | 3 / 3           | - / 5           | - / 3           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 16        | Student 49      | 49              | - / 12          | 1 / 6           | - / 3           | - / 4           
(2 Points)      | Student 42      | 42              | - / 12          | 1 / 4           | - / 1           | - / 5           
                | Student 63      | 63              | - / 12          | - / 3           | - / 3           | - / 1           
----------------| ----------------| ----------------| ----------------| ----------------| ----------------| ----------------
Group 17        | Student 6       | 6               | - / 12          | 1 / 1           | - / 4           | - / 7           
(2 Points)      | Student 47      | 47              | - / 12          | - / 2           | - / 5           | - / 5           
                | Student 0       | 0               | - / 12          | 1 / 3           | - / 6           | - / 7           
============================================================================================================================
```

