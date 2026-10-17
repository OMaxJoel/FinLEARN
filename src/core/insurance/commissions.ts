export type InsuranceBranch = 'SANTE' | 'AUTO' | 'IARD' | 'RC' | 'TRANSPORT' | 'VIE';

export interface InsurancePolicy {
  policyNumber: string;
  clientName: string;
  insurerName: string;
  branch: InsuranceBranch;
  effectiveDate: string;
  expiryDate: string;
  netPremiumFCFA: number;       // Prime nette d'assurance (assiette de commission)
  accessoriesFCFA: number;      // Frais accessoires
  taxRatePercent: number;       // Taux de taxe d'assurance (ex: 14.5% en Côte d'Ivoire)
  commissionRatePercent: number;// Taux conventionnel de commission courtier
  isRenewed?: boolean;
  premiumPaymentDate?: string;
}

export interface PremiumBreakdown {
  netPremium: number;
  accessories: number;
  taxAmount: number;
  grossPremiumTTC: number; // Prime totale due par l'assuré
  expectedCommission: number; // Commission revenant au courtier
}

export interface BordereauReconciliationLine {
  policyNumber: string;
  clientName: string;
  declaredNetPremium: number;
  declaredCommission: number;
  expectedNetPremium: number;
  expectedCommission: number;
  premiumVariance: number;      // Écart sur prime
  commissionVariance: number;   // Écart sur commission
  status: 'CONFORME' | 'SOUS_COMMISSION' | 'SUR_COMMISSION' | 'PRIME_DIVERGENTE';
}

export interface PortfolioKPIs {
  totalGrossPremiumsTTC: number;
  totalNetPremiums: number;
  totalCommissions: number;
  averageCommissionRate: number; // %
  totalContracts: number;
  renewedContracts: number;
  retentionRatePercent: number;  // Taux de rétention
  churnRatePercent: number;      // Taux d'attrition
  branchBreakdown: Record<InsuranceBranch, { contractsCount: number; netPremiums: number; commissions: number }>;
}

/**
 * Calcul déterministe de la décomposition d'une prime d'assurance et de la commission de courtage.
 */
export function computePolicyFinancials(policy: {
  netPremiumFCFA: number;
  accessoriesFCFA: number;
  taxRatePercent: number;
  commissionRatePercent: number;
}): PremiumBreakdown {
  const netPremium = Math.round(policy.netPremiumFCFA);
  const accessories = Math.round(policy.accessoriesFCFA);

  // La taxe d'assurance en Côte d'Ivoire (14.5%) frappe généralement la prime nette + les accessoires
  const taxBase = netPremium + accessories;
  const taxAmount = Math.round((taxBase * policy.taxRatePercent) / 100);

  const grossPremiumTTC = netPremium + accessories + taxAmount;

  // La commission du courtier est calculée sur la prime nette hors taxes et hors accessoires
  const expectedCommission = Math.round((netPremium * policy.commissionRatePercent) / 100);

  return {
    netPremium,
    accessories,
    taxAmount,
    grossPremiumTTC,
    expectedCommission,
  };
}

/**
 * Rapprochement déterministe d'un bordereau de commissions transmis par une compagnie d'assurance.
 */
export function reconcileInsuranceBordereau(
  expectedPolicies: InsurancePolicy[],
  bordereauItems: {
    policyNumber: string;
    declaredNetPremium: number;
    declaredCommission: number;
  }[]
): {
  reconciledLines: BordereauReconciliationLine[];
  totalVariance: number;
  totalDiscrepantCount: number;
  summaryNote: string;
} {
  const policyMap = new Map<string, InsurancePolicy>();
  for (const p of expectedPolicies) {
    policyMap.set(p.policyNumber.trim().toUpperCase(), p);
  }

  const reconciledLines: BordereauReconciliationLine[] = [];
  let totalVariance = 0;
  let totalDiscrepantCount = 0;

  for (const item of bordereauItems) {
    const pNumber = item.policyNumber.trim().toUpperCase();
    const policy = policyMap.get(pNumber);

    if (!policy) {
      // Contrat inconnu dans le portefeuille
      reconciledLines.push({
        policyNumber: item.policyNumber,
        clientName: 'Contrat inconnu',
        declaredNetPremium: item.declaredNetPremium,
        declaredCommission: item.declaredCommission,
        expectedNetPremium: 0,
        expectedCommission: 0,
        premiumVariance: item.declaredNetPremium,
        commissionVariance: item.declaredCommission,
        status: 'SUR_COMMISSION',
      });
      totalDiscrepantCount++;
      continue;
    }

    const { expectedCommission } = computePolicyFinancials(policy);
    const commissionVariance = item.declaredCommission - expectedCommission;
    const premiumVariance = item.declaredNetPremium - policy.netPremiumFCFA;

    let status: BordereauReconciliationLine['status'] = 'CONFORME';
    if (commissionVariance < -10) {
      status = 'SOUS_COMMISSION';
      totalDiscrepantCount++;
    } else if (commissionVariance > 10) {
      status = 'SUR_COMMISSION';
      totalDiscrepantCount++;
    } else if (Math.abs(premiumVariance) > 10) {
      status = 'PRIME_DIVERGENTE';
      totalDiscrepantCount++;
    }

    totalVariance += commissionVariance;

    reconciledLines.push({
      policyNumber: policy.policyNumber,
      clientName: policy.clientName,
      declaredNetPremium: item.declaredNetPremium,
      declaredCommission: item.declaredCommission,
      expectedNetPremium: policy.netPremiumFCFA,
      expectedCommission,
      premiumVariance,
      commissionVariance,
      status,
    });
  }

  const summaryNote =
    totalDiscrepantCount === 0
      ? 'Bordereau 100% conforme. Toutes les commissions déclarées concordent avec les conventions de courtage.'
      : `${totalDiscrepantCount} anomalies détectées sur le bordereau. Écart net total : ${totalVariance.toLocaleString()} FCFA. Une lettre de réclamation doit être émise.`;

  return {
    reconciledLines,
    totalVariance,
    totalDiscrepantCount,
    summaryNote,
  };
}

/**
 * Calcul des indicateurs clés de performance (KPIs) d'un portefeuille de courtage d'assurance.
 */
export function computePortfolioKPIs(policies: InsurancePolicy[]): PortfolioKPIs {
  let totalGross = 0;
  let totalNet = 0;
  let totalCommissions = 0;
  let renewedContracts = 0;

  const branchBreakdown: Record<InsuranceBranch, { contractsCount: number; netPremiums: number; commissions: number }> = {
    SANTE: { contractsCount: 0, netPremiums: 0, commissions: 0 },
    AUTO: { contractsCount: 0, netPremiums: 0, commissions: 0 },
    IARD: { contractsCount: 0, netPremiums: 0, commissions: 0 },
    RC: { contractsCount: 0, netPremiums: 0, commissions: 0 },
    TRANSPORT: { contractsCount: 0, netPremiums: 0, commissions: 0 },
    VIE: { contractsCount: 0, netPremiums: 0, commissions: 0 },
  };

  for (const p of policies) {
    const fin = computePolicyFinancials(p);
    totalGross += fin.grossPremiumTTC;
    totalNet += fin.netPremium;
    totalCommissions += fin.expectedCommission;

    if (p.isRenewed) {
      renewedContracts++;
    }

    if (!branchBreakdown[p.branch]) {
      branchBreakdown[p.branch] = { contractsCount: 0, netPremiums: 0, commissions: 0 };
    }
    branchBreakdown[p.branch].contractsCount++;
    branchBreakdown[p.branch].netPremiums += fin.netPremium;
    branchBreakdown[p.branch].commissions += fin.expectedCommission;
  }

  const totalContracts = policies.length;
  const averageCommissionRate = totalNet > 0 ? Math.round((totalCommissions / totalNet) * 1000) / 10 : 0;
  const retentionRatePercent = totalContracts > 0 ? Math.round((renewedContracts / totalContracts) * 1000) / 10 : 0;
  const churnRatePercent = Math.round((100 - retentionRatePercent) * 10) / 10;

  return {
    totalGrossPremiumsTTC: totalGross,
    totalNetPremiums: totalNet,
    totalCommissions,
    averageCommissionRate,
    totalContracts,
    renewedContracts,
    retentionRatePercent,
    churnRatePercent,
    branchBreakdown,
  };
}

/**
 * Vérification de conformité avec l'Article 13 du Code CIMA (Règle du paiement de la prime préalable).
 */
export function checkCIMAArticle13Compliance(
  effectiveDateStr: string,
  paymentDateStr?: string,
  gracePeriodDays: number = 30
): {
  isCompliant: boolean;
  daysToPayment: number;
  statusMessage: string;
} {
  if (!paymentDateStr) {
    return {
      isCompliant: false,
      daysToPayment: 999,
      statusMessage: "Prime non encaissée. En vertu de l'Article 13 du Code CIMA, la garantie est suspendue.",
    };
  }

  const effective = new Date(effectiveDateStr).getTime();
  const payment = new Date(paymentDateStr).getTime();
  const diffDays = Math.round((payment - effective) / (1000 * 60 * 60 * 24));

  if (diffDays <= gracePeriodDays) {
    return {
      isCompliant: true,
      daysToPayment: Math.max(0, diffDays),
      statusMessage: `Prime réglée en ${diffDays} jours (délai légal de ${gracePeriodDays} jours respecté). Garantie active.`,
    };
  }

  return {
    isCompliant: false,
    daysToPayment: diffDays,
    statusMessage: `Règlement intervenu après ${diffDays} jours (dépassement du délai légal CIMA de ${gracePeriodDays} jours). Risque juridique majeur de suspension de couverture.`,
  };
}

export interface RenewalSimulationResult {
  currentTotalPremiums: number;
  projectedTotalPremiums: number;
  currentCommissions: number;
  projectedCommissions: number;
  premiumsLostFCFA: number;
  commissionsLostFCFA: number;
  projectedRetentionRatePercent: number;
  projectedChurnRatePercent: number;
  retainedPoliciesCount: number;
  lostPoliciesCount: number;
  branchProjections: Record<InsuranceBranch, { currentPremiums: number; projectedPremiums: number; projectedCommissions: number }>;
}

/**
 * Simulation prospective du renouvellement du portefeuille de courtage et du chiffre d'affaires.
 */
export function simulatePortfolioRenewal(
  policies: InsurancePolicy[],
  options: {
    defaultRenewalRatePercent: number; // Taux de rétention global simulé (ex: 85%)
    branchAdjustments?: Partial<Record<InsuranceBranch, number>>; // Ajustement par branche (ex: { SANTE: -5, AUTO: +2 })
    premiumInflationPercent?: number; // Revalorisation tarifaire moyenne (ex: 3%)
  }
): RenewalSimulationResult {
  const inflationMult = 1 + (options.premiumInflationPercent || 0) / 100;
  let currentTotalPremiums = 0;
  let projectedTotalPremiums = 0;
  let currentCommissions = 0;
  let projectedCommissions = 0;
  let expectedRetainedCount = 0;

  const branchProjections: Record<
    InsuranceBranch,
    { currentPremiums: number; projectedPremiums: number; projectedCommissions: number }
  > = {
    SANTE: { currentPremiums: 0, projectedPremiums: 0, projectedCommissions: 0 },
    AUTO: { currentPremiums: 0, projectedPremiums: 0, projectedCommissions: 0 },
    IARD: { currentPremiums: 0, projectedPremiums: 0, projectedCommissions: 0 },
    RC: { currentPremiums: 0, projectedPremiums: 0, projectedCommissions: 0 },
    TRANSPORT: { currentPremiums: 0, projectedPremiums: 0, projectedCommissions: 0 },
    VIE: { currentPremiums: 0, projectedPremiums: 0, projectedCommissions: 0 },
  };

  for (const policy of policies) {
    const fin = computePolicyFinancials(policy);
    currentTotalPremiums += fin.netPremium;
    currentCommissions += fin.expectedCommission;

    const adjustment = (options.branchAdjustments && options.branchAdjustments[policy.branch]) || 0;
    const effectiveRetentionPercent = Math.min(100, Math.max(0, options.defaultRenewalRatePercent + adjustment));
    const retentionProbability = effectiveRetentionPercent / 100;

    const projectedPolicyPremium = Math.round(fin.netPremium * inflationMult * retentionProbability);
    const projectedPolicyComm = Math.round(projectedPolicyPremium * (policy.commissionRatePercent / 100));

    projectedTotalPremiums += projectedPolicyPremium;
    projectedCommissions += projectedPolicyComm;
    expectedRetainedCount += retentionProbability;

    if (!branchProjections[policy.branch]) {
      branchProjections[policy.branch] = { currentPremiums: 0, projectedPremiums: 0, projectedCommissions: 0 };
    }
    branchProjections[policy.branch].currentPremiums += fin.netPremium;
    branchProjections[policy.branch].projectedPremiums += projectedPolicyPremium;
    branchProjections[policy.branch].projectedCommissions += projectedPolicyComm;
  }

  const premiumsLostFCFA = Math.max(0, currentTotalPremiums - projectedTotalPremiums);
  const commissionsLostFCFA = Math.max(0, currentCommissions - projectedCommissions);
  const retainedCount = Math.round(expectedRetainedCount);
  const lostCount = policies.length - retainedCount;
  const projectedRetentionRatePercent =
    currentTotalPremiums > 0 ? Math.round((projectedTotalPremiums / currentTotalPremiums) * 1000) / 10 : 0;
  const projectedChurnRatePercent = Math.max(0, Math.round((100 - projectedRetentionRatePercent) * 10) / 10);

  return {
    currentTotalPremiums,
    projectedTotalPremiums,
    currentCommissions,
    projectedCommissions,
    premiumsLostFCFA,
    commissionsLostFCFA,
    projectedRetentionRatePercent,
    projectedChurnRatePercent,
    retainedPoliciesCount: retainedCount,
    lostPoliciesCount: lostCount,
    branchProjections,
  };
}

export interface ClientAccountProfitability {
  clientName: string;
  policiesCount: number;
  totalNetPremiums: number;
  totalCommissions: number;
  claimsCount: number;
  managementHours: number;
  managementCostFCFA: number;
  netBrokerMarginFCFA: number;
  marginRatioPercent: number; // Marge nette / Commissions (%)
  status: 'TRES_RENTABLE' | 'EQUILIBRE' | 'DEFICITAIRE';
}

/**
 * Calcul de la rentabilité analytique par compte client de courtage.
 * Déduit les coûts de gestion des sinistres et de suivi opérationnel des commissions perçues.
 */
export function computeClientAccountProfitability(
  policies: InsurancePolicy[],
  clientClaimsData: Record<
    string,
    { claimsHandledCount: number; managementHours: number; costPerHourFCFA?: number }
  > = {}
): ClientAccountProfitability[] {
  const clientMap = new Map<
    string,
    {
      policiesCount: number;
      totalNetPremiums: number;
      totalCommissions: number;
    }
  >();

  for (const policy of policies) {
    const existing = clientMap.get(policy.clientName) || {
      policiesCount: 0,
      totalNetPremiums: 0,
      totalCommissions: 0,
    };

    const fin = computePolicyFinancials(policy);
    existing.policiesCount += 1;
    existing.totalNetPremiums += fin.netPremium;
    existing.totalCommissions += fin.expectedCommission;
    clientMap.set(policy.clientName, existing);
  }

  const results: ClientAccountProfitability[] = [];

  clientMap.forEach((val, clientName) => {
    const servData = clientClaimsData[clientName] || {
      claimsHandledCount: 0,
      managementHours: val.policiesCount * 3, // Base standard : 3h de gestion par contrat
      costPerHourFCFA: 15000, // Coût horaire chargé d'un gestionnaire courtage à Abidjan (15 000 FCFA/h)
    };

    const costPerHour = servData.costPerHourFCFA || 15000;
    const managementCostFCFA = servData.managementHours * costPerHour;
    const netBrokerMarginFCFA = val.totalCommissions - managementCostFCFA;
    const marginRatioPercent =
      val.totalCommissions > 0 ? Math.round((netBrokerMarginFCFA / val.totalCommissions) * 1000) / 10 : 0;

    let status: ClientAccountProfitability['status'] = 'EQUILIBRE';
    if (marginRatioPercent >= 50) {
      status = 'TRES_RENTABLE';
    } else if (netBrokerMarginFCFA < 0) {
      status = 'DEFICITAIRE';
    }

    results.push({
      clientName,
      policiesCount: val.policiesCount,
      totalNetPremiums: val.totalNetPremiums,
      totalCommissions: val.totalCommissions,
      claimsCount: servData.claimsHandledCount,
      managementHours: servData.managementHours,
      managementCostFCFA,
      netBrokerMarginFCFA,
      marginRatioPercent,
      status,
    });
  });

  // Tri par marge nette décroissante
  results.sort((a, b) => b.netBrokerMarginFCFA - a.netBrokerMarginFCFA);

  return results;
}

export interface ExpiryTimelineCategory {
  urgency: 'CRITIQUE_30J' | 'A_VENIR_60J' | 'ECHEANCE_PLUS_TARD' | 'ECHUE';
  policies: Array<InsurancePolicy & { daysToExpiry: number; commissionFCFA: number }>;
  totalPremiumsFCFA: number;
  totalCommissionsFCFA: number;
}

/**
 * Segmentation chronologique du portefeuille par date d'expiration pour planifier les renouvellements.
 */
export function getExpiringPoliciesTimeline(
  policies: InsurancePolicy[],
  referenceDateStr: string = '2026-03-31'
): {
  critical30Days: ExpiryTimelineCategory;
  upcoming60Days: ExpiryTimelineCategory;
  laterPolicies: ExpiryTimelineCategory;
  expiredPolicies: ExpiryTimelineCategory;
  totalAtRiskPremiums: number;
} {
  const refTime = new Date(referenceDateStr).getTime();

  const categories: Record<'CRITIQUE_30J' | 'A_VENIR_60J' | 'ECHEANCE_PLUS_TARD' | 'ECHUE', ExpiryTimelineCategory> = {
    CRITIQUE_30J: { urgency: 'CRITIQUE_30J', policies: [], totalPremiumsFCFA: 0, totalCommissionsFCFA: 0 },
    A_VENIR_60J: { urgency: 'A_VENIR_60J', policies: [], totalPremiumsFCFA: 0, totalCommissionsFCFA: 0 },
    ECHEANCE_PLUS_TARD: { urgency: 'ECHEANCE_PLUS_TARD', policies: [], totalPremiumsFCFA: 0, totalCommissionsFCFA: 0 },
    ECHUE: { urgency: 'ECHUE', policies: [], totalPremiumsFCFA: 0, totalCommissionsFCFA: 0 },
  };

  for (const policy of policies) {
    const expTime = new Date(policy.expiryDate).getTime();
    const daysToExpiry = Math.round((expTime - refTime) / (1000 * 60 * 60 * 24));
    const fin = computePolicyFinancials(policy);
    const item = { ...policy, daysToExpiry, commissionFCFA: fin.expectedCommission };

    if (daysToExpiry < 0) {
      categories.ECHUE.policies.push(item);
      categories.ECHUE.totalPremiumsFCFA += fin.netPremium;
      categories.ECHUE.totalCommissionsFCFA += fin.expectedCommission;
    } else if (daysToExpiry <= 30) {
      categories.CRITIQUE_30J.policies.push(item);
      categories.CRITIQUE_30J.totalPremiumsFCFA += fin.netPremium;
      categories.CRITIQUE_30J.totalCommissionsFCFA += fin.expectedCommission;
    } else if (daysToExpiry <= 60) {
      categories.A_VENIR_60J.policies.push(item);
      categories.A_VENIR_60J.totalPremiumsFCFA += fin.netPremium;
      categories.A_VENIR_60J.totalCommissionsFCFA += fin.expectedCommission;
    } else {
      categories.ECHEANCE_PLUS_TARD.policies.push(item);
      categories.ECHEANCE_PLUS_TARD.totalPremiumsFCFA += fin.netPremium;
      categories.ECHEANCE_PLUS_TARD.totalCommissionsFCFA += fin.expectedCommission;
    }
  }

  return {
    critical30Days: categories.CRITIQUE_30J,
    upcoming60Days: categories.A_VENIR_60J,
    laterPolicies: categories.ECHEANCE_PLUS_TARD,
    expiredPolicies: categories.ECHUE,
    totalAtRiskPremiums: categories.CRITIQUE_30J.totalPremiumsFCFA + categories.A_VENIR_60J.totalPremiumsFCFA,
  };
}
