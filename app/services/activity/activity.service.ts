/**
 * Activity Service
 * 
 * Manages activity-related operations:
 * - Activity generation and suggestions
 * - Progress tracking
 * - Reward calculations
 * - Streak management
 */

import { Observable } from '@nativescript/core';
import { Activity, ActivityCategory, ActivityProgress } from './activity.model';

export class ActivityService extends Observable {
    private activities: Activity[] = [];
    private progress: ActivityProgress = {
        totalPoints: 0,
        completedActivities: 0,
        streakDays: 0
    };

    private activityTemplates = {
        [ActivityCategory.PHYSICAL]: [
            { name: 'Quick Dance', description: 'Dance to your favorite song', points: 10 },
            { name: 'Stretch Break', description: 'Do some simple stretches', points: 5 }
        ],
        [ActivityCategory.SOCIAL]: [
            { name: 'Kind Message', description: 'Send a kind message to someone', points: 8 },
            { name: 'Gratitude', description: 'Express gratitude to someone', points: 7 }
        ],
        [ActivityCategory.CREATIVE]: [
            { name: 'Doodle Time', description: 'Draw something fun', points: 6 },
            { name: 'Humming', description: 'Hum your favorite tune', points: 4 }
        ],
        [ActivityCategory.WELLNESS]: [
            { name: 'Deep Breaths', description: 'Take 5 deep breaths', points: 5 },
            { name: 'Water Break', description: 'Drink a glass of water', points: 3 }
        ]
    };

    constructor() {
        super();
        this.generateDailyActivities();
    }

    /**
     * Generates a new set of daily activities
     */
    private generateDailyActivities() {
        this.activities = [];
        Object.values(ActivityCategory).forEach(category => {
            const templates = this.activityTemplates[category];
            const selected = templates[Math.floor(Math.random() * templates.length)];
            this.activities.push({
                id: Date.now().toString() + category,
                ...selected,
                category,
                completed: false
            });
        });
        this.notifyPropertyChange('activities', this.activities);
    }

    /**
     * Completes an activity and updates progress
     */
    completeActivity(activityId: string): void {
        const activity = this.activities.find(a => a.id === activityId);
        if (!activity || activity.completed) return;

        activity.completed = true;
        activity.timestamp = new Date();
        
        this.progress.totalPoints += activity.points;
        this.progress.completedActivities++;
        this.updateStreak();

        this.notifyPropertyChange('activities', this.activities);
        this.notifyPropertyChange('progress', this.progress);
    }

    /**
     * Updates the daily streak
     */
    private updateStreak() {
        const today = new Date().toDateString();
        const lastActivity = this.progress.lastActivityDate?.toDateString();

        if (lastActivity === today) return;

        if (lastActivity === new Date(Date.now() - 86400000).toDateString()) {
            this.progress.streakDays++;
        } else {
            this.progress.streakDays = 1;
        }

        this.progress.lastActivityDate = new Date();
    }

    getActivities(): Activity[] {
        return [...this.activities];
    }

    getProgress(): ActivityProgress {
        return { ...this.progress };
    }
}