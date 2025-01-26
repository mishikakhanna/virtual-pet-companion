# Virtual Pet Companion App Documentation

This documentation provides instructions for setting up, running, and developing the Virtual Pet Companion mobile application built with NativeScript.<br>
[Product Specification Documentation]([url]https://docs.google.com/document/d/11EafncJ5-NtpCdg_fqr8uMkxKxdugLrd6XWM4mlzYF4/edit?tab=t.0#heading=h.59bnx2mlcus5)

## Overview

The Virtual Pet Companion is a mobile application that provides users with an empathetic virtual pet powered by a local large language model (LLM). The app focuses on emotional well-being through interactive conversations, activity suggestions, and gamification.

## Prerequisites

- Node.js 16 or later
- NativeScript CLI (`npm install -g @nativescript/cli`)
- For iOS development:
  - macOS
  - Xcode 12 or later
  - CocoaPods
- For Android development:
  - Android Studio
  - Android SDK
  - Java Development Kit (JDK) 11 or later

## Project Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
ns preview
```

This command starts the preview mode, allowing you to see the app in the NativeScript Preview app.

### Running on Devices/Emulators

For iOS:
```bash
ns run ios
```

For Android:
```bash
ns run android
```

## LLM Integration

The app uses a local LLM for generating responses. The LLM integration is structured into three main components:

1. **LLMService** (`app/llm/llm.service.ts`):
   - Manages model initialization and loading
   - Handles text generation
   - Implements response caching
   - Manages model cleanup

2. **ConversationModel** (`app/llm/conversation.model.ts`):
   - Manages conversation state and history
   - Handles message formatting
   - Provides context management

3. **PetPersonality** (`app/llm/pet-personality.ts`):
   - Defines pet personality traits
   - Provides response templates
   - Manages emotional responses

### Setting Up the LLM

1. Download a quantized model (e.g., LLaMA 7B) and place it in:
```
app/llm/models/
```

2. Install required dependencies:
```bash
npm install @llama-node/core @llama-node/llama-cpp
```

3. Initialize the LLM service in your app:
```typescript
import { LLMService } from './llm/llm.service';

const llmService = new LLMService();
await llmService.initialize();
```

## Project Structure

```
app/
├── llm/              # LLM integration
│   ├── models/       # Model files
│   ├── llm.service.ts       # LLM service
│   ├── conversation.model.ts # Conversation management
│   └── pet-personality.ts   # Pet personality configuration
├── components/       # UI components
├── screens/         # Main screens
├── services/        # App services
└── utils/           # Utility functions
```

