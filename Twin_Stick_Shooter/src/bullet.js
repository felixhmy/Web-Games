// Autor: felixhmy 
// Todos los derechos reservados © 2025 

class Bullet
{
    constructor(position, rotation, speed, power)
    {
        this.position = position;
        this.rotation = rotation;
        this.speed = speed;
        this.power = power;
        this.active = false;
    }

    Update(deltaTime)
    {
        this.position.x += Math.cos(this.rotation) * this.speed * deltaTime;
        this.position.y += Math.sin(this.rotation) * this.speed * deltaTime;
    }

    Draw (ctx)
    {
        ctx.fillStyle = "yellow";
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);

        ctx.fillRect(-3, -1, 6, 2);

        ctx.restore();
    }
}