function checkCollisions(ball, paddle1, paddle2) {
	// Check for collision with paddle1
	({ ball } = isCollision(ball, paddle1, paddle1, paddle2));
	// Check for collision with paddle2
	({ ball } = isCollision(ball, paddle2, paddle1, paddle2));
	return { ball };
}

function isCollision(ball, paddle, paddle1, paddle2) {
	const currentPaddle = paddle === paddle1 ? paddle1 : paddle2;
	const collisionX =
		paddle === paddle1
			? ball.x - ball.radius <= currentPaddle.x + currentPaddle.width
			: ball.x + ball.radius >= currentPaddle.x;
	const collisionY =
		ball.y >= currentPaddle.y &&
		ball.y <= currentPaddle.y + currentPaddle.height;
	if (collisionX && collisionY) ball.velocityX = -ball.velocityX;
	return { ball };
}

export { checkCollisions };
