/**
 * Deterministic WooCommerce → Shopify migration readiness scoring.
 *
 * This is a self-reported assessment, not a live store scan — there is no
 * network call here. Every number in the output is a pure function of the
 * answers the user actually selected: same answers always produce the same
 * score, risks and next steps. Nothing is random, estimated from nothing,
 * or fabricated.
 */

export type CatalogSize = "under-100" | "100-1000" | "1000-10000" | "10000-plus";
export type VariationLevel = "none" | "some" | "extensive";
export type CustomerSize = "under-500" | "500-5000" | "5000-50000" | "50000-plus";
export type OrderMigration = "no" | "under-1000" | "1000-10000" | "10000-plus";
export type SubscriptionLevel = "no" | "simple" | "complex";
export type ReviewLevel = "no" | "some" | "thousands";
export type PluginCount = "0-3" | "4-10" | "10-plus";
export type CustomCodeLevel = "none" | "minor" | "significant";
export type SeoPriority = "low" | "important" | "critical";
export type PaymentComplexity = "standard" | "custom";
export type ShippingComplexity = "standard" | "custom";
export type YesNo = "no" | "yes";

export type MigrationAnswers = {
  products: CatalogSize;
  variations: VariationLevel;
  customers: CustomerSize;
  orders: OrderMigration;
  subscriptions: SubscriptionLevel;
  reviews: ReviewLevel;
  plugins: PluginCount;
  customCode: CustomCodeLevel;
  seo: SeoPriority;
  payments: PaymentComplexity;
  shipping: ShippingComplexity;
  otherCustom: YesNo;
  otherCustomDetail: string;
};

type Option<V extends string> = { value: V; label: string; penalty: number };

function options<V extends string>(list: Option<V>[]): Option<V>[] {
  return list;
}

export const PRODUCT_OPTIONS = options<CatalogSize>([
  { value: "under-100", label: "Under 100 products", penalty: 2 },
  { value: "100-1000", label: "100 – 1,000 products", penalty: 5 },
  { value: "1000-10000", label: "1,000 – 10,000 products", penalty: 8 },
  { value: "10000-plus", label: "10,000+ products", penalty: 10 },
]);

export const VARIATION_OPTIONS = options<VariationLevel>([
  { value: "none", label: "No variations — simple products only", penalty: 0 },
  { value: "some", label: "Some products have variations", penalty: 4 },
  { value: "extensive", label: "Extensive variations (many attributes/combinations)", penalty: 8 },
]);

export const CUSTOMER_OPTIONS = options<CustomerSize>([
  { value: "under-500", label: "Under 500 customer accounts", penalty: 2 },
  { value: "500-5000", label: "500 – 5,000 customer accounts", penalty: 5 },
  { value: "5000-50000", label: "5,000 – 50,000 customer accounts", penalty: 7 },
  { value: "50000-plus", label: "50,000+ customer accounts", penalty: 8 },
]);

export const ORDER_OPTIONS = options<OrderMigration>([
  { value: "no", label: "No — starting fresh on Shopify", penalty: 0 },
  { value: "under-1000", label: "Yes, under 1,000 historical orders", penalty: 4 },
  { value: "1000-10000", label: "Yes, 1,000 – 10,000 historical orders", penalty: 7 },
  { value: "10000-plus", label: "Yes, 10,000+ historical orders", penalty: 10 },
]);

export const SUBSCRIPTION_OPTIONS = options<SubscriptionLevel>([
  { value: "no", label: "No subscriptions or recurring billing", penalty: 0 },
  { value: "simple", label: "Yes, a simple subscription setup", penalty: 6 },
  { value: "complex", label: "Yes, complex logic (custom intervals, upsells, etc.)", penalty: 12 },
]);

export const REVIEW_OPTIONS = options<ReviewLevel>([
  { value: "no", label: "No reviews to migrate", penalty: 0 },
  { value: "some", label: "Yes, a manageable number", penalty: 2 },
  { value: "thousands", label: "Yes, thousands of reviews", penalty: 5 },
]);

export const PLUGIN_OPTIONS = options<PluginCount>([
  { value: "0-3", label: "0 – 3 active plugins", penalty: 2 },
  { value: "4-10", label: "4 – 10 active plugins", penalty: 6 },
  { value: "10-plus", label: "10+ active plugins", penalty: 10 },
]);

export const CUSTOM_CODE_OPTIONS = options<CustomCodeLevel>([
  { value: "none", label: "No custom code", penalty: 0 },
  { value: "minor", label: "Minor customizations", penalty: 7 },
  { value: "significant", label: "Significant custom development", penalty: 15 },
]);

export const SEO_OPTIONS = options<SeoPriority>([
  { value: "low", label: "Not a priority", penalty: 1 },
  { value: "important", label: "Yes, important", penalty: 5 },
  { value: "critical", label: "Yes, critical — we rely heavily on organic search", penalty: 8 },
]);

export const PAYMENT_OPTIONS = options<PaymentComplexity>([
  { value: "standard", label: "Standard gateways (Stripe, PayPal, etc.)", penalty: 1 },
  { value: "custom", label: "Custom or less common payment gateways", penalty: 6 },
]);

export const SHIPPING_OPTIONS = options<ShippingComplexity>([
  { value: "standard", label: "Standard carrier plugins / rate tables", penalty: 1 },
  { value: "custom", label: "Custom shipping logic or rate calculators", penalty: 6 },
]);

export const OTHER_CUSTOM_OPTIONS = options<YesNo>([
  { value: "no", label: "No other custom functionality", penalty: 0 },
  { value: "yes", label: "Yes, we have other custom-built functionality", penalty: 12 },
]);

function penaltyFor<V extends string>(list: Option<V>[], value: V): number {
  return list.find((o) => o.value === value)?.penalty ?? 0;
}

function labelFor<V extends string>(list: Option<V>[], value: V): string {
  return list.find((o) => o.value === value)?.label ?? String(value);
}

function maxPenalty<V extends string>(list: Option<V>[]): number {
  return Math.max(...list.map((o) => o.penalty));
}

export type ReadinessLabel = "Ready" | "Needs Preparation" | "Complex";
export type ComplexityLevel = "Low" | "Medium" | "High";
export type RiskSeverity = "high" | "medium" | "low";
export type RiskCategory = "data" | "seo" | "plugins" | "general";

export type MigrationRisk = {
  id: string;
  category: RiskCategory;
  severity: RiskSeverity;
  title: string;
  description: string;
};

export type ScoreFactor = {
  label: string;
  value: string;
  penalty: number;
  maxPenalty: number;
};

export type MigrationResult = {
  score: number;
  label: ReadinessLabel;
  complexity: ComplexityLevel;
  scoreFactors: ScoreFactor[];
  risks: MigrationRisk[];
  mainRisks: MigrationRisk[];
  dataRisks: MigrationRisk[];
  seoRisks: MigrationRisk[];
  pluginRisks: MigrationRisk[];
  nextSteps: string[];
};

function buildFactor<V extends string>(label: string, list: Option<V>[], value: V): ScoreFactor {
  return {
    label,
    value: labelFor(list, value),
    penalty: penaltyFor(list, value),
    maxPenalty: maxPenalty(list),
  };
}

export function calculateMigrationReadiness(answers: MigrationAnswers): MigrationResult {
  const scoreFactors: ScoreFactor[] = [
    buildFactor("Product catalog size", PRODUCT_OPTIONS, answers.products),
    buildFactor("Product variations", VARIATION_OPTIONS, answers.variations),
    buildFactor("Customer accounts", CUSTOMER_OPTIONS, answers.customers),
    buildFactor("Historical order migration", ORDER_OPTIONS, answers.orders),
    buildFactor("Subscriptions / recurring billing", SUBSCRIPTION_OPTIONS, answers.subscriptions),
    buildFactor("Product reviews", REVIEW_OPTIONS, answers.reviews),
    buildFactor("Active WooCommerce plugins", PLUGIN_OPTIONS, answers.plugins),
    buildFactor("Custom code / features", CUSTOM_CODE_OPTIONS, answers.customCode),
    buildFactor("SEO / URL preservation", SEO_OPTIONS, answers.seo),
    buildFactor("Payment integrations", PAYMENT_OPTIONS, answers.payments),
    buildFactor("Shipping integrations", SHIPPING_OPTIONS, answers.shipping),
    buildFactor("Other custom functionality", OTHER_CUSTOM_OPTIONS, answers.otherCustom),
  ];

  const totalPenalty = scoreFactors.reduce((sum, f) => sum + f.penalty, 0);
  const totalMaxPenalty = scoreFactors.reduce((sum, f) => sum + f.maxPenalty, 0);
  const score = Math.max(0, Math.min(100, Math.round(100 - (totalPenalty / totalMaxPenalty) * 100)));

  const label: ReadinessLabel = score >= 75 ? "Ready" : score >= 45 ? "Needs Preparation" : "Complex";
  const complexity: ComplexityLevel = score >= 75 ? "Low" : score >= 45 ? "Medium" : "High";

  const risks: MigrationRisk[] = [];

  if (answers.products === "10000-plus") {
    risks.push({
      id: "products-large",
      category: "general",
      severity: "high",
      title: "Large product catalog (10,000+ products)",
      description:
        "Catalogs this size need a structured, staged import rather than manual entry — plan around Shopify's CSV import tools and variant limits.",
    });
  } else if (answers.products === "1000-10000") {
    risks.push({
      id: "products-mid",
      category: "general",
      severity: "medium",
      title: "Mid-size product catalog (1,000 – 10,000 products)",
      description: "A CSV-based import will work well here, but plan time to QA product data after the import.",
    });
  }

  if (answers.variations === "extensive") {
    risks.push({
      id: "variations-extensive",
      category: "data",
      severity: "medium",
      title: "Extensive product variations",
      description:
        "Shopify allows up to 100 variants per product with up to 3 options — some WooCommerce attribute combinations may need restructuring to fit.",
    });
  }

  if (answers.customers === "50000-plus") {
    risks.push({
      id: "customers-large",
      category: "data",
      severity: "medium",
      title: "Large customer base (50,000+ accounts)",
      description: "Customer accounts migrate well via CSV, but passwords cannot transfer — customers will need to reset theirs on first login.",
    });
  }

  if (answers.orders === "10000-plus") {
    risks.push({
      id: "orders-large",
      category: "data",
      severity: "high",
      title: "Large historical order volume (10,000+ orders)",
      description: "Order history at this scale typically needs a specialized migration app (e.g. Matrixify) rather than Shopify's default CSV import, which doesn't support order import natively.",
    });
  } else if (answers.orders === "1000-10000") {
    risks.push({
      id: "orders-mid",
      category: "data",
      severity: "medium",
      title: "Meaningful order history to migrate (1,000 – 10,000 orders)",
      description: "Shopify's native import doesn't support historical orders — you'll need a migration app or a developer-built import for this data.",
    });
  }

  if (answers.subscriptions === "complex") {
    risks.push({
      id: "subscriptions-complex",
      category: "general",
      severity: "high",
      title: "Complex subscription logic",
      description:
        "Custom intervals, upsells or bundled subscription logic don't map 1:1 to any Shopify app — this typically needs a dedicated migration plan with your subscriptions app provider.",
    });
  } else if (answers.subscriptions === "simple") {
    risks.push({
      id: "subscriptions-simple",
      category: "general",
      severity: "medium",
      title: "Active subscriptions in place",
      description:
        "WooCommerce Subscriptions has no direct Shopify equivalent — you'll need to set up Shopify Subscriptions, Recharge, or a similar app and re-map your existing plans.",
    });
  }

  if (answers.reviews === "thousands") {
    risks.push({
      id: "reviews-large",
      category: "data",
      severity: "low",
      title: "Large volume of reviews to migrate",
      description: "Most Shopify review apps (Judge.me, Loox, etc.) support bulk CSV import, but formatting your existing reviews for that import takes some prep time.",
    });
  }

  if (answers.plugins === "10-plus") {
    risks.push({
      id: "plugins-many",
      category: "plugins",
      severity: "high",
      title: "High plugin dependency (10+ active plugins)",
      description: "Each plugin needs its own Shopify App Store equivalent evaluated individually — not every WooCommerce plugin has a direct match.",
    });
  } else if (answers.plugins === "4-10") {
    risks.push({
      id: "plugins-some",
      category: "plugins",
      severity: "medium",
      title: "Multiple active WooCommerce plugins",
      description: "Worth mapping each plugin to a Shopify app (or native feature) before migrating, so nothing quietly stops working after cutover.",
    });
  }

  if (answers.customCode === "significant") {
    risks.push({
      id: "custom-code-significant",
      category: "plugins",
      severity: "high",
      title: "Significant custom development",
      description: "Bespoke PHP functionality typically has no direct Shopify equivalent and needs to be rebuilt using Shopify's Liquid theme layer or a custom app.",
    });
  } else if (answers.customCode === "minor") {
    risks.push({
      id: "custom-code-minor",
      category: "plugins",
      severity: "medium",
      title: "Custom code present",
      description: "Minor customizations are usually rebuildable in a Shopify theme, but should be scoped by a developer before migration.",
    });
  }

  if (answers.seo === "critical") {
    risks.push({
      id: "seo-critical",
      category: "seo",
      severity: "high",
      title: "SEO rankings are business-critical",
      description:
        "You'll need a full URL redirect map (301s) from your WooCommerce permalinks to their new Shopify equivalents to avoid losing search rankings and traffic.",
    });
  } else if (answers.seo === "important") {
    risks.push({
      id: "seo-important",
      category: "seo",
      severity: "medium",
      title: "SEO preservation is a priority",
      description: "Plan URL redirects for your key landing and product pages, and resubmit your sitemap to Google Search Console after launch.",
    });
  }

  if (answers.payments === "custom") {
    risks.push({
      id: "payments-custom",
      category: "general",
      severity: "medium",
      title: "Non-standard payment gateway",
      description: "Confirm your current payment provider is supported on Shopify Payments or as a third-party gateway before committing to a cutover date.",
    });
  }

  if (answers.shipping === "custom") {
    risks.push({
      id: "shipping-custom",
      category: "general",
      severity: "medium",
      title: "Custom shipping logic",
      description: "Custom rate calculators usually require a Shopify shipping app or a custom carrier service integration to replicate.",
    });
  }

  if (answers.otherCustom === "yes") {
    risks.push({
      id: "other-custom",
      category: "general",
      severity: "high",
      title: "Additional custom functionality reported",
      description: answers.otherCustomDetail
        ? `You noted: "${answers.otherCustomDetail}". This kind of bespoke functionality should be scoped with a developer before migrating.`
        : "This kind of bespoke functionality should be scoped with a developer before migrating, since it likely needs a custom Shopify solution.",
    });
  }

  const mainRisks = risks.filter((r) => r.severity === "high");
  const dataRisks = risks.filter((r) => r.category === "data");
  const seoRisks = risks.filter((r) => r.category === "seo");
  const pluginRisks = risks.filter((r) => r.category === "plugins");

  const nextSteps: string[] = [
    "Export a full backup of your WooCommerce store (products, customers, and orders) before starting anything.",
  ];

  if (answers.products !== "under-100" || answers.orders !== "no") {
    nextSteps.push(
      "Plan a staged data migration using Shopify's bulk import tools or an app like Matrixify, rather than manual entry."
    );
  }
  if (answers.seo === "important" || answers.seo === "critical") {
    nextSteps.push("Build a 301 redirect map from your current URLs to their new Shopify equivalents before launch.");
  }
  if (answers.subscriptions !== "no") {
    nextSteps.push("Choose a Shopify subscriptions app and map your current plans to it before migrating active subscribers.");
  }
  if (answers.plugins === "10-plus" || answers.customCode !== "none" || answers.otherCustom === "yes") {
    nextSteps.push("Get a developer estimate for rebuilding your custom features and plugin-dependent functionality on Shopify.");
  }
  if (answers.payments === "custom") {
    nextSteps.push("Confirm your payment provider is supported on Shopify, or plan a switch, before cutover.");
  }
  if (answers.shipping === "custom") {
    nextSteps.push("Map your current shipping rate logic to a Shopify shipping app or custom carrier service.");
  }
  nextSteps.push("Test your full checkout flow — payments, shipping, and taxes — on Shopify before going live.");
  nextSteps.push("Talk to a Shopify migration specialist to turn this into a concrete project plan and timeline.");

  return {
    score,
    label,
    complexity,
    scoreFactors,
    risks,
    mainRisks,
    dataRisks,
    seoRisks,
    pluginRisks,
    nextSteps,
  };
}
