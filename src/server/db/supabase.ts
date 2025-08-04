import { createClient } from '@supabase/supabase-js';
// src/server/db/supabase.ts
import { config } from 'dotenv';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
