import { canvas } from "./constants.js";
import { Ball } from "./ball.js";
import { Player } from "./player.js";
import { BallAndPlayer, BallAndPlayers } from "./types.js";

const checkCollisions = (ballAndPlayers: BallAndPlayers): Ball => {
  // destructure the args
  let { ball, player1, player2 } = ballAndPlayers;
  // If the ball is on the left, player1 is the player, otherwise player2 is the player
  let player: Player = ball.x < canvas.width / 2 ? player1 : player2;

  if (isCollision({ ball, player })) {
    // Where on the paddle did the ball hit?
    let collidePoint: number = ball.y - (player.y + player.height / 2);

    // Normalize the value of collidePoint, we need to get numbers between -1 and 1.
    collidePoint = collidePoint / (player.height / 2);

    // (Math.PI / 4) is 45 degrees
    let angleRad: number = collidePoint * (Math.PI / 4);

    // If the ball was moving to the left, the angle should be in the right (1). If it was moving to the right, the angle should be in the left (-1).
    let direction: number = ball.x < canvas.width / 2 ? 1 : -1;

    // We'll multiply the ball's speed by the new X velocity
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);

    // We'll multiply the ball's speed by the new Y velocity
    ball.velocityY = ball.speed * Math.sin(angleRad);

    // Increase the ball's speed
    ball.speed += 0.5;
  }
  return ball;
};

const isCollision = (ballAndPlayer: BallAndPlayer): boolean => {
  // destructure the args
  let { ball, player } = ballAndPlayer;
  // Ball edges
  const ballTop = ball.y - ball.radius;
  const ballBottom = ball.y + ball.radius;
  const ballLeft = ball.x - ball.radius;
  const ballRight = ball.x + ball.radius;

  // Player edges
  const playerTop = player.y;
  const playerBottom = player.y + player.height;
  const playerLeft = player.x;
  const playerRight = player.x + player.width;

  // Check if ball edges are past player edges
  const isBallRightEdgePastPlayerLeftEdge: boolean = ballRight > playerLeft; // ball right edge past player left edge
  const isBallLeftEdgePastPlayerRightEdge: boolean = ballLeft < playerRight; // ball left edge past player right edge
  const isBallBottomEdgePastPlayerTopEdge: boolean = ballBottom > playerTop; // ball bottom edge past player top edge
  const isBallTopEdgePastPlayerBottomEdge: boolean = ballTop < playerBottom; // ball top edge past player bottom edge

  // Check if ball is between player edges and not in the corners
  // If ball is in the corners, it's not a collision
  // This is a little hacky, but it's a good start
  return (
    isBallRightEdgePastPlayerLeftEdge &&
    isBallLeftEdgePastPlayerRightEdge &&
    isBallBottomEdgePastPlayerTopEdge &&
    isBallTopEdgePastPlayerBottomEdge &&
    ball.x > player.x &&
    ball.x < player.x + player.width
  );
};

export { checkCollisions };
