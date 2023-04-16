import { getGameInstance } from "./classes/game";
import { PADDLE_HEIGHT, PADDLE_SPEED } from "./constants";
import { GameState } from "./types";
import { drawMenu, menuActions, menuCursorDown, menuCursorUp } from "./ui/menu";

// destructuring the game instance
let { player1, player2, gameState, newGame, setPlayers } = getGameInstance();

document.addEventListener("mousemove", function (event: MouseEvent) {
  // Move player1 paddle
  player1.y = event.clientY - PADDLE_HEIGHT / 2;
});

document.addEventListener("touchmove", function (event: TouchEvent) {
  // Move player1 paddle
  player1.y = event.touches[0].clientY - PADDLE_HEIGHT / 2;
});

document.addEventListener("touchstart", function (_event: TouchEvent) {
  // Start a new game loop
  newGame();
});

document.addEventListener("click", function (_event: Event) {
  // Start a new game loop
  newGame();
});

// Add event listeners for paddle movement
document.addEventListener("keydown", function (event: KeyboardEvent) {
  if (event.code === "KeyW") {
    // Move player1 up
    player1.velocityY = -PADDLE_SPEED;
  } else if (event.code === "KeyS") {
    // Move player1 down
    player1.velocityY = PADDLE_SPEED;
  } else if (event.code === "ArrowUp") {
    if (gameState === GameState.menu) {
      event.preventDefault();
      menuCursorUp();
    }
    // Move player2 up
    player2.velocityY = -PADDLE_SPEED;
  } else if (event.code === "ArrowDown") {
    if (gameState === GameState.menu) {
      event.preventDefault();
      menuCursorDown();
    }
    // Move player2 down
    player2.velocityY = PADDLE_SPEED;
  } else if (event.code === "Space" && gameState === GameState.menu) {
    // Start a new game loop
    newGame();
  } else if (event.code === "Escape") {
    // Draw the menu
    drawMenu();
  } else if (event.code === "Enter" && gameState === GameState.menu) {
    // If the Enter key is pressed in menu, do something based on the selected menu option
    menuActions();
  } else if (event.code === "Digit1") {
    // Set the number of players to 1
    console.log("Setting players to 1");
    setPlayers(1);
  } else if (event.code === "Digit2") {
    // Set the number of players to 2
    console.log("Setting players to 2");
    setPlayers(2);
  }
});

// Stop the player from moving
document.addEventListener("keyup", function (event: KeyboardEvent) {
  // Player 1 controls
  if (event.code === "KeyW" || event.code === "KeyS") {
    // Stop player1 movement
    player1.velocityY = 0;
  }
  // Player 2 controls
  else if (event.code === "ArrowUp" || event.code === "ArrowDown") {
    // Stop player2 movement
    player2.velocityY = 0;
  }
});
