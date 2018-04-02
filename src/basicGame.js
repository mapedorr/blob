var BasicGame = {
  language: "en",
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
  }
};

module.exports = BasicGame;