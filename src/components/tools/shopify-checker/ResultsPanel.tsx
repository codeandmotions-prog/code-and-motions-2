import { CheckCircle2, XCircle, ExternalLink, Info } from "lucide-react";
import type { CheckerSuccessResult } from "@/lib/shopify-checker/analyze";
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
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] ${styles[status]}`}>
      {text[status]}
    </span>
  );
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const totalRenderBlocking = result.renderBlockingScripts + result.renderBlockingStylesheets;

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
            {result.siteTitle || result.finalUrl}
          </h3>
          <a
            href={result.finalUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-1 inline-flex items-center gap-1 text-[13.5px] text-(--color-ink-soft) hover:text-(--color-blue)"
          >
            {result.finalUrl}
            <ExternalLink size={13} />
          </a>
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

      {/* stats grid */}
      <div className="grid grid-cols-2 gap-px border-b border-(--color-line) bg-(--color-line) sm:grid-cols-4">
        {[
          { label: "Total Scripts", value: result.totalScripts },
          { label: "Stylesheets", value: result.totalStylesheets },
          { label: "Images on Page", value: result.totalImages },
          { label: "Render-Blocking", value: totalRenderBlocking },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 text-center">
            <p className="text-[26px] font-extrabold text-(--color-ink)">{stat.value}</p>
            <p className="mt-1 text-[12px] font-medium text-(--color-ink-soft)">{stat.label}</p>
          </div>
        ))}
      </div>

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

      {/* apps */}
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

      {/* recommendations */}
      <div className="p-6 lg:p-8">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-(--color-blue)">
          Recommendations
        </h4>
        <ul className="mt-4 space-y-3">
          {result.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-(--color-ink-soft)">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-blue)" />
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
