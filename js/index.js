window.onload = function () {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = 900;
    canvas.height = 600;

    var balls = [];

    // document.getElementsByClassName('spaceCanvas')[0].appendChild(canvas);
    $('.spaceCanvas')[0].appendChild(canvas);

    balls.push(new Ball(ctx, 50, 50, 20));

    setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        balls.forEach(function (ball) {
            ball.move();
            ball.draw();
        });
    }, 16);


};