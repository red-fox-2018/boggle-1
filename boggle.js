
class BoggleBoard{

  static board(num) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  	let arrBoard=[];
  	for (let i = 0; i < num; i++){
  		arrBoard.push([]);
  		for(let j = 0; j < num; j++){
  			arrBoard[i].push(alphabet[Math.floor(Math.random() * 26)]);
  		}
  	}
  	return arrBoard;
  }

  static solve(words,num){

    let boggle = BoggleBoard.board(num)
    let arrFound = []

    for (let counter = 0; counter < words.length; counter++) {

      for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
          if (boggle[i][j] === words[counter][0]) {

            let coori = i
            let coorj = j
            let potong0 = words[counter].slice(1)

            var cek = BoggleBoard.checkKeliling(coori,coorj,potong0,boggle)

            if (cek === true) {
              boggle[i][j] = words[counter][0]
              arrFound.push(words[counter])
              break;
            }
            else if (cek === false) {
              boggle[coori][coorj] = words[counter][0]
            }
          }
        }

        if(cek === true) {
          break
        }
      }
    }

    console.log(boggle);
    if (arrFound.length > 0) {

      console.log(`${arrFound.length} words found`);
      for (let i = 0; i < arrFound.length; i++) {
        console.log(arrFound[i]);
      }
    }
    else{
      console.log('Not found a word');
    }
  }

  static checkKeliling(coori,coorj,potong0,boggle) {

    let atasi = coori + 1
    let bawahi = coori - 1

    let atasj = coorj + 1
    let bawahj = coorj - 1

    let words = potong0

    if (potong0.length > 0) {

      if (bawahi < 0) {
        bawahi = coori
      }
      else if (atasi > boggle.length-1) {
        atasi = coori
      }

      if (bawahj < 0){
        bawahj = coorj
      }
      else if (atasj > boggle.length-1) {
        atasj = coorj
      }

      for (var i = bawahi; i <= atasi; i++){
        for (var j = bawahj; j <= atasj; j++){

          if (potong0[0] === boggle[i][j]) {

            let coori = i
            let coorj = j

            let potong0 = words.slice(1)

            var cek = BoggleBoard.checkKeliling(coori,coorj,potong0,boggle)

            if (cek === true) {
              boggle[coori][coorj] = words[0]
              return true
            }
            else if (cek === false) {
              boggle[i][j] = words[0]
            }
          }
        }
      }
    }

    else {
      return true;
    }

    cek = false
    return cek;

  }
}


let data = ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER']
BoggleBoard.solve(data , 10);
