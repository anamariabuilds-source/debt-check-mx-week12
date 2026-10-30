# Decisions — Debt Check MX Week 12

## 2026-10-30 — Stage B start

- Founder authorized local development/testing only; Gate C remains closed.
- Selected strategy: rebuild the Week 12 domain model while adapting only small verified Week 10 concepts.
- Reused concepts: integer MXN cents, `Intl.NumberFormat('es-MX')`, bounded inputs, discrepancy warnings, conservative human-decision language, and pure-function tests.
- Rejected direct reuse: exact-date overlap map, budget/limit verdicts, optional Gemini/vision workflow, ephemeral one-page architecture.
- Persistence choice: versioned owner-scoped scenario snapshots. Local browser storage is deliberately not presented as private persistence.
- Calendar policy: monthly and six-calendar-month recurrence clamps to the last valid day; tested for leap years.
- Card policy: first payment is manually confirmed or unknown; estimated first card dates are rejected in v1.
- Transcript: native session copied at Stage B start with SHA-256 recorded in `docs/EVIDENCE_MANIFEST.md`.

## 2026-10-30 — Mechanical failures retained

- First npm install failed because the existing user cache was inaccessible; retried with an isolated temporary cache instead of deleting user data.
- First unit run exposed a brittle case-sensitive expectation, corrected without changing engine behavior.
- Next 16 declarations referenced URLPattern types absent from the installed TypeScript lib surface. `skipLibCheck` was enabled for dependency declarations; strict checking remains enabled for project source.
- Do not run standalone `tsc` concurrently with `next build`: both read/write generated `.next/types`. Final verification runs build and then typecheck sequentially.

## 2026-10-30 — Founder-reported date synchronization bug

- Kept recurrence logic unchanged because exact API reproduction proved it already scheduled November 2026 through October 2027 correctly.
- Applied the smallest UI correction at the date event boundary: synchronize on `input` as well as `change`.
- Corrected the independent global-state defect revealed by the symptoms: a scenario with known payments outside the 12-month view is partial, never complete.
- Added the known in-horizon total to make the 12 × MXN 1,000 expectation directly observable.

## 2026-10-30 — Remove native segmented date ambiguity

- The second founder reproduction proved that `onInput` could capture a transient prior month from the native date widget.
- Date parsing and recurrence remain unchanged because engine/API boundary tests with ISO `2026-11-30` were correct.
- Version 1 now requests the confirmed date explicitly as `AAAA-MM-DD`; strict calendar validation continues to reject impossible dates.

## 2026-10-30 — Gate C local preparation only

- Implemented the Supabase recommended SSR client split: browser client, cookie-aware server client, and Next.js 16 `proxy.ts` session refresh. No service-role key is used.
- Authentication uses Google OAuth with PKCE through Supabase. Callback return paths are restricted to local relative paths to prevent open redirects; sign-out and all scenario mutations enforce same-origin requests.
- Save and update accept only scenario inputs, validate them with the shared domain schema, recalculate deterministically on the server, and persist the server-owned result snapshot.
- Owner identity always comes from the verified Supabase user. API queries also filter by owner and the migration enforces authenticated-only RLS as defense in depth.
- Unknown values and dates remain JSON `null`; estimated evidence requires and preserves a written assumption. Schema and calculation versions are stored and checked when reopening.
- When configuration is absent, the product remains usable for calculation and clearly labels authentication/persistence as pending. It does not simulate login or private storage.
- No cloud project, migration application, OAuth configuration, live credential, deployment, or GitHub push was performed.
