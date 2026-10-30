begin;

create extension if not exists pgtap with schema extensions;
select plan(13);

insert into auth.users (id, email)
values
  ('10000000-0000-0000-0000-000000000001', 'synthetic-a@example.invalid'),
  ('20000000-0000-0000-0000-000000000002', 'synthetic-b@example.invalid')
on conflict (id) do nothing;

set local role anon;
select throws_ok(
  $$select * from public.scenarios$$,
  '42501',
  'logged-out select has no table privilege'
);
select throws_ok(
  $$insert into public.scenarios (title, review_start_month, schema_version, calculation_version, scenario_result_state, input_snapshot, result_snapshot) values ('anon', '2026-11-01', '1.0.0', '1.0.0', 'complete', '{}', '{}')$$,
  '42501',
  'logged-out insert has no table privilege'
);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}', true);

select lives_ok(
  $$insert into public.scenarios (title, review_start_month, schema_version, calculation_version, scenario_result_state, input_snapshot, result_snapshot) values ('SYNTHETIC USER A', '2026-11-01', '1.0.0', '1.0.0', 'partial', '{"unknownAmount":null,"state":"unknown"}', '{"overallState":"partial"}')$$,
  'user A inserts an owner-scoped scenario'
);
select is((select count(*)::integer from public.scenarios), 1, 'user A reads its own scenario');
select throws_ok(
  $$insert into public.scenarios (user_id, title, review_start_month, schema_version, calculation_version, scenario_result_state, input_snapshot, result_snapshot) values ('20000000-0000-0000-0000-000000000002', 'wrong owner', '2026-11-01', '1.0.0', '1.0.0', 'complete', '{}', '{}')$$,
  '42501',
  'new row violates row-level security policy for table "scenarios"',
  'user A cannot insert a row for user B'
);
select lives_ok(
  $$update public.scenarios set title = 'SYNTHETIC USER A UPDATED' where user_id = '10000000-0000-0000-0000-000000000001'$$,
  'user A updates its own scenario'
);
select is((select title from public.scenarios limit 1), 'SYNTHETIC USER A UPDATED', 'owner update is visible');
select is((select input_snapshot->>'unknownAmount' is null from public.scenarios limit 1), true, 'unknown JSON value remains null');

select set_config('request.jwt.claims', '{"sub":"20000000-0000-0000-0000-000000000002","role":"authenticated"}', true);
select is((select count(*)::integer from public.scenarios), 0, 'user B cannot list user A rows');
select lives_ok(
  $$update public.scenarios set title = 'FORBIDDEN' where user_id = '10000000-0000-0000-0000-000000000001'$$,
  'cross-owner update exposes no row and raises no data leak'
);
select lives_ok(
  $$delete from public.scenarios where user_id = '10000000-0000-0000-0000-000000000001'$$,
  'cross-owner delete exposes no row and raises no data leak'
);

select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}', true);
select is((select title from public.scenarios limit 1), 'SYNTHETIC USER A UPDATED', 'cross-owner mutations changed nothing');
select lives_ok(
  $$delete from public.scenarios where user_id = '10000000-0000-0000-0000-000000000001'$$,
  'user A deletes its own scenario'
);

select * from finish();
rollback;
