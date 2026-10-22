"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { SOLIDS, solidVolume, solidArea, resolveCap, type SolidId } from "@/lib/calculators/solids";
import { g, lengthUnitField, unitOf } from "./geoShared";

type Kind = "volume" | "area";

const DEF: Record<string, string> = { r: "3", h: "10", a: "4", l: "6", w: "4", R: "5", r1: "4", r2: "2", b: "3", c: "2" };

function ids(kind: Kind): SolidId[] {
  return (Object.keys(SOLIDS) as SolidId[]).filter((id) => (kind === "volume" ? SOLIDS[id].volume : SOLIDS[id].area));
}

function build(kind: Kind) {
  const list = ids(kind);
  const fields: FieldDef[] = [
    { id: "shape", kind: "select", label: "Shape", default: kind === "volume" ? "cylinder" : "cone", options: list.map((id) => ({ value: id, label: SOLIDS[id].label })) },
    lengthUnitField("unit", "cm"),
    ...list.flatMap((id) => {
      if (id === "cap") {
        return [
          { id: "cap_R", kind: "number", label: "Sphere radius (R)", default: "5", showIf: (v: Values) => v.shape === "cap", hint: "Enter exactly two of R, h and a; leave the third blank." },
          { id: "cap_h", kind: "number", label: "Cap height (h)", default: "2", showIf: (v: Values) => v.shape === "cap" },
          { id: "cap_a", kind: "number", label: "Cap base radius (a)", default: "", showIf: (v: Values) => v.shape === "cap" },
        ] as FieldDef[];
      }
      return SOLIDS[id].fields.map(
        (f): FieldDef => ({ id: `${id}_${f.id}`, kind: "number", label: f.label, default: DEF[f.id] ?? "1", showIf: (v) => v.shape === id }),
      );
    }),
  ];

  function compute(v: Values): CalcOutcome {
    const shape = (list.includes(v.shape as SolidId) ? v.shape : list[0]) as SolidId;
    const e: Record<string, string> = {};
    const val: Record<string, number> = {};
    if (shape === "cap") {
      const read = (id: string, label: string) => readNum(v, `cap_${id}`, { label, gt: 0, max: 1e12, optional: true }, e);
      const R = read("R", "Sphere radius");
      const h = read("h", "Cap height");
      const a = read("a", "Cap base radius");
      if (hasErrors(e)) return fail(e);
      const given = [R, h, a].filter((x) => x !== null).length;
      if (given !== 2) return fail({ cap_R: `Enter exactly two of R, h and a (you entered ${given}).` });
      const known: { R?: number; h?: number; a?: number } = {};
      if (R !== null) known.R = R;
      if (h !== null) known.h = h;
      if (a !== null) known.a = a;
      const res = resolveCap(known);
      if ("error" in res) return fail({ cap_R: res.error });
      val.R = res.R;
      val.h = res.h;
    } else {
      for (const f of SOLIDS[shape].fields) {
        const n = readNum(v, `${shape}_${f.id}`, { label: f.label, gt: 0, max: 1e12 }, e);
        if (n !== null) val[f.id] = n;
      }
      if (hasErrors(e)) return fail(e);
      if (shape === "tube" && val.r >= val.R) return fail({ tube_r: "The inner radius must be smaller than the outer radius." });
    }
    const u = unitOf(v.unit);
    const label = SOLIDS[shape].label.toLowerCase();
    if (kind === "volume") {
      const vol = solidVolume(shape, val);
      const m3 = vol * u.m ** 3;
      const extras = [
        { label: "Litres", value: `${g(m3 * 1000)} L` },
        { label: "Cubic metres", value: `${g(m3)} m³` },
        { label: "Cubic feet", value: `${g(m3 / 0.3048 ** 3)} ft³` },
        { label: "US gallons", value: `${g(m3 / 0.003785411784)} gal` },
        { label: "Imperial (UK) gallons", value: `${g(m3 / 0.00454609)} gal` },
      ];
      return { ok: true, headline: { label: `Volume of the ${label}`, value: `${g(vol)} ${u.abbr}³` }, stats: extras, notes: ["Volume is in the cubic unit of the length unit you chose. Litre and gallon conversions use exact definitions (1 US gal = 3.785411784 L, 1 UK gal = 4.54609 L)."] };
    }
    const r = solidArea(shape, val);
    return {
      ok: true,
      headline: { label: `Surface area of the ${label}`, value: `${g(r.total)} ${u.abbr}²` },
      stats: [...(r.parts ?? []).map(([l, x]) => ({ label: l, value: `${g(x)} ${u.abbr}²` })), { label: "In square metres", value: `${g(r.total * u.m * u.m)} m²` }],
      notes: r.note ? [r.note] : undefined,
    };
  }
  return { fields, compute };
}

export default function SolidCalc({ kind }: { kind: Kind }) {
  const { fields, compute } = build(kind);
  return <CalculatorForm fields={fields} compute={compute} />;
}
