import { describe, it, expect } from 'vitest';
import {
  EntityData,
  ExchangeRates,
  convertEntity,
  consolidateGroup,
  DEFAULT_EXCHANGE_RATES,
} from '../src/core/consolidation/engine';

describe('Consolidation de Groupe Multi-Entités & Multi-Devises (IAS 21 / SYSCOHADA)', () => {
  // Entité 1 : Holding Agro-Industrie Abidjan (Côte d'Ivoire, XOF)
  const holdingAbidjan: EntityData = {
    id: 'ENT_HOLDING',
    name: 'Holding Agro-Food Abidjan SA',
    country: "Côte d'Ivoire",
    currency: 'XOF',
    ownershipPercentage: 100,
    balanceSheet: {
      fixedAssets: 200000000,
      currentAssets: 120000000,
      cashAndEquivalents: 35000000,
      intercompanyReceivables: {
        ENT_DAKAR: 40000000, // Prêt accordé à la filiale de Dakar
        ENT_PARIS: 50000000, // Créance sur vente de marchandises à Paris
      },
      equity: 300000000,
      financialDebts: 80000000,
      currentLiabilities: 65000000,
      intercompanyPayables: {},
    },
    incomeStatement: {
      revenue: 400000000,
      operatingExpenses: 320000000,
      operatingIncome: 80000000,
      financialResult: 5000000,
      incomeTax: 21250000, // 25% IS
      netIncome: 63750000,
      intercompanySales: {
        ENT_PARIS: 50000000, // Ventes de produits finis à la filiale commerciale européenne
      },
    },
  };

  // Entité 2 : Filiale Opérationnelle Dakar (Sénégal, XOF, détenue à 80%)
  const filialeDakar: EntityData = {
    id: 'ENT_DAKAR',
    name: 'Sénégal Agro-Processing SARL',
    country: 'Sénégal',
    currency: 'XOF',
    ownershipPercentage: 80, // 20% d'intérêts minoritaires
    balanceSheet: {
      fixedAssets: 90000000,
      currentAssets: 60000000,
      cashAndEquivalents: 15000000,
      intercompanyReceivables: {},
      equity: 70000000,
      financialDebts: 25000000,
      currentLiabilities: 30000000,
      intercompanyPayables: {
        ENT_HOLDING: 40000000, // Dette envers la holding
      },
    },
    incomeStatement: {
      revenue: 180000000,
      operatingExpenses: 145000000,
      operatingIncome: 35000000,
      financialResult: -2000000,
      incomeTax: 8250000,
      netIncome: 24750000,
      intercompanySales: {},
    },
  };

  // Entité 3 : Filiale Commerciale Paris (France, EUR, détenue à 100%)
  const filialeParis: EntityData = {
    id: 'ENT_PARIS',
    name: 'Agro-Europe Distribution SAS',
    country: 'France',
    currency: 'EUR',
    ownershipPercentage: 100,
    balanceSheet: {
      fixedAssets: 150000, // 150 000 EUR
      currentAssets: 350000, // 350 000 EUR
      cashAndEquivalents: 80000, // 80 000 EUR
      intercompanyReceivables: {},
      equity: 280000, // 280 000 EUR
      financialDebts: 100000,
      currentLiabilities: 123776,
      intercompanyPayables: {
        ENT_HOLDING: 76224, // Dette envers la holding (50 000 000 XOF / 655.957 = 76 224 EUR)
      },
    },
    incomeStatement: {
      revenue: 850000, // 850 000 EUR
      operatingExpenses: 720000,
      operatingIncome: 130000,
      financialResult: -5000,
      incomeTax: 31250,
      netIncome: 93750,
      intercompanySales: {},
    },
  };

  it('doit convertir une filiale en devise étrangère (EUR) au cours de clôture et calculer l\'écart de conversion', () => {
    const converted = convertEntity(filialeParis, DEFAULT_EXCHANGE_RATES, 'XOF');

    // Vérifier que la devise de reporting est bien XOF
    expect(converted.reportingCurrency).toBe('XOF');
    // Actifs convertis au cours de clôture (655.957)
    expect(converted.balanceSheet.fixedAssets).toBe(Math.round(150000 * 655.957));
    // Le total de l'actif doit égaler le total du passif + capitaux propres grâce à la réserve de conversion
    expect(converted.balanceSheet.totalAssets).toBe(converted.balanceSheet.totalEquityAndLiabilities);
    // Le chiffre d'affaires doit être converti au cours moyen
    expect(converted.incomeStatement.revenue).toBe(Math.round(850000 * 655.957));
  });

  it('doit éliminer les créances et dettes réciproques entre la Holding et Dakar', () => {
    const result = consolidateGroup([holdingAbidjan, filialeDakar], DEFAULT_EXCHANGE_RATES);

    // Les 40M FCFA de prêt holding -> filiale doivent être éliminés
    expect(result.totalIntercompanyReceivablesEliminated).toBe(40000000);
    // Le bilan consolidé doit être parfaitement équilibré (Actif = Passif)
    expect(result.aggregatedBalanceSheet.isBalanced).toBe(true);
    // Aucune divergence entre Holding et Dakar car les montants concordent à 40M
    const discDakar = result.intercompanyDiscrepancies.find(
      (d) => d.entityFrom.includes('Holding') && d.entityTo.includes('Dakar')
    );
    expect(discDakar).toBeUndefined();
  });

  it('doit décomposer les capitaux propres et le résultat net entre Part du Groupe et Intérêts Minoritaires', () => {
    const result = consolidateGroup([holdingAbidjan, filialeDakar], DEFAULT_EXCHANGE_RATES);

    // Filiale Dakar détenue à 80% : 20% des capitaux propres et du résultat doivent être attribués aux minoritaires
    expect(result.aggregatedBalanceSheet.minorityInterestsEquity).toBeGreaterThan(0);
    expect(result.aggregatedIncomeStatement.minorityShareNetIncome).toBeGreaterThan(0);

    // Somme part du groupe + minoritaires = résultat net consolidé total
    const sumIncome =
      result.aggregatedIncomeStatement.groupShareNetIncome +
      result.aggregatedIncomeStatement.minorityShareNetIncome;
    expect(Math.abs(sumIncome - result.aggregatedIncomeStatement.consolidatedNetIncome)).toBeLessThanOrEqual(2);
  });

  it('doit consolider le groupe à 3 entités et éliminer les ventes internes du chiffre d\'affaires consolidé', () => {
    const result = consolidateGroup(
      [holdingAbidjan, filialeDakar, filialeParis],
      DEFAULT_EXCHANGE_RATES,
      { reportingCurrency: 'XOF', eliminateIntercompany: true }
    );

    expect(result.entitiesConverted.length).toBe(3);
    // Chiffre d'affaires consolidé = Somme des CA - Ventes internes (50M FCFA)
    expect(result.totalIntercompanyRevenueEliminated).toBe(50000000);
    expect(result.aggregatedBalanceSheet.isBalanced).toBe(true);

    // KPIs consolidés du groupe
    expect(result.groupKPIs.netDebt).toBeGreaterThan(0);
    expect(result.groupKPIs.operatingMarginPercent).toBeGreaterThan(10);
  });
});
