/**
 * Created by aksharpatel on 09/03/15.
 */
/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>

module TopDownGame{
    export class Boot extends Phaser.State{
        constructor(){
            super();
        }

        preload(){
            this.game.load.image('preloadBar', './assets/images/preloader-bar.png');
        }

        create(){
            this.game.stage.backgroundColor = "#fff";

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.refresh();
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.game.state.start('Preload', true, false);

        }
    }
}
