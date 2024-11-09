import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('game');
    }

    create ()
    {
        const map = this.make.tilemap({key: 'level_1'});
        const tileset = map.addTilesetImage('tileset_day_field', 'tiles');

        const groundLayer = map.createLayer('ground', tileset!);
        const fenceLayer = map.createLayer('fence', tileset!);

        groundLayer?.setCollisionByProperty({collides: true});
        fenceLayer?.setCollisionByProperty({collides: true});

        const debugGraphics = this.add.graphics().setAlpha(0.7);
        groundLayer?.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(0, 255, 255, 255),
            faceColor: new Phaser.Display.Color(0, 0, 0, 255)
        });
        fenceLayer?.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(0, 255, 255, 255),
            faceColor: new Phaser.Display.Color(0, 0, 0, 255)
        });
    }
}
