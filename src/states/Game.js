var BasicGame = require('BasicGame');

BasicGame.Game = function (game) {
  // constants
  this.LIFES_AMOUNT = 3; // 3
  this.FADE_DURATION = 700; // 200
  this.QUICK_FADE_DURATION = 200; // 200
  this.KEY_PAUSE = Phaser.Keyboard.P;
  this.KEY_MUTE = Phaser.Keyboard.M;
  this.KEY_CHAT = Phaser.Keyboard.C;
  this.DARKNESS_ALPHA = 1; // 1
  this.GO_TO_NEXT_LEVEL_DELAY = 1500; // 1500
  this.PAUSE_WIDTH = 660; // Illustrator
  this.PAUSE_HEIGHT = 470; // Illustrator

  // destroyable objects (sprites, sounds, groups, tweens...)
  this.background = null;
  this.lifesGroup = null;
  this.flashGroup = null;
  this.darknessGroup = null;
  this.music = null;
  this.putDarkTween = null;
  this.removeDarkTween = null;
  this.noiseImage = null;
  this.savingText = null;
  this.uiGroup = null;
  this.pauseGroup = null;

  // references to other classes
  this.days = null;
  this.player = null;
  this.level = null;
  this.light = null;
  this.eye = null;
  this.lightning = null;
  this.helper = null;

  // global properties
  this.showFPS = null;
  this.map = null;
  this.inDarkness = null;
  this.updateShadows = null;
  this.isLoadingLevel = null;
  this.lifes = null;
  this.pausedOn = 0;
  this.mutedOn = 0;
  this.checkMKey = true;
  this.checkCKey = true;
  this.changingLevel = false;
  this.fontId = 'font';
  this.savingMsg = {
    "es": "Guardando progreso...",
    "en": "Saving progress..."
  };
  this.levelCompleted = null;
};

BasicGame.Game.developmentMode = false;
BasicGame.isRetrying = false;
BasicGame.ignoreSave = true;

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ PHASER STATE METHODS                                                     ║
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
  // init the EYE
  this.eye = new BasicGame.Eye(this.game, this);
  // init the lightning
  this.lightning = new BasicGame.Lightning(this.game, this);
  // init the helper
  this.helper = new BasicGame.Helper(this.game, this);
};

BasicGame.Game.prototype.create = function () {
  var darknessBitmap = null;
  var darknessSprite = null;
  var flashBitmap = null;
  var flashSprite = null;

  // ═════════════════════════════════════════════
  // define game properties and setup game objects
  this.lifes = this.LIFES_AMOUNT;
  this.showFPS = false;
  this.inDarkness = true;
  this.levelCompleted = false;
  this.updateShadows = true;

  // set stage background
  this.background = this.game.add.image(0, 0, this.getSkyName());
  this.background.width = this.game.world.width;
  this.background.height = this.game.world.height;

  this.noiseImage = this.game.add.image(0, 0, 'noise');
  this.noiseImage.alpha = .5;

  this.savingText = this.game.add.bitmapText(this.game.world.width / 2,
    this.game.world.height / 2,
    this.fontId,
    this.savingMsg[BasicGame.language],
    18);
  this.savingText.anchor.set(0.5, 0.5);
  this.savingText.align = "center";
  this.savingText.tint = 0xfafafa;
  this.savingText.alpha = 0;

  // configure the camera for shaking
  this.game.camera.setSize(this.game.world.width / 2, this.game.world.height / 2);
  this.game.camera.setPosition(0, 0);

  // add the music
  if (!this.music) {
    this.music = this.game.add.sound('level_music', 0.1, true);
  }

  this.game.input.keyboard.addKeyCapture([
    this.KEY_PAUSE,
    this.KEY_MUTE,
    this.KEY_CHAT
  ]);

  // ═══════════════════
  // create the UI group
  this.createUIGroup();

  // ═══════════════════
  // create the Pause group
  this.createPauseGroup();

  // ═══════════════════
  // create the darkness
  this.darknessGroup = this.add.group();
  darknessBitmap = new Phaser.BitmapData(this.game,
    'darkness',
    this.game.width,
    this.game.height);
  darknessBitmap.ctx.rect(0, 0, this.game.width, this.game.height);
  darknessBitmap.ctx.fillStyle = '#212121';
  darknessBitmap.ctx.fill();
  darknessSprite = new Phaser.Sprite(this.game, 0, 0, darknessBitmap);
  this.darknessGroup.addChild(darknessSprite);

  // create the darkness tween
  this.putDarkTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
  this.putDarkTween.to({ alpha: this.DARKNESS_ALPHA }, this.FADE_DURATION, Phaser.Easing.Quadratic.Out, false);
  this.putDarkTween.onComplete.add(this.putDarkTweenCompleted, this);

  // create the brightness tween
  this.removeDarkTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
  this.removeDarkTween.to({ alpha: 0 }, 700, null, false);
  this.removeDarkTween.onComplete.add(this.removeDarkTweenCompleted, this);

  // create flash sprite
  this.flashGroup = this.add.group();
  flashBitmap = new Phaser.BitmapData(this.game,
    'flash',
    this.game.width,
    this.game.height);
  flashBitmap.ctx.rect(0, 0, this.game.width, this.game.height);
  flashBitmap.ctx.fillStyle = '#fff';
  flashBitmap.ctx.fill();
  flashSprite = new Phaser.Sprite(this.game, 0, 0, flashBitmap);
  flashSprite.alpha = 0;
  this.flashGroup.addChild(flashSprite);

  // ════════════════
  // create the level
  this.level.create();

  // create the player
  this.player.create(this.level);

  // create the group of sprites for lifes
  this.lifesGroup = this.game.add.group();
  this.createLifeIndicators();
  this.lifesGroup.x = 16;
  this.lifesGroup.y = 16;

  // create THE EYE
  this.eye.create(this.player, this.level, this.lightning);

  // create the light
  this.light.create(this.level);

  // ═════════════════════════════════════════════════
  // bring to top some things so the game looks better
  this.arrangeRenderLayers();

  BasicGame.changeHTMLBackground(this.helper.getSkyColor(BasicGame.currentLevel));

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

  if (this.inDarkness === true) {
    return;
  }

  if (this.inputIsActive(this.KEY_PAUSE) === true) {
    this.pausedOn = this.game.time.now;
    this.pauseGame();
  }

  if (this.game.time.now - this.mutedOn >= 100) {
    this.checkMKey = true;
  }

  if (this.checkMKey && this.inputIsActive(this.KEY_MUTE) === true) {
    this.mutedOn = this.game.time.now;
    this.checkMKey = false;
    this.muteGame();
  }

  if (this.checkCKey === false && this.player.dialogueGroup.alpha === 0) {
    this.checkCKey = true;
  }

  if (this.checkCKey && this.inputIsActive(this.KEY_CHAT) === true) {
    this.checkCKey = false;
    this.showPlayerDialogue(true);
  }

  // show development information
  if (BasicGame.Game.developmentMode) {
    if (this.game.time.fps !== 0) {
      this.fpsText.setText(this.game.time.fps + ' FPS');
    }
  }
};

BasicGame.Game.prototype.render = function () {
  this.player.render();
  this.level.render();
};

BasicGame.Game.prototype.pauseUpdate = function () {
  if ((this.game.time.now - this.pausedOn >= 100) && this.inputIsActive(this.KEY_PAUSE) === true) {
    this.pauseGame();
    this.pausedOn = 0;
  }
};

/**
 * This method will be called when the State is shutdown (i.e. you switch to another state from this one).
 */
BasicGame.Game.prototype.shutdown = function () {
  // stop music, delete sprites, purge caches, free resources, all that good stuff.
  // destroy sprites
  this.background.destroy();
  this.noiseImage.destroy();
  // destroy groups
  this.lifesGroup.destroy();
  this.flashGroup.destroy();
  this.darknessGroup.destroy();
  // destroy sounds
  this.music.destroy();
  // destroy tweens
  this.putDarkTween.stop();
  this.removeDarkTween.stop();
  // call the methods that will destroy everything in other classes
  this.player.shutdown();
  this.level.shutdown();
  this.light.shutdown();
  this.eye.shutdown();
  this.lightning.shutdown();
};
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

BasicGame.Game.prototype.createUIGroup = function () {
  this.uiGroup = this.game.add.group();

  this.chatImage = this.game.add.button(0, 0, 'chat', function () {
    this.showPlayerDialogue(true);
  }, this, null, null, null, null, this.uiGroup);

  this.muteButton = this.game.add.button(this.chatImage.right + 10, 0, 'mute',
    this.muteGame, this, null, null, null, null, this.uiGroup);

  this.pauseButton = this.game.add.button(this.muteButton.right + 10, 0, 'pause',
    this.pauseGame, this, null, null, null, null, this.uiGroup);

  this.uiGroup.x = this.game.world.width - this.uiGroup.width - 16;
  this.uiGroup.y = 16;
};

BasicGame.Game.prototype.createPauseGroup = function () {
  var pauseBackgroundImage = null;
  var textImage = null;
  var center = { x: this.game.world.width / 2, y: this.game.world.height / 2 };

  this.pauseGroup = this.game.add.group();

  pauseBackgroundImage = this.game.add.image(center.x, center.y, 'credits_background');
  pauseBackgroundImage.width = this.PAUSE_WIDTH;
  pauseBackgroundImage.height = this.PAUSE_HEIGHT;
  pauseBackgroundImage.anchor.set(0.5, 0.5);

  textImage = this.game.add.image(center.x, center.y, 'pause_' + BasicGame.language);
  textImage.anchor.set(0.5, 0.5);

  this.pauseGroup.addChild(pauseBackgroundImage);
  this.pauseGroup.addChild(textImage);

  this.pauseGroup.alpha = 0;
};

BasicGame.Game.prototype.arrangeRenderLayers = function () {
  if (this.level.spikes) {
    this.game.world.bringToTop(this.level.spikes);
  }
  this.game.world.bringToTop(this.level.walls);
  this.game.world.bringToTop(this.noiseImage);
  this.game.world.bringToTop(this.eye.viewZone);
  this.game.world.bringToTop(this.light.lightBitmap);
  this.game.world.bringToTop(this.level.pieces);
  this.game.world.bringToTop(this.lifesGroup);
  this.game.world.bringToTop(this.player.dialogueGroup);
  this.game.world.bringToTop(this.uiGroup);
  this.game.world.bringToTop(this.darknessGroup);
};

BasicGame.Game.prototype.inputIsActive = function (key) {
  return this.game.input.keyboard.isDown(key);
};

BasicGame.Game.prototype.levelEnded = function () {
  this.levelCompleted = true;
  BasicGame.isRetrying = false;
  this.showDarkness();
};

BasicGame.Game.prototype.loadLevel = function (levelNumber) {
  this.saveGame(BasicGame.setDay(levelNumber));

  if (levelNumber > 30) {
    // congrats, you ended the game
    this.state.start('TheEnd');
    return;
  }

  this.level.destroyCurrentLevel();

  var skyName = this.getSkyName();
  if (this.background.key != skyName) {
    this.load.image(skyName, 'assets/sprites/' + skyName + '.png');
  }

  this.game.load.onLoadComplete.addOnce(function () {
    if (this.background.key != skyName) {
      this.background.loadTexture(skyName);
    }
    this.savingText.alpha = 0;
    this.level.createLevel(levelNumber);
  }, this);

  var levelData = this.helper.getLevelIdAndName(levelNumber);
  this.game.load.tilemap(levelData.id,
    'assets/levels/' + levelData.name + '.json',
    null,
    Phaser.Tilemap.TILED_JSON);

  this.game.load.start();
};

BasicGame.Game.prototype.levelReady = function () {
  if (this.isLoadingLevel === true) {
    this.player.updateLevel(this.level);
    this.light.updateWalls(this.level);
    this.eye.updateLevel(this.level);
    this.lightning.updateLevel(this.level);
    this.arrangeRenderLayers();
  }

  this.levelCompleted = false;
  this.hideDarkness();
};

BasicGame.Game.prototype.shakeCamera = function () {
  var shakeTween;

  // shake the camera by moving it up and down 5 times really fast
  this.game.camera.y = 10;
  this.game.camera.x = 10;

  // create the tween for shaking the camera
  shakeTween = this.game.add.tween(this.game.camera);
  shakeTween.to({ y: -5, x: -5 },
    40,
    Phaser.Easing.Sinusoidal.InOut,
    false,
    0,
    4,
    true);

  shakeTween.onComplete.add(function () {
    // set the camera position to its initial position
    this.game.camera.setPosition(0, 0);
  }, this);

  shakeTween.start();
};

BasicGame.Game.prototype.subtractLife = function () {
  var that = this;

  // if the player collected all the pieces, don't kill him
  if (this.levelCompleted === true) {
    return;
  }

  // remove one life sprite
  if (this.lifes <= 0) {
    return;
  }

  var lifeTween = this.game.add.tween(this.lifesGroup.getChildAt(--this.lifes));
  lifeTween.to({ alpha: 0 },
    300,
    Phaser.Easing.Quadratic.Out,
    true);

  // create the tween for flashing the camera
  var flashTween = this.game.add.tween(this.flashGroup.getChildAt(0));
  flashTween.to({ alpha: 1 },
    40,
    Phaser.Easing.Sinusoidal.InOut,
    false,
    0,
    4,
    true);
  flashTween.start();

  if (this.lifes <= 0) {
    // save the current level
    this.saveGame(BasicGame.addDeath());

    // notify the PLAYER that its time to show the animation for dead
    this.player.explote();

    // notify to the EYE the player has died
    this.eye.rejoice((function () {
      this.showDarkness(200);
    }).bind(this));
  }
};

BasicGame.Game.prototype.subtractAllLifes = function (destroyPlayer) {
  var lifeTween = null;

  // if the player collected all the pieces, don't kill him
  if (this.levelCompleted === true) {
    return;
  }

  this.saveGame(BasicGame.addDeath());
  this.lifes = 0;

  lifeTween = this.game.add.tween(this.lifesGroup);
  lifeTween.to({ alpha: 0 },
    180,
    Phaser.Easing.Quadratic.Out,
    true);

  this.eye.levelEndedEvent(false);

  if (destroyPlayer) {
    // play the animation of death of the player
    this.player.explote();

    // create the timer to give the player die animation time to be played
    this.helper.timer(1000,
      function () {
        this.showDarkness(this.QUICK_FADE_DURATION);
      },
      this);
  } else {
    this.showDarkness(this.QUICK_FADE_DURATION);
  }
};

BasicGame.Game.prototype.showDarkness = function (durationInMS) {
  this.game.world.bringToTop(this.darknessGroup);
  this.putDarkTween.updateTweenData("duration", durationInMS || this.FADE_DURATION);
  this.putDarkTween.start();

  this.chatImage.input.enabled = false;
  this.muteButton.input.enabled = false;
  this.pauseButton.input.enabled = false;
};

BasicGame.Game.prototype.putDarkTweenCompleted = function () {
  this.inDarkness = true;
  this.updateShadows = false;

  this.eye.gameInDarkness();
  this.player.gameInDarkness();

  this.showLifes();

  if (this.levelCompleted === true) {
    // show the Progress saved message
    this.savingText.alpha = 1;
    this.game.world.bringToTop(this.savingText);

    this.helper.timer(this.GO_TO_NEXT_LEVEL_DELAY, function () {
      // set the flag for loading level
      this.isLoadingLevel = true;

      // notify to the eye that the level was ended
      this.eye.levelEndedEvent(true);
      this.loadLevel(++BasicGame.currentLevel);
    }, this);
  }
  else if (this.lifes <= 0) {
    this.restartLevel(true);
  }
};

BasicGame.Game.prototype.restartLevel = function (runHideDarkness) {
  // restore the alpha for life indicators and lifes' group
  BasicGame.isRetrying = true;

  this.lifes = this.LIFES_AMOUNT;
  this.showLifes();

  this.player.restartLevel(runHideDarkness);
  this.level.restartLevel(runHideDarkness);
  this.eye.restartLevel(runHideDarkness);

  if (runHideDarkness === true) {
    this.hideDarkness(this.QUICK_FADE_DURATION);
  }
};

BasicGame.Game.prototype.hideDarkness = function (durationInMS) {
  this.updateShadows = true;

  this.removeDarkTween.updateTweenData("duration", durationInMS || this.FADE_DURATION);
  this.removeDarkTween.start();

  this.chatImage.input.enabled = true;
  this.muteButton.input.enabled = true;
  this.pauseButton.input.enabled = true;
};

BasicGame.Game.prototype.removeDarkTweenCompleted = function () {
  this.isLoadingLevel = false;

  if (BasicGame.isRetrying === false) {
    // make the player say a line
    this.showPlayerDialogue();
  }

  this.lifes = this.LIFES_AMOUNT;

  // make the EYE seek for the player

  if (this.music.isPlaying === false) {
    this.music.play();
  }

  this.player.enableBody();
  this.eye.levelStart(BasicGame.isRetrying);

  this.inDarkness = false;
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

BasicGame.Game.prototype.saveGame = function (data) {
  if (BasicGame.Game.developmentMode === true || BasicGame.ignoreSave === true) {
    return;
  }

  localStorage.setItem("oh-my-blob", data);
};

BasicGame.Game.prototype.showPlayerDialogue = function (immediateHide) {
  this.player.showDialogue(immediateHide);
};

BasicGame.Game.prototype.muteGame = function () {
  this.game.sound.mute = !this.game.sound.mute;
  this.muteButton.frame = (this.game.sound.mute === true) ? 1 : 0;
};

BasicGame.Game.prototype.pauseGame = function () {
  this.game.paused = !this.game.paused;
  this.pauseButton.frame = 0;
  this.darknessGroup.getChildAt(0).alpha = 0;
  this.pauseGroup.alpha = 0;

  if (this.game.paused === true) {
    this.pauseButton.frame = 1;
    this.pauseGroup.alpha = 1;
    this.game.world.bringToTop(this.pauseGroup);
  }
};


// ╔═══════════════════════════════════════════════════════════════════════════╗
BasicGame.Game.prototype.quitGame = function () {
  this.shutdown();
};
// ╚═══════════════════════════════════════════════════════════════════════════╝