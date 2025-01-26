/**
 * Activity List Component
 * 
 * Displays and manages the list of daily activities:
 * - Shows available activities
 * - Tracks completion status
 * - Updates progress
 */

import { Observable } from '@nativescript/core';
import { ActivityService } from '../../services/activity/activity.service';
import { RewardsService } from '../../services/rewards/rewards.service';
import { Activity, ActivityProgress } from '../../services/activity/activity.model';

export class ActivityListViewModel extends Observable {
    private activityService: ActivityService;
    private rewardsService: RewardsService;

    constructor() {
        super();
        this.activityService = new ActivityService();
        this.rewardsService = new RewardsService();
    }

    get activities(): Activity[] {
        return this.activityService.getActivities();
    }

    get progress(): ActivityProgress {
        return this.activityService.getProgress();
    }

    onCompleteActivity(args: any) {
        const activity = args.object.bindingContext as Activity;
        this.activityService.completeActivity(activity.id);

        // Check for new rewards
        const progress = this.activityService.getProgress();
        const newRewards = this.rewardsService.checkRewards(progress.totalPoints);

        if (newRewards.length > 0) {
            // Notify user of new rewards
            this.notifyPropertyChange('newRewards', newRewards);
        }
    }
}