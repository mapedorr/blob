var BasicGame = {
  language: "es",
  currentLevel: 1,
  deaths: 0,
  rest: 0,
  setLanguage: function (newLanguage) {
    this.language = newLanguage;
    return this.getCode();
  },
  setDay: function (n) {
    this.currentLevel = n;
    return this.getCode();
  },
  addDeath: function () {
    this.deaths++;
    return this.getCode();
  },
  setRest: function () {
    this.rest = 1;
    return this.getCode();
  },
  getCode: function () {
    var level = this.currentLevel;
    return this.rest +
      '' + this.deaths +
      '' + ((level < 10) ? ('0' + level) : level) +
      '' + this.language;
  },
  readCode: function (code) {
    if (code.length < 4) return;

    if (code.length > 4) {
      this.language = code.slice(code.length - 2) || this.language;
      code = code.slice(0, code.length - 2);
    }

    this.currentLevel = parseInt(code.slice(code.length - 2));
    this.deaths = parseInt(code.slice(1, code.length - 2));
    this.rest = parseInt(code.charAt(0));
  },
  getDeaths: function () {
    return this.deaths;
  },
  reset: function () {
    this.currentLevel = 1;
    this.deaths = 0;
    this.rest = 0;
  },
  changeHTMLBackground: function (color) {
    document.body.style.backgroundColor = color;
  },
  getLevelMusicData: function (levelNumber) {
    var data = { key: '', file: 'assets/audio/music/' };
    var level = levelNumber || this.currentLevel;

    if (level <= 6) {
      data.key = 'dig-up-a';
      data.file += 'DigUpA.ogg';
    }
    else if (level >= 7 && level <= 10) {
      if (level === 7) {
        data.playFact = true;
      }

      data.key = 'dig-up-b';
      data.file += 'DigUpB.ogg';
    } else if (level >= 11 && level <= 20) {

      data.key = 'guilt';
      data.file += 'Guilt.ogg';
    }
    else if (level >= 21) {
      data.key = 'i-did-it';
      data.file += 'IDidIt.ogg';
    }

    return data;
  }
};

module.exports = BasicGame;