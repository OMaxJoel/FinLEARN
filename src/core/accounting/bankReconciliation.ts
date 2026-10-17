import { BankStatementLine, BookStatementLine } from '../../types/accounting';

export interface ReconciliationResult {
  reconciledBankBalance: number;
  reconciledBookBalance: number;
  difference: number;
  isReconciled: boolean;
  unreconciledBankLines: BankStatementLine[];
  unreconciledBookLines: BookStatementLine[];
  summary: {
    initialBankBalance: number;
    initialBookBalance: number;
    outstandingChecks: number;    // Chèques émis non débités par la banque
    depositsInTransit: number;    // Remises non encore créditées par la banque
    bankChargesNotRecorded: number; // Agios / frais non enregistrés en compta
    directTransfersNotRecorded: number; // Virements clients reçus non enreg.
  };
}

/**
 * Calcul déterministe de l'état de rapprochement bancaire.
 *
 * Convention SYSCOHADA :
 * - Le compte 521 de l'entreprise est débiteur pour un solde positif (ressource détenue).
 * - Le relevé de la banque est créditeur pour un solde positif (dette de la banque envers l'entreprise).
 */
export function computeBankReconciliation(
  initialBankBalance: number, // Solde final figurant sur le relevé de compte bancaire
  initialBookBalance: number, // Solde de clôture du compte 521 Banque dans le grand livre
  bankLines: BankStatementLine[],
  bookLines: BookStatementLine[]
): ReconciliationResult {
  const unreconciledBankLines = bankLines.filter((l) => !l.isReconciled);
  const unreconciledBookLines = bookLines.filter((l) => !l.isReconciled);

  // Éléments du livre comptable non encore pris en compte par la banque
  // - Chèques émis inscrits au crédit du 521 mais pas encore débités par la banque : réduisent le solde banque
  const outstandingChecks = unreconciledBookLines.reduce((sum, l) => sum + l.credit, 0);

  // - Remises de chèques/espèces inscrites au débit du 521 non créditées par la banque : augmentent le solde banque
  const depositsInTransit = unreconciledBookLines.reduce((sum, l) => sum + l.debit, 0);

  // Solde banque théorique corrigé
  const reconciledBankBalance = initialBankBalance + depositsInTransit - outstandingChecks;

  // Éléments du relevé bancaire non encore enregistrés dans la comptabilité
  // - Frais bancaires, agios (débit banque) : diminuent le solde comptable
  const bankChargesNotRecorded = unreconciledBankLines.reduce((sum, l) => sum + l.debit, 0);

  // - Virements de clients ou intérêts créditeurs (crédit banque) : augmentent le solde comptable
  const directTransfersNotRecorded = unreconciledBankLines.reduce((sum, l) => sum + l.credit, 0);

  // Solde comptable corrigé
  const reconciledBookBalance = initialBookBalance + directTransfersNotRecorded - bankChargesNotRecorded;

  const difference = Math.round(reconciledBankBalance - reconciledBookBalance);
  const isReconciled = Math.abs(difference) === 0;

  return {
    reconciledBankBalance,
    reconciledBookBalance,
    difference,
    isReconciled,
    unreconciledBankLines,
    unreconciledBookLines,
    summary: {
      initialBankBalance,
      initialBookBalance,
      outstandingChecks,
      depositsInTransit,
      bankChargesNotRecorded,
      directTransfersNotRecorded,
    },
  };
}
