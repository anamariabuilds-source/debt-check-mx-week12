import { NextResponse } from "next/server";

export const MAX_SCENARIO_BODY_BYTES = 128_000;

export function rejectCrossOriginMutation(request: Request): NextResponse | null {
  const origin = request.headers.get("origin");
  if (!origin) return NextResponse.json({ error: "Origen requerido." }, { status: 403 });
  try {
    if (new URL(origin).origin !== new URL(request.url).origin) return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }
  return null;
}

export async function readBoundedJson(request: Request): Promise<unknown> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declared) && declared > MAX_SCENARIO_BODY_BYTES) throw new RequestBodyError(413, "Solicitud demasiado grande.");
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_SCENARIO_BODY_BYTES) throw new RequestBodyError(413, "Solicitud demasiado grande.");
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new RequestBodyError(400, "JSON inválido.");
  }
}

export class RequestBodyError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}
