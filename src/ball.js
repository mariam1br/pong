export class Ball {
	constructor(speedX, speedY, x, y) {
		this._radius = 10;
		this._velocityX = speedX;
		this._velocityY = speedY;
		this._x = x;
		this._y = y;
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
}
