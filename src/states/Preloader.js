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
  this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');

  // set the preloadBar sprite as a loader sprite.
  // automatically crop the sprite from 0 to full-width as the
  // files below are loaded in.
  this.load.setPreloadSprite(this.preloadBar, 1);

  //  --------------------------------------
  //  ---| load the assets for the Main menu
  this.load.image('main_menu_background', 'assets/sprites/main_menu_background.png');
  this.load.image('button_background', 'assets/sprites/button_background.png');
  this.load.image('giant_pupil', 'assets/sprites/giant_pupil.png');
  this.load.image('close', 'assets/sprites/close.png');
  this.load.image('credits_background', 'assets/sprites/credits_background.png');
  this.load.image('credits_en', 'assets/sprites/credits_en.png');
  this.load.image('credits_es', 'assets/sprites/credits_es.png');

  this.load.audio('splash_music', 'assets/music/splash_music.ogg', true);

  //  ---------------------------------
  //  ---| load the assets for the Game
  this.load.image('pupil', 'assets/sprites/pupil_normal.png');
  this.load.image('light', 'assets/sprites/light.png');
  this.load.image('view_zone', 'assets/sprites/view_zone.png');
  this.load.image('piece', 'assets/sprites/piece.png');
  this.load.image('platform', 'assets/sprites/platform.png');
  this.load.image('life', 'assets/sprites/life.png');
  this.load.image('dialogue_background', 'assets/sprites/dialogue_background.png');
  this.load.image('dialogue_mark', 'assets/sprites/dialogue_mark.png');
  this.load.image('noise', 'assets/sprites/noise.png');
  this.load.image('chat', 'assets/sprites/chat.png');
  this.load.image('pause_es', 'assets/sprites/pause_es.png');
  this.load.image('pause_en', 'assets/sprites/pause_en.png');

  // this.load.spritesheet('noise', 'assets/sprites/noise.png', 1024, 640);
  this.load.spritesheet('player', 'assets/sprites/player.png', 32, 32, 1);
  this.load.spritesheet('eye', 'assets/sprites/eye.png', 222, 118, 4);
  this.load.spritesheet('checkbox', 'assets/sprites/checkbox.png', 24, 24, 2);
  this.load.spritesheet('mute', 'assets/sprites/mute.png', 24, 24, 2);
  this.load.spritesheet('pause', 'assets/sprites/pause.png', 24, 24, 2);

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

  this.load.bitmapFont('font', 'assets/fonts/FiraCode_0.png',
    'assets/fonts/FiraCode.fnt', null);
  this.load.bitmapFont('font-medium', 'assets/fonts/FiraCodeMedium_0.png',
    'assets/fonts/FiraCodeMedium.fnt', null);

  // it will not be necessary to load this one if the player already passed the
  // first part of the game
  skyName = BasicGame.Helper.prototype.getSkyName(BasicGame.currentLevel);
  this.load.image(skyName, 'assets/sprites/' + skyName + '.png');

  // load this if the current level stored requires it, otherwise load it
  // when the player is near the end of the corresponding chapter
  this.load.spritesheet('spike-platform', 'assets/sprites/spike-platform.png', 32, 32);
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
  // Once the load has finished we disable the crop because we're going to sit in
  // the update loop for a short while as the music decodes
  this.preloadBar.cropEnabled = false;
};

BasicGame.Preloader.prototype.update = function () {
  if (this.ready === false) {
    this.ready = true;
    if (BasicGame.currentLevel <= 30) {
      this.state.start('MainMenu');
    }
    else {
      this.state.start('TheEnd');
    }
  }
};
