import { ctx, canvas, GAME_FONT_FAMILY } from "./constants.js";
import { Ball } from "./ball.js";
import { BallAndPlayers, Draw, Players } from "./types.js";

const drawBorder = (): void => {
  // Draw a border around the canvas
  let borderThickness = 5;
  let borderColor = "#aaa";
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

// Draw the paddles.
const drawPaddles = (players: Players): void => {
  // destructure the args
  let { player1, player2 } = players;
  // draw player1 paddle
  if (player1) {
    if (player1.width && player1.height && player1.color) {
      drawRect({
        x: player1.x,
        y: player1.y,
        width: player1.width,
        height: player1.height,
        color: player1.color,
      });
    } else {
      throw new Error("player1 paddle is missing a required property");
    }
  } else {
    throw new Error("player1 paddle is missing");
  }

  // draw player2 paddle
  if (player2) {
    if (player2.width && player2.height && player2.color) {
      drawRect({
        x: player2.x,
        y: player2.y,
        width: player2.width || 0,
        height: player2.height || 0,
        color: player2.color || "#ffffff",
      });
    } else {
      throw new Error("player2 paddle is missing a required property");
    }
  } else {
    throw new Error("player2 paddle is missing");
  }
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

const showNewGameMessage = (): void => {
  const text = "Press Space to start a new game";
  const x = canvas.width / 2;
  const y = canvas.height / 2 + 100;
  const color = "#ffffff";
  const fontFamily = GAME_FONT_FAMILY;
  const fontSize = 16;
  const textAlign = "center";
  if (canvas && canvas.width && canvas.height) {
    drawText({ text, x, y, color, fontFamily, fontSize, textAlign });
  }
};

const showGameOverMessage = (winner: string): void => {
  clearCanvas();

  const messageFontFamily = GAME_FONT_FAMILY;
  const messageTextAlign = "center";
  const messageColor = "#ffffff";
  const messageWidth = canvas.width / 2;
  const messageHeight = canvas.height / 2;

  // draw game over message
  drawText({
    text: "Game Over",
    x: messageWidth,
    y: messageHeight - 100,
    color: messageColor,
    fontFamily: messageFontFamily,
    fontSize: 48,
    textAlign: messageTextAlign,
  });

  // draw winner message
  drawText({
    text: `${winner} wins`,
    x: messageWidth,
    y: messageHeight,
    color: messageColor,
    fontFamily: messageFontFamily,
    fontSize: 32,
    textAlign: messageTextAlign,
  });

  // draw new game message
  showNewGameMessage();
};

// Draw the score for both players
const showScore = (player1Score: number, player2Score: number): void => {
  const scoreFontFamily = GAME_FONT_FAMILY;
  const scoreTextSize = 60;
  const scoreTextAlign = "center";
  const scoreColor = "#ffffff";
  const leftPlayerScorePosition = canvas.width / 4;
  const rightPlayerScorePosition = (canvas.width / 4) * 3;
  const scoresCanvasHeight = canvas.height / 5;

  // Draw player 1's score
  drawText({
    text: player1Score.toString(),
    x: leftPlayerScorePosition,
    y: scoresCanvasHeight,
    color: scoreColor,
    fontFamily: scoreFontFamily,
    fontSize: scoreTextSize,
    textAlign: scoreTextAlign,
  });

  // Draw player 2's score
  drawText({
    text: player2Score.toString(),
    x: rightPlayerScorePosition,
    y: scoresCanvasHeight,
    color: scoreColor,
    fontFamily: scoreFontFamily,
    fontSize: scoreTextSize,
    textAlign: scoreTextAlign,
  });
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
  const { x, y, width: w = 0, height: h = 0, color = "#ffffff" } = draw;
  // Check for invalid values.
  if (w <= 0 || h <= 0) {
    throw new Error("Invalid parameter");
  }

  // Set the fill color.
  ctx.fillStyle = color;

  // Draw the rectangle.
  ctx.fillRect(x, y, w, h);
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
  const { text, x, y, color, fontFamily, fontSize, textAlign } = draw;
  // Check that the text is not empty.
  if (!text) {
    throw new Error("Text is empty.");
  }
  // Check that the coordinates are numbers.
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("Coordinates are not numbers.");
  }
  // Check that the color is a string.
  if (typeof color !== "string") {
    throw new Error("Color is not a string.");
  }
  // Check that the font family is a string.
  if (typeof fontFamily !== "string") {
    throw new Error("Font family is not a string.");
  }
  // Check that the font size is a number.
  if (typeof fontSize !== "number") {
    throw new Error("Font size is not a number.");
  }
  // Check that the text alignment is a string.
  if (typeof textAlign !== "string") {
    throw new Error("Text alignment is not a string.");
  }
  // Set the fill color.
  ctx.fillStyle = color;
  // Set the font.
  ctx.font = `${fontSize}px ${fontFamily}`;
  // Set the text alignment.
  ctx.textAlign = textAlign;
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

export {
  drawElements,
  drawText,
  clearCanvas,
  showGameOverMessage,
  showNewGameMessage,
  showScore,
};
