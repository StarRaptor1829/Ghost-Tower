
var tower, towerImage;

var door, doorImage, doorGroup;

var climber, climberImage, climberGroup;

var ghost, ghostImage;

var invisibleBlock, invisibleBlockGroup;

var gameState="play"

var spookySound
function preload(){
towerImage=loadImage("tower.png");
doorImage=loadImage("door.png");
climberImage=loadImage("climber.png");
ghostImage=loadImage("ghost-standing.png");
spookySound=loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600);
spookySound.loop();
tower=createSprite(300,300);
tower.addImage("tower",towerImage);
tower.velocityY=4
doorGroup=new Group();
climberGroup=new Group()
ghost=createSprite(139,410,5,5);
ghost.addImage("ghost",ghostImage);
ghost.scale=0.5
invisibleBlockGroup=new Group();
}

function draw(){
background("white");
if(gameState==="play"){

if(tower.y>400){
tower.y=300
}
if(keyDown("LEFT_ARROW")){
ghost.x=ghost.x-3
}
if(keyDown("RIGHT_ARROW")){
ghost.x=ghost.x+3
}
if(keyDown("SPACE")){
ghost.velocityY=-3}

ghost.velocityY=ghost.velocityY+0.5
if(climberGroup.isTouching(ghost)){
ghost.velocityY=0;
}
if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
ghost.destroy()
}


spawnDoor();
drawSprites();
}
if(gameState==="end"){
stroke("black")
fill("black")
textSize(20);
text("Game Over", 200, 200);

}


}

function spawnDoor(){
if(frameCount%240===0){
var door=createSprite(200,-50);
door.addImage("door",doorImage);
door.velocityY=4;
door.lifetime=800;
door.x=Math.round(random(100,400))
doorGroup.add(door)
var climber=createSprite(200,10);
climber.addImage("climber",climberImage)
climber.velocityY=4
climber.lifetime=800;
climber.x=door.x;
climberGroup.add(climber);
ghost.depth=door.depth 
ghost.depth+=1
var invisibleBlock=createSprite(200,15);
invisibleBlock.width=climber.width;
invisibleBlock.height=2;
invisibleBlock.velocityY=4
invisibleBlock.x=door.x;
invisibleBlock.debug=true;
invisibleBlockGroup.add(invisibleBlock);
}
}