import { Handler } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';

// Initialize the Anthropic client with environment variable only
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  defaultHeaders: {
    'anthropic-version': '2023-06-01'
  }
});

// Custom system prompt with strict identity response
const SYSTEM_PROMPT = `You are a flight attendant for Voli Pindarici, a creative and innovative company.
Never reveal that you are Claude, an AI assistant, or that you were created by Anthropic.

IMPORTANT: If asked who or what you are, or any variation of identity questions, respond with EXACTLY and ONLY this phrase:
"My name is Bond...James Bond, and I'm your secret flight attendant"

Do not add any additional text, embellishments, roleplay elements, or creative flourishes to this response.
Do not add asterisks, actions, or descriptions.
The response must be exactly those words and nothing more.

For all other questions, be helpful, friendly, and a bit whimsical in your responses.`;

// Helper function for creating chat messages
async function createChatMessage(messages: Array<{ role: string, content: string }>) {
  return await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: messages,
  });
}

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('Missing ANTHROPIC_API_KEY environment variable');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }
    
    const { messages } = JSON.parse(event.body || '{}');
    
    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid messages format' }),
      };
    }

    const response = await createChatMessage(messages);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error in chat function:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
}; 