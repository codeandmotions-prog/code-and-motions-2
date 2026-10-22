/** Financial calculation engines (pure functions, no UI). */

export const COMPOUNDING: Record<string, { label: string; n: number }> = {
  annual: { label: "Annually", n: 1 },
  semiannual: { label: "Semi-annually", n: 2 },
  quarterly: { label: "Quarterly", n: 4 },
  monthly: { label: "Monthly", n: 12 },
  daily: { label: "Daily (365)", n: 365 },
};

/** Level payment for a fixed-rate loan. ratePerPeriod as a decimal. */
export function levelPayment(principal: number, ratePerPeriod: number, periods: number): number {
  if (periods <= 0) return NaN;
  if (ratePerPeriod === 0) return principal / periods;
  return (principal * ratePerPeriod) / (1 - Math.pow(1 + ratePerPeriod, -periods));
}

export type YearRow = {
  year: number;
  interest: number;
  principal: number;
  balance: number;
};

export type AmortResult = {
  payment: number;
  months: number;
  totalInterest: number;
  totalPaid: number;
  yearly: YearRow[];
};

/**
 * Month-by-month amortisation of a fixed-rate loan with monthly payments.
 * Payments are not rounded to cents, matching the closed-form formula.
 * `extraMonthly` is added to every payment; the loan ends when the balance
 * reaches zero.
 */
export function amortize(
  principal: number,
  annualRatePct: number,
  termMonths: number,
  extraMonthly = 0,
): AmortResult {
  const r = annualRatePct / 100 / 12;
  const payment = levelPayment(principal, r, termMonths);
  let balance = principal;
  let totalInterest = 0;
  let month = 0;
  const yearly: YearRow[] = [];
  let yi = 0;
  let yp = 0;
  const cap = termMonths + 1;
  while (balance > 1e-9 && month < cap) {
    month += 1;
    const interest = balance * r;
    let principalPaid = payment + extraMonthly - interest;
    if (principalPaid > balance || month === termMonths) principalPaid = Math.min(principalPaid, balance);
    if (month === termMonths) principalPaid = balance; // clear float residue on the last scheduled payment
    balance -= principalPaid;
    if (balance < 1e-7) balance = 0;
    totalInterest += interest;
    yi += interest;
    yp += principalPaid;
    if (month % 12 === 0 || balance === 0) {
      yearly.push({ year: Math.ceil(month / 12), interest: yi, principal: yp, balance });
      yi = 0;
      yp = 0;
    }
  }
  return {
    payment,
    months: month,
    totalInterest,
    totalPaid: principal + totalInterest,
    yearly,
  };
}

export type MortgageInput = {
  price: number;
  down: number;
  downIsPercent: boolean;
  termYears: number;
  ratePct: number;
  propertyTaxYear: number;
  insuranceYear: number;
  otherMonthly: number;
  extraMonthly: number;
};

export function mortgage(i: MortgageInput) {
  const downAmount = i.downIsPercent ? (i.price * i.down) / 100 : i.down;
  const loan = i.price - downAmount;
  const termMonths = Math.round(i.termYears * 12);
  const base = amortize(loan, i.ratePct, termMonths, 0);
  const withExtra = i.extraMonthly > 0 ? amortize(loan, i.ratePct, termMonths, i.extraMonthly) : base;
  const monthlyExtras = i.propertyTaxYear / 12 + i.insuranceYear / 12 + i.otherMonthly;
  return {
    downAmount,
    loan,
    termMonths,
    payment: base.payment,
    monthlyExtras,
    monthlyTotal: base.payment + monthlyExtras,
    base,
    withExtra,
    interestSaved: base.totalInterest - withExtra.totalInterest,
    monthsSaved: base.months - withExtra.months,
  };
}

export function deferredAmount(principal: number, annualRatePct: number, years: number, periodsPerYear: number) {
  const r = annualRatePct / 100;
  const n = periodsPerYear;
  const amount = principal * Math.pow(1 + r / n, n * years);
  return { amount, interest: amount - principal };
}

export type CompoundInput = {
  principal: number;
  monthlyContribution: number;
  annualRatePct: number;
  years: number;
  periodsPerYear: number;
  contributeAtStart: boolean;
};

/**
 * Future value with optional monthly contributions.
 * Balance grows by the effective monthly factor (1 + r/n)^(n/12), which is
 * exact when there are no contributions (and when compounding is monthly);
 * with contributions the in-between periods are an approximation that is
 * disclosed on the page.
 */
export function compoundInterest(i: CompoundInput) {
  const r = i.annualRatePct / 100;
  const n = i.periodsPerYear;
  const gm = Math.pow(1 + r / n, n / 12);
  const months = Math.round(i.years * 12);
  let bal = i.principal;
  let contributed = 0;
  const yearly: { year: number; contributed: number; interest: number; balance: number }[] = [];
  let lastBal = i.principal;
  let lastContrib = 0;
  for (let m = 1; m <= months; m++) {
    if (i.contributeAtStart) {
      bal += i.monthlyContribution;
      contributed += i.monthlyContribution;
      bal *= gm;
    } else {
      bal *= gm;
      bal += i.monthlyContribution;
      contributed += i.monthlyContribution;
    }
    if (m % 12 === 0 || m === months) {
      const yContrib = contributed - lastContrib;
      const yInterest = bal - lastBal - yContrib;
      yearly.push({
        year: Math.ceil(m / 12),
        contributed: i.principal + contributed,
        interest: yInterest,
        balance: bal,
      });
      lastBal = bal;
      lastContrib = contributed;
    }
  }
  const effectiveAnnual = Math.pow(1 + r / n, n) - 1;
  return {
    futureValue: bal,
    totalContributed: i.principal + contributed,
    interestEarned: bal - i.principal - contributed,
    effectiveAnnualPct: effectiveAnnual * 100,
    yearly,
  };
}

export function roi(invested: number, returned: number, years: number | null) {
  const gain = returned - invested;
  const roiPct = (gain / invested) * 100;
  let annualised: number | null = null;
  if (years !== null && years > 0) {
    annualised = (Math.pow(returned / invested, 1 / years) - 1) * 100;
  }
  return { gain, roiPct, annualisedPct: annualised };
}

export function vatFromNet(net: number, ratePct: number) {
  const vat = (net * ratePct) / 100;
  return { net, vat, gross: net + vat, ratePct };
}

export function vatFromGross(gross: number, ratePct: number) {
  const net = gross / (1 + ratePct / 100);
  return { net, vat: gross - net, gross, ratePct };
}

export function vatRateFromAmounts(net: number, gross: number) {
  const ratePct = ((gross - net) / net) * 100;
  return { net, vat: gross - net, gross, ratePct };
}

export const VAT_PRESETS: { id: string; label: string; rate: number }[] = [
  { id: "gb", label: "United Kingdom – standard rate", rate: 20 },
  { id: "fr", label: "France – standard rate", rate: 20 },
  { id: "es", label: "Spain – standard rate", rate: 21 },
  { id: "de", label: "Germany – standard rate", rate: 19 },
  { id: "it", label: "Italy – standard rate", rate: 22 },
  { id: "ie", label: "Ireland – standard rate", rate: 23 },
  { id: "nl", label: "Netherlands – standard rate", rate: 21 },
];
