/**
 * Activity Model
 * 
 * Defines the structure and types for activities:
 * - Activity categories and types
 * - Progress tracking
 * - Completion criteria
 */

export interface Activity {
    id: string;
    name: string;
    description: string;
    category: ActivityCategory;
    points: number;
    completed: boolean;
    timestamp?: Date;
}

export enum ActivityCategory {
    PHYSICAL = 'physical',
    SOCIAL = 'social',
    CREATIVE = 'creative',
    WELLNESS = 'wellness'
}

export interface ActivityProgress {
    totalPoints: number;
    completedActivities: number;
    streakDays: number;
    lastActivityDate?: Date;
}