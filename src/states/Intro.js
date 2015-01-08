/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6544/ColorCombo6544.html 
 */

var BasicGame = BasicGame || {};

BasicGame.Intro = function (game) {
  this.background = null;
  this.playButton = null;
  this.dialogTextBitmap = null;
  this.dialogs = [
    {text:"B: Cre...creo que aqui no puede verme"},
    {text:"(Silencio)***********************************************"},
    {text:"O: No podras esconderte para siempre. Este lugar cambia"},
    {text:"   a diario************.************.************.************"},
    {text:"   Ademas, se que hay cosas que no querras que vea,"},
    {text:"   cosas que tendras que guardar. Y, si no vas por"},
    {text:"   ellas antes de que yo las encuentre, sera peor"},
    {text:"   tu castigo.****************"},
    {text:"B: Mierda. Lo sabe. No puedo dejar que se apodere"},
    {text:"   de esas cosas...e...eso tambien me condenaria."},
    {text:"(Silencio)***************************"},
    {text:"B: ¿Como es?**************.**************.**************.********"},
    {text:"   Si, ya esta:"},
    {text:"     - Flecha arriba para saltar."},
    {text:"     - Flechas izquierda y derecha para moverme."},
    {text:"     - No podra verme en las sombras."},
    {text:"(Silencio)***************************"},
    {text:"B: Basta con que aguante unos cuantos dias."},
    {text:"   Luego desaparecera."},
    {text:"*********.******************.******************."}
  ];
  this.dialogNumber = 0;
  this.dialogTextPos = 0;
  this.fullDialog = '';
  this.toGameTimer = null;
  this.disappearingDialog = false;
};

BasicGame.Intro.prototype.create = function(){
  this.game.stage.backgroundColor = 0x3D4C53;

  this.dialogTextBitmap = this.add.bitmapText(this.world.centerX,10,'font','',15);
  this.dialogTextBitmap.x = 20;
  this.dialogTextBitmap.y = 20;
  this.dialogTextBitmap.align = "left";
  this.dialogTextBitmap.tint = 0xF2C249;
  this.time.events.loop(50, this.updateDialog, this);
};

BasicGame.Intro.prototype.update = function(){
  if(this.toGameTimer && !this.disappearingDialog){
    this.toGameTimer -= this.game.time.elapsed;
    if (this.toGameTimer <= 0) {
      //Put this flag on true to omit some code
      this.disappearingDialog = true;
      //Tween the dialog bitmap to alpha = 0, then, start the game.
      this.game.add.tween(this.dialogTextBitmap).to({alpha:0}, 1000, null, true)
        .onComplete.add(function(){
          this.state.start('Game');
        },this);
    }
  }
};

BasicGame.Intro.prototype.updateDialog = function(){
  if(this.dialogNumber <= this.dialogs.length -1){
    var currentDialogLine = this.dialogs[this.dialogNumber].text;
    var character = currentDialogLine.charAt(this.dialogTextPos);

    if(character !== '*'){
      this.fullDialog += character;
    }

    this.dialogTextBitmap.setText(this.fullDialog);

    this.dialogTextPos++;

    if(this.dialogTextPos > currentDialogLine.length){
      this.dialogNumber++;
      this.dialogTextPos = 0;
      this.fullDialog += "\n\n";
    }
  }else if(!this.toGameTimer && !this.disappearingDialog){
    //All the dialogs showed...lets play...
    this.toGameTimer = 500;//3 seconds
  }
};