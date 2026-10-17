import { describe, it, expect } from 'vitest';
import {
  computeLoanSchedule,
  computeNPV,
  computeIRR,
  computeBreakeven,
} from '../src/core/finance/investment';
import { computeFinancialRatios } from '../src/core/finance/ratios';

describe('Finance d\'Entreprise & Analyse Financière Déterministe', () => {
  it('doit générer un échéancier d\'emprunt qui s\'amortit rigoureusement à 0 FCFA', () => {
    // Emprunt bancaire PME : 50 000 000 FCFA à 6% sur 5 ans
    const { schedule, totalInterest, totalPayment } = computeLoanSchedule(50000000, 6, 5, 'ANNUAL');

    expect(schedule.length).toBe(5);
    expect(schedule[0].initialBalance).toBe(50000000);
    // Solde final de la 5e année doit être strictement égal à 0
    expect(schedule[4].finalBalance).toBe(0);
    expect(totalPayment).toBe(50000000 + totalInterest);
  });

  it('doit calculer la VAN et converger vers le TRI exact par Newton-Raphson', () => {
    // Investissement initial : 100 000 000 FCFA
    // Cash-flows annuels : 30M, 35M, 40M, 45M FCFA sur 4 ans
    const initialInvestment = 100000000;
    const cashFlows = [30000000, 35000000, 40000000, 45000000];

    // À 10% d'actualisation
    const npv10 = computeNPV(10, initialInvestment, cashFlows);
    expect(npv10).toBeGreaterThan(0); // Projet rentable à 10%

    // Calcul du TRI
    const irr = computeIRR(initialInvestment, cashFlows);
    expect(irr).not.toBeNull();
    // Le TRI doit être compris entre 16% et 18%
    expect(irr!).toBeGreaterThan(16);
    expect(irr!).toBeLessThan(18);

    // À ce taux exact de TRI, la VAN doit être proche de 0
    const npvAtIrr = computeNPV(irr!, initialInvestment, cashFlows);
    expect(Math.abs(npvAtIrr)).toBeLessThan(50000); // Erreur < 0.05% de l'investissement
  });

  it('doit calculer le seuil de rentabilité et le point mort en jours', () => {
    // Entreprise avec CA = 200 000 000 FCFA
    // Charges Fixes = 40 000 000 FCFA
    // Charges Variables = 120 000 000 FCFA (Marge sur CV = 80M, Taux MCV = 40%)
    const be = computeBreakeven(200000000, 40000000, 120000000);

    // Seuil de rentabilité = 40 000 000 / 0.4 = 100 000 000 FCFA
    expect(be.breakevenRevenue).toBe(100000000);
    expect(be.marginOfSafety).toBe(100000000);
    expect(be.safetyIndex).toBe(50); // 50% de marge de sécurité
    expect(be.breakevenDays).toBe(180); // Point mort atteint au 180e jour (mi-exercice)
  });

  it('doit calculer la batterie de ratios financiers et vérifier FR - BFR = TN', () => {
    const ratios = computeFinancialRatios({
      fixedAssets: 60000000,
      stableResources: 90000000, // FR = 90M - 60M = 30M
      currentAssetsNonCash: 50000000,
      currentLiabNonCash: 35000000, // BFR = 50M - 35M = 15M
      cashAssets: 18000000,
      cashLiabilities: 3000000, // TN = 18M - 3M = 15M
      totalAssets: 128000000,
      equity: 70000000,
      financialDebts: 20000000,
      turnoverHT: 150000000,
      purchasesHT: 80000000,
      operatingIncome: 25000000,
      netIncome: 18000000,
      receivables: 30000000,
      payables: 25000000,
      stocks: 20000000,
    });

    expect(ratios.workingCapital.fr).toBe(30000000);
    expect(ratios.workingCapital.bfr).toBe(15000000);
    expect(ratios.workingCapital.tn).toBe(15000000);
    expect(ratios.workingCapital.isCoherent).toBe(true);
    expect(ratios.liquidity.currentRatio).toBeGreaterThan(1.5);
    expect(ratios.diagnosticNotes.length).toBeGreaterThan(0);
  });
});
