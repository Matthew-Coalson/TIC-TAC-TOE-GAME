
const colors = {
    'null': ['var(--dark-teal)', 'var(--light-teal)'],
    '1': ['var(--light-teal)', "var(--dark-teal)"],
    '-1': ['var(--orange)', 'var(--dark-orange)'],
    'T': ['var(--dark-teal)', 'var(--dark-orange)']
}
const players = {
    'null': null,
    '1': 'X',
    '-1': 'O'
}
const win = {
    'T': 'Cat wins',
    '1': 'X wins',
    '-1': 'O wins'
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
    boardState.forEach(function(element, index) {
        sqrsEl[index].textContent = players[element];
        sqrsEl[index].style.backgroundColor = colors[element][0];
        sqrsEl[index].style.color = colors[element][1];
    }) 
}

function renderTurnSqr() {
    turnSqr.textContent = players[turn];
}

function renderWin() {
    if (winner !== null) {
        replayBtn.style.visibility = 'visible';
        turnSqr.textContent = win[winner];
        turnSqr.style.backgroundColor = colors[winner][0];
        turnSqr.style.color = colors[winner][1];    
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
