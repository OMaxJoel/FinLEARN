import { describe, it, expect } from 'vitest';
import {
  computePolicyFinancials,
  reconcileInsuranceBordereau,
  computePortfolioKPIs,
  checkCIMAArticle13Compliance,
  InsurancePolicy,
} from '../src/core/insurance/commissions';

describe('Courtage en Assurance : Commissions, Bordereaux & Code CIMA', () => {
  it('doit décomposer fidèlement la prime totale et calculer la commission exacte', () => {
    // Police Flotte Automobile :
    // Prime nette : 10 000 000 FCFA
    // Accessoires : 100 000 FCFA
    // Taxe d'assurance : 14.5% (Côte d'Ivoire)
    // Taux commission courtier : 12%
    const breakdown = computePolicyFinancials({
      netPremiumFCFA: 10000000,
      accessoriesFCFA: 100000,
      taxRatePercent: 14.5,
      commissionRatePercent: 12,
    });

    // Assiette taxe = 10 100 000 -> Taxe = 10 100 000 * 0.145 = 1 464 500 FCFA
    expect(breakdown.taxAmount).toBe(1464500);
    // Prime totale TTC = 10 000 000 + 100 000 + 1 464 500 = 11 564 500 FCFA
    expect(breakdown.grossPremiumTTC).toBe(11564500);
    // Commission courtier = 10 000 000 * 12% = 1 200 000 FCFA
    expect(breakdown.expectedCommission).toBe(1200000);
  });

  it('doit détecter les sous-commissions et écarts sur un bordereau assureur', () => {
    const policies: InsurancePolicy[] = [
      {
        policyNumber: 'POL-AUTO-01',
        clientName: 'SOTRA Fictive',
        insurerName: 'Assurances Générales de CI',
        branch: 'AUTO',
        effectiveDate: '2026-01-01',
        expiryDate: '2026-12-31',
        netPremiumFCFA: 5000000,
        accessoriesFCFA: 50000,
        taxRatePercent: 14.5,
        commissionRatePercent: 10, // Attendu : 500 000 FCFA
      },
      {
        policyNumber: 'POL-SANTE-02',
        clientName: 'Clinique du Plateau',
        insurerName: 'Assurances Générales de CI',
        branch: 'SANTE',
        effectiveDate: '2026-01-01',
        expiryDate: '2026-12-31',
        netPremiumFCFA: 8000000,
        accessoriesFCFA: 80000,
        taxRatePercent: 0, // Santé souvent exonérée de taxe
        commissionRatePercent: 10, // Attendu : 800 000 FCFA
      },
    ];

    const bordereauRecu = [
      {
        policyNumber: 'POL-AUTO-01',
        declaredNetPremium: 5000000,
        declaredCommission: 500000, // Conforme !
      },
      {
        policyNumber: 'POL-SANTE-02',
        declaredNetPremium: 8000000,
        declaredCommission: 720000, // Sous-commissionné de 80 000 FCFA (l'assureur a appliqué 9% au lieu de 10%)
      },
    ];

    const result = reconcileInsuranceBordereau(policies, bordereauRecu);
    expect(result.totalDiscrepantCount).toBe(1);
    expect(result.totalVariance).toBe(-80000);

    const badLine = result.reconciledLines.find((l) => l.policyNumber === 'POL-SANTE-02');
    expect(badLine?.status).toBe('SOUS_COMMISSION');
    expect(badLine?.commissionVariance).toBe(-80000);
  });

  it('doit contrôler la conformité Article 13 du Code CIMA', () => {
    // Cas conforme : payé 15 jours après prise d'effet
    const good = checkCIMAArticle13Compliance('2026-01-01', '2026-01-16', 30);
    expect(good.isCompliant).toBe(true);

    // Cas non conforme : payé 45 jours après prise d'effet
    const bad = checkCIMAArticle13Compliance('2026-01-01', '2026-02-15', 30);
    expect(bad.isCompliant).toBe(false);
    expect(bad.statusMessage).toContain('dépassement du délai légal CIMA');
  });

  it('doit calculer les KPIs d\'un portefeuille de courtage', () => {
    const policies: InsurancePolicy[] = [
      {
        policyNumber: 'P1',
        clientName: 'Client A',
        insurerName: 'Assureur 1',
        branch: 'AUTO',
        effectiveDate: '2025-01-01',
        expiryDate: '2025-12-31',
        netPremiumFCFA: 10000000,
        accessoriesFCFA: 50000,
        taxRatePercent: 14.5,
        commissionRatePercent: 10,
        isRenewed: true,
      },
      {
        policyNumber: 'P2',
        clientName: 'Client B',
        insurerName: 'Assureur 2',
        branch: 'IARD',
        effectiveDate: '2025-01-01',
        expiryDate: '2025-12-31',
        netPremiumFCFA: 20000000,
        accessoriesFCFA: 100000,
        taxRatePercent: 14.5,
        commissionRatePercent: 15,
        isRenewed: false, // Perte / Churn
      },
    ];

    const kpi = computePortfolioKPIs(policies);
    expect(kpi.totalContracts).toBe(2);
    expect(kpi.renewedContracts).toBe(1);
    expect(kpi.retentionRatePercent).toBe(50);
    expect(kpi.churnRatePercent).toBe(50);
    expect(kpi.totalNetPremiums).toBe(30000000);
    // Commissions : 1M (Auto) + 3M (IARD) = 4 000 000 FCFA
    expect(kpi.totalCommissions).toBe(4000000);
  });
});
