import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { contactInfo } from "@/data/contactInfo";

const regions = ["USA", "UK", "Europe", "Middle East", "Australia"];

const faqs = [
  {
    q: "What is the difference between a free and a paid consultation?",
    a: "A free consultation is where we listen to your requirements and give you an initial response and guidance. A paid consultation gives you detailed strategies, expert recommendations, proper planning and implementation guidance.",
  },
  {
    q: "Do you offer dedicated developers and teams?",
    a: "Yes. We offer dedicated developers and teams as well as project-based work. Tell us what you need and we will discuss which fits your project.",
  },
  {
    q: "Where are you based, and which regions do you serve?",
    a: `Code & Motions is based in ${contactInfo.addressDisplay}. We work with clients in the USA, UK, Europe, the Middle East and Australia.`,
  },
  {
    q: "What are your working hours?",
    a: "We are available Monday to Saturday, 9 AM to 5 PM Pakistan time, and closed on Sunday. We typically reply within 24 hours, and clients on ongoing paid projects receive progress updates every 24 hours.",
  },
];

const serviceLinks = [
  { label: "Software development", href: "/services/software-development" },
  { label: "Website development", href: "/services/website-development" },
  { label: "Shopify development", href: "/services/shopify-development" },
  { label: "AI development", href: "/services/ai-development" },
  { label: "SEO", href: "/services/seo" },
];

export default function ContactLocationsFaq() {
  return (
    <section
      aria-labelledby="contact-where-heading"
      className="border-t border-(--color-line) bg-(--color-surface-raised) px-6 py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-blue)/10">
            <MapPin size={21} className="text-(--color-blue)" strokeWidth={1.9} aria-hidden="true" />
          </span>
          <h2
            id="contact-where-heading"
            className="mt-5 text-[26px] font-extrabold leading-tight text-(--color-ink) sm:text-[30px]"
          >
            Where we work
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-(--color-ink-soft)">
            Our office is in {contactInfo.addressDisplay}. We also serve
            clients remotely in the USA, UK, Europe, the Middle East and
            Australia, including Sydney.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Regions we serve">
            {regions.map((region) => (
              <li
                key={region}
                className="rounded-full border border-(--color-line) bg-white px-4 py-1.5 text-[13px] font-medium text-(--color-ink-soft)"
              >
                {region}
              </li>
            ))}
          </ul>
          <p className="mt-7 text-[14px] font-semibold text-(--color-ink)">Our services</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14.5px] font-medium text-(--color-blue) underline-offset-4 transition-colors hover:text-(--color-ink) hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[26px] font-extrabold leading-tight text-(--color-ink) sm:text-[30px]">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-(--color-line) overflow-hidden rounded-[28px] border border-(--color-line) bg-white">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15.5px] font-semibold text-(--color-ink) [&::-webkit-details-marker]:hidden">
                  <span>{q}</span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-(--color-ink-soft) transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-(--color-ink-soft)">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
