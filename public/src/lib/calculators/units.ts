/** Unit definitions for the conversion and fuel calculators (exact factors). */

export type Unit = { id: string; label: string; factor: number };

export type UnitCategory = {
  id: string;
  label: string;
  /** factor = how many base units in one of this unit */
  base: string;
  units: Unit[];
};

const MILE = 1609.344;
const US_GAL_L = 3.785411784;
const UK_GAL_L = 4.54609;

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: "length",
    label: "Length",
    base: "metre",
    units: [
      { id: "mm", label: "Millimetre (mm)", factor: 0.001 },
      { id: "cm", label: "Centimetre (cm)", factor: 0.01 },
      { id: "m", label: "Metre (m)", factor: 1 },
      { id: "km", label: "Kilometre (km)", factor: 1000 },
      { id: "in", label: "Inch (in)", factor: 0.0254 },
      { id: "ft", label: "Foot (ft)", factor: 0.3048 },
      { id: "yd", label: "Yard (yd)", factor: 0.9144 },
      { id: "mi", label: "Mile (mi)", factor: MILE },
      { id: "nmi", label: "Nautical mile (nmi)", factor: 1852 },
    ],
  },
  {
    id: "mass",
    label: "Weight / mass",
    base: "kilogram",
    units: [
      { id: "mg", label: "Milligram (mg)", factor: 1e-6 },
      { id: "g", label: "Gram (g)", factor: 0.001 },
      { id: "kg", label: "Kilogram (kg)", factor: 1 },
      { id: "t", label: "Tonne (metric ton)", factor: 1000 },
      { id: "oz", label: "Ounce (oz)", factor: 0.028349523125 },
      { id: "lb", label: "Pound (lb)", factor: 0.45359237 },
      { id: "st", label: "Stone (st)", factor: 6.35029318 },
      { id: "ton-us", label: "US short ton", factor: 907.18474 },
      { id: "ton-uk", label: "UK long ton", factor: 1016.0469088 },
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    base: "kelvin",
    units: [
      { id: "c", label: "Celsius (°C)", factor: 1 },
      { id: "f", label: "Fahrenheit (°F)", factor: 1 },
      { id: "k", label: "Kelvin (K)", factor: 1 },
    ],
  },
  {
    id: "area",
    label: "Area",
    base: "square metre",
    units: [
      { id: "mm2", label: "Square millimetre (mm²)", factor: 1e-6 },
      { id: "cm2", label: "Square centimetre (cm²)", factor: 1e-4 },
      { id: "m2", label: "Square metre (m²)", factor: 1 },
      { id: "ha", label: "Hectare (ha)", factor: 10000 },
      { id: "km2", label: "Square kilometre (km²)", factor: 1e6 },
      { id: "in2", label: "Square inch (in²)", factor: 0.00064516 },
      { id: "ft2", label: "Square foot (ft²)", factor: 0.09290304 },
      { id: "yd2", label: "Square yard (yd²)", factor: 0.83612736 },
      { id: "ac", label: "Acre", factor: 4046.8564224 },
      { id: "mi2", label: "Square mile (mi²)", factor: 2589988.110336 },
    ],
  },
  {
    id: "volume",
    label: "Volume",
    base: "litre",
    units: [
      { id: "ml", label: "Millilitre (mL)", factor: 0.001 },
      { id: "l", label: "Litre (L)", factor: 1 },
      { id: "m3", label: "Cubic metre (m³)", factor: 1000 },
      { id: "tsp", label: "Teaspoon (US)", factor: 0.00492892159375 },
      { id: "tbsp", label: "Tablespoon (US)", factor: 0.01478676478125 },
      { id: "floz-us", label: "Fluid ounce (US)", factor: 0.0295735295625 },
      { id: "cup-us", label: "Cup (US)", factor: 0.2365882365 },
      { id: "pt-us", label: "Pint (US)", factor: 0.473176473 },
      { id: "qt-us", label: "Quart (US)", factor: 0.946352946 },
      { id: "gal-us", label: "Gallon (US)", factor: US_GAL_L },
      { id: "pt-uk", label: "Pint (UK imperial)", factor: 0.56826125 },
      { id: "gal-uk", label: "Gallon (UK imperial)", factor: UK_GAL_L },
      { id: "ft3", label: "Cubic foot (ft³)", factor: 28.316846592 },
    ],
  },
  {
    id: "speed",
    label: "Speed",
    base: "metre per second",
    units: [
      { id: "ms", label: "Metre per second (m/s)", factor: 1 },
      { id: "kmh", label: "Kilometre per hour (km/h)", factor: 1 / 3.6 },
      { id: "mph", label: "Mile per hour (mph)", factor: 0.44704 },
      { id: "kn", label: "Knot (kn)", factor: 1852 / 3600 },
      { id: "fts", label: "Foot per second (ft/s)", factor: 0.3048 },
    ],
  },
  {
    id: "time",
    label: "Time",
    base: "second",
    units: [
      { id: "s", label: "Second", factor: 1 },
      { id: "min", label: "Minute", factor: 60 },
      { id: "h", label: "Hour", factor: 3600 },
      { id: "d", label: "Day", factor: 86400 },
      { id: "wk", label: "Week", factor: 604800 },
      { id: "mo", label: "Month (average, 30.4375 days)", factor: 2629800 },
      { id: "yr", label: "Year (365.25 days)", factor: 31557600 },
    ],
  },
];

export function convertUnits(categoryId: string, from: string, to: string, value: number): number {
  const cat = UNIT_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return NaN;
  if (categoryId === "temperature") {
    let k: number;
    if (from === "c") k = value + 273.15;
    else if (from === "f") k = ((value - 32) * 5) / 9 + 273.15;
    else k = value;
    if (to === "c") return k - 273.15;
    if (to === "f") return ((k - 273.15) * 9) / 5 + 32;
    return k;
  }
  const f = cat.units.find((u) => u.id === from);
  const t = cat.units.find((u) => u.id === to);
  if (!f || !t) return NaN;
  return (value * f.factor) / t.factor;
}

/* ---------- Fuel cost ---------- */

export type EfficiencyUnit = "l100" | "kml" | "mpg-us" | "mpg-uk";
export type PriceUnit = "per-l" | "per-gal-us" | "per-gal-uk";
export type DistanceUnit = "km" | "mi";

export const KM_PER_MILE = 1.609344;
export { US_GAL_L, UK_GAL_L };

/** Convert any efficiency figure to litres per 100 km. */
export function toLitresPer100km(value: number, unit: EfficiencyUnit): number {
  if (unit === "l100") return value;
  if (unit === "kml") return 100 / value;
  if (unit === "mpg-us") return (100 * US_GAL_L) / (value * KM_PER_MILE);
  return (100 * UK_GAL_L) / (value * KM_PER_MILE);
}

export function toPricePerLitre(value: number, unit: PriceUnit): number {
  if (unit === "per-l") return value;
  if (unit === "per-gal-us") return value / US_GAL_L;
  return value / UK_GAL_L;
}

export function fuelTrip(
  distance: number,
  distanceUnit: DistanceUnit,
  efficiency: number,
  efficiencyUnit: EfficiencyUnit,
  price: number,
  priceUnit: PriceUnit,
  roundTrip: boolean,
  people: number,
) {
  const km = (distanceUnit === "km" ? distance : distance * KM_PER_MILE) * (roundTrip ? 2 : 1);
  const l100 = toLitresPer100km(efficiency, efficiencyUnit);
  const litres = (km * l100) / 100;
  const perLitre = toPricePerLitre(price, priceUnit);
  const cost = litres * perLitre;
  return {
    km,
    miles: km / KM_PER_MILE,
    litres,
    usGallons: litres / US_GAL_L,
    ukGallons: litres / UK_GAL_L,
    l100,
    mpgUs: (100 * US_GAL_L) / (KM_PER_MILE * l100),
    mpgUk: (100 * UK_GAL_L) / (KM_PER_MILE * l100),
    cost,
    costPerKm: cost / km,
    costPerMile: (cost / km) * KM_PER_MILE,
    perPerson: cost / people,
  };
}

/* ---------- Tip ---------- */

export function tipSplit(bill: number, tipPct: number, people: number, roundUp: boolean) {
  const tip = (bill * tipPct) / 100;
  let total = bill + tip;
  let adjTip = tip;
  if (roundUp) {
    const perPerson = Math.ceil(total / people - 1e-9);
    total = perPerson * people;
    adjTip = total - bill;
  }
  return {
    tip: adjTip,
    total,
    tipPerPerson: adjTip / people,
    totalPerPerson: total / people,
    effectiveTipPct: (adjTip / bill) * 100,
  };
}
