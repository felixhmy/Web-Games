// Autor: felixhmy 
// Todos los derechos reservados © 2025 

var game = {

    bgGradient: null,
    player: null,

    //array de enemigos
    enemies: [],


    Start: function()
    {
        // prepare the bg gradient
        this.bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        this.bgGradient.addColorStop(1, "rgb(112, 162, 218)");
        this.bgGradient.addColorStop(0.9494949494949495, "rgb(0, 122, 255)");
        this.bgGradient.addColorStop(0.4292929292929293, "rgb(38, 71, 108)");
        this.bgGradient.addColorStop(0.16161616161616163, "rgb(0, 0, 0)");
        this.bgGradient.addColorStop(0, "rgb(1, 1, 1)");
    
        // player is a global variable
        this.player = player;
        this.player.Start(new Vector2(canvas.width / 2, canvas.height / 2));

        //spawn del enemigo
        this.enemies = [];
        let newEnemy = new EnemyFollow(new Vector2(canvas.width - 650, 50), 0, 100, graphicAssets.enemy.image);
        this.enemies.push(newEnemy);
        let newEnemy2 = new KamikazeEnemy(new Vector2(canvas.width - 50, 50), 0, 100, graphicAssets.enemy.image);
        this.enemies.push(newEnemy2);
 
    },

    Update: function(deltaTime)
    {
        // Update the player
        this.player.Update(deltaTime);

        // Update del enemigo
        this.enemies.forEach(enemy => enemy.Update(deltaTime));

        //fin del juego
        if(this.player.life <= 0 || this.enemies.length <= 0)
        {
            this.Start();
        }
    },

    Draw: function(ctx)
    {

        // background gradient
        ctx.fillStyle = this.bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw the player
        this.player.Draw(ctx);

        //draw del enemigo
        this.enemies.forEach(enemy => enemy.Draw(ctx));
    }

}