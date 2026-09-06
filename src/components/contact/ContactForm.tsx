"use client";

import { useId, useState, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import { contactServices } from "@/data/contactServices";

const easeOut = [0.22, 1, 0.36, 1] as const;

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const inputClasses =
  "w-full rounded-2xl border border-(--color-line) bg-(--color-surface) py-3.5 pl-11 pr-4 text-[15px] text-(--color-ink) placeholder:text-(--color-ink-soft)/60 outline-none transition-colors focus:border-(--color-blue) focus:bg-white";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [error, setError] = useState<string | null>(null);

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const messageId = useId();

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email and message.");
      return;
    }

    // No backend is wired up yet for this homepage-scoped build.
    // Hook this up to an API route or form service (e.g. Resend, Formspree)
    // to actually deliver submissions to codeandmotions@gmail.com.
    setStatus("submitted");
  };

  if (status === "submitted") {
    return (
      <motion.div
        variants={cardVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto -mt-16 max-w-3xl rounded-[32px] bg-white p-10 text-center shadow-[0_40px_80px_-40px_rgba(11,28,77,0.35)] sm:p-14 lg:-mt-20"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--color-blue)/10">
          <CheckCircle2 size={30} className="text-(--color-blue)" strokeWidth={1.75} />
        </span>
        <h2 className="mt-6 text-[26px] font-extrabold text-(--color-ink)">
          Message sent
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-(--color-ink-soft)">
          Thanks for reaching out, {form.name.split(" ")[0]}. We usually reply
          within 24 hours at{" "}
          <a
            href="mailto:codeandmotions@gmail.com"
            className="font-semibold text-(--color-blue) hover:underline"
          >
            codeandmotions@gmail.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setSelectedServices([]);
            setStatus("idle");
          }}
          className="mt-8 inline-flex items-center justify-center rounded-full border border-(--color-line) px-6 py-3 text-[14px] font-semibold text-(--color-ink) transition-colors hover:border-(--color-ink)"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto -mt-16 max-w-3xl rounded-[32px] bg-white p-6 shadow-[0_40px_80px_-40px_rgba(11,28,77,0.35)] sm:p-10 lg:-mt-20 lg:p-12"
    >
      <div className="max-w-md">
        <h2 className="text-[24px] font-extrabold text-(--color-ink) sm:text-[26px]">
          Contact form
        </h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-(--color-ink-soft)">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8" noValidate>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Field id={nameId} label="Your Name">
              <User
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--color-ink-soft)"
              />
              <input
                id={nameId}
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange("name")}
                className={inputClasses}
                required
              />
            </Field>

            <Field id={emailId} label="Email">
              <Mail
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--color-ink-soft)"
              />
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange("email")}
                className={inputClasses}
                required
              />
            </Field>

            <Field id={phoneId} label="Phone">
              <Phone
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--color-ink-soft)"
              />
              <input
                id={phoneId}
                type="tel"
                autoComplete="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange("phone")}
                className={inputClasses}
              />
            </Field>
          </div>

          <Field id={messageId} label="Message" className="lg:h-full">
            <MessageSquare
              size={18}
              className="pointer-events-none absolute left-4 top-4 text-(--color-ink-soft)"
            />
            <textarea
              id={messageId}
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={handleChange("message")}
              className={`${inputClasses} h-40 resize-none pt-3.5 lg:h-full lg:min-h-[196px]`}
              required
            />
          </Field>
        </div>

        <div className="mt-7">
          <span className="text-[13.5px] font-semibold text-(--color-ink)">
            Services
          </span>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {contactServices.map(({ id, label, icon: Icon }) => {
              const isSelected = selectedServices.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleService(id)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-colors ${
                    isSelected
                      ? "border-(--color-blue) bg-(--color-blue)/8 text-(--color-blue)"
                      : "border-(--color-line) bg-(--color-surface) text-(--color-ink-soft) hover:border-(--color-ink-soft)"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.9} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-5 text-[13.5px] font-medium text-red-600">
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: easeOut }}
          className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-blue) py-4 text-[15px] font-semibold text-white transition-colors hover:bg-(--color-ink) sm:w-auto sm:px-10"
        >
          Send Message
          <Send
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          />
        </motion.button>
      </form>
    </motion.div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
};

function Field({ id, label, className, children }: FieldProps) {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      <label htmlFor={id} className="mb-2 text-[13.5px] font-semibold text-(--color-ink)">
        {label}
      </label>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}
