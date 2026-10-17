import { describe, it, expect } from 'vitest';
import { tokenizeFormula } from '../src/core/excel/lexer';
import { evaluateFormula, expandRange } from '../src/core/excel/evaluator';
import { auditWorkbookSheet } from '../src/core/excel/audit';
import { CellGrid } from '../src/types/excel';

describe('Laboratoire Excel : Lexer, Évaluateur & Auditeur', () => {
  it('doit tokeniser correctement les formules avec références absolues et fonctions', () => {
    const tokens = tokenizeFormula('=SOMME($A$1:A10) * $B$2 + 500');
    expect(tokens[0]).toEqual({ type: 'FUNCTION', value: 'SOMME' });
    expect(tokens[1]).toEqual({ type: 'LPAREN', value: '(' });
    expect(tokens[2]).toEqual({ type: 'RANGE', value: '$A$1:A10' });
    expect(tokens[3]).toEqual({ type: 'RPAREN', value: ')' });
    expect(tokens[4]).toEqual({ type: 'OPERATOR', value: '*' });
    expect(tokens[5]).toEqual({ type: 'CELL_REF', value: '$B$2' });
    expect(tokens[6]).toEqual({ type: 'OPERATOR', value: '+' });
    expect(tokens[7]).toEqual({ type: 'NUMBER', value: '500' });
  });

  it('doit déployer les plages de cellules correctement', () => {
    const cells = expandRange('B2:C4');
    expect(cells).toEqual(['B2', 'B3', 'B4', 'C2', 'C3', 'C4']);
  });

  it('doit évaluer des fonctions arithmétiques SOMME, MOYENNE, MIN, MAX', () => {
    const grid: CellGrid = {
      A1: { raw: '10', computed: 10 },
      A2: { raw: '20', computed: 20 },
      A3: { raw: '30', computed: 30 },
      B1: { raw: '2', computed: 2 },
    };

    expect(evaluateFormula('=SOMME(A1:A3)', grid)).toBe(60);
    expect(evaluateFormula('=MOYENNE(A1:A3)', grid)).toBe(20);
    expect(evaluateFormula('=MAX(A1:A3)', grid)).toBe(30);
    expect(evaluateFormula('=MIN(A1:A3)', grid)).toBe(10);
    expect(evaluateFormula('=SOMME(A1:A3) * B1', grid)).toBe(120);
  });

  it('doit évaluer les conditions SI, ET, OU et sécuriser avec SIERREUR', () => {
    const grid: CellGrid = {
      A1: { raw: '100', computed: 100 },
      A2: { raw: '0', computed: 0 },
    };

    expect(evaluateFormula('=SI(A1 > 50; "OBJECTIF_ATTEINT"; "ECHEC")', grid)).toBe('OBJECTIF_ATTEINT');
    expect(evaluateFormula('=SI(ET(A1 > 50; A2 = 0); "VALIDE"; "NON")', grid)).toBe('VALIDE');
    expect(evaluateFormula('=A1 / A2', grid)).toBe('#DIV/0!');
    expect(evaluateFormula('=SIERREUR(A1 / A2; 0)', grid)).toBe(0);
  });

  it('doit évaluer RECHERCHEX sur deux colonnes de données', () => {
    const grid: CellGrid = {
      // Clés de recherche (Codes clients)
      A1: { raw: 'CLI-001', computed: 'CLI-001' },
      A2: { raw: 'CLI-002', computed: 'CLI-002' },
      A3: { raw: 'CLI-003', computed: 'CLI-003' },
      // Données cibles (Noms de clients)
      B1: { raw: 'Ivoire Distribution SARL', computed: 'Ivoire Distribution SARL' },
      B2: { raw: 'Abidjan Logistique SA', computed: 'Abidjan Logistique SA' },
      B3: { raw: 'Société des Eaux', computed: 'Société des Eaux' },
    };

    const res = evaluateFormula('=RECHERCHEX("CLI-002"; A1:A3; B1:B3; "NON_TROUVE")', grid);
    expect(res).toBe('Abidjan Logistique SA');

    const notFound = evaluateFormula('=RECHERCHEX("CLI-999"; A1:A3; B1:B3; "NON_TROUVE")', grid);
    expect(notFound).toBe('NON_TROUVE');
  });

  it('doit auditer les erreurs de modélisation et repérer le hardcoding', () => {
    const grid: CellGrid = {
      A1: { raw: '1000000', computed: 1000000 },
      A2: { raw: '=A1 * 1.18', computed: 1180000 }, // Constante hardcodée 1.18 !
      B1: { raw: '=B1 + 10', computed: '#CIRCULAIRE!' }, // Référence circulaire !
    };

    const audit = auditWorkbookSheet(grid);
    expect(audit.totalFormulaCells).toBe(2);
    expect(audit.issues.length).toBeGreaterThanOrEqual(2);

    const hardcodedIssue = audit.issues.find((i) => i.type === 'HARDCODED_CONSTANT');
    expect(hardcodedIssue).toBeDefined();
    expect(hardcodedIssue?.cellId).toBe('A2');

    const circIssue = audit.issues.find((i) => i.type === 'CIRCULAR_REF');
    expect(circIssue).toBeDefined();
    expect(circIssue?.cellId).toBe('B1');
  });

  it('doit évaluer les formules financières avancées VPM, VAN, TRI et ARRONDI', () => {
    const grid: CellGrid = {
      A1: { raw: '10000000', computed: 10000000 }, // Emprunt 10M FCFA
      A2: { raw: '0.06', computed: 0.06 },         // Taux 6%
      A3: { raw: '5', computed: 5 },               // 5 ans
      B1: { raw: '-10000000', computed: -10000000 }, // I0
      B2: { raw: '3000000', computed: 3000000 },     // CF1
      B3: { raw: '4000000', computed: 4000000 },     // CF2
      B4: { raw: '5000000', computed: 5000000 },     // CF3
    };

    // VPM pour 10M FCFA à 6% sur 5 ans: (0.06 * 10000000) / (1 - 1.06^-5) = 2373964.00
    const vpm = evaluateFormula('=VPM(A2; A3; A1)', grid);
    expect(vpm).toBeCloseTo(2373964, -2);

    // VAN à 10% des flux CF1, CF2, CF3
    const van = evaluateFormula('=VAN(0.10; B2:B4)', grid);
    expect(typeof van).toBe('number');
    expect(Number(van)).toBeGreaterThan(0);

    // TRI des flux B1:B4 (-10M, +3M, +4M, +5M)
    const tri = evaluateFormula('=TRI(B1:B4)', grid);
    expect(typeof tri).toBe('number');
    expect(Number(tri)).toBeGreaterThan(0.08); // Environ 9.28%

    // ARRONDI
    expect(evaluateFormula('=ARRONDI(1254.567; 2)', grid)).toBe(1254.57);
  });
});

