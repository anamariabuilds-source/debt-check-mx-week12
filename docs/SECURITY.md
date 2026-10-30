# Security status

## Prepared locally

- No service-role key is referenced by browser code.
- `.env*` is ignored except the names-only `.env.example`.
- Shared strict schema validates scenario structure at `/api/calculate`; request bodies are bounded.
- Owner-scoped `scenarios` table enables and forces RLS.
- Separate SELECT/INSERT/UPDATE/DELETE policies require `auth.uid() = user_id`.
- Anonymous table privileges are revoked.
- Inputs and versioned outputs are stored together as JSON snapshots so unknowns and historical calculations are not silently upgraded.
- Demo fixtures are explicitly synthetic.

## Not verified under Gate B

- Google OAuth login and callback behavior.
- Applied Supabase migration and database constraints.
- Logged-out denial and two-user isolation through direct requests.
- Production environment-variable scoping and log redaction.
- Live save/reopen behavior.

These require founder-controlled external configuration and Gate C authorization. Until then the UI identifies private save as unavailable; it does not fall back to local storage or claim security verification.
