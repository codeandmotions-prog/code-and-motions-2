import type { SolidId } from "@/lib/calculators/solids";

/**
 * Written explanation for each shape, shown below the calculators. Original text; every formula matches `solids.ts`
 * and the worked example for the same shape lives in `volumeExamples.ts`.
 */
export type ShapeArticle = {
  id: SolidId;
  /** H3 above the explanation. */
  heading: string;
  /** What the shape is and when it appears. */
  intro: string[];
  /** Extra forms of the formula and how the dimensions relate. */
  formulaNotes: string[];
  /** Where it is used and how to measure it. */
  practical: string[];
  /** Typical input errors. */
  mistakes: string[];
};

export const SHAPE_ARTICLES: ShapeArticle[] = [
  {
    id: "sphere",
    heading: "Volume of a sphere",
    intro: [
      "A sphere is the set of all points at the same distance, the radius r, from a centre point. It is the only solid with no edges or flat faces, and it encloses the most volume for a given surface area. Footballs, ball bearings, bubbles and spherical storage tanks are all close to spheres.",
      "Because the radius is cubed, volume grows very quickly with size: a ball with twice the radius holds eight times as much.",
    ],
    formulaNotes: [
      "If you know the diameter d instead of the radius, use V = π × d³ / 6, or simply halve d first.",
      "A sphere fills exactly two thirds of the cylinder that tightly encloses it (same radius, height equal to the diameter).",
      "For the outer skin of the ball, see the surface area calculator; for a hollow shell, subtract the inner sphere’s volume from the outer one.",
    ],
    practical: [
      "Measure across the widest point for the diameter, or wrap a tape around the middle to get the circumference C and use r = C / (2π).",
      "For a spherical tank, use the inside radius to get the capacity. A part-filled spherical tank is a spherical cap, covered below.",
      "Multiply the volume by a material’s density to estimate the mass of a solid ball.",
    ],
    mistakes: [
      "Entering the diameter where the radius is asked. The answer comes out eight times too large.",
      "Squaring the radius instead of cubing it. That gives something proportional to area, not volume.",
      "Mixing units, such as a radius in inches and an answer expected in litres. Pick the unit beside the field and let the calculator convert.",
    ],
  },
  {
    id: "cone",
    heading: "Volume of a cone",
    intro: [
      "A cone has a circular base and tapers smoothly to a single point, the apex. In a right circular cone the apex sits directly above the centre of the base. Funnels, traffic cones, party hats and ice-cream cones follow this shape, and a loose pile of sand or gravel settles into a rough cone.",
      "The volume of a cone is one third of the cylinder with the same base and height. Archimedes’ comparison of cones, spheres and cylinders is one of the oldest results in solid geometry.",
    ],
    formulaNotes: [
      "The slant length s, measured along the sloping side, is related to the height by s² = r² + h². If you only measured s, find h = √(s² − r²) with the Pythagorean theorem calculator.",
      "The same one-third rule applies to every pyramid and cone: V = 1/3 × base area × height.",
    ],
    practical: [
      "Measure the height straight up from the centre of the base, not along the side.",
      "A conical pile of material is only an estimate, because real piles are uneven. Measure the diameter of the base and the height at the peak.",
      "For a cone with its tip cut off, such as a bucket, use the conical frustum calculator.",
    ],
    mistakes: [
      "Using the slant length as the height. This overstates the volume.",
      "Forgetting the factor of one third and calculating the cylinder instead.",
      "Using the base diameter as the radius.",
    ],
  },
  {
    id: "cube",
    heading: "Volume of a cube",
    intro: [
      "A cube has six identical square faces and twelve equal edges, so one measurement, the edge length a, describes it completely. Dice, sugar cubes, storage cubes and many boxes are cubes.",
      "A cube is the special case of a rectangular box where length, width and height are all the same.",
    ],
    formulaNotes: [
      "The edge length is multiplied by itself three times, which is why the volume is written with a small 3.",
      "A cube with a 10 cm edge has a volume of 1,000 cm³, which is exactly 1 litre. A cube with a 1 m edge holds 1 m³, or 1,000 litres.",
      "Its outer surface is 6a², which the surface area calculator works out for you.",
    ],
    practical: [
      "Check that all edges really are equal. If they are not, use the rectangular box.",
      "To compare cube-shaped containers, remember that doubling the edge multiplies the volume by eight.",
    ],
    mistakes: [
      "Squaring instead of cubing. a² is an area (the size of one face), not a volume.",
      "Reading “3” in m³ as a length of three metres. The small 3 only means the unit is cubic.",
      "Using outside measurements when you want the capacity of a cube-shaped box. Measure the inside.",
    ],
  },
  {
    id: "cylinder",
    heading: "Volume of a cylinder",
    intro: [
      "A cylinder has two parallel circular ends joined by a curved side. Cans, drums, round water tanks, wells, concrete columns and the inside of a straight pipe are cylinders. This is one of the most common volume calculations, because so many containers are round.",
      "Think of it as a stack of identical circles: the area of one circle times the height of the stack.",
    ],
    formulaNotes: [
      "Here h is the height, or the length if the cylinder lies on its side. With the diameter d instead of the radius: V = π × d² × h / 4.",
      "The orientation does not matter for a completely full cylinder. For a vertical tank filled to a given depth, use the water depth as h.",
    ],
    practical: [
      "Measure the inside diameter and the inside height to find how much a tank or container can hold.",
      "Multiply the result in cubic metres by 1,000 for litres, or use the litres and gallons shown under the calculator.",
      "A horizontal cylinder that is only partly full has a different, more complicated formula; this calculator gives the full volume.",
    ],
    mistakes: [
      "Using the diameter as the radius, which makes the answer four times too large.",
      "Using outside dimensions for a container with thick walls, which overstates the capacity.",
      "Mixing a radius in centimetres with a height in metres without using the unit menus.",
    ],
  },
  {
    id: "box",
    heading: "Volume of a rectangular box (rectangular tank)",
    intro: [
      "A rectangular box, also called a cuboid or rectangular prism, has six rectangular faces that meet at right angles. It is a cube whose three dimensions may all be different. Rooms, swimming pools with a flat floor, aquariums, shipping boxes, concrete slabs and raised planting beds all fit this shape.",
      "The volume is the footprint (length times width) multiplied by the height or depth.",
    ],
    formulaNotes: [
      "Use the same unit for all three lengths, or let the unit menus convert for you.",
      "Dividing the volume in cm³ by 1,000 gives litres. A 60 cm × 30 cm × 30 cm aquarium is 54,000 cm³, or 54 litres.",
      "If a pool or trench has a floor that slopes evenly, the average depth (shallow end plus deep end, divided by two) can be used as h.",
    ],
    practical: [
      "For a slab, footing or paving base, enter the thickness in millimetres and the length and width in metres, each with its own unit menu.",
      "For a tank, use the water depth as h to get the volume of water, and the full inside height to get its capacity.",
      "Suppliers often advise allowing a little extra for waste and uneven ground. Check with yours.",
    ],
    mistakes: [
      "Forgetting to convert a thickness given in millimetres or inches.",
      "Using outside dimensions for a container or tank.",
      "Using the maximum depth of a pool with a sloping floor instead of the average depth.",
    ],
  },
  {
    id: "capsule",
    heading: "Volume of a capsule",
    intro: [
      "A capsule is a cylinder with a hemisphere on each end. Medicine capsules are the familiar example, and some horizontal tanks and pressure vessels have a straight middle section and rounded ends of the same radius.",
      "Its volume is the cylinder part plus the volume of two hemispheres, which together make one full sphere.",
    ],
    formulaNotes: [
      "Written together: V = π × r² × (h + 4r/3).",
      "The overall length L from tip to tip is h + 2r. If you measured the overall length, subtract 2r to get h.",
    ],
    practical: [
      "Measure the overall length and the diameter, then work out h = L − 2r before entering it.",
      "The formula assumes hemispherical ends. Tanks with flatter dished or elliptical ends hold less than this formula suggests.",
    ],
    mistakes: [
      "Entering the overall length as h. This counts the two rounded ends twice.",
      "Using the diameter as the radius.",
      "Applying the capsule to a tank with flat or dished ends.",
    ],
  },
  {
    id: "cap",
    heading: "Volume of a spherical cap",
    intro: [
      "A spherical cap is the piece of a sphere cut off by a flat plane: a dome sitting on a circular base. Bowls, domes, lenses and the liquid in a spherical tank that is less than full are all spherical caps.",
      "Three lengths describe a cap: the radius R of the sphere it was cut from, the height h of the cap, and the radius a of its circular base. Any two of them fix the third, so the calculator asks for exactly two.",
    ],
    formulaNotes: [
      "With the base radius a instead of the sphere radius R: V = 1/6 × π × h × (3a² + h²).",
      "The three lengths are related by a² = h × (2R − h), and R = (a² + h²) / (2h).",
      "When h = R the cap is a hemisphere, and when h = 2R it is the whole sphere.",
    ],
    practical: [
      "For a spherical tank filled to a depth h, measured from the bottom, the liquid forms a cap of height h, so enter the tank’s inside radius R and the liquid depth.",
      "If you enter R and a, the calculator returns the smaller cap (less than a hemisphere). To get the larger cap, enter R and h.",
      "Measure h as the straight height from the flat base to the top of the dome.",
    ],
    mistakes: [
      "Entering all three values or only one. Leave exactly one field blank.",
      "A cap height larger than the sphere’s diameter, or a base radius larger than the sphere radius. Neither is possible.",
      "Using the length along the curved surface instead of the straight height.",
    ],
  },
  {
    id: "frustum",
    heading: "Volume of a conical frustum",
    intro: [
      "A conical frustum is a cone with its tip sliced off by a plane parallel to the base. It has a larger circle at the bottom, a smaller circle at the top and sloping sides. Buckets, flower pots, paper cups, lampshades and many hoppers are frustums.",
      "Its volume can be found as the volume of the full cone minus the small cone that was removed, which simplifies to a single formula.",
    ],
    formulaNotes: [
      "r₁ and r₂ are the radii of the two circles and h is the perpendicular height between them, not the slanted side.",
      "If r₁ = r₂ the formula becomes π × r² × h, the cylinder. As r₂ shrinks towards zero it approaches the cone, which has its own calculator.",
      "The slant length along the side is √(h² + (r₁ − r₂)²).",
    ],
    practical: [
      "For a bucket or pot, measure the inside diameters at the rim and the base and the inside depth to get its capacity.",
      "The order of the two radii does not matter, because the formula is symmetrical in r₁ and r₂.",
    ],
    mistakes: [
      "Using the slant length as the height.",
      "Entering diameters instead of radii.",
      "Using outside dimensions for a container, which ignores the wall thickness.",
    ],
  },
  {
    id: "ellipsoid",
    heading: "Volume of an ellipsoid",
    intro: [
      "An ellipsoid is a stretched or squashed sphere. It has three semi-axes a, b and c, each half the full width, height or depth. If all three are equal it is a sphere; if two are equal it is a spheroid, like a rugby ball (elongated) or a flattened planet.",
      "Rugby balls, oval tanks and many fruits are well approximated by ellipsoids. Eggs are only roughly ellipsoidal, so treat their result as an estimate.",
    ],
    formulaNotes: [
      "Each semi-axis is half of the full width, height or depth, and the three are simply multiplied together.",
      "For a spheroid with two equal semi-axes a and one different semi-axis c, V = 4/3 × π × a² × c.",
      "Setting a = b = c = r gives the sphere formula 4/3 × π × r³.",
    ],
    practical: [
      "Measure the full length, width and height, then halve each one before entering them as semi-axes.",
      "The order of a, b and c does not matter, since the three are simply multiplied together.",
    ],
    mistakes: [
      "Entering full lengths instead of semi-axes. The result is eight times too large.",
      "Using it for shapes that are not symmetrical, such as an egg with a pointed end.",
    ],
  },
  {
    id: "pyramid",
    heading: "Volume of a square pyramid",
    intro: [
      "A square pyramid has a square base and four triangular faces that meet at the apex above the centre of the base. The same shape appears in monuments, roof hips, tents, paperweights and some hoppers.",
      "Like a cone, a pyramid holds one third of the prism with the same base and height.",
    ],
    formulaNotes: [
      "The height of each triangular face (the slant height) is √(h² + (a/2)²), which is used for surface area rather than volume.",
      "For a pyramid whose base is a rectangle or another shape, V = 1/3 × base area × height. For a rectangular base, enter the length, width and height in the rectangular box calculator and divide the result by three.",
    ],
    practical: [
      "Measure the height straight up from the centre of the base, not up the sloping face.",
      "For a roof or hopper, use the area calculator for an irregular base and divide base area times height by three.",
    ],
    mistakes: [
      "Using the slant height of a face instead of the vertical height.",
      "Forgetting the one-third factor.",
      "Using a rectangular base with a single edge value. This calculator assumes a square base.",
    ],
  },
  {
    id: "tube",
    heading: "Volume of a tube (hollow cylinder)",
    intro: [
      "A tube, or hollow cylinder, is a cylinder with a cylindrical hole through its length. Pipes, rings, bushings, hollow columns and drinking straws are tubes. Here the volume means the volume of the wall material, the metal or plastic itself, not the empty space inside.",
      "It equals the volume of the outer cylinder minus the volume of the hole.",
    ],
    formulaNotes: [
      "The wall thickness is t = R − r, and the formula can also be written V = π × h × t × (R + r).",
      "To find the mass of a pipe section, multiply the volume by the density of the material.",
    ],
    practical: [
      "For the capacity of the pipe, meaning the liquid it holds, use the cylinder calculator with the inner radius instead.",
      "Nominal pipe sizes are often not the same as the actual diameters, so measure the real inner and outer diameters.",
    ],
    mistakes: [
      "Entering an inner radius equal to or larger than the outer radius. The calculator rejects it.",
      "Using the tube calculator when you actually want the capacity of the pipe.",
      "Entering diameters in the radius fields.",
    ],
  },
];
