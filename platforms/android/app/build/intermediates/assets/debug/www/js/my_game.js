/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */





/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */
var numberOfKilledMonsters = 0;
var score = 15;
var statX = 0;
var enemiesCount = 1;
//background
let foregroundImage = new Image();
foregroundImage.src = "img/background/Layer_0000_9.png";
let groundImage = new Image();
groundImage.src = "img/background/Layer_0001_8.png";
let forestTopImage = new Image();
forestTopImage.src = "img/background/Layer_0002_7.png";
let forestBackImage = new Image();
forestBackImage.src = "img/background/Layer_0003_6.png";
let lightsBackImage = new Image();
lightsBackImage.src = "img/background/Layer_0004_Lights.png";
let forestForImage = new Image();
forestForImage.src = "img/background/Layer_0005_5.png";
let forestShadowImage = new Image();
forestShadowImage.src = "img/background/Layer_0006_4.png";
let lightsForImage = new Image();
lightsForImage.src = "img/background/Layer_0007_Lights.png";
let forestShadowBackImage = new Image();
forestShadowBackImage.src = "img/background/Layer_0008_3.png";
let forestFogImage = new Image();
forestFogImage.src = "img/background/Layer_0009_2.png";
let backgroundImage = new Image();
backgroundImage.src = "img/background/Layer_0010_1.png";


 //skeleton
 let skeletonImage = new Image();
 skeletonImage.src = "img/skeleton/SkeletonWalk.png";

 //character
 let characterImage = new Image();
characterImage.src = "img/character/character.png";

//lives
let charactersLive = new Image();
charactersLive.src = "img/heart.png"

 const CHARACTER = 11;
 const WIN = 12;
 const LOST = 13;
 const LIVES = 14

 
let enemies = [];
let lives = [];
const numberOfSkeletons = 3;
const numberOfLives = 3;
/******************* END OF Declare game specific data and functions *****************/

/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */
function playGame()
{
    /* We need to initialise the game objects outside of the Game class */
    /* This function does this initialisation.                          */
    /* This function will:                                              */
    /* 1. create the various game game gameObjects                   */
    /* 2. store the game gameObjects in an array                     */
    /* 3. create a new Game to display the game gameObjects          */
    /* 4. start the Game                                                */


    /* Create the various gameObjects for this game. */
    /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */

    //background
    gameObjects[0] = new ScrollingBackgroundImage(backgroundImage,100);
    gameObjects[1] = new ScrollingBackgroundImage(forestFogImage,100);
    gameObjects[2] = new ScrollingBackgroundImage(forestShadowBackImage,100);
    gameObjects[3] = new ScrollingBackgroundImage(lightsForImage,100);
    gameObjects[4] = new ScrollingBackgroundImage(forestShadowImage,100);
    gameObjects[5] = new ScrollingBackgroundImage(forestForImage,100);
    gameObjects[6] = new ScrollingBackgroundImage(lightsBackImage,60);
    gameObjects[7] = new ScrollingBackgroundImage(forestBackImage,100);
    gameObjects[8] = new ScrollingBackgroundImage(forestTopImage,100);
    gameObjects[9] = new ScrollingBackgroundImage(groundImage,100);
    gameObjects[10] = new ScrollingBackgroundImage(foregroundImage,100);
    
    gameObjects[CHARACTER] = new Character(characterImage, 235, 100, 100, 100, 0);
    gameObjects[CHARACTER].stopMoving();
   
    gameObjects[14] = new Live(charactersLive, 20, 20, 50, 50);
    gameObjects[15] = new Live(charactersLive, 70, 20, 50, 50);
    gameObjects[16] = new Live(charactersLive, 120, 20, 50, 50);

    //display live hearts
    // for(let i = 0; i < numberOfLives; i++)
    //     {
    //         lives[i] = new Live(charactersLive, distant+20, 20, 50, 50);
    //         lives[i].start();
    //         distant += 50;
    //     }

    //create skeletons
     for(let i = 0; i < numberOfSkeletons; i++)
     {      
       enemies[i] = new Skeleton(skeletonImage, 260, 60, 70, 100, 1000);    
            
     }
     enemies[0].start();

    /* END OF game specific code. */

    /* Always create a game that uses the gameObject array */
    let game = new MonstersCanvasGame();

    /* Always play the game */
    game.start();


    /* If they are needed, then include any game-specific mouse and keyboard listners */

    var minTime = 100;
    var startTime;
    var elapsedTime;

    document.addEventListener("touchstart", function(e){
        var touch = e.changedTouches[0];
        var x = parseInt(touch.clientX);
        var touchList = e.touches;
        startX = parseInt(touch.clientX);
        startTime = new Date().getTime();

        if(x > gameObjects[CHARACTER].getCentreX())
        {
            gameObjects[CHARACTER].direction = 0;
        }
        else
        {
            gameObjects[CHARACTER].direction = 1;
        }

        

        for(let i = 0; i < numberOfSkeletons; i++ )
            {
            
                if(!enemies[i].dead && enemies[i].getCollisionPoint() - gameObjects[CHARACTER].getCollisionPoint() <= 20 && gameObjects[CHARACTER].direction != 1)
                {
                    gameObjects[CHARACTER].stopMoving();
                }
                else
                {
                    gameObjects[CHARACTER].startMoving();
                }
            }
            
   
        }, false)

    document.addEventListener("touchend", function(e){
        gameObjects[CHARACTER].stopMoving();

        elapsedTime = new Date().getTime() - startTime;

        if(elapsedTime >= minTime)
        {
            for(let i = 0; i < numberOfSkeletons; i++ )
            {
                if(enemies[i].isDisplayed() && !enemies[i].dead && enemies[i].getCollisionPoint() - gameObjects[CHARACTER].getCollisionPoint() <= 20 && gameObjects[CHARACTER].direction != 1)
                {
                    if(!gameObjects[CHARACTER].hit())
                    {
                        setTimeout(() => {
                            gameObjects[CHARACTER].attack();
                        }, 100)
                     
                        if(enemies[i].deadOnNextHit())
                        {
                            //setTimeout(function(){
                                enemies[i].death();
                                numberOfKilledMonsters++;
                                score+=10;
                            //}, 100);
                           
                            setTimeout(() => {
                                if(enemiesCount < numberOfSkeletons)
                                {
                                    enemies[enemiesCount].start();
                                    enemiesCount++;
                                }
                            }, 1500);
                          
                        }
                        else
                        {
                            enemies[i].getHit();
                            score+=3; 
                        }    
                    }               
                }
            }
        }
    });

    document.addEventListener("keydown", function(e){
        if(e.keyCode === 32)
        {
            gameObjects[CHARACTER].attack();
        }
        else if (e.keyCode === 39)
        {
            
            gameObjects[CHARACTER].startMoving();
        }
        else if(e.keyCode === 37)
        {
            gameObjects[CHARACTER].die();
        }
    })

    document.addEventListener("deviceready", onDeviceReady, false)
    {
        function onDeviceReady()
        {
            console.log(navigator.vibrate);
            
        }
    }

 
    document.getElementsByName("restart_btn")[0].addEventListener("click", function(e){
        //if(gameObjects[CHARACTER].isDead() || numberOfKilledMonsters === numberOfSkeletons)
       // {
            location.reload();
       // }
        
    })
}