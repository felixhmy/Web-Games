var player = {
    position: null,
    width: 0,
    height: 0,
    rotation: 0,
    life: 100,

    img: null,

    halfWidth: 0,
    halfHeight: 0,


    speed: 400,

    dir: Vector2.Zero(),
    

    //cadencia del disparo
    shotCandency: 0.1,
    shotCandencyAux: 0,

    //pull de balas
    bulletPool: null,

    Start: function (position) {
        this.position = position;

        // set the sprite reference
        this.img = graphicAssets.player_ship.image;

        this.width = this.img.width;
        this.height = this.img.height;
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        //rellena las vidas despues de morir o matar a todos los enemigos
        this.life = 100;


        //pull de balas
        this.bulletPool = new BulletPool(10);
    },

    Update: function (deltaTime) {
        //Movimiento de la nave

        this.dir = Vector2.Zero();

        if (Input.IsKeyPressed(KEY_LEFT) || Input.IsKeyPressed(KEY_A))
            this.dir.x = -1;
        if (Input.IsKeyPressed(KEY_RIGHT) || Input.IsKeyPressed(KEY_D))
            this.dir.x = 1;
        if (Input.IsKeyPressed(KEY_UP) || Input.IsKeyPressed(KEY_W))
            this.dir.y = -1;
        if (Input.IsKeyPressed(KEY_DOWN) || Input.IsKeyPressed(KEY_S))
            this.dir.y = 1;
 
        this.dir.Normalize();
        this.position.x += this.dir.x * this.speed * deltaTime;
        this.position.y += this.dir.y * this.speed * deltaTime;


        //Rotacion de la nave
        this.rotation = Math.atan2(Input.mouse.y - this.position.y, Input.mouse.x - this.position.x);

        //Disparo
        if ((Input.IsKeyPressed(KEY_SPACE) || Input.IsMousePressed()) && this.shotCandencyAux > this.shotCandency)
        {
            this.bulletPool.Activate(this.position.x, this.position.y, this.rotation, 500, 1);
            this.shotCandencyAux = 0;
        }
        this.shotCandencyAux += deltaTime;
 
        this.bulletPool.Update(deltaTime);

        //colisiones con los enemigos
        for (var i = 0; i < game.enemies.length; i++)
        {
            if(PointInsideCircle(this.position, game.enemies[i].position, game.enemies[i].halfWidth))
            {
                this.life --;
            }
        }
 


        //limites pantalla
         if(this.position.x < 0)
             this.position.x = 0;
         if(this.position.x > canvas.width)
             this.position.x = canvas.width;
         if(this.position.y < 0)
             this.position.y = 0;
         if(this.position.y > canvas.height)
             this.position.y = canvas.height;
        
 
    },

    Draw: function (ctx) {
        // draw the player sprite
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation + PIH);
        ctx.drawImage(this.img, -this.halfWidth, -this.halfHeight, this.width, this.height);
        ctx.restore();


         // draw de la bola de direccion
         const uiCirclePosition = {x: 50, y: canvas.height - 50};

         //Circulo exterior
         ctx.strokeStyle = "white";
         ctx.lineWidth = 1;
         ctx.beginPath();
         ctx.arc(uiCirclePosition.x, uiCirclePosition.y, 30, 0, PI2, true);
         ctx.closePath();
         ctx.stroke();

         // Circulo interior
         ctx.fillStyle = "white";
         ctx.beginPath();
         ctx.arc(uiCirclePosition.x + this.dir.x * 30, uiCirclePosition.y + this.dir.y * 30, 10, 0, PI2, true);
         ctx.closePath();
         ctx.fill();
 
         //draw de las balas
         this.bulletPool.Draw(ctx);
    }
}