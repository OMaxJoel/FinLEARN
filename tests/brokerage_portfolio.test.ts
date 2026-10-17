import { describe, it, expect } from 'vitest';
import {
  computePolicyFinancials,
  computePortfolioKPIs,
  simulatePortfolioRenewal,
  computeClientAccountProfitability,
  getExpiringPoliciesTimeline,
  checkCIMAArticle13Compliance,
} from '../src/core/insurance/commissions';
import { ICC_POLICIES_DATASET } from '../src/data/mockDatasets';

describe('Courtage en Assurance : Gestion de Portefeuille, Rétention & Rentabilité CIMA', () => {
  it('doit calculer les KPIs consolidés du portefeuille ICC', () => {
    const kpis = computePortfolioKPIs(ICC_POLICIES_DATASET);

    expect(kpis.totalContracts).toBe(8);
    expect(kpis.totalNetPremiums).toBeGreaterThan(100000000); // > 100M FCFA
    expect(kpis.totalCommissions).toBeGreaterThan(10000000); // > 10M FCFA
    expect(kpis.retentionRatePercent).toBeGreaterThan(0);
    expect(kpis.retentionRatePercent).toBeLessThanOrEqual(100);
    expect(kpis.churnRatePercent).toBe(Math.round((100 - kpis.retentionRatePercent) * 10) / 10);

    // Vérification de la présence des branches clés
    expect(kpis.branchBreakdown.AUTO.contractsCount).toBe(2);
    expect(kpis.branchBreakdown.SANTE.contractsCount).toBe(2);
    expect(kpis.branchBreakdown.TRANSPORT.contractsCount).toBe(1);
    expect(kpis.branchBreakdown.VIE.contractsCount).toBe(1);
  });

  it('doit simuler prospectivement le renouvellement de portefeuille avec baisse ciblée sur la Santé', () => {
    // Hypothèse de reconduction : 90% par défaut, mais -15% sur la branche Santé (concurrence agressive)
    const sim = simulatePortfolioRenewal(ICC_POLICIES_DATASET, {
      defaultRenewalRatePercent: 90,
      branchAdjustments: {
        SANTE: -15, // Rétention Santé à 75%
      },
      premiumInflationPercent: 5, // +5% indexation tarifaire
    });

    expect(sim.currentTotalPremiums).toBeGreaterThan(0);
    expect(sim.projectedTotalPremiums).toBeGreaterThan(0);
    expect(sim.premiumsLostFCFA).toBeGreaterThan(0);
    expect(sim.commissionsLostFCFA).toBeGreaterThan(0);

    // La projection Santé doit être inférieure à la projection Auto à cause de l'ajustement négatif
    const santeRatio = sim.branchProjections.SANTE.projectedPremiums / sim.branchProjections.SANTE.currentPremiums;
    const autoRatio = sim.branchProjections.AUTO.projectedPremiums / sim.branchProjections.AUTO.currentPremiums;
    expect(santeRatio).toBeLessThan(autoRatio);
  });

  it('doit calculer la rentabilité nette par compte client en déduisant les coûts de gestion des sinistres', () => {
    // Données de gestion opérationnelle pour les clients
    const clientClaimsData = {
      'SOTRA Fictive Abidjan': {
        claimsHandledCount: 22, // Flotte très sinistrée
        managementHours: 150, // 150 heures de gestion
        costPerHourFCFA: 15000, // Coût chargé = 2 250 000 FCFA
      },
      'Groupe Scolaire Riviera Palmeraie': {
        claimsHandledCount: 2,
        managementHours: 10, // 10h = 150 000 FCFA
        costPerHourFCFA: 15000,
      },
    };

    const profitability = computeClientAccountProfitability(ICC_POLICIES_DATASET, clientClaimsData);

    expect(profitability.length).toBeGreaterThan(0);

    // Le compte SOTRA (commissions = 2 160 000, coût gestion = 2 250 000) doit être déficitaire
    const sotra = profitability.find((c) => c.clientName === 'SOTRA Fictive Abidjan');
    expect(sotra).toBeDefined();
    expect(sotra!.managementCostFCFA).toBe(2250000);
    expect(sotra!.netBrokerMarginFCFA).toBeLessThan(0);
    expect(sotra!.status).toBe('DEFICITAIRE');

    // Le compte Groupe Scolaire Riviera doit être très rentable
    const riviera = profitability.find((c) => c.clientName === 'Groupe Scolaire Riviera Palmeraie');
    expect(riviera).toBeDefined();
    expect(riviera!.netBrokerMarginFCFA).toBeGreaterThan(0);
    expect(riviera!.status).toBe('TRES_RENTABLE');
  });

  it('doit catégoriser les contrats selon l\'échéance et isoler les polices critiques à moins de 30 jours', () => {
    // Date de référence : 31 Mars 2026
    const timeline = getExpiringPoliciesTimeline(ICC_POLICIES_DATASET, '2026-03-31');

    // Les polices expirant en avril 2026 (ex: Ivoire Transit le 15/04/2026 et Groupe Scolaire le 20/04/2026)
    // doivent être dans la catégorie critique à moins de 30 jours
    expect(timeline.critical30Days.policies.length).toBeGreaterThanOrEqual(2);
    expect(timeline.totalAtRiskPremiums).toBeGreaterThan(30000000); // Plus de 30M FCFA de primes en jeu

    // Vérifier que chaque contrat a son calcul de jours restants
    for (const p of timeline.critical30Days.policies) {
      expect(p.daysToExpiry).toBeGreaterThanOrEqual(0);
      expect(p.daysToExpiry).toBeLessThanOrEqual(30);
    }
  });

  it('doit sanctionner le non-respect du délai CIMA Art. 13 de paiement préalable de la prime', () => {
    // Contrat effectif au 01/01/2026
    // Règlement après 45 jours (délai légal = 30 jours)
    const checkLate = checkCIMAArticle13Compliance('2026-01-01', '2026-02-15');
    expect(checkLate.isCompliant).toBe(false);
    expect(checkLate.daysToPayment).toBe(45);

    // Règlement en 15 jours
    const checkOk = checkCIMAArticle13Compliance('2026-01-01', '2026-01-16');
    expect(checkOk.isCompliant).toBe(true);
    expect(checkOk.daysToPayment).toBe(15);
  });
});
