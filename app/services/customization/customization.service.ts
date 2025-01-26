/**
 * Customization Service
 * 
 * Manages pet customization features:
 * - Stores customization preferences
 * - Handles asset management
 * - Generates pet previews
 */

import { Observable } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';

export class CustomizationService extends Observable {
    private readonly CUSTOMIZATION_KEY = 'pet_customization';
    private defaultCustomizations = {
        petName: 'Buddy',
        activeAccessories: [],
        activeBackground: 'default',
        activeColorTheme: 'default'
    };

    constructor() {
        super();
    }

    async getCustomizations(): Promise<any> {
        const saved = ApplicationSettings.getString(this.CUSTOMIZATION_KEY);
        const customizations = saved ? JSON.parse(saved) : this.defaultCustomizations;

        return {
            ...customizations,
            accessories: this.getAvailableAccessories(),
            backgrounds: this.getAvailableBackgrounds(),
            colorThemes: this.getAvailableColorThemes()
        };
    }

    private getAvailableAccessories() {
        return [
            { id: 'hat', name: 'Party Hat', icon: '~/assets/accessories/hat.png' },
            { id: 'glasses', name: 'Cool Glasses', icon: '~/assets/accessories/glasses.png' },
            { id: 'bowtie', name: 'Bow Tie', icon: '~/assets/accessories/bowtie.png' }
        ];
    }

    private getAvailableBackgrounds() {
        return [
            { id: 'default', name: 'Default', preview: '~/assets/backgrounds/default.png' },
            { id: 'park', name: 'Park', preview: '~/assets/backgrounds/park.png' },
            { id: 'beach', name: 'Beach', preview: '~/assets/backgrounds/beach.png' }
        ];
    }

    private getAvailableColorThemes() {
        return [
            { id: 'default', name: 'Default', color: '#007AFF' },
            { id: 'pink', name: 'Pink', color: '#FF2D55' },
            { id: 'purple', name: '#5856D6' }
        ];
    }

    async updatePetName(name: string): Promise<void> {
        const customizations = await this.getCustomizations();
        customizations.petName = name;
        this.saveCustomizations(customizations);
    }

    async toggleAccessory(accessoryId: string): Promise<void> {
        const customizations = await this.getCustomizations();
        const index = customizations.activeAccessories.indexOf(accessoryId);
        
        if (index === -1) {
            customizations.activeAccessories.push(accessoryId);
        } else {
            customizations.activeAccessories.splice(index, 1);
        }
        
        this.saveCustomizations(customizations);
    }

    async setBackground(backgroundId: string): Promise<void> {
        const customizations = await this.getCustomizations();
        customizations.activeBackground = backgroundId;
        this.saveCustomizations(customizations);
    }

    async setColorTheme(themeId: string): Promise<void> {
        const customizations = await this.getCustomizations();
        customizations.activeColorTheme = themeId;
        this.saveCustomizations(customizations);
    }

    private async saveCustomizations(customizations: any): Promise<void> {
        ApplicationSettings.setString(this.CUSTOMIZATION_KEY, JSON.stringify(customizations));
    }

    generatePreview(): string {
        // In a real implementation, this would combine the pet image with
        // selected accessories and background
        return '~/assets/pet/default.png';
    }
}