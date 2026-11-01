# Acceptance traceability — A01–A23

Status values are `not run`, `pass`, `fail`, or `blocked`.

| ID | Automated/manual evidence | Initial status | Gate/blocker |
|---|---|---|---|
| A01 | `lib/domain/engine.test.ts` monthly purchase/obligation/count, exact 12 × MXN 1,000 regression | pass | `npm test`, 2026-10-30; genuine founder bug regression |
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
| A13 | Server-owned snapshot tests plus founder-observed private save/list/reopen preserving purchase values and unknown first-payment date | blocked | Partial evidence only; the founder observation does not independently verify every A13 field, assumption, result and version invariant |
| A14 | Update route recalculates and enforces stored calculation/schema versions | blocked | Local implementation exists; authenticated update and post-update reopen are not verified |
| A15 | Read-only anonymous Data API request to `scenarios` | pass | Codex observed the live endpoint deny anonymous access; no saved data was disclosed |
| A16 | Same pgTAP plan covers two-user list/update/delete isolation | blocked | Executable plan prepared; needs real Supabase identities/database execution |
| A17 | Engine, money, shared server schema, invalid API request | pass | Included in the latest 39-test passing automated suite plus local HTTP 400 evidence |
| A18 | Fixture label in `engine.test.ts`; no runtime seed | pass | Source audit |
| A19 | Responsive CSS, semantic labels; browser/keyboard review | not run | Browser interaction/screenshot evidence not completed |
| A20 | Genuine observed defect → regression → rebuild/redeploy | blocked | Deployment portion Gate C; do not invent defect |
| A21 | Fresh-chat deployed-app walkthrough: 9 screens and 52 simulated expressions; C07/C18/C21 selected; presentation fix and automated regressions completed | blocked | Synthetic evidence only; post-correction deployed screenshot and fresh focused persona retest remain pending |
| A22 | Equivalent real-user Notes/Excel comparison | blocked | External participant evidence |
| A23 | Local routes plus founder-observed Google sign-in and private save/list/reopen; 5+ local commits | blocked | Production deployment, real domain and 2+ deployment evidence remain incomplete |
