boxes = document.querySelectorAll(".box")
var play = 0;

boxes.forEach(element => {
    element.addEventListener("click", (e) => {
        if (play%2 === 0) {
            element.innerText = "X"
            TicTacToeGame(boxes)
            play = 1;
        } else if (play%2 === 1) {
            element.innerText = "0"
            TicTacToeGame(boxes)
            play = 0;
        }
    })
});


function TicTacToeGame(boxes) {
    // Function to check whether Tic-Tac-Toe game is draw/win/loose
    // Parameters : array of div elements

    function validate(i, j, k) {
        if (getValue(boxes[i]) === getValue(boxes[j]) && getValue(boxes[j]) === getValue(boxes[k]) && getValue(boxes[i]) !== "") {
            changeColor(i, j, k)
            return true
        }
        return false
    }

    function getValue(box) {
        return box.innerText;
    }

    function changeColor(i, j, k) {
        boxes[i].style.backgroundColor = "green"
        boxes[j].style.backgroundColor = "green"
        boxes[k].style.backgroundColor = "green"
    }

    // Horizontal check
    for (let i=0; i<9; i+=3)
        if (validate(i, i+1, i+2)) {
            console.log(getValue(boxes[i]))
            return getValue(boxes[i]);
        }
    

    // Vertical Check
    for (let i=0; i<3; i++)
        if (validate(i, i+3, i+6)) {
            console.log(getValue(boxes[i]))
            return getValue(boxes[i]);
        }
        

    // prinical dialognal check 
    if (validate(0, 4, 8)) {
        console.log(getValue(boxes[0]))
        return getValue(boxes[0]);
    }

    
    // opposite diagonal check
    if (validate(2, 4, 6)) {
        console.log(getValue(boxes[2]))
        return getValue(boxes[2]);
    }

    // Check for draw
    let emptyCount = 0;
    for (let i=0; i<9; i++)
        if (getValue(boxes[i]) === "")
            emptyCount++;
    if (emptyCount === 0)
        return "draw"
}

