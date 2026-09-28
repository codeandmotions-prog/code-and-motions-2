import Link from "next/link";

export default function MvpContentSections() {
  return (
    <section className="bg-(--color-surface) py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--color-blue)">
            SaaS MVP Development Guide
          </span>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[34px]">
            Understanding SaaS MVP Cost &amp; Timeline
          </h2>
        </div>

        <div className="mt-14 space-y-12">
          <article>
            <h3 className="text-[20px] font-bold text-(--color-ink)">
              1. How Much Does It Cost to Build a SaaS MVP?
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">
              A SaaS MVP development cost typically ranges from a few thousand dollars for a very lean, single-feature
              product to well over six figures for a complex, multi-tenant platform with advanced permissions, AI
              features, and deep integrations. There is no single industry-wide number, because cost is driven almost
              entirely by scope — how many features you need, how complex your data model is, and how custom your
              design has to be. The SaaS MVP cost calculator above gives you a realistic, personalized range based on
              the features you actually plan to build, rather than a generic average that doesn&apos;t reflect your
              project.
            </p>
          </article>

          <article>
            <h3 className="text-[20px] font-bold text-(--color-ink)">2. What Affects SaaS Development Cost?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">
              SaaS development cost is shaped by a combination of factors, and most of them compound each other. The
              biggest drivers are usually:
            </p>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-(--color-ink-soft)">
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-blue)" />
                <span><strong className="text-(--color-ink)">Feature count and complexity</strong> — more major features means more screens, logic, and testing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-blue)" />
                <span><strong className="text-(--color-ink)">User roles and permissions</strong> — a single user type is far simpler than granular, multi-role access control.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-blue)" />
                <span><strong className="text-(--color-ink)">Payments and billing</strong> — recurring subscriptions with plan changes and failed-payment handling take longer than a one-time checkout.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-blue)" />
                <span><strong className="text-(--color-ink)">AI features and integrations</strong> — custom AI/ML pipelines and multiple third-party services add both build and ongoing maintenance cost.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-blue)" />
                <span><strong className="text-(--color-ink)">Design complexity</strong> — a highly custom, animated interface takes meaningfully longer than a proven, template-based UI pattern.</span>
              </li>
            </ul>
          </article>

          <article>
            <h3 className="text-[20px] font-bold text-(--color-ink)">3. How Long Does It Take to Build an MVP?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">
              MVP development timeline generally falls somewhere between four and twelve weeks for a lean, focused
              product, and can extend well beyond that for a platform with a large feature set, custom admin tooling,
              or advanced AI functionality. Timeline tends to track cost closely, since both are driven by the same
              underlying scope. The estimator above calculates a timeline range directly from your answers, using the
              same transparent, disclosed formula it uses for cost — so the two numbers stay consistent with each
              other.
            </p>
          </article>

          <article>
            <h3 className="text-[20px] font-bold text-(--color-ink)">
              4. What This MVP Cost Estimator Calculates
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">
              This software development cost calculator walks you through 16 short questions covering your project
              type, authentication, user roles, dashboard and admin needs, payments, integrations, data complexity, AI
              features, design complexity, and more. Each answer carries a fixed, disclosed point value. Your total
              points determine a complexity tier and feed directly into a transparent formula that produces your
              estimated cost range and development timeline range — along with the specific factors driving that
              estimate, honest considerations for your build, and recommended priorities for a true MVP scope. Nothing
              in the result is random, invented, or based on data you didn&apos;t provide.
            </p>
          </article>

          <article>
            <h3 className="text-[20px] font-bold text-(--color-ink)">5. MVP vs Full Product</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">
              An MVP (minimum viable product) is deliberately narrower than your full product vision — it includes
              only the features needed to test your core value proposition with real users. A full product build adds
              the remaining features, deeper customization, and scale-focused infrastructure once you have real usage
              data to guide those decisions. Estimating your MVP separately from your long-term roadmap is one of the
              most effective ways to control SaaS development cost, since it lets you validate demand before investing
              in everything on your feature list.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-(--color-ink-soft)">
              If your estimate above points to a larger build than expected, our{" "}
              <Link href="/services/software-development" className="font-semibold text-(--color-blue) hover:underline">
                software development team
              </Link>{" "}
              can help you scope a leaner MVP, or plan the full build in phases. You can also browse our other{" "}
              <Link href="/tools" className="font-semibold text-(--color-blue) hover:underline">
                free tools
              </Link>{" "}
              for Shopify and migration planning.
            </p>
          </article>
        </div>

        <p className="mt-14 rounded-2xl border border-(--color-line) bg-(--color-surface-raised) p-5 text-center text-[13.5px] leading-relaxed text-(--color-ink-soft)">
          This calculator produces an estimated range, not a guaranteed quote. Every SaaS project has details that
          only surface during detailed scoping — use this as a starting point for planning, not a final price.
        </p>
      </div>
    </section>
  );
}
