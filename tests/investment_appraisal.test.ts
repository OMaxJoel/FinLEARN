import { describe, it, expect } from 'vitest';
import {
  computeNPV,
  computeIRR,
  computePayback,
  computeDiscountedPayback,
  computeFisherCrossoverRate,
  computeWACC,
  computeSensitivityMatrix,
  rankProjectsUnderCapitalRationing,
} from '../src/core/finance/investment';

describe('Évaluation des Investissements, VAN, TRI, Fisher & Rationnement du Capital', () => {
  it('doit calculer le délai de récupération actualisé (point mort actualisé) avec interpolation linéaire', () => {
    // Projet : I0 = 100 000 000 FCFA
    // Cash-flows annuels : 30M, 40M, 50M, 40M FCFA
    // Taux d'actualisation : 10%
    const initialInvestment = 100000000;
    const cashFlows = [30000000, 40000000, 50000000, 40000000];
    const discountRate = 10;

    // Simple payback : Y1: 30M, Y2: 70M, Y3: 120M -> 2 + (100 - 70) / 50 = 2.6 ans
    const payback = computePayback(initialInvestment, cashFlows);
    expect(payback).toBe(2.6);

    // Discounted payback :
    // Y1 discounted : 30M / 1.1 = 27 272 727
    // Y2 discounted : 40M / 1.1^2 = 33 057 851 (cumul : 60 330 578)
    // Y3 discounted : 50M / 1.1^3 = 37 565 740 (cumul : 97 896 318)
    // Y4 discounted : 40M / 1.1^4 = 27 320 538 (cumul : 125 216 856)
    // Payback actualisé atteint en Année 4 : 3 + (100 000 000 - 97 896 318) / 27 320 538 = 3.077 -> 3.1 ans
    const discountedPayback = computeDiscountedPayback(initialInvestment, cashFlows, discountRate);
    expect(discountedPayback).toBe(3.1);
    expect(discountedPayback).toBeGreaterThan(payback);
  });

  it('doit déterminer le point d\'intersection de Fisher entre deux projets d\'investissement en conflit', () => {
    // Projet A (forte taille, rentabilité plus tardive) :
    // I0 = 150 000 000 FCFA, CF = [30M, 40M, 60M, 80M, 90M]
    // Projet B (taille modeste, retour rapide) :
    // I0 = 80 000 000 FCFA, CF = [35M, 35M, 30M, 20M, 15M]
    const projA = {
      initialInvestment: 150000000,
      cashFlows: [30000000, 40000000, 60000000, 80000000, 90000000],
    };
    const projB = {
      initialInvestment: 80000000,
      cashFlows: [35000000, 35000000, 30000000, 20000000, 15000000],
    };

    const crossoverRate = computeFisherCrossoverRate(projA, projB);
    expect(crossoverRate).not.toBeNull();
    expect(crossoverRate!).toBeGreaterThan(5);
    expect(crossoverRate!).toBeLessThan(25);

    // À ce taux de Fisher précis, la VAN du projet A et celle du projet B doivent être quasi-égales
    const npvA = computeNPV(crossoverRate!, projA.initialInvestment, projA.cashFlows);
    const npvB = computeNPV(crossoverRate!, projB.initialInvestment, projB.cashFlows);
    const relativeDiff = Math.abs(npvA - npvB) / projA.initialInvestment;
    expect(relativeDiff).toBeLessThan(0.005); // Écart < 0.5%
  });

  it('doit calculer le Coût Moyen Pondéré du Capital (CMPC / WACC) en tenant compte de la déductibilité fiscale UEMOA', () => {
    // Fonds propres = 120 000 000 FCFA, Coût des fonds propres = 14%
    // Dettes financières = 80 000 000 FCFA, Taux d'intérêt de la dette = 8%
    // Taux d'Impôt sur les Sociétés (IS) Côte d'Ivoire = 25%
    const waccRes = computeWACC(120000000, 14, 80000000, 8, 25);

    // Total = 200M -> CP weight = 60%, Debt weight = 40%
    expect(waccRes.equityWeight).toBe(0.6);
    expect(waccRes.debtWeight).toBe(0.4);
    // Coût net de la dette après IS = 8% * (1 - 0.25) = 6.0%
    expect(waccRes.afterTaxCostOfDebtPercent).toBe(6.0);
    // WACC = 0.6 * 14% + 0.4 * 6.0% = 8.4% + 2.4% = 10.8%
    expect(waccRes.waccPercent).toBe(10.8);
  });

  it('doit générer une matrice de sensibilité 2D cohérente (taux vs flux)', () => {
    const initialInvestment = 50000000;
    const cashFlows = [18000000, 20000000, 22000000, 24000000];
    const rates = [8, 10, 12];
    const mults = [0.9, 1.0, 1.1];

    const res = computeSensitivityMatrix(initialInvestment, cashFlows, rates, mults);

    expect(res.matrix.length).toBe(3);
    expect(res.matrix[0].length).toBe(3);

    // À flux constants, quand le taux d'actualisation augmente, la VAN doit diminuer
    expect(res.matrix[0][1]).toBeGreaterThan(res.matrix[1][1]);
    expect(res.matrix[1][1]).toBeGreaterThan(res.matrix[2][1]);

    // À taux constant, quand les flux augmentent (+10%), la VAN doit augmenter
    expect(res.matrix[1][2]).toBeGreaterThan(res.matrix[1][1]);
    expect(res.matrix[1][1]).toBeGreaterThan(res.matrix[1][0]);
  });

  it('doit arbitrer un portefeuille de projets sous contrainte budgétaire en maximisant la VAN globale', () => {
    // Enveloppe d'investissement autorisée : 120 000 000 FCFA
    const budgetLimit = 120000000;
    const discountRate = 10;

    const projects = [
      {
        id: 'PROJ_A',
        name: 'Usine Cacao San Pedro',
        initialInvestment: 70000000,
        cashFlows: [25000000, 28000000, 32000000, 35000000],
        discountRatePercent: discountRate,
      },
      {
        id: 'PROJ_B',
        name: 'Plateforme Logistique Bouaké',
        initialInvestment: 45000000,
        cashFlows: [18000000, 20000000, 22000000, 25000000],
        discountRatePercent: discountRate,
      },
      {
        id: 'PROJ_C',
        name: 'Ligne Ensachage Treichville',
        initialInvestment: 35000000,
        cashFlows: [10000000, 11000000, 12000000, 12000000],
        discountRatePercent: discountRate,
      },
    ];

    const result = rankProjectsUnderCapitalRationing(projects, budgetLimit);

    // Le budget total alloué ne doit jamais excéder 120M FCFA
    expect(result.totalInvestment).toBeLessThanOrEqual(budgetLimit);
    expect(result.selectedProjects.length).toBeGreaterThanOrEqual(1);

    // Vérification que les projets sont ordonnés par IP décroissant
    for (let i = 0; i < result.ranking.length - 1; i++) {
      expect(result.ranking[i].profitabilityIndex).toBeGreaterThanOrEqual(
        result.ranking[i + 1].profitabilityIndex
      );
    }
  });
});
