import { Ball } from "./classes/ball";
import { Player } from "./classes/player";

export type Players = {
  player1: Player;
  player2: Player;
};

export type PlayersAndWinner = Players & {
  winner: Player | null;
};

export type BallAndPlayers = Players & {
  ball: Ball;
};

export type BallAndPlayer = {
  ball: Ball;
  player: Player;
};

export type Draw = {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  width?: number;
  height?: number;
  fontFamily?: string;
  fontSize?: number;
  textAlign?: CanvasTextAlign;
  text?: string;
  isBold?: boolean;
  hasShadow?: boolean;
};

export enum GameState {
  gameOver = "gameOver",
  menu = "menu",
  score = "score",
  start = "start",
}
