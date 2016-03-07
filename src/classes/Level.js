var BasicGame = BasicGame || {};

BasicGame.Level = function (game, gameObj) {
  this.game = game;
  this.gameObj = gameObj;
  this.levelMusic = null;
  this.walls = null;
  this.ground = null;
  this.map = null;
  this.endTimer = null;
  this.isEnded = null;
  this.initPlayerPos = {x: 0, y: 0};
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
  this.fontSize = 32;
  this.fontId = 'font';
  this.hasFloor = false;
  this.hasSpikes = false;

  this.daySound = null;
};

BasicGame.Level.prototype.create = function () {
  // create the background for the day
  this.levelTextGroup = this.game.add.group();
  var dayTextBitmap = new Phaser.BitmapData(this.game,
    'dayTextBitmap',
    this.game.world.width,
    this.game.world.height);
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
  this.dayNumberTextBitmap = this.game.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2,
    this.fontId,
    '',
    this.fontSize,
    this.levelTextGroup);
  this.dayNumberTextBitmap.anchor.set(.5, .5);
  this.dayNumberTextBitmap.align = "center";
  this.dayNumberTextBitmap.tint = 0x212121;

  // create the bitmap for the day phrase
  this.dayPhraseTextBitmap = this.game.add.bitmapText(0,
    this.game.world.height/2 + 40,
    this.fontId,
    '',
    this.fontSize / 2,
    this.levelTextGroup);
  this.dayPhraseTextBitmap.maxWidth = this.game.world.width;
  this.dayPhraseTextBitmap.width = this.game.world.width;
  this.dayPhraseTextBitmap.align = "center";
  this.dayPhraseTextBitmap.tint = 0x515151;

  this.createLevel(BasicGame.currentLevel);

  if (!this.daySound) {
    this.daySound = this.game.add.sound('day', 0.3);
  }
};

BasicGame.Level.prototype.destroyCurrentLevel = function(){
  this.map.destroy();
  if(this.ground){
    this.ground.destroy();
  }
  this.walls.destroy();
  if(this.hasSpikes){
    this.spikes.forEach(function(spikeSprite){
      spikeSprite.showTween.stop();
      spikeSprite.hideTween.stop();
    });
    this.spikes.destroy();
  }
  if(this.pieces){
    this.pieces.destroy();
  }
  this.dayNumberTextBitmap.setText("");
  this.dayPhraseTextBitmap.setText("");
};

BasicGame.Level.prototype.createLevel = function(num){
  var _self = this;
  this.map = this.game.add.tilemap('lvl' + ((num < 10) ? '0' + num : num));

  // create the floor of the level
  this.hasFloor = false;
  if(this.map.objects.floor){
    this.hasFloor = true;
    this.ground = this.game.add.group();

    this.map.createFromObjects("floor", "", 'platform', 0, true, false,
      this.ground, Phaser.Sprite, false);

    this.ground.enableBody = true;
    this.game.physics.arcade.enable(this.ground);
    this.ground.forEach(function(groundSprite){
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
  this.walls.forEach(function(platformSprite){
    platformSprite.body.immovable = true;
    platformSprite.body.allowGravity = false;
  });

  // create the spikes (and platform) of the level
  this.hasSpikes = false;
  if(this.map.objects.spikes){
    this.hasSpikes = true;

    this.spikes = this.game.add.group();
    this.spikes.openedSpikes = 0;

    this.map.createFromObjects("spikes", "", 'spike-platform', 0, true, false,
      this.walls, Phaser.Sprite, false);
    this.walls.forEach(function(platformSprite){
      if(platformSprite["spike-platform"] == "1"){
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

  this.pieces.forEach(function(pieceSprite){
    pieceSprite.anchor.set(.5, .5);
    _self.game.physics.arcade.enableBody(pieceSprite);
    pieceSprite.body.allowGravity = false;
    pieceSprite.body.immovable = false;
    pieceSprite.body.moves = false;
    pieceSprite.mass = 0;
  });

  // get the player initial position
  if(this.map.objects.player_pos){
    this.initPlayerPos.x = this.map.objects.player_pos[0].x;
    this.initPlayerPos.y = this.map.objects.player_pos[0].y;
  }

  this.game.world.bringToTop(this.levelTextGroup);

  // show the days of the level
  var dayObj = this.gameObj.days.getDay(BasicGame.currentLevel);
  this.dayNumberTextBitmap.setText(this.dayText[BasicGame.language] + ' ' + dayObj.number);
  if(dayObj.text){
    this.dayPhraseTextBitmap.setText(dayObj.text[BasicGame.language]);
    this.dayPhraseTextBitmap.x = this.game.world.width/2 - this.dayPhraseTextBitmap.width/2;
  }

  // set the level as not ended
  this.isEnded = false;

  // set the level as ready
  this.isReady = true;
};

BasicGame.Level.prototype.endLevel = function(){
  BasicGame.isRetrying = false;
  var secondsToEnd = this.gameObj.countdownDuration;

  // create the timer
  this.endTimer = this.game.time.create(true);

  // starts the timer that will end the level
  this.endTimer.add(secondsToEnd * 1000,
    function(){
      // enable the flag that indicates the other objects the level is finished
      this.isEnded = true;
    },
    this);

  this.endTimer.start();
  this.gameObj.showDarkness();
};

BasicGame.Level.prototype.showDay = function(){
  if(this.isShowingDays == true){
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
  dayTimer.add(2000,
    function(){
      this.levelTextGroup.alpha = 0;
      this.isShowingDays = false;
      this.gameObj.hideDarkness();
    },
    this);

  dayTimer.start();
};

BasicGame.Level.prototype.addWidthSpike = function(platformSprite, inBottom){
  // add the spikes to the platform
  var spikeSprite = null;

  if(!inBottom){
    spikeSprite = this.game.add.tileSprite(platformSprite.x,
      platformSprite.y + 5,
      platformSprite.width, 16, "spike", 0, this.spikes);
    spikeSprite.isHidden = true;
    spikeSprite.oriY = spikeSprite.y;
    spikeSprite.desY = platformSprite.y -16;
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

  if(!inBottom){
    // create the tweens for showing and hiding the spikes
    var showSpikeTween = this.game.add.tween(spikeSprite)
      .to({y: spikeSprite.desY},
        100,
        null,
        false,
        300);
    showSpikeTween.onComplete.add(function(){
      this.isHidden = false;
      this.hideTween.start();
      this.parent.openedSpikes++;
    }, spikeSprite);

    var hideSpikeTween = this.game.add.tween(spikeSprite)
      .to({y: spikeSprite.oriY},
        300,
        Phaser.Easing.Exponential.Out,
        false,
        1000);
    hideSpikeTween.onComplete.add(function(){
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

  return spikeSprite;
};

BasicGame.Level.prototype.addHeightSpike = function(platformSprite, side){
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
  else if(side === 'l') {
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
  var showSpikeTween = this.game.add.tween(spikeSprite)
    .to({x: spikeSprite.desX},
      100,
      null,
      false,
      500);
  showSpikeTween.onComplete.add(function(){
    this.isHidden = false;
    this.hideTween.start();
    this.parent.openedSpikes++;
  }, spikeSprite);

  var hideSpikeTween = this.game.add.tween(spikeSprite)
    .to({x: spikeSprite.oriX},
      300,
      Phaser.Easing.Exponential.Out,
      false,
      1000);
  hideSpikeTween.onComplete.add(function(){
    this.isHidden = true;
    this.parent.openedSpikes--;
  }, spikeSprite);

  spikeSprite.showTween = showSpikeTween;
  spikeSprite.hideTween = hideSpikeTween;

  // set physics properties for the spikes
  this.game.physics.arcade.enable(spikeSprite);
  spikeSprite.body.immovable = true;
  spikeSprite.body.allowGravity = false;

  return spikeSprite;
};