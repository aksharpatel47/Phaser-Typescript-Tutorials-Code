/**
 * Created by aksharpatel on 09/03/15.
 */
/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>

module TopDownGame{
    export class Preload extends Phaser.State{
        constructor(){
            super();
        }

        preloadBar: Phaser.Sprite;

        preload(){
            this.preloadBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
            this.preloadBar.anchor.setTo(0.5);
            this.load.setPreloadSprite(this.preloadBar);
            this.load.tilemap('level1', './assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('level2', './assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('gameTiles', './assets/images/tiles.png');
            this.load.image('greencup', './assets/images/greencup.png');
            this.load.image('bluecup', './assets/images/bluecup.png');
            this.load.image('player', './assets/images/player.png');
            this.load.image('browndoor', './assets/images/browndoor.png');
        }

        create(){
            this.game.state.start('PlayGame');
        }
    }
}