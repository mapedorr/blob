/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var BasicGame = BasicGame || {};

BasicGame.Player = function (game, input, gameObj) {
  this.game = game;
  this.input = input;
  this.gameObj = gameObj;
  this.player = null;
  this.level = null;
  this.bitmap = null;
  this.collectedPieces = 0;
  this.jumpPressed = false;
  this.currentJumpMultiplier = 0;
  this.jumpChance = false;
  this.walkInAirTimer = null;

  // define movement constants
  this.MAX_SPEED = 330; // pixels/second
  this.ACCELERATION = 1000; // pixels/second/second
  this.ACCELERATION_WALL = 1000 * 12;
  this.PLAYER_BODY_OFFSET_X = 10;
  this.DRAG = 2500; // pixels/second
  this.GRAVITY = 2600; // pixels/second/second
  this.JUMP_SPEED = -650; // pixels/second (negative y is up)
  // this.JUMP_SPEED = -800; // pixels/second (negative y is up)
  this.JUMP_SPEED_WALL = -830;
  this.SLID_SPEED = 1;
  this.JUMP_TIME = 150;
  this.JUMP_MULTIPLIER_AMOUNT = 0.01;
  this.JUMP_MULTIPLIER_MAX = 0.23;

  // define gameplay keys
  this.leftKey = Phaser.Keyboard.LEFT;
  this.rightKey = Phaser.Keyboard.RIGHT;
  this.jumpKey = Phaser.Keyboard.SPACEBAR;

  this.jumpSound = null;
  this.walkSound = null;
  this.slideSound = null;
  this.fallSound = null;
  this.justLeaveGround = false;
  this.deathSound = null;
  this.piecesSound = [];

  this.upPressedFlag = false;
  this.dead = false;

  this.leftFirstPress = false;
  this.rightFirstPress = false;
};

BasicGame.Player.prototype.preload = function () {
};

BasicGame.Player.prototype.create = function (level) {
  //Save the walls in the level
  this.level = level;

  //Put the player in the game's world
  this.player = this.game.add.sprite(this.level.initPlayerPos.x,
    this.level.initPlayerPos.y,
    'player');

  // configure the player animations
  this.player.animations.add('normal', [0], 1, false);
  this.player.animations.add('dying', null, 70, false);

  //Enable physics on the player
  this.game.physics.arcade.enable(this.player);

  //Set player minimum and maximum movement speed
  this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 20); // x, y

  //Add drag to the player that slows them down when they are not accelerating
  this.player.body.drag.setTo(this.DRAG, 0); // x, y

  //Since we're jumping we need gravity
  this.game.physics.arcade.gravity.y = this.GRAVITY;

  //Capture certain keys to prevent their default actions in the browser.
  //This is only necessary because this is an HTML5 game. Games on other
  //platforms may not need code like this.
  this.game.input.keyboard.addKeyCapture([
    this.leftKey,
    this.rightKey,
    this.jumpKey
  ]);

  //Make the player collide with world bounds
  this.player.body.collideWorldBounds = true;

  // create a bitmap texture for drawing lines
  this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
  this.bitmap.context.fillStyle = 'rgb(0, 0, 255)';
  this.bitmap.context.strokeStyle = 'rgb(0, 0, 255)';
  this.game.add.image(0, 0, this.bitmap);

  if (!this.jumpSound) {
    this.jumpSound = this.game.add.sound('jump', 0.2);
    this.jumpSound.onPlay.add(function() {
      this.slideSound.stop();
    }, this);
  }

  if (!this.walkSound) {
    this.walkSound = this.game.add.sound('walk', 0.1);
    this.walkSound.onPlay.add(function() {
      this.slideSound.stop();
    }, this);
    this.walkSound.onStop.add(function() {
      if (this.onTheGround === true) {
        this.slideSound.play();
      }
    }, this);
  }

  if (!this.slideSound) {
    this.slideSound = this.game.add.sound('slide', 0.08, true);
  }

  if (!this.fallSound) {
    this.fallSound = this.game.add.sound('fall', 0.1);
  }

  if (!this.deathSound) {
    this.deathSound = this.game.add.sound('death', 0.3);
    this.deathSound.onPlay.add(function() {
      this.slideSound.stop();
    }, this);
  }

  // load the audio for pieces
  if (!this.piecesSound || this.piecesSound.length === 0) {
    for(var i = 1; i <= 20; i++) {
      this.piecesSound.push(this.game.add.sound('piece' + ((i < 10) ? '0' : '') + i, 0.2));
    }
  }

  // create a time to allow the player walk in the air for a while after
  // leaving a platform
  this.walkInAirTimer = this.game.time.create();
  this.walkInAirTimer.add(1000, function () {
    this.player.body.offset.x = 0;
  }, this);
};

BasicGame.Player.prototype.update = function () {
  var leftPressed = false;
  var rightPressed = false;
  var upPressed = false;
  var onRightWall = false;
  var onLeftWall = false;
  var headHit = false;
  var jumpMul = 0;

  this.game.physics.arcade.isPaused = this.gameObj.isLoadingLevel;
  if (this.gameObj.isLoadingLevel) {
    this.player.body.velocity.y = 0;
    return;
  }

  if (BasicGame.Game.developmentMode === true) {
    // clear the bitmap where we are drawing our lines
    this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
  }

  // check collisions
  if (this.level.hasFloor === true) {
    this.game.physics.arcade.collide(this.player, this.level.ground);
  }

  this.player.touchingPiece = false;

  // check if the player touches a piece
  this.game.physics.arcade.overlap(this.player, this.level.pieces,
    function(player, piece) {
      player.touchingPiece = true;
      piece.destroy();
      (this.piecesSound[this.collectedPieces++]).play();
      if (!this.level.pieces.children || !this.level.pieces.children.length) {
        // the level has been finished
        this.level.endLevel();
      }
    },
    null,
    this);

  if (this.level.hasSpikes === true) {
    this.game.physics.arcade.collide(this.player, this.level.walls,
      function(player, spikePlatform) {
        if (spikePlatform.spikeRef && spikePlatform.spikeRef.isHidden === true) {
          if (this.gameObj.level.spikeSound.isPlaying === false) {
            this.gameObj.level.spikeSound.play();
          }
          spikePlatform.spikeRef.showTween.start();
        }
      }, null, this);

    if (this.level.spikes.openedSpikes > 0) {
      this.game.physics.arcade.overlap(this.player, this.level.spikes,
        function(player, spike) {
          if (this.dead === false) {
            this.player.body.allowGravity = false;
            this.player.body.velocity.y = 0;
            this.gameObj.subtractAllLifes(true);
          }
        }, null, this);
    }
  } else {
    this.game.physics.arcade.collide(this.player, this.level.walls);
  }

  if (this.dead === true) {
    this.player.body.acceleration.x = 0;
    return;
  }

  if (this.player.body.onFloor() === true) {
    this.dead = true;
    this.player.body.collideWorldBounds = false;
    this.gameObj.subtractAllLifes();
    return;
  }

  
  // handle player movement
  leftPressed = this.leftInputIsActive() === true;
  rightPressed = this.rightInputIsActive() === true;
  upPressed = this.upInputIsActive() === true;
  if (this.player.touchingPiece === false) {
    this.onTheGround = this.player.body.touching.down === true;
    onRightWall = this.player.body.touching.right === true;
    onLeftWall = this.player.body.touching.left === true;
    headHit = this.player.body.touching.up === true && this.onTheGround === false;
  }

  // reset some values to default if the player is touching the ground
  if (this.onTheGround) {
    this.isFalling = false;
    this.isJumping = false;
  }
  else {
    this.walkSound.stop();
    this.slideSound.stop();

    // check if the player has left a platform walking, if true, give it a chance
    // (an amount of time) to jump
    if (this.player.body.offset.x === 0) {
      if (!this.isJumping && this.player.body.velocity.y > 0) {
        // replace the body of the player to keep it touching the ground
        if (leftPressed) {
          this.player.body.offset.x = this.PLAYER_BODY_OFFSET_X;
        }
        else if (rightPressed) {
          this.player.body.offset.x = -this.PLAYER_BODY_OFFSET_X;
        }

        // restart the position of the player's body after an amount of time has
        // passed
        this.walkInAirTimer.start();
      }
    }
    else if (this.player.body.velocity.y > 0) {
      this.player.body.offset.x = 0;
    }
  }


  // -------------------------------------------------------------------------
  // REVISAR
  if (!this.onTheGround && !onRightWall && !onLeftWall &&
      this.justLeaveGround === false) {
    this.justLeaveGround = true;
  }

  // handle behaviour of player on walls
  if (onRightWall || onLeftWall) {
    this.player.body.velocity.y = this.SLID_SPEED;

    this.player.body.offset.x = this.currentJumpMultiplier = 0;
    this.jumpChance = false;

    !this.slideSound.isPlaying && this.slideSound.play();

    // -------------------------------------------------------------------------
    // REVISAR
    if (this.justLeaveGround === true) {
      this.justLeaveGround = false;
      this.fallSound.play();
    }
  }

  if (leftPressed) {
    // set the player velocity to move left
    this.rightFirstPress = false;
    this.player.body.acceleration.x = -this.ACCELERATION;

    if (this.onTheGround || this.player.body.offset.x != 0) {
      if (!this.leftFirstPress) {
        this.leftFirstPress = true;
        this.currentJumpMultiplier = 0;
        this.walkSound.play();
      }
      else {
        this.currentJumpMultiplier += this.JUMP_MULTIPLIER_AMOUNT;
      }
    }
    else {
      if (!onLeftWall) {
        this.slideSound.stop();
      }
      else if (upPressed) {
        this.player.body.acceleration.x = this.ACCELERATION_WALL;
        this.player.body.velocity.y = this.JUMP_SPEED_WALL;

        // jump jump jump
        this.currentJumpMultiplier = 0;
        this.jumpSound.play();
      }
    }
  }
  else if (rightPressed) {
    // If the RIGHT key is down, set the player velocity to move right
    this.leftFirstPress = false;
    this.player.body.acceleration.x = this.ACCELERATION;

    if (this.onTheGround || this.player.body.offset.x != 0) {
      if (this.rightFirstPress === false) {
        this.rightFirstPress = true;
        this.currentJumpMultiplier = 0;
        this.walkSound.play();
      }
      else {
        this.currentJumpMultiplier += this.JUMP_MULTIPLIER_AMOUNT;
      }
    }
    else {
      if (!onRightWall) {
        this.slideSound.stop();
      }
      else if (upPressed) {
        this.player.body.acceleration.x = -this.ACCELERATION_WALL;
        this.player.body.velocity.y = this.JUMP_SPEED_WALL;

        // jump jump jump
        this.currentJumpMultiplier = 0;
        this.jumpSound.play();
      }
    }
  }
  else {
    // not moving in X direction
    this.leftFirstPress = this.rightFirstPress = false;
    this.player.body.acceleration.x = 0;
    this.player.body.velocity.x = 0;
    this.currentJumpMultiplier = 0;
    this.walkSound.stop();
    this.slideSound.stop();

    // -------------------------------------------------------------------------
    // ToDo
    // this.player.body.offset.x = 0;
  }

  if (upPressed && (this.onTheGround || this.player.body.offset.x != 0)) {
    jumpMul = Math.min(this.currentJumpMultiplier, this.JUMP_MULTIPLIER_MAX);
    this.player.body.velocity.y = this.JUMP_SPEED;
    this.player.body.velocity.y += this.JUMP_SPEED * jumpMul;
    this.isJumping = true;


    this.player.body.offset.x = 0;



    // jump jump jump
    this.currentJumpMultiplier = 0;
    this.jumpSound.play();
  }

  // make the jump a bit higher if the player keeps pressing the jump button
  // if (this.input.keyboard.downDuration(this.jumpKey, this.JUMP_TIME) === true) {
  //   this.player.body.velocity.y += this.JUMP_SPEED * 0.1 * this.jumpMultiplier;
  //   if (this.jumpMultiplier > 0.1)
  //     this.jumpMultiplier *= 0.95;
  //   else
  //     this.jumpMultiplier = 0;
  // }
  // else {
  //   this.jumpMultiplier = 0;
  // }

  if (headHit && !this.fallSound.isPlaying) {
    this.fallSound.play();
  // if ((headHit === true && this.fallSound.isPlaying === false) ||
  //     (this.justLeaveGround === true && this.onTheGround === true)) {
  //   if (this.justLeaveGround === true) {
  //     console.log('????');
  //     this.justLeaveGround = false;
  //   }
  }

  // This just tells the engine it should update the texture cache
  this.bitmap.dirty = true;
};

BasicGame.Player.prototype.render = function() {
  if (BasicGame.Game.developmentMode === true) {
    // Sprite debug info
    this.game.debug.body(this.player, 'rgba(0,255,0,0.4)');
    this.game.debug.bodyInfo(this.player, 'rgba(0,255,0,0.4)');
  }
};

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
BasicGame.Player.prototype.leftInputIsActive = function () {
  return this.input.keyboard.isDown(this.leftKey);
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
BasicGame.Player.prototype.rightInputIsActive = function () {
  return this.input.keyboard.isDown(this.rightKey);
};

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
BasicGame.Player.prototype.upInputIsActive = function (duration) {
  if (this.input.keyboard.isDown(this.jumpKey) && this.upPressedFlag == false) {
  // if (this.input.keyboard.downDuration(this.jumpKey, duration) && this.upPressedFlag == false) {
    this.upPressedFlag = true;
    return true;
  }
  else if (!this.input.keyboard.isDown(this.jumpKey) && this.upPressedFlag == true) {
  // else if (!this.input.keyboard.downDuration(this.jumpKey, duration) && this.upPressedFlag == true) {
    this.upPressedFlag = false;
  }
  return false;
};

//Function that checks if  the player is completely in shadows or not
BasicGame.Player.prototype.isInShadow = function () {
  //Trace rays toward the light from each corner of the player sprite.
  //If ALL the rays intersects a wall, then the player is in the shadows
  var lightImage = BasicGame.light.lightGroup.getAt(0);

  if (BasicGame.Game.developmentMode === true) {
    this.drawLinesToLight(lightImage);
  }

  var raysToLight = [];
  
  // top left corner
  raysToLight.push(new Phaser.Line(this.player.x + 2,
    this.player.y + 2,
    lightImage.x, lightImage.y));

  // top right corner
  raysToLight.push(new Phaser.Line(this.player.x + this.player.width - 2,
    this.player.y + 2,
    lightImage.x, lightImage.y));

  // bottom right corner
  raysToLight.push(new Phaser.Line(this.player.x + this.player.width - 2,
    this.player.y + this.player.height - 2,
    lightImage.x, lightImage.y));

  // bottom left corner
  raysToLight.push(new Phaser.Line(this.player.x + 2,
    this.player.y + this.player.height - 2,
    lightImage.x,
    lightImage.y));

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

BasicGame.Player.prototype.drawLinesToLight = function(lightImage) {
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
  this.collectedPieces = 0;
  this.player.body.reset(this.player.x, this.player.y);
  this.player.body.enable = false;
  this.level = level;
  this.justLeaveGround = false;
  this.slideSound.stop();
  this.player.position.set(this.level.initPlayerPos.x,
    this.level.initPlayerPos.y);
};

BasicGame.Player.prototype.dieWithDignity = function() {
  this.dead = true;
  this.slideSound.stop();

  var timer = this.game.time.create(true);
  timer.add(100, function() {
    this.deathSound.play();
  }, this);
  timer.start();

  // play the dead animation
  this.player.animations.play('dying');
};
