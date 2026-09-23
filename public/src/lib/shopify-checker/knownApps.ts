/**
 * Known third-party script signatures found on Shopify storefronts.
 *
 * Each entry maps a hostname fragment (matched against the hostname of a
 * script/link `src`/`href` found in the page) to a human-readable app
 * name and category. This is only used to LABEL scripts that were
 * actually found in the fetched page's HTML — it never invents a script
 * that wasn't there. Anything not matched here is still reported, just
 * as an "Unidentified third-party script" for its real hostname.
 */
export type AppCategory =
  | "Analytics & Tracking"
  | "Reviews & UGC"
  | "Marketing & Popups"
  | "Live Chat & Support"
  | "Subscriptions"
  | "Loyalty & Rewards"
  | "Page Builder"
  | "Personalization & Upsell"
  | "Payments"
  | "Fonts"
  | "Other";

export type KnownAppSignature = {
  match: string;
  name: string;
  category: AppCategory;
};

export const KNOWN_APP_SIGNATURES: KnownAppSignature[] = [
  // Analytics & tracking
  { match: "googletagmanager.com", name: "Google Tag Manager", category: "Analytics & Tracking" },
  { match: "google-analytics.com", name: "Google Analytics", category: "Analytics & Tracking" },
  { match: "connect.facebook.net", name: "Meta (Facebook) Pixel", category: "Analytics & Tracking" },
  { match: "analytics.tiktok.com", name: "TikTok Pixel", category: "Analytics & Tracking" },
  { match: "ct.pinterest.com", name: "Pinterest Tag", category: "Analytics & Tracking" },
  { match: "snap.licdn.com", name: "LinkedIn Insight Tag", category: "Analytics & Tracking" },
  { match: "hotjar.com", name: "Hotjar", category: "Analytics & Tracking" },
  { match: "clarity.ms", name: "Microsoft Clarity", category: "Analytics & Tracking" },
  { match: "cdn.segment.com", name: "Segment", category: "Analytics & Tracking" },
  { match: "cdn.mouseflow.com", name: "Mouseflow", category: "Analytics & Tracking" },

  // Reviews & UGC
  { match: "yotpo.com", name: "Yotpo", category: "Reviews & UGC" },
  { match: "judge.me", name: "Judge.me", category: "Reviews & UGC" },
  { match: "loox.io", name: "Loox", category: "Reviews & UGC" },
  { match: "loox.app", name: "Loox", category: "Reviews & UGC" },
  { match: "reviews.io", name: "Reviews.io", category: "Reviews & UGC" },
  { match: "stamped.io", name: "Stamped.io", category: "Reviews & UGC" },
  { match: "okendo.io", name: "Okendo", category: "Reviews & UGC" },

  // Marketing & popups / email-SMS
  { match: "klaviyo.com", name: "Klaviyo", category: "Marketing & Popups" },
  { match: "privy.com", name: "Privy", category: "Marketing & Popups" },
  { match: "justuno.com", name: "Justuno", category: "Marketing & Popups" },
  { match: "attentivemobile.com", name: "Attentive", category: "Marketing & Popups" },
  { match: "postscript.io", name: "Postscript", category: "Marketing & Popups" },
  { match: "omnisend.com", name: "Omnisend", category: "Marketing & Popups" },
  { match: "mailchimp.com", name: "Mailchimp", category: "Marketing & Popups" },

  // Live chat & support
  { match: "tidio.co", name: "Tidio", category: "Live Chat & Support" },
  { match: "gorgias.chat", name: "Gorgias", category: "Live Chat & Support" },
  { match: "gorgias.com", name: "Gorgias", category: "Live Chat & Support" },
  { match: "zdassets.com", name: "Zendesk", category: "Live Chat & Support" },
  { match: "tawk.to", name: "Tawk.to", category: "Live Chat & Support" },
  { match: "reamaze.com", name: "Re:amaze", category: "Live Chat & Support" },

  // Subscriptions
  { match: "rechargecdn.com", name: "ReCharge", category: "Subscriptions" },
  { match: "rechargepayments.com", name: "ReCharge", category: "Subscriptions" },
  { match: "loop.co", name: "Loop Subscriptions", category: "Subscriptions" },

  // Loyalty & rewards
  { match: "smile.io", name: "Smile.io", category: "Loyalty & Rewards" },
  { match: "swymrelay.com", name: "Swym", category: "Loyalty & Rewards" },

  // Page builders
  { match: "shogun.io", name: "Shogun", category: "Page Builder" },
  { match: "pagefly.io", name: "PageFly", category: "Page Builder" },
  { match: "gempages.net", name: "GemPages", category: "Page Builder" },
  { match: "zipify.com", name: "Zipify Pages", category: "Page Builder" },

  // Personalization & upsell
  { match: "rebuyengine.com", name: "Rebuy", category: "Personalization & Upsell" },
  { match: "boldapps.net", name: "Bold Commerce", category: "Personalization & Upsell" },
  { match: "bold-commerce.com", name: "Bold Commerce", category: "Personalization & Upsell" },
  { match: "candyrack.com", name: "CandyRack", category: "Personalization & Upsell" },

  // Payments / BNPL widgets
  { match: "klarna.com", name: "Klarna", category: "Payments" },
  { match: "affirm.com", name: "Affirm", category: "Payments" },
  { match: "afterpay.com", name: "Afterpay", category: "Payments" },
  { match: "sezzle.com", name: "Sezzle", category: "Payments" },

  // Fonts (not counted as "bloat" the same way, but still worth listing)
  { match: "fonts.googleapis.com", name: "Google Fonts", category: "Fonts" },
  { match: "fonts.gstatic.com", name: "Google Fonts", category: "Fonts" },
  { match: "use.typekit.net", name: "Adobe Fonts (Typekit)", category: "Fonts" },
];

export function identifyApp(hostname: string): KnownAppSignature | null {
  const lower = hostname.toLowerCase();
  return (
    KNOWN_APP_SIGNATURES.find((sig) => lower === sig.match || lower.endsWith(`.${sig.match}`)) ??
    null
  );
}
