# LabNova Admin (web)

Separate Next.js web app for LabNova administrators — target domain `admin.codeandmotions.com`.
It talks to the **existing** LabNova Supabase project and uses the **same** admin functions and
Offline-licensing tables as the Windows app. It does not contain a licensing system of its own.

## Features
- **Admin login** (email + password). Only users listed in `public.admins` get in; everyone else is signed straight back out. There is no sign-up anywhere.
- **Forgot password:** `Forgot password?` on the sign-in page e-mails a reset link (see "Forgot password" below). The link signs the admin in once, they choose a new password, and every session of that account is ended.
- **Dashboard:** active labs, activation keys in use, a "needs attention" count, a chart of new labs per day (7 / 14 / 30 days), total / paid / free-trial labs, Basic Offline vs Premium Online labs, Offline activation key totals across ALL labs (Activated / Unused / Expired / Revoked), the "needs attention" list (Basic Offline labs without a key, trials and subscriptions ending, suspended accounts), recent admin activity and shortcuts.
- **Labs:** search, plan filter and status tabs with counts; every row shows plan, Offline/Online mode, account status, subscription status and key usage. Phone-friendly cards on small screens.
- **Lab details → Plan & status:** change plan (Basic Offline ↔ Premium Online), account access (Active / Suspended), subscription status (Free trial / Active / Expired), subscription end date and payment reference. Always a confirmation step that shows previous → new values, with an optional reason. Uses the existing `admin_update_lab_subscription` logic through the small `admin_set_lab_subscription` wrapper (adds the reason). Also an SMS on/off switch (existing `admin_set_sms_enabled`).
- **Offline activation keys & devices:** create a key (shown once, Copy button), status badges (Unused / Activated / Revoked), PC name and details, activation date, last seen, times reset, Revoke, Reset for a new PC, Delete unused, search + filter, key history.
- **Audit logs (`/audit`):** every lab's history in one place. Pick any lab with the searchable lab picker to see its complete history. One searchable, filterable trail of everything — account changes made by an admin, activation-key and device events, what each lab's users did in Online Mode, and what each lab did on its Offline PC (synced from the PC). Free-text search, filters for lab, source, action type, record type, user and date range (with Today / Last 7 / Last 30 days shortcuts), 25/50/100 rows per page with paging, a details drawer per entry (who, when, record, before → after values, device, raw details) and a **CSV export** of exactly the current filter (up to 5,000 rows, spreadsheet-formula-safe). Administrators who have been given the delete permission (see "Who may delete audit entries") can delete ticked entries, one entry from its details drawer, or everything a lab / date-range filter matches (typed confirmation). Every deletion is recorded — who, when, which lab, how many, why; never what the entries said — under **Audit logs → Deletion history** (`/audit/deletions`). Patient details are recorded by field name only, never their values; test results are never recorded.
- **Working mode (Offline ↔ Online) per lab:** on a lab's page, a card shows whether the lab works Offline (its own PC + activation key) or Online (cloud account) and, for a lab being moved Offline → Online, where each of its PCs is in the switch (waiting / uploading / verified / switched). Changing the plan to Premium Online is the instruction; PCs are never locked, they upload everything, LabNova verifies it, and only then does the PC switch.
- **Activation-key expiry:** create a key with an optional expiry date (end of that day, Pakistan time), change or remove it later with a reason, and see Active / Expired / Revoked, the expiry date, "expires in N days" and the grace period on every key card. A short grace period (default 7 days) keeps a lab working if its key expires unexpectedly; after it the PC shows the activation screen (its data is never deleted). Every key event is in the audit trail.
- **Public report verification (`/verify/<token>`):** the page a patient reaches by scanning the QR code on a report made on an Offline PC. It needs no sign-in and shows only the lab, patient name and ID, test, status, dates, doctor and technician — never results, phone numbers or billing. Tokens are random; the database stores only their hash.
- **Design:** a sage background with one large rounded panel, a slim black icon rail (a top bar and menu on phones), light-weight Manrope headlines, pill buttons and capsule meters / charts, drawn with plain CSS (no chart library, no images, no extra fonts). It follows the system's reduced-motion setting.
- **One persistent shell:** every section (Dashboard, Labs, Lab details with its keys and devices, Audit logs) opens inside the same layout. The sidebar, branding and session stay put and only the content area changes — no page reloads, no new tabs. A loading placeholder and a thin progress bar show while a section loads, the sidebar highlights the section you clicked straight away, filters apply without reloading, and errors / "not found" appear inside the shell. Browser Back and Forward work as expected.

## How it is secured
- The browser never talks to Supabase and never receives any key. Sessions live in secure cookies; all data calls run on the server as the signed-in admin.
- Every page and every server action calls `requireAdmin()` (valid session + `is_admin()`); the database re-checks `is_admin()` inside every `admin_*` function.
- Server actions validate every value again, send only the fields that actually changed, and refuse to overwrite a lab that someone else changed meanwhile.
- Per-request CSP with nonce, `frame-ancestors 'none'`, HSTS, no-store caching, no-referrer, noindex.
- The service-role key is NOT used and must NOT be set here.

## Database (run in this order)
Open the Supabase SQL editor and run these files from the `supabase/` folder of this repo (all additive and safe to re-run **in this order**):

1. **`web_admin_phase1.sql`** — needs sections 1-37 of the main LabNova `schema.sql` already applied. Adds the read-only helpers (section 38) and the admin audit log + `admin_set_lab_subscription` (section 39).
2. **`sync_foundation.sql`** — the device sync tables and functions (section 40).
3. **`phase2_features.sql`** — key expiry, QR report verification, the audit event store and search, the mode directive and the Offline → Online migration tables (sections 41-45).
4. **`audit_admin_phase3.sql`** — the faster audit search and the permissioned delete (section 46). **Before running it, open the file and replace `YOUR-ADMIN-EMAIL@example.com` with your own admin login e-mail** (one line near the top, under "STEP FOR YOU"). That is what gives you the delete permission; without it the delete buttons stay hidden for everyone.

Optional: **`audit_diagnostics.sql`** only *reads* — run it first if you want to see the audit tables, indexes, triggers and policies as they are today.

If you are setting up a fresh project, running the main repo's complete `schema.sql` instead does all of it in one go.

> **Do not re-run an older file after a newer one.** Re-running `web_admin_phase1.sql` or `sync_foundation.sql` after `phase2_features.sql` puts the older versions of a few functions back (for example the key list, the key counts and the sync status). If you did, just run `phase2_features.sql` again.

Until a file has been run, the pages that need it show a clear "needs a database update" notice instead of failing (for example `/audit` keeps working with the original search but without the delete buttons until `audit_admin_phase3.sql` is run, and `/verify` says the verification service is not set up yet).

Also deploy the Supabase edge functions from the main repo (see `OFFLINE_MODE_DEPLOYMENT.md` there): `supabase functions deploy offline-license --no-verify-jwt` and `supabase functions deploy offline-sync --no-verify-jwt`.

The existing functions (`admin_update_lab_subscription`, `admin_set_sms_enabled`) are not modified.

## Environment variables (server-side only)
| Name | Value |
|---|---|
| `SUPABASE_URL` | the project URL (same as the Windows app's `.env`) |
| `SUPABASE_PUBLISHABLE_KEY` | the publishable (anon) key (same as the Windows app) |
| `SITE_URL` *(optional, recommended on the server)* | `https://admin.codeandmotions.com` — the address put in the password-reset e-mail link |

Nothing else is needed. Never add the secret / service-role key. The Windows app's QR codes for Offline PCs point to `https://admin.codeandmotions.com/verify/<token>`; if this site runs on another address, set `OFFLINE_REPORT_VERIFICATION_BASE_URL` in the Windows app's `.env` to match (see `.env.example` there).

## Who may delete audit entries
Seeing the audit log needs only an admin account. **Deleting** needs a second thing: a row in `public.admin_audit_delete_permissions`. `audit_admin_phase3.sql` adds the admin whose e-mail you typed into it. To allow another administrator later, run in the SQL editor:
```sql
insert into public.admin_audit_delete_permissions (user_id)
select u.id from auth.users u join public.admins a on a.user_id = u.id
 where lower(u.email) = lower('other-admin@example.com')
on conflict (user_id) do nothing;
```
To take the permission away: `delete from public.admin_audit_delete_permissions where user_id = (select id from auth.users where lower(email) = lower('other-admin@example.com'));`
The permission is checked by the Admin Panel **and again inside the database functions**, so it cannot be bypassed from the browser. Deleting an Offline-PC entry that the lab has already moved to its Online history also removes that moved copy (otherwise it would reappear). The record of deletions has no edit or delete function at all.

## Forgot password
1. On the sign-in page the admin clicks **Forgot password?**, enters their e-mail and always sees the same "if that account exists, an e-mail is on its way" message (it never reveals which e-mails are admins). Requests are rate-limited per address and per visitor.
2. The e-mail contains a link to `<SITE_URL>/auth/confirm`. Opening it (in the **same browser** the request was made from) signs the person in once; if the account is **not** in `public.admins` they are signed out again and sent to the sign-in page.
3. They choose a new password (at least 10 characters), the password is changed and **all sessions of that account are signed out**, then they sign in with the new password.

Supabase settings needed for this (Supabase dashboard):
- **Authentication → URL Configuration → Redirect URLs:** add `https://admin.codeandmotions.com/auth/confirm` (and `http://localhost:3000/auth/confirm` if you test locally). Without it Supabase refuses to send the reset link to this site.
- **E-mail sending:** Supabase's built-in e-mail service only sends a few e-mails per hour and is meant for testing. For real use set up your own SMTP under Authentication → Emails → SMTP Settings. Lab owners share this same Supabase project, so they use the same templates and limits.
- The reset e-mail uses the project's "Reset password" template, which you can edit under Authentication → Emails. Keep its link as `{{ .ConfirmationURL }}`.

## Create the first admin
1. Supabase Dashboard -> Authentication -> Users -> Add user (email + password, auto-confirm).
2. SQL editor: `insert into public.admins (user_id) values ('<that user id>');`
3. Being in `public.admins` is what grants admin access (not merely having an account). Leave public sign-ups as they are: the Windows app's lab sign-up uses them.

## Run locally (no manual config files)
Windows: double-click **`start-admin.bat`**. Or from a terminal:
```
npm install
npm run dev        # first time: asks for the two Supabase values and saves .env.local for you
```
then open http://localhost:3000. Re-run the questions any time with `npm run setup -- --force`.

What `npm run setup` does: reuses the values from the LabNova app's `.env` if it finds a real one next to this
folder (asks first), otherwise asks you for the Project URL and the Publishable key. It refuses the secret /
service-role key. It writes `.env.local` (git-ignored). Prefer doing it by hand? Copy `.env.example` to
`.env.local` — the file name matters, `.env.example` itself is never read. Restart `npm run dev` after any change.

Without those two values the login page says "This server is not configured yet" instead of crashing.

## Font
UI font is Manrope (variable, weights 200-800), bundled in `src/app/fonts/` and served by this app itself
(no Google Fonts request). Weights are used deliberately: Light/Regular (300-400) for headlines, big numbers and body text, Medium (500) for labels, SemiBold (600) for buttons and important UI. Manrope is licensed under the SIL Open Font License 1.1. Only the activation key
itself is shown in a monospace font so letters and digits cannot be confused.

## Deploy on Railway (when you are ready)
1. Push this folder to its own Git repository.
2. Railway -> your existing project -> New -> GitHub Repo -> select it (a NEW service; the main website is untouched).
3. Service -> Variables: add `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` and `SITE_URL` (`https://admin.codeandmotions.com`). There is no `.env.local` on Railway: the Variables tab is where these values go.
   Build/start are detected automatically (`npm run build`, `npm start`; Railway sets `PORT`).
   Optional: set the service Healthcheck Path to `/api/health` (public, returns `{"status":"ok"}`, touches no data).
4. Service -> Settings -> Networking -> Custom Domain -> `admin.codeandmotions.com`. Railway shows a CNAME target.
5. Namecheap -> Domain List -> Manage -> Advanced DNS -> Add record: Type `CNAME`, Host `admin`, Value = the
   target Railway showed (add the TXT record too if Railway asks). Leave `@` and `www` alone.
6. Wait until Railway shows the domain verified with HTTPS.
7. Supabase -> Authentication -> URL Configuration: add `https://admin.codeandmotions.com` and `https://admin.codeandmotions.com/auth/confirm` to the allowed redirect URLs.
8. Sign in, then test with a non-admin account (it must be refused).
9. After the first deploy, check that sign-in redirects stay on `admin.codeandmotions.com` (not an internal Railway address).
10. Open `https://admin.codeandmotions.com/verify` in a private window: it must load **without** asking you to sign in (it explains that you need to scan a QR code). Every other page must still send you to the login.

Nothing here has been deployed for you — deploying (and running the SQL files above) is a step you do yourself, when you are ready.

## Later phases (not built yet)
Notifications, optional two-factor sign-in, editing SMS provider settings, resending a key's expiry reminder by email.
