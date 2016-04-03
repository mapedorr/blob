/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6544/ColorCombo6544.html 
 */

var BasicGame = BasicGame || {};

BasicGame.Intro = function (game) {
  this.background = null;
  this.skipKey = Phaser.Keyboard.SPACEBAR;
  
  this.fontId = 'font';
  this.textColors = {
    'Hub': 0xFFFF50,
    'Bill': 0xFFFFFF
  };
  this.dialogs = {
    "es": [
      {
        character: 'Hub',
        text: 'Tienes que calmarte, todo estará bien.',
        bips: 3
      },
      {
        character: 'Bill',
        text: '¿Cómo puedes decir eso? No puedo hacerlo!',
        bips: 3
      },
      {
        character: 'Hub',
        text: 'Descansa, ya verás cómo en unos días dejará de acecharte.',
        bips: 5
      },
      {
        character: 'Bill',
        text: 'Creo que no seré capaz...',
        bips: 2
      }
    ],
    "en": [
      {
        character: 'Hub',
        text: 'Calm down, all its going to be fine.',
        bips: 3
      },
      {
        character: 'Bill',
        text: "How can you say that? I can't do that!",
        bips: 3
      },
      {
        character: 'Hub',
        text: 'Have a rest, it will stop haunting you in a few days.',
        bips: 4
      },
      {
        character: 'Bill',
        text: "I think I won't be able to handle this...",
        bips: 3
      }
    ]
  };
  this.textBitmapsGroup = null;
  this.dialogTextBitmap = null;
  this.dialogNumber = 0;
  this.dialogTween = null;

  this.skipGroup = null;
  this.skipBitmap = null;
  this.skipText = {
    "es": "Saltar (Barra espaciadora)",
    "en": "Skip (Spacebar)"
  };
  this.sPressedFlag = false;

  this.goingToGame = false;

  this.BSound = null;
  this.HSound = null;
  this.soundLoopTimer = null;
};

BasicGame.Intro.prototype.create = function(){
  // set the backgound
  // this.game.stage.backgroundColor = 0x3D4C53;
  this.background = this.game.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height, "sky03");

  // create the group and text for the dialog and the Skip
  this.textBitmapsGroup = this.game.add.group();

  this.dialogTextBitmap = this.add.bitmapText(this.game.world.width / 2,
    this.game.world.height / 2,
    this.fontId,
    '???',
    36,
    this.textBitmapsGroup);
  this.dialogTextBitmap.align = "left";
  this.dialogTextBitmap.anchor.set(.5, .5);
  this.dialogTextBitmap.alpha = 0;

  // create the group and the text for Skip
  this.skipGroup = this.game.add.group();
  this.skipBitmap = this.add.bitmapText(this.game.world.width - 20,
    this.game.world.height - 20,
    this.fontId,
    this.skipText[BasicGame.language],
    32,
    this.textBitmapsGroup);
  this.skipBitmap.align = "left";
  this.skipBitmap.tint = 0xF2C249;
  this.skipBitmap.anchor.set(1, 1);

  // add the keyboard listener for Skip
  this.game.input.keyboard.addKeyCapture([
    this.skipKey
  ]);

  // create the tween to use in the dialog
  this.dialogTween = this.game.add.tween(this.dialogTextBitmap);
  this.dialogTween.to({alpha: 1},
    300,
    Phaser.Easing.Quadratic.Out,
    false);

  // load the sounds of B and H
  this.BSound = this.game.add.sound('b', 0.2);
  this.HSound = this.game.add.sound('h', 0.2);

  // show the first dialog
  this.updateDialog();
};

BasicGame.Intro.prototype.update = function(){
  if(this.goingToGame === true){
    return;
  }

  if(this.input.keyboard.isDown(this.skipKey)
      && this.sPressedFlag == false){
    this.sPressedFlag = true;
    this.dialogTween.onComplete.dispatch(this.dialogTween.target, this.dialogTween);
    // this.dialogTextBitmap.alpha = 1;
    this.updateDialog();
  }else if(!this.input.keyboard.isDown(this.skipKey) && this.sPressedFlag == true){
    this.sPressedFlag = false;
  }
};

BasicGame.Intro.prototype.updateDialog = function(){
  if(this.dialogNumber <= this.dialogs[BasicGame.language].length - 1){
    var dialogObj = this.dialogs[BasicGame.language][this.dialogNumber];
    // there are still dialogs to be shown
    var currentDialogLine = dialogObj.text;
    var character = dialogObj.character;

    this.dialogTextBitmap.tint = this.textColors[character];
    this.dialogTextBitmap.setText(character + ': ' + currentDialogLine);

    this.dialogTextBitmap.alpha = 0;
    this.dialogTween.start();

    // play the bips of the dialog
    if (dialogObj.bips > 0) {
      this.soundLoopTimer = this.game.time.create(true);
      this.soundLoopTimer.repeat(100, dialogObj.bips, function(){
        this[dialogObj.character.charAt(0) + "Sound"].play();
      }, this);
      this.soundLoopTimer.start();
    }

    this.dialogNumber++;
  }else{
    // tween the dialog bitmap to alpha = 0, then, start the game.
    this.goingToGame = true;
    this.game.add.tween(this.textBitmapsGroup).to({alpha: 0},
      500,
      Phaser.Easing.Quadratic.Out,
      true)
      .onComplete.add(function(){
        this.state.start('Game');
      },this);
  }
};