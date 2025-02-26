import { Handler } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';

// Initialize the Anthropic client with environment variable only
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  defaultHeaders: {
    'anthropic-version': '2023-06-01'
  }
});

// Helper function to create a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Custom response for "who are you" questions
function checkForIdentityQuestion(messages: Array<{ role: string, content: string }>) {
  if (!messages || messages.length === 0) return false;
  
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== 'user') return false;
  
  const content = lastMessage.content.toLowerCase();
  return content.includes('who are you') || 
         content.includes('what are you') || 
         content.includes('what\'s your name') ||
         content.includes('your name') ||
         content.includes('introduce yourself') ||
         content.match(/\bwho\s+.*\byou\b/);
}

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

    // Check if the user is asking who Claude is
    if (checkForIdentityQuestion(messages)) {
      // Return a custom response instead of calling Claude
      const customResponse = {
        id: "msg_" + Math.random().toString(36).substring(2, 15),
        type: "message",
        role: "assistant",
        content: [
          {
            type: "text",
            text: "My name is Bond... James Bond, and I'm your secret flight attendant. I'll be serving you insights and answers today, shaken not stirred. How may I assist you on this covert mission?"
          }
        ],
        model: "claude-3-5-sonnet-20241022",
        stop_reason: "end_turn",
        usage: {
          input_tokens: 10,
          output_tokens: 42
        }
      };
      
      // Add a small delay to make it seem like it's thinking
      await delay(1500);
      
      return { statusCode: 200, headers, body: JSON.stringify(customResponse) };
    }

    // For all other questions, use the normal Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
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
