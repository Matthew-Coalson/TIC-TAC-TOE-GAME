
const colors = {
    null: ['var(--dark-teal)', 'var(--light-teal)'],
    player1: ['var(--light-teal)', "var(--dark-teal)"],
    player2: ['var(--orange)', 'var(--dark-orange)']
}
const winCon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let boardState = [];
let turn;
let winner;

const sqrsEl = document.querySelectorAll('#board > .square');
const boardEl = document.getElementById('board');
const replayBtn = document.getElementById('replay');
const turnSqr = document.getElementById('turn');

init();

boardEl.addEventListener('click', handleSqrClick);
replayBtn.addEventListener('click', init);

function init() {
    boardState = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    replayBtn.style.visibility = 'hidden';
    render();
}

function render() {
    renderBoard();
    renderTurnSqr();
    renderWin();

}

function renderBoard() {
    for (let i = 0; i < sqrsEl.length; i++) {
        if (boardState[i] === null) {
            sqrsEl[i].textContent = null;
            sqrsEl[i].style.backgroundColor = colors.null[0];
            sqrsEl[i].style.color = colors.null[1];
        } else if (boardState[i] === 1) {
            sqrsEl[i].textContent = 'X';
            sqrsEl[i].style.backgroundColor = colors.player1[0];
            sqrsEl[i].style.color = colors.player1[1];
        } else if (boardState[i] === -1) {
            sqrsEl[i].textContent = 'O';
            sqrsEl[i].style.backgroundColor = colors.player2[0];
            sqrsEl[i].style.color = colors.player2[1];
        }
    }
}

function renderTurnSqr() {
    if (turn === 1) {
        turnSqr.textContent = 'X';
        turnSqr.style.backgroundColor = colors.player1[0];
        turnSqr.style.color = colors.player1[1];
    } else if (turn === -1) {
        turnSqr.textContent = "O";
        turnSqr.style.backgroundColor = colors.player2[0];
        turnSqr.style.color = colors.player2[1];
    }
}

function renderWin() {
    if (winner !== null) {
        replayBtn.style.visibility = 'visible';
        if (winner === 1) {
            turnSqr.textContent = 'X Wins!';
            turnSqr.style.backgroundColor = colors.player1[0];
            turnSqr.style.color = colors.player1[1];
        } else if (winner === -1) {
            turnSqr.textContent = 'O Wins!';
            turnSqr.style.backgroundColor = colors.player2[0];
            turnSqr.style.color = colors.player2[1];
        } else if (winner === 'T') {
            turnSqr.textContent = 'Cat Wins';
            turnSqr.style.backgroundColor = colors.null[0];
            turnSqr.style.color = colors.null[1];
        }
    }   
}

function handleSqrClick(e) {
    let sqr = e.target.dataset.index;
    if (boardState[sqr] === null && winner === null) {
        boardState[sqr] = turn; 
        testWinCon();
        if (winner === null) turn *= -1;
        
    } else return;
    render();
}

function testWinCon() {
    for (let i = 0; i < winCon.length; i++) {
        if (boardState[winCon[i][0]] !== null && boardState[winCon[i][0]] === boardState[winCon[i][1]] && boardState[winCon[i][1]] === boardState[winCon[i][2]]) {
            winner = turn;
        }
    }
    if (winner === null) {
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] === null) {
                return;
            }
        }
        winner = 'T';
    }
}
