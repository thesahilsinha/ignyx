create table if not exists comment_rules (
  id uuid primary key default gen_random_uuid(),
  trigger_word text not null,
  match_method text not null check (match_method in ('exact','starts_with','contains')),
  action_type text not null check (action_type in ('reply','dm','both')),
  reply_text text,
  dm_text text,
  dm_media_url text,
  created_at timestamptz not null default now()
);

create table if not exists dm_story_rules (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('dm','story_reply')),
  trigger_word text not null,
  match_method text not null check (match_method in ('exact','starts_with','contains')),
  reply_text text,
  media_url text,
  created_at timestamptz not null default now()
);

create table if not exists fallback_messages (
  id uuid primary key default gen_random_uuid(),
  message_type text not null check (message_type in ('greeting','exception')),
  content text not null,
  media_url text,
  updated_at timestamptz not null default now()
);

create table if not exists scheduled_posts (
  id uuid primary key default gen_random_uuid(),
  caption text,
  location_id text,
  collaborator_usernames text[],
  media_url text,
  scheduled_for timestamptz not null,
  meta_container_id text,
  status text not null default 'queued' check (status in ('queued','processing','published','failed')),
  permalink text,
  created_at timestamptz not null default now()
);

create table if not exists ai_context (
  id uuid primary key default gen_random_uuid(),
  context_text text not null,
  updated_at timestamptz not null default now()
);

create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('comment_reply','dm_reply')),
  created_at timestamptz not null default now()
);
