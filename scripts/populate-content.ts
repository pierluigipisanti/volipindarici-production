import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai'; // For generating embeddings

// Initialize clients
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Function to generate embeddings
async function generateEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

// Function to process content
async function processContent() {
  // Read your content files
  const contentDir = path.join(__dirname, '../content');
  const files = fs.readdirSync(contentDir);
  
  for (const file of files) {
    if (file.endsWith('.md') || file.endsWith('.txt')) {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Split content into chunks (e.g., paragraphs)
      const chunks = content.split('\n\n').filter(chunk => chunk.trim().length > 0);
      
      for (const chunk of chunks) {
        // Generate embedding
        const embedding = await generateEmbedding(chunk);
        
        // Store in Supabase
        const { error } = await supabase
          .from('website_content')
          .insert({
            content: chunk,
            embedding,
            metadata: { source: file }
          });
        
        if (error) console.error('Error inserting content:', error);
      }
    }
  }
}

processContent().catch(console.error); 