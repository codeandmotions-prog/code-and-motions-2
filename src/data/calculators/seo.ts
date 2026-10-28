/**
 * Page-level SEO data for the calculator pages: search-focused titles and
 * descriptions, long-tail phrases, curated related links, and where they
 * genuinely matter, regional notes and verified external references.
 *
 * Nothing here changes how a calculator works. The article text itself lives
 * in ./content; this file only adds what the audit found missing.
 *
 * Titles are written to fit with the " | Code & Motions" suffix in about 60
 * characters. Descriptions aim for roughly 135 to 160 characters.
 */

export type CalcReference = { label: string; url: string };

export type CalcSeo = {
  /** Unique <title> (without the site suffix). */
  title: string;
  /** Unique meta description. */
  description: string;
  /** Natural long-tail phrases this page can answer (used for the keyword map, not as meta keywords). */
  longTail: string[];
  /** Hand-picked related calculators, most relevant first. */
  related: string[];
  /** What the audit found missing on this page that goes beyond metadata. */
  gaps: string;
  /** Optional regional notes, shown in a short section on the page. */
  regional?: string[];
  /** Optional authoritative external references. */
  references?: CalcReference[];
  /** Optional link to one of our own non-calculator tools that is genuinely relevant. */
  tool?: { label: string; href: string; text: string };
};

const META_ONLY = "Article depth is adequate. Gaps were metadata, schema and internal links, now addressed.";

const AMOUNT_FORMAT =
  "Type amounts without separators (2500000) or with international grouping (2,500,000). Lakh-style grouping such as 25,00,000 is not accepted by the inputs.";

export const calcSeo: Record<string, CalcSeo> = {
  /* ---------------- Financial ---------------- */
  "mortgage-calculator": {
    title: "Mortgage Calculator – Monthly Payment",
    description:
      "Free mortgage calculator for your monthly payment, total interest and time to pay off. Add tax, insurance and extra payments. Formula and example.",
    longTail: [
      "how much is my monthly mortgage payment",
      "mortgage calculator with extra payments",
      "mortgage repayment with property tax and insurance",
    ],
    related: ["loan-calculator", "compound-interest-calculator", "roi-calculator", "percentage-calculator"],
    gaps: "No regional notes (US PITI and PMI, UK rate changes and stamp duty, India EMI, Pakistan Islamic home finance) and no external source.",
    regional: [
      "United States: lenders usually quote a payment that bundles principal, interest, property tax and insurance (often called PITI). Private mortgage insurance usually applies on conventional loans when the deposit is under 20% of the price. Enter it under other monthly costs.",
      "United Kingdom: many mortgages are fixed for a few years and then move to a different rate. This calculator models one fixed rate for the whole term. To see the effect of a new deal, run it again with the new rate and the remaining term. Stamp Duty Land Tax (England and Northern Ireland), Land and Buildings Transaction Tax (Scotland) and Land Transaction Tax (Wales) are separate costs and are not included.",
      "India: banks describe the level monthly payment as an EMI (equated monthly instalment). It is the same figure this calculator labels principal and interest. Processing fees and insurance are usually separate.",
      "Pakistan: many banks offer Islamic home finance, such as diminishing musharakah, where payments are set using a profit rate and a rental structure rather than interest. This calculator uses a conventional reducing-balance schedule, so treat the result as an approximation and rely on your bank's own schedule.",
      AMOUNT_FORMAT,
    ],
    references: [
      {
        label: "CFPB: the difference between principal and interest and your total monthly mortgage payment",
        url: "https://www.consumerfinance.gov/ask-cfpb/on-a-mortgage-whats-the-difference-between-my-principal-and-interest-payment-and-my-total-monthly-payment-en-1941/",
      },
      { label: "CFPB: how paying down a mortgage works", url: "https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/" },
    ],
  },
  "loan-calculator": {
    title: "Loan Calculator – Repayments & Interest",
    description:
      "Calculate monthly loan repayments, total interest and a yearly breakdown for a personal, car or student loan. Includes the formula and a worked example.",
    longTail: ["loan repayment calculator monthly payment", "how much interest will I pay on a loan", "car loan calculator with total interest"],
    related: ["mortgage-calculator", "compound-interest-calculator", "roi-calculator", "percentage-calculator"],
    gaps: "No regional notes (EMI wording, flat versus reducing-balance rates, APR versus interest rate).",
    regional: [
      "India and Pakistan: the level monthly repayment on a bank loan is often called an EMI (equated monthly instalment). It is the same payment this calculator works out from the amount, rate and term.",
      "Flat rate versus reducing balance: some lenders, particularly on car and consumer loans in several countries, quote a flat rate, where interest is charged on the original amount for the whole term. A flat rate looks lower than a reducing-balance rate that costs the same. This calculator uses the reducing-balance rate. If you only have a flat rate, compare offers by their total repayment instead.",
      "United States and United Kingdom: an APR also includes certain fees, so it is usually higher than the plain interest rate. Enter the interest rate here and compare APRs separately.",
      AMOUNT_FORMAT,
    ],
  },
  "compound-interest-calculator": {
    title: "Compound Interest Calculator with Deposits",
    description:
      "See how savings or investments grow with compounding and regular contributions. Choose the frequency, view the year-by-year table and the formula behind it.",
    longTail: ["compound interest calculator with monthly contributions", "how long will my savings take to double", "interest on interest explained"],
    related: ["roi-calculator", "loan-calculator", "mortgage-calculator", "exponent-calculator"],
    gaps: "No external source for the compounding formula.",
    references: [{ label: "Investor.gov: compound interest", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest" }],
  },
  "roi-calculator": {
    title: "ROI Calculator – Return & Annualised Gain",
    description:
      "Work out return on investment as a percentage and an annualised rate from what you put in and got back. Includes the formula and a worked example.",
    longTail: ["how to calculate return on investment", "annualised return calculator", "ROI percentage formula with example"],
    related: ["compound-interest-calculator", "percentage-calculator", "loan-calculator", "mortgage-calculator"],
    gaps: "No link to a relevant Code & Motions planning tool.",
    tool: {
      label: "SaaS MVP Cost & Timeline Estimator",
      href: "/tools/saas-mvp-cost-estimator",
      text: "Weighing up a software build? Estimate the cost and timeline first, then use this calculator to compare it with the return you expect.",
    },
  },
  "vat-calculator": {
    title: "VAT Calculator – Add or Remove VAT",
    description:
      "Add VAT to a net price, remove it from a gross price or find the VAT rate between two amounts. Works with any VAT, GST or sales tax rate you enter.",
    longTail: ["how to calculate VAT from a gross price", "add 20% VAT to a price", "GST inclusive price calculator"],
    related: ["percentage-calculator", "tip-calculator", "rounding-calculator", "loan-calculator"],
    gaps: "No regional notes (VAT versus GST and sales tax, tax-inclusive pricing) and no official rate sources.",
    regional: [
      "VAT, GST and sales tax: the arithmetic is the same. The calculator works for VAT (UK and EU), GST (for example India, Australia, Canada, New Zealand and Singapore) and Pakistan's federal sales tax, often written GST. Enter the rate that applies to your goods or service.",
      "United Kingdom: the standard VAT rate has been 20% since January 2011, with reduced and zero rates for some goods and services. EU member states set their own rates. India's GST has several rate slabs that depend on the goods or service. Rates change, so check the current official rate before you invoice.",
      "Tax-inclusive prices: shop prices in the UK, the EU and India (the printed maximum retail price) normally include tax. Use the remove VAT mode to find the net amount. In the US, sales tax is added at the till and varies by state and locality, so enter the combined local rate as a custom rate.",
    ],
    references: [
      { label: "GOV.UK: VAT rates", url: "https://www.gov.uk/vat-rates" },
      { label: "CBIC (India): GST rates FAQs", url: "https://cbic-gst.gov.in/gst-rates-faq.html" },
      { label: "Federal Board of Revenue (Pakistan): sales tax", url: "https://www.fbr.gov.pk/sales-tax/142263/131269" },
    ],
  },

  /* ---------------- Fitness & health ---------------- */
  "bmi-calculator": {
    title: "BMI Calculator – Metric, US & UK Units",
    description:
      "Calculate your body mass index from height and weight in metric, US or UK units (including stone). See the adult category, healthy weight range and the formula.",
    longTail: ["BMI calculator in stone and pounds", "what is a healthy weight for my height", "BMI categories for adults"],
    related: ["bmr-calculator", "calorie-calculator", "body-fat-calculator", "target-heart-rate-calculator"],
    gaps: "Asian-population BMI action points not discussed; no authoritative sources.",
    regional: [
      "This calculator reports the standard WHO adult categories. A WHO expert consultation on Asian populations (2004) concluded that health risks can rise at lower BMI values in many Asian populations and proposed extra public-health action points at 23.0 and 27.5. These are not applied automatically. If you are of South Asian or another Asian background, read your result with that in mind and talk to your doctor.",
      "Units: metric (cm and kg), US (feet, inches and pounds) and UK (feet, inches, stone and pounds) are all supported, so you can enter your measurements the way you know them.",
    ],
    references: [
      { label: "CDC: adult BMI categories", url: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" },
      { label: "NHS: overweight and obesity in adults", url: "https://www.nhs.uk/conditions/overweight-and-obesity/" },
      { label: "WHO Expert Consultation (2004), Lancet: appropriate body-mass index for Asian populations", url: "https://pubmed.ncbi.nlm.nih.gov/14726171/" },
    ],
  },
  "bmr-calculator": {
    title: "BMR Calculator – Resting Calories",
    description:
      "Estimate the calories your body burns at rest using Mifflin-St Jeor, Harris-Benedict and Katch-McArdle, and compare them. Includes formulas and an example.",
    longTail: ["how many calories do I burn at rest", "Mifflin-St Jeor calculator", "BMR in kilojoules"],
    related: ["calorie-calculator", "bmi-calculator", "body-fat-calculator", "target-heart-rate-calculator"],
    gaps: "No citation for the main equation.",
    references: [{ label: "Mifflin et al. (1990): a new predictive equation for resting energy expenditure in healthy individuals", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/" }],
  },
  "calorie-calculator": {
    title: "Calorie Calculator – Daily Calorie Needs",
    description:
      "Estimate how many calories you need a day to maintain, lose or gain weight from your age, size and activity level. Shows kcal or kJ with the method explained.",
    longTail: ["how many calories should I eat a day", "maintenance calories calculator", "calories to lose weight safely"],
    related: ["bmr-calculator", "bmi-calculator", "body-fat-calculator", "target-heart-rate-calculator"],
    gaps: META_ONLY,
  },
  "body-fat-calculator": {
    title: "Body Fat Calculator – Navy & BMI Methods",
    description:
      "Estimate body fat percentage with the US Navy tape-measure method and a BMI-based method, side by side, with lean mass and fat mass and the formulas used.",
    longTail: ["US Navy body fat calculator", "how to measure body fat with a tape measure", "lean body mass calculator"],
    related: ["bmi-calculator", "bmr-calculator", "calorie-calculator", "target-heart-rate-calculator"],
    gaps: "No citation for the Navy method.",
    references: [
      { label: "Hodgdon and Beckett (1984): percent body fat for U.S. Navy men from body circumferences and height", url: "https://apps.dtic.mil/sti/pdfs/ADA143890.pdf" },
      { label: "Hodgdon and Beckett (1984): percent body fat for U.S. Navy women from body circumferences and height", url: "https://apps.dtic.mil/sti/html/tr/ADA146456/index.html" },
    ],
  },
  "target-heart-rate-calculator": {
    title: "Target Heart Rate Calculator – Zones",
    description:
      "Find your maximum heart rate and training zones by age, or use the Karvonen method with your resting rate. Includes the formulas and a worked example.",
    longTail: ["target heart rate by age", "heart rate zones for running", "Karvonen formula calculator"],
    related: ["calorie-calculator", "bmr-calculator", "bmi-calculator", "age-calculator"],
    gaps: "No authoritative source for zone ranges.",
    references: [{ label: "American Heart Association: target heart rates chart", url: "https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates" }],
  },

  /* ---------------- Other ---------------- */
  "age-calculator": {
    title: "Age Calculator – Years, Months & Days",
    description:
      "Find your exact age in years, months and days from a date of birth, plus total days lived and days until your next birthday. Check age at any past date.",
    longTail: ["how old am I in days", "age on a specific date calculator", "days until my next birthday"],
    related: ["date-calculator", "bmi-calculator", "target-heart-rate-calculator", "unit-conversion-calculator"],
    gaps: "No note on regional date display.",
    regional: [
      "Date pickers show dates in the format your browser or device uses, usually DD/MM/YYYY in the UK, Europe, India and Pakistan and MM/DD/YYYY in the US. The calculation itself does not depend on how the date is displayed.",
    ],
  },
  "date-calculator": {
    title: "Date Calculator – Days Between Dates",
    description:
      "Count the days, weeks and months between two dates, or add and subtract time from a date. Count business days too, skipping weekends and holidays you list.",
    longTail: ["how many days between two dates", "add 90 days to a date", "business days between two dates"],
    related: ["age-calculator", "unit-conversion-calculator", "percentage-calculator", "number-sequence-calculator"],
    gaps: "No note on weekends or date display for different countries.",
    regional: [
      "Business days are counted as Monday to Friday, skipping Saturdays, Sundays and any holiday dates you list in YYYY-MM-DD format. If your country has a different working week or its own public holidays, list the extra dates yourself.",
      "Date pickers show dates in the format your browser or device uses, usually DD/MM/YYYY in the UK, Europe, India and Pakistan and MM/DD/YYYY in the US. The calculation does not depend on the display format.",
    ],
  },
  "tip-calculator": {
    title: "Tip Calculator – Split the Bill",
    description:
      "Work out the tip and split the bill fairly between any number of people, with optional rounding up. Includes the formula and notes on tipping customs.",
    longTail: ["how much should I tip on a bill", "split the bill with tip calculator", "tip calculator with service charge"],
    related: ["percentage-calculator", "vat-calculator", "fuel-cost-calculator", "rounding-calculator"],
    gaps: "No regional context for tipping customs.",
    regional: [
      "Tipping customs differ widely, so this calculator does not assume a percentage. In the US a tip of roughly 15% to 20% is common in restaurants. In the UK a discretionary service charge, often 12.5%, is frequently added to the bill and is voluntary. In much of continental Europe service is usually included and people round up. In India and Pakistan some restaurants add a service charge, and tipping elsewhere is at your discretion. Use the percentage that fits your situation.",
    ],
  },
  "fuel-cost-calculator": {
    title: "Fuel Cost Calculator – Trip Cost",
    description:
      "Estimate fuel used and the cost of a trip from distance, fuel efficiency and price, in km or miles. Handles L/100 km, km/L and US or UK MPG, and splits costs.",
    longTail: ["how much will a road trip cost in fuel", "L/100km to MPG for a trip", "split fuel cost between passengers"],
    related: ["unit-conversion-calculator", "distance-calculator", "tip-calculator", "percentage-calculator"],
    gaps: "Efficiency conventions differ by region and the page did not say so for India and Pakistan.",
    regional: [
      "Efficiency is quoted differently around the world: litres per 100 km in much of Europe, miles per imperial gallon in the UK (although fuel is sold in litres), miles per US gallon in the US, and commonly kilometres per litre in India and Pakistan. Enter whichever you know and the calculator converts exactly. A US gallon (3.785 L) and a UK gallon (4.546 L) are different sizes.",
    ],
    references: [{ label: "NIST Guide to the SI, Appendix B: conversion factors", url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors" }],
  },
  "unit-conversion-calculator": {
    title: "Unit Converter – Metric & Imperial",
    description:
      "Convert length, weight, volume, temperature, area, speed and time between metric, US and UK units. Uses exact definitions and shows the conversion factor.",
    longTail: ["convert metric to imperial units", "stone to kilograms converter", "US gallon to UK gallon"],
    related: ["volume-calculator", "fuel-cost-calculator", "area-calculator", "scientific-notation-calculator"],
    gaps: "No authoritative source for conversion factors.",
    references: [{ label: "NIST Guide to the SI, Appendix B: conversion factors", url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors" }],
  },

  /* ---------------- Math: general ---------------- */
  "scientific-calculator": {
    title: "Scientific Calculator – Free & Online",
    description:
      "A free online scientific calculator with brackets, trigonometry, logarithms, powers, roots and factorials, plus a results history. Works on phones and desktops.",
    longTail: ["online scientific calculator with brackets", "scientific calculator in degrees and radians", "calculator with log and ln"],
    related: ["fraction-calculator", "exponent-calculator", "log-calculator", "root-calculator"],
    gaps: META_ONLY,
  },
  "fraction-calculator": {
    title: "Fraction Calculator – Add, Subtract & More",
    description:
      "Add, subtract, multiply and divide fractions and mixed numbers. Get simplified answers, decimal forms and the working for each step.",
    longTail: ["add fractions with different denominators", "simplify a fraction calculator", "mixed number calculator"],
    related: ["ratio-calculator", "percentage-calculator", "lcm-calculator", "gcf-calculator"],
    gaps: META_ONLY,
  },
  "percentage-calculator": {
    title: "Percentage Calculator – Percent of a Number",
    description:
      "Find a percentage of a number, what percent one number is of another, and percentage increase, decrease or difference. Clear formulas and worked examples.",
    longTail: ["what is 15 percent of 80", "percentage increase calculator", "how to calculate percentage change"],
    related: ["percent-error-calculator", "ratio-calculator", "fraction-calculator", "vat-calculator"],
    gaps: "Overlap with the percent error calculator needed a clear boundary.",
  },
  "random-number-generator": {
    title: "Random Number Generator – Integers & Lists",
    description:
      "Generate random whole numbers or decimals in any range, with or without repeats, sorted if you like. Useful for draws, sampling and games.",
    longTail: ["random number between 1 and 100", "generate random numbers without repeats", "pick random numbers from a range"],
    related: ["probability-calculator", "permutation-combination-calculator", "number-sequence-calculator", "statistics-calculator"],
    gaps: META_ONLY,
  },
  "percent-error-calculator": {
    title: "Percent Error Calculator – Formula & Steps",
    description:
      "Compare an observed value with the true value to get percent error and absolute error, with the formula and a worked example for science and lab work.",
    longTail: ["percent error formula with example", "how to calculate experimental error", "absolute error vs relative error"],
    related: ["percentage-calculator", "rounding-calculator", "scientific-notation-calculator", "ratio-calculator"],
    gaps: "Overlap with the percentage calculator needed a clear boundary (this page is for measurement error).",
  },
  "exponent-calculator": {
    title: "Exponent Calculator – Powers of Any Number",
    description:
      "Raise any number to a power, including negative, fractional and decimal exponents, and see the answer in several forms with the rule used.",
    longTail: ["x to the power of y calculator", "negative exponent calculator", "fractional exponent examples"],
    related: ["root-calculator", "log-calculator", "scientific-notation-calculator", "scientific-calculator"],
    gaps: META_ONLY,
  },
  "binary-calculator": {
    title: "Binary Calculator – Add, Subtract & Convert",
    description:
      "Add, subtract, multiply and divide binary numbers and see the decimal and hexadecimal equivalents, with the binary arithmetic rules explained.",
    longTail: ["binary addition calculator", "binary to decimal converter", "binary division with remainder"],
    related: ["hex-calculator", "scientific-notation-calculator", "big-number-calculator", "factor-calculator"],
    gaps: META_ONLY,
  },
  "hex-calculator": {
    title: "Hex Calculator – Hexadecimal Arithmetic",
    description:
      "Add, subtract, multiply and divide hexadecimal numbers, with decimal and binary equivalents and a short guide to how base 16 works.",
    longTail: ["hexadecimal addition calculator", "hex to decimal converter", "hex subtraction with borrowing"],
    related: ["binary-calculator", "big-number-calculator", "scientific-notation-calculator", "factor-calculator"],
    gaps: META_ONLY,
  },
  "half-life-calculator": {
    title: "Half-Life Calculator – Decay & Remaining",
    description:
      "Solve exponential decay problems: remaining quantity, elapsed time, half-life or starting amount. See the decay formula and a worked example.",
    longTail: ["radioactive decay calculator", "how much is left after n half-lives", "half-life formula with example"],
    related: ["exponent-calculator", "log-calculator", "compound-interest-calculator", "percentage-calculator"],
    gaps: META_ONLY,
  },
  "quadratic-formula-calculator": {
    title: "Quadratic Formula Calculator – Roots",
    description:
      "Solve ax² + bx + c = 0 with the quadratic formula, including complex roots, the discriminant and the vertex, with the working shown step by step.",
    longTail: ["solve a quadratic equation step by step", "discriminant calculator", "vertex of a parabola calculator"],
    related: ["root-calculator", "factor-calculator", "exponent-calculator", "slope-calculator"],
    gaps: META_ONLY,
  },
  "log-calculator": {
    title: "Log Calculator – Any Base & Natural Log",
    description:
      "Calculate logarithms to any base, natural logs and antilogs, and see the change-of-base working. Includes the log rules and worked examples.",
    longTail: ["log base 2 calculator", "natural log calculator ln", "change of base formula example"],
    related: ["exponent-calculator", "root-calculator", "scientific-notation-calculator", "half-life-calculator"],
    gaps: META_ONLY,
  },
  "ratio-calculator": {
    title: "Ratio Calculator – Simplify & Solve",
    description:
      "Simplify ratios, solve for a missing value in a proportion and scale a ratio up or down, with each step shown and equivalent ratios listed.",
    longTail: ["simplify a ratio calculator", "solve a proportion with a missing value", "scale a recipe ratio"],
    related: ["fraction-calculator", "percentage-calculator", "gcf-calculator", "lcm-calculator"],
    gaps: META_ONLY,
  },
  "root-calculator": {
    title: "Root Calculator – Square, Cube & nth Root",
    description:
      "Find square roots, cube roots and nth roots, with simplified radical form for whole numbers and the method explained step by step.",
    longTail: ["simplify a square root calculator", "cube root calculator", "nth root of a number"],
    related: ["exponent-calculator", "pythagorean-theorem-calculator", "quadratic-formula-calculator", "log-calculator"],
    gaps: META_ONLY,
  },
  "lcm-calculator": {
    title: "LCM Calculator – Least Common Multiple",
    description:
      "Find the least common multiple of two or more whole numbers, with prime factors and the working. Useful for fractions and common denominators.",
    longTail: ["lowest common multiple of 12 and 18", "LCM using prime factorization", "common denominator for fractions"],
    related: ["gcf-calculator", "factor-calculator", "fraction-calculator", "ratio-calculator"],
    gaps: "Overlap with the GCF calculator needed a clear boundary (multiples versus factors).",
  },
  "gcf-calculator": {
    title: "GCF Calculator – Greatest Common Factor",
    description:
      "Find the greatest common factor (highest common factor) of two or more numbers, with Euclid's algorithm steps and a worked example.",
    longTail: ["greatest common divisor of two numbers", "HCF calculator with steps", "Euclidean algorithm example"],
    related: ["lcm-calculator", "factor-calculator", "fraction-calculator", "ratio-calculator"],
    gaps: "Overlap with the LCM calculator needed a clear boundary (factors versus multiples).",
  },
  "factor-calculator": {
    title: "Factor Calculator – Prime Factorization",
    description:
      "List every factor and factor pair of a number, check whether it is prime and see its prime factorisation, with the steps explained.",
    longTail: ["factors of a number list", "prime factorization calculator", "is this number prime"],
    related: ["gcf-calculator", "lcm-calculator", "big-number-calculator", "permutation-combination-calculator"],
    gaps: META_ONLY,
  },
  "rounding-calculator": {
    title: "Rounding Calculator – Decimals & Places",
    description:
      "Round to any decimal place or fraction using half-up, half-even, floor, ceiling and other rules, and see how each rule changes the result.",
    longTail: ["round to 2 decimal places", "banker's rounding explained", "round half up vs round half even"],
    related: ["scientific-notation-calculator", "percentage-calculator", "fraction-calculator", "big-number-calculator"],
    gaps: META_ONLY,
  },
  "matrix-calculator": {
    title: "Matrix Calculator – Multiply, Invert & More",
    description:
      "Add, multiply, invert and transpose matrices, and find determinant, rank and powers, with exact fractions and the method for each operation.",
    longTail: ["matrix multiplication calculator", "inverse of a matrix step by step", "determinant of a 3x3 matrix"],
    related: ["scientific-calculator", "quadratic-formula-calculator", "fraction-calculator", "big-number-calculator"],
    gaps: META_ONLY,
  },
  "scientific-notation-calculator": {
    title: "Scientific Notation Calculator – Converter",
    description:
      "Convert numbers to scientific, E and engineering notation, and add, subtract, multiply or divide in scientific notation with the steps shown.",
    longTail: ["convert to scientific notation", "standard form calculator", "multiply numbers in scientific notation"],
    related: ["big-number-calculator", "exponent-calculator", "rounding-calculator", "scientific-calculator"],
    gaps: "Terminology differs by region (standard form in the UK); the page should say so.",
  },
  "big-number-calculator": {
    title: "Big Number Calculator – Exact Arithmetic",
    description:
      "Add, subtract, multiply, divide and raise huge numbers to powers with exact, unlimited-length results. No rounding or overflow.",
    longTail: ["calculate very large numbers exactly", "big integer calculator", "huge number multiplication"],
    related: ["scientific-notation-calculator", "factor-calculator", "exponent-calculator", "binary-calculator"],
    gaps: META_ONLY,
  },

  /* ---------------- Math: statistics & probability ---------------- */
  "standard-deviation-calculator": {
    title: "Standard Deviation Calculator – Steps",
    description:
      "Calculate sample or population standard deviation and variance from a list of numbers, with the working table and formulas for each step.",
    longTail: ["sample vs population standard deviation", "variance calculator with steps", "standard deviation of a data set"],
    related: ["statistics-calculator", "mean-median-mode-range-calculator", "z-score-calculator", "confidence-interval-calculator"],
    gaps: META_ONLY,
  },
  "number-sequence-calculator": {
    title: "Number Sequence Calculator – nth Term & Sum",
    description:
      "Generate arithmetic, geometric and Fibonacci-style sequences and get the nth term and the sum of the first n terms, with the formulas used.",
    longTail: ["arithmetic sequence nth term calculator", "geometric sequence sum", "Fibonacci sequence calculator"],
    related: ["exponent-calculator", "ratio-calculator", "compound-interest-calculator", "statistics-calculator"],
    gaps: META_ONLY,
  },
  "sample-size-calculator": {
    title: "Sample Size Calculator for Surveys",
    description:
      "Find how many survey responses you need for a chosen confidence level and margin of error, or the margin of error for a given sample size.",
    longTail: ["how many survey responses do I need", "sample size for a margin of error of 5%", "survey sample size for a small population"],
    related: ["confidence-interval-calculator", "z-score-calculator", "standard-deviation-calculator", "probability-calculator"],
    gaps: "Overlap with the confidence interval calculator on margin of error needed a clear boundary (planning versus analysis).",
  },
  "probability-calculator": {
    title: "Probability Calculator – Events & Odds",
    description:
      "Combine independent events, work out odds and repeated trials, and solve binomial probability problems, with formulas and worked examples.",
    longTail: ["probability of two independent events", "binomial probability calculator", "chance of at least one success"],
    related: ["permutation-combination-calculator", "z-score-calculator", "random-number-generator", "statistics-calculator"],
    gaps: META_ONLY,
  },
  "statistics-calculator": {
    title: "Statistics Calculator – Data Summary",
    description:
      "Get the full set of descriptive statistics for a list of data: mean, median, mode, spread, quartiles and a frequency table, with definitions.",
    longTail: ["descriptive statistics calculator", "quartiles and interquartile range calculator", "summary statistics for a data set"],
    related: ["mean-median-mode-range-calculator", "standard-deviation-calculator", "z-score-calculator", "confidence-interval-calculator"],
    gaps: "Overlap with the mean, median, mode and range calculator needed a clear boundary (full summary versus the four basic measures).",
  },
  "mean-median-mode-range-calculator": {
    title: "Mean, Median, Mode & Range Calculator",
    description:
      "Find the mean, median, mode and range of any list of numbers, with each step explained. A quick way to average a set of values and check your homework.",
    longTail: ["how to find the median of a list", "average of a set of numbers", "mode and range calculator"],
    related: ["statistics-calculator", "standard-deviation-calculator", "percentage-calculator", "rounding-calculator"],
    gaps: "Overlap with the statistics calculator needed a clear boundary (the four basic measures versus a full summary).",
  },
  "permutation-combination-calculator": {
    title: "Permutation & Combination Calculator",
    description:
      "Count ordered and unordered selections, with and without repetition, using exact big-integer results. See nPr, nCr and the formulas behind them.",
    longTail: ["nCr calculator", "nPr vs nCr difference", "how many ways to arrange or choose"],
    related: ["probability-calculator", "factor-calculator", "big-number-calculator", "random-number-generator"],
    gaps: META_ONLY,
  },
  "z-score-calculator": {
    title: "Z-Score Calculator – Normal Probability",
    description:
      "Convert a value to a z-score, find left, right and two-tailed normal probabilities, or work backwards from a probability. Includes the formula and an example.",
    longTail: ["z-score to percentile", "how to calculate a z-score", "probability from a z-score"],
    related: ["standard-deviation-calculator", "confidence-interval-calculator", "probability-calculator", "statistics-calculator"],
    gaps: META_ONLY,
  },
  "confidence-interval-calculator": {
    title: "Confidence Interval Calculator – Steps",
    description:
      "Build a confidence interval for a mean (z or t) or a proportion from your sample results, with margin of error, critical values and the working.",
    longTail: ["confidence interval for a mean", "confidence interval for a proportion", "margin of error from sample data"],
    related: ["sample-size-calculator", "z-score-calculator", "standard-deviation-calculator", "statistics-calculator"],
    gaps: "Overlap with the sample size calculator on margin of error needed a clear boundary (analysis versus planning). No authoritative source.",
    references: [{ label: "NIST/SEMATECH e-Handbook of Statistical Methods: confidence limits for the mean", url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm" }],
  },

  /* ---------------- Math: geometry ---------------- */
  "triangle-calculator": {
    title: "Triangle Calculator – Solve Any Triangle",
    description:
      "Solve any triangle from three known values (sides and angles) and get area, heights, medians and radii, using the laws of sines and cosines.",
    longTail: ["solve a triangle from three sides", "triangle area from SAS", "law of cosines calculator"],
    related: ["right-triangle-calculator", "pythagorean-theorem-calculator", "area-calculator", "slope-calculator"],
    gaps: "Overlap with the right triangle and Pythagorean calculators needed a clear boundary (general triangles here).",
  },
  "volume-calculator": {
    title: "Volume Calculator – Sphere, Cone, Cylinder",
    description:
      "Free volume calculator for sphere, cone, cube, cylinder, box, capsule and more. Mix units and get litres, m³ and gallons, with formulas and worked examples.",
    longTail: ["volume of a cylinder calculator", "volume of a sphere formula", "cubic metres to litres"],
    related: ["surface-area-calculator", "area-calculator", "circle-calculator", "unit-conversion-calculator"],
    gaps: "Overlap with surface area on sphere and cylinder queries needed a clear boundary (capacity versus outer surface).",
    references: [
      { label: "Wolfram MathWorld: Sphere", url: "https://mathworld.wolfram.com/Sphere.html" },
      { label: "Wolfram MathWorld: Cylinder", url: "https://mathworld.wolfram.com/Cylinder.html" },
      { label: "Wolfram MathWorld: Cone", url: "https://mathworld.wolfram.com/Cone.html" },
      { label: "Wolfram MathWorld: Pyramid", url: "https://mathworld.wolfram.com/Pyramid.html" },
      { label: "Wolfram MathWorld: Spherical Cap", url: "https://mathworld.wolfram.com/SphericalCap.html" },
      { label: "Wolfram MathWorld: Conical Frustum", url: "https://mathworld.wolfram.com/ConicalFrustum.html" },
      { label: "Wolfram MathWorld: Ellipsoid", url: "https://mathworld.wolfram.com/Ellipsoid.html" },
      { label: "NIST Guide to the SI, Appendix B.8: factors for units listed alphabetically", url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8" },
    ],
  },
  "slope-calculator": {
    title: "Slope Calculator – Line Equation",
    description:
      "Get the slope, angle, line equation, intercepts, distance and midpoint from two points, with the rise-over-run working shown.",
    longTail: ["slope of a line from two points", "equation of a line through two points", "rise over run calculator"],
    related: ["distance-calculator", "pythagorean-theorem-calculator", "triangle-calculator", "ratio-calculator"],
    gaps: META_ONLY,
  },
  "area-calculator": {
    title: "Area Calculator – Common Shapes",
    description:
      "Calculate the area of rectangles, triangles, circles, trapezoids, polygons and more, in the unit you choose, with the formula for each shape.",
    longTail: ["area of a trapezoid calculator", "area of a rectangle in square metres", "area of an irregular polygon"],
    related: ["circle-calculator", "surface-area-calculator", "volume-calculator", "triangle-calculator"],
    gaps: "Overlap with the circle calculator on circle area needed a clear boundary (many shapes here, circle detail there).",
  },
  "distance-calculator": {
    title: "Distance Calculator – 2D, 3D & Lat/Long",
    description:
      "Measure the distance between two points in 2D or 3D, or between two latitude-longitude locations on Earth, with the distance formula shown.",
    longTail: ["distance between two coordinates", "great circle distance between two cities", "distance formula in 3D"],
    related: ["pythagorean-theorem-calculator", "slope-calculator", "unit-conversion-calculator", "triangle-calculator"],
    gaps: META_ONLY,
  },
  "circle-calculator": {
    title: "Circle Calculator – Circumference & Area",
    description:
      "Find radius, diameter, circumference and area from any one of them, plus arc length and sector area, with the formulas and a worked example.",
    longTail: ["circumference from diameter", "radius from area of a circle", "arc length and sector area"],
    related: ["area-calculator", "surface-area-calculator", "volume-calculator", "pythagorean-theorem-calculator"],
    gaps: "Overlap with the area calculator on circle area needed a clear boundary (circle detail here).",
  },
  "surface-area-calculator": {
    title: "Surface Area Calculator – 3D Solids",
    description:
      "Calculate the surface area of spheres, cones, cylinders, boxes, pyramids and other solids, with the formula for each shape and a worked example.",
    longTail: ["surface area of a cylinder", "total surface area of a cone", "surface area of a sphere formula"],
    related: ["volume-calculator", "area-calculator", "circle-calculator", "unit-conversion-calculator"],
    gaps: "Overlap with the volume calculator on the same solids needed a clear boundary (outer surface versus capacity).",
  },
  "pythagorean-theorem-calculator": {
    title: "Pythagorean Theorem Calculator – Sides",
    description:
      "Find the missing side of a right triangle from the other two using a² + b² = c², and check for Pythagorean triples. Steps and examples included.",
    longTail: ["find the hypotenuse calculator", "missing leg of a right triangle", "Pythagorean triples list"],
    related: ["right-triangle-calculator", "triangle-calculator", "distance-calculator", "root-calculator"],
    gaps: "Overlap with the right triangle calculator needed a clear boundary (one missing side here).",
  },
  "right-triangle-calculator": {
    title: "Right Triangle Calculator – Solve & Angles",
    description:
      "Solve a right triangle from any two values: legs, hypotenuse, angles, area, perimeter or altitude, with sine, cosine and tangent working shown.",
    longTail: ["solve a right triangle with an angle and a side", "SOH CAH TOA calculator", "right triangle angles from sides"],
    related: ["pythagorean-theorem-calculator", "triangle-calculator", "area-calculator", "slope-calculator"],
    gaps: "Overlap with the Pythagorean and general triangle calculators needed a clear boundary (full right-triangle solution here).",
  },
};

export function getCalcSeo(slug: string): CalcSeo | undefined {
  return calcSeo[slug];
}
