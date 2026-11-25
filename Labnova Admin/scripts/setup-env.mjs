#!/usr/bin/env node
/**
 * One-time local setup: creates `.env.local` for you.
 *
 *   npm run setup            ask for the two values (or reuse the LabNova app's .env)
 *   npm run setup -- --force replace an existing .env.local
 *   npm run setup -- --check only check; exit 1 if not configured (used by `npm run dev`)
 *
 * Only the Supabase URL and the *publishable* (anon) key are ever needed.
 * The secret / service-role key is refused on purpose: this app never uses it.
 */
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, '.env.local');
const args = new Set(process.argv.slice(2));

const looksPlaceholder = (v) => !v || /your-|xxx|example|changeme|<|>/i.test(v);

function parseEnv(text) {
  const out = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i < 1) continue;
    out[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

function readEnvFile(file) {
  try {
    return parseEnv(fs.readFileSync(file, 'utf8'));
  } catch {
    return {};
  }
}

/** Returns an error message, or null when the pair is acceptable. */
export function validate(url, key) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return 'The Supabase URL is not a valid web address (example: https://abcdefgh.supabase.co).';
  }
  const local = ['localhost', '127.0.0.1'].includes(parsed.hostname);
  if (parsed.protocol !== 'https:' && !(local && parsed.protocol === 'http:')) {
    return 'The Supabase URL must start with https://';
  }
  if (looksPlaceholder(url)) return 'The Supabase URL still looks like the example value.';
  if (!key || /\s/.test(key) || key.length < 20) return 'The publishable key looks incomplete.';
  if (looksPlaceholder(key)) return 'The publishable key still looks like the example value.';
  if (key.startsWith('sb_secret_')) {
    return 'That is a SECRET key. Use the "publishable" key (starts with sb_publishable_) — never the secret key.';
  }
  if (key.split('.').length === 3) {
    try {
      const payload = key.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const role = JSON.parse(Buffer.from(payload, 'base64').toString('utf8')).role;
      if (role === 'service_role') {
        return 'That is the service_role key. Use the publishable / anon key instead — never the service-role key.';
      }
    } catch {
      /* not a readable JWT: let Supabase judge it */
    }
  }
  return null;
}

function currentlyConfigured() {
  const fromFile = readEnvFile(target);
  const fromDotEnv = readEnvFile(path.join(root, '.env'));
  const url = process.env.SUPABASE_URL || fromFile.SUPABASE_URL || fromDotEnv.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || fromFile.SUPABASE_PUBLISHABLE_KEY || fromDotEnv.SUPABASE_PUBLISHABLE_KEY;
  return { url, key, ok: Boolean(url && key && !validate(url, key)) };
}

function write(url, key) {
  const body =
    '# Created by `npm run setup`. Server-side only; never commit this file.\n' +
    '# Only the publishable (anon) key belongs here — never the secret / service-role key.\n' +
    `SUPABASE_URL=${url}\nSUPABASE_PUBLISHABLE_KEY=${key}\n`;
  fs.writeFileSync(target, body, { mode: 0o600 });
}

function findLabNovaEnv() {
  const candidates = [
    path.join(root, '..', 'labnova', '.env'),
    path.join(root, '..', 'LabNova', '.env'),
    path.join(root, '..', '.env'),
  ];
  for (const file of candidates) {
    const env = readEnvFile(file);
    if (env.SUPABASE_URL && env.SUPABASE_PUBLISHABLE_KEY && !validate(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY)) {
      return { file: path.resolve(file), url: env.SUPABASE_URL, key: env.SUPABASE_PUBLISHABLE_KEY };
    }
  }
  return null;
}

const NEED = `
Supabase settings are missing. You need two values from your Supabase dashboard
(Project Settings -> API):
  1. Project URL            e.g. https://abcdefgh.supabase.co
  2. Publishable (anon) key e.g. sb_publishable_...   (NOT the secret / service-role key)
Run:  npm run setup
`;

async function main() {
  const state = currentlyConfigured();

  if (args.has('--check')) {
    if (state.ok) process.exit(0);
    if (!process.stdin.isTTY) {
      console.error(NEED);
      process.exit(1);
    }
    console.log(NEED);
    console.log('Starting setup now...\n');
  } else if (state.ok && !args.has('--force')) {
    console.log('Already configured (SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY found). Use --force to replace.');
    return;
  }

  if (!process.stdin.isTTY) {
    console.error(NEED);
    process.exit(1);
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    let url;
    let key;

    const found = findLabNovaEnv();
    if (found) {
      const answer = (await rl.question(`Found working settings in your LabNova app:\n  ${found.file}\nUse them? [Y/n] `)).trim().toLowerCase();
      if (answer === '' || answer === 'y' || answer === 'yes') ({ url, key } = found);
    }

    while (!url || !key) {
      const u = (await rl.question('Supabase Project URL: ')).trim();
      const k = (await rl.question('Supabase Publishable (anon) key: ')).trim();
      const problem = validate(u, k);
      if (problem) {
        console.log(`\n${problem}\n`);
        continue;
      }
      url = u;
      key = k;
    }

    write(url, key);
    console.log(`\nSaved .env.local  (${url})\nNow run:  npm run dev   then open http://localhost:3000`);
  } finally {
    rl.close();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
