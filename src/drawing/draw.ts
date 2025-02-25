import { ctx, canvas, GAME_FONT_FAMILY, DEFAULT_COLOR } from "../constants";
import { Ball } from "../classes/ball";
import { BallAndPlayers, Draw, Players } from "../types";
import { Player } from "../classes/player"; // Add import for Player type

// Set the canvas width and height to the window width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drawBorder = (): void => {
  // Draw a border around the canvas
  let borderThickness = 5;
  let borderColor = "rgba(170, 170, 170, 1)";
  ctx.lineWidth = borderThickness;
  ctx.strokeStyle = borderColor;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
};

//draws the net
const drawNet = (): void => {
  //net width
  const width = 10;
  //net height
  const height = 15;
  //net x coordinate
  const x = canvas.width / 2;
  //net y coordinate
  const y = 0;
  //net length
  const length = canvas.height;

  ctx.beginPath();
  ctx.setLineDash([width, height]);
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + length);
  ctx.stroke();
};

// Helper function to draw a single paddle
// Extracted to eliminate code duplication and improve maintainability
const drawSinglePaddle = (player: Player, playerName: string): void => {
  // Check if the player exists
  if (!player) {
    throw new Error(`${playerName} paddle is missing`);
  }
  
  // Check if the player has all required properties
  if (!player.width || !player.height || !player.color) {
    throw new Error(`${playerName} paddle is missing required properties`);
  }
  
  // Draw the paddle using common code
  drawRect({
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
    color: player.color,
  });
};

// Draw the paddles.
const drawPaddles = (players: Players): void => {
  // destructure the args
  const { player1, player2 } = players;

  // Draw both paddles using the helper function
  // This eliminates duplicate validation and drawing code
  drawSinglePaddle(player1, "Player 1");
  drawSinglePaddle(player2, "Player 2");
};

// Draw a ball on the screen
const drawBall = (ball: Ball): void => {
  if (ball === null) {
    return; // If the ball is null, stop drawing it
  }
  if (ball.radius <= 0) {
    return; // If the ball has a radius of 0, stop drawing it
  }
  // Draw the ball using the circle const
  drawCircle({ x: ball.x, y: ball.y, radius: ball.radius, color: ball.color });
};

const drawElements = (ballAndPlayers: BallAndPlayers): void => {
  const { ball, player1, player2 } = ballAndPlayers;
  // Draw the game's border
  drawBorder();

  // Draw the game's net
  drawNet();

  // Draw the paddles for both players
  drawPaddles({ player1, player2 });

  // Draw the ball
  drawBall(ball);
};

const drawRect = (draw: Draw): void => {
  // Use consistent parameter names that match the type definition
  // instead of aliasing with shorthand (w, h)
  const { x, y, width, height, color = DEFAULT_COLOR } = draw;
  
  // Check for invalid dimensions with a more descriptive error message
  if (width <= 0 || height <= 0) {
    throw new Error("Invalid dimensions");
  }
  
  // Set the fill color
  ctx.fillStyle = color;
  
  // Draw the rectangle
  ctx.fillRect(x, y, width, height);
};

const drawCircle = (draw: Draw): void => {
  const { x, y, radius, color } = draw;
  // Draw a circle
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("x and y must be numbers");
  }

  if (typeof radius !== "number") {
    throw new Error("radius must be a number");
  }

  if (typeof color !== "string") {
    throw new Error("color must be a string");
  }

  // Add a circle to the canvas
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
};

const drawText = (draw: Draw): void => {
  const {
    text,
    x,
    y,
    color = DEFAULT_COLOR,
    fontFamily = GAME_FONT_FAMILY,
    fontSize = 32,
    textAlign = "center",
    isBold = false,
    hasShadow = false,
  } = draw;
  // Check that the text is not empty.
  if (!text) {
    throw new Error("Text is empty.");
  }
  // Check that the coordinates are numbers.
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("Coordinates are not numbers.");
  }
  // Set the fill color.
  ctx.fillStyle = color;
  // Set the font.
  ctx.font = `${isBold ? "bold" : ""} ${fontSize}px ${fontFamily}`;
  // Set the text alignment.
  ctx.textAlign = textAlign;

  // clear context shadow
  ctx.shadowColor = "transparent";

  // add a shadow to the text
  if (hasShadow) {
    ctx.shadowColor = "rgba(128, 128, 128)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
  }

  // Draw the text.
  ctx.fillText(text, x, y);
};

const clearCanvas = (): void => {
  // Remove everything from the canvas
  // If the canvas is not initialized properly or the context is not good,
  // do nothing. This is a "fail fast" approach.
  if (!canvas || !ctx) {
    return;
  }
  try {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } catch (e) {
    // We could do something with the error, but we are not interested in it
    // for now. This method is not critical, so we can just ignore it.
  }
};

export { drawElements, drawText, clearCanvas };