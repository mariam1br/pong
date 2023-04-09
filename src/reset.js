import { BALL_SPEED, PADDLE_HEIGHT, canvas } from './constants.js';

function resetScores(player1, player2, winner) {
	player1.score = 0;
	player2.score = 0;
	winner = '';
	return { player1, player2, winner };
}

function resetBall(ball) {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.speed = BALL_SPEED;
	ball.velocityX = -ball.velocityX;
	return { ball };
}

function resetPaddle(player1, player2) {
	player1.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
	player2.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
	return { player1, player2 };
}

export { resetScores, resetBall, resetPaddle };
