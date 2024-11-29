//Código general donde se desarrolla en juego

//Declaración de variables
var canvas;
var ctx;

var targetDeltaTime = 1 / 60;
var currentDeltaTime = 0;
var time = 0,
    FPS = 0,
    frames = 0,
    acumDelta = 0;
var timeSinceBegining = 0;
var bolas = 3;


//Se utiliza para que se adapte correctamente a todos los navegadores
window.requestAnimationFrame = (function (evt) {
    return window.requestAnimationFrame ||
    	window.mozRequestAnimationFrame    ||
    	window.webkitRequestAnimationFrame ||
    	window.msRequestAnimationFrame     ||
    	function (callback) {
        	window.setTimeout(callback, targetDeltaTime * 1000);
    	};
}) ();

//Inicializa la funcion BodyLoaded que inicia el juego
window.onload = BodyLoaded;

//Diferentes estados del juego
const GAME_STATE = {
    init: 0,
    normal: 1,
    end: 2
}

var currentGameState = GAME_STATE.init;

//Arrays
var balls = [];
var bricks = [];

//Función que inicializa el juego con los aspectos basicos
function BodyLoaded(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    SetupKeyboardEvents();

    Start();
    Loop();
}

//Función que crea todo lo requerido para el juego
function Start(){
    time = Date.now();

    //Para que se borren las bolas en caso de ganar
    balls = []; 

    player.Start();
    let ball = new Ball({x: canvas.width / 2, y: canvas.height / 2}, BallLost);
    balls.push(ball);

    balls.forEach(ball => ball.Start());

    

    //Crea los ladrillos
    for (let i = 0; i < 8; i++)
    {
        let width = canvas.width / 8;
        let height = 20;

        for (let j = 0; j <5; j++)
        {
            const brick = new Brick({x: i * width, y: j * height}, width, height, GetRandomColor());
            bricks.push(brick);
        }
    }

    currentGameState = GAME_STATE.init;
}


//Función que crea el bucle del juego 
function Loop(){

    requestAnimationFrame(Loop);

    const now = Date.now();
    let deltaTime = (now - time) / 1000;
    currentDeltaTime = deltaTime;
    time = now;

    //Administra el conteo de FPS
    frames++;
    acumDelta += deltaTime;

    if (acumDelta > 1)
    {
        FPS = frames;
        frames = 0;
        acumDelta-= 1;
    }

    if (deltaTime > 0.1)
        deltaTime = 0.1;
    

    //Esto permite que estas funciones se actualizen
    Update(deltaTime);
    Draw(ctx);
    Input.PostUpdate();
}


//Función que desarrolla el juego
function Update(deltaTime)
{
    timeSinceBegining += deltaTime;

    switch (currentGameState)
    {
        //Antes del juego
        case GAME_STATE.init:

            if(Input.IsKeyDown(KEY_SPACE))
            currentGameState = GAME_STATE.normal
            bolas = 3;

            break;

        //Durante el juego
        case GAME_STATE.normal:

            player.Update(deltaTime);
            balls.forEach(ball => ball.Update(deltaTime));

            let ball = balls[0];


            for (let i = 0; i < bricks.length; i++)
            {
                for (let j = 0; j < balls.length; j++)
                {
                    let brick = bricks[i];
                    let ball = balls[j];
                    if (ball.position.x + ball.radius > brick.position.x &&
                        ball.position.x - ball.radius < brick.position.x + brick.width &&
                        ball.position.y + ball.radius > brick.position.y &&
                        ball.position.y - ball.radius < brick.position.y + brick.height)
                    {
                        if (ball.direction.y > 0)
                            ball.position.y = brick.position.y - ball.radius;
                        else if (ball.direction.y < 0)
                            ball.position.y = ball.position.y + brick.height + ball.radius;

                        ball.direction.y = -ball.direction.y;


                        bricks.splice(i, 1);
                        i--;
                    }
                }
            }

            break;

        //Final del juego
        case GAME_STATE.end:

            if(Input.IsKeyDown(KEY_SPACE))
            Start();

            break;
    }
}

//Función que "dibuja" todo el contenido del juego
function Draw(ctx)
{

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
     
    switch (currentGameState)
    {
        //Antes del juego
        case GAME_STATE.init:
            bricks.forEach(brick => brick.Draw(ctx));
            player.Draw(ctx);
            balls.forEach(ball => ball.Draw(ctx));

            //Texto de pantalla de inicio de partida
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "22px Courier New";
            ctx.textAlign = "center";
            ctx.fillText("Pulsa ESPACIO para empezar", canvas.width / 2, canvas.height / 2 + 30);
            break;
            
 

        //Durante el juego
        case GAME_STATE.normal:
            bricks.forEach(brick => brick.Draw(ctx));
            player.Draw(ctx);
            balls.forEach(ball => ball.Draw(ctx));
            break;
 

        //Final del juego
        case GAME_STATE.end:
            bricks.forEach(brick => brick.Draw(ctx));
            player.Draw(ctx);
            balls.forEach(ball => ball.Draw(ctx));

            //Texto de pantalla del fin de partida
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "24px Courier New";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 + 30);
            ctx.font = "14px Courier New";
            ctx.fillText("Pulsa ESPACIO para volver a empezar", canvas.width / 2, canvas.height / 2 + 50);
            
            break;
    }


    //Muestra en pantalla los datos
    ctx.fillStyle = "white";
    ctx.font = "12px Courier New";
    ctx.textAlign = "start";
    ctx.fillText("FPS=" + FPS, 10, 30);
    ctx.fillText("deltaTime=" + currentDeltaTime, 10, 50);
    ctx.fillText("currentFPS=" + (1/currentDeltaTime).toFixed(2), 10, 70);
}

//Función que destrulle la pelota o causa el final del juego
function BallLost(ball)
{
    const ballIndex = balls.indexOf(ball);
    bolas--;


    if (ballIndex > -1 )
    {
        balls.splice(ballIndex, 1);
        if (bolas == 0)
            currentGameState = GAME_STATE.end;
        else
        {
            balls.push(new Ball({x: RandomBetween(0, canvas.width), y: RandomBetween(120, 230)}, BallLost));
        } 
       

    }
}


