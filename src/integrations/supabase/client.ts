// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mdeeqkhjcbgcqwsnczop.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZWVxa2hqY2JnY3F3c25jem9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjM1MjksImV4cCI6MjA2MTM5OTUyOX0.0woiwVkKR1eKaNhr1ug1FHFMcZtJmFl2X20XMMOBuM8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);