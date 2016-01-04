/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/5897/ColorCombo5897.html
 */

var BasicGame = BasicGame || {};

BasicGame.MainMenu = function (game) {
  this.music = null;
  this.playButton = null;

  this.playGroup = null;
  this.playBitmap = null;
  this.jugarBitmap = null;

  this.fontId = 'font';
  this.showIntroTimer = null;
};

BasicGame.MainMenu.prototype.create = function(){
  //We've already preloaded our assets, so let's kick right into the Main Menu itself.
  //Here all we're doing is playing some music and adding a picture and button
  //Naturally I expect you to do something significantly better :)

  // this.music = this.add.audio('mainMenuMusic');
  // this.music.play();

  this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'mainMenuBackground');

  // this.playButton = this.add.button(this.world.width/2 - 200, this.world.height/2, 'playButton', this.showIntro, this, 1,0,2);
  // this.playButton.scale.setTo(1,1);

  // create the group for the play texts
  this.playGroup = this.game.add.group();
  
  // create the text for "play"
  this.playBitmap = this.add.bitmapText(this.game.world.width / 3,
    this.game.world.height / 2 + 100,
    this.fontId,
    "Play\n\n(Left)",
    32,
    this.playGroup);
  this.playBitmap.align = "center";
  this.playBitmap.anchor.set(.5, .5);
  this.playBitmap.tint = 0xF2F0E6;

  // create the text for "jugar"
  this.jugarBitmap = this.add.bitmapText(this.game.world.width / 3 * 2,
    this.game.world.height / 2 + 100,
    this.fontId,
    "Jugar\n\n(Right)",
    32,
    this.playGroup);
  this.jugarBitmap.align = "center";
  this.jugarBitmap.anchor.set(.5, .5);
  this.jugarBitmap.tint = 0xF2F0E6;

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
    this.playBitmap.tint = 0xF2C249;
    BasicGame.language = "en";
  }else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
    this.jugarBitmap.tint = 0xF2C249;
    BasicGame.language = "es";
  }

  if(BasicGame.language){
    this.showIntroTimer.start();
  }
};

BasicGame.MainMenu.prototype.showIntro = function(){
  //Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
  // this.music.stop();
  //And start the actual game
  this.state.start('Intro');
};