
var kamus = ['AIR','DAN','API','ANI','ADI','OPA','ABI','BOS','BIO','KUY','LEM','TOP','ABU','IBU'];
//generate board
class Shake {
  static generateBoard(row, col) {
    var board = [];
    const alphabet = 'ABBCDEKRRITLLMNOPAOPTUUIYY';
    for (let i = 0; i < row; i++) {
      board.push([]);
      for (let j = 0; j < col; j++) {
        board[i].push(alphabet[Math.floor(Math.random() * Math.floor(26))]);
      }
    }

    return board
  }
}
//================================================


class Check{
  static checkBoggle(coorX,coorY,newWords,solveBoard){
    let bawahX = coorX-1;
    let atasX = coorX +1;
    let bawahY = coorY-1;
    let atasY = coorY+1;
    let words = newWords;

    if(newWords.length > 0){

      if(bawahX<0){
        bawahX =coorX;
      }
      else if(atasX>solveBoard.length-1){
        atasX = coorX;
      }
      if(bawahY<0){
        bawahY = coorY;
      }
      else if(atasY>solveBoard.length-1){
        atasY = coorY;
      }

      for(let i=bawahX;i<=atasX;i++){

        for(let j=bawahY;j<=atasY;j++){

            if(newWords[0] == solveBoard[i][j]){
              let coorX = i;
              let coorY = j;
              solveBoard[i][j] = ' ';
              let newWords = words.slice(1);

              var checkCondition = Check.checkBoggle(coorX,coorY,newWords,solveBoard);

              if(checkCondition == true){
                solveBoard[coorX][coorY] = words[0];
                return true;
              }
              else if(checkCondition == false){
                solveBoard[i][j] = words[0];
              }
            }
        }
      }
    }

    else{
      return true;
    }

    checkCondition = false;
    return checkCondition
  }
}



//==================================================
class Solve {

  static checkBoard(kamus,row,col){

    let boggleBoard = Shake.generateBoard(row,col);

    let boggleWords = [];

    for(var counter=0;counter<kamus.length;counter++){

      for(let i=0;i<boggleBoard.length;i++){

        var solveBoard = boggleBoard;

        for(let j=0;j<boggleBoard.length;j++){
          if(solveBoard[i][j] == kamus[counter][0]){

            var coorX = i;
            var coorY = j;
            solveBoard[i][j] = ' ';
            var newWords = kamus[counter].slice(1);
            var checkCondition = Check.checkBoggle(coorX,coorY,newWords,solveBoard)

            if(checkCondition == true){
              solveBoard[i][j] = kamus[counter][0];
              console.log('>>>',solveBoard[i][j],kamus[counter][0]);
              boggleWords.push(kamus[counter]);
              break;
            }
            else if(checkCondition == false){
              solveBoard[coorX][coorY] = kamus[counter][0];
            }
          }
        }

        if(checkCondition == true){
          solveBoard = boggleBoard;
          break;
        }
      }
    }



    for (var i = 0; i < boggleBoard.length; i++) {
      console.log(boggleBoard[i]);
    }
    if(boggleWords.length>0){
      console.log(`${boggleWords.length} kata ditemukan :` );
      for(let i=0;i<boggleWords.length;i++){
        console.log(i+1,boggleWords[i]);
      }
    }
    else{
      console.log('tidak ada kata yang ditemukan');
    }
  }

}
Solve.checkBoard(kamus,3,3)

//=====================================================
