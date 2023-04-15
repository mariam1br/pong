import { Ball } from "./ball";
import { Player } from "./player";

export type Players = {
  player1: Player;
  player2: Player;
};

export type PlayersAndWinner = Players & {
  winner: string;
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
};
