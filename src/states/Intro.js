/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6544/ColorCombo6544.html 
 */

var BasicGame = BasicGame || {};

BasicGame.Intro = function (game) {
  this.background = null;
  this.fontId = 'font';
  
  this.dialogs = {
    "es": [
      {text:"B: Cre...creo que aqui no puede verme"},
      {text:"O: No podras esconderte para siempre!. Este lugar cambia\n\n" +
            "   a diario...\n\n" +
            "   Se que hay cosas que no querras que vea, cosas que\n\n" +
            "   tendras que guardar. Y, si no vas por ellas antes de\n\n" +
            "   que yo las encuentre, sera peor tu castigo!.-"},
      {text:"B: Mierda! como lo supo?. No puedo dejar que se apodere\n\n" +
            "   de mis cosas..."},
      {text:"B: Creo que...conozco una manera\n\n" +
            "   Si, ya esta:\n\n" +
            "     > Flecha arriba para saltar.\n\n" +
            "     > Flechas izquierda y derecha para moverme.\n\n" +
            "     > No podra verme en las sombras.\n\n" +
            "     > Debo coger mis cosas antes que las vea."},
      {text:"B: Basta con que aguante unos cuantos dias.\n\n" +
            "   Luego desaparecera."}
    ],
    "en": [
      {text:"B: I...I think here she can't see me"},
      {text:"O: You can't hide forever!. This place changes\n\n" +
            "   every day...\n\n" +
            "   I know there are things you don't want me\n\n" +
            "   to see, things you would try to hide. And, if\n\n" +
            "   you do not go for them before me, your\n\n" +
            "   punishment will be worse!.-"},
      {text:"B: How does she knows?. I can't let her take\n\n" +
            "   my things..."},
      {text:"B: Maybe...there is a way\n\n" +
            "   Yes! I know::\n\n" +
            "     > Up arrow to jump.\n\n" +
            "     > Left and right arrows to move.\n\n" +
            "     > The shadows will be my allies.\n\n" +
            "     > I have to pick up my things before she."},
      {text:"B: I just need to hang on for some days.\n\n" +
            "   Then, she will dissapear."},
    ]
  };

  this.textBitmapsGroup = null;
  this.dialogTextBitmap = null;

  this.skipGroup = null;
  this.skipBitmap = null;
  this.skipText = {
    "es": "Saltar (S)",
    "en": "Skip (S)"
  };
  this.sPressedFlag = false;
  
  this.dialogNumber = 1;
  this.dialogTextPos = 0;

  this.fullDialog = '';

  //Variables related with the game start behaviour
  this.toGameTimer = null;
  this.disappearingDialog = false;

  this.otherColorDialogBitmap = null;
  this.otherColorFullDialog = '';
};

BasicGame.Intro.prototype.create = function(){
  this.game.stage.backgroundColor = 0x3D4C53;

  // create the group and text for the dialog
  this.textBitmapsGroup = this.game.add.group();
  this.dialogTextBitmap = this.add.bitmapText(this.game.world.width / 2,
    this.game.world.height / 2,
    this.fontId,
    this.dialogs[BasicGame.language][0].text,
    14,
    this.textBitmapsGroup);
  this.dialogTextBitmap.align = "left";
  this.dialogTextBitmap.tint = 0xF2C249;
  this.dialogTextBitmap.anchor.set(.5, .5);

  // create the group and the text for the skip
  this.skipGroup = this.game.add.group();
  this.skipBitmap = this.add.bitmapText(this.game.world.width - 20,
    this.game.world.height - 20,
    this.fontId,
    this.skipText[BasicGame.language],
    16,
    this.textBitmapsGroup);
  this.skipBitmap.align = "left";
  this.skipBitmap.tint = 0xFFFFFF;
  this.skipBitmap.anchor.set(1, 1);

  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.S
  ]);

  // this.time.events.loop(50, this.updateDialog, this);
};

BasicGame.Intro.prototype.update = function(){
  if(this.input.keyboard.isDown(Phaser.Keyboard.S)
      && this.sPressedFlag == false){
    this.sPressedFlag = true;
    this.updateDialog();
  }else if(!this.input.keyboard.isDown(Phaser.Keyboard.S) && this.sPressedFlag == true){
    this.sPressedFlag = false;
  }

  if(this.toGameTimer && !this.disappearingDialog){
    this.toGameTimer -= this.game.time.elapsed;
    if (this.toGameTimer <= 0) {
      //Put this flag on true to omit some code
      this.disappearingDialog = true;
      //Tween the dialog bitmap to alpha = 0, then, start the game.
      this.game.add.tween(this.textBitmapsGroup).to({alpha:0}, 1000, null, true)
        .onComplete.add(function(){
          this.state.start('Game');
        },this);
    }
  }
};

BasicGame.Intro.prototype.updateDialog = function(){
  if(this.dialogNumber <= this.dialogs[BasicGame.language].length -1){
    var currentDialogLine = this.dialogs[BasicGame.language][this.dialogNumber].text;
    var character = currentDialogLine.charAt(0);

    switch(character){
      case '*':
        break;
      case 'O':
        this.dialogTextBitmap.tint = 0xE64A45;
        // this.otherColorFullDialog = '';
        // this.otherColorDialogBitmap = this.game.add.bitmapText(20,
        //   this.dialogTextBitmap.textHeight + 35,
        //   this.fontId,
        //   '',
        //   this.fontSize);
        // this.otherColorDialogBitmap.tint = 0xE64A45;
        // this.textBitmapsGroup.add(this.otherColorDialogBitmap);
        break;
      case '-':
        this.otherColorFullDialog = '';
        this.otherColorDialogBitmap = null;
        break;
      default:
        this.dialogTextBitmap.tint = 0xF2C249;
        // this.fullDialog += character;
        // if(this.otherColorDialogBitmap){
        //   this.otherColorFullDialog += character;
        // }
    }

    this.dialogTextBitmap.setText(currentDialogLine);

    // if(this.otherColorDialogBitmap){
    //   this.otherColorDialogBitmap.setText(this.otherColorFullDialog);
    // }

    // this.dialogTextPos++;

    // if(this.dialogTextPos > currentDialogLine.length){
      this.dialogNumber++;
      // this.dialogTextPos = 0;
      // this.fullDialog += "\n\n";

      // if(this.otherColorDialogBitmap){
      //   this.otherColorFullDialog += "\n\n";
      // }
    // }
  }else if(!this.toGameTimer && !this.disappearingDialog){
    //All the dialogs showed...lets play...
    this.toGameTimer = 500;//3 seconds
  }
};