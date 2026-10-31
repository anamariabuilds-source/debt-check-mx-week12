# Debt Check MX — Week 12

Debt Check MX is a Spanish-first pre-purchase comparison for MXN installment commitments. It compares one proposed purchase with monthly, semiannual and unscheduled obligations across a 12-month view while preserving known, estimated and unknown evidence states. The deterministic calculation core does not require AI and does not issue affordability or purchase decisions.

## Current evidence status

- The local automated suite reports **39 passing tests**, with TypeScript, ESLint and the production build passing on the latest recorded verification.
- The founder manually observed successful Google OAuth sign-in and an authenticated local session.
- The founder manually observed private scenario save confirmation, appearance in the authenticated scenario list, and reopen with the original purchase values and unknown first-payment date preserved.
- The founder manually observed Supabase SQL results showing RLS enabled and forced.
- Codex made a read-only anonymous Data API request and observed access denial.
- Authenticated update/delete and two-user RLS isolation are **not verified**.
- Production deployment and real-domain operation are **not completed or verified**.

Founder observations are manual evidence, not independent automated browser verification. See `docs/EVIDENCE_MANIFEST.md` and `docs/TEST_TRACEABILITY.md` for boundaries.

## Requirements and installation

- Node.js 20 or newer
- npm
- A founder-controlled Supabase project only if authentication and private persistence will be tested

```bash
npm install
```

The comparison calculator works locally without Supabase credentials. Authentication and private persistence require a local `.env.local` containing these names:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use the project’s base HTTPS Supabase URL and publishable key. Never place a service-role key, secret key, password or access token in a `NEXT_PUBLIC_` variable. `.env.local` and all `.env*` files except the names-only `.env.example` are ignored by Git.

## Supabase preparation

1. Review `supabase/migrations/001_initial.sql` before applying it.
2. In a new founder-controlled Supabase project, execute that migration once through the SQL Editor or an approved migration workflow.
3. Confirm the `public.scenarios` table exists, RLS is enabled and forced, `anon` has no table privileges, and `authenticated` has only SELECT/INSERT/UPDATE/DELETE subject to owner policies.
4. Configure the Google provider in Supabase and its Google OAuth client. For local development, the application callback is `http://localhost:3000/auth/callback`.
5. Put only the public project URL and publishable key in `.env.local`; restart the development server after changing environment values.

The migration is intentionally one-time and atomic. It creates `public.scenarios`, its owner/update index and trigger, four owner-only RLS policies, and the private `debt_check_private` support schema. It does not contain destructive `DROP` or `TRUNCATE` statements.

## Local development

```bash
npm run dev
```

Open `http://localhost:3000`. Use `localhost`, not `127.0.0.1`, so the OAuth origin matches the configured callback.

## Verification commands

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
```

Do not treat the prepared pgTAP plan as executed evidence until `supabase test db` runs against an appropriate local Supabase database. Do not claim update/delete or two-user isolation from source inspection alone.

## Project structure

- `app/` — Next.js pages, authentication callbacks and scenario APIs
- `components/` — Spanish comparison and authenticated persistence UI
- `lib/domain/` — deterministic scheduling, money handling, schemas and tests
- `lib/auth/`, `lib/http/`, `lib/supabase/` — redirect, request, SSR client and cookie-session controls
- `lib/persistence/` — server-owned scenario validation, recalculation and snapshots
- `supabase/migrations/` — reviewed database migration
- `supabase/tests/` — executable RLS test plan, not yet run against a local Supabase stack
- `docs/` — approved Packet source, Charter, Personas, decisions, security and evidence records
- `PACKET_AnaMariaMatas.pdf` — reviewed 13-page Week 12 Packet submission

## Evidence and privacy limits

- Test fixtures are synthetic and must not be presented as a participant’s actual financial data.
- Unknown values and dates remain `null`; they are never silently converted to zero.
- No bank details, passwords, service-role keys or raw interview records belong in this repository.
- Native Codex session files and private evidence are retained outside Git through ignored paths.
- The project does not establish adoption, financial outcomes, product superiority, 10× improvement or professor approval.
- The approved `docs/PACKET.md`, methodology and financial calculation rules remain the authoritative product record.
