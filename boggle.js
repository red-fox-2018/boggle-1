const listWord = require('./data.js')

class Boggle {

    constructor() {

        this.board = []
        this.words = listWord
    }

    generateBoard(num) {

        let abjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let boardGame = this.board

        for (let i = 0; i < num; i++) {
            boardGame.push([])

            for (let j = 0; j < num; j++) {
                let index = Math.floor(Math.random() * 26)
                boardGame[i].push(abjad[index])
                
            }
            
        }

        return boardGame
    }

    getFirstLetter(index) {

        let findLetter = this.words[0]
        let firstCoordinat = []
        let boardGame = this.board

        for (let i = 0; i < boardGame.length; i++) {
            
            for (let j = 0; j < boardGame.length; j++) {
                if(boardGame[i][j] === findLetter) {

                    firstCoordinat.push([i,j])
                }
                
            }
        }

        return firstCoordinat
    }

    checkVisitCoor(arr) {

        let count = 0

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if(arr[i][j] === 1) {

                    count++
                }
                
            }
            
        }

        return count
    }

    checkBlock(row, col, x, y) {

        let limitRow = [row-1, row, row+1]
        let limitCol = [col-1, col, col+1]
        let checkRow = limitRow.indexOf(x)
        let checkCol = limitCol.indexOf(y)

        if (checkRow !== -1 && checkCol !== -1) {

            return true
        } else {

            return false
        }
    }

    checkVisit(){

        let visited = []
        let boardGame = this.board

        for (let i = 0; i < boardGame.length; i++) {
            visited.push([])
            
            for (let j = 0; j < boardGame[i].length; j++) {
                
                visited[i].push(0)
            }
        }

        return visited
    }

    solve() {

        let result = []
        let boardGame = this.board
        let findWord = this.words
        let counter = 0

        for (let i = 0; i < findWord.length; i++) {
            
            let kemungkinan = this.getFirstLetter(i)

            for (let j = 0; j < kemungkinan.length; j++) {
                
                let statusWord = false
                let visited = this.checkVisit()
                let row = kemungkinan[j][0]
                let col = kemungkinan[j][1]

                visited[row][col] =1
                let lastPos = [row,col]

                for (let k = 1; k < findWord[i].length; k++) {
                    
                    let status = false

                    for (let l = 0; l < boardGame.length; l++) {
                        for (let m = 0; m < boardGame[l].length; m++) {
                            if(findWord[i][k] === boardGame[l][m]) {

                                if(this.checkBlock(lastPos[0],lastPos[1],l,m)) {

                                    if(visited[l][m] === 0) {

                                        lastPos = [l,m]
                                        visited[l,m] = 1
                                        status = true
                                        break
                                    }
                                }
                            }
                            
                        }
                        
                        if(status === true) {

                            break
                        }
                    }
                }
            }

            let countVisit = this.checkVisitCoor(visited)
            if(countVisit === kemungkinan.length) {

                result.push(findWord[i])
                counter++
                statusWord = true
            }
            if(statusWord === true) {

                break
            }
        }


    return {counter, result}
    }
}

let boggle = new Boggle()
boggle.generateBoard(4)
console.log((boggle.generateBoard));
console.log('Words Found = ',boggle.solve().counter);
console.log('Words List = ', boggle.solve().result);

