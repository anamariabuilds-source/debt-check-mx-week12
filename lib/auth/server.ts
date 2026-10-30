import type { User } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AuthenticatedContext =
  | { status: "configuration_pending" }
  | { status: "logged_out" }
  | { status: "authenticated"; user: User; supabase: Awaited<ReturnType<typeof createServerSupabaseClient>> };

export async function getAuthenticatedContext(): Promise<AuthenticatedContext> {
  if (!getSupabasePublicConfig()) return { status: "configuration_pending" };
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { status: "logged_out" };
  return { status: "authenticated", user: data.user, supabase };
}
