/**
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var BasicGame = BasicGame || {};

BasicGame.Lightning = function (game, gameObj){
  this.game = game;
  this.gameObj = gameObj;
  this.lightningBitmap = null;
  this.lightning = null;
  this.player = null;
  this.eye = null;
  this.level = null;

  this.lightningSound = null;
};

BasicGame.Lightning.prototype.create = function(eye, player, level){
  this.player = player;
  this.eye = eye;
  this.level = level;

  // Create a bitmap for the lightning bolt texture
  this.lightningBitmap = this.game.add.bitmapData(200, 10000);

  // Create a sprite to hold the lightning bolt texture
  this.lightning = this.game.add.image(this.eye.x,
    this.eye.y,
    this.lightningBitmap);
  this.lightning.anchor.setTo(0.5, 0);

  this.fakeThing = this.game.add.sprite(-10, -10, "player");
  this.fakeThing.anchor.setTo(0.5, 0.5);
  this.fakeThing.width = this.fakeThing.height = 16;
  this.fakeThing.alpha = 0;
  
  this.game.physics.arcade.enable(this.fakeThing);
  this.fakeThing.body.immovable = true;
  this.fakeThing.body.allowGravity = false;

  this.lightningTimer = 0;

  if (!this.lightningSound) {
    this.lightningSound = this.game.add.sound('ray', 0.2);
  }
};

BasicGame.Lightning.prototype.update = function () {
  // check if the ray hits the player
  if(this.player.player && this.fakeThing){
    this.game.physics.arcade.overlap(this.player.player, this.fakeThing,
      function(){
        this.gameObj.subtractLife();

        // shake and flash the world
        this.gameObj.shakeCamera();
        this.fakeThing.x = this.fakeThing.y = -10;

        this.lightningSound.play();
      },
      null,
      this);
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
  this.lightning.rotation = this.game.math.angleBetween(
    this.lightning.x, this.lightning.y,
    targetPos.x + 16, targetPos.y + 16
  ) - Math.PI / 2;

  // Calculate the distance from the lightning source to the pointer
  var distance = this.game.math.distance(
    this.lightning.x, this.lightning.y,
    targetPos.x + 16, targetPos.y + 16
  );

  // Create the lightning texture
  this.createLightningTexture(this.lightningBitmap.width / 2, 0, 20, 2, false, distance);

  // Make the lightning sprite visible
  this.lightning.alpha = 1;

  // Fade out the lightning sprite using a tween on the alpha property
  // Check out the "Easing function" examples for more info.
  this.game.add.tween(this.lightning)
    .to({alpha: 0.5}, 100, Phaser.Easing.Bounce.Out)
    .to({alpha: 1.0}, 100, Phaser.Easing.Bounce.Out)
    .to({alpha: 0.5}, 100, Phaser.Easing.Bounce.Out)
    .to({alpha: 1.0}, 100, Phaser.Easing.Bounce.Out)
    .to({alpha: 0}, 250, Phaser.Easing.Cubic.In)
    .start();

  this.fakeThing.x = targetPos.x + 16;
  this.fakeThing.y = targetPos.y + 16;
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