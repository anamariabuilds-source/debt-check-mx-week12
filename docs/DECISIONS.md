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
