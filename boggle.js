class Boggle {
  constructor() {
    this.board = [];
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

  checkWord(word) {
    word = word.toUpperCase();
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        let indexWord = 0;
        let str = '';
        if (this.board[i][j] === word[indexWord]) {
          str += word[indexWord];
          let wordObj = {};
          wordObj[word[indexWord]] = [i, j];
          indexWord++;
          let selectedIdx_i = i;
          let selectedIdx_j = j;
          let limitLoop = 8
          while (indexWord < word.length && limitLoop >= 0) {
            debugger
            if ((selectedIdx_i - 1) < 0) {
              if (this.board[selectedIdx_i][selectedIdx_j + 1] === word[indexWord] && !this.checkIndex(selectedIdx_i, selectedIdx_j + 1, wordObj)) { //right
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i][selectedIdx_j - 1] === word[indexWord] && !this.checkIndex(selectedIdx_i, selectedIdx_j - 1, wordObj)) { //left
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j] === word[indexWord] && !this.checkIndex(selectedIdx_i + 1, selectedIdx_j, wordObj)) { //down
                selectedIdx_i++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j + 1] === word[indexWord] && !this.checkIndex(selectedIdx_i + 1, selectedIdx_j + 1, wordObj)) { //bottom-right
                selectedIdx_i++;
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j - 1] === word[indexWord] && !this.checkIndex(selectedIdx_i + 1, selectedIdx_j - 1, wordObj)) { //bottom-left
                selectedIdx_i++;
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              }
            } else if ((selectedIdx_i + 1) >= this.board.length) {
              if (this.board[selectedIdx_i][selectedIdx_j + 1] === word[indexWord] && !this.checkIndex(selectedIdx_i, selectedIdx_j + 1, wordObj)) { //right
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i][selectedIdx_j - 1] === word[indexWord] && !this.checkIndex(selectedIdx_i, selectedIdx_j - 1, wordObj)) { //left
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j] === word[indexWord] && !this.checkIndex(selectedIdx_i - 1, selectedIdx_j, wordObj)) { //up
                selectedIdx_i--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j + 1] === word[indexWord] && !this.checkIndex(selectedIdx_i - 1, selectedIdx_j + 1, wordObj)) { //top-right
                selectedIdx_i--;
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j - 1] === word[indexWord] && !this.checkIndex(selectedIdx_i - 1, selectedIdx_j - 1, wordObj)) { //top-left
                selectedIdx_i--;
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              }
            } else {
              if (this.board[selectedIdx_i][selectedIdx_j + 1] === word[indexWord] && !this.checkIndex(selectedIdx_i, selectedIdx_j + 1, wordObj)) { //right
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i][selectedIdx_j - 1] === word[indexWord] && !this.checkIndex(selectedIdx_i, selectedIdx_j - 1, wordObj)) { //left
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j] === word[indexWord] && !this.checkIndex(selectedIdx_i - 1, selectedIdx_j, wordObj)) { //up
                selectedIdx_i--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j + 1] === word[indexWord] && !this.checkIndex(selectedIdx_i - 1, selectedIdx_j + 1, wordObj)) { //top-right
                selectedIdx_i--;
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i - 1][selectedIdx_j - 1] === word[indexWord] && !this.checkIndex(selectedIdx_i - 1, selectedIdx_j - 1, wordObj)) { //top-left
                selectedIdx_i--;
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j] === word[indexWord] && !this.checkIndex(selectedIdx_i + 1, selectedIdx_j, wordObj)) { //down
                selectedIdx_i++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j + 1] === word[indexWord] && !this.checkIndex(selectedIdx_i + 1, selectedIdx_j + 1, wordObj)) { //bottom-right
                selectedIdx_i++;
                selectedIdx_j++;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              } else if (this.board[selectedIdx_i + 1][selectedIdx_j - 1] === word[indexWord] && !this.checkIndex(selectedIdx_i + 1, selectedIdx_j - 1, wordObj)) { //bottom-left
                selectedIdx_i++;
                selectedIdx_j--;
                wordObj[word[indexWord]] = [selectedIdx_i, selectedIdx_j];
                str += word[indexWord];
                indexWord++;
              }
            }
            limitLoop--
          }
          limitLoop = 8;
          // console.log(wordObj);
          if (str === word) {
            return true;
          }
        }
      }
    }
    return false;
  }

  testCase() {
    let dictionary = [
                      'FORK', 'APPLE', 'BEACH', 'FlY', 'GAME'
                    ];
    let foundWord = '';
    for (var i = 0; i < dictionary.length; i++) {
      if (this.checkWord(dictionary[i])) {
        foundWord += dictionary[i] + '\n';
      }
    }
    // console.log(foundWord);
    if (foundWord.length === 0) {
      console.log('No word found');
    } else {

      console.log(foundWord.substr(0, foundWord.length - 1));
    }
  }

  checkIndex(index_i, index_j, obj) {
    for (var i in obj) {
      if (obj[i][0] === index_i && obj[i][1] === index_j) {
        return true;
      }
    }
    return false;
  }

  // clone(data) {
  //   return data.map(function (arr) {
  //     return arr.slice();
  //   });
  // }

}




var boggle = new Boggle();
boggle.generateBoard(10, 10);
boggle.testCase()
