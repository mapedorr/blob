/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/5897/ColorCombo5897.html
 */

var BasicGame = BasicGame || {};

BasicGame.MainMenu = function (game) {
  this.music = null;
  this.playButton = null;
};

BasicGame.MainMenu.prototype.create = function(){
  //We've already preloaded our assets, so let's kick right into the Main Menu itself.
  //Here all we're doing is playing some music and adding a picture and button
  //Naturally I expect you to do something significantly better :)

  // this.music = this.add.audio('mainMenuMusic');
  // this.music.play();

  this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'mainMenuBackground');

  this.playButton = this.add.button(this.world.width/2 - 200, this.world.height/2, 'playButton', this.showIntro, this, 1,0,2);
  this.playButton.scale.setTo(1,1);
};

BasicGame.MainMenu.prototype.update = function(){
  //TODO};
};

BasicGame.MainMenu.prototype.showIntro = function(){
  //Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
  // this.music.stop();
  //And start the actual game
  this.state.start('Game');
};