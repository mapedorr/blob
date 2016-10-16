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

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // define movement constants
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // speed of movement in X axis
  this.MAX_SPEED = 300;

  // base speed of movement in X axis when an arrow key (left, right) is pressed
  // in ground
  this.ACCELERATION = 2500;

  // base speed of movement in X axis when an arrow key (left, right) is pressed
  // while jumping from a wall
  this.ACCELERATION_WALL = 12000;
  
  // pixels per second used in character falls
  this.GRAVITY = 2600;
  
  // base speed used to make the character jump
  this.JUMP_SPEED = -850;

  // base speed used to make the character jump while is against a wall
  this.JUMP_SPEED_WALL = -850;


  this.SLID_SPEED = 1;
  this.JUMP_TIME = 150;
  this.JUMP_MULTIPLIER_AMOUNT = 0.01;
  this.JUMP_MULTIPLIER_MAX = 0.23;
  this.JUMP_MULTIPLIER = 0.3;

  // define gameplay keys
  this.leftKey = Phaser.Keyboard.LEFT;
  this.rightKey = Phaser.Keyboard.RIGHT;
  this.jumpKey = Phaser.Keyboard.Z;

  this.justLeaveGround = false;

  this.jumpSound = null;
  this.walkSound = null;
  this.slideSound = null;
  this.fallSound = null;
  this.deathSound = null;
  this.piecesSound = [];

  this.jumpCount = 0;
  this.dead = false;

  this.leftFirstPress = false;
  this.rightFirstPress = false;

  this.particlesGroup = null;
  this.PARTICLES_AMOUNT = 4;
};

BasicGame.Player.prototype.create = function (level) {
  var particle = null,
      particleX = null,
      particleY = null,
      increaseAmount = null;

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

  // disable physics in the player's body while the game starts
  this.player.body.enable = false;

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

  // create the group that will contain the particles that will be used during
  // player death
  this.particlesGroup = this.game.add.group();

  particleX = 0;
  particleY = 0;
  increaseAmount = this.player.width / this.PARTICLES_AMOUNT;

  while (this.particlesGroup.children.length < Math.pow(this.PARTICLES_AMOUNT,2)) {
    particle = this.game.add.sprite(particleX, particleY, 'player');
    // particle.tint = this.gameObj.helper.randomColor();
    particle.width = particle.height = increaseAmount;
    particle.originalX = particle.x;
    particle.originalY = particle.y;

    this.game.physics.arcade.enable(particle);
    particle.body.allowGravity = false;

    this.particlesGroup.addChild(particle);

    particleX += particle.width;
    if (particleX >= this.player.width) {
      particleX = 0;
      particleY += particle.height;
    }
  }

  this.particlesGroup.x = -100;
  this.particlesGroup.y = -100;
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

  if (this.gameObj.isLoadingLevel === true || this.dead === true) {
    if (this.dead === true) {
      this.player.body.acceleration.x = 0;
      
      // check if a particle is out of the world to disable its gravity
      this.particlesGroup.forEach(function (particle) {
        var particleX = this.particlesGroup.x + particle.x;
        var particleY = this.particlesGroup.y + particle.y;
        if (particleX < 0 || particleX > this.game.world.width ||
            particleY > this.game.world.height) {
          particle.body.allowGravity = false;
          particle.body.acceleration.x = 0;
          particle.body.velocity.y = 0;
        }
      }, this);
    }
    return;
  }

  if (this.player.y > this.game.world.height) {
    this.dead = true;
    this.player.body.velocity.y = 0;
    this.player.body.allowGravity = false;
    this.gameObj.subtractAllLifes();
    return;
  }

  // ___________________________________________________________________________
  // check collisions
  // ___________________________________________________________________________

  this.checkCollisions();


  // ___________________________________________________________________________
  // handle player movement
  // ___________________________________________________________________________

  leftPressed = this.leftInputIsActive() === true;
  rightPressed = this.rightInputIsActive() === true;
  upPressed = this.upInputIsActive() === true;

  if (this.player.touchingPiece === false) {
    this.onTheGround = this.player.body.touching.down === true;
    onRightWall = this.player.body.touching.right === true && this.player.body.velocity.y > -500;
    onLeftWall = this.player.body.touching.left === true && this.player.body.velocity.y > -500;
    headHit = this.player.body.touching.up === true && this.onTheGround === false;
  }

  if (this.onTheGround || onRightWall || onLeftWall) {
    this.jumpCount = 0;
  }

  // reset some values to default if the player is touching the ground
  if (this.onTheGround) {
    this.isFalling = false;
    this.isJumping = false;
    if (this.justLeaveGround === true) this.fallSound.play();
    this.justLeaveGround = false;
  }
  else {
    this.walkSound.stop();
    this.slideSound.stop();

    // check if the character just left the ground
    if (this.justLeaveGround === false && this.player.body.velocity.y > 0) {
      this.justLeaveGround = true;

      // create a time to allow the player walk in the air for a while after
      // leaving a platform
      this.walkInAirTimer = this.game.time.create(true);
      this.walkInAirTimer.add(150, function () {
        this.jumpCount++;
      }, this);

      // restart the position of the player's body after an amount of time has
      // passed
      this.walkInAirTimer.start();
    }
  }

  // handle behaviour of player on walls
  if (onRightWall || onLeftWall) {
    this.player.body.velocity.y = this.SLID_SPEED;

    this.currentJumpMultiplier = 0;
    this.jumpChance = false;

    if (!this.slideSound.isPlaying) this.slideSound.play();
  }

  if (this.player.x < 0) this.player.x = 0;
  if (this.player.right > this.game.world.width) this.player.x = this.game.world.width - this.player.width;

  if (leftPressed && this.player.x > 0) {
    // set the player velocity to move left
    this.rightFirstPress = false;
    this.player.body.acceleration.x = -this.ACCELERATION;

    if (this.onTheGround) {
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
  else if (rightPressed && this.player.right < this.game.world.width) {
    // If the RIGHT key is down, set the player velocity to move right
    this.leftFirstPress = false;
    this.player.body.acceleration.x = this.ACCELERATION;

    if (this.onTheGround) {
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
  }

  if (upPressed) {
    jumpMul = Math.min(this.currentJumpMultiplier, this.JUMP_MULTIPLIER_MAX);
    this.player.body.velocity.y = this.JUMP_SPEED;
    this.player.body.velocity.y += this.JUMP_SPEED * jumpMul;
    this.isJumping = true;
    this.jumpMultiplier = this.JUMP_MULTIPLIER;

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
  }
};

BasicGame.Player.prototype.render = function() {
  if (BasicGame.Game.developmentMode === true) {
    // Sprite debug info
    this.game.debug.bodyInfo(this.player, 0, 100, 'rgba(0,255,0,0.4)');
    this.game.debug.body(this.player, 'rgba(0,255,0,0.4)');
  }

  if (BasicGame.Game.developmentMode === true) {
    // clear the bitmap where we are drawing our lines
    this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
  }
};

BasicGame.Player.prototype.leftInputIsActive = function () {
  return this.input.keyboard.isDown(this.leftKey);
};

BasicGame.Player.prototype.rightInputIsActive = function () {
  return this.input.keyboard.isDown(this.rightKey);
};

BasicGame.Player.prototype.upInputIsActive = function (duration) {
  // if (this.input.keyboard.isDown(this.jumpKey) && this.jumpCount === 0) {
    if (this.input.keyboard.downDuration(this.jumpKey, duration) && this.jumpCount === 0) {
      this.jumpCount++;
      return true;
    }

    return false;
  };

/**
 * Method that checks collisions against walls, the ground and collectable pieces
 */
 BasicGame.Player.prototype.checkCollisions = function () {
  this.player.touchingPiece = false;

  if (this.level.hasFloor === true) {
    this.game.physics.arcade.collide(this.player, this.level.ground);
  }

  // check if the player touches a piece
  this.game.physics.arcade.overlap(this.player, this.level.pieces,
    function(player, piece) {
      player.touchingPiece = true;
      piece.body.enable = false;
      piece.alpha = 0;

      (this.piecesSound[this.collectedPieces++]).play();
      if (this.collectedPieces === this.level.pieces.children.length) {
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
            this.gameObj.subtractAllLifes(true);
          }
        }, null, this);
    }
  } else {
    this.game.physics.arcade.collide(this.player, this.level.walls);
  }
};


//Function that checks if  the player is completely in shadows or not
BasicGame.Player.prototype.isInShadow = function () {
  //Trace rays toward the light from each corner of the player sprite.
  //If ALL the rays intersects a wall, then the player is in the shadows
  var lightImage = BasicGame.light.lightGroup.getAt(0);
  var raysToLight = [];
  var offset = 8;
  
  // top left corner
  raysToLight.push(new Phaser.Line(this.player.x + offset,
    this.player.y + offset,
    lightImage.x, lightImage.y));

  // top right corner
  raysToLight.push(new Phaser.Line(this.player.x + this.player.width - offset,
    this.player.y + offset,
    lightImage.x, lightImage.y));

  // bottom right corner
  raysToLight.push(new Phaser.Line(this.player.x + this.player.width - offset,
    this.player.y + this.player.height - offset,
    lightImage.x, lightImage.y));

  // bottom left corner
  raysToLight.push(new Phaser.Line(this.player.x + offset,
    this.player.y + this.player.height - offset,
    lightImage.x,
    lightImage.y));

  if (BasicGame.Game.developmentMode === true) {
    this.drawLinesToLight(lightImage, raysToLight);
  }

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

BasicGame.Player.prototype.drawLinesToLight = function(lightImage, raysToLight) {
  // Draw a line from the eye to the target
  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(raysToLight[0].right, raysToLight[0].bottom);
  this.bitmap.context.lineTo(lightImage.x, lightImage.y);
  this.bitmap.context.stroke();

  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(raysToLight[1].right, raysToLight[1].bottom);
  this.bitmap.context.lineTo(lightImage.x, lightImage.y);
  this.bitmap.context.stroke();

  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(raysToLight[2].right, raysToLight[2].bottom);
  this.bitmap.context.lineTo(lightImage.x, lightImage.y);
  this.bitmap.context.stroke();

  this.bitmap.context.beginPath();
  this.bitmap.context.moveTo(raysToLight[3].right, raysToLight[3].bottom);
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
  this.player.position.set(this.level.initPlayerPos.x, this.level.initPlayerPos.y);
  this.player.body.enable = true;
  this.player.body.allowGravity = true;
  this.dead = false;
};

BasicGame.Player.prototype.explote = function() {
  var timer;

  this.dead = true;

  // stop sounds
  this.slideSound.stop();
  this.jumpSound.stop();
  this.walkSound.stop();
  this.fallSound.stop();

  this.player.body.enable = false;
  this.player.body.acceleration.x = 0;
  this.player.body.velocity.y = 0;
  this.player.body.allowGravity = false;

  timer = this.game.time.create(true);
  timer.add(100, function() {
    this.deathSound.play();
  }, this);
  timer.start();

  this.player.alpha = 0;

  this.particlesGroup.x = this.player.x;
  this.particlesGroup.y = this.player.y;

  this.particlesGroup.forEach(function (particle) {
    particle.x = particle.originalX;
    particle.y = particle.originalY;
    particle.body.allowGravity = true;
    particle.body.velocity.y = -50 * this.gameObj.helper.randomNumber(10, 20);
    if (this.gameObj.helper.randomNumber(1, 10) > 5) {
      particle.body.acceleration.x = -this.gameObj.helper.randomNumber(100, 200);
    }
    else {
      particle.body.acceleration.x = this.gameObj.helper.randomNumber(100, 200);
    }
  }, this);
};

BasicGame.Player.prototype.restartLevel = function () {
  this.collectedPieces = 0;

  this.walkSound.stop();
  this.slideSound.stop();

  this.player.position.set(this.level.initPlayerPos.x, this.level.initPlayerPos.y);

  this.player.animations.play('normal');

  this.player.body.reset(this.player.x, this.player.y);
  this.game.time.create(true)
  .add(100, function () {
    this.player.body.enable = true;
    this.player.body.allowGravity = true;
  }, this)
  .timer.start();
  this.dead = false;
};

BasicGame.Player.prototype.gameInDarkness = function () {
  this.player.alpha = 1;
};