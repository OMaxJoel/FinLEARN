export type AccountClass = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface SyscohadaAccount {
  code: string;
  label: string;
  classNum: AccountClass;
  type: 'ACTIF' | 'PASSIF' | 'CHARGE' | 'PRODUIT';
  description?: string;
}

export interface JournalEntryLine {
  id: string;
  accountCode: string;
  accountLabel: string;
  debit: number;  // en FCFA
  credit: number; // en FCFA
  refPiece?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  label: string;
  refPiece: string;
  lines: JournalEntryLine[];
}

export interface AccountMovement {
  entryDate: string;
  entryLabel: string;
  refPiece: string;
  debit: number;
  credit: number;
}

export interface AccountLedger {
  accountCode: string;
  accountLabel: string;
  movements: AccountMovement[];
  totalDebit: number;
  totalCredit: number;
  debitBalance: number;
  creditBalance: number;
}

export interface BalanceLine {
  accountCode: string;
  accountLabel: string;
  totalDebit: number;
  totalCredit: number;
  debitBalance: number;
  creditBalance: number;
}

export interface BalanceSheetItem {
  code: string;
  label: string;
  grossAmount: number;
  depreciation: number;
  netAmount: number;
}

export interface IncomeStatementItem {
  code: string;
  label: string;
  amount: number;
  isSubtotal?: boolean;
}

export interface FinancialStatements {
  balanceSheet: {
    assets: BalanceSheetItem[];
    liabilities: BalanceSheetItem[];
    totalAssets: number;
    totalLiabilities: number;
    isBalanced: boolean;
  };
  incomeStatement: {
    items: IncomeStatementItem[];
    operatingIncome: number; // Résultat d'exploitation
    financialIncome: number; // Résultat financier
    ordinaryIncome: number;  // Résultat des activités ordinaires (HAO)
    netIncome: number;       // Résultat net de l'exercice
  };
}

export interface BankStatementLine {
  id: string;
  date: string;
  label: string;
  debit: number;  // Décaissements banque
  credit: number; // Encaissements banque
  isReconciled?: boolean;
}

export interface BookStatementLine {
  id: string;
  date: string;
  label: string;
  refPiece: string;
  debit: number;  // Débit compte 521 (Encaissements)
  credit: number; // Crédit compte 521 (Décaissements)
  isReconciled?: boolean;
}
