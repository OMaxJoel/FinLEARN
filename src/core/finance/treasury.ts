/**
 * FINLEARN IMMERSION 2026 - Moteur de Gestion & Prévision de Trésorerie Opérationnelle
 * Conforme au référentiel TRES-01 & TRES-02 : Plan à 6 mois, échéanciers, impasses et stress testing.
 */

export interface MonthlyCashFlow {
  monthIndex: number; // 1 à 6
  monthName: string;  // ex: 'Janvier', 'Février', ...
  // Encaissements
  cashSales: number;        // Ventes comptant
  receivablesCollected: number; // Règlements clients à terme (30j/60j)
  otherInflows: number;     // Emprunts, remboursements, subventions
  totalInflows: number;
  // Décaissements
  supplierPayments: number; // Règlements fournisseurs (30j)
  salariesNet: number;      // Rémunérations nettes du personnel
  socialSecurityCNPS: number; // Cotisations sociales CNPS (part patronale + ouvrière)
  taxesAndDuties: number;   // TVA à reverser, acomptes IS, taxes locales
  operatingExpenses: number;// Loyers, électricité, carburant, entretiens
  loanRepayments: number;   // Amortissements d'emprunts financiers
  capexInvestments: number; // Acquisitions d'immobilisations
  totalOutflows: number;
  // Soldes
  netMonthlyChange: number; // totalInflows - totalOutflows
  closingCashBalance: number; // Solde fin de mois
  isDeficit: boolean;       // closingCashBalance < 0
  overdraftUsed: number;    // Montant du découvert bancaire utilisé
  overdraftLimitExceeded: boolean; // Dépassement de la ligne autorisée
}

export interface TreasuryPlanInput {
  initialCash: number;          // Trésorerie d'ouverture (Banque + Caisse)
  overdraftFacility: number;    // Ligne de découvert bancaire autorisée (ex: 10 000 000 FCFA)
  annualOverdraftRate: number;  // Taux annuel d'agios (ex: 12%)
  months: {
    monthName: string;
    forecastTurnoverTTC: number; // CA TTC prévisionnel
    cashSalesRatio: number;      // % payé comptant (ex: 0.3 = 30%)
    credit30dRatio: number;      // % payé à 30 jours (ex: 0.5 = 50%)
    credit60dRatio: number;      // % payé à 60 jours (ex: 0.2 = 20%)
    forecastPurchasesTTC: number;// Achats TTC prévisionnels
    salariesNet: number;
    operatingExpenses: number;
    taxesAndDuties: number;
    loanRepayment: number;
    capexInvestment?: number;
    otherInflow?: number;
  }[];
  // Paramètres de Stress Test facultatifs
  stressTest?: {
    customerDefaultOrDelayRatio?: number; // % des règlements clients retardés d'un mois (0 à 0.5)
    salesShockRatio?: number;             // Choc de baisse des ventes (-0.15 = -15%)
    purchasesSurgeRatio?: number;         // Choc d'inflation sur les achats (+0.10 = +10%)
  };
}

export interface TreasuryPlanResult {
  monthlyCashFlows: MonthlyCashFlow[];
  summary: {
    initialCash: number;
    finalCash: number;
    lowestCashPoint: number;       // Creux maximal de trésorerie (Worst Dip)
    lowestCashMonth: string;
    totalInflows6Months: number;
    totalOutflows6Months: number;
    totalAgiosCost: number;        // Coût total estimé des agios de découvert
    monthsInDeficit: number;       // Nombre de mois en trésorerie négative
    isCessationRisk: boolean;      // Vrai si le découvert dépasse la limite autorisée
    recommendedAction: string;
  };
}

export function computeTreasuryPlan(input: TreasuryPlanInput): TreasuryPlanResult {
  const monthsCount = Math.min(6, input.months.length);
  const flows: MonthlyCashFlow[] = [];

  let currentCash = input.initialCash;
  let totalAgios = 0;
  let lowestCash = input.initialCash;
  let lowestMonth = input.months[0]?.monthName ?? 'Mois 1';
  let deficitMonthsCount = 0;
  let cessationRisk = false;
  let totalInflowsSum = 0;
  let totalOutflowsSum = 0;

  const stressDelay = input.stressTest?.customerDefaultOrDelayRatio ?? 0;
  const salesShock = input.stressTest?.salesShockRatio ?? 0;
  const costShock = input.stressTest?.purchasesSurgeRatio ?? 0;

  // Calcul des ventes et achats effectifs après choc
  const adjustedTurnover: number[] = [];
  const adjustedPurchases: number[] = [];

  for (let i = 0; i < monthsCount; i++) {
    const rawSales = input.months[i].forecastTurnoverTTC * (1 + salesShock);
    adjustedTurnover.push(Math.max(0, Math.round(rawSales)));

    const rawPurchases = input.months[i].forecastPurchasesTTC * (1 + costShock);
    adjustedPurchases.push(Math.max(0, Math.round(rawPurchases)));
  }

  // File d'attente des créances clients à encaisser
  // Créances nées les mois antérieurs :
  const pendingReceivables: { amount: number; dueMonth: number }[] = [];

  for (let m = 0; m < monthsCount; m++) {
    const mConfig = input.months[m];
    const ca = adjustedTurnover[m];

    const cashPart = Math.round(ca * mConfig.cashSalesRatio);
    const credit30 = Math.round(ca * mConfig.credit30dRatio);
    const credit60 = Math.round(ca * mConfig.credit60dRatio);

    // Si stress de retard, une part glisse au mois suivant
    const delayedPart = Math.round((credit30 + credit60) * stressDelay);
    const effectiveCredit30 = Math.max(0, credit30 - Math.round(delayedPart * 0.6));
    const effectiveCredit60 = Math.max(0, credit60 - Math.round(delayedPart * 0.4));

    if (m + 1 < monthsCount) {
      pendingReceivables.push({ amount: effectiveCredit30, dueMonth: m + 1 });
    }
    if (m + 2 < monthsCount) {
      pendingReceivables.push({ amount: effectiveCredit60, dueMonth: m + 2 });
    }
    if (delayedPart > 0 && m + 2 < monthsCount) {
      pendingReceivables.push({ amount: delayedPart, dueMonth: m + 2 });
    }

    // Encaissements reçus ce mois-ci
    let collectedReceivables = 0;
    for (const rec of pendingReceivables) {
      if (rec.dueMonth === m) {
        collectedReceivables += rec.amount;
      }
    }

    // Pour le mois 0, on simule des créances préexistantes de l'exercice précédent
    if (m === 0) {
      collectedReceivables += Math.round(ca * 0.4); // Créances d'ouverture échues
    }

    const otherIn = mConfig.otherInflow ?? 0;
    const totalIn = cashPart + collectedReceivables + otherIn;

    // Décaissements
    // Achats réglés à 30 jours (pour mois 0, achats antérieurs estimés)
    const supplierPay = m === 0 ? Math.round(adjustedPurchases[0] * 0.9) : adjustedPurchases[m - 1];
    const cnps = Math.round(mConfig.salariesNet * 0.22); // ~22% charges sociales CI
    const capex = mConfig.capexInvestment ?? 0;

    const totalOut =
      supplierPay +
      mConfig.salariesNet +
      cnps +
      mConfig.taxesAndDuties +
      mConfig.operatingExpenses +
      mConfig.loanRepayment +
      capex;

    const netChange = totalIn - totalOut;
    currentCash += netChange;

    const isDeficit = currentCash < 0;
    const overdraftUsed = isDeficit ? Math.abs(currentCash) : 0;
    const overdraftExceeded = overdraftUsed > input.overdraftFacility;

    if (isDeficit) {
      deficitMonthsCount++;
      // Calcul d'agios mensuel (taux annuel / 12)
      const monthlyAgios = Math.round(overdraftUsed * (input.annualOverdraftRate / 100 / 12));
      totalAgios += monthlyAgios;
    }

    if (overdraftExceeded) {
      cessationRisk = true;
    }

    if (currentCash < lowestCash) {
      lowestCash = currentCash;
      lowestMonth = mConfig.monthName;
    }

    totalInflowsSum += totalIn;
    totalOutflowsSum += totalOut;

    flows.push({
      monthIndex: m + 1,
      monthName: mConfig.monthName,
      cashSales: cashPart,
      receivablesCollected: collectedReceivables,
      otherInflows: otherIn,
      totalInflows: totalIn,
      supplierPayments: supplierPay,
      salariesNet: mConfig.salariesNet,
      socialSecurityCNPS: cnps,
      taxesAndDuties: mConfig.taxesAndDuties,
      operatingExpenses: mConfig.operatingExpenses,
      loanRepayments: mConfig.loanRepayment,
      capexInvestments: capex,
      totalOutflows: totalOut,
      netMonthlyChange: netChange,
      closingCashBalance: currentCash,
      isDeficit,
      overdraftUsed,
      overdraftLimitExceeded: overdraftExceeded,
    });
  }

  // Diagnostic et recommandation managériale
  let recommendedAction = 'Trésorerie saine et équilibrée sur l\'ensemble du semestre.';
  if (cessationRisk) {
    recommendedAction = `ALERTE CRITIQUE : Impasse financière en ${lowestMonth}. Le creux de trésorerie (${lowestCash.toLocaleString('fr-FR')} FCFA) excède la ligne de découvert autorisée (${input.overdraftFacility.toLocaleString('fr-FR')} FCFA). Actions urgentes : Mobilisation de créances (escompte ou cession Dailly), négociation d'un report d'échéance fournisseur et décalage des investissements.`;
  } else if (deficitMonthsCount > 0) {
    recommendedAction = `Tensions ponctuelles : La trésorerie passe en négatif pendant ${deficitMonthsCount} mois avec un creux à ${lowestCash.toLocaleString('fr-FR')} FCFA en ${lowestMonth}. Le découvert autorisé absorbe le choc mais génère environ ${totalAgios.toLocaleString('fr-FR')} FCFA d'agios. Accélérer les relances clients pour limiter le coût financier.`;
  }

  return {
    monthlyCashFlows: flows,
    summary: {
      initialCash: input.initialCash,
      finalCash: currentCash,
      lowestCashPoint: lowestCash,
      lowestCashMonth: lowestMonth,
      totalInflows6Months: totalInflowsSum,
      totalOutflows6Months: totalOutflowsSum,
      totalAgiosCost: totalAgios,
      monthsInDeficit: deficitMonthsCount,
      isCessationRisk: cessationRisk,
      recommendedAction,
    },
  };
}
