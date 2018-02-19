var BasicGame = require('BasicGame');

BasicGame.Preloader = function (game) {
  this.background = null;
  this.preloadBar = null;
  this.ready = false;
};

BasicGame.Preloader.prototype.preload = function () {
  var i = 0;
  var skyName = null;
  var levelData = null;

  // these are the assets we loaded in Boot.js
  // a nice sparkly background and a loading progress bar
  this.background = this.add.sprite(0, 0, 'preloaderBackground');
  this.banner = this.add.image(this.game.world.width / 2,
    this.game.world.height - 40,
    'loading_banner');
  this.banner.anchor.set(0.5, 0);
  this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');

  // set the preloadBar sprite as a loader sprite.
  // automatically crop the sprite from 0 to full-width as the
  // files below are loaded in.
  this.load.setPreloadSprite(this.preloadBar, 1);

  //  --------------------------------------
  //  ---| load the assets for the Main menu
  // this.load.image('splash_view', 'assets/sprites/splash_view.png');
  this.load.image('title', 'assets/images/title.png');
  this.load.image('pupil', 'assets/sprites/pupil_normal.png');

  this.load.spritesheet('playButton', 'assets/sprites/play_button.png', 400, 256);
  this.load.spritesheet('jugarButton', 'assets/sprites/jugar_button.png', 400, 256);
  this.load.spritesheet('continueButton', 'assets/sprites/continue_button.png', 400, 256);
  this.load.spritesheet('continuarButton', 'assets/sprites/continuar_button.png', 400, 256);

  this.load.audio('splash_music', 'assets/music/splash_music.ogg', true);
  this.load.audio('en-lang', 'assets/soundfx/en.ogg', true);
  this.load.audio('es-lang', 'assets/soundfx/es.ogg', true);

  this.game.load.tilemap('splash_lvl', 'assets/levels/splash.json',
    null, Phaser.Tilemap.TILED_JSON);

  //  --------------------------------------
  //  ---| load the assets for the Game
  this.load.image('light', 'assets/images/light.png');
  this.load.image('view_zone', 'assets/sprites/view_zone.png');
  this.load.image('piece', 'assets/sprites/piece.png');
  this.load.image('platform', 'assets/sprites/platform.png');
  this.load.image('life', 'assets/sprites/life.png');

  this.load.spritesheet('player', 'assets/sprites/player.png', 32, 32);
  this.load.spritesheet('eye', 'assets/sprites/eye.png', 222, 119);
  this.load.image('pupil_mask', 'assets/sprites/pupil_mask.png');

  this.load.audio('b', 'assets/soundfx/b.ogg', true);
  this.load.audio('h', 'assets/soundfx/h.ogg', true);
  this.load.audio('jump', 'assets/soundfx/jump.ogg', true);
  this.load.audio('walk', 'assets/soundfx/walk.ogg', true);
  this.load.audio('slide', 'assets/soundfx/slide.ogg', true);
  this.load.audio('fall', 'assets/soundfx/fall.ogg', true);
  this.load.audio('death', 'assets/soundfx/death.ogg', true);
  this.load.audio('day', 'assets/soundfx/day.ogg', true);
  this.load.audio('ray', 'assets/soundfx/ray.ogg', true);
  this.load.audio('eye', 'assets/soundfx/eye.ogg', true);
  this.load.audio('eye-anger', 'assets/soundfx/anger.ogg', true);
  this.load.audio('level_music', 'assets/music/levels_music.ogg', true);
  this.load.audio('piece', 'assets/soundfx/piece01.ogg', true);

  this.load.bitmapFont('font', 'assets/fonts/teko-light_0.png',
    'assets/fonts/teko-light.fnt', null, 5);

  // it will not be necessary to load this one if the player already passed the
  // first part of the game
  skyName = BasicGame.Helper.prototype.getSkyName(BasicGame.currentLevel);
  this.load.image(skyName, 'assets/backgrounds/' + skyName + '.png');

  // load this if the current level stored requires it, otherwise load it
  // when the player is near the end of the corresponding chapter
  this.load.image('spike-platform', 'assets/sprites/spike-platform.png');
  this.load.image('spike', 'assets/sprites/spike.png');
  this.load.image('spike-r', 'assets/sprites/spike-r.png');
  this.load.image('spike-l', 'assets/sprites/spike-l.png');
  this.load.image('spike-d', 'assets/sprites/spike-d.png');
  this.load.audio('spike', 'assets/soundfx/spike.ogg', true);

  levelData = BasicGame.Helper.prototype.getLevelIdAndName(BasicGame.currentLevel);
  this.game.load.tilemap(levelData.id,
    'assets/levels/' + levelData.name + '.json',
    null,
    Phaser.Tilemap.TILED_JSON);
};

BasicGame.Preloader.prototype.create = function () {
  //Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
  this.preloadBar.cropEnabled = false;
};

BasicGame.Preloader.prototype.update = function () {
  //this.cache.isSoundDecoded('mainMenuMusic')
  if (this.ready === false) {
    this.ready = true;
    this.state.start('Game');
  }
};
