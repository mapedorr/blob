var BasicGame = BasicGame || {};

BasicGame.Level = function (game) {
  this.game = game;
  this.levelMusic = null;
  this.walls = null;
  this.ground = null;
  this.map = null;
};

BasicGame.Level.prototype.create = function () {
  this.createLevel(1);
};

BasicGame.Level.prototype.destroyCurrentLevel = function(){

};

BasicGame.Level.prototype.createLevel = function(num){
  var _me = this;
  this.map = this.game.add.tilemap('lvl' + ((num < 10) ? '0' + num : num));

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
