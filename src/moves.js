import { AI_LEVEL, canvas } from './constants.js';
import { resetBall } from './reset.js';

function moveBall(ball, player1, player2, gameState) {
	// Move the ball
	// Add a random sign to the ball's velocity
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;

	// Bounce the ball off the top and bottom walls
	if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
		ball.velocityY = -ball.velocityY;
	}

	// Bounce the ball off the left and right walls, and update scores
	if (ball.x + ball.radius > canvas.width) {
		ball.velocityX = -ball.velocityX;
		player1.score++;
		gameState = 'scores';
		({ ball } = resetBall(ball));
	} else if (ball.x - ball.radius < 0) {
		ball.velocityX = -ball.velocityX;
		player2.score++;
		gameState = 'scores';
		({ ball } = resetBall(ball));
	}
	return { ball, player1, player2, gameState };
}

function movePaddles(ball, player1, player2) {
	// Move player1
	movePaddle(player1, ball);
	// if ai is enabled, move the paddle to the ball
	if (player2.ai) {
		player2.y = ball.y - player2.height / 2 + AI_LEVEL;
	} else {
		// Move player2
		movePaddle(player2, canvas);
	}
}

function movePaddle(player) {
	if (
		player.y + player.velocityY > 0 &&
		player.y + player.height + player.velocityY < canvas.height
	) {
		player.y += player.velocityY;
	}
}

export { moveBall, movePaddles };
