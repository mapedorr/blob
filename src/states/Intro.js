/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6544/ColorCombo6544.html 
 */

var BasicGame = BasicGame || {};

BasicGame.Intro = function (game) {
  this.background = null;
  this.fontSize = 15;
  this.fontId = 'font';
  
  this.dialogs = [
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
  ];

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
  if(this.dialogNumber <= this.dialogs.length -1){
    var currentDialogLine = this.dialogs[this.dialogNumber].text;
    var character = currentDialogLine.charAt(this.dialogTextPos);

    switch(character){
      case '*':
        break;
      case '+':
        this.otherColorFullDialog = '';
        this.otherColorDialogBitmap = this.game.add.bitmapText(20,this.dialogTextBitmap.textHeight + 35,this.fontId,'',this.fontSize);
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