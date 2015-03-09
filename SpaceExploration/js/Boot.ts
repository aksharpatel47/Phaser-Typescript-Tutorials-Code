/**
 * Created by akshar patel on 09/03/15.
 */
/// <reference path="../bower_components/phaser/typescript/phaser.d.ts"/>
/// <reference path="Game.ts"/>
module SpaceHipster{
    export class Boot extends Phaser.State{
        constructor(){
            super();
        }

        init(){
            if(!SpaceHipster.highScore){
                SpaceHipster.highScore = 0;
            }
        }

        preload(){
            this.game.load.image('logo', './assets/images/logo.png');
            this.game.load.image('preloadbar', './assets/images/preloader-bar.png');
        }

        create(){
            this.game.stage.backgroundColor = '#fff';
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 240;
            this.game.scale.minHeight = 170;
            this.game.scale.maxWidth = 2880;
            this.game.scale.maxHeight = 1920;

            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            this.game.scale.refresh();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.game.state.start('Preload');
        }
    }
}