const STATIC_TEXT_CENTRE = -1;

class StaticText extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(text, x, y, font, fontSize, colour, points)
    {
        super(null); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.score = "\nScore = " + points;
        this.text = text + this.score;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;   
        this.colour = colour;

        ctx.font = this.fontSize + "px " + this.font;
        this.width = ctx.measureText(this.text).width;
        if (this.x === STATIC_TEXT_CENTRE)
        {
            this.x = (canvas.width - this.width) / 2;
        }

        
    }

    render()
    {
        ctx.fillStyle = this.colour;
        ctx.font = this.fontSize + "px " + this.font; // need to set the font each time, as it might have been changed by other gameObjects.
        ctx.fillText(this.text, this.x, this.y);
    }


}