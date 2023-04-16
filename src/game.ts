import { Player } from "./player.js";
import { Ball } from "./ball.js";
import {
  drawElements,
  clearCanvas,
  showGameOverMessage,
  showNewGameMessage,
  showScore,
} from "./draw.js";
import { moveBall, movePaddles } from "./moves.js";
import { checkCollisions } from "./collisions.js";
import { resetScores, resetBall, resetPaddle } from "./reset.js";
import {
  canvas,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  BALL_SPEED,
  WINNING_SCORE,
} from "./constants.js";

// Set the initial winner
let winner: string = "";
// Initialize game state
export let gameState: string = "";

// Create player1 and player2 instances
export let player1: Player = new Player(
  0,
  canvas.height / 2 - PADDLE_HEIGHT / 2,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  0,
  "#ffffff"
);
export let player2: Player = new Player(
  canvas.width - PADDLE_WIDTH,
  canvas.height / 2 - PADDLE_HEIGHT / 2,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  0,
  "#ffffff",
  true
);

// Create a ball instance
export let ball: Ball = new Ball(
  canvas.width / 2,
  canvas.height / 2,
  BALL_SPEED,
  BALL_SPEED,
  BALL_SPEED,
  "#ffffff"
);

export const startNewGame = () => {
  if (gameState === "") {
    winner = resetScores({ player1, player2, winner });
    gameState = "start";
  }
  resetBall(ball);
  resetPaddle({ player1, player2 });

  requestAnimationFrame(update);
};

// Set up the game loop
const update = (): void => {
  gameOver();
  if (gameState === "gameOver") {
    showGameOverMessage(winner);
    gameState = "";
    return; // Exit the game loop if the game is over
  }
  clearCanvas();
  drawElements({ ball, player1, player2 });
  moveBall(ball, player1, player2, gameState);
  movePaddles(ball, player1, player2);
  checkCollisions({ ball, player1, player2 });
  showScore(player1.score, player2.score);

  requestAnimationFrame(update);
};

const gameOver = (): void => {
  // Check if either player has won yet
  if (player1.score >= WINNING_SCORE || player2.score >= WINNING_SCORE) {
    winner = player1.score >= WINNING_SCORE ? "Player 1" : "Player 2";
    gameState = "gameOver";
  }
};

// showNewGameMessage();
