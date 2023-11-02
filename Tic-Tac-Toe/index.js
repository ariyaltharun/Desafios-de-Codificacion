
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


function getBoardValues(board) {
    /* Copies all the board values and returns the 2d array
    @Parameters:
        board: array of div elements
    @Returns:
        2d array values of board values
     */
    let cur_board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    for (let i=0; i<3; i++)
        for (let j=0; j<3; j++)
            cur_board[i][j] = board[i][j].innerText
    
    return cur_board
}


function board_status(cur_board) {
    /* Checks the board_status of the board i.e X wins, O wins, draw
    @Parameter : 
    @return: X | O | draw
    */

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


function computerPlayer(value, i, j) {
    /* ComputerPlayer: Updates the value in the random position
    @Parameters:
        value: fills the box with this value
        i: row index of value filled by human
        j: col index of value filled by human
    @Output:
        Not defined
    */
    avail.splice(avail.findIndex((e) => e[0] === i && e[1] === j), 1)
    if (avail.length) {
        let random_value = Math.floor(Math.random() * avail.length)
        let [x, y] = avail[random_value]
        board[x][y].innerText = value
        avail.splice(random_value, 1)
    }
}


function aiPlayer() {
    /* AIplayer uses minimax algorithm to find bestmove and play */
    let cur_board = getBoardValues(board)
    let bestScore = Infinity
    let bestMove = {i:0, j:0}
    for (let i=0; i<3; i++)
        for (let j=0; j<3; j++)
            if (cur_board[i][j] === "") {
                cur_board[i][j] = "O"
                let score = miniMax(cur_board, true)
                cur_board[i][j] = ""
                if (score < bestScore) {
                    bestMove.i = i
                    bestMove.j = j
                    bestScore = score
                }
            }
    console.log(bestMove)
    if (!board_status(cur_board))
        board[bestMove.i][bestMove.j].innerText = "O"
}


function miniMax(cur_board, maximize) {
    /* MiniMax: Two player game algorithm
                where one what's to maximize
                their score and other what's
                to minimize their score
    @Parameters:
        cur_board(2DArray): current board state
        maximize(Bool): To choose player turn
    @Output:
        score
    Here,
        X -> wants to maximize i.e.. 1
        O -> wants to minimize i.e.. -1
        draw -> worst case i.e.. 0
    */
    // Base condition
    let _scores = {
        "X": 1,
        "O": -1,
        "draw": 0
    }
    if (board_status(cur_board))
        return _scores[board_status(cur_board)]
    
    // Relation
    if (maximize) {
        let bestScore = -Infinity
        for (let i=0; i<3; i++)
            for (let j=0; j<3; j++)
                if (cur_board[i][j] === "") {
                    cur_board[i][j] = "X"
                    let score = miniMax(cur_board, false)
                    cur_board[i][j] = ""
                    bestScore = Math.max(score, bestScore)
                }
        return bestScore
    } else {
        let bestScore = Infinity
        for (let i=0; i<3; i++)
            for (let j=0; j<3; j++) 
                if (cur_board[i][j] === "") {
                    cur_board[i][j] = "O"
                    let score = miniMax(cur_board, true)
                    cur_board[i][j] = ""
                    bestScore = Math.min(score, bestScore)
            }
        return bestScore
    }
}


/* Main */
var board = document.querySelectorAll(".box")
board = reshape_to_2d(board)
display_game_status = document.querySelector(".status")

var PLAYER1 = 'X';
var PLAYER2 = 'O';
var game_end = false;
var cur_player = PLAYER1;

// Possible players
var HUMAN_PLAYER = false
var COMPUTER_PLAYER = false
var AI_PLAYER = true

// Computer player stuffs
var avail = []
for (let i=0; i<3; i++)
    for (let j=0; j<3; j++)
        avail.push([i, j])

// Game
for (let i=0; i<3; i++)
    for (let j =0; j<3; j++)
        board[i][j].addEventListener("click", (e) => {
            if (board[i][j].innerText === "" && !game_end) {
                if (HUMAN_PLAYER == true) {
                    if (cur_player === PLAYER1)
                        update(PLAYER1, i, j), cur_player = PLAYER2
                    else if (cur_player === PLAYER2)
                        update(PLAYER2, i, j), cur_player = PLAYER1
                } else if (COMPUTER_PLAYER === true) {
                    update(PLAYER1, i, j)
                    computerPlayer("O", i, j)
                } else if (AI_PLAYER) {
                    update(PLAYER1, i, j)
                    aiPlayer()
                }
                
                let cur_board = getBoardValues(board)
                game_status = board_status(cur_board)

                if (game_status === PLAYER1) {
                    display_game_status.innerText = "🎉 X Wins 🎉"
                    game_end = true
                } else if (game_status === PLAYER2) {
                    display_game_status.innerText = "🎉 O wins 🎉"
                    game_end = true
                } else if (game_status === "draw") {
                    display_game_status.innerText = "🤝🏻 DRAW 🤝🏻"
                    game_end = true
                }
            }
        })
