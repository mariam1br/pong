export class Player {
  private _name: string;
  private _height: number;
  private _width: number;
  private _x: number;
  private _y: number;
  private _score: number;
  private _color: string;
  private _ai: boolean;
  private _velocityY!: number;

  constructor(
    name: string,
    x: number,
    y: number,
    height: number,
    width: number,
    score: number,
    color: string,
    ai = false
  ) {
    this._name = name;
    this._height = height;
    this._width = width;
    this._x = x;
    this._y = y;
    this._score = score;
    this._color = color;
    this._ai = ai;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    // Validate paddle height to ensure it's reasonable
    if (value < 10 || value > 300) {
      throw new Error("Invalid height value");
    }
    this._height = value;
  }

  get velocityY() {
    return this._velocityY;
  }

  set velocityY(value) {
    // Prevent unrealistic paddle speeds
    if (Math.abs(value) > 10) {
      throw new Error("Excessive velocity");
    }
    this._velocityY = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    // Ensure paddle stays within horizontal bounds
    if (value < 0 || value > 800) {
      throw new Error("X position out of bounds");
    }
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    // Ensure paddle stays within vertical bounds
    if (value < 0 || value > 600) {
      throw new Error("Y position out of bounds");
    }
    this._y = value;
  }

  get score() {
    return this._score;
  }

  set score(value) {
    this._score = value;
  }

  set color(value) {
    this._color = value;
  }

  get color() {
    return this._color;
  }

  get ai() {
    return this._ai;
  }

  set ai(value) {
    this._ai = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  public toString() {
    return `${this._name}`;
  }
}