var PLAY = 1;
var END = 0;
var gameState = PLAY
var trex, trex_running, edges;
var groundImage;
var cloudImage, cloud
var cact1, cact2, cact3, cact4, cact5, cact6;
var groupCloudos, groupMexico
var trexEspetado
var juegoFinale, jfimg
var rrestrarte, rimg
var voe, checkMate, moneh
var score = 0
var msg

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  cact1 = loadImage("obstacle1.png")
  cact2 = loadImage("obstacle2.png")
  cact3 = loadImage("obstacle3.png")
  cact4 = loadImage("obstacle4.png")
  cact5 = loadImage("obstacle5.png")
  cact6 = loadImage("obstacle6.png")
  trexEspetado = loadAnimation("trex_FoiProVasco.png")
  jfimg = loadImage("gameOver.png")
  rimg = loadImage("restart.png")
  voe = loadSound("jump.mp3")
  checkMate = loadSound("die.mp3")
  moneh = loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(600, 200);

  //criando o trex
  coiso = createSprite(300, 180, 600, 12)
  coiso.velocityX = - 8
  coiso.addImage(groundImage)
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.setCollider("circle",0,0,40)

  //trex.debug = true
  trex.addAnimation("bateu", trexEspetado);
  edges = createEdgeSprites();


  groundeInvisibl = createSprite(300, 189, 600, 12)
  groundeInvisibl.visible = false
  rrestrarte = createSprite(300, 100, 50, 50)
  rrestrarte.addImage(rimg)
  rrestrarte.scale = 0.51

  juegoFinale = createSprite(300, 50, 50, 50)
  juegoFinale.addImage(jfimg)
  juegoFinale.scale = 1

  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  groupCloudos = new Group()
  groupMexico = new Group()
  msg = "Eu soy Osvaldo"
  console.log(msg)

}


function draw() {
  //definir a cor do plano de fundo 
  background(235);
  text("real Moneh: " + score, 500, 50)
  //registrando a posição y do trex
  //console.log(trex.y)
  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60)
    if (score > 0 && score % 100 === 0) {
      moneh.play()

    }
    coiso.velocityX = - (8 +  score / 100)

    if (keyDown("space") && trex.y >= 152) {
      trex.velocityY = -8;
      voe.play()

//if para testes (pulo infinito)
//    if (keyDown("space") && trex.y >= 100) {
//      trex.velocityY = -8;
//      voe.play()      

    }
    trex.velocityY = trex.velocityY + 0.5
    if (coiso.x < 0) {
      coiso.x = coiso.width / 2
    }
    if (groupMexico.isTouching(trex)) {
      gameState = END
      trex.changeAnimation("bateu")
      checkMate.play()
    }
    doud()
    mexicanos()
    rrestrarte.visible = false
    juegoFinale.visible = false
  }
  else if (gameState === END) {
    groupMexico.setVelocityXEach(0)
    coiso.velocityX = 0
    groupCloudos.setVelocityXEach(0)
    trex.velocityY = 0
    groupMexico.setLifetimeEach(-1)
    groupCloudos.setLifetimeEach(-1)
    rrestrarte.visible = true
    juegoFinale.visible = true
    if(mousePressedOver(rrestrarte)){
     rencar()
    }
  }






  //impedir que o trex caia
  trex.collide(groundeInvisibl)

  drawSprites();
}

function doud() {
  if (frameCount % 200 === 0) {
    cloud = createSprite(600, 10, 20, 20);
    cloud.velocityX = -2
    cloud.y = Math.round(random(10, 100));
    cloud.addImage(cloudImage)
    cloud.lifetime = 320;
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    groupCloudos.add(cloud)
  }
}

function mexicanos() {
  if (frameCount % 60 === 0) {
    clebito = createSprite(600, 160, 20, 40);
    clebito.velocityX = -(8 + score / 100)
    clebito.scale = 0.54
    groupMexico.add(clebito)
    var megasena = Math.round(random(1, 6))
    switch (megasena) {
      case 1: clebito.addImage(cact1)
        break;
      case 2: clebito.addImage(cact2)
        break;
      case 3: clebito.addImage(cact3)
        break;
      case 4: clebito.addImage(cact4)
        break;
      case 5: clebito.addImage(cact5)
        break;
      case 6: clebito.addImage(cact6)
        break;

      default:
        break;
    }
    clebito.lifetime = 75
    //    clebito.debug = true
  }
}







                            

function rencar() {
  groupMexico.destroyEach();
  groupCloudos.destroyEach();
  gameState = PLAY;
  score = 0;
  trex.changeAnimation("running")
}


















