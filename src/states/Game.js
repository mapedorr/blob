/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6343/ColorCombo6343.html
 */
 
var BasicGame = BasicGame || {};

BasicGame.Game = function (game) {
  this.player = null;
  this.level001 = null;
  this.light = null;
  this.eye = null;
  this.lightning = null;

  this.showFPS = false;
  this.developmentMode = null;
};

BasicGame.Game.prototype.preload = function(){
  //Phaser has ARCADE physics (perfect for mobile browsers), NINJA physics and P2.JS Full-Body physics.
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  //Define the size of the world
  //  this.game.world.setBounds(this.world.x, this.world.y, 1024, 700);
  this.game.world.setBounds(-10, -10, this.game.width + 20, this.game.height + 20);

  //Init the player
  this.player = new BasicGame.Player(this.game,this.input);

  //Init the level
  this.level001 = new BasicGame.Level001(this.game);

  //Init a light
  this.light = new BasicGame.Light(this.game);
  BasicGame.light = this.light;

  //Init THE EYE
  this.eye = new BasicGame.Eye(this.game);

  //Init the lightning
  this.lightning = new BasicGame.Lightning(this.game);
};

BasicGame.Game.prototype.create = function(){
  //Set stage background color
  //this.game.stage.backgroundColor = 0xF39D41;
  this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky');


  //Create the level
  this.level001.create();

  //Create the player
  this.player.create(this.level001);

  //Create the light
  this.light.create(this.level001.walls);

  //Create THE EYE
  this.eye.create(this.player, this.level001, this.lightning);


  // Show FPS
  if(this.showFPS){
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(this.game.world.width / 2 - 80, 100, '', { font: '80px Arial', fill: '#fefefe' });
  }
};

// The update() method is called every frame
BasicGame.Game.prototype.update = function() {
  //UPDATE THE LIGHT
  this.light.update();

  //UPDATE THE PLAYER
  this.player.update(this.light);

  //UPDATE THE EYE
  this.eye.update();

  //Show development information
  if(this.showFPS){
    if (this.game.time.fps !== 0) {
      this.fpsText.setText(this.game.time.fps + ' FPS');
    }
  }
};

BasicGame.Game.prototype.quitGame = function(){
  //Here you should destroy anything you no longer need.
  //Stop music, delete sprites, purge caches, free resources, all that good stuff.
  this.state.start('MainMenu');
};