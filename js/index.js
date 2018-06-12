window.onload = function () {



    // Tablero
    var canvas = document.createElement("canvas");
    canvas.classList.add("canvas-space");
    var ctx = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height = 600;

    var _onload = drawBackgroundCanvas();

    function drawBackgroundCanvas () {
        var background = new Image();
        background.src = "./css/images/image-background.jpg";
        ctx.drawImage(background, 0, 0);
    }

    // Cookies
    var cookies = setTimeout(function () {
        $('#cookiesModal').modal('show');

    }, 2000);

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
    for (i = 0; i < 6; i++) {
        var topBall = [];
        for (j = 0; j < 22; j++) {
            if ( i % 2 === 0) {
                var _topBall = new Ball(ctx, 20 + (j * 40), 20 + (i * 40), 20, 0, 0, i, j);
                _topBall.draw();
                topBall.push(_topBall);
            }
            else {
                var _topBall = new Ball(ctx, 40 + (j * 40), 20 + (i * 40), 20, 0, 0, i, j);
                _topBall.draw();
                topBall.push(_topBall);
            }
        }
        topBalls.push(topBall);
    }

    for (i = 0; i < 10; i++) {
        topBalls.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
    }

    // Pinto siguientes bolas
    var firstBall = new Ball(ctx2, (canvas2.width / 4) * 3, canvas2.height / 2, 20, 0, 0, null, null);
    var secondBall = new Ball(ctx2, (canvas2.width / 4) * 2, canvas2.height / 2, 20, 0, 0, null, null);
    var thirdBall = new Ball(ctx2, (canvas2.width / 4), canvas2.height / 2, 20, 0, 0, null, null);
    firstBall.draw();
    secondBall.draw();
    thirdBall.draw();

    //Pinto bola principal
    var ball = new Ball(ctx, canvas.width / 2, canvas.height - 20, 20, 0, 0, null, null);
    ball.draw();

    // Evento cuando el usuario hace clic
    $(".canvas-space").click(function (evt) {
        // Sonido
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', './sounds/zas.mp3');
        audioElement.play();

        // Calculamos velocidad
        ball.vx = (evt.offsetX - (canvas.width/2)) / 32;
        ball.vy = (canvas.height - evt.offsetY) / 32;

        var interval = setInterval(drawBall, 16);
        function drawBall() {
            var results = checkIfBallHit(ball, topBalls);
            if (results[0] === true) {  // Colisiona
                clearInterval(interval);
                var row = results[2];
                var column = results[3];

                // Calculamos punto de colisión
                var collisionX = ((results[1].x * 20) + (ball.x * 20)) / (20 + 20);
                var collisionY = ((results[1].y * 20) + (ball.y * 20)) / (20 + 20);
                // Comprobamos en qué fila ponemos la bola
                if (collisionX <= ball.x) {  // Colisiona por la derecha de la bola
                    if (collisionY < ball.y) {  // Abajo
                        if (row % 2 === 0) {  //  Fila par
                            ball.row = row + 1;
                            ball.column = column;
                            topBalls[row + 1][column] = ball;
                            ball.x = 40 + ((column) * 40);
                            ball.y = 20 + ((row + 1) * 40);
                        }
                        else {  // Fila impar
                            ball.row = row + 1;
                            ball.column = column + 1;
                            topBalls[row + 1][column + 1] = ball;
                            ball.x = 20 + ((column + 1) * 40);
                            ball.y = 20 + ((row + 1) * 40);
                        }
                    }
                    else if (collisionY > ball.y) {  // Arriba
                        if (row % 2 === 0) {
                            ball.row = row - 1;
                            ball.column = column + 1; 
                            topBalls[row - 1][column + 1] = ball;
                        }
                        else {
                            ball.row = row;
                            ball.column = column + 1;
                            topBalls[row][column + 1] = ball;
                        }
                    }
                    else {  // Centro
                        ball.row = row;
                        ball.column = column + 1;
                        topBalls[row][column + 1] = ball;
                    }
                }
                else if (collisionX > ball.x) {   // Colisiona por la izquierda de la bola
                    if (collisionY < ball.y) {  // Abajo
                        if (row % 2 === 0) {  //  Fila par
                            ball.row = row + 1;
                            ball.column = column - 1;
                            topBalls[row + 1][column - 1] = ball;
                            ball.x = 40 + ((column - 1) * 40);
                            ball.y = 20 + ((row + 1) * 40);
                        }
                        else {  // Fila impar
                            ball.row = row + 1;
                            ball.column = column;
                            topBalls[row + 1][column] = ball;
                            ball.x = 20 + ((column) * 40);
                            ball.y = 20 + ((row + 1) * 40);
                        }
                    }
                    else if (collisionY > ball.y) {  // Arriba
                        if (row % 2 === 0) {
                            ball.row = row - 1;
                            ball.column = column - 1;
                            topBalls[row - 1][column - 1];
                        }
                        else {
                            ball.row = row;
                            ball.column = column - 1;
                            topBalls[row][column - 1];
                        }
                    }
                    else {  // Centro
                        ball.row = row;
                        ball.column = column - 1;
                        topBalls[row][column - 1];
                    }
                }
                else {
                    
                }

                // Comprobamos las bolas del mismo color para eliminarlas
                var ballsDown = [];
                ballsDown.push(ball);
                checkBallsDown(ball, ballsDown);
                if (ballsDown.length >= 3) {
                    for (i = 0; i < ballsDown.length; i++) {
                        topBalls[ballsDown[i].row][ballsDown[i].column] = null;
                    }
                }

                // Limpiamos el canvas completo y pintamos de nuevo
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBackgroundCanvas();
                drawBalls();

                // Creamos bola nueva cuando desaparece la primera
                ball = new Ball(ctx, canvas.width / 2, canvas.height - 20, 20, 0, 0, null, null);
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
            else {  // Si no, limpia todo el canvas y mueve la bola
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ball.move();
                drawBackgroundCanvas();
                ball.draw();
                drawBalls();
            }

        }

        function setRandomColor() {
            var colors = ['#cc0000', '#ffff00', '#39e600', '#4d4dff', '#00ffff', '#e600e6'];
            return colors[Math.round(Math.random() * 5)];
        }

        function checkIfBallHit(ball, topBalls) {
            var state = false;
            var collisionBall, row, column;
            for (i = 0; i < topBalls.length; i++) {
                for (j = 0; j < topBalls[i].length; j++) {
                    if (topBalls[i][j]) {
                        a = topBalls[i][j].x - ball.x;
                        b = topBalls[i][j].y - ball.y;
                        var distance = Math.sqrt((a * a) + (b * b));
                        if (distance <= 40 && state === false) {
                            collisionBall = topBalls[i][j];
                            state = true;
                            row = i;
                            column = j;
                        }
                    }
                }
            }
            return [state, collisionBall, row, column];
        }

        function drawBalls() {
            // Comprobamos si se ha llegado al tope
            var gameState = true;
            for (k = 0; k < topBalls[14].length; k++) {
                if (topBalls[14][k] != null) {
                    gameState = false;
                }
            }
            if (gameState === false) {
                $('#gameOverModal').modal('show');
                //alert('Has perdido, pringao!')
            }

            ////////////////////////////////////////////
            for (i = 0; i < topBalls.length; i++) {
                for (j = 0; j < topBalls[i].length; j++) {
                    if (topBalls[i][j]) {
                        topBalls[i][j].draw();
                    }
                }
            }

        }

        function checkBallsDown(ball, ballsDown) {
            // Filas impares
            if (ball.row % 2 === 0) {
                if (topBalls[ball.row + 1] &&
                    topBalls[ball.row + 1][ball.column] && 
                    ball.color === topBalls[ball.row + 1][ball.column].color &&
                    ballsDown.indexOf(topBalls[ball.row + 1][ball.column]) === -1) {
                        ballsDown.push(topBalls[ball.row + 1][ball.column]);
                        checkBallsDown(topBalls[ball.row + 1][ball.column], ballsDown);
                }
                if (topBalls[ball.row + 1] &&
                    topBalls[ball.row + 1][ball.column - 1] && 
                    ball.color === topBalls[ball.row + 1][ball.column - 1].color &&
                    ballsDown.indexOf(topBalls[ball.row + 1][ball.column - 1]) === -1) {
                        ballsDown.push(topBalls[ball.row + 1][ball.column - 1]);
                        checkBallsDown(topBalls[ball.row + 1][ball.column - 1], ballsDown);
                }
                if (topBalls[ball.row] &&
                    topBalls[ball.row][ball.column - 1] && 
                    ball.color === topBalls[ball.row][ball.column - 1].color &&
                    ballsDown.indexOf(topBalls[ball.row][ball.column - 1]) === -1) {
                        ballsDown.push(topBalls[ball.row][ball.column - 1]);
                        checkBallsDown(topBalls[ball.row][ball.column - 1], ballsDown);
                }
                if (topBalls[ball.row - 1] &&
                    topBalls[ball.row - 1][ball.column - 1] && 
                    ball.color === topBalls[ball.row - 1][ball.column - 1].color &&
                    ballsDown.indexOf(topBalls[ball.row - 1][ball.column - 1]) === -1) {
                        ballsDown.push(topBalls[ball.row - 1][ball.column - 1]);
                        checkBallsDown(topBalls[ball.row - 1][ball.column - 1], ballsDown);
                }
                if (topBalls[ball.row - 1] &&
                    topBalls[ball.row - 1][ball.column] && 
                    ball.color === topBalls[ball.row - 1][ball.column].color &&
                    ballsDown.indexOf(topBalls[ball.row - 1][ball.column]) === -1) {
                        ballsDown.push(topBalls[ball.row - 1][ball.column]);
                        checkBallsDown(topBalls[ball.row - 1][ball.column], ballsDown);
                }
                if (topBalls[ball.row] &&
                    topBalls[ball.row][ball.column + 1] &&
                    ball.color === topBalls[ball.row][ball.column + 1].color &&
                    ballsDown.indexOf(topBalls[ball.row][ball.column + 1]) === -1) {
                        ballsDown.push(topBalls[ball.row][ball.column + 1]);
                        checkBallsDown(topBalls[ball.row][ball.column + 1], ballsDown);
                }  
                else {
                    return;
                }
            }
            else {
                if (topBalls[ball.row + 1] &&
                    topBalls[ball.row + 1][ball.column] && 
                    ball.color === topBalls[ball.row + 1][ball.column].color && 
                    ballsDown.indexOf(topBalls[ball.row + 1][ball.column]) === -1 ) {
                        ballsDown.push(topBalls[ball.row + 1][ball.column]);
                        checkBallsDown(topBalls[ball.row + 1][ball.column], ballsDown);
                }
                if (topBalls[ball.row + 1] &&
                    topBalls[ball.row + 1][ball.column + 1] && 
                    ball.color === topBalls[ball.row + 1][ball.column + 1].color &&
                    ballsDown.indexOf(topBalls[ball.row + 1][ball.column + 1]) === -1 ) {
                        ballsDown.push(topBalls[ball.row + 1][ball.column + 1]);
                        ballsDown.push(topBalls[ball.row + 1][ball.column + 1], ballsDown);
                }
                if (topBalls[ball.row] &&
                    topBalls[ball.row][ball.column - 1] && 
                    ball.color === topBalls[ball.row][ball.column - 1].color &&
                    ballsDown.indexOf(topBalls[ball.row][ball.column - 1]) === -1) {
                        ballsDown.push(topBalls[ball.row][ball.column - 1]);
                        checkBallsDown(topBalls[ball.row][ball.column - 1], ballsDown);
                }
                if (topBalls[ball.row - 1] &&
                    topBalls[ball.row - 1][ball.column + 1] && 
                    ball.color === topBalls[ball.row - 1][ball.column + 1].color &&
                    ballsDown.indexOf(topBalls[ball.row - 1][ball.column + 1]) === -1) {
                        ballsDown.push(topBalls[ball.row - 1][ball.column + 1]);
                        checkBallsDown(topBalls[ball.row - 1][ball.column + 1], ballsDown);
                }
                if (topBalls[ball.row - 1] &&
                    topBalls[ball.row - 1][ball.column] && 
                    ball.color === topBalls[ball.row - 1][ball.column].color &&
                    ballsDown.indexOf(topBalls[ball.row - 1][ball.column]) === -1) {
                        ballsDown.push(topBalls[ball.row - 1][ball.column]);
                        checkBallsDown(topBalls[ball.row - 1][ball.column], ballsDown);
                }
                if (topBalls[ball.row] &&
                    topBalls[ball.row][ball.column + 1] && 
                    ball.color === topBalls[ball.row][ball.column + 1].color &&
                    ballsDown.indexOf(topBalls[ball.row][ball.column + 1]) === -1) {
                        ballsDown.push(topBalls[ball.row][ball.column + 1]);
                        checkBallsDown(topBalls[ball.row][ball.column + 1], ballsDown);
                }
                else {
                    return;
                }  
            }
            
        }

        function drawBackgroundCanvas() {
            var background = new Image();
            background.src = "./css/images/image-background.jpg";
            ctx.drawImage(background, 0, 0);
        }

        

    });


    function restartGame () {
        window.location.href(window.location)
    }



};