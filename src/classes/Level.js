var BasicGame = BasicGame || {};

BasicGame.Level = function (game) {
  this.game = game;
  this.levelMusic = null;
  this.walls = null;
  this.ground = null;
  this.map = null;
  this.endTimer = null;
  this.isEnded = null;
};

BasicGame.Level.prototype.create = function () {
  this.createLevel(1);
};

BasicGame.Level.prototype.destroyCurrentLevel = function(){
  this.map.destroy();
  if(this.ground){
    this.ground.destroy();
  }
  this.walls.destroy();
};

BasicGame.Level.prototype.createLevel = function(num){
  var _me = this;

  this.map = this.game.add.tilemap('lvl' + ((num < 10) ? '0' + num : num));

  // create the floor of the level
  if(this.map.objects.floor){
    this.ground = this.game.add.group();

    this.map.objects.floor.forEach(function(object, index){
      _me.map.createFromObjects("floor", object.name, 'platform', null, true, false, _me.ground, Phaser.Sprite, false);
    });

    this.ground.enableBody = true;
    this.game.physics.arcade.enable(this.ground);
    this.ground.forEach(function(groundSprite){
      groundSprite.body.immovable = true;
      groundSprite.body.allowGravity = false;
    });
  }

  // create the walls of the level
  this.walls = this.game.add.group();
  this.map.objects.platforms.forEach(function(object, index){
    _me.map.createFromObjects("platforms", object.name, 'platform', null, true, false, _me.walls, Phaser.Sprite, false);
  });

  this.walls.enableBody = true;
  this.game.physics.arcade.enable(this.walls);
  this.walls.forEach(function(platformSprite){
    platformSprite.body.immovable = true;
    platformSprite.body.allowGravity = false;
  });

  // create the pieces of the level
  this.pieces = this.game.add.group();
  this.map.objects.pieces.forEach(function(object, index){
    _me.map.createFromObjects("pieces", object.name, 'piece', null, true, false, _me.pieces, Phaser.Sprite, false);
  });

  this.pieces.enableBody = true;
  this.game.physics.arcade.enable(this.pieces);
  this.pieces.forEach(function(pieceSprite){
    pieceSprite.anchor.set(.5, .5);
    pieceSprite.body.immovable = true;
    pieceSprite.body.allowGravity = false;
  });

  // set the level as not ended
  this.isEnded = false;
};

BasicGame.Level.prototype.endLevel = function(){
  // starts the timer that will end the level
  this.endTimer = this.game.time.create(true);
  this.endTimer.add(10000,
    function(){
      // enable the flag that indicates the other objects the level is finished
      this.isEnded = true;
    },
    this);
  this.endTimer.start();
};

BasicGame.Level.prototype.coco = function(){

};