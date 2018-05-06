/**
 * 
 * @author: Iswanul Umam - Red Fox
*/

class Boggle {
  constructor(input) {
    this.input = input;
    this.board = [];
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
   * Function getBoard().
   *
   * Getting to board value
   *
   * @return {Array} - board alphabet
   */
  getBoard() {
    return this.board;
  }
}

// --------------------------------------------------
// driver code
let boggle = new Boggle();

// generate board
boggle.generateBoard(10, 10);

// show result board
console.log(boggle.getBoard());