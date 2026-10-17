import { describe, it, expect } from 'vitest';
import { computeTreasuryPlan, TreasuryPlanInput } from '../src/core/finance/treasury';

describe('Trésorerie Opérationnelle & Stress Testing (TRES-01, TRES-02)', () => {
  const baseInput: TreasuryPlanInput = {
    initialCash: 5000000, // 5M FCFA de départ
    overdraftFacility: 10000000, // 10M FCFA de découvert autorisé
    annualOverdraftRate: 12, // 12% d'agios
    months: [
      {
        monthName: 'Janvier',
        forecastTurnoverTTC: 30000000,
        cashSalesRatio: 0.3,
        credit30dRatio: 0.5,
        credit60dRatio: 0.2,
        forecastPurchasesTTC: 15000000,
        salariesNet: 4000000,
        operatingExpenses: 2000000,
        taxesAndDuties: 1500000,
        loanRepayment: 1000000,
      },
      {
        monthName: 'Février',
        forecastTurnoverTTC: 35000000,
        cashSalesRatio: 0.3,
        credit30dRatio: 0.5,
        credit60dRatio: 0.2,
        forecastPurchasesTTC: 18000000,
        salariesNet: 4000000,
        operatingExpenses: 2000000,
        taxesAndDuties: 1500000,
        loanRepayment: 1000000,
      },
      {
        monthName: 'Mars',
        forecastTurnoverTTC: 40000000,
        cashSalesRatio: 0.3,
        credit30dRatio: 0.5,
        credit60dRatio: 0.2,
        forecastPurchasesTTC: 20000000,
        salariesNet: 4000000,
        operatingExpenses: 2000000,
        taxesAndDuties: 1500000,
        loanRepayment: 1000000,
      },
      {
        monthName: 'Avril',
        forecastTurnoverTTC: 30000000,
        cashSalesRatio: 0.3,
        credit30dRatio: 0.5,
        credit60dRatio: 0.2,
        forecastPurchasesTTC: 16000000,
        salariesNet: 4000000,
        operatingExpenses: 2000000,
        taxesAndDuties: 1500000,
        loanRepayment: 1000000,
      },
      {
        monthName: 'Mai',
        forecastTurnoverTTC: 25000000,
        cashSalesRatio: 0.3,
        credit30dRatio: 0.5,
        credit60dRatio: 0.2,
        forecastPurchasesTTC: 14000000,
        salariesNet: 4000000,
        operatingExpenses: 2000000,
        taxesAndDuties: 1500000,
        loanRepayment: 1000000,
      },
      {
        monthName: 'Juin',
        forecastTurnoverTTC: 32000000,
        cashSalesRatio: 0.3,
        credit30dRatio: 0.5,
        credit60dRatio: 0.2,
        forecastPurchasesTTC: 17000000,
        salariesNet: 4000000,
        operatingExpenses: 2000000,
        taxesAndDuties: 1500000,
        loanRepayment: 1000000,
      },
    ],
  };

  it('doit générer un plan de trésorerie sur 6 mois avec solde continu', () => {
    const res = computeTreasuryPlan(baseInput);

    expect(res.monthlyCashFlows.length).toBe(6);
    expect(res.summary.initialCash).toBe(5000000);
    // Vérifier la continuité du solde : Solde(m) === Solde(m-1) + NetChange(m)
    let expectedCash = 5000000;
    for (const m of res.monthlyCashFlows) {
      expectedCash += m.netMonthlyChange;
      expect(m.closingCashBalance).toBe(expectedCash);
      expect(m.totalInflows).toBe(m.cashSales + m.receivablesCollected + m.otherInflows);
    }
  });

  it('doit déclencher une alerte d\'impasse critique lors d\'un stress test de retard client massif', () => {
    // Stress test avec 40% de retards de paiement clients et baisse de 20% du CA
    const stressedInput: TreasuryPlanInput = {
      ...baseInput,
      stressTest: {
        customerDefaultOrDelayRatio: 0.4,
        salesShockRatio: -0.2,
        purchasesSurgeRatio: 0.1,
      },
    };

    const res = computeTreasuryPlan(stressedInput);

    // Le creux de trésorerie doit être significativement plus dégradé
    expect(res.summary.lowestCashPoint).toBeLessThan(0);
    expect(res.summary.monthsInDeficit).toBeGreaterThan(0);
    // Le coût d'agios doit être calculé
    expect(res.summary.totalAgiosCost).toBeGreaterThan(0);
    // Alerte managériale explicite
    const hasAlertOrTension =
      res.summary.recommendedAction.includes('ALERTE') ||
      res.summary.recommendedAction.includes('Tensions');
    expect(hasAlertOrTension).toBe(true);
  });
});
