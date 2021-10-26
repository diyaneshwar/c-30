const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground,leftwall,rightwall,leftroad,rightroad;
var bridge,joinPoint,stone;
var stoneImg,zombieImgright,zombieImgleft,woodImg,axeImg,backgroundImg;
var zombie,bttn,bttnImg

var stones=[]

function preload(){
 stoneImg=loadImage("stone.png")
 zombieImgright=loadAnimation("zombie1.png","zombie2.png")
 woodImg=loadImage("wood.png")
 axeImg=loadImage("axe.png")
 backgroundImg=loadImage("background.png")
zombieImgleft=loadAnimation("zombie3.png","zombie4.png")



}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  bttn=createImg("axe.png")
  bttn.position(windowWidth-100,windowHeight-400)
bttn.size(50,50)
 bttn.mouseClicked(drop)
ground=new Base(windowWidth/2,windowHeight,2000,100)
leftwall=new Base(0,windowHeight/2,60,2000)
rightwall=new Base(windowWidth,windowHeight/2,90,2000)
leftroad=new Base(100,windowHeight/2,200,50)
rightroad=new Base(windowWidth-100,windowHeight/2,200,50)
 joinPoint=new Base(width-160,height/2-68,40,20)
 bridge=new Bridge(20,{x:width/2-830,y:height/2-100})

zombie=createSprite(500,590,80,80)
zombie.addAnimation("walkingright",zombieImgright)
zombie.changeAnimation("walkingright")
zombie.scale=0.07
zombie.setVelocity(3,0)

Matter.Composite.add(bridge.body,joinPoint);
jointLink=new Link(bridge,joinPoint);

for(var i=0;i<=8;i++){

  var x=random(width/2-200,width/2+300);
  var y=random(-10,80);
  var stone=new Stone(x,y,80,80);
  stones.push(stone);
  }

}

function draw() {
  background(backgroundImg);
  ground.show()

  if(zombie.x==windowWidth-70){
    zombie.setVelocity(-3,0)
    zombie.addAnimation("walkingleft",zombieImgleft)
    zombie.changeAnimation("walkingleft")
  }

  if(zombie.x==70){
    zombie.setVelocity(3,0)
    zombie.addAnimation("walkingright",zombieImgright)
    zombie.changeAnimation("walkingright")
    
  }
  

  leftwall.show()
  rightwall.show()
  leftroad.show()
  rightroad.show()
  bridge.show()
  for (var stone of stones){
    stone.show()
    drawSprites()
  }
  
  Engine.update(engine);

}
function drop(){
  bridge.break()
  jointLink.detach()
  jointLink=null
}
