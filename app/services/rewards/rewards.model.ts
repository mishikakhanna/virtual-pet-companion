/**
 * Rewards Model
 * 
 * Defines the structure for rewards and achievements:
 * - Reward types and categories
 * - Achievement criteria
 * - Unlockable content
 */

export interface Reward {
    id: string;
    name: string;
    description: string;
    type: RewardType;
    pointsRequired: number;
    unlocked: boolean;
    icon: string;
}

export enum RewardType {
    ANIMATION = 'animation',
    ACCESSORY = 'accessory',
    BACKGROUND = 'background',
    ACHIEVEMENT = 'achievement'
}