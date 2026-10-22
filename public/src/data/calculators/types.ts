export type CalcCategoryId = "financial" | "health" | "math" | "other";

export type CalcGroup =
  | "Financial"
  | "Fitness & health"
  | "General maths"
  | "Statistics & probability"
  | "Geometry"
  | "Everyday"
  | "Dates & units";

export type SearchIntent = "calculate" | "convert" | "learn-and-calculate" | "plan";

/** Light keyword/topic planning only. Full SEO work is a later phase. */
export type KeywordPlan = {
  primary: string;
  secondary: string[];
  intent: SearchIntent;
  tags: string[];
};

export type CalcMeta = {
  slug: string;
  name: string;
  category: CalcCategoryId;
  group: CalcGroup;
  /** Key into the icon map in icons.ts. */
  icon: string;
  /** One or two original sentences for cards and meta description. */
  short: string;
  /** Exact Calculator.net page used as a functional reference. */
  reference: string;
  keywords: KeywordPlan;
};

export type CalcContent = {
  /** Opening paragraphs: what it does. */
  intro: string[];
  whoFor: string[];
  inputs: { name: string; text: string }[];
  how: string[];
  formulas?: { label: string; expr: string }[];
  interpret: string[];
  example: { setup: string; steps: string[]; result: string };
  useCases: string[];
  limitations: string[];
  faqs: { question: string; answer: string }[];
  /** Shown above the article for health tools. */
  disclaimer?: string;
};

export const CATEGORY_INFO: Record<CalcCategoryId, { id: CalcCategoryId; title: string; blurb: string; anchor: string }> = {
  financial: {
    id: "financial",
    title: "Financial Calculators",
    blurb: "Loans, mortgages, interest, returns and VAT: plan the numbers before you commit.",
    anchor: "financial-calculators",
  },
  health: {
    id: "health",
    title: "Fitness & Health Calculators",
    blurb: "BMI, energy needs, body fat and heart-rate zones for general wellness planning.",
    anchor: "fitness-and-health-calculators",
  },
  math: {
    id: "math",
    title: "Math Calculators",
    blurb: "Algebra, number theory, statistics and geometry tools with the working shown.",
    anchor: "math-calculators",
  },
  other: {
    id: "other",
    title: "Other Calculators",
    blurb: "Dates, ages, tips, fuel costs and unit conversion for everyday questions.",
    anchor: "other-calculators",
  },
};
