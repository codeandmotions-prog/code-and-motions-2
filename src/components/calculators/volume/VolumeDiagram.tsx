import type { ReactNode } from "react";
import type { SolidId } from "@/lib/calculators/solids";

/**
 * Original technical diagrams for the volume calculators. Every dimension the calculator asks for is marked
 * with the same symbol that appears on the input label (r, h, a, l, w, R, r₁, r₂, a/b/c).
 * Server- and client-safe, decorative geometry only; each SVG carries a text alternative.
 */

const INK = "#0b1c4d";
const BLUE = "#1547e0";
const FILL = "#e8eeff";
const FILL_DARK = "#d3defa";
const HOLE = "#bccaf0";

const outline = { stroke: INK, strokeWidth: 1.8, strokeLinejoin: "round", strokeLinecap: "round" } as const;
const hidden = { stroke: INK, strokeWidth: 1.3, strokeDasharray: "4 3.5", opacity: 0.45, fill: "none" } as const;
const dim = { stroke: BLUE, strokeWidth: 2.4, strokeLinecap: "round" } as const;
const thin = { stroke: INK, strokeWidth: 1, opacity: 0.45, fill: "none" } as const;

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={16} fontWeight={800} fontStyle="italic" fill={BLUE} stroke="#fff" strokeWidth={3} paintOrder="stroke" strokeLinejoin="round">
      {children}
    </text>
  );
}

function Line({ x1, y1, x2, y2, dashed }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} {...dim} strokeDasharray={dashed ? "5 4" : undefined} />;
}

function Dot({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={3.2} fill={BLUE} />;
}

/** Vertical measurement with end ticks, drawn to the right of a shape. */
function VDim({ x, y1, y2, from, label }: { x: number; y1: number; y2: number; from: number; label: string }) {
  return (
    <g>
      <line x1={from} y1={y1} x2={x + 6} y2={y1} {...thin} />
      <line x1={from} y1={y2} x2={x + 6} y2={y2} {...thin} />
      <Line x1={x} y1={y1} x2={x} y2={y2} />
      <line x1={x - 5} y1={y1} x2={x + 5} y2={y1} {...dim} />
      <line x1={x - 5} y1={y2} x2={x + 5} y2={y2} {...dim} />
      <Label x={x + 13} y={(y1 + y2) / 2 + 5} anchor="start">{label}</Label>
    </g>
  );
}

const ALT: Record<SolidId, string> = {
  sphere: "Diagram of a sphere with its radius r drawn from the centre to the surface.",
  cone: "Diagram of a cone with base radius r and perpendicular height h marked.",
  cube: "Diagram of a cube with edge length a marked on three edges.",
  cylinder: "Diagram of a cylinder with base radius r and height h marked.",
  box: "Diagram of a rectangular box with length l, width w and height h marked.",
  capsule: "Diagram of a capsule with end radius r and the length h of the straight cylindrical middle marked.",
  cap: "Diagram of a spherical cap cut from a sphere of radius R, with cap height h and base radius a marked.",
  frustum: "Diagram of a conical frustum with bottom radius r1, top radius r2 and height h marked.",
  ellipsoid: "Diagram of an ellipsoid with semi-axes a, b and c drawn from the centre.",
  pyramid: "Diagram of a square pyramid with base edge a and perpendicular height h marked.",
  tube: "Diagram of a hollow tube with outer radius R, inner radius r and length h marked.",
};

function Sphere() {
  return (
    <>
      <circle cx={120} cy={95} r={68} fill={FILL} {...outline} />
      <path d="M52 95 A68 17 0 0 0 188 95" {...thin} opacity={0.7} />
      <path d="M52 95 A68 17 0 0 1 188 95" {...hidden} />
      <Line x1={120} y1={95} x2={188} y2={95} />
      <Dot x={120} y={95} />
      <Label x={155} y={88}>r</Label>
    </>
  );
}

function Cone() {
  return (
    <>
      <path d="M58 155 L120 25 L182 155 A62 14 0 0 1 58 155 Z" fill={FILL} {...outline} />
      <path d="M58 155 A62 14 0 0 1 182 155" {...hidden} />
      <Line x1={120} y1={25} x2={120} y2={155} dashed />
      <Line x1={120} y1={155} x2={182} y2={155} />
      <Dot x={120} y={155} />
      <Label x={110} y={98} anchor="end">h</Label>
      <Label x={153} y={146}>r</Label>
    </>
  );
}

function Cube() {
  return (
    <>
      <path d="M40 75 L84 39 L164 39 L120 75 Z" fill={FILL} {...outline} />
      <path d="M120 75 L164 39 L164 119 L120 155 Z" fill={FILL_DARK} {...outline} />
      <rect x={40} y={75} width={80} height={80} fill={FILL} {...outline} />
      <path d="M40 155 L84 119 L164 119 M84 119 L84 39" {...hidden} />
      <Line x1={40} y1={155} x2={120} y2={155} />
      <Line x1={40} y1={75} x2={40} y2={155} />
      <Line x1={120} y1={155} x2={164} y2={119} />
      <Label x={80} y={177}>a</Label>
      <Label x={28} y={120} anchor="end">a</Label>
      <Label x={150} y={152} anchor="start">a</Label>
    </>
  );
}

function Cylinder() {
  return (
    <>
      <path d="M56 48 L56 148 A54 14 0 0 0 164 148 L164 48 Z" fill={FILL} {...outline} />
      <path d="M56 148 A54 14 0 0 1 164 148" {...hidden} />
      <ellipse cx={110} cy={48} rx={54} ry={14} fill={FILL_DARK} {...outline} />
      <Line x1={110} y1={48} x2={164} y2={48} />
      <Dot x={110} y={48} />
      <Label x={137} y={67}>r</Label>
      <VDim x={190} y1={48} y2={148} from={164} label="h" />
    </>
  );
}

function Box() {
  return (
    <>
      <path d="M36 80 L88 42 L188 42 L136 80 Z" fill={FILL} {...outline} />
      <path d="M136 80 L188 42 L188 122 L136 160 Z" fill={FILL_DARK} {...outline} />
      <rect x={36} y={80} width={100} height={80} fill={FILL} {...outline} />
      <path d="M36 160 L88 122 L188 122 M88 122 L88 42" {...hidden} />
      <Line x1={36} y1={160} x2={136} y2={160} />
      <Line x1={36} y1={80} x2={36} y2={160} />
      <Line x1={136} y1={160} x2={188} y2={122} />
      <Label x={86} y={180}>l</Label>
      <Label x={24} y={125} anchor="end">h</Label>
      <Label x={166} y={156} anchor="start">w</Label>
    </>
  );
}

function Capsule() {
  return (
    <>
      <path d="M70 62 A40 40 0 0 1 150 62 L150 132 A40 40 0 0 1 70 132 Z" fill={FILL} {...outline} />
      <path d="M70 62 L150 62 M70 132 L150 132" {...hidden} />
      <Line x1={110} y1={62} x2={150} y2={62} />
      <Dot x={110} y={62} />
      <Label x={130} y={55}>r</Label>
      <VDim x={178} y1={62} y2={132} from={150} label="h" />
    </>
  );
}

function Cap() {
  return (
    <>
      <circle cx={120} cy={105} r={68} {...hidden} />
      <path d="M58 77 A68 68 0 0 1 182 77 A62 13 0 0 1 58 77 Z" fill={FILL} {...outline} />
      <path d="M58 77 A62 13 0 0 1 182 77" {...hidden} opacity={0.35} />
      <Line x1={120} y1={37} x2={120} y2={77} dashed />
      <Line x1={120} y1={77} x2={182} y2={77} />
      <Line x1={120} y1={105} x2={182} y2={77} />
      <Dot x={120} y={105} />
      <Label x={111} y={62} anchor="end">h</Label>
      <Label x={153} y={71}>a</Label>
      <Label x={148} y={111} anchor="start">R</Label>
    </>
  );
}

function Frustum() {
  return (
    <>
      <path d="M46 152 L74 48 A36 8 0 0 1 146 48 L174 152 A64 14 0 0 1 46 152 Z" fill={FILL} {...outline} />
      <path d="M46 152 A64 14 0 0 1 174 152" {...hidden} />
      <ellipse cx={110} cy={48} rx={36} ry={8} fill={FILL_DARK} {...outline} />
      <Line x1={110} y1={48} x2={110} y2={152} dashed />
      <Line x1={110} y1={152} x2={174} y2={152} />
      <Line x1={110} y1={48} x2={146} y2={48} />
      <Dot x={110} y={152} />
      <Dot x={110} y={48} />
      <Label x={101} y={108} anchor="end">h</Label>
      <Label x={142} y={145}>r₁</Label>
      <Label x={129} y={66}>r₂</Label>
    </>
  );
}

function Ellipsoid() {
  return (
    <>
      <ellipse cx={120} cy={95} rx={84} ry={52} fill={FILL} {...outline} />
      <path d="M36 95 A84 18 0 0 1 204 95" {...hidden} />
      <path d="M36 95 A84 18 0 0 0 204 95" {...thin} opacity={0.7} />
      <Line x1={120} y1={95} x2={204} y2={95} />
      <Line x1={120} y1={95} x2={120} y2={43} />
      <Line x1={120} y1={95} x2={92} y2={112} />
      <Dot x={120} y={95} />
      <Label x={166} y={88}>a</Label>
      <Label x={110} y={70} anchor="end">b</Label>
      <Label x={86} y={131} anchor="end">c</Label>
    </>
  );
}

function Pyramid() {
  return (
    <>
      <path d="M121 28 L46 146 L150 146 Z" fill={FILL} {...outline} />
      <path d="M121 28 L150 146 L196 118 Z" fill={FILL_DARK} {...outline} />
      <path d="M121 28 L92 118 M92 118 L196 118 M92 118 L46 146" {...hidden} />
      <Line x1={121} y1={28} x2={121} y2={132} dashed />
      <Dot x={121} y={132} />
      <Line x1={46} y1={146} x2={150} y2={146} />
      <Line x1={150} y1={146} x2={196} y2={118} />
      <Label x={113} y={85} anchor="end">h</Label>
      <Label x={98} y={170}>a</Label>
      <Label x={181} y={146} anchor="start">a</Label>
    </>
  );
}

function Tube() {
  return (
    <>
      <path d="M50 50 L50 148 A60 15 0 0 0 170 148 L170 50 Z" fill={FILL} {...outline} />
      <path d="M50 148 A60 15 0 0 1 170 148" {...hidden} />
      <ellipse cx={110} cy={50} rx={60} ry={15} fill={FILL_DARK} {...outline} />
      <ellipse cx={110} cy={50} rx={34} ry={9} fill={HOLE} {...outline} strokeWidth={1.5} />
      <Line x1={110} y1={50} x2={170} y2={50} />
      <Line x1={110} y1={50} x2={76} y2={50} />
      <Dot x={110} y={50} />
      <Label x={142} y={73}>R</Label>
      <Label x={92} y={73}>r</Label>
      <VDim x={194} y1={50} y2={148} from={170} label="h" />
    </>
  );
}

const PARTS: Record<SolidId, () => ReactNode> = {
  sphere: Sphere,
  cone: Cone,
  cube: Cube,
  cylinder: Cylinder,
  box: Box,
  capsule: Capsule,
  cap: Cap,
  frustum: Frustum,
  ellipsoid: Ellipsoid,
  pyramid: Pyramid,
  tube: Tube,
};

export default function VolumeDiagram({ shape, className }: { shape: SolidId; className?: string }) {
  const Part = PARTS[shape];
  return (
    <svg viewBox="0 0 240 190" role="img" aria-label={ALT[shape]} className={className} focusable="false">
      <Part />
    </svg>
  );
}
