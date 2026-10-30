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
