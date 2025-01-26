/**
 * Notification Service
 * 
 * Manages system notifications:
 * - Schedules notifications
 * - Handles notification delivery
 * - Manages notification history
 * - Controls notification permissions
 */

import { Observable, LocalNotifications } from '@nativescript/core';
import { Notification, NotificationType, NotificationPriority } from './notification.model';
import { SettingsService } from '../settings/settings.service';

export class NotificationService extends Observable {
    private settingsService: SettingsService;
    private notifications: Notification[] = [];

    constructor() {
        super();
        this.settingsService = new SettingsService();
        this.initialize();
    }

    private async initialize() {
        // Request notification permissions
        await LocalNotifications.requestPermission();
        
        // Load notification settings
        const settings = await this.settingsService.getSettings();
        if (settings.activityReminders) {
            this.scheduleActivityReminders();
        }
    }

    async scheduleNotification(notification: Notification): Promise<void> {
        // Add to internal list
        this.notifications.push(notification);

        // Schedule local notification
        await LocalNotifications.schedule([{
            id: parseInt(notification.id),
            title: notification.title,
            body: notification.message,
            at: notification.schedule?.time || new Date(),
            forceShowWhenInForeground: true,
            channel: notification.type // Android notification channel
        }]);

        this.notifyPropertyChange('notifications', this.getNotifications());
    }

    private scheduleActivityReminders() {
        // Schedule daily activity reminders
        const reminder: Notification = {
            id: Date.now().toString(),
            type: NotificationType.ACTIVITY_REMINDER,
            title: 'Time for Activities!',
            message: 'Your pet wants to do something fun with you!',
            priority: NotificationPriority.NORMAL,
            schedule: {
                repeating: true,
                interval: 1440 // daily
            },
            read: false,
            createdAt: new Date()
        };

        this.scheduleNotification(reminder);
    }

    async sendAchievementNotification(achievement: string): Promise<void> {
        const notification: Notification = {
            id: Date.now().toString(),
            type: NotificationType.ACHIEVEMENT,
            title: 'New Achievement!',
            message: `Congratulations! You've earned: ${achievement}`,
            priority: NotificationPriority.HIGH,
            read: false,
            createdAt: new Date()
        };

        await this.scheduleNotification(notification);
    }

    async sendPetStatusNotification(status: string): Promise<void> {
        const notification: Notification = {
            id: Date.now().toString(),
            type: NotificationType.PET_STATUS,
            title: 'Pet Status Update',
            message: status,
            priority: NotificationPriority.NORMAL,
            read: false,
            createdAt: new Date()
        };

        await this.scheduleNotification(notification);
    }

    getNotifications(): Notification[] {
        return [...this.notifications].sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
    }

    async markAsRead(notificationId: string): Promise<void> {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.notifyPropertyChange('notifications', this.getNotifications());
        }
    }

    async clearNotification(notificationId: string): Promise<void> {
        const index = this.notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
            this.notifications.splice(index, 1);
            await LocalNotifications.cancel(parseInt(notificationId));
            this.notifyPropertyChange('notifications', this.getNotifications());
        }
    }

    async clearAllNotifications(): Promise<void> {
        this.notifications = [];
        await LocalNotifications.cancelAll();
        this.notifyPropertyChange('notifications', this.getNotifications());
    }
}