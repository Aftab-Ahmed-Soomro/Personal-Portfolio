import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL ya Anon Key missing hai .env file mein!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  live_url?: string;
  github_url?: string;
  created_at?: string;
}