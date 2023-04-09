function resetScores(player1Score, player2Score, winner) {
	player1Score = 0;
	player2Score = 0;
	winner = '';
	return { player1Score, player2Score, winner };
}

function resetBallPositionAndVelocity(ball, canvas, BALL_SPEED) {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.velocityX = BALL_SPEED;
	ball.velocityY = BALL_SPEED;
	return { ball };
}

function resetPaddlePositions(paddle1, paddle2, canvas, PADDLE_HEIGHT) {
	paddle1.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
	paddle2.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
	return { paddle1, paddle2 };
}

export { resetScores, resetBallPositionAndVelocity, resetPaddlePositions };
