document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Functions to check for a win
    function checkWinner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                isGameActive = false;
                statusText.textContent = `Player ${currentPlayer} wins!`;
                cells[a].style.backgroundColor = '#a8e6cf';
                cells[b].style.backgroundColor = '#a8e6cf';
                cells[c].style.backgroundColor = '#a8e6cf';
                return;
            }
        }

        if (!board.includes('')) {
            isGameActive = false;
            statusText.textContent = 'It\'s a draw!';
        }
    }

    // Function to handle player actions
    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] || !isGameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (isGameActive) {
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    // Reset the game board
    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '#ffffff';
        });
    }

    // Event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    // Initialize status
    statusText.textContent = `Player ${currentPlayer}'s turn`;

});