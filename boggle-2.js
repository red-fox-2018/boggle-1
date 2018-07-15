class Boggle {
  constructor() {
    this.board = []
    this.dict = ['SUPER', 'SAVE', 'DUST', 'QUANTUM', 'RED', 'PHASE', 'YOU']
  }

  shake(input) {
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for(var i = 0; i < input; i++) {
      var rows = []
      for(var j = 0; j < input; j++) {
        var random = Math.floor(Math.random() * (26 - 1) + 1)
        rows.push(alphabets[random])
      }
      this.board.push(rows)
    }
  }

  checkFirst(char) {
    var arr = []
      for(var i = 0; i < this.board.length; i++) {
        for(var j = 0; j < this.board[i].length; j++) {
          if(char === this.board[i][j]) {
            arr.push([i, j])
          }
        }
      }
    return arr
  }

  countVisit() {
    var counter = []
    for(var i = 0; i < this.board.length; i++) {
      var row = []
      for(var j = 0; j < this.board[i].length; j++) {
        row.push(0)
      }
      counter.push(row)
    }
    return counter
  }

  checkJumlahVisit(arr) {
    let jumlah = 0;
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < arr[i].length; j++) {
        if(arr[i][j] == 1) {
          jumlah++;
        }
      }
    }
    return jumlah;
  }

  solve() {
    var result = []
    for(var k = 0; k < this.dict.length; k++) {
      var firstPoint = this.checkFirst(this.dict[k].charAt(0))
      for(var i = 0; i < firstPoint.length; i++) {
        var wordFound = false
        var visitCounter = this.countVisit()
        var row = firstPoint[i][0]
        var col = firstPoint[i][1]
        visitCounter[row][col] = 1
        let pos = [row, col]
        for(var j = 1; j < this.dict[k].length; j++) {
          var isFind = false
          for(var l = pos[0]-1; l <= pos[0]+1; l++) {
            for(var m = pos[1]-1; m <= pos[1]+1; m++) {
              if(l < this.board.length && m < this.board.length && l >= 0 && m >= 0) {
                  if(this.board[l][m] == this.dict[k].charAt(j)) {
                    visitCounter[l][m] = 1
                    pos = [l, m]
                    isFind = true;
                    break;
                  }
              }
              if(isFind) {
                break;
              }
            }
            if(isFind) {
              break;
            }
          }
        }

        let jumlahVisit = this.checkJumlahVisit(visitCounter);
        if(jumlahVisit === this.dict[k].length) {
          result.push(this.dict[k]);
          wordFound = true;
        }
        if(wordFound) {
          break;
        }
      }
    }
    console.log(result)
  }

}

let boggle = new Boggle();

boggle.shake(10)
console.log(boggle.board);
boggle.solve()
