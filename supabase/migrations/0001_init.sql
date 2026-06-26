create extension if not exists "pgcrypto";

create table if not exists public.email_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text not null,
  tone text not null check (tone in ('professional', 'friendly', 'urgent')),
  length text not null check (length in ('short', 'medium', 'long')),
  output text not null,
  provider text not null check (provider in ('mock', 'gemini')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists email_generations_user_id_created_at_idx
  on public.email_generations (user_id, created_at desc);

alter table public.email_generations enable row level security;

create policy "Users can read their own generations"
  on public.email_generations
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own generations"
  on public.email_generations
  for insert
  with check (auth.uid() = user_id);
