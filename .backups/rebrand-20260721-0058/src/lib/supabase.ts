import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Client-side Supabase instance (anon key, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase instance (service role, bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Type helpers for Supabase tables
export interface SupabaseContact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  service?: string;
  budget?: string;
  status?: string;
  source?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseNewsletter {
  id?: string;
  email: string;
  active?: boolean;
  source?: string;
  created_at?: string;
}

export interface SupabasePageView {
  id?: string;
  page: string;
  referrer?: string;
  country?: string;
  created_at?: string;
}
