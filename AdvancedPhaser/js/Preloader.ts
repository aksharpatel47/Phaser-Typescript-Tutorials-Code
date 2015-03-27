/**
 * Created by aksharpatel on 27/03/15.
 */
/// <reference path="../source/phaser.d.ts"/>
module Castlevania {
    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {
            this.preloadBar = this.game.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('titlepage', './assets/titlepage.jpg');
            this.load.image('logo', './assets/logo.png');
            this.load.audio('music', './assets/title.mp3', true);
            this.load.spritesheet('simon', './assets/simon.png', 58, 96, 5);
            this.load.image('level1', './assets/level1.png');
        }

        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000,
                Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}