/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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

  this.shooting = null;
  this.searching = null;

  // 20 seconds searching the player before going crazy
  this.searchingTime = 19000;
  this.zoneSize = this.game.world.width / 3;

  // view zone
  this.viewZoneSprite = null;

  this.laughSound = null;
  this.angerSound = null;

  this.currentPattern = -1;
};

BasicGame.Eye.prototype.create = function (playerObj, level, lightning) {
  this.PlayerObj = playerObj;
  this.level = level;
  this.lightning = lightning;
  this.shooting = false;
  this.searching = false;

  // add the sprite of the eye
  this.eye = this.game.add.sprite(this.game.world.width / 2, 64, 'eye', 0);
  this.eye.originalX = this.eye.x;
  this.eye.originalY = this.eye.y;

  this.pupil = this.game.add.image(this.eye.x, this.eye.y, 'pupil');
  this.pupil.alpha = 0;
  this.pupilImagePositions = {
    '3': this.eye.x - 16 * 3,
    '2': this.eye.x - 16 * 2,
    '1': this.eye.x - 16 * 1,
    '0': this.eye.x,
    '4': this.eye.x + 16 * 1,
    '5': this.eye.x + 16 * 2,
    '6': this.eye.x + 16 * 3
  };

  // set the pivot point of the light to the center of the texture
  this.eye.anchor.setTo(0.5, 0.5);
  this.pupil.anchor.setTo(0.5, 0.5);

  // set the animations for THE EYE
  // this.eye.animations.add('search', [0,1,2,3,3,3,2,1,0,4,5,6,6,6,5,4], 2, true);
  this.eye.animations.add('search', [0], 1, false);
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

  this.patterns = [
    [[0,3,2], [3, 6, 4], [6, 0, 2]],
    [[0,1,0.5], [1, 4, 1], [4, 2, 1], [2, 5, 2], [5, 0, 1]],
    [[0,3,0.2], [3, 6, 0.4], [6, 0, 0.2]],
    [[0,4,0.5], [4, 1, 1], [1, 5, 1], [5, 2, 2], [2, 0, 1]]
  ];

  if (!this.laughSound) {
    this.laughSound = this.game.add.sound('eye', 0.1);
  }

  if (!this.angerSound) {
    this.angerSound = this.game.add.sound('eye-anger', 0.8);
  }
};

BasicGame.Eye.prototype.update = function () {
  if(BasicGame.Game.developmentMode === true) {
    // clear the bitmap where we are drawing our lines
    this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
  }

  if (this.searching === false) this.pupil.alpha = 0;

  this.viewZoneSprite.visible = this.searching;

  if(this.gameObj.isLoadingLevel === true) {
    // the EYE will start the level as irritated (sleeping)
    this.eye.animations.play('irritated');
    return;
  }

  if(this.eye.animations.currentAnim.name === 'happy') {
    // the player is dead, I'm the happiest EYE in the hole universe
    return;
  }

  // ray casting!!!
  // test if the target can see the eye by casting a ray (a line) towards the eye.
  // if the ray intersects any walls before it intersects the eye then the wall
  // is in the way.
  var attack = false;

  // check if the player is in the side of vision of the EYE
  if(this.searching === true && this.isPlayerInsideViewZone() === true) {
    // define the lines that connects the target to the eye
    // this isn't drawn on screen.
    var rays = [];
    rays[0] = new Phaser.Line(this.PlayerObj.player.x, this.PlayerObj.player.y, this.eye.x, this.eye.y);
    rays[1] = new Phaser.Line(this.PlayerObj.player.x + this.PlayerObj.player.width, this.PlayerObj.player.y, this.eye.x, this.eye.y);
    rays[3] = new Phaser.Line(this.PlayerObj.player.x + this.PlayerObj.player.width, this.PlayerObj.player.y + this.PlayerObj.player.height - 0.1, this.eye.x, this.eye.y);
    rays[2] = new Phaser.Line(this.PlayerObj.player.x, this.PlayerObj.player.y + this.PlayerObj.player.height - 0.1, this.eye.x, this.eye.y);

    // check if any walls intersect the ray
    // var wallIntersect = this.getWallIntersection(rays);

    // check if the player is in the shadows
    var playerInShadow = this.PlayerObj.isInShadow();

    // if(!wallIntersect && !playerInShadow) {
    if(!playerInShadow) {
      attack = true;
    }

    if (attack === false) {
      //- - - | DEVELOPMENT MODE | - - -
      if(BasicGame.Game.developmentMode === true) {
        this.PlayerObj.player.tint = 0xffffff;
      }
    } else if (attack === true) {
      //I see the player...I've to KILL IT
      this.shootPlayer(this.PlayerObj.player);
    }
  }

  // This just tells the engine it should update the texture cache
  this.bitmap.dirty = true;
};

BasicGame.Eye.prototype.initSearch = function (delay) {
  var newPatternIndex = -1;
  var intent = 0;
  var pattern = null;
  var patternReversed = null;
  var initialX = 0;
  var index = 0;
  var lap = 0;

  if (this.searching === false) {

    if (delay === true) {
      var _self = this;
      setTimeout(function () {
        _self.initSearch();
      }, 500);
      return;
    }

    // pick a pattern for searching in the array of available patterns
    do {
      newPatternIndex = Math.floor(Math.random()*(this.patterns.length));
      intent++;
    } while (this.currentPattern === newPatternIndex || intent > 5);
    this.currentPattern = newPatternIndex;
    patternReversed = Math.random() > 0.5 ? true : false;
    pattern = this.patterns[this.currentPattern];
    index = !patternReversed ? 0 : pattern.length - 1

    var iterator = function (index) {
      if ((!patternReversed && index < pattern.length) ||
          (patternReversed && index >= 0)) {
        initialX = this.viewZoneSprite.positions[pattern[index][!patternReversed ? 0 : 1]];
        // set the initial X position of the EYE and the view zone
        this.viewZoneSprite.x = initialX;
        this.tweenEye(pattern[index][!patternReversed ? 1 : 0],
          pattern[index][2],
          function () {
            setTimeout(function () {
              iterator(!patternReversed ? ++index : --index);
            }, 1000);
          });
      }
      else {
        if (++lap < 2) {
          setTimeout(function () {
            index = !patternReversed ? 0 : pattern.length - 1
            iterator(index);
          }, 1000);
        }
        else {
          if (this.shooting === true) return;
          this.searching = false;
          this.getTired();
        }
      }
    }.bind(this);
    iterator(index);

    this.eye.animations.play('search');
    this.pupil.alpha = 1;
    this.searching = true;
  }
};

BasicGame.Eye.prototype.tweenEye = function (target, timeInSecs, callback) {
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
  });
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
  });
  this.pupilTween.start();
};

BasicGame.Eye.prototype.isPlayerInsideViewZone = function () {
  if(this.viewZoneSprite.visible === true) {
    return this.game.physics.arcade.overlap(this.PlayerObj.player,
      this.viewZoneSprite);
  }
  return false;
};

BasicGame.Eye.prototype.shootPlayer = function (target) {
  var tweensInPause = false;

  //- - - | DEVELOPMENT MODE | - - -
  if(BasicGame.Game.developmentMode === true) {
    this.drawLinesToTarget(target);
    this.PlayerObj.player.tint = 0x00ff00;
  }

  if (this.shooting === false) {
    this.shooting = true;
    this.searching = false;
    this.eye.animations.play('angry');
    this.lightning.shoot(target);

    // pause the current tweens, if any, for the pupil and the viewzone
    if (this.viewZoneTween.isRunning === true ||
        this.pupilTween.isRunning === true) {
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
          console.log('boilá!');
          this.eye.animations.play('search');
          this.pupil.alpha = 1;
          this.searching = true;
          this.viewZoneTween.resume();
          this.pupilTween.resume();
        }
        else {
          this.initSearch();
        }

        var _self = this;
        setTimeout(function () {_self.shooting = false}, 200);
      },
      this);

    this.calmDownTimer.start();
  }
};

BasicGame.Eye.prototype.getTired = function () {
  this.eye.animations.play('tired');

  this.getMadTimer = this.game.time.create(true);
  this.getMadTimer.add(1200,
    function () {
      this.getMad();
    },
    this);

  this.getMadTimer.start();
};

BasicGame.Eye.prototype.getMad = function () {
  this.eye.animations.play('angry');
  this.angerSound.play();

  // shake the world
  this.shake();

  // intensify search speed
  // if (this.eye.animations.getAnimation("search").speed < 3) {
  //   this.eye.animations.getAnimation("search").speed += 1;
  // }

  this.searchAgain = this.game.time.create(true);
  this.searchAgain.add(1600,
    function () {
      this.eye.x = this.eye.originalX;
      this.initSearch();
    },
    this);

  this.searchAgain.start();
};

BasicGame.Eye.prototype.shake = function () {
  this.shakeTween = this.shakeTween || this.game.add.tween(this.eye)
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

BasicGame.Eye.prototype.destroyTimers = function () {
  if (arguments.length === 0) {
    this.calmDownTimer && this.calmDownTimer.destroy();
    this.getTiredTimer && this.getTiredTimer.destroy();
    this.getMadTimer && this.getMadTimer.destroy();
    this.searchAgain && this.searchAgain.destroy();

    this.viewZoneSprite.x = this.viewZoneSprite.positions['0'];
    this.searching = false;
    this.shooting = false;

    return;
  }

  for (var i = arguments.length - 1; i >= 0; i--) {
    if(arguments[i]) arguments[i].destroy();
  }
};

BasicGame.Eye.prototype.drawLinesToTarget = function (target) {
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
};

BasicGame.Eye.prototype.rejoice = function (callback) {
  this.destroyTimers();
  this.eye.animations.play('happy');
  this.shakeTween = this.game.add.tween(this.eye)
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
    this.initSearch();
    callback();
  }, this);

  this.laughSound.play();
};


// Given a ray, this function iterates through all of the walls and
// returns the closest wall intersection from the start of the ray
// or null if the ray does not intersect any walls.
// BasicGame.Eye.prototype.getWallIntersection = function (rays) {
//   //Check intersections for each ray
//   //If at least one ray has no intersection with a wall, then THE EYE can see his enemy.
//   var hiddenRays = 0;
//   rays.forEach(function (ray) {
//     var intersect = null;

//     // For each of the walls...
//     this.level.walls.forEach(function (wall) {
//       if(intersect) {
//         return;
//       }

//       // Create an array of lines that represent the four edges of each wall
//       var lines = [
//         new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
//         new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
//         new Phaser.Line(wall.x + wall.width, wall.y,wall.x + wall.width, wall.y + wall.height),
//         new Phaser.Line(wall.x, wall.y + wall.height,wall.x + wall.width, wall.y + wall.height)
//       ];

//       // Test each of the edges in this wall against the ray.
//       // If the ray intersects any of the edges then the wall must be in the way.
//       for (var i = 0; i < lines.length; i++) {
//         intersect = Phaser.Line.intersects(ray, lines[i]);
//         if (intersect) {
//           break;
//         }
//       }
//     }, this);

//     if(intersect) {
//       //This edge is hidden. :D
//       hiddenRays++;
//     }

//   },this);

//   return hiddenRays == 4;

// };

BasicGame.Eye.prototype.restartLevel = function () {
  this.anger = false;

  // restore the searching speed to its default
  this.viewZoneSprite.x = this.viewZoneSprite.positions['0'];
  this.eye.animations.play('search');
  this.searching = true;
  this.eyeStateTimer = this.searchingTime;
};