import type { CalcContent } from "../types";
import { ACTIVITY_LEVELS, bmiFull, bmr, bodyFatBmiMethod, bodyFatCategory, bodyFatNavy, heartRateZones, maxHeartRate } from "@/lib/calculators/health";
import { fixed } from "@/lib/calculators/format";

export const HEALTH_DISCLAIMER =
  "This calculator is for general information and education only. It is not medical advice, a diagnosis or a treatment plan. Results are estimates based on population formulas and cannot account for your individual health. If you have a medical condition, are pregnant, are under 18, or are planning a major change to your diet or exercise, speak to a doctor or registered dietitian first.";

const bmiEx = bmiFull(70, 175);
const bmrMif = bmr("mifflin", "female", 30, 175, 70);
const bmrHar = bmr("harris", "female", 30, 175, 70);
const bmrKatch = bmr("katch", "female", 30, 175, 70, 25);
const lightFactor = ACTIVITY_LEVELS.find((a) => a.id === "light")!.factor;
const navyEx = bodyFatNavy("male", 180, 38, 90) ?? 0;
const bmiForBf = bmiFull(80, 180).bmi;
const bfBmi = bodyFatBmiMethod("male", bmiForBf, 30);
const mhrEx = maxHeartRate("haskell", 36);
const zonesEx = heartRateZones(mhrEx, 70);
const zonesNoRest = heartRateZones(mhrEx, null);

export const healthContent: Record<string, CalcContent> = {
  "bmi-calculator": {
    disclaimer: HEALTH_DISCLAIMER,
    intro: [
      "Body mass index (BMI) compares your weight with your height. This calculator takes height and weight in metric, US or UK units (including stone and pounds) and returns your BMI, the adult category it falls in, and the weight range that corresponds to a BMI of 18.5 to 25 for your height.",
      "BMI is a quick screening number, not a verdict on your health. It is most useful as a starting point for a conversation with a health professional.",
    ],
    whoFor: [
      "Adults who want a quick, standard reference point for weight relative to height.",
      "People tracking changes in weight over time using a consistent measure.",
      "Students and teachers looking for a worked example of a simple health index.",
    ],
    inputs: [
      { name: "Units", text: "Metric (cm and kg), US (feet, inches and pounds) or UK (feet, inches, stone and pounds)." },
      { name: "Age", text: "Used to check the adult range. For under-18s, BMI must be read against growth charts, so this tool does not give an adult category." },
      { name: "Height and weight", text: "Your current height and weight. Measure without shoes and in light clothing for consistency." },
    ],
    how: [
      "BMI is weight in kilograms divided by height in metres squared. The result is compared with World Health Organization adult categories: below 18.5 is underweight, 18.5 to 24.9 is the normal range, 25 to 29.9 is overweight, and 30 or more is obese, with further subdivisions for thinness and obesity classes.",
      "The healthy weight range shown is the weight at which your height gives a BMI of 18.5 and 25. BMI Prime is your BMI divided by 25, so 1.0 is the top of the normal range. The Ponderal Index divides weight by height cubed.",
    ],
    formulas: [
      { label: "BMI", expr: "BMI = weight (kg) ÷ height (m)²" },
      { label: "US units", expr: "BMI = 703 × weight (lb) ÷ height (in)²" },
    ],
    interpret: [
      "A BMI in the normal range does not guarantee good health, and a BMI outside it does not on its own mean poor health. BMI does not separate fat from muscle, ignores where fat is carried, and ranges may be less accurate for athletes, older adults, pregnant people and some ethnic groups.",
      "Waist measurement, blood pressure, blood tests, diet, activity and family history give a fuller picture. A health professional can interpret all of these together.",
    ],
    example: {
      setup: "An adult who is 175 cm tall and weighs 70 kg.",
      steps: [
        "Height in metres: 1.75, so height squared is 3.0625.",
        `BMI = 70 ÷ 3.0625 = ${fixed(bmiEx.bmi, 1)} kg/m².`,
        `The healthy range for this height is 18.5 × 3.0625 = ${fixed(bmiEx.healthyMinKg, 1)} kg to 25 × 3.0625 = ${fixed(bmiEx.healthyMaxKg, 1)} kg.`,
      ],
      result: `BMI ${fixed(bmiEx.bmi, 1)}: ${bmiEx.category.toLowerCase()}.`,
    },
    useCases: [
      "A quick check before a conversation with a doctor or dietitian.",
      "Keeping a simple record of weight relative to height over time.",
      "Converting stone and pounds to kilograms and a BMI in one step.",
    ],
    limitations: [
      "Adult categories only. For children and teenagers use growth charts that account for age and sex.",
      "Does not measure body fat, muscle, bone density or fat distribution.",
      "Category cut-offs are population guidelines. Some health bodies suggest different thresholds for certain groups.",
    ],
    faqs: [
      { question: "What is a healthy BMI?", answer: "For adults, the commonly used normal range is 18.5 to 24.9. This is a screening guide, not a personal target; your best weight depends on your health, body composition and circumstances." },
      { question: "Why can a muscular person have a high BMI?", answer: "BMI uses total weight, and muscle weighs more than fat per volume. Someone with a lot of muscle may have a high BMI without carrying excess fat." },
      { question: "Can I use BMI for children?", answer: "No. For under-18s, BMI is compared with age- and sex-specific percentile charts, which this calculator does not include." },
      { question: "How do I calculate BMI in stone and pounds?", answer: "Choose UK units and enter stone and pounds. The calculator converts to kilograms (1 stone = 6.35029 kg) before applying the formula." },
    ],
  },

  "bmr-calculator": {
    disclaimer: HEALTH_DISCLAIMER,
    intro: [
      "Basal metabolic rate (BMR) is the energy your body uses at complete rest to keep you alive: breathing, circulation, temperature control and cell repair. This calculator estimates BMR with three published equations so you can compare them.",
      "BMR is the foundation for working out how many calories you burn in a day, but it is only an estimate. Two people with the same numbers can differ by a couple of hundred calories.",
    ],
    whoFor: [
      "Anyone starting to plan food intake and wanting a baseline energy figure.",
      "People who know their body fat percentage and want a lean-mass-based estimate.",
      "Students comparing how different equations behave.",
    ],
    inputs: [
      { name: "Sex used in the formula", text: "The equations were fitted separately for males and females, so one of the two must be chosen." },
      { name: "Age, height, weight", text: "Entered in metric, US or UK units." },
      { name: "Equation", text: "Mifflin-St Jeor, revised Harris-Benedict, or Katch-McArdle (which also needs body fat percentage)." },
      { name: "Energy unit", text: "Calories (kcal) or kilojoules (kJ). 1 kcal = 4.184 kJ." },
    ],
    how: [
      "Mifflin-St Jeor (1990) and the revised Harris-Benedict (1984) equations estimate BMR from weight, height, age and sex. Katch-McArdle uses lean body mass, so it needs a body fat percentage and tends to be more useful for people who are very lean or very muscular.",
      "The calculator shows all three results so you can see the spread rather than relying on a single number.",
    ],
    formulas: [
      { label: "Mifflin-St Jeor", expr: "BMR = 10 × kg + 6.25 × cm − 5 × age + 5 (male) or − 161 (female)" },
      { label: "Revised Harris-Benedict (male)", expr: "BMR = 88.362 + 13.397 × kg + 4.799 × cm − 5.677 × age" },
      { label: "Revised Harris-Benedict (female)", expr: "BMR = 447.593 + 9.247 × kg + 3.098 × cm − 4.330 × age" },
      { label: "Katch-McArdle", expr: "BMR = 370 + 21.6 × lean body mass (kg)" },
    ],
    interpret: [
      "Treat the result as a baseline, not a target. Total daily energy use is higher once you add daily movement and exercise, which the calorie calculator handles. Equations differ by tens to a couple of hundred calories, so if they disagree, you are seeing the real uncertainty.",
      "Do not eat below your BMR for long periods without medical supervision. BMR is not a recommended intake.",
    ],
    example: {
      setup: "A 30-year-old woman, 175 cm tall, weighing 70 kg (with a body fat of 25% for the Katch-McArdle line).",
      steps: [
        `Mifflin-St Jeor: 10 × 70 + 6.25 × 175 − 5 × 30 − 161 = ${fixed(bmrMif, 0)} kcal/day.`,
        `Revised Harris-Benedict: 447.593 + 9.247 × 70 + 3.098 × 175 − 4.330 × 30 = ${fixed(bmrHar, 0)} kcal/day.`,
        `Katch-McArdle: lean mass = 70 × 0.75 = 52.5 kg, so 370 + 21.6 × 52.5 = ${fixed(bmrKatch, 0)} kcal/day.`,
      ],
      result: `Estimates range from about ${fixed(Math.min(bmrMif, bmrHar, bmrKatch), 0)} to ${fixed(Math.max(bmrMif, bmrHar, bmrKatch), 0)} kcal per day.`,
    },
    useCases: [
      "Setting a starting point for a nutrition plan with a professional.",
      "Understanding why two people of the same weight need different amounts of energy.",
      "Comparing equations when your body fat percentage is known.",
    ],
    limitations: [
      "All three are estimates fitted to groups of people; individual metabolism varies.",
      "Equations were developed for adults and may be less reliable for older adults, very high or very low body weights, and athletes.",
      "The sex field refers to the dataset the formulas were fitted on and is not a statement about identity. Pregnancy, illness and medication can also change energy needs.",
    ],
    faqs: [
      { question: "Which BMR equation should I use?", answer: "Mifflin-St Jeor is widely recommended for the general adult population. Katch-McArdle can be better if you know your body fat percentage reasonably well. Compare them and expect a spread." },
      { question: "Is BMR the same as calories burned in a day?", answer: "No. BMR is energy at rest. Daily energy use also includes movement, exercise and digestion. Multiply BMR by an activity factor, as in the calorie calculator, for an estimate of daily needs." },
      { question: "How many kilojoules is that?", answer: "Multiply kilocalories by 4.184. The calculator can show either unit." },
      { question: "Can I lose weight by eating exactly my BMR?", answer: "BMR is not a diet target and eating at or below it can be unsafe without supervision. Speak to a health professional about a suitable intake." },
    ],
  },

  "calorie-calculator": {
    disclaimer: HEALTH_DISCLAIMER,
    intro: [
      "This calorie calculator estimates how much energy you use each day and what a daily calorie target might look like for maintaining, losing or gaining weight. It builds on your basal metabolic rate and multiplies it by an activity level.",
      "It then shows what daily adjustment corresponds to your chosen weekly change, and it warns you when that target is lower than commonly advised minimums.",
    ],
    whoFor: [
      "Adults planning weight maintenance, gradual loss or gradual gain.",
      "People who want to understand how activity level changes daily energy needs.",
      "Anyone preparing questions for a dietitian.",
    ],
    inputs: [
      { name: "Sex, age, height, weight", text: "Used to estimate BMR with the Mifflin-St Jeor equation (or Katch-McArdle if you provide body fat)." },
      { name: "Activity level", text: "From sedentary to extra active. Choose the level that matches a typical week, not your best week." },
      { name: "Goal", text: "Maintain, lose or gain a chosen amount per week." },
      { name: "Energy unit", text: "Calories (kcal) or kilojoules (kJ)." },
    ],
    how: [
      "Maintenance calories (often called TDEE, total daily energy expenditure) are BMR multiplied by an activity factor: 1.2 for sedentary, 1.375 for light, 1.465 for moderate, 1.55 for active, 1.725 for very active and 1.9 for extra active. These are widely used approximations, not measured values.",
      "For weight change the calculator assumes roughly 7,700 kcal of energy is equivalent to 1 kg of body weight (about 3,500 kcal per pound). That is a simplification: in practice metabolism adapts and the rate of change slows.",
    ],
    formulas: [
      { label: "Maintenance", expr: "TDEE = BMR × activity factor" },
      { label: "Target", expr: "Target = TDEE + (kg per week × 7,700) ÷ 7" },
    ],
    interpret: [
      "Use the maintenance figure as a starting point and watch your weight for two to three weeks. If it is stable, the estimate is about right for you; if not, adjust gradually. Large daily deficits are not recommended without supervision, which is why very low targets trigger a warning.",
      "Weight changes come from more than calories: water, hormones and muscle all play a role, so short-term movement on the scale is normal.",
    ],
    example: {
      setup: "A 30-year-old woman, 175 cm and 70 kg, with a light activity level who wants to maintain her weight.",
      steps: [
        `BMR (Mifflin-St Jeor) = ${fixed(bmrMif, 1)} kcal/day.`,
        `Maintenance = BMR × ${lightFactor} = ${fixed(bmrMif * lightFactor, 0)} kcal/day.`,
        `For a 0.5 kg-a-week loss: 0.5 × 7,700 ÷ 7 = 550 kcal/day less, giving a target of about ${fixed(bmrMif * lightFactor - 550, 0)} kcal/day.`,
      ],
      result: `About ${fixed(bmrMif * lightFactor, 0)} kcal per day to maintain weight.`,
    },
    useCases: [
      "Getting a first estimate before a structured plan.",
      "Seeing how a more active routine changes your needs.",
      "Comparing a gentle and a faster rate of change.",
    ],
    limitations: [
      "Estimates only. Actual needs depend on body composition, medical conditions, medication, sleep, stress and how accurately you judge your activity.",
      "The 7,700 kcal per kg rule is a rough average and overstates how fast weight changes as you lose or gain over time.",
      "Not suitable for children, pregnancy or breastfeeding, eating disorders or medical diets. Do not use it to set an extreme deficit.",
    ],
    faqs: [
      { question: "Why does the calculator warn about low targets?", answer: "Very low daily intakes can be unsafe without supervision. The warning appears when the target is below commonly cited minimum intakes; follow professional advice instead." },
      { question: "What is TDEE?", answer: "Total daily energy expenditure: the calories you burn in a day including rest, movement, exercise and digestion. It is estimated here as BMR times an activity factor." },
      { question: "Is 7,700 kcal per kg accurate?", answer: "It is an approximation commonly used for planning (about 3,500 kcal per pound). Real-world results vary, and weight loss usually slows over time." },
      { question: "Should I eat the same every day?", answer: "Not necessarily. Weekly average intake matters more than any single day, and many people vary day to day. Discuss structure with a professional if you are unsure." },
    ],
  },

  "body-fat-calculator": {
    disclaimer: HEALTH_DISCLAIMER,
    intro: [
      "This body fat calculator estimates your body fat percentage from tape measurements using the U.S. Navy method, and from BMI, age and sex using a second formula. It also splits your weight into fat mass and lean mass and places the result in a commonly used category range.",
      "Neither method is a clinical measurement. They are practical ways to track relative changes when a scan is not available.",
    ],
    whoFor: [
      "Gym-goers and runners tracking body composition alongside weight.",
      "People who want a second view beyond BMI.",
      "Anyone comparing two estimation methods.",
    ],
    inputs: [
      { name: "Sex, age, height, weight", text: "Used by both methods." },
      { name: "Neck and waist", text: "In the usual Navy technique, the neck is measured just below the larynx and the waist at the navel for men or at the narrowest part of the torso for women. Use a flexible tape, keep it level and snug without squeezing, and repeat the same way each time." },
      { name: "Hips (women)", text: "Measured at the widest point of the buttocks." },
      { name: "Units", text: "Metric or inches; US/UK users can choose their units." },
    ],
    how: [
      "The Navy method uses logarithms of circumference differences and height to predict body density, and converts density to body fat percentage. It uses neck and waist for men, and neck, waist and hip for women.",
      "The BMI method estimates body fat as 1.2 × BMI + 0.23 × age, minus 16.2 for men or 5.4 for women. It is less specific than tape measurements because BMI cannot tell muscle from fat.",
    ],
    formulas: [
      { label: "Navy (male, cm)", expr: "BF% = 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) − 450" },
      { label: "Navy (female, cm)", expr: "BF% = 495 ÷ (1.29579 − 0.35004 × log10(waist + hip − neck) + 0.22100 × log10(height)) − 450" },
      { label: "BMI method", expr: "BF% = 1.2 × BMI + 0.23 × age − 16.2 (male) or − 5.4 (female)" },
    ],
    interpret: [
      "Categories (essential fat, athletes, fitness, average, above average) come from commonly published ranges and differ between men and women. Essential fat is the minimum needed for normal body function, not a goal.",
      "Measure at the same time of day with the same tape position and pressure. Track the trend over weeks rather than any single reading; small measurement errors move the estimate noticeably.",
    ],
    example: {
      setup: "A 30-year-old man, 180 cm tall, 80 kg, with a neck of 38 cm and a waist of 90 cm.",
      steps: [
        "Waist − neck = 52 cm.",
        `Navy method: 495 ÷ (1.0324 − 0.19077 × log10(52) + 0.15456 × log10(180)) − 450 = ${fixed(navyEx, 1)}%.`,
        `Fat mass = 80 × ${fixed(navyEx, 1)}% = ${fixed((80 * navyEx) / 100, 1)} kg, lean mass = ${fixed(80 - (80 * navyEx) / 100, 1)} kg.`,
        `BMI method: BMI is ${fixed(bmiForBf, 1)}, so 1.2 × ${fixed(bmiForBf, 1)} + 0.23 × 30 − 16.2 = ${fixed(bfBmi, 1)}%.`,
      ],
      result: `About ${fixed(navyEx, 1)}% body fat by the Navy method (${bodyFatCategory("male", navyEx).toLowerCase()} range) and ${fixed(bfBmi, 1)}% by the BMI method.`,
    },
    useCases: [
      "Tracking body composition during a training block.",
      "Estimating lean mass for the Katch-McArdle BMR equation.",
      "Cross-checking the two methods to see how far apart they are.",
    ],
    limitations: [
      "Estimates only; typical errors of several percentage points are normal. DEXA scans, skinfold callipers and bioimpedance have their own accuracy and limits.",
      "Tape-measure accuracy depends on technique. Very muscular or very lean people may find the formulas unreliable.",
      "Adults only. Do not use these categories to judge children or as a goal for dieting.",
    ],
    faqs: [
      { question: "How accurate is the Navy method?", answer: "It is a practical estimate with a typical error of several percentage points compared with laboratory methods. It is best for tracking your own changes using consistent measurements." },
      { question: "Why do the two methods give different results?", answer: "The BMI method uses weight and age only, while the Navy method uses where your body carries size (neck, waist, hips). They answer slightly different questions, so a gap between them is expected." },
      { question: "What counts as a healthy body fat percentage?", answer: "It depends on age, sex and fitness. The calculator labels ranges used in fitness settings, but they are not medical thresholds; ask a professional for personal guidance." },
      { question: "What is lean mass?", answer: "Everything that is not fat: muscle, bone, organs and water. It is calculated here as total weight minus estimated fat mass." },
    ],
  },

  "target-heart-rate-calculator": {
    disclaimer: HEALTH_DISCLAIMER,
    intro: [
      "This calculator estimates your maximum heart rate and breaks it into five training zones, from easy warm-up effort to maximum. If you enter a resting heart rate, it uses the Karvonen (heart rate reserve) method, which tailors the zones to your fitness.",
      "Heart rate zones help you pace workouts, but an estimated maximum is only an estimate. Use perceived effort alongside the numbers.",
    ],
    whoFor: [
      "Runners, cyclists and gym users structuring cardio sessions.",
      "People who wear a heart-rate monitor and want sensible zones to compare against.",
      "Anyone who has tested their own maximum and wants zones based on it.",
    ],
    inputs: [
      { name: "Age", text: "Used to estimate maximum heart rate." },
      { name: "Maximum heart rate source", text: "Estimate from age, or enter a value from a supervised test." },
      { name: "Formula", text: "Haskell & Fox (220 − age), Tanaka (208 − 0.7 × age) or Nes (211 − 0.64 × age)." },
      { name: "Resting heart rate", text: "Optional. Measure on waking, before getting up. When provided, zones use the Karvonen method." },
    ],
    how: [
      "Without a resting heart rate, each zone is a percentage of your maximum. With a resting heart rate, the calculator uses heart rate reserve (maximum minus resting): target heart rate = resting + intensity × reserve. The five zones are 50–60%, 60–70%, 70–80%, 80–90% and 90–100%.",
      "Maximum heart rate formulas are population averages with large individual variation, so a young fit person might be well above or below the estimate.",
    ],
    formulas: [
      { label: "Haskell & Fox", expr: "HRmax = 220 − age" },
      { label: "Tanaka", expr: "HRmax = 208 − 0.7 × age" },
      { label: "Nes", expr: "HRmax = 211 − 0.64 × age" },
      { label: "Karvonen", expr: "Target = resting HR + intensity × (HRmax − resting HR)" },
    ],
    interpret: [
      "Zone 1–2 feels easy and is used for warm-ups, recovery and long steady sessions; zones 3–4 are moderate to hard; zone 5 is maximum effort and is only sustainable for short bursts. Use the talk test as a cross-check: in easy zones you can hold a conversation.",
      "Medications (for example beta-blockers), heat, caffeine, illness and fatigue can all change heart rate. If you have a heart condition, speak to your doctor before exercising by heart-rate targets.",
    ],
    example: {
      setup: "A 36-year-old with a resting heart rate of 70 beats per minute, using 220 − age.",
      steps: [
        `Maximum heart rate = 220 − 36 = ${fixed(mhrEx, 0)} bpm.`,
        `Heart rate reserve = ${fixed(mhrEx, 0)} − 70 = ${fixed(mhrEx - 70, 0)} bpm.`,
        `Zone 3 (70–80%) with Karvonen: 70 + 0.70 × ${fixed(mhrEx - 70, 0)} = ${fixed(zonesEx[2].loBpm, 0)} bpm to 70 + 0.80 × ${fixed(mhrEx - 70, 0)} = ${fixed(zonesEx[2].hiBpm, 0)} bpm.`,
        `Without a resting rate, Zone 3 would be ${fixed(zonesNoRest[2].loBpm, 0)} to ${fixed(zonesNoRest[2].hiBpm, 0)} bpm.`,
      ],
      result: `Maximum ${fixed(mhrEx, 0)} bpm; Zone 3 is ${fixed(zonesEx[2].loBpm, 0)}–${fixed(zonesEx[2].hiBpm, 0)} bpm with the Karvonen method.`,
    },
    useCases: [
      "Setting easy and hard session targets for a running plan.",
      "Checking whether an easy run is really easy.",
      "Comparing formulas when you know your measured maximum.",
    ],
    limitations: [
      "Age-based maximum heart rate formulas can be off by 10 or more beats per minute for an individual.",
      "Zones are guidelines; they are not medical targets. If you take heart medication or have a heart condition, ask your doctor before using them.",
      "Not a substitute for a supervised exercise test.",
    ],
    faqs: [
      { question: "Which formula is most accurate?", answer: "None is accurate for everyone. Tanaka and Nes were fitted on larger or more varied samples than the traditional 220 − age, but individual variation is large. A tested maximum is the best option." },
      { question: "What is the Karvonen method?", answer: "It bases zones on heart rate reserve (maximum minus resting heart rate) and adds your resting rate back in, so zones reflect your fitness rather than age alone." },
      { question: "How do I measure resting heart rate?", answer: "Count your pulse for a full minute when you first wake up, before getting out of bed, for several mornings and take the average." },
      { question: "Which zone burns the most fat?", answer: "Different zones burn different fuel mixes, but total weight change depends on overall energy balance over time, not on one zone. Choose zones that you can do consistently and safely." },
    ],
  },
};
