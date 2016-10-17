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
  //These are the assets we loaded in Boot.js
  //A nice sparkly background and a loading progress bar
  this.background = this.add.sprite(0, 0, 'preloaderBackground');
  this.banner = this.add.image(this.game.world.width / 2, this.game.world.height - 40, 'loading_banner');
  this.banner.anchor.set(0.5, 0);
  this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');

  var blink = this.game.add.tween(this.banner)
    .to({alpha: 0},
      700,
      null,
      true,
      0,
      -1,
      true);

  //This sets the preloadBar sprite as a loader sprite.
  //What that does is automatically crop the sprite from 0 to full-width
  //as the files below are loaded in.
  this.load.setPreloadSprite(this.preloadBar, 1);

  //Here we load the rest of the assets our game needs.
  //As this is just a Project Template I've not provided these assets, swap them for your own.

  //  ---| The assets for the Main menu
  // this.load.image('mainMenuBackground', 'assets/images/splash_screen.png');
  this.load.image('splash_view', 'assets/images/splash_view.png');
  this.load.image('title', 'assets/images/title.png');
  // this.load.image('title01', 'assets/images/title_01.png');
  // this.load.image('title02', 'assets/images/title_02.png');
  this.load.spritesheet('playButton','assets/sprites/play_button.png', 400, 256);
  this.load.spritesheet('jugarButton','assets/sprites/jugar_button.png', 400, 256);
  this.load.spritesheet('continueButton','assets/sprites/continue_button.png', 400, 256);
  this.load.spritesheet('continuarButton','assets/sprites/continuar_button.png', 400, 256);
  //  this.load.audio('mainMenuMusic',['assets/music/main_menu.ogg'],true);

  //  ---| The assets for the Game
  this.load.image('light', 'assets/images/light.png');
  this.load.image('view_zone', 'assets/images/view_zone.png');
  this.load.image('sky01', 'assets/images/sky01.png');
  this.load.image('sky02', 'assets/images/sky02.png');
  this.load.image('sky03', 'assets/images/sky03.png');
  this.load.image('piece', 'assets/images/piece.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.image('spike-platform', 'assets/images/spike-platform.png');
  this.load.image('spike', 'assets/images/spike.png');
  this.load.image('spike-r', 'assets/images/spike-r.png');
  this.load.image('spike-l', 'assets/images/spike-l.png');
  this.load.image('spike-d', 'assets/images/spike-d.png');
  this.load.image('end_scene', 'assets/images/end_scene.png');
  this.load.image('sun_light', 'assets/images/sun_light.png');
  this.load.image('credits', 'assets/images/credits.png');
  this.load.image('pupil', 'assets/images/pupil.png');

  this.load.spritesheet('player','assets/sprites/player.png', 32, 32);
  this.load.spritesheet('eye','assets/sprites/eye.png', 192, 96);

  this.load.atlas('clouds', 'assets/sprites/clouds.png', 'assets/sprites/clouds.xml', null, Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);

  this.load.audio('en-lang', 'assets/soundfx/en.wav', true);
  this.load.audio('es-lang', 'assets/soundfx/es.wav', true);
  this.load.audio('jump', 'assets/soundfx/jump.wav', true);
  this.load.audio('walk', 'assets/soundfx/walk.wav', true);
  this.load.audio('slide', 'assets/soundfx/slide.wav', true);
  this.load.audio('fall', 'assets/soundfx/fall.wav', true);
  this.load.audio('death', 'assets/soundfx/death.wav', true);
  this.load.audio('day', 'assets/soundfx/day.wav', true);
  this.load.audio('b', 'assets/soundfx/b.wav', true);
  this.load.audio('h', 'assets/soundfx/h.wav', true);
  this.load.audio('ray', 'assets/soundfx/ray.wav', true);
  this.load.audio('eye', 'assets/soundfx/eye.wav', true);
  this.load.audio('eye-anger', 'assets/soundfx/anger.wav', true);
  this.load.audio('spike', 'assets/soundfx/spike.wav', true);
  this.load.audio('splash_music', 'assets/music/splash_music.ogg', true);
  this.load.audio('level_music', 'assets/music/levels_music.ogg', true);
  this.load.audio('the_end', 'assets/music/the_end.ogg', true);
  this.load.audio('credits', 'assets/music/credits.ogg', true);

  // load the sounds for the pieces
  for (i = 1; i <= 20; i++) {
    if (i < 10) {
      this.load.audio('piece0' + i,
        'assets/soundfx/piece0' + i + '.wav',
        true);
    }
    else {
      this.load.audio('piece' + i,
        'assets/soundfx/piece' + i + '.wav',
        true);
    }
  }

  // this.load.bitmapFont('font','assets/fonts/PressStart2P_0.png','assets/fonts/PressStart2P.xml');
  this.load.bitmapFont('font','assets/fonts/teko-light_0.png','assets/fonts/teko-light.fnt', null, 5);

  // load the tilemap for the splash screen
  this.game.load.tilemap('splash_lvl', 'assets/tilemaps/maps/splash.json',
        null, Phaser.Tilemap.TILED_JSON);

  // load the tilemaps of each level
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
