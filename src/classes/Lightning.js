var BasicGame = BasicGame || {};

BasicGame.Lightning = function (game) {
  this.game = game;
  this.lightningBitmap = null;
  this.lightning = null;
  this.player = null;
  this.eye = null;
  this.level = null;
};

BasicGame.Lightning.prototype.create = function(eye,player,level){
  this.player = player;
  this.eye = eye;
  this.level = level;

  // Create a bitmap for the lightning bolt texture
  this.lightningBitmap = this.game.add.bitmapData(200, 10000);

  // Create a sprite to hold the lightning bolt texture
  this.lightning = this.game.add.image(this.eye.x, this.eye.y, this.lightningBitmap);

  // This adds what is called a "fragment shader" to the lightning sprite.
  // See the fragment shader code below for more information.
  // This is an WebGL feature. Because it runs in your web browser, you need
  // a browser that support WebGL for this to work.
  //  this.lightning.filters = [ this.game.add.filter('Glow') ];

  // Set the anchor point of the sprite to center of the top edge
  // This allows us to position the lightning by simply specifiying the
  // x and y coordinate of where we want the lightning to appear from.
  this.lightning.anchor.setTo(0.5, 0);

  this.lightningTimer = 0;
};

BasicGame.Lightning.prototype.update = function () {};

BasicGame.Lightning.prototype.shoot = function (target) {
  // Rotate the lightning sprite so it goes in the
  // direction of the pointer
  this.lightning.rotation = this.game.math.angleBetween(
    this.lightning.x, this.lightning.y,
    target.x + 16, target.y + 16
  ) - Math.PI / 2;

  // Calculate the distance from the lightning source to the pointer
  var distance = this.game.math.distance(
    this.lightning.x, this.lightning.y,
    target.x + 16, target.y + 16
  );

  // Create the lightning texture
  this.createLightningTexture(this.lightningBitmap.width / 2, 0, 20, 1, false, distance);

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

  // Shake the camera by moving it up and down 5 times really fast
  this.game.camera.y = 0;
  this.game.add.tween(this.game.camera)
    .to({y: -10}, 40, Phaser.Easing.Sinusoidal.InOut, false, 0, 5, true)
    .start();
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

    // Draw the line segment
    ctx.lineTo(x, y);
    ctx.stroke();

    // Quit when we've reached the target
    if (y >= distance) break;

    // Draw a branch 20% of the time off the main bolt only
    /*if (!branch) {
     if (this.game.math.chanceRoll(20)) {
     // Draws another, thinner, bolt starting from this position
     this.createLightningTexture(x, y, 10, 1, true, distance);
     }
     }*/
  }

  // This just tells the engine it should update the texture cache
  this.lightningBitmap.dirty = true;
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