import { player1, player2, gameState } from './game';
import { PADDLE_HEIGHT, PADDLE_SPEED } from './constants';

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
