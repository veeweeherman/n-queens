// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // referencing the row to be searched
      // using reduce to sum all the numbers in the row, if greater than 1, must have at least 2 queens
      var hasConflict = (this.attributes[rowIndex].reduce(function(a,b){ return a+b; }) > 1);
      return hasConflict;
    },
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // declare false before test is run
      var hasConflict = false;
      // loop thru the number of rows, check if when reducing the numbers in the row equals more than 1, change hasConflict to true
      for (var i = 0; i < this.attributes.n; i++) {   
        if (this.hasRowConflictAt(i)) { hasConflict = true; }
      };
      // return answer
      return hasConflict; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //declared test as false before running
      var hasConflict = false;
      // this keeps track of the amount of queens per column
      var numQueens = 0;
      for (var i = 0; i < this.attributes.n; i++) {
      // loop through one column and add to numQueens the value of the queens
        numQueens += this.attributes[i][colIndex]; 
        if (numQueens >= 2) { hasConflict = true; }
      } // if we have more than 2 queens, that's a conflict
        return hasConflict; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // start test as false
      var hasConflict = false;
      for (var i=0;i< this.attributes.n;i++){
      // invoke hasColConflict on each column where i is the column number
        if (this.hasColConflictAt(i)) { hasConflict = true; }
      };  
      return hasConflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //WERE LOOPING THRU ALL COLUMNS WHEN WE ARE GIVEN A COLUMN PARAMETER!! 
      var numQueens = 0;
      var hasConflict = false;
      // j is index number for columns
        for (var j = 0; j < this.attributes.n; j++) {
          // rowNumber as it's incremented is used to check the diagonal
          var rowNumber = this.attributes[j+majorDiagonalColumnIndexAtFirstRow]
          // if the rowNumber exists, we look at the row's column
            if (rowNumber) {
              numQueens += (rowNumber[j]);
            }
            if (numQueens >= 2) { 
              hasConflict = true; 
            }
        };
        return hasConflict;
    },
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
       var hasConflict = false;
        for (var i = 0; i < this.attributes.n; i++) {
          // i becomes each rowNumber to check
          if (this.hasMajorDiagonalConflictAt(i)) { hasConflict = true; };
        };
      return hasConflict;
    },
    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var numQueens = 0;
      var hasConflict = false;
      // j is index number for columns
        for (var j = this.attributes.n-1; j >=0 ; j--) {

          // [k][minorDiag -k] is the right logic
          // change for loop to use k and incrememnt k

          // check if the cell is undefined, this.attributes[k][minor-k] === undefined??

          // rowNumber as it's incremented is used to check the diagonal
          var cell = this.attributes[j][minorDiagonalColumnIndexAtFirstRow-j]
          // if the rowNumber exists, we look at the row's column
            if (cell !== undefined /*&& !isNaN(cell)*/) {
              // rowNumber[mino-j] === NaN at some points. at 0,2
              numQueens += cell;
              console.log("j,j+dia",j,minorDiagonalColumnIndexAtFirstRow-j);
            }
            if (numQueens >= 2) { 
              hasConflict = true; 
            }
        };
            console.log("break---")
        return hasConflict;
        //decrement j, increment param
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
