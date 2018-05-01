var BasicGame = require('BasicGame');

/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

BasicGame.Level = function (game, gameObj) {
  // destroyable objects
  this.levelTextGroup = null;
  this.dayNumberText = null;
  this.spikeSound = null;
  this.map = null;
  this.ground = null;
  this.walls = null;
  this.spikes = null;
  this.pieces = null;

  // global properties
  this.game = game;
  this.gameObj = gameObj;
  this.endTimer = null;
  this.initPlayerPos = { x: 0, y: 0 };
  this.daysShown = false;
  this.isShowingDays = false;
  this.dayText = {
    "es": "Día",
    "en": "Day"
  };

  // font attributes
  this.fontId = 'font-medium';
  this.hasFloor = false;
  this.hasSpikes = false;
};

BasicGame.Level.prototype.create = function () {
  // create the background for the day
  this.levelTextGroup = this.game.add.group();

  // create the bitmap for the day number
  this.dayNumberText = this.game.add.bitmapText(this.game.world.width / 2,
    this.game.world.height / 2 - 15,
    this.fontId,
    '',
    72,
    this.levelTextGroup);
  this.dayNumberText.anchor.set(0.5, 0.5);
  this.dayNumberText.align = "center";
  this.dayNumberText.tint = 0x8d8d8e;
  this.dayNumberText.oriY = this.dayNumberText.y;

  if (!this.spikeSound) {
    this.spikeSound = this.game.add.sound('spike');
  }

  this.createLevel(parseInt(BasicGame.currentLevel));
};

BasicGame.Level.prototype.createLevel = function (num) {
  var _self = this;
  this.map = this.game.add.tilemap('lvl' + ((num < 10) ? '0' + num : num));

  // create the floor of the level
  this.hasFloor = false;
  if (this.map.objects.floor) {
    this.hasFloor = true;
    this.ground = this.game.add.group();

    this.map.createFromObjects("floor", "", 'platform', 0, true, false,
      this.ground, Phaser.Sprite, false);

    this.ground.enableBody = true;
    this.game.physics.arcade.enable(this.ground);
    this.ground.forEach(function (groundSprite) {
      groundSprite.body.immovable = true;
      groundSprite.body.allowGravity = false;
    });
  }

  // create the walls of the level
  this.walls = this.game.add.group();
  this.map.createFromObjects("platforms", "", 'platform', 0, true, false,
    this.walls, Phaser.Sprite, false);

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

    this.map.createFromObjects("spikes", "", 'spike-platform', 0, true, false,
      this.walls, Phaser.Sprite, false);
    this.walls.forEach(function (platformSprite) {
      if (platformSprite["spike-platform"] == "1") {
        var createdSpike = null;
        if (platformSprite["spike-side"]) {
          createdSpike = _self.addHeightSpike(platformSprite, platformSprite["spike-side"]);
        }
        else {
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
  this.map.createFromObjects("pieces", "", 'piece', null, true, false,
    this.pieces, Phaser.Sprite, false);

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

  // show the days of the level
  var dayObj = this.gameObj.days.getDay(parseInt(BasicGame.currentLevel));
  this.dayNumberText.setText(this.dayText[BasicGame.language] + ' ' + dayObj.number);
  this.dayNumberText.y = this.dayNumberText.oriY;

  // notify to the game that the level is ready
  this.gameObj.levelReady();
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
  this.dayNumberText.setText("");
};

BasicGame.Level.prototype.render = function () {
  if (BasicGame.Game.developmentMode === true) {
    var _self = this;
    if (this.spikes) {
      this.spikes.forEach(function (pieceSprite) {
        _self.game.debug.body(pieceSprite, 'rgba(0,0,255,0.8)');
      });
    }
  }
};

BasicGame.Level.prototype.addWidthSpike = function (platformSprite, inBottom) {
  // add the spikes to the platform
  var spikeSprite = null;

  if (!inBottom) {
    spikeSprite = this.game.add.tileSprite(platformSprite.x,
      platformSprite.y + 5,
      platformSprite.width, 16, "spike", 0, this.spikes);
    spikeSprite.isHidden = true;
    spikeSprite.oriY = spikeSprite.y;
    spikeSprite.desY = platformSprite.y - 16;
    this.spikes.openedSpikes++;
  }
  else {
    spikeSprite = this.game.add.tileSprite(platformSprite.x,
      platformSprite.bottom,
      platformSprite.width, 16, "spike-d", 0, this.spikes);
    spikeSprite.isHidden = false;
    // spikeSprite.oriY = spikeSprite.y;
    // spikeSprite.desY = platformSprite.y -16;
  }

  if (!inBottom) {
    // create the tweens for showing and hiding the spikes
    var showSpikeTween = this.createShowSpikeTween(spikeSprite,
      { y: spikeSprite.desY }, 100, 300);

    var hideSpikeTween = this.game.add.tween(spikeSprite)
      .to({ y: spikeSprite.oriY },
        300,
        Phaser.Easing.Exponential.Out,
        false,
        1000);
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
  spikeSprite.body.offset.x = (platformSprite.width / 2) - (spikeSprite.body.width / 2);

  if (!inBottom)
    spikeSprite.body.offset.y = 8;
  else
    spikeSprite.body.offset.y = 0;

  return spikeSprite;
};

BasicGame.Level.prototype.addHeightSpike = function (platformSprite, side) {
  // add the spikes to the platform
  var spikeSprite = null;
  if (side === 'r') {
    spikeSprite = this.game.add.tileSprite(platformSprite.right - 21,
      platformSprite.y,
      16, platformSprite.height,
      "spike-r", 0, this.spikes);
    spikeSprite.isHidden = true;
    spikeSprite.oriX = spikeSprite.x;
    spikeSprite.desX = platformSprite.right;
  }
  else if (side === 'l') {
    spikeSprite = this.game.add.tileSprite(platformSprite.x + 5,
      platformSprite.top,
      16, platformSprite.height,
      "spike-l", 0, this.spikes);
    spikeSprite.isHidden = true;
    spikeSprite.oriX = spikeSprite.x;
    spikeSprite.desX = platformSprite.x - 16;
  } else {
    return null;
  }

  // create the tweens for showing and hiding the spikes
  var showSpikeTween = this.createShowSpikeTween(spikeSprite,
    { x: spikeSprite.desX }, 100, 500);

  var hideSpikeTween = this.game.add.tween(spikeSprite)
    .to({ x: spikeSprite.oriX },
      300,
      Phaser.Easing.Exponential.Out,
      false,
      1000);
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
  spikeSprite.body.offset.y = (platformSprite.height / 2) - (spikeSprite.body.height / 2);

  if (side === 'r')
    spikeSprite.body.offset.x = 0;
  else
    spikeSprite.body.offset.x = 8;

  return spikeSprite;
};

BasicGame.Level.prototype.createShowSpikeTween = function (spikeSprite, properties, duration, delay) {
  var _self = this;
  var showSpikeTween = this.game.add.tween(spikeSprite)
    .to(properties,
      duration,
      null,
      false,
      delay);

  showSpikeTween.onStart.add(function () {
    this.spikeSound.play();
  }, this);

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

// ╔═══════════════════════════════════════════════════════════════════════════╗
BasicGame.Level.prototype.shutdown = function () {
  this.levelTextGroup.destroy();
  this.dayNumberText.destroy();
  this.spikeSound.destroy();
  this.map.destroy();
  this.ground.destroy();
  this.walls.destroy();
  this.spikes.destroy();
  this.pieces.destroy();
};
// ╚═══════════════════════════════════════════════════════════════════════════╝