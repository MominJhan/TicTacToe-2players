let boxes = document.querySelectorAll('.box');
let resetbutton = document.querySelector('.btn');
let msg = document.querySelector('.msg');
// Turn playerX, player0
let turn0 = true;

const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function disableBoxes() {
    boxes.forEach(box => {
        box.classList.add('disabled');
        box.removeEventListener('click', handleClick); // Disable click events
    });
}

function enableBoxes() {
    boxes.forEach(box => {
        box.classList.remove('disabled');
        box.innerHTML = '';
        box.addEventListener('click', handleClick); // Enable click events
    });
}

function resetGame() {
    turn0 = true; // Reset turn
    enableBoxes();
    msg.classList.add('hide');
}

function showWinner(winner) {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msg.classList.remove('hide');
    disableBoxes();
}

function handleClick(event) {
    const box = event.target;

    if (box.classList.contains('disabled')) return; // Ignore if disabled

    if (turn0) { // Player 0
        box.innerText = '0';
        turn0 = false;
    } else { // Player X
        box.innerText = 'X';
        turn0 = true;
    }

    box.classList.add('disabled');
    checkWinner();
}

function checkWinner() {
    for (const pattern of winningPattern) {
        let value1 = boxes[pattern[0]].innerText;
        let value2 = boxes[pattern[1]].innerText;
        let value3 = boxes[pattern[2]].innerText;

        if (value1 !== '' && value2 !== '' && value3 !== '') {
            if (value1 === value2 && value2 === value3) {
                showWinner(value1);
                return;
            }
        }
    }

    // Check for a draw
    if ([...boxes].every(box => box.classList.contains('disabled'))) {
        msg.innerText = "It's a draw!";
        msg.classList.remove('hide');
        disableBoxes();
    }
}

resetbutton.addEventListener('click', resetGame);

// Initialize the game
enableBoxes();
