// Clase de la pelota del juego
class Ball
{
    //Se genera la pelota
    constructor(position, onLoosingBall)
    {
        //Se le asigna una posición
        this.position = position;
        //Radio de la bola
        this.radius = 10;

        //Dirección y velocidad de la bola
        this.direction = {x: RandomBetween(-1, 1), y: RandomBetween(-1, 1)};
        this.direction = {x: 0, y: 1};
        this.velocity = 400;

        this.onLoosingBall = onLoosingBall
    }


    Start()
    {
        
    }

    Update(deltaTime)
    {
        

        const deg = Math.atan2(this.direction.y, this.direction.x);
        this.position.x += Math.cos(deg) * this.velocity * deltaTime;
        this.position.y += Math.sin(deg) * this.velocity * deltaTime;

        //Colisión con la pared de la DERECHA
        if(this.position.x + this.radius > canvas.width)
        {
            this.direction.x = -this.direction.x;
            this.position.x = canvas.width - this.radius;
        }
        //Colisión con la pared de la IZQUIERDA
        if (this.position.x - this.radius < 0)
        {
            this.direction.x = -this.direction.x;
            this.position.x = this.radius;
        }
        //Colisión con la pared de ARRIBA
        if(this.position.y - this.radius < 0)
        {
            this.direction.y = -this.direction.y;
            this.position.y = this.radius;
        }

        //En caso de colisión con la pared inferior, se destruira la bola
        if(this.position.y > canvas.height)
        {
            this.onLoosingBall(this);
        }
        




        //Colisiones con la tabla del jugador
        if (this.position.x + this.radius > player.position.x &&
            this.position.x - this.radius < player.position.x + player.width &&
            this.position.y + this.radius > player.position.y &&
            this.position.y - this.radius < player.position.y + player.height)
        {
            if (this.direction.y > 0)
                this.position.y = player.position.y - this.radius;
            else if (this.direction.y < 0)
                this.position.y = player.position.y + player.height + this.radius;
            this.direction.y = - this.direction.y;

            //Desviación especifica de los bordes
            if (this.position.x < player.halfPosX)
                this.direction.x -= ((player.halfPosX - this.position.x) / player.halfPosX) * 5;
            else if (this.position.x > player.halfPosX)
                this.direction.x += ((this.position.x - player.halfPosX) / player-halfPosX) * 5;
        }
    }




    //Aqui se aplica la bola dentro del juego
    Draw(ctx) 
    {
        //Se le asigna un color
        ctx.fillStyle = "white";

        //Se crea la esfera
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, PI2, false);
        ctx.closePath();
        ctx.fill();

    }

}