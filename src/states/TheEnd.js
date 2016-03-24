/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6343/ColorCombo6343.html
 *
 * this is the end
 * my     friend        this is    the end
 */

var BasicGame = BasicGame || {};

BasicGame.TheEnd = function (game) {
  this.background = null;
  this.fontId = 'font';
  this.textColors = {
    'H': 0x000000,
    'B': 0xFFFFFF
  };
  this.dialogs = {
    "es": [
      {
        character: 'B',
        text: 'Han pasado 402 días desde que acabé con la vida de M.',
        bips: 3,
        waitTime: 3
      },
      {
        character: 'B',
        text: 'Estuve a punto de darme por vencido unas # veces; de contarlo todo a la policía.',
        bips: 5,
        waitTime: 5
      },
      {
        character: 'B',
        text: 'Fue muy difícil evitar El Remordimiento durante los primeros días. No lo niego.',
        bips: 4,
        waitTime: 5
      },
      {
        character: 'B',
        text: 'Pero lo he logrado. De vez en cuando El Remordimiento vuelve, pero ahora es muy débil...',
        bips: 6,
        waitTime: 6
      },
      {
        character: 'B',
        text: '...ahora que lo pienso, beneficiarse de la muerte de otro no es algo malo.',
        bips: 4,
        waitTime: 5
      },
      {
        character: 'B',
        text: 'Creo que empiezo a entender la forma de pensar de H.',
        bips: 3,
        waitTime: 3
      }
    ]
  };
  this.textBitmapsGroup = null;
  this.dialogNumber = 0;
  this.BSound = null;
  this.soundLoopTimer = null;
};

BasicGame.TheEnd.prototype.create = function() {
  // set the background for the scene
  this.game.stage.backgroundColor = 0x414141;
  // this.background = this.game.add.tileSprite(0, 0,
  //   this.game.world.width, this.game.world.height, "sky01");

  // load the sound for B's voice
  this.BSound = this.game.add.sound('b', 0.5);

  // create the group that will contain the dialog
  this.textBitmapsGroup = this.game.add.group();
  this.textBitmapsGroup.y = 10;
  this.textBitmapsGroup.x = 0;

  // show the first line of The Confession
  var firstDialogTimer = this.game.time.create(true);
  firstDialogTimer.add(2500,
    function(){
      this.updateDialog();
    },
    this);
  firstDialogTimer.start();
};

BasicGame.TheEnd.prototype.update = function(){};

BasicGame.TheEnd.prototype.updateDialog = function(){
  if(this.dialogNumber <= this.dialogs[BasicGame.language].length - 1){
    var dialogObj = this.dialogs[BasicGame.language][this.dialogNumber];
    // there are still dialogs to be shown
    var currentDialogLine = dialogObj.text;
    var character = dialogObj.character;

    if (currentDialogLine.indexOf("#") !== -1) {
      currentDialogLine = currentDialogLine.replace("#", BasicGame.getDeaths() || 500);
    }

    this.showText(this.createText(currentDialogLine, this.textColors[character]),
      dialogObj.waitTime);

    // play the bips of the dialog
    if (dialogObj.bips > 0) {
      this.soundLoopTimer = this.game.time.create(true);
      this.soundLoopTimer.repeat(100, dialogObj.bips, function(){
        this[dialogObj.character + "Sound"].play();
      }, this);
      this.soundLoopTimer.start();
    }

    this.dialogNumber++;
  }
};

BasicGame.TheEnd.prototype.createText = function(text, tint) {
  var yPos = 40;
  if (this.textBitmapsGroup.children.length > 0) {
    yPos = this.textBitmapsGroup.children[this.textBitmapsGroup.children.length - 1].bottom;
    yPos += 60;
  }

  var dialogTextBitmap = this.add.bitmapText(this.game.world.width / 2,
    yPos,
    this.fontId,
    text,
    14,
    this.textBitmapsGroup);
  dialogTextBitmap.align = "left";
  dialogTextBitmap.anchor.set(.5, 0);
  dialogTextBitmap.alpha = 0;
  dialogTextBitmap.tint = tint || 0xFFFFFF;
  dialogTextBitmap.maxWidth = this.game.world.width - 100;
  dialogTextBitmap.align = 'center';

  return dialogTextBitmap;
};

BasicGame.TheEnd.prototype.showText = function(bitmapText, timeForRead) {
  this.dialogTween = this.game.add.tween(bitmapText);
  this.dialogTween.to({alpha: 1},
    400,
    Phaser.Easing.Quadratic.In,
    false);
  this.dialogTween.onComplete.addOnce(function() {
    this.dialogTween.stop();

    var nextDialogTimer = this.game.time.create(true);
    nextDialogTimer.add(timeForRead * 1000,
      function(){
        this.updateDialog();
      },
      this);
    nextDialogTimer.start();
  }, this);
  this.dialogTween.start();
};