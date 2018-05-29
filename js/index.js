window.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.classList.add("canvas-space");
    var ctx = canvas.getContext("2d");

    canvas.width = 900;
    canvas.height = 600;

    var balls = [];

    // document.getElementsByClassName('spaceCanvas')[0].appendChild(canvas);
    this._canvas = $('.spaceCanvas')[0].appendChild(canvas);

    // balls.push(new Ball(ctx, 50, 50, 20));
    balls.push(new Ball(ctx, canvas.width / 2, canvas.height - 20, 20));
    balls[0].draw();


    $(".canvas-space").click(function (evt) {
        var distX = (evt.offsetX - balls[0].x) / 32;
        var distY = (balls[0].y - evt.offsetY) / 32;

        var interval = setInterval(drawBall, 16);
        function drawBall() {
            // if ( balls[0].x === evt.offsetX || balls[0].y === evt.offsetY ) {
            //     clearInterval(interval);
            // }
            if ( balls[0].y === 0){
                clearInterval(interval);
            }
            else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                balls[0].move(distX, distY);
                balls[0].draw();
            }
        }
        
    });



    // setInterval(function () {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     //balls[0].move();
    //     // balls[0].draw();


    //     // balls.forEach(function (ball) {
    //     //     ball.move();
    //     //     ball.draw();
    //     // });
    // }, 16);


};