/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/

'use strict';
const chalk = require('chalk');
const log = console.log;
const fs = require('fs');

class Boggle {
  constructor(size) {
    this.dict = words;
    this.size = size;
    this.result = [];
    this.shaker = this.shake();
    this.finalBoard = this.printBoard(this.shaker);
    this.board = this.shaker;
  }

  shake() {
    let matrix = [];
    let tester = 'TESTDOWORDEDHOPETRUEDGHIKLPSYEUTEORNAPPLETRIPTURN';
    let counter = 0;
    for (var i = 0; i < this.size; i++) {
      let row = [];
      for (var j = 0; j < this.size; j++) {
        //=========== randome letter alphabet =========
        // let rand = Math.ceil(Math.random() * 26);
        // let font = String.fromCharCode(64 + rand);
        // let font = tester[counter];
        let font = tester[counter];
        row.push(font);
        counter++;
      }
      matrix.push(row);
    }
    return matrix;
  }

  printBoard(board) {
    let printBoard = '';
    let dashLine = chalk.red.bold('-').repeat(board.length * 4 + 1);
    printBoard += dashLine + '\n';

    for (let i = 0; i < board.length; i++) {
      printBoard += chalk.red.bold('| ');
      printBoard += board[i].join(chalk.red.bold(' | ')) + chalk.red.bold(' |') + '\n';
      printBoard += dashLine + '\n';
    }
    return printBoard;
  }

  checkFirstLetter(word) {
    let pos = [];

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] == word[0]) {
          pos.push([i, j]);
        }
      }
    }
    return pos;
  }

  checkWordSearch(suffix, word, curPos, nextMove) {
    if (suffix.length === 0) {
      this.result.push(word);
      return;
    }

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        let row = i + curPos[0];
        let col = j + curPos[1];
        if (row >= 0 && col >= 0 && row < this.board.length && col < this.board.length && !nextMove.includes(`${row},${col}`)) {
          if (this.clearMove([row, col], nextMove)) {
            if (this.board[row][col] == suffix[0]) {
              let newPos = [row, col];
              let newSuffix = suffix.slice(1);
              if (newSuffix.length == 0) {
                this.result.push(word);
                return;
              }
              nextMove.push(`${row},${col}`);
              return this.checkWordSearch(newSuffix, word, newPos, nextMove);
            }
          }
        }
      }
    }
  }

  clearMove(pastMove, nextMove) {
    for (let i = 0; i < nextMove.length; i++) {
      if (pastMove[0] == nextMove[i][0] && pastMove[1] == nextMove[i][1]) {
        return false;
      }
    }
    return true;
  }

  solve() {
    for (let i = 0; i < this.dict.length; i++) {
      let word = this.dict[i];
      let pos = this.checkFirstLetter(word);
      if (pos.length > 0) {
        let suffix = word.slice(1);

        for (let j = 0; j < pos.length; j++) {
          let nextMove = [`${pos[j][0]},${pos[j][1]}`];
          this.checkWordSearch(suffix, word, pos[j], nextMove);
        }
      }
    }

    this.process();
    this.result = [...new Set(this.result)];
    log(chalk.white.bold(`${this.result.length} found words is :`));
    log(chalk.red.bold('=================='));
    this.sleep(300);

    for (let k = 0; k < this.result.length; k++) {
      this.sleep(500);
      log(chalk.yellow.bold(`${k+1}. ${this.result[k]}`));
    }
  }

  reset_board() {
    log('\x1B[2J');
  }

  sleep(milliseconds) {
    var start = new Date().getTime();

    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  boggleBoard() {
    let title = `TABLE BOGGLE`;
    log(chalk.red.bold(`== ${chalk.white.bold(title)} ==`));
    log(this.finalBoard);
    log(chalk.red.bold('=================='));
    return;
  }

  process() {
    let loading = '.....LOADING.....';
    let counter = 1;
    let temp = '';
    let run = 'Process Searching Words';

    for (var i = 0; i < loading.length - 1; i++) {
      this.reset_board();
      this.boggleBoard();
      log(chalk.white.bold(run));
      log(chalk.red.bold('=================='));
      log(chalk.white.bgRed.bold(temp += loading[i]));
      this.sleep(100 * counter);
      counter++;
    }
    this.reset_board();
    this.boggleBoard();
    log(chalk.white.bgRed.bold('...... Done ......'));
    this.sleep(1000);
    this.reset_board();
    this.boggleBoard();
    this.sleep(200);
    return;
  }

}

// import dictionary words

// let words = fs.readFileSync('word.txt', 'utf8')
// .toString()
// .toUpperCase()
// .split('\n');


//dictionary words tester
let words = ['WEST', 'APPLE', 'SIT', 'TRIP', 'TURN', 'HELP', 'DO', 'PORN', 'PET', 'POOR', 'KLEP', 'SUPER', 'TEST', 'SET', 'HULK', 'HI', 'DOPE', 'ROPE', 'ROW', 'OR', 'WORD', 'RET', 'PELT', 'DEEP', 'DOOR', 'HOPE', 'ROSE', 'HORSE', 'TRUE', 'TOP', 'HOST', 'POT', 'DED', 'TROOPER', 'IT', 'WOOD', 'WORSE'];
let boggle = new Boggle(6);
boggle.solve();
