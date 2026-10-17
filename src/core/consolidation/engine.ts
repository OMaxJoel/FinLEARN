export type GroupCurrency = 'XOF' | 'EUR' | 'USD';

export interface EntityBalanceSheet {
  fixedAssets: number;
  currentAssets: number;
  cashAndEquivalents: number;
  intercompanyReceivables: Record<string, number>; // créances sur d'autres filiales
  equity: number;
  financialDebts: number;
  currentLiabilities: number;
  intercompanyPayables: Record<string, number>; // dettes envers d'autres filiales
}

export interface EntityIncomeStatement {
  revenue: number;
  operatingExpenses: number;
  operatingIncome: number;
  financialResult: number;
  incomeTax: number;
  netIncome: number;
  intercompanySales: Record<string, number>; // ventes intragroupe
}

export interface EntityData {
  id: string;
  name: string;
  country: string;
  currency: GroupCurrency;
  ownershipPercentage: number; // 0 à 100%
  balanceSheet: EntityBalanceSheet;
  incomeStatement: EntityIncomeStatement;
}

export interface ExchangeRates {
  // Taux de conversion : 1 unité de devise = X unités de XOF (FCFA)
  // XOF est la monnaie pivot standard de la zone UEMOA (1 EUR = 655.957 XOF fixe)
  closingRates: Record<GroupCurrency, number>; // Cours de clôture pour le bilan
  averageRates: Record<GroupCurrency, number>; // Cours moyen pour le compte de résultat
}

export interface ConvertedEntity {
  id: string;
  name: string;
  country: string;
  originalCurrency: GroupCurrency;
  reportingCurrency: GroupCurrency;
  ownershipPercentage: number;
  balanceSheet: {
    totalAssets: number;
    fixedAssets: number;
    currentAssets: number;
    cashAndEquivalents: number;
    intercompanyReceivables: Record<string, number>;
    totalIntercompanyReceivables: number;
    equity: number;
    financialDebts: number;
    currentLiabilities: number;
    intercompanyPayables: Record<string, number>;
    totalIntercompanyPayables: number;
    translationReserve: number; // Écart de conversion bilanciel
    totalEquityAndLiabilities: number;
  };
  incomeStatement: {
    revenue: number;
    operatingExpenses: number;
    operatingIncome: number;
    financialResult: number;
    incomeTax: number;
    netIncome: number;
    intercompanySales: Record<string, number>;
    totalIntercompanySales: number;
  };
}

export interface IntercompanyDiscrepancy {
  entityFrom: string;
  entityTo: string;
  receivableDeclared: number;
  payableDeclared: number;
  difference: number; // Écart de réconciliation intragroupe
}

export interface ConsolidatedGroupResult {
  reportingCurrency: GroupCurrency;
  entitiesConverted: ConvertedEntity[];
  intercompanyDiscrepancies: IntercompanyDiscrepancy[];
  totalIntercompanyReceivablesEliminated: number;
  totalIntercompanyRevenueEliminated: number;
  aggregatedBalanceSheet: {
    fixedAssets: number;
    currentAssets: number;
    cashAndEquivalents: number;
    totalAssets: number;
    groupEquity: number;
    minorityInterestsEquity: number;
    totalConsolidatedEquity: number;
    totalTranslationReserve: number;
    financialDebts: number;
    currentLiabilities: number;
    totalEquityAndLiabilities: number;
    isBalanced: boolean;
  };
  aggregatedIncomeStatement: {
    consolidatedRevenue: number;
    consolidatedOperatingExpenses: number;
    consolidatedOperatingIncome: number;
    consolidatedFinancialResult: number;
    consolidatedIncomeTax: number;
    consolidatedNetIncome: number;
    groupShareNetIncome: number;
    minorityShareNetIncome: number;
    operatingMarginPercent: number;
  };
  groupKPIs: {
    netDebt: number; // Dettes financières - Trésorerie active
    gearingRatioPercent: number; // Dette nette / Capitaux propres consolidés (%)
    returnOnConsolidatedEquityPercent: number; // Résultat net groupe / Capitaux propres groupe (%)
    operatingMarginPercent: number; // Marge d'exploitation consolidée (%)
  };
}

/**
 * Taux de change officiels de référence pour l'exercice
 */
export const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
  closingRates: {
    XOF: 1,
    EUR: 655.957, // Parité fixe zone Franc CFA
    USD: 605.5,   // Cours de clôture USD/XOF
  },
  averageRates: {
    XOF: 1,
    EUR: 655.957,
    USD: 595.0,   // Cours moyen de l'exercice
  },
};

/**
 * Conversion déterministe des états financiers d'une entité dans la devise de reporting (Méthode du cours de clôture - IAS 21 / SYSCOHADA)
 */
export function convertEntity(
  entity: EntityData,
  rates: ExchangeRates,
  reportingCurrency: GroupCurrency = 'XOF'
): ConvertedEntity {
  // Facteur pour passer de la devise locale vers XOF
  const closingFactorToXOF = rates.closingRates[entity.currency] || 1;
  const avgFactorToXOF = rates.averageRates[entity.currency] || 1;

  // Facteur pour passer de XOF vers la devise de reporting cible
  const reportingClosingFactor = rates.closingRates[reportingCurrency] || 1;
  const reportingAvgFactor = rates.averageRates[reportingCurrency] || 1;

  const toRepClosing = (amount: number) =>
    Math.round((amount * closingFactorToXOF) / reportingClosingFactor);
  const toRepAvg = (amount: number) =>
    Math.round((amount * avgFactorToXOF) / reportingAvgFactor);

  // Conversion du Bilan (Cours de clôture)
  const fixedAssets = toRepClosing(entity.balanceSheet.fixedAssets);
  const currentAssets = toRepClosing(entity.balanceSheet.currentAssets);
  const cashAndEquivalents = toRepClosing(entity.balanceSheet.cashAndEquivalents);

  const intercompanyReceivables: Record<string, number> = {};
  let totalIntercompanyReceivables = 0;
  for (const [key, val] of Object.entries(entity.balanceSheet.intercompanyReceivables || {})) {
    const convertedVal = toRepClosing(val);
    intercompanyReceivables[key] = convertedVal;
    totalIntercompanyReceivables += convertedVal;
  }

  const totalAssets = fixedAssets + currentAssets + cashAndEquivalents + totalIntercompanyReceivables;

  // Passif et Capitaux Propres
  const equityHistorical = toRepClosing(entity.balanceSheet.equity);
  const financialDebts = toRepClosing(entity.balanceSheet.financialDebts);
  const currentLiabilities = toRepClosing(entity.balanceSheet.currentLiabilities);

  const intercompanyPayables: Record<string, number> = {};
  let totalIntercompanyPayables = 0;
  for (const [key, val] of Object.entries(entity.balanceSheet.intercompanyPayables || {})) {
    const convertedVal = toRepClosing(val);
    intercompanyPayables[key] = convertedVal;
    totalIntercompanyPayables += convertedVal;
  }

  // Écart de conversion bilanciel (Translation Reserve) assurant l'équilibre de conversion
  const totalLiabilitiesAndHistoricalEquity =
    equityHistorical + financialDebts + currentLiabilities + totalIntercompanyPayables;
  const translationReserve = totalAssets - totalLiabilitiesAndHistoricalEquity;
  const totalEquityAndLiabilities = totalLiabilitiesAndHistoricalEquity + translationReserve;

  // Conversion du Compte de Résultat (Cours moyen de la période)
  const revenue = toRepAvg(entity.incomeStatement.revenue);
  const operatingExpenses = toRepAvg(entity.incomeStatement.operatingExpenses);
  const operatingIncome = revenue - operatingExpenses;
  const financialResult = toRepAvg(entity.incomeStatement.financialResult);
  const incomeTax = toRepAvg(entity.incomeStatement.incomeTax);
  const netIncome = operatingIncome + financialResult - incomeTax;

  const intercompanySales: Record<string, number> = {};
  let totalIntercompanySales = 0;
  for (const [key, val] of Object.entries(entity.incomeStatement.intercompanySales || {})) {
    const convertedSale = toRepAvg(val);
    intercompanySales[key] = convertedSale;
    totalIntercompanySales += convertedSale;
  }

  return {
    id: entity.id,
    name: entity.name,
    country: entity.country,
    originalCurrency: entity.currency,
    reportingCurrency,
    ownershipPercentage: entity.ownershipPercentage,
    balanceSheet: {
      totalAssets,
      fixedAssets,
      currentAssets,
      cashAndEquivalents,
      intercompanyReceivables,
      totalIntercompanyReceivables,
      equity: equityHistorical,
      financialDebts,
      currentLiabilities,
      intercompanyPayables,
      totalIntercompanyPayables,
      translationReserve,
      totalEquityAndLiabilities,
    },
    incomeStatement: {
      revenue,
      operatingExpenses,
      operatingIncome,
      financialResult,
      incomeTax,
      netIncome,
      intercompanySales,
      totalIntercompanySales,
    },
  };
}

/**
 * Consolidation globale d'un groupe multi-entités et multi-devises avec élimination des flux intragroupe.
 */
export function consolidateGroup(
  entities: EntityData[],
  rates: ExchangeRates = DEFAULT_EXCHANGE_RATES,
  options: {
    reportingCurrency?: GroupCurrency;
    eliminateIntercompany?: boolean;
  } = {}
): ConsolidatedGroupResult {
  const reportingCurrency = options.reportingCurrency || 'XOF';
  const shouldEliminate = options.eliminateIntercompany !== false;

  // 1. Conversion de chaque entité dans la devise de reporting
  const convertedList: ConvertedEntity[] = entities.map((e) =>
    convertEntity(e, rates, reportingCurrency)
  );

  // 2. Détection des écarts de réciprocité intragroupe (Créances vs Dettes)
  const intercompanyDiscrepancies: IntercompanyDiscrepancy[] = [];
  let totalReceivablesEliminated = 0;
  let totalRevenueEliminated = 0;

  for (let i = 0; i < convertedList.length; i++) {
    for (let j = 0; j < convertedList.length; j++) {
      if (i === j) continue;
      const entA = convertedList[i];
      const entB = convertedList[j];

      const receivableFromB = entA.balanceSheet.intercompanyReceivables[entB.id] || 0;
      const payableToA = entB.balanceSheet.intercompanyPayables[entA.id] || 0;

      if (receivableFromB > 0 || payableToA > 0) {
        // Enregistrement d'une seule entrée par paire (quand i < j)
        if (i < j) {
          const diff = Math.abs(receivableFromB - payableToA);
          if (diff > 0) {
            intercompanyDiscrepancies.push({
              entityFrom: entA.name,
              entityTo: entB.name,
              receivableDeclared: receivableFromB,
              payableDeclared: payableToA,
              difference: diff,
            });
          }
        }
      }
    }
  }

  // Somme totale des créances et dettes réciproques éliminées (au montant réciproque vérifié)
  if (shouldEliminate) {
    for (let i = 0; i < convertedList.length; i++) {
      for (let j = i + 1; j < convertedList.length; j++) {
        const entA = convertedList[i];
        const entB = convertedList[j];

        const recA_B = entA.balanceSheet.intercompanyReceivables[entB.id] || 0;
        const payB_A = entB.balanceSheet.intercompanyPayables[entA.id] || 0;
        const matchA_B = Math.min(recA_B, payB_A);

        const recB_A = entB.balanceSheet.intercompanyReceivables[entA.id] || 0;
        const payA_B = entA.balanceSheet.intercompanyPayables[entB.id] || 0;
        const matchB_A = Math.min(recB_A, payA_B);

        totalReceivablesEliminated += (matchA_B + matchB_A);
      }
    }
    for (const ent of convertedList) {
      totalRevenueEliminated += ent.incomeStatement.totalIntercompanySales;
    }
  }

  // 3. Agrégation du Bilan Consolidé
  let aggFixedAssets = 0;
  let aggCurrentAssets = 0;
  let aggCash = 0;
  let aggReceivables = 0;

  let aggHistoricalEquity = 0;
  let aggDebts = 0;
  let aggCurrentLiabilities = 0;
  let aggPayables = 0;
  let aggTranslationReserve = 0;

  let totalGroupShareEquity = 0;
  let totalMinorityShareEquity = 0;

  for (const ent of convertedList) {
    aggFixedAssets += ent.balanceSheet.fixedAssets;
    aggCurrentAssets += ent.balanceSheet.currentAssets;
    aggCash += ent.balanceSheet.cashAndEquivalents;
    aggReceivables += ent.balanceSheet.totalIntercompanyReceivables;

    aggDebts += ent.balanceSheet.financialDebts;
    aggCurrentLiabilities += ent.balanceSheet.currentLiabilities;
    aggPayables += ent.balanceSheet.totalIntercompanyPayables;
    aggTranslationReserve += ent.balanceSheet.translationReserve;

    // Répartition Capitaux propres : Part du Groupe vs Intérêts minoritaires
    const entityEquityTotal = ent.balanceSheet.equity + ent.balanceSheet.translationReserve;
    const groupShare = (entityEquityTotal * ent.ownershipPercentage) / 100;
    const minorityShare = entityEquityTotal - groupShare;

    totalGroupShareEquity += Math.round(groupShare);
    totalMinorityShareEquity += Math.round(minorityShare);
    aggHistoricalEquity += ent.balanceSheet.equity;
  }

  const eliminatedReceivables = shouldEliminate ? totalReceivablesEliminated : 0;
  const eliminatedPayables = shouldEliminate ? totalReceivablesEliminated : 0;

  const totalAssets = aggFixedAssets + aggCurrentAssets + aggCash + (aggReceivables - eliminatedReceivables);
  const totalConsolidatedEquity = totalGroupShareEquity + totalMinorityShareEquity;
  const totalEquityAndLiabilities =
    totalConsolidatedEquity + aggDebts + aggCurrentLiabilities + (aggPayables - eliminatedPayables);

  // Vérification stricte de l'équilibre bilanciel consolidé (Actif = Passif)
  const isBalanced = Math.abs(totalAssets - totalEquityAndLiabilities) <= 10;

  // 4. Agrégation du Compte de Résultat Consolidé
  let rawConsolidatedRevenue = 0;
  let rawConsolidatedExpenses = 0;
  let rawFinancialResult = 0;
  let rawIncomeTax = 0;
  let totalGroupShareNetIncome = 0;
  let totalMinorityShareNetIncome = 0;

  for (const ent of convertedList) {
    rawConsolidatedRevenue += ent.incomeStatement.revenue;
    rawConsolidatedExpenses += ent.incomeStatement.operatingExpenses;
    rawFinancialResult += ent.incomeStatement.financialResult;
    rawIncomeTax += ent.incomeStatement.incomeTax;

    const groupIncome = (ent.incomeStatement.netIncome * ent.ownershipPercentage) / 100;
    const minorityIncome = ent.incomeStatement.netIncome - groupIncome;

    totalGroupShareNetIncome += Math.round(groupIncome);
    totalMinorityShareNetIncome += Math.round(minorityIncome);
  }

  const consolidatedRevenue = shouldEliminate
    ? rawConsolidatedRevenue - totalRevenueEliminated
    : rawConsolidatedRevenue;
  const consolidatedOperatingExpenses = shouldEliminate
    ? rawConsolidatedExpenses - totalRevenueEliminated
    : rawConsolidatedExpenses;

  const consolidatedOperatingIncome = consolidatedRevenue - consolidatedOperatingExpenses;
  const consolidatedNetIncome =
    consolidatedOperatingIncome + rawFinancialResult - rawIncomeTax;

  const operatingMarginPercent =
    consolidatedRevenue > 0
      ? Math.round((consolidatedOperatingIncome / consolidatedRevenue) * 1000) / 10
      : 0;

  // 5. KPIs Financiers de Groupe
  const netDebt = aggDebts - aggCash;
  const gearingRatioPercent =
    totalConsolidatedEquity > 0
      ? Math.round((netDebt / totalConsolidatedEquity) * 1000) / 10
      : 0;
  const returnOnConsolidatedEquityPercent =
    totalGroupShareEquity > 0
      ? Math.round((totalGroupShareNetIncome / totalGroupShareEquity) * 1000) / 10
      : 0;

  return {
    reportingCurrency,
    entitiesConverted: convertedList,
    intercompanyDiscrepancies,
    totalIntercompanyReceivablesEliminated: eliminatedReceivables,
    totalIntercompanyRevenueEliminated: totalRevenueEliminated,
    aggregatedBalanceSheet: {
      fixedAssets: aggFixedAssets,
      currentAssets: aggCurrentAssets,
      cashAndEquivalents: aggCash,
      totalAssets,
      groupEquity: totalGroupShareEquity,
      minorityInterestsEquity: totalMinorityShareEquity,
      totalConsolidatedEquity,
      totalTranslationReserve: aggTranslationReserve,
      financialDebts: aggDebts,
      currentLiabilities: aggCurrentLiabilities,
      totalEquityAndLiabilities,
      isBalanced,
    },
    aggregatedIncomeStatement: {
      consolidatedRevenue,
      consolidatedOperatingExpenses,
      consolidatedOperatingIncome,
      consolidatedFinancialResult: rawFinancialResult,
      consolidatedIncomeTax: rawIncomeTax,
      consolidatedNetIncome,
      groupShareNetIncome: totalGroupShareNetIncome,
      minorityShareNetIncome: totalMinorityShareNetIncome,
      operatingMarginPercent,
    },
    groupKPIs: {
      netDebt,
      gearingRatioPercent,
      returnOnConsolidatedEquityPercent,
      operatingMarginPercent,
    },
  };
}
