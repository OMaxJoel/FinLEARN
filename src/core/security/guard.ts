/**
 * MODULE DE SÉCURITÉ APPLICATIVE & VALIDATION STRICTE DES DONNÉES (LOT 6)
 *
 * Implémente la protection OWASP Top 10 et les contrôles d'intégrité financière :
 * - Sanitization stricte des chaînes de caractères (prévention XSS et injection de balises)
 * - Validation des montants et ratios financiers (bornes, finitude, prévention d'overflow IEEE-754)
 * - Contrôle d'intégrité de l'équilibre comptable (Débit = Crédit)
 * - En-têtes recommandés pour la Content Security Policy (CSP)
 */

export interface FinancialValidationResult {
  isValid: boolean;
  sanitizedValue?: number | string;
  error?: string;
}

/**
 * Nettoyage et assainissement des entrées textuelles contre les attaques XSS
 */
export function sanitizeTextInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:[^"']*/gi, '')
    .replace(/data:text\/html[^"']*/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Validation rigoureuse d'un montant monétaire en FCFA (XOF)
 */
export function validateMonetaryAmount(
  amount: unknown,
  options: {
    allowNegative?: boolean;
    maxAmount?: number;
    fieldName?: string;
  } = {}
): FinancialValidationResult {
  const { allowNegative = false, maxAmount = 100_000_000_000_000, fieldName = 'Montant' } = options;

  if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) {
    return {
      isValid: false,
      error: `${fieldName} doit être un nombre fini valide.`,
    };
  }

  if (!allowNegative && amount < 0) {
    return {
      isValid: false,
      error: `${fieldName} ne peut pas être strictement négatif dans ce contexte comptable.`,
    };
  }

  if (Math.abs(amount) > maxAmount) {
    return {
      isValid: false,
      error: `${fieldName} dépasse la borne de précision autorisée (${maxAmount.toLocaleString('fr-FR')} FCFA).`,
    };
  }

  return {
    isValid: true,
    sanitizedValue: Math.round(amount),
  };
}

/**
 * Validation d'un taux d'intérêt, coût du capital ou ratio financier
 */
export function validatePercentageRate(
  rate: unknown,
  options: {
    minRate?: number;
    maxRate?: number;
    fieldName?: string;
  } = {}
): FinancialValidationResult {
  const { minRate = 0, maxRate = 100, fieldName = 'Taux' } = options;

  if (typeof rate !== 'number' || isNaN(rate) || !isFinite(rate)) {
    return {
      isValid: false,
      error: `${fieldName} doit être un nombre valide.`,
    };
  }

  if (rate < minRate || rate > maxRate) {
    return {
      isValid: false,
      error: `${fieldName} doit être compris entre ${minRate}% et ${maxRate}%. Valeur reçue : ${rate}%.`,
    };
  }

  return {
    isValid: true,
    sanitizedValue: Math.round(rate * 1000) / 1000,
  };
}

/**
 * Contrôle d'intégrité de la partie double comptable (Débit = Crédit)
 */
export function validateDoubleEntryIntegrity(
  debits: number[],
  credits: number[]
): { isBalanced: boolean; totalDebit: number; totalCredit: number; discrepancy: number } {
  const totalDebit = debits.reduce((sum, d) => sum + (isFinite(d) ? d : 0), 0);
  const totalCredit = credits.reduce((sum, c) => sum + (isFinite(c) ? c : 0), 0);
  const discrepancy = Math.abs(totalDebit - totalCredit);

  return {
    isBalanced: discrepancy === 0,
    totalDebit,
    totalCredit,
    discrepancy,
  };
}

/**
 * Configuration recommandée des en-têtes HTTP de sécurité (CSP, HSTS, X-Frame-Options)
 */
export const RECOMMENDED_SECURITY_HEADERS = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
