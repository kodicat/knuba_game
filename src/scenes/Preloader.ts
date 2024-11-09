import { Scene } from 'phaser';

export default class Preloader extends Scene
{
    constructor()
    {
        super('preloader');
    }

    preload()
    {
        this.load.image('tiles', 'assets/tiles/tileset_day_field.png');
        this.load.tilemapTiledJSON('level_1', 'assets/level_1.json');
    }

    create()
    {
        this.scene.start('game');
    }
}