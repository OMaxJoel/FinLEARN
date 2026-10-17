import { describe, it, expect } from 'vitest';
import { computeBudgetVariance, ProductBudgetLine } from '../src/core/controlling/variance';

describe('Contrôle de Gestion - Analyse des Écarts & Budget Flexible', () => {
  it('doit décomposer rigoureusement l\'écart sur chiffre d\'affaires en effet volume et effet prix', () => {
    // Cas mono-produit : Casier d'eau minérale
    // Budget : 10 000 unités à 2 000 FCFA = 20 000 000 FCFA
    // Réalisé : 12 000 unités à 1 800 FCFA = 21 600 000 FCFA (hausse volume avec remise prix)
    const products: ProductBudgetLine[] = [
      {
        productId: 'P1',
        productName: 'Eau Minérale Awa',
        budgetQuantity: 10000,
        actualQuantity: 12000,
        budgetUnitPrice: 2000,
        actualUnitPrice: 1800,
        budgetUnitVariableCost: 1200,
        actualUnitVariableCost: 1200, // Coût variable unitaire identique
      },
    ];

    const report = computeBudgetVariance({
      products,
      budgetFixedCosts: 4000000,
      actualFixedCosts: 4000000,
    });

    const p1 = report.products[0];
    // Écart Total CA = 21.6M - 20M = +1.6M FCFA
    expect(p1.revenueTotalVariance).toBe(1600000);
    // Effet Volume = (12 000 - 10 000) * 2 000 = +4 000 000 FCFA
    expect(p1.revenueVolumeVariance).toBe(4000000);
    // Effet Prix = (1 800 - 2 000) * 12 000 = -2 400 000 FCFA
    expect(p1.revenuePriceVariance).toBe(-2400000);
    // Vérification additivité : 4 000 000 - 2 400 000 = 1 600 000
    expect(p1.revenueVolumeVariance + p1.revenuePriceVariance).toBe(p1.revenueTotalVariance);
  });

  it('doit calculer le budget flexible au niveau d\'activité réel et décomposer l\'écart sur résultat', () => {
    // Cas industriel PME Abidjan
    // Budget : 5 000 unités, Prix 10 000, CVU 6 000, Fixes 12 000 000 FCFA
    // Résultat budgété : 5 000 * 4 000 - 12M = 8 000 000 FCFA
    // Réalisé : 6 000 unités, Prix 9 500, CVU 6 500, Fixes 13 000 000 FCFA
    // Résultat réalisé : 6 000 * (9 500 - 6 500) - 13M = 6 000 * 3 000 - 13M = 5 000 000 FCFA
    // Écart sur résultat = 5M - 8M = -3 000 000 FCFA (défavorable)
    const products: ProductBudgetLine[] = [
      {
        productId: 'INDUS_01',
        productName: 'Conditionnement Plastique 20L',
        budgetQuantity: 5000,
        actualQuantity: 6000,
        budgetUnitPrice: 10000,
        actualUnitPrice: 9500,
        budgetUnitVariableCost: 6000,
        actualUnitVariableCost: 6500,
      },
    ];

    const report = computeBudgetVariance({
      products,
      budgetFixedCosts: 12000000,
      actualFixedCosts: 13000000,
    });

    // 1. Contrôle du Budget Flexible (au volume réel 6 000 unités)
    // CA Flexible = 6 000 * 10 000 = 60 000 000 FCFA
    expect(report.flexible.totalRevenue).toBe(60000000);
    // CV Flexible = 6 000 * 6 000 = 36 000 000 FCFA
    expect(report.flexible.totalVariableCosts).toBe(36000000);
    // Marge Flexible = 24 000 000 FCFA
    expect(report.flexible.totalMargin).toBe(24000000);
    // Résultat Flexible = 24M - 12M = 12 000 000 FCFA
    expect(report.flexible.operatingIncome).toBe(12000000);

    // 2. Écarts globaux
    expect(report.budget.operatingIncome).toBe(8000000);
    expect(report.actual.operatingIncome).toBe(5000000);
    expect(report.variances.operatingIncomeVariance).toBe(-3000000);

    // 3. Décomposition factorielle exacte
    // Effet Volume sur Marge = (6 000 - 5 000) * (10 000 - 6 000) = 1 000 * 4 000 = +4 000 000 FCFA
    expect(report.variances.volumeEffectOnMargin).toBe(4000000);
    // Effet Prix sur CA = (9 500 - 10 000) * 6 000 = -3 000 000 FCFA
    expect(report.variances.priceEffectOnRevenue).toBe(-3000000);
    // Effet Dérive Coût Variable = (6 500 - 6 000) * 6 000 = +3 000 000 FCFA (surcoût)
    expect(report.variances.costEffectOnVariableCosts).toBe(3000000);
    // Écart Coûts Fixes = 13M - 12M = +1 000 000 FCFA (dépassement)
    expect(report.variances.fixedCostSpendingVariance).toBe(1000000);

    // Formule d'égalité comptable absolue :
    // Résultat = Effet Volume (+4M) + Effet Prix (-3M) - Surcoût Variable (-3M) - Surcoût Fixe (-1M) = -3M FCFA
    expect(report.variances.isDecompositionExact).toBe(true);
    expect(report.managerialDiagnosis.length).toBeGreaterThan(0);
  });

  it('doit isoler l\'effet mix et l\'effet volume global sur un portefeuille multi-produits', () => {
    // 2 Produits avec marges différentes :
    // Produit A (Haute marge) : Mb = 5 000 FCFA
    // Produit B (Basse marge) : Mb = 1 000 FCFA
    const products: ProductBudgetLine[] = [
      {
        productId: 'PROD_A',
        productName: 'Service Premium',
        budgetQuantity: 100,
        actualQuantity: 50, // Moins de ventes sur le produit rentable
        budgetUnitPrice: 10000,
        actualUnitPrice: 10000,
        budgetUnitVariableCost: 5000,
        actualUnitVariableCost: 5000,
      },
      {
        productId: 'PROD_B',
        productName: 'Service Standard',
        budgetQuantity: 100,
        actualQuantity: 150, // Plus de ventes sur le produit peu rentable
        budgetUnitPrice: 3000,
        actualUnitPrice: 3000,
        budgetUnitVariableCost: 2000,
        actualUnitVariableCost: 2000,
      },
    ];

    const report = computeBudgetVariance({
      products,
      budgetFixedCosts: 200000,
      actualFixedCosts: 200000,
    });

    expect(report.mixVariance).toBeDefined();
    // Le volume total est identique (200 unités budget vs 200 unités réalisé)
    // Donc l'effet volume global pur est 0
    expect(report.mixVariance!.volumeActivityEffect).toBe(0);
    // Mais l'effet mix composition est défavorable car transfert de ventes vers le produit B
    // Perte sur A = -50 * 5000 = -250 000 FCFA. Gain sur B = +50 * 1000 = +50 000 FCFA. Écart = -200 000 FCFA
    expect(report.mixVariance!.mixCompositionEffect).toBe(-200000);
  });
});
