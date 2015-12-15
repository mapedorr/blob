var BasicGame = BasicGame || {};

BasicGame.Player = function (game, input) {
  this.game = game;
  this.input = input;
  this.player = null;
  this.level = null;
  this.bitmap = null;
  this.collectedPieces = 0;

  // Define movement constants
  this.MAX_SPEED = 300; // pixels/second
  this.ACCELERATION = 1500; // pixels/second/second
  this.DRAG = 1500; // pixels/second
  this.GRAVITY = 2600; // pixels/second/second
  this.JUMP_SPEED = -1000; // pixels/second (negative y is up)
  this.SLID_SPEED = 1;
};

BasicGame.Player.prototype.preload = function () {
};

BasicGame.Player.prototype.create = function (level) {
  //Save the walls in the level
  this.level = level;

  //Put the player in the game's world
  this.player = this.game.add.sprite(0, 0, 'player');

  //Enable physics on the player
  this.game.physics.arcade.enable(this.player);

  //Set player minimum and maximum movement speed
  this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y

  //Add drag to the player that slows them down when they are not accelerating
  this.player.body.drag.setTo(this.DRAG, 0); // x, y

  //Since we're jumping we need gravity
  this.game.physics.arcade.gravity.y = this.GRAVITY;

  //Capture certain keys to prevent their default actions in the browser.
  //This is only necessary because this is an HTML5 game. Games on other
  //platforms may not need code like this.
  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);

  //Make the player collide with world bounds
  this.player.body.collideWorldBounds = true;

  // make the camera follow the player
  // this.game.camera.follow(this.player);

  // create a bitmap texture for drawing lines
  this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
  this.bitmap.context.fillStyle = 'rgb(0, 0, 255)';
  this.bitmap.context.strokeStyle = 'rgb(0, 0, 255)';
  this.game.add.image(0, 0, this.bitmap);
};

BasicGame.Player.prototype.update = function () {
  if(BasicGame.Game.developmentMode === true){
    // clear the bitmap where we are drawing our lines
    this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
  }

  // check collisions
  this.game.physics.arcade.collide(this.player, this.level.walls);
  this.game.physics.arcade.collide(this.player, this.level.ground);

  if(!this.level.isEnded){
    this.game.physics.arcade.collide(this.player, this.level.pieces,
      function(player, piece){
        piece.destroy();
        this.collectedPieces++;
        if(!this.level.pieces.children || !this.level.pieces.children.length){
          // the level has been finished
          this.level.endLevel();
        }
      },
      null,
      this);
  }

  if(this.level.isEnded == true){
    return;
  }

  var leftPressed = this.leftInputIsActive() == true;
  var rightPressed = this.rightInputIsActive() == true;
  var upPressed = this.upInputIsActive() == true;
  var onTheGround = this.player.body.touching.down == true;
  var onRightWall = this.player.body.touching.right == true;
  var onLeftWall = this.player.body.touching.left == true;

  if(onRightWall || onLeftWall){
    this.player.body.velocity.y = this.SLID_SPEED;
  }

  if (leftPressed) {
    // If the LEFT key is down, set the player velocity to move left
    this.player.body.acceleration.x = -this.ACCELERATION;
    if(!onTheGround && onRightWall && upPressed){
      this.player.body.velocity.y = this.JUMP_SPEED;
    }
  } else if (rightPressed) {
    // If the RIGHT key is down, set the player velocity to move right
    this.player.body.acceleration.x = this.ACCELERATION;
    if(!onTheGround && onLeftWall && upPressed){
      this.player.body.velocity.y = this.JUMP_SPEED;
    }
  } else {
    this.player.body.acceleration.x = 0;
  }

  if (upPressed && onTheGround) {
    this.player.body.velocity.y = this.JUMP_SPEED;
  }

  // This just tells the engine it should update the texture cache
  this.bitmap.dirty = true;
};

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
BasicGame.Player.prototype.leftInputIsActive = function () {
  return this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
BasicGame.Player.prototype.rightInputIsActive = function () {
  return this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
};

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
BasicGame.Player.prototype.upInputIsActive = function () {
  return this.input.keyboard.isDown(Phaser.Keyboard.UP);
};

//Function that checks if  the player is completely in shadows or not
BasicGame.Player.prototype.isInShadow = function () {
  //Trace rays toward the light from each corner of the player sprite.
  //If ALL the rays intersects a wall, then the player is in the shadows
  var lightImage = BasicGame.light.lightGroup.getAt(0);

  if(BasicGame.Game.developmentMode === true){
    this.drawLinesToLight(lightImage);
  }

  var raysToLight = [];
  raysToLight.push(new Phaser.Line(this.player.x, this.player.y, lightImage.x, lightImage.y));
  raysToLight.push(new Phaser.Line(this.player.x + this.player.width, this.player.y, lightImage.x, lightImage.y));
  raysToLight.push(new Phaser.Line(this.player.x + this.player.width, this.player.y + this.player.height - 0.1, lightImage.x, lightImage.y));
  raysToLight.push(new Phaser.Line(this.player.x, this.player.y + this.player.height - 0.1, lightImage.x, lightImage.y));

  // Test if any walls intersect the ray
  return this.allRaysIntersectWall(raysToLight);
};

BasicGame.Player.prototype.allRaysIntersectWall = function (rays) {
  //Check intersections for each ray
  //If at least one ray has no intersection with a wall, then the player isn't in shadow
  var hiddenRays = 0;
  rays.forEach(function (ray) {
    var intersect = null;

    //For each of the walls...
    this.level.walls.forEach(function (wall) {
      if (!intersect) {
        // Create an array of lines that represent the four edges of each wall
        var lines = [
          new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
          new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
          new Phaser.Line(wall.x + wall.width, wall.y, wall.x + wall.width, wall.y + wall.height),
          new Phaser.Line(wall.x, wall.y + wall.height, wall.x + wall.width, wall.y + wall.height)
        ];

        // Test each of the edges in this wall against the ray.
        // If the ray intersects any of the edges then the wall must be in the way.
        for (var i = 0; i < lines.length; i++) {
          intersect = Phaser.Line.intersects(ray, lines[i]);
          if (intersect) {
            break;
          }
        }
      }
    }, this);

    if (intersect) {
      //This edge is hidden. :D
      hiddenRays++;
    }
  },this);

  return (hiddenRays == 4);
};

BasicGame.Player.prototype.drawLinesToLight = function(lightImage){
  // Draw a line from the eye to the target
  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(this.player.x, this.player.y);
  this.bitmap.context.lineTo(lightImage.x, lightImage.y);
  this.bitmap.context.stroke();

  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(this.player.x + this.player.width, this.player.y);
  this.bitmap.context.lineTo(lightImage.x, lightImage.y);
  this.bitmap.context.stroke();

  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(this.player.x, this.player.y + this.player.height);
  this.bitmap.context.lineTo(lightImage.x, lightImage.y);
  this.bitmap.context.stroke();

  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(this.player.x + this.player.width, this.player.y + this.player.height);
  this.bitmap.context.lineTo(lightImage.x, lightImage.y);
  this.bitmap.context.stroke();
};

BasicGame.Player.prototype.updateLevel = function (level) {
  this.level = level;
};