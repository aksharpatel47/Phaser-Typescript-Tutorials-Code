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
        background: Phaser.TilemapLayer;
        walls: Phaser.TilemapLayer;
        items: Phaser.Group;
        doors: Phaser.Group;
        player: Phaser.Sprite;
        cursors: Phaser.CursorKeys;

        create(){
            this.map = this.game.add.tilemap('level1');
            this.map.addTilesetImage('tiles', 'gameTiles');

            this.background = this.map.createLayer('backgroundLayer');
            this.walls = this.map.createLayer('blockedLayer');
            this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

            this.background.resizeWorld();
            this.createItems();
            this.createDoors();
            this.createPlayer();

            this.cursors = this.game.input.keyboard.createCursorKeys();
        }

        createItems(){
            this.items = this.game.add.group();
            this.items.enableBody = true;
            var result = this.findObjectsByType('item', this.map, 'objectsLayer');
            result.forEach(element => {
                this.createFromTiledObject(element, this.items);
            });
        }

        createDoors(){
            this.doors = this.game.add.group();
            this.items.enableBody = true;
            var result = this.findObjectsByType('door', this.map, 'objectsLayer');
            result.forEach(element => {
                this.createFromTiledObject(element, this.doors);
            })
        }

        createPlayer(){
            var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');

            this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
            this.player.anchor.setTo(0.5);
            this.game.physics.arcade.enable(this.player);
            this.player.body.collideWorldBounds = true;

            this.game.camera.follow(this.player);
        }


        findObjectsByType(type: string, map: Phaser.Tilemap, layer: string){
            var result = [];
            map.objects[layer].forEach(element => {
                if(element.properties.type === type){
                    element.y -= this.map.tileHeight;
                    result.push(element);
                }
            });
            return result;
        }

        createFromTiledObject(element, group: Phaser.Group){
            var sprite = group.create(element.x, element.y, element.properties.sprite);

            Object.keys(element.properties).forEach(key => {
                sprite[key] = element.properties[key];
            });
        }

        update(){
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;

            this.game.physics.arcade.collide(this.player, this.walls);
            this.game.physics.arcade.collide(this.player, this.items, this.collect, null,  this);

            if(this.cursors.up.isDown){
                this.player.body.velocity.y -= 50;
            }
            else if(this.cursors.down.isDown){
                this.player.body.velocity.y += 50;
            }
            if(this.cursors.left.isDown){
                this.player.body.velocity.x -= 50;
            }
            else if(this.cursors.right.isDown){
                this.player.body.velocity.x +=50;
            }
        }

        collect(player: Phaser.Sprite, item: Phaser.Sprite){
            item.destroy();
            console.log("yummy");
        }
    }
}