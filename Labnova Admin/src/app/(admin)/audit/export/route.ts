import type { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { auditCsv } from '@/lib/audit-csv';
import { MAX_EXPORT_ROWS, parseAuditFilters, toSearch } from '@/lib/audit-query';
import { searchAudit } from '@/lib/data';
import { pktDay } from '@/lib/format';

export const dynamic = 'force-dynamic';

/**
 * Downloads the audit log, with the same filters the page is showing, as a CSV file (at most MAX_EXPORT_ROWS of the
 * newest matching rows). Only a signed-in admin gets it: requireAdmin() sends everyone else to /login, and the
 * database checks is_admin() again inside admin_audit_search.
 */
export async function GET(request: NextRequest) {
  await requireAdmin();
  const filters = parseAuditFilters(request.nextUrl.searchParams);

  let csv: string;
  try {
    const { rows } = await searchAudit({ ...toSearch(filters), limit: MAX_EXPORT_ROWS, offset: 0 });
    csv = auditCsv(rows);
  } catch (e) {
    // redirect()/notFound() are control flow and must pass through.
    if (typeof e === 'object' && e !== null && 'digest' in e) throw e;
    return new Response('The audit log could not be exported right now. Please go back and try again.', {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  const day = pktDay(new Date().toISOString()) || 'export';
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="labnova-audit-${day}.csv"`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
