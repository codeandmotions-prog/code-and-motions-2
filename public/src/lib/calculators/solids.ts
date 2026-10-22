/** Volume and surface-area engines for common 3D solids. */

const PI = Math.PI;

export type SolidId =
  | "sphere"
  | "cone"
  | "cube"
  | "cylinder"
  | "box"
  | "capsule"
  | "cap"
  | "frustum"
  | "ellipsoid"
  | "pyramid"
  | "tube";

export type SolidField = { id: string; label: string; hint?: string };

export const SOLIDS: Record<SolidId, { label: string; fields: SolidField[]; volume: boolean; area: boolean }> = {
  sphere: { label: "Sphere", fields: [{ id: "r", label: "Radius (r)" }], volume: true, area: true },
  cone: {
    label: "Cone",
    fields: [
      { id: "r", label: "Base radius (r)" },
      { id: "h", label: "Height (h)" },
    ],
    volume: true,
    area: true,
  },
  cube: { label: "Cube", fields: [{ id: "a", label: "Edge length (a)" }], volume: true, area: true },
  cylinder: {
    label: "Cylinder",
    fields: [
      { id: "r", label: "Radius (r)" },
      { id: "h", label: "Height (h)" },
    ],
    volume: true,
    area: true,
  },
  box: {
    label: "Rectangular box",
    fields: [
      { id: "l", label: "Length (l)" },
      { id: "w", label: "Width (w)" },
      { id: "h", label: "Height (h)" },
    ],
    volume: true,
    area: true,
  },
  capsule: {
    label: "Capsule",
    fields: [
      { id: "r", label: "Radius of the ends (r)" },
      { id: "h", label: "Length of the cylindrical middle (h)" },
    ],
    volume: true,
    area: true,
  },
  cap: {
    label: "Spherical cap",
    fields: [
      { id: "R", label: "Sphere radius (R)" },
      { id: "h", label: "Cap height (h)" },
    ],
    volume: true,
    area: true,
  },
  frustum: {
    label: "Conical frustum",
    fields: [
      { id: "r1", label: "Bottom radius (r₁)" },
      { id: "r2", label: "Top radius (r₂)" },
      { id: "h", label: "Height (h)" },
    ],
    volume: true,
    area: true,
  },
  ellipsoid: {
    label: "Ellipsoid",
    fields: [
      { id: "a", label: "Semi-axis a" },
      { id: "b", label: "Semi-axis b" },
      { id: "c", label: "Semi-axis c" },
    ],
    volume: true,
    area: true,
  },
  pyramid: {
    label: "Square pyramid",
    fields: [
      { id: "a", label: "Base edge (a)" },
      { id: "h", label: "Height (h)" },
    ],
    volume: true,
    area: true,
  },
  tube: {
    label: "Tube (hollow cylinder)",
    fields: [
      { id: "R", label: "Outer radius (R)" },
      { id: "r", label: "Inner radius (r)" },
      { id: "h", label: "Length (h)" },
    ],
    volume: true,
    area: false,
  },
};

export type SolidValues = Record<string, number>;

/** Surface-area approximation for a general ellipsoid (Knud Thomsen). */
function ellipsoidArea(a: number, b: number, c: number): { area: number; exact: boolean } {
  const eq = (x: number, y: number) => Math.abs(x - y) <= 1e-12 * Math.max(x, y);
  if (eq(a, b) && eq(b, c)) return { area: 4 * PI * a * a, exact: true };
  // Spheroid (two equal axes): exact closed forms.
  let eqAxis: number | null = null;
  let uniq = 0;
  if (eq(a, b)) {
    eqAxis = a;
    uniq = c;
  } else if (eq(a, c)) {
    eqAxis = a;
    uniq = b;
  } else if (eq(b, c)) {
    eqAxis = b;
    uniq = a;
  }
  if (eqAxis !== null) {
    if (uniq < eqAxis) {
      const e2 = 1 - (uniq * uniq) / (eqAxis * eqAxis);
      const e = Math.sqrt(e2);
      return { area: 2 * PI * eqAxis * eqAxis * (1 + ((1 - e2) / e) * Math.atanh(e)), exact: true };
    }
    const e2 = 1 - (eqAxis * eqAxis) / (uniq * uniq);
    const e = Math.sqrt(e2);
    return { area: 2 * PI * eqAxis * eqAxis * (1 + (uniq / (eqAxis * e)) * Math.asin(e)), exact: true };
  }
  const p = 1.6075;
  const area = 4 * PI * Math.pow((Math.pow(a * b, p) + Math.pow(a * c, p) + Math.pow(b * c, p)) / 3, 1 / p);
  return { area, exact: false };
}

export function solidVolume(id: SolidId, v: SolidValues): number {
  switch (id) {
    case "sphere": return (4 / 3) * PI * v.r ** 3;
    case "cone": return (PI * v.r * v.r * v.h) / 3;
    case "cube": return v.a ** 3;
    case "cylinder": return PI * v.r * v.r * v.h;
    case "box": return v.l * v.w * v.h;
    case "capsule": return PI * v.r * v.r * v.h + (4 / 3) * PI * v.r ** 3;
    case "cap": return (PI * v.h * v.h * (3 * v.R - v.h)) / 3;
    case "frustum": return (PI * v.h * (v.r1 * v.r1 + v.r1 * v.r2 + v.r2 * v.r2)) / 3;
    case "ellipsoid": return (4 / 3) * PI * v.a * v.b * v.c;
    case "pyramid": return (v.a * v.a * v.h) / 3;
    case "tube": return PI * v.h * (v.R * v.R - v.r * v.r);
  }
}

export function solidArea(id: SolidId, v: SolidValues): { total: number; parts?: [string, number][]; note?: string } {
  switch (id) {
    case "sphere": return { total: 4 * PI * v.r * v.r };
    case "cone": {
      const slant = Math.sqrt(v.r * v.r + v.h * v.h);
      return { total: PI * v.r * (v.r + slant), parts: [["Base", PI * v.r * v.r], ["Lateral (curved) surface", PI * v.r * slant]] };
    }
    case "cube": return { total: 6 * v.a * v.a };
    case "cylinder":
      return { total: 2 * PI * v.r * (v.r + v.h), parts: [["Two circular ends", 2 * PI * v.r * v.r], ["Lateral (curved) surface", 2 * PI * v.r * v.h]] };
    case "box": return { total: 2 * (v.l * v.w + v.l * v.h + v.w * v.h) };
    case "capsule":
      return { total: 2 * PI * v.r * v.h + 4 * PI * v.r * v.r, parts: [["Cylindrical middle", 2 * PI * v.r * v.h], ["Two hemispherical ends", 4 * PI * v.r * v.r]] };
    case "cap": {
      const base = PI * v.h * (2 * v.R - v.h);
      const curved = 2 * PI * v.R * v.h;
      return { total: curved + base, parts: [["Curved surface", curved], ["Flat circular base", base]], note: "Total includes the flat base. For a hollow cap, use the curved surface only." };
    }
    case "frustum": {
      const slant = Math.sqrt(v.h * v.h + (v.r1 - v.r2) * (v.r1 - v.r2));
      return {
        total: PI * (v.r1 * v.r1 + v.r2 * v.r2 + (v.r1 + v.r2) * slant),
        parts: [["Bottom circle", PI * v.r1 * v.r1], ["Top circle", PI * v.r2 * v.r2], ["Lateral (curved) surface", PI * (v.r1 + v.r2) * slant]],
      };
    }
    case "ellipsoid": {
      const e = ellipsoidArea(v.a, v.b, v.c);
      return { total: e.area, note: e.exact ? undefined : "Approximation (Knud Thomsen formula, p ≈ 1.6075) with a maximum relative error of about 1.06%." };
    }
    case "pyramid": {
      const slant = Math.sqrt(v.h * v.h + (v.a / 2) ** 2);
      return { total: v.a * v.a + 2 * v.a * slant, parts: [["Square base", v.a * v.a], ["Four triangular faces", 2 * v.a * slant]] };
    }
    case "tube": {
      const outer = 2 * PI * v.R * v.h;
      const inner = 2 * PI * v.r * v.h;
      const ends = 2 * PI * (v.R * v.R - v.r * v.r);
      return { total: outer + inner + ends };
    }
  }
}

/** Resolve a spherical cap from any two of base radius (a), sphere radius (R), height (h). */
export function resolveCap(
  known: { R?: number; h?: number; a?: number },
  largerCap = false,
): { R: number; h: number; a: number } | { error: string } {
  const { R, h, a } = known;
  if (R !== undefined && h !== undefined) {
    if (h > 2 * R) return { error: "The cap height cannot be more than the sphere's diameter." };
    return { R, h, a: Math.sqrt(h * (2 * R - h)) };
  }
  if (a !== undefined && h !== undefined) {
    return { R: (a * a + h * h) / (2 * h), h, a };
  }
  if (a !== undefined && R !== undefined) {
    if (a > R) return { error: "The base radius cannot be larger than the sphere radius." };
    const root = Math.sqrt(R * R - a * a);
    return { R, a, h: largerCap ? R + root : R - root };
  }
  return { error: "Enter exactly two of the three values." };
}

export const LENGTH_UNITS: { id: string; label: string; m: number; abbr: string }[] = [
  { id: "mm", label: "Millimetres", m: 0.001, abbr: "mm" },
  { id: "cm", label: "Centimetres", m: 0.01, abbr: "cm" },
  { id: "m", label: "Metres", m: 1, abbr: "m" },
  { id: "km", label: "Kilometres", m: 1000, abbr: "km" },
  { id: "in", label: "Inches", m: 0.0254, abbr: "in" },
  { id: "ft", label: "Feet", m: 0.3048, abbr: "ft" },
  { id: "yd", label: "Yards", m: 0.9144, abbr: "yd" },
  { id: "mi", label: "Miles", m: 1609.344, abbr: "mi" },
];
