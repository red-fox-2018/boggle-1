function generateBoard() {
    
    let chars = 'abcdefghijklmnopqrstuvwxyz'
    let outsideBox =[]

    for (let row = 0; row < 4; row++) {
        
        let insideBox = []
        for (let col = 0; col < 4; col++) {
            
            let randomChar = Math.floor(Math.random()*(chars.length-1))
            insideBox.push(chars[randomChar])
        }

        outsideBox.push(insideBox)
    }

    return outsideBox
}

function scanBoard() {
    
    let board = [ 
                    [ 'D', 'G', 'H', 'I' ],
                    [ 'K', 'L', 'P', 'S' ],
                    [ 'Y', 'E', 'U', 'T' ],
                    [ 'E', 'O', 'R', 'N' ] 
                ]
  
    let word = 'TURN'            
    let cordinatTarget = []
    
    for (let row = 0; row < board.length; row++) {
        
        for (let col = 0; col < board[col].length; col++) {
            
            if(board[i][j] === word[0]) {

                
            }
        }
    }
    
}

scanBoard()