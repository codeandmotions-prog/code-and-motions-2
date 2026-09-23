"use client";

import { useState, useId, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const inputClasses =
  "w-full rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3.5 text-[14.5px] text-white placeholder:text-white/45 outline-none transition-colors focus:border-white/40 focus:bg-white/[0.12]";

export default function HeroProjectCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email and a short project note.");
      return;
    }

    // No backend is wired up on the homepage yet — same pattern as the
    // full contact form. Hook this up to an API route or form service
    // to actually deliver submissions.
    setSubmitted(true);
  };

  return (
    <section className="bg-(--color-surface-raised) py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[28px] p-8 sm:p-12 lg:p-14"
          style={{
            background: "linear-gradient(155deg, #0B1C4D 0%, #142B6B 55%, #1547E0 100%)",
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 700 400"
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-[0.15] lg:h-96 lg:w-96"
          >
            <rect x="0" y="200" width="420" height="24" rx="12" transform="rotate(-28 0 200)" fill="#fff" />
            <rect x="40" y="150" width="340" height="24" rx="12" transform="rotate(-28 40 150)" fill="#fff" />
            <rect x="80" y="100" width="220" height="20" rx="10" transform="rotate(-28 80 100)" fill="#fff" />
          </svg>

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="max-w-md">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/80">
                Start a Project
              </span>
              <h2 className="mt-5 text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-white sm:text-[30px]">
                Tell us what you&apos;re building.
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
                Send a quick note about your project and we&apos;ll get back
                to you with next steps — no commitment required.
              </p>
            </div>

            <div>
              {submitted ? (
                <div className="flex h-full flex-col items-start justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-6">
                  <CheckCircle2 size={26} className="text-(--color-cyan)" />
                  <p className="text-[15px] font-semibold text-white">
                    Thanks, {name.split(" ")[0]}. We&apos;ll be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={nameId} className="sr-only">
                        Your name
                      </label>
                      <input
                        id={nameId}
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClasses}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={emailId} className="sr-only">
                        Email address
                      </label>
                      <input
                        id={emailId}
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClasses}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={messageId} className="sr-only">
                      What are you looking to build?
                    </label>
                    <textarea
                      id={messageId}
                      placeholder="What are you looking to build?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputClasses} h-24 resize-none pt-3.5`}
                      required
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-[13px] font-medium text-(--color-cyan-soft)">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-(--color-ink) transition-colors hover:bg-(--color-cyan-soft)"
                  >
                    Start My Project
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
