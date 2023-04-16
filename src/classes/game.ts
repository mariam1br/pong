import {
  canvas,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  DEFAULT_COLOR,
  BALL_SPEED,
  WINNING_SCORE,
} from "../constants";
import { clearCanvas, drawElements } from "../drawing/draw";
import { showGameOverMessage, showScore } from "../drawing/messages";
import { checkCollisions } from "../engine/collisions";
import { moveBall, movePaddles } from "../engine/moves";
import { resetScores, resetBall, resetPaddle } from "../reset";
import { GameState } from "../types";
import { Ball } from "./ball";
import { Player } from "./player";

export class Game {
  _players: number = 1;
  winner: Player | null;
  player1: Player;
  player2: Player;
  ball: Ball;
  gameState: GameState;
  constructor() {
    this.winner = null;
    this.player1 = new Player(
      "Player 1",
      0,
      canvas.height / 2 - PADDLE_HEIGHT / 2,
      PADDLE_HEIGHT,
      PADDLE_WIDTH,
      0,
      DEFAULT_COLOR
    );
    this.player2 = new Player(
      this._players > 1 ? "Player 2" : "Computer",
      canvas.width - PADDLE_WIDTH,
      canvas.height / 2 - PADDLE_HEIGHT / 2,
      PADDLE_HEIGHT,
      PADDLE_WIDTH,
      0,
      DEFAULT_COLOR,
      this._players > 1 ? false : true
    );
    this.ball = new Ball(
      canvas.width / 2,
      canvas.height / 2,
      BALL_SPEED,
      BALL_SPEED,
      BALL_SPEED,
      DEFAULT_COLOR
    );
    this.gameState = GameState.menu;
  }

  setPlayers(players: number) {
    this._players = players;
  }

  newGame() {
    // getGameInstance();
    if (
      !this.gameState ||
      this.gameState === GameState.menu ||
      this.gameState === GameState.gameOver
    ) {
      resetScores({
        player1: this.player1,
        player2: this.player2,
        winner: this.winner,
      });
      this.gameState = GameState.start;
      resetBall(this.ball);
      resetPaddle({ player1: this.player1, player2: this.player2 });
    }
    requestAnimationFrame(this.update.bind(this));
  }

  update() {
    this.gameOver();
    if (this.gameState === "gameOver") {
      showGameOverMessage(this.winner as Player);
      this.gameState = GameState.menu;
      return; // Exit the game loop if the game is over
    }
    clearCanvas();
    drawElements({
      ball: this.ball,
      player1: this.player1,
      player2: this.player2,
    });
    moveBall(this.ball, this.player1, this.player2, this.gameState);
    movePaddles(this.ball, this.player1, this.player2);
    checkCollisions({
      ball: this.ball,
      player1: this.player1,
      player2: this.player2,
    });
    showScore(this.player1.score, this.player2.score);

    requestAnimationFrame(this.update.bind(this));
  }

  gameOver() {
    if (
      this.player1.score === WINNING_SCORE ||
      this.player2.score === WINNING_SCORE
    ) {
      this.gameState = GameState.gameOver;
      this.winner =
        this.player1.score > this.player2.score ? this.player1 : this.player2;
    }
  }
}

// create only one instance of the game and a method to access it
let game: Game;
export const getGameInstance = (): Game => {
  if (!game) {
    console.log("creating new game");
    game = new Game();
  }
  console.log("returning game", game);
  return game;
};
