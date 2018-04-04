var BasicGame = require('BasicGame');

/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

BasicGame.Lightning = function (game, gameObj) {
  // destroyable objects
  this.lightningBitmap = null;
  this.lightning = null;
  this.fakeThing = null;
  this.lightningSound = null;

  this.game = game;
  this.gameObj = gameObj;
  this.playerObj = null;
  this.eye = null;
  this.level = null;
};

BasicGame.Lightning.prototype.create = function (eye, player, level) {
  this.playerObj = player;
  this.eye = eye;
  this.level = level;

  // Create a bitmap for the lightning bolt texture
  this.lightningBitmap = this.game.add.bitmapData(200, 10000);

  // Create a sprite to hold the lightning bolt texture
  this.lightning = this.game.add.image(this.eye.x,
    this.eye.y + 32,
    this.lightningBitmap);
  this.lightning.anchor.setTo(0.5, 0);

  this.fakeThing = this.game.add.sprite(-10, -10, "player");
  this.fakeThing.anchor.setTo(0.5, 0.5);
  this.fakeThing.width = this.fakeThing.height = 16;
  this.fakeThing.alpha = 0;

  this.lightningTimer = 0;

  if (!this.lightningSound) {
    this.lightningSound = this.game.add.sound('ray', 0.2);
  }
};

BasicGame.Lightning.prototype.update = function () {
  // check if the ray hits the player
  if (this.playerObj.playerSprite && this.fakeThing) {
    if (this.fakeThing.left > this.playerObj.playerSprite.left &&
      this.fakeThing.right < this.playerObj.playerSprite.right &&
      this.fakeThing.top > this.playerObj.playerSprite.top &&
      this.fakeThing.bottom < this.playerObj.playerSprite.bottom) {
      this.gameObj.subtractLife();
      this.gameObj.shakeCamera();
    }
    this.fakeThing.x = this.fakeThing.y = -10;
  }
};

BasicGame.Lightning.prototype.shoot = function (target) {
  this.fakeThing.x = this.fakeThing.y = 0;
  var targetPos = {
    x: target.centerX,
    y: target.centerY
  };

  // Rotate the lightning sprite so it goes in the
  // direction of the pointer
  this.lightning.rotation = this.game.math.angleBetween(
    this.lightning.x, this.lightning.y,
    targetPos.x, targetPos.y
  ) - Math.PI / 2;

  // Calculate the distance from the lightning source to the pointer
  var distance = this.game.math.distance(
    this.lightning.x, this.lightning.y,
    targetPos.x, targetPos.y
  );

  // Create the lightning texture
  this.createLightningTexture(this.lightningBitmap.width / 2, 0, 20, 2, false, distance);

  // Make the lightning sprite visible
  this.lightning.alpha = 1;

  // Fade out the lightning sprite using a tween on the alpha property
  // Check out the "Easing function" examples for more info.
  this.game.add.tween(this.lightning)
    .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
    .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
    .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
    .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
    .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In)
    .start();

  this.fakeThing.x = targetPos.x;
  this.fakeThing.y = targetPos.y;

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
    if ((!branch && i == segments - 1) || y > distance) {
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

// ╔═══════════════════════════════════════════════════════════════════════════╗
BasicGame.Lightning.prototype.shutdown = function () {
  this.lightningBitmap.destroy();
  this.lightning.destroy();
  this.fakeThing.destroy();
  this.lightningSound.destroy();
};
// ╚═══════════════════════════════════════════════════════════════════════════╝