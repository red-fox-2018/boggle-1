/**
 *
 * @author Iswanul Umam - Red Fox
 */

class Boggle {
  constructor(board) {
    this.board = (board != undefined) ? board : [];
  }
  /**
   * Function generateBoard().
   *
   * Generate board
   * @param {Int} - row leength
   * @param {Int} - column length
   *
   * @return {Void}
   */
  generateBoard(row, column) {
    for (let i = 0; i < row; i++) {
      this.board[i] = [];
      for (let j = 0; j < column; j++) {
        this.board[i].push(this.randomAlphabet());
      }
    }
  }
  /**
   * Function randomAlphabet().
   *
   * Generate value A to Z random
   *
   * @return {Char} - alphabet A - Z
   */
  randomAlphabet() {
    let random = Math.random() * (123 - 97) + 97;
    return String.fromCharCode(random).toUpperCase();    
  }
  /**
   * Function showBoard().
   *
   * @return {Array} - array of board
   */
  showBoard() {
    return this.board;
  }
  /**
   * Function duplicateBoard().
   *
   * create new board, called each search word in board
   * 
   * @return {Array} - array of board
   */
  duplicateBoard() {
    let board = [];
    let m = this.board.length;
    let n = this.board[0].length;
    for (let i = 0; i < m; i++) {
      board[i] = [];
      for (let j = 0; j < n; j++) {
        board[i].push(this.board[i][j]);
      }
    }
    return board;
  }
  /**
   * Function check().
   *
   * check word is exist or not
   * 
   * @return {Boolean} - true or false
   */
  check(word) {
    let newBoard = this.duplicateBoard();
    if (this.found(newBoard, word)) {
      return true;
    }
    return false;
  }
  /**
   * Function found().
   *
   * find word in board
   * @param {Array} - array of board
   * @param {String} - string value of word
   * 
   * @return {Boolean} - true of false
   */
  found(board, word) {
    let m = board.length;
    let n = board[0].length;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (this.search(board, word, i, j, 0)) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Function search().
   *
   * Check existing word in board using depth-first search, vartical, horizontal & diagonal direction
   * 
   * @param {Array} - array of board
   * @param {String} - string of word
   * @param {Integer} - integer board index i (row)
   * @param {Integer} - integer board index j (column)
   * @param {Integer} - integer index of word
   * 
   * @return {Boolean} - true of false
   */
  search(board, word, i, j, k) {
    let m = board.length;
    let n = board[0].length;

    // restrictions false condition
    if (i < 0 || j < 0 || i >= m || j >= n || k > word.length - 1) return false;
    
    // check matching value
    if (board[i][j] == word[k]) {
      let temp = board[i][j];
      board[i][j] = 'visited';
      if (k == word.length - 1) {
        return true;
      } else if (
        // diagonal search
        this.search(board, word, i - 1, j + 1, k + 1) ||
        this.search(board, word, i + 1, j + 1, k + 1) ||
        this.search(board, word, i - 1, j - 1, k + 1) ||
        this.search(board, word, i + 1, j - 1, k + 1) ||
        // horizontal search
        this.search(board, word, i - 1, j, k + 1) ||
        this.search(board, word, i + 1, j, k + 1) ||
        // vertical search
        this.search(board, word, i, j - 1, k + 1) ||
        this.search(board, word, i, j + 1, k + 1)
      ) {
        board[i][j] = temp;
        return true;
      }
    } else {
      return false;
    }
    return false;
  }
}

//  ----------------- Drive Code ---------------------
// if parameter constructor is empty, board must random with call function generateBoard(row, col)
// if parameter constructor not empty, dont need generate board
// boggle.generateBoard(5, 5);

// read file
var fs = require('fs')
var kamus = fs.readFileSync('kamus.txt')
  .toString()
  .split("\n");

//  ----------------- Small Board ---------------------

let sampelBoard1 =
[ [ 'A', 'O', 'Y', 'M', 'F' ],
  [ 'G', 'I', 'J', 'R', 'P' ],
  [ 'O', 'X', 'B', 'L', 'T' ],
  [ 'Y', 'K', 'L', 'H', 'F' ],
  [ 'J', 'P', 'W', 'U', 'M' ] ]

let smallBoggle = new Boggle(sampelBoard1);

// # show board
console.log('# Mathcing value using 35269 words');
console.log('Case 1# Small Board');
console.log(smallBoggle.showBoard());

// checking all matching data in kamus
console.log('# Mathching value from "kamus"');
for (let word of kamus) {
  word = word.toUpperCase();
  if (smallBoggle.check(word)) {
    console.log(word);
  }
}

//  ----------------- Medium Board ---------------------

let sampelBoard2 =
[ [ 'X', 'M', 'G', 'K', 'X', 'I', 'Q', 'E', 'C', 'O' ],
  [ 'T', 'G', 'M', 'N', 'Y', 'E', 'X', 'Z', 'U', 'J' ],
  [ 'K', 'C', 'F', 'G', 'M', 'R', 'R', 'E', 'G', 'O' ],
  [ 'K', 'D', 'N', 'G', 'L', 'M', 'E', 'R', 'V', 'W' ],
  [ 'M', 'J', 'L', 'O', 'N', 'W', 'N', 'V', 'C', 'D' ],
  [ 'T', 'Y', 'S', 'V', 'V', 'P', 'C', 'N', 'O', 'K' ],
  [ 'Y', 'G', 'S', 'K', 'G', 'V', 'L', 'H', 'H', 'D' ],
  [ 'R', 'W', 'J', 'B', 'S', 'I', 'U', 'Z', 'L', 'L' ],
  [ 'G', 'H', 'D', 'P', 'I', 'E', 'D', 'F', 'N', 'G' ],
  [ 'J', 'Q', 'B', 'I', 'K', 'Q', 'A', 'N', 'E', 'K' ] ];

let mediumBoggle = new Boggle(sampelBoard2);

// # show board
console.log('Case 2# Medium Board');
console.log(mediumBoggle.showBoard());

// checking all matching data in kamus
console.log('# Mathching value from "kamus"');
for (let word of kamus) {
  word = word.toUpperCase();
  if (mediumBoggle.check(word)) {
    console.log(word);
  }
}

//  ----------------- Large Board ---------------------
// random board 30 x 30

let bigBoggle = new Boggle();

// # show board
console.log('Case 3 # Big Board 15 x 15 random value');

bigBoggle.generateBoard(15, 15);

console.log(bigBoggle.showBoard());

// checking all matching data in kamus
console.log('# Mathching value from "kamus.txt"');
for (let word of kamus) {
  word = word.toUpperCase();
  if (bigBoggle.check(word)) {
    console.log(word);
  }
}