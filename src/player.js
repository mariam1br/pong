export class Player {
	constructor(x, y, height, width, score, color, ai = false) {
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
		this._height = value;
	}

	get velocityY() {
		return this._velocityY;
	}

	set velocityY(value) {
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
		this._x = value;
	}

	get y() {
		return this._y;
	}

	set y(value) {
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
}
