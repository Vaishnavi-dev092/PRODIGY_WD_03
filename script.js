// Select elements
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const cells = document.querySelectorAll('.cell');

// Game variables
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning conditions
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || !gameActive || currentPlayer === 'O') return;

    // Player move
    updateCell(cell, index, currentPlayer);

    // Check for result or let computer play
    if (gameActive) setTimeout(computerMove, 500); // Delay for realism
}

// Computer's move
function computerMove() {
    if (!gameActive) return;

    // Find available cells
    const availableIndices = gameState.map((val, index) => (val === '' ? index : null)).filter(val => val !== null);

    // Random move
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const cell = cells[randomIndex];

    // Update cell for computer
    updateCell(cell, randomIndex, 'O');
}

// Update cell and check for results
function updateCell(cell, index, player) {
    gameState[index] = player;
    cell.textContent = player;
    cell.classList.add('taken');

    checkWinner(player);
}

// Check for winner or draw
function checkWinner(player) {
    let roundWon = false;

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] === player && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = player === 'X' ? 'You Win! 🎉' : 'Computer Wins! 🤖';
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusText.textContent = 'It\'s a Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = currentPlayer === 'X' ? 'Your Turn (X)' : 'Computer\'s Turn (O)';
}

// Restart game
function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = "Your Turn (X)";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
