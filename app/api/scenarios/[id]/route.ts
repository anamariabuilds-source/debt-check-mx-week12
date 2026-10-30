import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthenticatedContext } from "@/lib/auth/server";
import { prepareScenarioRecord, parseSavedScenario } from "@/lib/persistence/scenarios";
import { authFailure, noStoreHeaders, requestFailure } from "@/lib/http/responses";
import { readBoundedJson, rejectCrossOriginMutation } from "@/lib/http/security";

const idSchema = z.uuid();
type ScenarioRouteContext = { params: Promise<{ id: string }> };

async function readId(context: ScenarioRouteContext): Promise<string | null> {
  const parsed = idSchema.safeParse((await context.params).id);
  return parsed.success ? parsed.data : null;
}

export async function GET(_request: Request, routeContext: ScenarioRouteContext) {
  const id = await readId(routeContext);
  if (!id) return NextResponse.json({ error: "Identificador inválido." }, { status: 400, headers: noStoreHeaders });
  const context = await getAuthenticatedContext();
  if (context.status !== "authenticated") return authFailure(context);
  const { data, error } = await context.supabase.from("scenarios").select("*").eq("id", id).eq("user_id", context.user.id).maybeSingle();
  if (error) return NextResponse.json({ error: "No se pudo abrir el escenario." }, { status: 500, headers: noStoreHeaders });
  if (!data) return NextResponse.json({ error: "Escenario no encontrado." }, { status: 404, headers: noStoreHeaders });
  try {
    return NextResponse.json({ scenario: parseSavedScenario(data) }, { headers: noStoreHeaders });
  } catch {
    return NextResponse.json({ error: "El escenario guardado no cumple el contrato de versión." }, { status: 409, headers: noStoreHeaders });
  }
}

export async function PUT(request: Request, routeContext: ScenarioRouteContext) {
  const rejected = rejectCrossOriginMutation(request);
  if (rejected) return rejected;
  const id = await readId(routeContext);
  if (!id) return NextResponse.json({ error: "Identificador inválido." }, { status: 400, headers: noStoreHeaders });
  const context = await getAuthenticatedContext();
  if (context.status !== "authenticated") return authFailure(context);
  try {
    const raw = await readBoundedJson(request);
    const { record } = prepareScenarioRecord(raw, context.user.id);
    const { data, error } = await context.supabase.from("scenarios").update(record).eq("id", id).eq("user_id", context.user.id).select("*").maybeSingle();
    if (error) return NextResponse.json({ error: "No se pudo actualizar el escenario." }, { status: 500, headers: noStoreHeaders });
    if (!data) return NextResponse.json({ error: "Escenario no encontrado." }, { status: 404, headers: noStoreHeaders });
    return NextResponse.json({ scenario: parseSavedScenario(data) }, { headers: noStoreHeaders });
  } catch (error) {
    return requestFailure(error);
  }
}

export async function DELETE(request: Request, routeContext: ScenarioRouteContext) {
  const rejected = rejectCrossOriginMutation(request);
  if (rejected) return rejected;
  const id = await readId(routeContext);
  if (!id) return NextResponse.json({ error: "Identificador inválido." }, { status: 400, headers: noStoreHeaders });
  const context = await getAuthenticatedContext();
  if (context.status !== "authenticated") return authFailure(context);
  const { data, error } = await context.supabase.from("scenarios").delete().eq("id", id).eq("user_id", context.user.id).select("id").maybeSingle();
  if (error) return NextResponse.json({ error: "No se pudo eliminar el escenario." }, { status: 500, headers: noStoreHeaders });
  if (!data) return NextResponse.json({ error: "Escenario no encontrado." }, { status: 404, headers: noStoreHeaders });
  return NextResponse.json({ deleted: true }, { headers: noStoreHeaders });
}
