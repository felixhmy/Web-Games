var gameOver = {

    hoverMenu: null,
    frame: null,
    frameTimer: null,

    Start()
    {
        this.hoverMenu = false;
        this.frame = 0;
        this.frameTimer = 25;
    },

    Update(deltaTime)
    {
        this.frameTimer = this.frameTimer - 1;

        if(this.frameTimer <= 0){
            this.frameTimer = 25;
            this.frame = this.frame + 1;
        }

        if(this.frame > 2){
            this.frame = 0;
        }

        if(Input.mouse.x > canvas.width / 2 - 250 && Input.mouse.x < canvas.width / 2 + 250 && Input.mouse.y > canvas.height - 150 && Input.mouse.y < canvas.height - 80){
            this.hoverMenu = true;
        }
        else{
            this.hoverMenu = false;
        }

        if(this.hoverMenu && Input.mouse.down){
            currentGameState = GAME_STATE.menu;
            Start();
        }
    },

    Draw(ctx)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f3f3f3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(graphicAssets.title.image, 50, 50, canvas.width/4, canvas.height/5.5);

        if(this.hoverMenu){
            ctx.fillStyle = "rgba(128, 128, 128, 0.616)";
            ctx.fillRect(canvas.width / 2 - 245, canvas.height - 150, 500, 70);
        }
        ctx.fillStyle = "red";
        ctx.font = "42px Arial";
        ctx.textAlign = "center";
        ctx.fillText("VOLVER AL MENU", canvas.width / 2, canvas.height - 100);

        ctx.drawImage(graphicAssets.animation.image, graphicAssets.animation.image.width / 3 * this.frame, 0, graphicAssets.animation.image.width / 3, graphicAssets.animation.image.height, canvas.width / 2 - 200, canvas.height / 2 - 200, 350, 250); 
        
        ctx.fillStyle = "black";
        if(game.players.p1.score > game.players.p2.score){
            ctx.fillText("JUGADOR 1 HA GANADO!!", canvas.width / 2, canvas.height - 175);
        }
        else if(game.players.p1.score == game.players.p2.score){
            ctx.fillText("HABÉIS EMPATADO!!", canvas.width / 2, canvas.height - 175);
        }
        else{
            ctx.fillText("JUGADOR 2 HA GANADO!!", canvas.width / 2, canvas.height - 175);
        }
        
    }
}