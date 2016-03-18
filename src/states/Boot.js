var BasicGame = BasicGame || {
  language: "en",
  currentLevel: 1,
  deaths: 0,
  rest: 0,
  setDay: function(n) {
    this.currentLevel = (n < 10) ? ('0' + n) : n;
    console.log(":::", this.currentLevel);
    return this.getCode();
  },
  addDeath: function() {
    this.deaths++;
    return this.getCode();
  },
  setRest: function() {
    this.rest = 1;
    return this.getCode();
  },
  getCode: function() {
    console.log(this.rest + '' + this.deaths + '' + this.currentLevel);
    return this.rest + '' + this.deaths + '' + this.currentLevel;
  },
  readCode: function(code) {
    this.currentLevel = parseInt(code.slice(code.length -2, code.length));
    this.deaths = parseInt(code.slice(1, code.length - 2));
    this.rest = parseInt(code.charAt(0));
  }
};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype.preload = function () {
  //  Here we load the assets required for our preloader (in this case a background and a loading bar)
  this.load.image('preloaderBackground', 'assets/images/preloader_background.png');
  this.load.image('preloaderBar', 'assets/images/preloader_bar.png');
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