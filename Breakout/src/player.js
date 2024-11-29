//Se declara la variable de la tabla del jugador
var player = { 
    position: {x: 0, y: 0},
    velocity: 450,
    width: 100,
    height:20,
    halfPosX: 0,

    Start: function () {
        //Posición del jugador
        this.position.x = (canvas.width / 2) - this.width /2; 
        this.position.y = canvas.height - 80;
    },

    Update: function (deltaTime) { 
        //Introducción de teclas para el movimiento del jugador
        if ((Input.IsKeyPressed(KEY_LEFT)) || (Input.IsKeyPressed(KEY_A)))
            this.position.x -= this.velocity * deltaTime;
        if ((Input.IsKeyPressed(KEY_RIGHT)) || (Input.IsKeyPressed(KEY_D)))
            this.position.x += this.velocity * deltaTime;
            
        //Límite izquierdo con el canvas
        if (this.position.x < 0) 
            this.position.x = 0;
        //Límite derecho con el canvas
        else if (this.position.x + this.width > canvas.width)
            this.position.x = canvas.width - this.width;
        
        this.halfPosX = this.position.x + this.width / 2;
    },
    
    //Aquí se aplica la tabla del jugador en el juego
    Draw: function (ctx) {
         //Color de la tabla 
        ctx.fillStyle = "blue";
         //Posición de la tabla
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

}