// Autor: felixhmy 
// Todos los derechos reservados © 2025 

var canvas = null;
var ctx = null;

var targetDT = 1/60;
var globalDT = 0;
var acumDelta = 0;
var FPS = 0;
var acumFrames = 0;
var time;



var graphicAssets = {
    muted: {
        path: "assets/muted.png",
        image: null
    },
    unmuted: {
        path: "assets/unmuted.png",
        image: null
    },
    animation: {
        path: "assets/animation.png",
        image: null
    },
    tableroSprite: {
        path: "assets/fondo.png",
        image: null
    },
    title: {
        path: "assets/title.png",
        image: null
    },
    player1Sprite: {
        path: "assets/p1.png",
        image: null
    },
    player2Sprite: {
        path: "assets/p2.png",
        image: null
    },
    discoSprite: {
        path: "assets/disco.png",
        image: null
    }
};

var audioAssets = {
    musica: {
        path: "assets/Cancion.wav",
        sound: null
    },
    golpe: {
        path: "assets/golpe.wav",
        sound: null
    },
    gol: {
        path: "assets/GOL.wav",
        sound: null
    },
    victoria: {
        path: "assets/Victoria.mp3",
        sound: null
    },
};



window.requestAnimationFrame = (function (evt) {
    return window.requestAnimationFrame ||
    	window.mozRequestAnimationFrame    ||
    	window.webkitRequestAnimationFrame ||
    	window.msRequestAnimationFrame     ||
    	function (callback) {
        	window.setTimeout(callback, targetDeltaTime * 1000);
    	};
}) ();

function LoadImages(assets, onloaded)
{
    let imagesToLoad = 0;
    
    const onload = () => --imagesToLoad === 0 && onloaded();

    for (let asset in assets)
    {
        if (assets.hasOwnProperty(asset))
        {
            imagesToLoad++;

            const img = assets[asset].image = new Image;
            img.src = assets[asset].path;
            img.onload = onload;
        }
     }
    return assets;
}

function LoadAudio(assets)
{
    let audiosToLoad = 0;
    
    const onload = () => --audiosToLoad === 0;

    for (let asset in assets)
    {
        if (assets.hasOwnProperty(asset))
        {
            audiosToLoad++;

            const snd = assets[asset].sound = new Audio;
            snd.src = assets[asset].path;
            snd.onload = onload;
        }
     }
    return assets;
}



const GAME_STATE = {
    menu: 0,
    game: 1,
    gameOver: 2
}

var currentGameState = GAME_STATE.menu;

const init = () => {
    canvas = document.getElementById("myCanvas");
    if (canvas) {
        ctx = canvas.getContext("2d");

        SetupKeyboardEvents();
        SetupMouseEvents();

        LoadImages(graphicAssets, function() {
            
            LoadAudio(audioAssets);
    
            Start();
            Loop();
    
        });
    }
}



const Start = () => {

    time = Date.now();

    switch(currentGameState){

        case GAME_STATE.menu:
            menu.Start();
        break;

        case GAME_STATE.game:
            game.Start();
        break;

        case GAME_STATE.gameOver:
            gameOver.Start();
        break;
    }
}



const Loop = () => {
    requestAnimationFrame(Loop);

    const now = Date.now();
    let deltaTime = (now - time) / 1000;
    globalDT = deltaTime;

    time = now;

    acumFrames++;
    acumDelta += deltaTime;

    if (acumDelta > 1)
    {
        FPS = acumFrames;
        acumFrames = 0;
        acumDelta -= 1;
    }

    if (deltaTime > 0.1){

        deltaTime = 0.1;
    }
        
    Update(deltaTime);
    Draw(ctx);
    Input.PostUpdate();
}



function Update(deltaTime){

    switch(currentGameState){

        case GAME_STATE.menu:
            menu.Update(deltaTime);
        break;

        case GAME_STATE.game:
            game.Update(deltaTime);
        break;

        case GAME_STATE.gameOver:
            gameOver.Update(deltaTime);
        break;
    }

    Input.PostUpdate();
}



function Draw(ctx){

    switch(currentGameState){

        case GAME_STATE.menu:
            menu.Draw(ctx);
        break;

        case GAME_STATE.game:
            game.Draw(ctx);
        break;

        case GAME_STATE.gameOver:
            gameOver.Draw(ctx);
        break;
    }
}

window.onload = init;