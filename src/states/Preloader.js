/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/5897/ColorCombo5897.html
 */

var BasicGame = BasicGame || {};

BasicGame.Preloader = function (game) {
  this.background = null;
  this.preloadBar = null;
  this.ready = false;
};

BasicGame.Preloader.prototype.preload = function(){
  //These are the assets we loaded in Boot.js
  //A nice sparkly background and a loading progress bar
  this.background = this.add.sprite(0, 0, 'preloaderBackground');
  this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');

  //This sets the preloadBar sprite as a loader sprite.
  //What that does is automatically crop the sprite from 0 to full-width
  //as the files below are loaded in.
  this.load.setPreloadSprite(this.preloadBar);

  //Here we load the rest of the assets our game needs.
  //As this is just a Project Template I've not provided these assets, swap them for your own.

  //  ---| The assets for the Main menu
  this.load.image('mainMenuBackground', 'assets/images/main_menu_background.png');
  this.load.spritesheet('playButton','assets/sprites/play_button.png',400,128);
  //  this.load.audio('mainMenuMusic',['assets/music/main_menu.ogg'],true);

  //  ---| The assets for the Intro
  

  //  ---| The assets for the Game
  this.load.image('light', 'assets/images/light.png');
  this.load.image('sky', 'assets/images/sky.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.spritesheet('player','assets/sprites/player.png',32,32);
  this.load.spritesheet('eye','assets/sprites/eye.png',192,96);
  //  this.load.audio('level001Music',['assets/music/level001.ogg'],true);
  //this.load.bitmapFont('font','assets/fonts/coco.png','assets/fonts/coco.xml');
  //this.load.bitmapFont('font','assets/fonts/pera.png','assets/fonts/pera.xml');
  this.load.bitmapFont('font','assets/fonts/carrier_command.png','assets/fonts/carrier_command.xml');
};

BasicGame.Preloader.prototype.create = function(){
  //Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
  this.preloadBar.cropEnabled = false;
};

BasicGame.Preloader.prototype.update = function(){
  //You don't actually need to do this, but I find it gives a much smoother game experience.
  //Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
  //You can jump right into the menu if you want and still play the music, but you'll have a few
  //seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
  //it's best to wait for it to decode here first, then carry on.

  //If you don't have any music in your game then put the game.state.start line into the create function and delete
  //the update function completely.

  //this.cache.isSoundDecoded('mainMenuMusic')

  if (this.ready == false) {
    this.ready = true;
    this.state.start('MainMenu');
  }
};