let input = process.argv.splice(2);

class Boogle {
  constructor(file) {
    this.dict = file;
    this.board = [];
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.input = process.argv.splice(2);
    this.side = input[0];
    this.randomAlphabet = 0;
    this.obj = {}
    this.pos = [];
    this.array = []
    this.formula = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]];
  }
  createBoard() {
    for (let row = 0; row < this.side; row++) {
      this.board.push([]);
      for (let col = 0; col < this.side; col++) {
        this.randomAlphabet = Math.floor(Math.random() * 26)
        this.board[row].push(this.alphabet[this.randomAlphabet]);
      }
    }
  }
  checkCoord(x, y) {
    let board = this.board
    this.pos = []

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (i == x & j == y) {
          for (let l = 0; l < this.formula.length; l++) {
            if (board[i - this.formula[l][0]] !== undefined && board[i][j - this.formula[l][1]] !== undefined) {
              this.pos.push(board[i - this.formula[l][0]][j - this.formula[l][1]])
            }
          }
        }
      }
    }
  }
  createObj() {
    for (let word = 0; word < this.dict.length; word++) { /** Looping per kata dari dictionary */
      this.obj[this.dict[word]] = {}
      let objDict = this.obj[this.dict[word]];
      for (let k in this.dict[word]) {  /** Looping per huruf dari setiap kata */
        this.obj[this.dict[word]][this.dict[word][k]] = {}
        this.obj[this.dict[word]][this.dict[word][k]].pos = []
        for (let i in this.board) { /** looping untuk mencari posisi dari setiap huruf di setiap kata */
          for (let j in this.board[i]) {
            if (this.dict[word][k] == this.board[i][j]) {
              this.obj[this.dict[word]][this.dict[word][k]].pos.push([i, j]);
            }
          }
        }
      }
    }
  }

  solve() {
    this.board = [['I', 'Q', 'B', 'A', 'N'],
    ['F', 'V', 'A', 'N', 'S'],
    ['K', 'A', 'P', 'E', 'L'],
    ['U', 'O', 'B', 'D', 'S'],
    ['B', 'A', 'Z', 'N', 'H']]
    // this.createBoard()
    console.log(this.board)
    this.createObj();
    for (let i in this.obj) { /**looping setiap keys (kata) di obj */
      let arr = [i[0]];
      for (let p in this.obj[i][i[0]].pos) { /**looping posisi firstLetter  */
        let firstLetterPos = this.obj[i][i[0]].pos[p]
        if (firstLetterPos === undefined) continue
        let index = 0;
        let x = firstLetterPos[0]
        let y = firstLetterPos[1];
        for (let j in this.obj[i]) { /**looping setiap keys (huruf) dari setiap kata */

          this.checkCoord(x, y)
          console.log
          let posisi = this.obj[i][j].pos;
          for (let l = 0; l < this.pos.length; l++) {
            if (j == this.pos[l]) {
              let temp = firstLetterPos
              firstLetterPos = this.obj[i][j].pos
              if (temp != firstLetterPos) {
                arr.push(j);
              }
            }
          }
        }
      }
      if(i === arr.join('')) {
        this.array.push(i)
      }
    }
    let output = ''
    this.array.forEach(e => output+=e +' ')
    console.log(`Kata yang ditemukan berjumlah ${this.array.length} yaitu kata ${output}`)
  }
}

var fs = require('fs')
var file = fs.readFileSync('dictionary.txt').toString().toUpperCase().split("\n")
// console.log(file)
let game = new Boogle(file)
// game.createBoard()
game.solve()
