/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6544/ColorCombo6544.html 
 */

var BasicGame = BasicGame || {};

BasicGame.Intro = function (game) {
  this.background = null;
  this.fontSize = 15;
  this.fontId = 'font';
  
  this.dialogs = {
    "es": [
      {text:"B: Cre...creo que aqui no puede verme"},
      {text:"(Silencio)***********************************************"},
      {text:"+O: No podras esconderte para siempre!. Este lugar cambia"},
      {text:"   a diario************.************.************.************"},
      {text:"   Se que hay cosas que no querras que vea, cosas que"},
      {text:"   tendras que guardar. Y, si no vas por ellas antes de"},
      {text:"   que yo las encuentre, sera peor tu castigo!.****************-"},
      {text:"B: Mierda! como lo supo?. No puedo dejar que se apodere"},
      {text:"   de mis cosas************.************.************.************"},
      {text:"(Silencio)***************************"},
      {text:"B: Creo que**************.**************.**************.********conozco una manera"},
      {text:"   Si, ya esta:"},
      {text:"     > Flecha arriba para saltar."},
      {text:"     > Flechas izquierda y derecha para moverme."},
      {text:"     > No podra verme en las sombras."},
      {text:"     > Debo coger mis cosas antes que las vea."},
      {text:"(Silencio)***************************"},
      {text:"B: Basta con que aguante unos cuantos dias."},
      {text:"   Luego desaparecera."},
      {text:"*********.******************.******************."}
    ],
    "en": [
      {text:"B: I...I think here she can't see me"},
      {text:"(Silence)***********************************************"},
      {text:"+O: You can't hide forever!. This place changes"},
      {text:"   every day************.************.************.************"},
      {text:"   I know there are things you don't want me"},
      {text:"   to see, things you would try to hide. And, if"},
      {text:"   you do not go for them before me, your"},
      {text:"   punishment will be worse!.****************-"},
      {text:"B: How does she knows?. I can't let her take"},
      {text:"   my things************.************.************.************"},
      {text:"(Silence)***************************"},
      {text:"B: Maybe**************.**************.**************.********there is a way"},
      {text:"   Yes! I know::"},
      {text:"     > Up arrow to jump."},
      {text:"     > Left and right arrows to move."},
      {text:"     > The shadows will be my allies."},
      {text:"     > I have to pick up my things before she."},
      {text:"(Silence)***************************"},
      {text:"B: I just need to hang on for some days."},
      {text:"   Then, she will dissapear."},
      {text:"*********.******************.******************."}
    ]
  };

  this.textBitmapsGroup = null;
  this.dialogTextBitmap = null;
  
  this.dialogNumber = 0;
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

  this.dialogTextBitmap = this.add.bitmapText(20,20,this.fontId,'',this.fontSize);
  this.dialogTextBitmap.align = "left";
  this.dialogTextBitmap.tint = 0xF2C249;

  this.textBitmapsGroup = this.game.add.group();
  this.textBitmapsGroup.add(this.dialogTextBitmap);

  this.time.events.loop(50, this.updateDialog, this);
};


BasicGame.Intro.prototype.updateDialog = function(){
  if(this.dialogNumber <= this.dialogs[BasicGame.language].length -1){
    var currentDialogLine = this.dialogs[BasicGame.language][this.dialogNumber].text;
    var character = currentDialogLine.charAt(this.dialogTextPos);

    switch(character){
      case '*':
        break;
      case '+':
        this.otherColorFullDialog = '';
        this.otherColorDialogBitmap = this.game.add.bitmapText(20,
          this.dialogTextBitmap.textHeight + 35,
          this.fontId,
          '',
          this.fontSize);
        this.otherColorDialogBitmap.tint = 0xE64A45;
        this.textBitmapsGroup.add(this.otherColorDialogBitmap);
        break;
      case '-':
        this.otherColorFullDialog = '';
        this.otherColorDialogBitmap = null;
        break;
      default:
        this.fullDialog += character;
        if(this.otherColorDialogBitmap){
          this.otherColorFullDialog += character;
        }
    }

    this.dialogTextBitmap.setText(this.fullDialog);

    if(this.otherColorDialogBitmap){
      this.otherColorDialogBitmap.setText(this.otherColorFullDialog);
    }

    this.dialogTextPos++;

    if(this.dialogTextPos > currentDialogLine.length){
      this.dialogNumber++;
      this.dialogTextPos = 0;
      this.fullDialog += "\n\n";

      if(this.otherColorDialogBitmap){
        this.otherColorFullDialog += "\n\n";
      }
    }
  }else if(!this.toGameTimer && !this.disappearingDialog){
    //All the dialogs showed...lets play...
    this.toGameTimer = 500;//3 seconds
  }
};

BasicGame.Intro.prototype.update = function(){
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