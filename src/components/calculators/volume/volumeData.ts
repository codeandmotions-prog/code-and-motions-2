import { SOLIDS, type SolidId, LENGTH_UNITS } from "@/lib/calculators/solids";

/** Shapes in the order they appear on the page. */
export const SHAPE_ORDER: SolidId[] = [
  "sphere",
  "cone",
  "cube",
  "cylinder",
  "box",
  "capsule",
  "cap",
  "frustum",
  "ellipsoid",
  "pyramid",
  "tube",
];

export type ShapeField = {
  /** Key used by the engine in `solids.ts` (R, h, a, ...). */
  id: string;
  label: string;
  /** Short symbol shown next to the label. */
  symbol: string;
  def: string;
  /** Spherical cap only: leave blank by default. */
  optional?: boolean;
  hint?: string;
};

export type ShapeConfig = {
  id: SolidId;
  /** Heading of the per-shape calculator. */
  title: string;
  /** Name used in the jump links and tables. */
  short: string;
  /** Plain-text formula, used in the calculator card and the formula table. */
  formula: string;
  /** What the dimensions mean, for the formula table. */
  variables: string;
  fields: ShapeField[];
  /** Everyday objects this shape fits. */
  fits: string;
};

const DEF: Record<string, string> = { r: "3", h: "10", a: "4", l: "6", w: "4", R: "5", r1: "4", r2: "2", b: "3", c: "2" };

const SYMBOL: Record<string, string> = { r1: "r₁", r2: "r₂" };

function fieldsFor(id: SolidId): ShapeField[] {
  if (id === "cap") {
    return [
      { id: "R", label: "Sphere radius", symbol: "R", def: "5", optional: true, hint: "Enter exactly two of R, h and a; leave the third blank." },
      { id: "h", label: "Cap height", symbol: "h", def: "2", optional: true },
      { id: "a", label: "Cap base radius", symbol: "a", def: "", optional: true },
    ];
  }
  return SOLIDS[id].fields.map((f) => {
    const m = /\(([^)]+)\)\s*$/.exec(f.label);
    const symbol = m ? m[1] : f.label.replace("Semi-axis ", "");
    const label = m ? f.label.replace(/\s*\([^)]+\)\s*$/, "") : f.label;
    return { id: f.id, label: id === "ellipsoid" ? `Semi-axis ${symbol}` : label, symbol: SYMBOL[f.id] ?? symbol, def: DEF[f.id] ?? "1" };
  });
}

const META: Record<SolidId, { title: string; short: string; formula: string; variables: string; fits: string }> = {
  sphere: {
    title: "Sphere volume calculator",
    short: "Sphere",
    formula: "V = 4/3 × π × r³",
    variables: "r = radius (half the diameter)",
    fits: "Balls, spherical tanks, bubbles, ball bearings",
  },
  cone: {
    title: "Cone volume calculator",
    short: "Cone",
    formula: "V = 1/3 × π × r² × h",
    variables: "r = base radius, h = perpendicular height (not the slant length)",
    fits: "Funnels, traffic cones, conical piles of sand or gravel, ice-cream cones",
  },
  cube: {
    title: "Cube volume calculator",
    short: "Cube",
    formula: "V = a³",
    variables: "a = edge length (all edges are equal)",
    fits: "Dice, storage cubes, cube-shaped boxes and blocks",
  },
  cylinder: {
    title: "Cylinder volume calculator",
    short: "Cylinder",
    formula: "V = π × r² × h",
    variables: "r = radius of the circular base, h = height (length)",
    fits: "Round water tanks, cans, drums, wells, columns, concrete piers",
  },
  box: {
    title: "Rectangular box volume calculator",
    short: "Rectangular box",
    formula: "V = l × w × h",
    variables: "l = length, w = width, h = height",
    fits: "Boxes, rooms, rectangular tanks, pools, concrete slabs, planters",
  },
  capsule: {
    title: "Capsule volume calculator",
    short: "Capsule",
    formula: "V = π × r² × h + 4/3 × π × r³",
    variables: "r = radius of the hemispherical ends, h = length of the straight cylindrical middle only",
    fits: "Pills, capsule-shaped tanks and pressure vessels with domed ends",
  },
  cap: {
    title: "Spherical cap volume calculator",
    short: "Spherical cap",
    formula: "V = 1/3 × π × h² × (3R − h)",
    variables: "R = sphere radius, h = cap height, a = cap base radius, with a² = h × (2R − h)",
    fits: "Domes, bowls, the liquid in a part-filled spherical tank, lenses",
  },
  frustum: {
    title: "Conical frustum volume calculator",
    short: "Conical frustum",
    formula: "V = 1/3 × π × h × (r₁² + r₁ × r₂ + r₂²)",
    variables: "r₁ = bottom radius, r₂ = top radius, h = height between the two circles",
    fits: "Buckets, flower pots, lampshades, tapered cups, cone-shaped hoppers",
  },
  ellipsoid: {
    title: "Ellipsoid volume calculator",
    short: "Ellipsoid",
    formula: "V = 4/3 × π × a × b × c",
    variables: "a, b, c = the three semi-axes (half of the full width, height and depth)",
    fits: "Rugby balls, eggs, oval tanks, planets modelled as spheroids",
  },
  pyramid: {
    title: "Square pyramid volume calculator",
    short: "Square pyramid",
    formula: "V = 1/3 × a² × h",
    variables: "a = base edge, h = perpendicular height from the base to the apex",
    fits: "Pyramids, roof hips, pyramid-shaped hoppers and monuments",
  },
  tube: {
    title: "Tube (hollow cylinder) volume calculator",
    short: "Tube",
    formula: "V = π × h × (R² − r²)",
    variables: "R = outer radius, r = inner radius, h = length. This is the volume of the wall material, not the hollow space.",
    fits: "Pipes, tubing, rings, bushings, hollow columns",
  },
};

export const SHAPES: ShapeConfig[] = SHAPE_ORDER.map((id) => ({ id, ...META[id], fields: fieldsFor(id) }));

/** Anchor of a calculator card, and of the written explanation for the same shape further down the page. */
export const shapeAnchor = (id: SolidId) => `${id}-volume-calculator`;
export const shapeGuideAnchor = (id: SolidId) => `${id}-volume-formula`;

/* ---------- Units ---------- */

export type VolumeUnit = { id: string; label: string; abbr: string; /** cubic metres in one of this unit */ m3: number };

/** All factors are exact or the international definitions (1 in = 25.4 mm exactly, 1 US gal = 231 in³, 1 UK gal = 4.54609 L). */
export const VOLUME_UNITS: VolumeUnit[] = [
  { id: "mm3", label: "Cubic millimetres", abbr: "mm³", m3: 1e-9 },
  { id: "cm3", label: "Cubic centimetres", abbr: "cm³", m3: 1e-6 },
  { id: "m3", label: "Cubic metres", abbr: "m³", m3: 1 },
  { id: "km3", label: "Cubic kilometres", abbr: "km³", m3: 1e9 },
  { id: "in3", label: "Cubic inches", abbr: "in³", m3: 0.0254 ** 3 },
  { id: "ft3", label: "Cubic feet", abbr: "ft³", m3: 0.3048 ** 3 },
  { id: "yd3", label: "Cubic yards", abbr: "yd³", m3: 0.9144 ** 3 },
  { id: "mi3", label: "Cubic miles", abbr: "mi³", m3: 1609.344 ** 3 },
  { id: "ml", label: "Millilitres", abbr: "mL", m3: 1e-6 },
  { id: "l", label: "Litres", abbr: "L", m3: 1e-3 },
  { id: "usgal", label: "US gallons", abbr: "US gal", m3: 0.003785411784 },
  { id: "ukgal", label: "Imperial (UK) gallons", abbr: "UK gal", m3: 0.00454609 },
];

export const volumeUnit = (id: string) => VOLUME_UNITS.find((u) => u.id === id);

export { LENGTH_UNITS };
