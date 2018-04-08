const wordsList = require("./data.js");

class Boggle{
    constructor(){
        this.board = [];
        this.words = wordsList;
    }

    boggleBoard(num){
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let boardGame = this.board
        for (let i = 0; i < num; i++) {
          boardGame.push([])
          for (let j = 0; j < num; j++) {
                let index = Math.floor(Math.random() * 26)
                boardGame[i].push(letters[index])
          }
        }
        return  boardGame
    }

    getFirstLetter(index){
        let letterSearch = this.words[index][0]
        let arrFirstCoors = []
        let boardGame = this.board
        for (let i = 0; i < boardGame.length; i++) {
            for (let j = 0; j < boardGame.length; j++) {
                  if(boardGame[i][j] === letterSearch){
                        arrFirstCoors.push([i,j])
                  }
            }
        }
        return arrFirstCoors
    }

    checkVisitedCoor(arr){
          let count = 0
          for (let i = 0; i < arr.length; i++) {
              for(let j =0; j< arr.length;j++){
                    if(arr[i][j] === 1){
                          count++
                    }
              }
          }
          return count
    }

    checkBlock(row, col, coorX,coorY){
      let limitRow = [row-1, row, row+1];
      let limitCol = [col-1, col, col+1]
      let chekRow = limitRow.indexOf(coorX);
      let chekCol = limitCol.indexOf(coorY);
      if(chekRow !== -1 && chekCol !== -1) {
        return true;
      }
      return false;
    }

    checkVisit() {
      let visited = [];
      let boardGame = this.board
      for(let i = 0; i < boardGame.length; i++) {
        visited.push([]);
        for(let j = 0; j < boardGame[i].length; j++) {
          visited[i].push(0);
        }
      }
      return visited;
    }

    solve(){
      let result = []
      let boardGame = this.board
      let wordsToFind = this.words
      let findCounter = 0
      let len = wordsToFind.length
      // console.log(wordsToFind)
      for (let i = 0; i < len; i++) {
          let possibilityFirstLetter = this.getFirstLetter(i)
          // console.log(possibilityFirstLetter)
          let lenLetters = possibilityFirstLetter.length
          for (let j = 0; j < lenLetters; j++) {
                let statusWord = false
                let visited = this.checkVisit()
                let row = possibilityFirstLetter[j][0]
                let col = possibilityFirstLetter[j][1]
                visited[row][col] = 1
                let lastPos = [row,col]
                for(let k = 1; k < wordsToFind[i].length;k++){
                    let status = false
                    for(let l = 0; l < boardGame.length;l++){
                        for(let m = 0; m<boardGame[l].length;m++){
                              if(wordsToFind[i][k] === boardGame[l][m]){
                                    if(this.checkBlock(lastPos[0],lastPos[1],l,m)){
                                          if(visited[l][m] === 0){
                                                lastPos = [l,m]
                                                visited[l][m] = 1
                                                status = true
                                                break
                                          }
                                    }
                              }
                        }
                      if(status === true){
                          break
                      }
                    }
                }
                let countVisit = this.checkVisitedCoor(visited)
                if(countVisit === lenLetters){
                      result.push(wordsToFind[i])
                      findCounter++
                      statusWord =true
                }
                if(statusWord === true){
                      break
                }
          }
      }
      return {findCounter,result}
    }
}

var boggle = new Boggle()
boggle.boggleBoard(5)
console.log(boggle.board)
console.log('Words Found : ',boggle.solve().findCounter)
console.log('Words List : ',boggle.solve().result)
