class boggle {
    constructor() {
        this.letter_list = [
            ['N', 'S', 'E', 'A', 'P'],
            ['P', 'L', 'I', 'D', 'E'],
            ['D', 'A', 'P', 'E', 'S'],
            ['N', 'E', 'I', 'P', 'L'],
            ['P', 'N', 'U', 'P', 'N']
        ]
    }

    solve(word) {
        for (let i = 0; i < this.letter_list.length; i++) {
            for (let j = 0; j < this.letter_list[i].length; j++) {
                let position = []
                let count = 0
                var str = this.checkBox(i, j, word, count, position)
                if (word[0] + str == word) {
                    return word + ' is true'
                }
                else if (word[0] + this.checkBox(i, j, word, count, position) == word) {
                    return word + ' is true'
                }
            }
        }
        return word + ' is false'
    }

    checkBox(row, col, word, count, position) {
        if (count == word.length - 1) {
            return ''
        }

        else if (this.letter_list[row][col].toLowerCase() == word[count]) {
            debugger
            count++
            position.push([row, col])
            var letter = word[count]
            for (let i = row - 1; i <= row + 1; i++) {
                for (let j = col - 1; j <= col + 1; j++) {
                    if (this.letter_list[i] != undefined && this.letter_list[i][j] != undefined) {
                        let check = false
                        if (this.wordPosition(check, position, i, j)) check = true
                        if (check == false) {
                            if (this.letter_list[i][j].toLowerCase() == letter) {
                                return this.letter_list[i][j].toLowerCase() + this.checkBox(i, j, word, count, position)
                            }
                        }
                    }
                }
            }
        }
    }
    wordPosition(check, position, i, j) {
        for (let p = 0; p < position.length; p++) {
            if (i == position[p][0] && j == position[p][1]) {
                check = true
            }
        }
        return check
    }
}


var chekWord = new boggle()
var fs = require('fs');
var arr = fs.readFileSync('test-case.txt').toString().split(' ')
for(let i=0; i<arr.length;i++){
    console.log(chekWord.solve(arr[i]))
}

