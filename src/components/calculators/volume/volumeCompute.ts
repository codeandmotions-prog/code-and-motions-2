import { solidVolume, resolveCap, LENGTH_UNITS, type SolidId } from "@/lib/calculators/solids";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { fmt } from "@/lib/calculators/format";
import { VOLUME_UNITS, volumeUnit, type ShapeConfig } from "./volumeData";

export const AUTO_UNIT = "auto";

export type VolumeStat = { label: string; value: string };

export type VolumeOutcome =
  | { ok: true; m3: number; headline: { label: string; value: string }; stats: VolumeStat[]; note: string }
  | { ok: false; errors: Record<string, string> };

const lengthUnit = (id: string) => LENGTH_UNITS.find((u) => u.id === id) ?? LENGTH_UNITS[1];

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
    stats,
    note: "Litre and gallon conversions use exact definitions (1 US gal = 3.785411784 L, 1 UK gal = 4.54609 L).",
  };
}
