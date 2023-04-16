import { getGameInstance } from "../classes/game";
import { canvas, ctx } from "../constants";
import { drawText } from "../drawing/draw";

// Define the menu options
const menuOptions = ["Start Game", "Settings"];

// Define the selected menu index (starting from zero)
let selectedMenuIndex = 0;

const drawTitle = (): void => {
  // Draw the title text on the canvas
  drawText({
    text: "Pong",
    x: canvas.width / 2,
    y: canvas.height / 2 - 100,
    isBold: true,
    fontSize: 92,
    hasShadow: true,
  });
};

const drawMenuOptions = (): void => {
  // Loop through each menu option and draw it on the canvas
  for (let i = 0; i < menuOptions.length; i++) {
    const x = canvas.width / 2;
    const y = canvas.height / 2 + i * 50 - (menuOptions.length - 1) * 25;
    let text = menuOptions[i];
    let color = `rgba(255, 255, 255)`;

    if (i === selectedMenuIndex) {
      // If this menu option is selected, draw it with a different color
      color = `rgba(255, 255, 0)`;
      text = ">" + text;
    }

    drawText({
      text: text,
      color,
      x,
      y,
      isBold: true,
      fontSize: 32,
    });
  }
};

// Draw the menu on the canvas
export const drawMenu = (): void => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  drawTitle();
  drawMenuOptions();

  drawText({
    text: "Select to play 1 or 2 player with the keys 1 and 2",
    x: canvas.width / 2,
    y: canvas.height / 2 + 200,
    isBold: true,
    fontSize: 18,
  });
};

export const menuCursorDown = (): void => {
  selectedMenuIndex = (selectedMenuIndex + 1) % menuOptions.length;
  drawMenu();
};

export const menuCursorUp = (): void => {
  selectedMenuIndex =
    (selectedMenuIndex - 1 + menuOptions.length) % menuOptions.length;
  drawMenu();
};

export const menuActions = (): void => {
  if (selectedMenuIndex === 0) {
    getGameInstance().newGame();
  } else if (selectedMenuIndex === 1) {
    showSettings();
  }
};

const showSettings = (): void => {
  // add settings menu
  throw new Error("Function not implemented.");
};
