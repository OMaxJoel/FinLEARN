export type CellValue = string | number | boolean | null;

export type CellFormat = 'text' | 'currency' | 'percent' | 'number' | 'date';

export interface CellData {
  raw: string;          // Formule (ex: "=SOMME(A1:A5)") ou texte/nombre saisi
  computed: CellValue;  // Valeur évaluée
  format?: CellFormat;
  error?: string | null;// Erreur (ex: "#DIV/0!", "#VALEUR!")
  isFormula?: boolean;
}

export type CellGrid = Record<string, CellData>; // Clé "A1", "B2", etc.

export interface WorkbookSheet {
  id: string;
  name: string;
  cells: CellGrid;
  maxRows: number;
  maxCols: number;
}

export interface FormulaToken {
  type: 'FUNCTION' | 'CELL_REF' | 'RANGE' | 'NUMBER' | 'STRING' | 'OPERATOR' | 'LPAREN' | 'RPAREN' | 'COMMA' | 'SEMICOLON';
  value: string;
}

export interface WorkbookAuditIssue {
  cellId: string;
  type: 'HARDCODED_CONSTANT' | 'CIRCULAR_REF' | 'BROKEN_FORMULA' | 'INCONSISTENT_RANGE' | 'DIVISION_BY_ZERO';
  message: string;
  formula: string;
  recommendation: string;
}
