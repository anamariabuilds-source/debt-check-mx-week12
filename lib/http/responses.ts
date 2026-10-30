import { NextResponse } from "next/server";
import type { AuthenticatedContext } from "@/lib/auth/server";
import { RequestBodyError } from "./security";
import { ScenarioValidationError } from "@/lib/persistence/scenarios";

export function authFailure(context: Exclude<AuthenticatedContext, { status: "authenticated" }>): NextResponse {
  if (context.status === "configuration_pending") return NextResponse.json({ error: "Supabase todavía no está configurado.", code: "configuration_pending" }, { status: 503 });
  return NextResponse.json({ error: "La sesión no está disponible o expiró.", code: "session_expired" }, { status: 401 });
}

export function requestFailure(error: unknown): NextResponse {
  if (error instanceof RequestBodyError) return NextResponse.json({ error: error.message }, { status: error.status });
  if (error instanceof ScenarioValidationError) return NextResponse.json({ error: error.message, issues: error.issues }, { status: 400 });
  return NextResponse.json({ error: "No se pudo procesar el escenario." }, { status: 400 });
}

export const noStoreHeaders = { "Cache-Control": "private, no-store, max-age=0" } as const;
