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
      // if the queen is at (x,y)
      // board2._currentAttributes
      //console.log(this.attribute[rowIndex][index]);
      // pretty sure the folloiwng loop thru the whole damn board:
      // for (var row = 0; row < (this.attributes.n)-1; row++) {
      // return true;
      //    }; 
         var hasConflict = false;
      //   for (var i = 0; i < this.attributes[rowIndex].length; i++) {
      //     var count = 0;
      //     if (this.attributes[rowIndex][i] === 1) { count++; }
      //     // console.log("this.attributes[r][i] :",this.attributes[rowIndex][i])
      //     if (count >= 2) { 
      //       hasConflict = true;
      //       return hasConflict; 
      //     }
      //   }
      // // console.log("false");
      // return hasConflict; // fixme
      //var hasConflict = false;
      var lineToTest = this.attributes[rowIndex];
      //console.log((lineToTest.reduce(function(a,b){ return a+b; }) === 1));
      //console.log(lineToTest.reduce(function(a,b){ return a+b;}) > 1 );
      return (lineToTest.reduce(function(a,b){ return a+b; }) > 1);
      // _.each(this.attributes[rowIndex], function(square, index, array) {
      // _.each(rowIndex, function(value, column) {
      //   //console.log();
      //     //var count = 0;
      //     if (array.reduce(function(a,b){return a+b});)
      //     //if (square === 1) {count++;}
      //     //if (count >= 2) {hasConflict = true; }
      // //  })
      // })
      //return hasConflict;
    },
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // each piece has no RowConflict with every other piece on the board 
      var hasConflict = false;
      // _.every(this.attributes,has)
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.attributes[i].reduce(function(a,b){return a+b; }) > 1) { hasConflict = true; }   
      };
      console.log("hasAnyRowConflicts",hasConflict)
      return hasConflict; //hasConflict; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // if the queen is at (x,y)
      // a row conflict is (0,y) and (2, y) where y === y;
      var hasConflict = false;
      for (var i = 0; i < this.attributes.n; i++) {
        var count = 0;
        if (this.attributes[i][colIndex]){ count++; }
        if (count >= 2) { 
          hasConflict = true;
          return hasConflict; 
        } 
      };
      //this.attributes[r][colIndex]
      return hasConflict; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var hasConflict = false;
      for (var i=0;i< this.attributes.n;i++){
        this.hasColConflictAt(i);
      };
    // each piece has no ColConflict with every other piece on the board 
      return hasConflict; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // this.attributes[i][i]
      // var hasConflict = false;
      // var count = 0;
      // for (var i = 0; i < this.attributes.n; i++) {
      //   if (this.attributes[i][i] === 1) {  count++; }
      //   if (count >= 2) { return hasConflict; }
      //   // for (var r = 0; r < this.attributes.n; r++) {

      //   // };
      // };
      //   var count = 0;
      //   if (this.attributes[i][colIndex]){ count++; }
      //   if (count >= 2) { 
      //     hasConflict = true;
      //     return hasConflict; 
        
      // };
      //this.attributes[r][colIndex]
      //return hasConflict; // fixme
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
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
