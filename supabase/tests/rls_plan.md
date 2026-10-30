# RLS verification plan — blocked until Gate C

Use two founder-authorized Google test identities. Never record tokens or passwords.

1. Anonymous `select/insert/update/delete` is denied.
2. User A can create and reopen A's scenario.
3. User B cannot list, read, update, or delete A's scenario, including a direct request with A's UUID.
4. An insert or update whose `user_id` differs from `auth.uid()` is denied.
5. Snapshot preserves `null`, evidence states, assumptions, monthly states, unresolved items, and calculation version.
6. Log only status codes, synthetic record identifiers, policy names, and redacted project identity.
