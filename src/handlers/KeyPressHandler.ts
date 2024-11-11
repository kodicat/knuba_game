import Phaser from 'phaser';
import { IGNORED_KEYS } from './Constants';
import { Motion } from '../actions/Motion';
import { CONFIGURATION } from '../Configuration';
import { Game } from '../scenes/Game';

export default class KeyPressHandler {
    private countKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private keyBuffer: string[] = [];
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.game.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            this.handleKeyDown(event);
        });
    }

    public addAvailableMotion(motionKey: string): void {
        if (motionKey == null || motionKey === '' || motionKey.length > 1) {
            return;
        }
        CONFIGURATION.availableMotionKeys.push(motionKey);
        // remove possible duplicates
        CONFIGURATION.availableMotionKeys = [...new Set(CONFIGURATION.availableMotionKeys)];
    }

    private handleKeyDown(event: KeyboardEvent): void {
        const hasModifiers = event.altKey || event.shiftKey || event.metaKey || event.ctrlKey;
        if (hasModifiers) {
            return;
        }

        const key = event.key;
        if (IGNORED_KEYS.includes(key)) {
            return;
        }

        if (this.countKeys.includes(key)) {
            this.keyBuffer.push(key);
            return;
        }

        if (CONFIGURATION.availableMotionKeys.includes(key)) {
            this.keyBuffer.push(key);

            // make player movement
            const motion = this.createMotion(this.keyBuffer);
            const player = this.game.getPlayer();
            player.move(motion);

            // clean up buffer
            this.keyBuffer = [];
            return;
        }

        this.keyBuffer = [];
    }

    private createMotion(buffer: string[]): Motion {
        const motion = buffer[buffer.length - 1];
        const countString = buffer.slice(0, -1).join('');
        const count = parseInt(countString, 10) || 1;

        return { count, motion };
    }
}
