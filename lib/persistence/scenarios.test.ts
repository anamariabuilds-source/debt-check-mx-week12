import { describe, expect, it } from "vitest";
import type { ScenarioInput } from "@/lib/domain/types";
import type { ScenarioRow } from "@/lib/supabase/database.types";
import { parseSavedScenario, prepareScenarioRecord, SCENARIO_SCHEMA_VERSION } from "./scenarios";

const input = (): ScenarioInput => ({
  title: "SYNTHETIC, NOT RENATA'S ACTUAL DATA",
  reviewStartMonth: "2026-11",
  horizonMonths: 12,
  calculationVersion: "1.0.0",
  purchase: {
    label: "Compra sintética",
    priceCents: 1_200_000,
    installmentCount: 12,
    advertisedInstallmentCents: { value: 100_000, state: "known", source: "user" },
    firstPaymentDate: { value: "2026-11-30", state: "known", source: "user" },
  },
  obligations: [{
    id: "insurance",
    label: "Seguro sintético",
    amountCents: { value: null, state: "unknown", source: "user" },
    anchorDate: { value: "2027-01-15", state: "known", source: "user" },
    frequency: "semiannual",
    remainingCount: 2,
    endDate: null,
    optional: false,
  }],
});

describe("server-owned scenario snapshots", () => {
  it("revalidates and recalculates instead of accepting a client result", () => {
    const raw = { ...input(), result_snapshot: { overallState: "complete", knownHorizonTotalCents: 999_999_999 } };
    const prepared = prepareScenarioRecord(raw, "10000000-0000-0000-0000-000000000001");
    expect(prepared.record.scenario_result_state).toBe("partial");
    expect(prepared.result.knownHorizonTotalCents).toBe(1_200_000);
    expect(prepared.record.user_id).toBe("10000000-0000-0000-0000-000000000001");
  });

  it("preserves unknown values as null and retains versions on reopen", () => {
    const prepared = prepareScenarioRecord(input(), "10000000-0000-0000-0000-000000000001");
    const row: ScenarioRow = {
      id: "30000000-0000-0000-0000-000000000003",
      user_id: "10000000-0000-0000-0000-000000000001",
      title: prepared.record.title,
      review_start_month: prepared.record.review_start_month,
      horizon_months: 12,
      currency: "MXN",
      schema_version: SCENARIO_SCHEMA_VERSION,
      calculation_version: prepared.record.calculation_version,
      scenario_result_state: prepared.record.scenario_result_state,
      input_snapshot: prepared.record.input_snapshot,
      result_snapshot: prepared.record.result_snapshot,
      created_at: "2026-10-30T12:00:00.000Z",
      updated_at: "2026-10-30T12:00:00.000Z",
    };
    const reopened = parseSavedScenario(row);
    expect(reopened.input.obligations[0].amountCents).toEqual({ value: null, state: "unknown", source: "user" });
    expect(reopened.result.months[2].items.some((item) => item.amountCents === null && item.amountState === "unknown")).toBe(true);
    expect(reopened.schemaVersion).toBe("1.0.0");
    expect(reopened.calculationVersion).toBe("1.0.0");
  });

  it("preserves documented assumptions for estimated amounts", () => {
    const estimated = input();
    estimated.purchase.advertisedInstallmentCents = {
      value: 100_000,
      state: "estimated",
      source: "user",
      assumption: "Estimación tomada del anuncio; falta confirmar el contrato.",
    };
    const prepared = prepareScenarioRecord(estimated, "10000000-0000-0000-0000-000000000001");
    expect(prepared.input.purchase.advertisedInstallmentCents.assumption).toBe(
      "Estimación tomada del anuncio; falta confirmar el contrato.",
    );
  });
});
