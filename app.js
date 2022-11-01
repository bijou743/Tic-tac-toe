const PLAYER_X = 'x';
const PLAYER_O = 'o';
let currentPlayer = PLAYER_X;
let playerWin;

const WIN_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const moves = {
	x: [],
	o: [],
};

const area = document.querySelector('.area');
const restart = document.querySelector('.restart');
const overlay = document.querySelector('.overlay');
const info = document.querySelector('.info');

area.addEventListener('click', (event) => {
	const cell = event.target.closest('.cell');

	if (!cell) return;

	if (cell.classList.contains('checked')) {
		return;
	}

	cell.classList.add('checked');
	cell.classList.add(currentPlayer);

	const currentMove = Array.prototype.indexOf.call(area.children, cell);
	moves[currentPlayer].push(currentMove);

	if (checkIfGameFinished()) {
		finishGame();
	} else {
		changePlayer();
	}
});

restart.addEventListener('click', () => {
	restartGame();
});

function changePlayer() {
	currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
	changeInfo(`Player ${currentPlayer.toUpperCase()} moves`);
}

function checkIfGameFinished() {
	if (moves[currentPlayer].length < 3) {
		return false;
	}

	if (moves.x.length + moves.o.length === 9) {
		return true;
	}

	let win;
	for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
		const combination = WIN_COMBINATIONS[i];

		win = true;
		for (let j = 0; j < combination.length; j++) {
			const move = combination[j];
			const includes = moves[currentPlayer].includes(move);
			if (!includes) {
				win = false;
			}
		}
		if (win) {
			playerWin = currentPlayer;
			return win;
		}
	}

	return win;
}

function finishGame() {
	if (playerWin) {
		changeInfo(`Player ${playerWin.toUpperCase()} won!`);
	} else {
		changeInfo('Draw!');
	}
	overlay.style.display = 'block';
}

function restartGame() {
	const cells = area.querySelectorAll('.cell');

	cells.forEach((item) => {
		item.className = 'cell';
	});

	currentPlayer = PLAYER_X;
	changeInfo(`Player ${currentPlayer.toUpperCase()} moves`);
	moves.x = [];
	moves.o = [];

	overlay.style.display = 'none';
	playerWin = null;
}

function changeInfo(text) {
	info.innerHTML = text;
}
