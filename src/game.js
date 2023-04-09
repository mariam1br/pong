import { Player } from './player.js';
import { Ball } from './ball.js';
import {
	drawElements,
	clearCanvas,
	showGameOverMessage,
	showNewGameMessage,
	showScore,
} from './draw.js';
import { moveBall, movePaddles } from './moves.js';
import { checkCollisions } from './collisions.js';
import { resetScores, resetBall, resetPaddle } from './reset.js';
import {
	canvas,
	PADDLE_HEIGHT,
	PADDLE_WIDTH,
	BALL_SPEED,
	PADDLE_SPEED,
	WINNING_SCORE,
} from './constants.js';

let lastTime = 0;
// Set the initial winner
let winner = '';
// Initialize game state
let gameState = '';

// Create player1 and player2 instances
let player1 = new Player(
	0,
	canvas.height / 2 - PADDLE_HEIGHT / 2,
	PADDLE_HEIGHT,
	PADDLE_WIDTH,
	0,
	'#ffffff'
);
let player2 = new Player(
	canvas.width - PADDLE_WIDTH,
	canvas.height / 2 - PADDLE_HEIGHT / 2,
	PADDLE_HEIGHT,
	PADDLE_WIDTH,
	0,
	'#ffffff',
	true
);

// Create a ball instance
let ball = new Ball(
	canvas.width / 2,
	canvas.height / 2,
	BALL_SPEED,
	BALL_SPEED,
	BALL_SPEED,
	'#ffffff'
);

document.addEventListener('mousemove', function (event) {
	// Move player1 paddle
	player1.y = event.clientY - PADDLE_HEIGHT / 2;
});

document.addEventListener('touchmove', function (event) {
	// Move player1 paddle
	player1.y = event.touches[0].clientY - PADDLE_HEIGHT / 2;
});

document.addEventListener('touchstart', function (event) {
	// Start a new game loop
	if (gameState === '') {
		startNewGame();
	}
});

document.addEventListener('click', function (event) {
	// Start a new game loop
	if (gameState === '') {
		startNewGame();
	}
});

// Add event listeners for paddle movement
document.addEventListener('keydown', function (event) {
	if (event.code === 'KeyW') {
		// Move player1 up
		player1.velocityY = -PADDLE_SPEED;
	} else if (event.code === 'KeyS') {
		// Move player1 down
		player1.velocityY = PADDLE_SPEED;
	} else if (event.code === 'ArrowUp') {
		// Move player2 up
		player2.velocityY = -PADDLE_SPEED;
	} else if (event.code === 'ArrowDown') {
		// Move player2 down
		player2.velocityY = PADDLE_SPEED;
	}
	if (event.code === 'Space' && gameState === '') {
		// Space bar key code
		startNewGame(); // Start a new game loop
	}
});

document.addEventListener('keyup', function (event) {
	if (event.code === 'KeyW' || event.code === 'KeyS') {
		// Stop player1 movement
		player1.velocityY = 0;
	} else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
		// Stop player2 movement
		player2.velocityY = 0;
	}
});

function startNewGame() {
	if (gameState === '') {
		({ player1, player2, winner } = resetScores(player1, player2, winner));
		gameState = 'start';
	}
	({ ball } = resetBall(ball));
	({ player1, player2 } = resetPaddle(player1, player2));

	requestAnimationFrame(update);
}

// Set up the game loop
function update(time) {
	if (lastTime !== null) {
		// Calculate the time difference between the last frame and the current frame
		const dt = time - lastTime;
		gameOver();
		if (gameState === 'gameOver') {
			showGameOverMessage(winner);
			gameState = '';
			return; // Exit the game loop if the game is over
		}
		clearCanvas();
		drawElements(ball, player1, player2);
		({ ball, player1, player2, gameState } = moveBall(
			ball,
			player1,
			player2,
			gameState
		));
		movePaddles(ball, player1, player2);
		({ ball } = checkCollisions(ball, player1, player2));
		showScore(player1.score, player2.score);
	}
	lastTime = time;
	requestAnimationFrame(update);
}

function gameOver() {
	// Check if either player has won yet
	if (player1.score >= WINNING_SCORE || player2.score >= WINNING_SCORE) {
		winner = player1.score >= WINNING_SCORE ? 'Player 1' : 'Player 2';
		gameState = 'gameOver';
	}
}

showNewGameMessage();
