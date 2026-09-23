"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight, Loader2, ClipboardList } from "lucide-react";
import MotionStreaks from "@/components/MotionStreaks";
import ResultsModal from "@/components/shared/ResultsModal";
import MigrationResultsContent from "./MigrationResultsContent";
import {
  calculateMigrationReadiness,
  PRODUCT_OPTIONS,
  VARIATION_OPTIONS,
  CUSTOMER_OPTIONS,
  ORDER_OPTIONS,
  SUBSCRIPTION_OPTIONS,
  REVIEW_OPTIONS,
  PLUGIN_OPTIONS,
  CUSTOM_CODE_OPTIONS,
  SEO_OPTIONS,
  PAYMENT_OPTIONS,
  SHIPPING_OPTIONS,
  OTHER_CUSTOM_OPTIONS,
  type MigrationAnswers,
  type MigrationResult,
} from "@/lib/migration-checker/scoring";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const defaultAnswers: MigrationAnswers = {
  products: "under-100",
  variations: "none",
  customers: "under-500",
  orders: "no",
  subscriptions: "no",
  reviews: "no",
  plugins: "0-3",
  customCode: "none",
  seo: "important",
  payments: "standard",
  shipping: "standard",
  otherCustom: "no",
  otherCustomDetail: "",
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

export default function MigrationAssessmentSection() {
  const [answers, setAnswers] = useState<MigrationAnswers>(defaultAnswers);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<MigrationResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function update<K extends keyof MigrationAnswers>(key: K, value: MigrationAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsCalculating(true);
    // Brief, honest UI transition only — the calculation itself is instant
    // and runs entirely from the answers above (no network call, nothing
    // random or invented).
    window.setTimeout(() => {
      const computed = calculateMigrationReadiness(answers);
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
            <span className="text-white/80">Migration Readiness Checker</span>
          </motion.nav>

          <motion.span
            variants={fadeUp}
            className="mt-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan-soft)"
          >
            Free Migration Tool
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-[32px] font-extrabold leading-[1.15] tracking-[-0.01em] text-white sm:text-[42px] lg:text-[48px]"
          >
            Free WooCommerce to Shopify Migration Readiness Checker
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70"
          >
            Answer a few questions about your WooCommerce store and get a real
            Shopify migration readiness score — main risks, data and SEO
            considerations, and a clear next-steps plan. Free, instant, no
            signup required.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9">
            <Link
              href="#assessment-form"
              className="group inline-flex items-center gap-2 rounded-full bg-(--color-blue) px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink)"
            >
              Start Free Assessment
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section id="assessment-form" className="scroll-mt-24 bg-(--color-surface) px-6 py-16 lg:px-10 lg:py-20">
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
              <ClipboardList size={20} strokeWidth={1.9} />
            </span>
            <div>
              <h2 className="text-[20px] font-extrabold text-(--color-ink)">Migration Readiness Assessment</h2>
              <p className="text-[13.5px] text-(--color-ink-soft)">
                12 quick questions about your store — takes about 2 minutes.
              </p>
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-(--color-blue)">
              Your Catalog
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField label="Products" value={answers.products} onChange={(v) => update("products", v)} options={PRODUCT_OPTIONS} />
              <SelectField label="Product variations" value={answers.variations} onChange={(v) => update("variations", v)} options={VARIATION_OPTIONS} />
              <SelectField label="Customers" value={answers.customers} onChange={(v) => update("customers", v)} options={CUSTOMER_OPTIONS} />
            </div>
          </fieldset>

          <fieldset className="mt-8 border-t border-(--color-line) pt-8">
            <legend className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-(--color-blue)">
              Orders, Subscriptions &amp; Reviews
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField label="Orders (migrate history?)" value={answers.orders} onChange={(v) => update("orders", v)} options={ORDER_OPTIONS} />
              <SelectField label="Subscriptions" value={answers.subscriptions} onChange={(v) => update("subscriptions", v)} options={SUBSCRIPTION_OPTIONS} />
              <SelectField label="Reviews" value={answers.reviews} onChange={(v) => update("reviews", v)} options={REVIEW_OPTIONS} />
            </div>
          </fieldset>

          <fieldset className="mt-8 border-t border-(--color-line) pt-8">
            <legend className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-(--color-blue)">
              Plugins &amp; Custom Code
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField label="WooCommerce plugins" value={answers.plugins} onChange={(v) => update("plugins", v)} options={PLUGIN_OPTIONS} />
              <SelectField label="Custom code / features" value={answers.customCode} onChange={(v) => update("customCode", v)} options={CUSTOM_CODE_OPTIONS} />
              <SelectField label="Other custom functionality" value={answers.otherCustom} onChange={(v) => update("otherCustom", v)} options={OTHER_CUSTOM_OPTIONS} />
            </div>
            {answers.otherCustom === "yes" && (
              <motion.label
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-5 flex flex-col gap-2"
              >
                <span className="text-[13.5px] font-semibold text-(--color-ink)">
                  Briefly describe it (optional)
                </span>
                <textarea
                  value={answers.otherCustomDetail}
                  onChange={(e) => update("otherCustomDetail", e.target.value)}
                  placeholder="e.g. a custom wholesale portal, a booking system, a loyalty program..."
                  className="min-h-[80px] w-full resize-none rounded-xl border border-(--color-line) bg-white px-4 py-3 text-[14.5px] text-(--color-ink) outline-none transition-colors focus:border-(--color-blue)"
                />
              </motion.label>
            )}
          </fieldset>

          <fieldset className="mt-8 border-t border-(--color-line) pt-8">
            <legend className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-(--color-blue)">
              SEO &amp; Integrations
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField label="SEO / URL preservation" value={answers.seo} onChange={(v) => update("seo", v)} options={SEO_OPTIONS} />
              <SelectField label="Payment integrations" value={answers.payments} onChange={(v) => update("payments", v)} options={PAYMENT_OPTIONS} />
              <SelectField label="Shipping integrations" value={answers.shipping} onChange={(v) => update("shipping", v)} options={SHIPPING_OPTIONS} />
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
                Get My Migration Readiness Score
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
          <p className="mt-4 text-[12.5px] text-(--color-ink-soft)">
            Your score is calculated instantly from your answers above — no data is sent anywhere.
          </p>
        </motion.form>
      </section>

      {result && (
        <ResultsModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="WooCommerce to Shopify Migration Readiness Report"
        >
          <MigrationResultsContent result={result} />
        </ResultsModal>
      )}
    </>
  );
}
