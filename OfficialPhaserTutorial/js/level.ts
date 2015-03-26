/**
 * Created by aksharpatel on 24/03/15.
 */
/// <reference path="../bower_components/phaser/typescript/phaser.d.ts"/>
module FirstGame{
    export class Level extends Phaser.State{
        constructor(){
            super();
        }

        platforms: Phaser.Group;
        player: Phaser.Sprite;
        cursors: Phaser.CursorKeys;
        stars: Phaser.Group;
        scoreText: Phaser.Text;
        score: number;

        init() {
            this.score = 0;
        }

        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.add.sprite(0, 0, 'sky');

            //Creating ground and platforms
            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;

            var ground: Phaser.Sprite = this.platforms.create(0, this.game.world.height - 64, 'ground');
            ground.scale.setTo(2, 2);
            ground.body.immovable = true;

            var ledge: Phaser.Sprite = this.platforms.create(400, 400, 'ground');
            ledge.body.immovable = true;

            ledge = this.platforms.create(-150, 250, 'ground');
            ledge.body.immovable = true;

            //Creating player
            this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

            this.game.physics.enable(this.player);

            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 600;
            this.player.body.collideWorldBounds = true;

            //Adding Player animations
            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);

            //Adding Stars
            this.stars = this.game.add.group();
            this.stars.enableBody = true;

            for (var i = 0; i < 12; i++) {
                var star: Phaser.Sprite = this.stars.create(i * 70, 0, 'star');
                star.body.gravity.y = 500;
                star.body.bounce.y = 0.3 + Math.random() * 0.2;
            }

            //Adding Score Text
            this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

            //Adding keyboard input listener
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.stars, this.platforms);
            this.game.physics.arcade.overlap(this.player, this.stars, this.collect, null, this);

            this.player.body.velocity.x = 0;

            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -200;
                this.player.animations.play('left');
            } else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 200;
                this.player.animations.play('right');
            } else {
                this.player.animations.stop();
                this.player.frame = 4;
            }

            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.body.velocity.y = -450;
            }
        }

        collect(player: Phaser.Sprite, star: Phaser.Sprite) {
            star.kill();

            this.score += 10;
            this.scoreText.text = 'Score: ' + this.score;
        }
    }
}