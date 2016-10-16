var BasicGame = BasicGame || {};

/**
 * Method that set the default values for the properties of the Helper object.
 * 
 * @param {Object} game    The Object of Phaser game
 * @param {Object} gameObj The Object of BasicGame.Game
 */
BasicGame.Helper = function (game, gameObj) {
  this.game = game;
  this.gameObj = gameObj;
};

BasicGame.Helper.prototype.timer = function (delay, callback, context) {
  this.game.time.create(this.game, true)
    .add(delay, callback, context || this)
    .timer.start(100);
};
