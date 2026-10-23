import Link from "next/link";
import { CheckCircle2, ClipboardList, Sparkles } from "lucide-react";
import { defaultInstallSteps, type AppEntry } from "@/data/apps";
import Reveal from "./Reveal";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
      {children}
    </span>
  );
}

export default function AppDetailContent({ app }: { app: AppEntry }) {
  const steps = app.installSteps ?? defaultInstallSteps;
  const hasFeatures = app.features.length > 0;
  const hasBenefits = app.benefits.length > 0;

  return (
    <>
      {app.article.length > 0 && (
        <section className="bg-(--color-surface-raised) py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
            <Reveal>
              <Eyebrow>About the app</Eyebrow>
              <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
                What {app.name} is for
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="space-y-8">
              {app.article.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-[19px] font-bold text-(--color-ink)">{section.heading}</h3>
                  <div className="mt-3 space-y-4 text-[16px] leading-relaxed text-(--color-ink-soft)">
                    {section.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {hasFeatures || hasBenefits ? (
        <section className="border-t border-(--color-line) bg-(--color-surface) py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {hasFeatures && (
              <>
                <Reveal className="max-w-2xl">
                  <Eyebrow>Features</Eyebrow>
                  <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
                    What you can do with {app.name}
                  </h2>
                </Reveal>
                <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {app.features.map((feature) => (
                    <li key={feature.title}>
                      <Reveal className="h-full rounded-2xl border border-(--color-line) bg-white p-6">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-navy) text-(--color-cyan)">
                          <Sparkles size={20} aria-hidden="true" />
                        </span>
                        <h3 className="mt-5 text-[17px] font-bold text-(--color-ink)">{feature.title}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-(--color-ink-soft)">
                          {feature.description}
                        </p>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {hasBenefits && (
              <div className={hasFeatures ? "mt-16" : ""}>
                <Reveal className="max-w-2xl">
                  <Eyebrow>Benefits</Eyebrow>
                  <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
                    Why people use it
                  </h2>
                </Reveal>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {app.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
                      <CheckCircle2 size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-(--color-blue)" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="border-t border-(--color-line) bg-(--color-surface) py-16 lg:py-20">
          <Reveal className="mx-auto max-w-3xl px-6 lg:px-10">
            <div className="flex items-start gap-4 rounded-2xl border border-(--color-line) bg-white p-6 sm:p-8">
              <ClipboardList size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-(--color-blue)" />
              <div>
                <h2 className="text-[20px] font-bold text-(--color-ink)">Features and benefits coming soon</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-(--color-ink-soft)">
                  The feature list and benefits for {app.name} will be added here once they are confirmed.
                  Want to hear when that happens?{" "}
                  <Link href="/contact" className="font-semibold text-(--color-blue) underline-offset-4 hover:underline">
                    Get in touch
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="bg-(--color-surface-raised) py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
          <Reveal>
            <Eyebrow>Installation</Eyebrow>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
              How to install the APK on Android
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-(--color-ink-soft)">
              These are general steps for installing an APK on an Android phone.
            </p>
          </Reveal>
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal className="flex gap-5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-ink) text-[15px] font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-bold text-(--color-ink)">{step.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-(--color-ink-soft)">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
