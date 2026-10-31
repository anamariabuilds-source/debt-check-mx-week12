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

## Automated and read-only technical evidence

- The latest local suite reports 39 passing tests covering redirects, request-origin/body limits, server recalculation, null/version/assumption preservation, migration contracts and route behavior.
- `supabase/tests/scenarios_rls_test.sql` is an executable pgTAP plan for logged-out denial, owner CRUD, and two-user isolation.
- Codex performed a read-only anonymous Data API request to `scenarios`; the endpoint existed and denied anonymous access.
- TypeScript, ESLint and the production build passed in the latest recorded verification. The production dependency audit reported zero known production vulnerabilities.

## Founder-observed manual results

- Supabase SQL results showed RLS enabled and forced after the migration was applied.
- Google OAuth sign-in completed and the local application displayed an authenticated session.
- A private scenario saved with confirmation, appeared in the authenticated user's scenario list, and reopened with the original purchase values and unknown first-payment date preserved.

These are founder observations, not independently verified automated browser tests.

## Not yet verified

- Authenticated scenario update and delete behavior.
- Two-user RLS isolation, including direct attempts to list/read/update another user's scenario.
- The full pgTAP RLS plan; Supabase CLI and Docker were absent from the local environment used to prepare it.
- Production environment-variable scoping, cookie behavior and log redaction.
- Production deployment, real-domain behavior and production session recovery.

No update/delete or two-user isolation pass is claimed. The application does not fall back to local storage or simulate private persistence when Supabase is unavailable.
