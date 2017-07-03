// Color combos:
// - http://www.colorcombos.com/color-schemes/6343/ColorCombo6343.html
// - http://www.colorcombos.com/color-schemes/5897/ColorCombo5897.html
var BasicGame = require('BasicGame');

window.onload = function () {

    console.log('- - - - - - - - - - -');
    console.log(BasicGame);

    //Create your Phaser game and inject it into the gameContainer div.
    //We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    var game = new Phaser.Game(1024, 640, Phaser.CANVAS, 'gameContainer');

    //Add the States your game has.
    //You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
    game.state.add('Boot', BasicGame.Boot);
    game.state.add('Preloader', BasicGame.Preloader);
    game.state.add('MainMenu', BasicGame.MainMenu);
    game.state.add('Intro', BasicGame.Intro);
    game.state.add('Game', BasicGame.Game);
    game.state.add('GameOver', BasicGame.GameOver);
    game.state.add('TheEnd', BasicGame.TheEnd);
    game.state.add('Credits', BasicGame.Credits);

    //Now start the Boot state.
    game.state.start('Boot');
};