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
  this.countdownTextBitmap = null;
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

  // create the bitmap for the countdown text
  this.countdownTextBitmap = this.game.add.bitmapText(this.game.world.width/2,
    this.game.world.height/2,
    this.fontId,
    '',
    this.fontSize,
    this.levelTextGroup);
  this.countdownTextBitmap.anchor.set(.5, .5);
  this.countdownTextBitmap.align = "center";
  this.countdownTextBitmap.tint = 0x212121;

  this.createLevel(BasicGame.currentLevel);
};

BasicGame.Level.prototype.destroyCurrentLevel = function(){
  this.map.destroy();
  if(this.ground){
    this.ground.destroy();
  }
  this.walls.destroy();
  if(this.spikes){
    this.spikes.forEach(function(spikeSprite){
      spikeSprite.showTween.stop();
      spikeSprite.hideTween.stop();
    });
    this.spikes.destroy();
  }
  if(this.pieces){
    this.pieces.destroy();
  }
  this.countdownTextBitmap.setText("");
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
  if(this.map.objects.floor){
    this.hasSpikes = true;

    this.spikes = this.game.add.group();
    this.spikes.openedSpikes = 0;

    this.map.createFromObjects("spikes", "", 'spike-platform', 0, true, false,
      this.walls, Phaser.Sprite, false);
    this.walls.forEach(function(platformSprite){
      if(platformSprite["spike-platform"] == "1"){
        var createdSpike = null;
        if (platformSprite["spike-side"]) {
          createdSpike = _self.addSideSpike(platformSprite, platformSprite["spike-side"]);
        }
        else {
          createdSpike = _self.addTopSpike(platformSprite);
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

  this.game.physics.arcade.enable(this.pieces);
  this.pieces.forEach(function(pieceSprite){
    pieceSprite.anchor.set(.5, .5);
    pieceSprite.body.immovable = false;
    pieceSprite.body.allowGravity = false;
  });

  // get the player initial position
  if(this.map.objects.player_pos){
    this.initPlayerPos.x = this.map.objects.player_pos[0].x;
    this.initPlayerPos.y = this.map.objects.player_pos[0].y;
  }

  this.game.world.bringToTop(this.levelTextGroup);

  // show the days of the level
  // var texte = this.gameObj.days[BasicGame.currentLevel - 1] || '???';
  var texte = this.gameObj.days[this.gameObj.days.length - BasicGame.currentLevel] || '???';
  this.countdownTextBitmap.setText(this.dayText[BasicGame.language] + ' ' + texte);

  // set the level as not ended
  this.isEnded = false;

  // set the level as ready
  this.isReady = true;
};

BasicGame.Level.prototype.endLevel = function(){
  // this.levelTextGroup.getChildAt(0).alpha = 0;
  // this.levelTextGroup.alpha = 1;

  BasicGame.isRetrying = false;
  var secondsToEnd = this.gameObj.countdownDuration;
  // this.countdownTextBitmap.setText(secondsToEnd);

  // create the timer
  this.endTimer = this.game.time.create(true);

  // starts the timer that will end the level
  this.endTimer.add(secondsToEnd * 1000,
    function(){
      // enable the flag that indicates the other objects the level is finished
      this.isEnded = true;
    },
    this);

  // this.endTimer.repeat(1000,
  //   this.gameObj.countdownDuration,
  //   function(){
  //     // show the countdown on the screen
  //     if(--secondsToEnd == 3){
  //       this.gameObj.showDarkness();
  //     }
  //     this.countdownTextBitmap.setText(secondsToEnd);
  //   },
  //   this);

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

BasicGame.Level.prototype.addTopSpike = function(platformSprite){
  // add the spikes to the platform
  var spikeSprite = this.game.add.tileSprite(platformSprite.x,
    platformSprite.y + 5,
    platformSprite.width, 16, "spike", 0, this.spikes);
  spikeSprite.isHidden = true;
  spikeSprite.oriY = spikeSprite.y;
  spikeSprite.desY = platformSprite.y -16;

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

  // set physics properties for the spikes
  this.game.physics.arcade.enable(spikeSprite);
  spikeSprite.body.immovable = true;
  spikeSprite.body.allowGravity = false;

  return spikeSprite;
};

BasicGame.Level.prototype.addSideSpike = function(platformSprite, side){
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