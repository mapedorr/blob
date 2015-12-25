var BasicGame = BasicGame || {};

BasicGame.Level = function (game, gameObj) {
  this.game = game;
  this.gameObj = gameObj;
  this.levelMusic = null;
  this.walls = null;
  this.ground = null;
  this.map = null;
  this.endTimer = null;
  this.isEnded = null;
  this.initPlayerPos = {x: 0, y: 0};

  // font attributes
  this.fontSize = 32;
  this.fontId = 'font';
};

BasicGame.Level.prototype.create = function () {
  // create the bitmap for the countdown text
  this.dialogTextBitmap = this.game.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2,
    this.fontId,
    '',
    this.fontSize);
  this.dialogTextBitmap.anchor.set(.5, .5);
  this.dialogTextBitmap.align = "center";
  this.dialogTextBitmap.tint = 0x212121;

  this.createLevel(this.gameObj.currentLevel);
};

BasicGame.Level.prototype.destroyCurrentLevel = function(){
  this.map.destroy();
  if(this.ground){
    this.ground.destroy();
  }
  this.walls.destroy();
  this.dialogTextBitmap.setText("");
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
    pieceSprite.body.immovable = false;
    pieceSprite.body.allowGravity = false;
  });

  // get the player initial position
  if(this.map.objects.player_pos){
    this.initPlayerPos.x = this.map.objects.player_pos[0].x;
    this.initPlayerPos.y = this.map.objects.player_pos[0].y;
  }

  // set the level as not ended
  this.isEnded = false;
};

BasicGame.Level.prototype.endLevel = function(){
  var secondsToEnd = 10;
  this.dialogTextBitmap.setText(secondsToEnd);

  // starts the timer that will end the level
  this.endTimer = this.game.time.create(true);
  this.endTimer.add(this.gameObj.countdownDuration * 1000,
    function(){
      // enable the flag that indicates the other objects the level is finished
      this.isEnded = true;
    },
    this);

  this.endTimer.repeat(1000,
    this.gameObj.countdownDuration,
    function(){
      // show the countdown on the screen
      secondsToEnd--;
      if(secondsToEnd == 4){
        this.gameObj.showDarkness();
      }
      this.dialogTextBitmap.setText(secondsToEnd);
    },
    this);

  this.endTimer.start();
};