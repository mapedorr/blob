var BasicGame = require('BasicGame');

BasicGame.TheEnd = function (game) {
  // constants
  this.PANELS_SPACING = 16;
  this.FADEIN_DELAY = 800;
  this.NEXT_PANEL_DELAY = 1500;
  this.KEY_NEXT1 = Phaser.Keyboard.D;
  this.KEY_NEXT2 = Phaser.Keyboard.RIGHT;
  this.FONT_REGULAR = 'font';
  this.FONT_MEDIUM = 'font-medium';
  this.FOOTER_MSG = {
    'es': 'Hace un par de horas\nPasada la media noche',
    'en': 'A couple of hours ago\nPast midnight'
  };
  this.NEXT_MSG = {
    'es': 'siguiente',
    'en': 'next'
  };
  this.MAINMENU_MSG = {
    'es': 'ir al menú principal',
    'en': 'go to main menu'
  };
  this.PANELS_KEYS = [
    'end_scene_p1v1',
    'end_scene_p1v2',
    'end_scene_p1v3',
    'end_scene_p2v1',
    'end_scene_p2v2',
    'end_scene_p2v3'
  ];
  this.THANKS_MSG = {
    'es': 'gracias por jugar',
    'en': 'thanks for playing'
  };

  // destroyable objects (sprites, sounds, groups, tweens...)
  this.background = null;
  this.panelsGroup = null;
  this.buttonGroup = null;
  this.footerText = null;
  // this.music = null;
  this.thanksText = null;

  // global properties
  this.currentPanelIndex = 0;
  this.nextClicked = false;
};

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ PHASER STATE METHODS                                                     ║
BasicGame.TheEnd.prototype.preload = function () {
  if (BasicGame.language === 'es') {
    this.load.image(this.PANELS_KEYS[0], 'assets/sprites/end_es_1-1.png');
    this.load.image(this.PANELS_KEYS[1], 'assets/sprites/end_es_1-2.png');
    this.load.image(this.PANELS_KEYS[2], 'assets/sprites/end_es_1-3.png');
    this.load.image(this.PANELS_KEYS[3], 'assets/sprites/end_es_2-1.png');
    this.load.image(this.PANELS_KEYS[4], 'assets/sprites/end_es_2-2.png');
    this.load.image(this.PANELS_KEYS[5], 'assets/sprites/end_es_2-3.png');
  }
  else if (BasicGame.language === 'en') {
    this.load.image(this.PANELS_KEYS[0], 'assets/sprites/end_en_1-1.png');
    this.load.image(this.PANELS_KEYS[1], 'assets/sprites/end_en_1-2.png');
    this.load.image(this.PANELS_KEYS[2], 'assets/sprites/end_en_1-3.png');
    this.load.image(this.PANELS_KEYS[3], 'assets/sprites/end_en_2-1.png');
    this.load.image(this.PANELS_KEYS[4], 'assets/sprites/end_en_2-2.png');
    this.load.image(this.PANELS_KEYS[5], 'assets/sprites/end_en_2-3.png');
  }
};

BasicGame.TheEnd.prototype.create = function () {
  var index = 0;
  var panelImage = null;
  var panelCounter = 0;
  var nextButton = null;
  var nextText = null;

  this.nextClicked = false;

  // set the background for the scene
  this.background = this.game.add.image(0, 0, 'credits_background');
  this.background.width = this.game.world.width;
  this.background.height = this.game.world.height;

  // add the footer message
  this.footerText = this.game.add.bitmapText(this.game.world.width - 16,
    this.game.world.height - 16,
    this.FONT_MEDIUM, this.FOOTER_MSG[BasicGame.language], 24);
  this.footerText.anchor.set(1, 1);
  this.footerText.align = 'right';

  // add the panels group
  this.panelsGroup = this.game.add.group();
  for (index = 0; index < this.PANELS_KEYS.length; index++) {
    panelImage = this.game.add.image(0, 0, this.PANELS_KEYS[index], 0, this.panelsGroup);
    panelImage.x = panelCounter * (panelCounter > 0 ? panelImage.width + this.PANELS_SPACING : 0);
    panelImage.alpha = 0;

    if (++panelCounter > 2) {
      panelCounter = 0;
    }
  }
  this.panelsGroup.x = 16;
  this.panelsGroup.y = 16;

  // add the next group
  this.createButton({
    buttonText: this.NEXT_MSG[BasicGame.language],
    clickCallback: function () {
      this.buttonGroup.destroy();
      this.nextClicked = true;
      this.showPanel();
    }
  });
  this.buttonGroup.children[0].input.enabled = false;
  this.buttonGroup.alpha = 0;

  // play the music
  // this.music = this.game.add.sound('exit_music', 0.1, true);
  // this.music.play();

  // init the animations for the first page
  this.currentPanelIndex = 0;
  this.showPanel();
};

BasicGame.TheEnd.prototype.update = function () {

};

/**
 * This method will be called when the State is shutdown (i.e. you switch to another state from this one).
 */
BasicGame.TheEnd.prototype.shutdown = function () {
  this.background.destroy();
  this.panelsGroup.destroy();
  this.buttonGroup.destroy();
  this.footerText.destroy();
  // this.music.destroy();
  this.thanksText.destroy();
};
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
BasicGame.TheEnd.prototype.showPanel = function () {
  var fadeTween = null;

  if (this.currentPanelIndex > 2) {
    if (this.currentPanelIndex > 5) {
      // show another next button
      this.createButton({
        buttonText: this.NEXT_MSG[BasicGame.language],
        clickCallback: function () {
          this.buttonGroup.destroy();
          this.showThanks();
        }
      });
      return;
    }
    else if (this.buttonGroup.alpha === 0 && !this.nextClicked) {
      // show next button
      this.buttonGroup.children[0].input.enabled = true;
      this.buttonGroup.alpha = 1;
      return;
    }
  }

  fadeTween = this.game.add.tween(this.panelsGroup.children[this.currentPanelIndex++]);
  fadeTween.to({ alpha: 1 }, this.FADEIN_DELAY, Phaser.Easing.Quadratic.Out, false);
  fadeTween.onComplete.addOnce(function () {
    this.game.time.create(this.game, true)
      .add(this.NEXT_PANEL_DELAY, this.showPanel, this)
      .timer.start(100);
  }, this);
  fadeTween.start();
};

BasicGame.TheEnd.prototype.createButton = function (prop) {
  this.buttonGroup = this.game.add.group();

  nextButton = this.game.add.button(this.game.world.width / 2,
    this.footerText.centerY, 'button_background', prop.clickCallback, this);
  nextButton.anchor.set(.5, .5);

  nextText = this.game.add.bitmapText(nextButton.x, nextButton.y,
    this.FONT_REGULAR, prop.buttonText, 18);
  nextText.anchor.set(.5, .5);

  nextButton.width = nextText.textWidth + 32;
  nextButton.height = nextText.textHeight + 16;

  this.buttonGroup.addChild(nextButton);
  this.buttonGroup.addChild(nextText);
};

BasicGame.TheEnd.prototype.showThanks = function () {
  this.footerText.alpha = 0;
  this.panelsGroup.alpha = 0;

  this.thanksText = this.game.add.bitmapText(this.game.world.width / 2,
    this.game.world.height / 2,
    this.FONT_MEDIUM, this.THANKS_MSG[BasicGame.language], 32);
  this.thanksText.anchor.set(.5, .5);

  // show main menu button
  this.createButton({
    buttonText: this.MAINMENU_MSG[BasicGame.language],
    clickCallback: function () {
      this.state.start('MainMenu');
    }
  });
};