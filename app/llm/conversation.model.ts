/**
 * Conversation Model
 * 
 * Manages the conversation state and history:
 * - Stores conversation messages
 * - Handles message formatting
 * - Manages conversation context
 * - Provides methods for history retrieval
 */

export interface Message {
    id: string;
    content: string;
    timestamp: Date;
    isUser: boolean;
}

export class ConversationModel {
    private messages: Message[] = [];
    private readonly MAX_HISTORY = 50;

    constructor() {}

    /**
     * Adds a new message to the conversation
     */
    public addMessage(content: string, isUser: boolean): Message {
        const message: Message = {
            id: Date.now().toString(),
            content,
            timestamp: new Date(),
            isUser
        };

        this.messages.push(message);

        // Maintain history limit
        if (this.messages.length > this.MAX_HISTORY) {
            this.messages.shift();
        }

        return message;
    }

    /**
     * Returns the conversation history
     */
    public getHistory(): Message[] {
        return [...this.messages];
    }

    /**
     * Clears the conversation history
     */
    public clearHistory(): void {
        this.messages = [];
    }

    /**
     * Gets the conversation context for the LLM
     */
    public getContext(): string {
        return this.messages
            .slice(-5) // Last 5 messages for context
            .map(msg => `${msg.isUser ? 'User' : 'Pet'}: ${msg.content}`)
            .join('\n');
    }
}