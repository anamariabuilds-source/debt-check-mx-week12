-- Prepared locally. Apply only after Gate C authorization and founder-controlled Supabase setup.
create extension if not exists pgcrypto;

create table public.scenarios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  review_start_month date not null check (review_start_month = date_trunc('month', review_start_month)::date),
  horizon_months integer not null default 12 check (horizon_months = 12),
  currency text not null default 'MXN' check (currency = 'MXN'),
  schema_version varchar(32) not null check (schema_version ~ '^[0-9]+\.[0-9]+\.[0-9]+$'),
  calculation_version varchar(32) not null check (calculation_version ~ '^[0-9]+\.[0-9]+\.[0-9]+$'),
  scenario_result_state text not null check (scenario_result_state in ('complete','partial','undeterminable')),
  input_snapshot jsonb not null check (jsonb_typeof(input_snapshot) = 'object' and octet_length(input_snapshot::text) <= 128000),
  result_snapshot jsonb not null check (jsonb_typeof(result_snapshot) = 'object' and octet_length(result_snapshot::text) <= 512000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (updated_at >= created_at)
);

create index scenarios_owner_updated_idx on public.scenarios (user_id, updated_at desc);

create schema if not exists private;
revoke all on schema private from public;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function private.set_updated_at() from public, anon, authenticated;

create trigger scenarios_set_updated_at
before update on public.scenarios
for each row execute function private.set_updated_at();

alter table public.scenarios enable row level security;
alter table public.scenarios force row level security;

create policy "owners select scenarios" on public.scenarios for select to authenticated using ((select auth.uid()) = user_id);
create policy "owners insert scenarios" on public.scenarios for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "owners update scenarios" on public.scenarios for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "owners delete scenarios" on public.scenarios for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on public.scenarios from public, anon, authenticated;
grant select, insert, update, delete on public.scenarios to authenticated;

comment on table public.scenarios is 'Owner-scoped versioned scenario with server-recalculated snapshots; no secret key in clients.';
