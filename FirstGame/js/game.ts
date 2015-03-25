/**
 * Created by aksharpatel on 24/03/15.
 */
/// <reference path="../bower_components/phaser/typescript/phaser.d.ts"/>
/// <reference path="boot.ts"/>
/// <reference path="level.ts"/>
module FirstGame{
    export class Game extends Phaser.Game {
        constructor () {
            super(800, 600, Phaser.AUTO, '');
            this.state.add('Boot', Boot);
            this.state.add('Level', Level);
            this.state.start('Boot');
        }
    }
}

window.onload = function () {
    new FirstGame.Game();
};
