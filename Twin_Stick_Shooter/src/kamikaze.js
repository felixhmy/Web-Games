// Autor: felixhmy 
// Todos los derechos reservados © 2025 

//fases maquina de estado
const state = {
    looking: 0,
    launching: 1
}

class KamikazeEnemy extends Enemy 
{
    constructor(position, rotation, life, image)
	{
        super(position, rotation, life, image);

        this.speed = 400;
        this.attack = 1;


        this.currentState = state.looking;
	}

    Update(deltaTime)
    {

        switch (this.currentState)
        {  
            case state.looking:
                //observa al jugador
                if(this.attack > 0){
                    
                    if(this.position.x < canvas.width - this.halfWidth && this.position.x > this.halfWidth &&
                       this.position.y < canvas.height - this.halfHeight && this.position.y > this.halfHeight)
                    {
                        this.rotation = Math.atan2(this.position.y - player.position.y, this.position.x - player.position.x);
                        this.attack = this.attack - deltaTime;
                    }
                    else
                    {
                        if(this.position.x > canvas.width - this.halfWidth)
                            this.position.x --;
                        if(this.position.x < this.halfWidth)
                            this.position.x ++;
                        if(this.position.y > canvas.height - this.halfHeight)
                            this.position.y --;
                        if(this.position.y < this.halfHeight)
                            this.position.y ++;
                    }
                }
                else
                {
                    //cambia a launching
                    this.currentState = state.launching;
                }
                
            break;

            case state.launching:
                //se lanza al jugador
                if(this.position.x < canvas.width - this.halfWidth && this.position.x > this.halfWidth &&
                   this.position.y < canvas.height - this.halfHeight && this.position.y > this.halfHeight)
                {
                    this.position.x -= Math.cos(this.rotation) * this.speed * deltaTime; 
                    this.position.y -= Math.sin(this.rotation) * this.speed * deltaTime;
                }
                else
                {
                    //vuelve a looking
                    this.attack = 1;
                    this.currentState = state.looking;
                }
            break;
        }
    }
}