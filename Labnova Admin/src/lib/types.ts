export type AccountStatus = 'active' | 'suspended';
export type SubscriptionStatus = 'trial' | 'active' | 'expired';
export type KeyStatus = 'unused' | 'activated' | 'revoked';
/** What a key is RIGHT NOW: the stored status, except that a key past its expiry date is 'expired' (unless revoked). */
export type EffectiveKeyStatus = KeyStatus | 'expired';

/** One row of admin_list_labs(). */
export type Lab = {
  owner_id: string;
  lab_name: string;
  owner_name: string;
  email: string;
  mobile_number: string;
  account_status: AccountStatus;
  subscription_status: SubscriptionStatus;
  plan: string | null;
  trial_started_at: string | null;
  trial_ends_at: string;
  subscription_ends_at: string | null;
  last_payment_reference: string | null;
  sms_enabled: boolean;
  created_at: string;
};

/** One row of admin_list_offline_keys(). */
export type OfflineKey = {
  id: string;
  key_hint: string;
  note: string | null;
  status: KeyStatus;
  created_at: string;
  activated_at: string | null;
  device_name: string | null;
  device_info: string | null;
  last_seen_at: string | null;
  revoked_at: string | null;
  revoked_reason: string | null;
  reset_count: number;
  /** When the key stops being valid; null = never expires. (Needs the phase-2 database update.) */
  expires_at?: string | null;
  /** Days the PC keeps working after expires_at before LabNova asks for a renewed key. */
  grace_days?: number | null;
  /** expires_at + grace_days, or null when the key has no expiry. */
  grace_ends_at?: string | null;
  /** unused | activated | revoked | expired. Absent before the phase-2 database update. */
  effective_status?: EffectiveKeyStatus | null;
};

/**
 * One row of admin_device_sync_status(): how an activated PC's optional cloud sync is doing.
 * Only a status — never any lab data. Counts may arrive as numbers or strings.
 */
export type DeviceSyncStatus = {
  key_id: string;
  key_hint: string;
  device_name: string | null;
  key_status: KeyStatus;
  /** The PC holds a sync credential. false = it has not enrolled yet (or an admin reset it). */
  enrolled: boolean;
  last_ok_at: string | null;
  app_version: string | null;
  schema_version: number | null;
  outbox_pending: number | null;
  outbox_failed: number | null;
  items_received: number | string;
  /** Last time the PC asked LabNova which mode the lab should be in (phase-2 database update). */
  last_check_at?: string | null;
};

/** One row of admin_device_mode_status(): where an activated PC stands in a switch from Offline to Online. */
export type DeviceModeStatus = {
  key_id: string;
  key_hint: string;
  device_name: string | null;
  key_status: KeyStatus;
  lab_plan: string | null;
  /** What the lab's plan tells this PC to do: offline | online | unknown. */
  directive_mode: 'offline' | 'online' | 'unknown';
  /** The PC's most recent switch attempt: uploading | verified | failed | null (never started). */
  migration_state: string | null;
  migration_started_at: string | null;
  migration_verified_at: string | null;
  migrated_rows: number | string | null;
  last_check_at: string | null;
  last_error: string | null;
};

/** One row of admin_list_offline_audit(). */
export type OfflineAuditEntry = {
  id: number;
  key_hint: string | null;
  action: string;
  actor_type: 'admin' | 'device' | 'system';
  actor_email: string | null;
  device_name: string | null;
  details: string | null;
  created_at: string;
};

/** One row of admin_offline_key_counts() (counts arrive as numbers or strings). */
export type KeyCounts = {
  owner_id: string;
  total_keys: number | string;
  unused_keys: number | string;
  activated_keys: number | string;
  revoked_keys: number | string;
  /** Keys past their expiry date (phase-2 database update); absent before it. */
  expired_keys?: number | string;
};

/** One row of admin_list_audit(): account/plan changes and licence events, merged. */
export type AuditEntry = {
  source: AuditSource;
  id: string;
  created_at: string;
  owner_id: string | null;
  lab_name: string | null;
  action: string;
  actor_type: 'admin' | 'device' | 'system' | 'lab';
  actor_email: string | null;
  field_name: string | null;
  old_value: string | null;
  new_value: string | null;
  reason: string | null;
  details: string | null;
  device_name: string | null;
  key_hint: string | null;
};

/**
 * Where an audit row comes from:
 *  account      a change an admin (or the lab) made to the lab's plan / status / SMS setting
 *  license      an activation-key or device event
 *  lab_online   something the lab did while working Online (the lab's own cloud audit log)
 *  lab_offline  something the lab did on a Basic Offline PC, sent to LabNova when the PC was online
 */
export type AuditSource = 'account' | 'license' | 'lab_online' | 'lab_offline';

/** One row of admin_audit_search(): every kind of audit event, with entity and before/after values. */
export type AuditRow = {
  /** Rows matching the filters, over ALL pages (same on every row). Counted only up to 10,000 by admin_audit_search_v2. */
  total_count: number | string;
  /** admin_audit_search_v2 only: true when more than 10,000 rows match (total_count is then 10,000). */
  total_capped?: boolean | null;
  source: AuditSource;
  id: string;
  created_at: string;
  owner_id: string | null;
  lab_name: string | null;
  action: string;
  actor_type: 'admin' | 'device' | 'system' | 'lab';
  actor_email: string | null;
  entity_type: string | null;
  entity_id: string | null;
  summary: string | null;
  field_name: string | null;
  old_value: string | null;
  new_value: string | null;
  reason: string | null;
  device_name: string | null;
  key_hint: string | null;
  before_json: Record<string, unknown> | null;
  after_json: Record<string, unknown> | null;
  metadata: Record<string, unknown> | null;
};

/** What the public QR page shows (get_offline_report_verification). Never test results, phone numbers or billing. */
export type ReportVerification = {
  lab_name: string | null;
  patient_name: string | null;
  patient_display_id: string | null;
  test_name: string | null;
  status: string | null;
  registered_at: string | null;
  reported_at: string | null;
  doctor_name: string | null;
  technician_name: string | null;
  /** The lab withdrew this report (for example it was deleted or replaced). */
  withdrawn: boolean;
  /** When the lab's system last confirmed these details. */
  last_confirmed_at: string | null;
};

export const PLAN_LABELS: Record<string, string> = {
  basic_offline: 'Basic Offline',
  premium_monthly: 'Premium Online (Monthly)',
  premium_yearly: 'Premium Online (Yearly)',
};

/** Plans an admin can choose today. Yearly is an older plan: only shown for labs already on it. */
export const SELECTABLE_PLANS = ['basic_offline', 'premium_monthly'] as const;

export const SUBSCRIPTION_LABELS: Record<string, string> = {
  trial: 'Free trial',
  active: 'Active',
  expired: 'Expired',
};

export const ACCOUNT_LABELS: Record<string, string> = {
  active: 'Active',
  suspended: 'Suspended',
};

export function planLabel(plan: string | null): string {
  if (!plan) return 'No plan';
  return PLAN_LABELS[plan] ?? plan;
}

/** Offline = runs on the lab's own PC (activation key). Online = premium cloud plans. */
export type LabMode = 'offline' | 'online' | null;

export function labMode(plan: string | null): LabMode {
  if (plan === 'basic_offline') return 'offline';
  if (plan === 'premium_monthly' || plan === 'premium_yearly') return 'online';
  return null;
}

/** One row of admin_audit_deletions_list(): the record kept when audit entries are deleted. It holds no audit content. */
export type AuditDeletion = {
  total_count: number | string;
  id: number | string;
  deleted_at: string;
  actor_email: string | null;
  mode: 'selected' | 'matching';
  owner_id: string | null;
  lab_name: string | null;
  lab_count: number;
  row_count: number;
  counts: { account?: number; license?: number; lab_online?: number; lab_offline?: number; migrated_copies?: number } | null;
  filter_summary: string | null;
  reason: string | null;
};
