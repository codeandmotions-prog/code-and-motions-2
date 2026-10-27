"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Database, Mail, Phone, Sparkles } from "lucide-react";
import type { AiServiceKind } from "@/data/aiServices";

type Variant = "card" | "hero";

type AiServiceArtProps = {
  kind: AiServiceKind;
  variant?: Variant;
};

/**
 * Small decorative illustrations, one per AI service. They are purely
 * visual (aria-hidden) and use sample text only to suggest what the service
 * does. Motion is subtle and switched off for people who prefer reduced motion.
 */
export default function AiServiceArt({ kind, variant = "card" }: AiServiceArtProps) {
  const hero = variant === "hero";
  const text = hero ? "text-[12.5px]" : "text-[11px]";
  const shell = hero ? "gap-3 p-5 sm:p-6" : "gap-2 p-4";

  return (
    <div aria-hidden="true" className={`flex h-full w-full flex-col justify-center ${shell} ${text} text-white`}>
      {kind === "agent" && <AgentArt hero={hero} />}
      {kind === "chatbot" && <ChatbotArt hero={hero} />}
      {kind === "workflow" && <WorkflowArt hero={hero} />}
      {kind === "voice" && <VoiceArt hero={hero} />}
      {kind === "saas" && <SaasArt hero={hero} />}
    </div>
  );
}

const glass = "rounded-xl border border-white/15 bg-white/[0.08] backdrop-blur-sm";

/* ---------- Agent: a task list working through steps ---------- */
function AgentArt({ hero }: { hero: boolean }) {
  const reduce = useReducedMotion();
  const rows = [
    { label: "Read the request", state: "done" },
    { label: "Look up customer and order", state: "done" },
    { label: "Draft the reply", state: "active" },
    ...(hero ? [{ label: "Wait for approval", state: "wait" }] : []),
  ] as const;

  return (
    <>
      <div className="flex items-center justify-between text-white/70">
        <span className="font-semibold tracking-wide">Task: resolve ticket</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.85em]">Running</span>
      </div>
      <ul className="space-y-1.5">
        {rows.map((row) => (
          <li key={row.label} className={`flex items-center gap-2.5 px-3 py-2 ${glass}`}>
            {row.state === "done" && (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-(--color-cyan) text-(--color-ink)">
                <Check size={10} strokeWidth={3} />
              </span>
            )}
            {row.state === "active" && (
              <motion.span
                className="h-4 w-4 shrink-0 rounded-full border-2 border-(--color-cyan)"
                animate={reduce ? undefined : { opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            {row.state === "wait" && <span className="h-4 w-4 shrink-0 rounded-full border border-white/30" />}
            <span className={row.state === "wait" ? "text-white/50" : "text-white/90"}>{row.label}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-(--color-cyan-soft)" />
        <span>Needs approval above your set limit</span>
      </div>
    </>
  );
}

/* ---------- Chatbot: a short conversation ---------- */
function ChatbotArt({ hero }: { hero: boolean }) {
  const reduce = useReducedMotion();
  return (
    <>
      <div className="max-w-[78%] self-start rounded-2xl rounded-bl-sm border border-white/15 bg-white/[0.10] px-3.5 py-2.5 text-white/90">
        Where is my order?
      </div>
      <div className="max-w-[88%] self-end rounded-2xl rounded-br-sm bg-(--color-cyan) px-3.5 py-2.5 font-medium text-(--color-ink)">
        Order #1042 shipped today and should arrive Thursday.
      </div>
      {hero && (
        <div className="max-w-[78%] self-start rounded-2xl rounded-bl-sm border border-white/15 bg-white/[0.10] px-3.5 py-2.5 text-white/90">
          Can I change the address?
        </div>
      )}
      <div className="flex items-center gap-1.5 self-end rounded-full border border-white/15 bg-white/[0.08] px-3 py-2">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-white/80"
            animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.18, ease: "easeInOut" }}
          />
        ))}
      </div>
    </>
  );
}

/* ---------- Workflow: connected steps ---------- */
function WorkflowArt({ hero }: { hero: boolean }) {
  const reduce = useReducedMotion();
  const nodes = [
    { icon: Mail, label: "Email" },
    { icon: Sparkles, label: "AI reads" },
    { icon: Database, label: "Saved" },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <div key={node.label} className="flex min-w-0 flex-1 items-center last:flex-none">
              <div className="flex w-14 shrink-0 flex-col items-center gap-1.5">
                <span className={`flex items-center justify-center rounded-xl ${glass} ${hero ? "h-12 w-12" : "h-10 w-10"}`}>
                  <Icon size={hero ? 20 : 17} className="text-(--color-cyan-soft)" />
                </span>
                <span className="whitespace-nowrap text-white/75">{node.label}</span>
              </div>
              {index < nodes.length - 1 && (
                <svg viewBox="0 0 100 4" preserveAspectRatio="none" className="mx-1.5 mb-5 h-1 min-w-0 flex-1">
                  <motion.line
                    x1="0"
                    y1="2"
                    x2="100"
                    y2="2"
                    stroke="#7ce6f7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="5 5"
                    vectorEffect="non-scaling-stroke"
                    animate={reduce ? undefined : { strokeDashoffset: [0, -20] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>
      <div className={`flex items-center justify-between px-3 py-2 ${glass}`}>
        <span className="text-white/85">Invoice matched to order</span>
        <span className="rounded-full bg-(--color-cyan) px-2 py-0.5 text-[0.85em] font-semibold text-(--color-ink)">Done</span>
      </div>
      {hero && (
        <div className={`flex items-center justify-between px-3 py-2 ${glass}`}>
          <span className="text-white/85">Amount differs: sent for review</span>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[0.85em] font-semibold">Review</span>
        </div>
      )}
    </>
  );
}

/* ---------- Voice: waveform and transcript ---------- */
function VoiceArt({ hero }: { hero: boolean }) {
  const reduce = useReducedMotion();
  const bars = [0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.85, 0.55, 0.95, 0.45, 0.75, 0.3];
  return (
    <>
      <div className="flex items-center justify-between text-white/70">
        <span className="flex items-center gap-1.5 font-semibold">
          <Phone size={hero ? 14 : 12} className="text-(--color-cyan-soft)" /> Incoming call
        </span>
        <span>00:42</span>
      </div>
      <div className={`flex items-center justify-center gap-1 ${glass} ${hero ? "h-20" : "h-14"}`}>
        {bars.map((height, index) => (
          <motion.span
            key={index}
            className="w-1 origin-center rounded-full bg-(--color-cyan)"
            style={{ height: `${height * 100}%`, maxHeight: hero ? 48 : 32 }}
            animate={reduce ? undefined : { scaleY: [1, 0.35, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: index * 0.07, ease: "easeInOut" }}
          />
        ))}
      </div>
      <p className="text-white/70">
        <span className="font-semibold text-white/90">Caller:</span> Can I book Tuesday morning?
      </p>
      <p className="text-white/70">
        <span className="font-semibold text-(--color-cyan-soft)">Agent:</span> I have 10:30 or 11:15 free.
      </p>
    </>
  );
}

/* ---------- SaaS: a small product dashboard ---------- */
function SaasArt({ hero }: { hero: boolean }) {
  const reduce = useReducedMotion();
  const bars = [0.4, 0.55, 0.45, 0.7, 0.6, 0.85, 0.75];
  return (
    <div className="flex gap-2.5">
      <div className={`hidden w-9 shrink-0 flex-col items-center gap-2 py-2.5 sm:flex ${glass}`}>
        {[0, 1, 2, 3].map((item) => (
          <span key={item} className={`h-3.5 w-3.5 rounded-md ${item === 0 ? "bg-(--color-cyan)" : "bg-white/25"}`} />
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          {["Users", "Usage", "MRR"].map((label) => (
            <div key={label} className={`px-2.5 py-2 ${glass}`}>
              <p className="text-white/60">{label}</p>
              <span className="mt-1 block h-1.5 w-8 rounded-full bg-white/40" />
            </div>
          ))}
        </div>
        <div className={`flex items-end gap-1.5 px-3 pt-2 ${glass} ${hero ? "h-24" : "h-[72px]"}`}>
          {bars.map((height, index) => (
            <motion.span
              key={index}
              className="w-full origin-bottom rounded-t-md bg-(--color-cyan)/85"
              style={{ height: `${height * 100}%` }}
              initial={reduce ? false : { scaleY: 0.2 }}
              whileInView={reduce ? undefined : { scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
        <div className={`flex items-center gap-2 px-3 py-2 ${glass}`}>
          <Sparkles size={hero ? 14 : 12} className="shrink-0 text-(--color-cyan-soft)" />
          <span className="truncate text-white/85">AI summary: usage up this week</span>
        </div>
      </div>
    </div>
  );
}
