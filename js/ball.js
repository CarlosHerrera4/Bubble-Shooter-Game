function Ball(ctx, x, y, radius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.r = this.radius;

    this.vx = 10;
    this.vy = 0;

    this.g = 0.2;
}

Ball.prototype.setRandomColor = function () {
    this.ctx.fillStyle = "blue";
}

Ball.prototype.faster = function () {
    this.vx *= 1.1;
    this.vy *= 1.1;
}

Ball.prototype.slower = function () {
    this.vx *= 0.9;
    this.vy *= 0.9;
}

Ball.prototype.moveRight = function () {
    if (this.x + this.r < this.ctx.canvas.width) {
        this.x += this.vx;
    }
}

Ball.prototype.moveUp = function () {
    if (this.y - this.r > 0) {
        this.y -= this.vy;
    }
}

Ball.prototype.moveDown = function () {
    if (this.y - this.r >= this.ctx.canvas.height) {
        this.y += this.vy;
    }
}

Ball.prototype.moveLeft = function () {
    if (this.x - this.r > 0) {
        this.x -= this.vx;
    }
}

Ball.prototype.move = function () {
    this.x += this.vx;

    this.vy += this.g;

    this.y += this.vy;

    if (this.x + this.radius > this.ctx.canvas.width ||
        this.x - this.radius < 0) {
        this.vx *= -1;
    }

    if (this.y + this.radius > this.ctx.canvas.height ||
        this.y - this.radius < 0) {
        this.vy *= -1;
    }
};

Ball.prototype.draw = function () {
    this.setRandomColor();

    this.ctx.beginPath();
    this.ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI * 2
    )

    this.ctx.fill();

    this.ctx.closePath();
}