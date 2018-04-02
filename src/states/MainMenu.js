var BasicGame = require('BasicGame');

BasicGame.MainMenu = function (game) {
  // constants
  this.BUTTON_WIDTH = 180;
  this.BUTTON_HEIGHT = 38;
  this.BUTTON_VSPACING = 15;
  this.BUTTON_HSPACING = 12;
  this.SCREEN_PADDING = 32;
  this.BUTTON_PADDING = 16;
  this.continueMsg = {
    'es': 'Continuar',
    'en': 'Continue'
  };
  this.newGameMsg = {
    'es': 'Nuevo juego',
    'en': 'New game'
  };
  this.creditsMsg = {
    'es': 'Créditos',
    'en': 'Credits'
  };
  this.keysDescriptionMsg = {
    'es': 'usa A y D o IZQUIERA y DERECHA para moverte\nusa W, Z, ESPACIO o ARRIBA para saltar',
    'en': 'use A and D or LEFT and RIGHT to move\nuse W, Z, SPACE or UP to jump'
  };
  this.continueDayMsg = {
    "es": "Día",
    "en": "Day"
  };
  this.spanishLangMsg = {
    "es": "Español",
    "en": "Spanish"
  };
  this.englishLangMsg = {
    "es": "Inglés",
    "en": "English"
  };

  // destroyable objects (sprites, sounds, groups, tweens...)
  this.backgroundImage = null;
  this.titleText = null;
  this.giantPupilImage = null;
  this.optionsGroup = null;
  this.languageGroup = null;
  this.keysDescriptionText = null;
  this.continueDayText = null;
  this.creditsGroup = null;

  // global properties
  this.fontId = 'font';
  this.fontMediumId = 'font-medium';
  this.translatableTexts = [];
  this.fakeEye = {
    centerX: 512,
    centerY: 321,
    radius: 210
  };
  /* this.creditsTextBitmap = null;
  this.restartTextBitmap = null;
  this.splash_music = null;
  this.playButton = null;
  this.jugarButton = null;
  this.showIntroTimer = null;
  this.enSound = null;
  this.esSound = null;
  this.listenKeys = false; */

};

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ PHASER STATE METHODS                                                     ║
BasicGame.MainMenu.prototype.create = function () {
  var _self = this;

  // set the background
  this.backgroundImage = this.game.add.image(0, 0, 'main_menu_background');
  this.backgroundImage.width = this.game.world.width;
  this.backgroundImage.height = this.game.world.height;

  // add the pupil
  this.giantPupilImage = this.game.add.image(this.game.world.width / 2,
    this.game.world.height / 2,
    'giant_pupil');
  this.giantPupilImage.anchor.set(.5, .5);

  // add the title
  this.titleText = this.game.add.bitmapText(this.game.world.width / 2,
    41,
    this.fontMediumId,
    'In the Shadows',
    72);
  this.titleText.anchor.set(0.5, 0);
  this.titleText.align = "center";
  this.titleText.tint = 0x303c42;

  // add the text for key inputs
  this.keysDescriptionText = this.game.add.bitmapText(0, 0,
    this.fontId,
    this.keysDescriptionMsg[BasicGame.language],
    18);
  this.keysDescriptionText.anchor.set(0.5, 0);
  this.keysDescriptionText.align = "center";
  this.keysDescriptionText.tint = 0x303c42;
  this.keysDescriptionText.x = this.game.world.width / 2;
  this.keysDescriptionText.bottom = this.game.world.height - this.SCREEN_PADDING;
  this.keysDescriptionText.alpha = 0;

  this.translatableTexts.push({
    sourceMsg: this.keysDescriptionMsg,
    phaserObj: this.keysDescriptionText
  });

  // create the group for menu buttons
  this.createGameOptions();

  // create the group for language buttons
  this.createLanguageOptions();

  // create the assets for the credits
  this.createCredits();
  this.creditsGroup.alpha = 0;





  /* this.background = this.game.add.tileSprite(0, 0,
    this.game.world.width, this.game.world.height,
    BasicGame.Helper.prototype.getSkyName(BasicGame.currentLevel));

  // add the fake zone of view for the splash screen
  this.fakeViewZone = this.game.add.image(this.game.world.width / 2, 0, 'view_zone');
  this.fakeViewZone.anchor.set(0.5, 0);
  this.fakeViewZone.alpha = 0;
  // this.fakeViewZone.tint = 0xFFFC19;

  // add the fake EYE
  this.fakeEye = this.game.add.sprite(this.game.world.width / 2, 64, 'eye', 10);
  this.fakeEye.anchor.set(0.5, 0.5);
  this.pupil = this.game.add.image(this.fakeEye.x, this.fakeEye.y, 'pupil');
  this.pupil.anchor.set(0.5, 0.5);
  this.pupil.alpha = 0;

  // draw floors and platforms
  this.map = this.game.add.tilemap('splash_lvl');
  this.ground = this.game.add.group();
  this.map.createFromObjects("floor", "", 'platform', 0, true, false,
    this.ground, Phaser.Sprite, false);
  this.walls = this.game.add.group();
  this.map.createFromObjects("platforms", "", 'platform', 0, true, false,
    this.walls, Phaser.Sprite, false);

  // add the fake player
  this.fakeplayer = this.game.add.sprite(this.map.objects.player_pos[0].x,
    this.map.objects.player_pos[0].y,
    'player');
  this.movingPlayer = false;

  // add light and generate shadows
  this.light = new BasicGame.Light(this.game, this);
  this.light.create(this);
  this.light.drawShadows();

  // create the play buttons
  this.buttons = this.game.add.group();
  this.playButton = this.add.sprite(-20, this.world.height - 150,
    (BasicGame.currentLevel === 1) ? 'playButton' : 'continueButton', 0);
  this.playButton.anchor.set(0, 0);
  this.playButton.scale.setTo(0.5, 0.5);
  this.playButton.alpha = 0.8;

  this.jugarButton = this.add.sprite(this.world.width + 20, this.world.height - 150,
    (BasicGame.currentLevel === 1) ? 'jugarButton' : 'continuarButton', 0);
  this.jugarButton.anchor.set(1, 0);
  this.jugarButton.scale.setTo(0.5, 0.5);
  this.jugarButton.alpha = 0.8;

  // create the credits button
  this.creditsTextBitmap = this.add.bitmapText(this.game.world.width / 2,
    this.game.world.height - 32,
    this.fontId,
    '(C) Credits/Créditos',
    36);
  this.creditsTextBitmap.align = "center";
  this.creditsTextBitmap.anchor.set(0.5, 0);

  if (BasicGame.currentLevel > 1) {
    this.restartTextBitmap = this.add.bitmapText((this.game.world.width / 2) + 10,
      this.game.world.height - 32,
      this.fontId,
      '(R) Restart/Reiniciar',
      36);
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
  this.gameTitle = this.game.add.image(this.game.world.width / 2 - 5,
    this.game.world.height / 2 + 150, 'title');
  this.gameTitle.anchor.set(0.5, 0.5);

  // add key listeners
  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT
  ]);

  // load sounds
  if (!this.enSound) {
    this.enSound = this.game.add.sound('en-lang', 0.2);
  }

  if (!this.esSound) {
    this.esSound = this.game.add.sound('es-lang', 0.2);
  }

  // create the go-to-next-state timer
  this.showIntroTimer = this.game.time.create(true);
  this.showIntroTimer.add(200,
    function () {
      this.showIntro();
    },
    this);

  // add the splash_music
  if (!this.splash_music) {
    this.splash_music = this.game.add.sound('splash_music', 0.2, true);
    this.splash_music.onFadeComplete.addOnce(function (soundObj) {
      soundObj.stop();
    }, this);
    this.splash_music.play();
  } */

  // DARKNESS
  if (BasicGame.currentLevel === 1) {
    /* this.darknessGroup = this.add.group();
    var darknessBitmap = new Phaser.BitmapData(this.game,
      'darkness_main',
      this.game.width,
      this.game.height);
    darknessBitmap.ctx.rect(0, 0, this.game.width, this.game.height);
    darknessBitmap.ctx.fillStyle = '#212121';
    darknessBitmap.ctx.fill();
    var darknessSprite = new Phaser.Sprite(this.game, 0, 0, darknessBitmap);
    this.darknessGroup.addChild(darknessSprite);

    this.darknessTween = this.game.add.tween(this.darknessGroup.getChildAt(0));
    this.darknessTween.to({ alpha: 0 },
      5000,
      Phaser.Easing.Quadratic.Out,
      true,
      4500);
    this.darknessTween.onComplete.add(function () {
      this.showButtons();
    }, this);
    this.darknessTween.start(); */
  }
  else {
    // this.showButtons();
  }
};

BasicGame.MainMenu.prototype.update = function () {
  // afstand van middenpunt oog tot cursor
  dx = this.game.input.activePointer.x - this.fakeEye.centerX;
  dy = this.game.input.activePointer.y - this.fakeEye.centerY;
  // stelling van pythagoras
  c = Math.sqrt((dx * dx) + (dy * dy));

  // afstand middelpunt tot pupil
  r = this.fakeEye.radius * 0.3;

  // cursor op oog
  if (Math.abs(dx) < r && Math.abs(dy) < r && c < r) {
    r = c;
  }

  // hoek bepalen
  alfa = Math.asin(dy / c);

  // coordinaten op rand cirkel bepalen
  this.giantPupilImage.x = (Math.cos(alfa) * r) + this.fakeEye.centerX;
  // 180 graden fout herstellen
  if (dx < 0) {
    this.giantPupilImage.x = this.fakeEye.centerX * 2 - this.giantPupilImage.x;
  }
  this.giantPupilImage.y = (Math.sin(alfa) * r) + this.fakeEye.centerY;

  /* if (this.listenKeys === false ||
    this.movingPlayer === true) {
    return;
  }

  if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    // this.world.bringToTop(this.playButton);
    this.enSound.play();
    this.playButton.frame = 1;
    this.playButton.alpha = 1;
    this.moveFakePlayer(-32);
  }
  else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    // this.world.bringToTop(this.jugarButton);
    this.esSound.play();
    this.jugarButton.frame = 1;
    this.jugarButton.alpha = 1;
    BasicGame.language = "es";
    this.moveFakePlayer(this.game.world.width + 32);
  }
  else if (this.input.keyboard.isDown(Phaser.Keyboard.C)) {
    // load the credits scene
    this.listenKeys = false;
    this.splash_music.stop();
    this.state.start('Credits');
  }
  else if (this.input.keyboard.isDown(Phaser.Keyboard.R)) {

    // clean the localStorage, then set the currrent level to 1, show intro
    this.listenKeys = false;
    localStorage.removeItem("oh-my-blob");
    BasicGame.reset();
    this.splash_music.stop();
    this.showIntro();
  } */
};

/**
 * This method will be called when the State is shutdown (i.e. you switch to another state from this one).
 */
BasicGame.MainMenu.prototype.shutdown = function () {

  // destroy sprites and images
  this.backgroundImage.destroy();
  this.titleText.destroy();
  this.giantPupilImage.destroy();
  this.keysDescriptionText.destroy();
  // destroy groups
  this.optionsGroup.destroy();
  this.languageGroup.destroy();

  this.translatableTexts = null;

  /* // destroy sprites and images
  this.background.destroy();
  this.fakeViewZone.destroy();
  this.fakeEye.destroy();
  this.pupil.destroy();
  this.map.destroy();
  this.fakeplayer.destroy();
  this.light.destroy();
  this.gameTitle.destroy();
  this.showIntroTimer.destroy();
  // destroy groups
  this.buttons.destroy();
  this.ground.destroy();
  this.walls.destroy();
  this.darknessGroup.destroy();
  // destroy audio
  this.enSound.destroy();
  this.esSound.destroy();
  this.splash_music.destroy();
  // destroy tweens
  this.darknessTween.stop(); */
};

// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

BasicGame.MainMenu.prototype.createGameOptions = function () {
  this.optionsGroup = this.game.add.group();

  if (BasicGame.currentLevel > 1) {
    this.addOptionTo({
      changeWidth: true,
      msg: this.continueMsg,
      attachTextChangeCallback: true,
      hSpace: 0,
      vSpace: 1,
      group: this.optionsGroup,
      overCallback: this.showKeysDescription.bind(this, true),
      outCallback: this.showKeysDescription.bind(this, false),
      clickCallback: this.showIntro
    });
  }
  this.addOptionTo({
    changeWidth: true,
    msg: this.newGameMsg,
    attachTextChangeCallback: true,
    hSpace: 0,
    vSpace: 1,
    group: this.optionsGroup,
    overCallback: this.showKeysDescription.bind(this, true),
    outCallback: this.showKeysDescription.bind(this, false),
    clickCallback: this.newGame
  });
  this.addOptionTo({
    changeWidth: true,
    msg: this.creditsMsg,
    attachTextChangeCallback: true,
    hSpace: 0,
    vSpace: 1,
    group: this.optionsGroup,
    clickCallback: this.showCredits
  });

  this.optionsGroup.right = this.game.world.width - this.SCREEN_PADDING;
  this.optionsGroup.bottom = this.game.world.height - this.SCREEN_PADDING;

  if (BasicGame.currentLevel > 1) {
    // add a text to display the current day to load
    this.continueDayText = this.game.add.bitmapText(this.optionsGroup.right,
      this.optionsGroup.top - 10,
      this.fontId,
      this.getDayString(),
      18);
    this.continueDayText.anchor.set(1, 1);
    this.continueDayText.alpha = 0;
    this.continueDayText.tint = 0x303c42;
    this.continueDayText.alpha = .8;

    this.translatableTexts.push({
      sourceMsg: this.continueDayMsg,
      phaserObj: this.continueDayText,
      onChangeCallback: (function () {
        this.continueDayText.text = this.getDayString();
      }).bind(this)
    });
  }
};

BasicGame.MainMenu.prototype.createLanguageOptions = function () {
  var spanishOption = null;
  var englishOption = null;

  this.languageGroup = this.game.add.group();

  spanishOption = this.addOptionTo({
    msg: this.spanishLangMsg,
    textColor: 0x303c42,
    textAlign: 'left',
    clickCallback: this.setLanguage.bind(this, 'es'),
    hSpace: 0,
    vSpace: 1,
    fixedWidth: 115,
    group: this.languageGroup,
    key: 'main_menu_background'
  });

  englishOption = this.addOptionTo({
    msg: this.englishLangMsg,
    textColor: 0x303c42,
    textAlign: 'left',
    clickCallback: this.setLanguage.bind(this, 'en'),
    hSpace: 0,
    vSpace: 1,
    fixedWidth: 115,
    group: this.languageGroup,
    key: 'main_menu_background'
  });

  spanishOption.textObj.anchor.set(0, 0.5);
  spanishOption.textObj.x = spanishOption.buttonObj.left + 32;
  englishOption.textObj.anchor.set(0, 0.5);
  englishOption.textObj.x = englishOption.buttonObj.left + 32;

  // add the checkbox for spanish language option
  this.spanishCheckbox = this.addCheckboxFor({
    referenceObj: spanishOption.buttonObj,
    group: this.languageGroup,
    checked: BasicGame.language === 'es'
  });

  // add the checkbox for english language option
  this.englishCheckbox = this.addCheckboxFor({
    referenceObj: englishOption.buttonObj,
    group: this.languageGroup,
    checked: BasicGame.language === 'en'
  });

  this.languageGroup.left = this.SCREEN_PADDING;
  this.languageGroup.bottom = this.game.world.height - this.SCREEN_PADDING;
};

BasicGame.MainMenu.prototype.addOptionTo = function (prop) {
  var button = null;
  var text = null;
  var buttonsInGroup = Math.max(0, prop.group.children.length - prop.group.children.length / 2);
  var translatableObj = {};

  button = this.game.add.button(
    0 + ((this.BUTTON_WIDTH + this.BUTTON_HSPACING) * buttonsInGroup) * prop.hSpace,
    0 + ((this.BUTTON_HEIGHT + this.BUTTON_VSPACING) * buttonsInGroup) * prop.vSpace,
    prop.key || 'button_background', prop.clickCallback, this
  );
  button.anchor.set(1, 0);
  button.width = this.BUTTON_WIDTH;
  button.height = this.BUTTON_HEIGHT;

  text = this.game.add.bitmapText(button.right - this.BUTTON_PADDING,
    button.centerY,
    this.fontId, prop.msg[BasicGame.language], 18);
  text.anchor.set(1, 0.5);
  text.align = prop.textAlign || "right";
  text.tint = prop.textColor || 0xfafafa;
  text.defaultTint = text.tint;
  text.linkedButton = button;
  translatableObj.sourceMsg = prop.msg;
  translatableObj.phaserObj = text;
  if (prop.attachTextChangeCallback) {
    translatableObj.onChangeCallback = (function (textObj) {
      textObj.linkedButton.width = textObj.textWidth + this.BUTTON_PADDING * 2;
      textObj.linkedButton.defaultWidth = textObj.textWidth + this.BUTTON_PADDING * 2;
    }).bind(this, text);
  }
  this.translatableTexts.push(translatableObj);

  button.onInputOver.add(function (sprite, pointer, text) {
    text.tint = 0xf15a4a;

    if (prop.overCallback) {
      prop.overCallback();
    }
  }, this, 0, text);

  button.onInputOut.add(function (sprite, pointer, text) {
    text.tint = text.defaultTint;

    if (prop.outCallback) {
      prop.outCallback();
    }
  }, this, 0, text);

  button.width = text.textWidth + this.BUTTON_PADDING * 2;
  button.defaultWidth = text.textWidth + this.BUTTON_PADDING * 2;

  if (prop.fixedWidth) {
    button.width = prop.fixedWidth;
    button.defaultWidth = prop.fixedWidth;
  }

  if (prop.changeWidth === true) {

    button.onInputOver.add(function (sprite, pointer) {
      var overTween = this.game.add.tween(sprite);
      overTween.to({ width: this.BUTTON_WIDTH }, 150, Phaser.Easing.Exponential.Out);
      overTween.start();
    }, this, 0);

    button.onInputOut.add(function (sprite, pointer) {
      var overTween = this.game.add.tween(sprite);
      overTween.to({ width: sprite.defaultWidth }, 250, Phaser.Easing.Exponential.Out);
      overTween.start();
    }, this, 0);
  }

  prop.group.add(button);
  prop.group.add(text);

  return {
    buttonObj: button,
    textObj: text
  };
};

BasicGame.MainMenu.prototype.addCheckboxFor = function (prop) {
  var checkbox = this.game.add.image(prop.referenceObj.left, 0, 'checkbox',
    (prop.checked) ? 1 : 0, prop.group);
  checkbox.centerY = prop.referenceObj.centerY;
  return checkbox;
};

BasicGame.MainMenu.prototype.showKeysDescription = function (show) {
  var showTween = this.game.add.tween(this.keysDescriptionText);
  showTween.to({ alpha: (show === true) ? 1 : 0 }, 200, Phaser.Easing.Exponential.Out);
  showTween.start();
};

BasicGame.MainMenu.prototype.newGame = function () {
  var levelData = null;

  localStorage.removeItem("oh-my-blob");
  BasicGame.reset();

  this.game.load.onLoadComplete.addOnce(this.showIntro, this);
  var levelData = BasicGame.Helper.prototype.getLevelIdAndName(BasicGame.currentLevel);;
  this.game.load.tilemap(levelData.id,
    'assets/levels/' + levelData.name + '.json',
    null,
    Phaser.Tilemap.TILED_JSON);
  this.game.load.start();
};

BasicGame.MainMenu.prototype.showIntro = function () {
  // this.state.start((BasicGame.currentLevel === 1) ? 'Intro' : 'Game');
  this.state.start('Game');
};

BasicGame.MainMenu.prototype.showCredits = function () {
  this.creditsGroup.children[1].alpha = 0;
  this.creditsGroup.children[2].alpha = 0;

  if (BasicGame.language === 'es') {
    this.creditsGroup.children[1].alpha = 1;
  }
  else {
    this.creditsGroup.children[2].alpha = 1;
  }

  this.creditsGroup.alpha = 1;

  // this.optionsGroup.children[0].inputEnabled = false;
};


BasicGame.MainMenu.prototype.setLanguage = function (newLang) {
  if (BasicGame.language === newLang) {
    return;
  }

  this.spanishCheckbox.frame = 0;
  this.englishCheckbox.frame = 0;

  localStorage.setItem("oh-my-blob", BasicGame.setLanguage(newLang));

  if (newLang === 'es') {
    this.spanishCheckbox.frame = 1;
  }
  else {
    this.englishCheckbox.frame = 1;
  }

  this.translatableTexts.forEach(function (element, index) {
    element.phaserObj.text = element.sourceMsg[BasicGame.language];
    if (element.onChangeCallback) {
      element.onChangeCallback();
    }
  });
};

BasicGame.MainMenu.prototype.createCredits = function (newLang) {
  var backgroundImage = null;
  var englishImage = null;
  var spanishImage = null;
  var closeImage = null;

  this.creditsGroup = this.game.add.group();

  backgroundImage = this.game.add.image(0, 0, 'credits_background', 0, this.creditsGroup);
  backgroundImage.width = this.game.world.width;
  backgroundImage.height = this.game.world.height;

  englishImage = this.game.add.image(this.game.world.width / 2,
    this.game.world.height / 2,
    'credits_es', 0, this.creditsGroup);
  englishImage.anchor.set(.5, .5);
  spanishImage = this.game.add.image(this.game.world.width / 2,
    this.game.world.height / 2,
    'credits_en', 0, this.creditsGroup);
  spanishImage.anchor.set(.5, .5);
  closeImage = this.game.add.image(this.game.world.width - 32, 32, 'close', 0, this.creditsGroup);
  closeImage.anchor.set(1, 0);
};

BasicGame.MainMenu.prototype.getDayString = function (newLang) {
  var days = new BasicGame.Days();
  return this.continueDayMsg[BasicGame.language] +
    ' ' + days.getDay(BasicGame.currentLevel).number;
};