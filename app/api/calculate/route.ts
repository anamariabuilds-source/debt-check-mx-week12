import { NextResponse } from "next/server";
import { calculateScenario } from "@/lib/domain/engine";
import { scenarioSchema } from "@/lib/domain/schema";

const MAX_BODY_BYTES = 128_000;
export async function POST(request: Request) {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return NextResponse.json({ error: "Solicitud demasiado grande." }, { status: 413 });
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return NextResponse.json({ error: "Solicitud demasiado grande." }, { status: 413 });
    const parsed = scenarioSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return NextResponse.json({ error: "Datos inválidos.", issues: parsed.error.issues.map((issue) => ({ path: issue.path, message: issue.message })) }, { status: 400, headers: { "Cache-Control": "no-store" } });
    return NextResponse.json({ result: calculateScenario(parsed.data) }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "No se pudo calcular el escenario." }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
}
