import { NextResponse } from "next/server";
import { internalRedirect, safeInternalPath } from "@/lib/auth/redirect";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = safeInternalPath(url.searchParams.get("next"));
  if (!getSupabasePublicConfig()) return NextResponse.redirect(internalRedirect(url.origin, next, "configuration_pending"));

  const supabase = await createServerSupabaseClient();
  const callback = new URL("/auth/callback", url.origin);
  callback.searchParams.set("next", next);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: callback.toString(), scopes: "openid email profile" },
  });
  if (error || !data.url) return NextResponse.redirect(internalRedirect(url.origin, next, "sign_in_error"));
  return NextResponse.redirect(data.url);
}
