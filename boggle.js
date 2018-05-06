var dictionaryExample = ['ADHIT','RAHMAN','PEAR','SYAMSUL','YES','KEY']
//Kamus dan rowcolumn generate
solveBoggle(dictionaryExample,10,10);

//Fungsi untuk membuat board boggle
function shake(rowBoard,columnBoard){
  var boggleBrd = [];
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   for(let i=0;i<rowBoard;i++){
     boggleBrd.push([]);
     for(let j=0;j<columnBoard;j++){
       boggleBrd[i].push(alphabets[Math.floor(Math.random()*Math.floor(26))]);
     }
   }
   return boggleBrd;
}


//Fungsi untuk mencari kata boggle
function solveBoggle(dictionaryExample,rowBoard,columnBoard){

  let boggleBrd = shake(rowBoard,columnBoard);
  let boggleWords = [];

  for(var counter=0;counter<dictionaryExample.length;counter++){

    for(let i=0;i<boggleBrd.length;i++){

      var board = boggleBrd;

      for(let j=0;j<boggleBrd.length;j++){
        if(board[i][j] == dictionaryExample[counter][0]){

          var xCoordinate = i;
          var yCoordinate = j;
          board[i][j] = ' ';
          var newWords = dictionaryExample[counter].slice(1);
          var condition = checkBoggle(xCoordinate,yCoordinate,newWords,board)

          if(condition == true){
            board[i][j] = dictionaryExample[counter][0];
            boggleWords.push(dictionaryExample[counter]);
            break;
          }
          else if(condition == false){
            board[xCoordinate][yCoordinate] = dictionaryExample[counter][0];
          }
        }
      }

      if(condition == true){
        board = boggleBrd;
        break;
      }
    }
  }

  console.log(boggleBrd);
  if(boggleWords.length>0){
    console.log(boggleWords.length +  ' words found : ');
    for(let i=0;i<boggleWords.length;i++){
      console.log(boggleWords[i]);
    }
  }
  else{
    console.log('No words found!');
  }
}

//Fungsi untuk mengecek apakah kamus tersebut ada apa tidak
function checkBoggle(xCoordinate,yCoordinate,newWords,board){

  let minX = xCoordinate-1;
  let maxX = xCoordinate +1;
  let minY = yCoordinate-1;
  let maxY = yCoordinate+1;
  let words = newWords;

  if(newWords.length > 0){

    if(minX<0){
      minX =xCoordinate;
    }
    else if(maxX>board.length-1){
      maxX = xCoordinate;
    }
    if(minY<0){
      minY = yCoordinate;
    }
    else if(maxY>board.length-1){
      maxY = yCoordinate;
    }

    for(let i=minX;i<=maxX;i++){

      for(let j=minY;j<=maxY;j++){

          if(newWords[0] == board[i][j]){
            let xCoordinate = i;
            let yCoordinate = j;
            board[i][j] = ' ';
            let newWords = words.slice(1);

            let condition = checkBoggle(xCoordinate,yCoordinate,newWords,board);

            if(condition == true){
              board[xCoordinate][yCoordinate] = words[0];
              return true;
            }
            else if(condition == false){
              board[i][j] = words[0];
            }
          }
      }
    }
  }

  else{
    return true;
  }

  condition = false;
  return condition

}
