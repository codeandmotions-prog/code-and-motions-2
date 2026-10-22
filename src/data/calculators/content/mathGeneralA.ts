import type { CalcContent } from "../types";
import { evaluate, displayResult } from "@/lib/calculators/expr";
import { q, qAdd, qMul, qDiv, qToFraction, qToDecimal } from "@/lib/calculators/rational";
import { percentChange, percentDifference, percentError, solveQuadratic, remainingAfter, timeToReach } from "@/lib/calculators/mathmisc";
import { fixed, fmt } from "@/lib/calculators/format";
import { parseRadix, toRadix } from "@/lib/calculators/radix";

const sciEx = displayResult(evaluate("sin(30) + 2^3 × sqrt(16)", "deg", 0));
const half = q(1n, 2n);
const third = q(1n, 3n);
const fracSum = qAdd(half, third);
const fracProd = qMul(half, third);
const fracDiv = qDiv(half, third);
const pe = percentError(56.891, 62.327);
const quad = solveQuadratic(1, -3, 2);
const quad2 = solveQuadratic(1, 2, 5);
const c14 = remainingAfter(100, 11460, 5730);
const c14time = timeToReach(100, 25, 5730);
const bin = (a: string, b: string, op: "+" | "-" | "*") => {
  const x = parseRadix(a, 2)!;
  const y = parseRadix(b, 2)!;
  return toRadix(op === "+" ? x + y : op === "-" ? x - y : x * y, 2);
};
const hexOp = (a: string, b: string) => toRadix(parseRadix(a, 16)! + parseRadix(b, 16)!, 16);

export const mathGeneralAContent: Record<string, CalcContent> = {
  "scientific-calculator": {
    intro: [
      "This scientific calculator evaluates full expressions rather than one operation at a time. You can type or tap an expression with brackets, powers, roots, logarithms, trigonometric functions, factorials and percentages, then press Calculate to see the result and keep a history of earlier answers.",
      "It works in degrees or radians, understands constants such as π and e, and lets you reuse the last answer with Ans.",
    ],
    whoFor: [
      "Students working through algebra, trigonometry and calculus homework.",
      "Engineers, makers and analysts who need a quick check without opening a spreadsheet.",
      "Anyone who prefers typing a whole expression and seeing it before calculating.",
    ],
    inputs: [
      { name: "Expression", text: "Type directly or use the keypad. Use ^ for powers, ! for factorial, % for percent and root(x, n) for the nth root of x." },
      { name: "Angle unit", text: "Degrees or radians for sin, cos, tan and their inverses." },
      { name: "Ans", text: "Inserts the previous result so you can build on it." },
    ],
    how: [
      "The expression is parsed using the standard order of operations: brackets, then functions and powers, then multiplication and division, then addition and subtraction. Implicit multiplication such as 2π or 3(4+1) is understood.",
      "Calculations use standard double-precision floating-point numbers and the result is displayed to 12 significant digits to hide tiny binary rounding errors. Tiny floating-point residues are cleaned up, so common results such as sin(30°) show as 0.5 and sin(180°) as 0.",
    ],
    formulas: [
      { label: "Order of operations", expr: "Brackets → functions and powers → × and ÷ → + and −" },
      { label: "Degrees to radians", expr: "radians = degrees × π ÷ 180" },
      { label: "Logarithm base change", expr: "log_b(x) = ln(x) ÷ ln(b)" },
    ],
    interpret: [
      "Read the expression echoed beneath the result to confirm it was understood as you intended, especially when using implicit multiplication or nested brackets. Errors name the problem, such as dividing by zero, a square root of a negative number or an unmatched bracket.",
      "Very large and very small answers appear in exponent notation, such as 1.5e-9.",
    ],
    example: {
      setup: "Evaluate sin(30) + 2^3 × √16 in degree mode.",
      steps: [
        "sin(30°) = 0.5.",
        "2^3 = 8 and √16 = 4, so 2^3 × √16 = 32.",
        "Add: 0.5 + 32.",
      ],
      result: `${sciEx}`,
    },
    useCases: [
      "Checking homework answers step by step.",
      "Converting between logarithm bases or evaluating powers.",
      "Using Ans to chain calculations.",
    ],
    limitations: [
      "Real numbers only; results that would be complex are reported as errors rather than shown as complex numbers.",
      "Floating-point precision applies: about 15–16 significant digits internally, 12 displayed. Factorials are limited to 170! because larger values exceed the number range.",
      "Not approved for exams. Check your exam rules before relying on any online calculator.",
    ],
    faqs: [
      { question: "How do I switch between degrees and radians?", answer: "Use the angle-unit buttons above the keypad. The setting applies to sin, cos, tan and their inverse functions." },
      { question: "Can I type the expression with my keyboard?", answer: "Yes. The field accepts typed input, and the keypad just inserts text at the cursor. Press Enter to calculate." },
      { question: "What does Ans do?", answer: "It inserts the result of your previous calculation, so you can continue from it, for example Ans × 2." },
      { question: "Why does 0.1 + 0.2 show 0.3?", answer: "Computers store decimals in binary, which makes tiny errors. The display rounds to 12 significant digits to hide them." },
    ],
  },

  "fraction-calculator": {
    intro: [
      "This fraction calculator adds, subtracts, multiplies and divides fractions and mixed numbers and always returns the answer in simplest form, as a mixed number and as a decimal. It can also simplify a single fraction, convert a fraction to a decimal, and turn a terminating decimal back into a fraction.",
      "All arithmetic is done with exact whole numbers, so there is no rounding error, even for large numerators and denominators.",
    ],
    whoFor: [
      "Students learning or checking fraction arithmetic.",
      "Cooks and makers scaling recipes and measurements.",
      "Teachers who want worked steps to show on screen.",
    ],
    inputs: [
      { name: "Fraction 1 and 2", text: "Each has an optional whole-number part, a numerator and a denominator. Leave the whole number at 0 for a plain fraction." },
      { name: "Operation", text: "Add, subtract, multiply or divide." },
      { name: "Other modes", text: "Simplify a fraction, convert to decimal, or convert a decimal to a fraction." },
    ],
    how: [
      "To add or subtract, the fractions are rewritten over a common denominator, then combined. To multiply, numerators are multiplied together and denominators are multiplied together. To divide, the second fraction is flipped (its reciprocal) and multiplied.",
      "Every result is reduced by dividing the numerator and denominator by their greatest common factor. Mixed numbers are first converted to improper fractions.",
    ],
    formulas: [
      { label: "Add", expr: "a/b + c/d = (a×d + c×b) ÷ (b×d)" },
      { label: "Multiply", expr: "a/b × c/d = (a×c) ÷ (b×d)" },
      { label: "Divide", expr: "a/b ÷ c/d = (a×d) ÷ (b×c)" },
    ],
    interpret: [
      "The headline answer is the simplified fraction. The mixed-number form is useful for measurements, and the decimal form is shown for comparison; a repeating decimal is marked as such.",
      "Division by a zero fraction is not defined and is reported as an error.",
    ],
    example: {
      setup: "Work with 1/2 and 1/3.",
      steps: [
        `Add: 1/2 + 1/3 = 3/6 + 2/6 = ${qToFraction(fracSum)}.`,
        `Multiply: 1/2 × 1/3 = ${qToFraction(fracProd)}.`,
        `Divide: 1/2 ÷ 1/3 = 1/2 × 3/1 = ${qToFraction(fracDiv)} (${qToDecimal(fracDiv, 6).text}).`,
      ],
      result: `1/2 + 1/3 = ${qToFraction(fracSum)}, which is ${qToDecimal(fracSum, 8).text}… as a repeating decimal.`,
    },
    useCases: [
      "Adding measurements such as 2 3/4 cups and 1 5/8 cups.",
      "Checking homework answers.",
      "Converting 0.375 to 3/8.",
    ],
    limitations: [
      "Decimal-to-fraction conversion handles terminating decimals only; for a repeating decimal such as 0.333… enter the fraction form.",
      "Numerators and denominators must be whole numbers, and denominators must be above zero.",
    ],
    faqs: [
      { question: "How do I add fractions with different denominators?", answer: "Find a common denominator, convert both fractions to it, add the numerators and simplify. The calculator does these steps for you." },
      { question: "What is a mixed number?", answer: "A whole number combined with a proper fraction, such as 2 1/4. It is equal to the improper fraction 9/4." },
      { question: "Why must I flip the second fraction when dividing?", answer: "Dividing by a fraction is the same as multiplying by its reciprocal. So 1/2 ÷ 1/3 equals 1/2 × 3/1." },
      { question: "Does the calculator lose precision?", answer: "No. It uses exact integer arithmetic, so results are exact fractions." },
    ],
  },

  "percentage-calculator": {
    intro: [
      "This percentage calculator answers the six questions people ask most often: what is X% of Y, X is what percent of Y, X is Y% of what number, what is the percentage change from A to B, how do I increase or decrease a number by a percentage, and what is the percentage difference between two values.",
      "Choose the question that matches yours, fill in the numbers and see the answer with the working.",
    ],
    whoFor: [
      "Shoppers checking discounts and sale prices.",
      "Students and professionals working with growth rates, margins and changes.",
      "Anyone who forgets whether to divide or multiply.",
    ],
    inputs: [
      { name: "Question type", text: "Select the form of percentage problem you want to solve." },
      { name: "Numbers", text: "The fields change to match the question, for example the percentage and the number, or the old and new values." },
    ],
    how: [
      "A percentage is a fraction of 100. To find X% of Y you multiply Y by X ÷ 100. To find what percent a part is of a whole, divide the part by the whole and multiply by 100. For percentage change, subtract the old value from the new one, divide by the old value and multiply by 100.",
      "Percentage difference is different from percentage change: it compares two values symmetrically, dividing the gap by their average, so neither is treated as the starting point.",
    ],
    formulas: [
      { label: "X% of Y", expr: "result = Y × X ÷ 100" },
      { label: "Percent of a whole", expr: "percent = part ÷ whole × 100" },
      { label: "Percentage change", expr: "change = (new − old) ÷ |old| × 100" },
      { label: "Percentage difference", expr: "diff = |a − b| ÷ ((|a| + |b|) ÷ 2) × 100" },
    ],
    interpret: [
      "A positive change is an increase and a negative change is a decrease. Remember that a percentage rise followed by the same percentage fall does not return to the start: +50% then −50% leaves you 25% lower.",
      "Percentage change is undefined when the starting value is zero.",
    ],
    example: {
      setup: "Four common questions with simple numbers.",
      steps: [
        "15% of 80 = 80 × 15 ÷ 100 = 12.",
        "12 is what percent of 60? 12 ÷ 60 × 100 = 20%.",
        `From 250 to 300 is a change of (300 − 250) ÷ 250 × 100 = ${fixed(percentChange(250, 300), 1)}%.`,
        `The percentage difference between 40 and 50 is 10 ÷ 45 × 100 = ${fixed(percentDifference(40, 50), 2)}%.`,
      ],
      result: "15% of 80 is 12.",
    },
    useCases: [
      "Working out a sale price after a discount.",
      "Finding a percentage increase in salary, price or traffic.",
      "Comparing two values without choosing a baseline.",
    ],
    limitations: [
      "Does not know context, such as percentage points versus percent. A rise from 2% to 3% is 1 percentage point, or a 50% relative increase.",
      "Compound or successive percentage changes should be calculated one step at a time.",
    ],
    faqs: [
      { question: "How do I calculate a percentage increase?", answer: "Subtract the old value from the new value, divide the result by the old value and multiply by 100." },
      { question: "What is the difference between percent change and percent difference?", answer: "Percent change measures movement from a starting value. Percent difference compares two values symmetrically using their average, so neither is the baseline." },
      { question: "Why does +20% then −20% not return me to the start?", answer: "Because the second percentage applies to a bigger number. 100 + 20% = 120, then 120 − 20% = 96." },
      { question: "What is a percentage point?", answer: "The simple arithmetic difference between two percentages. Moving from 10% to 12% is 2 percentage points, or a 20% relative increase." },
    ],
  },

  "random-number-generator": {
    intro: [
      "This random number generator draws whole numbers or decimals from any range you choose. You can generate a single number or up to 1,000, allow or forbid repeats, sort the output, and choose how many decimal places to use.",
      "It is handy for raffles, games, sampling and anything where you want an unbiased pick rather than a human guess.",
    ],
    whoFor: [
      "Teachers, game masters and organisers running draws.",
      "Developers and analysts who need a quick set of sample values.",
      "Anyone making a fair choice between options.",
    ],
    inputs: [
      { name: "Lowest and highest values", text: "The inclusive range. The highest value must be at least the lowest." },
      { name: "How many numbers", text: "Between 1 and 1,000." },
      { name: "Type", text: "Whole numbers or decimals, with a chosen number of places." },
      { name: "Repeats", text: "Allow the same number more than once, or draw without repeats." },
      { name: "Order", text: "Keep the order generated, or sort low to high or high to low." },
    ],
    how: [
      "The tool uses your browser's cryptographically secure random generator (Web Crypto) and avoids modulo bias by rejecting values that would make some numbers more likely than others, so every allowed value is equally likely.",
      "Without repeats, the numbers are drawn from the set of possible values without replacement, so you cannot ask for more numbers than the range contains.",
    ],
    formulas: [{ label: "Range size (whole numbers)", expr: "count = highest − lowest + 1" }],
    interpret: [
      "Each new press generates a fresh set. Results are not saved or reproducible, so copy the numbers you want to keep. Random does not mean evenly spread: short sequences often contain streaks or clusters.",
      "When drawing without repeats, the maximum quantity equals the number of possible values in the range.",
    ],
    example: {
      setup: "Five whole numbers between 1 and 100 with no repeats, sorted low to high.",
      steps: [
        "The range contains 100 possible values.",
        "Five different numbers are drawn from them without replacement, then sorted.",
      ],
      result: "The output is different each time, for example five numbers such as 7, 23, 41, 68 and 92. Any run is equally likely.",
    },
    useCases: [
      "Picking raffle winners or team groupings.",
      "Generating sample data for testing.",
      "Choosing a random number for a game or classroom activity.",
    ],
    limitations: [
      "Numbers are generated in your browser. For regulated draws or lotteries, use a certified process.",
      "Decimals are limited to 12 places and up to 1,000 numbers per draw.",
      "Not suitable for generating passwords or security keys; use a password manager for those.",
    ],
    faqs: [
      { question: "Is this truly random?", answer: "It uses your browser's secure random source, which is suitable for everyday draws. It is not a certified lottery or gaming system." },
      { question: "Can I generate numbers without repeats?", answer: "Yes. Choose no repeats and the tool draws without replacement, as long as the range holds at least as many values as you ask for." },
      { question: "Are the endpoints included?", answer: "Yes, both the lowest and highest values can appear." },
      { question: "Why do I see streaks or patterns?", answer: "Genuine randomness often produces clusters. Humans tend to expect more evenness than chance actually produces." },
    ],
  },

  "percent-error-calculator": {
    intro: [
      "Percent error tells you how far a measured or estimated value is from the true or accepted value, as a percentage of the true value. This calculator gives the percent error, the absolute error and the signed direction (high or low).",
      "It is widely used in science labs, quality control and engineering to judge the accuracy of a measurement.",
    ],
    whoFor: [
      "Students writing lab reports.",
      "Technicians checking instrument accuracy.",
      "Anyone comparing a forecast or estimate with an actual value.",
    ],
    inputs: [
      { name: "Observed value", text: "What you measured or estimated." },
      { name: "True value", text: "The accepted or actual value. It cannot be zero." },
    ],
    how: [
      "The absolute error is the size of the difference between observed and true values. Percent error divides that difference by the true value and multiplies by 100. The signed version keeps the direction so you can see whether you were above or below.",
    ],
    formulas: [
      { label: "Percent error", expr: "% error = |observed − true| ÷ |true| × 100" },
      { label: "Absolute error", expr: "|observed − true|" },
    ],
    interpret: [
      "Smaller is better. A percent error of 1% means the measurement was within a hundredth of the true value. Compare it with the tolerance expected for your instrument or experiment.",
      "Percent error needs a trustworthy true value. If you are comparing two experimental values with no accepted standard, use percentage difference instead.",
    ],
    example: {
      setup: "A measurement of 56.891 compared with a true value of 62.327.",
      steps: [
        `Absolute error = |56.891 − 62.327| = ${fmt(pe.absoluteError, 6)}.`,
        `Percent error = ${fmt(pe.absoluteError, 6)} ÷ 62.327 × 100 = ${fixed(pe.pct, 4)}%.`,
        "Because the observed value is lower than the true value, the signed error is negative.",
      ],
      result: `Percent error ≈ ${fixed(pe.pct, 2)}%.`,
    },
    useCases: [
      "Reporting experimental accuracy in a lab write-up.",
      "Checking a measuring device against a reference standard.",
      "Comparing a forecast with the outcome.",
    ],
    limitations: [
      "The true value must be non-zero; otherwise percent error is undefined.",
      "Percent error says nothing about uncertainty or repeatability. A single measurement can be accurate by luck.",
    ],
    faqs: [
      { question: "What is the formula for percent error?", answer: "Take the absolute difference between the observed and true values, divide by the true value and multiply by 100." },
      { question: "Can percent error be negative?", answer: "The standard percent error is reported as a positive number. The signed version shows direction and is negative when the observed value is lower." },
      { question: "Is percent error the same as percent difference?", answer: "No. Percent error is relative to a known true value. Percent difference compares two values with no reference using their average." },
      { question: "What is a good percent error?", answer: "It depends on the field and instrument. Compare it with the expected tolerance of your method." },
    ],
  },

  "exponent-calculator": {
    intro: [
      "The exponent calculator raises a base to a power, including negative, decimal and fractional exponents, and shows the result in plain and scientific notation. It can also work backwards to find the missing base or the missing exponent.",
      "For whole-number results it gives the exact value, even when it has dozens of digits.",
    ],
    whoFor: [
      "Students learning indices and powers.",
      "People working with growth, decay or scientific notation.",
      "Anyone who needs a quick power without a full scientific calculator.",
    ],
    inputs: [
      { name: "Solve for", text: "The result, the base or the exponent." },
      { name: "Base and exponent", text: "Any real numbers, with the restrictions explained below. Type e for Euler's number." },
      { name: "Result", text: "Used when solving for the base or the exponent." },
    ],
    how: [
      "A positive whole exponent means repeated multiplication. A negative exponent means the reciprocal: 2^-3 = 1 ÷ 2^3. A fractional exponent is a root: x^(1/2) is the square root of x. When solving for the base, the calculator takes the result to the power 1 ÷ exponent; when solving for the exponent, it uses logarithms.",
    ],
    formulas: [
      { label: "Negative exponent", expr: "x^−n = 1 ÷ x^n" },
      { label: "Fractional exponent", expr: "x^(m/n) = (n-th root of x)^m" },
      { label: "Missing exponent", expr: "n = ln(result) ÷ ln(base)" },
    ],
    interpret: [
      "A base between 0 and 1 shrinks as the exponent grows; a base above 1 grows. Zero to the power zero is conventionally 1 in many contexts, though it is mathematically undefined in some. A negative base with a fractional exponent has no real result and is reported as such.",
    ],
    example: {
      setup: "Calculate 2 raised to the power −3.",
      steps: ["2^−3 = 1 ÷ 2^3.", "2^3 = 8, so 2^−3 = 1 ÷ 8.", `Check by solving the other way: the exponent that turns 2 into 8 is ${fmt(Math.log(8) / Math.log(2), 6)}.`],
      result: "2^−3 = 0.125 = 1/8.",
    },
    useCases: [
      "Evaluating compound growth or decay factors.",
      "Converting between roots and fractional powers.",
      "Finding how many doublings it takes to reach a target.",
    ],
    limitations: [
      "Results use double-precision numbers; very large powers overflow and are reported as too large. Exact digits are shown for whole-number results within a safe size.",
      "Real numbers only: negative bases with non-integer exponents are not supported.",
    ],
    faqs: [
      { question: "What does a negative exponent mean?", answer: "It means one divided by the base raised to the positive exponent. So 5^−2 = 1/25 = 0.04." },
      { question: "What is x^0?", answer: "Any non-zero number raised to the power 0 is 1." },
      { question: "How do I get a root using exponents?", answer: "Use the reciprocal as the exponent. The cube root of x is x^(1/3)." },
      { question: "Why is the result sometimes shown in e-notation?", answer: "Very large or small numbers are displayed as, for example, 1.5e-9, meaning 1.5 × 10^−9." },
    ],
  },

  "binary-calculator": {
    intro: [
      "The binary calculator adds, subtracts, multiplies and divides numbers written in base 2, and converts between binary and decimal. Every answer is also shown in decimal and hexadecimal so you can see how the representations relate.",
      "Binary is how computers store numbers, so this tool is useful for programming, digital electronics and computer science courses.",
    ],
    whoFor: [
      "Computer science students and learners.",
      "Programmers checking bit patterns.",
      "Electronics hobbyists working with logic and registers.",
    ],
    inputs: [
      { name: "Operation", text: "Add, subtract, multiply, divide, or convert between binary and decimal." },
      { name: "Binary numbers", text: "Digits 0 and 1 only. Spaces between groups of bits are ignored, and a leading minus sign is allowed." },
    ],
    how: [
      "The calculator converts each binary string to an exact integer, performs the operation with arbitrary-precision arithmetic and converts the answer back to binary. Division gives the quotient and remainder as well as a fractional binary expansion.",
    ],
    formulas: [{ label: "Binary to decimal", expr: "d = Σ bit × 2^position (position 0 is the rightmost bit)" }],
    interpret: [
      "Negative results use a minus sign rather than two's complement, so the digits are easy to read. If you need a fixed-width two's complement form, convert the decimal result yourself for the width you want.",
    ],
    example: {
      setup: "Add 1101 and 101 in binary.",
      steps: [
        "1101 in binary is 8 + 4 + 0 + 1 = 13.",
        "101 in binary is 4 + 0 + 1 = 5.",
        `13 + 5 = 18, which is ${bin("1101", "101", "+")} in binary.`,
        `For comparison, 1101 − 101 = ${bin("1101", "101", "-")} and 1101 × 101 = ${bin("1101", "101", "*")}.`,
      ],
      result: `1101 + 101 = ${bin("1101", "101", "+")} (decimal 18).`,
    },
    useCases: [
      "Learning how binary addition carries work.",
      "Checking a bit pattern in code.",
      "Converting a decimal value to binary quickly.",
    ],
    limitations: [
      "Unsigned magnitudes with a sign. It does not model fixed-width overflow or two's complement arithmetic.",
      "Binary fractions in input are not accepted; division results show a limited number of fractional bits.",
    ],
    faqs: [
      { question: "How do I add binary numbers?", answer: "Add column by column from the right: 0+0=0, 0+1=1, 1+1=10 (write 0, carry 1). The calculator shows the answer and its decimal value." },
      { question: "How do I convert binary to decimal?", answer: "Add the powers of two for each bit that is 1. For 1101: 8 + 4 + 1 = 13." },
      { question: "Can it handle very long binary numbers?", answer: "Yes. It uses exact big-integer arithmetic, so length is limited only by practicality." },
      { question: "Does it show two's complement?", answer: "No. Negative numbers are shown with a minus sign for readability." },
    ],
  },

  "hex-calculator": {
    intro: [
      "The hex calculator adds, subtracts, multiplies and divides hexadecimal (base 16) numbers and converts between hex and decimal. Each result also appears in decimal and binary.",
      "Hexadecimal is common in programming, web colours, memory addresses and debugging, because each hex digit maps neatly to four bits.",
    ],
    whoFor: [
      "Programmers and web developers.",
      "Students of computer science and electronics.",
      "Anyone decoding colour codes or memory addresses.",
    ],
    inputs: [
      { name: "Operation", text: "Add, subtract, multiply, divide, or convert between hexadecimal and decimal." },
      { name: "Hex numbers", text: "Digits 0–9 and letters A–F in either case. A leading 0x and spaces are ignored." },
    ],
    how: [
      "Each hexadecimal string is converted to an exact integer, the operation is performed with arbitrary-precision arithmetic and the result is converted back. Hex digit values are A = 10, B = 11, C = 12, D = 13, E = 14 and F = 15.",
    ],
    formulas: [{ label: "Hex to decimal", expr: "d = Σ digit × 16^position (position 0 is the rightmost digit)" }],
    interpret: [
      "Check the decimal and binary forms if you are verifying code. Each hex digit equals four binary bits, so 0x1F4 is 0001 1111 0100.",
    ],
    example: {
      setup: "Add 1F4 and A3 in hexadecimal.",
      steps: [
        "1F4 = 1×256 + 15×16 + 4 = 500.",
        "A3 = 10×16 + 3 = 163.",
        `500 + 163 = 663, which is ${hexOp("1F4", "A3")} in hex.`,
      ],
      result: `1F4 + A3 = ${hexOp("1F4", "A3")} (decimal 663).`,
    },
    useCases: [
      "Working with CSS colour values and memory offsets.",
      "Converting hex to decimal when debugging.",
      "Checking arithmetic on register values.",
    ],
    limitations: [
      "Unsigned magnitudes with an optional minus sign; fixed-width overflow and two's complement are not modelled.",
      "Hexadecimal fractions are not accepted in input.",
    ],
    faqs: [
      { question: "What do the letters mean in hexadecimal?", answer: "A to F stand for 10 to 15, so each hex digit holds one of 16 values." },
      { question: "How do I convert hex to decimal?", answer: "Multiply each digit by 16 to the power of its position and add the results. 1F4 = 1×256 + 15×16 + 4 = 500." },
      { question: "Is the case of the letters important?", answer: "No. 'a' and 'A' are treated the same." },
      { question: "Why is hex used in computing?", answer: "Because one hex digit represents exactly four bits, so hex is a compact and readable way to write binary data." },
    ],
  },

  "half-life-calculator": {
    intro: [
      "The half-life calculator solves exponential decay problems. Given any three of the initial quantity, the remaining quantity, the elapsed time and the half-life, it finds the one that is missing. It also converts between half-life, mean lifetime and the decay constant.",
      "Half-life appears in radioactive decay, radiocarbon dating, medicine (how quickly a drug leaves the body) and in any process where a quantity falls by the same fraction over equal intervals.",
    ],
    whoFor: [
      "Physics, chemistry and biology students.",
      "Anyone working with dating methods or decay.",
      "Learners who want to see exponential decay worked through.",
    ],
    inputs: [
      { name: "What to find", text: "Remaining quantity, time to decay, half-life, initial quantity, or a conversion between decay constants." },
      { name: "Initial and remaining quantity", text: "In any consistent unit: grams, atoms, percent or activity." },
      { name: "Elapsed time and half-life", text: "In the same unit of time, such as years or days." },
    ],
    how: [
      "After each half-life, half of what remains has decayed. Mathematically N(t) = N₀ × (½)^(t ÷ t½). To find time or half-life, the equation is rearranged using natural logarithms. The decay constant λ equals ln 2 divided by the half-life, and the mean lifetime τ equals 1 ÷ λ.",
    ],
    formulas: [
      { label: "Remaining", expr: "N(t) = N₀ × (1/2)^(t ÷ t½)" },
      { label: "Half-life", expr: "t½ = t × ln 2 ÷ ln(N₀ ÷ N)" },
      { label: "Constants", expr: "λ = ln 2 ÷ t½,  τ = t½ ÷ ln 2" },
    ],
    interpret: [
      "After 1 half-life, 50% remains; after 2, 25%; after 3, 12.5%. The result also reports how many half-lives have elapsed so you can sense the scale quickly.",
      "Use the same time unit throughout. The time-unit label field is for display only.",
    ],
    example: {
      setup: "Carbon-14 has a half-life of 5,730 years. How much of 100 g remains after 11,460 years?",
      steps: [
        "11,460 ÷ 5,730 = 2 half-lives.",
        `100 × (1/2)² = ${fixed(c14, 1)} g.`,
        `Working backwards, the time for 100 g to fall to 25 g is ${fixed(c14time, 0)} years.`,
      ],
      result: `${fixed(c14, 1)} g remains after two half-lives.`,
    },
    useCases: [
      "Radiocarbon dating examples.",
      "Estimating when a drug concentration falls below a threshold.",
      "Converting between half-life and decay constant for physics problems.",
    ],
    limitations: [
      "Assumes ideal first-order exponential decay with a constant half-life. Real systems, such as drug elimination, may not follow this exactly.",
      "Not a substitute for dating-laboratory calibration or clinical dosing decisions.",
    ],
    faqs: [
      { question: "What is half-life?", answer: "The time it takes for half of a quantity to decay. It stays the same however much you start with." },
      { question: "How do I calculate remaining quantity?", answer: "Multiply the initial quantity by one half raised to the number of half-lives that have passed." },
      { question: "What is the mean lifetime?", answer: "The average time a particle survives before decaying. It equals the half-life divided by ln 2, about 1.4427 half-lives." },
      { question: "Can I use percent instead of grams?", answer: "Yes. Enter 100 as the initial quantity and the result is the percent remaining." },
    ],
  },

  "quadratic-formula-calculator": {
    intro: [
      "The quadratic formula calculator solves any equation of the form ax² + bx + c = 0. It reports both roots, whether they are real or complex, along with the discriminant, the vertex, the axis of symmetry and the y-intercept of the parabola.",
      "You can enter coefficients as whole numbers, decimals or fractions such as 3/4.",
    ],
    whoFor: [
      "Algebra students solving or checking quadratics.",
      "Physics and engineering learners analysing projectile or optimisation problems.",
      "Teachers needing a quick worked solution.",
    ],
    inputs: [
      { name: "a", text: "The coefficient of x². It cannot be zero, otherwise the equation is not quadratic." },
      { name: "b", text: "The coefficient of x." },
      { name: "c", text: "The constant term." },
    ],
    how: [
      "The discriminant b² − 4ac determines the type of roots: positive gives two real roots, zero gives one repeated root, and negative gives two complex roots. The roots are then found with the quadratic formula. The calculator uses a numerically stable form that avoids losing precision when b is large compared with a and c.",
    ],
    formulas: [
      { label: "Quadratic formula", expr: "x = (−b ± √(b² − 4ac)) ÷ (2a)" },
      { label: "Discriminant", expr: "Δ = b² − 4ac" },
      { label: "Vertex", expr: "x = −b ÷ 2a,  y = a·x² + b·x + c" },
    ],
    interpret: [
      "Real roots are where the parabola crosses the x-axis. A repeated root means it just touches the axis. Complex roots mean it never crosses it. The vertex is the minimum point if a > 0 and the maximum if a < 0.",
    ],
    example: {
      setup: "Solve x² − 3x + 2 = 0.",
      steps: [
        "a = 1, b = −3, c = 2, so the discriminant is (−3)² − 4 × 1 × 2 = 1.",
        `x = (3 ± √1) ÷ 2, giving x = ${quad.roots![0]} and x = ${quad.roots![1]}.`,
        `The vertex is at x = ${quad.vertexX}, y = ${quad.vertexY}.`,
        `For comparison, x² + 2x + 5 = 0 has discriminant ${quad2.disc} and complex roots ${quad2.complex!.re} ± ${quad2.complex!.im}i.`,
      ],
      result: `x = ${quad.roots![0]} or x = ${quad.roots![1]}.`,
    },
    useCases: [
      "Solving homework equations.",
      "Finding when a thrown object reaches the ground.",
      "Finding the maximum or minimum of a quadratic model.",
    ],
    limitations: [
      "Results are floating-point approximations and are displayed to 12 significant digits.",
      "The equation must be in standard form. Rearrange first if needed.",
    ],
    faqs: [
      { question: "What if a is zero?", answer: "Then the equation is linear, not quadratic, and the quadratic formula does not apply. Solve bx + c = 0 for x." },
      { question: "What are complex roots?", answer: "Solutions involving i, the square root of −1. They appear in conjugate pairs when the discriminant is negative." },
      { question: "What does the discriminant tell me?", answer: "Its sign tells you the type of roots: positive for two real, zero for one repeated and negative for two complex." },
      { question: "Can I enter fractions?", answer: "Yes. Type values like 3/4 or decimals like 0.75." },
    ],
  },
};

