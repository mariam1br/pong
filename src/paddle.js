export class Paddle {
	constructor(height, width, x, y) {
		this._height = height;
		this._velocityY = 0;
		this._width = width;
		this._x = x;
		this._y = y;
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
}
