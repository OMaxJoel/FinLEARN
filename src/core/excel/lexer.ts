import { FormulaToken } from '../../types/excel';

/**
 * Analyseur lexical (Lexer) pour formules Excel.
 * Découpe une formule en jetons typés (cellules, plages, fonctions, opérateurs, constantes).
 */
export function tokenizeFormula(formula: string): FormulaToken[] {
  const tokens: FormulaToken[] = [];
  let input = formula.trim();

  if (input.startsWith('=')) {
    input = input.substring(1).trim();
  }

  let i = 0;
  const len = input.length;

  while (i < len) {
    const char = input[i];

    // Espaces ignorés
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Parenthèses et séparateurs
    if (char === '(') {
      tokens.push({ type: 'LPAREN', value: '(' });
      i++;
      continue;
    }
    if (char === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
      i++;
      continue;
    }
    if (char === ';') {
      tokens.push({ type: 'SEMICOLON', value: ';' });
      i++;
      continue;
    }
    if (char === ',') {
      tokens.push({ type: 'COMMA', value: ',' });
      i++;
      continue;
    }

    // Opérateurs arithmétiques et de comparaison
    if (char === '+' || char === '-' || char === '*' || char === '/' || char === '^') {
      tokens.push({ type: 'OPERATOR', value: char });
      i++;
      continue;
    }

    if (char === '=' || char === '<' || char === '>') {
      let op = char;
      if (i + 1 < len && (input[i + 1] === '=' || input[i + 1] === '>')) {
        op += input[i + 1];
        i += 2;
      } else {
        i++;
      }
      tokens.push({ type: 'OPERATOR', value: op });
      continue;
    }

    // Chaînes de caractères ("texte")
    if (char === '"') {
      let str = '';
      i++; // Sauter le premier guillemet
      while (i < len && input[i] !== '"') {
        str += input[i];
        i++;
      }
      i++; // Sauter le guillemet fermant
      tokens.push({ type: 'STRING', value: str });
      continue;
    }

    // Nombres (ex: 125, 45.67, 0.18)
    if (/[0-9]/.test(char) || (char === '.' && i + 1 < len && /[0-9]/.test(input[i + 1]))) {
      let num = '';
      while (i < len && (/[0-9]/.test(input[i]) || input[i] === '.')) {
        num += input[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: num });
      continue;
    }

    // Références de cellules ($A$1, B12, C3:D10) ou Noms de Fonctions (SOMME, SI, RECHERCHEX)
    if (/[A-Za-z_$]/.test(char)) {
      let word = '';
      while (i < len && /[A-Za-z0-9_$.:]/.test(input[i])) {
        word += input[i];
        i++;
      }

      // Est-ce une plage de cellules (ex: A1:A10 ou $B$2:$B$15) ?
      if (word.includes(':')) {
        tokens.push({ type: 'RANGE', value: word.toUpperCase() });
        continue;
      }

      // Est-ce une référence de cellule unique (ex: A1, $A$1, B12, $C15, D$8) ?
      const isCell = /^(\$?[A-Za-z]+\$?[0-9]+)$/.test(word);
      if (isCell) {
        tokens.push({ type: 'CELL_REF', value: word.toUpperCase() });
        continue;
      }

      // Sinon, c'est un nom de fonction ou constante logique (VRAI, FAUX)
      tokens.push({ type: 'FUNCTION', value: word.toUpperCase() });
      continue;
    }

    // Caractère inconnu : on avance
    i++;
  }

  return tokens;
}
