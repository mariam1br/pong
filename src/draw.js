import { ctx, canvas, GAME_FONT_FAMILY } from './constants.js';

function drawBorder() {
	ctx.strokeStyle = '#aaa';
	ctx.lineWidth = 5;
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawNet() {
	ctx.beginPath();
	ctx.setLineDash([10, 15]);
	ctx.moveTo(canvas.width / 2, 0);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.stroke();
}

function drawPaddles(player1, player2) {
	drawRect(
		player1.x,
		player1.y,
		player1.width,
		player1.height,
		player1.color
	);
	drawRect(
		player2.x,
		player2.y,
		player2.width,
		player2.height,
		player2.color
	);
}

function drawBall(ball) {
	drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function showNewGameMessage() {
	// Add a start screen message
	drawText(
		'Press Space to start a new game',
		canvas.width / 2,
		canvas.height / 2 + 100,
		'#ffffff',
		GAME_FONT_FAMILY,
		16,
		'center'
	);
}

function showGameOverMessage(winner) {
	clearCanvas();
	drawText(
		'Game Over',
		canvas.width / 2,
		canvas.height / 2 - 100,
		'#ffffff',
		GAME_FONT_FAMILY,
		48,
		'center'
	);
	drawText(
		`${winner} wins`,
		canvas.width / 2,
		canvas.height / 2,
		'#ffffff',
		GAME_FONT_FAMILY,
		32,
		'center'
	);
	showNewGameMessage();
}

function showScore(player1Score, player2Score) {
	drawText(
		player1Score,
		canvas.width / 4,
		canvas.height / 5,
		'#ffffff',
		GAME_FONT_FAMILY,
		60,
		'center'
	);
	drawText(
		player2Score,
		(canvas.width / 4) * 3,
		canvas.height / 5,
		'#ffffff',
		GAME_FONT_FAMILY,
		60,
		'center'
	);
}

function drawElements(ball, player1, player2) {
	drawBorder();
	drawNet();
	drawPaddles(player1, player2);
	drawBall(ball);
}

function drawRect(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}

function drawText(text, x, y, color, fontFamily, fontSize, textAlign) {
	ctx.fillStyle = color;
	ctx.font = `${fontSize}px ${fontFamily}`;
	ctx.textAlign = textAlign;
	ctx.fillText(text, x, y);
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export {
	drawElements,
	drawText,
	clearCanvas,
	showGameOverMessage,
	showNewGameMessage,
	showScore,
};
