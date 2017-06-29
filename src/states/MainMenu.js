BasicGame.MainMenu = function (game) {
  this.splash_music = null;
  this.playButton = null;
  this.jugarButton = null;
  this.showIntroTimer = null;
  this.enSound = null;
  this.esSound = null;
  this.listenKeys = false;

  this.fontId = 'font';
  this.creditsTextBitmap = null;
  this.restartTextBitmap = null;
};

BasicGame.MainMenu.prototype.create = function(){
  var _self = this;

  // set stage background
  this.background = this.game.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height,
    BasicGame.Helper.prototype.getSkyName(BasicGame.currentLevel));

  // add the fake zone of view for the splash screen
  this.fakeViewZone = this.game.add.image(this.game.world.width / 2, 0, 'splash_view');
  this.fakeViewZone.anchor.set(0.5, 0);
  this.fakeViewZone.alpha = 0;
  this.fakeViewZone.tint = 0xFFFC19;

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
    function(){
      this.showIntro();
    },
    this);

  // add the splash_music
  if (!this.splash_music) {
    this.splash_music = this.game.add.sound('splash_music', 0.2, true);
    this.splash_music.onFadeComplete.addOnce(function(soundObj) {
      soundObj.stop();
    }, this);
    this.splash_music.play();
  }

  // DARKNESS
  if (BasicGame.currentLevel === 1) {
    this.darknessGroup = this.add.group();
    var darknessBitmap = new Phaser.BitmapData(this.game,
      'darkness_main',
      this.game.width,
      this.game.height);
    darknessBitmap.ctx.rect(0, 0, this.game.width, this.game.height);
    darknessBitmap.ctx.fillStyle = '#000';
    darknessBitmap.ctx.fill();
    var darknessSprite = new Phaser.Sprite(this.game, 0, 0, darknessBitmap);
    this.darknessGroup.addChild(darknessSprite);

    this.darknessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
    this.darknessTween.to({alpha: 0},
      5000,
      Phaser.Easing.Quadratic.Out,
      true,
      4500);
    this.darknessTween.onComplete.add(function(){
      this.showButtons();
    }, this);
  }
  else {
    this.showButtons();
  }
};

BasicGame.MainMenu.prototype.update = function(){
  if (this.listenKeys === false ||
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
  else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
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
  }

};

BasicGame.MainMenu.prototype.moveFakePlayer = function (targetX) {
  this.splash_music.fadeOut(1480);
  this.movingPlayer = true;
  var moveTween = this.game.add.tween(this.fakeplayer)
    .to({x: targetX},
      1500,
      null,
      false);
  moveTween.onComplete.add(function(){
    this.showIntro();
  }, this);
  moveTween.start();
};

BasicGame.MainMenu.prototype.showButtons = function () {
  var showButtonsTween = this.game.add.tween(this.buttons)
    .to({alpha: 1},
      1000,
      null,
      false);
  showButtonsTween.onComplete.add(function(){
    this.fakeEye.frame = 0;
    this.pupil.alpha = 1;
    this.fakeViewZone.alpha = 0.1;
    this.listenKeys = true;
  }, this);
  showButtonsTween.start();
};

BasicGame.MainMenu.prototype.showIntro = function(){
  this.state.start((BasicGame.currentLevel === 1) ? 'Intro' : 'Game');
};
