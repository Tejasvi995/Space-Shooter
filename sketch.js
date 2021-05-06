var PLAY = 1;
var END = 0;
var WIN = 2
gameState = PLAY;

var shooter, shooterImg;
var bullet,asteroid;
var score;
var bg;

function preload(){
  shooterImg = loadImage("space shuttle.png");
  bg = loadImage("backgroundImg.png");
  asteroidImg = loadImage("Asteroid.png");
  asteroid2Img = loadImage("Asteroid2.png");
  asteroid3Img = loadImage("asteroid3.png");
  asteroid4Img = loadImage("asteroid4.png");
  bulletImg = loadImage("bullet.png");
  winImg = loadImage("win.jpeg")
  overImg = loadImage("game over.jpeg");
  pewSound = loadSound("Pew.m4a");
  boomSound = loadSound("Boom.m4a");
  
}

function setup() {
  createCanvas(500, 500);
  shooter = createSprite(60,200,20,20);
  shooter.addImage(shooterImg);
  shooter.scale = 0.2;
  bulletGrp = new Group();
  asteroidGrp = new Group();
  asteroid2Grp = new Group();
  asteroid3Grp = new Group();
  asteroid4Grp = new Group();
  score = 0;
  
}

function draw() {
  
  if(gameState === PLAY){
    background(bg);
    shooter.y = mouseY;
    
    var rand = Math.round(random(1,4));
    if(World.frameCount % 80===0) {
      if(rand===1) {
        asteroids();
      }
      else if(rand===2) {
        asteroids2();
      }
      else if(rand===3) {
        asteroids3();
      }
      else if(rand===4) {
        asteroids4();
      }
    }
    
    if(keyDown("space")){
    createBullets();
    }
    if(bulletGrp.isTouching(asteroidGrp)){
      pewSound.play();
      bulletGrp.destroyEach();
      asteroidGrp.destroyEach();
      score+=5;
    }
    if(bulletGrp.isTouching(asteroid2Grp)){
      pewSound.play();
      bulletGrp.destroyEach();
      asteroid2Grp.destroyEach();
      score+=5;
    }
    if(bulletGrp.isTouching(asteroid3Grp)){
      pewSound.play();
      bulletGrp.destroyEach();
      asteroid3Grp.destroyEach();
      score+=5;
    }
    if(bulletGrp.isTouching(asteroid4Grp)){
      pewSound.play();
      bulletGrp.destroyEach();
      asteroid4Grp.destroyEach();
      score+=5;
    }
    if(shooter.isTouching(asteroidGrp)){
      boomSound.play();
      gameState = END;
    }
    if(shooter.isTouching(asteroid2Grp)){
      boomSound.play();
      gameState = END;
    }
    if(shooter.isTouching(asteroid3Grp)){
      boomSound.play();
      gameState = END;
    }
    if(shooter.isTouching(asteroid4Grp)){
      boomSound.play();
      gameState = END;
    }
    if(score === 500){
      gameState = WIN;
    }
    
  }
    if(gameState === END){
      background(overImg);
      asteroidGrp.destroyEach();
      asteroid2Grp.destroyEach();
      asteroid3Grp.destroyEach();
      asteroid4Grp.destroyEach();
      
      asteroidGrp.setVelocityXEach = 0;
      asteroid2Grp.setVelocityXEach = 0;
      asteroid3Grp.setVelocityXEach = 0;
      asteroid4Grp.setVelocityXEach = 0;
      bulletGrp.destroyEach();
      bulletGrp.setVelocityXEach = 0;
      shooter.visible = false;
      
    }
    if(gameState === WIN){
      background(winImg);
      asteroidGrp.destroyEach();
      asteroid2Grp.destroyEach();
      asteroid3Grp.destroyEach();
      asteroid4Grp.destroyEach();
      
      asteroidGrp.setVelocityXEach = 0;
      asteroid2Grp.setVelocityXEach = 0;
      asteroid3Grp.setVelocityXEach = 0;
      asteroid4Grp.setVelocityXEach = 0;
      bulletGrp.destroyEach();
      bulletGrp.setVelocityXEach = 0;

      shooter.visible = false;
    }
    //console.log(gameState);
    //asteroids(); 
    drawSprites();
    textSize(20);
    textFont("Georgia");
    fill("white")
    text("Score:"+ score,400,25);
}

function asteroids() {
  
 if(frameCount % 10 === 0){
   var asteroid = createSprite(505,Math.round(random(20,           470)))
  asteroid.addImage(asteroidImg);
  asteroid.scale = 0.85;
  asteroid.velocityX = -(4+score/100);
  asteroid.lifetime = 180;
  asteroidGrp.add(asteroid);
  //asteroid.debug = true;
  asteroid.setCollider("rectangle",0,0,55,55);
  }
}

function asteroids2() {
  
 if(frameCount % 10 === 0){
   var asteroid2 = createSprite(505,Math.round(random(20,           470)))
  asteroid2.addImage(asteroid2Img);
  asteroid2.scale = 0.2;
  asteroid2.velocityX = -(4+score/100);
  asteroid2.lifetime = 180;
  asteroid2Grp.add(asteroid2);
  //asteroid2.debug = true;
  asteroid2.setCollider("rectangle",0,0,305,280);
  }
}

function asteroids3() {
  
 if(frameCount % 10 === 0){
   var asteroid3 = createSprite(505,Math.round(random(20,           470)))
  asteroid3.addImage(asteroid3Img);
  asteroid3.scale = 0.13;
  asteroid3.velocityX = -(4+score/100);
  asteroid3.lifetime = 180;
  asteroid3Grp.add(asteroid3);
  //asteroid3.debug = true;
  asteroid3.setCollider("rectangle",0,0,405,405);
  }
}

function asteroids4() {
  
 if(frameCount % 10  === 0){
   var asteroid4 = createSprite(505,Math.round(random(20,           470)))
  asteroid4.addImage(asteroid4Img);
  asteroid4.scale = 0.25;
  asteroid4.velocityX = -(4+score/100);
  asteroid4.lifetime = 180;
  asteroid4Grp.add(asteroid4);
  //asteroid4.debug = true;
  asteroid4.setCollider("rectangle",0,0,310,205);
   console.log()
  }
}
function createBullets() {
  bullet = createSprite(60,20,20,20);
  bullet.addImage(bulletImg);
  bullet.scale = 0.3 ;
  bullet.y = shooter .y;
  bullet.velocityX = 4;
  bullet.lifetime = 160;
  bullet.depth = shooter.depth;
  shooter.depth = shooter.depth + 1;
  bulletGrp.add(bullet);
}