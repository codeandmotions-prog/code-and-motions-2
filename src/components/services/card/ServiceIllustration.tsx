import type { ReactNode } from "react";

/**
 * Themed flat illustrations for service cards.
 *
 * Every scene is built from the same small kit (a soft blob, a device or board
 * "stage", and a badge glyph) in the site's blue / navy / cyan palette, so any
 * two cards look like members of one set. Scenes are looked up by the card's
 * slug (or category id) in `SCENES`; `illustrationFor` falls back to a sensible
 * default so a card added later never renders without art.
 *
 * Purely decorative: the SVG is aria-hidden and the card's text carries the
 * meaning. No ids other than the three shared gradients, which are identical
 * in every instance, so repeating them across cards is harmless.
 */

const K = {
  navy: "#0B1C4D",
  navy2: "#12307F",
  deep: "#0A1640",
  blue: "#1547E0",
  bright: "#2F6BFF",
  cyan: "#22D3EE",
  tint: "#EAF0FF",
  light: "#D5E2FF",
  mid: "#A9BDF2",
  soft: "#C6D5F7",
  soft2: "#DCE5FA",
  skin: "#FAC9A0",
  skinD: "#F2B48A",
};

/* ───────────────────────── glyphs (drawn in a 48×48 box around 0,0) ───────────────────────── */

type Glyph =
  | "house" | "cart" | "bag" | "cross" | "cap" | "rocket" | "code" | "gear" | "shield" | "flask"
  | "chip" | "robot" | "chat" | "mic" | "bars" | "line" | "boxes" | "truck" | "nodes" | "search"
  | "palette" | "pen" | "camera" | "megaphone" | "play" | "cube" | "sparkle" | "wrench" | "plug"
  | "gauge" | "headset" | "layers" | "store" | "calendar" | "target" | "database" | "brush"
  | "columns" | "blocks" | "cloud" | "heart" | "pie";

function GlyphShape({ name }: { name: Glyph }): ReactNode {
  switch (name) {
    case "house":
      return (<><path d="M-17 3 0 -14 17 3" /><path d="M-12 -2V15H12V-2" /><path d="M-3.5 15V6H3.5V15" /></>);
    case "cart":
      return (<><path d="M-19 -14H-12L-8 8H12L16 -8H-10" /><circle cx="-6" cy="14" r="2.6" fill="currentColor" stroke="none" /><circle cx="10" cy="14" r="2.6" fill="currentColor" stroke="none" /></>);
    case "bag":
      return (<><path d="M-13 -8H13L15 16H-15Z" /><path d="M-7 -8V-12a7 7 0 0 1 14 0V-8" /></>);
    case "cross":
      return <path d="M-5 -16H5V-5H16V5H5V16H-5V5H-16V-5H-5Z" fill="currentColor" stroke="none" />;
    case "cap":
      return (<><path d="M0 -14 20 -5 0 4-20 -5Z" fill="currentColor" /><path d="M-10 1V9Q0 15 10 9V1" /><path d="M20 -5V7" /></>);
    case "rocket":
      return (<><path d="M0 -18C8 -10 10 0 8 10H-8C-10 0 -8 -10 0 -18Z" /><circle cx="0" cy="-4" r="3" fill="currentColor" stroke="none" /><path d="M-4 14 0 20 4 14" /></>);
    case "code":
      return <path d="M-8 -10-18 0-8 10M8 -10 18 0 8 10M3 -14-3 14" />;
    case "gear":
      return (<><circle r="8" />{Array.from({ length: 8 }).map((_, i) => (<line key={i} x1="0" y1="-12" x2="0" y2="-17" strokeWidth="5" strokeLinecap="butt" transform={`rotate(${i * 45})`} />))}</>);
    case "shield":
      return (<><path d="M0 -17 15 -11V2C15 11 8 16 0 19-8 16-15 11-15 2V-11Z" /><path d="M-6 1-1 6 7 -4" /></>);
    case "flask":
      return (<><path d="M-5 -16H5M-3 -16V-4L-14 14Q-15 18-11 18H11Q15 18 14 14L3 -4V-16" /><path d="M-9 6H9" /></>);
    case "chip":
      return (<><rect x="-11" y="-11" width="22" height="22" rx="4" /><rect x="-4" y="-4" width="8" height="8" rx="1.5" fill="currentColor" stroke="none" />{[-6, 0, 6].map((p) => (<g key={p}><path d={`M${p} -11V-17M${p} 11V17M-11 ${p}H-17M11 ${p}H17`} /></g>))}</>);
    case "robot":
      return (<><rect x="-13" y="-10" width="26" height="22" rx="6" /><path d="M0 -10V-17" /><circle cx="0" cy="-19" r="2" fill="currentColor" stroke="none" /><circle cx="-5" cy="0" r="2.4" fill="currentColor" stroke="none" /><circle cx="5" cy="0" r="2.4" fill="currentColor" stroke="none" /><path d="M-5 6H5M-17 -2V6M17 -2V6" /></>);
    case "chat":
      return (<><path d="M-16 -12H16V8H-4L-12 15V8H-16Z" /><path d="M-9 -5H9M-9 1H3" /></>);
    case "mic":
      return (<><rect x="-5" y="-16" width="10" height="20" rx="5" /><path d="M-12 -2a12 12 0 0 0 24 0M0 10V17M-6 17H6" /></>);
    case "bars":
      return (<><rect x="-14" y="2" width="7" height="12" rx="1.5" fill="currentColor" stroke="none" /><rect x="-3.5" y="-6" width="7" height="20" rx="1.5" fill="currentColor" stroke="none" /><rect x="7" y="-14" width="7" height="28" rx="1.5" fill="currentColor" stroke="none" /></>);
    case "line":
      return <path d="M-16 10-6 0 2 6 16 -10M7 -11H16V-2" />;
    case "boxes":
      return (<><rect x="-17" y="-1" width="15" height="15" rx="2" /><rect x="2" y="-1" width="15" height="15" rx="2" /><rect x="-7.5" y="-17" width="15" height="15" rx="2" /></>);
    case "truck":
      return (<><path d="M-19 -9H5V8H-19Z" /><path d="M5 -3H13L18 3V8H5" /><circle cx="-10" cy="10" r="3.2" fill="currentColor" /><circle cx="11" cy="10" r="3.2" fill="currentColor" /></>);
    case "nodes":
      return (<><path d="M-12 10 0 -11 12 10Z" /><circle cx="0" cy="-11" r="4.5" fill="currentColor" /><circle cx="-12" cy="10" r="4.5" fill="currentColor" /><circle cx="12" cy="10" r="4.5" fill="currentColor" /></>);
    case "search":
      return (<><circle cx="-3" cy="-3" r="11" /><path d="M5 5 16 16" /></>);
    case "palette":
      return (<><path d="M0 -16C-14 -16-18 -4-16 4-14 12-6 16 0 16 4 16 4 11 8 11H10C16 11 18 6 17 0 16 -9 10 -16 0 -16Z" /><circle cx="-6" cy="-5" r="2" fill="currentColor" stroke="none" /><circle cx="3" cy="-8" r="2" fill="currentColor" stroke="none" /><circle cx="-9" cy="4" r="2" fill="currentColor" stroke="none" /></>);
    case "pen":
      return (<><path d="M0 -17 10 -3 4 14H-4L-10 -3Z" /><path d="M0 -3V6" /><circle cx="0" cy="-6" r="2" fill="currentColor" stroke="none" /></>);
    case "camera":
      return (<><rect x="-17" y="-9" width="22" height="18" rx="3" /><path d="M5 -3 17 -9V9L5 3Z" /></>);
    case "megaphone":
      return (<><path d="M-17 -4H-6L13 -14V16L-6 6H-17Z" /><path d="M-11 6V15" /></>);
    case "play":
      return <path d="M-8 -12V12L12 0Z" fill="currentColor" />;
    case "cube":
      return (<><path d="M0 -17 15 -9V8L0 17-15 8V-9Z" /><path d="M0 0 15 -9M0 0-15 -9M0 0V17" /></>);
    case "sparkle":
      return <path d="M0 -17Q2 -2 17 0 2 2 0 17-2 2-17 0-2 -2 0 -17Z" fill="currentColor" stroke="none" />;
    case "wrench":
      return <path d="M13 -15a8.5 8.5 0 0 0-11 11L-15 12a3.4 3.4 0 0 0 5 5L7 0a8.5 8.5 0 0 0 11-11L11 -4 6 -9Z" />;
    case "plug":
      return (<><path d="M-6 -17V-7M6 -17V-7" /><path d="M-10 -7H10V2a10 10 0 0 1-20 0Z" /><path d="M0 12V18" /></>);
    case "gauge":
      return (<><path d="M-17 9a17 17 0 0 1 34 0" /><path d="M0 9 8 -5" /><circle cx="0" cy="9" r="2.6" fill="currentColor" stroke="none" /></>);
    case "headset":
      return (<><path d="M-14 5V-1a14 14 0 0 1 28 0V5" /><rect x="-18" y="2" width="7" height="11" rx="3" fill="currentColor" /><rect x="11" y="2" width="7" height="11" rx="3" fill="currentColor" /><path d="M14 13q0 5-9 5" /></>);
    case "layers":
      return (<><path d="M0 -15 17 -6 0 3-17 -6Z" /><path d="M-17 1 0 10 17 1" /><path d="M-17 8 0 17 17 8" /></>);
    case "store":
      return (<><path d="M-17 -6-12 -16H12L17 -6Z" /><path d="M-13 -6V15H13V-6" /><path d="M-4 15V5H4V15" /></>);
    case "calendar":
      return (<><rect x="-14" y="-12" width="28" height="26" rx="4" /><path d="M-14 -4H14M-7 -16V-9M7 -16V-9" /><circle cx="-6" cy="4" r="1.8" fill="currentColor" stroke="none" /><circle cx="2" cy="4" r="1.8" fill="currentColor" stroke="none" /><circle cx="-6" cy="10" r="1.8" fill="currentColor" stroke="none" /></>);
    case "target":
      return (<><circle r="15" /><circle r="8" /><circle r="2.6" fill="currentColor" stroke="none" /></>);
    case "database":
      return (<><path d="M-13 -9a13 5 0 0 1 26 0V9a13 5 0 0 1-26 0Z" /><path d="M-13 0a13 5 0 0 0 26 0" /></>);
    case "brush":
      return <path d="M-12 14Q-14 6-8 4L8 -12 14 -6-2 10Q-6 16-12 14Z" />;
    case "columns":
      return (<><rect x="-15" y="-13" width="12" height="26" rx="2" /><rect x="3" y="-13" width="12" height="12" rx="2" /><rect x="3" y="3" width="12" height="10" rx="2" /></>);
    case "blocks":
      return (<><rect x="-15" y="-15" width="13" height="13" rx="2" /><rect x="2" y="-15" width="13" height="13" rx="2" /><rect x="-15" y="2" width="13" height="13" rx="2" /><rect x="2" y="2" width="13" height="13" rx="2" transform="rotate(12 8.5 8.5)" /></>);
    case "cloud":
      return <path d="M-12 12H11a8 8 0 0 0 1-16 11 11 0 0 0-21 3 7 7 0 0 0 0 13Z" />;
    case "heart":
      return <path d="M0 14C-18 3-16 -11-6 -11-2 -11 0 -8 0 -6 0 -8 2 -11 6 -11 16 -11 18 3 0 14Z" fill="currentColor" stroke="none" />;
    case "pie":
      return (<><path d="M0 -15A15 15 0 1 0 15 0H0Z" /><path d="M4 -15A15 15 0 0 1 15 -4H4Z" fill="currentColor" /></>);
  }
}

function G({ name, x, y, s = 1, c = "#fff" }: { name: Glyph; x: number; y: number; s?: number; c?: string }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${s})`}
      color={c}
      fill="none"
      stroke={c}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlyphShape name={name} />
    </g>
  );
}

/** Round blue badge carrying a glyph: the scene's "subject". */
function Badge({ name, x, y, r = 27 }: { name: Glyph; x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r + 9} fill={K.blue} opacity=".1" />
      <circle cx={x} cy={y} r={r} fill="url(#sc-play)" />
      <G name={name} x={x} y={y} s={(r / 27) * 0.95} />
    </g>
  );
}

/** Small white chip with a blue glyph, used for secondary "floating" objects. */
function Chip({ name, x, y, r = 17 }: { name: Glyph; x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y + 2} r={r} fill={K.blue} opacity=".12" />
      <circle cx={x} cy={y} r={r} fill="#fff" stroke={K.soft} strokeWidth="2" />
      <G name={name} x={x} y={y} s={(r / 27) * 1.05} c={K.blue} />
    </g>
  );
}

/* ───────────────────────── frame (blob + accents) ───────────────────────── */

function Frame({ v, children }: { v: number; children: ReactNode }) {
  const flip = v % 2 === 1;
  const acc = [
    { p1: [62, 70], p2: [388, 166], d1: [40, 128], d2: [394, 120], ring: [108, 42] },
    { p1: [372, 66], p2: [52, 190], d1: [388, 130], d2: [36, 112], ring: [330, 44] },
    { p1: [58, 188], p2: [384, 74], d1: [44, 100], d2: [396, 188], ring: [92, 50] },
  ][v % 3];
  return (
    <svg viewBox="22 30 388 256" aria-hidden="true" focusable="false" className="block h-auto w-full">
      <defs>
        <linearGradient id="sc-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF1FF" />
          <stop offset="1" stopColor="#D3E2FF" />
        </linearGradient>
        <linearGradient id="sc-vid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D9E6FF" />
          <stop offset="1" stopColor="#EEF4FF" />
        </linearGradient>
        <linearGradient id="sc-play" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2F6BFF" />
          <stop offset="1" stopColor="#1547E0" />
        </linearGradient>
      </defs>
      <g transform={flip ? "translate(432 0) scale(-1 1)" : undefined}>
        <path d="M34 222C6 150 58 80 136 66c70-12 98-44 168-30 62 12 100 78 84 142-14 54-62 96-142 98-86 2-182 0-212-54Z" fill="url(#sc-blob)" />
        <circle cx="378" cy="238" r="26" fill={K.cyan} opacity=".16" />
        <circle cx="46" cy="250" r="14" fill={K.blue} opacity=".08" />
      </g>
      <g stroke={K.cyan} strokeWidth="3" strokeLinecap="round">
        <path d={`M${acc.p1[0]} ${acc.p1[1] - 7}v14M${acc.p1[0] - 7} ${acc.p1[1]}h14`} />
        <path d={`M${acc.p2[0]} ${acc.p2[1] - 6}v12M${acc.p2[0] - 6} ${acc.p2[1]}h12`} />
      </g>
      <circle cx={acc.d1[0]} cy={acc.d1[1]} r="3.5" fill={K.blue} opacity=".35" />
      <circle cx={acc.d2[0]} cy={acc.d2[1]} r="3" fill={K.blue} opacity=".35" />
      <circle cx={acc.ring[0]} cy={acc.ring[1]} r="6" fill="none" stroke={K.bright} strokeWidth="2.5" opacity=".6" />
      {children}
    </svg>
  );
}

const Shadow = () => <ellipse cx="196" cy="240" rx="150" ry="7" fill={K.blue} opacity=".1" />;

/* ───────────────────────── stages ───────────────────────── */

type BrowserUi = "hero" | "grid" | "shop" | "dash" | "single" | "list" | "chart";

function bar(x: number, y: number, w: number, h = 5, f: string = K.soft) {
  return <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={h / 2} fill={f} />;
}

const UI: Record<BrowserUi, ReactNode> = {
  hero: (
    <>
      {bar(90, 98, 86, 9, K.navy)}{bar(90, 113, 64, 9, K.navy)}{bar(90, 130, 92, 4)}{bar(90, 138, 78, 4)}
      <rect x="90" y="150" width="44" height="14" rx="7" fill={K.blue} />
      <rect x="196" y="98" width="106" height="68" rx="8" fill="url(#sc-vid)" />
      <circle cx="226" cy="118" r="8" fill={K.cyan} opacity=".7" />
      <path d="M196 166 226 140 246 154 266 130 302 166Z" fill={K.mid} opacity=".6" />
      {[90, 168, 246].map((x) => (<rect key={x} x={x} y="176" width="64" height="26" rx="5" fill={K.tint} />))}
    </>
  ),
  grid: (
    <>
      {[90, 168, 246].map((x) => [98, 154].map((y) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="64" height="48" rx="6" fill={K.tint} />
          <circle cx={x + 16} cy={y + 15} r="7" fill={K.mid} />
          {bar(x + 8, y + 31, 40, 4, K.soft)}{bar(x + 8, y + 38, 26, 4, K.soft2)}
        </g>
      )))}
    </>
  ),
  shop: (
    <>
      <rect x="90" y="96" width="140" height="12" rx="6" fill={K.tint} />
      <rect x="258" y="96" width="44" height="12" rx="6" fill={K.blue} />
      {[90, 168, 246].map((x, i) => (
        <g key={x}>
          <rect x={x} y="118" width="64" height="58" rx="7" fill={K.tint} />
          <circle cx={x + 32} cy="144" r="13" fill={[K.mid, K.cyan, K.bright][i]} opacity=".75" />
          {bar(x + 4, 184, 36, 5, K.navy)}{bar(x + 4, 194, 22, 4, K.soft)}
          <circle cx={x + 56} cy="190" r="6" fill={K.blue} />
        </g>
      ))}
    </>
  ),
  dash: (
    <>
      <rect x="84" y="92" width="34" height="114" rx="5" fill={K.tint} />
      {[102, 116, 130, 144].map((y) => bar(90, y, 22, 5, K.soft))}
      {bar(130, 98, 70, 7, K.navy)}
      <rect x="130" y="114" width="52" height="30" rx="6" fill={K.tint} />
      <rect x="190" y="114" width="52" height="30" rx="6" fill={K.tint} />
      <rect x="250" y="114" width="52" height="30" rx="6" fill={K.tint} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={134 + i * 28} y={198 - [18, 30, 22, 40, 34, 48][i]} width="16" height={[18, 30, 22, 40, 34, 48][i]} rx="3" fill={i === 5 ? K.blue : K.mid} />
      ))}
    </>
  ),
  single: (
    <>
      <rect x="90" y="98" width="100" height="104" rx="8" fill="url(#sc-vid)" />
      <circle cx="140" cy="140" r="24" fill={K.mid} opacity=".7" />
      <rect x="122" y="150" width="36" height="34" rx="5" fill={K.bright} opacity=".85" />
      {bar(206, 104, 78, 9, K.navy)}{bar(206, 120, 56, 9, K.navy)}{bar(206, 140, 92, 4)}{bar(206, 148, 80, 4)}{bar(206, 156, 60, 4)}
      <rect x="206" y="172" width="74" height="18" rx="9" fill={K.blue} />
    </>
  ),
  list: (
    <>
      {[98, 128, 158, 186].map((y, i) => (
        <g key={y}>
          <circle cx="102" cy={y + 8} r="8" fill={[K.mid, K.cyan, K.bright, K.soft][i]} opacity=".8" />
          {bar(120, y + 1, 110, 7, K.navy)}{bar(120, y + 13, 150, 4)}
        </g>
      ))}
    </>
  ),
  chart: (
    <>
      {bar(90, 98, 80, 8, K.navy)}
      {[0, 1, 2, 3].map((i) => (<line key={i} x1="90" x2="302" y1={124 + i * 22} y2={124 + i * 22} stroke={K.soft2} strokeWidth="2" />))}
      <path d="M92 190 130 172 168 178 206 150 244 140 300 112" fill="none" stroke={K.blue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M92 190 130 172 168 178 206 150 244 140 300 112V200H92Z" fill={K.bright} opacity=".12" />
      {[[130, 172], [206, 150], [300, 112]].map(([x, y]) => (<circle key={x} cx={x} cy={y} r="4.5" fill="#fff" stroke={K.blue} strokeWidth="3" />))}
    </>
  ),
};

function Browser({ ui }: { ui: BrowserUi }) {
  return (
    <g>
      <Shadow />
      <rect x="70" y="62" width="252" height="156" rx="13" fill={K.navy} />
      <rect x="78" y="86" width="236" height="124" rx="6" fill="#fff" />
      <circle cx="88" cy="74" r="3.2" fill={K.cyan} /><circle cx="99" cy="74" r="3.2" fill={K.bright} /><circle cx="110" cy="74" r="3.2" fill={K.mid} />
      <rect x="128" y="69" width="120" height="10" rx="5" fill="#fff" opacity=".18" />
      {UI[ui]}
      <rect x="50" y="214" width="292" height="15" rx="7.5" fill={K.mid} />
      <rect x="172" y="214" width="52" height="6" rx="3" fill="#8CA5E8" />
    </g>
  );
}

function Editor() {
  const rows: [number, number, number, string][] = [
    [104, 100, 70, K.cyan], [120, 112, 98, "#fff"], [120, 124, 60, K.bright], [136, 136, 84, "#fff"],
    [136, 148, 110, K.cyan], [120, 160, 50, K.bright], [104, 172, 36, K.cyan], [104, 184, 90, "#fff"],
  ];
  return (
    <g>
      <Shadow />
      <rect x="70" y="62" width="252" height="156" rx="13" fill={K.navy} />
      <rect x="78" y="86" width="236" height="124" rx="6" fill={K.deep} />
      <circle cx="88" cy="74" r="3.2" fill={K.cyan} /><circle cx="99" cy="74" r="3.2" fill={K.bright} /><circle cx="110" cy="74" r="3.2" fill={K.mid} />
      <rect x="78" y="86" width="22" height="124" fill="#0E1E55" />
      {rows.map(([x, y, w, f], i) => (<g key={i}>{bar(84, y, 8, 4, "#31457F")}{bar(x + 4, y, w, 5, f)}</g>))}
      <rect x="50" y="214" width="292" height="15" rx="7.5" fill={K.mid} />
      <rect x="172" y="214" width="52" height="6" rx="3" fill="#8CA5E8" />
    </g>
  );
}

function Laptop({ children }: { children: ReactNode }) {
  return (
    <g>
      <Shadow />
      <rect x="70" y="60" width="252" height="156" rx="13" fill={K.navy} />
      <rect x="80" y="70" width="232" height="136" rx="7" fill="#fff" />
      <rect x="88" y="78" width="214" height="98" rx="8" fill="url(#sc-vid)" />
      {children}
      <rect x="88" y="184" width="96" height="5" rx="2.5" fill={K.soft} />
      <rect x="88" y="194" width="58" height="4" rx="2" fill={K.soft2} />
      <rect x="50" y="214" width="292" height="15" rx="7.5" fill={K.mid} />
      <rect x="172" y="214" width="52" height="6" rx="3" fill="#8CA5E8" />
    </g>
  );
}

function PlayBar() {
  return (
    <g>
      <rect x="98" y="162" width="194" height="14" rx="7" fill={K.navy} />
      <path d="M107 166v6l5-3Z" fill="#fff" />
      <line x1="122" y1="169" x2="268" y2="169" stroke="#fff" strokeOpacity=".35" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="122" y1="169" x2="192" y2="169" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="192" cy="169" r="3.8" fill="#fff" />
      <rect x="276" y="165" width="8" height="8" rx="1.5" fill="none" stroke="#fff" strokeWidth="1.6" />
    </g>
  );
}

function PlayButton({ x = 252, y = 116, r = 23 }: { x?: number; y?: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r + 9} fill={K.blue} opacity=".1" />
      <circle cx={x} cy={y} r={r} fill="url(#sc-play)" />
      <path d={`M${x - 6} ${y - 11}v22l19-11Z`} fill="#fff" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
    </g>
  );
}

function Clapper({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(8 330 104)`}>
      <rect x="294" y="86" width="72" height="44" rx="6" fill={K.navy2} />
      <rect x="302" y="112" width="30" height="7" rx="2" fill="#fff" opacity=".28" />
      <circle cx="352" cy="115" r="3.5" fill={K.cyan} />
      <g transform="rotate(-14 296 86)">
        <rect x="294" y="68" width="72" height="16" rx="3" fill={K.navy} />
        <path d="M306 68h9l-6 16h-9ZM326 68h9l-6 16h-9ZM346 68h9l-6 16h-9Z" fill="#fff" />
      </g>
      <circle cx="297" cy="86" r="3" fill={K.mid} />
    </g>
  );
}

/* ───────────────────────── full scenes ───────────────────────── */

function Presenter() {
  return (
    <g>
      <path d="M104 178c0-30 18-42 42-42s42 12 42 42Z" fill={K.blue} />
      <path d="M134 140l12 12 12-12" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity=".85" />
      <rect x="140" y="124" width="13" height="16" rx="5" fill={K.skinD} />
      <path d="M184 156l22-14" stroke={K.blue} strokeWidth="11" strokeLinecap="round" />
      <circle cx="147" cy="112" r="19" fill={K.skin} />
      <path d="M128 112c-3-20 12-27 24-25 13 2 17 13 13 22-7-6-18-8-27-4-4 2-7 5-10 7Z" fill={K.navy} />
      <circle cx="128" cy="116" r="4.2" fill={K.skinD} />
      <circle cx="152" cy="114" r="1.9" fill={K.navy} /><circle cx="162" cy="114" r="1.9" fill={K.navy} />
      <path d="M152 122q6 5 12-1" fill="none" stroke={K.navy} strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="209" cy="140" r="6.8" fill={K.skin} />
      <path d="M212 138l13-9" stroke={K.skin} strokeWidth="4.5" strokeLinecap="round" />
    </g>
  );
}

function SceneExplainer() {
  return (
    <>
      <Laptop>
        <PlayButton />
        <Presenter />
        <PlayBar />
      </Laptop>
      <Clapper />
    </>
  );
}

function LaptopSaas({ cursor = false }: { cursor?: boolean }) {
  return (
    <>
      <Laptop>
        <rect x="92" y="82" width="30" height="90" rx="4" fill="#fff" opacity=".7" />
        {[92, 104, 116, 128].map((y) => bar(97, y, 20, 4, K.soft))}
        {[0, 1, 2].map((i) => (<rect key={i} x={132 + i * 54} y="86" width="46" height="26" rx="5" fill="#fff" />))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (<rect key={i} x={134 + i * 24} y={160 - [14, 26, 20, 34, 28, 42, 36][i]} width="14" height={[14, 26, 20, 34, 28, 42, 36][i]} rx="3" fill={i === 5 ? K.blue : K.mid} />))}
        {cursor ? (
          <g transform="translate(236 128)"><path d="M0 0V22L6 16 11 27 16 25 11 14 19 14Z" fill={K.navy} stroke="#fff" strokeWidth="2" strokeLinejoin="round" /></g>
        ) : (<PlayButton x={266} y={110} r={17} />)}
      </Laptop>
      <Chip name={cursor ? "layers" : "cloud"} x={338} y={92} />
    </>
  );
}

function SceneProductVideo() {
  return (
    <>
      <Laptop>
        <rect x="108" y="96" width="62" height="62" rx="9" fill={K.bright} opacity=".85" />
        <path d="M108 112 139 124 170 112" fill="none" stroke="#fff" strokeWidth="3" opacity=".7" />
        <path d="M139 124V158" stroke="#fff" strokeWidth="3" opacity=".7" />
        {[[218, 104], [218, 134]].map(([x, y], i) => (<g key={i}><circle cx={x - 16} cy={y + 6} r="4" fill={K.cyan} />{bar(x - 6, y, 56, 5, K.navy)}{bar(x - 6, y + 9, 40, 4)}</g>))}
        <path d="M172 112 198 110M172 140 198 140" stroke={K.cyan} strokeWidth="2" strokeDasharray="3 3" />
        <PlayBar />
      </Laptop>
      <Chip name="cube" x={340} y={100} />
    </>
  );
}

function SceneAiVideo() {
  return (
    <>
      <Laptop>
        <PlayButton x={196} y={118} r={26} />
        {[[110, 100], [276, 96], [262, 138]].map(([x, y], i) => (<G key={i} name="sparkle" x={x} y={y} s={0.45 + i * 0.1} c={i === 1 ? K.cyan : K.bright} />))}
        <PlayBar />
      </Laptop>
      <Badge name="sparkle" x={334} y={96} r={24} />
    </>
  );
}

function SceneAnim2d() {
  return (
    <g>
      <Shadow />
      <rect x="86" y="62" width="216" height="154" rx="12" fill="#fff" stroke={K.navy} strokeWidth="3.5" />
      <rect x="98" y="74" width="192" height="130" rx="6" fill="url(#sc-vid)" />
      <path d="M110 188C140 130 170 210 200 160S250 120 280 150" fill="none" stroke={K.blue} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="1 8" />
      <circle cx="160" cy="124" r="26" fill={K.skin} />
      <path d="M134 120c-2-24 18-32 32-27 12 4 16 16 12 28-8-8-22-10-34-6-3 1-7 3-10 5Z" fill={K.navy} />
      <circle cx="154" cy="126" r="2.4" fill={K.navy} /><circle cx="170" cy="126" r="2.4" fill={K.navy} />
      <path d="M155 136q8 7 16-1" fill="none" stroke={K.navy} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M120 204c0-26 20-38 42-38s42 12 42 38Z" fill={K.blue} />
      <path d="M232 106h40v40h-40Z" fill={K.cyan} opacity=".75" transform="rotate(12 252 126)" />
      <circle cx="262" cy="176" r="14" fill={K.bright} opacity=".8" />
      {[[110, 188], [200, 160], [280, 150]].map(([x, y]) => (<rect key={x} x={x - 4} y={y - 4} width="8" height="8" fill="#fff" stroke={K.blue} strokeWidth="2.2" />))}
      <Badge name="pen" x={334} y={112} r={25} />
    </g>
  );
}

function SceneAnim3d() {
  return (
    <g>
      <Shadow />
      <ellipse cx="190" cy="214" rx="96" ry="20" fill={K.light} />
      <ellipse cx="190" cy="214" rx="64" ry="12" fill="none" stroke={K.blue} strokeWidth="2.5" strokeDasharray="4 6" />
      <path d="M190 76 262 116V190L190 230 118 190V116Z" fill={K.bright} />
      <path d="M190 76 262 116 190 156 118 116Z" fill="#6E98FF" />
      <path d="M190 156 262 116V190L190 230Z" fill={K.blue} />
      <path d="M190 156 118 116V190L190 230Z" fill={K.navy2} />
      <path d="M190 76 262 116 190 156 118 116Z" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
      <path d="M150 96l22-12" stroke="#fff" strokeOpacity=".6" strokeWidth="4" strokeLinecap="round" />
      <path d="M96 150a100 40 0 0 0 200 20" fill="none" stroke={K.cyan} strokeWidth="3" strokeLinecap="round" />
      <path d="M288 156l8 12-14 4" fill="none" stroke={K.cyan} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Chip name="sparkle" x={92} y={92} />
      <Chip name="cube" x={336} y={92} />
    </g>
  );
}

function SceneProduct3d() {
  return (
    <g>
      <Shadow />
      <ellipse cx="196" cy="222" rx="104" ry="22" fill={K.light} />
      <ellipse cx="196" cy="214" rx="74" ry="15" fill="#fff" stroke={K.soft} strokeWidth="3" />
      <rect x="164" y="94" width="64" height="118" rx="14" fill={K.blue} />
      <rect x="164" y="94" width="64" height="118" rx="14" fill="none" stroke={K.navy} strokeWidth="3" />
      <rect x="178" y="70" width="36" height="28" rx="6" fill={K.navy} />
      <rect x="176" y="124" width="40" height="48" rx="6" fill="#fff" opacity=".9" />
      {bar(182, 136, 28, 5, K.blue)}{bar(182, 146, 20, 4, K.soft)}{bar(182, 154, 24, 4, K.soft)}
      <path d="M172 106V204" stroke="#fff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" />
      <path d="M92 190a104 24 0 0 0 200 6" fill="none" stroke={K.cyan} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      <path d="M296 190l-10 8 14 4" fill="none" stroke={K.cyan} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Badge name="cube" x={316} y={96} r={24} />
      <Chip name="sparkle" x={92} y={110} />
    </g>
  );
}

function SceneWhiteboard() {
  return (
    <g>
      <Shadow />
      <rect x="74" y="62" width="244" height="150" rx="10" fill="#fff" stroke={K.navy} strokeWidth="4" />
      <path d="M150 212 134 238M242 212 258 238" stroke={K.navy} strokeWidth="4" strokeLinecap="round" />
      <circle cx="112" cy="112" r="16" fill="none" stroke={K.blue} strokeWidth="3.5" />
      <path d="M106 128h12M108 134h8" stroke={K.blue} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M104 106l8 6 8-10" fill="none" stroke={K.cyan} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M140 112h46" fill="none" stroke={K.navy} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="1 9" />
      <rect x="196" y="94" width="40" height="36" rx="6" fill="none" stroke={K.navy} strokeWidth="3.5" />
      <path d="M206 112h20M206 120h12" stroke={K.navy} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M244 112h22" stroke={K.navy} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="284" cy="112" r="14" fill="none" stroke={K.bright} strokeWidth="3.5" />
      <path d="M100 176C130 150 150 200 180 172S220 150 250 176 280 186 300 168" fill="none" stroke={K.blue} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M292 160l10 8-14 4" fill="none" stroke={K.blue} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="rotate(-30 330 170)"><rect x="318" y="140" width="14" height="64" rx="5" fill={K.navy} /><rect x="318" y="140" width="14" height="14" rx="5" fill={K.cyan} /></g>
    </g>
  );
}

function SceneMotion() {
  return (
    <g>
      <Shadow />
      <rect x="74" y="62" width="244" height="104" rx="12" fill="#fff" stroke={K.navy} strokeWidth="3.5" />
      <rect x="84" y="72" width="224" height="84" rx="7" fill="url(#sc-vid)" />
      <circle cx="132" cy="114" r="22" fill={K.bright} />
      <rect x="176" y="92" width="44" height="44" rx="9" fill={K.cyan} transform="rotate(14 198 114)" />
      <path d="M252 134 274 92 296 134Z" fill={K.blue} />
      <path d="M110 150C150 80 230 80 280 150" fill="none" stroke={K.navy} strokeWidth="2.5" strokeDasharray="1 7" strokeLinecap="round" />
      <rect x="74" y="178" width="244" height="44" rx="10" fill={K.navy} />
      {[[88, 190, 60, K.bright], [112, 202, 90, K.cyan], [150, 190, 70, K.mid]].map(([x, y, w, f], i) => (<rect key={i} x={x as number} y={y as number} width={w as number} height="8" rx="4" fill={f as string} />))}
      {[96, 134, 178, 232, 262].map((x, i) => (<path key={x} d={`M${x} ${i % 2 ? 205 : 193}l4 4-4 4-4-4Z`} fill="#fff" />))}
      <line x1="196" y1="176" x2="196" y2="222" stroke="#fff" strokeWidth="2.5" />
      <path d="M190 172h12l-6 8Z" fill="#fff" />
      <Badge name="sparkle" x={338} y={96} r={22} />
    </g>
  );
}

function ScenePromo() {
  return (
    <g>
      <Shadow />
      <rect x="92" y="70" width="188" height="130" rx="12" fill={K.navy} />
      <rect x="102" y="80" width="168" height="110" rx="7" fill="url(#sc-vid)" />
      <PlayButton x={186} y={135} r={25} />
      <rect x="102" y="204" width="168" height="8" rx="4" fill={K.soft} />
      <rect x="102" y="204" width="96" height="8" rx="4" fill={K.blue} />
      <g transform="rotate(-14 300 150)">
        <path d="M266 130h24l44-26v94l-44-26h-24Z" fill={K.blue} stroke={K.navy} strokeWidth="3.5" strokeLinejoin="round" />
        <rect x="262" y="124" width="12" height="46" rx="4" fill={K.navy} />
        <path d="M276 170 282 202" stroke={K.navy} strokeWidth="9" strokeLinecap="round" />
        <path d="M346 126c10 6 14 18 14 30" fill="none" stroke={K.cyan} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M352 110c18 8 24 28 24 46" fill="none" stroke={K.bright} strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <Chip name="heart" x={88} y={80} />
    </g>
  );
}

function SceneCamera() {
  return (
    <g>
      <Shadow />
      <path d="M196 170 150 238M196 170 242 238M196 170V238" stroke={K.navy} strokeWidth="5" strokeLinecap="round" />
      <rect x="104" y="92" width="150" height="78" rx="12" fill={K.navy} />
      <rect x="254" y="110" width="52" height="42" rx="8" fill={K.navy2} />
      <path d="M254 126 306 108V154L254 138Z" fill={K.navy2} />
      <circle cx="283" cy="131" r="13" fill={K.cyan} opacity=".85" /><circle cx="283" cy="131" r="6" fill="#fff" />
      <rect x="116" y="104" width="68" height="46" rx="7" fill="url(#sc-vid)" />
      <circle cx="132" cy="120" r="6" fill={K.blue} />
      {bar(144, 116, 28, 4, K.soft)}{bar(144, 126, 20, 4, K.soft2)}
      <circle cx="226" cy="108" r="5" fill="#FF5C6C" />
      <rect x="200" y="124" width="40" height="28" rx="5" fill={K.navy2} />
      <rect x="140" y="76" width="74" height="18" rx="6" fill={K.navy2} />
      <path d="M96 70v16M96 70h16M312 70v16M312 70h-16M96 186v-16M96 186h16M312 186v-16M312 186h-16" fill="none" stroke={K.blue} strokeWidth="3.5" strokeLinecap="round" opacity=".5" />
      <Chip name="play" x={336} y={176} />
    </g>
  );
}

function ScenePhone({ reels = true }: { reels?: boolean }) {
  return (
    <g>
      <Shadow />
      <rect x="146" y="46" width="104" height="196" rx="20" fill={K.navy} />
      <rect x="154" y="58" width="88" height="172" rx="13" fill="url(#sc-vid)" />
      <rect x="182" y="52" width="32" height="5" rx="2.5" fill="#fff" opacity=".25" />
      <circle cx="198" cy="132" r="22" fill="url(#sc-play)" />
      <path d="M192 121v22l18-11Z" fill="#fff" />
      <circle cx="170" cy="86" r="8" fill={K.cyan} /><rect x="184" y="82" width="42" height="5" rx="2.5" fill={K.navy} /><rect x="184" y="91" width="28" height="4" rx="2" fill={K.mid} />
      <rect x="164" y="190" width="56" height="5" rx="2.5" fill={K.navy} /><rect x="164" y="200" width="40" height="4" rx="2" fill={K.mid} />
      <rect x="164" y="212" width="68" height="4" rx="2" fill="#fff" /><rect x="164" y="212" width="38" height="4" rx="2" fill={K.blue} />
      <Chip name="heart" x={290} y={112} />
      <Chip name={reels ? "chat" : "target"} x={106} y={150} />
      <Chip name="sparkle" x={290} y={188} r={14} />
    </g>
  );
}

function SceneArt() {
  return (
    <g>
      <Shadow />
      <rect x="84" y="64" width="224" height="152" rx="12" fill="#fff" stroke={K.navy} strokeWidth="3.5" />
      <rect x="84" y="64" width="38" height="152" rx="12" fill={K.tint} />
      {[84, 112, 140, 168].map((y, i) => (<rect key={y} x="95" y={y} width="16" height="16" rx="4" fill={[K.blue, K.cyan, K.mid, K.bright][i]} />))}
      <circle cx="176" cy="116" r="24" fill={K.cyan} opacity=".8" />
      <rect x="206" y="92" width="60" height="50" rx="8" fill={K.blue} />
      <path d="M142 190C172 140 214 214 270 160" fill="none" stroke={K.navy} strokeWidth="3.5" strokeLinecap="round" />
      {[[142, 190], [270, 160]].map(([x, y]) => (<rect key={x} x={x - 5} y={y - 5} width="10" height="10" fill="#fff" stroke={K.blue} strokeWidth="2.5" />))}
      <path d="M172 164V150M172 164h-14" stroke={K.blue} strokeWidth="2" opacity=".7" />
      <Badge name="pen" x={330} y={106} r={25} />
      <Chip name="palette" x={96} y={232} r={15} />
    </g>
  );
}

function SceneChip({ glyph = "sparkle" }: { glyph?: Glyph }) {
  return (
    <g>
      <Shadow />
      <rect x="132" y="86" width="128" height="128" rx="22" fill={K.navy} />
      <rect x="146" y="100" width="100" height="100" rx="14" fill={K.navy2} />
      {[150, 172, 194, 216, 238].map((p) => (<g key={p}><rect x={p - 3} y="72" width="6" height="14" rx="3" fill={K.mid} /><rect x={p - 3} y="214" width="6" height="14" rx="3" fill={K.mid} /></g>))}
      {[108, 129, 150, 171, 192].map((p) => (<g key={p}><rect x="118" y={p - 3} width="14" height="6" rx="3" fill={K.mid} /><rect x="260" y={p - 3} width="14" height="6" rx="3" fill={K.mid} /></g>))}
      <circle cx="196" cy="150" r="30" fill="url(#sc-play)" />
      <G name={glyph} x={196} y={150} s={1.05} />
      <path d="M90 100h34M90 100v-26M300 200h-34M300 200v26" fill="none" stroke={K.cyan} strokeWidth="3" strokeLinecap="round" />
      <circle cx="90" cy="72" r="5" fill={K.cyan} /><circle cx="300" cy="228" r="5" fill={K.cyan} />
      <G name="sparkle" x={318} y={96} s={0.7} c={K.bright} />
      <G name="sparkle" x={76} y={180} s={0.5} c={K.cyan} />
    </g>
  );
}

function SceneRobot({ extra = "chat" as Glyph }) {
  return (
    <g>
      <Shadow />
      <rect x="146" y="100" width="100" height="84" rx="22" fill={K.navy} />
      <rect x="158" y="112" width="76" height="52" rx="14" fill="url(#sc-vid)" />
      <circle cx="180" cy="136" r="8" fill={K.navy} /><circle cx="212" cy="136" r="8" fill={K.navy} />
      <circle cx="182" cy="134" r="2.6" fill="#fff" /><circle cx="214" cy="134" r="2.6" fill="#fff" />
      <path d="M186 152q10 8 20 0" fill="none" stroke={K.navy} strokeWidth="3" strokeLinecap="round" />
      <path d="M196 100V80" stroke={K.navy} strokeWidth="5" strokeLinecap="round" /><circle cx="196" cy="74" r="8" fill={K.cyan} />
      <rect x="128" y="124" width="14" height="30" rx="7" fill={K.blue} /><rect x="250" y="124" width="14" height="30" rx="7" fill={K.blue} />
      <path d="M166 184c0 26 8 40 30 40s30-14 30-40Z" fill={K.blue} />
      <rect x="180" y="196" width="32" height="16" rx="5" fill="#fff" opacity=".85" />
      <Badge name={extra} x={318} y={100} r={26} />
      <Chip name="sparkle" x={84} y={96} />
      <Chip name="bars" x={96} y={200} r={15} />
    </g>
  );
}

function SceneChat() {
  return (
    <g>
      <Shadow />
      <rect x="86" y="72" width="170" height="64" rx="18" fill="#fff" stroke={K.navy} strokeWidth="3.5" />
      <path d="M118 136v22l26-22" fill="#fff" stroke={K.navy} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M120 135h28" stroke="#fff" strokeWidth="5" />
      {bar(104, 90, 120, 6, K.navy)}{bar(104, 104, 90, 5)}{bar(104, 116, 104, 5)}
      <rect x="156" y="156" width="150" height="54" rx="16" fill={K.blue} />
      <path d="M278 210v18l-24-18" fill={K.blue} />
      {bar(172, 170, 96, 6, "#fff")}{bar(172, 184, 66, 5, "#BFD0FF")}
      <circle cx="108" cy="188" r="14" fill={K.cyan} /><G name="robot" x={108} y={188} s={0.5} c={K.navy} />
      <Badge name="sparkle" x={330} y={92} r={22} />
      <g fill={K.cyan}><circle cx="86" cy="150" r="3.5" /><circle cx="98" cy="150" r="3.5" opacity=".6" /></g>
    </g>
  );
}

function SceneFlow() {
  const nm: [number, number, Glyph][] = [[96, 96, "database"], [196, 160, "gear"], [296, 96, "bars"], [296, 212, "target"], [96, 212, "chat"]];
  return (
    <g>
      <Shadow />
      <path d="M96 96C150 96 150 160 196 160M196 160C250 160 250 96 296 96M196 160C250 160 250 212 296 212M196 160C150 160 150 212 96 212" fill="none" stroke={K.soft} strokeWidth="4" strokeLinecap="round" />
      <path d="M96 96C150 96 150 160 196 160M196 160C250 160 250 96 296 96" fill="none" stroke={K.blue} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" />
      {nm.map(([x, y, g], i) => (
        <g key={i}>
          <rect x={x - 30} y={y - 30} width="60" height="60" rx="16" fill={i === 1 ? "url(#sc-play)" : "#fff"} stroke={K.soft} strokeWidth="2.5" />
          <G name={g} x={x} y={y} s={0.95} c={i === 1 ? "#fff" : K.blue} />
        </g>
      ))}
      <circle cx="146" cy="128" r="5" fill={K.cyan} /><circle cx="246" cy="128" r="5" fill={K.cyan} /><circle cx="246" cy="192" r="5" fill={K.cyan} />
    </g>
  );
}

function SceneVoice() {
  const h = [14, 26, 40, 58, 36, 66, 44, 28, 52, 32, 18, 36, 22];
  return (
    <g>
      <Shadow />
      <rect x="82" y="84" width="228" height="104" rx="18" fill="#fff" stroke={K.navy} strokeWidth="3.5" />
      {h.map((v, i) => (<rect key={i} x={98 + i * 16} y={136 - v / 2} width="8" height={v} rx="4" fill={i > 3 && i < 9 ? K.blue : K.mid} />))}
      <rect x="168" y="196" width="56" height="12" rx="6" fill={K.light} />
      <rect x="150" y="212" width="92" height="8" rx="4" fill={K.light} />
      <Badge name="mic" x={324} y={196} r={28} />
      <Chip name="chat" x={92} y={72} r={15} />
      <G name="sparkle" x={338} y={90} s={0.6} c={K.cyan} />
      <path d="M326 130c10 6 16 16 16 28" fill="none" stroke={K.cyan} strokeWidth="3.5" strokeLinecap="round" />
    </g>
  );
}

function SceneCloud() {
  return (
    <g>
      <Shadow />
      <path d="M118 138a48 48 0 0 1 92-14 40 40 0 0 1 62 34 36 36 0 0 1-32 62H134a34 34 0 0 1-16-82Z" fill={K.tint} stroke={K.navy} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="140" y="132" width="116" height="70" rx="9" fill="#fff" stroke={K.navy} strokeWidth="3" />
      <rect x="140" y="132" width="116" height="14" rx="9" fill={K.navy} />
      {[0, 1, 2, 3, 4].map((i) => (<rect key={i} x={152 + i * 20} y={192 - [14, 24, 18, 32, 26][i]} width="12" height={[14, 24, 18, 32, 26][i]} rx="3" fill={i === 3 ? K.blue : K.mid} />))}
      <Badge name="database" x={316} y={198} r={25} />
      <Chip name="gear" x={92} y={196} r={15} />
    </g>
  );
}

function SceneImage() {
  return (
    <g>
      <Shadow />
      <rect x="92" y="66" width="190" height="146" rx="12" fill="#fff" stroke={K.navy} strokeWidth="4" />
      <rect x="104" y="78" width="166" height="122" rx="6" fill="url(#sc-vid)" />
      <circle cx="230" cy="110" r="14" fill={K.cyan} />
      <path d="M104 200 156 134 196 176 224 150 270 200Z" fill={K.bright} opacity=".85" />
      <path d="M104 200 142 160 172 200Z" fill={K.navy2} />
      <Badge name="sparkle" x={310} y={100} r={26} />
      <G name="sparkle" x={86} y={92} s={0.55} c={K.cyan} />
      <Chip name="brush" x={316} y={192} r={17} />
    </g>
  );
}

function SceneBoxes() {
  const shelf = (y: number) => (<g key={y}><rect x="84" y={y} width="226" height="8" rx="4" fill={K.navy} />{[0, 1, 2].map((i) => (<g key={i}><rect x={96 + i * 70} y={y - 44} width="58" height="44" rx="5" fill={[K.bright, K.cyan, K.mid][i]} opacity=".9" /><path d={`M${96 + i * 70} ${y - 30}h58`} stroke="#fff" strokeOpacity=".6" strokeWidth="3" /><rect x={116 + i * 70} y={y - 30} width="18" height="8" rx="2" fill="#fff" opacity=".7" /></g>))}</g>);
  return (
    <g>
      <Shadow />
      <path d="M92 70V212M302 70V212" stroke={K.navy} strokeWidth="5" strokeLinecap="round" />
      {shelf(120)}{shelf(188)}
      <Badge name="gauge" x={332} y={96} r={24} />
      <Chip name="line" x={90} y={232} r={15} />
    </g>
  );
}

function SceneChain() {
  return (
    <g>
      <Shadow />
      <path d="M90 190C130 120 170 190 200 130S270 110 306 90" fill="none" stroke={K.soft} strokeWidth="5" strokeLinecap="round" />
      <path d="M90 190C130 120 170 190 200 130S270 110 306 90" fill="none" stroke={K.blue} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 10" />
      {[[90, 190, "store"], [200, 130, "boxes"], [306, 90, "cart"]].map(([x, y, g], i) => (
        <g key={i}><circle cx={x as number} cy={y as number} r="27" fill="#fff" stroke={K.soft} strokeWidth="2.5" /><G name={g as Glyph} x={x as number} y={y as number} s={0.9} c={K.blue} /></g>
      ))}
      <g transform="translate(150 200)"><rect x="-6" y="-24" width="68" height="40" rx="9" fill={K.blue} /><G name="truck" x={28} y={-4} s={1.1} /></g>
      <G name="sparkle" x={330} y={170} s={0.6} c={K.cyan} />
    </g>
  );
}

function SceneErp() {
  return (
    <g>
      <Shadow />
      <path d="M196 150 120 100M196 150 276 100M196 150 120 204M196 150 276 204" stroke={K.soft} strokeWidth="5" strokeLinecap="round" />
      <path d="M196 150 120 100M196 150 276 100M196 150 120 204M196 150 276 204" stroke={K.blue} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" />
      {[[120, 100, "bars"], [276, 100, "database"], [120, 204, "cart"], [276, 204, "boxes"]].map(([x, y, g], i) => (
        <g key={i}><rect x={(x as number) - 30} y={(y as number) - 26} width="60" height="52" rx="12" fill="#fff" stroke={K.soft} strokeWidth="2.5" /><G name={g as Glyph} x={x as number} y={y as number} s={0.85} c={K.blue} /></g>
      ))}
      <rect x="160" y="116" width="72" height="68" rx="16" fill="url(#sc-play)" />
      <G name="plug" x={196} y={150} s={1.15} />
    </g>
  );
}

function SceneForecast() {
  return (
    <g>
      <Shadow />
      <rect x="78" y="64" width="236" height="150" rx="12" fill="#fff" stroke={K.navy} strokeWidth="3.5" />
      {[0, 1, 2, 3].map((i) => (<line key={i} x1="92" x2="300" y1={96 + i * 30} y2={96 + i * 30} stroke={K.soft2} strokeWidth="2" />))}
      <path d="M96 190 130 170 164 178 200 140" fill="none" stroke={K.blue} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M200 140 236 120 270 104 300 86" fill="none" stroke={K.cyan} strokeWidth="4.5" strokeLinecap="round" strokeDasharray="2 9" />
      <path d="M200 140 236 112 270 84 300 60V104L270 124 236 134Z" fill={K.bright} opacity=".14" />
      <line x1="200" x2="200" y1="76" y2="200" stroke={K.navy} strokeWidth="2" strokeDasharray="4 5" />
      {[[130, 170], [164, 178], [200, 140]].map(([x, y]) => (<circle key={x} cx={x} cy={y} r="5" fill="#fff" stroke={K.blue} strokeWidth="3" />))}
      <Badge name="calendar" x={326} y={200} r={25} />
      <Chip name="sparkle" x={88} y={232} r={14} />
    </g>
  );
}

function SceneFactory() {
  return (
    <g>
      <Shadow />
      <path d="M84 214V138l56 28V138l56 28V138l56 28V92h30v122Z" fill={K.tint} stroke={K.navy} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="252" y="62" width="22" height="30" rx="3" fill={K.navy} /><circle cx="262" cy="52" r="9" fill={K.soft} /><circle cx="280" cy="40" r="6" fill={K.soft2} />
      {[110, 168, 226].map((x) => (<rect key={x} x={x} y="180" width="26" height="22" rx="3" fill={K.bright} opacity=".85" />))}
      <rect x="84" y="206" width="252" height="10" rx="5" fill={K.navy} />
      <Badge name="gear" x={326} y={150} r={27} />
      <Chip name="calendar" x={92} y={92} r={16} />
    </g>
  );
}

/* ───────────────────────── scene registry ───────────────────────── */

type Spec =
  | { t: "browser"; ui: BrowserUi; badge: Glyph; extra?: Glyph }
  | { t: "editor"; badge: Glyph; extra?: Glyph }
  | { t: "scene"; node: () => ReactNode };

const B = (ui: BrowserUi, badge: Glyph, extra?: Glyph): Spec => ({ t: "browser", ui, badge, extra });
const E = (badge: Glyph, extra?: Glyph): Spec => ({ t: "editor", badge, extra });
const S = (node: () => ReactNode): Spec => ({ t: "scene", node });

const SCENES: Record<string, Spec> = {
  /* main service categories */
  "software-development": E("gear", "sparkle"),
  "website-development": B("hero", "code", "palette"),
  "shopify-development": B("shop", "bag", "cart"),
  "video-animation": S(SceneExplainer),
  "graphic-design": S(SceneArt),
  seo: B("chart", "search", "target"),
  "ai-development": S(() => <SceneChip />),

  /* video & animation */
  "explainer-videos": S(SceneExplainer),
  "2d-animated-explainer-videos": S(SceneAnim2d),
  "3d-animation-services": S(SceneAnim3d),
  "3d-product-animation-services": S(SceneProduct3d),
  "whiteboard-animation-services": S(SceneWhiteboard),
  "motion-graphics": S(SceneMotion),
  "saas-explainer-videos": S(() => <LaptopSaas />),
  "product-explanation-videos": S(SceneProductVideo),
  "saas-product-demo-videos": S(() => <LaptopSaas cursor />),
  "promotional-video-production": S(ScenePromo),
  "corporate-video-production": S(SceneCamera),
  "social-media-videos": S(() => <ScenePhone />),
  "ai-video-automation": S(SceneAiVideo),

  /* software: industry */
  "medical-hospital-software-development": B("dash", "cross", "heart"),
  "laboratory-software-development": B("dash", "flask", "bars"),
  "retail-shop-software-development": B("shop", "store", "cart"),
  "cybersecurity-software-development": E("shield", "database"),
  "school-software-development": B("dash", "cap", "calendar"),
  "ai-software-development": E("chip", "sparkle"),

  /* software: planning */
  "ai-business-planning-software": B("chart", "sparkle", "target"),
  "business-analytics-reporting-software": B("dash", "pie", "bars"),
  "demand-forecasting-software": S(SceneForecast),
  "erp-integration-services": S(SceneErp),
  "inventory-optimization-software": S(SceneBoxes),
  "production-planning-software": S(SceneFactory),
  "replenishment-planning-software": S(SceneChain),
  "retail-wholesale-planning-software": B("shop", "bars", "store"),
  "sales-operations-planning-software": B("chart", "target", "calendar"),
  "supply-chain-planning-software": S(SceneChain),

  /* websites */
  "real-estate-websites": B("hero", "house", "search"),
  "ecommerce-websites": B("shop", "cart", "bag"),
  "hospital-websites": B("hero", "cross", "heart"),
  "school-websites": B("hero", "cap", "calendar"),
  "agency-websites": B("grid", "target", "palette"),
  "startup-websites": B("hero", "rocket", "sparkle"),
  "custom-websites": B("hero", "code", "gear"),
  "wordpress-websites": B("grid", "blocks", "layers"),
  "woocommerce-websites": B("shop", "cart", "blocks"),
  "elementor-websites": B("hero", "columns", "layers"),

  /* shopify */
  "shopify-store-development": B("shop", "bag", "store"),
  "shopify-tools-services": B("shop", "wrench", "gear"),
  "dropshipping-store-development": S(SceneChain),
  "shopify-ecommerce-development": B("shop", "code", "cart"),
  "shopify-ecommerce-seo": B("shop", "search", "line"),
  "single-product-shopify-store": B("single", "bag", "sparkle"),

  /* AI development page */
  "ai-video-development": S(SceneAiVideo),
  "ai-website-development": B("hero", "sparkle", "code"),
  "ai-image-creation": S(SceneImage),
  "ai-design": S(SceneArt),
  "ai-agents": S(() => <SceneRobot extra="cross" />),

  /* home AI showcase (by kind) */
  "ai-kind-agent": S(() => <SceneRobot />),
  "ai-kind-chatbot": S(SceneChat),
  "ai-kind-workflow": S(SceneFlow),
  "ai-kind-voice": S(SceneVoice),
  "ai-kind-saas": S(SceneCloud),

  /* service-list cards on service pages (website development) */
  "svc-web-custom": B("hero", "code", "gear"),
  "svc-web-business": B("hero", "store", "target"),
  "svc-web-wordpress": B("grid", "blocks", "layers"),
  "svc-web-elementor": B("hero", "columns", "layers"),
  "svc-web-landing": B("hero", "target", "rocket"),
  "svc-web-app": B("dash", "code", "cloud"),
  "svc-web-redesign": B("hero", "wrench", "brush"),

  /* service-list cards (software development) */
  "svc-sw-custom": E("gear", "sparkle"),
  "svc-sw-saas": S(SceneCloud),
  "svc-sw-webapp": B("dash", "code", "cloud"),
  "svc-sw-crm": S(SceneErp),
  "svc-sw-ai": E("chip", "sparkle"),
  "svc-sw-api": E("plug", "nodes"),
  "svc-sw-automation": S(SceneFlow),

  /* service-list cards (Shopify) */
  "svc-shopify-new": B("shop", "store", "bag"),
  "svc-shopify-theme": B("shop", "brush", "palette"),
  "svc-shopify-apps": B("shop", "plug", "blocks"),
  "svc-shopify-speed": B("chart", "gauge", "line"),
  "svc-shopify-support": B("shop", "headset", "heart"),
};

const FALLBACK_BY_MAIN: Record<string, string> = {
  "software-development": "software-development",
  "website-development": "website-development",
  "shopify-development": "shopify-development",
  "video-animation": "video-animation",
  "ai-development": "ai-development",
};

export function illustrationKeyFor(slug: string, mainSlug?: string): string {
  if (SCENES[slug]) return slug;
  return (mainSlug && FALLBACK_BY_MAIN[mainSlug]) || "website-development";
}

function variantOf(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h % 6;
}

export default function ServiceIllustration({ illustration }: { illustration: string }) {
  const spec = SCENES[illustration] ?? SCENES["website-development"];
  const v = variantOf(illustration);
  return (
    <Frame v={v}>
      {spec.t === "browser" && (
        <>
          <Browser ui={spec.ui} />
          <Badge name={spec.badge} x={334} y={196} />
          {spec.extra && <Chip name={spec.extra} x={340} y={86} />}
        </>
      )}
      {spec.t === "editor" && (
        <>
          <Editor />
          <Badge name={spec.badge} x={334} y={196} />
          {spec.extra && <Chip name={spec.extra} x={340} y={86} />}
        </>
      )}
      {spec.t === "scene" && spec.node()}
    </Frame>
  );
}

export const illustrationKeys = Object.keys(SCENES);
