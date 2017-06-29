/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6544/ColorCombo6544.html 
 */

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
      "es": "Bill: Pensé que lo había superado.",
      "en": "Bill: I thought I had overcome this."
    },
    "b": {
      "es": "Bill: Creo que nunca lograré superarlo.",
      "en": "Bill: I think I'll never be able to get over this."
    },
    "c": {
      "es": "Bill: No puedo más con esto.",
      "en": "Bill: I can't handle this."
    }
  };

  this.hSpeech = {
    "es": "Hub: Espera...¿Qué vas a hacer?",
    "en": "Hub: Wait...¿What are you going to do?"
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
  this.background.alpha = 0.3;

  // create the group and text for the "Game Over" text
  this.gameOverGroup = this.game.add.group();
  this.dialogTextBitmap = this.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2 - 20,
    this.fontId,
    this.getPhrase(),
    48,
    this.gameOverGroup);
  this.dialogTextBitmap.anchor.set(.5, .5);
  this.dialogTextBitmap.tint = 0xFFFFFF;

  // create the group and text for the phrase
  this.phraseGroup = this.game.add.group();
  this.phraseBitmap = this.add.bitmapText(this.game.world.width/2,
    this.dialogTextBitmap.bottom + 20,
    this.fontId,
    this.hSpeech[BasicGame.language],
    48,
    this.phraseGroup);
  this.phraseBitmap.anchor.set(.5, .5);
  this.phraseBitmap.tint = 0xFFFF50;

  // create the group and text for Try again
  this.tryAgainGroup = this.game.add.group();
  this.tryAgainBitmap = this.game.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2 + 280,
    this.fontId,
    this.tryAgainText[BasicGame.language],
    36,
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