import { CellGrid, CellValue } from '../../types/excel';
import { tokenizeFormula } from './lexer';

/**
 * Normalise une référence de cellule en supprimant les dollars (ex: "$A$1" -> "A1")
 */
export function normalizeCellRef(ref: string): string {
  return ref.replace(/\$/g, '').toUpperCase();
}

/**
 * Convertit un identifiant de colonne "A", "B", ... en indice 1-indexé (1, 2, ...)
 */
export function colLettersToIndex(letters: string): number {
  let index = 0;
  for (let i = 0; i < letters.length; i++) {
    index = index * 26 + (letters.charCodeAt(i) - 64);
  }
  return index;
}

/**
 * Convertit un indice 1-indexé en lettres de colonne (1 -> "A", 28 -> "AB")
 */
export function indexToColLetters(index: number): string {
  let letters = '';
  while (index > 0) {
    const remainder = (index - 1) % 26;
    letters = String.fromCharCode(65 + remainder) + letters;
    index = Math.floor((index - 1) / 26);
  }
  return letters;
}

/**
 * Décompose une cellule "B12" en { colLetters: "B", col: 2, row: 12 }
 */
export function parseCellCoord(cellId: string): { colLetters: string; col: number; row: number } | null {
  const clean = normalizeCellRef(cellId);
  const match = clean.match(/^([A-Z]+)([0-9]+)$/);
  if (!match) return null;
  return {
    colLetters: match[1],
    col: colLettersToIndex(match[1]),
    row: parseInt(match[2], 10),
  };
}

/**
 * Déploie une plage de type "A1:B3" en liste de cellules : ["A1", "A2", "A3", "B1", "B2", "B3"]
 */
export function expandRange(rangeStr: string): string[] {
  const parts = rangeStr.split(':');
  if (parts.length !== 2) return [normalizeCellRef(rangeStr)];

  const start = parseCellCoord(parts[0]);
  const end = parseCellCoord(parts[1]);
  if (!start || !end) return [normalizeCellRef(rangeStr)];

  const minCol = Math.min(start.col, end.col);
  const maxCol = Math.max(start.col, end.col);
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);

  const cells: string[] = [];
  for (let c = minCol; c <= maxCol; c++) {
    const colLetters = indexToColLetters(c);
    for (let r = minRow; r <= maxRow; r++) {
      cells.push(`${colLetters}${r}`);
    }
  }
  return cells;
}

/**
 * Récupère la valeur numérique ou textuelle résolue d'une cellule dans la grille
 */
export function getCellValue(grid: CellGrid, cellId: string, visited: Set<string> = new Set()): CellValue {
  const normalized = normalizeCellRef(cellId);
  const cell = grid[normalized];
  if (!cell) return 0;

  // Si c'est une formule non encore évaluée ou recalculée
  if (cell.raw && cell.raw.startsWith('=')) {
    if (visited.has(normalized)) {
      return '#CIRCULAIRE!';
    }
    visited.add(normalized);
    const res = evaluateFormula(cell.raw, grid, visited);
    visited.delete(normalized);
    return res;
  }

  // Sinon, c'est une valeur brute (nombre ou texte)
  if (typeof cell.raw === 'string' && cell.raw.trim() !== '') {
    const num = Number(cell.raw.replace(/\s/g, '').replace(',', '.'));
    if (!isNaN(num)) return num;
    return cell.raw;
  }

  return cell.computed ?? 0;
}

/**
 * Évalue une formule Excel sur une grille de cellules
 */
export function evaluateFormula(
  formula: string,
  grid: CellGrid,
  visited: Set<string> = new Set()
): CellValue {
  try {
    const tokens = tokenizeFormula(formula);
    if (tokens.length === 0) return 0;

    let pos = 0;

    function parseExpression(): any {
      let left = parseComparison();
      return left;
    }

    function parseComparison(): any {
      let left = parseAdditive();
      while (pos < tokens.length && tokens[pos].type === 'OPERATOR' && ['=', '<>', '<', '>', '<=', '>='].includes(tokens[pos].value)) {
        const op = tokens[pos].value;
        pos++;
        const right = parseAdditive();
        if (op === '=') left = left == right;
        else if (op === '<>') left = left != right;
        else if (op === '<') left = left < right;
        else if (op === '>') left = left > right;
        else if (op === '<=') left = left <= right;
        else if (op === '>=') left = left >= right;
      }
      return left;
    }

    function parseAdditive(): any {
      let left = parseMultiplicative();
      while (pos < tokens.length && tokens[pos].type === 'OPERATOR' && (tokens[pos].value === '+' || tokens[pos].value === '-')) {
        const op = tokens[pos].value;
        pos++;
        const right = parseMultiplicative();
        const lNum = Number(left) || 0;
        const rNum = Number(right) || 0;
        left = op === '+' ? lNum + rNum : lNum - rNum;
      }
      return left;
    }

    function parseMultiplicative(): any {
      let left = parsePrimary();
      while (pos < tokens.length && tokens[pos].type === 'OPERATOR' && (tokens[pos].value === '*' || tokens[pos].value === '/')) {
        const op = tokens[pos].value;
        pos++;
        const right = parsePrimary();
        const lNum = Number(left) || 0;
        const rNum = Number(right) || 0;
        if (op === '/') {
          if (rNum === 0) return '#DIV/0!';
          left = lNum / rNum;
        } else {
          left = lNum * rNum;
        }
      }
      return left;
    }

    function parsePrimary(): any {
      if (pos >= tokens.length) return 0;
      const token = tokens[pos];

      // Parenthèse ouvrante
      if (token.type === 'LPAREN') {
        pos++;
        const val = parseExpression();
        if (pos < tokens.length && tokens[pos].type === 'RPAREN') {
          pos++;
        }
        return val;
      }

      // Nombre
      if (token.type === 'NUMBER') {
        pos++;
        return Number(token.value);
      }

      // Chaîne
      if (token.type === 'STRING') {
        pos++;
        return token.value;
      }

      // Référence de cellule
      if (token.type === 'CELL_REF') {
        pos++;
        return getCellValue(grid, token.value, visited);
      }

      // Appel de fonction
      if (token.type === 'FUNCTION') {
        const fnName = token.value.toUpperCase();
        pos++;
        if (pos < tokens.length && tokens[pos].type === 'LPAREN') {
          pos++; // Manger '('
          const args: any[] = [];
          if (pos < tokens.length && tokens[pos].type !== 'RPAREN') {
            while (pos < tokens.length && tokens[pos].type !== 'RPAREN') {
              // Vérifier si l'argument est une plage directe non parenthésée
              if (tokens[pos].type === 'RANGE') {
                args.push({ isRange: true, range: tokens[pos].value });
                pos++;
              } else {
                args.push(parseExpression());
              }

              if (pos < tokens.length && (tokens[pos].type === 'SEMICOLON' || tokens[pos].type === 'COMMA')) {
                pos++;
              }
            }
          }
          if (pos < tokens.length && tokens[pos].type === 'RPAREN') {
            pos++; // Manger ')'
          }
          return evaluateFunction(fnName, args, grid, visited);
        }
        // Constante booléenne VRAI / FAUX
        if (fnName === 'VRAI' || fnName === 'TRUE') return true;
        if (fnName === 'FAUX' || fnName === 'FALSE') return false;
      }

      pos++;
      return 0;
    }

    const result = parseExpression();
    if (typeof result === 'number' && !isNaN(result)) {
      return Math.round(result * 10000) / 10000;
    }
    return result;
  } catch (err: any) {
    return '#VALEUR!';
  }
}

/**
 * Exécute une fonction financière ou logique Excel déterministe
 */
function evaluateFunction(name: string, args: any[], grid: CellGrid, visited: Set<string>): any {
  // Extraction des valeurs de cellules quand un argument est une plage
  function flattenNumbers(argList: any[]): number[] {
    const nums: number[] = [];
    for (const a of argList) {
      if (a && typeof a === 'object' && a.isRange) {
        const cellIds = expandRange(a.range);
        for (const cid of cellIds) {
          const val = getCellValue(grid, cid, visited);
          const n = Number(val);
          if (!isNaN(n)) nums.push(n);
        }
      } else if (Array.isArray(a)) {
        nums.push(...flattenNumbers(a));
      } else {
        const n = Number(a);
        if (!isNaN(n)) nums.push(n);
      }
    }
    return nums;
  }

  switch (name) {
    case 'SOMME':
    case 'SUM': {
      const nums = flattenNumbers(args);
      return nums.reduce((acc, curr) => acc + curr, 0);
    }

    case 'MOYENNE':
    case 'AVERAGE': {
      const nums = flattenNumbers(args);
      if (nums.length === 0) return '#DIV/0!';
      return nums.reduce((acc, curr) => acc + curr, 0) / nums.length;
    }

    case 'MIN': {
      const nums = flattenNumbers(args);
      if (nums.length === 0) return 0;
      return Math.min(...nums);
    }

    case 'MAX': {
      const nums = flattenNumbers(args);
      if (nums.length === 0) return 0;
      return Math.max(...nums);
    }

    case 'NB':
    case 'COUNT': {
      const nums = flattenNumbers(args);
      return nums.length;
    }

    case 'SI':
    case 'IF': {
      const condition = Boolean(args[0]);
      return condition ? (args[1] ?? '') : (args[2] ?? '');
    }

    case 'ET':
    case 'AND': {
      for (const a of args) {
        if (!Boolean(a)) return false;
      }
      return true;
    }

    case 'OU':
    case 'OR': {
      for (const a of args) {
        if (Boolean(a)) return true;
      }
      return false;
    }

    case 'SIERREUR':
    case 'IFERROR': {
      const val = args[0];
      if (typeof val === 'string' && val.startsWith('#')) {
        return args[1] ?? '';
      }
      return val;
    }

    case 'RECHERCHEX':
    case 'XLOOKUP': {
      const lookupVal = args[0];
      const lookupRangeArg = args[1];
      const returnRangeArg = args[2];
      const ifNotFound = args[3] ?? '#N/A';

      if (!lookupRangeArg?.isRange || !returnRangeArg?.isRange) {
        return '#VALEUR!';
      }

      const lookupCells = expandRange(lookupRangeArg.range);
      const returnCells = expandRange(returnRangeArg.range);

      let foundIndex = -1;
      for (let i = 0; i < lookupCells.length; i++) {
        const val = getCellValue(grid, lookupCells[i], visited);
        if (String(val).trim().toUpperCase() === String(lookupVal).trim().toUpperCase()) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex >= 0 && foundIndex < returnCells.length) {
        return getCellValue(grid, returnCells[foundIndex], visited);
      }
      return ifNotFound;
    }

    case 'SOMME.SI.ENS':
    case 'SUMIFS': {
      if (args.length < 3 || !args[0]?.isRange) return '#VALEUR!';
      const sumCells = expandRange(args[0].range);
      const critRange = expandRange(args[1].range);
      const critVal = args[2];

      let total = 0;
      for (let i = 0; i < sumCells.length && i < critRange.length; i++) {
        const cVal = getCellValue(grid, critRange[i], visited);
        if (String(cVal).trim().toUpperCase() === String(critVal).trim().toUpperCase()) {
          const sVal = Number(getCellValue(grid, sumCells[i], visited)) || 0;
          total += sVal;
        }
      }
      return total;
    }

    case 'ARRONDI':
    case 'ROUND': {
      const num = Number(args[0]) || 0;
      const dec = Number(args[1]) || 0;
      const factor = Math.pow(10, dec);
      return Math.round(num * factor) / factor;
    }

    case 'ABS': {
      const num = Number(args[0]) || 0;
      return Math.abs(num);
    }

    case 'VPM':
    case 'PMT': {
      // VPM(taux, npm, va) -> mensualité constante
      const rate = Number(args[0]) || 0;
      const nper = Number(args[1]) || 1;
      const pv = Number(args[2]) || 0;

      if (nper <= 0) return '#VALEUR!';
      if (rate === 0) return Math.round((-pv / nper) * 100) / 100;

      const pmt = (rate * pv) / (1 - Math.pow(1 + rate, -nper));
      return Math.round(pmt * 100) / 100;
    }

    case 'VAN':
    case 'NPV': {
      // VAN(taux, flux1, flux2, ...) ou VAN(taux, plage)
      const rate = Number(args[0]) || 0;
      const flows = flattenNumbers(args.slice(1));
      if (flows.length === 0) return 0;

      let npv = 0;
      for (let t = 0; t < flows.length; t++) {
        npv += flows[t] / Math.pow(1 + rate, t + 1);
      }
      return Math.round(npv * 100) / 100;
    }

    case 'TRI':
    case 'IRR': {
      // TRI(plage_de_flux)
      const flows = flattenNumbers(args);
      if (flows.length < 2) return '#VALEUR!';

      // Newton-Raphson pour trouver r tel que sum(CF_t / (1+r)^t) = 0
      let rate = 0.1; // initial guess 10%
      for (let iter = 0; iter < 50; iter++) {
        let f = 0;
        let df = 0;
        for (let t = 0; t < flows.length; t++) {
          const denom = Math.pow(1 + rate, t);
          f += flows[t] / denom;
          if (t > 0) {
            df -= (t * flows[t]) / Math.pow(1 + rate, t + 1);
          }
        }
        if (Math.abs(f) < 1e-6) break;
        if (Math.abs(df) < 1e-12) break;
        rate = rate - f / df;
      }
      return Math.round(rate * 10000) / 10000;
    }

    default:
      return '#NOM?';
  }
}

