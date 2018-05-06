class Boggle{
    constructor(param_board,param_vocab){
        this.gameBoard = param_board;
        this.dictionary = param_vocab;
        this.coordinate = [];
        this.result = [];
        this.lastCoordinate = [];
    }

    checkBoggle(){
        let maxstack = this.gameBoard.length*this.gameBoard[0].length;
        for(let i=0;i<this.dictionary.length;i++){
            let counter = 0;
            let countcalibrate = 0;
            this.coordinate = [];
            this.lastCoordinate = [];
            while(counter !== maxstack){
                this.coordinate = [];
                this.findInBoard(this.dictionary[i]);
                if(this.coordinate.length>0){
                    if (countcalibrate<this.dictionary[i].length){
                        this.lastCoordinate = this.coordinate[this.coordinate.length-1];
                        countcalibrate++;
                    }
                    else{
                        this.lastCoordinate = this.coordinate[0];
                    }
                }   
                if(this.coordinate.length === this.dictionary[i].length){
                    break;
                }
                counter++;
            }
            if(this.coordinate.length === this.dictionary[i].length){
                this.result.push(this.dictionary[i]);
            }
        }
        return this.result;
    }

    findInBoard(word){
        let letters = [];
        if(word.length>1){
            letters = word.split('');   
        }
        else{
            letters = word;
        }
        if(letters.length !== 0){
            for(let i=0;i<this.gameBoard.length;i++){
                for(let j=0;j<this.gameBoard[i].length;j++){
                    if(this.gameBoard[i][j] === letters[0]){
                        let istrue = this.checkCoordinate(i,j);
                        if(istrue === true){
                            if(letters.length > 1){
                                return this.findInBoard(letters.slice(1).join(''));
                            }
                            else{
                                return this.findInBoard(letters.slice(1));
                            }
                        }
                    }
                }
            }
        }
        return this.coordinate;
    }

    checkCoordinate(x,y){
        if(this.coordinate.length === 0){
            if(this.lastCoordinate.length === 0){
                this.coordinate.push([x,y]);
                return true;
            }
            else{
                if(this.lastCoordinate[0] === x && this.lastCoordinate[1] === y){
                    return false;
                }
                else{
                    this.coordinate.push([x,y]);
                    return true;
                } 
            }
        }
        else{
            for(let i=0;i<this.coordinate.length;i++){
                if(this.coordinate[i][0] === x && this.coordinate[i][1] === y){
                    return false;
                }
            }
            if(this.lastCoordinate[0] === x && this.lastCoordinate[1] === y){
                return false;
            }
            if((this.coordinate[this.coordinate.length-1][0] - x > -2 && this.coordinate[this.coordinate.length-1][0] - x < 2) && (this.coordinate[this.coordinate.length-1][1] - y > -2 && this.coordinate[this.coordinate.length-1][1] - y < 2)){
                this.coordinate.push([x,y]);
                return true;
            }
            else{
                return false;
            }
        }
    }
}

var board1 = [
    ['A','I','U','E','G','T'],
    ['P','A','F','U','R','J'],
    ['M','A','O','S','U','W'],
    ['G','B','C','H','K','Y'],
    ['V','T','A','D','I','G'],
    ['L','U','S','X','P','A']
];

var board2 = [
    ['D', 'R', 'H', 'I'],
    ['K', 'U', 'P', 'S'],
    ['Y', 'E', 'U', 'T'],
    ['H', 'O', 'R', 'N']
];

var vocab1 = ['APA','API','SUSAH','MAU','MAKAN','MAAF','UANG','TADI','LUPA','RUMAH','PAGI','SUKA','JURUS','RUSUH','FUSO']
            //'APA','API','MAU',MAAF','TADI','PAGI','JURUS','RUSUH','FUSO'
var vocab2 = ['TURN', 'APPLE', 'TRIP', 'SIT', 'SUPER','YEPI','HEPI','RUSH','HORE' ,'SIP','HEY','HORN','SORE'];
            //'TURN','SUPER','YEPI','HEPI','RUSH','HORE','SIP','HEY','HORN' 


var game = new Boggle(board2,vocab2);
console.log(game.checkBoggle());