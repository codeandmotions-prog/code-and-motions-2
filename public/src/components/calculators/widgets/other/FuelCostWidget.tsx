"use client";

import CalculatorForm, { type FieldDef } from "../../CalculatorForm";
import { fail, type CalcOutcome } from "@/lib/calculators/types";
import { readNum, hasErrors, type Values } from "@/lib/calculators/validate";
import { fuelTrip, type DistanceUnit, type EfficiencyUnit, type PriceUnit } from "@/lib/calculators/units";
import { money, fixed } from "@/lib/calculators/format";
import { asCurrency, currencyField } from "../shared";

const fields: FieldDef[] = [
  currencyField(),
  { id: "dist", kind: "number", label: "Trip distance (one way)", default: "250" },
  {
    id: "dunit",
    kind: "segmented",
    label: "Distance unit",
    default: "km",
    options: [
      { value: "km", label: "Kilometres" },
      { value: "mi", label: "Miles" },
    ],
  },
  { id: "eff", kind: "number", label: "Fuel efficiency", default: "7.5", hint: "Your car's consumption. Check the trip computer or the manual." },
  {
    id: "eunit",
    kind: "select",
    label: "Efficiency unit",
    default: "l100",
    options: [
      { value: "l100", label: "Litres per 100 km (L/100 km)" },
      { value: "kml", label: "Kilometres per litre (km/L)" },
      { value: "mpg-us", label: "Miles per US gallon (mpg US)" },
      { value: "mpg-uk", label: "Miles per UK gallon (mpg UK)" },
    ],
  },
  { id: "price", kind: "number", label: "Fuel price", default: "1.70", hint: "Example value. Enter today's price from your pump." },
  {
    id: "punit",
    kind: "select",
    label: "Price per",
    default: "per-l",
    options: [
      { value: "per-l", label: "Litre" },
      { value: "per-gal-us", label: "US gallon" },
      { value: "per-gal-uk", label: "UK gallon" },
    ],
  },
  {
    id: "trip",
    kind: "segmented",
    label: "Journey",
    default: "one",
    options: [
      { value: "one", label: "One way" },
      { value: "return", label: "Return trip" },
    ],
  },
  { id: "people", kind: "number", label: "People sharing the cost", default: "1" },
];

function compute(v: Values): CalcOutcome {
  const errors: Record<string, string> = {};
  const cur = asCurrency(v.cur);
  const dist = readNum(v, "dist", { label: "Trip distance", gt: 0, max: 1e12 }, errors);
  const eff = readNum(v, "eff", { label: "Fuel efficiency", gt: 0, max: 1e12 }, errors);
  const price = readNum(v, "price", { label: "Fuel price", min: 0, max: 1e12 }, errors);
  const people = readNum(v, "people", { label: "People", min: 1, max: 100, integer: true }, errors);
  if (hasErrors(errors) || dist === null || eff === null || price === null || people === null) return fail(errors);
  const r = fuelTrip(dist, v.dunit as DistanceUnit, eff, v.eunit as EfficiencyUnit, price, v.punit as PriceUnit, v.trip === "return", people);
  if (r.l100 > 100 || r.l100 < 0.5) return fail({ eff: "That efficiency looks unrealistic for a road vehicle. Check the value and the unit." });
  const f = (n: number) => money(n, cur);
  const dUnit = v.dunit === "mi" ? "mile" : "km";
  return {
    ok: true,
    headline: { label: "Total fuel cost", value: f(r.cost), sub: `${fixed(v.dunit === "mi" ? r.miles : r.km, 1)} ${v.dunit === "mi" ? "miles" : "km"} ${v.trip === "return" ? "(return trip)" : "(one way)"}` },
    stats: [
      { label: "Fuel needed", value: `${fixed(r.litres, 2)} L`, hint: `${fixed(r.usGallons, 2)} US gal · ${fixed(r.ukGallons, 2)} UK gal` },
      { label: `Cost per ${dUnit}`, value: f(v.dunit === "mi" ? r.costPerMile : r.costPerKm) },
      ...(people > 1 ? [{ label: "Cost per person", value: f(r.perPerson) }] : []),
      { label: "Your efficiency in other units", value: `${fixed(r.l100, 2)} L/100 km`, hint: `${fixed(r.mpgUs, 1)} mpg US · ${fixed(r.mpgUk, 1)} mpg UK` },
    ],
    notes: ["Real consumption changes with speed, load, traffic, weather and driving style, so treat the result as an estimate. Tolls, parking and wear are not included."],
  };
}

export default function FuelCostWidget() {
  return <CalculatorForm fields={fields} compute={compute} />;
}
