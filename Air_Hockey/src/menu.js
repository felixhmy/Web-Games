// Autor: felixhmy 
// Todos los derechos reservados © 2025 

var menu = {

    controles: false,
    hoverPlay: false,
    hoverControles: false,
    hoverMute: false,

    Start()
    {
        audioAssets.musica.sound.volume = 0.4;
        audioAssets.musica.sound.loop = true;
    },

    Update(deltaTime)
    {
        canvas.addEventListener("click", this.PlayMusic)


        if(Input.mouse.x > canvas.width / 2 - 150 && Input.mouse.x < canvas.width / 2 + 150 && Input.mouse.y > canvas.height - 250 && Input.mouse.y < canvas.height - 180){
            this.hoverPlay = true;
        }
        else{
            this.hoverPlay = false;
        }

        if(Input.mouse.x > canvas.width / 2 - 150 && Input.mouse.x < canvas.width / 2 + 150 && Input.mouse.y > canvas.height - 165 && Input.mouse.y < canvas.height - 115){
            this.hoverControles = true;
        }
        else{
            this.hoverControles = false;
        }

        if(Input.mouse.x > canvas.width / 2 - 150 && Input.mouse.x < canvas.width / 2 + 150 && Input.mouse.y > canvas.height - 115 && Input.mouse.y < canvas.height - 65){
            this.hoverMute = true;
        }
        else{
            this.hoverMute = false;
        }


        if(this.hoverPlay && Input.mouse.down){
            currentGameState = GAME_STATE.game;
            Start();
        }

        if(this.hoverMute && Input.mouse.down){
            if(audioAssets.musica.sound.muted == false){
                audioAssets.musica.sound.muted = true;
            }
            else{
                audioAssets.musica.sound.muted = false;
            }
        }

        if(this.hoverControles && Input.mouse.down){
            if(this.controles == false){
                this.controles = true;
            }
            else{
                this.controles = false;
            } 
        }
    },

    Draw(ctx)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f3f3f3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        ctx.drawImage(graphicAssets.title.image, canvas.width / 2 - canvas.width/4, 100, canvas.width/2, canvas.height/2.75);


        if(this.hoverPlay){
            ctx.fillStyle = "rgba(128, 128, 128, 0.616)";
            ctx.fillRect(canvas.width / 2 - 150, canvas.height - 250, 300, 70);
        }
        ctx.fillStyle = "red";
        ctx.font = "42px Arial";
        ctx.textAlign = "center";
        ctx.fillText("JUGAR", canvas.width / 2, canvas.height - 200);

        if(this.hoverControles){
            ctx.fillStyle = "rgba(128, 128, 128, 0.616)";
            ctx.fillRect(canvas.width / 2 - 150, canvas.height - 165, 300, 50);
        }
        if(this.hoverMute){
            ctx.fillStyle = "rgba(128, 128, 128, 0.616)";
            ctx.fillRect(canvas.width / 2 - 150, canvas.height - 115, 300, 50);
        }
        ctx.fillStyle = "#1d71b8";
        ctx.font = "36px Arial";
        ctx.fillText("CONTROLES", canvas.width / 2, canvas.height - 125);
        ctx.fillText("MUTE MÚSICA", canvas.width / 2, canvas.height - 75);

        if(this.controles){
            ctx.textAlign = "start";
            ctx.fillStyle = "black";
            ctx.font = "24px Arial";
            ctx.fillText("CONTROLES", canvas.width - 425, canvas.height - 200);
            ctx.font = "18px Arial";
            ctx.fillText("Jugador DERECHO controlado por las FLECHAS", canvas.width - 425, canvas.height - 175);
            ctx.fillText("Jugador IZQUIERDO controlado por WASD", canvas.width - 425, canvas.height - 150);
        }
    },

    PlayMusic(){
        audioAssets.musica.sound.play(); 
    }

}