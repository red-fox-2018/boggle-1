"use strict"
const Table = require('cli-table');
const chalk = require('chalk');
const dictionary = ['AKU', 'KAMU', 'KITA', 'KATA', 'IBU'];
const DIRECTIONS = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1]
];


class Boggle {
    constructor() {
        this.board = this.generateBoards();
        // this.board = [
        //     ['K', 'A', 'I', 'O'],
        //     ['K', 'U', 'B', 'U'],
        //     ['M', 'A', 'M', 'A'],
        //     ['I', 'K', 'I', 'T']
        // ];
        this.visited = [];
        this.startingPoint = [];
        this.foundWords = [];
    }

    // random alphabet at Board 4 x 4
    generateBoards() {
        let row = [];
        let board = [];
        for (let i = 0; i < 4; i++) {
            board[i] = [];
            for (let j = 0; j < 4; j++) {
                board[i].push(
                    String.fromCharCode(65 + Math.floor(Math.random() * 26))
                );
            }
        }
        return board;
    }

    // check the first alphabet at words for starting point
    checkStartingPoint(word) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] === word[0]) {
                    this.startingPoint.push([i, j]);
                }
            }
        }

    }

    // checking word after start point
    startSolve(word) {
        this.checkStartingPoint(word);
        var startingPoint = this.startingPoint;

        for (let i = 0; i < startingPoint.length; i++) {
            let count = this.solveWord(startingPoint[i], word, 1)
            // check if count return from solveWord() equal to word.length
            if (count == word.length) {
                this.foundWords.push(word);
                break;
            }
        }
    }

    // check if coor has been visited
    checkVisited(coor) {
        for (let i = 0; i < this.visited.length; i++) {
            if (coor[0] === this.visited[i][0] && coor[1] === this.visited[i][1]) {
                return false;
            }
        }
        return true;
    }

    solveWord(coor, word, count = 1) {
        // if current coor never been visited push to visited
        if (this.checkVisited(coor)) {
            this.visited.push(coor)
        }
        // while not last char of word
        if (count < word.length) {
            let validDirections = [];
            let board = this.board;
            let directions = DIRECTIONS;
            // check for valid direction
            for (let i = 0; i < directions.length; i++) {
                let row = coor[0] + directions[i][0]
                let col = coor[1] + directions[i][1]
                let newCoor = [row, col]
                if (row >= 0 && row <= 3 &&
                    col >= 0 && col <= 3 &&
                    this.checkVisited(newCoor)) {
                    validDirections.push(newCoor);
                }
            }
            // for every valid direction check if char same as char being iterated (word[count]) and has not been visited
            for (let i = 0; i < validDirections.length; i++) {
                let row = validDirections[i][0];
                let col = validDirections[i][1];
                if (board[row][col] == word[count] && !this.visited.includes([row, col])) {
                    count++;
                    return this.solveWord([row, col], word, count);
                }
                // if there is no match char on the board with char being iterated (word[count]) step back to last visited and start all over again
                if (i == validDirections.length - 1 && board[row][col] !== word[count]) {
                    count--;
                    try {
                        let newCoor = this.visited[this.visited.length - 2]
                        return this.solveWord(newCoor, word, count);
                    } catch (error) {
                        return;
                    }
                }
            }
        } else {
            // after all char of word being iterated return count
            return count;
        }
    }

    // apply solveWord() to every word in arrayOfWord
    solve(arrayOfWord) {
        for (let i = 0; i < arrayOfWord.length; i++) {
            this.startingPoint = [];
            this.visited = [];
            try {
                this.startSolve(arrayOfWord[i]);
            } catch (error) {
                continue;
            }
        }
        // display word found count and display each word
        let wordCount = this.foundWords.length;
        if (wordCount < 1) {
            console.log(
                chalk.red(wordCount + ' word' + (wordCount > 1 ? 's found' : ' found'))
            );
        } else {
            console.log(
                chalk.green(wordCount + ' word' + (wordCount > 1 ? 's found' : ' found'))
            );
        }
        this.foundWords.forEach(word => {
            console.log(chalk.green(word));
        });
    }
}

let boggleSolver = new Boggle();
let table = new Table({
    colWidths: [3, 3, 3, 3]
});

boggleSolver.board.forEach(data => {
    table.push(data);
})

console.log(chalk.blue(table.toString()));
boggleSolver.solve(dictionary);