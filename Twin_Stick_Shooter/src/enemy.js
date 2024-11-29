class Enemy
{
	constructor(position, rotation, life, image)
	{
		this.position = position;
		this.rotation = rotation;
		this.life = life = 10;
		this.image = image;

		this.halfWidth = this.image.width / 2;
		this.halfHeight = this.image.height / 2;
	}
	
	Update(deltaTime)
	{

	}
	
	
	Draw(ctx)
	{
		ctx.save();

		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(this.rotation);

		ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight, this.image.width, this.image.height);

		ctx.restore();
	}
}