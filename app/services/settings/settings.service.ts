/**
 * Settings Service
 * 
 * Manages application settings and preferences:
 * - Stores user preferences
 * - Handles settings persistence
 * - Provides default values
 */

import { Observable } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';

export class SettingsService extends Observable {
    private readonly SETTINGS_KEY = 'app_settings';
    private defaultSettings = {
        localProcessing: true,
        saveHistory: true,
        activityReminders: true,
        achievementAlerts: true,
        themeIndex: 2 // System default
    };

    constructor() {
        super();
    }

    async getSettings(): Promise<any> {
        const savedSettings = ApplicationSettings.getString(this.SETTINGS_KEY);
        return savedSettings ? JSON.parse(savedSettings) : this.defaultSettings;
    }

    async updateSetting(key: string, value: any): Promise<void> {
        const currentSettings = await this.getSettings();
        const newSettings = {
            ...currentSettings,
            [key]: value
        };
        ApplicationSettings.setString(this.SETTINGS_KEY, JSON.stringify(newSettings));
    }

    async resetSettings(): Promise<void> {
        ApplicationSettings.setString(this.SETTINGS_KEY, JSON.stringify(this.defaultSettings));
    }
}