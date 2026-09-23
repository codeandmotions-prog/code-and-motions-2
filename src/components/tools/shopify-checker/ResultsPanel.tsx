import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  Info,
  Zap,
  FileText,
  Code2,
  Brush,
  ImageIcon,
  Hourglass,
  AlertTriangle,
  AlertCircle,
  Clock,
} from "lucide-react";
import type { CheckerSuccessResult, IssueSeverity } from "@/lib/shopify-checker/analyze";
import ScoreRing from "./ScoreRing";

type ResultsPanelProps = {
  result: CheckerSuccessResult;
};

function StatusPill({ status }: { status: "detected" | "estimated" | "not-detected" }) {
  const styles = {
    detected: "bg-(--color-blue)/10 text-(--color-blue)",
    estimated: "bg-amber-500/10 text-amber-600",
    "not-detected": "bg-(--color-ink-soft)/10 text-(--color-ink-soft)",
  } as const;
  const text = {
    detected: "Detected",
    estimated: "Estimated",
    "not-detected": "Not Detected",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] ${styles[status]}`}
    >
      {text[status]}
    </span>
  );
}

const severityMeta: Record<
  IssueSeverity,
  { label: string; badge: string; border: string; icon: typeof AlertTriangle }
> = {
  high: {
    label: "High Impact",
    badge: "bg-red-500/10 text-red-600",
    border: "border-red-200",
    icon: AlertTriangle,
  },
  medium: {
    label: "Medium Impact",
    badge: "bg-amber-500/10 text-amber-600",
    border: "border-amber-200",
    icon: AlertCircle,
  },
  low: {
    label: "Low Impact",
    badge: "bg-(--color-blue)/10 text-(--color-blue)",
    border: "border-(--color-line)",
    icon: Info,
  },
  good: {
    label: "All Good",
    badge: "bg-emerald-500/10 text-emerald-600",
    border: "border-emerald-200",
    icon: CheckCircle2,
  },
};

const notMeasured = [
  {
    label: "Largest Contentful Paint (LCP) & Core Web Vitals",
    reason: "Requires a real browser session over multiple loads — a single HTML fetch can't measure paint timing.",
  },
  {
    label: "Total page weight (images, fonts, every script)",
    reason: "Only the homepage HTML document is fetched, not every downstream resource it references.",
  },
  {
    label: "Mobile vs. desktop rendering differences",
    reason: "This check runs a single server-side fetch, not a real mobile or desktop browser.",
  },
];

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const totalRenderBlocking = result.renderBlockingScripts + result.renderBlockingStylesheets;
  const hostname = (() => {
    try {
      return new URL(result.finalUrl).hostname;
    } catch {
      return result.finalUrl;
    }
  })();
  const checkedAt = new Date(result.fetchedAtIso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const metrics = [
    { icon: Zap, label: "Server Response (TTFB)", value: `${result.ttfbMs}ms` },
    { icon: FileText, label: "Homepage HTML Size", value: `${result.htmlSizeKb}KB` },
    { icon: Code2, label: "Total Scripts", value: `${result.totalScripts}` },
    { icon: Brush, label: "Stylesheets", value: `${result.totalStylesheets}` },
    { icon: ImageIcon, label: "Images on Page", value: `${result.totalImages}` },
    { icon: Hourglass, label: "Render-Blocking", value: `${totalRenderBlocking}` },
  ];

  return (
    <div className="mt-6 overflow-hidden rounded-[24px] border border-(--color-line) bg-white text-left shadow-[0_30px_70px_-40px_rgba(11,28,77,0.35)]">
      {/* summary header */}
      <div className="flex flex-col gap-6 border-b border-(--color-line) p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            {result.isShopify ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-blue)/10 px-3 py-1 text-[12px] font-bold text-(--color-blue)">
                <CheckCircle2 size={14} /> Shopify Store Detected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-ink-soft)/10 px-3 py-1 text-[12px] font-bold text-(--color-ink-soft)">
                <XCircle size={14} /> Shopify Not Confirmed
              </span>
            )}
          </div>
          <h3 className="mt-3 truncate text-[19px] font-bold text-(--color-ink)">
            {result.siteTitle || hostname}
          </h3>
          <a
            href={result.finalUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-1 inline-flex items-center gap-1 text-[13.5px] text-(--color-ink-soft) hover:text-(--color-blue)"
          >
            {hostname}
            <ExternalLink size={13} />
          </a>
          <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-(--color-ink-soft)/80">
            <Clock size={12} />
            Checked {checkedAt}
          </p>
        </div>

        <ScoreRing score={result.score} label={result.scoreLabel} />
      </div>

      {!result.isShopify && (
        <div className="flex items-start gap-2.5 border-b border-(--color-line) bg-amber-50 px-6 py-4 text-[13.5px] text-amber-800 lg:px-8">
          <Info size={16} className="mt-0.5 shrink-0" />
          <p>
            We couldn&apos;t confirm Shopify signals in this page&apos;s public source, so results
            below reflect general page-load data rather than Shopify-specific analysis.
          </p>
        </div>
      )}

      {/* performance metrics */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          Performance Metrics
        </h4>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-start gap-2 rounded-2xl border border-(--color-line) bg-(--color-surface) p-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-blue)/10 text-(--color-blue)">
                <Icon size={16} strokeWidth={2} />
              </span>
              <p className="text-[19px] font-extrabold text-(--color-ink)">{value}</p>
              <p className="text-[11.5px] leading-tight text-(--color-ink-soft)">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* score breakdown */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          How This Score Was Calculated
        </h4>
        <div className="mt-4 space-y-3">
          {result.scoreFactors.map((factor) => (
            <div key={factor.label} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <StatusPill status={factor.status} />
                <span className="text-[14px] font-semibold text-(--color-ink)">{factor.label}</span>
                <span className="text-[13px] text-(--color-ink-soft)">— {factor.value}</span>
              </div>
              <span className="text-[13px] font-bold text-(--color-ink)">
                {factor.pointsEarned}/{factor.pointsPossible} pts
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] leading-relaxed text-(--color-ink-soft)">
          {result.scoreFactors.map((f) => f.note).join(" ")}
        </p>
      </div>

      {/* detected issues & recommended fixes */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          Detected Issues &amp; Recommended Fixes
        </h4>
        <div className="mt-4 space-y-3">
          {result.issues.map((issue) => {
            const meta = severityMeta[issue.severity];
            const Icon = meta.icon;
            return (
              <div key={issue.id} className={`rounded-2xl border ${meta.border} bg-(--color-surface) p-5`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="shrink-0" />
                    <span className="text-[14.5px] font-bold text-(--color-ink)">{issue.title}</span>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] ${meta.badge}`}
                  >
                    {meta.label}
                  </span>
                </div>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-(--color-ink-soft)">{issue.description}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-(--color-ink)">
                  <span className="font-semibold text-(--color-blue)">Fix: </span>
                  {issue.recommendation}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* apps grouped by category */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          Detected Apps &amp; Third-Party Scripts ({result.apps.length})
        </h4>
        {result.apps.length === 0 ? (
          <p className="mt-4 text-[14px] text-(--color-ink-soft)">
            No third-party app or tracking scripts were detected on the homepage.
          </p>
        ) : (
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {result.apps.map((app) => (
              <li
                key={app.hostname}
                className="flex items-center justify-between gap-3 rounded-xl border border-(--color-line) px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-(--color-ink)">{app.name}</p>
                  <p className="truncate text-[12px] text-(--color-ink-soft)">{app.category}</p>
                </div>
                <StatusPill status={app.identified ? "detected" : "estimated"} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* render-blocking resources */}
      {result.renderBlockingResources.length > 0 && (
        <div className="border-b border-(--color-line) p-6 lg:p-8">
          <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
            Render-Blocking Resources ({result.renderBlockingResources.length})
          </h4>
          <p className="mt-1 text-[12.5px] text-(--color-ink-soft)">
            Scripts and stylesheets in &lt;head&gt; that delay first paint because they aren&apos;t deferred, async, or print-only.
          </p>
          <ul className="mt-4 space-y-1.5">
            {result.renderBlockingResources.map((res) => (
              <li key={res.url} className="flex items-center gap-2.5 truncate text-[13.5px] text-(--color-ink-soft)">
                <span className="inline-flex shrink-0 items-center rounded-full bg-(--color-ink-soft)/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-(--color-ink-soft)">
                  {res.type}
                </span>
                <span className="truncate">{res.url}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* theme */}
      <div className="flex items-center justify-between border-b border-(--color-line) px-6 py-4 lg:px-8">
        <span className="text-[14px] font-semibold text-(--color-ink)">Theme Asset ID</span>
        {result.themeAssetId ? (
          <span className="flex items-center gap-2">
            <StatusPill status="detected" />
            <span className="text-[13.5px] text-(--color-ink-soft)">{result.themeAssetId}</span>
          </span>
        ) : (
          <StatusPill status="not-detected" />
        )}
      </div>

      {/* discovered pages */}
      <div className="border-b border-(--color-line) p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          Publicly Discovered Pages ({result.discoveredPages.length})
        </h4>
        <p className="mt-1 text-[12.5px] text-(--color-ink-soft)">
          {result.discoveredPages[0]?.source === "sitemap.xml"
            ? "Sourced from the store's public sitemap.xml — not the store's full catalog."
            : "Sourced from links found on the homepage — not the store's full catalog."}
        </p>
        {result.discoveredPages.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {result.discoveredPages.slice(0, 8).map((page) => (
              <li key={page.url} className="truncate text-[13.5px] text-(--color-ink-soft)">
                <a
                  href={page.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:text-(--color-blue)"
                >
                  {page.url}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* what we didn't measure */}
      <div className="p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-ink-soft)">
          Not Measured From This Check
        </h4>
        <ul className="mt-4 space-y-3">
          {notMeasured.map((item) => (
            <li key={item.label} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed">
              <StatusPill status="not-detected" />
              <span className="text-(--color-ink-soft)">
                <span className="font-semibold text-(--color-ink)">{item.label}.</span> {item.reason}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
