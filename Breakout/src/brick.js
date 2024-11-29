// Se declara la clase de los ladrillos del juego
class Brick
{
    //Se generan los ladrillos
    constructor(position, width, height, color)
    {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.strength = 1;
    }

    //Aquí se aplican los ladrillos en el juego
    Draw (ctx)
    {
        //Se le otorga un color aleatorio
        ctx.fillStyle = this.color;
        //Se da una posicion en la que encajen con el resto sin colisionar
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}