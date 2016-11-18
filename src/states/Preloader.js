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
  var i = 0;
  // these are the assets we loaded in Boot.js
  // a nice sparkly background and a loading progress bar
  this.background = this.add.sprite(0, 0, 'preloaderBackground');
  this.banner = this.add.image(this.game.world.width / 2, this.game.world.height - 40, 'loading_banner');
  this.banner.anchor.set(0.5, 0);
  this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');

  // set the preloadBar sprite as a loader sprite.
  // automatically crop the sprite from 0 to full-width as the files below are loaded in.
  this.load.setPreloadSprite(this.preloadBar, 1);

  //  ---| load the assets for the Main menu
  this.load.image('splash_view', 'assets/images/splash_view.png');
  this.load.image('title', 'assets/images/title.png');
  this.load.spritesheet('playButton','assets/sprites/play_button.png', 400, 256);
  this.load.spritesheet('jugarButton','assets/sprites/jugar_button.png', 400, 256);
  this.load.spritesheet('continueButton','assets/sprites/continue_button.png', 400, 256);
  this.load.spritesheet('continuarButton','assets/sprites/continuar_button.png', 400, 256);
  this.load.image('pupil', 'assets/images/pupil.png');
  this.load.audio('splash_music', 'assets/music/splash_music.ogg', true);
  this.load.audio('en-lang', 'assets/soundfx/en.wav', true);
  this.load.audio('es-lang', 'assets/soundfx/es.wav', true);
  // load the tilemap for the splash screen
  this.game.load.tilemap('splash_lvl', 'assets/tilemaps/maps/splash.json',
        null, Phaser.Tilemap.TILED_JSON);

  //  ---| load the assets for the Game
  this.load.image('light', 'assets/images/light.png');
  this.load.image('view_zone', 'assets/images/view_zone.png');
  this.load.image('piece', 'assets/images/piece.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.spritesheet('player','assets/sprites/player.png', 32, 32);
  this.load.spritesheet('eye','assets/sprites/eye.png', 192, 96);
  this.load.audio('b', 'assets/soundfx/b.wav', true);
  this.load.audio('h', 'assets/soundfx/h.wav', true);
  this.load.audio('jump', 'assets/soundfx/jump.wav', true);
  this.load.audio('walk', 'assets/soundfx/walk.wav', true);
  this.load.audio('slide', 'assets/soundfx/slide.wav', true);
  this.load.audio('fall', 'assets/soundfx/fall.wav', true);
  this.load.audio('death', 'assets/soundfx/death.wav', true);
  this.load.audio('day', 'assets/soundfx/day.wav', true);
  this.load.audio('ray', 'assets/soundfx/ray.wav', true);
  this.load.audio('eye', 'assets/soundfx/eye.wav', true);
  this.load.audio('eye-anger', 'assets/soundfx/anger.wav', true);
  this.load.audio('level_music', 'assets/music/levels_music.ogg', true);
  this.load.bitmapFont('font','assets/fonts/teko-light_0.png','assets/fonts/teko-light.fnt', null, 5);

  // load the sound for pieces
  this.load.audio('piece', 'assets/soundfx/piece01.wav', true);

  // load the sounds for the pieces (MAYBE JUST ONE WILL BE FINE)
  // for (i = 1; i <= 20; i++) {
  //   if (i < 10) {
  //     this.load.audio('piece0' + i,
  //       'assets/soundfx/piece0' + i + '.wav',
  //       true);
  //   }
  //   else {
  //     this.load.audio('piece' + i,
  //       'assets/soundfx/piece' + i + '.wav',
  //       true);
  //   }
  // }

  // it will not be necessary to load this one if the player already passed the
  // first part of the game
  this.load.image('sky01', 'assets/images/sky01-min.png');

  // load this two if the current level stored requires it, otherwise load them
  // when the player is near the end of the corresponding chapter
  // this.load.image('sky02', 'assets/images/sky02-min.png');
  // this.load.image('sky03', 'assets/images/sky03-min.png');

  
  // load this if the current level stored requires it, otherwise load it
  // when the player is near the end of the corresponding chapter
  // this.load.image('spike-platform', 'assets/images/spike-platform.png');
  // this.load.image('spike', 'assets/images/spike.png');
  // this.load.image('spike-r', 'assets/images/spike-r.png');
  // this.load.image('spike-l', 'assets/images/spike-l.png');
  // this.load.image('spike-d', 'assets/images/spike-d.png');
  // this.load.audio('spike', 'assets/soundfx/spike.wav', true);

  // load this two when the player reaches the last level
  // this.load.image('end_scene', 'assets/images/end_scene-min.png');
  // this.load.image('sun_light', 'assets/images/sun_light-min.png');
  // this.load.atlas('clouds', 'assets/sprites/clouds.png', 'assets/sprites/clouds.xml', null, Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);

  // load this one only if the player selects the Credits option
  // this.load.image('credits', 'assets/images/credits-min.png');

  // load this two when the player reaches the last level
  // this.load.audio('the_end', 'assets/music/the_end.ogg', true);

  // load this one if the player selects the Credits option
  // this.load.audio('credits', 'assets/music/credits.ogg', true);


  

  // load the tilemaps of each level (MAYBE LOAD JUST 10 AND THEN LOAD THE OTHERS
  // DYNAMICALLY)
  for (i = 1; i <= 31; i++) {
    if (i < 10) {
      this.game.load.tilemap('lvl0' + i,
        'assets/tilemaps/maps/level0' + i + '.json',
        null, Phaser.Tilemap.TILED_JSON);
    }
    else {
      this.game.load.tilemap('lvl' + i,
        'assets/tilemaps/maps/level' + i + '.json',
        null, Phaser.Tilemap.TILED_JSON);
    }
  }
};

BasicGame.Preloader.prototype.create = function(){
  //Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
  this.preloadBar.cropEnabled = false;
};

BasicGame.Preloader.prototype.update = function(){
  //this.cache.isSoundDecoded('mainMenuMusic')
  if (this.ready === false) {
    this.ready = true;
    this.state.start('MainMenu');
  }
};
