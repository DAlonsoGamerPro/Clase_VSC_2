var PLAY = 1;
var END = 0;
var Gamestate = 1;

var sword, fruit, fruit1, fruit2, fruit3, fruit4, fruit5, fruit6, bomb, fruitGroup, bombGroup, score, r, randomFruit, position;
var swordImage, bombImage, gameoverImage, background;
var gameoverSound, swordSwoosh, swordSwooshSound;

function preload(){
    swordImage = loadImage("sword.png");
    bombImage = loadAnimation("bomb1.png", "bomb2.png");
    fruit1 = loadImage("fruit1.png");
    fruit2 = loadImage("fruit2.png");
    fruit3 = loadImage("fruit3.png");
    fruit4 = loadImage("fruit4.png");
    fruit5 = loadImage("fruit5.png");
    fruit6 = loadImage("fruit6.png");
    gameoverImage = loadImage("gameovercopy1.png");
    Bg = loadImage("backgroundepic.png");
    swordSwooshSound = loadSound("swordSwoosh.mp3");
    gameoverSound = loadSound("gameover.mp3");
}

function setup(){
    createCanvas(600,600);
    sword = createSprite(40,200,20,20);
    sword.addImage(swordImage);
    sword.scale = 0.05;
    sword.setCollider("rectangle", 0, 0, 40, 40);
    score = 0;
    fruitGroup = createGroup();
    bombGroup = createGroup();

}

function draw(){
    background(Bg);

    if(Gamestate === PLAY){
        Fruits();
        Bomb();
        sword.y = World.mouseY;
        sword.x = World.mouseX;

        if(fruitGroup.isTouching(sword)){
            fruitGroup.destroyEach();
            swordSwooshSound.play();
            score = score + 2;
        }
        else{
            if(bombGroup.isTouching(sword)){
                Gamestate = END;
                //gameoverSound.play();
                fruitGroup.destroyEach();
                bombGroup.destroyEach();
                fruitGroup.setVelocityXEach(0);
                bombGroup.setVelocityXEach(0);
                sword.addImage(gameoverImage);
                sword.x = 300;
                sword.y = 300;
                sword.scale = 3;
            }
        }
    }



    drawSprites();
    textSize(25);
    text("Puntuación Final: " + score, 250, 50);
}

function Bomb(){
    if(World.frameCount%200===0){
        bomb = createSprite(400,200,20,20);
        bomb.addAnimation("moving", bombImage);
        bomb.y = Math.round(random(100,550));
        bomb.velocityX = -(8+(score/10));
        bomb.setLifetime = 50;
        bombGroup.add(bomb);
        bombGroup.setScaleEach(0.05);
    }
}

function Fruits(){
    if(World.frameCount%80===0){
        position = Math.round(random(1,2));
        fruit = createSprite(400,200,20,20);
        console.log(position);
        if(position == 1){
                fruit.x = 600;
                fruit.velocityX = -(7+(score/4));

        }
        else{
            if(position == 2){
                fruit.x = 0;
                fruit.velocityX = (7+(score/4));
            }
        }
        fruit.scale = 0.05;
        r = Math.round(random(1, 6));
        if(r == 1){
            fruit.addImage(fruit1);
        }
        else if(r == 2){
            fruit.addImage(fruit2);
        }
        else if(r == 3){
            fruit.addImage(fruit3);
        }
        else if(r == 4){
            fruit.addImage(fruit4);
        }
        else if(r == 5){
            fruit.addImage(fruit5);
        }
        else if(r == 6){
            fruit.addImage(fruit6);
        }
        fruit.y = Math.round(random(50, 550));
        fruit.setLifetime = 100;
        fruitGroup.add(fruit);
    }
}