/**
 * FINLEARN IMMERSION 2026 - Moteur de Contrôle de Gestion & Analyse des Écarts
 * Modèle déterministe certifié : Budget Flexible, Effets Prix, Volume, Coût Variable et Coûts Fixes.
 * Conforme aux standards d'enseignement du contrôle de gestion et normes d'évaluation.
 */

export interface ProductBudgetLine {
  productId: string;
  productName: string;
  budgetQuantity: number;       // Qb
  actualQuantity: number;       // Qr
  budgetUnitPrice: number;      // Pb (FCFA HT)
  actualUnitPrice: number;      // Pr (FCFA HT)
  budgetUnitVariableCost: number; // Cvub (FCFA HT)
  actualUnitVariableCost: number; // Cvur (FCFA HT)
}

export interface VarianceProductResult {
  productId: string;
  productName: string;
  // Chiffre d'affaires
  budgetRevenue: number;
  actualRevenue: number;
  flexibleRevenue: number;
  revenueTotalVariance: number; // Actual - Budget
  revenueVolumeVariance: number; // (Qr - Qb) * Pb
  revenuePriceVariance: number;  // (Pr - Pb) * Qr
  // Coûts variables
  budgetVariableCost: number;
  actualVariableCost: number;
  flexibleVariableCost: number;
  variableCostTotalVariance: number; // Actual - Budget (surcoût > 0)
  variableCostVolumeVariance: number; // (Qr - Qb) * Cvub
  variableCostRateVariance: number;   // (Cvur - Cvub) * Qr
  // Marge sur coût variable (MCV)
  budgetMargin: number;
  actualMargin: number;
  flexibleMargin: number;
  marginTotalVariance: number;       // Actual - Budget
  marginVolumeVariance: number;      // (Qr - Qb) * (Pb - Cvub)
  marginUnitVariance: number;        // (Mr - Mb) * Qr = PriceVariance - RateVariance
}

export interface GlobalVarianceReport {
  // Synthèses globales
  budget: {
    totalRevenue: number;
    totalVariableCosts: number;
    totalMargin: number;
    fixedCosts: number;
    operatingIncome: number;
  };
  actual: {
    totalRevenue: number;
    totalVariableCosts: number;
    totalMargin: number;
    fixedCosts: number;
    operatingIncome: number;
  };
  flexible: {
    totalRevenue: number;
    totalVariableCosts: number;
    totalMargin: number;
    fixedCosts: number;
    operatingIncome: number;
  };
  variances: {
    revenueVariance: number;        // Actual - Budget
    variableCostVariance: number;   // Actual - Budget (positif = surcoût)
    marginVariance: number;         // Actual - Budget
    fixedCostVariance: number;      // Actual - Budget (positif = surcoût)
    operatingIncomeVariance: number;// Actual - Budget
    // Décomposition factorielle certifiée
    volumeEffectOnMargin: number;   // Effet Volume global sur marge
    priceEffectOnRevenue: number;   // Effet Prix global
    costEffectOnVariableCosts: number; // Effet Dérive coût variable unitaire
    fixedCostSpendingVariance: number; // Écart sur coûts fixes
    isDecompositionExact: boolean;  // Vérifie que Somme(Effets) === operatingIncomeVariance
  };
  products: VarianceProductResult[];
  mixVariance?: {
    volumeActivityEffect: number; // Effet volume pur au mix standard
    mixCompositionEffect: number; // Effet déformation du panier / mix produit
  };
  managerialDiagnosis: string[];
}

/**
 * Calcule l'analyse des écarts budgétaires complète et déterministe.
 */
export function computeBudgetVariance(params: {
  products: ProductBudgetLine[];
  budgetFixedCosts: number;
  actualFixedCosts: number;
}): GlobalVarianceReport {
  let budgetTotalRevenue = 0;
  let actualTotalRevenue = 0;
  let flexibleTotalRevenue = 0;

  let budgetTotalVariableCosts = 0;
  let actualTotalVariableCosts = 0;
  let flexibleTotalVariableCosts = 0;

  const productResults: VarianceProductResult[] = [];

  for (const p of params.products) {
    const budgetRev = Math.round(p.budgetQuantity * p.budgetUnitPrice);
    const actualRev = Math.round(p.actualQuantity * p.actualUnitPrice);
    const flexRev = Math.round(p.actualQuantity * p.budgetUnitPrice);

    const budgetVC = Math.round(p.budgetQuantity * p.budgetUnitVariableCost);
    const actualVC = Math.round(p.actualQuantity * p.actualUnitVariableCost);
    const flexVC = Math.round(p.actualQuantity * p.budgetUnitVariableCost);

    const budgetM = budgetRev - budgetVC;
    const actualM = actualRev - actualVC;
    const flexM = flexRev - flexVC;

    // Décomposition CA
    const revVolVar = Math.round((p.actualQuantity - p.budgetQuantity) * p.budgetUnitPrice);
    const revPriceVar = Math.round((p.actualUnitPrice - p.budgetUnitPrice) * p.actualQuantity);
    const revTotalVar = actualRev - budgetRev;

    // Décomposition Coûts Variables
    const vcVolVar = Math.round((p.actualQuantity - p.budgetQuantity) * p.budgetUnitVariableCost);
    const vcRateVar = Math.round((p.actualUnitVariableCost - p.budgetUnitVariableCost) * p.actualQuantity);
    const vcTotalVar = actualVC - budgetVC;

    // Décomposition Marge
    const unitBudgetMargin = p.budgetUnitPrice - p.budgetUnitVariableCost;
    const marginVolVar = Math.round((p.actualQuantity - p.budgetQuantity) * unitBudgetMargin);
    const marginUnitVar = revPriceVar - vcRateVar;
    const marginTotalVar = actualM - budgetM;

    budgetTotalRevenue += budgetRev;
    actualTotalRevenue += actualRev;
    flexibleTotalRevenue += flexRev;

    budgetTotalVariableCosts += budgetVC;
    actualTotalVariableCosts += actualVC;
    flexibleTotalVariableCosts += flexVC;

    productResults.push({
      productId: p.productId,
      productName: p.productName,
      budgetRevenue: budgetRev,
      actualRevenue: actualRev,
      flexibleRevenue: flexRev,
      revenueTotalVariance: revTotalVar,
      revenueVolumeVariance: revVolVar,
      revenuePriceVariance: revPriceVar,
      budgetVariableCost: budgetVC,
      actualVariableCost: actualVC,
      flexibleVariableCost: flexVC,
      variableCostTotalVariance: vcTotalVar,
      variableCostVolumeVariance: vcVolVar,
      variableCostRateVariance: vcRateVar,
      budgetMargin: budgetM,
      actualMargin: actualM,
      flexibleMargin: flexM,
      marginTotalVariance: marginTotalVar,
      marginVolumeVariance: marginVolVar,
      marginUnitVariance: marginUnitVar,
    });
  }

  const budgetTotalMargin = budgetTotalRevenue - budgetTotalVariableCosts;
  const actualTotalMargin = actualTotalRevenue - actualTotalVariableCosts;
  const flexibleTotalMargin = flexibleTotalRevenue - flexibleTotalVariableCosts;

  const budgetOperatingIncome = budgetTotalMargin - params.budgetFixedCosts;
  const actualOperatingIncome = actualTotalMargin - params.actualFixedCosts;
  const flexibleOperatingIncome = flexibleTotalMargin - params.budgetFixedCosts;

  const revVariance = actualTotalRevenue - budgetTotalRevenue;
  const vcVariance = actualTotalVariableCosts - budgetTotalVariableCosts;
  const marginVariance = actualTotalMargin - budgetTotalMargin;
  const fixedCostVariance = params.actualFixedCosts - params.budgetFixedCosts;
  const opIncomeVariance = actualOperatingIncome - budgetOperatingIncome;

  // Total des effets factoriels
  const totalVolumeEffectOnMargin = productResults.reduce((sum, r) => sum + r.marginVolumeVariance, 0);
  const totalPriceEffectOnRevenue = productResults.reduce((sum, r) => sum + r.revenuePriceVariance, 0);
  const totalCostEffectOnVC = productResults.reduce((sum, r) => sum + r.variableCostRateVariance, 0);
  const fixedCostSpendingVar = fixedCostVariance;

  // Vérification de la complétude :
  // opIncomeVariance === totalVolumeEffectOnMargin + totalPriceEffectOnRevenue - totalCostEffectOnVC - fixedCostSpendingVar
  const sumOfEffects = totalVolumeEffectOnMargin + totalPriceEffectOnRevenue - totalCostEffectOnVC - fixedCostSpendingVar;
  const isDecompositionExact = Math.abs(sumOfEffects - opIncomeVariance) <= 5;

  // Calcul du Mix Variance si multi-produits
  let mixAnalysis: { volumeActivityEffect: number; mixCompositionEffect: number } | undefined;
  if (params.products.length > 1) {
    const totalActualUnits = params.products.reduce((s, p) => s + p.actualQuantity, 0);
    const totalBudgetUnits = params.products.reduce((s, p) => s + p.budgetQuantity, 0);

    const averageBudgetUnitMargin = totalBudgetUnits > 0 ? budgetTotalMargin / totalBudgetUnits : 0;
    const volumeActivityEffect = Math.round((totalActualUnits - totalBudgetUnits) * averageBudgetUnitMargin);
    const mixCompositionEffect = totalVolumeEffectOnMargin - volumeActivityEffect;

    mixAnalysis = {
      volumeActivityEffect,
      mixCompositionEffect,
    };
  }

  // Diagnostic managérial explicatif
  const managerialDiagnosis: string[] = [];

  if (opIncomeVariance < 0) {
    managerialDiagnosis.push(
      `Résultat inférieur au budget de ${Math.abs(opIncomeVariance).toLocaleString('fr-FR')} FCFA.`
    );
  } else {
    managerialDiagnosis.push(
      `Surperformance globale : Résultat d'exploitation supérieur au budget de ${opIncomeVariance.toLocaleString('fr-FR')} FCFA.`
    );
  }

  if (totalVolumeEffectOnMargin > 0 && totalPriceEffectOnRevenue < 0) {
    managerialDiagnosis.push(
      "Effet ciseau prix/volume : L'entreprise a augmenté ses volumes de vente mais au prix de concessions tarifaires (remises) qui ont détruit de la valeur unitaire."
    );
  } else if (totalVolumeEffectOnMargin < 0 && totalPriceEffectOnRevenue > 0) {
    managerialDiagnosis.push(
      "Stratégie d'écrémage : Des prix de vente plus élevés ont protégé la marge malgré une contraction des volumes vendus."
    );
  }

  if (totalCostEffectOnVC > 0) {
    managerialDiagnosis.push(
      `Alerte dérive des coûts variables : Surcoût unitaire de matières premières ou main d'œuvre de ${totalCostEffectOnVC.toLocaleString('fr-FR')} FCFA par rapport au standard.`
    );
  }

  if (fixedCostVariance > 0) {
    managerialDiagnosis.push(
      `Dépassement des frais de structure fixes de ${fixedCostVariance.toLocaleString('fr-FR')} FCFA (loyers, abonnements, charges administratives).`
    );
  }

  if (mixAnalysis && mixAnalysis.mixCompositionEffect < 0) {
    managerialDiagnosis.push(
      `Effet mix défavorable (${mixAnalysis.mixCompositionEffect.toLocaleString('fr-FR')} FCFA) : Les clients ont privilégié les produits à plus faible marge unitaire.`
    );
  }

  return {
    budget: {
      totalRevenue: budgetTotalRevenue,
      totalVariableCosts: budgetTotalVariableCosts,
      totalMargin: budgetTotalMargin,
      fixedCosts: params.budgetFixedCosts,
      operatingIncome: budgetOperatingIncome,
    },
    actual: {
      totalRevenue: actualTotalRevenue,
      totalVariableCosts: actualTotalVariableCosts,
      totalMargin: actualTotalMargin,
      fixedCosts: params.actualFixedCosts,
      operatingIncome: actualOperatingIncome,
    },
    flexible: {
      totalRevenue: flexibleTotalRevenue,
      totalVariableCosts: flexibleTotalVariableCosts,
      totalMargin: flexibleTotalMargin,
      fixedCosts: params.budgetFixedCosts,
      operatingIncome: flexibleOperatingIncome,
    },
    variances: {
      revenueVariance: revVariance,
      variableCostVariance: vcVariance,
      marginVariance,
      fixedCostVariance,
      operatingIncomeVariance: opIncomeVariance,
      volumeEffectOnMargin: totalVolumeEffectOnMargin,
      priceEffectOnRevenue: totalPriceEffectOnRevenue,
      costEffectOnVariableCosts: totalCostEffectOnVC,
      fixedCostSpendingVariance: fixedCostSpendingVar,
      isDecompositionExact,
    },
    products: productResults,
    mixVariance: mixAnalysis,
    managerialDiagnosis,
  };
}
