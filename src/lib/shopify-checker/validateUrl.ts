import { promises as dns } from "node:dns";
import net from "node:net";

export type UrlValidationResult =
  | { ok: true; url: URL }
  | { ok: false; reason: string };

/**
 * Blocks obviously private / loopback / link-local / metadata-service
 * targets so this public tool can't be used to probe internal
 * infrastructure (SSRF). Anything that resolves to a normal public
 * address is allowed through — this is a safety guard, not a Shopify
 * check (that happens later, once the page is actually fetched).
 */
function isPrivateOrReservedIp(ip: string): boolean {
  if (net.isIP(ip) === 4) {
    const parts = ip.split(".").map(Number);
    const [a, b] = parts;
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 0) return true;
    if (a === 169 && b === 254) return true; // link-local / cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    return false;
  }
  if (net.isIP(ip) === 6) {
    const lower = ip.toLowerCase();
    if (lower === "::1") return true;
    if (lower.startsWith("fe80:")) return true; // link-local
    if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // unique local
    if (lower.startsWith("::ffff:")) {
      return isPrivateOrReservedIp(lower.replace("::ffff:", ""));
    }
    return false;
  }
  return false;
}

const BLOCKED_HOSTNAMES = new Set(["localhost", "0.0.0.0"]);

export async function validateStoreUrl(rawInput: string): Promise<UrlValidationResult> {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { ok: false, reason: "Please enter your Shopify store URL." };
  }

  // Be forgiving about a missing protocol — "mystore.com" is a perfectly
  // reasonable thing for someone to type.
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(withProtocol);
  } catch {
    return { ok: false, reason: "That doesn't look like a valid URL." };
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, reason: "Only http:// and https:// URLs are supported." };
  }

  const hostname = url.hostname.toLowerCase();

  if (BLOCKED_HOSTNAMES.has(hostname) || hostname.endsWith(".local")) {
    return { ok: false, reason: "That URL can't be checked." };
  }

  if (net.isIP(hostname) && isPrivateOrReservedIp(hostname)) {
    return { ok: false, reason: "That URL can't be checked." };
  }

  if (!net.isIP(hostname)) {
    if (!hostname.includes(".")) {
      return { ok: false, reason: "That doesn't look like a valid store domain." };
    }

    try {
      const records = await dns.lookup(hostname, { all: true });
      if (records.length === 0) {
        return { ok: false, reason: "We couldn't resolve that domain." };
      }
      if (records.some((record) => isPrivateOrReservedIp(record.address))) {
        return { ok: false, reason: "That URL can't be checked." };
      }
    } catch {
      return { ok: false, reason: "We couldn't resolve that domain. Please check the URL." };
    }
  }

  return { ok: true, url };
}
