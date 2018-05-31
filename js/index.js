window.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.classList.add("canvas-space");
    var ctx = canvas.getContext("2d");

    canvas.width = 900;
    canvas.height = 600;

    var balls = [];

    // document.getElementsByClassName('spaceCanvas')[0].appendChild(canvas);
    this._canvas = $('.spaceCanvas')[0].appendChild(canvas);

    var ball = new Ball(ctx, canvas.width / 2, canvas.height - 20, 20, 0, 0);
    ball.draw();

    $(".canvas-space").click(function (evt) {
 
        ball.vx = (evt.offsetX - (canvas.width/2)) / 32;
        ball.vy = (canvas.height - evt.offsetY) / 32;

        var interval = setInterval(drawBall, 16);
        function drawBall() {
            // Si la bola llega a la parte superior del canvas se para el Interval
            if ( ball.y  <= 20 ) {
                var state = false;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                clearInterval(interval);

                // Creamos bola nueva cuando desaparece la primera
                ball = new Ball(ctx, canvas.width / 2, canvas.height - 20, 20, 0, 0);
                ball.draw();
            }
            // Si no, la limipia y la mueve de sitio
            else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ball.move();
                ball.draw();
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