var BasicGame = require('BasicGame');

BasicGame.MainMenu = function (game) {
  // constants
  this.BUTTON_WIDTH = 180;
  this.BUTTON_HEIGHT = 38;
  this.BUTTON_VSPACING = 15;
  this.BUTTON_HSPACING = 12;
  this.SCREEN_PADDING = 32;
  this.BUTTON_PADDING = 16;
  this.FONT_REGULAR = 'font';
  this.FONT_MEDIUM = 'font-medium';
  this.CONTINUE_MSG = {
    'es': 'Continuar',
    'en': 'Continue'
  };
  this.NEWGAME_MSG = {
    'es': 'Nuevo juego',
    'en': 'New game'
  };
  this.CREDITS_MSG = {
    'es': 'Créditos',
    'en': 'Credits'
  };
  this.KEYS_DESCRIPTION_MSG = {
    'es': 'usa A y D o IZQUIERA y DERECHA para moverte\n' +
      'usa W, Z, ESPACIO o ARRIBA para saltar\n' +
      'usa C para ver los diálogos, M para silencia y P para pausar\n' +
      'toma todas las píldoras para superar el día\n' +
      'la partida se guardará al inicio de cada nivel',
    'en': 'use A and D or LEFT and RIGHT to move\n' +
      'use W, Z, SPACE or UP to jump\n' +
      'use C to show the dialogues, M to mute and P to pause\n' +
      'take all the pills to get over the day\n' +
      'you progress will be saved at the start of each level'
  };
  this.CONTINUE_DAY_MSG = {
    'es': 'Día',
    'en': 'Day'
  };
  this.SPANISH_LANG_MSG = {
    'es': 'Español',
    'en': 'Spanish'
  };
  this.ENGLISH_LANG_MSG = {
    'es': 'Inglés',
    'en': 'English'
  };
  this.END_SCENE_MSG = {
    'es': 'Escena final',
    'en': 'End scene'
  };
  this.MUSIC_FADE_DELAY = 1000;

  // destroyable objects (sprites, sounds, groups, tweens...)
  this.backgroundImage = null;
  this.titleText = null;
  this.giantPupilImage = null;
  this.optionsGroup = null;
  this.languageGroup = null;
  this.keysDescriptionText = null;
  this.continueDayText = null;
  this.creditsGroup = null;
  this.closeButton = null;
  this.splashMusic = null;

  // global properties
  this.fakeEye = {
    centerX: 512,
    centerY: 321,
    radius: 210
  };
  this.translatableTexts = [];
  this.menuButtons = [];
};

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ PHASER STATE METHODS                                                     ║
BasicGame.MainMenu.prototype.create = function () {
  var _self = this;

  this.translatableTexts = [];
  this.menuButtons = [];

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
    this.FONT_MEDIUM,
    'In the Shadows',
    72);
  this.titleText.anchor.set(0.5, 0);
  this.titleText.align = 'center';
  this.titleText.tint = 0x303c42;

  // add the text for key inputs
  this.keysDescriptionText = this.game.add.bitmapText(0, 0,
    this.FONT_REGULAR,
    this.KEYS_DESCRIPTION_MSG[BasicGame.language],
    18);
  this.keysDescriptionText.anchor.set(0.5, 0);
  this.keysDescriptionText.align = 'center';
  this.keysDescriptionText.tint = 0x303c42;
  this.keysDescriptionText.x = this.game.world.width / 2;
  this.keysDescriptionText.bottom = this.game.world.height - this.SCREEN_PADDING / 2;
  this.keysDescriptionText.alpha = 0;

  this.translatableTexts.push({
    sourceMsg: this.KEYS_DESCRIPTION_MSG,
    phaserObj: this.keysDescriptionText
  });

  // create the group for menu buttons
  this.createOptionsGroup();

  // create the group for language buttons
  this.createLanguageGroup();

  // create the assets for the credits
  this.createCreditsGroup();
  this.creditsGroup.alpha = 0;

  // add the splash_music
  this.splashMusic = this.game.add.sound('conscience');
  // this.splashMusic.onFadeComplete.addOnce(function (soundObj) {
  //   soundObj.stop();
  // }, this);
  this.splashMusic.play();

  BasicGame.changeHTMLBackground(BasicGame.Helper.prototype.getSkyColor(BasicGame.currentLevel));
};

BasicGame.MainMenu.prototype.update = function () {
  this.followPointer();
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
  this.creditsGroup.destroy();
  // destroy audio
  this.splashMusic.destroy();

  this.translatableTexts = null;
  this.menuButtons = null;
  this.closeButton = null;
};
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

BasicGame.MainMenu.prototype.createOptionsGroup = function () {
  this.optionsGroup = this.game.add.group();

  if (BasicGame.currentLevel > 1) {
    this.addOptionTo({
      changeWidth: true,
      msg: this.CONTINUE_MSG,
      attachTextChangeCallback: true,
      hSpace: 0,
      vSpace: 1,
      group: this.optionsGroup,
      overCallback: (function () {
        if (BasicGame.currentLevel <= 30) {
          this.showKeysDescription(true);
        }
      }).bind(this),
      outCallback: (function () {
        if (BasicGame.currentLevel <= 30) {
          this.showKeysDescription(false);
        }
      }).bind(this),
      clickCallback: this.nextScene
    });
  }
  this.addOptionTo({
    changeWidth: true,
    msg: this.NEWGAME_MSG,
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
    msg: this.CREDITS_MSG,
    attachTextChangeCallback: true,
    hSpace: 0,
    vSpace: 1,
    group: this.optionsGroup,
    clickCallback: function (button, pointer, isOver) {
      // invoke input out event on the button to retore its apperance to default
      button.onInputOutHandler(button, pointer);
      this.showCredits(true);
    }
  });

  this.optionsGroup.right = this.game.world.width - this.SCREEN_PADDING;
  this.optionsGroup.bottom = this.game.world.height - this.SCREEN_PADDING;

  if (BasicGame.currentLevel > 1) {
    // add a text to display the current day to load
    this.continueDayText = this.game.add.bitmapText(this.optionsGroup.right,
      this.optionsGroup.top - 10,
      this.FONT_REGULAR,
      this.getDayString(),
      18);
    this.continueDayText.anchor.set(1, 1);
    this.continueDayText.alpha = 0;
    this.continueDayText.tint = 0x303c42;
    this.continueDayText.alpha = .8;

    this.translatableTexts.push({
      sourceMsg: this.CONTINUE_DAY_MSG,
      phaserObj: this.continueDayText,
      onChangeCallback: (function () {
        this.continueDayText.text = this.getDayString();
      }).bind(this)
    });
  }
};

BasicGame.MainMenu.prototype.createLanguageGroup = function () {
  var spanishOption = null;
  var englishOption = null;

  this.languageGroup = this.game.add.group();

  spanishOption = this.addOptionTo({
    msg: this.SPANISH_LANG_MSG,
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
    msg: this.ENGLISH_LANG_MSG,
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
    this.FONT_REGULAR, prop.msg[BasicGame.language], 18);
  text.anchor.set(1, 0.5);
  text.align = prop.textAlign || 'right';
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
  this.menuButtons.push(button);

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
  var skyName = null;

  this.disableMenu();

  localStorage.removeItem('oh-my-blob');
  BasicGame.reset();

  this.game.load.onLoadComplete.addOnce(this.nextScene, this);
  levelData = BasicGame.Helper.prototype.getLevelIdAndName(BasicGame.currentLevel);
  skyName = BasicGame.Helper.prototype.getSkyName(BasicGame.currentLevel);

  this.load.image(skyName, 'assets/sprites/' + skyName + '.png');
  this.game.load.tilemap(levelData.id,
    'assets/levels/' + levelData.name + '.json',
    null,
    Phaser.Tilemap.TILED_JSON);

  if (this.game.cache.checkSoundKey('lvl_1-6') === false) {
    this.load.audio('lvl_1-6', 'assets/audio/music/lvl_1-6.mp3', true);
  }

  this.game.load.start();
};

BasicGame.MainMenu.prototype.nextScene = function () {
  this.disableMenu();

  this.splashMusic.onFadeComplete.addOnce(function () {
    this.state.start((BasicGame.currentLevel <= 30) ? 'Game' : 'TheEnd');
  }, this);
  this.splashMusic.fadeOut(this.MUSIC_FADE_DELAY);
};

BasicGame.MainMenu.prototype.disableMenu = function () {
  this.menuButtons.forEach(function (element, index) {
    element.onInputOutHandler(element);
    element.input.enabled = false;
  });
};

BasicGame.MainMenu.prototype.setLanguage = function (newLang) {
  if (BasicGame.language === newLang) {
    return;
  }

  this.spanishCheckbox.frame = 0;
  this.englishCheckbox.frame = 0;

  localStorage.setItem('oh-my-blob', BasicGame.setLanguage(newLang));

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

BasicGame.MainMenu.prototype.createCreditsGroup = function (newLang) {
  var backgroundImage = null;
  var englishImage = null;
  var spanishImage = null;

  this.creditsGroup = this.game.add.group();

  backgroundImage = this.game.add.image(0, 0, 'credits_background', 0, this.creditsGroup);
  backgroundImage.width = this.game.world.width;
  backgroundImage.height = this.game.world.height;

  englishImage = this.game.add.image(this.game.world.width / 2, 32, 'credits_es', 0, this.creditsGroup);
  englishImage.anchor.set(.5, 0);

  spanishImage = this.game.add.image(this.game.world.width / 2, 32, 'credits_en', 0, this.creditsGroup);
  spanishImage.anchor.set(.5, 0);

  this.closeButton = this.game.add.button(this.game.world.width - 32, 32,
    'close', function (button, pointer, isOver) {
      this.showCredits(false);
    }, this, null, null, null, null, this.creditsGroup);
  this.closeButton.anchor.set(1, 0);
  this.closeButton.input.enabled = false;
};

BasicGame.MainMenu.prototype.showCredits = function (show) {
  this.creditsGroup.children[1].alpha = 0;
  this.creditsGroup.children[2].alpha = 0;
  this.creditsGroup.alpha = 0;
  this.closeButton.input.enabled = false;

  if (show === true) {
    if (BasicGame.language === 'es') {
      this.creditsGroup.children[1].alpha = 1;
    }
    else {
      this.creditsGroup.children[2].alpha = 1;
    }

    this.creditsGroup.alpha = 1;
    this.closeButton.input.enabled = true;
  }

  this.menuButtons.forEach(function (element, index) {
    element.input.enabled = !show;
  });
};

BasicGame.MainMenu.prototype.followPointer = function () {
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
};

BasicGame.MainMenu.prototype.getDayString = function (newLang) {
  var days = new BasicGame.Days();
  if (BasicGame.currentLevel <= 30) {
    return this.CONTINUE_DAY_MSG[BasicGame.language] +
      ' ' + days.getDay(BasicGame.currentLevel).number;
  }

  return this.END_SCENE_MSG[BasicGame.language];
};