import * as cheerio from "cheerio";
import { identifyApp, type AppCategory } from "./knownApps";
import { validateStoreUrl } from "./validateUrl";

const REQUEST_TIMEOUT_MS = 12_000;
const USER_AGENT =
  "Mozilla/5.0 (compatible; CodeAndMotionsSpeedChecker/1.0; +https://codeandmotions.com/tools/shopify-speed-checker)";

export type DetectedApp = {
  hostname: string;
  name: string;
  category: AppCategory;
  identified: boolean;
};

export type DiscoveredPage = {
  url: string;
  source: "sitemap.xml" | "homepage links";
};

export type ScoreFactor = {
  label: string;
  status: "detected" | "estimated";
  value: string;
  pointsEarned: number;
  pointsPossible: number;
  note: string;
};

export type RenderBlockingResource = {
  type: "script" | "stylesheet";
  url: string;
};

export type IssueSeverity = "high" | "medium" | "low" | "good";

export type AuditIssue = {
  id: string;
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
};

export type CheckerSuccessResult = {
  ok: true;
  requestedUrl: string;
  finalUrl: string;
  httpStatus: number;
  fetchedAtIso: string;

  isShopify: boolean;
  shopifySignals: string[];

  siteTitle: string | null;
  metaDescription: string | null;
  themeAssetId: string | null;

  ttfbMs: number;
  totalFetchMs: number;
  htmlSizeKb: number;

  totalScripts: number;
  totalStylesheets: number;
  totalImages: number;
  renderBlockingScripts: number;
  renderBlockingStylesheets: number;
  renderBlockingResources: RenderBlockingResource[];

  apps: DetectedApp[];
  discoveredPages: DiscoveredPage[];

  score: number;
  scoreLabel: "Fast" | "Needs Improvement" | "Slow";
  scoreFactors: ScoreFactor[];

  issues: AuditIssue[];
};

export type CheckerErrorResult = {
  ok: false;
  code: "invalid_url" | "blocked_url" | "unreachable" | "http_error" | "timeout" | "server_error";
  message: string;
  httpStatus?: number;
};

export type CheckerResult = CheckerSuccessResult | CheckerErrorResult;

/** Linear scale: full points at/under `goodAt`, zero points at/over `zeroAt`. */
function scoreScale(value: number, goodAt: number, zeroAt: number, maxPoints: number): number {
  if (value <= goodAt) return maxPoints;
  if (value >= zeroAt) return 0;
  const ratio = 1 - (value - goodAt) / (zeroAt - goodAt);
  return Math.round(ratio * maxPoints * 10) / 10;
}

function bytesToKb(bytes: number): number {
  return Math.round((bytes / 1024) * 10) / 10;
}

type BuildResultInput = {
  requestedUrl: string;
  finalUrl: string;
  httpStatus: number;
  html: string;
  shopIdHeaderPresent: boolean;
  ttfbMs: number;
  totalFetchMs: number;
  discoveredPages: DiscoveredPage[];
};

/**
 * Pure HTML-parsing + scoring engine. Takes an already-fetched page (plus
 * the network timing/headers gathered for it) and turns it into a full
 * result — no network access happens in here, which is what lets this
 * part of the pipeline be exercised directly against fixture HTML in
 * tests, independent of `analyzeShopifyStore`'s network/SSRF handling.
 */
export function buildResultFromHtml(input: BuildResultInput): CheckerSuccessResult {
  const { requestedUrl, finalUrl, httpStatus, html, shopIdHeaderPresent, ttfbMs, totalFetchMs, discoveredPages } =
    input;

  const htmlSizeKb = bytesToKb(Buffer.byteLength(html, "utf8"));
  const $ = cheerio.load(html);
  const origin = new URL(finalUrl).origin;

  // --- Shopify detection -----------------------------------------------
  const shopifySignals: string[] = [];
  if (/cdn\.shopify\.com|\/cdn\/shop\//i.test(html)) {
    shopifySignals.push("Shopify CDN assets referenced in page source");
  }
  if (/window\.Shopify\s*=|Shopify\.shop\s*=/.test(html)) {
    shopifySignals.push("Shopify storefront object found in inline scripts");
  }
  if (shopIdHeaderPresent) {
    shopifySignals.push("Shopify shop identifier found in response headers");
  }
  if (/name=["']shopify-checkout-api-token["']/i.test(html)) {
    shopifySignals.push("Shopify checkout meta tag found in page source");
  }
  const isShopify = shopifySignals.length > 0;

  // --- Basic page info ---------------------------------------------------
  const siteTitle =
    $("title").first().text().trim() || $('meta[property="og:site_name"]').attr("content") || null;
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || null;

  const themeMatch = html.match(/\/cdn\/shop\/t\/(\d+)\//);
  const themeAssetId = themeMatch ? themeMatch[1] : null;

  // --- Resource counts -----------------------------------------------
  const allScripts = $("script[src]");
  const allStylesheets = $('link[rel="stylesheet"]');
  const totalScripts = allScripts.length;
  const totalStylesheets = allStylesheets.length;
  const totalImages = $("img").length;

  const renderBlockingResources: RenderBlockingResource[] = [];

  let renderBlockingScripts = 0;
  $("head script[src]").each((_, el) => {
    const attribs = el.attribs;
    if (!("async" in attribs) && !("defer" in attribs) && attribs.type !== "module") {
      renderBlockingScripts += 1;
      if (attribs.src) {
        try {
          renderBlockingResources.push({ type: "script", url: new URL(attribs.src, finalUrl).toString() });
        } catch {
          // ignore unparsable src
        }
      }
    }
  });

  let renderBlockingStylesheets = 0;
  $('head link[rel="stylesheet"]').each((_, el) => {
    const media = el.attribs.media;
    if (!media || (media !== "print" && !media.includes("print"))) {
      renderBlockingStylesheets += 1;
      if (el.attribs.href) {
        try {
          renderBlockingResources.push({ type: "stylesheet", url: new URL(el.attribs.href, finalUrl).toString() });
        } catch {
          // ignore unparsable href
        }
      }
    }
  });

  // --- Third-party app / script detection -------------------------------
  const appMap = new Map<string, DetectedApp>();
  const ownCdnHosts = [origin.replace(/^https?:\/\//, ""), "cdn.shopify.com", "shopifycdn.com"];

  allScripts.each((_, el) => {
    const src = el.attribs.src;
    if (!src) return;
    try {
      const resolved = new URL(src, finalUrl);
      const hostname = resolved.hostname;
      if (ownCdnHosts.some((h) => hostname === h || hostname.endsWith(`.${h}`))) return;
      if (appMap.has(hostname)) return;
      const known = identifyApp(hostname);
      appMap.set(hostname, {
        hostname,
        name: known?.name ?? hostname,
        category: known?.category ?? "Other",
        identified: Boolean(known),
      });
    } catch {
      // ignore unparsable src
    }
  });

  const apps = [...appMap.values()].sort((a, b) => a.category.localeCompare(b.category));

  // --- Scoring (transparent, disclosed formula) --------------------------
  const scoreFactors: ScoreFactor[] = [
    {
      label: "Server response time (TTFB)",
      status: "detected",
      value: `${ttfbMs}ms`,
      pointsEarned: scoreScale(ttfbMs, 400, 2500, 25),
      pointsPossible: 25,
      note: "Full marks at 400ms or under, zero at 2500ms or over.",
    },
    {
      label: "Homepage HTML size",
      status: "detected",
      value: `${htmlSizeKb}KB`,
      pointsEarned: scoreScale(htmlSizeKb, 60, 300, 15),
      pointsPossible: 15,
      note: "Full marks at 60KB or under, zero at 300KB or over.",
    },
    {
      label: "Render-blocking resources in <head>",
      status: "detected",
      value: `${renderBlockingScripts + renderBlockingStylesheets}`,
      pointsEarned: scoreScale(renderBlockingScripts + renderBlockingStylesheets, 0, 10, 25),
      pointsPossible: 25,
      note: "Full marks at 0, zero at 10 or more blocking scripts/stylesheets.",
    },
    {
      label: "Third-party apps & scripts detected",
      status: "estimated",
      value: `${apps.length}`,
      pointsEarned: scoreScale(apps.length, 2, 15, 35),
      pointsPossible: 35,
      note: "Full marks at 2 or fewer, zero at 15 or more. Based on scripts visible in the homepage source only.",
    },
  ];

  const score = Math.round(scoreFactors.reduce((sum, f) => sum + f.pointsEarned, 0));
  const scoreLabel: CheckerSuccessResult["scoreLabel"] =
    score >= 80 ? "Fast" : score >= 60 ? "Needs Improvement" : "Slow";

  // --- Detected issues & recommended fixes --------------------------------
  // Every issue below is derived only from data actually measured above,
  // using disclosed, fixed thresholds (mirroring the scoring formula) —
  // never a fabricated or randomized finding.
  const totalRenderBlocking = renderBlockingScripts + renderBlockingStylesheets;
  const issues: AuditIssue[] = [];

  if (totalRenderBlocking > 0) {
    issues.push({
      id: "render-blocking",
      severity: totalRenderBlocking >= 5 ? "high" : totalRenderBlocking >= 2 ? "medium" : "low",
      title: `${totalRenderBlocking} render-blocking resource${totalRenderBlocking === 1 ? "" : "s"} in <head>`,
      description: `${renderBlockingScripts} script(s) and ${renderBlockingStylesheets} stylesheet(s) in <head> aren't marked async, defer, or print-only, so the browser has to fetch and run them before it can render anything.`,
      recommendation:
        "Add `defer` or `async` to non-critical scripts, and move any stylesheet that isn't needed for above-the-fold content out of <head> (or mark it media=\"print\" if that fits).",
    });
  }

  if (apps.length >= 5) {
    issues.push({
      id: "app-bloat",
      severity: apps.length >= 10 ? "high" : "medium",
      title: `${apps.length} third-party apps/scripts detected`,
      description: `Your homepage loads ${apps.length} separate third-party apps or tracking scripts, each adding its own network request and script-parse cost.`,
      recommendation:
        "Audit your installed Shopify apps and remove anything that isn't actively used — uninstalled apps sometimes leave scripts behind in theme.liquid or app embeds.",
    });
  } else if (apps.length > 0) {
    issues.push({
      id: "app-count-normal",
      severity: "low",
      title: `${apps.length} third-party app${apps.length === 1 ? "" : "s"}/script${apps.length === 1 ? "" : "s"} detected`,
      description: "This is a typical number of third-party scripts for an active Shopify store.",
      recommendation: "Worth a periodic check — remove any app you've since uninstalled but that left a script behind.",
    });
  }

  if (ttfbMs > 800) {
    issues.push({
      id: "ttfb",
      severity: ttfbMs > 1500 ? "high" : "medium",
      title: `Server response time is ${ttfbMs}ms`,
      description:
        "Time to first byte (TTFB) measures how long the server took to start sending your homepage. Anything consistently over ~800ms delays everything else on the page.",
      recommendation:
        "Review heavy Liquid loops, large metafield lookups, or an overloaded theme/app combination with your development team.",
    });
  }

  if (htmlSizeKb > 150) {
    issues.push({
      id: "html-size",
      severity: htmlSizeKb > 300 ? "high" : "medium",
      title: `Homepage HTML is ${htmlSizeKb}KB`,
      description:
        "Heavy inline Liquid output, large inline scripts/styles, or excessive sections can inflate the size of the HTML document itself.",
      recommendation:
        "Trim unused sections, move large inline scripts to external deferred files, and audit theme sections for redundant markup.",
    });
  }

  if (issues.length === 0) {
    issues.push({
      id: "all-clear",
      severity: "good",
      title: "No major red flags detected",
      description: "Your homepage's public source looks lean across every check above.",
      recommendation:
        "For a fuller picture, also check a product and collection page — some app scripts only load there.",
    });
  }

  if (!isShopify) {
    issues.unshift({
      id: "not-confirmed-shopify",
      severity: "low",
      title: "Shopify signals not confirmed",
      description: "We couldn't confirm Shopify-specific signals in this page's public source.",
      recommendation: "The figures above reflect general page-load signals rather than Shopify-specific analysis.",
    });
  }

  return {
    ok: true,
    requestedUrl,
    finalUrl,
    httpStatus,
    fetchedAtIso: new Date().toISOString(),
    isShopify,
    shopifySignals,
    siteTitle,
    metaDescription,
    themeAssetId,
    ttfbMs,
    totalFetchMs,
    htmlSizeKb,
    totalScripts,
    totalStylesheets,
    totalImages,
    renderBlockingScripts,
    renderBlockingStylesheets,
    renderBlockingResources: renderBlockingResources.slice(0, 20),
    apps,
    discoveredPages,
    score,
    scoreLabel,
    scoreFactors,
    issues,
  };
}

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" },
      redirect: "follow",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function discoverPages(origin: string, $: cheerio.CheerioAPI, finalUrl: string): Promise<DiscoveredPage[]> {
  // Try the sitemap first — if the store exposes one, it's a more honest
  // source than just scraping homepage links.
  try {
    const res = await fetchWithTimeout(`${origin}/sitemap.xml`, 6_000);
    if (res.ok) {
      const xml = await res.text();
      const matches = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
      if (matches.length > 0) {
        return matches.slice(0, 20).map((url) => ({ url, source: "sitemap.xml" as const }));
      }
    }
  } catch {
    // Non-fatal — fall through to homepage links.
  }

  const seen = new Set<string>();
  const pages: DiscoveredPage[] = [];
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    if (/^(mailto:|tel:|javascript:|#)/i.test(href.trim())) return;
    try {
      const resolved = new URL(href, finalUrl);
      if (resolved.origin !== origin) return;
      resolved.hash = "";
      const clean = resolved.toString();
      if (!seen.has(clean) && pages.length < 15) {
        seen.add(clean);
        pages.push({ url: clean, source: "homepage links" });
      }
    } catch {
      // ignore unparsable hrefs
    }
  });
  return pages;
}

export async function analyzeShopifyStore(rawUrl: string): Promise<CheckerResult> {
  const validation = await validateStoreUrl(rawUrl);
  if (!validation.ok) {
    return { ok: false, code: "invalid_url", message: validation.reason };
  }

  const requestedUrl = validation.url.toString();
  const start = performance.now();
  let response: Response;

  try {
    response = await fetchWithTimeout(requestedUrl, REQUEST_TIMEOUT_MS);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return {
        ok: false,
        code: "timeout",
        message:
          "The request timed out. The store may be slow to respond right now — please try again.",
      };
    }
    return {
      ok: false,
      code: "unreachable",
      message:
        "We couldn't reach that store. Please check the URL and make sure the site is publicly accessible.",
    };
  }

  const ttfbMs = Math.round(performance.now() - start);

  if (!response.ok) {
    return {
      ok: false,
      code: "http_error",
      httpStatus: response.status,
      message:
        response.status === 401 || response.status === 403
          ? "This store returned an access-denied response. If it's password-protected, we can't analyze it from the public storefront."
          : `This store returned a ${response.status} response and couldn't be analyzed.`,
    };
  }

  const finalUrl = response.url || requestedUrl;
  const html = await response.text();
  const totalFetchMs = Math.round(performance.now() - start);
  const shopIdHeaderPresent = Boolean(
    response.headers.get("x-shopid") || response.headers.get("x-sorting-hat-shopid")
  );

  const $ = cheerio.load(html);
  const origin = new URL(finalUrl).origin;
  const discoveredPages = await discoverPages(origin, $, finalUrl);

  return buildResultFromHtml({
    requestedUrl,
    finalUrl,
    httpStatus: response.status,
    html,
    shopIdHeaderPresent,
    ttfbMs,
    totalFetchMs,
    discoveredPages,
  });
}
