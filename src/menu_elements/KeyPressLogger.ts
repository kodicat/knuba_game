import Phaser from 'phaser';
import { IGNORED_KEYS } from '../handlers/Constants';

export default class KeyPressLogger {
    private keyBuffer: string[] = [];
    private bufferLimit: number;
    private keyLogText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, bufferLimit: number = 4) {
        this.bufferLimit = bufferLimit;

        let camera = scene.cameras.main;
        this.keyLogText = scene.add.text(1, 1, '', {
            fontSize: '16px',
            color: '#ffffff',
            // backgroundColor: '#000000',
            padding: { x: 2, y: 2 }
        })
        .setScrollFactor(0) // Ensure it doesn't scroll with the camera
        .setPosition(2, 2);

        // Listen for keydown events on the scene
        scene.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            this.handleKeyPress(event);
        });
    }

    private handleKeyPress(event: KeyboardEvent): void {
        let key = event.key;
        if (IGNORED_KEYS.includes(key)) {
            return;
        }

        if (key === 'Escape') {
            key = 'Esc';
        }

        this.keyBuffer.push(key);

        // Limit the buffer to the specified length
        if (this.keyBuffer.length > this.bufferLimit) {
            this.keyBuffer.shift();
        }

        // Update the key log display
        this.updateKeyLogDisplay();
    }

    private updateKeyLogDisplay(): void {
        // Join the key buffer to create a single string
        const logText = this.keyBuffer.join(' → ');
        this.keyLogText.setText(logText);
    }

    // Optionally, expose a method to destroy the logger
    public destroy(): void {
        this.keyLogText.destroy();
    }
}
