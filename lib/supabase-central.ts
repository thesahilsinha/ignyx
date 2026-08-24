import { createClient } from "@supabase/supabase-js";

const centralUrl = process.env.CENTRAL_SUPABASE_URL as string;
const centralServiceKey = process.env.CENTRAL_SUPABASE_SERVICE_KEY as string;

export function getCentralClient() {
  return createClient(centralUrl, centralServiceKey, {
    auth: { persistSession: false },
  });
}