class BulletPool
{
    constructor(initialSize)
    {
        this.bullets = [];

        for (let i = 0; i < initialSize; i++) 
        {
            let bullet = new Bullet(new Vector2(0, 0), 0, 0, 0);
            this.bullets.push(bullet);
        }
    }

    Update(deltaTime)
    {
        //update all the Active bullets
        for (let i = 0; i < this.bullets.length; i++)
        {
            if (this.bullets[i].active)
            {
                this.bullets[i].Update(deltaTime);

                //colisiones de las balas
                for (let k = 0; k < game.enemies.length; k++)
                {
                    if( PointInsideCircle(this.bullets[i].position, game.enemies[k].position, game.enemies[k].halfWidth))
                    {
                        this.Deactivate(this.bullets[i]);
                        game.enemies[k].life --;
                        if(game.enemies[k].life <= 0)
                            game.enemies.splice(k ,1);
                    }
                }


                //check if a bullet has to be deactivated
                if (this.bullets[i].position.y < 0 || this.bullets[i].position.y > canvas.height ||
                    this.bullets[i].position.x < 0 || this.bullets[i].position.y > canvas.width)
                        this.Deactivate(this.bullets[i]);
                

            }
        }

    }



    Draw(ctx)
    {
        //draw the Active bullets    
        this.bullets.forEach(bullet => {
            if (bullet.active)
                bullet.Draw(ctx);
        });
    }

    Activate(x, y, rotation, speed, power)
    {
        let newBullet = null;
        //look for the first non-active bullet of the pool
        for (let i = 0; !newBullet && i < this.bullets.length; i++) 
        {
           if(!this.bullets[i].active)
            {
                //non-active bullet found
                newBullet = this.bullets[i];


                //set the new parameters
                newBullet.position.x = x;
                newBullet.position.y = y;
                newBullet.rotation = rotation;
                newBullet.speed = speed;
                newBullet.power = power;

            } 
        }

        //if there is no non-active bullet found, create a new one
        if (!newBullet)
        {
            newBullet = new Bullet(new Vector2(x, y), rotation, speed, power)
            //add the new bullet into the bullets array
            this.bullets.push(newBullet);
        }
        //activate the bullet
        newBullet.active = true;

        
        //return the bullet reference
        return newBullet;
    }

    Deactivate(bullet)
    {
        //deactivate the bullet
        bullet.active = false;
    }
}