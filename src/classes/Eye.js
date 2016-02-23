var BasicGame = BasicGame || {};

BasicGame.Eye = function (game, gameObj) {
  this.game = game;
  this.gameObj = gameObj;

  this.eye = null;
  this.PlayerObj = null;
  this.level = null;
  this.lightning = null;

  this.bitmap = null;
  this.anger = null;

  // 20 seconds searching the player before going crazy
  this.searchingTime = 19000;
  this.originalSearchSpeed = 2;
  this.zoneSize = this.game.world.width / 3;

  // view zone
  this.viewZoneSprite = null;
};

BasicGame.Eye.prototype.preload = function () {};

BasicGame.Eye.prototype.create = function (playerObj, level, lightning) {
  this.PlayerObj = playerObj;
  this.level = level;
  this.lightning = lightning;

  // add the sprite of the eye
  this.eye = this.game.add.sprite(this.game.world.width / 2, 64, 'eye', 0);
  this.eye.originalX = this.eye.x;
  this.eye.originalY = this.eye.y;

  // set the pivot point of the light to the center of the texture
  this.eye.anchor.setTo(0.5, 0.5);

  // set the animations for THE EYE
  this.eye.animations.add('search', [0,1,2,3,3,3,2,1,0,4,5,6,6,6,5,4], this.originalSearchSpeed, true);
  this.eye.animations.add('angry', [7], 1, false);
  this.eye.animations.add('tired', [8], 1, false);
  this.eye.animations.add('happy', [9], 1, false);
  this.eye.animations.add('irritated', [10], 1, false);

  // set a timer for changing the animations of THE EYE
  this.eyeStateTimer = this.searchingTime;

  // create a bitmap texture for drawing lines
  this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
  this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
  this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
  this.game.add.image(0, 0, this.bitmap);

  // create the lightning for killing the player
  this.lightning.create(this.eye,this.PlayerObj,this.level);
  this.lightningTimer = 0;

  // THE EYE starts calm
  this.anger = false;

  // create the view zones
  this.viewZoneSprite = this.game.add.sprite(this.eye.position.x - this.zoneSize / 2, 0, 'view_zone', 0);
  this.viewZoneSprite.tint = 0x274245;
  this.viewZoneSprite.alpha = 0.1;
  this.viewZoneSprite.width = this.zoneSize;
  this.viewZoneSprite.height = this.game.world.height;
  this.viewZoneSprite.enableBody = true;
  this.game.physics.arcade.enable(this.viewZoneSprite);
  this.viewZoneSprite.body.immovable = false;
  this.viewZoneSprite.body.allowGravity = false;

  // calculate and store the positions of the view zone
  var zoneDiv = this.zoneSize / 3;
  this.viewZoneSprite.positions = {
    '3': 0,
    '2': zoneDiv,
    '1': zoneDiv * 2,
    '0': this.viewZoneSprite.position.x,
    '4': this.viewZoneSprite.position.x + zoneDiv,
    '5': this.viewZoneSprite.position.x + zoneDiv * 2,
    '6': this.game.world.width - this.zoneSize
  };
};

BasicGame.Eye.prototype.update = function () {
  if(BasicGame.Game.developmentMode === true){
    // clear the bitmap where we are drawing our lines
    this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
  }

  this.viewZoneSprite.visible = false;

  if(this.gameObj.isLoadingLevel == true){
    // the EYE will start the level as irritated (sleeping)
    this.eye.animations.play('irritated');
    return;
  }

  if(this.eye.animations.currentAnim.name === 'happy'){
    // the player is dead, I'm the happiest EYE in the hole universe
    return;
  }

  // ray casting!!!
  // test if the target can see the eye by casting a ray (a line) towards the eye.
  // if the ray intersects any walls before it intersects the eye then the wall
  // is in the way.
  var attack = false;

  if(this.eye.animations.currentAnim.name === 'search'){
    this.viewZoneSprite.visible = true;
  }

  // check if the player is in the side of vision of the EYE
  if(this.isPlayerInsideViewZone() === true){
    // define the lines that connects the target to the eye
    // this isn't drawn on screen.
    var rays = [];
    rays[0] = new Phaser.Line(this.PlayerObj.player.x, this.PlayerObj.player.y, this.eye.x, this.eye.y);
    rays[1] = new Phaser.Line(this.PlayerObj.player.x + this.PlayerObj.player.width, this.PlayerObj.player.y, this.eye.x, this.eye.y);
    rays[3] = new Phaser.Line(this.PlayerObj.player.x + this.PlayerObj.player.width, this.PlayerObj.player.y + this.PlayerObj.player.height - 0.1, this.eye.x, this.eye.y);
    rays[2] = new Phaser.Line(this.PlayerObj.player.x, this.PlayerObj.player.y + this.PlayerObj.player.height - 0.1, this.eye.x, this.eye.y);

    // check if any walls intersect the ray
    var wallIntersect = this.getWallIntersection(rays);

    // check if the player is in the shadows
    var playerInShadow = this.PlayerObj.isInShadow();

    if(!wallIntersect && !playerInShadow){
      attack = true;
    }
  }

  if (attack == false){
    // i can't see the player, lets calm down
    this.calmDown();

    //- - - | DEVELOPMENT MODE | - - -
    if(BasicGame.Game.developmentMode === true){
      this.PlayerObj.player.tint = 0xffffff;
    }
  } else {
    //I see the player...I've to KILL IT
    this.shootPlayer(this.PlayerObj.player);

    //- - - | DEVELOPMENT MODE | - - -
    if(BasicGame.Game.developmentMode === true) {
      this.PlayerObj.player.tint = 0x00ff00;
    }
  }

  // This just tells the engine it should update the texture cache
  this.bitmap.dirty = true;
};

// Given a ray, this function iterates through all of the walls and
// returns the closest wall intersection from the start of the ray
// or null if the ray does not intersect any walls.
BasicGame.Eye.prototype.getWallIntersection = function (rays) {
  //Check intersections for each ray
  //If at least one ray has no intersection with a wall, then THE EYE can see his enemy.
  var hiddenRays = 0;
  rays.forEach(function(ray){
    var intersect = null;

    // For each of the walls...
    this.level.walls.forEach(function (wall) {
      if(intersect){
        return;
      }

      // Create an array of lines that represent the four edges of each wall
      var lines = [
        new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
        new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
        new Phaser.Line(wall.x + wall.width, wall.y,wall.x + wall.width, wall.y + wall.height),
        new Phaser.Line(wall.x, wall.y + wall.height,wall.x + wall.width, wall.y + wall.height)
      ];

      // Test each of the edges in this wall against the ray.
      // If the ray intersects any of the edges then the wall must be in the way.
      for (var i = 0; i < lines.length; i++) {
        intersect = Phaser.Line.intersects(ray, lines[i]);
        if (intersect) {
          break;
        }
      }
    }, this);

    if(intersect){
      //This edge is hidden. :D
      hiddenRays++;
    }

  },this);

  return hiddenRays == 4;

};

BasicGame.Eye.prototype.isPlayerInsideViewZone = function(){
  if(this.viewZoneSprite.visible == true){
    this.viewZoneSprite.x = this.viewZoneSprite.positions['' + this.eye.animations.currentFrame.index];
    return this.game.physics.arcade.overlap(this.PlayerObj.player,
      this.viewZoneSprite);
  }
  return false;
};

BasicGame.Eye.prototype.calmDown = function(){
  this.lightningTimer = 0;
  if(this.anger == true){
    this.angerTimer -= this.game.time.elapsed;
    if(this.angerTimer <= 0){
      this.angerTimer = 0;
      this.anger = false;

      // make the EYE look angry
      this.eye.animations.play('angry');
      this.eyeStateTimer = this.searchingTime;

      // shake the world
      // this.gameObj.shakeCamera();
      this.shake();

      // intensify search speed
      this.eye.animations.getAnimation("search").speed += 1;

      // choose a platform for shooting it
      // this.lightningTimer = 2000;
      // var chosenPlatform = this.game.rnd.integerInRange(0, this.level.walls.length - 1);
      // this.lightning.shoot(this.level.walls.getAt(chosenPlatform));
    }
  }

  this.eyeStateTimer -= this.game.time.elapsed;
  if(this.eyeStateTimer <= (this.searchingTime - 2000) && this.eyeStateTimer > 0) {
    // after 2 seconds, search for the player
    this.eye.animations.play('search');
  }else if(this.eyeStateTimer <= 0){
    this.eye.animations.play('tired');

    if(!this.anger) {
      // init the timer that will make THE EYE intensifies its searching
      this.angerTimer = 2000;
      this.anger = true;
    }
  }else{
    if(this.eye.animations.currentAnim.name != 'angry'){
      this.viewZoneSprite.visible = false;
      this.eye.animations.play('irritated');
    }
  }
};

BasicGame.Eye.prototype.shootPlayer = function(target){
  //I see the player. I'm not anger any more. I'M GOING TO KILL IT.
  this.anger = false;

  this.lightningTimer -= this.game.time.elapsed;
  if (this.lightningTimer <= 0) {
    //Take 2 seconds to shoot again. I do not want to warm up.
    this.lightningTimer = 2000;

    this.eye.animations.play('angry');
    this.eyeStateTimer = this.searchingTime;

    this.lightning.shoot(target);
  }

  //- - - | DEVELOPMENT MODE | - - -
  if(BasicGame.Game.developmentMode === true) {
    this.drawLinesToTarget(target);
  }
};

BasicGame.Eye.prototype.drawLinesToTarget = function(target){
  // Draw a line from the eye to the target
  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(target.x, target.y);
  this.bitmap.context.lineTo(this.eye.x, this.eye.y);
  this.bitmap.context.stroke();

  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(target.x + target.width, target.y);
  this.bitmap.context.lineTo(this.eye.x, this.eye.y);
  this.bitmap.context.stroke();

  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(target.x, target.y + target.height);
  this.bitmap.context.lineTo(this.eye.x, this.eye.y);
  this.bitmap.context.stroke();

  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(target.x + target.width, target.y + target.height);
  this.bitmap.context.lineTo(this.eye.x, this.eye.y);
  this.bitmap.context.stroke();
};

BasicGame.Eye.prototype.updateLevel = function (level) {
  this.level = level;
  this.anger = false;

  // restore the searching speed to its default
  this.eye.animations.getAnimation("search").speed = this.originalSearchSpeed;
};

BasicGame.Eye.prototype.shake = function(){
  this.shakeTween = this.shakeTween || this.game.add.tween(this.eye)
  this.shakeTween.to({x: this.eye.originalX + 10},
    40,
    Phaser.Easing.Sinusoidal.InOut,
    false,
    0,
    4,
    true).start();
  this.shakeTween.onComplete.add(function(){
    this.eye.x = this.eye.originalX;
  }, this);
};

BasicGame.Eye.prototype.rejoice = function(){
  this.eye.animations.play('happy');
  this.shakeTween = this.shakeTween || this.game.add.tween(this.eye)
  this.shakeTween.to({y: this.eye.originalY + 10},
    150,
    Phaser.Easing.Sinusoidal.InOut,
    false,
    0,
    10,
    true).start();
  this.shakeTween.onComplete.add(function(){
    this.eye.y = this.eye.originalY;
  }, this);
};