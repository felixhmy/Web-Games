class EnemyFollow extends Enemy 
{
    constructor(position, rotation, life, image)
	{
        super(position, rotation, life, image);

        this.speed = 70; 
	}

    Update(deltaTime)
    {
        //rotacion de la nave
        this.rotation = Math.atan2(this.position.y - player.position.y, this.position.x - player.position.x);

        
        //persecucion de la nave
        this.position.x -= Math.cos(this.rotation) * this.speed * deltaTime; 
        this.position.y -= Math.sin(this.rotation) * this.speed * deltaTime;
    }
}