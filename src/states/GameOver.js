/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6544/ColorCombo6544.html 
 */

var BasicGame = BasicGame || {};

BasicGame.GameOver = function(game){
  this.fontId = 'font';

  this.gameOverBitmap = null;
  this.gameOverGroup = null;

  this.phraseBitmap = null;
  this.phraseGroup = null;

  this.tryAgainBitmap = null;
  this.sPressedFlag = false;

  this.phraseText = {
    "es": "B: No puedo mas con esto",
    "en": "B: I can't handle this"
  };

  this.tryAgainText = {
    "es": "Reintentar (Barra espaciadora)",
    "en": "Try again (Spacebar)"
  };
  this.tryAgainKey = Phaser.Keyboard.SPACEBAR;
};

BasicGame.GameOver.prototype.create = function(){
  this.game.stage.backgroundColor = 0x000;

  // create the group and text for the "Game Over" text
  this.gameOverGroup = this.game.add.group();
  this.dialogTextBitmap = this.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2 - 50,
    this.fontId,
    "Game Over",
    48,
    this.gameOverGroup);
  this.dialogTextBitmap.anchor.set(.5, .5);
  this.dialogTextBitmap.tint = 0xE64A45;

  // create the group and text for the phrase
  this.phraseGroup = this.game.add.group();
  this.phraseBitmap = this.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2,
    this.fontId,
    this.phraseText[BasicGame.language],
    14,
    this.phraseGroup);
  this.phraseBitmap.anchor.set(.5, .5);
  this.phraseBitmap.tint = 0x2a84c1;

  // create the group and text for Try again
  this.tryAgainGroup = this.game.add.group();
  this.tryAgainBitmap = this.game.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2 + 200,
    this.fontId,
    this.tryAgainText[BasicGame.language],
    12,
    this.tryAgainGroup);
  this.tryAgainBitmap.anchor.set(.5, .5);
  this.tryAgainBitmap.tint = 0xFFFFFF;

  // add the keyboard listener for Try again
  this.game.input.keyboard.addKeyCapture([
    this.tryAgainKey
  ]);
};

BasicGame.GameOver.prototype.update = function(){
  if(this.input.keyboard.isDown(this.tryAgainKey)
      && this.sPressedFlag == false){
    this.state.start('Game');
  }else if(!this.input.keyboard.isDown(this.tryAgainKey) && this.sPressedFlag == true){
    this.sPressedFlag = false;
  }
};