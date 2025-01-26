/**
 * Pet Display Component
 * 
 * Manages the virtual pet's visual representation:
 * - Handles pet animations
 * - Updates pet emotions
 * - Displays current activities
 * - Manages pet state
 */

import { Observable } from '@nativescript/core';

export class PetDisplayViewModel extends Observable {
    private animations = {
        idle: '~/assets/animations/idle.gif',
        happy: '~/assets/animations/happy.gif',
        thinking: '~/assets/animations/thinking.gif',
        sleeping: '~/assets/animations/sleeping.gif'
    };

    private _currentAnimation: string = this.animations.idle;
    private _currentEmotion: string = 'Happy';
    private _currentActivity: string = 'Waiting to chat';

    constructor() {
        super();
    }

    get currentAnimation(): string {
        return this._currentAnimation;
    }

    get currentEmotion(): string {
        return this._currentEmotion;
    }

    get currentActivity(): string {
        return this._currentActivity;
    }

    /**
     * Updates the pet's animation based on the current state
     */
    updateAnimation(state: 'idle' | 'happy' | 'thinking' | 'sleeping') {
        this._currentAnimation = this.animations[state];
        this.notifyPropertyChange('currentAnimation', this._currentAnimation);
    }

    /**
     * Updates the pet's emotional state
     */
    updateEmotion(emotion: string) {
        this._currentEmotion = emotion;
        this.notifyPropertyChange('currentEmotion', this._currentEmotion);
    }

    /**
     * Updates the pet's current activity
     */
    updateActivity(activity: string) {
        this._currentActivity = activity;
        this.notifyPropertyChange('currentActivity', this._currentActivity);
    }

    /**
     * Resets the pet to its default state
     */
    reset() {
        this.updateAnimation('idle');
        this.updateEmotion('Happy');
        this.updateActivity('Waiting to chat');
    }
}