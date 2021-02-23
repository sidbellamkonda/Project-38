var car, carImage;
var line1, linesGroup;
var gameState = "PLAY";
var cone1, coneImage, conesGroup;
var score;

function preload(){
  carImage=loadImage("car.png");
  coneImage=loadImage("trafficCone.png");
}

function setup() {
  createCanvas(400,700);
  car = createSprite(200,550,20,50);
  car.addImage("carImg",carImage);
  car.scale=0.07;
  //car.debug=true;
  
  conesGroup = new Group();
  linesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(0);
  
  text("Score: "+score,30,30);
  if(gameState === "PLAY"){
  lines();
  cones();
  
  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("left_arrow")){
    car.x=car.x-8;
  }
  if(keyDown("right_arrow")){
    car.x=car.x+8;
  }
  if(conesGroup.isTouching(car)||(car.x<0)||(car.x>400)){
    gameState="END";
  }
  
}
 
  if(gameState === "END"){
    if(keyDown("space")){
    gameState= "PLAY" ;
    car.x=200;
    score=0;
    damage=0;
    conesGroup.destroyEach();
    linesGroup.destroyEach();
    linesGroup.setVelocityEach(13);
    conesGroup.setVelocityEach(13);
    }
    conesGroup.setVelocityYEach(0);
    conesGroup.setLifetimeEach(-1);
    linesGroup.setVelocityYEach(0);
    linesGroup.setLifetimeEach(-1);   
    car.velocityX=0;
    text("Press 'SPACE' to Restart",30, 320);
  }
  drawSprites();
}
function lines(){
  if(frameCount % 10===0){
    line1 = createSprite(200,-100,20,60);
    line1.shapeColor="white";
    line1.velocityY=(13 + 2* score/400);
    line1.lifetime=100;
    car.depth=line1.depth;
    line1.depth=line1.depth+1;
    
    linesGroup.add(line1);
    console.log("hello");
  }
}
function cones(){
  if(frameCount % 25===0){
    cone1 = createSprite(random(0,400),-100,20,20);
    cone1.addImage("coneImg",coneImage);
    cone1.scale=0.07;
    cone1.velocityY=(13 + 2* score/400);
    cone1.lifetime=100;
    cone1.setCollider("rectangle",0,0,200,400);
    //cone1.debug=true;
    
    conesGroup.add(cone1);
  }
}