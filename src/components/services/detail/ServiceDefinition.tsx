type ServiceDefinitionProps = {
  question: string;
  answer: string;
};

/**
 * Direct-answer definition block, rendered immediately after the hero.
 * Exists specifically for AEO/featured-snippet targeting: a clear
 * question-based H2 followed immediately by a concise direct answer,
 * in plain crawlable HTML (no accordion, no client-only state).
 */
export default function ServiceDefinition({ question, answer }: ServiceDefinitionProps) {
  return (
    <section className="bg-(--color-surface) py-14 lg:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <h2 className="text-[22px] font-extrabold tracking-[-0.01em] text-(--color-ink) sm:text-[26px]">
          {question}
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-(--color-ink-soft)">{answer}</p>
      </div>
    </section>
  );
}
