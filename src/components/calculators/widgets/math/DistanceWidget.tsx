"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { haversineKm, vincentyMetres, initialBearing } from "@/lib/calculators/geometry";
import { g } from "./geoShared";

const fields: FieldDef[] = [
  {
    id: "mode",
    kind: "segmented",
    label: "Distance between",
    default: "2d",
    options: [
      { value: "2d", label: "Two points (2D)" },
      { value: "3d", label: "Two points (3D)" },
      { value: "geo", label: "Two places on Earth" },
    ],
  },
  { id: "x1", kind: "number", label: "x₁", default: "1", showIf: (v) => v.mode !== "geo" },
  { id: "y1", kind: "number", label: "y₁", default: "2", showIf: (v) => v.mode !== "geo" },
  { id: "z1", kind: "number", label: "z₁", default: "0", showIf: (v) => v.mode === "3d" },
  { id: "x2", kind: "number", label: "x₂", default: "4", showIf: (v) => v.mode !== "geo" },
  { id: "y2", kind: "number", label: "y₂", default: "6", showIf: (v) => v.mode !== "geo" },
  { id: "z2", kind: "number", label: "z₂", default: "0", showIf: (v) => v.mode === "3d" },
  { id: "lat1", kind: "number", label: "Latitude 1", default: "51.5072", unit: "°", showIf: (v) => v.mode === "geo", hint: "Decimal degrees: north positive (−90 to 90)." },
  { id: "lon1", kind: "number", label: "Longitude 1", default: "-0.1276", unit: "°", showIf: (v) => v.mode === "geo", hint: "East positive, west negative (−180 to 180)." },
  { id: "lat2", kind: "number", label: "Latitude 2", default: "48.8566", unit: "°", showIf: (v) => v.mode === "geo" },
  { id: "lon2", kind: "number", label: "Longitude 2", default: "2.3522", unit: "°", showIf: (v) => v.mode === "geo" },
];

function compute(v: Values): CalcOutcome {
  const e: Record<string, string> = {};
  if (v.mode === "geo") {
    const lat1 = readNum(v, "lat1", { label: "Latitude 1", min: -90, max: 90 }, e);
    const lon1 = readNum(v, "lon1", { label: "Longitude 1", min: -180, max: 180 }, e);
    const lat2 = readNum(v, "lat2", { label: "Latitude 2", min: -90, max: 90 }, e);
    const lon2 = readNum(v, "lon2", { label: "Longitude 2", min: -180, max: 180 }, e);
    if (hasErrors(e) || lat1 === null || lon1 === null || lat2 === null || lon2 === null) return fail(e);
    const km = haversineKm(lat1, lon1, lat2, lon2);
    const vin = vincentyMetres(lat1, lon1, lat2, lon2);
    const best = vin === null ? km : vin / 1000;
    const bearing = initialBearing(lat1, lon1, lat2, lon2);
    return {
      ok: true,
      headline: { label: vin === null ? "Great-circle distance" : "Distance along the Earth’s surface", value: `${g(best, 8)} km`, sub: `${g(best / 1.609344, 8)} miles · ${g(best / 1.852, 8)} nautical miles` },
      stats: [
        { label: "Spherical (haversine)", value: `${g(km, 8)} km`, hint: "Mean Earth radius 6,371.0088 km" },
        { label: "Ellipsoidal (Vincenty, WGS-84)", value: vin === null ? "Did not converge (near-antipodal points)" : `${g(vin / 1000, 8)} km` },
        { label: "Initial bearing", value: `${g(bearing, 6)}° from north` },
      ],
      notes: ["This is the shortest path across the surface, not a driving or flying route. The ellipsoidal value is normally accurate to well under a metre; the spherical value can differ by up to about 0.5%."],
    };
  }
  const three = v.mode === "3d";
  const x1 = readNum(v, "x1", { label: "x₁" }, e);
  const y1 = readNum(v, "y1", { label: "y₁" }, e);
  const x2 = readNum(v, "x2", { label: "x₂" }, e);
  const y2 = readNum(v, "y2", { label: "y₂" }, e);
  const z1 = three ? readNum(v, "z1", { label: "z₁" }, e) : 0;
  const z2 = three ? readNum(v, "z2", { label: "z₂" }, e) : 0;
  if (hasErrors(e) || x1 === null || y1 === null || x2 === null || y2 === null || z1 === null || z2 === null) return fail(e);
  const dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
  const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const mid = [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2];
  return {
    ok: true,
    headline: { label: "Distance", value: g(d, 12), sub: d === 0 ? "The points are the same" : undefined },
    stats: [
      { label: "Δx / Δy" + (three ? " / Δz" : ""), value: three ? `${g(dx)} / ${g(dy)} / ${g(dz)}` : `${g(dx)} / ${g(dy)}` },
      { label: "Squared distance", value: g(dx * dx + dy * dy + dz * dz, 12) },
      { label: "Midpoint", value: three ? `(${g(mid[0])}, ${g(mid[1])}, ${g(mid[2])})` : `(${g(mid[0])}, ${g(mid[1])})` },
    ],
    steps: [three ? "d = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²)" : "d = √((x₂ − x₁)² + (y₂ − y₁)²)"],
  };
}

export default function DistanceWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
