"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight, Loader2, Calculator } from "lucide-react";
import MotionStreaks from "@/components/MotionStreaks";
import ResultsModal from "@/components/shared/ResultsModal";
import MvpResultsContent from "./MvpResultsContent";
import {
  calculateMvpEstimate,
  PROJECT_TYPE_OPTIONS,
  AUTH_OPTIONS,
  USER_ROLES_OPTIONS,
  DASHBOARD_OPTIONS,
  ADMIN_PANEL_OPTIONS,
  PAYMENTS_OPTIONS,
  API_INTEGRATION_OPTIONS,
  DATA_COMPLEXITY_OPTIONS,
  AI_FEATURE_OPTIONS,
  NOTIFICATION_OPTIONS,
  UPLOAD_OPTIONS,
  THIRD_PARTY_OPTIONS,
  DESIGN_COMPLEXITY_OPTIONS,
  FEATURE_COUNT_OPTIONS,
  CUSTOM_FUNCTIONALITY_OPTIONS,
  PLATFORM_PREFERENCE_OPTIONS,
  type MvpAnswers,
  type MvpEstimate,
} from "@/lib/mvp-estimator/estimation";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const defaultAnswers: MvpAnswers = {
  projectType: "web",
  auth: "basic",
  userRoles: "single",
  dashboard: "none",
  adminPanel: "no",
  payments: "none",
  apiIntegrations: "none",
  dataComplexity: "simple",
  aiFeatures: "none",
  notifications: "none",
  uploads: "none",
  thirdPartyIntegrations: "none",
  designComplexity: "simple",
  featureCount: "under-5",
  customFunctionality: "none",
  platformPreference: "no-preference",
};

const selectClasses =
  "w-full appearance-none rounded-xl border border-(--color-line) bg-white px-4 py-3 text-[14.5px] text-(--color-ink) outline-none transition-colors focus:border-(--color-blue)";

function SelectField<V extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: V;
  onChange: (value: V) => void;
  options: { value: V; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13.5px] font-semibold text-(--color-ink)">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as V)} className={selectClasses}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function MvpEstimatorSection() {
  const [answers, setAnswers] = useState<MvpAnswers>(defaultAnswers);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<MvpEstimate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function update<K extends keyof MvpAnswers>(key: K, value: MvpAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsCalculating(true);
    // Brief, honest UI transition only — the calculation itself is instant
    // and runs entirely from the answers above (no network call, nothing
    // random or invented).
    window.setTimeout(() => {
      const computed = calculateMvpEstimate(answers);
      setResult(computed);
      setIsCalculating(false);
      setIsModalOpen(true);
    }, 450);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-(--color-navy-deep) pb-16 pt-20 lg:pb-20 lg:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(120% 100% at 85% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
          }}
        />
        <MotionStreaks className="pointer-events-none absolute -left-20 top-4 h-72 w-72 -scale-x-100 opacity-25 lg:h-96 lg:w-96 lg:opacity-30" />
        <MotionStreaks className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rotate-180 opacity-[0.12] lg:h-80 lg:w-80" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-3xl px-6 text-center lg:px-10"
        >
          <motion.nav
            variants={fadeUp}
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-white/50"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/tools" className="transition-colors hover:text-white">
              Free Tools
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/80">MVP Cost Estimator</span>
          </motion.nav>

          <motion.span
            variants={fadeUp}
            className="mt-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan-soft)"
          >
            Free Estimator
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-[32px] font-extrabold leading-[1.15] tracking-[-0.01em] text-white sm:text-[42px] lg:text-[48px]"
          >
            Free SaaS MVP Cost &amp; Timeline Estimator
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70"
          >
            Answer a few questions about your project and get a real cost and
            timeline range for building your SaaS or software MVP — major
            cost drivers, key considerations, and recommended priorities.
            Free, instant, no signup required.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9">
            <Link
              href="#estimate-form"
              className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
            >
              Start Free Estimate
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section id="estimate-form" className="scroll-mt-24 bg-(--color-surface) px-6 py-16 lg:px-10 lg:py-20">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mx-auto max-w-3xl rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-35px_rgba(11,28,77,0.25)] sm:p-9"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-blue)/10 text-(--color-blue)">
              <Calculator size={20} strokeWidth={1.9} />
            </span>
            <div>
              <h2 className="text-[20px] font-extrabold text-(--color-ink)">MVP Cost &amp; Timeline Estimate</h2>
              <p className="text-[13.5px] text-(--color-ink-soft)">
                16 quick questions about your project — takes about 3 minutes.
              </p>
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-(--color-blue)">
              Project Basics
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField label="Project type" value={answers.projectType} onChange={(v) => update("projectType", v)} options={PROJECT_TYPE_OPTIONS} />
              <SelectField label="Design / UI complexity" value={answers.designComplexity} onChange={(v) => update("designComplexity", v)} options={DESIGN_COMPLEXITY_OPTIONS} />
              <SelectField label="Number of major features" value={answers.featureCount} onChange={(v) => update("featureCount", v)} options={FEATURE_COUNT_OPTIONS} />
            </div>
          </fieldset>

          <fieldset className="mt-8 border-t border-(--color-line) pt-8">
            <legend className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-(--color-blue)">
              Users &amp; Access
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField label="User authentication" value={answers.auth} onChange={(v) => update("auth", v)} options={AUTH_OPTIONS} />
              <SelectField label="User roles" value={answers.userRoles} onChange={(v) => update("userRoles", v)} options={USER_ROLES_OPTIONS} />
              <SelectField label="Admin panel" value={answers.adminPanel} onChange={(v) => update("adminPanel", v)} options={ADMIN_PANEL_OPTIONS} />
            </div>
          </fieldset>

          <fieldset className="mt-8 border-t border-(--color-line) pt-8">
            <legend className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-(--color-blue)">
              Core Features
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField label="Dashboard" value={answers.dashboard} onChange={(v) => update("dashboard", v)} options={DASHBOARD_OPTIONS} />
              <SelectField label="Payments / subscriptions" value={answers.payments} onChange={(v) => update("payments", v)} options={PAYMENTS_OPTIONS} />
              <SelectField label="AI features" value={answers.aiFeatures} onChange={(v) => update("aiFeatures", v)} options={AI_FEATURE_OPTIONS} />
              <SelectField label="Custom functionality" value={answers.customFunctionality} onChange={(v) => update("customFunctionality", v)} options={CUSTOM_FUNCTIONALITY_OPTIONS} />
            </div>
          </fieldset>

          <fieldset className="mt-8 border-t border-(--color-line) pt-8">
            <legend className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-(--color-blue)">
              Data &amp; Integrations
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField label="Database / data requirements" value={answers.dataComplexity} onChange={(v) => update("dataComplexity", v)} options={DATA_COMPLEXITY_OPTIONS} />
              <SelectField label="API integrations" value={answers.apiIntegrations} onChange={(v) => update("apiIntegrations", v)} options={API_INTEGRATION_OPTIONS} />
              <SelectField label="Third-party integrations" value={answers.thirdPartyIntegrations} onChange={(v) => update("thirdPartyIntegrations", v)} options={THIRD_PARTY_OPTIONS} />
            </div>
          </fieldset>

          <fieldset className="mt-8 border-t border-(--color-line) pt-8">
            <legend className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-(--color-blue)">
              Extras
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField label="Notifications" value={answers.notifications} onChange={(v) => update("notifications", v)} options={NOTIFICATION_OPTIONS} />
              <SelectField label="File / media uploads" value={answers.uploads} onChange={(v) => update("uploads", v)} options={UPLOAD_OPTIONS} />
              <SelectField label="Preferred platform / technology" value={answers.platformPreference} onChange={(v) => update("platformPreference", v)} options={PLATFORM_PREFERENCE_OPTIONS} />
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isCalculating}
            className="group mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-blue) py-4 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-ink) disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-10"
          >
            {isCalculating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Calculating…
              </>
            ) : (
              <>
                Get My Cost &amp; Timeline Estimate
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
          <p className="mt-4 text-[12.5px] text-(--color-ink-soft)">
            Your estimate is calculated instantly from your answers above — an estimated range, not a guaranteed
            quote. No data is sent anywhere.
          </p>
        </motion.form>
      </section>

      {result && (
        <ResultsModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="SaaS MVP Cost & Timeline Estimate"
        >
          <MvpResultsContent result={result} />
        </ResultsModal>
      )}
    </>
  );
}
