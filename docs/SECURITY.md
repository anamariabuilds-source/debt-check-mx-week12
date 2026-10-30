# Security status

## Prepared locally

- No service-role key is referenced by browser code.
- `.env*` is ignored except the names-only `.env.example`.
- Supabase browser/server clients use `@supabase/ssr`; the server client writes sessions through Next cookies and `proxy.ts` refreshes valid sessions.
- OAuth return paths accept only same-origin relative paths; status parameters are added through URL parsing rather than string concatenation.
- Mutating scenario routes reject cross-origin requests, bound JSON bodies to 128 KB, require an authenticated user, and never accept a caller-selected owner.
- Shared strict schemas validate scenario input and saved results. Every save/update recalculates the result server-side and ignores client-provided result snapshots.
- Owner-scoped `scenarios` table enables and forces RLS.
- Separate authenticated-only SELECT/INSERT/UPDATE/DELETE policies require `auth.uid() = user_id`; anonymous and public privileges are revoked.
- Database checks constrain month alignment, currency, horizon, result state, semantic versions, and JSON type/size. An owner/update index and protected `updated_at` trigger are included.
- Inputs and versioned outputs are stored together as JSON snapshots. Unknown values/dates remain `null`; estimated evidence retains its written assumption.
- Demo fixtures are explicitly synthetic.

## Automated local evidence

- Redirect, request-origin/body-limit, server recalculation, null/version/assumption preservation, migration-contract, and configuration-pending route tests pass locally.
- `supabase/tests/scenarios_rls_test.sql` is an executable pgTAP plan for logged-out denial, owner CRUD, and two-user isolation.
- The production dependency audit reported zero known production vulnerabilities on 2026-10-30.

## Not externally verified

- Google OAuth login and callback behavior.
- Applied Supabase migration, database constraints, trigger, grants, and policies.
- The pgTAP RLS plan (Supabase CLI and Docker are absent locally).
- Logged-out denial and two-user isolation against a real database.
- Production environment-variable scoping and log redaction.
- Live save/list/reopen/update/delete behavior and session-expiration recovery.

These require founder-controlled external configuration and separate external-action authorization. Until then the UI identifies private save as unavailable; it does not fall back to local storage or claim security verification.
