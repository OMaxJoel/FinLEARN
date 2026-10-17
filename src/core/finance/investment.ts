export interface LoanScheduleLine {
  period: number;
  initialBalance: number;
  payment: number;        // Annuité
  interest: number;       // Part d'intérêt
  principal: number;      // Amortissement du capital
  finalBalance: number;   // Capital restant dû
}

export interface InvestmentEvaluationResult {
  npv: number;           // Valeur Actuelle Nette (VAN)
  irr: number | null;    // Taux de Rentabilité Interne (TRI) en %
  paybackYears: number;  // Délai de récupération du capital investi en années
  profitabilityIndex: number; // Indice de profitabilité (Total flux act. / I0)
  isAccepted: boolean;   // VAN > 0
}

export interface BreakevenResult {
  turnover: number;
  fixedCosts: number;
  variableCosts: number;
  variableCostRatio: number;   // CV / CA
  contributionMargin: number;  // MCV = CA - CV
  contributionMarginRatio: number; // TMCV = MCV / CA
  breakevenRevenue: number;    // Seuil de rentabilité en FCFA = CF / TMCV
  breakevenUnits?: number;     // Seuil en volume
  marginOfSafety: number;      // Marge de sécurité = CA - SR
  safetyIndex: number;         // Indice de sécurité = (CA - SR) / CA (%)
  breakevenDays: number;       // Point mort en jours = (SR / CA) * 360
  operatingLeverage: number;   // MCV / Résultat d'exploitation
}

/**
 * Calcul de l'échéancier d'emprunt à annuités constantes.
 */
export function computeLoanSchedule(
  principalAmount: number, // Capital emprunté (FCFA)
  annualRatePercent: number, // Taux annuel en % (ex: 7.5 pour 7.5%)
  durationYears: number, // Durée en années
  periodicity: 'ANNUAL' | 'MONTHLY' = 'ANNUAL'
): {
  schedule: LoanScheduleLine[];
  totalInterest: number;
  totalPayment: number;
} {
  const periods = periodicity === 'MONTHLY' ? durationYears * 12 : durationYears;
  const periodicRate = periodicity === 'MONTHLY' ? (annualRatePercent / 100) / 12 : annualRatePercent / 100;

  // Formule de l'annuité constante : A = C * i / (1 - (1+i)^-n)
  let constantPayment = 0;
  if (periodicRate === 0) {
    constantPayment = principalAmount / periods;
  } else {
    constantPayment = principalAmount * (periodicRate / (1 - Math.pow(1 + periodicRate, -periods)));
  }

  const schedule: LoanScheduleLine[] = [];
  let remaining = principalAmount;
  let totalInterest = 0;
  let totalPayment = 0;

  for (let p = 1; p <= periods; p++) {
    const interest = Math.round(remaining * periodicRate);
    let principal = Math.round(constantPayment - interest);

    // Ajustement de la dernière période pour solder rigoureusement à 0
    if (p === periods || principal > remaining) {
      principal = remaining;
    }

    const actualPayment = principal + interest;
    const finalBalance = Math.max(0, remaining - principal);

    schedule.push({
      period: p,
      initialBalance: Math.round(remaining),
      payment: actualPayment,
      interest,
      principal,
      finalBalance,
    });

    totalInterest += interest;
    totalPayment += actualPayment;
    remaining = finalBalance;
  }

  return {
    schedule,
    totalInterest,
    totalPayment,
  };
}

/**
 * Calcul de la VAN (Valeur Actuelle Nette).
 */
export function computeNPV(discountRatePercent: number, initialInvestment: number, cashFlows: number[]): number {
  const r = discountRatePercent / 100;
  let npv = -initialInvestment;

  for (let t = 0; t < cashFlows.length; t++) {
    npv += cashFlows[t] / Math.pow(1 + r, t + 1);
  }

  return Math.round(npv);
}

/**
 * Calcul du TRI (Taux de Rentabilité Interne) par la méthode itérative de Newton-Raphson.
 */
export function computeIRR(initialInvestment: number, cashFlows: number[]): number | null {
  // Fonction VAN(r)
  const f = (r: number): number => {
    let val = -initialInvestment;
    for (let t = 0; t < cashFlows.length; t++) {
      val += cashFlows[t] / Math.pow(1 + r, t + 1);
    }
    return val;
  };

  // Dérivée première f'(r) = sum( - (t+1)*CF_t / (1+r)^(t+2) )
  const fPrime = (r: number): number => {
    let val = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      val -= ((t + 1) * cashFlows[t]) / Math.pow(1 + r, t + 2);
    }
    return val;
  };

  // Point de départ
  let rate = 0.1; // 10%
  const maxIterations = 100;
  const tolerance = 1e-6;

  for (let i = 0; i < maxIterations; i++) {
    const y = f(rate);
    const dy = fPrime(rate);

    if (Math.abs(dy) < 1e-12) {
      // Dérivée trop proche de zéro, pas de convergence
      return null;
    }

    const nextRate = rate - y / dy;

    if (Math.abs(nextRate - rate) < tolerance) {
      // Convergence atteinte
      const irrPercent = Math.round(nextRate * 10000) / 100;
      return irrPercent;
    }

    rate = nextRate;

    // Garde-fou sur les taux aberrants (< -90% ou > 500%)
    if (rate < -0.9 || rate > 5.0) {
      return null;
    }
  }

  return null;
}

/**
 * Calcul du Délai de Récupération du Capital Investi (Payback period non actualisé).
 */
export function computePayback(initialInvestment: number, cashFlows: number[]): number {
  let cumulative = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    const previous = cumulative;
    cumulative += cashFlows[i];

    if (cumulative >= initialInvestment) {
      const remainingNeeded = initialInvestment - previous;
      const fractionOfYear = cashFlows[i] > 0 ? remainingNeeded / cashFlows[i] : 0;
      return Math.round((i + fractionOfYear) * 10) / 10;
    }
  }

  return cashFlows.length; // Non récupéré dans l'horizon d'étude
}

/**
 * Évaluation globale d'un projet d'investissement.
 */
export function evaluateInvestment(
  initialInvestment: number,
  cashFlows: number[],
  discountRatePercent: number
): InvestmentEvaluationResult {
  const npv = computeNPV(discountRatePercent, initialInvestment, cashFlows);
  const irr = computeIRR(initialInvestment, cashFlows);
  const paybackYears = computePayback(initialInvestment, cashFlows);

  // Somme des flux actualisés
  const totalDiscountedFlows = npv + initialInvestment;
  const profitabilityIndex = initialInvestment > 0 ? Math.round((totalDiscountedFlows / initialInvestment) * 100) / 100 : 0;

  return {
    npv,
    irr,
    paybackYears,
    profitabilityIndex,
    isAccepted: npv > 0,
  };
}

/**
 * Calcul du seuil de rentabilité (Point mort) et marge de sécurité.
 */
export function computeBreakeven(
  turnover: number,
  fixedCosts: number,
  variableCosts: number,
  unitPrice?: number
): BreakevenResult {
  const ca = Math.max(1, turnover);
  const contributionMargin = ca - variableCosts;
  const contributionMarginRatio = contributionMargin / ca;
  const variableCostRatio = variableCosts / ca;

  const breakevenRevenue = contributionMarginRatio > 0 ? Math.round(fixedCosts / contributionMarginRatio) : 0;
  const marginOfSafety = Math.round(ca - breakevenRevenue);
  const safetyIndex = ca > 0 ? Math.round((marginOfSafety / ca) * 1000) / 10 : 0;
  const breakevenDays = ca > 0 ? Math.round((breakevenRevenue / ca) * 360) : 360;

  const operatingIncome = contributionMargin - fixedCosts;
  const operatingLeverage = operatingIncome > 0 ? Math.round((contributionMargin / operatingIncome) * 10) / 10 : 0;

  const breakevenUnits = unitPrice && unitPrice > 0 ? Math.round(breakevenRevenue / unitPrice) : undefined;

  return {
    turnover: ca,
    fixedCosts,
    variableCosts,
    variableCostRatio: Math.round(variableCostRatio * 1000) / 10,
    contributionMargin,
    contributionMarginRatio: Math.round(contributionMarginRatio * 1000) / 10,
    breakevenRevenue,
    breakevenUnits,
    marginOfSafety,
    safetyIndex,
    breakevenDays,
    operatingLeverage,
  };
}

/**
 * Calcul du Délai de Récupération Actualisé (Point Mort Actualisé / Discounted Payback).
 */
export function computeDiscountedPayback(
  initialInvestment: number,
  cashFlows: number[],
  discountRatePercent: number
): number {
  const r = discountRatePercent / 100;
  let cumulative = 0;

  for (let i = 0; i < cashFlows.length; i++) {
    const discountedFlow = cashFlows[i] / Math.pow(1 + r, i + 1);
    const previous = cumulative;
    cumulative += discountedFlow;

    if (cumulative >= initialInvestment) {
      const remainingNeeded = initialInvestment - previous;
      const fractionOfYear = discountedFlow > 0 ? remainingNeeded / discountedFlow : 0;
      return Math.round((i + fractionOfYear) * 10) / 10;
    }
  }

  return cashFlows.length; // Non amorti dans l'horizon
}

/**
 * Calcul du Taux de Fisher (taux d'indifférence où VAN(A) = VAN(B)).
 * Correspond au TRI du projet différentiel (Projet A - Projet B).
 */
export function computeFisherCrossoverRate(
  projectA: { initialInvestment: number; cashFlows: number[] },
  projectB: { initialInvestment: number; cashFlows: number[] }
): number | null {
  const diffInitial = projectA.initialInvestment - projectB.initialInvestment;
  const maxLen = Math.max(projectA.cashFlows.length, projectB.cashFlows.length);
  const diffFlows: number[] = [];

  for (let t = 0; t < maxLen; t++) {
    const cfA = projectA.cashFlows[t] || 0;
    const cfB = projectB.cashFlows[t] || 0;
    diffFlows.push(cfA - cfB);
  }

  // Si le flux initial différentiel est négatif, on inverse tout pour garder un I0 positif
  if (diffInitial < 0) {
    return computeIRR(-diffInitial, diffFlows.map((f) => -f));
  } else if (diffInitial > 0) {
    return computeIRR(diffInitial, diffFlows);
  }

  return null;
}

export interface WACCResult {
  waccPercent: number;           // Coût Moyen Pondéré du Capital en %
  equityWeight: number;          // Pondération Capitaux Propres (0-1)
  debtWeight: number;            // Pondération Dettes Financières (0-1)
  afterTaxCostOfDebtPercent: number; // Coût de la dette après impôt
}

/**
 * Calcul du Coût Moyen Pondéré du Capital (CMPC / WACC).
 * CMPC = (CP / V) * k_cp + (D / V) * k_d * (1 - T_IS)
 */
export function computeWACC(
  equityValue: number,
  costOfEquityPercent: number,
  debtValue: number,
  costOfDebtPercent: number,
  corporateTaxRatePercent: number = 25 // 25% taux IS standard Côte d'Ivoire / UEMOA
): WACCResult {
  const totalValue = equityValue + debtValue;
  if (totalValue <= 0) {
    return {
      waccPercent: 0,
      equityWeight: 0,
      debtWeight: 0,
      afterTaxCostOfDebtPercent: 0,
    };
  }

  const equityWeight = equityValue / totalValue;
  const debtWeight = debtValue / totalValue;
  const afterTaxCostOfDebtPercent = costOfDebtPercent * (1 - corporateTaxRatePercent / 100);

  const wacc =
    equityWeight * costOfEquityPercent + debtWeight * afterTaxCostOfDebtPercent;

  return {
    waccPercent: Math.round(wacc * 100) / 100,
    equityWeight: Math.round(equityWeight * 1000) / 1000,
    debtWeight: Math.round(debtWeight * 1000) / 1000,
    afterTaxCostOfDebtPercent: Math.round(afterTaxCostOfDebtPercent * 100) / 100,
  };
}

export interface SensitivityMatrixResult {
  discountRates: number[];
  flowMultipliers: number[];
  matrix: number[][]; // [rateIdx][multIdx] = NPV
}

/**
 * Génération de la matrice de sensibilité 2D (Taux d'actualisation vs Variation des cash-flows).
 */
export function computeSensitivityMatrix(
  initialInvestment: number,
  baseCashFlows: number[],
  discountRates: number[] = [8, 10, 12, 14, 16],
  flowMultipliers: number[] = [0.8, 0.9, 1.0, 1.1, 1.2]
): SensitivityMatrixResult {
  const matrix: number[][] = [];

  for (const rate of discountRates) {
    const row: number[] = [];
    for (const mult of flowMultipliers) {
      const scaledFlows = baseCashFlows.map((cf) => Math.round(cf * mult));
      const npv = computeNPV(rate, initialInvestment, scaledFlows);
      row.push(npv);
    }
    matrix.push(row);
  }

  return {
    discountRates,
    flowMultipliers,
    matrix,
  };
}

export interface ProjectRankingItem {
  id: string;
  name: string;
  initialInvestment: number;
  npv: number;
  irr: number | null;
  profitabilityIndex: number;
  payback: number;
  discountedPayback: number;
  selected: boolean;
}

/**
 * Arbitrage et sélection de projets sous contrainte budgétaire (Rationnement du Capital).
 * Priorisation par l'Indice de Profitabilité (IP = 1 + VAN / I0).
 */
export function rankProjectsUnderCapitalRationing(
  projects: Array<{
    id: string;
    name: string;
    initialInvestment: number;
    cashFlows: number[];
    discountRatePercent: number;
  }>,
  budgetLimit: number
): {
  selectedProjects: string[];
  totalInvestment: number;
  totalNPV: number;
  ranking: ProjectRankingItem[];
} {
  const evaluated: ProjectRankingItem[] = projects.map((p) => {
    const npv = computeNPV(p.discountRatePercent, p.initialInvestment, p.cashFlows);
    const irr = computeIRR(p.initialInvestment, p.cashFlows);
    const payback = computePayback(p.initialInvestment, p.cashFlows);
    const discountedPayback = computeDiscountedPayback(p.initialInvestment, p.cashFlows, p.discountRatePercent);
    const totalDiscountedFlows = npv + p.initialInvestment;
    const profitabilityIndex =
      p.initialInvestment > 0 ? Math.round((totalDiscountedFlows / p.initialInvestment) * 100) / 100 : 0;

    return {
      id: p.id,
      name: p.name,
      initialInvestment: p.initialInvestment,
      npv,
      irr,
      profitabilityIndex,
      payback,
      discountedPayback,
      selected: false,
    };
  });

  // Tri par Indice de Profitabilité décroissant (règle optimale en cas de rationnement du capital)
  evaluated.sort((a, b) => b.profitabilityIndex - a.profitabilityIndex);

  let currentBudgetSpent = 0;
  let totalNPV = 0;
  const selectedProjects: string[] = [];

  for (const item of evaluated) {
    if (item.npv > 0 && currentBudgetSpent + item.initialInvestment <= budgetLimit) {
      item.selected = true;
      currentBudgetSpent += item.initialInvestment;
      totalNPV += item.npv;
      selectedProjects.push(item.id);
    }
  }

  return {
    selectedProjects,
    totalInvestment: currentBudgetSpent,
    totalNPV,
    ranking: evaluated,
  };
}
