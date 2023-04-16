// Get the canvas element from the HTML file
export const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;

// Set up the game context
export const ctx: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

// Define the ball speed constant
export const BALL_SPEED: number = 4; // You can set this value to whatever you want

// Define the paddle height and width constants
export const PADDLE_HEIGHT: number = 100;
// Set the width of the paddles
export const PADDLE_WIDTH: number = 20;
// Set the speed of the paddles
export const PADDLE_SPEED: number = 5;

// Define the winnings needed to win the game
export const WINNING_SCORE: number = 2;

// Define the game font
export const GAME_FONT_FAMILY: string = "'Press Start 2P', cursive";
// Define the default color
export const DEFAULT_COLOR: string = "rgba(255, 255, 255)";

// Define the AI level
export const AI_LEVEL: number = 0.1;
