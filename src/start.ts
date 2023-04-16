import { canvas } from "./constants";
import { drawMenu } from "./ui/menu";

// Set the canvas width and height to the window width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

drawMenu();
