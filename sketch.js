//while coding the first step is variable declaration and initialization.
var trex ,trex_running, ground, groundImage, secondGround;
var PLAY = 1, END = 0, gameState = PLAY; 
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var obstacleGroup;
var cloudsGroup;
var trex_collided;
var dieSound, checkpointSound, jumpSound;
var gameoverImg, restartImg;
var restart, gameOver;
function preload(){//this function is used to load the animations, images, and sound.
  trex_running=loadAnimation("trex1.png","trex3.png", "trex4.png");
  groundImage=loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collided = loadImage("trex_collided.png");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkpoint.mp3");
  jumpSound = loadSound("jump.mp3");
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup(){//this function is mainly used to create canvas, sprite, edges we also add the images to the sprite inside this
  //function. Also the properties of a sprite such as velocityX, Y, etc. are also set inside this function.
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,180,20,50);
  secondGround = createSprite(200, 190, 400, 20);
  trex.addAnimation("trex running", trex_running);
  ground = createSprite(200,180,400,20);
  ground.addImage(groundImage);
  trex.scale=0.5;
  secondGround.visible = false;
  score = 0;
  cloudsGroup = createGroup();//here we are creating a new group to which every individual sprite has to be added. it makes the task of
  //assigning any property easier. syntax groupname = createGroup(); or groupname = new Group();
  obstacleGroup = new Group();
  restart = createSprite(300, 140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 0.5;
}

function draw(){
  background("white")
  drawSprites();
  if(gameState==PLAY){
  ground.velocityX = -2;
  if (ground.x < 0){
    ground.x = ground.width /2;
  }
  if(score>0 && score%600==0){//we are using the % operator so that if a number is divisible by another number than the remainder is 0.
    //example: 49%7=0 which means 49 is completely divisible by seven which makes the remainder 0.
    checkpointSound.play();
  }
  if((keyDown("space")) && (trex.y >= 100)){
    trex.velocityY = -10;
    jumpSound.play();
  }
  trex.velocityY = trex.velocityY + 0.8;
  spawnClouds();
  spawnObstacles();
  score =  score + Math.round(frameCount / 60);
  gameOver.visible = false;
  restart.visible = false;
  if(obstacleGroup.isTouching(trex)){
    gameState = END;
    dieSound.play();
  }
  }
  else if(gameState==END){
  trex.velocityY = 0;
  ground.velocityX = 0;
  trex.changeAnimation("trexcollided", trex_collided);//while dealing with animations we have to put two imputs. first being the
  //description. second being the variable which we have loaded it in.
  obstacleGroup.setLifetimeEach(-1);//by this we are setting the lifetime of each cactus belonging to the obstacle group as -1.
  //it would look really weird if in a game after the trex has died if the sprites like the clouds, cactus vanish from the screen.
  //so in order to keep the sprites from dissapearing in the end state we are setting the lifetime as -1 because the value will keep
  //on decreasing without becoming zero so the sprites won't dissapear.(-1-1 = -2).
  obstacleGroup.setVelocityXEach(0);//here we are setting the velocity od each cactus as zero.
  cloudsGroup.setLifetimeEach(-1);
  cloudsGroup.setVelocityXEach(0);
  gameOver.visible = true;
  restart.visible = true;
  }
  trex.collide(secondGround);
  if(mousePressedOver(restart)){
    reset();
  }
  text("Score: "+score, 500, 50);
  /*
  ground.velocityX = -2;//we want the ground to move in the right-left direction.
  //console.log(ground.x);
  if (ground.x < 0){//without this the ground.x value would change from positive to 0 than negative and the ground would dissapear in 
    //order to avoid it we reset the ground.x value to ground.width / 2 when the ground.x goes below 0.
    ground.x = ground.width / 2;
  }
  if ((keyDown("space")) && (trex.y>=100)){//we are using this so that the trex can jump.we have added the condition trex.y>=100 so
    //that it doesn't jump too high.
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.8;//we are doing this so that the trex has gravity and it does not fly out of the screen when 
  //made to jump.Since velocity is -ve, the +0.5 will reduce the velocity everytime in the upward direction and bring it to 0. 
  //Then, it will make the Trex move in the other direction.
  //trex.collide(ground);//we are writing this down because we don't want the trex to dissolve into the floor.
  trex.collide(secondGround);
  spawnClouds()
  spawnObstacles()
//print random number in the range 10-20
console.log(Math.random(10,20))//output:0.9783619858683716 is not what we wanted
console.log(Math.round(Math.random(10,20)))//Math.round(0.566711358206966) output:1 though this is a whole number this is not in the 
//given range that we wanted.*/
}
function spawnObstacles(){
  if(frameCount%60==0){
    var cactus = createSprite(400,165,10,40);
    cactus.velocityX = -5;
    var rand = Math.round(random(1,6));
    switch(rand){//here by default all the cases are turned off now whatever value rand holds that particular case will be switched on
      //by the switch function and this would make sure that random images are added to the cactus.
      case 1: cactus.addImage(obstacle1);
      break; 
      case 2: cactus.addImage(obstacle2);
      break;
      case 3: cactus.addImage(obstacle3);
      break;
      case 4: cactus.addImage(obstacle4);
      break;
      case 5: cactus.addImage(obstacle5);
      break;
      case 6: cactus.addImage(obstacle6);
      break;
      default: break;
    }
    cactus.scale = 0.5;
    cactus.lifetime = 300;//even when the images are out of the screen they still exist in the computer's memory causing memory leak to
    //avoid this we give this sprite some lifetime and for every single time the draw function is called for every frame the lifetime
    //value decreases by one. when the value becomes 0 the sprite is automatically deleted from the computer's memory.
    obstacleGroup.add(cactus);//syntax: groupname.add(spritename).
  }
}
function spawnClouds(){
  if(frameCount%60==0){//to give a delay in the game so that the clouds appear in small chunks and not in a straight line we write this

  
  cloud = createSprite(600,100,40,10);
  cloud.velocityX = -3;
  cloud.addImage(cloudImage);
  cloud.scale = 0.4;
  cloud.y = Math.round(random(10,60));
  cloud.depth = trex.depth
  trex.depth = trex.depth+1;
  cloud.lifetime = 200;
  cloudsGroup.add(cloud);
}}//Creating a sprite repeatedly and not destroying it once its is used, this causes sprites taking up memory space and causing memory leak
//spritesGroup = new Group();
//spritesGroup.add(sprite);


function reset(){
gameOver.visible = false;
restart.visible = false;
gameState = PLAY;
score = 0;
trex.changeAnimation("running", trex_running);
obstacleGroup.destroyEach();
cloudsGroup.destroyEach();
}