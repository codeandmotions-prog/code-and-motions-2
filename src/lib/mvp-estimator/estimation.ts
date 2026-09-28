/**
 * Deterministic SaaS / software MVP cost & timeline estimation.
 *
 * This is a self-reported project assessment, not a quote — there is no
 * network call here. Every number in the output is a pure function of the
 * answers the user actually selected: the same answers always produce the
 * same estimate. Nothing is random, and nothing is presented as an exact
 * or guaranteed price — the output is always framed as a range.
 */

export type ProjectType = "web" | "saas" | "mobile";
export type AuthLevel = "none" | "basic" | "advanced";
export type UserRoles = "single" | "multiple" | "complex";
export type DashboardLevel = "none" | "simple" | "advanced";
export type AdminPanelLevel = "no" | "basic" | "advanced";
export type PaymentsLevel = "none" | "one-time" | "subscriptions";
export type ApiIntegrationLevel = "none" | "few" | "many";
export type DataComplexity = "simple" | "moderate" | "complex";
export type AiFeatureLevel = "none" | "basic" | "advanced";
export type NotificationLevel = "none" | "email" | "multi";
export type UploadLevel = "none" | "basic" | "advanced";
export type ThirdPartyLevel = "none" | "few" | "many";
export type DesignComplexity = "simple" | "custom" | "highly-custom";
export type FeatureCount = "under-5" | "5-10" | "10-plus";
export type CustomFunctionality = "none" | "some" | "highly-custom";
export type PlatformPreference = "no-preference" | "specific-common" | "specific-uncommon";

export type MvpAnswers = {
  projectType: ProjectType;
  auth: AuthLevel;
  userRoles: UserRoles;
  dashboard: DashboardLevel;
  adminPanel: AdminPanelLevel;
  payments: PaymentsLevel;
  apiIntegrations: ApiIntegrationLevel;
  dataComplexity: DataComplexity;
  aiFeatures: AiFeatureLevel;
  notifications: NotificationLevel;
  uploads: UploadLevel;
  thirdPartyIntegrations: ThirdPartyLevel;
  designComplexity: DesignComplexity;
  featureCount: FeatureCount;
  customFunctionality: CustomFunctionality;
  platformPreference: PlatformPreference;
};

type Option<V extends string> = { value: V; label: string; points: number };

function options<V extends string>(list: Option<V>[]): Option<V>[] {
  return list;
}

export const PROJECT_TYPE_OPTIONS = options<ProjectType>([
  { value: "web", label: "Web app", points: 0 },
  { value: "saas", label: "SaaS / multi-tenant platform", points: 4 },
  { value: "mobile", label: "Mobile app (iOS / Android)", points: 6 },
]);

export const AUTH_OPTIONS = options<AuthLevel>([
  { value: "none", label: "No login required", points: 0 },
  { value: "basic", label: "Basic (email & password)", points: 2 },
  { value: "advanced", label: "Advanced (SSO, 2FA, social login)", points: 6 },
]);

export const USER_ROLES_OPTIONS = options<UserRoles>([
  { value: "single", label: "Single user type", points: 0 },
  { value: "multiple", label: "Multiple roles (e.g. admin + user)", points: 3 },
  { value: "complex", label: "Complex permission system (granular RBAC)", points: 7 },
]);

export const DASHBOARD_OPTIONS = options<DashboardLevel>([
  { value: "none", label: "No dashboard", points: 0 },
  { value: "simple", label: "Simple dashboard", points: 3 },
  { value: "advanced", label: "Advanced analytics dashboard", points: 8 },
]);

export const ADMIN_PANEL_OPTIONS = options<AdminPanelLevel>([
  { value: "no", label: "No admin panel", points: 0 },
  { value: "basic", label: "Yes — basic", points: 4 },
  { value: "advanced", label: "Yes — advanced custom tooling", points: 9 },
]);

export const PAYMENTS_OPTIONS = options<PaymentsLevel>([
  { value: "none", label: "No payments", points: 0 },
  { value: "one-time", label: "One-time payments", points: 4 },
  { value: "subscriptions", label: "Recurring subscriptions / billing plans", points: 9 },
]);

export const API_INTEGRATION_OPTIONS = options<ApiIntegrationLevel>([
  { value: "none", label: "No API needed", points: 0 },
  { value: "few", label: "A basic API (a few endpoints)", points: 3 },
  { value: "many", label: "An extensive / public API", points: 8 },
]);

export const DATA_COMPLEXITY_OPTIONS = options<DataComplexity>([
  { value: "simple", label: "Simple (basic CRUD data)", points: 2 },
  { value: "moderate", label: "Moderate (multiple related entities)", points: 5 },
  { value: "complex", label: "Complex (large scale / complex relationships)", points: 10 },
]);

export const AI_FEATURE_OPTIONS = options<AiFeatureLevel>([
  { value: "none", label: "No AI features", points: 0 },
  { value: "basic", label: "Basic (a single AI-powered feature)", points: 5 },
  { value: "advanced", label: "Advanced (custom AI/ML pipeline)", points: 12 },
]);

export const NOTIFICATION_OPTIONS = options<NotificationLevel>([
  { value: "none", label: "No notifications", points: 0 },
  { value: "email", label: "Email only", points: 2 },
  { value: "multi", label: "Email + push/SMS/in-app", points: 6 },
]);

export const UPLOAD_OPTIONS = options<UploadLevel>([
  { value: "none", label: "No file/media uploads", points: 0 },
  { value: "basic", label: "Basic (images/documents)", points: 3 },
  { value: "advanced", label: "Advanced (video/large files, processing)", points: 8 },
]);

export const THIRD_PARTY_OPTIONS = options<ThirdPartyLevel>([
  { value: "none", label: "No third-party integrations", points: 0 },
  { value: "few", label: "A few (1–3 services, e.g. Stripe, Mailchimp)", points: 3 },
  { value: "many", label: "Many (4+ services)", points: 8 },
]);

export const DESIGN_COMPLEXITY_OPTIONS = options<DesignComplexity>([
  { value: "simple", label: "Simple / template-based", points: 2 },
  { value: "custom", label: "Custom UI design", points: 6 },
  { value: "highly-custom", label: "Highly custom, animated/branded UI", points: 11 },
]);

export const FEATURE_COUNT_OPTIONS = options<FeatureCount>([
  { value: "under-5", label: "Under 5 major features", points: 3 },
  { value: "5-10", label: "5 – 10 major features", points: 8 },
  { value: "10-plus", label: "10+ major features", points: 15 },
]);

export const CUSTOM_FUNCTIONALITY_OPTIONS = options<CustomFunctionality>([
  { value: "none", label: "No custom business logic", points: 0 },
  { value: "some", label: "Some custom business logic", points: 5 },
  { value: "highly-custom", label: "Highly custom / complex logic", points: 12 },
]);

export const PLATFORM_PREFERENCE_OPTIONS = options<PlatformPreference>([
  { value: "no-preference", label: "No preference — recommend a stack", points: 0 },
  { value: "specific-common", label: "A specific, common stack (e.g. React/Node)", points: 1 },
  { value: "specific-uncommon", label: "A specific, less common/niche stack", points: 4 },
]);

function pointsFor<V extends string>(list: Option<V>[], value: V): number {
  return list.find((o) => o.value === value)?.points ?? 0;
}
function labelFor<V extends string>(list: Option<V>[], value: V): string {
  return list.find((o) => o.value === value)?.label ?? String(value);
}
function maxPoints<V extends string>(list: Option<V>[]): number {
  return Math.max(...list.map((o) => o.points));
}

export type ComplexityLevel = "Low" | "Medium" | "High" | "Very High";
export type ImpactLevel = "high" | "medium" | "low";

export type EffortFactor = { label: string; value: string; points: number; maxPoints: number };

export type CostDriver = {
  id: string;
  impact: ImpactLevel;
  title: string;
  description: string;
};

export type MvpEstimate = {
  totalPoints: number;
  maxPoints: number;
  complexity: ComplexityLevel;
  costMin: number;
  costMax: number;
  timelineMinWeeks: number;
  timelineMaxWeeks: number;
  effortFactors: EffortFactor[];
  costDrivers: CostDriver[];
  considerations: string[];
  priorities: string[];
  increaseFactors: string[];
  decreaseFactors: string[];
};

function buildFactor<V extends string>(label: string, list: Option<V>[], value: V): EffortFactor {
  return {
    label,
    value: labelFor(list, value),
    points: pointsFor(list, value),
    maxPoints: maxPoints(list),
  };
}

const FIELD_LABELS = {
  projectType: "Project type",
  auth: "User authentication",
  userRoles: "User roles",
  dashboard: "Dashboard",
  adminPanel: "Admin panel",
  payments: "Payments / subscriptions",
  apiIntegrations: "API integrations",
  dataComplexity: "Database / data requirements",
  aiFeatures: "AI features",
  notifications: "Notifications",
  uploads: "File / media uploads",
  thirdPartyIntegrations: "Third-party integrations",
  designComplexity: "Design / UI complexity",
  featureCount: "Number of major features",
  customFunctionality: "Custom functionality",
  platformPreference: "Preferred platform / technology",
} as const;

export function calculateMvpEstimate(answers: MvpAnswers): MvpEstimate {
  const effortFactors: EffortFactor[] = [
    buildFactor(FIELD_LABELS.projectType, PROJECT_TYPE_OPTIONS, answers.projectType),
    buildFactor(FIELD_LABELS.auth, AUTH_OPTIONS, answers.auth),
    buildFactor(FIELD_LABELS.userRoles, USER_ROLES_OPTIONS, answers.userRoles),
    buildFactor(FIELD_LABELS.dashboard, DASHBOARD_OPTIONS, answers.dashboard),
    buildFactor(FIELD_LABELS.adminPanel, ADMIN_PANEL_OPTIONS, answers.adminPanel),
    buildFactor(FIELD_LABELS.payments, PAYMENTS_OPTIONS, answers.payments),
    buildFactor(FIELD_LABELS.apiIntegrations, API_INTEGRATION_OPTIONS, answers.apiIntegrations),
    buildFactor(FIELD_LABELS.dataComplexity, DATA_COMPLEXITY_OPTIONS, answers.dataComplexity),
    buildFactor(FIELD_LABELS.aiFeatures, AI_FEATURE_OPTIONS, answers.aiFeatures),
    buildFactor(FIELD_LABELS.notifications, NOTIFICATION_OPTIONS, answers.notifications),
    buildFactor(FIELD_LABELS.uploads, UPLOAD_OPTIONS, answers.uploads),
    buildFactor(FIELD_LABELS.thirdPartyIntegrations, THIRD_PARTY_OPTIONS, answers.thirdPartyIntegrations),
    buildFactor(FIELD_LABELS.designComplexity, DESIGN_COMPLEXITY_OPTIONS, answers.designComplexity),
    buildFactor(FIELD_LABELS.featureCount, FEATURE_COUNT_OPTIONS, answers.featureCount),
    buildFactor(FIELD_LABELS.customFunctionality, CUSTOM_FUNCTIONALITY_OPTIONS, answers.customFunctionality),
    buildFactor(FIELD_LABELS.platformPreference, PLATFORM_PREFERENCE_OPTIONS, answers.platformPreference),
  ];

  const totalPoints = effortFactors.reduce((sum, f) => sum + f.points, 0);
  const maxPointsTotal = effortFactors.reduce((sum, f) => sum + f.maxPoints, 0);

  const complexity: ComplexityLevel =
    totalPoints <= 25 ? "Low" : totalPoints <= 55 ? "Medium" : totalPoints <= 90 ? "High" : "Very High";

  // Transparent, disclosed formula: a fixed base plus a per-point rate.
  // This is an estimate range, never an exact or guaranteed price.
  const costMin = Math.round((6000 + totalPoints * 550) / 500) * 500;
  const costMax = Math.round((9000 + totalPoints * 850) / 500) * 500;
  const timelineMinWeeks = Math.max(3, Math.round(3 + totalPoints * 0.35));
  const timelineMaxWeeks = Math.max(timelineMinWeeks + 2, Math.round(5 + totalPoints * 0.55));

  const costDrivers: CostDriver[] = effortFactors
    .filter((f) => f.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 5)
    .map((f) => {
      const ratio = f.maxPoints > 0 ? f.points / f.maxPoints : 0;
      const impact: ImpactLevel = ratio >= 0.7 ? "high" : ratio >= 0.35 ? "medium" : "low";
      return {
        id: f.label,
        impact,
        title: `${f.label}: ${f.value}`,
        description: costDriverNote(f.label),
      };
    });

  const considerations: string[] = [];
  if (answers.aiFeatures === "advanced") {
    considerations.push(
      "Advanced AI features typically involve ongoing model/API usage costs on top of the one-time build cost — budget for this separately."
    );
  } else if (answers.aiFeatures === "basic") {
    considerations.push(
      "Even a single AI feature needs a plan for API costs, rate limits, and fallback behavior if the AI service is unavailable."
    );
  }
  if (answers.payments === "subscriptions") {
    considerations.push(
      "Recurring billing needs dunning (failed-payment recovery), proration, and plan-change logic — usually more work than a one-time checkout."
    );
  }
  if (answers.projectType === "mobile") {
    considerations.push(
      "A mobile app usually means building for iOS and Android (natively or with a cross-platform framework), plus time for app store review on both platforms."
    );
  }
  if (answers.adminPanel === "advanced") {
    considerations.push("A fully custom admin panel is often underestimated — budget real time for it, not just the customer-facing product.");
  }
  if (answers.dataComplexity === "complex") {
    considerations.push("Complex data models benefit from schema planning up front — retrofitting a data model after launch is expensive.");
  }
  if (answers.userRoles === "complex") {
    considerations.push("Granular permission systems (RBAC) add real QA time, since every role combination needs testing.");
  }
  if (answers.thirdPartyIntegrations === "many" || answers.apiIntegrations === "many") {
    considerations.push(
      "Each third-party integration adds ongoing maintenance risk if that provider changes their API — factor in monitoring, not just the initial build."
    );
  }
  if (answers.designComplexity === "highly-custom") {
    considerations.push(
      "Highly custom, animated UI usually needs a dedicated design phase before development starts, which extends the timeline shown above."
    );
  }
  if (considerations.length === 0) {
    considerations.push("Your scope looks fairly standard — a conventional build process should cover this without major surprises.");
  }

  const priorities: string[] = [];
  if (answers.featureCount === "10-plus") {
    priorities.push(
      "You've listed 10+ major features — for a true MVP, consider shipping with your top 3–5 core features and adding the rest post-launch based on real user feedback."
    );
  }
  if (answers.adminPanel === "advanced" || answers.dashboard === "advanced") {
    priorities.push(
      "Consider launching with basic admin/reporting tools first, and investing in advanced analytics once you have real usage data to design around."
    );
  }
  if (answers.aiFeatures === "advanced") {
    priorities.push("AI features are easy to over-scope — start with one well-defined AI feature that solves a clear user problem, rather than several at once.");
  }
  if (answers.userRoles === "complex") {
    priorities.push("Launch with 2–3 essential roles and add finer-grained permissions once you understand how customers actually use the product.");
  }
  if (answers.customFunctionality === "highly-custom") {
    priorities.push("Isolate your most complex custom logic as its own phase so it doesn't block the rest of the MVP from shipping.");
  }
  if (answers.payments === "none") {
    priorities.push("If you haven't decided on monetization yet, it's worth defining pricing before development starts — it can affect the data model.");
  }
  priorities.push("Validate your core value proposition with real users before investing in every feature on your list.");

  const increaseFactors: string[] = [
    "Adding features or requirements beyond what's listed in this assessment.",
    "Requiring pixel-perfect, fully bespoke design rather than a proven UI pattern.",
    "Needing multi-language or multi-currency support at launch.",
    "Integrating with legacy, undocumented, or unstable third-party systems.",
  ];

  const decreaseFactors: string[] = [
    "Launching with a narrower feature set — a true MVP scope, not the full product vision.",
    "Using a proven starter kit or template instead of a fully custom design.",
    "Deferring advanced integrations or AI features to a later phase.",
    "Reducing the number of user roles and permission levels at launch.",
  ];

  return {
    totalPoints,
    maxPoints: maxPointsTotal,
    complexity,
    costMin,
    costMax,
    timelineMinWeeks,
    timelineMaxWeeks,
    effortFactors,
    costDrivers,
    considerations,
    priorities,
    increaseFactors,
    decreaseFactors,
  };
}

function costDriverNote(fieldLabel: string): string {
  const notes: Record<string, string> = {
    [FIELD_LABELS.projectType]: "Platform choice affects how many codebases need to be built and maintained.",
    [FIELD_LABELS.auth]: "Advanced auth (SSO, 2FA, social login) adds real setup and testing time.",
    [FIELD_LABELS.userRoles]: "More roles means more permission logic and more combinations to test.",
    [FIELD_LABELS.dashboard]: "Analytics dashboards need both backend aggregation and frontend visualization work.",
    [FIELD_LABELS.adminPanel]: "Custom admin tooling is a second, often-underestimated application in itself.",
    [FIELD_LABELS.payments]: "Billing logic — plans, proration, failed payments — is a common source of hidden effort.",
    [FIELD_LABELS.apiIntegrations]: "A public or extensive API needs its own documentation, versioning, and testing.",
    [FIELD_LABELS.dataComplexity]: "Complex data models take longer to design, migrate, and query efficiently.",
    [FIELD_LABELS.aiFeatures]: "AI features add integration work plus ongoing model/API costs.",
    [FIELD_LABELS.notifications]: "Multi-channel notifications need their own delivery and preference logic.",
    [FIELD_LABELS.uploads]: "Large file/media handling adds storage, processing, and delivery considerations.",
    [FIELD_LABELS.thirdPartyIntegrations]: "Each integration is ongoing maintenance surface, not just a one-time build.",
    [FIELD_LABELS.designComplexity]: "Highly custom, animated UI takes longer to design and build than a proven pattern.",
    [FIELD_LABELS.featureCount]: "More major features directly means more screens, logic, and QA coverage.",
    [FIELD_LABELS.customFunctionality]: "Bespoke business logic can't be sped up with off-the-shelf components.",
    [FIELD_LABELS.platformPreference]: "A less common stack can mean a longer ramp-up for the development team.",
  };
  return notes[fieldLabel] ?? "This selection adds meaningful scope to the build.";
}
