class MonstersCanvasGame extends CanvasGame
{
    constructor()
    {
        super();
    }

    collisionDetection()
    {
        if(numberOfKilledMonsters === numberOfSkeletons)
        {
            setTimeout(function(){
                navigator.vibrate(200);
                gameObjects[WIN] = new StaticText("Victory!", 30, 200, "Times Roman", 50, "red", score);
                gameObjects[WIN].start();
                
            }, 1000);
            
            setTimeout(function(){
                gameObjects[CHARACTER].stopAndHide();
            },2000);
            
        }
        for(let i = 0; i < enemiesCount; i++)
        {
                for(let j = 0; j < enemiesCount; j++)
                {
                    if(i !== j && !enemies[i].dead && !enemies[j].dead){
                    if(Math.abs(enemies[j].getCollisionPoint() - enemies[i].getCollisionPoint()) <= 50 && enemies[j].moving()
                    && enemies[i].centreX < canvas.width - 100)
                    {
                        enemies[j].stopMoving();
                        enemies[j].setBlock(true);
                        
                    }
                    else if(Math.abs(enemies[j].getCollisionPoint() - enemies[i].getCollisionPoint()) > 50 && !enemies[j].moving()){
                           enemies[j].startMoving();
                           enemies[j].setBlock(false);
                    }
                }

                }
    }
        for(let i = 0; i < enemiesCount; i++)
        {
 
            if(enemies[i].getCollisionPoint() - gameObjects[CHARACTER].getCollisionPoint() <= 10)
            {
                enemies[i].centreX += 5;
                if(enemies[i].isDisplayed())
                {
                    gameObjects[CHARACTER].stopMoving();
                }

                if(enemies[i].getCollisionPoint() - gameObjects[CHARACTER].getCollisionPoint() <= 15
                    && enemies[i].isDisplayed() && !enemies[i].dead && !gameObjects[CHARACTER].isDead())
                {
                    
                    enemies[i].att();
                
                   var timeout = setInterval(function()
                     {
                        if(enemies[i].getCollisionPoint() - gameObjects[CHARACTER].getCollisionPoint() > 15 ||
                        enemies[i].dead ||
                        enemies[i].isHit() ||
                        gameObjects[CHARACTER].moving())
                        {
                            clearInterval(timeout);
                            return;
                        } 
                        

                        if(gameObjects[CHARACTER].deadOnNextHit())
                        {
                            setTimeout(() => {
                                gameObjects[CHARACTER].die();
                            }, 100);
                            
                            score-=5;
                            clearInterval(timeout);
                            setTimeout(function(){
                                gameObjects[LOST] = new StaticText("You died!", 30, 200, "Times Roman", 50, "red", score);
                                gameObjects[LOST].start();
                              
                            }, 1500)
                        }
                        else
                        {
                            gameObjects[CHARACTER].getHit();
                        }      
                     },1700);
                }    
            }

            if(gameObjects[CHARACTER].moving())
            {
                enemies[i].setBlock(false);
            }

            if((enemies[i].getCollisionPoint() - gameObjects[CHARACTER].getCollisionPoint() > 15) && !enemies[i].blocked())
            {
                if(!enemies[i].moving())
                {
                    enemies[i].startMoving();
                }
            }

            if(gameObjects[CHARACTER].isDead())
            {
                    enemies[i].stopMoving();
                    enemies[i].stopAndHide();
            }
        }
    }

    render()
    {
        super.render();

        for(let i = 0; i < enemies.length; i++)
        {
            if(enemies[i].isDisplayed())
            {
                enemies[i].render();
            }
        }
    }
}