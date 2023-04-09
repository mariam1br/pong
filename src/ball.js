export class Ball {
	constructor(x, y, velocityX, velocityY, speed, color) {
		this._x = x;
		this._y = y;
		this._velocityX = velocityX;
		this._velocityY = velocityY;
		this._speed = speed;
		this._color = color;
		this._radius = 10;
	}

	get radius() {
		return this._radius;
	}

	set radius(value) {
		this._radius = value;
	}

	get velocityX() {
		return this._velocityX;
	}

	set velocityX(value) {
		this._velocityX = value;
	}

	get velocityY() {
		return this._velocityY;
	}

	set velocityY(value) {
		this._velocityY = value;
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

	get color() {
		return this._color;
	}

	set color(value) {
		this._color = value;
	}

	get speed() {
		return this._speed;
	}

	set speed(value) {
		this._speed = value;
	}
}
