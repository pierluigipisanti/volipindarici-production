import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  // Provide fallback values for development only
  // In production, this should come from Netlify environment variables
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Add health check function with retries and exponential backoff
export async function checkSupabaseConnection(retries = 3): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      const { error } = await supabase
        .from('articles')
        .select('count')
        .limit(1)
        .single();
      
      if (!error) {
        return true;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    } catch (error) {
      console.error('Supabase connection error:', error);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  return false;
}

// Add error handling wrapper with retries
export async function handleSupabaseError<T>(
  operation: () => Promise<{ data: T | null; error: any }>,
  fallback: T | null = null,
  retries = 2
): Promise<T | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const { data, error } = await operation();
      if (!error) {
        return data;
      }
      
      console.error(`Supabase operation error (attempt ${i + 1}/${retries + 1}):`, error);
      
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    } catch (error) {
      console.error(`Unexpected error during Supabase operation (attempt ${i + 1}/${retries + 1}):`, error);
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  return fallback;
}