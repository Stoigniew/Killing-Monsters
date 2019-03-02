/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class ScrollingBackgroundImage extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, updateStateMilliseconds)
    {
        super(updateStateMilliseconds); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.image = image;

        this.x = 0;
    }

   updateState()
   {    
       if(gameObjects[CHARACTER].isMoving)
       {
        if(gameObjects[CHARACTER].getDirection() == 0)
        {
            this.x-=3;
            if(this.x <= -canvas.width)
            {
                this.x = 0;
            }
        }
        else if(gameObjects[CHARACTER].getDirection() == 1)
        {
             this.x+=3;
             if (this.x >= 0)
             {
                 this.x = -canvas.width;
             }
         }
       } 
      
   }

    render()
    {
        ctx.drawImage(this.image, this.x, 0, canvas.width, canvas.height);
        ctx.drawImage(this.image, this.x + canvas.width, 0, canvas.width, canvas.height);
    }
}