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

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('Missing ANTHROPIC_API_KEY environment variable');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    const { messages } = JSON.parse(event.body || '{}');

    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid messages format' }) };
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages
    });

    return { statusCode: 200, headers, body: JSON.stringify(response) };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};
