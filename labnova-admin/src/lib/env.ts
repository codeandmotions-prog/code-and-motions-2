import 'server-only';

export const ENV_HELP = 'Run "npm run setup" in the admin folder (or double-click start-admin.bat), then restart.';

/** True when both Supabase settings are present. */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_PUBLISHABLE_KEY?.trim());
}

/** Server-side Supabase settings. Fails loudly if they are missing. */
export function supabaseEnv(): { url: string; key: string } {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) {
    throw new Error(`SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be set. ${ENV_HELP}`);
  }
  return { url, key };
}
