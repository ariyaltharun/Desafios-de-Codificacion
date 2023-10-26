
function reshape_to_2d(array) {
    let array_2d = []
    for (i=0; i<array.length; i+=3) {
        let tmp = []
        for (j=i; j<i+3; j++)
        tmp.push(board[j])
        array_2d.push(tmp)
    }
    return array_2d;
}


function update(value, i, j) {
    /* Updates the value of board[i][j] with `value`
    @Parameters 
        value: value to update in board[i][j]
        i: row index
        j: col index
    
    @return
        undefined
     */
    board[i][j].innerText = value;
}

function board_status(board) {
    /* Checks the board_status of the board i.e X wins, O wins, draw
    @Parameter : 
    @return: X | O | draw
    */
    let cur_board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    for (let i=0; i<3; i++)
        for (let j=0; j<3; j++)
            cur_board[i][j] = board[i][j].innerText

    // Horizontal check
    for (let i=0; i<3; i++)
        if (validate(cur_board[i][0], cur_board[i][1], cur_board[i][2]))
            return cur_board[i][0]
    
    // Vertical check
    for (let i=0; i<3; i++)
        if (validate(cur_board[0][i], cur_board[1][i], cur_board[2][i]))
            return cur_board[0][i]
    
    // Diagonal Check
    if (validate(cur_board[0][0], cur_board[1][1], cur_board[2][2]))
        return cur_board[0][0]
    
    // Diagonal Check
    if (validate(cur_board[0][2], cur_board[1][1], cur_board[2][0]))
        return cur_board[0][2]

    let empty_count = 0;
    for (let i=0; i<3; i++)
        for (let j=0; j<3; j++)
            if (cur_board[i][j] !== '')
                empty_count++;
    if (empty_count === 9)
        return "draw"
}


function validate(a, b, c) {
    /* Check three boxes return true if all equal
    @Parameters:
        1. a: box1
        2. b: box2
        3. c: box3
    @return: True | False
    */
    return a === b && b === c && a !== '' 
}



/* Main */
var board = document.querySelectorAll(".box")
board = reshape_to_2d(board)
display_game_status = document.querySelector(".status")

var PLAYER1 = 'X';
var PLAYER2 = 'O';

var cur_player = PLAYER1;
for (let i=0; i<3; i++)
    for (let j =0; j<3; j++)
        if (board[i][j].innerText === "")
            board[i][j].addEventListener("click", (e) => {
                if (cur_player === PLAYER1)
                    update(PLAYER1, i, j), cur_player = PLAYER2
                else if (cur_player === PLAYER2)
                    update(PLAYER2, i, j), cur_player = PLAYER1


                game_status = board_status(board)
                
                if (game_status === PLAYER1) {
                    display_game_status.innerText = "🎉 X Wins 🎉"
                } else if (game_status === PLAYER2) {
                    display_game_status.innerText = "🎉 O wins 🎉"
                } else if (game_status === "draw") {
                    display_game_status.innerText = "🤝🏻 DRAW 🤝🏻"
                }
            })    
