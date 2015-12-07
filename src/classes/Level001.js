var BasicGame = BasicGame || {};

BasicGame.Level001 = function (game) {
  this.game = game;
  this.levelMusic = null;
  this.walls = null;
  this.ground = null;
  this.map = null;
};

BasicGame.Level001.prototype.create = function () {
  // this.levelMusic = this.game.add.audio('level001Music');
  // this.levelMusic.play();
  // 
  this.map = this.game.add.tilemap('lvl01');
  // this.map.addTilesetImage('platforms', 'platform');
  
  // this.layer = this.map.createLayer('plataformas');
  // this.layer.resizeWorld();
  // this.map.setCollisionByExclusion([], true, "plataformas");
  
  this.walls = this.game.add.group();
  // this.game.physics.arcade.enable(this.walls);
  // this.walls.body.allowGravity = false;
  this.map.createFromObjects("platforms", 0, 'platform', null, true, false, this.walls);
  this.map.objects.platforms.forEach(function(object){
    console.log(object);
  });

  //Create the ground
  // this.ground = this.game.add.tileSprite(0, this.game.world.height - 32, this.game.world.width, 32, 'platform');
  // this.game.physics.arcade.enable(this.ground);
  // this.ground.body.immovable = true;
  // this.ground.body.allowGravity = false;
  // this.ground.body.allowGravity = false;

  // //Build some walls. These will block line of sight.
  // //  var NUMBER_OF_WALLS = 4;
  // this.walls = this.game.add.group();

  // //Enable physics on the walls
  // this.walls.enableBody = true;
  // this.game.physics.arcade.enable(this.walls);

  // var platform = null;

  // platform = this.walls.add(this.game.add.tileSprite(0, 140, 400, 32, 'platform'), true);
  // platform.body.immovable = true;
  // platform.body.allowGravity = false;

  // platform = this.walls.add(this.game.add.tileSprite(350, 320, 128, 32, 'platform'), true);
  // platform.body.immovable = true;
  // platform.body.allowGravity = false;

  // platform = this.walls.add(this.game.add.tileSprite(800, 80, 32, 256, 'platform'), true);
  // platform.body.immovable = true;
  // platform.body.allowGravity = false;

  // platform = this.walls.add(this.game.add.tileSprite(600, 470, this.game.world.width - 600, 32, 'platform'), true);
  // platform.body.immovable = true;
  // platform.body.allowGravity = false;

  // platform = this.walls.add(this.game.add.tileSprite(500, 550, 64, 32, 'platform'), true);
  // platform.body.immovable = true;
  // platform.body.allowGravity = false;

  /*
   RANDOM WALLS
   var i, x, y;
   for(i = 0; i < NUMBER_OF_WALLS; i++) {
   x = i * this.game.width/NUMBER_OF_WALLS + 50;
   y = this.game.rnd.integerInRange(50, this.game.height - 200);
   this.game.add.image(x, y, 'platform', 0, this.walls).scale.setTo(3, 3);
   }
   */
};

