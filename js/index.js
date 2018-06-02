window.onload = function () {
    // Tablero
    var canvas = document.createElement("canvas");
    canvas.classList.add("canvas-space");
    var ctx = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height = 600;

    // Próximas bolas
    var canvas2 = document.createElement("canvas");
    canvas2.classList.add("canvas-next-balls");
    var ctx2 = canvas2.getContext("2d");
    canvas2.width = 440;
    canvas2.height = 100;

    this._canvas = $('.spaceCanvas')[0].appendChild(canvas);
    this._canvas = $('.spaceControls')[0].appendChild(canvas2);

    // Pinto las bolas superiores
    var topBalls = [];
    var ii = 2;
    for (i = 20; i <= 220; i += 40) {
        var topBall = [];
        for (j = 20; j < canvas.width; j += 40) {
            if (ii % 2 === 0) {
                var _topBall = new Ball(ctx, j, i, 20, 0, 0);
                _topBall.draw();
                topBall.push(_topBall);
            }
            else {
                var _topBall = new Ball(ctx, j + 20, i, 20, 0, 0);
                _topBall.draw();
                topBall.push(_topBall);
            }


            // var _topBall = new Ball(ctx, j, i, 20, 0, 0);
            // _topBall.draw();
            // topBall.push(_topBall);
        }
        topBalls.push(topBall);
        ii++;
    }

    // Pinto siguientes bolas
    var firstBall = new Ball(ctx2, (canvas2.width / 4) * 3, canvas2.height / 2, 20, 0, 0);
    var secondBall = new Ball(ctx2, (canvas2.width / 4) * 2, canvas2.height / 2, 20, 0, 0);
    var thirdBall = new Ball(ctx2, (canvas2.width / 4), canvas2.height / 2, 20, 0, 0);
    firstBall.draw();
    secondBall.draw();
    thirdBall.draw();

    //Pinto bola principal
    var ball = new Ball(ctx, canvas.width / 2, canvas.height - 20, 20, 0, 0);
    ball.draw();


    // Evento cuando el usuario hace clic
    $(".canvas-space").click(function (evt) {
        // Calculamos velocidad
        ball.vx = (evt.offsetX - (canvas.width/2)) / 32;
        ball.vy = (canvas.height - evt.offsetY) / 32;

        var interval = setInterval(drawBall, 16);
        function drawBall() {
            if (checkIfBallHit(ball, topBalls) === true) {
            // if (_check) {
                // ctx.clearRect(ball.x - 20, ball.y - 20, 40, 40);
                clearInterval(interval);

                // Creamos bola nueva cuando desaparece la primera
                ball = new Ball(ctx, canvas.width / 2, canvas.height - 20, 20, 0, 0);
                ball.color = firstBall.color;
                ball.draw();

                // Cambiamos colores a las bolas siguientes
                firstBall.color = secondBall.color;
                secondBall.color = thirdBall.color;
                thirdBall.color = setRandomColor();
                firstBall.draw();
                secondBall.draw();
                thirdBall.draw();
            }
            // Si no, la limipia y la mueve de sitio
            else {
                ctx.clearRect(ball.x - 20, ball.y - 20, 40, 40);
                ball.move();
                ball.draw();
            }

            // Si la bola llega a la parte superior del canvas se para el Interval
            // if ( ball.y  <= 20 ) {
            //     ctx.clearRect(ball.x - 20, ball.y - 20, 40, 40);
            //     clearInterval(interval);

            //     // Creamos bola nueva cuando desaparece la primera
            //     ball = new Ball(ctx, canvas.width / 2, canvas.height - 20, 20, 0, 0);
            //     ball.color = firstBall.color;
            //     ball.draw();

            //     // Cambiamos colores a las bolas siguientes
            //     firstBall.color = secondBall.color;
            //     secondBall.color = thirdBall.color;
            //     thirdBall.color = setRandomColor();
            //     firstBall.draw();
            //     secondBall.draw();
            //     thirdBall.draw();
            // }
            // // Si no, la limipia y la mueve de sitio
            // else {
            //     ctx.clearRect(ball.x - 20, ball.y - 20, 45, 45);
            //     ball.move();
            //     ball.draw();
            // }

        }

        function setRandomColor() {
            var colors = ['#cc0000', '#ffff00', '#39e600', '#4d4dff', '#00ffff', '#e600e6'];
            return colors[Math.round(Math.random() * 5)];
        }

        function checkIfBallHit(ball, topBalls) {
            var state = false;
            for (i = 0; i < topBalls.length; i++) {
                    for (j = 0; j < topBalls[i].length; j++) {
                    console.log("i: " + i);
                    console.log("j: " + j);
                    a = topBalls[i][j].x - ball.x;
                    b = topBalls[i][j].y - ball.y;
                    var distance = Math.sqrt((a * a) + (b * b));
                    console.log(a + ", " + b);
                    if (distance <= 40 && state === false) {
                        state = true;
                    }
                }
            }
            return state;
        }

    });


    // var balls = [];
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