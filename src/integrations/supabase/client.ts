// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://snhutzqpxhylymkzlhga.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuaHV0enFweGh5bHlta3psaGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjEyNTUsImV4cCI6MjA1MDQ5NzI1NX0.foc355SUa1hPAyQxx3K11gwDPbeXznc65vhxvuBwVIo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);