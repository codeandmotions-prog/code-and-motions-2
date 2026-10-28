import { solidVolume, type SolidId } from "@/lib/calculators/solids";
import { fixed } from "@/lib/calculators/format";
import { VOLUME_UNITS } from "./volumeData";

/**
 * Worked examples. Every number is computed with the same `solidVolume` engine the calculators use, so the text
 * on the page can never drift away from the calculator's answer.
 */

export type WorkedExample = { id: SolidId; title: string; setup: string; steps: string[]; result: string };

const PI = Math.PI;
const f = (n: number, dp = 3) => fixed(n, dp);
const unit = (id: string) => VOLUME_UNITS.find((u) => u.id === id)!;
const toL = (m3: number) => m3 / unit("l").m3;
const toUsGal = (m3: number) => m3 / unit("usgal").m3;
const toFt3 = (m3: number) => m3 / unit("ft3").m3;

// Values in metres or centimetres as stated in each example.
const sphere = solidVolume("sphere", { r: 3 });
const cone = solidVolume("cone", { r: 3, h: 10 });
const cubeCm = solidVolume("cube", { a: 4 });
const cubeM = solidVolume("cube", { a: 2 });
const tank = solidVolume("cylinder", { r: 0.5, h: 1.2 });
const slab = solidVolume("box", { l: 5, w: 3, h: 0.1 });
const capsule = solidVolume("capsule", { r: 2, h: 6 });
const cap = solidVolume("cap", { R: 5, h: 2 });
const frustum = solidVolume("frustum", { r1: 4, r2: 2, h: 10 });
const ellipsoid = solidVolume("ellipsoid", { a: 4, b: 3, c: 2 });
const pyramid = solidVolume("pyramid", { a: 4, h: 10 });
const tube = solidVolume("tube", { R: 5, r: 4, h: 10 });

export const WORKED_EXAMPLES: WorkedExample[] = [
  {
    id: "sphere",
    title: "Sphere: a ball with a 3 cm radius",
    setup: "A solid ball has a radius of 3 cm. If you only know the diameter, halve it first: a 6 cm diameter gives r = 3 cm.",
    steps: [
      "Cube the radius: 3³ = 27.",
      `Multiply by 4/3 and by π: V = 4/3 × π × 27 = 36π ≈ ${f(sphere)} cm³.`,
      `Convert to litres by dividing by 1,000: ${f(sphere / 1000, 4)} L.`,
    ],
    result: `V ≈ ${f(sphere)} cm³ (${f(sphere / 1000, 4)} litres).`,
  },
  {
    id: "cone",
    title: "Cone: radius 3 cm, height 10 cm",
    setup: "A cone has a base radius of 3 cm and a perpendicular height of 10 cm, measured straight from the centre of the base to the tip.",
    steps: [
      `Base area: π × 3² = ${f(PI * 9)} cm².`,
      `Multiply by the height: ${f(PI * 9)} × 10 = ${f(PI * 90)} cm³.`,
      `Take one third: V = ${f(PI * 90)} ÷ 3 = ${f(cone)} cm³.`,
    ],
    result: `V ≈ ${f(cone)} cm³, exactly one third of a cylinder with the same radius and height.`,
  },
  {
    id: "cube",
    title: "Cube: a 4 cm edge and a 2 m edge",
    setup: "All twelve edges of a cube are equal, so one measurement is enough.",
    steps: [
      `Small cube: V = 4³ = ${f(cubeCm, 0)} cm³.`,
      `Large cube: V = 2³ = ${f(cubeM, 0)} m³.`,
      `Convert the large cube to litres: ${f(cubeM, 0)} m³ × 1,000 = ${f(toL(cubeM), 0)} L.`,
    ],
    result: `${f(cubeCm, 0)} cm³ for the small cube; ${f(cubeM, 0)} m³ (${f(toL(cubeM), 0)} litres) for the large one.`,
  },
  {
    id: "cylinder",
    title: "Cylinder: a round water tank",
    setup: "A tank is 1 m across (so r = 0.5 m) and 1.2 m tall. How much water can it hold when full?",
    steps: [
      `Base area: π × 0.5² = ${f(PI * 0.25, 4)} m².`,
      `Multiply by the height: V = ${f(PI * 0.25, 4)} × 1.2 = ${f(tank, 4)} m³.`,
      `Convert: ${f(tank, 4)} m³ × 1,000 = ${f(toL(tank), 1)} litres, or about ${f(toUsGal(tank), 1)} US gallons.`,
    ],
    result: `V ≈ ${f(tank, 4)} m³ ≈ ${f(toL(tank), 1)} L.`,
  },
  {
    id: "box",
    title: "Rectangular box: a concrete slab",
    setup: "A slab is 5 m long, 3 m wide and 100 mm (0.1 m) thick. Convert every length to the same unit before multiplying.",
    steps: [
      "Convert the thickness: 100 mm = 0.1 m.",
      `Multiply: V = 5 × 3 × 0.1 = ${f(slab, 2)} m³.`,
      `That is ${f(toL(slab), 0)} litres, or about ${f(toFt3(slab), 2)} cubic feet.`,
    ],
    result: `V = ${f(slab, 2)} m³. Check with your supplier about extra allowance for waste and uneven ground.`,
  },
  {
    id: "capsule",
    title: "Capsule: end radius 2 cm, straight middle 6 cm",
    setup: "A capsule is a cylinder with a hemisphere on each end. Here h is the straight middle only, so the overall length is 6 + 2 × 2 = 10 cm.",
    steps: [
      `Cylinder part: π × 2² × 6 = ${f(PI * 24)} cm³.`,
      `Two hemispheres make one sphere: 4/3 × π × 2³ = ${f((4 / 3) * PI * 8)} cm³.`,
      `Add them: V = ${f(PI * 24)} + ${f((4 / 3) * PI * 8)} = ${f(capsule)} cm³.`,
    ],
    result: `V ≈ ${f(capsule)} cm³.`,
  },
  {
    id: "cap",
    title: "Spherical cap: sphere radius 5 cm, cap height 2 cm",
    setup: "A dome is cut from a sphere of radius R = 5 cm and stands h = 2 cm tall. Its base radius follows from a² = h × (2R − h) = 2 × 8 = 16, so a = 4 cm.",
    steps: [
      "Compute 3R − h = 15 − 2 = 13.",
      `Multiply: π × h² × 13 = π × 4 × 13 = ${f(PI * 52)}.`,
      `Divide by 3: V = ${f(PI * 52)} ÷ 3 = ${f(cap)} cm³.`,
    ],
    result: `V ≈ ${f(cap)} cm³. Entering R = 5 and a = 4 instead gives the same answer.`,
  },
  {
    id: "frustum",
    title: "Conical frustum: bottom radius 4 cm, top radius 2 cm, height 10 cm",
    setup: "A tapered cup or flower pot is a cone with its tip cut off parallel to the base.",
    steps: [
      "Squares and product: r₁² + r₁r₂ + r₂² = 16 + 8 + 4 = 28.",
      `Multiply by π × h: π × 10 × 28 = ${f(PI * 280)}.`,
      `Divide by 3: V = ${f(PI * 280)} ÷ 3 = ${f(frustum)} cm³.`,
    ],
    result: `V ≈ ${f(frustum)} cm³ (${f(frustum / 1000, 4)} litres).`,
  },
  {
    id: "ellipsoid",
    title: "Ellipsoid: semi-axes 4 cm, 3 cm and 2 cm",
    setup: "The semi-axes are half of the full width, height and depth, so this solid measures 8 cm × 6 cm × 4 cm at its widest points.",
    steps: [
      "Multiply the semi-axes: 4 × 3 × 2 = 24.",
      `Apply 4/3 × π: V = 4/3 × π × 24 = 32π ≈ ${f(ellipsoid)} cm³.`,
    ],
    result: `V ≈ ${f(ellipsoid)} cm³. If all three semi-axes were equal the formula would reduce to the sphere formula.`,
  },
  {
    id: "pyramid",
    title: "Square pyramid: base edge 4 cm, height 10 cm",
    setup: "The height is the perpendicular distance from the base to the apex, not the length of a sloping face.",
    steps: [
      "Base area: 4² = 16 cm².",
      `Multiply by the height and divide by 3: V = 16 × 10 ÷ 3 = ${f(pyramid)} cm³.`,
    ],
    result: `V ≈ ${f(pyramid)} cm³, one third of a box with the same base and height.`,
  },
  {
    id: "tube",
    title: "Tube: outer radius 5 cm, inner radius 4 cm, length 10 cm",
    setup: "This gives the volume of the wall material of a pipe or ring, not the empty space inside it.",
    steps: [
      "Subtract the squared radii: R² − r² = 25 − 16 = 9.",
      `Multiply by π × h: V = π × 10 × 9 = 90π ≈ ${f(tube)} cm³.`,
      `For the empty inside of the same pipe, use the cylinder calculator with r = 4 cm and h = 10 cm: ${f(solidVolume("cylinder", { r: 4, h: 10 }))} cm³.`,
    ],
    result: `Wall volume V ≈ ${f(tube)} cm³.`,
  },
];
