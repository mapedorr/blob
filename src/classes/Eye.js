var BasicGame = BasicGame || {};

BasicGame.Eye = function (game) {
  this.game = game;

  this.eye = null;
  this.PlayerObj = null;
  this.level = null;
  this.lightning = null;

  this.enemies = new Array();
  this.bitmap = null;
  this.anger = null;
};

BasicGame.Eye.prototype.preload = function () {};

BasicGame.Eye.prototype.create = function (playerObj, level, lightning) {
  this.PlayerObj = playerObj;
  this.level = level;
  this.lightning = lightning;

  //Add the sprite of the eye
  this.eye = this.game.add.sprite(this.game.world.width / 2, 64, 'eye',0);

  //Set the pivot point of the light to the center of the texture
  this.eye.anchor.setTo(0.5, 0.5);

  //Set the animations for THE EYE
  this.eye.animations.add('search', [0,1,2,3,3,3,2,1,0,4,5,6,6,6,5,4], 3, true);
  this.eye.animations.add('angry', [7], 1, false);
  this.eye.animations.add('tired', [8], 1, false);
  this.eye.animations.add('happy', [9], 1, false);
  this.eye.animations.add('irritated', [10], 1, false);

  //Set a timer for changing the animations of THE EYE
  this.eyeStateTimer = 0;

  //Create a bitmap texture for drawing lines
  this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
  this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
  this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
  this.game.add.image(0, 0, this.bitmap);

  //Create the lightning for killing the player
  this.lightning.create(this.eye,this.PlayerObj,this.level);
  this.lightningTimer = 0;

  //Add the player to the enemies array
  this.enemies.push(this.PlayerObj.player);

  //THE EYE starts calm
  this.anger = false;
};

BasicGame.Eye.prototype.update = function () {
  if(BasicGame.Game.developmentMode === true){
    // Clear the bitmap where we are drawing our lines
    this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
  }

  if(this.level.isEnded == true){
    this.eye.animations.play('search');
    return;
  }

  //Ray casting!!!
  //Test if each target can see the eye by casting a ray (a line) towards the eye.
  //If the ray intersects any walls before it intersects the eye then the wall
  //is in the way.
  this.enemies.forEach(function (target) {
    // define the lines that connects the target to the eye
    // this isn't drawn on screen.
    var rays = [];
    rays[0] = new Phaser.Line(target.x, target.y, this.eye.x, this.eye.y);
    rays[1] = new Phaser.Line(target.x + target.width, target.y, this.eye.x, this.eye.y);
    rays[3] = new Phaser.Line(target.x + target.width, target.y + target.height - 0.1, this.eye.x, this.eye.y);
    rays[2] = new Phaser.Line(target.x, target.y + target.height - 0.1, this.eye.x, this.eye.y);

    // check if any walls intersect the ray
    var intersect = this.getWallIntersection(rays);

    // check if the player is in the shadows
    var playerInShadow = this.PlayerObj.isInShadow();

    // check if the player is in the side of vision of the EYE
    var playerInSide = this.isPlayerInSide();

    if (intersect || playerInShadow || !playerInSide){
      // a wall is protecting the enemy or it is in shadows or is not on my side of vision
      // ....lets calm down
      this.calmDown();

      //- - - | DEVELOPMENT MODE | - - -
      if(BasicGame.Game.developmentMode === true){
        target.tint = 0xffffff;
      }
    } else {
      //I see the player...I've to KILL IT
      this.shootPlayer(target);

      //- - - | DEVELOPMENT MODE | - - -
      if(BasicGame.Game.developmentMode === true) {
        target.tint = 0x00ff00;
      }
    }
  }, this);

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

BasicGame.Eye.prototype.isPlayerInSide = function(){
  if(this.eye.animations.currentFrame == 0){
    // "I can see everything!"
    return true;
  }else if(this.eye.animations.currentFrame.index <= 3){
    // the player have to be on the left side of the screen
    if(this.PlayerObj.player.x <= this.game.world.width / 2){
      return true;
    }
  }else if(this.eye.animations.currentFrame.index >= 4){
    // the player have to be on the right side of the screen
    if(this.PlayerObj.player.x >= this.game.world.width / 2){
      return true;
    }
  }
  return false;
};

BasicGame.Eye.prototype.calmDown = function(){
  this.lightningTimer = 0;
  if(this.anger){
    this.angerTimer -= this.game.time.elapsed;
    if(this.angerTimer <= 0){
      this.angerTimer = 0;
      this.anger = false;

      this.lightningTimer = 2000;

      this.eye.animations.play('angry');
      this.eyeStateTimer = 10000;

      //Choose a platform for shooting it
      var chosenPlatform = this.game.rnd.integerInRange(0, this.level.walls.length - 1);
      this.lightning.shoot(this.level.walls.getAt(chosenPlatform));
    }
  }

  this.eyeStateTimer -= this.game.time.elapsed;
  if (this.eyeStateTimer <= 8000 && this.eyeStateTimer > 0) {
    this.eye.animations.play('search');
  }else if(this.eyeStateTimer <= 0){
    this.eye.animations.play('tired');

    if(!this.anger) {
      //Init the timer that will make THE EYE shoot a platform
      this.angerTimer = 3000;
      this.anger = true;
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
    this.eyeStateTimer = 10000;

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
};