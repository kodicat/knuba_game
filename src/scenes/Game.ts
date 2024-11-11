import { Scene } from 'phaser';
import KeyPressLogger from '../menu_elements/KeyPressLogger';
import { createPlayerAnims } from '../characters/PlayerAnims';
import Player from '../characters/PlayerActions';
import KeyPressHandler from '../handlers/KeyPressHandler';
import { CONFIGURATION } from '../Configuration';
import PlayerActions from '../characters/PlayerActions';

export class Game extends Scene
{
    private layers!: Phaser.Tilemaps.TilemapLayer[];

    private PLAYER_X: number = 128 + 8;
    private PLAYER_Y: number = 256 + 16 + 8;
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private playerActions!: PlayerActions;

    private keyPressLogger?: KeyPressLogger;
    private keyPressHandler!: KeyPressHandler;

    constructor () {
        super('game');
    }

    public getPlayer(): PlayerActions {
        return this.playerActions;
    }

    public getLayers(): Phaser.Tilemaps.TilemapLayer[] {
        return this.layers;
    }

    preload() {
    }

    create () {
        const map = this.make.tilemap({key: 'level_1'});
        const tileset = map.addTilesetImage('tileset_day_field', 'tiles')!;
        const groundLayer = map.createLayer('ground', tileset)!
            .setCollisionByProperty({collides: true});
        const fenceLayer = map.createLayer('fence', tileset)!
            .setCollisionByProperty({collides: true});
        this.layers = [groundLayer, fenceLayer];

        createPlayerAnims(this.anims);
        this.setupPlayer();
        this.playerActions = new PlayerActions(this, this.player);
        this.keyPressHandler = new KeyPressHandler(this);
        this.setupCamera();
        this.enableMenu();
    }

    private setupPlayer(): void {
        this.player = this.physics.add.sprite(this.PLAYER_X, this.PLAYER_Y, 'fauna', 'walk-down-3.png');
        this.player.setSize(this.player.body.width * .9, this.player.body.height * .9);
        this.player.setScale(.5);
        this.player.anims.play('fauna-idle-down');
    }

    private setupCamera(): void {
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setLerp(0.02, 0.03);
        this.cameras.main.setDeadzone(40, 20);
    }

    private enableMenu(): void {
        if (CONFIGURATION.enableKeyPressLogger) {
            this.keyPressLogger = new KeyPressLogger(this);
        }
    }
}
