import type { CalcContent } from "../types";
import { describe, normalCdf, zCritical, tCritical, sampleSizeFor, marginOfErrorFor, binomialPmf } from "@/lib/calculators/stats";
import { permutations, combinations, factorialBig } from "@/lib/calculators/numtheory";
import { fixed, fmt } from "@/lib/calculators/format";

const sdData = [10, 12, 23, 23, 16, 23, 21, 16];
const sd = describe(sdData);
const stData = [3, 7, 7, 9, 12, 15, 15, 15, 21, 30];
const st = describe(stData);
const mmmData = [6, 2, 9, 4, 4, 11, 7];
const mmm = describe(mmmData);
const ss = sampleSizeFor(95, 5, 50, null);
const ssPop = sampleSizeFor(95, 5, 50, 1000);
const moe = marginOfErrorFor(95, 385, 50, null);
const z15 = normalCdf(1.5);
const ciT = tCritical(95, 39);
const ciZ = zCritical(95);
const ciMoe = (ciT * 8) / Math.sqrt(40);
const pBoth = 0.4 * 0.3;
const pEither = 0.4 + 0.3 - pBoth;
const bin4 = binomialPmf(10, 4, 0.5);
const arithTerms = Array.from({ length: 10 }, (_, i) => 3 + 4 * i);
const geo = Array.from({ length: 6 }, (_, i) => 2 * 3 ** i);
const fibTerms = [1, 1];
for (let i = 2; i < 10; i++) fibTerms.push(fibTerms[i - 1] + fibTerms[i - 2]);
const ciProp = (() => {
  const p = 56 / 100;
  const m = ciZ * Math.sqrt((p * (1 - p)) / 100);
  return { p, m };
})();

export const mathStatsContent: Record<string, CalcContent> = {
  "standard-deviation-calculator": {
    intro: [
      "Standard deviation measures how spread out a set of numbers is around its mean. This calculator takes a list of values and returns the standard deviation and variance for a sample or a whole population, along with the mean, sum of squares, standard error and a working table of deviations.",
      "A small standard deviation means the values cluster near the mean; a large one means they are widely scattered.",
    ],
    whoFor: [
      "Students in statistics and the sciences.",
      "Analysts summarising variability in survey, test or quality-control data.",
      "Anyone who needs to know whether a sample is consistent or scattered.",
    ],
    inputs: [
      { name: "Data values", text: "Numbers separated by commas, spaces or new lines. At least two values are needed." },
      { name: "Sample or population", text: "Choose sample if the data are a subset of a larger group, population if they are every member of it." },
    ],
    how: [
      "Each value's difference from the mean is squared, the squares are added, and the total is divided by n for a population or n − 1 for a sample. The standard deviation is the square root of that variance. Dividing by n − 1 (Bessel's correction) compensates for the fact that a sample tends to understate the spread of the population it came from.",
    ],
    formulas: [
      { label: "Population", expr: "σ = √(Σ(x − μ)² ÷ N)" },
      { label: "Sample", expr: "s = √(Σ(x − x̄)² ÷ (n − 1))" },
      { label: "Standard error of the mean", expr: "SE = s ÷ √n" },
    ],
    interpret: [
      "For roughly normal data, about 68% of values lie within one standard deviation of the mean and about 95% within two. The coefficient of variation, standard deviation divided by the mean, lets you compare spread between data sets with different units or scales.",
    ],
    example: {
      setup: "The data set 10, 12, 23, 23, 16, 23, 21, 16.",
      steps: [
        `Mean = ${fmt(sd.sum, 8)} ÷ ${sd.n} = ${fmt(sd.mean, 8)}.`,
        `Sum of squared deviations = ${fmt(sd.popVar * sd.n, 8)}.`,
        `Sample variance = ${fmt(sd.popVar * sd.n, 8)} ÷ 7 = ${fmt(sd.sampleVar!, 8)}, so s = ${fmt(sd.sampleSd!, 8)}.`,
        `Population variance = ${fmt(sd.popVar * sd.n, 8)} ÷ 8 = ${fmt(sd.popVar, 8)}, so σ = ${fmt(sd.popSd, 8)}.`,
      ],
      result: `Sample standard deviation ≈ ${fixed(sd.sampleSd!, 4)}; population standard deviation ≈ ${fixed(sd.popSd, 4)}.`,
    },
    useCases: [
      "Reporting variability in lab measurements.",
      "Comparing consistency between two groups or products.",
      "Preparing inputs for confidence intervals and z-scores.",
    ],
    limitations: [
      "Standard deviation is sensitive to outliers.",
      "A single value has no sample standard deviation, so two or more numbers are required.",
      "Interpretation with the 68–95 rule assumes data that are close to normally distributed.",
    ],
    faqs: [
      { question: "Should I use sample or population standard deviation?", answer: "Use sample when your data are a subset of a larger group, which is the most common case. Use population when you have every member of the group." },
      { question: "Why divide by n − 1 for a sample?", answer: "A sample's mean is closer to its own data than the true mean would be, which makes the spread look smaller. Dividing by n − 1 corrects this on average." },
      { question: "What is the difference between variance and standard deviation?", answer: "Variance is the average squared deviation; standard deviation is its square root, which puts it back in the original units." },
      { question: "What does a standard deviation of zero mean?", answer: "All values are identical." },
    ],
  },

  "number-sequence-calculator": {
    intro: [
      "This calculator builds arithmetic, geometric and Fibonacci-style sequences from a first term and a rule, then gives the nth term, the sum of the first n terms and a table of the terms. For geometric sequences it also reports the sum to infinity when it exists.",
      "It is designed for checking homework and exploring how sequences grow.",
    ],
    whoFor: [
      "Algebra and pre-calculus students.",
      "Teachers preparing examples.",
      "Anyone modelling steady additions or percentage growth over steps.",
    ],
    inputs: [
      { name: "Sequence type", text: "Arithmetic (constant difference), geometric (constant ratio) or Fibonacci-style (each term the sum of the previous two)." },
      { name: "First term", text: "The starting value a₁." },
      { name: "Common difference or ratio", text: "d for arithmetic and r for geometric sequences." },
      { name: "Second term", text: "For Fibonacci-style sequences, the second starting value." },
      { name: "Number of terms", text: "Whole number from 1 to 1,000." },
    ],
    how: [
      "In an arithmetic sequence each term adds the common difference, so the nth term is a₁ + (n − 1)d. In a geometric sequence each term multiplies by the ratio, so the nth term is a₁ × r^(n−1). Sums use closed-form formulas rather than adding terms one by one, except in Fibonacci-style sequences, where terms are generated and added.",
    ],
    formulas: [
      { label: "Arithmetic term", expr: "aₙ = a₁ + (n − 1)d" },
      { label: "Arithmetic sum", expr: "Sₙ = n(a₁ + aₙ) ÷ 2" },
      { label: "Geometric term", expr: "aₙ = a₁ × r^(n−1)" },
      { label: "Geometric sum", expr: "Sₙ = a₁(1 − rⁿ) ÷ (1 − r),  S∞ = a₁ ÷ (1 − r) when |r| < 1" },
    ],
    interpret: [
      "The infinite sum of a geometric sequence exists only when the ratio is strictly between −1 and 1; otherwise the sum does not converge. Values beyond about 9 × 10¹⁵ are shown rounded because ordinary decimal numbers cannot hold every digit.",
    ],
    example: {
      setup: "An arithmetic sequence starting at 3 with a difference of 4, ten terms; a geometric one starting at 2 with ratio 3; and the Fibonacci sequence.",
      steps: [
        `Arithmetic terms: ${arithTerms.join(", ")}.`,
        `The 10th term is 3 + 9 × 4 = ${arithTerms[9]}, and the sum is 10 × (3 + ${arithTerms[9]}) ÷ 2 = ${arithTerms.reduce((a, b) => a + b, 0)}.`,
        `Geometric (2, ratio 3) first six terms: ${geo.join(", ")}.`,
        `Fibonacci-style with a₁ = a₂ = 1, first ten terms: ${fibTerms.join(", ")}.`,
      ],
      result: `The 10th term of the arithmetic example is ${arithTerms[9]} and the sum of the first ten terms is ${arithTerms.reduce((a, b) => a + b, 0)}.`,
    },
    useCases: [
      "Checking nth-term and sum formulas.",
      "Modelling regular savings (arithmetic) or percentage growth (geometric).",
      "Exploring Fibonacci-like patterns with different starting values.",
    ],
    limitations: [
      "Up to 1,000 terms and double-precision numbers, so very large terms are approximated.",
      "Does not find the rule from a list of terms; enter the first term and the difference or ratio.",
    ],
    faqs: [
      { question: "What is the difference between arithmetic and geometric sequences?", answer: "Arithmetic sequences add the same amount each step. Geometric sequences multiply by the same factor each step." },
      { question: "When does a geometric series converge?", answer: "When the absolute value of the common ratio is less than 1. The sum then approaches a₁ ÷ (1 − r)." },
      { question: "What is a Fibonacci-style sequence?", answer: "A sequence where each term is the sum of the two before it. The classic Fibonacci sequence starts 1, 1, 2, 3, 5." },
      { question: "Can the common difference be negative?", answer: "Yes. A negative difference gives a decreasing sequence." },
    ],
  },

  "sample-size-calculator": {
    intro: [
      "The sample size calculator tells you how many people you need to survey to measure a proportion with a chosen confidence level and margin of error, optionally adjusting for a finite population. It can also run the other way: given a sample size, it shows the margin of error you can expect.",
      "It helps you decide whether a planned survey is big enough to be meaningful before you collect any data.",
    ],
    whoFor: [
      "Researchers, marketers and students planning surveys.",
      "Teams deciding how many responses are enough.",
      "Anyone reading poll results who wants to understand the margin of error.",
    ],
    inputs: [
      { name: "Confidence level", text: "How sure you want to be that the true value lies within the margin: commonly 95%." },
      { name: "Margin of error", text: "How far, in percentage points, your result may differ from the truth." },
      { name: "Expected proportion", text: "Your best guess of the percentage who will answer a certain way. Use 50% if unsure, because it gives the largest, safest sample size." },
      { name: "Population size", text: "Optional. Leave blank for a very large or unknown population." },
    ],
    how: [
      "The required sample size for a large population is n₀ = z² × p(1 − p) ÷ e², where z is the critical value for the confidence level, p the expected proportion and e the margin of error. For a finite population N, this is adjusted: n = n₀ ÷ (1 + (n₀ − 1) ÷ N), then rounded up to a whole person.",
    ],
    formulas: [
      { label: "Large population", expr: "n₀ = z² × p(1 − p) ÷ e²" },
      { label: "Finite population", expr: "n = n₀ ÷ (1 + (n₀ − 1) ÷ N)" },
      { label: "Margin of error", expr: "e = z × √(p(1 − p) ÷ n)" },
    ],
    interpret: [
      "The result is the number of completed responses you need, not invitations. Divide by your expected response rate to find how many people to contact. Halving the margin of error needs about four times as many responses.",
    ],
    example: {
      setup: "95% confidence, ±5% margin of error, expected proportion 50%.",
      steps: [
        `z for 95% confidence is ${fixed(ss.z, 4)}.`,
        `n₀ = ${fixed(ss.z, 4)}² × 0.5 × 0.5 ÷ 0.05² = ${fixed(ss.n0, 2)}, rounded up to ${ss.required}.`,
        `If the population is only 1,000 people, the adjusted size is ${ssPop.required}.`,
        `Checking the other way: a sample of 385 gives a margin of error of ±${fixed(moe.marginPct, 2)}%.`,
      ],
      result: `${ss.required} responses are needed for a large population, or ${ssPop.required} for a population of 1,000.`,
    },
    useCases: [
      "Planning customer or employee surveys.",
      "Judging how reliable a poll result is.",
      "Justifying a sample size in a proposal.",
    ],
    limitations: [
      "Assumes a simple random sample and independent responses. Clustering, weighting or low response rates need further adjustment.",
      "For proportions only. Estimating a mean requires an estimate of the standard deviation and a different formula.",
      "Confidence level and margin describe sampling error only, not bias from poor questions or non-response.",
    ],
    faqs: [
      { question: "Why use 50% as the expected proportion?", answer: "It maximises p(1 − p), so it produces the largest required sample. It is the safe choice when you do not know the answer in advance." },
      { question: "Does population size matter?", answer: "Only when the population is small relative to the sample. For large populations the required sample barely changes." },
      { question: "What is a margin of error?", answer: "The range around your sample result in which the true value is likely to lie, at your chosen confidence level." },
      { question: "How do I allow for people who do not respond?", answer: "Divide the required sample by your expected response rate. If you expect 25% to respond, invite four times as many people." },
    ],
  },

  "probability-calculator": {
    intro: [
      "This probability calculator handles three common situations: combining two independent events, working out odds and repeated trials for a single event, and finding binomial probabilities for the number of successes in a fixed number of trials.",
      "Probabilities are entered as numbers between 0 and 1 (for example 0.25 for 25%) and shown as both decimals and percentages.",
    ],
    whoFor: [
      "Students learning probability.",
      "People assessing odds in games and simple risk questions.",
      "Analysts modelling yes/no outcomes repeated many times.",
    ],
    inputs: [
      { name: "Mode", text: "Two independent events, a single event with repeated trials, or the binomial distribution." },
      { name: "P(A), P(B)", text: "Probabilities between 0 and 1." },
      { name: "n, p, k", text: "For binomial: number of trials, success probability per trial, and target number of successes." },
    ],
    how: [
      "For independent events, the chance that both happen is P(A) × P(B), and the chance that at least one happens is P(A) + P(B) − P(A and B). For repeated trials, the probability of at least one success is 1 − (1 − p)^n. The binomial probability of exactly k successes is C(n, k) × p^k × (1 − p)^(n − k), and cumulative probabilities sum the terms.",
    ],
    formulas: [
      { label: "Both (independent)", expr: "P(A and B) = P(A) × P(B)" },
      { label: "At least one", expr: "P(A or B) = P(A) + P(B) − P(A)P(B)" },
      { label: "Binomial", expr: "P(X = k) = C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ" },
    ],
    interpret: [
      "Events are treated as independent: one does not change the chance of the other. Probabilities must lie between 0 and 1. In binomial mode, the table shows probabilities near k so you can see the shape of the distribution.",
    ],
    example: {
      setup: "P(A) = 0.4 and P(B) = 0.3 independent; then 10 fair coin flips.",
      steps: [
        `Both: 0.4 × 0.3 = ${fixed(pBoth, 2)}.`,
        `At least one: 0.4 + 0.3 − ${fixed(pBoth, 2)} = ${fixed(pEither, 2)}.`,
        `Exactly 4 heads in 10 flips: C(10, 4) × 0.5¹⁰ = 210 ÷ 1024 = ${fixed(bin4, 6)}.`,
      ],
      result: `P(A and B) = ${fixed(pBoth, 2)}; P(A or B) = ${fixed(pEither, 2)}; P(4 heads in 10) ≈ ${fixed(bin4, 4)}.`,
    },
    useCases: [
      "Checking textbook probability problems.",
      "Estimating the chance of at least one success in repeated attempts.",
      "Modelling pass/fail counts in quality testing.",
    ],
    limitations: [
      "Assumes independence between events and between trials.",
      "Binomial mode is limited to 1,000 trials.",
      "Probabilities are mathematical models; real-world outcomes may not follow them.",
    ],
    faqs: [
      { question: "What are independent events?", answer: "Events where the outcome of one does not affect the probability of the other, such as two separate coin flips." },
      { question: "How do I find the chance of at least one success?", answer: "Subtract the probability of no successes from 1: 1 − (1 − p)^n." },
      { question: "What is a binomial distribution?", answer: "The distribution of the number of successes in a fixed number of independent trials that each have the same success probability." },
      { question: "Can I enter percentages?", answer: "Enter probabilities as decimals from 0 to 1; 25% is 0.25." },
    ],
  },

  "statistics-calculator": {
    intro: [
      "This statistics calculator summarises a list of numbers: count, sum, mean, median, mode, minimum, maximum, range, quartiles, interquartile range, standard deviation, variance, standard error, geometric and harmonic means, and a frequency table.",
      "Paste or type your data once and see the whole picture in one place.",
    ],
    whoFor: [
      "Students working on statistics assignments.",
      "Analysts doing a quick first look at a data set.",
      "Anyone who needs a single table of descriptive statistics.",
    ],
    inputs: [{ name: "Data values", text: "Numbers separated by commas, spaces or new lines, up to 10,000 values." }],
    how: [
      "The data are sorted, then each statistic is calculated from the full list. The median is the middle value (or the average of the two middle values). Quartiles use the median-of-halves method: the lower quartile is the median of the lower half and the upper quartile is the median of the upper half, with the median itself left out of both halves when the count is odd.",
    ],
    formulas: [
      { label: "Mean", expr: "x̄ = Σx ÷ n" },
      { label: "Interquartile range", expr: "IQR = Q3 − Q1" },
      { label: "Geometric mean", expr: "(x₁ × x₂ × … × xₙ)^(1/n), for positive values" },
    ],
    interpret: [
      "Compare the mean and median: when the mean is much larger than the median, a few large values are pulling the average up. The IQR describes the spread of the middle half of the data and is less affected by outliers than the range.",
    ],
    example: {
      setup: "The data 3, 7, 7, 9, 12, 15, 15, 15, 21, 30.",
      steps: [
        `n = ${st.n}, sum = ${st.sum}, mean = ${fmt(st.mean, 6)}.`,
        `Median = (12 + 15) ÷ 2 = ${st.median}; mode = ${st.modes.join(" and ")} (15 appears ${st.modeCount} times).`,
        `Range = 30 − 3 = ${st.range}; Q1 = ${st.q1}, Q3 = ${st.q3}, IQR = ${st.iqr}.`,
        `Sample standard deviation ≈ ${fixed(st.sampleSd!, 4)}.`,
      ],
      result: `Mean ${fmt(st.mean, 6)}, median ${st.median}, mode ${st.modes.join(", ")}.`,
    },
    useCases: [
      "Summarising exam scores or sales figures.",
      "Checking for outliers with the quartiles.",
      "Producing the numbers for a report table.",
    ],
    limitations: [
      "Quartile methods differ between textbooks and software; the method used here is stated and may differ slightly from yours.",
      "Geometric and harmonic means require all values to be greater than zero.",
      "Up to 10,000 values.",
    ],
    faqs: [
      { question: "What is the difference between mean, median and mode?", answer: "The mean is the average, the median is the middle value and the mode is the most frequent value." },
      { question: "Why might my quartiles differ from Excel's?", answer: "There are several accepted methods. This calculator uses the median-of-halves method; Excel's functions use interpolation by default." },
      { question: "What does standard error mean?", answer: "The standard deviation of the sample mean: s ÷ √n. It shrinks as the sample grows." },
      { question: "Can there be more than one mode?", answer: "Yes. If several values tie for the highest count, all are listed. If no value repeats, there is no mode." },
    ],
  },

  "mean-median-mode-range-calculator": {
    intro: [
      "This calculator finds the four basic summaries of a list of numbers: the mean (average), median (middle value), mode (most common value) and range (spread from smallest to largest), and shows how each is worked out.",
      "It is the quick version of the statistics calculator for everyday averages.",
    ],
    whoFor: [
      "School students learning averages.",
      "Anyone checking scores, prices or measurements.",
      "Parents and teachers who want step-by-step working.",
    ],
    inputs: [{ name: "Numbers", text: "Any list separated by commas, spaces or new lines." }],
    how: [
      "The mean is the sum divided by the count. The median is the middle number once the list is sorted, or the average of the two middle numbers for an even count. The mode is the value that appears most often. The range is the largest value minus the smallest.",
    ],
    formulas: [
      { label: "Mean", expr: "mean = sum ÷ count" },
      { label: "Range", expr: "range = maximum − minimum" },
    ],
    interpret: [
      "The mean is affected by extreme values; the median is not. If no number repeats there is no mode, and if two or more tie, the data set has several modes.",
    ],
    example: {
      setup: "The numbers 6, 2, 9, 4, 4, 11, 7.",
      steps: [
        `Sorted: ${mmm.sorted.join(", ")}.`,
        `Mean = ${mmm.sum} ÷ ${mmm.n} = ${fixed(mmm.mean, 4)}.`,
        `Median = the 4th value = ${mmm.median}.`,
        `Mode = ${mmm.modes.join(", ")} (appears twice). Range = 11 − 2 = ${mmm.range}.`,
      ],
      result: `Mean ${fixed(mmm.mean, 4)}, median ${mmm.median}, mode ${mmm.modes.join(", ")}, range ${mmm.range}.`,
    },
    useCases: [
      "Finding a test-score average.",
      "Comparing the typical value with the middle value.",
      "Homework checks.",
    ],
    limitations: [
      "Summarises one list at a time. Weighted averages are not supported.",
      "Mode can be absent or multiple.",
    ],
    faqs: [
      { question: "How do I find the median of an even number of values?", answer: "Sort the list and average the two middle values." },
      { question: "What if there is no mode?", answer: "When every value appears once, the data set has no mode." },
      { question: "Which average should I use?", answer: "The mean is best for balanced data; the median is better when there are extreme values." },
      { question: "What is the range for?", answer: "It shows the total spread but depends only on the two extreme values." },
    ],
  },

  "permutation-combination-calculator": {
    intro: [
      "Permutations count the ways to choose and arrange items when order matters; combinations count the ways to choose when order does not matter. This calculator gives nPr and nCr for any n and r, plus the counts when repetition is allowed and n factorial.",
      "Results are exact, even when they have dozens of digits.",
    ],
    whoFor: [
      "Students in probability and discrete maths.",
      "Anyone counting possible teams, codes or arrangements.",
      "Game and puzzle designers.",
    ],
    inputs: [
      { name: "Total items (n)", text: "How many items there are to choose from, up to 1,000." },
      { name: "Items chosen (r)", text: "How many you pick." },
    ],
    how: [
      "Permutations without repetition: nPr = n! ÷ (n − r)!. Combinations: nCr = n! ÷ (r!(n − r)!). With repetition allowed, permutations become nʳ and combinations become C(n + r − 1, r). All values are calculated with exact big-integer arithmetic.",
    ],
    formulas: [
      { label: "Permutations", expr: "P(n, r) = n! ÷ (n − r)!" },
      { label: "Combinations", expr: "C(n, r) = n! ÷ (r! (n − r)!)" },
    ],
    interpret: [
      "If swapping two chosen items would count as a different result (a podium of first, second and third), use permutations. If not (a committee), use combinations. Combinations are always the permutations divided by r!.",
    ],
    example: {
      setup: "Choose 3 items from 10.",
      steps: [
        `Permutations: 10 × 9 × 8 = ${permutations(10, 3)}.`,
        `Combinations: ${permutations(10, 3)} ÷ 3! = ${combinations(10, 3)}.`,
        `With repetition allowed, ordered: 10³ = ${10n ** 3n}.`,
        `10! = ${factorialBig(10)}.`,
      ],
      result: `P(10, 3) = ${permutations(10, 3)} and C(10, 3) = ${combinations(10, 3)}.`,
    },
    useCases: [
      "Counting committee or team selections.",
      "Counting passwords or PIN codes.",
      "Computing lottery odds.",
    ],
    limitations: [
      "n and r are limited to 1,000.",
      "Without repetition, r cannot exceed n.",
    ],
    faqs: [
      { question: "What is the difference between a permutation and a combination?", answer: "Permutations care about order and combinations do not." },
      { question: "What is 0!?", answer: "By definition 0! = 1." },
      { question: "How do I count a lottery's possible draws?", answer: "Use combinations, because the order of the drawn numbers does not matter." },
      { question: "What does repetition allowed mean?", answer: "The same item can be chosen more than once, as in a PIN code." },
    ],
  },

  "z-score-calculator": {
    intro: [
      "A z-score tells you how many standard deviations a value is above or below the mean. This calculator converts a raw value to a z-score, finds the probability to the left, right and between z-scores on the normal distribution, converts a probability to a z-score, and turns a z-score back into a value.",
      "It replaces a z table with exact values to ten significant digits.",
    ],
    whoFor: [
      "Statistics students.",
      "Analysts comparing values from different scales.",
      "Anyone finding a percentile for a normally distributed score.",
    ],
    inputs: [
      { name: "Mode", text: "Raw value to z, z to probabilities, probability to z, or z to raw value." },
      { name: "Value, mean, standard deviation", text: "The standard deviation must be greater than zero." },
      { name: "z-score or probability", text: "For the reverse modes." },
    ],
    how: [
      "The z-score is (x − μ) ÷ σ. Probabilities come from the standard normal cumulative distribution function. The inverse mode finds the z-score for a given left-tail probability using an inverse normal approximation refined to high precision.",
    ],
    formulas: [
      { label: "z-score", expr: "z = (x − μ) ÷ σ" },
      { label: "Back to a value", expr: "x = μ + z × σ" },
    ],
    interpret: [
      "A z-score of 0 is exactly at the mean, and ±1, ±2 and ±3 correspond to about 68%, 95% and 99.7% of values within that many standard deviations (for normal data). The left-tail probability is the percentile of the value.",
    ],
    example: {
      setup: "A score of 85 where the mean is 70 and the standard deviation is 10.",
      steps: [
        "z = (85 − 70) ÷ 10 = 1.5.",
        `The left-tail probability Φ(1.5) = ${fixed(z15, 6)}, so about ${fixed(z15 * 100, 1)}% of values in a normal distribution lie below this score.`,
        `The right tail is ${fixed(1 - z15, 6)}.`,
      ],
      result: `z = 1.5, so about ${fixed(z15 * 100, 1)}% of values lie below it (roughly the 93rd percentile).`,
    },
    useCases: [
      "Finding a percentile for a test score.",
      "Comparing values from different distributions.",
      "Flagging unusually large or small values.",
    ],
    limitations: [
      "Probabilities assume the data follow a normal distribution.",
      "In probability mode, z-scores beyond ±40 are rejected as outside the useful range.",
    ],
    faqs: [
      { question: "What is a z-score?", answer: "The number of standard deviations a value is from the mean." },
      { question: "How do I get a percentile from a z-score?", answer: "The left-tail probability of the z-score is the percentile, as a proportion of 1." },
      { question: "What z-score is unusual?", answer: "Values beyond about ±2 are less common, and beyond ±3 are rare for normal data." },
      { question: "Can I use it for non-normal data?", answer: "You can compute the z-score, but the probabilities would be unreliable if the data are not roughly normal." },
    ],
  },

  "confidence-interval-calculator": {
    intro: [
      "A confidence interval gives a range of plausible values for a population mean or proportion based on your sample. This calculator builds the interval for a mean using either the z or Student's t distribution, and for a proportion using the normal approximation, and shows the critical value, standard error and margin of error.",
      "Choose a confidence level from 80% to 99.9%.",
    ],
    whoFor: [
      "Students and researchers reporting results.",
      "Analysts summarising survey or experiment results.",
      "Anyone wanting to express uncertainty about an estimate.",
    ],
    inputs: [
      { name: "Estimate", text: "A mean or a proportion." },
      { name: "Confidence level", text: "80%, 85%, 90%, 95%, 98%, 99% or 99.9%." },
      { name: "Sample size (n) and mean or successes", text: "From your sample." },
      { name: "Standard deviation", text: "For a mean. Choose whether it comes from the sample (t) or is known for the population (z)." },
    ],
    how: [
      "The interval is estimate ± margin of error. For a mean, the margin is the critical value times the standard error s ÷ √n, using t with n − 1 degrees of freedom when the standard deviation comes from the sample. For a proportion it is z × √(p̂(1 − p̂) ÷ n).",
    ],
    formulas: [
      { label: "Mean", expr: "x̄ ± t* × s ÷ √n" },
      { label: "Proportion", expr: "p̂ ± z* × √(p̂(1 − p̂) ÷ n)" },
    ],
    interpret: [
      "A 95% interval means that if you repeated the sampling many times, about 95% of the intervals built this way would contain the true value. It does not mean there is a 95% chance the true value is in this one interval. Larger samples and lower confidence levels give narrower intervals.",
    ],
    example: {
      setup: "A sample of 40 with mean 52 and standard deviation 8, at 95% confidence (sample standard deviation).",
      steps: [
        `Standard error = 8 ÷ √40 = ${fixed(8 / Math.sqrt(40), 4)}.`,
        `t critical value for 39 degrees of freedom = ${fixed(ciT, 4)} (z would be ${fixed(ciZ, 4)}).`,
        `Margin of error = ${fixed(ciT, 4)} × ${fixed(8 / Math.sqrt(40), 4)} = ${fixed(ciMoe, 4)}.`,
        `Interval = 52 ± ${fixed(ciMoe, 4)}, from ${fixed(52 - ciMoe, 3)} to ${fixed(52 + ciMoe, 3)}.`,
        `For a proportion of 56 successes in 100, p̂ = 0.56 and the margin is ${fixed(ciProp.m * 100, 2)} points.`,
      ],
      result: `95% confidence interval for the mean: ${fixed(52 - ciMoe, 2)} to ${fixed(52 + ciMoe, 2)}.`,
    },
    useCases: [
      "Reporting the precision of an average.",
      "Summarising poll results.",
      "Comparing the uncertainty of two estimates.",
    ],
    limitations: [
      "Assumes a random sample and roughly normal data (or a large sample) for means.",
      "The proportion interval uses the normal approximation, which is unreliable with fewer than about 10 successes or failures.",
      "Does not compute intervals for differences between groups or for small non-normal samples.",
    ],
    faqs: [
      { question: "When should I use t instead of z?", answer: "Use t when the standard deviation is estimated from your sample, which is the usual case. Use z when the population standard deviation is known." },
      { question: "What does 95% confidence mean?", answer: "If you repeated the study many times, about 95% of the intervals would contain the true value." },
      { question: "How do I make the interval narrower?", answer: "Increase the sample size or lower the confidence level." },
      { question: "Why are proportion intervals limited near 0% and 100%?", answer: "The calculator caps the interval at 0% and 100%, and the normal approximation becomes unreliable with few successes or failures." },
    ],
  },
};
