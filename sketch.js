
var monkey , monkeyrunning,monkeystop;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime=0;
var gameState=1,PLAY=1,END;

function preload(){
  
  
  monkeyrunning=loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png",  "monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png"   ,"monkey_8.png")
  monkeystop=loadImage("monkey_0.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(400,400);
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkeyrunning);
   monkey.addImage("stop",monkeystop)
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background(255);
  
  //code for gameState=PLAY
  if(gameState===PLAY){
     play();
  }
  //code for gameState=END
  else if(gameState===END){    
    end();
  }

  drawSprites();
}

//To create functions for spawnFood,spawnObstacles,reset,end,play

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset (){
  FoodGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score=0;
  survivalTime=0;
  monkey.changeAnimation("moving");
}

function end() {
  
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.changeImage("stop");
        
    stroke("black");
    textSize(20);
    fill("black");
    text("Press 'R' to Restart",130,200);
    
    
    if(keyDown("R")){
       reset();
       gameState=PLAY;
       frameCount=0;
       getFrameRate(0);
    }
}

function play(){
    text("Score: "+ score, 500,50);
    text("Survival Time: "+ survivalTime, 500,50);
    stroke("black");
    textSize(20);
    fill("black");
    
     if(ground.x<0) {
        ground.x=ground.width/2;
      } 

     if(keyDown("space") && monkey.y>=200) {
        monkey.velocityY = -12;
     } 
     monkey.velocityY = monkey.velocityY + 0.8;

     monkey.collide(ground);   
     spawnFood();
     spawnObstacles();

     if(monkey.isTouching(obstaclesGroup)){

      gameState=END
    }

     ground.velocityX = -(4 + 3*survivalTime/100)
     FoodGroup.setVelocityXEach(-(4 + 3*survivalTime/100));
     obstaclesGroup.setVelocityXEach(-(4 + 3*survivalTime/100));

     //set survivalTime
     survivalTime=Math.round(frameCount/frameRate()) 
     text("Survival Time: "+ survivalTime, 150,50);

     if(monkey.isTouching(FoodGroup) ){
        score=score+1
        FoodGroup.destroyEach();
      }
     text(" score: "+ score, 50,70);

}

  
