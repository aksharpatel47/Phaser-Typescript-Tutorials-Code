/**
 * Created by akshar patel on 09/03/15.
 */
/// <reference path="../bower_components/phaser/typescript/phaser.d.ts"/>
/// <reference path="Game.ts"/>
module SpaceHipster{
    export class MainMenu extends Phaser.State{
        constructor(){
            super();
        }

        background: Phaser.TileSprite;
        beginText: Phaser.Text;
        highScoreText: Phaser.Text;

        create(){
            this.game.input.enabled = true;
            this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
            this.background.autoScroll(-20,0);

            var text = "Tap to Begin";
            var style = {
                font: "30px Arial",
                fill: "#fff",
                align: "center"
            };

            this.beginText = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
            this.beginText.anchor.set(0.5, 0.5);
            console.log(this.beginText);

            text = "Highest Score: " + SpaceHipster.highScore;
            this.highScoreText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 50, text, style);
            this.highScoreText.anchor.set(0.5,0.5);
        }

        update(){
            if(this.game.input.activePointer.justPressed()){
                this.game.state.start('PlayGame');
            }
        }
    }
}