var BasicGame = BasicGame || {};

BasicGame.Level001 = function (game) {
  this.game = game;
  this.levelMusic = null;
  this.walls = null;
  this.ground = null;
  this.map = null;
};

BasicGame.Level001.prototype.create = function () {
  var _me = this;
  // this.levelMusic = this.game.add.audio('level001Music');
  // this.levelMusic.play();
  // 
  this.map = this.game.add.tilemap('lvl01');

  this.walls = this.game.add.group();
  this.map.objects.platforms.forEach(function(object){
    _me.map.createFromObjects("platforms", object.name, 'platform', null, true, false, _me.walls, Phaser.Sprite, false);
  });
  this.walls.enableBody = true;
  this.game.physics.arcade.enable(this.walls);

  this.walls.forEach(function(platformSprite){
    platformSprite.body.immovable = true;
    platformSprite.body.allowGravity = false;
  });
};

