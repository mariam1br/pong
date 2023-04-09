// Get the canvas element from the HTML file
export const canvas = document.getElementById('canvas');
// Set up the game context
export const ctx = canvas.getContext('2d');
// Define the ball speed constant
export const BALL_SPEED = 4; // You can set this value to whatever you want
// Define the paddle height and width constants
export const PADDLE_HEIGHT = 100;
// Set the width of the paddles
export const PADDLE_WIDTH = 20;
// Set the speed of the paddles
export const PADDLE_SPEED = 5;
// Define the winnings needed to win the game
export const WINNING_SCORE = 2;
// Define the game font
export const GAME_FONT_FAMILY = "'Press Start 2P', cursive";
// Define the AI level
export const AI_LEVEL = 0.1;
