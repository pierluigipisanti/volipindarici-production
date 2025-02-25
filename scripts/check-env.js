console.log('Checking environment variables...');

const requiredVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'ANTHROPIC_API_KEY'
];

const missing = requiredVars.filter(varName => !process.env[varName]);

if (missing.length > 0) {
  console.warn(`⚠️ Missing environment variables: ${missing.join(', ')}`);
  console.warn('These should be set in your Netlify dashboard or .env file');
  // Don't exit with error to allow build to continue
} else {
  console.log('✅ All required environment variables are set');
} 