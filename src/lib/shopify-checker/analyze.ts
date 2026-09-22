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

  apps: DetectedApp[];
  discoveredPages: DiscoveredPage[];

  score: number;
  scoreLabel: "Fast" | "Needs Improvement" | "Slow";
  scoreFactors: ScoreFactor[];

  recommendations: string[];
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

  let renderBlockingScripts = 0;
  $("head script[src]").each((_, el) => {
    const attribs = el.attribs;
    if (!("async" in attribs) && !("defer" in attribs) && attribs.type !== "module") {
      renderBlockingScripts += 1;
    }
  });

  let renderBlockingStylesheets = 0;
  $('head link[rel="stylesheet"]').each((_, el) => {
    const media = el.attribs.media;
    if (!media || (media !== "print" && !media.includes("print"))) {
      renderBlockingStylesheets += 1;
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

  // --- Recommendations ----------------------------------------------
  const recommendations: string[] = [];
  if (renderBlockingScripts + renderBlockingStylesheets > 0) {
    recommendations.push(
      `${renderBlockingScripts + renderBlockingStylesheets} render-blocking script(s)/stylesheet(s) were found in <head>. Adding \`defer\` or \`async\` to non-critical scripts (or moving them out of <head>) usually helps first paint the most.`
    );
  }
  if (apps.length >= 7) {
    recommendations.push(
      `We found ${apps.length} third-party apps/scripts loading on your homepage. It's worth auditing your Shopify app list and removing anything that isn't actively used — each one adds its own script and network request.`
    );
  } else if (apps.length > 0) {
    recommendations.push(
      apps.length === 1
        ? "1 third-party app/script detected. Keep an eye on it if it's no longer actively used — leftover scripts from uninstalled apps are a common source of bloat."
        : `${apps.length} third-party apps/scripts detected. Keep an eye on ones you no longer use — uninstalled apps sometimes leave scripts behind.`
    );
  }
  if (ttfbMs > 800) {
    recommendations.push(
      `Server response time was ${ttfbMs}ms. Anything consistently over ~800ms is worth investigating with your theme/app setup, since it delays everything else on the page.`
    );
  }
  if (htmlSizeKb > 150) {
    recommendations.push(
      `Your homepage HTML is ${htmlSizeKb}KB. Heavy inline Liquid output, large inline scripts, or excessive sections can inflate this — trimming it usually speeds up parsing.`
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      "No major red flags detected in your homepage source — nice and lean. For a full picture, also check a product and collection page, since app scripts are sometimes loaded only there."
    );
  }
  if (!isShopify) {
    recommendations.unshift(
      "We couldn't confirm this is a Shopify storefront from the public page source, so the figures above reflect general page-load signals rather than Shopify-specific analysis."
    );
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
    apps,
    discoveredPages,
    score,
    scoreLabel,
    scoreFactors,
    recommendations,
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
