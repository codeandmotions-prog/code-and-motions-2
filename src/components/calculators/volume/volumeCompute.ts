import { solidVolume, resolveCap, LENGTH_UNITS, type SolidId } from "@/lib/calculators/solids";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { fmt } from "@/lib/calculators/format";
import { VOLUME_UNITS, volumeUnit, type ShapeConfig } from "./volumeData";

export const AUTO_UNIT = "auto";

export type VolumeStat = { label: string; value: string };

/** The substitution shown in the result panel: formula with the entered numbers, then the answer in the working unit. */
export type VolumeWorking = { substituted: string; result: string; unitNote?: string };

export type VolumeOutcome =
  | { ok: true; m3: number; headline: { label: string; value: string }; working: VolumeWorking; stats: VolumeStat[]; note: string }
  | { ok: false; errors: Record<string, string> };

const lengthUnit = (id: string) => LENGTH_UNITS.find((u) => u.id === id) ?? LENGTH_UNITS[1];

/** Formula with the numbers put in, mirroring the symbolic formula in `volumeData`. `d` holds display strings. */
function substitute(id: SolidId, d: Record<string, string>): string {
  switch (id) {
    case "sphere": return `4/3 × π × ${d.r}³`;
    case "cone": return `1/3 × π × ${d.r}² × ${d.h}`;
    case "cube": return `${d.a}³`;
    case "cylinder": return `π × ${d.r}² × ${d.h}`;
    case "box": return `${d.l} × ${d.w} × ${d.h}`;
    case "capsule": return `π × ${d.r}² × ${d.h} + 4/3 × π × ${d.r}³`;
    case "cap": return `1/3 × π × ${d.h}² × (3 × ${d.R} − ${d.h})`;
    case "frustum": return `1/3 × π × ${d.h} × (${d.r1}² + ${d.r1} × ${d.r2} + ${d.r2}²)`;
    case "ellipsoid": return `4/3 × π × ${d.a} × ${d.b} × ${d.c}`;
    case "pyramid": return `1/3 × ${d.a}² × ${d.h}`;
    case "tube": return `π × ${d.h} × (${d.R}² − ${d.r}²)`;
  }
}

/**
 * Volume for one shape. Each dimension has its own length unit; everything is converted to metres, run through the
 * unchanged `solidVolume` engine, and the result is expressed in the requested volume unit.
 */
export function computeVolume(
  shape: ShapeConfig,
  values: Values,
  units: Record<string, string>,
  outUnit: string,
): VolumeOutcome {
  const errors: Record<string, string> = {};
  const id = shape.id as SolidId;
  const metres: Record<string, number> = {};
  const given: Record<string, number> = {};

  for (const f of shape.fields) {
    const label = shape.id === "cap" ? f.label : f.label;
    const n = readNum(values, f.id, { label, gt: 0, max: 1e12, optional: !!f.optional }, errors);
    if (n !== null) given[f.id] = n * lengthUnit(units[f.id]).m;
  }
  if (hasErrors(errors)) return { ok: false, errors };

  if (id === "cap") {
    const known: { R?: number; h?: number; a?: number } = {};
    for (const k of ["R", "h", "a"] as const) if (k in given) known[k] = given[k];
    const count = Object.keys(known).length;
    if (count !== 2) return { ok: false, errors: { R: `Enter exactly two of R, h and a (you entered ${count}).` } };
    const res = resolveCap(known);
    if ("error" in res) return { ok: false, errors: { R: res.error } };
    metres.R = res.R;
    metres.h = res.h;
  } else {
    Object.assign(metres, given);
    if (id === "tube" && metres.r >= metres.R) {
      return { ok: false, errors: { r: "The inner radius must be smaller than the outer radius." } };
    }
  }

  const m3 = solidVolume(id, metres);
  if (!Number.isFinite(m3)) return { ok: false, errors: { [shape.fields[0].id]: "These values are too large to calculate." } };

  const firstField = shape.fields.find((f) => (values[f.id] ?? "").trim() !== "") ?? shape.fields[0];
  const auto = lengthUnit(units[firstField.id]);
  const out = outUnit === AUTO_UNIT ? null : volumeUnit(outUnit);
  const headlineValue = out ? m3 / out.m3 : m3 / auto.m ** 3;
  const headlineUnit = out ? out.abbr : `${auto.abbr}³`;

  // Working is shown in the first length unit; entries in other units are converted into it.
  const shown: Record<string, string> = {};
  for (const [k, v] of Object.entries(metres)) shown[k] = fmt(v / auto.m, 8);
  const mixed = shape.fields.some((f) => (values[f.id] ?? "").trim() !== "" && units[f.id] !== units[firstField.id]);
  const working: VolumeWorking = {
    substituted: substitute(id, shown),
    result: `${fmt(m3 / auto.m ** 3, 10)} ${auto.abbr}³`,
    unitNote: mixed ? `Working is shown in ${auto.label.toLowerCase()}; entries in other units were converted first.` : undefined,
  };

  const byId = (u: string) => VOLUME_UNITS.find((x) => x.id === u)!;
  const stats: VolumeStat[] = [
    { label: "Litres", value: `${fmt(m3 / byId("l").m3, 10)} L` },
    { label: "Cubic metres", value: `${fmt(m3, 10)} m³` },
    { label: "Cubic feet", value: `${fmt(m3 / byId("ft3").m3, 10)} ft³` },
    { label: "US gallons", value: `${fmt(m3 / byId("usgal").m3, 10)} gal` },
    { label: "Imperial (UK) gallons", value: `${fmt(m3 / byId("ukgal").m3, 10)} gal` },
  ];

  return {
    ok: true,
    m3,
    headline: { label: `Volume of the ${shape.short.toLowerCase()}`, value: `${fmt(headlineValue, 10)} ${headlineUnit}` },
    working,
    stats,
    note: "Litre and gallon conversions use exact definitions (1 US gal = 3.785411784 L, 1 UK gal = 4.54609 L).",
  };
}
