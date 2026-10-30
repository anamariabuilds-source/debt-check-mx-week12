import { NextResponse } from "next/server";
import { getAuthenticatedContext } from "@/lib/auth/server";
import { prepareScenarioRecord, parseSavedScenario } from "@/lib/persistence/scenarios";
import { authFailure, noStoreHeaders, requestFailure } from "@/lib/http/responses";
import { readBoundedJson, rejectCrossOriginMutation } from "@/lib/http/security";

export async function GET() {
  const context = await getAuthenticatedContext();
  if (context.status !== "authenticated") return authFailure(context);
  const { data, error } = await context.supabase
    .from("scenarios")
    .select("id,title,scenario_result_state,calculation_version,created_at,updated_at")
    .order("updated_at", { ascending: false })
    .limit(50);
  if (error) return NextResponse.json({ error: "No se pudieron listar los escenarios." }, { status: 500, headers: noStoreHeaders });
  return NextResponse.json({ scenarios: data.map((row) => ({
    id: row.id,
    title: row.title,
    state: row.scenario_result_state,
    calculationVersion: row.calculation_version,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  })) }, { headers: noStoreHeaders });
}

export async function POST(request: Request) {
  const rejected = rejectCrossOriginMutation(request);
  if (rejected) return rejected;
  const context = await getAuthenticatedContext();
  if (context.status !== "authenticated") return authFailure(context);
  try {
    const raw = await readBoundedJson(request);
    const { record } = prepareScenarioRecord(raw, context.user.id);
    const { data, error } = await context.supabase.from("scenarios").insert(record).select("*").single();
    if (error) return NextResponse.json({ error: "No se pudo guardar el escenario." }, { status: 500, headers: noStoreHeaders });
    return NextResponse.json({ scenario: parseSavedScenario(data) }, { status: 201, headers: noStoreHeaders });
  } catch (error) {
    return requestFailure(error);
  }
}
