/**
 * Chat Interface Component
 * 
 * Manages the chat UI and interaction between user and virtual pet:
 * - Displays chat messages
 * - Handles user input
 * - Integrates with LLM service for responses
 * - Shows pet animations based on context
 */

import { Observable } from '@nativescript/core';
import { LLMService } from '../../llm/llm.service';
import { ConversationModel, Message } from '../../llm/conversation.model';
import { PetPersonality } from '../../llm/pet-personality';

export class ChatInterfaceViewModel extends Observable {
    private llmService: LLMService;
    private conversationModel: ConversationModel;
    private messageText: string = '';

    constructor() {
        super();
        this.llmService = new LLMService();
        this.conversationModel = new ConversationModel();
        this.initialize();
    }

    async initialize() {
        await this.llmService.initialize();
        // Send welcome message
        const greeting = PetPersonality.templates.greeting;
        this.conversationModel.addMessage(greeting, false);
        this.notifyPropertyChange('messages', this.messages);
    }

    get messages(): Message[] {
        return this.conversationModel.getHistory();
    }

    async onSendMessage() {
        if (!this.messageText.trim()) return;

        // Add user message
        this.conversationModel.addMessage(this.messageText, true);
        const context = this.conversationModel.getContext();
        const prompt = PetPersonality.generatePrompt(this.messageText, context);

        // Clear input
        this.messageText = '';
        this.notifyPropertyChange('messageText', '');
        this.notifyPropertyChange('messages', this.messages);

        try {
            // Generate and add pet response
            const response = await this.llmService.generateResponse(prompt);
            this.conversationModel.addMessage(response, false);
            this.notifyPropertyChange('messages', this.messages);
        } catch (error) {
            console.error('Failed to generate response:', error);
            // Add fallback response
            const fallback = PetPersonality.templates.comfort[0];
            this.conversationModel.addMessage(fallback, false);
            this.notifyPropertyChange('messages', this.messages);
        }
    }

    onNavigatingFrom() {
        this.llmService.dispose();
    }
}