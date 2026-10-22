import type { CalcContent } from "../types";
import { addDays, businessDaysBetween, diffDays, elapsed, longDate, nextBirthday, type YMD } from "@/lib/calculators/dates";
import { convertUnits, fuelTrip, tipSplit } from "@/lib/calculators/units";
import { fixed } from "@/lib/calculators/format";

const dob: YMD = { y: 1990, m: 5, d: 17 };
const asOf: YMD = { y: 2025, m: 3, d: 1 };
const age = elapsed(dob, asOf);
const nextB = nextBirthday(dob, asOf);
const startD: YMD = { y: 2025, m: 1, d: 15 };
const endD: YMD = { y: 2025, m: 3, d: 1 };
const between = diffDays(startD, endD);
const betweenEl = elapsed(startD, endD);
const bizDays = businessDaysBetween(startD, endD, new Set(), false);
const plus45 = addDays(startD, 45);
const tip = tipSplit(86.4, 15, 3, false);
const tipRound = tipSplit(86.4, 15, 3, true);
const trip = fuelTrip(250, "km", 7.5, "l100", 1.7, "per-l", false, 1);
const tripUs = fuelTrip(250, "km", 7.5, "l100", 1.7, "per-l", false, 1);

export const otherContent: Record<string, CalcContent> = {
  "age-calculator": {
    intro: [
      "The age calculator turns a date of birth into an exact age in years, months and days, and shows the same age as total months, weeks and days. It also tells you which weekday you were born on and when your next birthday falls.",
      "By default it measures to today. You can choose any other date to find out how old someone was, or will be, on that day.",
    ],
    whoFor: [
      "Anyone who needs an exact age for a form, application or eligibility rule.",
      "Parents and carers tracking a child's age in months.",
      "Genealogists and writers working out ages on historical dates.",
    ],
    inputs: [
      { name: "Date of birth", text: "The day, month and year of birth." },
      { name: "Age at this date", text: "Optional. Leave blank to use today's date, or choose a past or future date." },
    ],
    how: [
      "The calculator counts complete years first, then complete months, then the remaining days. A month is complete when the same day of the month is reached; if the birth day does not exist in a shorter month (for example the 31st), the last day of that month counts.",
      "Total days are the exact difference between the two calendar dates. Leap years are handled by the calendar, so 29 February birthdays are counted correctly.",
    ],
    formulas: [{ label: "Total days", expr: "days = date₂ − date₁ (calendar days)" }],
    interpret: [
      "The headline age is the one you would give in everyday conversation. The totals in months, weeks and days are useful for infants, for medical charts and for milestone counting.",
      "Time zones are ignored: the calculation works on calendar dates, not on clock times.",
    ],
    example: {
      setup: "A person born on 17 May 1990, measured on 1 March 2025.",
      steps: [
        `Complete years and months: 17 May 1990 to 17 February 2025 is ${age.years} years and ${age.months} months.`,
        `From 17 February to 1 March 2025 is ${age.days} days (February 2025 has 28 days).`,
        `Total days between the two dates: ${diffDays(dob, asOf).toLocaleString("en-US")}.`,
        `Next birthday: ${longDate(nextB)}, ${diffDays(asOf, nextB)} days later.`,
      ],
      result: `${age.years} years, ${age.months} months and ${age.days} days old.`,
    },
    useCases: [
      "Checking minimum-age rules for a course, competition or product.",
      "Finding an infant's age in months for a growth chart.",
      "Counting the days left until a birthday.",
    ],
    limitations: [
      "Calendar-based and Gregorian only. Dates before 1582 may differ in other calendars.",
      "Some cultures count age differently (for example counting from conception). The calculator uses the standard civil method.",
      "Legal age rules differ between countries. Check the specific rule that applies to you.",
    ],
    faqs: [
      { question: "How is age in months and days worked out?", answer: "Complete years are counted first, then complete months after those years, and the remainder is shown as days. A month is complete when the same day-of-month is reached." },
      { question: "What if I was born on 29 February?", answer: "In non-leap years your birthday is treated as 28 February for the next-birthday calculation, and the age rules count 28 February as the end of the month." },
      { question: "Can I find my age on a past or future date?", answer: "Yes. Fill in the second date field and the calculator uses that instead of today's date." },
      { question: "Why do the results change tomorrow?", answer: "When you leave the second date blank, it uses today's date, so the result moves forward by one day every day." },
    ],
  },

  "date-calculator": {
    intro: [
      "The date calculator works two ways: it counts the time between two dates, or it adds or subtracts years, months, weeks and days from a starting date to find a new date. It can count calendar days or business days (Monday to Friday), skipping any holidays you list.",
      "It is handy for contract deadlines, project schedules, notice periods, delivery estimates and any question that starts with “how many days until…” or “what date is… from now”.",
    ],
    whoFor: [
      "Project managers and freelancers setting deadlines.",
      "Anyone calculating a notice period, warranty end or trial length.",
      "People planning travel, pregnancy-related dates, events or countdowns.",
    ],
    inputs: [
      { name: "Mode", text: "Days between two dates, or add/subtract time from a date." },
      { name: "Start and end dates", text: "In between mode both are used. The end date can optionally be included in the count." },
      { name: "Years, months, weeks, days", text: "The amount to add or subtract." },
      { name: "Count days as", text: "Calendar days, or business days that skip weekends and your list of holidays." },
      { name: "Holidays", text: "Optional list of dates in YYYY-MM-DD format that should not count as business days." },
    ],
    how: [
      "Calendar-day differences are exact counts of midnight-to-midnight days, so daylight-saving changes do not affect them. The elapsed time is also broken into years, months and days using the same rule as the age calculator.",
      "When adding months, if the target month is shorter than the starting day (for example 31 January plus one month), the result is the last day of that month. Business-day counting skips Saturdays, Sundays and any listed holiday.",
    ],
    formulas: [{ label: "Days between", expr: "days = end date − start date (+1 if the end date is included)" }],
    interpret: [
      "The headline gives the main answer; the extra lines show the same period in weeks, months and business days. When you add business days, the result date skips non-working days, so it may be more than a week away for five business days.",
      "Public holidays differ by country and region, so the calculator does not guess them. Add the ones that apply to you.",
    ],
    example: {
      setup: "From 15 January 2025 to 1 March 2025.",
      steps: [
        `Calendar days between the dates: ${between}.`,
        `That is ${betweenEl.months} month and ${betweenEl.days} days, or ${Math.floor(between / 7)} weeks and ${between % 7} days.`,
        `Weekdays (Monday to Friday) in that period, not counting the end date: ${bizDays}.`,
        `Going forward instead: 15 January 2025 plus ${between} days is ${longDate(plus45)}.`,
      ],
      result: `${between} days between the two dates; adding 45 days to 15 January 2025 gives ${longDate(plus45)}.`,
    },
    useCases: [
      "Calculating when a 30-day trial or a 14-day cooling-off period ends.",
      "Counting working days until a delivery or deadline.",
      "Finding a date a set number of weeks ahead.",
    ],
    limitations: [
      "Holidays are not built in because they vary by country and year; list the dates you want to skip.",
      "Calendar dates only, with no time-of-day or time-zone handling.",
      "Legal deadlines can have specific counting rules (for example whether the first day counts). Check the rule that applies to you.",
    ],
    faqs: [
      { question: "Does it include the start or end date?", answer: "By default the end date is not counted, which is the standard way to count the days between dates. Choose the inclusive option to add one." },
      { question: "How are business days counted?", answer: "Monday to Friday count as business days. Saturdays, Sundays and any holidays you list are skipped." },
      { question: "What happens when I add a month to the 31st?", answer: "If the next month has fewer days, the result lands on its last day, so 31 January plus one month is 28 February (29 in a leap year)." },
      { question: "Can I subtract time from a date?", answer: "Yes. Choose subtract in the add-or-subtract mode." },
    ],
  },

  "tip-calculator": {
    intro: [
      "The tip calculator works out the tip on a bill, the new total, and what each person owes when the bill is shared. You can pick a common tip percentage or enter your own, and round the amount per person up to the next whole unit so splitting is easy.",
      "Tipping customs differ widely. In some places tips are expected, in others a service charge is already included or tipping is optional, so use the percentage that fits where you are.",
    ],
    whoFor: [
      "Diners splitting a restaurant bill between friends.",
      "Travellers who tip in a country with different customs.",
      "Anyone who wants a quick way to check a service charge.",
    ],
    inputs: [
      { name: "Bill amount", text: "The amount before the tip." },
      { name: "Tip percentage", text: "Choose a preset or enter a custom percentage." },
      { name: "People", text: "How many people share the bill (1 if you are paying alone)." },
      { name: "Rounding", text: "Optionally round the total per person up to a whole number." },
      { name: "Currency", text: "Display only." },
    ],
    how: [
      "The tip is the bill multiplied by the tip percentage. The total is the bill plus the tip. Per-person amounts divide both by the number of people.",
      "If you choose to round up, the per-person total is rounded up to the next whole unit and the tip becomes whatever is left over, so the effective tip percentage is slightly higher than the one you chose.",
    ],
    formulas: [
      { label: "Tip", expr: "tip = bill × tip% ÷ 100" },
      { label: "Per person", expr: "each = (bill + tip) ÷ people" },
    ],
    interpret: [
      "Check whether a service charge is already on the bill before adding a tip. The effective tip percentage line shows the real percentage after rounding.",
      "Percentage of the pre-tax or post-tax amount is a matter of local habit; the calculator uses whatever bill amount you enter.",
    ],
    example: {
      setup: "A bill of 86.40 shared by three people with a 15% tip.",
      steps: [
        `Tip = 86.40 × 15% = ${fixed(tip.tip, 2)}.`,
        `Total = 86.40 + ${fixed(tip.tip, 2)} = ${fixed(tip.total, 2)}.`,
        `Each person pays ${fixed(tip.total, 2)} ÷ 3 = ${fixed(tip.totalPerPerson, 2)}.`,
        `With rounding up to a whole number each: ${fixed(tipRound.totalPerPerson, 0)} per person, total ${fixed(tipRound.total, 2)}, an effective tip of ${fixed(tipRound.effectiveTipPct, 1)}%.`,
      ],
      result: `${fixed(tip.totalPerPerson, 2)} each, or ${fixed(tipRound.totalPerPerson, 0)} each if rounded up.`,
    },
    useCases: [
      "Splitting a restaurant bill evenly.",
      "Checking a tip while travelling.",
      "Seeing how rounding up changes the effective tip.",
    ],
    limitations: [
      "Splits the bill evenly. If people ordered different amounts, calculate each person's share first.",
      "Does not know local tipping customs or service charges.",
      "The tip applies to the amount you enter; decide in advance whether that includes tax.",
    ],
    faqs: [
      { question: "How much should I tip?", answer: "It depends on the country and the service. Customs vary from no tip to 20% or more, so check local norms. The calculator simply does the arithmetic for the percentage you choose." },
      { question: "Should I tip on the amount before or after tax?", answer: "Practice varies. Enter the amount you want the tip based on." },
      { question: "Why is my effective tip higher when I round up?", answer: "Rounding the per-person total up adds a small extra amount to the tip, so the real percentage is a little above your chosen one." },
      { question: "Can I split unevenly?", answer: "Not in this calculator. Work out each person's share of the bill first and run a separate calculation for each." },
    ],
  },

  "fuel-cost-calculator": {
    intro: [
      "The fuel cost calculator estimates how much fuel a trip will use and what it will cost. Enter the distance, your vehicle's fuel efficiency and the fuel price, in kilometres or miles, and in the units your car or pump uses.",
      "It also shows the cost per kilometre or mile and, for shared trips, the cost per person. Efficiency can be entered as litres per 100 km, kilometres per litre, or miles per US or UK gallon.",
    ],
    whoFor: [
      "Drivers planning a road trip or comparing the cost of driving with other transport.",
      "Car-sharers and colleagues splitting fuel costs.",
      "Anyone comparing vehicles with efficiency quoted in different units.",
    ],
    inputs: [
      { name: "Trip distance", text: "In kilometres or miles; can be one way or a round trip." },
      { name: "Fuel efficiency", text: "Litres per 100 km, km per litre, MPG (US) or MPG (UK). Note that a US gallon and a UK gallon are different sizes." },
      { name: "Fuel price", text: "Per litre, per US gallon or per UK gallon. The default is an example, so enter today's price." },
      { name: "People", text: "The number of people sharing the cost." },
    ],
    how: [
      "The calculator converts everything to a common basis: distance in kilometres, efficiency in litres per 100 km and price per litre. Fuel used equals distance times efficiency divided by 100, and cost equals fuel used times price per litre.",
      "Unit conversions use exact definitions: 1 mile = 1.609344 km, 1 US gallon = 3.785411784 litres and 1 UK (imperial) gallon = 4.54609 litres.",
    ],
    formulas: [
      { label: "Fuel used", expr: "litres = km × (L/100 km) ÷ 100" },
      { label: "Cost", expr: "cost = litres × price per litre" },
      { label: "MPG to L/100 km", expr: "L/100 km = 100 × litres per gallon ÷ (1.609344 × MPG)" },
    ],
    interpret: [
      "Use the cost-per-distance figure to compare driving with other options. Real consumption changes with speed, load, temperature, traffic and driving style, so treat the result as an estimate and add a margin for a long trip.",
      "If your car shows average consumption on its trip computer, use that rather than the manufacturer's official figure, which is usually lower than real-world use.",
    ],
    example: {
      setup: "A 250 km trip in a car that uses 7.5 litres per 100 km, with fuel at 1.70 per litre (an example price).",
      steps: [
        `Fuel used = 250 × 7.5 ÷ 100 = ${fixed(trip.litres, 2)} litres.`,
        `Cost = ${fixed(trip.litres, 2)} × 1.70 = ${fixed(trip.cost, 2)}.`,
        `Cost per km = ${fixed(trip.costPerKm, 3)}; the same efficiency is ${fixed(tripUs.mpgUs, 1)} MPG (US) or ${fixed(tripUs.mpgUk, 1)} MPG (UK).`,
      ],
      result: `About ${fixed(trip.litres, 2)} litres and ${fixed(trip.cost, 2)} in fuel for the trip.`,
    },
    useCases: [
      "Budgeting for a holiday drive or a commute.",
      "Splitting fuel costs between passengers.",
      "Converting between MPG and L/100 km.",
    ],
    limitations: [
      "Assumes a constant average consumption. Real use varies with conditions.",
      "Fuel only. Tolls, parking, wear and depreciation are not included.",
      "For electric vehicles, a different calculation using kWh per 100 km and electricity price is needed.",
    ],
    faqs: [
      { question: "Why are US and UK MPG different?", answer: "Because a US gallon (3.785 L) is smaller than a UK gallon (4.546 L), the same car shows a higher MPG figure in UK gallons." },
      { question: "How do I convert MPG to litres per 100 km?", answer: "Divide a constant by the MPG figure: 235.215 ÷ MPG (US) or 282.481 ÷ MPG (UK). The calculator does this for you." },
      { question: "Is the default fuel price accurate?", answer: "No. It is an example value to show how the calculator works. Enter the price at your pump." },
      { question: "Does it include a return journey?", answer: "Yes, there is an option to double the distance for a round trip." },
    ],
  },

  "unit-conversion-calculator": {
    intro: [
      "This unit converter changes values between metric, US customary and imperial units across length, weight, temperature, area, volume, speed and time. Pick a category, enter a value and choose the units to convert from and to.",
      "Conversions use exact internationally agreed factors, such as 1 inch = 25.4 mm exactly, and show the result to up to 10 significant digits, together with a table of the same value in every other unit of that category.",
    ],
    whoFor: [
      "Travellers and online shoppers moving between metric and US or UK units.",
      "Cooks, DIY builders and students.",
      "Engineers and writers who need a quick, reliable factor.",
    ],
    inputs: [
      { name: "Category", text: "Length, weight/mass, temperature, area, volume, speed or time." },
      { name: "Value", text: "The number to convert." },
      { name: "From and to units", text: "Metric, US and UK units are listed together." },
    ],
    how: [
      "Each unit is defined as a factor relative to a base unit of its category (metre, kilogram, square metre, litre and so on). To convert, the value is multiplied by the source factor and divided by the target factor, which avoids chains of rounded conversions.",
      "Temperature is handled separately because Celsius, Fahrenheit and Kelvin have different zero points, not just different scales.",
    ],
    formulas: [
      { label: "Linear units", expr: "result = value × (factor of source ÷ factor of target)" },
      { label: "Fahrenheit to Celsius", expr: "°C = (°F − 32) × 5 ÷ 9" },
      { label: "Celsius to Kelvin", expr: "K = °C + 273.15" },
    ],
    interpret: [
      "Check the units on the result label, especially for gallons (US and UK differ), tons (short, long and metric) and miles (statute versus nautical). The converter lists each separately so the difference is explicit.",
      "Very large or very small results switch to exponent notation (for example 1.5e-7) to avoid long strings of zeros.",
    ],
    example: {
      setup: "Convert 10 kilometres to miles, 100 °F to °C, and 1 UK gallon to litres.",
      steps: [
        `10 km ÷ 1.609344 = ${fixed(convertUnits("length", "km", "mi", 10), 4)} miles.`,
        `(100 − 32) × 5 ÷ 9 = ${fixed(convertUnits("temperature", "f", "c", 100), 2)} °C.`,
        `1 UK gallon = ${fixed(convertUnits("volume", "gal-uk", "l", 1), 5)} litres, while 1 US gallon = ${fixed(convertUnits("volume", "gal-us", "l", 1), 6)} litres.`,
      ],
      result: `10 km is ${fixed(convertUnits("length", "km", "mi", 10), 4)} miles; 100 °F is ${fixed(convertUnits("temperature", "f", "c", 100), 2)} °C.`,
    },
    useCases: [
      "Converting recipes and clothing sizes' measurements.",
      "Checking product dimensions on overseas websites.",
      "Moving between stone, pounds and kilograms.",
    ],
    limitations: [
      "Currency conversion is not included because rates change constantly.",
      "Displayed results are rounded for readability; the underlying calculation uses full precision.",
      "Some historic or regional units (for example old trade units) are not listed.",
    ],
    faqs: [
      { question: "How many centimetres are in an inch?", answer: "Exactly 2.54, because the international inch is defined as 25.4 millimetres." },
      { question: "What is the difference between US and UK gallons?", answer: "A US gallon is 3.785411784 litres and a UK (imperial) gallon is 4.54609 litres, about 20% larger." },
      { question: "Why isn't temperature conversion just a multiplication?", answer: "Because the scales have different zero points. You must add or subtract an offset as well as scale the value." },
      { question: "Are the conversion factors exact?", answer: "Metric and the legal definitions of inches, feet, yards, miles, pounds and gallons are exact. Some derived factors, such as the year used for time, follow stated conventions." },
    ],
  },
};
