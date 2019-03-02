class Skeleton extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, y, width, height, updateStateMilliseconds, delay = 0)
    {
        super(updateStateMilliseconds, delay); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.skeletonImage = image;
        this.width = width;
        this.height = height;
        this.centreX = canvas.width;
        this.y = y;

        this.halfSize = width / 2;  

        this.centreY = y - height;
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 1; // the number of rows in the gameObject image

        this.START_ROW = 0;
        this.START_COLUMN = 0;
        this.row = this.START_ROW;
        this.column = this.START_COLUMN;
        this.isMoving = false;
        this.lives = 3;
        this.dead = false;
        this.hit = false;
        this.attacking = false;
        this.animationFinished = false;
        this.resetAttack = false;
        this.isBlocked = false;
    }

    updateState()
    {
        if(this.animationFinished)
        {
            this.att();
           //this.stopMoving();
            this.animationFinished = false;
            return;
        }

        if(this.hit)
        {
            this.currentgameObject++;
          this.column++;
          if (this.currentgameObject >= this.NUMBER_OF_SPRITES)
          {
              this.hit = false;
             this.animationFinished = true;
             //this.centreX += 5;
             return;
          }
          return;
        }

        if(this.dead)
        {
          this.currentgameObject++;
          this.column--;
          if (this.currentgameObject >= this.NUMBER_OF_SPRITES)
          {
            this.stopAndHide();
             return;
          }
          
          return;
        }

        if(this.attacking)
        {
            this.currentgameObject++;
            this.column--;
            if (this.currentgameObject >= this.NUMBER_OF_SPRITES)
            {
                this.column = 18;
                this.currentgameObject = 0;
                this.animationFinished = true;
            } 
            return;
        }

        if(!this.isMoving)
        {
          this.currentgameObject++;
          this.column++;
          if(this.hit) return;
          if (this.currentgameObject >= this.NUMBER_OF_SPRITES)
          {
              this.column = this.START_COLUMN;
              this.currentgameObject = 0;
          }
            return;
        }

        if(this.isMoving){
            this.skeletonImage.src = "img/skeleton/SkeletonWalk.png";
            this.centreX-=5;
            if (this.centreX > canvas.width)
            {
                this.centreX = this.width;
            }

            this.currentgameObject++;
            this.column++;
            if (this.currentgameObject === this.NUMBER_OF_SPRITES)
            {
                this.column = this.START_COLUMN;
                
                this.currentgameObject = 0;
            }
        }
     }

    render()
    {
        let SPRITE_WIDTH = ((this.skeletonImage.width) / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE); 
        let SPRITE_HEIGHT = (this.skeletonImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
        ctx.drawImage(this.skeletonImage, this.column * SPRITE_WIDTH, this.row * SPRITE_WIDTH, SPRITE_WIDTH, SPRITE_HEIGHT, this.centreX, this.y, this.width, this.height);
    }

    getReset()
    {
        return this.resetAttack;
    }

    startMoving()
    {
        this.isMoving = true;
        this.attacking = false;
        this.skeletonImage.src = "img/skeleton/SkeletonWalk.png";
        this.NUMBER_OF_SPRITES = 13; // the number of gameObjects in the gameObject image
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 13; // the number of columns in the gameObject image
        this.currentgameObject = 0;

        this.row = this.START_ROW;
        this.column = this.START_COLUMN;
        
    }

    stopMoving()
    {
        this.isMoving = false;
        this.attacking = false;
        this.skeletonImage.src = "img/skeleton/skeleton_idle.png";
        this.NUMBER_OF_SPRITES = 11; // the number of gameObjects in the gameObject image
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 11; // the number of columns in the gameObject image
        this.currentgameObject = 0;

        this.row = this.START_ROW;
        this.column = this.START_COLUMN;
    }

    getHit()
    {
        this.resetAttack = true;
        this.lives--;
        this.hit = true;
        this.isMoving = false;
        this.skeletonImage.src = "img/skeleton/skeleton_hit.png";
        this.NUMBER_OF_SPRITES = 8; // the number of gameObjects in the gameObject image
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 8; // the number of columns in the gameObject image
        this.currentgameObject = 0;

        this.row = this.START_ROW;
        this.column = this.START_COLUMN;
    }

    death()
    {
        this.lives--;
        this.dead = true;
        this.isMoving = false;
        this.skeletonImage.src = "img/skeleton/skeleton_dead.png";
        this.NUMBER_OF_SPRITES = 15; // the number of gameObjects in the gameObject image
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 15; // the number of columns in the gameObject image
        this.currentgameObject = 0;

        this.row = this.START_ROW;
        this.column = 15;
    }

    deadOnNextHit()
    {
        if(this.lives == 1)
        return true;
        else
        return false;
    }

    isHit()
    {
        return this.hit;
    }

    blocked()
    {
        return this.isBlocked;
    }

    setBlock(block)
    {
        this.isBlocked = block;
    }

    isAnimationFinished()
    {
        return this.isAnimationFinished;
    }

    moving()
    {
        return this.isMoving;
    }

    att()
    {
        this.resetAttack = false;   
        this.attacking = true;
        this.isMoving = false;
        this.skeletonImage.src = "img/skeleton/skeleton_attack.png";
        this.NUMBER_OF_SPRITES = 18; // the number of gameObjects in the gameObject image
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 18; // the number of columns in the gameObject image
        this.currentgameObject = 0;

        this.row = this.START_ROW;
        this.column = 18;
    }

    getCentreX()
    {
        return this.centreX;
    }

    getCollisionPoint()
    {
        return this.centreX - this.halfSize;
    }
}