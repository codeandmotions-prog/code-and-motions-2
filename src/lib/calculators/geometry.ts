/** Plane geometry, triangles and coordinate geometry engines. */

const DEG = Math.PI / 180;
export const toRad = (d: number) => d * DEG;
export const toDeg = (r: number) => r / DEG;

/* ---------- Circle ---------- */

export function circleFrom(kind: "radius" | "diameter" | "circumference" | "area", v: number) {
  let r: number;
  if (kind === "radius") r = v;
  else if (kind === "diameter") r = v / 2;
  else if (kind === "circumference") r = v / (2 * Math.PI);
  else r = Math.sqrt(v / Math.PI);
  return { r, d: 2 * r, c: 2 * Math.PI * r, a: Math.PI * r * r };
}

/* ---------- General triangle ---------- */

export type TriangleSolution = {
  a: number;
  b: number;
  c: number;
  A: number; // degrees
  B: number;
  C: number;
  area: number;
  perimeter: number;
  ha: number;
  hb: number;
  hc: number;
  ma: number;
  mb: number;
  mc: number;
  inradius: number;
  circumradius: number;
  type: string;
  method: string;
};

function finishTriangle(a: number, b: number, c: number, method: string): TriangleSolution {
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const cosB = (a * a + c * c - b * b) / (2 * a * c);
  const A = toDeg(Math.acos(Math.max(-1, Math.min(1, cosA))));
  const B = toDeg(Math.acos(Math.max(-1, Math.min(1, cosB))));
  const C = 180 - A - B;
  const s = (a + b + c) / 2;
  const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
  const sides = [a, b, c].sort((x, y) => x - y);
  const eps = 1e-9 * Math.max(a, b, c);
  const right = Math.abs(sides[0] ** 2 + sides[1] ** 2 - sides[2] ** 2) < eps * sides[2];
  const obtuse = sides[0] ** 2 + sides[1] ** 2 < sides[2] ** 2 - eps * sides[2];
  const equilateral = Math.abs(a - b) < eps && Math.abs(b - c) < eps;
  const isosceles = Math.abs(a - b) < eps || Math.abs(b - c) < eps || Math.abs(a - c) < eps;
  const kind = equilateral ? "Equilateral" : isosceles ? "Isosceles" : "Scalene";
  const angleKind = right ? "right" : obtuse ? "obtuse" : "acute";
  return {
    a, b, c, A, B, C,
    area,
    perimeter: a + b + c,
    ha: (2 * area) / a,
    hb: (2 * area) / b,
    hc: (2 * area) / c,
    ma: 0.5 * Math.sqrt(2 * b * b + 2 * c * c - a * a),
    mb: 0.5 * Math.sqrt(2 * a * a + 2 * c * c - b * b),
    mc: 0.5 * Math.sqrt(2 * a * a + 2 * b * b - c * c),
    inradius: area / s,
    circumradius: (a * b * c) / (4 * area),
    type: `${kind}, ${angleKind}`,
    method,
  };
}

export type TriInput = {
  a: number | null;
  b: number | null;
  c: number | null;
  A: number | null; // degrees
  B: number | null;
  C: number | null;
};

export type TriResult = { solutions: TriangleSolution[]; error?: string };

/**
 * Solve a triangle from three known values (at least one side).
 * Angles in degrees. Handles SSS, SAS, ASA/AAS and the ambiguous SSA case.
 */
export function solveTriangle(t: TriInput): TriResult {
  const sideKeys = ["a", "b", "c"] as const;
  const angKeys = ["A", "B", "C"] as const;
  const knownSides = sideKeys.filter((k) => t[k] !== null);
  const knownAngles = angKeys.filter((k) => t[k] !== null);
  if (knownSides.length + knownAngles.length !== 3) return { solutions: [], error: "Enter exactly three values." };
  if (knownSides.length === 0) return { solutions: [], error: "At least one side length is needed; angles alone only give the shape, not the size." };
  for (const k of sideKeys) if (t[k] !== null && !(t[k]! > 0)) return { solutions: [], error: "Side lengths must be greater than zero." };
  for (const k of angKeys) if (t[k] !== null && !(t[k]! > 0 && t[k]! < 180)) return { solutions: [], error: "Angles must be between 0° and 180°." };

  // SSS
  if (knownSides.length === 3) {
    const { a, b, c } = t as { a: number; b: number; c: number };
    if (a + b <= c || a + c <= b || b + c <= a) {
      return { solutions: [], error: "These side lengths cannot form a triangle: the longest side must be shorter than the sum of the other two." };
    }
    return { solutions: [finishTriangle(a, b, c, "Three sides (SSS)")] };
  }

  // One side + two angles
  if (knownSides.length === 1) {
    const sk = knownSides[0];
    const idx = sideKeys.indexOf(sk);
    const angs: (number | null)[] = [t.A, t.B, t.C];
    const sum = knownAngles.reduce((s, k) => s + (t[k] as number), 0);
    if (sum >= 180) return { solutions: [], error: "The two angles must add up to less than 180°." };
    const third = 180 - sum;
    const full = angs.map((v) => (v === null ? third : v));
    const side = t[sk] as number;
    const k = side / Math.sin(toRad(full[idx]));
    const [a, b, c] = full.map((ang) => k * Math.sin(toRad(ang)));
    const method = knownAngles.some((ak) => angKeys.indexOf(ak) === idx) ? "One angle opposite the side (AAS)" : "Two angles and the side between them (ASA)";
    return { solutions: [finishTriangle(a, b, c, method)] };
  }

  // Two sides + one angle
  const [s1, s2] = knownSides;
  const ak = knownAngles[0];
  const i1 = sideKeys.indexOf(s1);
  const i2 = sideKeys.indexOf(s2);
  const ia = angKeys.indexOf(ak);
  const x = t[s1] as number;
  const y = t[s2] as number;
  const ang = t[ak] as number;
  if (ia !== i1 && ia !== i2) {
    // SAS: the angle is between the two sides.
    const third = Math.sqrt(x * x + y * y - 2 * x * y * Math.cos(toRad(ang)));
    const sides = [0, 0, 0];
    sides[i1] = x;
    sides[i2] = y;
    sides[ia] = third;
    return { solutions: [finishTriangle(sides[0], sides[1], sides[2], "Two sides and the angle between them (SAS)")] };
  }
  // SSA: angle is opposite one of the known sides.
  const opp = ia === i1 ? x : y;
  const other = ia === i1 ? y : x;
  const otherIdx = ia === i1 ? i2 : i1;
  const sinOther = (other * Math.sin(toRad(ang))) / opp;
  if (sinOther > 1 + 1e-12) return { solutions: [], error: "No triangle exists with these values: the side opposite the angle is too short to reach." };
  const o1 = toDeg(Math.asin(Math.min(1, sinOther)));
  const candidates = Math.abs(sinOther - 1) < 1e-12 ? [90] : [o1, 180 - o1];
  const solutions: TriangleSolution[] = [];
  for (const oa of candidates) {
    const rest = 180 - ang - oa;
    if (rest <= 1e-9) continue;
    const full = [0, 0, 0];
    full[ia] = ang;
    full[otherIdx] = oa;
    full[3 - ia - otherIdx] = rest;
    const k = opp / Math.sin(toRad(ang));
    const sides = full.map((v) => k * Math.sin(toRad(v)));
    solutions.push(finishTriangle(sides[0], sides[1], sides[2], "Two sides and a non-included angle (SSA)"));
  }
  if (solutions.length === 0) return { solutions: [], error: "No triangle exists with these values." };
  return { solutions };
}

/* ---------- Right triangle ---------- */

export type RightKey = "a" | "b" | "c" | "alpha" | "beta" | "h" | "area" | "perimeter";

export type RightSolution = {
  a: number;
  b: number;
  c: number;
  alpha: number;
  beta: number;
  h: number;
  area: number;
  perimeter: number;
  inradius: number;
  circumradius: number;
};

function rightFromLegs(a: number, b: number): RightSolution {
  const c = Math.hypot(a, b);
  return {
    a, b, c,
    alpha: toDeg(Math.atan2(a, b)),
    beta: toDeg(Math.atan2(b, a)),
    h: (a * b) / c,
    area: (a * b) / 2,
    perimeter: a + b + c,
    inradius: (a + b - c) / 2,
    circumradius: c / 2,
  };
}

/** Solve a right triangle (right angle at C) from any two suitable values. Angles in degrees. */
export function solveRight(k1: RightKey, v1: number, k2: RightKey, v2: number): { sol?: RightSolution; error?: string } {
  if (k1 === k2) return { error: "Choose two different values." };
  const vals: Partial<Record<RightKey, number>> = { [k1]: v1, [k2]: v2 };
  const has = (k: RightKey) => vals[k] !== undefined;
  const g = (k: RightKey) => vals[k] as number;
  for (const [k, v] of Object.entries(vals) as [RightKey, number][]) {
    if (!(v > 0)) return { error: "All values must be greater than zero." };
    if ((k === "alpha" || k === "beta") && v >= 90) return { error: "Acute angles must be less than 90°." };
  }
  const legA = has("a");
  const legB = has("b");
  const hyp = has("c");
  const al = has("alpha");
  const be = has("beta");
  const alt = has("h");
  const ar = has("area");
  const pe = has("perimeter");
  const bad = { error: "These values do not describe a right triangle. Check that the hypotenuse is the longest side and that the numbers are consistent." };
  const fromRoots = (s: number, p: number): { sol?: RightSolution; error?: string } => {
    // legs are roots of t^2 - s t + p = 0
    const disc = s * s - 4 * p;
    if (disc < -1e-12 * s * s || s <= 0 || p <= 0) return bad;
    const r = Math.sqrt(Math.max(0, disc));
    return { sol: rightFromLegs((s - r) / 2, (s + r) / 2) };
  };

  if (legA && legB) return { sol: rightFromLegs(g("a"), g("b")) };
  if (legA && hyp) return g("c") > g("a") ? { sol: rightFromLegs(g("a"), Math.sqrt(g("c") ** 2 - g("a") ** 2)) } : bad;
  if (legB && hyp) return g("c") > g("b") ? { sol: rightFromLegs(Math.sqrt(g("c") ** 2 - g("b") ** 2), g("b")) } : bad;
  if (legA && al) return { sol: rightFromLegs(g("a"), g("a") / Math.tan(toRad(g("alpha")))) };
  if (legA && be) return { sol: rightFromLegs(g("a"), g("a") * Math.tan(toRad(g("beta")))) };
  if (legB && al) return { sol: rightFromLegs(g("b") * Math.tan(toRad(g("alpha"))), g("b")) };
  if (legB && be) return { sol: rightFromLegs(g("b") / Math.tan(toRad(g("beta"))), g("b")) };
  if (hyp && al) return { sol: rightFromLegs(g("c") * Math.sin(toRad(g("alpha"))), g("c") * Math.cos(toRad(g("alpha")))) };
  if (hyp && be) return { sol: rightFromLegs(g("c") * Math.cos(toRad(g("beta"))), g("c") * Math.sin(toRad(g("beta")))) };
  if (al && be) return { error: "Two angles alone do not fix the size. Add a side length, the area or the perimeter." };
  if (ar && legA) return { sol: rightFromLegs(g("a"), (2 * g("area")) / g("a")) };
  if (ar && legB) return { sol: rightFromLegs((2 * g("area")) / g("b"), g("b")) };
  if (ar && hyp) {
    const c = g("c");
    const A = g("area");
    if (c * c < 4 * A) return bad;
    return fromRoots(Math.sqrt(c * c + 4 * A), 2 * A);
  }
  if (ar && al) {
    const a = Math.sqrt(2 * g("area") * Math.tan(toRad(g("alpha"))));
    return { sol: rightFromLegs(a, (2 * g("area")) / a) };
  }
  if (ar && be) {
    const b = Math.sqrt(2 * g("area") * Math.tan(toRad(g("beta"))));
    return { sol: rightFromLegs((2 * g("area")) / b, b) };
  }
  if (ar && alt) return solveRight("c", (2 * g("area")) / g("h"), "area", g("area"));
  if (ar && pe) {
    const P = g("perimeter");
    const A = g("area");
    return fromRoots((P * P + 4 * A) / (2 * P), 2 * A);
  }
  if (pe && legA) {
    const P = g("perimeter");
    const a = g("a");
    if (P <= 2 * a) return bad;
    return { sol: rightFromLegs(a, (P * P - 2 * P * a) / (2 * (P - a))) };
  }
  if (pe && legB) {
    const P = g("perimeter");
    const b = g("b");
    if (P <= 2 * b) return bad;
    return { sol: rightFromLegs((P * P - 2 * P * b) / (2 * (P - b)), b) };
  }
  if (pe && hyp) {
    const P = g("perimeter");
    const c = g("c");
    const s = P - c;
    if (s <= c) return bad;
    return fromRoots(s, (s * s - c * c) / 2);
  }
  if (pe && al) {
    const al2 = toRad(g("alpha"));
    const c = g("perimeter") / (1 + Math.sin(al2) + Math.cos(al2));
    return { sol: rightFromLegs(c * Math.sin(al2), c * Math.cos(al2)) };
  }
  if (pe && be) {
    const be2 = toRad(g("beta"));
    const c = g("perimeter") / (1 + Math.sin(be2) + Math.cos(be2));
    return { sol: rightFromLegs(c * Math.cos(be2), c * Math.sin(be2)) };
  }
  if (alt && hyp) {
    const c = g("c");
    const h = g("h");
    if (c < 2 * h) return bad;
    return fromRoots(Math.sqrt(c * c + 2 * h * c), h * c);
  }
  if (alt && legA) {
    const a = g("a");
    const h = g("h");
    if (a <= h) return bad;
    return { sol: rightFromLegs(a, (h * a) / Math.sqrt(a * a - h * h)) };
  }
  if (alt && legB) {
    const b = g("b");
    const h = g("h");
    if (b <= h) return bad;
    return { sol: rightFromLegs((h * b) / Math.sqrt(b * b - h * h), b) };
  }
  if (alt && al) {
    const al2 = toRad(g("alpha"));
    const c = g("h") / (Math.sin(al2) * Math.cos(al2));
    return { sol: rightFromLegs(c * Math.sin(al2), c * Math.cos(al2)) };
  }
  if (alt && be) {
    const be2 = toRad(g("beta"));
    const c = g("h") / (Math.sin(be2) * Math.cos(be2));
    return { sol: rightFromLegs(c * Math.cos(be2), c * Math.sin(be2)) };
  }
  if (alt && pe) {
    const P = g("perimeter");
    const c = (P * P) / (2 * P + 2 * g("h"));
    return solveRight("c", c, "h", g("h"));
  }
  return { error: "This combination is not supported. Try two sides, a side and an angle, or the area with a side." };
}

/* ---------- Areas of plane shapes ---------- */

export function heron(a: number, b: number, c: number): number | null {
  if (a + b <= c || a + c <= b || b + c <= a) return null;
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

export function sectorArea(r: number, angleDeg: number): number {
  return (angleDeg / 360) * Math.PI * r * r;
}

export function regularPolygonArea(n: number, side: number): number {
  return (n * side * side) / (4 * Math.tan(Math.PI / n));
}

/** Ramanujan's second approximation for the perimeter of an ellipse. */
export function ellipsePerimeter(a: number, b: number): number {
  const h = ((a - b) * (a - b)) / ((a + b) * (a + b));
  return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
}

/* ---------- Coordinates ---------- */

export function slopeInfo(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const vertical = dx === 0;
  const slope = vertical ? null : dy / dx;
  return {
    dx,
    dy,
    vertical,
    slope,
    distance: Math.hypot(dx, dy),
    angleDeg: toDeg(Math.atan2(dy, dx)),
    inclineDeg: slope === null ? 90 : toDeg(Math.atan(Math.abs(slope))),
    intercept: slope === null ? null : y1 - slope * x1,
    xIntercept: dy === 0 ? null : x1 - (y1 * dx) / dy,
    midpoint: [(x1 + x2) / 2, (y1 + y2) / 2] as [number, number],
  };
}

export const EARTH_MEAN_RADIUS_KM = 6371.0088;

export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const p1 = toRad(lat1);
  const p2 = toRad(lat2);
  const dphi = p2 - p1;
  const dl = toRad(lon2 - lon1);
  const h = Math.sin(dphi / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * EARTH_MEAN_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Vincenty inverse formula on the WGS-84 ellipsoid; distance in metres, null if it fails to converge. */
export function vincentyMetres(lat1: number, lon1: number, lat2: number, lon2: number): number | null {
  const a = 6378137;
  const f = 1 / 298.257223563;
  const b = (1 - f) * a;
  const L = toRad(lon2 - lon1);
  const U1 = Math.atan((1 - f) * Math.tan(toRad(lat1)));
  const U2 = Math.atan((1 - f) * Math.tan(toRad(lat2)));
  const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
  const sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
  let lambda = L;
  let sinSigma = 0, cosSigma = 0, sigma = 0, cosSqAlpha = 0, cos2SigmaM = 0;
  for (let i = 0; i < 200; i++) {
    const sinL = Math.sin(lambda);
    const cosL = Math.cos(lambda);
    sinSigma = Math.sqrt((cosU2 * sinL) ** 2 + (cosU1 * sinU2 - sinU1 * cosU2 * cosL) ** 2);
    if (sinSigma === 0) return 0;
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosL;
    sigma = Math.atan2(sinSigma, cosSigma);
    const sinAlpha = (cosU1 * cosU2 * sinL) / sinSigma;
    cosSqAlpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cosSqAlpha !== 0 ? cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha : 0;
    const C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    const prev = lambda;
    lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    if (Math.abs(lambda - prev) < 1e-12) {
      const uSq = (cosSqAlpha * (a * a - b * b)) / (b * b);
      const A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
      const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
      const dSigma = B * sinSigma * (cos2SigmaM + (B / 4) * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - (B / 6) * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
      return b * A * (sigma - dSigma);
    }
  }
  return null;
}

/** Initial bearing in degrees (0-360) from point 1 to point 2. */
export function initialBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const p1 = toRad(lat1), p2 = toRad(lat2), dl = toRad(lon2 - lon1);
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}
