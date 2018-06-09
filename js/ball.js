function Ball(ctx, x, y, radius, dx, dy, row, column) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.r = this.radius;
    this.row = row;
    this.column = column;

    // this.vx = 20;
    // this.vy = 10;
    this.vx = dx;
    this.vy = dy;

    // this.dx = dx;
    // this.dy = dy;
    // this.g = 0.2;
    this.color = setRandomColor();

    function setRandomColor () {
        var colors = ['#cc0000', '#ffff00', '#39e600', '#4d4dff', '#00ffff', '#e600e6'];
        return colors[Math.round(Math.random() * 5)];
    }
}

Ball.prototype.clear = function() {
    this.ctx.clearRect(0,0,0,0);
};

Ball.prototype.setRandomColor = function () {
    // var colors [rojo, amarillo, verde, azul, celeste, morado]
    var colors = ['#cc0000', '#ffff00', '#39e600', '#4d4dff', '#00ffff', '#e600e6'];
    //this.ctx.fillStyle = colors[Math.round(Math.random() * 5)];
};

Ball.prototype.move = function () {
    // this.x += this.vx;
    // this.vy += this.g;
    // this.y += this.vy;
    if (this.x + this.radius > this.ctx.canvas.width ||
        this.x - this.radius < 0) {
        this.vx = - this.vx;
        this.x += this.vx;
    }

    else if (this.y + this.radius > this.ctx.canvas.height ||
        this.y - this.radius < 0) {
        this.vy *= -1;
    }
    else {
        this.x += this.vx;
        this.y -= this.vy;
    }
};

Ball.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI * 2
    );

    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    this.ctx.closePath();
};

// Ball.prototype.faster = function () {
//     this.vx *= 1.1;
//     this.vy *= 1.1;
// }

// Ball.prototype.slower = function () {
//     this.vx *= 0.9;
//     this.vy *= 0.9;
// }

// Ball.prototype.moveRight = function () {
//     if (this.x + this.r < this.ctx.canvas.width) {
//         this.x += this.vx;
//     }
// }

// Ball.prototype.moveUp = function () {
//     if (this.y - this.r > 0) {
//         this.y -= this.vy;
//     }
// }

// Ball.prototype.moveDown = function () {
//     if (this.y - this.r >= this.ctx.canvas.height) {
//         this.y += this.vy;
//     }
// }

// Ball.prototype.moveLeft = function () {
//     if (this.x - this.r > 0) {
//         this.x -= this.vx;
//     }
// }
