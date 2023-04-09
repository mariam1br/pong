function moveBall(ball, player1Score, player2Score, canvas, BALL_SPEED) {
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
	if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
		ball.velocityY = -ball.velocityY;
	}

	// Bounce the ball off the left and right walls, and update scores
	if (ball.x + ball.radius > canvas.width) {
		ball.velocityX = -ball.velocityX;
		player1Score++;
	} else if (ball.x - ball.radius < 0) {
		ball.velocityX = -ball.velocityX;
		player2Score++;
	}
	return { player1Score, player2Score };
}

function movePaddles(paddle1, paddle2, canvas) {
	// Move paddle1
	movePaddle(paddle1, canvas);
	// Move paddle2
	movePaddle(paddle2, canvas);
}

function movePaddle(paddle, canvas) {
	if (
		paddle.y + paddle.velocityY > 0 &&
		paddle.y + paddle.height + paddle.velocityY < canvas.height
	) {
		paddle.y += paddle.velocityY;
	}
}

export { moveBall, movePaddles };
