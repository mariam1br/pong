function drawBorder(ctx, canvas) {
	ctx.strokeStyle = '#aaa';
	ctx.lineWidth = 5;
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawMiddleLine(ctx, canvas) {
	ctx.beginPath();
	ctx.setLineDash([10, 15]);
	ctx.moveTo(canvas.width / 2, 0);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.stroke();
	// Draw a small circle in the center of the line
	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI);
	ctx.fillStyle = '#aaa';
	ctx.fill();
}

function drawPaddles(ctx, paddle1, paddle2) {
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
	ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function drawBall(ctx, ball) {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = '#ffffff';
	ctx.fill();
}

export { drawBorder, drawMiddleLine, drawPaddles, drawBall };
