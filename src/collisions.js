import { canvas } from './constants.js';

function checkCollisions(ball, player1, player2) {
	let player = ball.x < canvas.width / 2 ? player1 : player2; // If the ball is on the left, player1 is the player, otherwise player2 is the player

	if (isCollision(ball, player)) {
		let collidePoint = ball.y - (player.y + player.height / 2); // Where on the paddle did the ball hit?
		collidePoint = collidePoint / (player.height / 2); // Normalize the value of collidePoint, we need to get numbers between -1 and 1.
		let angleRad = collidePoint * (Math.PI / 4); // (Math.PI / 4) is 45 degrees
		let direction = ball.x < canvas.width / 2 ? 1 : -1; // If the ball was moving to the left, the angle should be in the right (1). If it was moving to the right, the angle should be in the left (-1).

		ball.velocityX = direction * ball.speed * Math.cos(angleRad); // We'll multiply the ball's speed by the new X velocity
		ball.velocityY = ball.speed * Math.sin(angleRad); // We'll multiply the ball's speed by the new Y velocity
		ball.speed += 0.5; // Increase the ball's speed
	}
	return { ball };
}

function isCollision(ball, player) {
	// Player's top, bottom, left, and right edges
	const playerTop = player.y;
	const playerBottom = player.y + player.height;
	const playerLeft = player.x;
	const playerRight = player.x + player.width;
	// Ball's top, bottom, left, and right edges
	const ballTop = ball.y - ball.radius;
	const ballBottom = ball.y + ball.radius;
	const ballLeft = ball.x - ball.radius;
	const ballRight = ball.x + ball.radius;

	return (
		ballRight > playerLeft &&
		ballLeft < playerRight &&
		ballBottom > playerTop &&
		ballTop < playerBottom
	);
}

export { checkCollisions };
