import { Ball } from "./ball.js";
import { Player } from "./player.js";
import { BALL_SPEED, PADDLE_HEIGHT, canvas } from "./constants.js";
import { PlayersAndWinner, Players } from "./types.js";

const resetScores = (playersAndWinner: PlayersAndWinner): PlayersAndWinner => {
  // destructure the args
  let { player1, player2, winner } = playersAndWinner;

  // reset scores
  player1.score = 0;
  player2.score = 0;

  // reset winner
  winner = "";

  // return the new values
  return { player1, player2, winner };
};

const resetBall = (ball: Ball): Ball => {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = BALL_SPEED;
  ball.velocityX = -ball.velocityX;
  return ball;
};

const resetPaddle = (players: Players): Players => {
  // destructure the args
  let { player1, player2 } = players;
  player1.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
  player2.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
  return { player1, player2 };
};

export { resetScores, resetBall, resetPaddle };
