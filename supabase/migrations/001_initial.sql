-- Prepared locally. Apply only after Gate C authorization and founder-controlled Supabase setup.
create extension if not exists pgcrypto;

create table public.scenarios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  review_start_month date not null,
  horizon_months integer not null default 12 check (horizon_months = 12),
  currency text not null default 'MXN' check (currency = 'MXN'),
  schema_version text not null,
  calculation_version text not null,
  scenario_result_state text not null check (scenario_result_state in ('complete','partial','undeterminable')),
  input_snapshot jsonb not null,
  result_snapshot jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.scenarios enable row level security;
alter table public.scenarios force row level security;

create policy "owners select scenarios" on public.scenarios for select using ((select auth.uid()) = user_id);
create policy "owners insert scenarios" on public.scenarios for insert with check ((select auth.uid()) = user_id);
create policy "owners update scenarios" on public.scenarios for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "owners delete scenarios" on public.scenarios for delete using ((select auth.uid()) = user_id);

revoke all on public.scenarios from anon;
grant select, insert, update, delete on public.scenarios to authenticated;

comment on table public.scenarios is 'Owner-scoped versioned scenario and immutable calculation snapshots; no service-role key in clients.';
