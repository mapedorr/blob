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
  this.load.spritesheet('playButton','assets/sprites/play_button.png', 400, 256);
  this.load.spritesheet('jugarButton','assets/sprites/jugar_button.png', 400, 256);
  //  this.load.audio('mainMenuMusic',['assets/music/main_menu.ogg'],true);

  //  ---| The assets for the Game
  this.load.image('light', 'assets/images/light.png');
  this.load.image('view_zone', 'assets/images/view_zone.png');
  this.load.image('sky01', 'assets/images/sky01.png');
  this.load.image('sky02', 'assets/images/sky02.png');
  this.load.image('sky03', 'assets/images/sky03.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.image('piece', 'assets/images/piece.png');
  this.load.spritesheet('player','assets/sprites/player.png', 32, 32);
  this.load.spritesheet('eye','assets/sprites/eye.png', 192, 96);

  this.load.bitmapFont('font','assets/fonts/PressStart2P_0.png','assets/fonts/PressStart2P.xml');

  // load the map for the first level
  for(var i = 1; i <= 20; i++){
    if(i < 10) this.game.load.tilemap('lvl0' + i, 'assets/tilemaps/maps/level0' + i + '.json', null, Phaser.Tilemap.TILED_JSON)
    else this.game.load.tilemap('lvl' + i, 'assets/tilemaps/maps/level' + i + '.json', null, Phaser.Tilemap.TILED_JSON)
  }
};

BasicGame.Preloader.prototype.create = function(){
  //Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
  this.preloadBar.cropEnabled = false;
};

BasicGame.Preloader.prototype.update = function(){
  //this.cache.isSoundDecoded('mainMenuMusic')
  if (this.ready == false) {
    this.ready = true;
    this.state.start('Game');
  }
};
