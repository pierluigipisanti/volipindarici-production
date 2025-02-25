import { Message } from '../components/PindaricAssistant';
import Anthropic from '@anthropic-ai/sdk';

// For client-side, we don't need a real API key since we're using the serverless function
const anthropic = new Anthropic({
  apiKey: "dummy-key", // This won't be used directly
  defaultHeaders: {
    'anthropic-version': '2023-06-01'
  }
});

// Helper function for making requests with error handling
export async function createChatMessage(messages: Array<{ role: string, content: string }>) {
  try {
    // This function won't be used directly from the client
    // Instead, we'll use the serverless function
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: messages,
    });
    
    return response;
  } catch (error) {
    // Handle different types of errors
    if (error.status === 429) {
      // Handle rate limit error
      console.error('Rate limit exceeded:', error);
      throw new Error('Too many requests, please try again later');
    }
    
    console.error('Error creating chat message:', error);
    throw new Error('Failed to generate response');
  }
}

export async function sendMessageToAnthropic(messages: Message[]): Promise<string> {
  try {
    // We don't need to add context here anymore since the system prompt is added on the server
    // The system prompt in netlify/functions/system-prompt.ts will be used
    
    const response = await fetch('/.netlify/functions/anthropic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
} 