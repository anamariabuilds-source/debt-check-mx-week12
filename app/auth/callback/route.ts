import { NextResponse } from "next/server";
import { internalRedirect, safeInternalPath } from "@/lib/auth/redirect";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = safeInternalPath(url.searchParams.get("next"));
  const code = url.searchParams.get("code");
  if (!getSupabasePublicConfig()) return NextResponse.redirect(internalRedirect(url.origin, next, "configuration_pending"));
  if (!code) return NextResponse.redirect(internalRedirect(url.origin, next, "callback_error"));

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(internalRedirect(url.origin, next, "session_error"));
  return NextResponse.redirect(internalRedirect(url.origin, next));
}
