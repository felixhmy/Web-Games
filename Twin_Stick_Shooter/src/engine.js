// Autor: felixhmy 
// Todos los derechos reservados © 2025 

var canvas;
var ctx;

var targetDeltaTime = 1 / 60;
var currentDeltaTime = 0;
var time = 0,
    FPS  = 0,
    frames    = 0,
    acumDelta = 0;
var timeSinceBegining = 0;

var pause = false;

// graphic assets references
var graphicAssets = {
    invader: {
        path: "assets/invader1.png",
        image: null
    },
    player_ship: {
        path: "assets/baoyzx.png",
        image: null
    },
    misil: {
        path: "assets/misil.png",
        image: null
    },
    aim: {
        path: "assets/aim.png",
        image: null
    },
        //incluir enemigo 
    enemy: {
            path: "assets/enemy.png",
            image: null
    }
    
};

// audio assets references
var audio = {}

window.requestAnimationFrame = (function (evt) {
    return window.requestAnimationFrame ||
    	window.mozRequestAnimationFrame    ||
    	window.webkitRequestAnimationFrame ||
    	window.msRequestAnimationFrame     ||
    	function (callback) {
        	window.setTimeout(callback, targetDeltaTime * 1000);
    	};
}) ();

window.onload = BodyLoaded;

function LoadImages(assets, onloaded)
{
    let imagesToLoad = 0;
    
    const onload = () => --imagesToLoad === 0 && onloaded();

    // iterate through the object of assets and load every image
    for (let asset in assets)
    {
        if (assets.hasOwnProperty(asset))
        {
            imagesToLoad++; // one more image to load

            // create the new image and set its path and onload event
            const img = assets[asset].image = new Image;
            img.src = assets[asset].path;
            img.onload = onload;
        }
     }
    return assets;
}

function BodyLoaded()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    SetupKeyboardEvents();
    SetupMouseEvents();

    LoadImages(graphicAssets, function() {
        // load audio
        audio.laser = document.getElementById("laserSound");

        // Start the game
        Start();

        // first loop call
        Loop();

    });
}

function Start()
{
    time = Date.now();

    // Start the game
    game.Start();
}

function Loop ()
{
    // prepare the next loop
    requestAnimationFrame(Loop);

    //deltaTime
    const now = Date.now();
    let deltaTime = (now - time) / 1000;
    currentDeltaTime = deltaTime;
    
    time = now;

    // frames counter
    frames++;
    acumDelta += deltaTime;

    if (acumDelta > 1)
    {
        FPS = frames;
        frames = 0;
        acumDelta -= 1;
    }
    
    if (deltaTime > 0.1)
        deltaTime = 0.1;

    if (Input.IsKeyDown(KEY_PAUSE) || Input.IsKeyDown(KEY_ESCAPE))
    {
        pause = !pause;
    }

    // Game logic -------------------
    if (!pause)
        Update(deltaTime);

    // Draw the game ----------------
    Draw(ctx);
    
    Input.PostUpdate();
}

function Update(deltaTime)
{
    timeSinceBegining += deltaTime;

    // update the game level
    game.Update(deltaTime);
}

function Draw(ctx)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the game level
    game.Draw(ctx);

    if (pause)
    {
        ctx.fillStyle = "white";
        ctx.font = "24px Comic Sans MS regular";
        ctx.textAlign = 'center';
        ctx.fillText('Pulsa ESCAPE (esc) para volver', canvas.width / 2, (canvas.height / 2) + 20);
        ctx.textAlign = 'left';
    }
    
    // draw the FPS counter
    ctx.fillStyle = "white";
    ctx.font = "12px Comic Sans MS regular";
    ctx.textAlign = "start";
    ctx.fillText("FPS=" + FPS, 10, 30);
    ctx.fillText("deltaTime=" + currentDeltaTime, 10, 50);
    ctx.fillText("currentFPS=" + (1/currentDeltaTime).toFixed(2), 10, 70);

    // vidas
    ctx.fillStyle = "white";
    ctx.font = "20px Comic Sans MS regular";
    ctx.textAlign = "start";
    ctx.fillText("Vidas  = " + game.player.life, 10, 100);
    ctx.fillText("Vida enemigo = " + game.enemies[0].life, 10, 130);
    ctx.fillText("Vida enemigo = " + game.enemies[1].life, 10, 160);
    
   

}