import { createClient } from "@supabase/supabase-js";

export function getClientDbClient(supabaseUrl: string, anonKey: string) {
  return createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false },
  });
}

export function getClientDbServiceClient(supabaseUrl: string, serviceKey: string) {
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}