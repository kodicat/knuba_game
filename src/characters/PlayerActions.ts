import Phaser from 'phaser'
import { Motion } from '../actions/Motion';
import { Game } from '../scenes/Game';

export default class PlayerActions {
    private game!: Game;
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    constructor(game: Game, player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
        this.game = game;
        this.player = player;
    }

    public move(action: Motion): void {
        const motion = action.motion;
        const count = action.count;

        if (motion === 'h') {
            this.moveLeft(count);
        } else if (motion === 'j') {
            this.moveDown(count);
        } else if (motion === 'k') {
            this.moveUp(count);
        } else if (motion === 'l') {
            this.moveRight(count);
        }
    }

    private moveLeft(count: number): void {
        for (let i = 0; i < count; i++) {
            this.moveSingleTime(-16, 0, 'fauna-idle-side', true);
        }
    }

    private moveDown(count: number) {
        for (let i = 0; i < count; i++) {
            this.moveSingleTime(0, 16, 'fauna-idle-down');
        }
    }

    private moveUp(count: number) {
        for (let i = 0; i < count; i++) {
            this.moveSingleTime(0, -16, 'fauna-idle-up');
        }
    }

    private moveRight(count: number): void {
        for (let i = 0; i < count; i++) {
            this.moveSingleTime(16, 0, 'fauna-idle-side');
        }
    }

    private moveSingleTime(xDelta: number, yDelta: number, animationKey: string, invertScaleX: boolean = false): void {
        let targetX = this.player.x + xDelta;
        let targetY = this.player.y + yDelta;


        let layers = this.game.getLayers();
        const isColliding = this.isColliding(targetX, targetY, layers);

        if (isColliding) {
            console.log('Collision detected - cannot teleport!');
            // todo: Play collision sound
        } else {
            this.player.anims.play(animationKey, true);
            this.player.setPosition(targetX, targetY);

            this.player.scaleX = invertScaleX ? Math.abs(this.player.scaleX) * -1 : Math.abs(this.player.scaleX);
            this.player.body.offset.x = invertScaleX ? 32 : 0;
            this.player.body.offset.y = 0;
        }
    }

    private isColliding(targetX: number, targetY: number, layers: Phaser.Tilemaps.TilemapLayer[]): boolean {
        return layers.some(x => this.isCollidingSingleLayer(targetX, targetY, x));
    }

    private isCollidingSingleLayer(targetX: number, targetY: number, layer: Phaser.Tilemaps.TilemapLayer): boolean {
        const targetTileX = layer.worldToTileX(targetX);
        const targetTileY = layer.worldToTileY(targetY);
        const targetTile = layer.getTileAt(targetTileX, targetTileY);

        return targetTile?.properties?.collides || false;
    }

}