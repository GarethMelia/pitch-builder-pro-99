import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key from your project settings
const supabaseUrl = 'https://YOUR_PROJECT_URL.supabase.co';
const supabaseAnonKey = 'YOUR_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);