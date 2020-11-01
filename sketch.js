  var PLAY=1
  var END=0;
  var gameState=PLAY;
  var monkey , monkey_running;
  var ground;
  var bananaImage, obstaclesImage;
  var foodGroup, obstacleGroup;
  var score


function preload(){
  
     monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");

}



function setup() {
    createCanvas(600,400);

    monkey=createSprite(80,325,20,20);
    monkey.addAnimation("running",monkey_running);
    monkey.scale=0.1;

    ground=createSprite(400,350,900,10);


    foodGroup=createGroup();
    obstaclesGroup=createGroup();
  
    
  }

function draw() {
  background(176,222,249);

    if (gameState===PLAY){
      ground.velocityX=-4;
      ground.x=ground.width/2;
      

      var survivalTime=0;

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("SurvivalTime:"+survivalTime,100,50);
      
     
      
      
      if (ground.x<0){
      ground.x=ground.width/2;
    } 

     monkey.collide(ground); 
    //console.log(Math.round(monkey));
      
     monkey.velocityY=monkey.velocityY+0.8;
      
      if (keyDown("space") && monkey.y >= 235){
      monkey.velocityY=-12;
  }
      
       
      
     if (monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
     }

      food();
      obstacle();
      
      if(obstaclesGroup.isTouching(monkey)){
        gameState= END;
      }
    }
 
    else if(gameState===END){
      
      ground.velocityX=0;
      monkey.velocityY=0;
      
      
      foodGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
      foodGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
    }
  
  if(mousePressedOver(monkey)) {
      reset();
    }


  
drawSprites();
  
  
}

function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  score=0
  
}


function food(){
if (frameCount % 80 === 0){
   var banana=createSprite(300,315,20,50);
   banana.y=Math.round(random(120,200));
   banana.addImage(bananaImage);
   banana.scale=0.05; 
   banana.velocityX=-6;
   banana.lifetime=300;
  
   foodGroup.add(banana);
 }
}

function obstacle(){
  if (frameCount % 80 === 0){
    var obstacle=createSprite(800,340,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.15;
    obstacle.lifetime=300;
    obstacle.collide(ground);
    
    obstaclesGroup.add(obstacle);
    
    
  }
  
}

