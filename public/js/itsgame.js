(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

BasicGame.Days = function () {
  this.days = {
    1: { "number": 387,
      "text": {
        "en": "Maybe it will be there forever",
        "es": "Tal vez siempre estará ahí"
      },
      "waitTime": 3
    },
    2: { "number": 349,
      "text": {
        "en": "Sometimes it comes back",
        "es": "A veces vuelve"
      },
      "waitTime": 4
    },
    3: { "number": 313,
      "text": {
        "en": "It is here...again",
        "es": "Aquí está...otra vez"
      },
      "waitTime": 3
    },
    4: { "number": 248,
      "text": {
        "en": "Why am I thinking about that?",
        "es": "¿Por qué estoy pensando en eso?"
      },
      "waitTime": 3
    },
    5: { "number": 212,
      "text": {
        "en": "It's here",
        "es": "Aquí está"
      },
      "waitTime": 4
    },
    6: { "number": 186,
      "text": {
        "en": "No again, please",
        "es": "Otra vez? no por favor"
      },
      "waitTime": 4
    },
    7: { "number": 171,
      "text": {
        "en": "I thought I had overcome it",
        "es": "Pensé que lo había superado"
      },
      "waitTime": 4
    },
    8: { "number": 156,
      "text": {
        "en": "Another day...and it's here",
        "es": "Otro día...y aquí está"
      },
      "waitTime": 4
    },
    9: { "number": 101,
      "text": {
        "en": "I'm thinking about it",
        "es": "Estoy pensando en eso"
      },
      "waitTime": 4
    },
    10: { "number": 90,
      "text": {
        "en": "(peaceful days)",
        "es": "(días tranquilos)"
      },
      "waitTime": 5
    },
    11: { "number": 83,
      "text": {
        "en": "What I have done is not as wrong as I thought",
        "es": "Lo que hice no es tan malo como pensaba"
      },
      "waitTime": 5
    },
    12: { "number": 74,
      "text": {
        "en": "I can't believe no one cares about it",
        "es": "No puedo creer que ha nadie le haya importado"
      },
      "waitTime": 5
    },
    13: { "number": 68,
      "text": {
        "en": "Two months has passed and no one talks about it, that's good",
        "es": "Han pasado más de dos meses y nadie ha dicho nada, eso es bueno"
      },
      "waitTime": 6
    },
    14: { "number": 65,
      "text": {
        "en": "I must admit it, my life has improved after that",
        "es": "Debo reconocer que mi vida a mejorado después de eso"
      },
      "waitTime": 5
    },
    15: { "number": 59,
      "text": {
        "en": "It is odd, is not affecting me",
        "es": "Qué extraño, empieza a no afectarme"
      },
      "waitTime": 3
    },
    16: { "number": 47,
      "text": {
        "en": "No one have been noticed it...could be so insignificant?",
        "es": "Aún nadie lo ha notado...¿puede ser tan insignificante?"
      },
      "waitTime": 5
    },
    17: { "number": 35,
      "text": {
        "en": "How could I thought it isn't wrong? It is wrong!",
        "es": "¿Cómo pude pensar que no es malo? Es muy malo!"
      },
      "waitTime": 4
    },
    18: { "number": 28,
      "text": {
        "en": "Maybe it isn't as wrong as I thought",
        "es": "Tal vez no es algo tan malo como pensaba"
      },
      "waitTime": 4
    },
    19: { "number": 16,
      "text": {
        "en": "No one cares about it, that's weird",
        "es": "Nadie lo ha notado, qué extraño"
      },
      "waitTime": 4
    },
    20: { "number": 11,
      "text": {
        "en": "(cool down days)",
        "es": "(dían de calma)"
      },
      "waitTime": 3
    },
    21: { "number": 9,
      "text": {
        "en": "I'm a bad person",
        "es": "Soy una mala persona"
      },
      "waitTime": 3
    },
    22: { "number": 8,
      "text": {
        "en": "What if someone goes to the appartment?",
        "es": "¿Qué tal si alguien va al apartamento?"
      },
      "waitTime": 4
    },
    23: { "number": 7,
      "text": {
        "en": "How could I do it?...how could I?",
        "es": "¿Cómo pude hacerlo?...¿cómo pude?"
      },
      "waitTime": 3
    },
    24: { "number": 6,
      "text": {
        "en": "Brother: You have to calm down, I told you it wouldn't be easy",
        "es": "Hermano: Tienes que calmarte, te dije que no sería fácil"
      },
      "waitTime": 5
    },
    25: { "number": 5,
      "text": {
        "en": "I must talk with my brother",
        "es": "Tengo que hablar con mi hermano"
      },
      "waitTime": 4
    },
    26: { "number": 4,
      "text": {
        "en": "Don't don't don't...there must be something I can do",
        "es": "No no no no!...debe haber algo que pueda hacer"
      },
      "waitTime": 6
    },
    27: { "number": 3,
      "text": {
        "en": "I have to tell everything...I...must...",
        "es": "Tengo que contarlo todo...tengo...que..."
      },
      "waitTime": 6
    },
    28: { "number": 2,
      "text": {
        "en": "...maybe she deserved it...but..who am I to judge?",
        "es": "...tal vez sí lo merecía...pero...¿quién soy yo para juzgar?"
      },
      "waitTime": 7
    },
    29: { "number": 1,
      "text": {
        "en": "She didn't deserve it...",
        "es": "Ella no se lo merecía..."
      },
      "waitTime": 3
    },
    30: { "number": 0,
      "text": {
        "en": "...oh...what I've done?",
        "es": "...pero...¿qué he hecho?"
      },
      "waitTime": 3
    }
  };
};

BasicGame.Days.prototype.getDay = function (dayIndex) {
  if (!this.days[dayIndex]) return { "number": "???" };
  return this.days[dayIndex];
};

},{}],2:[function(require,module,exports){
'use strict';

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
  this.patterns = [[[0, 3, 2], [3, 6, 4], [6, 0, 2]], [[0, 1, 0.5], [1, 4, 1], [4, 2, 1], [2, 5, 2], [5, 0, 1]], [[0, 3, 0.2], [3, 6, 0.4], [6, 0, 0.2]], [[0, 4, 0.5], [4, 1, 1], [1, 5, 1], [5, 2, 2], [2, 0, 1]]];

  // ---------------------------------------------------------------------------
  // setup the animations for THE EYE
  this.eye.animations.add('search', [0], 1, false);
  this.eye.animations.add('angry', [7], 1, false);
  this.eye.animations.add('tired', [8], 1, false);
  this.eye.animations.add('happy', [9], 1, false);
  this.eye.animations.add('irritated', [10], 1, false);

  // create a bitmap texture for drawing lines
  if (BasicGame.Game.developmentMode === true) {
    // [ development mode ]
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

  if (BasicGame.Game.developmentMode === true) {
    // [ development mode ]
    // clear the bitmap where we are drawing our lines
    this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
  }

  if (this.eye.animations.currentAnim.name === 'happy' || this.levelEnded === true) {
    // the player is dead, I'm the happiest EYE in the hole universe
    return;
  }

  if (this.gameObj.isLoadingLevel === true) {
    // the EYE will start the level as irritated (sleeping)
    this.eye.animations.play('irritated');
    return;
  }

  // ---------------------------------------------------------------------------
  // ray casting

  // test if the target can see the eye by casting a ray (a line) towards the eye.
  // if the ray intersects any walls before it intersects the eye then the wall
  // is in the way.
  if (BasicGame.Game.developmentMode === true) {
    // [ development mode ]
    if (this.isPlayerInsideViewZone() === true) {
      this.playerObj.player.tint = 0x990000;
    } else {
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
      if (BasicGame.Game.developmentMode === true) {
        // [ development mode ]
        this.playerObj.player.tint = 0xEECC00;
      }

      // shoot to the player
      this.shootPlayer(this.playerObj.player);
    } else {
      if (BasicGame.Game.developmentMode === true) {
        // [ development mode ]
        this.playerObj.player.tint = 0x990000;
      }
    }
  }

  // This just tells the engine it should update the texture cache
  if (BasicGame.Game.developmentMode === true) {
    // [ development mode ]
    this.bitmap.dirty = true;
  }
};

/**
 * Method that checks if the player is inside the view zone of the EYE.
 */
BasicGame.Eye.prototype.isPlayerInsideViewZone = function () {
  if (this.viewZoneSprite.alpha > 0) {
    return (this.playerObj.player.left > this.viewZoneSprite.left || this.playerObj.player.right > this.viewZoneSprite.left) && (this.playerObj.player.right < this.viewZoneSprite.right || this.playerObj.player.left < this.viewZoneSprite.right);
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
    this.gameObj.helper.timer(500, function () {
      this.initSearch();
    }, this);
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
      newPatternIndex = Math.floor(Math.random() * this.patterns.length);
      intent++;
    } while (this.currentPattern === newPatternIndex || intent > 5);
    this.currentPattern = newPatternIndex;
  } else {
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
    if (!patternReversed && index < pattern.length || patternReversed && index >= 0) {
      // set the initial X position of the EYE and the view zone
      positionIndex = pattern[index][!patternReversed ? 0 : 1];
      this.viewZoneSprite.x = this.viewZoneSprite.positions[positionIndex];
      this.pupil.x = this.pupilImagePositions[positionIndex];

      // setup the tweens that will move the pupil and the view zone
      // TODO: replace tweens by basic calculations
      this.tweenEye(pattern[index][!patternReversed ? 1 : 0], pattern[index][2], function () {
        this.gameObj.helper.timer(1000, function () {
          if (this.levelEnded === true || this.shooting === true) {
            return;
          }
          iterator(!patternReversed ? ++index : --index);
        }, this);
      }.bind(this));
    } else {
      // if there are no more steps in the pattern
      if (++lap < 2) {
        // if the pattern was used twice, change it
        this.gameObj.helper.timer(1000, function () {
          index = !patternReversed ? 0 : pattern.length - 1;
          iterator(index);
        }, this);
      } else {
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
  this.viewZoneTween = this.game.add.tween(this.viewZoneSprite).to({ x: this.viewZoneSprite.positions[target] }, timeInSecs * 1000, null, false, 0, 0);
  this.viewZoneTween.onComplete.add(function (sprite, tween) {
    tween.stop();
    callback();
  }, this);
  this.viewZoneTween.start();

  this.pupilTween = this.game.add.tween(this.pupil).to({ x: this.pupilImagePositions[target] }, timeInSecs * 1000, null, false, 0, 0);
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
  this.getMadTimer.add(1200, function () {
    this.getMad();
  }, this);

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
  this.searchAgain.add(1600, function () {
    this.eye.x = this.eye.originalX;
    this.initSearch();
  }, this);
  this.searchAgain.start();
};

BasicGame.Eye.prototype.shootPlayer = function (target) {
  var tweensInPause = false;

  if (BasicGame.Game.developmentMode === true) {
    // [ development mode ]
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
    if (this.viewZoneTween && this.viewZoneTween.isRunning === true || this.pupilTween && this.pupilTween.isRunning === true) {
      tweensInPause = true;
      this.viewZoneTween.pause();
      this.pupilTween.pause();
    }

    this.destroyTimers(this.getTiredTimer, this.getMadTimer, this.searchAgain);

    // init the timer that will make the EYE calm down again and restart the
    // search
    this.calmDownTimer = this.game.time.create(true);
    this.calmDownTimer.add(3000, function () {
      if (tweensInPause === true) {
        this.eye.animations.play('search');
        this.pupil.alpha = 1;
        this.searching = true;

        if (this.viewZoneTween && this.pupilTween) {
          this.viewZoneTween.resume();
          this.pupilTween.resume();
        }
      } else {
        this.initSearch();
      }

      var _self = this;
      setTimeout(function () {
        _self.shooting = false;
      }, 200);
    }, this);
    this.calmDownTimer.start();
  }
};

BasicGame.Eye.prototype.shake = function () {
  this.shakeTween = this.shakeTween || this.game.add.tween(this.eye);
  this.shakeTween.to({ x: this.eye.originalX + 10 }, 40, Phaser.Easing.Sinusoidal.InOut, false, 0, 4, true).start();
  this.shakeTween.onComplete.add(function () {}, this);
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
    if (arguments[i]) arguments[i].destroy();
  }
};

BasicGame.Eye.prototype.rejoice = function (callback) {
  this.destroyTimers();

  this.eye.animations.play('happy');

  this.viewZoneSprite.alpha = 0;

  this.shakeTween = this.game.add.tween(this.eye);
  this.shakeTween.to({ y: this.eye.originalY + 10 }, 150, null, false, 0, 4, true).start();
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

},{}],3:[function(require,module,exports){
'use strict';

/**
 * Method that set the default values for the properties of the Helper object.
 * 
 * @param {Object} game    The Object of Phaser game
 * @param {Object} gameObj The Object of BasicGame.Game
 */

BasicGame.Helper = function (game, gameObj) {
  this.game = game;
  this.gameObj = gameObj;
};

BasicGame.Helper.prototype.timer = function (delay, callback, context) {
  this.game.time.create(this.game, true).add(delay, callback, context || this).timer.start(100);
};

BasicGame.Helper.prototype.randomColor = function () {
  var letters = '0123456789ABCDEF';
  var color = '0x';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

BasicGame.Helper.prototype.randomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

BasicGame.Helper.prototype.getLevelIdAndName = function (levelNumber) {
  var postfix = levelNumber < 10 ? '0' : '';
  return {
    id: 'lvl' + postfix + levelNumber,
    name: 'level' + postfix + levelNumber
  };
};

BasicGame.Helper.prototype.getSkyName = function (levelNumber) {
  if (levelNumber <= 10) {
    return 'sky01';
  } else if (levelNumber <= 20) {
    return 'sky02';
  } else {
    return 'sky03';
  }
};

},{}],4:[function(require,module,exports){
"use strict";

/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

BasicGame.Level = function (game, gameObj) {
  this.game = game;
  this.gameObj = gameObj;
  this.levelMusic = null;
  this.walls = null;
  this.ground = null;
  this.map = null;
  this.endTimer = null;
  this.isEnded = null;
  this.initPlayerPos = { x: 0, y: 0 };
  this.daysShown = false;
  this.dayNumberTextBitmap = null;
  this.dayPhraseTextBitmap = null;
  this.isReady = false;
  this.isShowingDays = false;
  this.dayText = {
    "es": "Día",
    "en": "Day"
  };

  // font attributes
  this.fontId = 'font';
  this.hasFloor = false;
  this.hasSpikes = false;

  this.daySound = null;
  this.spikeSound = null;
};

BasicGame.Level.prototype.create = function () {
  // create the background for the day
  this.levelTextGroup = this.game.add.group();
  var dayTextBitmap = new Phaser.BitmapData(this.game, 'dayTextBitmap', this.game.world.width, this.game.world.height);
  dayTextBitmap.ctx.rect(0, 0, this.game.world.width, this.game.world.height);
  dayTextBitmap.ctx.fillStyle = '#FFF';
  dayTextBitmap.ctx.fill();

  var dayTextSprite = new Phaser.Sprite(this.game, 0, 0, dayTextBitmap);
  dayTextSprite.anchor.set(0.5, 0.5);
  dayTextSprite.position.set(this.game.world.width / 2, this.game.world.height / 2);
  dayTextSprite.height = 200;
  dayTextSprite.alpha = 0;

  this.levelTextGroup.addChild(dayTextSprite);

  // create the bitmap for the day number
  this.dayNumberTextBitmap = this.game.add.bitmapText(this.game.world.width / 2, this.game.world.height / 2 - 15, this.fontId, '', 72, this.levelTextGroup);
  this.dayNumberTextBitmap.anchor.set(0.5, 0.5);
  this.dayNumberTextBitmap.align = "center";
  this.dayNumberTextBitmap.tint = 0x1e3137;
  this.dayNumberTextBitmap.oriY = this.dayNumberTextBitmap.y;

  // create the bitmap for the day phrase
  this.dayPhraseTextBitmap = this.game.add.bitmapText(0, this.dayNumberTextBitmap.bottom + 20, this.fontId, '', 48, this.levelTextGroup);
  this.dayPhraseTextBitmap.maxWidth = this.game.world.width;
  this.dayPhraseTextBitmap.align = "center";
  this.dayPhraseTextBitmap.tint = 0x515151;

  if (!this.daySound) {
    this.daySound = this.game.add.sound('day', 0.15);
  }

  if (!this.spikeSound) {
    this.spikeSound = this.game.add.sound('spike', 0.2);
  }

  this.createLevel(parseInt(BasicGame.currentLevel));
};

BasicGame.Level.prototype.destroyCurrentLevel = function () {
  this.map.destroy();
  if (this.ground) {
    this.ground.destroy();
  }
  this.walls.destroy();
  if (this.hasSpikes) {
    this.spikes.forEach(function (spikeSprite) {
      if (!spikeSprite || !spikeSprite.showTween || !spikeSprite.hideTween) return;
      spikeSprite.showTween.stop();
      spikeSprite.hideTween.stop();
    });
    this.spikes.destroy();
  }
  if (this.pieces) {
    this.pieces.destroy();
  }
  this.dayNumberTextBitmap.setText("");
  this.dayPhraseTextBitmap.setText("");
};

BasicGame.Level.prototype.createLevel = function (num) {
  var _self = this;
  this.map = this.game.add.tilemap('lvl' + (num < 10 ? '0' + num : num));

  // create the floor of the level
  this.hasFloor = false;
  if (this.map.objects.floor) {
    this.hasFloor = true;
    this.ground = this.game.add.group();

    this.map.createFromObjects("floor", "", 'platform', 0, true, false, this.ground, Phaser.Sprite, false);

    this.ground.enableBody = true;
    this.game.physics.arcade.enable(this.ground);
    this.ground.forEach(function (groundSprite) {
      groundSprite.body.immovable = true;
      groundSprite.body.allowGravity = false;
    });
  }

  // create the walls of the level
  this.walls = this.game.add.group();
  this.map.createFromObjects("platforms", "", 'platform', 0, true, false, this.walls, Phaser.Sprite, false);

  this.walls.enableBody = true;
  this.game.physics.arcade.enable(this.walls);
  this.walls.forEach(function (platformSprite) {
    platformSprite.body.immovable = true;
    platformSprite.body.allowGravity = false;
  });

  // create the spikes (and platform) of the level
  this.hasSpikes = false;
  if (this.map.objects.spikes) {
    this.hasSpikes = true;

    this.spikes = this.game.add.group();
    this.spikes.openedSpikes = 0;

    this.map.createFromObjects("spikes", "", 'spike-platform', 0, true, false, this.walls, Phaser.Sprite, false);
    this.walls.forEach(function (platformSprite) {
      if (platformSprite["spike-platform"] == "1") {
        var createdSpike = null;
        if (platformSprite["spike-side"]) {
          createdSpike = _self.addHeightSpike(platformSprite, platformSprite["spike-side"]);
        } else {
          createdSpike = _self.addWidthSpike(platformSprite, platformSprite["spike-down"]);
        }

        // add a reference to the spikes in the platform to they belong which
        platformSprite.spikeRef = createdSpike;
        platformSprite.body.immovable = true;
        platformSprite.body.allowGravity = false;
      }
    });
  }

  // create the pieces of the level
  this.pieces = this.game.add.group();
  this.map.createFromObjects("pieces", "", 'piece', null, true, false, this.pieces, Phaser.Sprite, false);

  this.pieces.forEach(function (pieceSprite) {
    pieceSprite.anchor.set(0.5, 0.5);
    _self.game.physics.arcade.enableBody(pieceSprite);
    pieceSprite.body.allowGravity = false;
    pieceSprite.body.immovable = false;
    pieceSprite.body.friction = new Phaser.Point(0, 0);
  });

  // get the player initial position
  if (this.map.objects.player_pos) {
    this.initPlayerPos.x = this.map.objects.player_pos[0].x;
    this.initPlayerPos.y = this.map.objects.player_pos[0].y;
  }

  this.game.world.bringToTop(this.levelTextGroup);

  // show the days of the level
  var dayObj = this.gameObj.days.getDay(BasicGame.currentLevel);
  this.dayNumberTextBitmap.setText(this.dayText[BasicGame.language] + ' ' + dayObj.number);
  this.dayNumberTextBitmap.y = this.dayNumberTextBitmap.oriY;
  if (dayObj.text) {
    this.dayPhraseTextBitmap.setText(dayObj.text[BasicGame.language]);
    this.dayPhraseTextBitmap.x = this.game.world.width / 2 - this.dayPhraseTextBitmap.width / 2;
  } else {
    this.dayNumberTextBitmap.y += 15;
  }

  // set the level as not ended
  this.isEnded = false;

  // TODO: remove this property
  this.isReady = true;
};

BasicGame.Level.prototype.render = function () {
  if (BasicGame.Game.developmentMode === true) {
    var _self = this;
    this.spikes.forEach(function (pieceSprite) {
      _self.game.debug.body(pieceSprite, 'rgba(0,0,255,0.8)');
    });
  }
};

BasicGame.Level.prototype.endLevel = function () {
  BasicGame.isRetrying = false;
  var secondsToEnd = this.gameObj.countdownDuration;

  // create the timer
  this.endTimer = this.game.time.create(true);

  // starts the timer that will end the level
  this.endTimer.add(secondsToEnd * 1000, function () {
    // enable the flag that indicates the other objects the level is finished
    this.endTimer = undefined;
    this.isEnded = true;

    this.gameObj.levelEnded();
  }, this);

  this.endTimer.start();
  this.gameObj.showDarkness();
};

BasicGame.Level.prototype.showDay = function () {
  if (this.isShowingDays === true) {
    return;
  }

  this.isShowingDays = true;

  this.levelTextGroup.getChildAt(0).alpha = 1;
  this.levelTextGroup.alpha = 1;

  this.game.world.bringToTop(this.levelTextGroup);

  this.daySound.play();

  // create the timer
  var dayTimer = this.game.time.create(true);

  // set the timer to stop showing the day
  var currentDayObj = this.gameObj.days.getDay(BasicGame.currentLevel);
  dayTimer.add((currentDayObj.waitTime || 2) * 1000, function () {
    this.levelTextGroup.alpha = 0;
    this.isShowingDays = false;
    this.gameObj.hideDarkness();
  }, this);

  dayTimer.start();
};

BasicGame.Level.prototype.addWidthSpike = function (platformSprite, inBottom) {
  // add the spikes to the platform
  var spikeSprite = null;

  if (!inBottom) {
    spikeSprite = this.game.add.tileSprite(platformSprite.x, platformSprite.y + 5, platformSprite.width, 16, "spike", 0, this.spikes);
    spikeSprite.isHidden = true;
    spikeSprite.oriY = spikeSprite.y;
    spikeSprite.desY = platformSprite.y - 16;
    this.spikes.openedSpikes++;
  } else {
    spikeSprite = this.game.add.tileSprite(platformSprite.x, platformSprite.bottom, platformSprite.width, 16, "spike-d", 0, this.spikes);
    spikeSprite.isHidden = false;
    // spikeSprite.oriY = spikeSprite.y;
    // spikeSprite.desY = platformSprite.y -16;
  }

  if (!inBottom) {
    // create the tweens for showing and hiding the spikes
    var showSpikeTween = this.createShowSpikeTween(spikeSprite, { y: spikeSprite.desY }, 100, 300);

    var hideSpikeTween = this.game.add.tween(spikeSprite).to({ y: spikeSprite.oriY }, 300, Phaser.Easing.Exponential.Out, false, 1000);
    hideSpikeTween.onComplete.add(function () {
      this.isHidden = true;
      this.parent.openedSpikes--;
    }, spikeSprite);

    spikeSprite.showTween = showSpikeTween;
    spikeSprite.hideTween = hideSpikeTween;
  }

  // set physics properties for the spikes
  this.game.physics.arcade.enable(spikeSprite);
  spikeSprite.body.immovable = true;
  spikeSprite.body.allowGravity = false;

  var numofspikes = platformSprite.width / 32;
  spikeSprite.body.width = platformSprite.width * (numofspikes / (numofspikes + 0.5));
  spikeSprite.body.height = 8;
  spikeSprite.body.offset.x = platformSprite.width / 2 - spikeSprite.body.width / 2;

  if (!inBottom) spikeSprite.body.offset.y = 8;else spikeSprite.body.offset.y = 0;

  return spikeSprite;
};

BasicGame.Level.prototype.addHeightSpike = function (platformSprite, side) {
  // add the spikes to the platform
  var spikeSprite = null;
  if (side === 'r') {
    spikeSprite = this.game.add.tileSprite(platformSprite.right - 21, platformSprite.y, 16, platformSprite.height, "spike-r", 0, this.spikes);
    spikeSprite.isHidden = true;
    spikeSprite.oriX = spikeSprite.x;
    spikeSprite.desX = platformSprite.right;
  } else if (side === 'l') {
    spikeSprite = this.game.add.tileSprite(platformSprite.x + 5, platformSprite.top, 16, platformSprite.height, "spike-l", 0, this.spikes);
    spikeSprite.isHidden = true;
    spikeSprite.oriX = spikeSprite.x;
    spikeSprite.desX = platformSprite.x - 16;
  } else {
    return null;
  }

  // create the tweens for showing and hiding the spikes
  var showSpikeTween = this.createShowSpikeTween(spikeSprite, { x: spikeSprite.desX }, 100, 500);

  var hideSpikeTween = this.game.add.tween(spikeSprite).to({ x: spikeSprite.oriX }, 300, Phaser.Easing.Exponential.Out, false, 1000);
  hideSpikeTween.onComplete.add(function () {
    this.isHidden = true;
    this.parent.openedSpikes--;
  }, spikeSprite);

  spikeSprite.showTween = showSpikeTween;
  spikeSprite.hideTween = hideSpikeTween;

  // set physics properties for the spikes
  this.game.physics.arcade.enable(spikeSprite);
  spikeSprite.body.immovable = true;
  spikeSprite.body.allowGravity = false;

  var numofspikes = platformSprite.height / 32;
  spikeSprite.body.width = 8;
  spikeSprite.body.height = platformSprite.height * (numofspikes / (numofspikes + 0.5));
  spikeSprite.body.offset.y = platformSprite.height / 2 - spikeSprite.body.height / 2;

  if (side === 'r') spikeSprite.body.offset.x = 0;else spikeSprite.body.offset.x = 8;

  return spikeSprite;
};

BasicGame.Level.prototype.createShowSpikeTween = function (spikeSprite, properties, duration, delay) {
  var _self = this;
  var showSpikeTween = this.game.add.tween(spikeSprite).to(properties, duration, null, false, delay);

  showSpikeTween.onComplete.add(function () {
    this.isHidden = false;
    this.hideTween.start();
    this.parent.openedSpikes++;
  }, spikeSprite);

  return showSpikeTween;
};

BasicGame.Level.prototype.restartLevel = function () {
  // enable the body physics for each piece and make it visible
  this.pieces.forEach(function (pieceSprite) {
    pieceSprite.alpha = 1;
    pieceSprite.body.enable = true;
  });
};

},{}],5:[function(require,module,exports){
'use strict';

/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

BasicGame.Light = function (game, gameObj) {
  this.game = game;
  this.gameObj = gameObj;
  this.lightGroup = null;
  this.light = null;
  this.bitmap = null;
  this.rayBitmap = null;
  this.rayBitmapImage = null;
  this.walls = null;
  this.level = null;
  this.shadowsDrawn = null;
};

BasicGame.Light.prototype.create = function (level) {
  this.level = level;
  this.walls = this.level.walls;
  this.shadowsDrawn = false;

  var light = null;

  //Add the light(s)
  this.lightGroup = this.game.add.group();
  light = this.game.add.sprite(this.game.world.width / 2, -16, 'light');
  // light = this.game.add.sprite((this.game.world.width / 2) - 16, -16, 'light');
  light.alpha = 0;

  // Set the pivot point of the light to the center of the texture
  light.anchor.setTo(0.5, 0.5);

  //Add the light to the array of lights
  this.lightGroup.add(light);

  // Create a bitmap texture for drawing light cones
  this.bitmap = this.game.add.bitmapData(this.game.world.width, this.game.height);
  this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
  this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
  this.lightBitmap = this.game.add.image(0, 0, this.bitmap);

  // This bitmap is drawn onto the screen using the MULTIPLY blend mode.
  // Since this bitmap is over the background, dark areas of the bitmap
  // will make the background darker. White areas of the bitmap will allow
  // the normal colors of the background to show through. Blend modes are
  // only supported in WebGL. If your browser doesn't support WebGL then
  // you'll see gray shadows and white light instead of colors and it
  // generally won't look nearly as cool. So use a browser with WebGL.
  this.lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;

  // Create a bitmap for drawing rays
  this.rayBitmap = this.game.add.bitmapData(this.game.world.width, this.game.height);
  this.rayBitmapImage = this.game.add.image(0, 0, this.rayBitmap);
  this.rayBitmapImage.visible = false;
};

BasicGame.Light.prototype.drawShadows = function () {
  // Move the light to the pointer/touch location
  this.rayBitmapImage.visible = BasicGame.Game.developmentMode || false;

  if (this.gameObj.inDarkness == true) {
    return;
  }

  // Next, fill the entire light bitmap with a dark shadow color.
  this.bitmap.context.fillStyle = 'rgb(81, 81, 81)';
  this.bitmap.context.fillRect(0, 0, this.game.world.width, this.game.height);

  // An array of the stage corners that we'll use later
  var stageCorners = [new Phaser.Point(0, 0), new Phaser.Point(this.game.world.width, 0), new Phaser.Point(this.game.world.width, this.game.height), new Phaser.Point(0, this.game.height)];

  // Ray casting!
  // Cast rays from each light
  this.lightGroup.forEach(function (light) {
    // Cast rays through the corners of each wall towards the stage edge.
    // Save all of the intersection points or ray end points if there was no intersection.
    var points = [];
    var ray = null;
    var intersect;
    var i;

    this.walls.forEach(function (wall) {
      // Create a ray from the light through each corner out to the edge of the stage.
      // This array defines points just inside of each corner to make sure we hit each one.
      // It also defines points just outside of each corner so we can see to the stage edges.
      var corners = [new Phaser.Point(wall.x + 0.1, wall.y + 0.1), new Phaser.Point(wall.x - 0.1, wall.y - 0.1), new Phaser.Point(wall.x - 0.1 + wall.width, wall.y + 0.1), new Phaser.Point(wall.x + 0.1 + wall.width, wall.y - 0.1), new Phaser.Point(wall.x - 0.1 + wall.width, wall.y - 0.1 + wall.height), new Phaser.Point(wall.x + 0.1 + wall.width, wall.y + 0.1 + wall.height), new Phaser.Point(wall.x + 0.1, wall.y - 0.1 + wall.height), new Phaser.Point(wall.x - 0.1, wall.y + 0.1 + wall.height)];

      // Calculate rays through each point to the edge of the stage
      for (i = 0; i < corners.length; i++) {
        var c = corners[i];

        // Here comes the linear algebra.
        // The equation for a line is y = slope * x + b
        // b is where the line crosses the left edge of the stage
        var slope = (c.y - light.y) / (c.x - light.x);
        var b = light.y - slope * light.x;

        var end = null;

        if (c.x === light.x) {
          // Vertical lines are a special case
          if (c.y <= light.y) {
            end = new Phaser.Point(light.x, 0);
          } else {
            end = new Phaser.Point(light.x, this.game.height);
          }
        } else if (c.y === light.y) {
          // Horizontal lines are a special case
          if (c.x <= light.x) {
            end = new Phaser.Point(0, light.y);
          } else {
            end = new Phaser.Point(this.game.world.width, light.y);
          }
        } else {
          // Find the point where the line crosses the stage edge
          var left = new Phaser.Point(0, b);
          var right = new Phaser.Point(this.game.world.width, slope * this.game.world.width + b);
          var top = new Phaser.Point(-b / slope, 0);
          var bottom = new Phaser.Point((this.game.height - b) / slope, this.game.height);

          // Get the actual intersection point
          if (c.y <= light.y && c.x >= light.x) {
            if (top.x >= 0 && top.x <= this.game.world.width) {
              end = top;
            } else {
              end = right;
            }
          } else if (c.y <= light.y && c.x <= light.x) {
            if (top.x >= 0 && top.x <= this.game.world.width) {
              end = top;
            } else {
              end = left;
            }
          } else if (c.y >= light.y && c.x >= light.x) {
            if (bottom.x >= 0 && bottom.x <= this.game.world.width) {
              end = bottom;
            } else {
              end = right;
            }
          } else if (c.y >= light.y && c.x <= light.x) {
            if (bottom.x >= 0 && bottom.x <= this.game.world.width) {
              end = bottom;
            } else {
              end = left;
            }
          }
        }

        // Create a ray
        ray = new Phaser.Line(light.x, light.y, end.x, end.y);

        // Check if the ray intersected the wall
        intersect = this.getWallIntersection(ray);
        if (intersect) {
          // This is the front edge of the light blocking object
          points.push(intersect);
        } else {
          // Nothing blocked the ray
          points.push(ray.end);
        }
      }
    }, this);

    // Shoot rays at each of the stage corners to see if the corner
    // of the stage is in shadow. This needs to be done so that
    // shadows don't cut the corner.
    for (i = 0; i < stageCorners.length; i++) {
      ray = new Phaser.Line(light.x, light.y, stageCorners[i].x, stageCorners[i].y);
      intersect = this.getWallIntersection(ray);
      if (!intersect) {
        // Corner is in light
        points.push(stageCorners[i]);
      }
    }

    // Now sort the points clockwise around the light
    // Sorting is required so that the points are connected in the right order.
    //
    // This sorting algorithm was copied from Stack Overflow:
    // http://stackoverflow.com/questions/6989100/sort-points-in-clockwise-order
    //
    // Here's a pseudo-code implementation if you want to code it yourself:
    // http://en.wikipedia.org/wiki/Graham_scan
    var center = { x: light.x, y: light.y };
    points = points.sort(function (a, b) {
      if (a.x - center.x >= 0 && b.x - center.x < 0) return 1;
      if (a.x - center.x < 0 && b.x - center.x >= 0) return -1;
      if (a.x - center.x === 0 && b.x - center.x === 0) {
        if (a.y - center.y >= 0 || b.y - center.y >= 0) return 1;
        return -1;
      }

      // Compute the cross product of vectors (center -> a) x (center -> b)
      var det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
      if (det < 0) return 1;
      if (det > 0) return -1;

      // Points a and b are on the same line from the center
      // Check which point is closer to the center
      var d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
      var d2 = (b.x - center.x) * (b.x - center.x) + (b.y - center.y) * (b.y - center.y);
      return 1;
    });

    // Connect the dots and fill in the shape, which are cones of light,
    // with a bright white color. When multiplied with the background,
    // the white color will allow the full color of the background to
    // shine through.
    this.bitmap.context.beginPath();
    this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.bitmap.context.moveTo(points[0].x, points[0].y);
    for (var j = 0; j < points.length; j++) {
      this.bitmap.context.lineTo(points[j].x, points[j].y);
    }
    this.bitmap.context.closePath();
    this.bitmap.context.fill();

    if (BasicGame.Game.developmentMode) {
      // Draw each of the rays on the rayBitmap
      this.rayBitmap.context.clearRect(0, 0, this.game.world.width, this.game.height);
      this.rayBitmap.context.beginPath();
      this.rayBitmap.context.strokeStyle = 'rgb(255, 255, 255)';
      this.rayBitmap.context.fillStyle = 'rgb(255, 255, 255)';
      this.rayBitmap.context.moveTo(points[0].x, points[0].y);
      for (var k = 0; k < points.length; k++) {
        this.rayBitmap.context.moveTo(light.x, light.y);
        this.rayBitmap.context.lineTo(points[k].x, points[k].y);
        this.rayBitmap.context.fillRect(points[k].x - 2, points[k].y - 2, 4, 4);
      }
      this.rayBitmap.context.stroke();
    }
  }, this);

  // This just tells the engine it should update the texture cache
  this.bitmap.dirty = true;
  if (BasicGame.Game.developmentMode) {
    this.rayBitmap.dirty = true;
  }

  this.shadowsDrawn = true;
};

BasicGame.Light.prototype.update = function () {
  if (this.shadowsDrawn === false) {
    this.drawShadows();
  }
  // draw shadows if light is moving in the level
};

// Given a ray, this function iterates through all of the walls and
// returns the closest wall intersection from the start of the ray
// or null if the ray does not intersect any walls.
BasicGame.Light.prototype.getWallIntersection = function (ray) {
  var distanceToWall = Number.POSITIVE_INFINITY;
  var closestIntersection = null;

  // For each of the walls...
  this.walls.forEach(function (wall) {
    // Create an array of lines that represent the four edges of each wall
    var lines = [new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y), new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height), new Phaser.Line(wall.x + wall.width, wall.y, wall.x + wall.width, wall.y + wall.height), new Phaser.Line(wall.x, wall.y + wall.height, wall.x + wall.width, wall.y + wall.height)];

    // Test each of the edges in this wall against the ray.
    // If the ray intersects any of the edges then the wall must be in the way.
    for (var i = 0; i < lines.length; i++) {
      var intersect = Phaser.Line.intersects(ray, lines[i]);
      if (intersect) {
        // Find the closest intersection
        distance = this.game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
        if (distance < distanceToWall) {
          distanceToWall = distance;
          closestIntersection = intersect;
        }
      }
    }
  }, this);

  return closestIntersection;
};

BasicGame.Light.prototype.destroyCurrentWalls = function (walls) {};

BasicGame.Light.prototype.updateWalls = function (level) {
  this.walls = level.walls;
  this.shadowsDrawn = false;
};

},{}],6:[function(require,module,exports){
'use strict';

/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

BasicGame.Lightning = function (game, gameObj) {
  this.game = game;
  this.gameObj = gameObj;
  this.lightningBitmap = null;
  this.lightning = null;
  this.player = null;
  this.eye = null;
  this.level = null;

  this.lightningSound = null;
};

BasicGame.Lightning.prototype.create = function (eye, player, level) {
  this.player = player;
  this.eye = eye;
  this.level = level;

  // Create a bitmap for the lightning bolt texture
  this.lightningBitmap = this.game.add.bitmapData(200, 10000);

  // Create a sprite to hold the lightning bolt texture
  this.lightning = this.game.add.image(this.eye.x, this.eye.y, this.lightningBitmap);
  this.lightning.anchor.setTo(0.5, 0);

  this.fakeThing = this.game.add.sprite(-10, -10, "player");
  this.fakeThing.anchor.setTo(0.5, 0.5);
  this.fakeThing.width = this.fakeThing.height = 16;
  this.fakeThing.alpha = 0;

  // this.game.physics.arcade.enable(this.fakeThing);
  // this.fakeThing.body.immovable = true;
  // this.fakeThing.body.allowGravity = false;

  this.lightningTimer = 0;

  if (!this.lightningSound) {
    this.lightningSound = this.game.add.sound('ray', 0.2);
  }
};

BasicGame.Lightning.prototype.update = function () {
  // check if the ray hits the player
  if (this.player.player && this.fakeThing) {
    if (this.fakeThing.left > this.player.player.left && this.fakeThing.right < this.player.player.right && this.fakeThing.top > this.player.player.top && this.fakeThing.bottom < this.player.player.bottom) {
      this.gameObj.subtractLife();
      this.gameObj.shakeCamera();
    }
    this.fakeThing.x = this.fakeThing.y = -10;
  }
};

BasicGame.Lightning.prototype.shoot = function (target) {
  this.fakeThing.x = this.fakeThing.y = 0;
  var targetPos = {
    x: target.x,
    y: target.y
  };

  // Rotate the lightning sprite so it goes in the
  // direction of the pointer
  this.lightning.rotation = this.game.math.angleBetween(this.lightning.x, this.lightning.y, targetPos.x + 16, targetPos.y + 16) - Math.PI / 2;

  // Calculate the distance from the lightning source to the pointer
  var distance = this.game.math.distance(this.lightning.x, this.lightning.y, targetPos.x + 16, targetPos.y + 16);

  // Create the lightning texture
  this.createLightningTexture(this.lightningBitmap.width / 2, 0, 20, 2, false, distance);

  // Make the lightning sprite visible
  this.lightning.alpha = 1;

  // Fade out the lightning sprite using a tween on the alpha property
  // Check out the "Easing function" examples for more info.
  this.game.add.tween(this.lightning).to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out).to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out).to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out).to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out).to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In).start();

  this.fakeThing.x = targetPos.x + 16;
  this.fakeThing.y = targetPos.y + 16;

  this.lightningSound.play();
};

// This function creates a texture that looks like a lightning bolt
BasicGame.Lightning.prototype.createLightningTexture = function (x, y, segments, boltWidth, branch, distance) {
  // Get the canvas drawing context for the lightningBitmap
  var ctx = this.lightningBitmap.context;
  var width = this.lightningBitmap.width;
  var height = this.lightningBitmap.height;

  // Our lightning will be made up of several line segments starting at
  // the center of the top edge of the bitmap and ending at the target.

  // Clear the canvas
  if (!branch) ctx.clearRect(0, 0, width, height);

  // Draw each of the segments
  for (var i = 0; i < segments; i++) {
    // Set the lightning color and bolt width
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = boltWidth;

    ctx.beginPath();
    ctx.moveTo(x, y);

    // Calculate an x offset from the end of the last line segment and
    // keep it within the bounds of the bitmap
    if (branch) {
      // For a branch
      x += this.game.rnd.integerInRange(-10, 10);
    } else {
      // For the main bolt
      x += this.game.rnd.integerInRange(-30, 30);
    }
    if (x <= 10) x = 10;
    if (x >= width - 10) x = width - 10;

    // Calculate a y offset from the end of the last line segment.
    // When we've reached the target or there are no more segments left,
    // set the y position to the distance to the target. For branches, we
    // don't care if they reach the target so don't set the last coordinate
    // to the target if it's hanging in the air.
    if (branch) {
      // For a branch
      y += this.game.rnd.integerInRange(10, 20);
    } else {
      // For the main bolt
      y += this.game.rnd.integerInRange(20, distance / segments);
    }
    if (!branch && i == segments - 1 || y > distance) {
      // This causes the bolt to always terminate at the center
      // lightning bolt bounding box at the correct distance to
      // the target. Because of the way the lightning sprite is
      // rotated, this causes this point to be exactly where the
      // player clicked or tapped.
      y = distance;
      if (!branch) x = width / 2;
    }

    // draw the line segment
    ctx.lineTo(x, y);
    ctx.stroke();

    // quit when we've reached the target
    if (y >= distance) break;
  }

  // This just tells the engine it should update the texture cache
  this.lightningBitmap.dirty = true;
};

BasicGame.Lightning.prototype.updateLevel = function (level) {
  this.level = level;
};

/*
// Fragment shaders are small programs that run on the graphics card and alter
// the pixels of a texture. Every framework implements shaders differently but
// the concept is the same. This shader takes the lightning texture and alters
// the pixels so that it appears to be glowing. Shader programming itself is
// beyond the scope of this tutorial.
//
// There are a ton of good resources out there to learn it. Odds are that your
// framework already includes many of the most popular shaders out of the box.
//
// This is an OpenGL/WebGL feature. Because it runs in your web browser
// you need a browser that support WebGL for this to work.
Phaser.Filter.Glow = function (game) {
  Phaser.Filter.call(this, game);

  this.fragmentSrc = [
    "precision lowp float;",
    "varying vec2 vTextureCoord;",
    "varying vec4 vColor;",
    'uniform sampler2D uSampler;',

    'void main() {',
    'vec4 sum = vec4(0);',
    'vec2 texcoord = vTextureCoord;',
    'for(int xx = -4; xx <= 4; xx++) {',
    'for(int yy = -3; yy <= 3; yy++) {',
    'float dist = sqrt(float(xx*xx) + float(yy*yy));',
    'float factor = 0.0;',
    'if (dist == 0.0) {',
    'factor = 2.0;',
    '} else {',
    'factor = 2.0/abs(float(dist));',
    '}',
    'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
    '}',
    '}',
    'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
    '}'
  ];
};

Phaser.Filter.Glow.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Glow.prototype.constructor = Phaser.Filter.Glow;
*/

},{}],7:[function(require,module,exports){
'use strict';

/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

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
  this.player = this.game.add.sprite(this.level.initPlayerPos.x, this.level.initPlayerPos.y, 'player');

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
  this.game.input.keyboard.addKeyCapture([this.leftKey, this.rightKey, this.jumpKey]);

  // disable physics in the player's body while the game starts
  this.player.body.enable = false;

  // create a bitmap texture for drawing lines
  if (BasicGame.Game.developmentMode === true) {
    // [ development mode ]
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
  increaseAmount = this.player.width / this.PARTICLES_AMOUNT;

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
        if (particleX < 0 || particleX > this.game.world.width || particleY > this.game.world.height) {
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
  } else {
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
      } else {
        this.currentJumpMultiplier += this.JUMP_MULTIPLIER_AMOUNT;
      }
    } else {
      if (!onLeftWall) {
        this.slideSound.stop();
      } else if (upPressed) {
        this.player.body.acceleration.x = this.ACCELERATION_WALL;
        this.player.body.velocity.y = this.JUMP_SPEED_WALL;

        // jump jump jump
        this.currentJumpMultiplier = 0;
        this.jumpSound.play();
      }
    }
  } else if (rightPressed && this.player.right < this.game.world.width) {
    // If the RIGHT key is down, set the player velocity to move right
    this.leftFirstPress = false;
    this.player.body.acceleration.x = this.ACCELERATION;

    if (this.onTheGround) {
      if (this.rightFirstPress === false) {
        this.rightFirstPress = true;
        this.currentJumpMultiplier = 0;
        this.walkSound.play();
      } else {
        this.currentJumpMultiplier += this.JUMP_MULTIPLIER_AMOUNT;
      }
    } else {
      if (!onRightWall) {
        this.slideSound.stop();
      } else if (upPressed) {
        this.player.body.acceleration.x = -this.ACCELERATION_WALL;
        this.player.body.velocity.y = this.JUMP_SPEED_WALL;

        // jump jump jump
        this.currentJumpMultiplier = 0;
        this.jumpSound.play();
      }
    }
  } else {
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

  if (BasicGame.Game.developmentMode === true) {
    // [ development mode ]
    this.bitmap.dirty = true;
  }
};

BasicGame.Player.prototype.render = function () {
  if (BasicGame.Game.developmentMode === true) {
    // [ development mode ]
    // Sprite debug info
    this.game.debug.bodyInfo(this.player, 0, 100, 'rgba(0,255,0,0.4)');
    this.game.debug.body(this.player, 'rgba(0,255,0,0.4)');
  }

  if (BasicGame.Game.developmentMode === true) {
    // [ development mode ]
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
  this.game.physics.arcade.overlap(this.player, this.level.pieces, function (player, piece) {
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
  }, null, this);

  if (this.level.hasSpikes === true) {
    this.game.physics.arcade.collide(this.player, this.level.walls, function (player, spikePlatform) {
      if (spikePlatform.spikeRef && spikePlatform.spikeRef.isHidden === true) {
        if (this.gameObj.level.spikeSound.isPlaying === false) {
          this.gameObj.level.spikeSound.play();
        }
        spikePlatform.spikeRef.showTween.start();
      }
    }, null, this);

    if (this.level.spikes.openedSpikes > 0) {
      this.game.physics.arcade.overlap(this.player, this.level.spikes, function (player, spike) {
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
BasicGame.Player.prototype.isInShadow = function (checkLeft, checkRight) {
  //Trace rays toward the light from each corner of the player sprite.
  //If ALL the rays intersects a wall, then the player is in the shadows
  var lightImage = BasicGame.light.lightGroup.getAt(0);
  var raysToLight = [];
  var offset = 8;

  if (checkLeft === true) {
    // top left corner
    raysToLight.push(new Phaser.Line(this.player.x + offset, this.player.y + offset, lightImage.x, lightImage.y));

    // bottom left corner
    raysToLight.push(new Phaser.Line(this.player.x + offset, this.player.y + this.player.height - offset, lightImage.x, lightImage.y));
  }

  if (checkRight === true) {
    // top right corner
    raysToLight.push(new Phaser.Line(this.player.x + this.player.width - offset, this.player.y + offset, lightImage.x, lightImage.y));

    // bottom right corner
    raysToLight.push(new Phaser.Line(this.player.x + this.player.width - offset, this.player.y + this.player.height - offset, lightImage.x, lightImage.y));
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
        var lines = [new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y), new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height), new Phaser.Line(wall.x + wall.width, wall.y, wall.x + wall.width, wall.y + wall.height), new Phaser.Line(wall.x, wall.y + wall.height, wall.x + wall.width, wall.y + wall.height)];

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

  return hiddenRays === rays.length;
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

BasicGame.Player.prototype.explote = function () {
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
  timer.add(100, function () {
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
    } else {
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
  this.game.time.create(true).add(100, function () {
    this.player.body.enable = true;
    this.player.body.allowGravity = true;
  }, this).timer.start();
  this.dead = false;
};

BasicGame.Player.prototype.gameInDarkness = function () {
  this.player.alpha = 1;
};

},{}],8:[function(require,module,exports){
'use strict';

// levels for testing:
// 4 (free space for testing jumps)

var BasicGame = BasicGame || {
  language: "en",
  currentLevel: 10,
  deaths: 0,
  rest: 0,
  setDay: function setDay(n) {
    this.currentLevel = n < 10 ? '0' + n : n;
    return this.getCode();
  },
  addDeath: function addDeath() {
    this.deaths++;
    return this.getCode();
  },
  setRest: function setRest() {
    this.rest = 1;
    return this.getCode();
  },
  getCode: function getCode() {
    return this.rest + '' + this.deaths + '' + this.currentLevel;
  },
  readCode: function readCode(code) {
    if (code.length < 4) return;

    this.currentLevel = parseInt(code.slice(code.length - 2, code.length));
    this.deaths = parseInt(code.slice(1, code.length - 2));
    this.rest = parseInt(code.charAt(0));
  },
  getDeaths: function getDeaths() {
    return this.deaths;
  },
  reset: function reset() {
    this.currentLevel = 1;
    this.deaths = 0;
    this.rest = 0;
  }
};

BasicGame.Boot = function (game) {};

BasicGame.Boot.prototype.preload = function () {
  //  Here we load the assets required for our preloader (in this case a background and a loading bar)
  this.load.image('preloaderBackground', 'assets/images/preloader_background-min.png');
  this.load.image('preloaderBar', 'assets/images/preloader_bar.png');
  this.load.image('loading_banner', 'assets/images/loading_banner.png');
};

BasicGame.Boot.prototype.create = function () {
  //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
  this.input.maxPointers = 1;

  //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
  // this.stage.disableVisibilityChange = true;

  //If the parent container of the game is the browser window (ie. document.body), rather than a div, this should set to true.
  this.scale.parentIsWindow = true;

  // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  if (this.game.device.desktop) {
    //  If you have any desktop specific settings, they can go in here
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  } else {
    //  Same goes for mobile settings.
    //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
    this.scale.setMinMax(480, 260, 1024, 640);
    this.scale.forceLandscape = true;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    this.scale.refresh();
  }

  // this.scale.setScreenSize(false);
};

BasicGame.Boot.prototype.update = function () {
  //  By this point the preloader assets have loaded to the cache, we've set the game settings
  //  So now let's start the real preloader going
  if (localStorage.getItem("oh-my-blob")) {
    BasicGame.readCode(localStorage.getItem("oh-my-blob"));
  }
  this.state.start('Preloader');
};

},{}],9:[function(require,module,exports){
'use strict';

BasicGame.Credits = function (game) {
  this.mainMenuKey = Phaser.Keyboard.Z;
  this.goingToMainMenu = false;
  this.fontId = 'font';
  this.creditsImage = null;
  this.creditsMusic = null;
  this.showCreditsTimer = null;
};

BasicGame.Credits.prototype.preload = function () {
  this.load.image('credits', 'assets/images/credits-min.png');
};

BasicGame.Credits.prototype.create = function () {
  var _self = this;

  // set the default values for some properties of the state
  this.goingToGame = false;

  // set the backgound color
  this.game.stage.backgroundColor = 0x000000;

  // load the image that has the credits
  this.creditsImage = this.game.add.image(0, this.game.world.height - 200, 'credits');

  // add the game title
  this.gameTitle = this.game.add.image(this.game.world.width / 2, this.game.world.height / 2, 'title');
  this.gameTitle.anchor.set(0.5, 0.5);
  this.gameTitle.alpha = 0;

  var tapa = new Phaser.BitmapData(this.game, 'credits_tapa', this.game.width, this.game.height);
  tapa.ctx.rect(0, 0, this.game.width, 50);
  tapa.ctx.fillStyle = '#000';
  tapa.ctx.fill();
  this.game.add.sprite(0, this.game.height - 50, tapa);

  this.mainmenuBitmapText = this.add.bitmapText(this.game.world.width - 20, this.game.world.height - 20, this.fontId, "(Z) Main menu / (Z) Menú principal", 32, this.textBitmapsGroup);
  this.mainmenuBitmapText.align = "left";
  this.mainmenuBitmapText.tint = 0xF2C249;
  this.mainmenuBitmapText.anchor.set(1, 1);

  // add the credits music
  if (!this.creditsMusic) {
    this.creditsMusic = this.game.add.sound('splash_music', 0.8, false);
    this.creditsMusic.play();
  } else {
    this.creditsMusic.play();
  }

  this.scrollTween = this.game.add.tween(this.creditsImage);
  this.scrollTween.to({ y: -this.creditsImage.height }, 75 * 1000, null, false);

  this.scrollTween.onComplete.add(function () {
    // show the game name in the middle of the screen
    // this.creditsMusic.fadeOut(7000);
    this.alphaTween = this.game.add.tween(this.gameTitle);
    this.alphaTween.to({ alpha: 1 }, 8000, null, true);
  }, this);

  this.scrollTween.start();
};

BasicGame.Credits.prototype.update = function () {
  if (this.goingToGame === true) {
    return;
  }

  if (this.input.keyboard.isDown(this.mainMenuKey)) {
    this.goingToGame = true;
    this.creditsMusic.stop();
    this.scrollTween.stop();
    this.state.start('MainMenu');
  }
};

},{}],10:[function(require,module,exports){
'use strict';

BasicGame.Game = function (game) {
  // CONSTANTS
  this.LIFES_AMOUNT = 3;

  this.days = null;
  this.player = null;
  this.level = null;
  this.light = null;
  this.eye = null;
  this.lightning = null;
  this.helper = null;
  this.showFPS = null;
  this.map = null;
  this.darknessGroup = null;
  this.darknessTween = null;
  this.brightnessTween = null;
  this.countdownDuration = null;
  this.inDarkness = null;
  this.isLoadingLevel = null;
  this.lifes = null;
  this.lifesGroup = null;

  this.music = null;
};

BasicGame.Game.developmentMode = false;
BasicGame.isRetrying = false;

BasicGame.Game.prototype.preload = function () {
  // create the days object
  this.days = new BasicGame.Days();

  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  // define the size of the world
  this.game.world.setBounds(0, 0, this.game.width, this.game.height);

  // init the level
  this.level = new BasicGame.Level(this.game, this);

  // init the player
  this.player = new BasicGame.Player(this.game, this.input, this);

  // init a light
  this.light = new BasicGame.Light(this.game, this);
  BasicGame.light = this.light;

  // init THE EYE
  this.eye = new BasicGame.Eye(this.game, this);

  // init the lightning
  this.lightning = new BasicGame.Lightning(this.game, this);

  // init the helper
  this.helper = new BasicGame.Helper(this.game, this);
};

BasicGame.Game.prototype.create = function () {
  // define properties
  this.lifes = this.LIFES_AMOUNT;
  this.showFPS = false;
  this.countdownDuration = 0.7;
  this.inDarkness = true;
  this.isLoadingLevel = true;

  // set stage background
  this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, this.getSkyName());

  // configure the camera for shaking
  this.game.camera.setSize(this.game.world.width / 2, this.game.world.height / 2);
  this.game.camera.setPosition(0, 0);

  // add the music
  if (!this.music) {
    this.music = this.game.add.sound('level_music', 0.1, true);
  }

  // create the level
  this.level.create();

  // create the player
  this.player.create(this.level);

  // create the group of sprites for lifes
  this.lifesGroup = this.game.add.group();

  this.createLifeIndicators();

  this.lifesGroup.x = 15;
  this.lifesGroup.y = 0;

  // create the light
  this.light.create(this.level);

  // create THE EYE
  this.eye.create(this.player, this.level, this.lightning);

  // bring to top some things so the game looks better
  if (this.level.spikes) {
    this.game.world.bringToTop(this.level.spikes);
  }
  this.game.world.bringToTop(this.level.walls);
  this.game.world.bringToTop(this.light.lightBitmap);
  this.game.world.bringToTop(this.level.pieces);
  this.game.world.bringToTop(this.lifesGroup);

  // create the darkness
  this.darknessGroup = this.add.group();
  var darknessBitmap = new Phaser.BitmapData(this.game, 'darkness', this.game.width, this.game.height);
  darknessBitmap.ctx.rect(0, 0, this.game.width, this.game.height);
  darknessBitmap.ctx.fillStyle = '#000';
  darknessBitmap.ctx.fill();

  var darknessSprite = new Phaser.Sprite(this.game, 0, 0, darknessBitmap);

  this.darknessGroup.addChild(darknessSprite);

  // create the darkness tween
  this.darknessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
  this.darknessTween.to({ alpha: 1 }, this.countdownDuration * 1000, Phaser.Easing.Quadratic.Out, false);
  this.darknessTween.onComplete.add(this.darknessTweenCompleted, this);

  // create the brightness tween
  this.brightnessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
  this.brightnessTween.to({ alpha: 0 }, 700, null, false);
  this.brightnessTween.onComplete.add(this.brightnessTweenCompleted, this);

  // create flash sprite
  this.flashGroup = this.add.group();
  var flashBitmap = new Phaser.BitmapData(this.game, 'flash', this.game.width, this.game.height);
  flashBitmap.ctx.rect(0, 0, this.game.width, this.game.height);
  flashBitmap.ctx.fillStyle = '#fff';
  flashBitmap.ctx.fill();

  var flashSprite = new Phaser.Sprite(this.game, 0, 0, flashBitmap);
  flashSprite.alpha = 0;
  this.flashGroup.addChild(flashSprite);

  if (this.level.isReady === true) {
    this.levelReady();
  }

  // show FPS
  if (BasicGame.Game.developmentMode) {
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(this.game.world.width / 2 - 80, 100, '', { font: '80px Arial', fill: '#fefefe' });
  }
};

BasicGame.Game.prototype.update = function () {
  // update the light
  this.light.update();

  // update The Player
  this.player.update(this.light);

  // update The Eye
  this.eye.update();

  // update the lightning
  this.lightning.update();

  // show development information
  if (BasicGame.Game.developmentMode) {
    if (this.game.time.fps !== 0) {
      this.fpsText.setText(this.game.time.fps + ' FPS');
    }
  }
};

BasicGame.Game.prototype.levelReady = function () {
  this.level.isReady = false;

  if (BasicGame.isRetrying === false) {
    this.level.showDay();
  } else {
    this.level.levelTextGroup.alpha = 0;
    this.hideDarkness();
  }
};

BasicGame.Game.prototype.levelEnded = function () {
  // notify to the eye that the level was ended
  this.eye.endLevel(true);

  if (this.inDarkness === false) {
    this.helper.timer(100, this.levelEnded.bind(this));
    return;
  }

  this.isLoadingLevel = true;
  this.loadLevel(++BasicGame.currentLevel);
};

BasicGame.Game.prototype.render = function () {
  this.player.render();
  this.level.render();
};

BasicGame.Game.prototype.quitGame = function () {
  //Here you should destroy anything you no longer need.
  //Stop music, delete sprites, purge caches, free resources, all that good stuff.
  this.state.start('MainMenu');
};

BasicGame.Game.prototype.loadLevel = function (levelNumber) {
  if (levelNumber > 30) {
    // congrats, you ended the game
    this.state.start('TheEnd');
    return;
  }

  this.level.destroyCurrentLevel();

  var skyName = this.getSkyName();
  if (this.background.key != skyName) {
    this.load.image(skyName, 'assets/images/' + skyName + '-min.png');
  }

  this.game.load.onLoadComplete.addOnce(function () {
    if (this.background.key != skyName) {
      this.background.loadTexture(skyName);
    }

    this.level.createLevel(levelNumber);

    this.player.updateLevel(this.level);
    this.light.updateWalls(this.level);
    this.eye.updateLevel(this.level);
    this.lightning.updateLevel(this.level);

    this.game.world.bringToTop(this.light.lightBitmap);
    this.game.world.bringToTop(this.level.pieces);
    this.game.world.bringToTop(this.lifesGroup);
    this.game.world.bringToTop(this.darknessGroup);

    if (this.level.isReady === true) {
      BasicGame.isRetrying = false;
      this.levelReady();
    }
  }, this);

  var levelData = this.helper.getLevelIdAndName(levelNumber);
  this.game.load.tilemap(levelData.id, 'assets/tilemaps/maps/' + levelData.name + '.json', null, Phaser.Tilemap.TILED_JSON);

  this.game.load.start();

  // localStorage.setItem("oh-my-blob", BasicGame.setDay(levelNumber));
};

BasicGame.Game.prototype.shakeCamera = function () {
  // shake the camera by moving it up and down 5 times really fast
  this.game.camera.y = 10;
  this.game.camera.x = 10;

  // create the tween for shaking the camera
  this.shakeTween = this.game.add.tween(this.game.camera);
  this.shakeTween.to({ y: -5, x: -5 }, 40, Phaser.Easing.Sinusoidal.InOut, false, 0, 4, true);

  this.shakeTween.onComplete.add(function () {
    // set the camera position to its initial position
    this.game.camera.setPosition(0, 0);
    this.shakeTween.stop();
  }, this);

  this.shakeTween.start();
};

BasicGame.Game.prototype.subtractLife = function () {
  var that = this;

  // if the player collected all the pieces, don't kill him
  if (this.level.endTimer) return;

  // remove one life sprite
  if (this.lifes <= 0) {
    return;
  }

  var lifeTween = this.game.add.tween(this.lifesGroup.getChildAt(--this.lifes));
  lifeTween.to({ alpha: 0 }, 300, Phaser.Easing.Quadratic.Out, true);

  // create the tween for shaking the camera
  this.flashTween = this.game.add.tween(this.flashGroup.getChildAt(0));
  this.flashTween.to({ alpha: 1 }, 40, Phaser.Easing.Sinusoidal.InOut, false, 0, 4, true);

  this.flashTween.onComplete.add(function () {
    this.flashTween.stop();
  }, this);

  this.flashTween.start();

  if (this.lifes <= 0) {
    // save the current level
    // localStorage.setItem("oh-my-blob", BasicGame.addDeath());

    // notify the PLAYER that its time to show the animation for dead
    this.player.explote();

    // notify to the EYE the player has died
    this.eye.rejoice(function () {
      that.showDarkness(200);
    });
  }
};

BasicGame.Game.prototype.subtractAllLifes = function (destroyPlayer) {
  // if the player collected all the pieces, don't kill him
  if (this.level.endTimer) {
    return;
  }

  // localStorage.setItem("oh-my-blob", BasicGame.addDeath());

  this.lifes = 0;

  var lifeTween = this.game.add.tween(this.lifesGroup);
  lifeTween.to({ alpha: 0 }, 180, Phaser.Easing.Quadratic.Out, true);

  this.eye.endLevel(false);

  if (destroyPlayer) {
    // play the animation of death of the player
    this.player.explote();

    // create the timer to give the player die animation time to be played
    this.helper.timer(1000, function () {
      this.showDarkness(200);
    }, this);
  } else {
    this.showDarkness(200);
  }
};

BasicGame.Game.prototype.showDarkness = function (durationInMS) {
  this.game.world.bringToTop(this.darknessGroup);
  this.darknessTween.updateTweenData("duration", durationInMS || this.countdownDuration * 1000);
  this.darknessTween.start();
};

BasicGame.Game.prototype.darknessTweenCompleted = function () {
  this.inDarkness = true;

  this.eye.gameInDarkness();
  this.player.gameInDarkness();

  this.showLifes();
  if (this.lifes <= 0) {
    this.restartLevel(true);
  }
};

BasicGame.Game.prototype.hideDarkness = function (durationInMS) {
  this.inDarkness = false;
  this.brightnessTween.updateTweenData("duration", durationInMS || this.countdownDuration * 1000);
  this.brightnessTween.start();
};

BasicGame.Game.prototype.brightnessTweenCompleted = function () {
  // this.eye.eyeStateTimer = this.eye.searchingTime;
  this.isLoadingLevel = false;

  this.lifes = this.LIFES_AMOUNT;

  // make the EYE seek for the player
  this.eye.levelStart();

  if (this.music.isPlaying === false) {
    // this.music.play();
  }

  this.player.player.body.enable = true;
};

BasicGame.Game.prototype.restartLevel = function (runHideDarkness) {
  // restore the alpha for life indicators and lifes group
  this.lifes = this.LIFES_AMOUNT;
  this.showLifes();

  this.player.restartLevel();
  this.level.restartLevel();
  this.eye.restartLevel();

  if (runHideDarkness === true) {
    this.hideDarkness(200);
  }
};

BasicGame.Game.prototype.createLifeIndicators = function () {
  for (var i = 0; i < this.lifes; i++) {
    var lifeSprite = new Phaser.Sprite(this.game, 0, 0, "player");
    lifeSprite.scale.set(0.5, 0.8);
    lifeSprite.x = i % 3 * (lifeSprite.width + 6);

    this.lifesGroup.addChild(lifeSprite);
  }
};

BasicGame.Game.prototype.showLifes = function () {
  this.lifesGroup.alpha = 1;
  this.lifesGroup.forEach(function (lifeSprite) {
    lifeSprite.alpha = 1;
  });
};

BasicGame.Game.prototype.getSkyName = function () {
  return this.helper.getSkyName(BasicGame.currentLevel);
};

},{}],11:[function(require,module,exports){
"use strict";

/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6544/ColorCombo6544.html 
 */

BasicGame.GameOver = function (game) {
  this.fontId = 'font';

  this.gameOverBitmap = null;
  this.gameOverGroup = null;

  this.phraseBitmap = null;
  this.phraseGroup = null;

  this.tryAgainBitmap = null;
  this.sPressedFlag = false;

  this.bSpeech = {
    "a": {
      "es": "Bill: Pensé que lo había superado.",
      "en": "Bill: I thought I had overcome this."
    },
    "b": {
      "es": "Bill: Creo que nunca lograré superarlo.",
      "en": "Bill: I think I'll never be able to get over this."
    },
    "c": {
      "es": "Bill: No puedo más con esto.",
      "en": "Bill: I can't handle this."
    }
  };

  this.hSpeech = {
    "es": "Hub: Espera...¿Qué vas a hacer?",
    "en": "Hub: Wait...¿What are you going to do?"
  };

  this.tryAgainText = {
    "es": "Reintentar (Barra espaciadora)",
    "en": "Try again (Spacebar)"
  };
  this.tryAgainKey = Phaser.Keyboard.SPACEBAR;
};

BasicGame.GameOver.prototype.create = function () {
  // set stage background
  // this.game.stage.backgroundColor = 0x000;
  this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, this.getSkyName());
  this.background.alpha = 0.3;

  // create the group and text for the "Game Over" text
  this.gameOverGroup = this.game.add.group();
  this.dialogTextBitmap = this.add.bitmapText(this.game.world.width / 2, this.game.world.height / 2 - 20, this.fontId, this.getPhrase(), 48, this.gameOverGroup);
  this.dialogTextBitmap.anchor.set(.5, .5);
  this.dialogTextBitmap.tint = 0xFFFFFF;

  // create the group and text for the phrase
  this.phraseGroup = this.game.add.group();
  this.phraseBitmap = this.add.bitmapText(this.game.world.width / 2, this.dialogTextBitmap.bottom + 20, this.fontId, this.hSpeech[BasicGame.language], 48, this.phraseGroup);
  this.phraseBitmap.anchor.set(.5, .5);
  this.phraseBitmap.tint = 0xFFFF50;

  // create the group and text for Try again
  this.tryAgainGroup = this.game.add.group();
  this.tryAgainBitmap = this.game.add.bitmapText(this.game.world.width / 2, this.game.world.height / 2 + 280, this.fontId, this.tryAgainText[BasicGame.language], 36, this.tryAgainGroup);
  this.tryAgainBitmap.anchor.set(.5, .5);
  this.tryAgainBitmap.tint = 0xF2C249;

  // add the keyboard listener for Try again
  this.game.input.keyboard.addKeyCapture([this.tryAgainKey]);
};

BasicGame.GameOver.prototype.update = function () {
  if (this.input.keyboard.isDown(this.tryAgainKey) && this.sPressedFlag == false) {
    BasicGame.isRetrying = true;
    this.state.start('Game');
  } else if (!this.input.keyboard.isDown(this.tryAgainKey) && this.sPressedFlag == true) {
    this.sPressedFlag = false;
  }
};

BasicGame.GameOver.prototype.getPhrase = function () {
  if (BasicGame.currentLevel <= 10) {
    return this.bSpeech.a[BasicGame.language];
  } else if (BasicGame.currentLevel <= 20) {
    return this.bSpeech.b[BasicGame.language];
  } else {
    return this.bSpeech.c[BasicGame.language];
  }
};

BasicGame.GameOver.prototype.getSkyName = function () {
  if (BasicGame.currentLevel <= 10) {
    return 'sky01';
  } else if (BasicGame.currentLevel <= 20) {
    return 'sky02';
  } else {
    return 'sky03';
  }
};

},{}],12:[function(require,module,exports){
'use strict';

/* COLORCOMBO
 * http://www.colorcombos.com/color-schemes/6544/ColorCombo6544.html 
 */

BasicGame.Intro = function (game) {
  this.background = null;
  this.skipKey = Phaser.Keyboard.Z;

  this.fontId = 'font';
  this.textColors = {
    'Hub': 0xFFFF50,
    'Bill': 0xFFFFFF
  };
  this.dialogs = {
    "es": [{
      character: 'Hub',
      text: 'Tienes que calmarte, todo estará bien.',
      bips: 3
    }, {
      character: 'Bill',
      text: '¿Cómo puedes decir eso? No puedo hacerlo!',
      bips: 3
    }, {
      character: 'Hub',
      text: 'Descansa, ya verás cómo en unos días dejará de acecharte.',
      bips: 5
    }, {
      character: 'Bill',
      text: 'Creo que no seré capaz...',
      bips: 2
    }],
    "en": [{
      character: 'Hub',
      text: 'Calm down, all its going to be fine.',
      bips: 3
    }, {
      character: 'Bill',
      text: "How can you say that? I can't do that!",
      bips: 3
    }, {
      character: 'Hub',
      text: 'Have a rest, it will stop haunting you in a few days.',
      bips: 4
    }, {
      character: 'Bill',
      text: "I think I won't be able to handle this...",
      bips: 3
    }]
  };
  this.textBitmapsGroup = null;
  this.dialogTextBitmap = null;
  this.dialogNumber = 0;
  this.dialogTween = null;

  this.skipGroup = null;
  this.skipBitmap = null;
  this.skipText = {
    "es": "Siguiente (Z)",
    "en": "Next (Z)"
  };
  this.sPressedFlag = false;

  this.goingToGame = false;

  this.BSound = null;
  this.HSound = null;
  this.soundLoopTimer = null;
};

BasicGame.Intro.prototype.create = function () {
  // set the backgound
  this.game.stage.backgroundColor = 0x000000;
  // this.background = this.game.add.tileSprite(0, 0,
  //   this.game.world.width, this.game.world.height, "sky03");
  // this.background.alpha = 0.2;

  // create the group and text for the dialog and the Skip
  this.textBitmapsGroup = this.game.add.group();

  this.dialogTextBitmap = this.add.bitmapText(this.game.world.width / 2, this.game.world.height / 2, this.fontId, '???', 36, this.textBitmapsGroup);
  this.dialogTextBitmap.align = "left";
  this.dialogTextBitmap.anchor.set(.5, .5);
  this.dialogTextBitmap.alpha = 0;

  // create the group and the text for Skip
  this.skipGroup = this.game.add.group();
  this.skipBitmap = this.add.bitmapText(this.game.world.width - 20, this.game.world.height - 20, this.fontId, this.skipText[BasicGame.language], 32, this.textBitmapsGroup);
  this.skipBitmap.align = "left";
  this.skipBitmap.tint = 0xF2C249;
  this.skipBitmap.anchor.set(1, 1);

  // add the keyboard listener for Skip
  this.game.input.keyboard.addKeyCapture([this.skipKey]);

  // create the tween to use in the dialog
  this.dialogTween = this.game.add.tween(this.dialogTextBitmap);
  this.dialogTween.to({ alpha: 1 }, 300, Phaser.Easing.Quadratic.Out, false);

  // load the sounds of B and H
  this.BSound = this.game.add.sound('b', 0.2);
  this.HSound = this.game.add.sound('h', 0.2);

  // show the first dialog
  this.updateDialog();
};

BasicGame.Intro.prototype.update = function () {
  if (this.goingToGame === true) {
    return;
  }

  if (this.input.keyboard.isDown(this.skipKey) && this.sPressedFlag == false) {
    this.sPressedFlag = true;
    this.dialogTween.onComplete.dispatch(this.dialogTween.target, this.dialogTween);
    // this.dialogTextBitmap.alpha = 1;
    this.updateDialog();
  } else if (!this.input.keyboard.isDown(this.skipKey) && this.sPressedFlag == true) {
    this.sPressedFlag = false;
  }
};

BasicGame.Intro.prototype.updateDialog = function () {
  if (this.dialogNumber <= this.dialogs[BasicGame.language].length - 1) {
    var dialogObj = this.dialogs[BasicGame.language][this.dialogNumber];
    // there are still dialogs to be shown
    var currentDialogLine = dialogObj.text;
    var character = dialogObj.character;

    this.dialogTextBitmap.tint = this.textColors[character];
    this.dialogTextBitmap.setText(character + ': ' + currentDialogLine);

    this.dialogTextBitmap.alpha = 0;
    this.dialogTween.start();

    // play the bips of the dialog
    if (dialogObj.bips > 0) {
      this.soundLoopTimer = this.game.time.create(true);
      this.soundLoopTimer.repeat(100, dialogObj.bips, function () {
        this[dialogObj.character.charAt(0) + "Sound"].play();
      }, this);
      this.soundLoopTimer.start();
    }

    this.dialogNumber++;
  } else {
    // tween the dialog bitmap to alpha = 0, then, start the game.
    this.goingToGame = true;
    this.game.add.tween(this.textBitmapsGroup).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
      this.state.start('Game');
    }, this);
  }
};

},{}],13:[function(require,module,exports){
'use strict';

BasicGame.MainMenu = function (game) {
  this.splash_music = null;
  this.playButton = null;
  this.jugarButton = null;
  this.showIntroTimer = null;
  this.enSound = null;
  this.esSound = null;
  this.listenKeys = false;

  this.fontId = 'font';
  this.creditsTextBitmap = null;
  this.restartTextBitmap = null;
};

BasicGame.MainMenu.prototype.create = function () {
  var _self = this;

  // set stage background
  this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, BasicGame.Helper.prototype.getSkyName(BasicGame.currentLevel));

  // add the fake zone of view for the splash screen
  this.fakeViewZone = this.game.add.image(this.game.world.width / 2, 0, 'splash_view');
  this.fakeViewZone.anchor.set(0.5, 0);
  this.fakeViewZone.alpha = 0;
  this.fakeViewZone.tint = 0xFFFC19;

  // add the fake EYE
  this.fakeEye = this.game.add.sprite(this.game.world.width / 2, 64, 'eye', 10);
  this.fakeEye.anchor.set(0.5, 0.5);
  this.pupil = this.game.add.image(this.fakeEye.x, this.fakeEye.y, 'pupil');
  this.pupil.anchor.set(0.5, 0.5);
  this.pupil.alpha = 0;

  // draw floors and platforms
  this.map = this.game.add.tilemap('splash_lvl');
  this.ground = this.game.add.group();
  this.map.createFromObjects("floor", "", 'platform', 0, true, false, this.ground, Phaser.Sprite, false);
  this.walls = this.game.add.group();
  this.map.createFromObjects("platforms", "", 'platform', 0, true, false, this.walls, Phaser.Sprite, false);

  // add the fake player
  this.fakeplayer = this.game.add.sprite(this.map.objects.player_pos[0].x, this.map.objects.player_pos[0].y, 'player');
  this.movingPlayer = false;

  // add light and generate shadows
  this.light = new BasicGame.Light(this.game, this);
  this.light.create(this);
  this.light.drawShadows();

  // create the play buttons
  this.buttons = this.game.add.group();
  this.playButton = this.add.sprite(-20, this.world.height - 150, BasicGame.currentLevel === 1 ? 'playButton' : 'continueButton', 0);
  this.playButton.anchor.set(0, 0);
  this.playButton.scale.setTo(0.5, 0.5);
  this.playButton.alpha = 0.8;

  this.jugarButton = this.add.sprite(this.world.width + 20, this.world.height - 150, BasicGame.currentLevel === 1 ? 'jugarButton' : 'continuarButton', 0);
  this.jugarButton.anchor.set(1, 0);
  this.jugarButton.scale.setTo(0.5, 0.5);
  this.jugarButton.alpha = 0.8;

  // create the credits button
  this.creditsTextBitmap = this.add.bitmapText(this.game.world.width / 2, this.game.world.height - 32, this.fontId, '(C) Credits/Créditos', 36);
  this.creditsTextBitmap.align = "center";
  this.creditsTextBitmap.anchor.set(0.5, 0);

  if (BasicGame.currentLevel > 1) {
    this.restartTextBitmap = this.add.bitmapText(this.game.world.width / 2 + 10, this.game.world.height - 32, this.fontId, '(R) Restart/Reiniciar', 36);
    this.restartTextBitmap.align = "center";

    this.creditsTextBitmap.anchor.set(1, 0);
    this.creditsTextBitmap.x -= 10;
  }

  this.buttons.addChild(this.playButton);
  this.buttons.addChild(this.jugarButton);
  this.buttons.addChild(this.creditsTextBitmap);
  if (BasicGame.currentLevel > 1) {
    this.buttons.addChild(this.restartTextBitmap);
  }
  this.buttons.alpha = 0;

  // add the game title
  this.gameTitle = this.game.add.image(this.game.world.width / 2 - 5, this.game.world.height / 2 + 150, 'title');
  this.gameTitle.anchor.set(0.5, 0.5);

  // add key listeners
  this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);

  // load sounds
  if (!this.enSound) {
    this.enSound = this.game.add.sound('en-lang', 0.2);
  }

  if (!this.esSound) {
    this.esSound = this.game.add.sound('es-lang', 0.2);
  }

  // create the go-to-next-state timer
  this.showIntroTimer = this.game.time.create(true);
  this.showIntroTimer.add(200, function () {
    this.showIntro();
  }, this);

  // add the splash_music
  if (!this.splash_music) {
    this.splash_music = this.game.add.sound('splash_music', 0.2, true);
    this.splash_music.onFadeComplete.addOnce(function (soundObj) {
      soundObj.stop();
    }, this);
    this.splash_music.play();
  }

  // DARKNESS
  if (BasicGame.currentLevel === 1) {
    this.darknessGroup = this.add.group();
    var darknessBitmap = new Phaser.BitmapData(this.game, 'darkness_main', this.game.width, this.game.height);
    darknessBitmap.ctx.rect(0, 0, this.game.width, this.game.height);
    darknessBitmap.ctx.fillStyle = '#000';
    darknessBitmap.ctx.fill();
    var darknessSprite = new Phaser.Sprite(this.game, 0, 0, darknessBitmap);
    this.darknessGroup.addChild(darknessSprite);

    this.darknessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
    this.darknessTween.to({ alpha: 0 }, 5000, Phaser.Easing.Quadratic.Out, true, 4500);
    this.darknessTween.onComplete.add(function () {
      this.showButtons();
    }, this);
  } else {
    this.showButtons();
  }
};

BasicGame.MainMenu.prototype.update = function () {
  if (this.listenKeys === false || this.movingPlayer === true) {
    return;
  }

  if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    // this.world.bringToTop(this.playButton);
    this.enSound.play();
    this.playButton.frame = 1;
    this.playButton.alpha = 1;
    this.moveFakePlayer(-32);
  } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    // this.world.bringToTop(this.jugarButton);
    this.esSound.play();
    this.jugarButton.frame = 1;
    this.jugarButton.alpha = 1;
    BasicGame.language = "es";
    this.moveFakePlayer(this.game.world.width + 32);
  } else if (this.input.keyboard.isDown(Phaser.Keyboard.C)) {
    // load the credits scene
    this.listenKeys = false;
    this.splash_music.stop();
    this.state.start('Credits');
  } else if (this.input.keyboard.isDown(Phaser.Keyboard.R)) {

    // clean the localStorage, then set the currrent level to 1, show intro
    this.listenKeys = false;
    localStorage.removeItem("oh-my-blob");
    BasicGame.reset();
    this.splash_music.stop();
    this.showIntro();
  }
};

BasicGame.MainMenu.prototype.moveFakePlayer = function (targetX) {
  this.splash_music.fadeOut(1480);
  this.movingPlayer = true;
  var moveTween = this.game.add.tween(this.fakeplayer).to({ x: targetX }, 1500, null, false);
  moveTween.onComplete.add(function () {
    this.showIntro();
  }, this);
  moveTween.start();
};

BasicGame.MainMenu.prototype.showButtons = function () {
  var showButtonsTween = this.game.add.tween(this.buttons).to({ alpha: 1 }, 1000, null, false);
  showButtonsTween.onComplete.add(function () {
    this.fakeEye.frame = 0;
    this.pupil.alpha = 1;
    this.fakeViewZone.alpha = 0.1;
    this.listenKeys = true;
  }, this);
  showButtonsTween.start();
};

BasicGame.MainMenu.prototype.showIntro = function () {
  this.state.start(BasicGame.currentLevel === 1 ? 'Intro' : 'Game');
};

},{}],14:[function(require,module,exports){
'use strict';

BasicGame.Preloader = function (game) {
  this.background = null;
  this.preloadBar = null;
  this.ready = false;
};

BasicGame.Preloader.prototype.preload = function () {
  var i = 0;

  // these are the assets we loaded in Boot.js
  // a nice sparkly background and a loading progress bar
  this.background = this.add.sprite(0, 0, 'preloaderBackground');
  this.banner = this.add.image(this.game.world.width / 2, this.game.world.height - 40, 'loading_banner');
  this.banner.anchor.set(0.5, 0);
  this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');

  // set the preloadBar sprite as a loader sprite.
  // automatically crop the sprite from 0 to full-width as the
  // files below are loaded in.
  this.load.setPreloadSprite(this.preloadBar, 1);

  //  ---| load the assets for the Main menu
  this.load.image('splash_view', 'assets/images/splash_view.png');
  this.load.image('title', 'assets/images/title.png');
  this.load.spritesheet('playButton', 'assets/sprites/play_button.png', 400, 256);
  this.load.spritesheet('jugarButton', 'assets/sprites/jugar_button.png', 400, 256);
  this.load.spritesheet('continueButton', 'assets/sprites/continue_button.png', 400, 256);
  this.load.spritesheet('continuarButton', 'assets/sprites/continuar_button.png', 400, 256);
  this.load.image('pupil', 'assets/images/pupil.png');
  this.load.audio('splash_music', 'assets/music/splash_music.ogg', true);
  this.load.audio('en-lang', 'assets/soundfx/en.ogg', true);
  this.load.audio('es-lang', 'assets/soundfx/es.ogg', true);
  this.game.load.tilemap('splash_lvl', 'assets/tilemaps/maps/splash.json', null, Phaser.Tilemap.TILED_JSON);

  //  ---| load the assets for the Game
  this.load.image('light', 'assets/images/light.png');
  this.load.image('view_zone', 'assets/images/view_zone.png');
  this.load.image('piece', 'assets/images/piece.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.spritesheet('player', 'assets/sprites/player.png', 32, 32);
  this.load.spritesheet('eye', 'assets/sprites/eye.png', 192, 96);
  this.load.audio('b', 'assets/soundfx/b.ogg', true);
  this.load.audio('h', 'assets/soundfx/h.ogg', true);
  this.load.audio('jump', 'assets/soundfx/jump.ogg', true);
  this.load.audio('walk', 'assets/soundfx/walk.ogg', true);
  this.load.audio('slide', 'assets/soundfx/slide.ogg', true);
  this.load.audio('fall', 'assets/soundfx/fall.ogg', true);
  this.load.audio('death', 'assets/soundfx/death.ogg', true);
  this.load.audio('day', 'assets/soundfx/day.ogg', true);
  this.load.audio('ray', 'assets/soundfx/ray.ogg', true);
  this.load.audio('eye', 'assets/soundfx/eye.ogg', true);
  this.load.audio('eye-anger', 'assets/soundfx/anger.ogg', true);
  this.load.audio('level_music', 'assets/music/levels_music.ogg', true);
  this.load.bitmapFont('font', 'assets/fonts/teko-light_0.png', 'assets/fonts/teko-light.fnt', null, 5);

  // load the sound for pieces
  this.load.audio('piece', 'assets/soundfx/piece01.ogg', true);

  // it will not be necessary to load this one if the player already passed the
  // first part of the game
  var skyName = BasicGame.Helper.prototype.getSkyName(BasicGame.currentLevel);
  this.load.image(skyName, 'assets/images/' + skyName + '-min.png');

  // load this if the current level stored requires it, otherwise load it
  // when the player is near the end of the corresponding chapter
  // this.load.image('spike-platform', 'assets/images/spike-platform.png');
  // this.load.image('spike', 'assets/images/spike.png');
  // this.load.image('spike-r', 'assets/images/spike-r.png');
  // this.load.image('spike-l', 'assets/images/spike-l.png');
  // this.load.image('spike-d', 'assets/images/spike-d.png');
  // this.load.audio('spike', 'assets/soundfx/spike.ogg', true);

  var levelData = BasicGame.Helper.prototype.getLevelIdAndName(BasicGame.currentLevel);
  this.game.load.tilemap(levelData.id, 'assets/tilemaps/maps/' + levelData.name + '.json', null, Phaser.Tilemap.TILED_JSON);
};

BasicGame.Preloader.prototype.create = function () {
  //Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
  this.preloadBar.cropEnabled = false;
};

BasicGame.Preloader.prototype.update = function () {
  //this.cache.isSoundDecoded('mainMenuMusic')
  if (this.ready === false) {
    this.ready = true;
    this.state.start('MainMenu');
  }
};

},{}],15:[function(require,module,exports){
'use strict';

BasicGame.TheEnd = function (game) {
  this.background = null;
  this.fontId = 'font';
  this.textColors = {
    'H': 0x000000,
    'B': 0xFFFFFF
  };
  this.dialogs = {
    "es": [{
      character: 'B',
      text: 'Han pasado 388 días desde que acabé con la vida de Margareth.',
      bips: 3,
      waitTime: 3
    }, {
      character: 'B',
      text: 'Estuve a punto de darme por vencido unas # veces; de contarlo todo a la policía.',
      bips: 5,
      waitTime: 5
    }, {
      character: 'B',
      text: 'Los primeros días fueron muy difíciles. Me costaba mucho evitar El Remordimiento.',
      bips: 4,
      waitTime: 5
    }, {
      character: 'B',
      text: 'Pero lo he logrado.',
      bips: 1,
      waitTime: 2
    }, {
      character: 'B',
      text: 'Ahora que lo pienso, beneficiarse de la muerte de otro no es algo malo.',
      bips: 4,
      waitTime: 5
    }, {
      character: 'B',
      text: 'Creo que empiezo a entender la forma de pensar de mi hermano.',
      bips: 3,
      waitTime: 3
    }],
    "en": [{
      character: 'B',
      text: '388 days has passed since I murdered Margareth.',
      bips: 2,
      waitTime: 3
    }, {
      character: 'B',
      text: 'I was tempted to tell all to the police like 30 times.',
      bips: 3,
      waitTime: 4
    }, {
      character: 'B',
      text: 'The first days were the hardest. It was very difficult to avoid The Remorse.',
      bips: 4,
      waitTime: 5
    }, {
      character: 'B',
      text: 'But I succeeded.',
      bips: 1,
      waitTime: 2
    }, {
      character: 'B',
      text: 'Now that I think about it, get benefit from another\'s death is not such bad thing.',
      bips: 4,
      waitTime: 5
    }, {
      character: 'B',
      text: 'I think I start to understand the way my brother thinks.',
      bips: 3,
      waitTime: 3
    }]
  };
  this.textBitmapsGroup = null;
  this.dialogNumber = 0;
  this.BSound = null;
  this.soundLoopTimer = null;
  this.cloudsLimit = 9;

  this.music = null;
};

BasicGame.TheEnd.prototype.preload = function () {
  this.load.image('end_scene', 'assets/images/end_scene-min.png');
  this.load.image('sun_light', 'assets/images/sun_light-min.png');
  this.load.atlas('clouds', 'assets/sprites/clouds.png', 'assets/sprites/clouds.xml', null, Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);
  this.load.audio('the_end', 'assets/music/the_end.ogg', true);
};

BasicGame.TheEnd.prototype.create = function () {
  // set the background for the scene
  // this.game.stage.backgroundColor = 0x000000;
  this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, "end_scene");

  // load the sound for B's voice
  this.BSound = this.game.add.sound('b', 0.2);

  // show the first line of The Confession
  var firstDialogTimer = this.game.time.create(true);
  firstDialogTimer.add(2500, function () {
    this.updateDialog();
  }, this);
  firstDialogTimer.start();

  // create the loop that will generate clouds
  this.cloudsContainer = this.game.add.group();

  // fill the scene with 3 clouds
  this.createCloud(true);
  this.createCloud(true);
  this.createCloud(true);

  this.cloudsTimer = this.game.time.create(true);
  this.cloudsTimer.loop(8000, function () {
    this.createCloud();
  }, this);
  this.cloudsTimer.start();

  // play the music
  this.music = this.game.add.sound('the_end', 0.1, true);
  this.music.play();

  // add the sun light for the clouds
  this.game.add.image(0, -96, 'sun_light').alpha = 0.5;

  // create the group that will contain the dialog
  this.textBitmapsGroup = this.game.add.group();
  this.textBitmapsGroup.y = 10;
  this.textBitmapsGroup.x = 0;
};

BasicGame.TheEnd.prototype.update = function () {};

BasicGame.TheEnd.prototype.updateDialog = function () {
  if (this.dialogNumber <= this.dialogs[BasicGame.language].length - 1) {
    var dialogObj = this.dialogs[BasicGame.language][this.dialogNumber];
    // there are still dialogs to be shown
    var currentDialogLine = dialogObj.text;
    var character = dialogObj.character;

    if (currentDialogLine.indexOf("#") !== -1) {
      currentDialogLine = currentDialogLine.replace("#", BasicGame.getDeaths() || 500);
    }

    this.showText(this.createText(currentDialogLine, this.textColors[character]), dialogObj.waitTime);

    // play the bips of the dialog
    if (dialogObj.bips > 0) {
      this.soundLoopTimer = this.game.time.create(true);
      this.soundLoopTimer.repeat(100, dialogObj.bips, function () {
        this[dialogObj.character + "Sound"].play();
      }, this);
      this.soundLoopTimer.start();
    }

    this.dialogNumber++;
  }
};

BasicGame.TheEnd.prototype.createText = function (text, tint) {
  if (!this.yPosDialog) {
    this.yPosDialog = 30;
  }

  var textBitmapsGroupChilds = this.textBitmapsGroup.children;
  if (textBitmapsGroupChilds.length > 0) {
    this.yPosDialog += textBitmapsGroupChilds[textBitmapsGroupChilds.length - 1].y + textBitmapsGroupChilds[textBitmapsGroupChilds.length - 1].height;
    this.yPosDialog += 10;
  }

  var textsGroup = this.game.add.group(this.textBitmapsGroup);
  textsGroup.alpha = 0;

  var dialogTextShadowBitmap = this.add.bitmapText(42, this.yPosDialog + 2, this.fontId, text, 40, textsGroup);
  dialogTextShadowBitmap.align = "left";
  dialogTextShadowBitmap.anchor.set(0, 0);
  dialogTextShadowBitmap.tint = 0x000000;
  dialogTextShadowBitmap.maxWidth = this.game.world.width - 100;
  dialogTextShadowBitmap.alpha = 0.6;

  var dialogTextBitmap = this.add.bitmapText(40, this.yPosDialog, this.fontId, text, 40, textsGroup);
  dialogTextBitmap.align = "left";
  dialogTextBitmap.anchor.set(0, 0);
  dialogTextBitmap.tint = tint || 0xFFFFFF;
  dialogTextBitmap.maxWidth = this.game.world.width - 100;

  return textsGroup;
};

BasicGame.TheEnd.prototype.showText = function (displayObj, timeForRead) {
  this.dialogTween = this.game.add.tween(displayObj);
  this.dialogTween.to({ alpha: 1 }, 400, Phaser.Easing.Quadratic.In, false);
  this.dialogTween.onComplete.addOnce(function () {
    this.dialogTween.stop();

    var nextDialogTimer = this.game.time.create(true);
    nextDialogTimer.add(timeForRead * 1000, function () {
      this.updateDialog();
    }, this);
    nextDialogTimer.start();
  }, this);
  this.dialogTween.start();
};

BasicGame.TheEnd.prototype.getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

BasicGame.TheEnd.prototype.createCloud = function (insideScreen) {
  // add the cloud out of the screen
  var cloudX = 0;

  if (insideScreen === true) {
    cloudX = this.getRandom(100, this.game.world.width - 150);
  } else {
    cloudX = this.game.world.width + this.getRandom(10, 20);
  }

  var cloudImg = this.game.add.image(cloudX, 0, 'clouds', 'cloud0' + this.getRandom(1, 9) + '.png', this.cloudsContainer);
  cloudImg.y = this.getRandom(0 - cloudImg.height / 2, this.game.world.height - cloudImg.height - 210);
  cloudImg.alpha = Math.min(Math.random(), 0.3);

  // create the tween that will move the cloud
  this.cloudTween = this.game.add.tween(cloudImg);
  this.cloudTween.to({ x: 0 - cloudImg.width - 20 }, 30000, null, false);
  this.cloudTween.onComplete.addOnce(function () {
    this.target.destroy();
    this.stop();
  }, this.cloudTween);
  this.cloudTween.start();
};

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
//# sourceMappingURL=itsgame.js.map
