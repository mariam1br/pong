import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { drawBorder, drawMiddleLine, drawPaddles, drawBall } from './draw.js';
import { moveBall, movePaddles } from './moves.js';
import { checkCollisions } from './collisions.js';
import {
	resetScores,
	resetBallPositionAndVelocity,
	resetPaddlePositions,
} from './reset.js';

// Define the ball speed constant
const BALL_SPEED = 5; // You can set this value to whatever you want
// Define the paddle height and width constants
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
// Set the speed of the paddles
const PADDLE_SPEED = 5;
// Define the winnings needed to win the game
const WINNING_SCORE = 1;

const gameFontFamily = 'monospace';

let animationId;

// Set the initial scores
let player1Score = 0;
let player2Score = 0;
// Set the initial winner
let winner = '';
// Initialize game variables
let gameStarted = false;

// Get the canvas element from the HTML file
const canvas = document.getElementById('canvas');
// Get the score elements from the HTML file
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');

// Set up the game context
const ctx = canvas.getContext('2d');

// Create paddle1 and paddle2 instances
let paddle1 = new Paddle(
	PADDLE_HEIGHT,
	PADDLE_WIDTH,
	10,
	canvas.height / 2 - PADDLE_HEIGHT / 2
);
let paddle2 = new Paddle(
	PADDLE_HEIGHT,
	PADDLE_WIDTH,
	canvas.width - PADDLE_WIDTH - 10,
	canvas.height / 2 - PADDLE_HEIGHT / 2
);

// Create a ball instance
let ball = new Ball(
	BALL_SPEED,
	BALL_SPEED,
	canvas.width / 2,
	canvas.height / 2
);

// Add event listeners for paddle movement
document.addEventListener('keydown', function (event) {
	if (event.code === 'KeyW') {
		// Move paddle1 up
		paddle1.velocityY = -PADDLE_SPEED;
	} else if (event.code === 'KeyS') {
		// Move paddle1 down
		paddle1.velocityY = PADDLE_SPEED;
	} else if (event.code === 'ArrowUp') {
		// Move paddle2 up
		paddle2.velocityY = -PADDLE_SPEED;
	} else if (event.code === 'ArrowDown') {
		// Move paddle2 down
		paddle2.velocityY = PADDLE_SPEED;
	}
	if (event.code === 'Space' && !gameStarted) {
		// Space bar key code
		startNewGame(); // Start a new game loop
	}
});

document.addEventListener('keyup', function (event) {
	if (event.code === 'KeyW' || event.code === 'KeyS') {
		// Stop paddle1 movement
		paddle1.velocityY = 0;
	} else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
		// Stop paddle2 movement
		paddle2.velocityY = 0;
	}
});

function startNewGame() {
	({ player1Score, player2Score, winner } = resetScores(
		player1Score,
		player2Score,
		winner
	));
	({ ball } = resetBallPositionAndVelocity(ball, canvas, BALL_SPEED));
	({ paddle1, paddle2 } = resetPaddlePositions(
		paddle1,
		paddle2,
		canvas,
		PADDLE_HEIGHT
	));
	animationId = requestAnimationFrame(loop);
}

function draw() {
	clearCanvas();
	drawBorder(ctx, canvas);
	drawMiddleLine(ctx, canvas);
	drawPaddles(ctx, paddle1, paddle2);
	drawBall(ctx, ball);
}

function update() {
	({ player1Score, player2Score } = moveBall(
		ball,
		player1Score,
		player2Score,
		canvas,
		BALL_SPEED
	));
	movePaddles(paddle1, paddle2, canvas);
	({ ball } = checkCollisions(ball, paddle1, paddle2));
}

// Set up the game loop
function loop() {
	if (gameOver()) {
		showGameOverMessage();
		// Reset the animation loop...
		animationId = requestAnimationFrame(update);
		cancelAnimationFrame(animationId);
		return; // Exit the game loop if the game is over
	}
	draw();
	update();
	updateScore();
	animationId = requestAnimationFrame(loop);
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateScore() {
	player1ScoreElement.textContent = player1Score.toString();
	player2ScoreElement.textContent = player2Score.toString();
}

function gameOver() {
	// Check if either player has won yet
	if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
		winner = player1Score >= WINNING_SCORE ? 'Player 1' : 'Player 2';
		return true;
	}
	return false;
}

function showNewGameMessage() {
	// Add a start screen message
	ctx.font = `20px ${gameFontFamily}`;
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.fillText(
		'Press Space to start a new game',
		canvas.width / 2,
		canvas.height / 2
	);
}

function showGameOverMessage() {
	clearCanvas();
	ctx.fillStyle = '#ffffff';
	ctx.font = `48px ${gameFontFamily}`;
	ctx.textAlign = 'center';
	ctx.fillText(`Game Over`, canvas.width / 2, canvas.height / 2 - 80);
	ctx.font = `32px ${gameFontFamily}`;
	ctx.fillText(`${winner} wins`, canvas.width / 2, canvas.height / 2 - 40);
	showNewGameMessage();
}

showNewGameMessage();
