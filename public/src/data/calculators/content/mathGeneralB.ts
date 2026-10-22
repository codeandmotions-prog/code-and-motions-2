import type { CalcContent } from "../types";
import { q, qFromString, qToFraction } from "@/lib/calculators/rational";
import { determinant, inverse, mMul, cellText, type Matrix } from "@/lib/calculators/matrix";
import { gcdMany, lcmMany, euclidSteps, factorize, factorsFromPrimes, primeFactorText } from "@/lib/calculators/numtheory";
import { roundToPlaces } from "@/lib/calculators/mathmisc";
import { simplifySqrt } from "@/lib/calculators/mathmisc";
import { parseDec, mul, toScientific, toENotation, toEngineering, toPlain } from "@/lib/calculators/decimal";
import { fixed, fmt, groupDigits } from "@/lib/calculators/format";

const M = (rows: number[][]): Matrix => rows.map((r) => r.map((v) => q(BigInt(v))));
const A = M([[1, 2], [3, 4]]);
const B = M([[5, 6], [7, 8]]);
const AB = mMul(A, B);
const detA = determinant(A);
const invA = inverse(A)!;
const mat = (m: Matrix) => `[${m.map((r) => r.map((v) => cellText(v, false)).join(", ")).join("; ")}]`;

const g3 = gcdMany([16n, 88n, 104n]);
const l3 = lcmMany([21n, 14n, 38n]);
const f360 = factorize(360);
const fs360 = factorsFromPrimes(f360);
const sq72 = simplifySqrt(72);
const sci = parseDec("0.000345")!;
const bigA = 123456789012345678901234567890n;
const bigB = 987654321098765432109876543210n;
const bigProduct = bigA * bigB;
const r2 = (s: string, places: number, mode: "half-away" | "half-even") => roundToPlaces(qFromString(s)!, places, mode).text;

export const mathGeneralBContent: Record<string, CalcContent> = {
  "log-calculator": {
    intro: [
      "A logarithm answers the question: what power must the base be raised to in order to get a given number? This log calculator finds logarithms to base 10, base e (natural log), base 2 or any base you choose, and can also solve for the number or the base when the other two values are known.",
      "It shows the natural, common and binary logarithm together so you can compare them.",
    ],
    whoFor: [
      "Students in algebra, pre-calculus and science.",
      "Programmers estimating how many bits or steps something needs.",
      "Anyone working with decibels, pH, earthquake scales or growth rates.",
    ],
    inputs: [
      { name: "Solve for", text: "The logarithm, the number (antilog), or the base." },
      { name: "Base", text: "10, e, 2 or a custom positive base other than 1." },
      { name: "Number x", text: "Must be greater than zero when you take its logarithm." },
      { name: "Logarithm y", text: "The exponent, used when solving for the number or the base." },
    ],
    how: [
      "log_b(x) = y means b^y = x. Calculators compute any base using the change-of-base rule: log_b(x) = ln(x) ÷ ln(b). Solving for the number simply raises the base to the power y, and solving for the base takes x to the power 1 ÷ y.",
    ],
    formulas: [
      { label: "Definition", expr: "log_b(x) = y  ⇔  b^y = x" },
      { label: "Change of base", expr: "log_b(x) = ln(x) ÷ ln(b)" },
      { label: "Product rule", expr: "log(xy) = log x + log y" },
    ],
    interpret: [
      "Logarithms turn multiplication into addition, which is why they are used for scales that span many orders of magnitude. The logarithm of 1 is 0 for any base, and the logarithm of a number between 0 and 1 is negative.",
    ],
    example: {
      setup: "Find log₁₀(1000), then log₂(8).",
      steps: [
        "10^3 = 1000, so log₁₀(1000) = 3.",
        `Using change of base: ln(1000) ÷ ln(10) = ${fmt(Math.log(1000), 8)} ÷ ${fmt(Math.log(10), 8)} = ${fmt(Math.log(1000) / Math.log(10), 8)}.`,
        `2^3 = 8, so log₂(8) = 3. In the same way, the natural log of 1000 is ${fmt(Math.log(1000), 8)}.`,
      ],
      result: "log₁₀(1000) = 3.",
    },
    useCases: [
      "Computing how many doublings reach a target.",
      "Converting between pH, decibels and linear values.",
      "Solving exponential equations such as 2^x = 50.",
    ],
    limitations: [
      "Real logarithms only: the number must be positive and the base must be positive and not equal to 1.",
      "Results are floating-point approximations shown to 12 significant digits.",
    ],
    faqs: [
      { question: "What is the difference between log and ln?", answer: "log usually means base 10 and ln means base e (about 2.71828), the natural logarithm. Some textbooks use log for base e, so check your source." },
      { question: "Why can't I take the log of zero or a negative number?", answer: "No real power of a positive base gives zero or a negative result, so the real logarithm is undefined." },
      { question: "How do I find the log of any base on a basic calculator?", answer: "Divide the natural or common log of the number by the same log of the base." },
      { question: "What is an antilog?", answer: "The inverse of a logarithm: raising the base to the power. The antilog base 10 of 3 is 1000." },
    ],
  },

  "ratio-calculator": {
    intro: [
      "This ratio calculator solves proportions of the form A : B = C : D when one value is missing, simplifies a ratio to its lowest terms, and scales a ratio up or down by a factor.",
      "It handles decimals and fractions in the inputs and shows the cross-multiplication used.",
    ],
    whoFor: [
      "Students solving proportion problems.",
      "Cooks and makers scaling recipes or mixes.",
      "Designers and builders keeping aspect ratios or mix ratios consistent.",
    ],
    inputs: [
      { name: "Mode", text: "Find a missing value, simplify a ratio, or scale a ratio." },
      { name: "A, B, C, D", text: "Fill in three of the four values and leave one blank to find it." },
      { name: "Terms and scale factor", text: "For simplifying or scaling, enter two or three ratio terms; scaling also takes a factor above zero." },
    ],
    how: [
      "Two ratios are equal when their cross products are equal: A × D = B × C. The missing value is found by rearranging this equation. To simplify a ratio, any decimals or fractions are cleared by multiplying through, then every term is divided by their greatest common factor. Scaling multiplies each term by the factor.",
    ],
    formulas: [
      { label: "Proportion", expr: "A ÷ B = C ÷ D  ⇒  A × D = B × C" },
      { label: "Solve for D", expr: "D = B × C ÷ A" },
    ],
    interpret: [
      "The headline is the missing term or the simplified ratio. A simplified ratio uses whole numbers with no common factor. For scaling, the new terms keep the same proportion as the originals.",
    ],
    example: {
      setup: "Solve 3 : 4 = 12 : ?, then simplify 12 : 18 : 30.",
      steps: [
        "Cross-multiply: 3 × D = 4 × 12 = 48, so D = 16.",
        "For 12 : 18 : 30, the greatest common factor is 6.",
        "Divide each term by 6 to get 2 : 3 : 5.",
      ],
      result: "3 : 4 = 12 : 16, and 12 : 18 : 30 simplifies to 2 : 3 : 5.",
    },
    useCases: [
      "Scaling a recipe from 4 servings to 10.",
      "Mixing paint, fertiliser or concrete in set proportions.",
      "Keeping image aspect ratios consistent when resizing.",
    ],
    limitations: [
      "Ratio terms must be non-negative, and you must leave exactly one box empty when solving.",
      "A zero in the denominator position of a proportion cannot be solved.",
    ],
    faqs: [
      { question: "How do I simplify a ratio?", answer: "Divide every term by their greatest common factor. 12 : 18 divided by 6 gives 2 : 3." },
      { question: "What is a proportion?", answer: "A statement that two ratios are equal, such as 3 : 4 = 12 : 16." },
      { question: "Can I use decimals?", answer: "Yes. Decimals are converted to whole numbers before simplifying." },
      { question: "How do I scale a ratio?", answer: "Multiply every term by the same number. Doubling 2 : 3 gives 4 : 6." },
    ],
  },

  "root-calculator": {
    intro: [
      "The root calculator finds square roots, cube roots and any nth root of a number. For square roots of whole numbers it also shows the simplified radical form, and it flags perfect squares and perfect powers.",
      "Negative numbers are handled where a real answer exists: odd roots of negatives are real, and square roots of negatives are shown as imaginary numbers.",
    ],
    whoFor: [
      "Students simplifying radicals or checking roots.",
      "Builders and designers working with areas and volumes.",
      "Anyone who needs an nth root without a scientific calculator.",
    ],
    inputs: [
      { name: "Root degree (n)", text: "A whole number from 1 up: 2 for a square root, 3 for a cube root, and so on." },
      { name: "Number", text: "The radicand, the number under the root sign." },
    ],
    how: [
      "The nth root of x is x raised to the power 1 ÷ n. For square roots of whole numbers, the calculator divides out the largest square factor to give the simplest radical form, so √72 becomes 6√2 because 72 = 36 × 2.",
    ],
    formulas: [
      { label: "nth root", expr: "ⁿ√x = x^(1/n)" },
      { label: "Simplifying", expr: "√(a² × b) = a√b" },
    ],
    interpret: [
      "The check line raises the answer back to the power n so you can see it reproduces the original number. Only the principal real root is shown; an even root of a positive number also has a negative root of the same size.",
    ],
    example: {
      setup: "Find the square root of 72.",
      steps: [
        `72 = 36 × 2 and 36 = 6², so √72 = ${sq72.outside}√${sq72.inside}.`,
        `Numerically, ${sq72.outside} × √${sq72.inside} = ${fmt(Math.sqrt(72), 10)}.`,
        `Check: ${fmt(Math.sqrt(72), 10)}² = ${fixed(Math.sqrt(72) ** 2, 6)}.`,
      ],
      result: `√72 = ${sq72.outside}√${sq72.inside} ≈ ${fmt(Math.sqrt(72), 10)}.`,
    },
    useCases: [
      "Simplifying radicals in algebra.",
      "Finding the side of a square from its area.",
      "Calculating cube roots for volumes.",
    ],
    limitations: [
      "Radical simplification applies to square roots of positive whole numbers within safe integer size.",
      "Even roots of negative numbers other than square roots are reported as not real; complex roots are not displayed.",
    ],
    faqs: [
      { question: "What is a perfect square?", answer: "A whole number that is the square of another whole number, such as 49 = 7². Its square root is a whole number." },
      { question: "Can I take the square root of a negative number?", answer: "Not within the real numbers. The calculator shows the imaginary result, an i times the root of the positive number." },
      { question: "How do I simplify a square root?", answer: "Pull out the largest perfect-square factor. √72 = √(36 × 2) = 6√2." },
      { question: "What is the cube root of a negative number?", answer: "It is real and negative: the cube root of −27 is −3." },
    ],
  },

  "lcm-calculator": {
    intro: [
      "The least common multiple (LCM) is the smallest positive number that every number in your list divides into evenly. This calculator finds the LCM of two or more whole numbers, shows the greatest common factor alongside, and displays prime factorisations for context.",
      "It is useful for adding fractions with different denominators and for scheduling repeating events.",
    ],
    whoFor: [
      "Students working with fractions and number theory.",
      "Teachers wanting quick checks.",
      "Anyone finding when repeating cycles line up.",
    ],
    inputs: [
      { name: "Numbers", text: "Two or more whole numbers, separated by commas, spaces or new lines. Negative signs are ignored." },
    ],
    how: [
      "For two numbers, LCM(a, b) = a × b ÷ GCF(a, b). For more numbers the calculation is repeated, combining the running result with each next number. The calculator uses exact big-integer arithmetic, so there is no overflow.",
    ],
    formulas: [{ label: "Two numbers", expr: "LCM(a, b) = |a × b| ÷ GCF(a, b)" }],
    interpret: [
      "The LCM is always at least as large as the largest number. If the numbers share no common factor other than 1 (they are coprime), the LCM equals their product.",
    ],
    example: {
      setup: "Find the LCM of 21, 14 and 38.",
      steps: [
        "21 = 3 × 7, 14 = 2 × 7 and 38 = 2 × 19.",
        "Take each prime at its highest power: 2, 3, 7 and 19.",
        `LCM = 2 × 3 × 7 × 19 = ${l3}.`,
      ],
      result: `LCM(21, 14, 38) = ${l3}.`,
    },
    useCases: [
      "Finding a common denominator for fractions.",
      "Working out when two repeating schedules coincide.",
      "Solving gear and rhythm problems.",
    ],
    limitations: [
      "Whole numbers only. Input is limited to 100 numbers of up to 150 digits each.",
      "If any number is zero, the LCM is reported as 0.",
    ],
    faqs: [
      { question: "What is the LCM used for?", answer: "Mostly to find common denominators when adding fractions, and to find when repeating cycles align." },
      { question: "How are LCM and GCF related?", answer: "For two numbers, LCM × GCF equals the product of the numbers." },
      { question: "Is LCM the same as lowest common multiple?", answer: "Yes. The terms are interchangeable." },
      { question: "Can I enter more than two numbers?", answer: "Yes, up to 100." },
    ],
  },

  "gcf-calculator": {
    intro: [
      "The greatest common factor (GCF), also called the greatest common divisor (GCD) or highest common factor (HCF), is the largest whole number that divides every number in your list without a remainder. This calculator finds it for two or more numbers and shows the steps of Euclid's algorithm.",
      "It also reports the LCM and tells you when the numbers are relatively prime.",
    ],
    whoFor: [
      "Students simplifying fractions.",
      "Anyone splitting items into equal groups.",
      "Teachers demonstrating Euclid's algorithm.",
    ],
    inputs: [
      { name: "Numbers", text: "Two or more whole numbers separated by commas, spaces or new lines." },
    ],
    how: [
      "Euclid's algorithm repeatedly replaces the larger number by the remainder of dividing the larger by the smaller until the remainder is zero. The last non-zero remainder is the GCF. For a list, the process is repeated with the running result and each next number.",
    ],
    formulas: [{ label: "Euclid", expr: "GCF(a, b) = GCF(b, a mod b), ending when the remainder is 0" }],
    interpret: [
      "A GCF of 1 means the numbers are coprime. To simplify a fraction, divide its numerator and denominator by their GCF.",
    ],
    example: {
      setup: "Find the GCF of 16, 88 and 104.",
      steps: [
        ...euclidSteps(88n, 16n).map((s) => `Euclid for 88 and 16: ${s}`),
        `The GCF of 88 and 16 is 8; then GCF(8, 104) = 8.`,
      ],
      result: `GCF(16, 88, 104) = ${g3}.`,
    },
    useCases: [
      "Reducing fractions to lowest terms.",
      "Dividing quantities into the largest equal groups.",
      "Finding the largest tile that fits a floor of given dimensions.",
    ],
    limitations: [
      "Whole numbers only, with at most 100 numbers of up to 150 digits.",
      "GCF of numbers that are all zero is undefined.",
    ],
    faqs: [
      { question: "Are GCF, GCD and HCF the same thing?", answer: "Yes. Different regions and textbooks use different names for the same value." },
      { question: "What does it mean if the GCF is 1?", answer: "The numbers have no common factor other than 1: they are relatively prime or coprime." },
      { question: "How do I find the GCF by hand?", answer: "List the prime factors of each number and multiply the primes they share, or use Euclid's algorithm." },
      { question: "Can negative numbers be used?", answer: "Their sign is ignored: the GCF is based on absolute values." },
    ],
  },

  "factor-calculator": {
    intro: [
      "The factor calculator lists every factor of a positive whole number, shows each factor pair, gives the prime factorisation and tells you whether the number is prime, composite or a perfect square.",
      "It also reports the number of factors and their sum.",
    ],
    whoFor: [
      "Students learning factors, primes and divisibility.",
      "Anyone arranging items in rows and columns.",
      "Teachers preparing worked examples.",
    ],
    inputs: [{ name: "Number", text: "A positive whole number up to 10¹⁵." }],
    how: [
      "The number is divided by candidate primes up to its square root (trial division) to find its prime factorisation. All factors are then built from combinations of those primes, and factor pairs are the factors paired with their cofactors.",
    ],
    formulas: [
      { label: "Number of factors", expr: "(e₁ + 1)(e₂ + 1)… where n = p₁^e₁ × p₂^e₂ × …" },
    ],
    interpret: [
      "A prime number has exactly two factors, 1 and itself. A perfect square has an odd number of factors. A number whose factors (excluding itself) add up to the number is a perfect number.",
    ],
    example: {
      setup: "Factorise 360.",
      steps: [
        `Prime factorisation: 360 = ${primeFactorText(f360)}.`,
        `Number of factors: (3 + 1)(2 + 1)(1 + 1) = ${fs360.length}.`,
        `The factors are ${fs360.join(", ")}.`,
      ],
      result: `360 = ${primeFactorText(f360)} with ${fs360.length} factors.`,
    },
    useCases: [
      "Finding all ways to arrange items into equal rows.",
      "Checking whether a number is prime.",
      "Preparing prime factors for GCF and LCM work.",
    ],
    limitations: [
      "Limited to 10¹⁵ so factoring is fast in the browser. Larger numbers can take too long with trial division.",
      "Positive whole numbers only.",
    ],
    faqs: [
      { question: "What is the difference between a factor and a multiple?", answer: "Factors divide into a number evenly; multiples are the results of multiplying it. The factors of 12 include 3, and 12 is a multiple of 3." },
      { question: "Is 1 a prime number?", answer: "No. A prime has exactly two distinct factors, and 1 has only one." },
      { question: "How many factors does a number have?", answer: "Add one to each exponent in the prime factorisation and multiply the results." },
      { question: "What is a perfect number?", answer: "A number equal to the sum of its proper factors, such as 6 = 1 + 2 + 3." },
    ],
  },

  "rounding-calculator": {
    intro: [
      "This rounding calculator rounds a number to a chosen decimal place (including tens, hundreds and thousands) or to the nearest fraction, using the rule you choose: standard half away from zero, half up, half down, banker's rounding (half to even), half to odd, always up, always down and more.",
      "Rounding is exact and works on the digits, so numbers like 1.005 round correctly instead of being affected by floating-point error.",
    ],
    whoFor: [
      "Accountants and analysts who need a specific rounding convention.",
      "Programmers comparing rounding modes.",
      "Students and teachers working with decimals.",
    ],
    inputs: [
      { name: "Number to round", text: "Any decimal number of any length." },
      { name: "Round to", text: "A decimal place or the nearest fraction such as 1/8 or 1/16." },
      { name: "Rounding rule", text: "How ties and remainders are handled." },
    ],
    how: [
      "The number is scaled so the rounding position becomes a whole number, rounded using your rule, then scaled back. Because the arithmetic is on exact fractions, the result is not affected by binary floating-point behaviour.",
    ],
    formulas: [{ label: "Round to p places", expr: "round(x × 10^p) ÷ 10^p using the chosen rule" }],
    interpret: [
      "Different rules only disagree on exact ties (like 2.5) and for the directed modes (floor, ceiling). Banker's rounding sends ties to the nearest even digit and is often used to avoid bias when many values are rounded and added.",
    ],
    example: {
      setup: "Round 3.14159 to 2 decimal places, and 1.005 with two different rules.",
      steps: [
        `3.14159 to 2 places is ${r2("3.14159", 2, "half-away")}.`,
        `1.005 to 2 places with the standard rule is ${r2("1.005", 2, "half-away")}, because the exact value is a tie that rounds up.`,
        `With banker's rounding, 2.5 to the nearest whole number is ${r2("2.5", 0, "half-even")}, and 3.5 is ${r2("3.5", 0, "half-even")}.`,
      ],
      result: `3.14159 rounds to ${r2("3.14159", 2, "half-away")} at two decimal places.`,
    },
    useCases: [
      "Following a specific rounding rule in accounting or tax.",
      "Rounding measurements to the nearest 1/8 or 1/16.",
      "Comparing how modes affect a set of values.",
    ],
    limitations: [
      "Rounds to a decimal place or a fraction, not to significant figures.",
      "The standard rule may differ from what a particular programming language or spreadsheet does by default.",
    ],
    faqs: [
      { question: "What is banker's rounding?", answer: "Round half to even: ties go to the nearest even number, so 2.5 becomes 2 and 3.5 becomes 4. It avoids a systematic upward bias." },
      { question: "Why does 1.005 round to 1.01 here but 1.00 in some software?", answer: "Many programs store 1.005 as a binary approximation slightly below 1.005. This calculator uses the exact decimal value." },
      { question: "How do I round to the nearest ten?", answer: "Choose Tens in the decimal place list." },
      { question: "What does rounding toward zero do?", answer: "It drops the fractional part, so 2.9 becomes 2 and −2.9 becomes −2 (truncation)." },
    ],
  },

  "matrix-calculator": {
    intro: [
      "The matrix calculator performs the standard operations of linear algebra on matrices up to 8 × 8: addition, subtraction, multiplication, scalar multiplication, determinant, inverse, transpose, powers, rank and trace. All arithmetic uses exact fractions, so results such as inverses have no rounding error.",
      "You can show entries as fractions or as decimals.",
    ],
    whoFor: [
      "Students of linear algebra, engineering and computer graphics.",
      "Anyone checking hand calculations.",
      "Developers who need an exact result for a small matrix.",
    ],
    inputs: [
      { name: "Operation", text: "Choose A + B, A − B, A × B, k × A, determinant, inverse, transpose, power or rank and trace." },
      { name: "Matrix A and B", text: "One row per line, with entries separated by spaces or commas. Fractions like 1/2 are allowed." },
      { name: "Scalar k or exponent n", text: "Used for scaling and powers. Negative powers use the inverse." },
      { name: "Display", text: "Exact fractions or decimals." },
    ],
    how: [
      "Addition and subtraction work entry by entry and need matrices of the same size. Multiplication needs the number of columns of A to equal the number of rows of B; each entry is the sum of products along a row of A and a column of B. Determinants and inverses are found with Gaussian elimination using exact rational arithmetic.",
    ],
    formulas: [
      { label: "Product", expr: "(AB)ᵢⱼ = Σₖ Aᵢₖ × Bₖⱼ" },
      { label: "2 × 2 determinant", expr: "det [[a, b], [c, d]] = ad − bc" },
      { label: "Inverse", expr: "A × A⁻¹ = I, exists only when det(A) ≠ 0" },
    ],
    interpret: [
      "A determinant of zero means the matrix is singular and has no inverse. The rank is the number of independent rows. Matrix multiplication is not commutative: AB and BA usually differ.",
    ],
    example: {
      setup: "A = [1 2; 3 4] and B = [5 6; 7 8].",
      steps: [
        `A × B = ${mat(AB)}.`,
        `det(A) = 1 × 4 − 2 × 3 = ${qToFraction(detA)}.`,
        `A⁻¹ = ${mat(invA)}.`,
      ],
      result: `A × B = ${mat(AB)} and det(A) = ${qToFraction(detA)}.`,
    },
    useCases: [
      "Checking linear algebra homework.",
      "Solving small systems of equations by inverse matrices.",
      "Verifying transformation matrices.",
    ],
    limitations: [
      "Limited to 8 rows and 8 columns.",
      "Does not compute eigenvalues, decompositions or step-by-step elimination.",
      "Entries must be real numbers or fractions.",
    ],
    faqs: [
      { question: "When can I multiply two matrices?", answer: "When the number of columns in the first equals the number of rows in the second." },
      { question: "What does a zero determinant mean?", answer: "The matrix is singular: it has no inverse, and its rows or columns are linearly dependent." },
      { question: "How do I enter a matrix?", answer: "Type one row per line and separate numbers with spaces or commas." },
      { question: "Are the results exact?", answer: "Yes, they use exact fractions. Switch to decimals for a rounded view." },
    ],
  },

  "scientific-notation-calculator": {
    intro: [
      "Scientific notation writes very large or very small numbers as a coefficient between 1 and 10 multiplied by a power of ten. This calculator converts any number to scientific, E and engineering notation, and can add, subtract, multiply and divide numbers written in scientific notation.",
      "Inputs can be plain decimals, E notation (3.45e-4) or the form 3.45x10^-4.",
    ],
    whoFor: [
      "Science and engineering students.",
      "Anyone working with very large or small measurements.",
      "Teachers demonstrating standard form.",
    ],
    inputs: [
      { name: "Operation", text: "Convert, add, subtract, multiply or divide." },
      { name: "Number x and y", text: "Any decimal, E notation or ×10^ form." },
    ],
    how: [
      "To convert, the decimal point is moved until one non-zero digit is before it, and the number of places moved becomes the exponent of 10. For multiplication, coefficients are multiplied and exponents added. For division, coefficients are divided and exponents subtracted. Addition and subtraction first align the exponents.",
    ],
    formulas: [
      { label: "Form", expr: "a × 10^n with 1 ≤ |a| < 10" },
      { label: "Multiply", expr: "(a × 10^m)(b × 10^n) = (ab) × 10^(m+n)" },
    ],
    interpret: [
      "E notation is the same as scientific notation with e replacing × 10^. Engineering notation uses exponents that are multiples of three, which matches SI prefixes such as kilo, mega and milli.",
    ],
    example: {
      setup: "Convert 0.000345 and multiply it by 2.5e3.",
      steps: [
        `0.000345 = ${toScientific(sci)} (E notation ${toENotation(sci)}, engineering ${toEngineering(sci)}).`,
        `0.000345 × 2500 = ${toPlain(mul(sci, parseDec("2.5e3")!))}, which is ${toScientific(mul(sci, parseDec("2.5e3")!))}.`,
      ],
      result: `0.000345 = ${toScientific(sci)}.`,
    },
    useCases: [
      "Writing measurements for lab reports.",
      "Multiplying very large or small quantities.",
      "Converting E notation from a spreadsheet to standard form.",
    ],
    limitations: [
      "Inputs are limited to 500 significant digits.",
      "Division is rounded to 30 significant digits; other operations are exact.",
    ],
    faqs: [
      { question: "How do I write 0.00012 in scientific notation?", answer: "Move the decimal point four places right to get 1.2, so it is 1.2 × 10^−4." },
      { question: "What is E notation?", answer: "A compact way calculators and spreadsheets write scientific notation: 1.2e-4 means 1.2 × 10^−4." },
      { question: "What is engineering notation?", answer: "Scientific notation where the exponent is a multiple of 3, such as 345 × 10^−6." },
      { question: "How do I add numbers in scientific notation?", answer: "Rewrite them with the same exponent, add the coefficients and renormalise." },
    ],
  },

  "big-number-calculator": {
    intro: [
      "The big number calculator performs exact arithmetic on numbers with hundreds of digits: addition, subtraction, multiplication, division, powers, square roots, factorials, remainders and the greatest common divisor and least common multiple of whole numbers. Where a standard calculator would switch to scientific notation and lose digits, this one returns every digit.",
      "For division and square roots you choose how many significant digits to keep.",
    ],
    whoFor: [
      "Students exploring factorials, powers and large primes.",
      "Programmers checking arbitrary-precision results.",
      "Puzzle solvers and number theory enthusiasts.",
    ],
    inputs: [
      { name: "Operation", text: "Add, subtract, multiply, divide, power, square root, factorial, remainder, GCD or LCM." },
      { name: "Numbers", text: "Up to 1,000 digits each. Spaces and commas are ignored. Factorial, remainder, GCD and LCM need whole numbers." },
      { name: "Factorial", text: "A whole number from 0 to 3,000 (3,000! has 9,131 digits)." },
      { name: "Exponent", text: "A whole number from 0 to 5,000 for powers." },
      { name: "Significant digits", text: "For division and roots, between 5 and 500." },
    ],
    how: [
      "Numbers are stored as exact integers scaled by a power of ten. Addition, subtraction, multiplication, whole-number powers, factorials, remainders, GCD and LCM are exact. Division and square roots are computed to the chosen number of significant digits and rounded.",
    ],
    formulas: [{ label: "Exact product", expr: "a × b with all digits kept" }],
    interpret: [
      "The result panel shows the headline and the full number in a scrollable block, with digit counts. When both numbers are whole, division also reports the integer quotient and remainder.",
    ],
    example: {
      setup: "Multiply 123456789012345678901234567890 by 987654321098765432109876543210.",
      steps: [
        "Both numbers have 30 digits.",
        `The exact product has ${bigProduct.toString().length} digits.`,
      ],
      result: groupDigits(bigProduct.toString()),
    },
    useCases: [
      "Checking factorials, remainders and large powers.",
      "Verifying results from programming languages with limited precision.",
      "Exploring number patterns.",
    ],
    limitations: [
      "Inputs are limited to 1,000 digits and results to 20,000 digits.",
      "Division and roots are rounded to your chosen significant digits.",
      "Very large calculations are limited by browser performance.",
    ],
    faqs: [
      { question: "Why not just use a normal calculator?", answer: "Standard calculators store about 15 significant digits. This tool keeps every digit of the result for exact operations." },
      { question: "How many digits can I use?", answer: "Inputs can have up to 1,000 digits, and results can be up to 20,000 digits long." },
      { question: "Is division exact?", answer: "Division is rounded to the number of significant digits you choose. For whole numbers it also gives the exact quotient and remainder." },
      { question: "Can it compute factorials?", answer: "Yes, for whole numbers from 0 to 3,000. The permutation and combination calculator also uses factorials to count arrangements." },
    ],
  },
};

