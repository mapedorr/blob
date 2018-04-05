var BasicGame = require('BasicGame');

/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Method that set the default values for the properties of the Eye object.
 * 
 * @param {Object} game    The Object of Phaser game
 * @param {Object} gameObj The Object of BasicGame.Game
 */
BasicGame.Eye = function (game, gameObj) {
  // constants
  this.ZONE_SIZE = game.world.width / 3;
  // X radius >> horizontal half-size of the eyelid fill
  this.LATERAL_CANTHUS_DISTANCE = (191 / 2) * 0.9;
  // Y radius >> vertical half-size of the eyelid fill
  this.LOWER_EYELID_DISTANCE = (96 / 2) * 0.9;
  this.RESTART_SEARCH_DELAY = 1200;
  // (!) define the patterns for the EYE
  // each pattern is formed by a series of steps, each steps defines:
  // a start position (sp), an end position (ep) and a movement time (mt)
  //   [
  //     p1[step1[sp, ep, mt], step2[sp, ep, mt]...stepX[sp, ep, mt]],
  //     p2[step1[sp, ep, mt], step2[sp, ep, mt]...stepX[sp, ep, mt]],
  //     ...
  //     pY[step1[sp, ep, mt], step2[sp, ep, mt]...stepX[sp, ep, mt]],
  //   ]
  this.PATTERNS = [
    [[0, 3, 1], [3, 6, 2], [6, 0, 1]], // this will be always the first pattern
    [[0, 1, 0.5], [1, 4, 1], [4, 2, 1], [2, 5, 2], [5, 0, 1]],
    [[0, 3, 0.2], [3, 6, 0.4], [6, 0, 0.2]],
    [[0, 4, 0.5], [4, 1, 1], [1, 5, 1], [5, 2, 2], [2, 0, 1]]
  ];

  // destroyable objects
  this.eye = null;
  this.viewZone = null;
  this.pupil = null;
  this.bitmap = null;
  this.laughSound = null;
  this.angerSound = null;
  this.viewZoneMovementTween = null;
  this.pupilMovementTween = null;

  // global properties
  this.game = game;
  this.gameObj = gameObj;
  this.anger = null;
  this.shooting = null;
  this.searching = null;
  this.levelEnded = null;
  this.currentPatternId = -1;
  this.usedPatterns = 0;
  this.movementTime = null;
  this.xDistanceMax = null;
  this.eyeCenterYOffset = null;
  this.currentPatternCompleted = true;

  // things I can take from this.game ═╗
  this.playerObj = null;
  this.level = null;
  this.lightning = null;
  // ╚═════════════════════════════════╝
};

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ PHASER STATE METHODS                                                     ║
BasicGame.Eye.prototype.create = function (playerObj, level, lightning) {
  // set the default values for some properties
  this.playerObj = playerObj;
  this.level = level;
  this.lightning = lightning;

  // add the sprite of the eye
  this.eye = this.game.add.sprite(this.game.world.width / 2, 84, 'eye', 0);
  this.eye.originalX = this.eye.x;
  this.eye.originalY = this.eye.y;
  this.eye.anchor.setTo(0.5, 0.5);

  // add the  sprite of the pupil
  this.pupil = this.game.add.image(this.eye.x, this.eye.y + 25, 'pupil');
  this.pupil.anchor.setTo(0.5, 0.5);

  // create the mask for the pupil
  var mask = this.game.add.graphics(this.eye.x - 95.77, this.eye.y);
  mask.beginFill(0xff0000);
  mask.bezierCurveTo(0, 1, 90, 111, 193, 0);
  mask.bezierCurveTo(193, 0, 110, -106, 0, -1);
  this.pupil.mask = mask;

  // create the array of key positions for the pupil (this will be linked to
  // the position of the view zone)
  this.pupilImagePositions = {
    '3': this.eye.centerX - this.LATERAL_CANTHUS_DISTANCE / 1.4,
    '2': this.eye.centerX - this.LATERAL_CANTHUS_DISTANCE / 2.4,
    '1': this.eye.centerX - this.LATERAL_CANTHUS_DISTANCE / 4.4,
    '0': this.eye.centerX,
    '4': this.eye.centerX + this.LATERAL_CANTHUS_DISTANCE / 4.4,
    '5': this.eye.centerX + this.LATERAL_CANTHUS_DISTANCE / 2.4,
    '6': this.eye.centerX + this.LATERAL_CANTHUS_DISTANCE / 1.4
  };

  // create the view zones
  this.viewZone = this.game.add.image(this.eye.position.x - this.ZONE_SIZE / 2, 0, 'view_zone');
  this.viewZone.alpha = 0;

  // calculate and store the key positions of the view zone
  var zoneDiv = this.ZONE_SIZE / 3;
  this.viewZone.positions = {
    '3': 0,
    '2': zoneDiv,
    '1': zoneDiv * 2,
    '0': this.viewZone.position.x,
    '4': this.viewZone.position.x + zoneDiv,
    '5': this.viewZone.position.x + zoneDiv * 2,
    '6': this.game.world.width - this.ZONE_SIZE
  };

  // create a bitmap texture for drawing lines
  if (BasicGame.Game.developmentMode === true) { // [ development mode ]
    this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
    this.game.add.image(0, 0, this.bitmap);
  }

  // create the lightning for killing the player
  this.lightning.create(this.eye, this.playerObj, this.level);
  this.lightningTimer = 0;

  // ---------------------------------------------------------------------------
  // setup the sounds
  if (!this.laughSound) {
    this.laughSound = this.game.add.sound('eye', 0.1);
  }

  if (!this.angerSound) {
    this.angerSound = this.game.add.sound('eye-anger', 0.8);
  }

  // ---------------------------------------------------------------------------
  // set global properties
  this.shooting = false;
  this.searching = false;
  this.levelEnded = false;
  this.usedPatterns = 0;
  this.anger = false;
  this.xDistanceMax = Math.abs((this.pupilImagePositions['6']) - this.eye.centerX);
  this.eyeCenterYOffset = this.eye.centerY - 40;
};

BasicGame.Eye.prototype.update = function () {
  var checkLeft = false;
  var checkRight = false;
  var canSeePlayer = false;

  this.gameObj.light.lightGroup.children[0].x = this.pupil.x;
  this.gameObj.light.lightGroup.children[0].y = this.pupil.y;

  if (BasicGame.Game.developmentMode === true) { // [ development mode ]
    // clear the bitmap where we are drawing our lines
    this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
  }

  if (this.levelEnded === true) {
    // the player is dead
    return;
  }

  if (this.gameObj.isLoadingLevel === true) {
    this.eye.frame = 0;
    this.pupil.x = this.pupilImagePositions['0'];
    return;
  }

  // ---------------------------------------------------------------------------
  // ray casting

  // test if the target can see the eye by casting a ray (a line) towards the eye.
  // if the ray intersects any walls before it intersects the eye then the wall
  // is in the way.
  canSeePlayer = this.isPlayerInsideViewZone();

  if (BasicGame.Game.developmentMode === true) { // [ development mode ]
    if (canSeePlayer === true) {
      this.playerObj.playerSprite.tint = 0x990000;
    }
    else {
      this.playerObj.playerSprite.tint = 0xFFFFFF;
    }
  }

  // check if the player is in the side of vision of the EYE
  if (this.searching === true && canSeePlayer === true) {
    // check which of the points in the player should be used for "in shadow"
    // evaluation
    if (this.playerObj.playerSprite.left > this.viewZone.left) {
      checkLeft = true;
    }

    if (this.playerObj.playerSprite.right < this.viewZone.right) {
      checkRight = true;
    }

    if (this.playerObj.isInShadow(checkLeft, checkRight) === false) {
      if (BasicGame.Game.developmentMode === true) { // [ development mode ]
        // red, of dead
        this.playerObj.playerSprite.tint = 0xFF0000;
      }

      // shoot to the player
      if (this.shooting === false) {
        this.shootPlayer(this.playerObj.playerSprite);
      }
    }
    else {
      if (BasicGame.Game.developmentMode === true) { // [ development mode ]
        // blue, of nor dead
        this.playerObj.playerSprite.tint = 0x00FFFF;
      }
    }
  }

  // This just tells the engine it should update the texture cache
  if (BasicGame.Game.developmentMode === true) { // [ development mode ]
    this.bitmap.dirty = true;
  }
};

BasicGame.Eye.prototype.shutdown = function () {
  this.viewZone.destroy();
  this.pupil.destroy();
  this.eye.destroy();
  this.bitmap.destroy();
  this.viewZoneMovementTween.stop();
  this.pupilMovementTween.stop();
  this.laughSound.destroy();
  this.angerSound.destroy();
};
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

/**
 * Method that checks if the player is inside the view zone of the EYE.
 */
BasicGame.Eye.prototype.isPlayerInsideViewZone = function () {
  if (this.viewZone.alpha > 0) {
    if ((this.playerObj.playerSprite.right >= this.viewZone.left + this.playerObj.playerSprite.width) &&
      this.playerObj.playerSprite.right < this.viewZone.right) {
      return true;
    }

    if (this.playerObj.playerSprite.left > this.viewZone.left &&
      (this.playerObj.playerSprite.left <= this.viewZone.right - this.playerObj.playerSprite.width)) {
      return true;
    }
  }
  return false;
};

/**
 * Method that define the pattern for seeking the player, setup and plays the
 * tweens for both the pupil and the view zone.
 * 
 * @param  {boolean} delay Defines if the seeking should be wait a while before
 *                         starting
 */
BasicGame.Eye.prototype.initSearch = function (delay) {
  if (this.levelEnded === true) {
    return;
  }

  // check if it is necessary to wait before starting the search
  if (delay) {
    this.gameObj.helper.timer(delay,
      function () {
        this.initSearch();
      },
      this);
    return;
  }

  // play the search animation in the EYE's sprite
  this.eye.frame = 0;

  // set the flag that indicates if the EYE is seeking for the player
  this.searching = true;
  this.shooting = false;

  // pick a pattern to start the search
  if (this.currentPatternCompleted === true) {
    this.setPattern();
  }
  else {
    this.viewZone.alpha = 1;
    this.pupil.alpha = 1;

    this.nextStepInPattern(100);
  }

};

BasicGame.Eye.prototype.stopSearch = function () {
  this.viewZoneMovementTween.stop();
  this.pupilMovementTween.stop();
  this.searching = false;
};

BasicGame.Eye.prototype.setPattern = function () {
  var intent = 0;
  var newPatternIndex = 0;

  // set the defaults for the pupil and the view zone
  this.viewZone.x = this.viewZone.positions['0'];
  this.viewZone.alpha = 1;
  this.pupil.x = this.pupilImagePositions['0'];
  this.pupil.alpha = 1;

  this.lap = 0;
  this.currentPatternCompleted = false;

  // define if the pattern will be used reversed
  this.patternReversed = Math.random() > 0.5 ? true : false;

  if (this.usedPatterns === 0) {
    this.currentPatternIdIndex = 0;
    this.currentPatternId = this.currentPatternIdIndex;

    // at level start, init the search in the opposite direction of player's spawn
    // position (player on left then this.patternReversed equals true)
    this.patternReversed = this.gameObj.player.playerSprite.centerX <= this.eye.centerX;
  }
  else if (this.usedPatterns === 1) {
    this.currentPatternIdIndex = this.gameObj.helper.randomNumber(0, this.PATTERNS.length);
    this.currentPatternId = this.currentPatternIdIndex;
  }
  else {
    // pick the next pattern
    if (++this.currentPatternIdIndex >= this.PATTERNS.length) {
      this.currentPatternIdIndex = 0;
    }

    this.currentPatternId = this.currentPatternIdIndex;
  }
  this.usedPatterns++;

  this.pattern = this.PATTERNS[this.currentPatternId];

  // get the index of the initial step of the pattern
  this.currentPatternStep = !this.patternReversed ? 0 : this.pattern.length - 1;
  this.iteratePattern();
};

BasicGame.Eye.prototype.iteratePattern = function () {
  var initPosition = -1;
  var targetPosition = -1;
  var currentPattern = this.pattern[this.currentPatternStep];

  // iterate over the steps of the pattern and make the EYE move to each
  // position of it
  if ((!this.patternReversed && this.currentPatternStep < this.pattern.length) ||
    (this.patternReversed && this.currentPatternStep >= 0)) {
    if (!this.patternReversed) {
      initPosition = currentPattern[0];
      targetPosition = currentPattern[1];
    }
    else {
      initPosition = currentPattern[1];
      targetPosition = currentPattern[0];
    }

    // set the initial X position of the EYE and the view zone
    this.viewZone.x = this.viewZone.positions[initPosition];
    this.pupil.x = this.pupilImagePositions[initPosition];
    this.movementTime = currentPattern[2] * 1000;

    this.runPupilViewZoneTweens(targetPosition);
  }
  else {
    // if there are no more steps in the pattern
    if (++this.lap < 2) {
      this.gameObj.helper.timer(1000,
        function () {
          this.currentPatternStep = !this.patternReversed ? 0 : this.pattern.length - 1;
          this.iteratePattern();
        },
        this);
    }
    else {
      this.currentPatternCompleted = true;
      // if the pattern was used twice, change it
      if (this.shooting === true) {
        // this is triggered when the player enters the view zone while the
        // eye is looking to the front before getting tired
        return;
      }

      if (this.viewZoneMovementTween &&
        this.viewZoneMovementTween.isRunning) {
      }

      this.searching = false;
      this.getTired();
    }
  }
};

BasicGame.Eye.prototype.runPupilViewZoneTweens = function (targetPosition) {
  // move the view zone and the pupil
  if (this.viewZoneMovementTween && this.viewZoneMovementTween.isRunning) {
    return;
  }

  this.pupilMovementTween = this.game.add.tween(this.pupil);
  this.pupilMovementTween.to({
    x: this.pupilImagePositions[targetPosition]
  }, this.movementTime);
  this.pupilMovementTween.onUpdateCallback(function () {
    var dx = Math.abs(this.pupil.x - this.eye.centerX);
    var xDiffPercentage = 1 - dx / this.xDistanceMax;
    var dy = (this.eye.centerY + (this.LOWER_EYELID_DISTANCE * xDiffPercentage)) - this.eyeCenterYOffset;
    var c = Math.sqrt((dx * dx) + (dy * dy));
    var alfa = Math.asin(dy / c);
    this.pupil.y = (Math.sin(alfa) * this.LOWER_EYELID_DISTANCE) + this.eye.centerY;
  }, this);
  this.pupilMovementTween.start();

  this.viewZoneMovementTween = this.game.add.tween(this.viewZone);
  this.viewZoneMovementTween.to({
    x: this.viewZone.positions[targetPosition]
  }, this.movementTime);
  this.viewZoneMovementTween.onComplete.addOnce(function () {
    if (this.shooting === false) {
      this.nextStepInPattern();

      this.viewZoneMovementTween = null;
      this.pupilMovementTween = null;
    }
  }, this);
  this.viewZoneMovementTween.start();
};

BasicGame.Eye.prototype.nextStepInPattern = function (delay) {
  // wait a second before changing to a new pattern
  this.gameObj.helper.timer(delay || 1000, function () {
    if (this.levelEnded === true || this.shooting === true) {
      return;
    }

    if (!this.patternReversed) {
      ++this.currentPatternStep;
    }
    else {
      --this.currentPatternStep;
    }

    this.iteratePattern();
  }, this);
};

BasicGame.Eye.prototype.shootPlayer = function (target) {
  var tweensInPause = false;


  this.shooting = true;
  this.searching = false;
  this.eye.frame = 2; // angry eye
  this.lightning.shoot(target);

  // hide the pupil while shooting
  this.pupil.alpha = 0;
  this.viewZone.alpha = 0;

  // pause the current tweens, if any, for the pupil and the viewzone
  if (this.viewZoneMovementTween && this.viewZoneMovementTween.isRunning === true) {
    this.viewZoneMovementTween.pause();
    this.pupilMovementTween.pause();

    tweensInPause = true;
  }

  this.destroyTimers(this.getTiredTimer, this.getMadTimer, this.searchAgain);

  // init the timer that will make the EYE calm down again and restart the
  // search
  this.calmDownTimer = this.game.time.create(true);
  this.calmDownTimer.add(3000,
    function () {
      if (tweensInPause === true) {
        this.eye.frame = 0;

        this.pupil.alpha = 1;
        this.viewZone.alpha = 1;

        this.searching = true;
        this.shooting = false;

        if (this.viewZoneMovementTween && this.pupilMovementTween) {
          this.viewZoneMovementTween.resume();
          this.pupilMovementTween.resume();
        }
      }
      else {

        if (this.viewZoneMovementTween) {
          this.viewZoneMovementTween.stop();
          this.pupilMovementTween.stop();
        }

        this.initSearch();
      }
    },
    this);
  this.calmDownTimer.start();
};

BasicGame.Eye.prototype.levelStart = function () {
  this.levelEnded = false;
  this.shooting = false;
  this.usedPatterns = 0;
  this.currentPatternCompleted = true;
  this.destroyTimers();

  this.initSearch();
};

BasicGame.Eye.prototype.levelEndedEvent = function (levelCompleted) {
  // this event is called when the level has been ended and all is in darkness (saving progress... message)
  if (this.levelEnded === true) {
    return;
  }

  this.levelEnded = true;
  this.searching = false;
  this.shooting = false;
  this.usedPatterns = 0
  this.currentPatternCompleted = true;
  this.destroyTimers();
  this.stopEyeTweens(true);
};

BasicGame.Eye.prototype.gameInDarkness = function () {
  this.eye.frame = 0;
  this.viewZone.x = this.viewZone.positions['0'];
  this.pupil.x = this.pupilImagePositions['0'];
  this.levelEnded = true;

  this.destroyTimers();
  this.stopEyeTweens();
};

BasicGame.Eye.prototype.destroyTimers = function () {
  if (arguments.length === 0) {
    if (this.calmDownTimer) {
      this.calmDownTimer.destroy();
    }

    if (this.getTiredTimer) {
      this.getTiredTimer.destroy();
    }

    if (this.getMadTimer) {
      this.getMadTimer.destroy();
    }

    if (this.searchAgain) {
      this.searchAgain.destroy();
    }

    return;
  }

  for (var i = arguments.length - 1; i >= 0; i--) {
    if (arguments[i]) arguments[i].destroy();
  }
};

BasicGame.Eye.prototype.rejoice = function (callback) {
  var shakeTween;

  this.destroyTimers();
  this.viewZone.alpha = 0;

  shakeTween = this.game.add.tween(this.eye);
  shakeTween.to({ y: this.eye.originalY + 10 },
    150,
    null,
    false,
    0,
    4,
    true).start();
  shakeTween.onComplete.add(function () {
    this.eye.y = this.eye.originalY;
    this.laughSound.stop();
    callback();
  }, this);

  this.laughSound.play();
};

/**
 * Method that plays the 'tired' animation and makes the EYE get mad.
 */
BasicGame.Eye.prototype.getTired = function () {
  this.eye.frame = 1;

  this.pupil.alpha = 0;
  this.viewZone.alpha = 0;

  if (this.levelEnded === true) {
    return;
  }

  this.getMadTimer = this.game.time.create(true);
  this.getMadTimer.add(1200,
    function () {
      this.getMad();
    },
    this);
  this.getMadTimer.start();
};

/**
 * Method that play the 'angry' animation of the EYE, shakes the camera and
 * restarts the seeking for the player.
 */
BasicGame.Eye.prototype.getMad = function () {
  var shakeTween = this.game.add.tween(this.eye);

  // play the angry animation and the sound linked to it
  this.eye.frame = 2;
  this.angerSound.play();

  // shake the world
  shakeTween.to({ x: this.eye.originalX + 10 },
    40,
    Phaser.Easing.Sinusoidal.InOut,
    false,
    0,
    4,
    true);
  shakeTween.onComplete.addOnce(function () {
    // restart the search after a while
    this.searchAgain = this.game.time.create(true);
    this.searchAgain.add(this.RESTART_SEARCH_DELAY,
      function () {
        if (this.levelEnded === true) {
          return;
        }

        this.initSearch();
      },
      this);
    this.searchAgain.start();
  }, this);
  shakeTween.start();

};

BasicGame.Eye.prototype.updateLevel = function (level) {
  this.level = level;
  this.anger = false;
  this.usedPatterns = 0;

  this.stopEyeTweens(true);
};

BasicGame.Eye.prototype.restartLevel = function () {
  this.anger = false;
  this.levelEnded = true;

  this.destroyTimers();
  this.stopEyeTweens(true);
};

BasicGame.Eye.prototype.stopEyeTweens = function (resetPosition) {
  if (this.viewZoneMovementTween && this.pupilMovementTween) {
    this.viewZoneMovementTween.stop();
    this.pupilMovementTween.stop();

    this.viewZoneMovementTween.onComplete.removeAll();
    this.pupilMovementTween.onComplete.removeAll();
  }

  if (resetPosition === true) {
    this.viewZone.x = this.viewZone.positions['0'];
    this.viewZone.alpha = 1;
    this.pupil.x = this.pupilImagePositions['0'];
    this.pupil.alpha = 1;
  }
};

BasicGame.Eye.prototype.drawLinesToTarget = function (target) {
  // draw a line from the eye to the target
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