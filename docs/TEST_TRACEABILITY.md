# Acceptance traceability — A01–A23

Status values are `not run`, `pass`, `fail`, or `blocked`.

| ID | Automated/manual evidence | Initial status | Gate/blocker |
|---|---|---|---|
| A01 | `lib/domain/engine.test.ts` monthly purchase/obligation/count | pass | `npm test`, 2026-10-30 |
| A02 | `engine.test.ts` six-month recurrence, leap/month-end | pass | `npm test`, 2026-10-30 |
| A03 | `engine.test.ts` unknown January amount and partial subtotal | pass | `npm test`, 2026-10-30 |
| A04 | `engine.test.ts` unknown first date remains unscheduled | pass | `npm test`, 2026-10-30 |
| A05 | `engine.test.ts` rejects unsupported estimated card date | pass | `npm test`, 2026-10-30 |
| A06 | Same v1 rejection and UI confirmed-or-unknown control | pass | Automated engine rule; UI source reviewed |
| A07 | `engine.test.ts` known amount/unknown date | pass | `npm test`, 2026-10-30 |
| A08 | `engine.test.ts` useful known subtotal with unresolved item | pass | `npm test`, 2026-10-30 |
| A09 | `engine.test.ts` same-month overlap, neutral copy | pass | `npm test`, 2026-10-30 |
| A10 | Source/manual review: no income field or affordability verdict | pass | Source review; no human-behavior claim |
| A11 | `engine.test.ts` discrepancy without invented fee | pass | `npm test`, 2026-10-30 |
| A12 | `engine.test.ts` confirmed zero versus unknown | pass | `npm test`, 2026-10-30 |
| A13 | Snapshot contract + future Supabase integration test | blocked | Gate C Supabase |
| A14 | Future saved update/version integration test | blocked | Gate C Supabase |
| A15 | `supabase/tests/rls_plan.md` logged-out test | blocked | Gate C Supabase |
| A16 | Two-user direct RLS tests | blocked | Gate C Supabase/two identities |
| A17 | Engine, money, shared server schema, invalid API request | pass | 18/18 tests + local HTTP 400 check |
| A18 | Fixture label in `engine.test.ts`; no runtime seed | pass | Source audit |
| A19 | Responsive CSS, semantic labels; browser/keyboard review | not run | Browser interaction/screenshot evidence not completed |
| A20 | Genuine observed defect → regression → rebuild/redeploy | blocked | Deployment portion Gate C; do not invent defect |
| A21 | Fresh-chat screenshot walkthrough and confusion fix | blocked | Requires completed local browser sequence/evidence |
| A22 | Equivalent real-user Notes/Excel comparison | blocked | External participant evidence |
| A23 | Real domain, routes, auth/save, 5+ commits, 2+ deploys | blocked | Gate C and final evidence |
