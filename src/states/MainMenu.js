/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/5897/ColorCombo5897.html
 */

var BasicGame = BasicGame || {};

BasicGame.MainMenu = function (game) {
  this.music = null;
  this.playButton = null;
  this.jugarButton = null;
  this.showIntroTimer = null;
  this.enSound = null;
  this.esSound = null;
};

BasicGame.MainMenu.prototype.create = function(){
  // set stage background
  this.background = this.game.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height, 'sky01');

  // draw floors and platforms
  var _self = this;
  this.map = this.game.add.tilemap('lvl31');
  this.ground = this.game.add.group();
  this.map.createFromObjects("floor", "", 'platform', 0, true, false,
    this.ground, Phaser.Sprite, false);
  this.walls = this.game.add.group();
  this.map.createFromObjects("platforms", "", 'platform', 0, true, false,
    this.walls, Phaser.Sprite, false);

  // create the play buttons
  this.playButton = this.add.sprite(50, this.world.height - 110,
    (BasicGame.currentLevel === 1) ? 'playButton' : 'continueButton', 0);
  this.playButton.anchor.set(0, 0);
  this.playButton.scale.setTo(0.5, 0.5);

  this.jugarButton = this.add.sprite(this.world.width - 50, this.world.height - 110,
    (BasicGame.currentLevel === 1) ? 'jugarButton' : 'continuarButton', 0);
  this.jugarButton.anchor.set(1, 0);
  this.jugarButton.scale.setTo(0.5, 0.5);

  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT
  ]);

  // add light and generate shadows
  this.light = new BasicGame.Light(this.game, this);
  this.light.create(this);
  this.light.drawShadows();

  // add EYE image
  this.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height, 'mainMenuBackground');

  // load sounds
  if (!this.enSound) {
    this.enSound = this.game.add.sound('en-lang', 0.4);
  }

  if (!this.esSound) {
    this.esSound = this.game.add.sound('es-lang', 0.4);
  }

  // create the go-to-next-state timer
  this.showIntroTimer = this.game.time.create(true);
  this.showIntroTimer.add(200,
    function(){
      this.showIntro();
    },
    this);
};

BasicGame.MainMenu.prototype.update = function(){
  if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
    this.world.bringToTop(this.playButton);
    this.enSound.play();
    this.playButton.frame = 1;
    this.showIntroTimer.start();
  } else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
    this.world.bringToTop(this.jugarButton);
    this.esSound.play();
    this.jugarButton.frame = 1;
    BasicGame.language = "es";
    this.showIntroTimer.start();
  }
};

BasicGame.MainMenu.prototype.showIntro = function(){
  this.state.start((BasicGame.currentLevel === 1) ? 'Intro' : 'Game');
};
