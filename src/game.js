const WINNING_SCORE = 2;
// Define the ball speed constant
const BALL_SPEED = 5; // You can set this value to whatever you want
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
// Set the speed of the paddles
const PADDLE_SPEED = 5;
// Set the initial scores
let player1Score = 0;
let player2Score = 0;
let winner = '';

// Get the canvas element from the HTML file
const canvas = document.getElementById('canvas');
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');

// Set up the game context
const ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// Set the initial positions of the paddles
const paddle1 = {
	height: PADDLE_HEIGHT,
	velocityY: 0,
	width: PADDLE_WIDTH,
	x: 10,
	y: canvasHeight / 2 - PADDLE_HEIGHT / 2,
};

const paddle2 = {
	height: PADDLE_HEIGHT,
	velocityY: 0,
	width: PADDLE_WIDTH,
	x: canvasWidth - PADDLE_WIDTH - 10,
	y: canvasHeight / 2 - PADDLE_HEIGHT / 2,
};

// Set the initial position and velocity of the ball
const ball = {
	radius: 10,
	velocityX: BALL_SPEED,
	velocityY: BALL_SPEED,
	x: canvasWidth / 2,
	y: canvasHeight / 2,
};

function draw() {
	clearCanvas();
	drawBorder();
	drawMiddleLine();
	drawPaddles();
	drawBall();
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawBorder() {
	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = 5;
	ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
}

function drawMiddleLine() {
	ctx.beginPath();
	ctx.setLineDash([10, 15]);
	ctx.moveTo(canvasWidth / 2, 0);
	ctx.lineTo(canvasWidth / 2, canvasHeight);
	ctx.stroke();
}

function drawPaddles() {
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
	ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = '#ffffff';
	ctx.fill();
}

function updateScore() {
	player1ScoreElement.textContent = player1Score.toString();
	player2ScoreElement.textContent = player2Score.toString();
}

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
	if (event.code === 'Space') {
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

function update() {
	moveBall();
	movePaddles();
	checkScore();
}

function moveBall() {
	// Move the ball
	// Add a random sign to the ball's velocity
	ball.x += Math.random() < 1.5 ? -ball.velocityX : ball.velocityX;
	ball.y += Math.random() < 1.5 ? -ball.velocityY : ball.velocityY;

	// Check if ball has started moving
	if (ball.velocityX === BALL_SPEED && ball.velocityY === BALL_SPEED) {
		// Randomize angle between -45 and 45 degrees
		const angle = Math.floor(Math.random() * 91) - 45;

		// Calculate new velocities based on angle
		const radians = (angle * Math.PI) / 180;
		ball.velocityX = BALL_SPEED * Math.cos(radians);
		ball.velocityY = BALL_SPEED * Math.sin(radians);
	}

	// Bounce the ball off the top and bottom walls
	if (ball.y + ball.radius > canvasHeight || ball.y - ball.radius < 0) {
		ball.velocityY = -ball.velocityY;
	}

	// Bounce the ball off the left and right walls, and update scores
	if (ball.x + ball.radius > canvasWidth) {
		ball.velocityX = -ball.velocityX;
		player1Score++;
	} else if (ball.x - ball.radius < 0) {
		ball.velocityX = -ball.velocityX;
		player2Score++;
	}
}

function movePaddles() {
	// Move paddle1
	movePaddle(paddle1);
	// Move paddle2
	movePaddle(paddle2);
}

function checkScore() {
	// Check for collision with paddle1
	isCollision(ball, paddle1);
	// Check for collision with paddle2
	isCollision(ball, paddle2);
}

function movePaddle(paddle) {
	if (
		paddle.y + paddle.velocityY > 0 &&
		paddle.y + paddle.height + paddle.velocityY < canvasHeight
	) {
		paddle.y += paddle.velocityY;
	}
}

function isCollision(ball, paddle) {
	const currentPaddle = paddle === paddle1 ? paddle1 : paddle2;
	const collisionX =
		paddle === paddle1
			? ball.x - ball.radius <= currentPaddle.x + currentPaddle.width
			: ball.x + ball.radius >= currentPaddle.x;
	const collisionY =
		ball.y >= currentPaddle.y &&
		ball.y <= currentPaddle.y + currentPaddle.height;
	if (collisionX && collisionY) ball.velocityX = -ball.velocityX;
}

function gameOver() {
	// Check if either player has won yet
	if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
		winner = player1Score >= WINNING_SCORE ? 'Player 1' : 'Player 2';
		return true;
	}
	return false;
}

function showGameOverMessage() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	ctx.fillStyle = '#ffffff';
	ctx.font = '48px monospace';
	ctx.textAlign = 'center';
	ctx.fillText(`Game Over`, canvasWidth / 2, canvasHeight / 2);
	ctx.font = '30px monospace';
	ctx.fillText(`${winner} wins`, canvasWidth / 2, canvasHeight - 350 / 2);
	ctx.font = '20px monospace';
	ctx.fillText(
		'Press spacebar to start again',
		canvasWidth / 2,
		canvasHeight - 250 / 2
	);
}

function startNewGame() {
	resetScores();
	resetBallPositionAndVelocity();
	resetPaddlePositions();
	requestAnimationFrame(loop);
}

function resetScores() {
	player1Score = 0;
	player2Score = 0;
	winner = '';
}

function resetBallPositionAndVelocity() {
	ball.x = canvasWidth / 2;
	ball.y = canvasHeight / 2;
	ball.velocityX = BALL_SPEED;
	ball.velocityY = BALL_SPEED;
}

function resetPaddlePositions() {
	paddle1.y = canvasHeight / 2 - PADDLE_HEIGHT / 2;
	paddle2.y = canvasHeight / 2 - PADDLE_HEIGHT / 2;
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
	requestAnimationFrame(loop);
}

// Start the game loop
startNewGame();
