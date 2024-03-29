const cells = document.querySelectorAll('.cell');
const message = document.querySelector('#message');
const reset = document.querySelector('#reset');
const winningConditions = [
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
    [0, 2, 6, 8]
];

let options = ["", "", "", "", "", "", "", "", "",];
let currentPlayer = 'X';
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    reset.addEventListener("click", restartGame)
    message.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    message.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        const cellD = options[condition[3]];
        
        if (cellA == "" || cellB == "" || cellC == "" || cellD == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC && cellC == cellD || (cellA == cellB && cellB == cellC)) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `${currentPlayer} wins!`;
        running = false;
        const cellsToChange = [condition[0], condition[1], condition[2]]; // Modify for 4 cell wins
      cellsToChange.forEach(cellIndex => {
        const cell = cells[cellIndex];
        cell.style.backgroundColor = 'green'; // Set background color to green
      });
    } else if (!options.includes("")) {
        message.textContent = `Draw!`;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", "",];
    message.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}