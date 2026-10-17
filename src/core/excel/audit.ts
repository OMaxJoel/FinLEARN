import { CellGrid, WorkbookAuditIssue } from '../../types/excel';
import { tokenizeFormula } from './lexer';

/**
 * Analyse statique et audit méthodologique d'un classeur Excel.
 * Détecte les constantes numériques insérées en dur dans les formules (violation des bonnes pratiques),
 * les cellules affichant des erreurs (#DIV/0!, #VALEUR!), et les références circulaires.
 */
export function auditWorkbookSheet(grid: CellGrid): {
  issues: WorkbookAuditIssue[];
  totalFormulaCells: number;
  healthScore: number; // 0 à 100
} {
  const issues: WorkbookAuditIssue[] = [];
  let totalFormulaCells = 0;

  for (const [cellId, cell] of Object.entries(grid)) {
    if (!cell.raw || !cell.raw.startsWith('=')) continue;
    totalFormulaCells++;

    const formula = cell.raw;
    const tokens = tokenizeFormula(formula);

    // 1. Détection de constante numérique en dur dans la formule
    // Tolérance : le chiffre 0, 1 ou 2 (par exemple pour diviser par 2 ou initialiser)
    for (const token of tokens) {
      if (token.type === 'NUMBER') {
        const val = Number(token.value);
        if (val !== 0 && val !== 1 && val !== 2) {
          issues.push({
            cellId,
            type: 'HARDCODED_CONSTANT',
            formula,
            message: `Constante numérique fixe détectée (${token.value}) dans la formule.`,
            recommendation: `Isoler la valeur ${token.value} dans une cellule de paramètre dédiée (ex: taux de TVA, remise) et y faire référence via $A$1.`,
          });
          break;
        }
      }
    }

    // 2. Détection d'erreurs d'évaluation
    if (typeof cell.computed === 'string' && cell.computed.startsWith('#')) {
      if (cell.computed === '#DIV/0!') {
        issues.push({
          cellId,
          type: 'DIVISION_BY_ZERO',
          formula,
          message: 'Division par zéro survenue lors du calcul.',
          recommendation: 'Encadrer le calcul avec SIERREUR(...) ou vérifier que le dénominateur est non nul.',
        });
      } else if (cell.computed === '#CIRCULAIRE!') {
        issues.push({
          cellId,
          type: 'CIRCULAR_REF',
          formula,
          message: 'Référence circulaire : la cellule dépend d\'elle-même.',
          recommendation: 'Rompre la boucle de dépendance directe ou indirecte.',
        });
      } else {
        issues.push({
          cellId,
          type: 'BROKEN_FORMULA',
          formula,
          message: `Formule en erreur (${cell.computed}).`,
          recommendation: 'Vérifier l\'existence des plages référencées et la syntaxe.',
        });
      }
    }
  }

  // Calcul d'un score de santé du classeur
  const penalite = issues.length * 15;
  const healthScore = Math.max(0, Math.min(100, 100 - penalite));

  return {
    issues,
    totalFormulaCells,
    healthScore,
  };
}
