export interface FinancialRatiosResult {
  workingCapital: {
    fr: number;   // Fonds de Roulement Net Global (Ressources stables - Emplois stables)
    bfr: number;  // Besoin en Fonds de Roulement (Actif circulant hors trésorerie - Passif circulant hors trésorerie)
    tn: number;   // Trésorerie Nette = FR - BFR
    isCoherent: boolean; // FR - BFR === TN
  };
  liquidity: {
    currentRatio: number; // Ratio de liquidité générale (Actif circulant / Passif circulant)
    quickRatio: number;   // Ratio de liquidité réduite ((Créances + Dispo) / Passif circulant)
    cashRatio: number;    // Ratio de liquidité immédiate (Dispo / Passif circulant)
  };
  solvency: {
    financialAutonomy: number; // Capitaux Propres / Dettes Financières Totales
    gearing: number;           // Dette Financière Nette / Capitaux Propres
  };
  profitability: {
    operatingMargin: number; // Résultat d'Exploitation / Chiffre d'Affaires (%)
    netMargin: number;       // Résultat Net / Chiffre d'Affaires (%)
    roa: number;             // Return on Assets = Résultat Net / Total Bilan (%)
    roe: number;             // Return on Equity = Résultat Net / Capitaux Propres (%)
  };
  activityDays: {
    dso: number; // Days Sales Outstanding (Créances clients / CA TTC * 360)
    dpo: number; // Days Payables Outstanding (Dettes fournisseurs / Achats TTC * 360)
    dio: number; // Days Inventory Outstanding (Stock moyen / Coût des ventes * 360)
  };
  diagnosticNotes: string[];
}

export function computeFinancialRatios(input: {
  fixedAssets: number;        // Emplois stables (Actif immobilisé net)
  stableResources: number;    // Capitaux propres + Dettes financières à long terme
  currentAssetsNonCash: number; // Stocks + Créances clients
  currentLiabNonCash: number;   // Dettes fournisseurs + Dettes fiscales et sociales
  cashAssets: number;         // Banques et caisse
  cashLiabilities: number;    // Découverts et concours bancaires courants
  totalAssets: number;        // Total Bilan
  equity: number;             // Capitaux propres
  financialDebts: number;     // Dettes financières totales
  turnoverHT: number;         // Chiffre d'affaires HT
  purchasesHT: number;        // Achats et consommations HT
  operatingIncome: number;    // Résultat d'exploitation
  netIncome: number;          // Résultat net
  receivables: number;        // Créances clients
  payables: number;           // Dettes fournisseurs
  stocks: number;             // Stocks
}): FinancialRatiosResult {
  // 1. Équilibre financier fonctionnel
  const fr = Math.round(input.stableResources - input.fixedAssets);
  const bfr = Math.round(input.currentAssetsNonCash - input.currentLiabNonCash);
  const netCashFromBalances = Math.round(input.cashAssets - input.cashLiabilities);
  const tn = Math.round(fr - bfr);
  const isCoherent = Math.abs(tn - netCashFromBalances) <= 10; // Tolérance d'arrondi

  // 2. Liquidité
  const totalCurrentLiab = input.currentLiabNonCash + input.cashLiabilities;
  const currentRatio = totalCurrentLiab > 0 ? (input.currentAssetsNonCash + input.cashAssets) / totalCurrentLiab : 0;
  const quickRatio = totalCurrentLiab > 0 ? (input.receivables + input.cashAssets) / totalCurrentLiab : 0;
  const cashRatio = totalCurrentLiab > 0 ? input.cashAssets / totalCurrentLiab : 0;

  // 3. Solvabilité
  const financialAutonomy = input.financialDebts > 0 ? input.equity / input.financialDebts : input.equity > 0 ? 99 : 0;
  const netDebt = Math.max(0, input.financialDebts + input.cashLiabilities - input.cashAssets);
  const gearing = input.equity > 0 ? netDebt / input.equity : 0;

  // 4. Rentabilité
  const ca = Math.max(1, input.turnoverHT);
  const operatingMargin = (input.operatingIncome / ca) * 100;
  const netMargin = (input.netIncome / ca) * 100;
  const roa = input.totalAssets > 0 ? (input.netIncome / input.totalAssets) * 100 : 0;
  const roe = input.equity > 0 ? (input.netIncome / input.equity) * 100 : 0;

  // 5. Délais de rotation (Base 360 jours OHADA)
  // TVA 18% par défaut en Côte d'Ivoire pour le passage HT -> TTC
  const caTTC = ca * 1.18;
  const dso = caTTC > 0 ? (input.receivables / caTTC) * 360 : 0;

  const purchasesTTC = Math.max(1, input.purchasesHT) * 1.18;
  const dpo = purchasesTTC > 0 ? (input.payables / purchasesTTC) * 360 : 0;

  const costOfSales = Math.max(1, input.purchasesHT);
  const dio = costOfSales > 0 ? (input.stocks / costOfSales) * 360 : 0;

  // 6. Diagnostic synthétique automatique
  const diagnosticNotes: string[] = [];

  if (fr < 0) {
    diagnosticNotes.push("Alerte FR négatif : Les ressources stables ne financent pas l'intégralité de l'actif immobilisé. Risque structurel majeur.");
  } else {
    diagnosticNotes.push("FR positif : Les emplois durables sont correctement financés par des capitaux permanents.");
  }

  if (tn < 0) {
    diagnosticNotes.push("Trésorerie nette négative : Le besoin en fonds de roulement excède le fonds de roulement, obligeant au recours aux crédits de trésorerie bancaires.");
  } else {
    diagnosticNotes.push("Trésorerie nette positive : L'entreprise dispose d'un coussin de sécurité de liquidité suffisant.");
  }

  if (currentRatio < 1.0) {
    diagnosticNotes.push("Ratio de liquidité générale inférieur à 1 : L'entreprise ne peut pas rembourser ses dettes à court terme uniquement avec ses actifs circulants.");
  } else if (currentRatio >= 1.3) {
    diagnosticNotes.push("Bonne liquidité générale (≥ 1.3) : Marge de sécurité confortable sur les échéances court terme.");
  }

  if (dso > 90) {
    diagnosticNotes.push(`Délai client anormalement élevé (${Math.round(dso)} jours) : Risque d'impayés et alourdissement du BFR. Recommander des actions de relance.`);
  }

  return {
    workingCapital: {
      fr,
      bfr,
      tn,
      isCoherent,
    },
    liquidity: {
      currentRatio: Math.round(currentRatio * 100) / 100,
      quickRatio: Math.round(quickRatio * 100) / 100,
      cashRatio: Math.round(cashRatio * 100) / 100,
    },
    solvency: {
      financialAutonomy: Math.round(financialAutonomy * 100) / 100,
      gearing: Math.round(gearing * 100) / 100,
    },
    profitability: {
      operatingMargin: Math.round(operatingMargin * 100) / 100,
      netMargin: Math.round(netMargin * 100) / 100,
      roa: Math.round(roa * 100) / 100,
      roe: Math.round(roe * 100) / 100,
    },
    activityDays: {
      dso: Math.round(dso),
      dpo: Math.round(dpo),
      dio: Math.round(dio),
    },
    diagnosticNotes,
  };
}
