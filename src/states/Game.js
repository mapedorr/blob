/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6343/ColorCombo6343.html
 */
 
var BasicGame = BasicGame || {};

BasicGame.Game = function (game) {
  this.player = null;
  this.level = null;
  this.light = null;
  this.eye = null;
  this.lightning = null;

  this.showFPS = false;

  this.map = null;
};

BasicGame.Game.developmentMode = false;
BasicGame.Game.prototype.preload = function(){
  //Phaser has ARCADE physics (perfect for mobile browsers), NINJA physics and P2.JS Full-Body physics.
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  //Define the size of the world
  this.game.world.setBounds(0, 0, this.game.width, this.game.height);

  //Init the player
  this.player = new BasicGame.Player(this.game,this.input);

  //Init the level
  this.level = new BasicGame.Level(this.game);

  //Init a light
  this.light = new BasicGame.Light(this.game);
  BasicGame.light = this.light;

  // //Init THE EYE
  this.eye = new BasicGame.Eye(this.game);

  // //Init the lightning
  this.lightning = new BasicGame.Lightning(this.game);
};

BasicGame.Game.prototype.create = function(){
  // set stage background
  this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky');

  // create the level
  this.level.create();

  // create the player
  this.player.create(this.level);

  // create the light
  this.light.create(this.level.walls);

  // create THE EYE
  this.eye.create(this.player, this.level, this.lightning);

  // show FPS
  if(BasicGame.Game.developmentMode){
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

BasicGame.Game.prototype.loadLevel = function(levelNumber){
  this.level.destroyCurrentLevel();
  this.level.createLevel(2);


  this.player.updateLevel(this.level);
  this.light.updateWalls(this.level);
  this.eye.updateLevel(this.level);
  this.lightning.updateLevel(this.level);
};
