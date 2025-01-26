/**
 * LLM Service
 * 
 * This service manages the local Large Language Model integration:
 * - Handles model initialization and loading
 * - Manages conversation context
 * - Provides methods for text generation
 * - Implements caching for common responses
 * - Handles error states and model cleanup
 */

import { Observable } from '@nativescript/core';
import { LLamaModel, LLamaContext, LLamaConfig } from '@llama-node/core';

export class LLMService extends Observable {
    private model: LLamaModel | null = null;
    private context: LLamaContext | null = null;
    private readonly CACHE_SIZE = 100;
    private responseCache: Map<string, string> = new Map();

    // Model configuration
    private readonly config: LLamaConfig = {
        modelPath: '~/llm/models/model.bin',
        contextSize: 2048,
        batchSize: 512,
        threads: 4,
        temperature: 0.7,
        topP: 0.95,
    };

    constructor() {
        super();
    }

    /**
     * Initializes the LLM model and prepares it for use
     * Returns true if initialization was successful
     */
    public async initialize(): Promise<boolean> {
        try {
            this.model = await LLamaModel.load(this.config);
            this.context = this.model.createContext();
            return true;
        } catch (error) {
            console.error('Failed to initialize LLM:', error);
            return false;
        }
    }

    /**
     * Generates a response based on user input
     * Implements caching for frequently used responses
     */
    public async generateResponse(input: string): Promise<string> {
        if (!this.model || !this.context) {
            throw new Error('LLM not initialized');
        }

        // Check cache first
        const cachedResponse = this.responseCache.get(input);
        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const response = await this.context.generate(input, {
                maxTokens: 100,
                stopSequences: ['\n', '.', '!', '?']
            });

            // Cache the response
            if (this.responseCache.size >= this.CACHE_SIZE) {
                const firstKey = this.responseCache.keys().next().value;
                this.responseCache.delete(firstKey);
            }
            this.responseCache.set(input, response);

            return response;
        } catch (error) {
            console.error('Error generating response:', error);
            throw error;
        }
    }

    /**
     * Cleans up resources when the service is destroyed
     */
    public dispose(): void {
        if (this.context) {
            this.context.dispose();
            this.context = null;
        }
        if (this.model) {
            this.model.dispose();
            this.model = null;
        }
        this.responseCache.clear();
    }
}