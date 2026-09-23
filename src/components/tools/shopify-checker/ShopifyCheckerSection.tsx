"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Loader2, AlertTriangle, ChevronRight } from "lucide-react";
import MotionStreaks from "@/components/MotionStreaks";
import ResultsPanel from "./ResultsPanel";
import ResultsCTA from "./ResultsCTA";
import type { CheckerResult } from "@/lib/shopify-checker/analyze";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

type Status = "idle" | "loading" | "error" | "success";

export default function ShopifyCheckerSection() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<Extract<CheckerResult, { ok: true }> | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMessage("Please enter your Shopify store URL.");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);
    setResult(null);

    try {
      const res = await fetch("/api/tools/shopify-speed-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data: CheckerResult = await res.json();

      if (data.ok) {
        setResult(data);
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong on our end. Please try again in a moment.");
    }
  }

  const isLoading = status === "loading";

  return (
    <>
      <section className="relative overflow-hidden bg-(--color-navy-deep) pb-16 pt-20 lg:pb-20 lg:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 85% 0%, #14245c 0%, #0b1c4d 45%, #060d24 100%)",
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
            <span className="text-white/80">Shopify Speed Checker</span>
          </motion.nav>

          <motion.span
            variants={fadeUp}
            className="mt-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-(--color-cyan-soft)"
          >
            Free Shopify Tool
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-[32px] font-extrabold leading-[1.15] tracking-[-0.01em] text-white sm:text-[42px] lg:text-[48px]"
          >
            Free Shopify Speed Checker &amp; App Bloat Detector
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70"
          >
            Enter any public Shopify store URL to run a real Shopify store
            speed test. See server response time, render-blocking scripts,
            and which apps are actually loading — so you can find out why
            your Shopify store is slow and fix it. No login required.
          </motion.p>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="mx-auto mt-9 flex max-w-xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm sm:flex-row"
          >
            <label htmlFor="shopify-url" className="sr-only">
              Shopify store URL
            </label>
            <input
              id="shopify-url"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="yourstore.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3.5 text-[15px] text-(--color-ink) placeholder:text-(--color-ink-soft)/60 focus:outline-none focus:ring-2 focus:ring-(--color-cyan)/60 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-(--color-blue) px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-(--color-ink) disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  Check My Store
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </motion.form>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto mt-4 h-1 max-w-xl overflow-hidden rounded-full bg-white/10"
            >
              <motion.div
                className="h-full w-1/3 rounded-full bg-(--color-cyan)"
                animate={{ x: ["-100%", "260%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}

          {status === "error" && errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-5 flex max-w-xl items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-left text-[13.5px] text-red-100"
            >
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          <p className="mt-5 text-[12.5px] text-white/40">
            No Shopify admin access needed — we only look at what&apos;s publicly visible on your storefront.
          </p>
        </motion.div>
      </section>

      {status === "success" && result && (
        <section className="bg-(--color-surface) px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <ResultsPanel result={result} />
            <ResultsCTA />
          </div>
        </section>
      )}
    </>
  );
}
