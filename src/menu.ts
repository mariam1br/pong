import { GAME_FONT_FAMILY } from "./constants";
import { startNewGame } from "./game";

// Get the menuCanvas element from the HTML file
export const menuCanvas: HTMLCanvasElement = document.getElementById(
  "menu-canvas"
) as HTMLCanvasElement;

// Set up the game context
export const menuCtx: CanvasRenderingContext2D = menuCanvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

// Define the menu options
const menuOptions = ["Start Game", "Settings", "Exit"];

// Define the selected menu index (starting from zero)
let selectedMenuIndex = 0;

// Draw the menu on the menuCanvas
function drawMenu() {
  menuCtx.clearRect(0, 0, menuCanvas.width, menuCanvas.height); // Clear the menuCanvas

  // Set the font and color for the menu text
  menuCtx.font = `bold 32px ${GAME_FONT_FAMILY}`;
  menuCtx.fillStyle = "white";

  // Loop through each menu option and draw it on the menuCanvas
  for (let i = 0; i < menuOptions.length; i++) {
    const x = menuCanvas.width / 2;
    const y = menuCanvas.height / 2 + i * 50 - (menuOptions.length - 1) * 25;

    if (i === selectedMenuIndex) {
      // If this menu option is selected, draw it with a different color
      menuCtx.fillStyle = "yellow";
    } else {
      menuCtx.fillStyle = "white";
    }

    menuCtx.textAlign = "center";
    menuCtx.fillText(menuOptions[i], x, y);
  }
}

// Handle keyboard input to change the selected menu option
document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    event.preventDefault();
    selectedMenuIndex = (selectedMenuIndex + 1) % menuOptions.length;
    drawMenu();
  } else if (event.code === "ArrowUp") {
    event.preventDefault();
    selectedMenuIndex =
      (selectedMenuIndex - 1 + menuOptions.length) % menuOptions.length;
    drawMenu();
  } else if (event.code === "Enter") {
    // If the Enter key is pressed, do something based on the selected menu option
    if (selectedMenuIndex === 0) {
      startNewGame();
    } else if (selectedMenuIndex === 1) {
      showSettings();
    } else if (selectedMenuIndex === 2) {
      exitGame();
    }
  }
});

// Draw the initial menu
drawMenu();

function showSettings() {
  throw new Error("Function not implemented.");
}

function exitGame() {
  throw new Error("Function not implemented.");
}
