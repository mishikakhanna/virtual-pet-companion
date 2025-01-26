/**
 * Rewards Service
 * 
 * Manages the reward system:
 * - Tracks achievements
 * - Unlocks rewards
 * - Manages pet customization
 */

import { Observable } from '@nativescript/core';
import { Reward, RewardType } from './rewards.model';

export class RewardsService extends Observable {
    private rewards: Reward[] = [
        {
            id: 'dance-animation',
            name: 'Happy Dance',
            description: 'New dance animation for your pet',
            type: RewardType.ANIMATION,
            pointsRequired: 50,
            unlocked: false,
            icon: '~/assets/icons/dance.png'
        },
        {
            id: 'hat-accessory',
            name: 'Party Hat',
            description: 'A cute party hat for your pet',
            type: RewardType.ACCESSORY,
            pointsRequired: 100,
            unlocked: false,
            icon: '~/assets/icons/hat.png'
        },
        {
            id: 'park-background',
            name: 'Park Background',
            description: 'A beautiful park background',
            type: RewardType.BACKGROUND,
            pointsRequired: 200,
            unlocked: false,
            icon: '~/assets/icons/park.png'
        }
    ];

    constructor() {
        super();
    }

    /**
     * Checks and unlocks available rewards based on points
     */
    checkRewards(points: number): Reward[] {
        const newUnlocks = this.rewards.filter(
            reward => !reward.unlocked && points >= reward.pointsRequired
        );

        newUnlocks.forEach(reward => {
            reward.unlocked = true;
        });

        if (newUnlocks.length > 0) {
            this.notifyPropertyChange('rewards', this.rewards);
        }

        return newUnlocks;
    }

    /**
     * Returns all rewards
     */
    getRewards(): Reward[] {
        return [...this.rewards];
    }

    /**
     * Returns unlocked rewards
     */
    getUnlockedRewards(): Reward[] {
        return this.rewards.filter(reward => reward.unlocked);
    }
}