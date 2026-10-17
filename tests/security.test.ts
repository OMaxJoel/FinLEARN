import { describe, it, expect } from 'vitest';
import {
  sanitizeTextInput,
  validateMonetaryAmount,
  validatePercentageRate,
  validateDoubleEntryIntegrity,
  RECOMMENDED_SECURITY_HEADERS,
} from '../src/core/security/guard';

describe('Sécurité Applicative & Intégrité des Données Financières (OWASP Top 10)', () => {
  describe('Sanitization et Prévention XSS', () => {
    it('doit neutraliser les balises scripts malveillantes', () => {
      const malicious = 'Vente Marchandises <script>alert("XSS")</script> Client';
      const clean = sanitizeTextInput(malicious);
      expect(clean).not.toContain('<script>');
      expect(clean).not.toContain('alert');
      expect(clean).toBe('Vente Marchandises  Client');
    });

    it('doit neutraliser les gestionnaires d\'événements onload et onerror', () => {
      const malicious = 'Facture <img src="x" onerror="stealCookies()">';
      const clean = sanitizeTextInput(malicious);
      expect(clean).not.toContain('onerror');
      expect(clean).not.toContain('<img');
    });

    it('doit neutraliser les URI javascript:', () => {
      const malicious = 'javascript:document.location="http://attacker.com"';
      const clean = sanitizeTextInput(malicious);
      expect(clean).not.toContain('javascript:');
    });
  });

  describe('Validation des Montants Monétaires', () => {
    it('doit valider les montants légitimes et arrondir à l\'entier en FCFA', () => {
      const res = validateMonetaryAmount(1542000.45);
      expect(res.isValid).toBe(true);
      expect(res.sanitizedValue).toBe(1542000);
    });

    it('doit refuser les montants négatifs lorsque non autorisés', () => {
      const res = validateMonetaryAmount(-50000, { allowNegative: false });
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('strictement négatif');
    });

    it('doit rejeter NaN et Infinity', () => {
      expect(validateMonetaryAmount(NaN).isValid).toBe(false);
      expect(validateMonetaryAmount(Infinity).isValid).toBe(false);
      expect(validateMonetaryAmount('1000' as unknown).isValid).toBe(false);
    });

    it('doit refuser les dépassements de capacité susceptibles d\'altérer la précision IEEE-754', () => {
      const res = validateMonetaryAmount(1e16, { maxAmount: 1e14 });
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('dépasse la borne');
    });
  });

  describe('Validation des Taux et Ratios', () => {
    it('doit valider un taux dans l\'intervalle légal', () => {
      const res = validatePercentageRate(14.5, { minRate: 0, maxRate: 100 });
      expect(res.isValid).toBe(true);
      expect(res.sanitizedValue).toBe(14.5);
    });

    it('doit refuser un taux en dehors des bornes', () => {
      const res = validatePercentageRate(105, { minRate: 0, maxRate: 100 });
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('doit être compris entre');
    });
  });

  describe('Intégrité de la Partie Double Comptable', () => {
    it('doit valider un journal parfaitement équilibré', () => {
      const debits = [100000, 18000];
      const credits = [118000];
      const check = validateDoubleEntryIntegrity(debits, credits);
      expect(check.isBalanced).toBe(true);
      expect(check.discrepancy).toBe(0);
    });

    it('doit détecter un déséquilibre de partie double', () => {
      const debits = [100000];
      const credits = [95000];
      const check = validateDoubleEntryIntegrity(debits, credits);
      expect(check.isBalanced).toBe(false);
      expect(check.discrepancy).toBe(5000);
    });
  });

  describe('En-têtes de Sécurité HTTP', () => {
    it('doit définir les en-têtes Content-Security-Policy et X-Frame-Options', () => {
      expect(RECOMMENDED_SECURITY_HEADERS['Content-Security-Policy']).toBeDefined();
      expect(RECOMMENDED_SECURITY_HEADERS['X-Frame-Options']).toBe('DENY');
      expect(RECOMMENDED_SECURITY_HEADERS['X-Content-Type-Options']).toBe('nosniff');
    });
  });
});
