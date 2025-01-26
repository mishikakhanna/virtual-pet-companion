/**
 * Customization Page Component
 * 
 * Manages pet customization options:
 * - Pet name
 * - Accessories selection
 * - Background themes
 * - Color schemes
 */

import { Observable } from '@nativescript/core';
import { CustomizationService } from '../../services/customization/customization.service';

export class CustomizationViewModel extends Observable {
    private customizationService: CustomizationService;

    constructor() {
        super();
        this.customizationService = new CustomizationService();
        this.loadCustomizations();
    }

    private async loadCustomizations() {
        const customizations = await this.customizationService.getCustomizations();
        this.set('petName', customizations.petName);
        this.set('accessories', customizations.accessories);
        this.set('backgrounds', customizations.backgrounds);
        this.set('colorThemes', customizations.colorThemes);
        this.updatePreview();
    }

    get currentPetImage(): string {
        return this.get('currentPetImage');
    }

    get petName(): string {
        return this.get('petName');
    }
    set petName(value: string) {
        this.set('petName', value);
        this.customizationService.updatePetName(value);
    }

    onSelectAccessory(args: any) {
        const accessory = args.object.bindingContext;
        this.customizationService.toggleAccessory(accessory.id);
        this.updatePreview();
    }

    onSelectBackground(args: any) {
        const background = args.object.bindingContext;
        this.customizationService.setBackground(background.id);
        this.updatePreview();
    }

    onSelectColorTheme(args: any) {
        const theme = args.object.bindingContext;
        this.customizationService.setColorTheme(theme.id);
        this.updatePreview();
    }

    private updatePreview() {
        const preview = this.customizationService.generatePreview();
        this.set('currentPetImage', preview);
    }
}