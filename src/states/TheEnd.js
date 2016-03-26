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
        text: 'Han pasado 388 días desde que acabé con la vida de M.',
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
        text: 'Los primeros días fueron muy difíciles. Me costaba mucho evitar El Remordimiento.',
        bips: 4,
        waitTime: 5
      },
      {
        character: 'B',
        text: 'Pero lo he logrado.',
        bips: 1,
        waitTime: 2
      },
      {
        character: 'B',
        text: 'Ahora que lo pienso, beneficiarse de la muerte de otro no es algo malo.',
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
  this.cloudsLimit = 9;

  this.music = null;
};

BasicGame.TheEnd.prototype.create = function() {
  // set the background for the scene
  // this.game.stage.backgroundColor = 0x000000;
  this.background = this.game.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height, "end_scene");

  // load the sound for B's voice
  this.BSound = this.game.add.sound('b', 0.2);

  // show the first line of The Confession
  var firstDialogTimer = this.game.time.create(true);
  firstDialogTimer.add(2500,
    function(){
      this.updateDialog();
    },
    this);
  firstDialogTimer.start();

  // create the loop that will generate clouds
  this.cloudsContainer = this.game.add.group();

  // fill the scene with 3 clouds
  this.createCloud(true);
  this.createCloud(true);
  this.createCloud(true);

  this.cloudsTimer = this.game.time.create(true);
  this.cloudsTimer.loop(8000, function(){
    this.createCloud();
  }, this);
  this.cloudsTimer.start();

  // create the group that will contain the dialog
  this.textBitmapsGroup = this.game.add.group();
  this.textBitmapsGroup.y = 10;
  this.textBitmapsGroup.x = 0;

  this.music = this.game.add.sound('the_end', 0.1, true);
  this.music.play();
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
  if (!this.yPosDialog) {
    this.yPosDialog = 30;
  }

  var textBitmapsGroupChilds = this.textBitmapsGroup.children;
  if (textBitmapsGroupChilds.length > 0) {
    this.yPosDialog += textBitmapsGroupChilds[textBitmapsGroupChilds.length - 1].y + textBitmapsGroupChilds[textBitmapsGroupChilds.length - 1].height;
    this.yPosDialog += 10;
  }

  var textsGroup = this.game.add.group(this.textBitmapsGroup);
  textsGroup.alpha = 0;

  var dialogTextShadowBitmap = this.add.bitmapText(42,
    this.yPosDialog + 2,
    this.fontId,
    text,
    40,
    textsGroup);
  dialogTextShadowBitmap.align = "left";
  dialogTextShadowBitmap.anchor.set(0, 0);
  dialogTextShadowBitmap.tint = 0x000000;
  dialogTextShadowBitmap.maxWidth = this.game.world.width - 100;
  dialogTextShadowBitmap.alpha = 0.6;

  var dialogTextBitmap = this.add.bitmapText(40,
    this.yPosDialog,
    this.fontId,
    text,
    40,
    textsGroup);
  dialogTextBitmap.align = "left";
  dialogTextBitmap.anchor.set(0, 0);
  dialogTextBitmap.tint = tint || 0xFFFFFF;
  dialogTextBitmap.maxWidth = this.game.world.width - 100;

  return textsGroup;
};

BasicGame.TheEnd.prototype.showText = function(displayObj, timeForRead) {
  this.dialogTween = this.game.add.tween(displayObj);
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

BasicGame.TheEnd.prototype.getRandom = function(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

BasicGame.TheEnd.prototype.createCloud = function(insideScreen) {
  // add the cloud out of the screen
  var cloudX = 0;

  if (insideScreen === true) {
    cloudX = this.getRandom(100, this.game.world.width - 150);
  }
  else {
    cloudX = this.game.world.width + this.getRandom(10, 20);
  }

  var cloudImg = this.game.add.image(cloudX, 0,
    'clouds', 'cloud0' + this.getRandom(1, 9) + '.png', this.cloudsContainer);
  cloudImg.y = this.getRandom(0-cloudImg.height/2, this.game.world.height - cloudImg.height - 210);
  cloudImg.alpha = Math.min(Math.random(), 0.3);

  // create the tween that will move the cloud
  this.cloudTween = this.game.add.tween(cloudImg);
  this.cloudTween.to({x: 0 - cloudImg.width - 20},
    30000,
    null,
    false);
  this.cloudTween.onComplete.addOnce(function() {
    this.target.destroy();
    this.stop();
  }, this.cloudTween);
  this.cloudTween.start();
};