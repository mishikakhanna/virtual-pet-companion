/**
 * Settings Page Component
 * 
 * Manages user preferences and app settings:
 * - Privacy settings
 * - Notification preferences
 * - Theme selection
 * - App information
 */

import { Observable } from '@nativescript/core';
import { SettingsService } from '../../services/settings/settings.service';

export class SettingsViewModel extends Observable {
    private settingsService: SettingsService;

    constructor() {
        super();
        this.settingsService = new SettingsService();
        this.loadSettings();
    }

    private async loadSettings() {
        const settings = await this.settingsService.getSettings();
        Object.keys(settings).forEach(key => {
            this.set(key, settings[key]);
        });
    }

    get localProcessing(): boolean {
        return this.get('localProcessing');
    }
    set localProcessing(value: boolean) {
        this.set('localProcessing', value);
        this.settingsService.updateSetting('localProcessing', value);
    }

    get saveHistory(): boolean {
        return this.get('saveHistory');
    }
    set saveHistory(value: boolean) {
        this.set('saveHistory', value);
        this.settingsService.updateSetting('saveHistory', value);
    }

    get activityReminders(): boolean {
        return this.get('activityReminders');
    }
    set activityReminders(value: boolean) {
        this.set('activityReminders', value);
        this.settingsService.updateSetting('activityReminders', value);
    }

    get achievementAlerts(): boolean {
        return this.get('achievementAlerts');
    }
    set achievementAlerts(value: boolean) {
        this.set('achievementAlerts', value);
        this.settingsService.updateSetting('achievementAlerts', value);
    }

    get themeIndex(): number {
        return this.get('themeIndex');
    }
    set themeIndex(value: number) {
        this.set('themeIndex', value);
        this.settingsService.updateSetting('themeIndex', value);
    }

    onPrivacyPolicy() {
        // Open privacy policy
    }

    onTermsOfService() {
        // Open terms of service
    }
}