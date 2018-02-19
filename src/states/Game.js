var BasicGame = require('BasicGame');

BasicGame.Game = function (game) {
  // CONSTANTS
  this.LIFES_AMOUNT = 3;

  this.days = null;
  this.player = null;
  this.level = null;
  this.light = null;
  this.eye = null;
  this.lightning = null;
  this.helper = null;
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

BasicGame.Game.prototype.preload = function () {
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

  // init the helper
  this.helper = new BasicGame.Helper(this.game, this);
};

BasicGame.Game.prototype.create = function () {
  // define properties
  this.lifes = this.LIFES_AMOUNT;
  this.showFPS = false;
  this.countdownDuration = 0.7;
  this.inDarkness = true;
  this.isLoadingLevel = true;

  // set stage background
  this.background = this.game.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height, this.getSkyName());

  // configure the camera for shaking
  this.game.camera.setSize(this.game.world.width / 2, this.game.world.height / 2);
  this.game.camera.setPosition(0, 0);

  // add the music
  if (!this.music) {
    this.music = this.game.add.sound('level_music', 0.1, true);
  }

  // create the level
  this.level.create();

  // create the player
  this.player.create(this.level);


  // create the group of sprites for lifes
  this.lifesGroup = this.game.add.group();

  this.createLifeIndicators();

  this.lifesGroup.x = 16;
  this.lifesGroup.y = 16;

  // create the light
  this.light.create(this.level);

  // create THE EYE
  this.eye.create(this.player, this.level, this.lightning);

  // bring to top some things so the game looks better
  this.game.world.bringToTop(this.light.lightBitmap);
  if (this.level.spikes) {
    this.game.world.bringToTop(this.level.spikes);
  }
  this.game.world.bringToTop(this.level.walls);
  this.game.world.bringToTop(this.level.pieces);
  this.game.world.bringToTop(this.lifesGroup);

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

  // create the darkness tween
  this.darknessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
  this.darknessTween.to({ alpha: 1 },
    this.countdownDuration * 1000,
    Phaser.Easing.Quadratic.Out,
    false);
  this.darknessTween.onComplete.add(this.darknessTweenCompleted, this);

  // create the brightness tween
  this.brightnessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
  this.brightnessTween.to({ alpha: 0 },
    700,
    null,
    false);
  this.brightnessTween.onComplete.add(this.brightnessTweenCompleted, this);

  // create flash sprite
  this.flashGroup = this.add.group();
  var flashBitmap = new Phaser.BitmapData(this.game,
    'flash',
    this.game.width,
    this.game.height);
  flashBitmap.ctx.rect(0, 0, this.game.width, this.game.height);
  flashBitmap.ctx.fillStyle = '#fff';
  flashBitmap.ctx.fill();

  var flashSprite = new Phaser.Sprite(this.game, 0, 0, flashBitmap);
  flashSprite.alpha = 0;
  this.flashGroup.addChild(flashSprite);

  if (this.level.isReady === true) {
    this.levelReady();
  }

  // show FPS
  if (BasicGame.Game.developmentMode) {
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(this.game.world.width / 2 - 80, 100, '', { font: '80px Arial', fill: '#fefefe' });
  }
};

BasicGame.Game.prototype.update = function () {
  // update the light
  this.light.update();

  // update The Player
  this.player.update(this.light);

  // update The Eye
  this.eye.update();

  // update the lightning
  this.lightning.update();

  // show development information
  if (BasicGame.Game.developmentMode) {
    if (this.game.time.fps !== 0) {
      this.fpsText.setText(this.game.time.fps + ' FPS');
    }
  }
};

BasicGame.Game.prototype.levelReady = function () {
  this.level.isReady = false;

  if (BasicGame.isRetrying === false) {
    this.level.showDay();
  }
  else {
    this.level.levelTextGroup.alpha = 0;
    this.hideDarkness();
  }
};

BasicGame.Game.prototype.levelEnded = function () {
  // notify to the eye that the level was ended
  this.eye.endLevel(true);

  if (this.inDarkness === false) {
    this.helper.timer(100, this.levelEnded.bind(this));
    return;
  }

  this.isLoadingLevel = true;
  this.loadLevel(++BasicGame.currentLevel);
};

BasicGame.Game.prototype.render = function () {
  this.player.render();
  this.level.render();
};

BasicGame.Game.prototype.quitGame = function () {
  //Here you should destroy anything you no longer need.
  //Stop music, delete sprites, purge caches, free resources, all that good stuff.
  this.state.start('MainMenu');
};

BasicGame.Game.prototype.loadLevel = function (levelNumber) {
  if (levelNumber > 30) {
    // congrats, you ended the game
    this.state.start('TheEnd');
    return;
  }

  this.level.destroyCurrentLevel();

  var skyName = this.getSkyName();
  if (this.background.key != skyName) {
    this.load.image(skyName,
      'assets/images/' + skyName + '-min.png');
  }

  this.game.load.onLoadComplete.addOnce(function () {
    if (this.background.key != skyName) {
      this.background.loadTexture(skyName);
    }

    this.level.createLevel(levelNumber);

    this.player.updateLevel(this.level);
    this.light.updateWalls(this.level);
    this.eye.updateLevel(this.level);
    this.lightning.updateLevel(this.level);

    this.game.world.bringToTop(this.light.lightBitmap);
    this.game.world.bringToTop(this.level.pieces);
    this.game.world.bringToTop(this.lifesGroup);
    this.game.world.bringToTop(this.darknessGroup);

    if (this.level.isReady === true) {
      BasicGame.isRetrying = false;
      this.levelReady();
    }
  }, this);

  var levelData = this.helper.getLevelIdAndName(levelNumber);
  this.game.load.tilemap(levelData.id,
    'assets/levels/' + levelData.name + '.json',
    null,
    Phaser.Tilemap.TILED_JSON);

  this.game.load.start();

  // localStorage.setItem("oh-my-blob", BasicGame.setDay(levelNumber));
};

BasicGame.Game.prototype.shakeCamera = function () {
  // shake the camera by moving it up and down 5 times really fast
  this.game.camera.y = 10;
  this.game.camera.x = 10;

  // create the tween for shaking the camera
  this.shakeTween = this.game.add.tween(this.game.camera);
  this.shakeTween.to({ y: -5, x: -5 },
    40,
    Phaser.Easing.Sinusoidal.InOut,
    false,
    0,
    4,
    true);

  this.shakeTween.onComplete.add(function () {
    // set the camera position to its initial position
    this.game.camera.setPosition(0, 0);
    this.shakeTween.stop();
  }, this);

  this.shakeTween.start();
};

BasicGame.Game.prototype.subtractLife = function () {
  var that = this;

  // if the player collected all the pieces, don't kill him
  if (this.level.endTimer) return;

  // remove one life sprite
  if (this.lifes <= 0) {
    return;
  }

  var lifeTween = this.game.add.tween(this.lifesGroup.getChildAt(--this.lifes));
  lifeTween.to({ alpha: 0 },
    300,
    Phaser.Easing.Quadratic.Out,
    true);

  // create the tween for shaking the camera
  this.flashTween = this.game.add.tween(this.flashGroup.getChildAt(0));
  this.flashTween.to({ alpha: 1 },
    40,
    Phaser.Easing.Sinusoidal.InOut,
    false,
    0,
    4,
    true);

  this.flashTween.onComplete.add(function () {
    this.flashTween.stop();
  }, this);

  this.flashTween.start();

  if (this.lifes <= 0) {
    // save the current level
    // localStorage.setItem("oh-my-blob", BasicGame.addDeath());

    // notify the PLAYER that its time to show the animation for dead
    this.player.explote();

    // notify to the EYE the player has died
    this.eye.rejoice(function () {
      that.showDarkness(200);
    });
  }
};

BasicGame.Game.prototype.subtractAllLifes = function (destroyPlayer) {
  // if the player collected all the pieces, don't kill him
  if (this.level.endTimer) {
    return;
  }

  // localStorage.setItem("oh-my-blob", BasicGame.addDeath());

  this.lifes = 0;

  var lifeTween = this.game.add.tween(this.lifesGroup);
  lifeTween.to({ alpha: 0 },
    180,
    Phaser.Easing.Quadratic.Out,
    true);

  this.eye.endLevel(false);

  if (destroyPlayer) {
    // play the animation of death of the player
    this.player.explote();

    // create the timer to give the player die animation time to be played
    this.helper.timer(1000,
      function () {
        this.showDarkness(200);
      },
      this);
  } else {
    this.showDarkness(200);
  }
};

BasicGame.Game.prototype.showDarkness = function (durationInMS) {
  this.game.world.bringToTop(this.darknessGroup);
  this.darknessTween.updateTweenData("duration", durationInMS || this.countdownDuration * 1000);
  this.darknessTween.start();
};

BasicGame.Game.prototype.darknessTweenCompleted = function () {
  this.inDarkness = true;

  this.eye.gameInDarkness();
  this.player.gameInDarkness();

  this.showLifes();
  if (this.lifes <= 0) {
    this.restartLevel(true);
  }
};

BasicGame.Game.prototype.hideDarkness = function (durationInMS) {
  this.inDarkness = false;
  this.brightnessTween.updateTweenData("duration", durationInMS || this.countdownDuration * 1000);
  this.brightnessTween.start();
};

BasicGame.Game.prototype.brightnessTweenCompleted = function () {
  // this.eye.eyeStateTimer = this.eye.searchingTime;
  this.isLoadingLevel = false;

  this.lifes = this.LIFES_AMOUNT;

  // make the EYE seek for the player
  this.eye.levelStart();

  if (this.music.isPlaying === false) {
    // this.music.play();
  }

  this.player.player.body.enable = true;
};

BasicGame.Game.prototype.restartLevel = function (runHideDarkness) {
  // restore the alpha for life indicators and lifes group
  this.lifes = this.LIFES_AMOUNT;
  this.showLifes();

  this.player.restartLevel();
  this.level.restartLevel();
  this.eye.restartLevel();

  if (runHideDarkness === true) {
    this.hideDarkness(200);
  }
};

BasicGame.Game.prototype.createLifeIndicators = function () {
  for (var i = 0; i < this.lifes; i++) {
    var lifeSprite = new Phaser.Sprite(this.game, 0, 0, "life");
    // lifeSprite.scale.set(0.5, 0.8);
    lifeSprite.x = (i % 3) * (lifeSprite.width + 6);

    this.lifesGroup.addChild(lifeSprite);
  }
};

BasicGame.Game.prototype.showLifes = function () {
  this.lifesGroup.alpha = 1;
  this.lifesGroup.forEach(function (lifeSprite) {
    lifeSprite.alpha = 1;
  });
};

BasicGame.Game.prototype.getSkyName = function () {
  return this.helper.getSkyName(BasicGame.currentLevel);
};