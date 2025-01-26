/**
 * Notification Center Component
 * 
 * Manages notification display and interaction:
 * - Lists all notifications
 * - Handles notification filtering
 * - Manages notification actions
 */

import { Observable } from '@nativescript/core';
import { NotificationService } from '../../services/notifications/notification.service';
import { Notification, NotificationType } from '../../services/notifications/notification.model';

export class NotificationCenterViewModel extends Observable {
    private notificationService: NotificationService;
    private _currentFilter: string = 'all';

    constructor() {
        super();
        this.notificationService = new NotificationService();
        this.loadNotifications();
    }

    private loadNotifications() {
        this.notifyPropertyChange('filteredNotifications', this.filteredNotifications);
    }

    get currentFilter(): string {
        return this._currentFilter;
    }

    get filteredNotifications(): Notification[] {
        const notifications = this.notificationService.getNotifications();
        return this._currentFilter === 'unread'
            ? notifications.filter(n => !n.read)
            : notifications;
    }

    getTypeIcon(type: NotificationType): string {
        switch (type) {
            case NotificationType.ACTIVITY_REMINDER:
                return '⏰';
            case NotificationType.ACHIEVEMENT:
                return '🏆';
            case NotificationType.PET_STATUS:
                return '🐾';
            default:
                return '📢';
        }
    }

    async onClearNotification(args: any) {
        const notification = args.object.bindingContext as Notification;
        await this.notificationService.clearNotification(notification.id);
        this.loadNotifications();
    }

    async onClearAll() {
        await this.notificationService.clearAllNotifications();
        this.loadNotifications();
    }

    onFilterAll() {
        this._currentFilter = 'all';
        this.notifyPropertyChange('currentFilter', this._currentFilter);
        this.loadNotifications();
    }

    onFilterUnread() {
        this._currentFilter = 'unread';
        this.notifyPropertyChange('currentFilter', this._currentFilter);
        this.loadNotifications();
    }
}