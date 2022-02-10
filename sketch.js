// create the sprites required in the game 
var boy;
var path;
var vhGroup,bus,car;
var coinsGroup,coin;
var coins = 0
var gameOver

// invisible blocks
var ib1,ib2
// score
var score = 0
// GameStates
PLAY = 1;
END = 0;
var gameState = PLAY


function preload(){
// load the images and animations of the sprites
boyAnim = loadImage("boy_run.gif")
pathImg = loadImage("road.png")
busImg = loadImage("bus.png")
carImg = loadImage("car.png")
coinImg = loadImage("coin.png")
gameOverImg = loadImage("gameOver.png")
cImg = loadImage("controls.png")
}

function setup() {
 // create the canvas
  createCanvas(1600,750)

 // create the path 
  path = createSprite(windowWidth/2,windowHeight/2,1,1);
  path.addImage(pathImg)
  path.scale = 3.5

 // create the boy
 boy = createSprite(100,400,1,1);
  boy.addImage("boy_running",boyAnim)
  boy.scale = 0.6
  boy.depth = 5

 // create the invisible blocks and disappear them
 ib1 = createSprite(80,650,100,10);
 ib1.visible = false
 ib2 = createSprite(120,125,100,10);
 ib2.visible = false

 // create the CoinsGroups and vhGroups
 coinsGroup = createGroup();
 vhGroup = createGroup();
}

 
function draw() {
 background("white")
 

  textSize(30);
  fill("black");
  text("Coins :" + coins ,1000,100)

  // scoring
  textSize(30);
  fill("black");
  text("Score :" + score ,500,100)

  if(gameState === PLAY){

    // control instructions
    var controls = createSprite(200,70,1,1);
    controls.addImage(cImg);
    controls.scale = 0.2;

    textSize(20);
    fill("black")
    text("= gameplay controls",225,70)

   score = score + Math.round(frameCount/60);

      // GIVE MOVEMENTS TO THE BOY
    if(keyDown("DOWN_ARROW")) { boy.y = boy.y + 20 }
    if(keyDown("UP_ARROW")) { boy.y = boy.y - 20 }

    boy.collide(ib1);
    boy.collide(ib2);

    // give velocity to the path
    path.velocityX = -5

    // reset the path 
    if(path.x < 670) { path.x = path.width*1.25 }

   // spawn the vehicles and coins
   spawnBuses();
   spawnCoins();
   
   // coin collection
   if(coinsGroup.isTouching(boy)){
     coins = coins + 1;
     coinsGroup.destroyEach();
   }
   // vh case
   if(vhGroup.isTouching(boy)){
    gameState = END;
   }
  }
   else if(gameState === END){
    path.velocityX = 0;
    vhGroup.destroyEach();
    coinsGroup.destroyEach();
    coins = coins;
    boy.visible = false
    
    gameOver = createSprite(800,375,1,1);
    gameOver.addImage(gameOverImg)

    textSize(50);
    fill("black");
    text("Credits To Author = A CHETHAN",800,700)

  }
  

 drawSprites();
}

function spawnBuses(){
 if(frameCount % 275 === 0){
   vh = createSprite(windowWidth + 200,random(200,400),1,1);
   var rand = Math.round(random(1,2))
   switch(rand){
     case 1 : vh.addImage(busImg)
     break;
     case 2 : vh.addImage(carImg)
     break;
    }
  
   vh.scale = 0.5
   vh.velocityX = -7.5
   vh.lifetime = 600

   vhGroup.add(vh)
  }
}

function spawnCoins(){
 
  if(frameCount % 350 === 0){
    coin = createSprite(windowWidth + 200,random(200,400),1,1);
    coin.addImage(coinImg);
    coin.scale = 0.025
    coin.velocityX = -6

    coinsGroup.add(coin);
    
    
  }
}