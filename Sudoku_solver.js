/*  initalizing function called solveSudoku for solving the game sudoku 
*   here  we are intializing the emptyspot for detecting the empty cells and moving them into r & c variables
*   main point is here we checking rows and columns 
*/

 function solveSudoku(gameArr) {
     var emptySpot = nextEmtySpot(gameArr);
     var r = emptySpot[0];
     var c = emptySpot[1];


// if the game is not a valid sudoku or unsolvable then it return the  unsolved game array 


    if (!isValidSudoku(gameArr)) 
    return gameArr;


/* if no vacant spot is left, board is solved*/


    if (r === -1) {
        return gameArr;
    };


/* created a possiblities function  for checking all the possiblities 
* in the row and columns for the game
*
*/

    var possArr = possiblities(r, c, gameArr);
        for (var k = 0; k < possArr.length && nextEmtySpot(gameArr)[0] !== -1; k++) {
        gameArr[r][c] = possArr[k];
        solveSudoku(gameArr);
    }


/* if no possible value leads to a solution reset this value 
*  and return to the game array with the last modifications that are done  
*/

     if (nextEmtySpot(gameArr)[0] !== -1) gameArr[r][c] = 0;

        return gameArr;
    }

/*created a function for checking all the empty cells if any cell is empty it return [i,j]
* if not it will return [-1,-1] by default
* 
*/
    function nextEmtySpot(gameArr) {
        for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
        if (gameArr[i][j] === 0) return [i, j];
         }
    }
    return [-1, -1];
    }


/* created a function called possiblities and 
*  checking for the new changes and possible numbers in each and every row and column and 3*3 squares
* 
*/

function possiblities(r, c, gameArr) {
    var possArr = [];
    var row = [];
    var col = [];
    var quad = [];
    var k = 0;
    var l = 0;
    if (r <= 2) k = 0; else if (r <= 5) k = 3; else k = 6;
    if (c <= 2) l = 0; else if (c <= 5) l = 3; else l = 6;

    for (var i = 0; i < 9; i++) {
        row.push(gameArr[i][c]);
    }
    for (var j = 0; j < 9; j++) {
        col.push(gameArr[r][j]);
    }
    for (var i = k; i < k + 3; i++) {
        for (var j = l; j < l + 3; j++) {
            quad.push(gameArr[i][j]);
        }
    }

    for (var n = 1; n < 10; n++) {
        if (row.indexOf(n) === -1 && col.indexOf(n) === -1 && quad.indexOf(n) === -1) {
            possArr.push(n);
        }
    }
    return possArr;
}


/*  initalized a function called checkQuadrant 
*   created a for loops for both horizontal(or) rows and for loops for both vertical (or) columns
*   here the loops goes and check each and every cell in the row and column for conflicts , empty spaces and 
*   for new data that is entered
* 
*/ 
    function checkQuadrant(r, c, gameArr) {
        var qudarantArr = [];
        for (var i = r; i < r + 3; i++) {
            for (var j = c; j < c + 3; j++) {
                if (qudarantArr.indexOf(gameArr[i][j]) === -1 || gameArr[i][j] === 0) {
                    qudarantArr.push(gameArr[i][j]);
                } else {
                    return false;
                }
            }
        }
        return true;
    }


/*  here initalized a function called isValidSudoku for checking the 3*3 squares and total 9 squares
*   here we are searching for the corect number and for conflicts  and for empty cells 
*   after doing all these it will reflect into the game array
*/


    function isValidSudoku(gameArr) {
        if (!checkQuadrant(0, 0, gameArr)) return false;
        if (!checkQuadrant(0, 3, gameArr)) return false;
        if (!checkQuadrant(0, 6, gameArr)) return false;
    
        if (!checkQuadrant(3, 0, gameArr)) return false;
        if (!checkQuadrant(3, 3, gameArr)) return false;
        if (!checkQuadrant(3, 6, gameArr)) return false;
    
        if (!checkQuadrant(6, 0, gameArr)) return false;
        if (!checkQuadrant(6, 3, gameArr)) return false;
        if (!checkQuadrant(6, 6, gameArr)) return false;

/*   here we created  for loops for checking the whole game solver
*    created a for loops for both horizontal(or) rows and for loops for both vertical (or) columns
*    here the loops goes and check each and every cell in the row and column for conflicts , empty spaces and 
*    for new data that is entered
*/ 


  for (var i = 0; i < gameArr.length; i++) {
        var rowNumbers = [];
        for (var j = 0; j < gameArr.length; j++) {
            if (rowNumbers.indexOf(gameArr[i][j]) === -1 || gameArr[i][j] === 0) {
                rowNumbers.push(gameArr[i][j]);
            } else {
                return false;
            }
        }
    }

    for (var i = 0; i < gameArr.length; i++) {
        var colNumbers = [];
        for (var j = 0; j < gameArr.length; j++) {
            if (colNumbers.indexOf(gameArr[j][i]) === -1 || gameArr[j][i] === 0) {
                colNumbers.push(gameArr[j][i]);
            } else {
                return false;
            }
        }
    }
    return "Game Solved!!";
}




//---------------------------------------------------Test-----------------------------------------------------------------


var sudUnsolved = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],      
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
];

console.log(sudUnsolved);



var gameArr = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],      
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
];


solveSudoku(gameArr);


console.log('Solved');
console.log(gameArr);
console.log(isValidSudoku(gameArr));
