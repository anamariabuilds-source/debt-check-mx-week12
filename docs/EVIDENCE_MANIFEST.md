# Evidence manifest

| UTC/date | Evidence | Location/status |
|---|---|---|
| 2026-10-30 | Native Codex session snapshot at Stage B start | `evidence/native-transcripts/01a18dfd-bcd9-7221-bb18-7de0134365a5.stage-b-start.jsonl`; SHA-256 `c83bbba9669a5c2067c0ef247decbb376fd2e90e3c73bfe484bc1c2df6bc6318` |
| 2026-10-30 | Approved documentation archive | Parent workspace ZIP; SHA-256 `605a7388dcc0a58c51e37ec5215038e0ab46b0c651cddc5f32a0a9029bdec375` |
| 2026-10-30 | Week 10 audited source | Temporary checkout `/tmp/debt-check-mx-week10-audit`, commit `58e968a81e718d5f4f90b7ee97d8f7fcc6096558` |
| 2026-10-30 | Dependency install attempt 1 | Failed before resolution: inaccessible user npm cache, `EEXIST`/`EACCES`; no cache deletion performed |
| 2026-10-30 | Dependency install attempt 2 | Passed with isolated `/tmp/debt-check-mx-week12-npm-cache`; 381 packages added; 0 vulnerabilities reported; `unrs-resolver` install script flagged for review |
| 2026-10-30 | Mechanical run 1 | Unit: 14 pass/1 fail (case-sensitive A17 assertion); typecheck failed in Next `URLPattern` declarations; lint passed; production audit 0 vulnerabilities |
| 2026-10-30 | Mechanical fix 1 | Made assertion case-insensitive; enabled `skipLibCheck` for third-party declarations while retaining strict application checking |
| 2026-10-30 | Mechanical run 2 | Unit 15/15 pass; typecheck pass; lint pass; production build pass; static routes `/`, `/product`, `/about` generated |
| 2026-10-30 | Local route check attempt 1 | Command failed after assigning zsh special variable `path`, which removed command lookup; corrected to `route_name` |
| 2026-10-30 | Local route check attempt 2 | Sandbox could not reach listener; escalated localhost-only check used |
| 2026-10-30 | Local route verification | `/`, `/product`, `/about` each returned HTTP 200 from local preview |
| 2026-10-30 | Mechanical run 3 | 18/18 unit tests passed and lint passed; typecheck/build failed on Zod generic refinement typing in new server schema |
| 2026-10-30 | Mechanical fix 2 | Added an explicit refinement-view type; runtime schema behavior unchanged |
| 2026-10-30 | Mechanical run 4 | 18/18 tests pass; typecheck pass; lint pass; production build pass; routes `/`, `/product`, `/about`, `/api/calculate` emitted |
| 2026-10-30 | Server integration | Valid synthetic POST returned 12 months + one unscheduled item; invalid POST returned HTTP 400 with six issues |
| 2026-10-30 | Final mechanical run | 18/18 tests pass; lint pass; build pass; production audit 0 vulnerabilities. Parallel typecheck raced build-generated `.next/types` and failed transiently; sequential post-build typecheck passed |
| 2026-10-30 | Native transcript pre-handoff snapshot | Ignored file `evidence/native-transcripts/01a18dfd-bcd9-7221-bb18-7de0134365a5.stage-b-pre-handoff.jsonl`; SHA-256 `a2a22928b8e83eb66d57592592e0eb61f54a8b42e8c00904cf2758426d520a68` |

Raw native transcripts are intentionally ignored by Git. They are retained locally for later reviewed/redacted BUILDCHAT export and must not be pushed as repository content.

## Genuine local bug — 2026-10-30

| Evidence | Observed result |
|---|---|
| Exact API reproduction before fix | Correct 12-month schedule; established that recurrence arithmetic was not the visible-path cause |
| Real Chrome UI reproduction | Date control displayed `2026-11-30` while result remained unscheduled, proving DOM/control and calculation state divergence |
| UI regression before fix | 1 failed: confirmed date field lacked `onInput` synchronization |
| Outside-horizon regression before fix | 1 failed: expected `partial`, received `complete` |
| Fix | Added `onInput` synchronization; outside-horizon affects global state; known 12-month total exposed |
| Final mechanical verification | 21/21 tests, typecheck, lint and production build passed |
| Exact API verification after fix | 12 × 100,000 cents, total 1,200,000 cents, complete, no outside warning |
| Outside-horizon API verification | Partial with explicit outside-view warning |

## Second founder browser regression — 2026-10-30

| Evidence | Observed result |
|---|---|
| Founder manual reproduction | November showed 2/12; October empty; view total MXN 11,000 |
| Engine/API boundary | ISO `2026-11-30` remained correct; timezone and month-end arithmetic excluded |
| UI regression before fix | Failed: native date field still used transient `onInput` path |
| Correction | Explicit `AAAA-MM-DD` text input with one controlled `onChange` path |
| Canonical browser verification | Chrome keyboard entry on `localhost`: 1/12 through 12/12, twelve MXN 1,000 months, MXN 12,000 total, Complete |
| Discarded automation | `127.0.0.1` triggered Next.js dev-origin blocking; not accepted as hydrated UI evidence |
| Final mechanical/API verification | 21/21 tests, typecheck, lint, build passed; API labels 1/12–12/12 and twelve 100,000-cent subtotals |

No secrets or personal financial records belong in this manifest. Add exact commands/results after execution; do not retrospectively mark planned tests as passed.

## Gate C local preparation — 2026-10-30

| Evidence | Observed result |
|---|---|
| Baseline unit run | `npm test -- --runInBand` failed because Vitest does not support the Jest-only flag; no product failure |
| Correct baseline | Existing 21/21 tests passed before Gate C source changes |
| Local auth/persistence implementation | Supabase SSR clients, cookie session refresh, Google sign-in/callback/sign-out, safe redirects, authenticated scenario CRUD, server validation/recalculation, and explicit UI states added |
| Hardened migration | Authenticated-only grants/policies, forced RLS, constraints, owner/update index, protected `updated_at` trigger, and bounded JSON snapshots prepared |
| Executable RLS plan | `supabase/tests/scenarios_rls_test.sql` contains 13 pgTAP assertions for anonymous denial, owner CRUD, null preservation, and two-user isolation |
| RLS execution limitation | Not run: neither `supabase` nor `docker` is installed locally; no cloud migration or external project was authorized |
| Expanded verification | 38/38 tests passed; TypeScript passed; ESLint passed; Next.js 16.4.1 production build passed with auth and scenario routes emitted |
| Redirect regression | Existing-query callback status test added and passed; unsafe external/protocol-relative/backslash/control-character paths rejected |
| Dependency audit attempt 1 | Restricted-network `npm audit --omit=dev` failed with `ENOTFOUND registry.npmjs.org`; no dependency changes |
| Dependency audit retry | Read-only registry audit completed: 0 production vulnerabilities |
| Local no-config route check | `/product` returned the calculation UI with private-save pending; `GET /api/scenarios` returned 503 `configuration_pending` rather than simulating persistence |
| Local redirect/origin check | Safe existing query was preserved as `/product?mode=saved&auth=configuration_pending`; cross-origin scenario POST returned HTTP 403 |
| External verification | Not performed: live Google OAuth, applied migration/RLS, private CRUD, two-user isolation, production cookies, deployment, and Gate C external services remain pending |
| Native transcript pre-commit snapshot | Ignored file `evidence/native-transcripts/01a18dfd-bcd9-7221-bb18-7de0134365a5.gate-c-local-precommit.jsonl`; SHA-256 `9743dc9dee1bc20d75edbcd8a355333a9e8ea2273c6a0a859f543ffddb4fb6ab` |

## Founder-observed Supabase workflow and submission preparation — 2026-10-31

| Evidence | Observed result / boundary |
|---|---|
| Supabase migration/RLS | Founder reported the final migration applied and manually observed SQL results showing RLS enabled and forced |
| Google OAuth | Founder manually observed successful Google sign-in and an authenticated session in the local application; not independent automated browser evidence |
| Private save/list/reopen | Founder manually observed save confirmation, the scenario in the authenticated user's list, and reopen with original purchase values and unknown first-payment date preserved |
| Anonymous denial | Codex made a read-only anonymous Data API request; the `scenarios` endpoint existed and denied access |
| Unverified authorization operations | Authenticated update/delete and two-user RLS isolation remain unverified; the executable pgTAP plan was not run against a local Supabase stack |
| Deployment boundary | No production deployment or real-domain verification was performed |
| Final Packet | `PACKET_AnaMariaMatas.pdf`, 13 pages, SHA-256 `f2b9756e3b7913ac41328920f6cc928f1445777f92cd4de4f5f35211e21d98e9`; Appendix B labels the Supabase workflow as founder-observed manual evidence |
| Final local publication verification | 39/39 automated tests passed; Next.js 16.4.1 production build passed; sequential TypeScript and ESLint checks passed; production dependency audit reported 0 vulnerabilities |
