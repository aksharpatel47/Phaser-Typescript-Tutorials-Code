/**
 * Created by akshar patel on 05/03/15.
 */
/// <reference path="../bower_components/phaser/typescript/phaser.d.ts"/>
/// <reference path="GameState.ts"/>
module ToddlerGame{
    export class Game extends Phaser.Game{
        constructor(){
            super(640,360,Phaser.AUTO,'');
            this.state.add('GameState', GameState);
            this.state.start('GameState');
        }
    }
}

window.onload = function(){
    new ToddlerGame.Game();
};