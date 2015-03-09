/**
 * Created by akshar patel on 09/03/15.
 */
/// <reference path="../bower_components/phaser/typescript/phaser.d.ts"/>
/// <reference path="Boot.ts"/>
/// <reference path="Preload.ts"'/>
/// <reference path="MainMenu.ts"/>
/// <reference path="PlayGame.ts"/>
module SpaceHipster{
    export class Game extends Phaser.Game{
        constructor(){
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
            this.state.add('Boot', Boot, false);
            this.state.add('Preload', Preload, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('PlayGame', PlayGame, false);
            this.state.start('Boot');
        }
    }

    export var highScore: number;
}

window.onload = () => {
    new SpaceHipster.Game();
};