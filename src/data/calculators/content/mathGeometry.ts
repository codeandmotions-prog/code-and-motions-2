import type { CalcContent } from "../types";
import { solveTriangle, solveRight, circleFrom, sectorArea, slopeInfo, haversineKm, vincentyMetres, initialBearing, heron } from "@/lib/calculators/geometry";
import { solidVolume, solidArea } from "@/lib/calculators/solids";
import { fixed } from "@/lib/calculators/format";

const tri = solveTriangle({ a: 3, b: 4, c: 5, A: null, B: null, C: null }).solutions[0];
const sas = solveTriangle({ a: 7, b: 10, c: null, A: null, B: null, C: 50 }).solutions[0];
const right = solveRight("a", 3, "b", 4).sol!;
const circle = circleFrom("radius", 5);
const sector = sectorArea(5, 60);
const slope = slopeInfo(1, 2, 5, 10);
const dist2 = Math.hypot(4 - 1, 6 - 2);
const dist3 = Math.sqrt(3 * 3 + 4 * 4 + 12 * 12);
const hav = haversineKm(51.5072, -0.1276, 48.8566, 2.3522);
const vin = vincentyMetres(51.5072, -0.1276, 48.8566, 2.3522)! / 1000;
const bearing = initialBearing(51.5072, -0.1276, 48.8566, 2.3522);
const cylVol = solidVolume("cylinder", { r: 3, h: 10 });
const sphVol = solidVolume("sphere", { r: 3 });
const coneArea = solidArea("cone", { r: 3, h: 10 });
const sphArea = solidArea("sphere", { r: 3 });
const boxArea = solidArea("box", { l: 6, w: 4, h: 3 });
const heronArea = heron(7, 8, 9)!;

export const mathGeometryContent: Record<string, CalcContent> = {
  "triangle-calculator": {
    intro: [
      "The triangle calculator solves any triangle when you know three measurements, including at least one side. It works out the remaining sides and angles, the area and perimeter, the three heights and medians, and the inradius and circumradius, and draws the triangle.",
      "It supports every standard case: three sides (SSS), two sides and the angle between them (SAS), two angles and a side (ASA or AAS) and two sides with a non-included angle (SSA), including the ambiguous case with two solutions.",
    ],
    whoFor: [
      "Students of geometry and trigonometry.",
      "Builders, surveyors and designers working out lengths and angles.",
      "Anyone who needs a missing side or angle fast.",
    ],
    inputs: [
      { name: "Sides a, b, c", text: "Side lengths in any one unit. Each side is opposite the angle with the same letter." },
      { name: "Angles A, B, C", text: "In degrees, strictly between 0 and 180." },
      { name: "How many to fill in", text: "Exactly three values, with at least one side. Leave the rest blank." },
    ],
    how: [
      "Given three sides, the angles come from the law of cosines. Given two sides and the included angle, the third side comes from the law of cosines and the rest follow. Given two angles, the third is 180° minus their sum and the sides follow from the law of sines. For two sides and a non-included angle, the law of sines can produce zero, one or two valid triangles.",
      "Area is found with Heron's formula: √(s(s − a)(s − b)(s − c)) where s is half the perimeter.",
    ],
    formulas: [
      { label: "Law of cosines", expr: "c² = a² + b² − 2ab cos C" },
      { label: "Law of sines", expr: "a ÷ sin A = b ÷ sin B = c ÷ sin C" },
      { label: "Heron's formula", expr: "Area = √(s(s − a)(s − b)(s − c))" },
    ],
    interpret: [
      "Angles always add to 180°. The triangle type (equilateral, isosceles, scalene; acute, right, obtuse) is reported. If two triangles fit your inputs, both are shown. If the numbers cannot form a triangle, for example sides 1, 2 and 10, the calculator says why.",
    ],
    example: {
      setup: "Sides a = 3, b = 4 and c = 5; then sides 7 and 10 with a 50° included angle.",
      steps: [
        `For 3-4-5: s = 6, area = √(6 × 3 × 2 × 1) = ${fixed(tri.area, 2)}.`,
        `Angles: A = ${fixed(tri.A, 2)}°, B = ${fixed(tri.B, 2)}°, C = ${fixed(tri.C, 2)}°. This is a ${tri.type.toLowerCase()} triangle.`,
        `For two sides 7 and 10 with 50° between them: the third side is √(7² + 10² − 2 × 7 × 10 × cos 50°) = ${fixed(sas.c, 3)} and the area is ${fixed(sas.area, 3)}.`,
      ],
      result: `3-4-5 gives area ${fixed(tri.area, 2)}, angles ${fixed(tri.A, 2)}°, ${fixed(tri.B, 2)}° and ${fixed(tri.C, 2)}°.`,
    },
    useCases: [
      "Finding a rafter length or roof pitch.",
      "Land and plot measurements.",
      "Checking trigonometry homework.",
    ],
    limitations: [
      "Plane (flat) triangles only, not spherical ones.",
      "Angles alone do not fix the size, so at least one side is required.",
      "Results are floating-point and shown to about 10 significant digits.",
    ],
    faqs: [
      { question: "What is the ambiguous case?", answer: "When you know two sides and an angle not between them (SSA), two different triangles may fit. The calculator shows both when they exist." },
      { question: "Can I enter angles in radians?", answer: "No. Angles are entered in degrees." },
      { question: "Why do I need at least one side?", answer: "Three angles define the shape but not the size; infinitely many triangles share the same angles." },
      { question: "How is the area found when I give angles and a side?", answer: "The calculator first finds the other sides, then uses Heron's formula." },
    ],
  },

  "volume-calculator": {
    intro: [
      "A volume calculator finds how much three-dimensional space a solid takes up. This page gives each of eleven shapes its own calculator: sphere, cone, cube, cylinder, rectangular box, capsule, spherical cap, conical frustum, ellipsoid, square pyramid and hollow tube. Work down the page or jump straight to the shape you need.",
      "For every shape you enter the dimensions, choose a unit for each one (millimetres to miles, including inches, feet and yards) and read the volume in the unit you pick, plus litres, cubic metres, cubic feet and US and UK gallons. Mixing units is fine, for example a radius in centimetres and a height in metres.",
      "It is useful for tanks, containers, concrete, soil and packaging as well as for school geometry.",
    ],
    whoFor: [
      "Students and teachers checking geometry homework against the formula and working.",
      "DIY builders and gardeners estimating soil, gravel or concrete.",
      "Anyone sizing a tank, pipe, bucket or container, or converting a volume to litres or gallons.",
    ],
    inputs: [
      { name: "Dimensions", text: "Radius, height, edge lengths and so on. Each one has its own unit menu, and the labels match the letters on the diagram beside the inputs." },
      { name: "Length unit (per dimension)", text: "mm, cm, m, km, in, ft, yd or mi, chosen separately for every dimension." },
      { name: "Show volume in", text: "The unit of the headline answer: cubic units, litres, millilitres, or US or UK gallons. The default is the cube of the first length unit." },
      { name: "Spherical cap inputs", text: "Enter exactly two of the sphere radius (R), cap height (h) and cap base radius (a) and leave the third blank." },
    ],
    how: [
      "Each dimension is converted to metres, the standard formula for the shape is applied, and the volume in cubic metres is then converted into the unit you chose and into litres, cubic feet and US and UK gallons. The result panel shows the formula, your numbers put into it and the answer, so you can follow the working. Entries must be positive numbers; the tube needs an inner radius smaller than its outer radius, and a spherical cap cannot be taller than the sphere’s diameter.",
    ],
    formulas: [
      { label: "Cylinder", expr: "V = π r² h" },
      { label: "Sphere", expr: "V = 4/3 π r³" },
      { label: "Cone", expr: "V = 1/3 π r² h" },
      { label: "Box", expr: "V = l × w × h" },
    ],
    interpret: [
      "Volume is measured in cubic units, so doubling every dimension multiplies the volume by eight. For capacity, 1 cubic metre equals 1,000 litres and 1 millilitre equals 1 cubic centimetre. US and UK gallons differ (3.785 L and 4.546 L), so both are shown.",
    ],
    example: {
      setup: "A cylinder with radius 3 cm and height 10 cm, and a sphere of radius 3 cm.",
      steps: [
        `Cylinder: V = π × 3² × 10 = ${fixed(cylVol, 3)} cm³ = ${fixed(cylVol / 1000, 4)} litres.`,
        `Sphere: V = 4/3 × π × 3³ = ${fixed(sphVol, 3)} cm³.`,
      ],
      result: `The cylinder holds ${fixed(cylVol, 2)} cm³, about ${fixed(cylVol / 1000, 3)} litres.`,
    },
    useCases: [
      "Working out how much concrete, soil or gravel to order.",
      "Sizing a water tank, bucket or planter.",
      "Checking packaging and container volumes.",
      "Converting a volume in cubic feet, cubic metres or litres into gallons.",
    ],
    limitations: [
      "Ideal geometric shapes only; real objects have thickness, curvature, slopes and tolerances.",
      "Hollow objects need their wall thickness handled separately; the tube shape gives the volume of the wall material, and a cylinder with the inner radius gives the space inside.",
      "Partly filled horizontal cylindrical tanks are not covered. A part-filled spherical tank can be treated as a spherical cap.",
      "Results are shown to 10 significant figures, but measurement error in your inputs is usually far larger than that.",
    ],
    faqs: [
      { question: "How do I calculate the volume of a cylinder?", answer: "Multiply the area of the circular base by the height: V = π × r² × h. For a radius of 0.5 m and a height of 1.2 m, V = π × 0.25 × 1.2 ≈ 0.942 m³, which is about 942 litres." },
      { question: "How many litres are in a cubic metre?", answer: "1,000 litres. A litre is exactly one thousandth of a cubic metre, and 1 litre also equals 1,000 cubic centimetres." },
      { question: "What is the difference between a US gallon and a UK gallon?", answer: "A US gallon is 3.785411784 litres (231 cubic inches). An Imperial or UK gallon is 4.54609 litres, about 20% larger. The calculator shows both so you can pick the one your source uses." },
      { question: "How do I find the volume of a sphere from its diameter?", answer: "Halve the diameter to get the radius, then use V = 4/3 × π × r³. A diameter of 6 cm gives r = 3 cm and V ≈ 113.1 cm³." },
      { question: "Can I use different units for different dimensions?", answer: "Yes. Every dimension has its own unit menu, so you can enter a radius in centimetres and a height in metres. The calculator converts everything to metres before applying the formula." },
      { question: "Why does the result say cm³, and how do I change the unit?", answer: "By default the answer is in the cube of the first length unit you chose. Use the “Show volume in” menu to switch to litres, millilitres, cubic metres, cubic feet, gallons or another unit." },
      { question: "What is the difference between volume and capacity?", answer: "Volume is the space a solid occupies; capacity is how much a container can hold. For a container, measure the inside dimensions and the volume equals its capacity." },
      { question: "Why is the volume of a cone one third of a cylinder?", answer: "A cone with the same base radius and height as a cylinder fills exactly one third of it. This follows from adding up the thin circular slices of the cone, whose areas shrink with the square of the distance from the tip." },
      { question: "How do I find the volume of a hollow pipe?", answer: "Use the tube shape with the outer radius, inner radius and length to get the volume of the pipe wall. For the space inside the pipe, use the cylinder calculator with the inner radius." },
      { question: "How do I calculate a dome or a part-filled spherical tank?", answer: "Use the spherical cap. Enter the sphere radius and the cap height (the depth of liquid measured from the bottom), or any two of R, h and the base radius a." },
      { question: "What is a conical frustum?", answer: "A cone with its tip cut off parallel to the base, like a bucket or a flower pot. It needs the bottom radius, top radius and height. If the two radii are equal it becomes a cylinder." },
      { question: "Is my data sent anywhere?", answer: "No. The calculation runs in your browser and the values you type are not sent to a server." },
    ],
  },

  "slope-calculator": {
    intro: [
      "The slope calculator takes two points and returns the slope of the line through them, its angle, the equation of the line, both intercepts, the distance between the points and their midpoint.",
      "It treats vertical lines properly: the slope is reported as undefined and the equation is given as x = a constant.",
    ],
    whoFor: [
      "Algebra and geometry students.",
      "Builders and surveyors checking gradients.",
      "Analysts fitting a straight line through two data points.",
    ],
    inputs: [{ name: "Points (x₁, y₁) and (x₂, y₂)", text: "Any real coordinates. The points must be different." }],
    how: [
      "Slope is rise over run: m = (y₂ − y₁) ÷ (x₂ − x₁). The y-intercept is b = y₁ − m × x₁, giving the line y = mx + b. The angle is the arctangent of the slope, and grade as a percentage is the slope times 100.",
    ],
    formulas: [
      { label: "Slope", expr: "m = (y₂ − y₁) ÷ (x₂ − x₁)" },
      { label: "Line", expr: "y = m x + b" },
      { label: "Angle", expr: "θ = arctan(m)" },
    ],
    interpret: [
      "A positive slope rises left to right, a negative slope falls and a zero slope is flat. A 100% grade is a 45° angle. Parallel lines share the same slope, and perpendicular lines have slopes whose product is −1.",
    ],
    example: {
      setup: "Points (1, 2) and (5, 10).",
      steps: [
        `Rise = 10 − 2 = ${slope.dy}; run = 5 − 1 = ${slope.dx}.`,
        `Slope = ${slope.dy} ÷ ${slope.dx} = ${slope.slope}.`,
        `Intercept b = 2 − ${slope.slope} × 1 = ${slope.intercept}, so the line is y = ${slope.slope}x + ${slope.intercept}.`,
        `Angle = ${fixed(slope.inclineDeg, 3)}°; distance = ${fixed(slope.distance, 4)}; midpoint = (${slope.midpoint[0]}, ${slope.midpoint[1]}).`,
      ],
      result: `Slope ${slope.slope}, line y = ${slope.slope}x.`,
    },
    useCases: [
      "Finding the equation of a line from two points.",
      "Converting between slope, angle and percent grade.",
      "Checking whether two lines are parallel or perpendicular.",
    ],
    limitations: [
      "Straight lines through two points only.",
      "Coordinates are treated as being in the same units on both axes.",
    ],
    faqs: [
      { question: "What is slope?", answer: "A measure of steepness: the vertical change divided by the horizontal change." },
      { question: "What is the slope of a vertical line?", answer: "Undefined, because the run is zero and you cannot divide by zero." },
      { question: "How do I convert slope to degrees?", answer: "Take the arctangent of the slope." },
      { question: "What is percent grade?", answer: "Slope multiplied by 100, as used for roads and ramps." },
    ],
  },

  "area-calculator": {
    intro: [
      "The area calculator finds the area of eleven common 2D shapes: rectangle, square, triangle (from base and height, or from three sides), circle, ellipse, circular sector, parallelogram, trapezoid (trapezium), rhombus and regular polygon. Pick a unit and see the area in that unit squared and in square metres, square feet, hectares and acres.",
      "Extra measurements such as perimeter or arc length are shown where they are useful.",
    ],
    whoFor: [
      "Students and teachers.",
      "Home owners and builders measuring floors, gardens and plots.",
      "Anyone comparing plot sizes in different units.",
    ],
    inputs: [
      { name: "Shape", text: "Choose the shape and its measurements appear." },
      { name: "Length unit", text: "mm, cm, m, km, in, ft, yd or mi; area comes out in that unit squared." },
    ],
    how: [
      "Each shape uses its standard formula. The area in your unit is converted to square metres using the exact definition of the unit, and from there to square feet, hectares and acres.",
    ],
    formulas: [
      { label: "Rectangle", expr: "A = l × w" },
      { label: "Triangle", expr: "A = ½ × b × h" },
      { label: "Circle", expr: "A = π r²" },
      { label: "Trapezoid", expr: "A = ½ (a + b) h" },
    ],
    interpret: [
      "Doubling every length multiplies area by four. Keep all measurements in the same unit before entering them. For an irregular shape, split it into simple parts, calculate each, and add them.",
    ],
    example: {
      setup: "A rectangle 8 m by 5 m, and a triangle with sides 7, 8 and 9.",
      steps: [
        "Rectangle: 8 × 5 = 40 m².",
        `That is ${fixed(40 / 0.3048 ** 2, 1)} square feet.`,
        `Triangle with sides 7, 8 and 9: s = 12, area = √(12 × 5 × 4 × 3) = ${fixed(heronArea, 4)}.`,
        `A circle of radius 5 has area π × 25 = ${fixed(circle.a, 4)}.`,
      ],
      result: "The 8 m × 5 m rectangle has an area of 40 m².",
    },
    useCases: [
      "Estimating flooring, paint or turf.",
      "Comparing plots in square metres and acres.",
      "Homework and exam practice.",
    ],
    limitations: [
      "Ideal shapes; real rooms and plots need splitting into simple parts.",
      "Ellipse perimeter uses Ramanujan's approximation; areas are exact formulas.",
    ],
    faqs: [
      { question: "How do I find the area of an irregular shape?", answer: "Split it into rectangles, triangles and circles, calculate each, and add them." },
      { question: "How many square metres are in a hectare?", answer: "10,000." },
      { question: "What is the area of a trapezoid?", answer: "Half the sum of the parallel sides times the height." },
      { question: "Can I use different units for each side?", answer: "No. Convert all lengths to one unit first." },
    ],
  },

  "distance-calculator": {
    intro: [
      "The distance calculator measures the straight-line distance between two points in a 2D plane, between two points in 3D space, or between two places on Earth given by latitude and longitude.",
      "For places on Earth it gives the spherical (haversine) distance and the more accurate ellipsoidal (Vincenty, WGS-84) distance in kilometres, miles and nautical miles, along with the initial bearing.",
    ],
    whoFor: [
      "Students using the distance formula.",
      "Developers and analysts working with coordinates.",
      "Travellers and pilots estimating straight-line distances between places.",
    ],
    inputs: [
      { name: "Mode", text: "2D coordinates, 3D coordinates or latitude and longitude." },
      { name: "Coordinates", text: "Plain numbers for 2D and 3D. For Earth, use decimal degrees, with north and east positive." },
    ],
    how: [
      "In 2D, distance is √((x₂ − x₁)² + (y₂ − y₁)²), which is Pythagoras on the coordinate differences. In 3D, a z term is added. On Earth, the haversine formula treats the planet as a sphere of mean radius 6,371.0088 km, while Vincenty's inverse formula uses the WGS-84 ellipsoid for sub-metre accuracy.",
    ],
    formulas: [
      { label: "2D distance", expr: "d = √((x₂ − x₁)² + (y₂ − y₁)²)" },
      { label: "3D distance", expr: "d = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²)" },
      { label: "Haversine", expr: "a = sin²(Δφ/2) + cos φ₁ cos φ₂ sin²(Δλ/2),  d = 2R asin √a" },
    ],
    interpret: [
      "Earth distances are along the surface, not road or flight routes. The two methods typically differ by under half a percent. Initial bearing is the compass direction to set off in from the first point; the heading changes along a great-circle route.",
    ],
    example: {
      setup: "Points (1, 2) and (4, 6); (0, 0, 0) and (3, 4, 12); and London to Paris.",
      steps: [
        `2D: √(3² + 4²) = ${dist2}.`,
        `3D: √(3² + 4² + 12²) = ${dist3}.`,
        `London (51.5072, −0.1276) to Paris (48.8566, 2.3522): haversine ${fixed(hav, 2)} km, Vincenty ${fixed(vin, 2)} km, initial bearing ${fixed(bearing, 1)}°.`,
      ],
      result: `The London to Paris straight-line distance is about ${fixed(vin, 1)} km.`,
    },
    useCases: [
      "Straight-line distance between two cities.",
      "Distance between map or game coordinates.",
      "Checking homework on the distance formula.",
    ],
    limitations: [
      "Straight-line or great-circle distance only; it does not know roads, terrain or air routes.",
      "Vincenty's method can fail to converge for nearly antipodal points; the spherical value is then shown.",
      "Coordinates are not looked up from place names; you enter latitude and longitude.",
    ],
    faqs: [
      { question: "What is the haversine formula?", answer: "A formula for the great-circle distance between two points on a sphere from their latitudes and longitudes." },
      { question: "Why do the two Earth distances differ?", answer: "Earth is slightly flattened, not a perfect sphere. The ellipsoidal method accounts for that." },
      { question: "How do I enter west or south coordinates?", answer: "Use negative numbers: west longitudes and south latitudes are negative." },
      { question: "Is this driving distance?", answer: "No. It is the shortest distance over the surface, not by road." },
    ],
  },

  "circle-calculator": {
    intro: [
      "The circle calculator finds the radius, diameter, circumference and area from any one of them. You can also enter a sector angle to get the arc length and the area of the sector.",
      "Everything is shown in your chosen length unit, with area in the unit squared.",
    ],
    whoFor: [
      "Students learning about π.",
      "Makers, bakers and gardeners sizing circular items.",
      "Anyone converting between a circle's measurements.",
    ],
    inputs: [
      { name: "Known measurement", text: "Radius, diameter, circumference or area." },
      { name: "Value and unit", text: "A positive number and a length unit." },
      { name: "Sector angle", text: "Optional, from 0 to 360 degrees." },
    ],
    how: [
      "Whatever you enter is first converted to the radius: r = d ÷ 2, r = C ÷ 2π or r = √(A ÷ π). The other measurements follow from the radius. For a sector with angle θ, arc length = θ ÷ 360 × 2πr and area = θ ÷ 360 × πr².",
    ],
    formulas: [
      { label: "Circumference", expr: "C = 2πr = πd" },
      { label: "Area", expr: "A = πr²" },
      { label: "Sector area", expr: "A = (θ ÷ 360) × πr²" },
    ],
    interpret: [
      "Circumference grows in proportion to the radius, while area grows with the square of it, so doubling the radius quadruples the area. π is approximately 3.14159265.",
    ],
    example: {
      setup: "A circle with a radius of 5 cm and a 60° sector.",
      steps: [
        `Diameter = 2 × 5 = ${circle.d} cm.`,
        `Circumference = 2 × π × 5 = ${fixed(circle.c, 4)} cm.`,
        `Area = π × 5² = ${fixed(circle.a, 4)} cm².`,
        `Sector (60°): arc length ${fixed((60 / 360) * circle.c, 4)} cm, area ${fixed(sector, 4)} cm².`,
      ],
      result: `Circumference ${fixed(circle.c, 2)} cm, area ${fixed(circle.a, 2)} cm².`,
    },
    useCases: [
      "Sizing a round table cover or pizza.",
      "Finding the length of fencing around a circular bed.",
      "Maths homework on π.",
    ],
    limitations: [
      "Perfect circles only.",
      "Results use a double-precision value of π.",
    ],
    faqs: [
      { question: "How do I find the radius from the circumference?", answer: "Divide the circumference by 2π." },
      { question: "What is the relationship between diameter and radius?", answer: "The diameter is twice the radius." },
      { question: "What is a sector?", answer: "A pizza-slice shaped part of a circle between two radii." },
      { question: "Why does doubling the radius quadruple the area?", answer: "Area depends on r squared." },
    ],
  },

  "surface-area-calculator": {
    intro: [
      "The surface area calculator finds the total surface area of a sphere, cone, cube, cylinder, rectangular box, capsule, spherical cap, conical frustum, ellipsoid or square pyramid. Where the surface has distinct parts, such as the base and curved surface of a cone, each part is listed.",
      "It is handy when you need to know how much paint, wrap or material covers a solid.",
    ],
    whoFor: [
      "Students of geometry.",
      "Painters, packagers and fabricators estimating covering material.",
      "Anyone comparing the surface of shapes with the same volume.",
    ],
    inputs: [
      { name: "Shape", text: "Choose the solid." },
      { name: "Dimensions", text: "Radius, height or edge lengths in your chosen unit." },
      { name: "Length unit", text: "mm to miles; area is in that unit squared." },
    ],
    how: [
      "Each shape uses its standard formula. For example, a cone's total surface area is πr² for the base plus πr × the slant height for the curved surface, where the slant height is √(r² + h²). A general ellipsoid has no closed form, so the calculator uses the Knud Thomsen approximation (p ≈ 1.6075, relative error up to about 1.06%) unless two axes are equal, in which case exact formulas are used.",
    ],
    formulas: [
      { label: "Sphere", expr: "A = 4πr²" },
      { label: "Cylinder", expr: "A = 2πr(r + h)" },
      { label: "Cone", expr: "A = πr(r + √(r² + h²))" },
      { label: "Box", expr: "A = 2(lw + lh + wh)" },
    ],
    interpret: [
      "Total surface area includes every face, including bases. If you only need to cover the sides (a tube without ends, say), use the listed parts rather than the total. Add allowance for waste when estimating materials.",
    ],
    example: {
      setup: "A cone with radius 3 cm and height 10 cm, a 3 cm sphere, and a 6 × 4 × 3 cm box.",
      steps: [
        `Cone: slant height = √(3² + 10²) = ${fixed(Math.hypot(3, 10), 4)}; area = π × 3 × (3 + ${fixed(Math.hypot(3, 10), 4)}) = ${fixed(coneArea.total, 3)} cm².`,
        `Sphere: 4π × 3² = ${fixed(sphArea.total, 3)} cm².`,
        `Box: 2 × (6×4 + 6×3 + 4×3) = ${fixed(boxArea.total, 0)} cm².`,
      ],
      result: `The cone's total surface area is about ${fixed(coneArea.total, 2)} cm².`,
    },
    useCases: [
      "Estimating paint or wrapping.",
      "Heat-transfer and coating calculations.",
      "Homework on solids.",
    ],
    limitations: [
      "Ideal shapes only; real objects have thickness and rough surfaces.",
      "General ellipsoid results are an approximation, and the page states when this is used.",
      "Hollow tubes are not included as a separate shape here; use the cylinder and subtract.",
    ],
    faqs: [
      { question: "What is surface area?", answer: "The total area of all the outside faces of a solid." },
      { question: "What is the slant height?", answer: "The distance along the sloping side of a cone from the rim to the tip: √(r² + h²)." },
      { question: "Does it include the base?", answer: "Yes, total surface area includes bases. The parts list shows each piece." },
      { question: "How accurate is the ellipsoid result?", answer: "Exact when two axes are equal and otherwise an approximation with an error up to about 1%." },
    ],
  },

  "pythagorean-theorem-calculator": {
    intro: [
      "The Pythagorean theorem states that in a right triangle the square of the hypotenuse equals the sum of the squares of the other two sides. This calculator finds whichever of the three sides is missing, and checks whether your triangle is a Pythagorean triple with whole-number sides.",
      "It also reports the area and perimeter.",
    ],
    whoFor: [
      "Students learning the theorem.",
      "Builders checking that a corner is square (the 3-4-5 rule).",
      "Anyone finding a diagonal.",
    ],
    inputs: [
      { name: "Which side to find", text: "The hypotenuse c, or leg a or b." },
      { name: "The other two sides", text: "Positive lengths in the same unit. The hypotenuse must be longer than either leg." },
    ],
    how: [
      "From a² + b² = c², the hypotenuse is c = √(a² + b²) and a leg is √(c² − b²). The calculator also shows a check by squaring the sides back.",
    ],
    formulas: [
      { label: "Theorem", expr: "a² + b² = c²" },
      { label: "Hypotenuse", expr: "c = √(a² + b²)" },
      { label: "Leg", expr: "a = √(c² − b²)" },
    ],
    interpret: [
      "The hypotenuse is always the longest side, opposite the right angle. If all three sides are whole numbers, they form a Pythagorean triple, such as 3-4-5, 5-12-13 or 8-15-17.",
    ],
    example: {
      setup: "Legs of 6 and 8.",
      steps: [
        "c = √(6² + 8²) = √(36 + 64) = √100.",
        "c = 10.",
        "Check: 6² + 8² = 100 = 10². This is a multiple of the 3-4-5 triple.",
      ],
      result: "The hypotenuse is 10, and the area is 24.",
    },
    useCases: [
      "Finding the diagonal of a rectangle or screen.",
      "Checking a corner is square with 3-4-5 measurements.",
      "Calculating ladder reach and ramp lengths.",
    ],
    limitations: [
      "Valid only for right triangles.",
      "All lengths must be in the same unit.",
    ],
    faqs: [
      { question: "What is a Pythagorean triple?", answer: "Three whole numbers that satisfy a² + b² = c², for example 3-4-5." },
      { question: "Does the theorem work for any triangle?", answer: "No. It applies only to right triangles; use the law of cosines for others." },
      { question: "Which side is the hypotenuse?", answer: "The side opposite the right angle, which is the longest." },
      { question: "How do I check a corner is square?", answer: "Measure 3 units along one side and 4 along the other; the diagonal should be exactly 5." },
    ],
  },

  "right-triangle-calculator": {
    intro: [
      "The right triangle calculator solves a right triangle from any two suitable known values: legs, hypotenuse, an acute angle, the area, the perimeter or the altitude to the hypotenuse. It returns the two legs, the hypotenuse, both acute angles, area, perimeter, altitude, inradius and circumradius, and draws the triangle.",
    ],
    whoFor: [
      "Trigonometry students.",
      "Builders, designers and surveyors working with slopes and heights.",
      "Anyone who knows two measurements and needs the rest.",
    ],
    inputs: [
      { name: "First and second known value", text: "Choose which measurements you know and enter their values. The two must be different kinds." },
    ],
    how: [
      "The right angle is at C, leg a is opposite angle α, leg b is opposite angle β and c is the hypotenuse. The calculator uses the Pythagorean theorem and the trigonometric ratios (sine, cosine, tangent) to find the missing parts. Combinations that involve area, perimeter or altitude are solved algebraically.",
    ],
    formulas: [
      { label: "Pythagoras", expr: "a² + b² = c²" },
      { label: "Ratios", expr: "sin α = a ÷ c,  cos α = b ÷ c,  tan α = a ÷ b" },
      { label: "Area and altitude", expr: "Area = ½ab,  h = ab ÷ c" },
    ],
    interpret: [
      "The two acute angles always add to 90°. If your inputs cannot describe a real right triangle, for example a leg longer than the hypotenuse, the calculator explains the problem.",
    ],
    example: {
      setup: "Legs a = 3 and b = 4.",
      steps: [
        `c = √(3² + 4²) = ${fixed(right.c, 0)}.`,
        `α = arctan(3 ÷ 4) = ${fixed(right.alpha, 3)}° and β = ${fixed(right.beta, 3)}°.`,
        `Area = ½ × 3 × 4 = ${fixed(right.area, 0)}; perimeter = ${fixed(right.perimeter, 0)}; altitude to the hypotenuse = ${fixed(right.h, 1)}.`,
      ],
      result: `Hypotenuse ${fixed(right.c, 0)}, angles ${fixed(right.alpha, 2)}° and ${fixed(right.beta, 2)}°.`,
    },
    useCases: [
      "Working out a ramp's length and angle.",
      "Finding the height of an object from distance and angle of elevation.",
      "Checking trigonometry exercises.",
    ],
    limitations: [
      "Flat right triangles only.",
      "Some combinations of two values do not determine a unique triangle or cannot exist; the calculator reports this.",
      "Angles are in degrees.",
    ],
    faqs: [
      { question: "Which two values can I use?", answer: "Almost any two of the legs, hypotenuse, either acute angle, area, perimeter or altitude, as long as they describe a real right triangle." },
      { question: "What are SOH-CAH-TOA?", answer: "A memory aid: sine is opposite over hypotenuse, cosine is adjacent over hypotenuse and tangent is opposite over adjacent." },
      { question: "How do I find the angle if I know two sides?", answer: "Use the inverse trigonometric function, such as arctan(opposite ÷ adjacent)." },
      { question: "What is the altitude to the hypotenuse?", answer: "The perpendicular distance from the right-angle vertex to the hypotenuse: ab ÷ c." },
    ],
  },
};

