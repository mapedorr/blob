var BasicGame = require('BasicGame');

BasicGame.MainMenu = function (game) {
  // constants
  this.BUTTON_WIDTH = 150;
  this.BUTTON_HEIGHT = 38;
  this.BUTTON_VSPACING = 15;
  this.BUTTON_HSPACING = 12;

  // destroyable objects (sprites, sounds, groups, tweens...)
  this.backgroundImage = null;
  this.titleText = null;
  this.giantPupilImage = null;
  this.optionsGroup = null;
  this.languageGroup = null;

  // global properties
  this.fontId = 'font';
  this.fontMediumId = 'font-medium';
  /* this.creditsTextBitmap = null;
  this.restartTextBitmap = null;
  this.splash_music = null;
  this.playButton = null;
  this.jugarButton = null;
  this.showIntroTimer = null;
  this.enSound = null;
  this.esSound = null;
  this.listenKeys = false; */

};

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ PHASER STATE METHODS                                                     ║
BasicGame.MainMenu.prototype.create = function () {
  var _self = this;

  // set the background
  this.backgroundImage = this.game.add.image(0, 0, 'main_menu_background');
  this.backgroundImage.width = this.game.world.width;
  this.backgroundImage.height = this.game.world.height;

  // add the title
  this.titleText = this.game.add.bitmapText(this.game.world.width / 2,
    41,
    this.fontMediumId,
    'In the Shadows',
    72);
  this.titleText.anchor.set(0.5, 0);
  this.titleText.align = "center";
  this.titleText.tint = 0x303c42;

  // add the pupil
  this.giantPupilImage = this.game.add.image(this.game.world.width / 2,
    this.game.world.height / 2,
    'giant_pupil');
  this.giantPupilImage.anchor.set(.5, .5);

  // create the group for menu buttons
  this.optionsGroup = this.game.add.group();

  if (BasicGame.currentLevel > 1) {
    this.addGameOption("Continue", null, 0, 1, this.optionsGroup);
  }

  this.addGameOption("New game", null, 0, 1, this.optionsGroup);
  this.addGameOption("Credits", null, 0, 1, this.optionsGroup);
  this.optionsGroup.right = this.game.world.width - 58;
  this.optionsGroup.centerY = this.game.world.height / 2;

  // create the group for language buttons
  this.languageGroup = this.game.add.group();
  this.addGameOption("Español", null, 1, 0, this.languageGroup);
  this.addGameOption("English", null, 1, 0, this.languageGroup);
  this.languageGroup.right = this.game.world.width - 58;
  this.languageGroup.bottom = this.game.world.height - 32;


  /* this.background = this.game.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height,
    BasicGame.Helper.prototype.getSkyName(BasicGame.currentLevel));

  // add the fake zone of view for the splash screen
  this.fakeViewZone = this.game.add.image(this.game.world.width / 2, 0, 'view_zone');
  this.fakeViewZone.anchor.set(0.5, 0);
  this.fakeViewZone.alpha = 0;
  // this.fakeViewZone.tint = 0xFFFC19;

  // add the fake EYE
  this.fakeEye = this.game.add.sprite(this.game.world.width / 2, 64, 'eye', 10);
  this.fakeEye.anchor.set(0.5, 0.5);
  this.pupil = this.game.add.image(this.fakeEye.x, this.fakeEye.y, 'pupil');
  this.pupil.anchor.set(0.5, 0.5);
  this.pupil.alpha = 0;

  // draw floors and platforms
  this.map = this.game.add.tilemap('splash_lvl');
  this.ground = this.game.add.group();
  this.map.createFromObjects("floor", "", 'platform', 0, true, false,
    this.ground, Phaser.Sprite, false);
  this.walls = this.game.add.group();
  this.map.createFromObjects("platforms", "", 'platform', 0, true, false,
    this.walls, Phaser.Sprite, false);

  // add the fake player
  this.fakeplayer = this.game.add.sprite(this.map.objects.player_pos[0].x,
    this.map.objects.player_pos[0].y,
    'player');
  this.movingPlayer = false;

  // add light and generate shadows
  this.light = new BasicGame.Light(this.game, this);
  this.light.create(this);
  this.light.drawShadows();

  // create the play buttons
  this.buttons = this.game.add.group();
  this.playButton = this.add.sprite(-20, this.world.height - 150,
    (BasicGame.currentLevel === 1) ? 'playButton' : 'continueButton', 0);
  this.playButton.anchor.set(0, 0);
  this.playButton.scale.setTo(0.5, 0.5);
  this.playButton.alpha = 0.8;

  this.jugarButton = this.add.sprite(this.world.width + 20, this.world.height - 150,
    (BasicGame.currentLevel === 1) ? 'jugarButton' : 'continuarButton', 0);
  this.jugarButton.anchor.set(1, 0);
  this.jugarButton.scale.setTo(0.5, 0.5);
  this.jugarButton.alpha = 0.8;

  // create the credits button
  this.creditsTextBitmap = this.add.bitmapText(this.game.world.width / 2,
    this.game.world.height - 32,
    this.fontId,
    '(C) Credits/Créditos',
    36);
  this.creditsTextBitmap.align = "center";
  this.creditsTextBitmap.anchor.set(0.5, 0);

  if (BasicGame.currentLevel > 1) {
    this.restartTextBitmap = this.add.bitmapText((this.game.world.width / 2) + 10,
      this.game.world.height - 32,
      this.fontId,
      '(R) Restart/Reiniciar',
      36);
    this.restartTextBitmap.align = "center";

    this.creditsTextBitmap.anchor.set(1, 0);
    this.creditsTextBitmap.x -= 10;
  }

  this.buttons.addChild(this.playButton);
  this.buttons.addChild(this.jugarButton);
  this.buttons.addChild(this.creditsTextBitmap);
  if (BasicGame.currentLevel > 1) {
    this.buttons.addChild(this.restartTextBitmap);
  }
  this.buttons.alpha = 0;

  // add the game title
  this.gameTitle = this.game.add.image(this.game.world.width / 2 - 5,
    this.game.world.height / 2 + 150, 'title');
  this.gameTitle.anchor.set(0.5, 0.5);

  // add key listeners
  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT
  ]);

  // load sounds
  if (!this.enSound) {
    this.enSound = this.game.add.sound('en-lang', 0.2);
  }

  if (!this.esSound) {
    this.esSound = this.game.add.sound('es-lang', 0.2);
  }

  // create the go-to-next-state timer
  this.showIntroTimer = this.game.time.create(true);
  this.showIntroTimer.add(200,
    function () {
      this.showIntro();
    },
    this);

  // add the splash_music
  if (!this.splash_music) {
    this.splash_music = this.game.add.sound('splash_music', 0.2, true);
    this.splash_music.onFadeComplete.addOnce(function (soundObj) {
      soundObj.stop();
    }, this);
    this.splash_music.play();
  } */

  // DARKNESS
  if (BasicGame.currentLevel === 1) {
    /* this.darknessGroup = this.add.group();
    var darknessBitmap = new Phaser.BitmapData(this.game,
      'darkness_main',
      this.game.width,
      this.game.height);
    darknessBitmap.ctx.rect(0, 0, this.game.width, this.game.height);
    darknessBitmap.ctx.fillStyle = '#212121';
    darknessBitmap.ctx.fill();
    var darknessSprite = new Phaser.Sprite(this.game, 0, 0, darknessBitmap);
    this.darknessGroup.addChild(darknessSprite);

    this.darknessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
    this.darknessTween.to({ alpha: 0 },
      5000,
      Phaser.Easing.Quadratic.Out,
      true,
      4500);
    this.darknessTween.onComplete.add(function () {
      this.showButtons();
    }, this);
    this.darknessTween.start(); */
  }
  else {
    // this.showButtons();
  }
};

BasicGame.MainMenu.prototype.update = function () {
  /* if (this.listenKeys === false ||
    this.movingPlayer === true) {
    return;
  }

  if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    // this.world.bringToTop(this.playButton);
    this.enSound.play();
    this.playButton.frame = 1;
    this.playButton.alpha = 1;
    this.moveFakePlayer(-32);
  }
  else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    // this.world.bringToTop(this.jugarButton);
    this.esSound.play();
    this.jugarButton.frame = 1;
    this.jugarButton.alpha = 1;
    BasicGame.language = "es";
    this.moveFakePlayer(this.game.world.width + 32);
  }
  else if (this.input.keyboard.isDown(Phaser.Keyboard.C)) {
    // load the credits scene
    this.listenKeys = false;
    this.splash_music.stop();
    this.state.start('Credits');
  }
  else if (this.input.keyboard.isDown(Phaser.Keyboard.R)) {

    // clean the localStorage, then set the currrent level to 1, show intro
    this.listenKeys = false;
    localStorage.removeItem("oh-my-blob");
    BasicGame.reset();
    this.splash_music.stop();
    this.showIntro();
  } */
};

/**
 * This method will be called when the State is shutdown (i.e. you switch to another state from this one).
 */
BasicGame.MainMenu.prototype.shutdown = function () {

  // destroy sprites and images
  this.backgroundImage.destroy();
  this.titleText.destroy();
  this.giantPupilImage.destroy();
  // destroy groups
  this.optionsGroup.destroy();
  this.languageGroup.destroy();

  /* // destroy sprites and images
  this.background.destroy();
  this.fakeViewZone.destroy();
  this.fakeEye.destroy();
  this.pupil.destroy();
  this.map.destroy();
  this.fakeplayer.destroy();
  this.light.destroy();
  this.gameTitle.destroy();
  this.showIntroTimer.destroy();
  // destroy groups
  this.buttons.destroy();
  this.ground.destroy();
  this.walls.destroy();
  this.darknessGroup.destroy();
  // destroy audio
  this.enSound.destroy();
  this.esSound.destroy();
  this.splash_music.destroy();
  // destroy tweens
  this.darknessTween.stop(); */
};

// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

BasicGame.MainMenu.prototype.moveFakePlayer = function (targetX) {
  this.splash_music.fadeOut(1480);
  this.movingPlayer = true;
  var moveTween = this.game.add.tween(this.fakeplayer)
    .to({ x: targetX },
      1500,
      null,
      false);
  moveTween.onComplete.add(function () {
    this.showIntro();
  }, this);
  moveTween.start();
};

BasicGame.MainMenu.prototype.showButtons = function () {
  var showButtonsTween = this.game.add.tween(this.buttons)
    .to({ alpha: 1 },
      1000,
      null,
      false);
  showButtonsTween.onComplete.add(function () {
    this.fakeEye.frame = 0;
    this.pupil.alpha = 1;
    this.fakeViewZone.alpha = 1;
    this.listenKeys = true;
  }, this);
  showButtonsTween.start();
};

BasicGame.MainMenu.prototype.showIntro = function () {
  this.state.start((BasicGame.currentLevel === 1) ? 'Intro' : 'Game');
};

BasicGame.MainMenu.prototype.addGameOption = function (name, action, hSpace, vSpace, group) {
  var button = null;
  var text = null;
  var buttonsInGroup = Math.max(0, group.children.length - group.children.length / 2);

  button = this.game.add.button(
    0 + ((this.BUTTON_WIDTH + this.BUTTON_HSPACING) * buttonsInGroup) * hSpace,
    0 + ((this.BUTTON_HEIGHT + this.BUTTON_VSPACING) * buttonsInGroup) * vSpace,
    'button_background', action, this
  );
  button.anchor.set(1, 0);
  button.width = this.BUTTON_WIDTH;
  button.height = this.BUTTON_HEIGHT;

  text = this.game.add.bitmapText(button.right - 13,
    button.centerY,
    this.fontId, name, 18);
  text.anchor.set(1, 0.5);
  text.align = "right";
  text.tint = 0xfafafa;

  button.width = text.textWidth + 13 * 2;
  button.defaultWidth = text.textWidth + 13 * 2;

  button.onInputOver.add(function (sprite, pointer, text) {
    var overTween = this.game.add.tween(sprite);
    overTween.to({ width: this.BUTTON_WIDTH }, 150, Phaser.Easing.Exponential.Out);
    overTween.start();
    text.tint = 0xf15a4a;
  }, this, 0, text);
  button.onInputOut.add(function (sprite, pointer, text) {
    var overTween = this.game.add.tween(sprite);
    overTween.to({ width: sprite.defaultWidth }, 250, Phaser.Easing.Exponential.Out);
    overTween.start();
    text.tint = 0xfafafa;
  }, this, 0, text);

  group.add(button);
  group.add(text);
};