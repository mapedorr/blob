var BasicGame = require('BasicGame');

/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

BasicGame.Player = function (game, input, gameObj) {
  // constants
  this.DIALOGUE_TEXT_MAX_WIDTH = 292;
  this.DIALOGUE_TEXT_H_PADDING = 10;
  this.DIALOGUE_TEXT_V_PADDING = 5;
  this.FADE_SPEED = 300;
  this.DIALOGUE_WIDTH = this.DIALOGUE_TEXT_MAX_WIDTH + this.DIALOGUE_TEXT_H_PADDING * 2;
  this.STRETCH_SQUASH_VALUE = 8;
  this.BASE_SIZE = 32;
  this.HALF_SIZE = this.BASE_SIZE / 2;

  // destroyable objects
  this.playerSprite = null;
  this.particlesGroup = null;
  this.jumpSound = null;
  this.walkSound = null;
  this.slideSound = null;
  this.fallSound = null;
  this.deathSound = null;
  this.pieceSound = null;
  this.dialogueGroup = null;
  this.dialogueBackground = null;
  this.dialogueMark = null;
  this.dialogueText = null;

  // global properties
  this.game = game;
  this.input = input;
  this.gameObj = gameObj;
  this.playerSprite = null;
  this.level = null;
  this.bitmap = null;
  this.collectedPieces = 0;
  this.jumpPressed = false;
  this.currentJumpMultiplier = 0;
  this.jumpChance = false;
  this.walkInAirTimer = null;
  this.fontId = 'font';
  this.dialogueDisplayed = false;
  this.flipDialogue = false;

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
  this.jumpKey1 = Phaser.Keyboard.Z;
  this.jumpKey2 = Phaser.Keyboard.SPACEBAR;

  this.justLeaveGround = false;

  this.jumpSound = null;
  this.walkSound = null;
  this.slideSound = null;
  this.fallSound = null;
  this.deathSound = null;
  // this.piecesSound = [];
  this.pieceSound = null;

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
  this.playerSprite = this.game.add.sprite(this.level.initPlayerPos.x + this.HALF_SIZE,
    this.level.initPlayerPos.y + this.BASE_SIZE,
    'player');
  this.playerSprite.anchor.setTo(0.5, 1);

  // configure the player animations
  this.playerSprite.animations.add('normal', [0], 1, false);
  this.playerSprite.animations.add('dying', null, 70, false);

  //Enable physics on the player
  this.game.physics.arcade.enable(this.playerSprite);

  //Set player minimum and maximum movement speed
  this.playerSprite.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 20); // x, y

  //Since we're jumping we need gravity
  this.game.physics.arcade.gravity.y = this.GRAVITY;

  //Capture certain keys to prevent their default actions in the browser.
  //This is only necessary because this is an HTML5 game. Games on other
  //platforms may not need code like this.
  this.game.input.keyboard.addKeyCapture([
    this.leftKey,
    this.rightKey,
    this.jumpKey1,
    this.jumpKey2
  ]);

  // disable physics in the player's body while the game starts
  this.playerSprite.body.enable = false;

  // create a bitmap texture for drawing lines
  if (BasicGame.Game.developmentMode === true) { // [ development mode ]
    this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bitmap.context.fillStyle = 'rgb(0, 0, 255)';
    this.bitmap.context.strokeStyle = 'rgb(0, 0, 255)';
    this.game.add.image(0, 0, this.bitmap);
  }

  if (!this.jumpSound) {
    this.jumpSound = this.game.add.sound('jump', 0.2);
    this.jumpSound.onPlay.add(function () {
      this.slideSound.stop();
    }, this);
  }

  if (!this.walkSound) {
    this.walkSound = this.game.add.sound('walk', 0.1);
    this.walkSound.onPlay.add(function () {
      this.slideSound.stop();
    }, this);
    this.walkSound.onStop.add(function () {
      if (this.onGround === true) {
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
    this.deathSound.onPlay.add(function () {
      this.slideSound.stop();
    }, this);
  }

  // load the audio for pieces
  if (!this.pieceSound) {
    this.pieceSound = this.game.add.sound('piece', 0.2);
  }
  // if (!this.piecesSound || this.piecesSound.length === 0) {
  //   for(var i = 1; i <= 20; i++) {
  //     this.piecesSound.push(this.game.add.sound('piece' + ((i < 10) ? '0' : '') + i, 0.2));
  //   }
  // }

  // create the group that will contain the particles that will be used during
  // player death
  this.particlesGroup = this.game.add.group();

  particleX = 0;
  particleY = 0;
  increaseAmount = this.playerSprite.width / this.PARTICLES_AMOUNT;

  while (this.particlesGroup.children.length < Math.pow(this.PARTICLES_AMOUNT, 2)) {
    particle = this.game.add.sprite(particleX, particleY, 'player');
    // particle.tint = this.gameObj.helper.randomColor();
    particle.width = particle.height = increaseAmount;
    particle.originalX = particle.x;
    particle.originalY = particle.y;

    this.game.physics.arcade.enable(particle);
    particle.body.allowGravity = false;

    this.particlesGroup.addChild(particle);

    particleX += particle.width;
    if (particleX >= this.playerSprite.width) {
      particleX = 0;
      particleY += particle.height;
    }
  }

  this.particlesGroup.x = -100;
  this.particlesGroup.y = -100;

  // ═ dialogue ═══════════════════════════════════════════════════════════════╗
  this.dialogueGroup = this.game.add.group();

  this.dialogueBackground = this.game.add.image(0, 0, 'dialogue_background', 0, this.dialogueGroup);
  this.dialogueBackground.width = this.DIALOGUE_WIDTH;
  this.dialogueBackground.height = this.DIALOGUE_TEXT_V_PADDING * 2;

  this.dialogueMark = this.game.add.image(0, 0, 'dialogue_mark', 0, this.dialogueGroup);
  this.dialogueMark.y = this.dialogueBackground.height + 8;

  // create the bitmap for the day phrase
  this.dialogueText = this.game.add.bitmapText(0, 0, this.fontId, '', 18, this.dialogueGroup);
  this.dialogueText.x = this.DIALOGUE_TEXT_H_PADDING;
  this.dialogueText.y = this.DIALOGUE_TEXT_V_PADDING;
  this.dialogueText.maxWidth = this.DIALOGUE_TEXT_MAX_WIDTH;
  this.dialogueText.tint = 0x161a1e;

  this.dialogueGroup.alpha = 0;
  // ══════════════════════════════════════════════════════════════════════════╝
};

BasicGame.Player.prototype.update = function () {
  var leftPressed = false;
  var rightPressed = false;
  var upPressed = false;
  var onRightWall = false;
  var onLeftWall = false;
  var headHit = false;
  var jumpMul = 0;

  // update the position of the dialogue bubble based on the player's position
  this.placeDialogueGroup();

  this.game.physics.arcade.isPaused = this.gameObj.isLoadingLevel;
  if (this.gameObj.isLoadingLevel) {
    this.playerSprite.body.velocity.y = 0;
    return;
  }

  if (this.gameObj.isLoadingLevel === true || this.dead === true) {
    if (this.dead === true) {
      this.playerSprite.body.acceleration.x = 0;

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

  if (this.playerSprite.top > this.game.world.height) {
    this.dead = true;
    this.playerSprite.body.velocity.y = 0;
    this.playerSprite.body.allowGravity = false;
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

  if (this.dialogueDisplayed === true && (leftPressed || rightPressed || upPressed)) {
    // if the player is moving and the dialogue box is visible, start the timer
    // to fade it out
    this.gameObj.helper.timer(this.waitTime, this.hideDialogue, this);
  }

  if (this.playerSprite.touchingPiece === false) {
    this.onGround = this.playerSprite.body.touching.down === true;
    onRightWall = this.playerSprite.body.touching.right === true && this.playerSprite.body.velocity.y > -500;
    onLeftWall = this.playerSprite.body.touching.left === true && this.playerSprite.body.velocity.y > -500;
    headHit = this.playerSprite.body.touching.up === true && this.onGround === false;
  }

  if (this.onGround || onRightWall || onLeftWall) {
    this.jumpCount = 0;
  }

  // reset some values to default if the player is touching the ground
  if (this.onGround) {
    this.onGroundFeedback();
  }
  else {
    this.walkSound.stop();
    this.slideSound.stop();

    // check if the character just left the ground
    if (this.justLeaveGround === false && this.playerSprite.body.velocity.y > 0) {
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
    this.onWallFeedback();
    this.playerSprite.body.velocity.y = this.SLID_SPEED;

    this.currentJumpMultiplier = 0;
    this.jumpChance = false;
  }

  if (leftPressed && this.playerSprite.left > 0) {
    // set the player velocity to move left
    this.rightFirstPress = false;
    this.playerSprite.body.acceleration.x = -this.ACCELERATION;

    if (this.onGround) {
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
        this.playerSprite.body.acceleration.x = this.ACCELERATION_WALL;
        this.playerSprite.body.velocity.y = this.JUMP_SPEED_WALL;

        this.jumpFeedback();
      }
    }
  }
  else if (rightPressed && this.playerSprite.right < this.game.world.width) {
    // If the RIGHT key is down, set the player velocity to move right
    this.leftFirstPress = false;
    this.playerSprite.body.acceleration.x = this.ACCELERATION;

    if (this.onGround) {
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
        this.playerSprite.body.acceleration.x = -this.ACCELERATION_WALL;
        this.playerSprite.body.velocity.y = this.JUMP_SPEED_WALL;

        this.jumpFeedback();
      }
    }
  }
  else {
    // not moving in X direction
    this.leftFirstPress = this.rightFirstPress = false;
    this.playerSprite.body.acceleration.x = 0;
    this.playerSprite.body.velocity.x = 0;
    this.currentJumpMultiplier = 0;
    this.walkSound.stop();
    this.slideSound.stop();
  }

  if (upPressed) {
    jumpMul = Math.min(this.currentJumpMultiplier, this.JUMP_MULTIPLIER_MAX);
    this.playerSprite.body.velocity.y = this.JUMP_SPEED;
    this.playerSprite.body.velocity.y += this.JUMP_SPEED * jumpMul;
    this.jumpMultiplier = this.JUMP_MULTIPLIER;

    // jump jump jump
    if (!this.isJumping) {
      this.jumpFeedback();
    }
  }

  // sprite out of the bounds of the game world
  if (this.playerSprite.left < 0) this.playerSprite.left = 0;
  if (this.playerSprite.right > this.game.world.width) this.playerSprite.left = this.game.world.width - this.playerSprite.width;

  // make the jump a bit higher if the player keeps pressing the jump button
  // if (this.input.keyboard.downDuration(this.jumpKey1, this.JUMP_TIME) === true ||
  //     this.input.keyboard.downDuration(this.jumpKey2, this.JUMP_TIME)
  // ) {
  //   this.playerSprite.body.velocity.y += this.JUMP_SPEED * 0.1 * this.jumpMultiplier;
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

  if (BasicGame.Game.developmentMode === true) { // [ development mode ]
    this.bitmap.dirty = true;
  }
};

BasicGame.Player.prototype.render = function () {
  if (BasicGame.Game.developmentMode === true) { // [ development mode ]
    // Sprite debug info
    this.game.debug.bodyInfo(this.playerSprite, 0, 100, 'rgba(0,255,0,0.4)');
    this.game.debug.body(this.playerSprite, 'rgba(0,255,0,0.4)');
  }

  if (BasicGame.Game.developmentMode === true) { // [ development mode ]
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
  if ((this.input.keyboard.downDuration(this.jumpKey1, duration) ||
    this.input.keyboard.downDuration(this.jumpKey2, duration)) && this.jumpCount === 0) {
    this.jumpCount++;
    return true;
  }

  return false;
};

BasicGame.Player.prototype.onGroundFeedback = function () {
  var squashTween = null;
  if (this.justLeaveGround === true && !this.squashTweenPlaying) {
    squashTween = this.game.add.tween(this.playerSprite);
    squashTween.to({
      width: this.BASE_SIZE + this.STRETCH_SQUASH_VALUE,
      height: this.BASE_SIZE - this.STRETCH_SQUASH_VALUE
    }, 150, Phaser.Easing.Exponential.Out);
    squashTween.onComplete.add(function () {
      this.playBaseSizeTween();
      this.squashTweenPlaying = false;
    }, this);
    squashTween.start();
    this.squashTweenPlaying = true;
  }

  this.isFalling = false;
  this.isJumping = false;

  if (this.justLeaveGround === true) {
    this.fallSound.play();
  }

  this.justLeaveGround = false;
};

BasicGame.Player.prototype.onWallFeedback = function () {
  this.playBaseSizeTween();
  if (!this.slideSound.isPlaying) this.slideSound.play();
};

BasicGame.Player.prototype.playBaseSizeTween = function () {
  var baseSizeTween = null;
  if (this.playerSprite.width !== this.BASE_SIZE && !this.baseSizeTweenPlaying) {
    baseSizeTween = this.game.add.tween(this.playerSprite);
    baseSizeTween.to({
      width: this.BASE_SIZE,
      height: this.BASE_SIZE
    }, 150, Phaser.Easing.Exponential.Out);
    baseSizeTween.onComplete.add(function () {
      this.playerSprite.width = this.BASE_SIZE;
      this.playerSprite.height = this.BASE_SIZE;
      this.baseSizeTweenPlaying = false;
    }, this);
    baseSizeTween.start();
    this.baseSizeTweenPlaying = true;
  }
};

BasicGame.Player.prototype.jumpFeedback = function () {
  // jump jump jump
  var stretchTween = this.game.add.tween(this.playerSprite);
  stretchTween.to({
    width: this.BASE_SIZE - this.STRETCH_SQUASH_VALUE,
    height: this.BASE_SIZE + this.STRETCH_SQUASH_VALUE
  }, 200, Phaser.Easing.Exponential.Out);
  stretchTween.start();
  this.isJumping = true;
  this.currentJumpMultiplier = 0;
  if (!this.jumpSound.isPlaying) {
    this.jumpSound.play();
  }
};

/**
 * Method that checks collisions against walls, the ground and collectable pieces
 */
BasicGame.Player.prototype.checkCollisions = function () {
  this.playerSprite.touchingPiece = false;

  if (this.level.hasFloor === true) {
    this.game.physics.arcade.collide(this.playerSprite, this.level.ground);
  }

  // check if the player touches a piece
  this.game.physics.arcade.overlap(this.playerSprite, this.level.pieces,
    function (player, piece) {
      player.touchingPiece = true;
      piece.body.enable = false;
      piece.alpha = 0;

      // (this.piecesSound[this.collectedPieces++]).play();
      this.collectedPieces++;
      this.pieceSound.play();

      if (this.collectedPieces === this.level.pieces.children.length) {
        // the level has been finished
        this.level.endLevel();
      }
    },
    null,
    this);

  if (this.level.hasSpikes === true) {
    this.game.physics.arcade.collide(this.playerSprite, this.level.walls,
      function (player, spikePlatform) {
        if (spikePlatform.spikeRef && spikePlatform.spikeRef.isHidden === true) {
          if (this.gameObj.level.spikeSound.isPlaying === false) {
            this.gameObj.level.spikeSound.play();
          }
          spikePlatform.spikeRef.showTween.start();
        }
      }, null, this);

    if (this.level.spikes.openedSpikes > 0) {
      this.game.physics.arcade.overlap(this.playerSprite, this.level.spikes,
        function (player, spike) {
          if (this.dead === false) {
            this.gameObj.subtractAllLifes(true);
          }
        }, null, this);
    }
  } else {
    this.game.physics.arcade.collide(this.playerSprite, this.level.walls);
  }
};


//Function that checks if  the player is completely in shadows or not
BasicGame.Player.prototype.isInShadow = function (checkLeft, checkRight) {
  //Trace rays toward the light from each corner of the player sprite.
  //If ALL the rays intersects a wall, then the player is in the shadows
  var lightImage = BasicGame.light.lightGroup.getAt(0);
  var raysToLight = [];
  var offset = 8;

  if (checkLeft === true) {
    // top left corner
    raysToLight.push(new Phaser.Line(this.playerSprite.left + offset,
      this.playerSprite.top + offset,
      lightImage.x,
      lightImage.y));

    // bottom left corner
    raysToLight.push(new Phaser.Line(this.playerSprite.left + offset,
      this.playerSprite.top + this.playerSprite.height - offset,
      lightImage.x,
      lightImage.y));
  }

  if (checkRight === true) {
    // top right corner
    raysToLight.push(new Phaser.Line(this.playerSprite.left + this.playerSprite.width - offset,
      this.playerSprite.top + offset,
      lightImage.x, lightImage.y));

    // bottom right corner
    raysToLight.push(new Phaser.Line(this.playerSprite.left + this.playerSprite.width - offset,
      this.playerSprite.top + this.playerSprite.height - offset,
      lightImage.x, lightImage.y));
  }

  if (BasicGame.Game.developmentMode === true) {
    // [ development mode ]
    this.drawLinesToLight(lightImage, raysToLight);
  }

  // Test if any walls intersect the ray
  return this.allRaysIntersectWall(raysToLight);
};

BasicGame.Player.prototype.allRaysIntersectWall = function (rays) {
  // check intersections for each ray
  // (!) if at least one ray has no intersection with a wall, then the player isn't in shadow
  var hiddenRays = 0;
  rays.forEach(function (ray) {
    var intersect = null;

    //for each of the walls...
    this.level.walls.forEach(function (wall) {
      if (!intersect) {
        // create an array of lines that represent the four edges of each wall
        var lines = [
          new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
          new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
          new Phaser.Line(wall.x + wall.width, wall.y, wall.x + wall.width, wall.y + wall.height),
          new Phaser.Line(wall.x, wall.y + wall.height, wall.x + wall.width, wall.y + wall.height)
        ];

        // test each of the edges in the wall against the ray from the player to the light
        for (var i = 0; i < lines.length; i++) {
          intersect = Phaser.Line.intersects(ray, lines[i]);
          if (intersect) {
            // if there is an intersect, the wall must be in the way
            break;
          }
        }
      }
    }, this);

    if (intersect) {
      // this edge is hidden. :D
      hiddenRays++;
    }
  }, this);

  return (hiddenRays === rays.length);
};

BasicGame.Player.prototype.drawLinesToLight = function (lightImage, raysToLight) {
  // draw a line from the light to the targets
  for (var i = 0; i < raysToLight.length; i++) {
    this.bitmap.context.beginPath();
    this.bitmap.context.moveTo(raysToLight[i].start.x, raysToLight[i].start.y);
    this.bitmap.context.lineTo(lightImage.x, lightImage.y);
    this.bitmap.context.stroke();
  }
};

BasicGame.Player.prototype.updateLevel = function (level) {
  this.collectedPieces = 0;
  this.playerSprite.body.reset(this.playerSprite.x, this.playerSprite.y);
  this.playerSprite.body.enable = false;
  this.level = level;
  this.justLeaveGround = false;
  this.slideSound.stop();
  this.playerSprite.position.set(this.level.initPlayerPos.x, this.level.initPlayerPos.y);
  this.playerSprite.body.enable = true;
  this.playerSprite.body.allowGravity = true;
  this.dead = false;
};

BasicGame.Player.prototype.explote = function () {
  var timer;

  this.dead = true;

  // stop sounds
  this.slideSound.stop();
  this.jumpSound.stop();
  this.walkSound.stop();
  this.fallSound.stop();

  this.playerSprite.body.enable = false;
  this.playerSprite.body.acceleration.x = 0;
  this.playerSprite.body.velocity.y = 0;
  this.playerSprite.body.allowGravity = false;

  timer = this.game.time.create(true);
  timer.add(100, function () {
    this.deathSound.play();
  }, this);
  timer.start();

  this.playerSprite.alpha = 0;

  this.particlesGroup.x = this.playerSprite.x;
  this.particlesGroup.y = this.playerSprite.y;

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

  this.playerSprite.position.set(this.level.initPlayerPos.x, this.level.initPlayerPos.y);

  this.playerSprite.animations.play('normal');

  this.playerSprite.body.reset(this.playerSprite.x, this.playerSprite.y);
  this.game.time.create(true)
    .add(100, function () {
      this.playerSprite.body.enable = true;
      this.playerSprite.body.allowGravity = true;
    }, this)
    .timer.start();
  this.dead = false;
};

BasicGame.Player.prototype.gameInDarkness = function () {
  this.playerSprite.alpha = 1;
};

BasicGame.Player.prototype.placeDialogueGroup = function () {
  // this.dialogueGroup.x = this.playerSprite.centerX - this.dialogueGroup.width;
  if (this.flipDialogue === true) {
    this.dialogueGroup.x = this.playerSprite.centerX - this.dialogueGroup.width + 16;
  }
  else {
    this.dialogueGroup.x = this.playerSprite.centerX;
  }
  this.dialogueGroup.y = this.playerSprite.top - this.dialogueGroup.height - 6.8;
};

BasicGame.Player.prototype.showDialogue = function () {
  var dayObj = this.gameObj.days.getDay(BasicGame.currentLevel);
  var displayTween = null;
  var dialogueHeight = 0;

  if (dayObj.text) {
    this.waitTime = dayObj.waitTime * 1000;
    this.dialogueText.setText(dayObj.text[BasicGame.language]);
    this.dialogueBackground.height = this.dialogueText.textHeight + this.DIALOGUE_TEXT_V_PADDING * 2;
    this.dialogueMark.y = this.dialogueBackground.height + 8;
    dialogueHeight = this.dialogueGroup.height;
    this.game.world.bringToTop(this.dialogueGroup);

    if (this.DIALOGUE_WIDTH + this.playerSprite.centerX > this.game.width) {
      this.flipDialogue = true;
      this.dialogueMark.x = this.DIALOGUE_WIDTH - 18;
    }
    else {
      this.flipDialogue = false;
      this.dialogueMark.x = 0;
    }

    this.dialogueGroup.alpha = 0;
    this.dialogueGroup.width = 0;
    this.dialogueGroup.height = 0;
    displayTween = this.game.add.tween(this.dialogueGroup);
    displayTween.to({
      alpha: 1,
      width: this.DIALOGUE_WIDTH,
      height: dialogueHeight
    }, this.FADE_SPEED, Phaser.Easing.Exponential.Out);
    displayTween.onComplete.add(function () {
      this.dialogueDisplayed = true;
    }, this);
    displayTween.start();
  }
};

BasicGame.Player.prototype.hideDialogue = function () {
  var displayTween = this.game.add.tween(this.dialogueGroup);
  displayTween.to({
    alpha: 0
  }, this.FADE_SPEED, Phaser.Easing.Cubic.Out);
  displayTween.onComplete.add(function () {
    this.dialogueDisplayed = false;
    this.dialogueGroup.width = 0;
    this.dialogueGroup.height = 0;
  }, this);
  displayTween.start();
};

// ╔═══════════════════════════════════════════════════════════════════════════╗
BasicGame.Player.prototype.shutdown = function () {
  this.playerSprite.destroy();
  this.particlesGroup.destroy();
  this.jumpSound.destroy();
  this.walkSound.destroy();
  this.slideSound.destroy();
  this.fallSound.destroy();
  this.deathSound.destroy();
  this.pieceSound.destroy();
};
// ╚═══════════════════════════════════════════════════════════════════════════╝