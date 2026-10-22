import type { CalcContent } from "../types";
import { amortize, compoundInterest, deferredAmount, mortgage, roi, vatFromGross, vatFromNet, vatRateFromAmounts } from "@/lib/calculators/finance";
import { money, fixed } from "@/lib/calculators/format";

const usd = (n: number) => money(n, "USD");
const gbp = (n: number) => money(n, "GBP");
const eur = (n: number) => money(n, "EUR");

const mortgageEx = (() => {
  const m = mortgage({ price: 400000, down: 20, downIsPercent: true, termYears: 30, ratePct: 6.5, propertyTaxYear: 4800, insuranceYear: 1200, otherMonthly: 0, extraMonthly: 0 });
  const extra = mortgage({ price: 400000, down: 20, downIsPercent: true, termYears: 30, ratePct: 6.5, propertyTaxYear: 4800, insuranceYear: 1200, otherMonthly: 0, extraMonthly: 200 });
  return { m, extra };
})();

const loanEx = amortize(25000, 7, 60);
const deferredEx = deferredAmount(25000, 7, 5, 12);
const compoundEx = compoundInterest({ principal: 10000, monthlyContribution: 200, annualRatePct: 5, years: 10, periodsPerYear: 12, contributeAtStart: false });
const lumpEx = compoundInterest({ principal: 10000, monthlyContribution: 0, annualRatePct: 5, years: 10, periodsPerYear: 12, contributeAtStart: false });
const roiEx = roi(10000, 14000, 3);

export const financialContent: Record<string, CalcContent> = {
  "mortgage-calculator": {
    intro: [
      "This mortgage calculator turns a home price, deposit, interest rate and term into the number most buyers want first: what the monthly payment will be. It also shows how much of the money you repay is interest, when the loan is paid off, and how the balance falls year by year.",
      "You can add yearly property tax and insurance, other monthly costs such as a service charge, and an optional extra monthly payment to see how much interest and time that saves. The result is a planning figure, not a lender's quote.",
    ],
    whoFor: [
      "First-time buyers comparing what different prices and deposits do to a monthly budget.",
      "Existing owners weighing up whether overpaying each month is worth it.",
      "Anyone in the US, UK, France or Spain who wants to sanity-check a repayment mortgage before talking to a lender or broker.",
    ],
    inputs: [
      { name: "Home price", text: "The purchase price of the property." },
      { name: "Down payment", text: "Your deposit, entered either as a percentage of the price or as an amount." },
      { name: "Loan term", text: "How many years you will take to repay the loan. Terms of 15 to 30 years are typical, but your lender sets the options." },
      { name: "Interest rate", text: "The yearly rate on the loan. For a fixed-rate loan, use the rate on your offer; lenders may also quote APR (US/UK), TAEG (France) or TAE (Spain), which include extra charges and are not the same as the plain interest rate." },
      { name: "Tax, insurance and other costs", text: "Optional yearly or monthly extras that are added to the monthly total but are not part of the loan itself." },
      { name: "Extra monthly payment", text: "Optional money paid on top of the scheduled payment each month." },
    ],
    how: [
      "The loan amount is the price minus your down payment. The calculator assumes a fixed-rate repayment loan where interest is charged monthly on the remaining balance, and the payment stays level for the whole term.",
      "Each month, interest equals the outstanding balance times the monthly rate (the yearly rate divided by 12). Whatever is left of the payment reduces the balance. Early payments are mostly interest; later ones are mostly principal, which is why paying extra early has a large effect.",
    ],
    formulas: [
      { label: "Monthly payment", expr: "M = P × r ÷ (1 − (1 + r)^−n)" },
      { label: "Where", expr: "P = loan amount, r = yearly rate ÷ 12 (as a decimal), n = number of monthly payments" },
    ],
    interpret: [
      "The headline figure is the monthly payment including any tax, insurance and other costs you entered. The principal-and-interest part is shown separately, because that is the part that repays the loan. Total interest tells you what borrowing costs over the full term, and the yearly table shows how quickly the balance falls.",
      "Compare scenarios by changing one input at a time: a 5-point larger deposit, a shorter term, or a rate that is half a point lower can each change the monthly figure and the total interest in different ways.",
    ],
    example: {
      setup: `A ${usd(400000)} home with a 20% deposit, a 30-year term, a 6.5% fixed rate, ${usd(4800)} of yearly property tax and ${usd(1200)} of yearly insurance.`,
      steps: [
        `Deposit: 20% of ${usd(400000)} = ${usd(mortgageEx.m.downAmount)}, so the loan is ${usd(mortgageEx.m.loan)}.`,
        `Monthly rate r = 6.5% ÷ 12 = 0.541667%, over n = 360 payments.`,
        `Principal and interest: ${usd(mortgageEx.m.payment)} per month.`,
        `Tax and insurance: (${usd(4800)} + ${usd(1200)}) ÷ 12 = ${usd(mortgageEx.m.monthlyExtras)} per month.`,
      ],
      result: `Monthly total ${usd(mortgageEx.m.monthlyTotal)}. Total interest over the term: ${usd(mortgageEx.m.base.totalInterest)}. Adding ${usd(200)} a month extra shortens the loan by ${mortgageEx.extra.monthsSaved} months and saves ${usd(mortgageEx.extra.interestSaved)} in interest.`,
    },
    useCases: [
      "Setting a realistic price range before viewing homes.",
      "Comparing a 15-year and a 30-year term, or two different rates.",
      "Seeing what an overpayment of a fixed amount each month does to the payoff date.",
      "Checking a broker's illustration against an independent calculation.",
    ],
    limitations: [
      "Models a fixed-rate repayment loan with monthly interest. Variable and tracker rates, interest-only loans, offset accounts and rate changes after an initial period are not modelled.",
      "Lenders may calculate interest daily or yearly, round payments to the cent and add fees, so the real schedule can differ slightly.",
      "Property tax, insurance and other costs are simple monthly averages. Taxes such as stamp duty, transfer taxes, notary fees or mortgage insurance are not included.",
      "Not financial advice. Ask a regulated lender or adviser before you borrow.",
    ],
    faqs: [
      { question: "Does this work for UK, French or Spanish mortgages?", answer: "It works for any fixed-rate repayment mortgage that charges interest monthly on the balance. Pick the currency that matches your loan. Country rules such as fees, insurance or variable rates are not included, so treat the result as an estimate." },
      { question: "Why is the first year mostly interest?", answer: "Interest is charged on the outstanding balance, which is at its largest at the start. The payment is level, so the interest share is highest in the early years and shrinks as the balance falls." },
      { question: "How does an extra monthly payment help?", answer: "Extra money goes straight to the principal, which lowers the balance that future interest is charged on. The calculator runs the schedule again with the extra amount and shows the months and interest saved." },
      { question: "What is the difference between interest rate and APR?", answer: "The interest rate is the yearly cost of the borrowing itself. APR (and the equivalent TAEG in France or TAE in Spain) also folds in certain fees and charges, so it is usually higher. This calculator uses the plain interest rate you enter." },
    ],
  },

  "loan-calculator": {
    intro: [
      "The loan calculator shows what a loan will cost: the regular repayment, the total interest and the full amount you pay back. Use it for car loans, personal loans, student loans or any borrowing with fixed monthly repayments.",
      "It also covers loans repaid in one payment at the end, where interest compounds until the due date. Both modes make the cost of borrowing visible before you sign.",
    ],
    whoFor: [
      "Borrowers comparing offers with different terms or rates.",
      "People deciding between a lower monthly payment and a lower total cost.",
      "Small business owners and freelancers modelling an equipment or vehicle loan.",
    ],
    inputs: [
      { name: "Loan amount", text: "How much you borrow." },
      { name: "Term", text: "The repayment period in years plus any extra months." },
      { name: "Interest rate", text: "The yearly interest rate on the loan." },
      { name: "Loan type", text: "Monthly repayments (the usual instalment loan) or a single payment at the end." },
      { name: "Compounding", text: "For single-payment loans only: how often interest is added to the balance." },
    ],
    how: [
      "For monthly repayments the calculator uses the standard instalment formula. Each month, interest is charged on the remaining balance and the rest of the payment reduces it, until the balance reaches zero at the end of the term.",
      "For a single payment at the end, nothing is paid until the due date. Interest compounds, so the amount owed is the loan multiplied by (1 + rate ÷ n) raised to the power n × years.",
    ],
    formulas: [
      { label: "Monthly repayment", expr: "M = P × r ÷ (1 − (1 + r)^−n)" },
      { label: "Single payment at the end", expr: "A = P × (1 + R ÷ m)^(m × t)" },
      { label: "Where", expr: "P = amount, r = yearly rate ÷ 12, n = months, R = yearly rate, m = compounding periods per year, t = years" },
    ],
    interpret: [
      "Look at total interest as well as the monthly figure. A longer term lowers the payment but usually raises the total interest, sometimes by a lot. If you can afford a shorter term, the saving is usually larger than a small difference in rate.",
      "The yearly table shows how the balance falls. Check whether your lender charges early-repayment fees before overpaying.",
    ],
    example: {
      setup: `Borrow ${usd(25000)} over 5 years at 7% a year with monthly repayments.`,
      steps: [
        "Monthly rate r = 7% ÷ 12 = 0.583333%, number of payments n = 60.",
        `Payment = ${usd(25000)} × r ÷ (1 − (1 + r)^−60) = ${usd(loanEx.payment)}.`,
        `Total repaid = 60 × ${usd(loanEx.payment)} = ${usd(loanEx.totalPaid)}.`,
      ],
      result: `Monthly payment ${usd(loanEx.payment)}, total interest ${usd(loanEx.totalInterest)}. If the same ${usd(25000)} were instead repaid in one payment after 5 years with monthly compounding at 7%, the amount due would be ${usd(deferredEx.amount)} (interest ${usd(deferredEx.interest)}).`,
    },
    useCases: [
      "Comparing a 3-year and a 5-year car loan.",
      "Checking how much a personal-loan offer really costs over its life.",
      "Working out the lump sum owed on a bullet-style loan or an informal family loan.",
    ],
    limitations: [
      "Assumes a fixed rate with level monthly repayments and interest charged monthly. Variable rates, payment holidays and balloon payments are not modelled.",
      "Arrangement fees, insurance and other charges are not included. Add them to the amount if you finance them, or compare with the lender's APR (TAEG in France, TAE in Spain).",
      "Payments are not rounded to the cent, so a lender's final instalment may differ by a few pence or cents.",
    ],
    faqs: [
      { question: "What is the difference between the two loan types?", answer: "With monthly repayments, you pay down the loan gradually and interest is charged on the shrinking balance. With a single payment at the end, interest keeps compounding on the full amount until the due date, so the total cost is higher for the same rate and term." },
      { question: "Does a longer term cost more?", answer: "Usually yes in total interest, even though the monthly payment is lower, because you carry the balance for longer. The calculator lets you compare terms side by side." },
      { question: "Can I use it for a zero-interest loan?", answer: "Yes. Enter 0% and the calculator divides the loan equally across the months." },
      { question: "Is the result a quote?", answer: "No. It is an estimate based on the numbers you enter. Your lender's offer sets the actual terms." },
    ],
  },

  "compound-interest-calculator": {
    intro: [
      "Compound interest means earning interest on your interest. This calculator shows how a starting amount, regular monthly contributions, an interest rate and time combine into a future balance, and how much of that balance is your own money versus interest earned.",
      "It is useful for savings accounts, bonds, tax-wrapped savings and long-term investment projections, as long as you remember that the rate you enter is an assumption, not a promise.",
    ],
    whoFor: [
      "Savers who want to see the effect of starting early or adding a little more each month.",
      "People comparing accounts that compound at different frequencies.",
      "Students learning why compounding is described as exponential growth.",
    ],
    inputs: [
      { name: "Starting amount", text: "The balance at the beginning." },
      { name: "Monthly contribution", text: "What you add each month. Use 0 for a one-off lump sum." },
      { name: "Contribution timing", text: "Whether each contribution is made at the start or the end of the month." },
      { name: "Annual interest rate", text: "The nominal yearly rate you expect to earn." },
      { name: "Time", text: "How long the money stays invested, in years (decimals allowed)." },
      { name: "Compounding frequency", text: "How often interest is added: annually, semi-annually, quarterly, monthly or daily." },
    ],
    how: [
      "Without contributions the balance follows the standard compound-interest formula. With contributions, the calculator steps month by month: the balance grows by the effective monthly growth factor, then the contribution is added (or added first, if you choose start-of-month).",
      "Because the growth factor is derived from the compounding frequency, the lump-sum part is exact. For contributions made between compounding dates (for example monthly deposits into a quarterly-compounding account), the month-by-month method is a close approximation rather than a bank's exact day-by-day accrual.",
    ],
    formulas: [
      { label: "Lump sum", expr: "A = P × (1 + r ÷ n)^(n × t)" },
      { label: "Monthly growth factor used", expr: "g = (1 + r ÷ n)^(n ÷ 12)" },
      { label: "Where", expr: "P = starting amount, r = yearly rate, n = compounding periods per year, t = years" },
    ],
    interpret: [
      "Compare the final balance with total contributions to see how much is growth. Early on, contributions dominate; in the later years interest can overtake them. The effective annual rate shows what the compounding frequency adds to the nominal rate.",
      "Remember the result is before taxes, fees and inflation. A real-world return is also not constant from year to year.",
    ],
    example: {
      setup: `Start with ${usd(10000)}, add ${usd(200)} at the end of every month, earn 5% a year compounded monthly, for 10 years.`,
      steps: [
        `Contributions: ${usd(10000)} + 120 × ${usd(200)} = ${usd(compoundEx.totalContributed)}.`,
        `The lump sum alone grows to ${usd(lumpEx.futureValue)} (that is ${usd(10000)} × (1 + 0.05 ÷ 12)^120).`,
        `Adding the monthly deposits and their interest gives a final balance of ${usd(compoundEx.futureValue)}.`,
      ],
      result: `Final balance ${usd(compoundEx.futureValue)}, of which ${usd(compoundEx.interestEarned)} is interest earned. The effective annual rate is ${fixed(compoundEx.effectiveAnnualPct, 3)}%.`,
    },
    useCases: [
      "Projecting a savings pot for a deposit, a wedding or retirement.",
      "Comparing the same rate with annual and monthly compounding.",
      "Showing a young person why starting five years earlier matters.",
    ],
    limitations: [
      "Assumes a constant rate. Real investments rise and fall, so use the result as a scenario, not a forecast.",
      "No taxes, fees or inflation are deducted.",
      "With contributions, interest between compounding dates is approximated using the effective monthly factor, which can differ slightly from an institution's own method.",
      "Not financial advice.",
    ],
    faqs: [
      { question: "What is the difference between compounding monthly and annually?", answer: "More frequent compounding adds interest to the balance more often, so the effective yearly return is slightly higher for the same nominal rate. At 5%, annual compounding gives 5.000% a year and monthly compounding gives about 5.116%." },
      { question: "Should I enter my rate before or after tax?", answer: "Enter the rate you expect to actually keep. If interest is taxed where you live, use an after-tax rate for a more realistic figure." },
      { question: "Can I model withdrawals?", answer: "Not directly. This tool is built for saving and investing, not for drawing money down, so it only accepts contributions of zero or more." },
      { question: "Why does the final balance depend on when I contribute?", answer: "A contribution made at the start of the month earns a month of interest that an end-of-month contribution does not, which adds up over years." },
    ],
  },

  "roi-calculator": {
    intro: [
      "Return on investment (ROI) compares what you gained or lost with what you put in. This calculator gives the gain, the ROI percentage and, if you give the time period, the annualised return, which makes investments of different lengths comparable.",
      "It works for shares, property, a business purchase, a marketing campaign or any decision where you can state a cost and a final value.",
    ],
    whoFor: [
      "Investors comparing two holdings that ran for different lengths of time.",
      "Small business owners judging whether equipment or a campaign paid for itself.",
      "Students and analysts who need a quick, transparent ROI and CAGR figure.",
    ],
    inputs: [
      { name: "Amount invested", text: "Your total cost, including purchase fees if you want a net result." },
      { name: "Amount returned", text: "The final value or sale proceeds, plus any income you received (dividends, rent, revenue)." },
      { name: "Investment period", text: "The length in years, or a start and end date, so the annualised return can be calculated." },
    ],
    how: [
      "ROI is the gain divided by the cost, shown as a percentage. The annualised return answers a different question: what steady yearly rate would turn the starting amount into the final amount over the period. It uses the compound annual growth rate formula.",
      "When you give dates, the length is counted in days and divided by 365.25 to allow for leap years.",
    ],
    formulas: [
      { label: "ROI", expr: "ROI = (Returned − Invested) ÷ Invested × 100%" },
      { label: "Annualised return (CAGR)", expr: "CAGR = (Returned ÷ Invested)^(1 ÷ years) − 1" },
    ],
    interpret: [
      "A positive ROI means a gain and a negative ROI means a loss. A large ROI over a long period can be less impressive than a modest ROI over a short one, which is why the annualised figure is useful. Neither number says anything about risk.",
      "If the returned amount is lower than the invested amount, the annualised figure is negative. If it is zero, the investment was wiped out (−100%).",
    ],
    example: {
      setup: `You invest ${usd(10000)} and it is worth ${usd(14000)} after 3 years.`,
      steps: [
        `Gain = ${usd(14000)} − ${usd(10000)} = ${usd(roiEx.gain)}.`,
        `ROI = ${usd(roiEx.gain)} ÷ ${usd(10000)} = ${fixed(roiEx.roiPct, 2)}%.`,
        `CAGR = (14,000 ÷ 10,000)^(1/3) − 1 = ${fixed(roiEx.annualisedPct ?? 0, 3)}% a year.`,
      ],
      result: `ROI ${fixed(roiEx.roiPct, 2)}% in total, or about ${fixed(roiEx.annualisedPct ?? 0, 2)}% a year.`,
    },
    useCases: [
      "Comparing a 3-year and a 7-year investment on a like-for-like basis.",
      "Reviewing whether a piece of equipment or software earned back its cost.",
      "Evaluating a rental property by including rent in the returned amount.",
    ],
    limitations: [
      "Ignores risk, taxes, inflation and the timing of any cash flows between the start and end. For investments with several deposits or withdrawals, an internal rate of return (IRR) is more appropriate.",
      "Results depend on what you count as cost and return. Be consistent when you compare options.",
      "Past results do not predict future returns. Not financial advice.",
    ],
    faqs: [
      { question: "What is a good ROI?", answer: "There is no universal answer. It depends on the asset, the time period and the risk taken. Compare ROI against alternatives with similar risk and duration, and look at the annualised figure rather than the headline percentage." },
      { question: "Why is the annualised return different from ROI divided by years?", answer: "Because returns compound. A 40% gain over 3 years is about 11.9% a year compounded, not 13.3% (which would be 40% ÷ 3)." },
      { question: "Can ROI be negative?", answer: "Yes. If you get back less than you invested, the ROI is negative, down to −100% for a total loss." },
      { question: "How do I include dividends or rent?", answer: "Add the income you received to the returned amount, or include them in the final value, so that total gain reflects everything the investment paid." },
    ],
  },

  "vat-calculator": {
    intro: [
      "Value-added tax (VAT) is added to the price of most goods and services in the UK and across Europe. This calculator adds VAT to a net price, takes it out of a gross price, or works out the rate from a net and gross amount, and shows the VAT portion separately.",
      "Preset standard rates are provided for several countries as a convenience, and you can enter any other rate, such as a reduced or zero rate, yourself.",
    ],
    whoFor: [
      "Freelancers and small businesses preparing invoices.",
      "Shoppers and buyers who want to see the net price behind a VAT-inclusive price.",
      "Bookkeepers checking an invoice total.",
    ],
    inputs: [
      { name: "Calculation type", text: "Add VAT to a net price, remove VAT from a gross price, or find the VAT rate from two amounts." },
      { name: "VAT rate", text: "Choose a preset country standard rate or enter your own. Rates change, so check the current rate with your tax authority." },
      { name: "Net price", text: "The price before VAT." },
      { name: "Gross price", text: "The price including VAT." },
      { name: "Currency", text: "Display only. It does not convert between currencies." },
    ],
    how: [
      "To add VAT, multiply the net price by the rate and add it. To remove VAT, divide the gross price by one plus the rate. Subtracting a percentage from a gross price is a common mistake: removing 20% from 120 gives 96, not the correct net price of 100.",
      "To find a rate, divide the VAT amount (gross minus net) by the net price.",
    ],
    formulas: [
      { label: "Gross from net", expr: "Gross = Net × (1 + rate)" },
      { label: "Net from gross", expr: "Net = Gross ÷ (1 + rate)" },
      { label: "Rate", expr: "Rate = (Gross − Net) ÷ Net" },
    ],
    interpret: [
      "The result shows net, VAT and gross together so you can check each against an invoice. When removing VAT, the VAT amount is the gross minus the net, and it is always smaller than the same percentage taken from the gross.",
      "Rounding on invoices happens line by line or on the total depending on the rules and software you use, which can shift totals by a cent or penny.",
    ],
    example: {
      setup: "A service costs 100.00 before VAT in a country with a 20% standard rate.",
      steps: [
        `VAT = 100.00 × 20% = ${gbp(vatFromNet(100, 20).vat)}.`,
        `Gross price = ${gbp(vatFromNet(100, 20).gross)}.`,
        `Going the other way: ${gbp(120)} ÷ 1.20 = ${gbp(vatFromGross(120, 20).net)} net, so VAT is ${gbp(vatFromGross(120, 20).vat)}.`,
        `Spain at 21%: ${eur(100)} net becomes ${eur(vatFromNet(100, 21).gross)}. Finding the rate from 100 net and 121 gross returns ${fixed(vatRateFromAmounts(100, 121).ratePct, 2)}%.`,
      ],
      result: "100.00 net + 20.00 VAT = 120.00 gross at 20%.",
    },
    useCases: [
      "Quoting clients with and without VAT.",
      "Checking supplier invoices.",
      "Finding the VAT hidden in a shelf price.",
      "Verifying which rate was applied to a purchase.",
    ],
    limitations: [
      "The preset rates are standard rates for convenience and may be out of date. Reduced and zero rates apply to many items; use the custom rate for those.",
      "It does not decide whether VAT applies, handle reverse charge, partial exemption, cross-border rules or the US-style sales tax added at the till.",
      "This is a calculation aid, not tax advice. Confirm treatment with your tax authority or adviser.",
    ],
    faqs: [
      { question: "How do I take VAT off a price?", answer: "Divide the VAT-inclusive price by 1 plus the rate. At 20%, divide by 1.20. For example, 120 ÷ 1.20 = 100." },
      { question: "Why isn't it correct to subtract 20% from a VAT-inclusive price?", answer: "Because the 20% was applied to the lower, net price. 20% of 120 is 24, but the VAT that was added was only 20." },
      { question: "Can I use this for sales tax in the US?", answer: "The arithmetic is the same for tax added to a price, so you can enter a custom rate. Sales tax rules vary by state and city and are not modelled." },
      { question: "Are the country rates always current?", answer: "No. They are standard rates listed for convenience. Always check the current rate and whether a reduced or zero rate applies to your goods." },
    ],
  },
};
