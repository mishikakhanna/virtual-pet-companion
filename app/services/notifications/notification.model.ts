/**
 * Notification Model
 * 
 * Defines the structure for notifications:
 * - Notification types and priorities
 * - Notification content structure
 * - Scheduling information
 */

export enum NotificationType {
    ACTIVITY_REMINDER = 'activity_reminder',
    ACHIEVEMENT = 'achievement',
    PET_STATUS = 'pet_status',
    SYSTEM = 'system'
}

export enum NotificationPriority {
    LOW = 'low',
    NORMAL = 'normal',
    HIGH = 'high'
}

export interface NotificationSchedule {
    time?: Date;
    repeating?: boolean;
    interval?: number; // in minutes
}

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    priority: NotificationPriority;
    schedule?: NotificationSchedule;
    data?: any;
    read: boolean;
    createdAt: Date;
}