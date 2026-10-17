import React, { useState } from 'react';
import { JournalEntry, JournalEntryLine } from '../../types/accounting';
import { INITIAL_JOURNAL_ENTRIES } from '../../data/mockDatasets';
import { SYSCOHADA_PLAN, findAccount } from '../../core/accounting/syscohada';
import {
  validateJournalEntry,
  computeBalance,
  computeLedger,
  computeFinancialStatements,
} from '../../core/accounting/engine';
import {
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const AccountingSimulator: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(INITIAL_JOURNAL_ENTRIES);
  const [activeTab, setActiveTab] = useState<'journal' | 'grandLivre' | 'balance' | 'etats'>('journal');

  // Formulaire d'ajout d'écriture
  const [newDate, setNewDate] = useState('2026-01-30');
  const [newLabel, setNewLabel] = useState('Règlement de facture client');
  const [newRef, setNewRef] = useState('CHQ-990');
  const [lines, setLines] = useState<JournalEntryLine[]>([
    { id: '1', accountCode: '5211', accountLabel: 'Banques locales (SGBCI)', debit: 2000000, credit: 0 },
    { id: '2', accountCode: '4111', accountLabel: 'Clients locaux', debit: 0, credit: 2000000 },
  ]);
  const [formError, setFormError] = useState<string | null>(null);

  const balanceResult = computeBalance(entries);
  const ledger = computeLedger(entries);
  const statements = computeFinancialStatements(entries);

  const handleAddLine = () => {
    setLines((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        accountCode: '4011',
        accountLabel: 'Fournisseurs d\'exploitation locaux',
        debit: 0,
        credit: 0,
      },
    ]);
  };

  const handleRemoveLine = (id: string) => {
    if (lines.length <= 2) return;
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const handleLineChange = (id: string, field: keyof JournalEntryLine, value: any) => {
    setLines((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const updated = { ...l, [field]: value };
          if (field === 'accountCode') {
            const acc = findAccount(value);
            if (acc) updated.accountLabel = acc.label;
          }
          return updated;
        }
        return l;
      })
    );
  };

  const handleSaveEntry = () => {
    const newEntry: JournalEntry = {
      id: `J${Date.now()}`,
      date: newDate,
      label: newLabel,
      refPiece: newRef,
      lines,
    };

    const val = validateJournalEntry(newEntry);
    if (!val.isValid) {
      setFormError(val.errorMessage || 'Écriture invalide.');
      return;
    }

    setEntries((prev) => [...prev, newEntry]);
    setFormError(null);
    // Réinitialiser avec une nouvelle ligne par défaut
    setLines([
      { id: '1', accountCode: '6011', accountLabel: 'Achats de marchandises', debit: 1000000, credit: 0 },
      { id: '2', accountCode: '4011', accountLabel: 'Fournisseurs d\'exploitation locaux', debit: 0, credit: 1000000 },
    ]);
  };

  const handleReset = () => {
    setEntries(INITIAL_JOURNAL_ENTRIES);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* En-tête du Simulateur */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              Moteur Comptable Déterministe
            </span>
            <span className="text-xs text-slate-400">PME Ivoire Distribution • Abidjan</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Simulateur de Cycle Comptable SYSCOHADA
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Saisissez des opérations au journal et observez le recalcul instantané du grand livre, de la balance et du compte de résultat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Navigation par Onglets (Journal, Grand Livre, Balance, États Financiers) */}
      <div className="flex overflow-x-auto sm:flex-wrap gap-2 border-b border-slate-200 pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('journal')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeTab === 'journal'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          1. Journal Général ({entries.length} écritures)
        </button>
        <button
          onClick={() => setActiveTab('grandLivre')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeTab === 'grandLivre'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          2. Grand Livre (Comptes en T)
        </button>
        <button
          onClick={() => setActiveTab('balance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeTab === 'balance'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          3. Balance à 6 Colonnes
        </button>
        <button
          onClick={() => setActiveTab('etats')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeTab === 'etats'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          4. Bilan & Compte de Résultat
        </button>
      </div>

      {/* CONTENU ONGLETS */}

      {/* 1. JOURNAL */}
      {activeTab === 'journal' && (
        <div className="space-y-6">
          {/* Formulaire de saisie d'écriture */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Plus className="w-4 h-4 text-sky-600" />
              Saisir une Nouvelle Écriture Comptable
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Libellé de l'opération</label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Réf. Pièce Justificative</label>
                <input
                  type="text"
                  value={newRef}
                  onChange={(e) => setNewRef(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                />
              </div>
            </div>

            {/* Lignes de Débit / Crédit (Scrollable sur mobile pour confort de saisie) */}
            <div className="overflow-x-auto pb-1">
              <div className="min-w-[500px] space-y-2">
                <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-500 uppercase px-2">
                  <div className="col-span-5">Compte SYSCOHADA</div>
                  <div className="col-span-3 text-right">Débit (FCFA)</div>
                  <div className="col-span-3 text-right">Crédit (FCFA)</div>
                  <div className="col-span-1"></div>
                </div>

                {lines.map((l) => (
                  <div key={l.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <select
                      value={l.accountCode}
                      onChange={(e) => handleLineChange(l.id, 'accountCode', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-medium bg-white"
                    >
                      {SYSCOHADA_PLAN.map((acc) => (
                        <option key={acc.code} value={acc.code}>
                          {acc.code} - {acc.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      value={l.debit || ''}
                      placeholder="0"
                      onChange={(e) => handleLineChange(l.id, 'debit', Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs text-right font-mono rounded-lg border border-slate-300"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      value={l.credit || ''}
                      placeholder="0"
                      onChange={(e) => handleLineChange(l.id, 'credit', Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs text-right font-mono rounded-lg border border-slate-300"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => handleRemoveLine(l.id)}
                      disabled={lines.length <= 2}
                      className="text-slate-400 hover:text-red-600 disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Total et Équilibre en direct */}
            {(() => {
              const sumD = lines.reduce((acc, curr) => acc + (Number(curr.debit) || 0), 0);
              const sumC = lines.reduce((acc, curr) => acc + (Number(curr.credit) || 0), 0);
              const isOk = sumD === sumC && sumD > 0;
              return (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-4 text-xs font-mono font-bold">
                    <span>Total Débit : {sumD.toLocaleString()} FCFA</span>
                    <span>Total Crédit : {sumC.toLocaleString()} FCFA</span>
                    {isOk ? (
                      <span className="text-emerald-600 flex items-center gap-1 font-sans">
                        <CheckCircle2 className="w-4 h-4" /> Écriture Équilibrée
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-4 h-4" /> Déséquilibre ({Math.abs(sumD - sumC).toLocaleString()} FCFA)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAddLine}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      + Ajouter une ligne
                    </button>
                    <button
                      onClick={handleSaveEntry}
                      disabled={!isOk}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      Enregistrer l'écriture
                    </button>
                  </div>
                </div>
              );
            })()}

            {formError && (
              <p className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-lg border border-red-200">
                {formError}
              </p>
            )}
          </div>

          {/* Liste des Écritures Existantes */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Écritures Enregistrées au Journal :</h3>
            <div className="space-y-3">
              {entries.map((entry) => (
                <div key={entry.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-100/80 px-4 py-2 flex items-center justify-between text-xs font-semibold text-slate-700 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500">{entry.date}</span>
                      <span>{entry.label}</span>
                    </div>
                    <span className="font-mono text-slate-500 text-[11px]">Pièce : {entry.refPiece}</span>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs">
                    {entry.lines.map((l) => (
                      <div key={l.id} className="px-4 py-2 grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-2 font-mono font-bold text-slate-900">{l.accountCode}</div>
                        <div className="col-span-6 text-slate-700">{l.accountLabel}</div>
                        <div className="col-span-2 text-right font-mono font-semibold text-slate-800">
                          {l.debit > 0 ? `${l.debit.toLocaleString()} FCFA` : '—'}
                        </div>
                        <div className="col-span-2 text-right font-mono font-semibold text-slate-800">
                          {l.credit > 0 ? `${l.credit.toLocaleString()} FCFA` : '—'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. GRAND LIVRE */}
      {activeTab === 'grandLivre' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-sky-50 text-xs text-sky-950 border border-sky-200">
            Le Grand Livre regroupe toutes les opérations par compte sous la forme traditionnelle de comptes en T, permettant de dégager le solde débiteur ou créditeur net de chaque poste.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(ledger).map((acc) => (
              <div key={acc.accountCode} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between">
                <div className="bg-slate-800 text-white px-3 py-2 text-xs font-bold flex items-center justify-between">
                  <span>{acc.accountCode} - {acc.accountLabel}</span>
                </div>

                <div className="p-3 text-xs space-y-2 flex-1">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-500 border-b border-slate-200 pb-1">
                    <div>Débit (+)</div>
                    <div className="text-right">Crédit (-)</div>
                  </div>

                  <div className="space-y-1 max-h-36 overflow-y-auto">
                    {acc.movements.map((m, mIdx) => (
                      <div key={mIdx} className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="text-emerald-700">{m.debit > 0 ? `${m.debit.toLocaleString()} F` : ''}</div>
                        <div className="text-right text-red-700">{m.credit > 0 ? `${m.credit.toLocaleString()} F` : ''}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 px-3 py-2 border-t border-slate-200 text-xs font-bold flex items-center justify-between">
                  <span className="text-slate-600">Solde Net :</span>
                  {acc.debitBalance > 0 && (
                    <span className="text-emerald-700 font-mono">Débiteur : {acc.debitBalance.toLocaleString()} FCFA</span>
                  )}
                  {acc.creditBalance > 0 && (
                    <span className="text-blue-700 font-mono">Créditeur : {acc.creditBalance.toLocaleString()} FCFA</span>
                  )}
                  {acc.debitBalance === 0 && acc.creditBalance === 0 && (
                    <span className="text-slate-400 font-mono">Solde nul (0 FCFA)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. BALANCE */}
      {activeTab === 'balance' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-50 text-xs text-emerald-950 border border-emerald-200 flex items-center justify-between">
            <span>
              Contrôle de la Balance : Total Débits == Total Crédits et Total Soldes Débiteurs == Total Soldes Créditeurs.
            </span>
            <span className="font-bold text-emerald-800 font-mono">
              {balanceResult.isBalanced ? '✓ 100% ÉQUILIBRÉE' : '⚠ DÉSÉQUILIBRÉE'}
            </span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white font-semibold">
                <tr>
                  <th className="py-3 px-3">Compte</th>
                  <th className="py-3 px-3">Intitulé</th>
                  <th className="py-3 px-3 text-right">Mouvement Débit</th>
                  <th className="py-3 px-3 text-right">Mouvement Crédit</th>
                  <th className="py-3 px-3 text-right">Solde Débiteur</th>
                  <th className="py-3 px-3 text-right">Solde Créditeur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {balanceResult.lines.map((l) => (
                  <tr key={l.accountCode} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{l.accountCode}</td>
                    <td className="py-2.5 px-3 text-slate-700">{l.accountLabel}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{l.totalDebit > 0 ? l.totalDebit.toLocaleString() : '—'}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{l.totalCredit > 0 ? l.totalCredit.toLocaleString() : '—'}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-700">
                      {l.debitBalance > 0 ? l.debitBalance.toLocaleString() : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-blue-700">
                      {l.creditBalance > 0 ? l.creditBalance.toLocaleString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300">
                <tr>
                  <td colSpan={2} className="py-3 px-3 text-slate-900 uppercase">Totaux Généraux (FCFA)</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-900">{balanceResult.totalDebit.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-900">{balanceResult.totalCredit.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-800">{balanceResult.totalDebitBalance.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono text-blue-800">{balanceResult.totalCreditBalance.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* 4. ÉTATS FINANCIERS */}
      {activeTab === 'etats' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compte de Résultat */}
          <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Compte de Résultat SYSCOHADA</h3>
              <span className="text-xs font-mono font-bold text-slate-500">Exercice 2026 (FCFA)</span>
            </div>

            <div className="space-y-2 text-xs">
              {statements.incomeStatement.items.map((item) => (
                <div
                  key={item.code}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${
                    item.isSubtotal ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-600'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`font-mono ${item.code === 'RES_NET' ? 'text-emerald-700 text-sm' : ''}`}>
                    {item.amount.toLocaleString()} FCFA
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bilan Synthétique */}
          <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Bilan Synthétique</h3>
              <span className={`text-xs font-mono font-bold ${statements.balanceSheet.isBalanced ? 'text-emerald-600' : 'text-red-600'}`}>
                {statements.balanceSheet.isBalanced ? 'Actif == Passif' : 'Déséquilibre !'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              {/* Actif */}
              <div className="space-y-2 border-r border-slate-100 pr-3">
                <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">ACTIF (Emplois)</h4>
                {statements.balanceSheet.assets.map((a) => (
                  <div key={a.code} className="space-y-0.5">
                    <span className="text-[11px] text-slate-500 block">{a.label}</span>
                    <span className="font-mono font-semibold text-slate-800">{a.netAmount.toLocaleString()} FCFA</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200 font-bold text-slate-900">
                  Total Actif : {statements.balanceSheet.totalAssets.toLocaleString()} FCFA
                </div>
              </div>

              {/* Passif */}
              <div className="space-y-2 pl-1">
                <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">PASSIF (Ressources)</h4>
                {statements.balanceSheet.liabilities.map((l) => (
                  <div key={l.code} className="space-y-0.5">
                    <span className="text-[11px] text-slate-500 block">{l.label}</span>
                    <span className="font-mono font-semibold text-slate-800">{l.netAmount.toLocaleString()} FCFA</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200 font-bold text-slate-900">
                  Total Passif : {statements.balanceSheet.totalLiabilities.toLocaleString()} FCFA
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
