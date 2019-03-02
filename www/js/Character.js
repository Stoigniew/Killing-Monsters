class Character extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, y, width, height, updateStateMilliseconds, delay = 0)
    {
        super(updateStateMilliseconds, delay); 

        this.characterImage = image;
        this.width = width;
        this.height = height;
        this.centreX = 100;
        this.y = y;
        this.currentSprite = 0;

        this.NUMBER_OF_SPRITES = 40; 
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 8; 
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 7;

        this.STEP_SIZE = 5;
        this.halfSize = width / 2;
        this.dead = false;
        this.direction = 0; // 0-right, 1-left
        this.lives =  3;
        this.liveHeart = LIVES;
        this.isHit = false;
        this.isAttacking = false;

        this.animationFinished = false;
    }

    isMoving()
    {
        return this.isMoving;
    }

startMoving()
{
    this.currentSprite = 0;
    this.START_ROW = 1;
    this.START_COLUMN = 0;
    this.row = this.START_ROW;
    this.column = this.START_COLUMN;
    this.isMoving = true;
    this.NUMBER_OF_ANIMATION_SPRITES = 8;

}

stopMoving()
{
    this.currentSprite = 0;
    this.START_ROW = 0;
    this.START_COLUMN = 0;
    this.row = this.START_ROW;
    this.column = this.START_COLUMN;
    this.isMoving = false;
    this.NUMBER_OF_ANIMATION_SPRITES = 4;
    this.animationFinished = false;
  
}

attack()
{
    this.isAttacking = true;
    this.currentSprite = 0;
    this.START_ROW = 2;
    this.START_COLUMN = 0;
    this.row = this.START_ROW;
    this.column = this.START_COLUMN;
    this.isMoving = false;
    this.NUMBER_OF_ANIMATION_SPRITES = 8;
}

getHit()
{
    gameObjects[this.liveHeart++].stopAndHide();
    score-=5;
    this.lives--;
    this.isHit = true;
    this.currentSprite = 0;
    this.START_ROW = 4;
    this.START_COLUMN = 8;
    this.row = this.START_ROW;
    this.column = this.START_COLUMN;
    this.isMoving = false;
    this.NUMBER_OF_ANIMATION_SPRITES = 2;
}

die()
{
    this.currentSprite = 0;
    this.dead = true;
    this.START_ROW = 3;
    this.START_COLUMN = 0;
    this.row = this.START_ROW;
    this.column = this.START_COLUMN;
    this.isMoving = false;
    this.NUMBER_OF_ANIMATION_SPRITES = 8;
}

deadOnNextHit()
{
    if(this.lives == 1)
    return true;
    else 
    return false;
}

setDirection()
{
    if(this.direction == 0)
        {
            this.characterImage.src = "img/character/character.png";
        }
    else
        {
            this.characterImage.src = "img/character/character_left.png";
        }
}

getDirection()
{
    return this.direction;
}

updateState()
{
    //set direction of character
    this.setDirection();

    if(this.animationFinished)
    {
        this.stopMoving();
        this.animationFinished = false;
        return;
    }

        
    if(this.isHit)
    {
        if(this.direction == 0)
        {
            this.column = 8;
            {
                this.currentSprite++;
                this.column--;
                if (this.currentSprite >= this.NUMBER_OF_ANIMATION_SPRITES)
                {
                    navigator.vibrate(100);
                    this.animationFinished = true;
                    this.isHit = false;
                    //this.centreX -=5;
                   
                    return;
                }
                return;
            }
        }
        else if (this.direction == 1)
        {   
            this.column = 0;
            {
                this.currentSprite++;
                this.column++;
                if (this.currentSprite >= this.NUMBER_OF_ANIMATION_SPRITES)
                {
                    this.animationFinished = true;
                    this.isHit = false;
                    navigator.vibrate(100);
                    //this.centreX -=5;
                    return;
                }
                return;
            }
        }
    }

        //on character's death
        if(this.dead)
        {
            gameObjects[this.liveHeart].stopAndHide();
            this.currentSprite++;
            this.column++;
            if (this.currentSprite >= this.NUMBER_OF_ANIMATION_SPRITES)
        {
            navigator.vibrate(200);
            this.stopAndHide();
            return;
        }
        return;
        }
        //end of character's death      

        //steps depend on character's direction
        if(this.isMoving)
        {
            if(this.direction == 0)
            {
              this.centreX+=this.STEP_SIZE;
            }
            else{
              this.centreX-=this.STEP_SIZE;
            }
        }
         
         
         //when charecter reaches edges of the canvas
         if (this.centreX > canvas.width-100)
         {
             this.centreX = canvas.width - 100;
             this.isMoving = false;
         }
         else if (this.centreX < 0)
         {
             this.centreX = 0;
             this.isMoving = false;
         }

        if(this.isAttacking)
        {
            this.currentSprite++;
            this.column++;
            if (this.currentSprite >= this.NUMBER_OF_ANIMATION_SPRITES)
            {
               this.animationFinished = true;
                this.column = this.START_COLUMN;
                this.row = this.START_ROW;
                this.currentSprite = 0;
            }
            return;
        }
         
         this.currentSprite++;
         this.column++;
         if (this.currentSprite >= this.NUMBER_OF_ANIMATION_SPRITES)
         {
             this.column = this.START_COLUMN;
             this.row = this.START_ROW;
             this.currentSprite = 0;
         }
         return;
    }

    render()
    {
        let SPRITE_WIDTH = ((this.characterImage.width) / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE); 
        let SPRITE_HEIGHT = ((this.characterImage.height) / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
        ctx.drawImage(this.characterImage, this.column * SPRITE_WIDTH, this.row * SPRITE_WIDTH, SPRITE_WIDTH, SPRITE_HEIGHT, this.centreX, this.y, this.width, this.height);
    }

    getCentreX()
    {
        return this.centreX;
    }

    getCollisionPoint()
    {
        return this.centreX + this.halfSize;
    }

    isAnimationFinished()
    {
        return animationFinished;
    }

    isDead()
    {
        return this.dead;
    }

    moving()
    {
        return this.isMoving;
    }

    hit()
    {
        return this.isHit;
    }

}