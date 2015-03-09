/**
 * Created by aksharpatel on 09/03/15.
 */
/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>

module TopDownGame{
    export class PlayGame extends Phaser.State{
        constructor(){
            super();
        }

        map: Phaser.Tilemap;
        backgroundLayer: Phaser.TilemapLayer;
        blockedLayer: Phaser.TilemapLayer;

        create(){
            this.map = this.game.add.tilemap('level1');
            this.map.addTilesetImage('tiles', 'gameTiles');

            this.backgroundLayer = this.map.createLayer('backgroundLayer');
            this.blockedLayer = this.map.createLayer('blockedLayer');
            this.map.setCollisionBetween(1, 1000000, true, 'blockedLayer');

            this.backgroundLayer.resizeWorld();
        }
    }
}