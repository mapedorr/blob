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
  this.darknessGroup = null;
  this.darknessTween = null;
  this.brightnessTween = null;
  this.countdownDuration = 10;
  this.inDarkness = true;
  this.isLoadingLevel = true;
  this.lifes = 3;
  this.lifesGroup = null;
};

BasicGame.Game.developmentMode = false;
BasicGame.currentLevel = 1;

BasicGame.Game.prototype.preload = function(){
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  // define the size of the world
  this.game.world.setBounds(0, 0, this.game.width, this.game.height);

  // init the level
  this.level = new BasicGame.Level(this.game, this);

  // init the player
  this.player = new BasicGame.Player(this.game, this.input, this);

  // init a light
  this.light = new BasicGame.Light(this.game, this);
  BasicGame.light = this.light;

  // init THE EYE
  this.eye = new BasicGame.Eye(this.game, this);

  // init the lightning
  this.lightning = new BasicGame.Lightning(this.game, this);
};

BasicGame.Game.prototype.create = function(){
  // set stage background
  this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky');

  // configure the camera for shaking
  this.game.camera.setSize(this.game.world.width/2, this.game.world.height/2);
  this.game.camera.setPosition(0, 0);

  // create the level
  this.level.create();

  // create the player
  this.player.create(this.level);

  // create the group of sprites for lifes
  this.lifesGroup = this.game.add.group();
  for(var i=0; i<this.lifes; i++){
    var lifeSprite = new Phaser.Sprite(this.game, 0, 0, "player");
    lifeSprite.scale.set(0.5, 0.8);
    lifeSprite.x = (i % 3) * (lifeSprite.width + 6);
    this.lifesGroup.addChild(lifeSprite);
  }
  this.lifesGroup.x = 15;
  this.lifesGroup.y = 0;

  // create the light
  this.light.create(this.level);

  // create THE EYE
  this.eye.create(this.player, this.level, this.lightning);

  // create the darkness
  this.darknessGroup = this.add.group();
  var darknessBitmap = new Phaser.BitmapData(this.game,
    'darkness',
    this.game.width,
    this.game.height);
  darknessBitmap.ctx.rect(0, 0, this.game.width, this.game.height);
  darknessBitmap.ctx.fillStyle = '#000';
  darknessBitmap.ctx.fill();

  var darknessSprite = new Phaser.Sprite(this.game, 0, 0, darknessBitmap);
  // darknessSprite.alpha = 0.8;

  this.darknessGroup.addChild(darknessSprite);

  // create the darkness and brightness tweens
  this.darknessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
  this.darknessTween.to({alpha: 1},
    3000,
    Phaser.Easing.Quadratic.Out,
    false);
  this.darknessTween.onComplete.add(function(){
    this.inDarkness = true;
    if(this.lifes <= 0){
      // show the game over screen
      this.state.start('GameOver');
    }
  }, this);

  this.brightnessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
  this.brightnessTween.to({alpha: 0},
    700,
    null,
    false);
  this.brightnessTween.onComplete.add(function(){
    this.isLoadingLevel = false;
    this.eye.eyeStateTimer = this.eye.searchingTime;
  }, this);

  // create the tween for shaking the camera
  this.shakeTween = this.game.add.tween(this.game.camera)
  this.shakeTween.to({y: -5},
    40,
    Phaser.Easing.Sinusoidal.InOut,
    false,
    0,
    4,
    true);
  this.shakeTween.onComplete.add(function(){
    // set the camera position to its initial position
    this.game.camera.setPosition(0, 0);
  }, this);

  // show FPS
  if(BasicGame.Game.developmentMode){
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(this.game.world.width / 2 - 80, 100, '', { font: '80px Arial', fill: '#fefefe' });
  }
};

BasicGame.Game.prototype.update = function() {
  // update the light
  this.light.update();

  // update The Player
  this.player.update(this.light);

  // update The Eye
  this.eye.update();

  // update the lightning
  this.lightning.update();

  if(this.level.isReady == true){
    this.level.isReady = false;
    this.level.showDay();
    return;
  }

  if(this.level.isEnded == true){
    if(this.inDarkness == false){
      return;
    }

    this.isLoadingLevel = true;
    this.loadLevel(++BasicGame.currentLevel);
    this.game.world.bringToTop(this.lifesGroup);
    this.game.world.bringToTop(this.darknessGroup);
    return;
  }

  // show development information
  if(BasicGame.Game.developmentMode){
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

BasicGame.Game.prototype.showDarkness = function(){
  this.game.world.bringToTop(this.darknessGroup);
  this.darknessTween.start();
};

BasicGame.Game.prototype.hideDarkness = function(){
  this.inDarkness = false;
  this.brightnessTween.start();
};

BasicGame.Game.prototype.loadLevel = function(levelNumber){
  this.level.destroyCurrentLevel();
  this.level.createLevel(levelNumber);

  this.player.updateLevel(this.level);
  this.light.updateWalls(this.level);
  this.eye.updateLevel(this.level);
  this.lightning.updateLevel(this.level);

  this.game.world.bringToTop(this.light.lightBitmap);
};

BasicGame.Game.prototype.shakeCamera = function(){
  // shake the camera by moving it up and down 5 times really fast
  this.game.camera.y = 5;
  if(!this.shakeTween.isRunning){
    this.shakeTween.start();
  }
};

BasicGame.Game.prototype.subtractLife = function(){
  // remove one life sprite
  var lifeTween = this.game.add.tween(this.lifesGroup.getChildAt(--this.lifes));
  lifeTween.to({alpha: 0},
    700,
    Phaser.Easing.Quadratic.Out,
    true);
  if(this.lifes <= 0){
    // notify to the EYE the player has died
    this.eye.rejoice();

    // notify the PLAYER that is time to show the animation for dead
    this.player.dieWithDignity();

    // start the darkness
    this.showDarkness();
  }
};