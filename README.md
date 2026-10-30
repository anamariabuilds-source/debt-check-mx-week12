# Debt Check MX — Week 12

Spanish-first pre-purchase comparison for MXN installment commitments. The core is deterministic and does not require AI.

## Local checks

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

The local UI calculates without credentials. Supabase SSR auth and private scenario CRUD are prepared locally, but the UI reports configuration pending until founder-controlled Supabase and Google OAuth values are supplied. Live OAuth, applied RLS, save/reopen, and two-user isolation remain unverified and must not be represented as passed.
