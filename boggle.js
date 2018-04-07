class Boggle {
    constructor(tabel,arah,kamus) {
        this.board = tabel;
        this.arah = arah;
        this.kamus = kamus
    }

    createBoard(){
        let jumlahRow = 10 
        let jumlahCol = 10
        let abjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
        for(let i=0;i<jumlahRow;i++){
            let penampungArray = []
            for(let k=0;k<jumlahCol;k++){
                penampungArray.push(abjad[Math.ceil(Math.random()*25)])
            }
            this.board.push(penampungArray)
        }
    }

    sendword(){
        let kamus = this.kamus
        let possible = ""
        let count = 0
        for(let i=0;i<kamus.length;i++){
            let tmp = []
            for(let k=0;k<kamus[i].length-1;k++){
                tmp.push(this.checkword(kamus[i][k]))
            }
            if(this.checkMatch(kamus[i][0],tmp,kamus[i])==kamus[i]){
                possible += this.checkMatch(kamus[i][0],tmp,kamus[i]) + " "
                count++
            }
        }
 
        return `Ditemukan ${count} Words : ${possible}`
    }

    checkMatch(firstWord,string,fullWord){
        let matcher = ""
        matcher += firstWord

        for(let i=0;i<string.length;i++){
            for(let k=0;k<string[i].length;k++){
                if(fullWord[i+1]==string[i][k]){
                    matcher += fullWord[i+1]
                }
            }
        }
        let tabel = {}
        let result = ""
        for(let i=0;i<matcher.length;i++){
            for(let l=0;l<matcher[i].length;l++){
                if(tabel[matcher[i][l]]===undefined){
                    tabel[matcher[i][l]] = 'a';
                    result += matcher[i][l]
                }
            }
        }

        return result
    }

    checkword(word){
        let board = this.board
        let arah = this.arah

        let cordinate = []

        for(let i=0;i<board.length;i++){
            for(let k=0;k<board[i].length;k++){
                if(board[i][k]==word){
                    for(let l=0;l<arah.length;l++){
                        if(board[i-arah[l][0]]!=undefined)
                          cordinate.push(board[i-arah[l][0]][k-arah[l][1]])
                    }

                }
            }
        }
        return cordinate
    }

}

//tabel
//     0    1    2    3
// 0 ['D', 'R', 'H', 'I'];
// 1 ['K', 'U', 'P', 'S'];
// 2 ['Y', 'E', 'U', 'T'];
// 3 ['H', 'O', 'R', 'N'];

let tabel = [['D', 'R', 'H', 'I'],['K', 'U', 'P', 'S'],['Y', 'E', 'U', 'T'],['H', 'O', 'R', 'N']]
let arah = [[1, 0],[1, 1],[0, 1],[-1, 1],[-1, 0],[-1, -1],[0, -1],[1, -1]];
let kamus = ['TURN', 'APPLE', 'TRIP', 'SIT', 'SUPER','YEPI','HEPI','RUSH','HORE' ,'SIP','HEY','HORN','SORE'];

let fs = require('fs');
let kamus2 = fs.readFileSync('word.txt').toString().split("\n")

let boggle = new Boggle(tabel,arah,kamus);
console.log(boggle.sendword())