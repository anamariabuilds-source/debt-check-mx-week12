import { NextResponse } from "next/server";
import { rejectCrossOriginMutation } from "@/lib/http/security";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const rejected = rejectCrossOriginMutation(request);
  if (rejected) return rejected;
  if (getSupabasePublicConfig()) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
  }
  return NextResponse.redirect(new URL("/product?auth=signed_out", request.url), 303);
}
