"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#07111f] text-white">
      <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[120px]" />
      <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <Sparkles size={16} className="text-cyan-400" />
              Design • Development • Growth
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Design.
              <br />
              Develop.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Grow.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">
              Code &amp; Motions is a full-service digital agency helping
              businesses build powerful websites, custom software, Shopify
              stores, creative visuals, and digital growth strategies.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-[#07111f] transition hover:bg-cyan-300"
              >
                Start a Project
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/services"
                className="rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                Code &amp; Motions
              </p>

              <h2 className="mt-6 text-3xl font-semibold leading-tight">
                One team for
                <br />
                digital transformation.
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  "Software",
                  "Web Development",
                  "Shopify",
                  "Animation",
                  "Graphic Design",
                  "SEO",
                ].map((service) => (
                  <div
                    key={service}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/70"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
