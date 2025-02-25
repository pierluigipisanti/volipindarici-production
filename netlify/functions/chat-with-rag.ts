import { Handler } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

// Initialize clients
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || '' // Use service key for backend
);

// Function to retrieve relevant content
async function retrieveRelevantContent(query: string) {
  try {
    // Use Supabase's vector search if you've set up embeddings
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: await generateEmbedding(query),
      match_threshold: 0.7,
      match_count: 3
    });
    
    if (error) throw error;
    
    return data.map((item: any) => item.content).join('\n\n');
  } catch (error) {
    console.error('Error retrieving content:', error);
    return '';
  }
}

// Generate embedding for the query
async function generateEmbedding(text: string) {
  // You can use OpenAI or other embedding services
  // This is a simplified example
  return []; // Replace with actual embedding generation
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { messages } = JSON.parse(event.body || '{}');
    
    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid messages format' }) };
    }
    
    // Get the user's query (last user message)
    const userQuery = messages.filter(m => m.role === 'user').pop()?.content || '';
    
    // Retrieve relevant content
    const relevantContent = await retrieveRelevantContent(userQuery);
    
    // Add system message with context
    const messagesWithContext = [
      {
        role: 'system',
        content: `You are an assistant for Voli Pindarici. Use the following information to answer the user's question:
        
        ${relevantContent}
        
        If the information doesn't contain the answer, just say you don't have that specific information.`
      },
      ...messages
    ];
    
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: messagesWithContext
    });

    return { statusCode: 200, body: JSON.stringify(response) };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
}; 