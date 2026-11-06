import { calculateScenario } from "@/lib/domain/engine";
import { scenarioResultSchema, scenarioSchema } from "@/lib/domain/schema";
import { CALCULATION_VERSION } from "@/lib/domain/types";
import type { ScenarioInput, ScenarioResult } from "@/lib/domain/types";
import type { Json, ScenarioInsert, ScenarioRow } from "@/lib/supabase/database.types";

export const SCENARIO_SCHEMA_VERSION = "1.0.0";

export class ScenarioValidationError extends Error {
  constructor(public readonly issues: { path: PropertyKey[]; message: string }[]) {
    super("Datos del escenario inválidos.");
  }
}

function asJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}

export function prepareScenarioRecord(raw: unknown, userId: string): { input: ScenarioInput; result: ScenarioResult; record: ScenarioInsert } {
  const parsed = scenarioSchema.safeParse(raw);
  if (!parsed.success) throw new ScenarioValidationError(parsed.error.issues.map((issue) => ({ path: issue.path, message: issue.message })));
  const input: ScenarioInput = { ...parsed.data, calculationVersion: CALCULATION_VERSION };
  const result = calculateScenario(input);
  // The input snapshot owns assumption text. Avoid duplicating it on each recurring payment.
  const snapshot: ScenarioResult = {
    ...result,
    months: result.months.map((month) => ({
      ...month,
      items: month.items.map((item) => ({ ...item, amountAssumption: undefined, dateAssumption: undefined })),
    })),
    unscheduled: result.unscheduled.map((item) => ({ ...item, amountAssumption: undefined })),
  };
  return {
    input,
    result,
    record: {
      user_id: userId,
      title: input.title,
      review_start_month: `${input.reviewStartMonth}-01`,
      horizon_months: 12,
      currency: "MXN",
      schema_version: SCENARIO_SCHEMA_VERSION,
      calculation_version: result.calculationVersion,
      scenario_result_state: result.overallState,
      input_snapshot: asJson(input),
      result_snapshot: asJson(snapshot),
    },
  };
}

export interface SavedScenario {
  id: string;
  title: string;
  input: ScenarioInput;
  result: ScenarioResult;
  schemaVersion: string;
  calculationVersion: string;
  createdAt: string;
  updatedAt: string;
}

export function parseSavedScenario(row: ScenarioRow): SavedScenario {
  const input = scenarioSchema.safeParse(row.input_snapshot);
  const result = scenarioResultSchema.safeParse(row.result_snapshot);
  if (!input.success || !result.success) throw new Error("El escenario guardado no cumple el contrato de versión.");
  if (row.schema_version !== SCENARIO_SCHEMA_VERSION || row.calculation_version !== result.data.calculationVersion || input.data.calculationVersion !== result.data.calculationVersion) {
    throw new Error("La versión del escenario guardado no coincide.");
  }
  return {
    id: row.id,
    title: row.title,
    input: input.data,
    // Rebuild visible assumptions and legacy totals from validated input without rewriting the row.
    result: calculateScenario(input.data),
    schemaVersion: row.schema_version,
    calculationVersion: row.calculation_version,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
