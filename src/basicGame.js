var BasicGame = {
  language: "en",
  currentLevel: 10,
  deaths: 0,
  rest: 0,
  setDay: function(n) {
    this.currentLevel = (n < 10) ? ('0' + n) : n;
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
    return this.rest + '' + this.deaths + '' + this.currentLevel;
  },
  readCode: function(code) {
    if (code.length < 4) return;

    this.currentLevel = parseInt(code.slice(code.length -2, code.length));
    this.deaths = parseInt(code.slice(1, code.length - 2));
    this.rest = parseInt(code.charAt(0));
  },
  getDeaths: function() {
    return this.deaths;
  },
  reset: function() {
    this.currentLevel = 1;
    this.deaths = 0;
    this.rest = 0;
  }
};

module.exports = BasicGame;