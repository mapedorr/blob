var BasicGame = {
  language: "es",
  currentLevel: 1,
  deaths: 0,
  rest: 0,
  coUnlocked: false,
  coId: 'c',
  useCo: false,
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
    this.rest = this.coId;
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
    this.rest = code.charAt(0);

    if (this.rest === this.coId) {
      this.coUnlocked = true;
    }
  },
  getDeaths: function () {
    return this.deaths;
  },
  reset: function () {
    this.currentLevel = 1;
    this.deaths = 0;
  },
  changeHTMLBackground: function (color) {
    document.body.style.backgroundColor = color;

  }
};

module.exports = BasicGame;