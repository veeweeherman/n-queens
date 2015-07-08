/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // start the counter for the number of solutions, set to zero.
  var solutionCount = 0;
  // create a new board
  var board = new Board({n:n});
  // create recursive function
  function next(row){
    // if we are the last row, increment the solution, because we have a solution
    if (row === n) {
      solutionCount++;
      return;
    }
    // going through every row and column, adding a piece to the right
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      // checking the spot to see if it has any conflicts 
      if (!board.hasAnyRooksConflicts() ) {
        next(row+1);
      // if it's false it contains no conflicts on that row so it moves to the next row
      }
      // if the board has conflicts, toggle the piece bc it needs to check the ascending column
      board.togglePiece(row, i);
    }
  } 
  next(0);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // start solution count at zero
  var solutionCount = 0; //fixme
  // create a new board
  var board = new Board ({n:n});
  // recursing through every row
  function queenZone(row){
    // we are looking for the limits of the queen's turf
    // if we are on the last row, increment because we have found a solution
    if (row === n){ 
      solutionCount++; 
      return;
    }
    for (var i = 0; i < n; i++) {
      //checking the spot to see if has any conflicts
      board.togglePiece(row,i);
      if (!board.hasAnyQueensConflicts() ){
        //recurse the function QueenZone, looking for the limits of the queen's turf
        queenZone(row+1);
      }
      // this prevents the same piece trying to insert a piece on the same spot infinitely
      board.togglePiece(row,i);
    };
  }
  queenZone(0)
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
