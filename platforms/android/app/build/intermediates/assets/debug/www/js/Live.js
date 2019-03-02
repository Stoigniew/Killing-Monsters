class Live extends GameObject
{
    constructor(image, x, y, width, height)
    {
        super(null);

            this.image = image;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
    }

    render()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}