import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = readFileSync(new URL("./migrations/001_initial.sql", import.meta.url), "utf8");
const rlsTest = readFileSync(new URL("./tests/scenarios_rls_test.sql", import.meta.url), "utf8");

describe("local Supabase security contract", () => {
  it("removes inherited privileges and scopes every policy to authenticated users", () => {
    expect(migration).toContain("revoke all on table public.scenarios from public, anon, authenticated");
    expect(migration.match(/create policy .* to authenticated/g)).toHaveLength(4);
    expect(migration).toContain("alter table public.scenarios force row level security");
    expect(migration.match(/\(select auth\.uid\(\)\) is not null/g)).toHaveLength(5);
  });

  it("bounds snapshots, versions, dates and maintains owner indexes/timestamps", () => {
    expect(migration).toContain("octet_length(input_snapshot::text) <= 128000");
    expect(migration).toContain("octet_length(result_snapshot::text) <= 512000");
    expect(migration).toContain("scenarios_owner_updated_idx");
    expect(migration).toContain("scenarios_set_updated_at");
    expect(migration).toContain("review_start_month = date_trunc('month', review_start_month)::date");
  });

  it("is atomic and creates only Debt Check-owned support objects", () => {
    expect(migration.trimStart()).toMatch(/^--[^\n]*\nbegin;/);
    expect(migration.trimEnd().endsWith("commit;")).toBe(true);
    expect(migration).toContain("create schema debt_check_private");
    expect(migration).toContain("debt_check_private.set_scenarios_updated_at");
    expect(migration).not.toMatch(/\b(drop|truncate)\b/i);
    expect(migration).not.toContain("create extension");
    expect(migration).not.toContain("create or replace function");
  });

  it("provides executable pgTAP cases for anon and two authenticated identities", () => {
    expect(rlsTest).toContain("select plan(13)");
    expect(rlsTest).toContain("set local role anon");
    expect(rlsTest).toContain("10000000-0000-0000-0000-000000000001");
    expect(rlsTest).toContain("20000000-0000-0000-0000-000000000002");
    expect(rlsTest).toContain("select * from finish()");
  });
});
