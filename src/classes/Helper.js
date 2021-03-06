var BasicGame = require('BasicGame');

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
  var timer = this.game.time.create(this.game, true);
  timer.add(delay, callback, context || this)
  timer.start(100);
  return timer;
};

BasicGame.Helper.prototype.randomColor = function () {
  var letters = '0123456789ABCDEF';
  var color = '0x';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

BasicGame.Helper.prototype.randomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

BasicGame.Helper.prototype.getLevelIdAndName = function (levelNumber) {
  var postfix = (levelNumber < 10) ? '0' : '';
  return {
    id: 'lvl' + postfix + levelNumber,
    name: 'level' + postfix + levelNumber
  };
};

BasicGame.Helper.prototype.getSkyName = function (levelNumber) {
  if (levelNumber <= 10) {
    return 'sky01';
  } else if (levelNumber <= 20) {
    return 'sky02';
  } else {
    return 'sky03';
  }
};

BasicGame.Helper.prototype.getSkyColor = function (levelNumber) {
  if (!levelNumber) {
    return '#F2F2F0';
  }

  if (levelNumber <= 10) {
    return '#2B3825';
  } else if (levelNumber <= 20) {
    return '#33393D';
  } else {
    return '#202049';
  }
};