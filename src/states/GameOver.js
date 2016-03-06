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

  this.bSpeech = {
    "a": {
      "es": "B: Pensé que lo había superado.",
      "en": "B: I thought I had overcome this."
    },
    "b": {
      "es": "B: Creo que nunca lograré superarlo.",
      "en": "B: I think I'll never be able to get over this."
    },
    "c": {
      "es": "B: No puedo más con esto.",
      "en": "B: I can't handle this."
    }
  };

  this.hSpeech = {
    "es": "H: Espera...¿Qué vas a hacer?",
    "en": "H: Wait...¿What are you going to do?"
  };

  this.tryAgainText = {
    "es": "Reintentar (Barra espaciadora)",
    "en": "Try again (Spacebar)"
  };
  this.tryAgainKey = Phaser.Keyboard.SPACEBAR;
};

BasicGame.GameOver.prototype.create = function(){
  // set stage background
  // this.game.stage.backgroundColor = 0x000;
  this.background = this.game.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height, this.getSkyName());

  // create the group and text for the "Game Over" text
  this.gameOverGroup = this.game.add.group();
  this.dialogTextBitmap = this.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2 - 50,
    this.fontId,
    this.getPhrase(),
    18,
    this.gameOverGroup);
  this.dialogTextBitmap.anchor.set(.5, .5);
  this.dialogTextBitmap.tint = 0xFFFFFF;

  // create the group and text for the phrase
  this.phraseGroup = this.game.add.group();
  this.phraseBitmap = this.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2,
    this.fontId,
    this.hSpeech[BasicGame.language],
    14,
    this.phraseGroup);
  this.phraseBitmap.anchor.set(.5, .5);
  this.phraseBitmap.tint = 0x000000;

  // create the group and text for Try again
  this.tryAgainGroup = this.game.add.group();
  this.tryAgainBitmap = this.game.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2 + 200,
    this.fontId,
    this.tryAgainText[BasicGame.language],
    12,
    this.tryAgainGroup);
  this.tryAgainBitmap.anchor.set(.5, .5);
  this.tryAgainBitmap.tint = 0xF2C249;

  // add the keyboard listener for Try again
  this.game.input.keyboard.addKeyCapture([
    this.tryAgainKey
  ]);
};

BasicGame.GameOver.prototype.update = function(){
  if(this.input.keyboard.isDown(this.tryAgainKey)
      && this.sPressedFlag == false){
    BasicGame.isRetrying = true;
    this.state.start('Game');
  }else if(!this.input.keyboard.isDown(this.tryAgainKey) && this.sPressedFlag == true){
    this.sPressedFlag = false;
  }
};

BasicGame.GameOver.prototype.getPhrase = function(){
  if(BasicGame.currentLevel <= 10){
    return this.bSpeech.a[BasicGame.language];
  } else if (BasicGame.currentLevel <= 20) {
    return this.bSpeech.b[BasicGame.language];
  } else {
    return this.bSpeech.c[BasicGame.language];
  }
};

BasicGame.GameOver.prototype.getSkyName = function(){
  if(BasicGame.currentLevel <= 10){
    return 'sky01';
  } else if (BasicGame.currentLevel <= 20) {
    return 'sky02';
  } else {
    return 'sky03';
  }
};