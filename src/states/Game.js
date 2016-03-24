/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6343/ColorCombo6343.html
 */

var BasicGame = BasicGame || {};

BasicGame.Game = function (game) {
  this.days = null;
  this.player = null;
  this.level = null;
  this.light = null;
  this.eye = null;
  this.lightning = null;
  this.showFPS = null;
  this.map = null;
  this.darknessGroup = null;
  this.darknessTween = null;
  this.brightnessTween = null;
  this.countdownDuration = null;
  this.inDarkness = null;
  this.isLoadingLevel = null;
  this.lifes = null;
  this.lifesGroup = null;

  this.music = null;
};

BasicGame.Game.developmentMode = false;
BasicGame.isRetrying = false;

BasicGame.Game.prototype.preload = function(){
  // create the days object
  this.days = new BasicGame.Days();

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
  // define properties
  this.lifes = 3;
  this.showFPS = false;
  this.countdownDuration = 0.7;
  this.inDarkness = true;
  this.isLoadingLevel = true;

  // set stage background
  this.background = this.game.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height, this.getSkyName());

  // configure the camera for shaking
  this.game.camera.setSize(this.game.world.width/2, this.game.world.height/2);
  this.game.camera.setPosition(0, 0);

  // add the music
  if (!this.music) {
    this.music = this.game.add.sound('level_music', 0.1, true);
  }

  // create the level
  this.level.create();

  // create the player
  this.player.create(this.level);

  if(this.level.spikes){
   this.game.world.bringToTop(this.level.spikes);
    this.game.world.bringToTop(this.level.walls);
  }

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

  // bring to top the pieces
  this.game.world.bringToTop(this.level.pieces);

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

  this.darknessGroup.addChild(darknessSprite);

  // create the darkness and brightness tweens
  this.darknessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
  this.darknessTween.to({alpha: 1},
    this.countdownDuration * 1000,
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
    // this.eye.eyeStateTimer = this.eye.searchingTime;
    this.eye.initSearch(true);
    this.player.player.body.enable = true;
    this.isLoadingLevel = false;
    if (this.music.isPlaying === false) {
      this.music.play();
    }
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
    if(BasicGame.isRetrying === false){
     this.level.showDay();
    }
    else {
      this.level.levelTextGroup.alpha = 0;
      this.hideDarkness();
    }
    return;
  }

  if(this.level.isEnded == true){
    if(this.inDarkness == false){
      return;
    }

    this.eye.destroyTimers();
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

BasicGame.Game.prototype.render = function(){
  this.player.render();
  this.level.render();
};

BasicGame.Game.prototype.quitGame = function(){
  //Here you should destroy anything you no longer need.
  //Stop music, delete sprites, purge caches, free resources, all that good stuff.
  this.state.start('MainMenu');
};

BasicGame.Game.prototype.showDarkness = function(durationInMS){
  this.game.world.bringToTop(this.darknessGroup);
  // this.darknessTween.to({alpha: 1},
  //   durationInMS || this.countdownDuration * 1000,
  //   Phaser.Easing.Quadratic.Out,
  //   true);
  this.darknessTween.updateTweenData("duration", durationInMS || this.countdownDuration * 1000);
  this.darknessTween.start();
};

BasicGame.Game.prototype.hideDarkness = function(){
  this.inDarkness = false;
  this.brightnessTween.start();
};

BasicGame.Game.prototype.loadLevel = function(levelNumber){
  if (levelNumber > 30) {
    // congrats, you ended the game
    this.state.start('TheEnd');
    return;
  }

  if (this.background.key != this.getSkyName()) {
    this.background.loadTexture(this.getSkyName());
  }

  this.level.destroyCurrentLevel();
  this.level.createLevel(levelNumber);

  this.player.updateLevel(this.level);
  this.light.updateWalls(this.level);
  this.eye.updateLevel(this.level);
  this.lightning.updateLevel(this.level);

  this.game.world.bringToTop(this.light.lightBitmap);
  this.game.world.bringToTop(this.level.pieces);

  localStorage.setItem("oh-my-blob", BasicGame.setDay(levelNumber));
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
  if(this.lifes <= 0){
    return;
  }

  var lifeTween = this.game.add.tween(this.lifesGroup.getChildAt(--this.lifes));
  lifeTween.to({alpha: 0},
    700,
    Phaser.Easing.Quadratic.Out,
    true);
  if(this.lifes <= 0){
    localStorage.setItem("oh-my-blob", BasicGame.addDeath());

    // notify to the EYE the player has died
    this.eye.rejoice();

    // notify the PLAYER that is time to show the animation for dead
    this.player.dieWithDignity();

    // create the timer
    var gameOverTimer = this.game.time.create(true);

    // set the timer to stop showing the day
    gameOverTimer.add(1000,
      function(){
        this.state.start('GameOver');
      },
      this);

    gameOverTimer.start();

  }
};


BasicGame.Game.prototype.subtractAllLifes = function(destroyPlayer){
  localStorage.setItem("oh-my-blob", BasicGame.addDeath());

  this.lifes = 0;

  var lifeTween = this.game.add.tween(this.lifesGroup);
  lifeTween.to({alpha: 0},
    700,
    Phaser.Easing.Quadratic.Out,
    true);

  this.eye.destroyTimers();
  if(destroyPlayer){
    this.player.dieWithDignity();

    // create the timer
    var gameOverTimer = this.game.time.create(true);

    // set the timer to stop showing the day
    gameOverTimer.add(1000,
      function(){
        this.state.start('GameOver');
      },
      this);

    gameOverTimer.start();
  } else {
    // start the darkness
    this.showDarkness(500);
  }
};

BasicGame.Game.prototype.getSkyName = function(){
  if(BasicGame.currentLevel <= 10){
    return 'sky01';
  } else if (BasicGame.currentLevel <= 20) {
    return 'sky02';
  } else {
    return 'sky03';
  }
};