/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/5897/ColorCombo5897.html
 */

var BasicGame = BasicGame || {};

BasicGame.MainMenu = function (game) {
  this.music = null;
  this.playGroup = null;
  this.playButton = null;
  this.jugarButton = null;
  this.showIntroTimer = null;
};

BasicGame.MainMenu.prototype.create = function(){
  this.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height, 'mainMenuBackground');

  // create the group for the play buttons
  this.playGroup = this.game.add.group();

  this.playButton = this.add.sprite(this.world.width/2, this.world.height/2,
    'playButton', 0, this.playGroup);
  this.playButton.anchor.set(0.5, 0);
  this.playButton.scale.setTo(0.8, 0.8);
  this.playButton.x -= this.playButton.width / 2 + 40;
  this.playButton.y += 30;

  this.jugarButton = this.add.sprite(this.world.width/2, this.world.height/2,
    'jugarButton', 0, this.playGroup);
  this.jugarButton.anchor.set(0.5, 0);
  this.jugarButton.scale.setTo(0.8, 0.8);
  this.jugarButton.x += this.jugarButton.width / 2 + 40;
  this.jugarButton.y += 30;

  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT
  ]);

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
    this.playButton.frame = 1;
  }else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
    this.jugarButton.frame = 1;
    BasicGame.language = "es";
  }

  if(BasicGame.language){
    this.showIntroTimer.start();
  }
};

BasicGame.MainMenu.prototype.showIntro = function(){
  // go to the game
  this.state.start('Game');
};