# Bug log

## 2026-10-30 — Confirmed first payment rendered as unscheduled / incorrect outside-horizon completeness

**Reporter:** Founder manual local review.  
**Status:** Fixed and verified locally. No deployment performed.

### Original scenario

- Review month `2026-11`
- Purchase MXN 12,000
- 12 installments
- Advertised installment MXN 1,000, `known`
- Confirmed first payment `2026-11-30`
- No obligations

### Observations and root cause

1. Direct `/api/calculate` reproduction with the exact ISO date was correct before the fix: twelve MXN 1,000 items, no outside-horizon warning. This excluded recurrence arithmetic as the cause of the visible failure.
2. A real headless Chrome reproduction showed the date control visibly holding `2026-11-30` while the rendered result still treated the date as absent. The date input synchronized React state only through `onChange`; the browser input path could update the visible control through `input` without updating calculation state.
3. The reported combination “no monthly items + outside-horizon warning + Complete” additionally exposed an engine defect: `extendsBeyondHorizon` did not participate in `overallState`, so a fully out-of-view known schedule could be labeled complete.

### Pre-fix failing regressions

- `components/comparison-tool.test.ts`: expected the confirmed-date control to synchronize on `input`; failed because only `onChange` existed.
- `lib/domain/engine.test.ts`: a purchase beginning `2027-11-30` with a view ending `2027-10` expected `partial`; received `complete`.

### Correction

- Synchronize the confirmed date on both `input` and `change`.
- Treat payments beyond the declared horizon as a reason the overall scenario remains partial.
- Add `knownHorizonTotalCents` and display the known total for the 12-month view.
- Add an exact regression for 12 × MXN 1,000 from November 2026 through October 2027.

### Passing verification

- Unit tests: 21/21 passed across four files.
- TypeScript: passed.
- ESLint: passed.
- Production build: passed.
- Exact API case: 12 item counts of 1; 12 subtotals of 100,000 cents; known horizon total 1,200,000 cents; `complete`; `extendsBeyondHorizon=false`; no warnings.
- Related out-of-horizon API case: `partial`; `extendsBeyondHorizon=true`; warning retained.

## 2026-10-30 — Native date input captured a transient prior month

**Reporter:** Founder second manual local review.
**Status:** Fixed and verified locally. No deployment performed.

### Observed failure

With a visible confirmed date of November 30, 2026, the browser rendered installment 2/12 in November, 12/12 in September, an empty October, and MXN 11,000 inside the view. This sequence proves the calculation state held October 30, 2026 while the native segmented date control later displayed November 30.

### Boundary investigation

- Direct engine and `/api/calculate` tests with the ISO string `2026-11-30` returned the correct November–October schedule.
- `addCalendarMonths` uses `Date.UTC` and preserves day 30; no local-time conversion occurs in the engine.
- Month-end logic was not responsible: November 30 → December 30 → January 30 is deterministic, with clamping only for nonexistent days.
- The regression was introduced by listening to native `input` events in addition to `change`. A segmented browser date widget can emit a transient intermediate date while the user is editing. The live calculation consumed that intermediate month.

### Pre-fix failing regression

`components/comparison-tool.test.ts` required the confirmed-date field to avoid transient `onInput` synchronization and use an explicit ISO entry contract. It failed against the native `type="date"` field with `onInput`.

### Smallest reliable correction

- Replace the locale-segmented native date widget with an explicit `AAAA-MM-DD` text field.
- Use one controlled `onChange` state path.
- Keep strict real-calendar validation in the existing engine and server Zod schema.

### Browser verification

Real headless Chrome keyboard input on the canonical `http://localhost:3000/product` origin rendered:

- November 2026: 1/12, MXN 1,000
- December 2026: 2/12, MXN 1,000
- September 2027: 11/12, MXN 1,000
- October 2027: 12/12, MXN 1,000
- Known view total: MXN 12,000
- Overall state: Complete

Earlier automation against `127.0.0.1` was discarded because Next.js logged that cross-origin dev resources were blocked, preventing normal hydration. The accepted browser evidence uses `localhost`, matching the founder review URL.

Final verification: 21/21 unit tests, TypeScript, ESLint, production build, exact API sequence, and canonical localhost Chrome sequence all passed.
