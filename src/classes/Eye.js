/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var BasicGame = BasicGame || {};

/**
 * Method that set the default values for the properties of the Eye object.
 * 
 * @param {Object} game    The Object of Phaser game
 * @param {Object} gameObj The Object of BasicGame.Game
 */
BasicGame.Eye = function (game, gameObj) {
  this.game = game;
  this.gameObj = gameObj;
  this.eye = null;
  this.playerObj = null;
  this.level = null;
  this.lightning = null;
  this.bitmap = null;
  this.anger = null;
  this.shooting = null;
  this.searching = null;
  this.searchingTime = 19000;
  this.zoneSize = this.game.world.width / 3;
  this.viewZoneSprite = null;
  this.laughSound = null;
  this.angerSound = null;
  this.currentPattern = -1;
  this.levelEnded = null;
  this.usedPatterns = null;
};

/**
 * Method that runs when the Eye Object is created.
 * 
 * @param  {Object} playerObj The Object of the BasicGame.Player
 * @param  {Object} level     The Object of the BasicGame.Level
 * @param  {Object} lightning The Object of the BasicGame.Lightning
 */
BasicGame.Eye.prototype.create = function (playerObj, level, lightning) {
  // set the default values for some properties
  this.playerObj = playerObj;
  this.level = level;
  this.lightning = lightning;
  this.shooting = false;
  this.searching = false;
  this.levelEnded = false;
  this.usedPatterns = 0;

  // add the sprite of the eye
  this.eye = this.game.add.sprite(this.game.world.width / 2, 64, 'eye', 0);
  this.eye.originalX = this.eye.x;
  this.eye.originalY = this.eye.y;
  this.eye.anchor.setTo(0.5, 0.5);

  // add the  sprite of the pupil
  this.pupil = this.game.add.image(this.eye.x, this.eye.y, 'pupil');
  this.pupil.alpha = 0;
  this.pupil.anchor.setTo(0.5, 0.5);
  
  // create the array of key positions for the pupil (this will be linked to
  // the position of the view zone)
  this.pupilImagePositions = {
    '3': this.eye.x - 16 * 3,
    '2': this.eye.x - 16 * 2,
    '1': this.eye.x - 16 * 1,
    '0': this.eye.x,
    '4': this.eye.x + 16 * 1,
    '5': this.eye.x + 16 * 2,
    '6': this.eye.x + 16 * 3
  };

  // create the view zones
  this.viewZoneSprite = this.game.add.sprite(this.eye.position.x - this.zoneSize / 2, 0, 'view_zone', 0);
  this.viewZoneSprite.tint = 0xFFFC19;
  this.viewZoneSprite.alpha = 0;
  this.viewZoneSprite.width = this.zoneSize;
  this.viewZoneSprite.height = this.game.world.height;

  // calculate and store the key positions of the view zone
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

  // (!) define the patterns for the EYE
  this.patterns = [
    [[0,3,2], [3, 6, 4], [6, 0, 2]],
    [[0,1,0.5], [1, 4, 1], [4, 2, 1], [2, 5, 2], [5, 0, 1]],
    [[0,3,0.2], [3, 6, 0.4], [6, 0, 0.2]],
    [[0,4,0.5], [4, 1, 1], [1, 5, 1], [5, 2, 2], [2, 0, 1]]
  ];

  // ---------------------------------------------------------------------------
  // setup the animations for THE EYE
  this.eye.animations.add('search', [0], 1, false);
  this.eye.animations.add('angry', [7], 1, false);
  this.eye.animations.add('tired', [8], 1, false);
  this.eye.animations.add('happy', [9], 1, false);
  this.eye.animations.add('irritated', [10], 1, false);

  // create a bitmap texture for drawing lines
  if(BasicGame.Game.developmentMode === true) { // [ development mode ]
    this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
    this.game.add.image(0, 0, this.bitmap);
  }

  // create the lightning for killing the player
  this.lightning.create(this.eye, this.playerObj, this.level);
  this.lightningTimer = 0;

  // the EYE starts calm
  this.anger = false;

  // ---------------------------------------------------------------------------
  // setup the sounds
  if (!this.laughSound) {
    this.laughSound = this.game.add.sound('eye', 0.1);
  }

  if (!this.angerSound) {
    this.angerSound = this.game.add.sound('eye-anger', 0.8);
  }
};

/**
 * Method that runs each time the game runs the update method.
 */
BasicGame.Eye.prototype.update = function () {
  var checkLeft = false,
      checkRight = false;

  if(BasicGame.Game.developmentMode === true) { // [ development mode ]
    // clear the bitmap where we are drawing our lines
    this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
  }

  if (this.eye.animations.currentAnim.name === 'happy' ||
      this.levelEnded === true) {
    // the player is dead, I'm the happiest EYE in the hole universe
    return;
  }

  if(this.gameObj.isLoadingLevel === true) {
    // the EYE will start the level as irritated (sleeping)
    this.eye.animations.play('irritated');
    return;
  }

  // ---------------------------------------------------------------------------
  // ray casting

  // test if the target can see the eye by casting a ray (a line) towards the eye.
  // if the ray intersects any walls before it intersects the eye then the wall
  // is in the way.
  if (BasicGame.Game.developmentMode === true) { // [ development mode ]
    if (this.isPlayerInsideViewZone() === true) {
      this.playerObj.player.tint = 0x990000;
    }
    else {
      this.playerObj.player.tint = 0xFFFFFF;
    }
  }

  // check if the player is in the side of vision of the EYE
  if (this.searching === true && this.isPlayerInsideViewZone() === true) {
    // check which of the points in the player should be used for "in shadow"
    // evaluation
    if (this.playerObj.player.left > this.viewZoneSprite.left) {
      checkLeft = true;
    }

    if (this.playerObj.player.right < this.viewZoneSprite.right) {
      checkRight = true;
    }

    if (this.playerObj.isInShadow(checkLeft, checkRight) === false) {
      if (BasicGame.Game.developmentMode === true) { // [ development mode ]
        this.playerObj.player.tint = 0xEECC00;
      }

      // shoot to the player
      this.shootPlayer(this.playerObj.player);
    }
    else {
      if (BasicGame.Game.developmentMode === true) { // [ development mode ]
        this.playerObj.player.tint = 0x990000;
      }
    }
  }

  // This just tells the engine it should update the texture cache
  if(BasicGame.Game.developmentMode === true) { // [ development mode ]
    this.bitmap.dirty = true;
  }
};

/**
 * Method that checks if the player is inside the view zone of the EYE.
 */
BasicGame.Eye.prototype.isPlayerInsideViewZone = function () {
  if (this.viewZoneSprite.alpha > 0) {
    return (this.playerObj.player.left > this.viewZoneSprite.left || this.playerObj.player.right > this.viewZoneSprite.left) &&
           (this.playerObj.player.right < this.viewZoneSprite.right || this.playerObj.player.left < this.viewZoneSprite.right);
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
  var newPatternIndex = -1,
      intent = 0,
      pattern = null,
      patternReversed = null,
      index = 0,
      lap = 0,
      positionIndex = -1;

  // remove the tweens for the pupil and the view zone
  this.viewZoneTween = undefined;
  this.pupilTween = undefined;

  // check if it is necessary to wait before starting the search
  if (delay === true) {
    this.gameObj.helper.timer(500,
      function () {
        this.initSearch();
      },
      this);
    return;
  }

  // set the defaults for the pupil and the view zone
  this.viewZoneSprite.x = this.viewZoneSprite.positions['0'];
  this.viewZoneSprite.alpha = 0.05;
  this.pupil.x = this.pupilImagePositions['0'];
  this.pupil.alpha = 1;

  // pick a pattern for searching in the array of available patterns
  if (this.usedPatterns !== 0) {
    do {
      newPatternIndex = Math.floor(Math.random()*(this.patterns.length));
      intent++;
    } while (this.currentPattern === newPatternIndex || intent > 5);
    this.currentPattern = newPatternIndex;
  }
  else
  {
    this.currentPattern = '0';
  }
  this.usedPatterns++;

  // define if the pattern will be used reversed
  patternReversed = Math.random() > 0.5 ? true : false;

  // get the pattern to use
  pattern = this.patterns[this.currentPattern];

  // get the index of the initial step of the pattern
  index = !patternReversed ? 0 : pattern.length - 1;

  // iterate over the steps of the pattern and make the EYE move to each
  // position of it
  var iterator = function (index) {
    if ((!patternReversed && index < pattern.length) ||
        (patternReversed && index >= 0)) {
      // set the initial X position of the EYE and the view zone
      positionIndex = pattern[index][!patternReversed ? 0 : 1];
      this.viewZoneSprite.x = this.viewZoneSprite.positions[positionIndex];
      this.pupil.x = this.pupilImagePositions[positionIndex];

      // setup the tweens that will move the pupil and the view zone
      // TODO: replace tweens by basic calculations
      this.tweenEye(pattern[index][!patternReversed ? 1 : 0],
        pattern[index][2],
        function () {
          this.gameObj.helper.timer(1000,
            function () {
              if (this.levelEnded === true || this.shooting === true) {
                return;
              }
              iterator(!patternReversed ? ++index : --index);
            },
            this);
        }.bind(this));
    }
    else {
      // if there are no more steps in the pattern
      if (++lap < 2) {
        // if the pattern was used twice, change it
        this.gameObj.helper.timer(1000,
          function () {
            index = !patternReversed ? 0 : pattern.length - 1;
            iterator(index);
          },
          this);
      }
      else {
        if (this.shooting === true) {
          // this is triggered when the player enters the view zone while the
          // eye is looking to the front before getting tired
          return;
        }

        this.searching = false;
        this.getTired();
      }
    }
  }.bind(this);
  iterator(index);

  // play the search animation in the EYE's sprite
  this.eye.animations.play('search');

  // set the flag that indicates if the EYE is seeking for the player
  this.searching = true;

};

/**
 * Method that setup and  play the tweens for moving the pupil and the view zone.
 * 
 * @param  {[type]}   target     [description]
 * @param  {[type]}   timeInSecs [description]
 * @param  {Function} callback   [description]
 * @return {[type]}              [description]
 */
BasicGame.Eye.prototype.tweenEye = function (target, timeInSecs, callback) {
  if (this.viewZoneTween && this.viewZoneTween.isRunning === true) return;

  // start the tweens for movement
  this.viewZoneTween = this.game.add.tween(this.viewZoneSprite)
    .to({x: this.viewZoneSprite.positions[target]},
      timeInSecs * 1000,
      null,
      false,
      0,
      0);
  this.viewZoneTween.onComplete.add(function (sprite, tween) {
    tween.stop();
    callback();
  }, this);
  this.viewZoneTween.start();

  this.pupilTween = this.game.add.tween(this.pupil)
    .to({x: this.pupilImagePositions[target]},
      timeInSecs * 1000,
      null,
      false,
      0,
      0);
  this.pupilTween.onComplete.add(function (sprite, tween) {
    tween.stop();
  }, this);
  this.pupilTween.start();
};

/**
 * Method that plays the 'tired' animation and makes the EYE get mad.
 */
BasicGame.Eye.prototype.getTired = function () {
  this.eye.animations.play('tired');

  this.pupil.alpha = 0;
  this.viewZoneSprite.alpha = 0;

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
  // play the angry animation and the sound linked to it
  this.eye.animations.play('angry');
  this.angerSound.play();

  // shake the world
  this.shake();

  // restart the search
  this.searchAgain = this.game.time.create(true);
  this.searchAgain.add(1600,
    function () {
      this.eye.x = this.eye.originalX;
      this.initSearch();
    },
    this);
  this.searchAgain.start();
};

BasicGame.Eye.prototype.shootPlayer = function (target) {
  var tweensInPause = false;

  if(BasicGame.Game.developmentMode === true) { // [ development mode ]
    this.drawLinesToTarget(target);
    this.playerObj.player.tint = 0x00ff00;
  }

  if (this.shooting === false) {
    this.shooting = true;
    this.searching = false;

    this.eye.animations.play('angry');
    this.lightning.shoot(target);

    // hide the pupil while shooting
    this.pupil.alpha = 0;

    // pause the current tweens, if any, for the pupil and the viewzone
    if ((this.viewZoneTween && this.viewZoneTween.isRunning === true) ||
        (this.pupilTween && this.pupilTween.isRunning === true)) {
      tweensInPause = true;
      this.viewZoneTween.pause();
      this.pupilTween.pause();
    }

    this.destroyTimers(this.getTiredTimer, this.getMadTimer, this.searchAgain);

    // init the timer that will make the EYE calm down again and restart the
    // search
    this.calmDownTimer = this.game.time.create(true);
    this.calmDownTimer.add(3000,
      function () {
        if (tweensInPause === true) {
          this.eye.animations.play('search');
          this.pupil.alpha = 1;
          this.searching = true;

          if (this.viewZoneTween && this.pupilTween) {
            this.viewZoneTween.resume();
            this.pupilTween.resume();
          }
        }
        else {
          this.initSearch();
        }

        var _self = this;
        setTimeout(function () {
          _self.shooting = false;
        }, 200);
      },
      this);
    this.calmDownTimer.start();
  }
};

BasicGame.Eye.prototype.shake = function () {
  this.shakeTween = this.shakeTween || this.game.add.tween(this.eye);
  this.shakeTween.to({x: this.eye.originalX + 10},
    40,
    Phaser.Easing.Sinusoidal.InOut,
    false,
    0,
    4,
    true).start();
  this.shakeTween.onComplete.add(function () {
  }, this);
};

BasicGame.Eye.prototype.levelStart = function () {
  this.levelEnded = false;
  this.shooting = false;
  this.initSearch();
};

BasicGame.Eye.prototype.endLevel = function (levelCompleted) {
  if (this.levelEnded === true) return;

  this.levelEnded = true;

  this.destroyTimers();
  this.searching = false;
  this.shooting = false;

  this.viewZoneTween.onComplete.removeAll();
  this.pupilTween.onComplete.removeAll();

  if (levelCompleted === true) {
    this.pupil.alpha = 0;
  }
};

BasicGame.Eye.prototype.gameInDarkness = function () {
  this.eye.animations.play('search');
  this.viewZoneSprite.x = this.viewZoneSprite.positions['0'];
  this.viewZoneSprite.alpha = 0;
  this.pupil.x = this.pupilImagePositions['0'];
  this.pupil.alpha = 1;
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
    if(arguments[i]) arguments[i].destroy();
  }
};

BasicGame.Eye.prototype.rejoice = function (callback) {
  this.destroyTimers();

  this.eye.animations.play('happy');

  this.viewZoneSprite.alpha = 0;

  this.shakeTween = this.game.add.tween(this.eye);
  this.shakeTween.to({y: this.eye.originalY + 10},
    150,
    null,
    false,
    0,
    4,
    true).start();
  this.shakeTween.onComplete.add(function () {
    this.shakeTween.stop();
    this.eye.y = this.eye.originalY;
    this.laughSound.stop();
    callback();
  }, this);

  this.laughSound.play();
};

BasicGame.Eye.prototype.updateLevel = function (level) {
  this.level = level;
  this.anger = false;
  this.usedPatterns = 0;

  this.stopEyeTweens();
};

BasicGame.Eye.prototype.restartLevel = function () {
  this.anger = false;
  this.levelEnded = true;

  this.stopEyeTweens();
  this.destroyTimers();
};

BasicGame.Eye.prototype.stopEyeTweens = function () {
  this.viewZoneTween.stop();
  this.pupilTween.stop();
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