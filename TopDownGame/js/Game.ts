/**
 * Created by akshar patel on 09/03/15.
 */
/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>
/// <reference path="Boot.ts"/>
/// <reference path="Preload.ts"/>
/// <reference path="PlayGame.ts"/>
module TopDownGame{
    export class Game extends Phaser.Game{
        constructor(width: number, height: number){
            super(width, height, Phaser.AUTO, '');

            this.state.add('Boot', Boot, false);
            this.state.add('Preload', Preload, false);
            this.state.add('PlayGame', PlayGame, false);

            this.state.start('Boot', true, true);
        }
    }
}

window.onload = () => {
    new TopDownGame.Game(window.innerWidth, window.innerHeight);
};