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
