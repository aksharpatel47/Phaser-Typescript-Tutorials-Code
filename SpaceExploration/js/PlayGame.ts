/**
 * Created by aksharpatel on 09/03/15.
 */
/// <reference path="../bower_components/phaser/typescript/phaser.d.ts"/>
/// <reference path="Game.ts"/>
module SpaceHipster{
    export class PlayGame extends Phaser.State{
        constructor(){
            super();
        }

        playerScore: number;
        playerSpeed: number;

        background: Phaser.TileSprite;
        player: Phaser.Sprite;

        explosionSound: Phaser.Sound;
        collectSound: Phaser.Sound;

        asteroids: Phaser.Group;
        collectables: Phaser.Group;

        scoreLabel: Phaser.Text;

        init(){
            this.playerScore = 0;
            this.playerSpeed = 100;
        }

        create(){
            this.game.world.setBounds(0, 0, 1920, 1920);
            this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');

            this.explosionSound = this.game.add.audio('explosion');
            this.collectSound = this.game.add.audio('collect');

            this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
            this.player.anchor.setTo(0.5);
            this.player.scale.setTo(2);

            this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
            this.player.animations.play('fly');

            this.game.physics.arcade.enable(this.player);
            this.player.body.collideWorldBounds = true;

            this.game.camera.follow(this.player);

            this.generateAsteroids();
            this.generateCollectibles();
            this.showLabels();
        }

        update(){
            if(this.game.input.activePointer.justPressed()){
                this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
            }
            this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);
            this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
        }

        generateAsteroids(){
            this.asteroids = this.game.add.group();

            this.asteroids.enableBody = true;
            this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

            var numAsteroids: number = this.game.rnd.integerInRange(150, 200);
            var asteroid: Phaser.Sprite;

            for(var i: number = 0; i < numAsteroids; i++){
                asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
                asteroid.scale.setTo(this.game.rnd.integerInRange(10, 40) / 10);
                asteroid.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
                asteroid.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
                asteroid.body.immovable = true;
                asteroid.body.collideWorldBounds = true;
            }
        }

        hitAsteroid(player: Phaser.Sprite, asteroid: Phaser.Sprite){
            this.game.input.enabled = false;
            this.explosionSound.play();

            var emitter: Phaser.Particles.Arcade.Emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
            emitter.makeParticles('playerParticle');
            emitter.minParticleSpeed.setTo(-200, -200);
            emitter.maxParticleSpeed.setTo(200, 200);
            emitter.gravity = 0;
            emitter.start(true, 1000, null, 100);
            player.destroy();
            asteroid.destroy();

            SpaceHipster.highScore = Math.max(this.playerScore, SpaceHipster.highScore);
            this.game.time.events.add(1000, this.gameOver, this);
        }

        generateCollectibles(){
            this.collectables = this.game.add.group();
            this.collectables.enableBody = true;
            this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

            var numCollectibles: number = this.game.rnd.integerInRange(100, 150);
            var collectable: Phaser.Sprite;

            for(var i: number = 0; i < numCollectibles; i++){
                collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
                collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
                collectable.animations.play('fly');
            }
        }

        collect(player: Phaser.Sprite, collectable: Phaser.Sprite){
            this.collectSound.play();
            this.playerScore++;
            this.scoreLabel.text = "Score: " + this.playerScore;

            collectable.destroy();
        }

        showLabels(){
            var text = "Score: 0";
            var style = {
                font: "20px Impact",
                fill: "#fff",
                align: "center"
            };
            this.scoreLabel = this.game.add.text(50, 50, text, style);
            this.scoreLabel.fixedToCamera = true;
        }

        gameOver(){
            this.game.state.start('MainMenu', true, false);
        }
    }
}