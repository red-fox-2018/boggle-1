class Boggle {
  constructor() {
    this.board = [
                  [ 'B', 'B', 'F', 'D' ],
                  [ 'B', 'O', 'K', 'M' ],
                  [ 'H', 'Y', 'R', 'U' ],
                  [ 'O', 'E', 'J', 'K' ],
                 ];
    this.word = 'FORK';
    this.copyBoard = [];
  }

  generateBoard(row, col) {
    let indexInput = 0;
    for (var i = 0; i < row; i++) {
      this.board[i] = [];
      for (var j = 0; j < col; j++) {
        var letter = this.generateLetter();
        this.board[i].push(letter);
      }
    }
    console.log(this.board);
  }

  generateLetter() {
    let codeZ = 'Z'.charCodeAt();
    let codeA = 'A'.charCodeAt();
    let letterCode = Math.floor((Math.random() * (codeZ - codeA + 1)) + codeA);
    return String.fromCharCode(letterCode);
  }

  checkWord() {
    let word = this.word.toUpperCase();
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        let indexWord = 0;
        if (this.board[i][j] === word[indexWord]) {
          let wordObj = {};
          wordObj[word[indexWord]] = [i, j];
          indexWord++;
          let selectedIdx_i = i;
          let selectedIdx_j = j;
          let limitLoop = 8
          while (indexWord < word.length || limitLoop >= 0) {
            debugger
            if ((selectedIdx_i - 1) < 0) {
              if (this.board[selectedIdx_i][selectedIdx_j + 1] === word[indexWord]) { //right
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i][selectedIdx_j - 1] === word[indexWord]) { //left
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j] === word[indexWord]) { //down
                selectedIdx_i++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j + 1] === word[indexWord]) { //bottom-right
                selectedIdx_i++;
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j - 1] === word[indexWord]) { //bottom-left
                selectedIdx_i++;
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              }
            } else if ((selectedIdx_i + 1) >= this.board.length) {
              if (this.board[selectedIdx_i][selectedIdx_j + 1] === word[indexWord]) { //right
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i][selectedIdx_j - 1] === word[indexWord]) { //left
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j] === word[indexWord]) { //up
                selectedIdx_i--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j + 1] === word[indexWord]) { //top-right
                selectedIdx_i--;
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j - 1] === word[indexWord]) { //top-left
                selectedIdx_i--;
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              }
            } else {
              if (this.board[selectedIdx_i][selectedIdx_j + 1] === word[indexWord]) { //right
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i][selectedIdx_j - 1] === word[indexWord]) { //left
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j] === word[indexWord]) { //up
                selectedIdx_i--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j + 1] === word[indexWord]) { //top-right
                selectedIdx_i--;
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j - 1] === word[indexWord]) { //top-left
                selectedIdx_i--;
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j] === word[indexWord]) { //down
                selectedIdx_i++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j + 1] === word[indexWord]) { //bottom-right
                selectedIdx_i++;
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j - 1] === word[indexWord]) { //bottom-left
                selectedIdx_i++;
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                indexWord++;
              }
            }
            limitLoop--
          }
          limitLoop = 8;
          console.log(wordObj);
        }
      }
    }
    console.log(word);
  }

  // clone(data) {
  //   return data.map(function (arr) {
  //     return arr.slice();
  //   });
  // }

}




var boggle = new Boggle();
// boggle.generateBoard(4, 4);
boggle.checkWord()
