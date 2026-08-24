export type ClientStatus = "active" | "hold" | "trial" | "suspended" | "in_review";
export type ClientPlan = "starter" | "growth";

export interface Client {
  id: string;
  business_name: string;
  contact_email: string;
  username: string;
  password_hash: string;
  status: ClientStatus;
  plan: ClientPlan;
  supabase_url: string;
  supabase_anon_key: string;
  supabase_service_key: string;
  meta_page_id: string | null;
  meta_ig_business_id: string | null;
  meta_access_token: string | null;
  meta_token_expires_at: string | null;
  ai_plus_enabled: boolean;
  groq_api_key: string | null;
  catalogue_enabled: boolean;
  created_at: string;
}

export interface Payment {
  id: string;
  client_id: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  billing_period_start: string;
  billing_period_end: string;
  notes: string | null;
  created_at: string;
}

export interface Ticket {
  id: string;
  client_id: string;
  subject: string;
  message: string;
  status: "open" | "in_progress" | "resolved";
  created_at: string;
}