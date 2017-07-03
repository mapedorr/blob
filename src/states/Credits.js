var BasicGame = require('BasicGame');

BasicGame.Credits = function (game) {
  this.mainMenuKey1 = Phaser.Keyboard.Z;
  this.mainMenuKey2 = Phaser.Keyboard.SPACEBAR;
  this.goingToMainMenu = false;
  this.fontId = 'font';
  this.creditsImage = null;
  this.creditsMusic = null;
  this.showCreditsTimer = null;
};

BasicGame.Credits.prototype.preload = function(){
  this.load.image('credits', 'assets/images/credits-min.png');
};

BasicGame.Credits.prototype.create = function(){
  var _self = this;

  // set the default values for some properties of the state
  this.goingToGame = false;

  // set the backgound color
  this.game.stage.backgroundColor = 0x000000;

  // load the image that has the credits
  this.creditsImage = this.game.add.image(0,
    this.game.world.height - 200,
    'credits');

  // add the game title
  this.gameTitle = this.game.add.image(this.game.world.width / 2,
    this.game.world.height / 2, 'title');
  this.gameTitle.anchor.set(0.5, 0.5);
  this.gameTitle.alpha = 0;

  var tapa = new Phaser.BitmapData(this.game,
    'credits_tapa',
    this.game.width,
    this.game.height);
  tapa.ctx.rect(0, 0, this.game.width, 50);
  tapa.ctx.fillStyle = '#000';
  tapa.ctx.fill();
  this.game.add.sprite(0, this.game.height - 50, tapa);

  this.mainmenuBitmapText = this.add.bitmapText(this.game.world.width - 20,
    this.game.world.height - 20,
    this.fontId,
    "(Z) Main menu / (Z) Menú principal",
    32,
    this.textBitmapsGroup);
  this.mainmenuBitmapText.align = "left";
  this.mainmenuBitmapText.tint = 0xF2C249;
  this.mainmenuBitmapText.anchor.set(1, 1);

  // add the credits music
  if (!this.creditsMusic) {
    this.creditsMusic = this.game.add.sound('splash_music', 0.8, false);
    this.creditsMusic.play();
  }
  else {
    this.creditsMusic.play();
  }

  this.scrollTween = this.game.add.tween(this.creditsImage);
  this.scrollTween.to({y: -this.creditsImage.height},
    75 * 1000,
    null,
    false);

  this.scrollTween.onComplete.add(function(){
    // show the game name in the middle of the screen
    // this.creditsMusic.fadeOut(7000);
    this.alphaTween = this.game.add.tween(this.gameTitle);
    this.alphaTween.to({alpha: 1},
      8000,
      null,
      true);
  }, this);

  this.scrollTween.start();
};

BasicGame.Credits.prototype.update = function(){
  if (this.goingToGame === true) {
    return;
  }

  if (this.input.keyboard.isDown(this.mainMenuKey1) ||
      this.input.keyboard.isDown(this.mainMenuKey1)
  ) {
    this.goingToGame = true;
    this.creditsMusic.stop();
    this.scrollTween.stop();
    this.state.start('MainMenu');
  }
};