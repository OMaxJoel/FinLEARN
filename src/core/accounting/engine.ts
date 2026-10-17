import {
  JournalEntry,
  AccountLedger,
  BalanceLine,
  FinancialStatements,
  BalanceSheetItem,
  IncomeStatementItem,
} from '../../types/accounting';
import { findAccount } from './syscohada';

/**
 * Validation déterministe d'une écriture comptable.
 * Vérifie l'égalité stricte Débit = Crédit et la validité des montants.
 */
export function validateJournalEntry(entry: JournalEntry): {
  isValid: boolean;
  totalDebit: number;
  totalCredit: number;
  imbalance: number;
  errorMessage?: string;
} {
  if (!entry.lines || entry.lines.length < 2) {
    return {
      isValid: false,
      totalDebit: 0,
      totalCredit: 0,
      imbalance: 0,
      errorMessage: "Une écriture comptable doit comporter au moins 2 lignes (un compte débité et un compte crédité).",
    };
  }

  let totalDebit = 0;
  let totalCredit = 0;

  for (const line of entry.lines) {
    if (line.debit < 0 || line.credit < 0) {
      return {
        isValid: false,
        totalDebit,
        totalCredit,
        imbalance: 0,
        errorMessage: "Les montants au débit et au crédit ne peuvent pas être négatifs.",
      };
    }
    if (line.debit > 0 && line.credit > 0) {
      return {
        isValid: false,
        totalDebit,
        totalCredit,
        imbalance: 0,
        errorMessage: "Une même ligne ne peut pas avoir simultanément un montant au débit et au crédit.",
      };
    }
    totalDebit += Math.round(line.debit);
    totalCredit += Math.round(line.credit);
  }

  const imbalance = totalDebit - totalCredit;
  const isValid = imbalance === 0 && totalDebit > 0;

  return {
    isValid,
    totalDebit,
    totalCredit,
    imbalance,
    errorMessage: isValid
      ? undefined
      : `L'écriture est déséquilibrée : Total Débit (${totalDebit.toLocaleString()} FCFA) ≠ Total Crédit (${totalCredit.toLocaleString()} FCFA). Écart : ${Math.abs(imbalance).toLocaleString()} FCFA.`,
  };
}

/**
 * Génère le Grand Livre (comptes en T et mouvements) à partir des écritures validées.
 */
export function computeLedger(entries: JournalEntry[]): Record<string, AccountLedger> {
  const ledgerMap: Record<string, AccountLedger> = {};

  for (const entry of entries) {
    const val = validateJournalEntry(entry);
    if (!val.isValid) continue;

    for (const line of entry.lines) {
      if (!ledgerMap[line.accountCode]) {
        const acc = findAccount(line.accountCode);
        ledgerMap[line.accountCode] = {
          accountCode: line.accountCode,
          accountLabel: acc?.label || line.accountLabel,
          movements: [],
          totalDebit: 0,
          totalCredit: 0,
          debitBalance: 0,
          creditBalance: 0,
        };
      }

      const accLedger = ledgerMap[line.accountCode];
      accLedger.movements.push({
        entryDate: entry.date,
        entryLabel: entry.label,
        refPiece: entry.refPiece || line.refPiece || '',
        debit: line.debit,
        credit: line.credit,
      });

      accLedger.totalDebit += line.debit;
      accLedger.totalCredit += line.credit;
    }
  }

  // Calcul des soldes nets
  for (const code of Object.keys(ledgerMap)) {
    const acc = ledgerMap[code];
    const diff = acc.totalDebit - acc.totalCredit;
    if (diff > 0) {
      acc.debitBalance = diff;
      acc.creditBalance = 0;
    } else if (diff < 0) {
      acc.debitBalance = 0;
      acc.creditBalance = Math.abs(diff);
    } else {
      acc.debitBalance = 0;
      acc.creditBalance = 0;
    }
  }

  return ledgerMap;
}

/**
 * Génère la Balance Générale des Comptes à partir des écritures.
 */
export function computeBalance(entries: JournalEntry[]): {
  lines: BalanceLine[];
  totalDebit: number;
  totalCredit: number;
  totalDebitBalance: number;
  totalCreditBalance: number;
  isBalanced: boolean;
} {
  const ledger = computeLedger(entries);
  const lines: BalanceLine[] = Object.values(ledger).map((acc) => ({
    accountCode: acc.accountCode,
    accountLabel: acc.accountLabel,
    totalDebit: acc.totalDebit,
    totalCredit: acc.totalCredit,
    debitBalance: acc.debitBalance,
    creditBalance: acc.creditBalance,
  }));

  // Tri par numéro de compte croissant
  lines.sort((a, b) => a.accountCode.localeCompare(b.accountCode));

  const totalDebit = lines.reduce((sum, l) => sum + l.totalDebit, 0);
  const totalCredit = lines.reduce((sum, l) => sum + l.totalCredit, 0);
  const totalDebitBalance = lines.reduce((sum, l) => sum + l.debitBalance, 0);
  const totalCreditBalance = lines.reduce((sum, l) => sum + l.creditBalance, 0);

  const isBalanced =
    totalDebit === totalCredit && totalDebitBalance === totalCreditBalance;

  return {
    lines,
    totalDebit,
    totalCredit,
    totalDebitBalance,
    totalCreditBalance,
    isBalanced,
  };
}

/**
 * Construit le Compte de Résultat et le Bilan SYSCOHADA déterministes.
 */
export function computeFinancialStatements(entries: JournalEntry[]): FinancialStatements {
  const { lines } = computeBalance(entries);

  // 1. CALCUL DU COMPTE DE RÉSULTAT
  // Produits (Classe 7) : solde créditeur net
  // Charges (Classe 6) : solde débiteur net
  let salesMerchandise = 0;
  let serviceRevenue = 0;
  let financialRevenue = 0;

  let purchasesMerchandise = 0;
  let suppliesAndServices = 0;
  let personnelExpenses = 0;
  let depreciationExpenses = 0;
  let interestExpenses = 0;

  for (const line of lines) {
    const code = line.accountCode;
    const netCredit = line.creditBalance - line.debitBalance;
    const netDebit = line.debitBalance - line.creditBalance;

    if (code.startsWith('701')) salesMerchandise += Math.max(0, netCredit);
    else if (code.startsWith('706') || code.startsWith('70')) serviceRevenue += Math.max(0, netCredit);
    else if (code.startsWith('77')) financialRevenue += Math.max(0, netCredit);

    if (code.startsWith('601')) purchasesMerchandise += Math.max(0, netDebit);
    else if (code.startsWith('60') || code.startsWith('61') || code.startsWith('62') || code.startsWith('63') || code.startsWith('64')) {
      suppliesAndServices += Math.max(0, netDebit);
    } else if (code.startsWith('66')) {
      personnelExpenses += Math.max(0, netDebit);
    } else if (code.startsWith('68')) {
      depreciationExpenses += Math.max(0, netDebit);
    } else if (code.startsWith('67')) {
      interestExpenses += Math.max(0, netDebit);
    }
  }

  const commercialMargin = salesMerchandise - purchasesMerchandise;
  const totalOperatingRevenue = salesMerchandise + serviceRevenue;
  const valueAdded = commercialMargin + serviceRevenue - suppliesAndServices;
  const grossOperatingSurplus = valueAdded - personnelExpenses; // EBE
  const operatingIncome = grossOperatingSurplus - depreciationExpenses;
  const financialIncome = financialRevenue - interestExpenses;
  const netIncome = operatingIncome + financialIncome;

  const incomeItems: IncomeStatementItem[] = [
    { code: 'CA_MARCH', label: 'Ventes de marchandises (+)', amount: salesMerchandise },
    { code: 'ACH_MARCH', label: 'Achats de marchandises (-)', amount: purchasesMerchandise },
    { code: 'MARGE_COM', label: '= Marge commerciale', amount: commercialMargin, isSubtotal: true },
    { code: 'CA_SERV', label: 'Prestations de services & commissions (+)', amount: serviceRevenue },
    { code: 'SERV_EXT', label: 'Consommations intermédiaires & services ext. (-)', amount: suppliesAndServices },
    { code: 'VAL_AJOUT', label: '= Valeur Ajoutée', amount: valueAdded, isSubtotal: true },
    { code: 'CHARG_PERS', label: 'Charges de personnel (-)', amount: personnelExpenses },
    { code: 'EBE', label: '= Excédent Brut d\'Exploitation (EBE)', amount: grossOperatingSurplus, isSubtotal: true },
    { code: 'DOT_AMORT', label: 'Dotations aux amortissements (-)', amount: depreciationExpenses },
    { code: 'RES_EXPL', label: '= Résultat d\'Exploitation', amount: operatingIncome, isSubtotal: true },
    { code: 'PROD_FIN', label: 'Produits financiers (+)', amount: financialRevenue },
    { code: 'CHARG_FIN', label: 'Charges financières (-)', amount: interestExpenses },
    { code: 'RES_FIN', label: '= Résultat Financier', amount: financialIncome, isSubtotal: true },
    { code: 'RES_NET', label: '= RÉSULTAT NET DE L\'EXERCICE', amount: netIncome, isSubtotal: true },
  ];

  // 2. CALCUL DU BILAN
  // Actif : Immobilisations (2), Stocks (3), Créances clients (41), Trésorerie (52, 57)
  // Passif : Capitaux propres (10, 11, 12, 13=Résultat net), Dettes fi (16), Fournisseurs (40), Dettes fiscales/sociales (42, 43, 44)
  let fixedAssetsGross = 0;
  let fixedAssetsAmort = 0;
  let stocks = 0;
  let receivables = 0;
  let cashAndBanks = 0;

  let equityCapital = 0;
  let financialDebts = 0;
  let supplierPayables = 0;
  let taxAndSocialDebts = 0;
  let bankOverdraft = 0;

  for (const line of lines) {
    const code = line.accountCode;
    const netDebit = line.debitBalance - line.creditBalance;
    const netCredit = line.creditBalance - line.debitBalance;

    if (code.startsWith('28')) {
      fixedAssetsAmort += Math.max(0, netCredit);
    } else if (code.startsWith('2')) {
      fixedAssetsGross += Math.max(0, netDebit);
    } else if (code.startsWith('3')) {
      stocks += Math.max(0, netDebit);
    } else if (code.startsWith('41')) {
      receivables += Math.max(0, netDebit);
    } else if (code.startsWith('52') || code.startsWith('57')) {
      cashAndBanks += Math.max(0, netDebit);
    }

    if (code.startsWith('10') || code.startsWith('11') || code.startsWith('12')) {
      equityCapital += Math.max(0, netCredit);
    } else if (code.startsWith('16')) {
      financialDebts += Math.max(0, netCredit);
    } else if (code.startsWith('40')) {
      supplierPayables += Math.max(0, netCredit);
    } else if (code.startsWith('42') || code.startsWith('43') || code.startsWith('44')) {
      taxAndSocialDebts += Math.max(0, netCredit);
    } else if (code.startsWith('56')) {
      bankOverdraft += Math.max(0, netCredit);
    }
  }

  const fixedAssetsNet = fixedAssetsGross - fixedAssetsAmort;
  const totalAssets = fixedAssetsNet + stocks + receivables + cashAndBanks;

  const totalEquity = equityCapital + netIncome;
  const totalLiabilities = totalEquity + financialDebts + supplierPayables + taxAndSocialDebts + bankOverdraft;

  const assets: BalanceSheetItem[] = [
    { code: 'ACTIF_IMMOB', label: 'Actif Immobilisé (Brut, Amort., Net)', grossAmount: fixedAssetsGross, depreciation: fixedAssetsAmort, netAmount: fixedAssetsNet },
    { code: 'STOCKS', label: 'Stocks de marchandises & matières', grossAmount: stocks, depreciation: 0, netAmount: stocks },
    { code: 'CREANCES', label: 'Créances clients & comptes rattachés', grossAmount: receivables, depreciation: 0, netAmount: receivables },
    { code: 'TRESORERIE_ACTIF', label: 'Disponibilités (Banques & Caisse)', grossAmount: cashAndBanks, depreciation: 0, netAmount: cashAndBanks },
  ];

  const liabilities: BalanceSheetItem[] = [
    { code: 'CAPITAUX_PROPRES', label: 'Capital social & réserves', grossAmount: equityCapital, depreciation: 0, netAmount: equityCapital },
    { code: 'RESULTAT_EXERCICE', label: 'Résultat net de l\'exercice', grossAmount: netIncome, depreciation: 0, netAmount: netIncome },
    { code: 'DETTES_FIN', label: 'Emprunts et dettes financières', grossAmount: financialDebts, depreciation: 0, netAmount: financialDebts },
    { code: 'FOURNISSEURS', label: 'Dettes fournisseurs & comptes rattachés', grossAmount: supplierPayables, depreciation: 0, netAmount: supplierPayables },
    { code: 'DETTES_FISC_SOC', label: 'Dettes fiscales et sociales (État, CNPS)', grossAmount: taxAndSocialDebts, depreciation: 0, netAmount: taxAndSocialDebts },
    { code: 'TRESORERIE_PASSIF', label: 'Crédits de trésorerie (Découverts)', grossAmount: bankOverdraft, depreciation: 0, netAmount: bankOverdraft },
  ];

  const isBalanced = totalAssets === totalLiabilities;

  return {
    balanceSheet: {
      assets,
      liabilities,
      totalAssets,
      totalLiabilities,
      isBalanced,
    },
    incomeStatement: {
      items: incomeItems,
      operatingIncome,
      financialIncome,
      ordinaryIncome: operatingIncome + financialIncome,
      netIncome,
    },
  };
}
