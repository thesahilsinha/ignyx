create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_email text not null,
  username text unique not null,
  password_hash text not null,
  status text not null default 'in_review' check (status in ('active','hold','trial','suspended','in_review')),
  plan text not null default 'starter' check (plan in ('starter','growth')),
  supabase_url text not null,
  supabase_anon_key text not null,
  supabase_service_key text not null,
  meta_page_id text,
  meta_ig_business_id text,
  meta_access_token text,
  meta_token_expires_at timestamptz,
  ai_plus_enabled boolean not null default false,
  groq_api_key text,
  catalogue_enabled boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  amount numeric not null,
  status text not null default 'pending' check (status in ('paid','pending','overdue')),
  billing_period_start date not null,
  billing_period_end date not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  subject text not null,
  message text not null,
  status text not null default 'open' check (status in ('open','in_progress','resolved')),
  created_at timestamptz not null default now()
);

create index if not exists idx_payments_client on payments(client_id);
create index if not exists idx_tickets_client on tickets(client_id);