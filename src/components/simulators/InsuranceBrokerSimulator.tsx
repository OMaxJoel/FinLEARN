import React, { useState } from 'react';
import {
  computePolicyFinancials,
  reconcileInsuranceBordereau,
  checkCIMAArticle13Compliance,
  InsurancePolicy,
  InsuranceBranch,
} from '../../core/insurance/commissions';
import { ICC_POLICIES_DATASET } from '../../data/mockDatasets';
import { Shield, CheckCircle2, AlertCircle, FileSpreadsheet, RotateCcw } from 'lucide-react';

export const InsuranceBrokerSimulator: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'reconciliation' | 'cima'>('calculator');

  // État du calculateur de police
  const [branch, setBranch] = useState<InsuranceBranch>('AUTO');
  const [netPremium, setNetPremium] = useState<number>(15000000); // 15M FCFA
  const [accessories, setAccessories] = useState<number>(100000); // 100k FCFA
  const [taxRate, setTaxRate] = useState<number>(14.5); // 14.5% taxe d'assurance CI
  const [commissionRate, setCommissionRate] = useState<number>(12); // 12%

  const policyCalc = computePolicyFinancials({
    netPremiumFCFA: netPremium,
    accessoriesFCFA: accessories,
    taxRatePercent: taxRate,
    commissionRatePercent: commissionRate,
  });

  // État du rapprochement de bordereau
  const [bordereauSample, setBordereauSample] = useState([
    { policyNumber: 'POL-AUTO-8801', declaredNetPremium: 18000000, declaredCommission: 1800000 }, // Erreur : appliqué 10% au lieu de 12%
    { policyNumber: 'POL-SANTE-4412', declaredNetPremium: 25000000, declaredCommission: 2500000 }, // Conforme
    { policyNumber: 'POL-IARD-3390', declaredNetPremium: 12000000, declaredCommission: 1800000 }, // Conforme
    { policyNumber: 'POL-RC-1099', declaredNetPremium: 4500000, declaredCommission: 562500 }, // Conforme
  ]);

  const reconciliationResult = reconcileInsuranceBordereau(ICC_POLICIES_DATASET, bordereauSample);

  // État du contrôle Article 13 CIMA
  const [effectiveDate, setEffectiveDate] = useState('2026-01-01');
  const [paymentDate, setPaymentDate] = useState('2026-01-20');
  const cimaCheck = checkCIMAArticle13Compliance(effectiveDate, paymentDate, 30);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
            Courtage en Assurance • Cadre Régional CIMA
          </span>
          <span className="text-xs text-slate-400">Cabinet Ivoire Courtage Conseil (ICC)</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
          Simulateur Financier de Courtage d'Assurance
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Calcul des commissions par branche, décomposition des taxes d'assurance, contrôle Article 13 CIMA et rapprochement des bordereaux de compagnies.
        </p>
      </div>

      {/* Sous-navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'calculator'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          1. Décomposition de Prime & Commission
        </button>
        <button
          onClick={() => setActiveSubTab('reconciliation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'reconciliation'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          2. Rapprochement de Bordereau ({reconciliationResult.totalDiscrepantCount} écarts)
        </button>
        <button
          onClick={() => setActiveSubTab('cima')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'cima'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          3. Conformité Article 13 CIMA
        </button>
      </div>

      {/* 1. CALCULATEUR */}
      {activeSubTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Paramètres de la Police :</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Branche d'assurance</label>
                <select
                  value={branch}
                  onChange={(e) => {
                    const b = e.target.value as InsuranceBranch;
                    setBranch(b);
                    if (b === 'AUTO') setCommissionRate(12);
                    else if (b === 'SANTE') {
                      setCommissionRate(10);
                      setTaxRate(0);
                    } else if (b === 'IARD') {
                      setCommissionRate(15);
                      setTaxRate(14.5);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value="AUTO">Automobile (Flotte Entreprise) - Convention 12%</option>
                  <option value="SANTE">Santé & Maladie Groupe - Convention 10% (Exonérée)</option>
                  <option value="IARD">Incendie & Risques Industriels - Convention 15%</option>
                  <option value="RC">Responsabilité Civile - Convention 12.5%</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">
                  Prime Nette d'Émission (FCFA) : {netPremium.toLocaleString()} F
                </label>
                <input
                  type="range"
                  min={1000000}
                  max={50000000}
                  step={500000}
                  value={netPremium}
                  onChange={(e) => setNetPremium(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Accessoires (FCFA)</label>
                  <input
                    type="number"
                    value={accessories}
                    onChange={(e) => setAccessories(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Taxe d'assurance (%)</label>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Taux de Commission Courtier (%)</label>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Décomposition financière */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Décomposition Financière de la Police
              </span>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Prime Nette d'Émission :</span>
                  <span className="font-mono font-bold">{policyCalc.netPremium.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Frais Accessoires :</span>
                  <span className="font-mono">{policyCalc.accessories.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Taxe d'Assurance ({taxRate}%) :</span>
                  <span className="font-mono text-amber-400">+{policyCalc.taxAmount.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between py-2 border-b-2 border-slate-700 font-bold text-sm">
                  <span className="text-white">Prime Totale TTC à Régler :</span>
                  <span className="font-mono text-sky-400">{policyCalc.grossPremiumTTC.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/80 border border-indigo-500/30 space-y-1">
              <span className="text-[11px] font-bold text-indigo-300 uppercase">
                Revenu Net du Cabinet de Courtage :
              </span>
              <p className="text-2xl font-extrabold font-mono text-emerald-400">
                {policyCalc.expectedCommission.toLocaleString()} FCFA
              </p>
              <p className="text-[11px] text-slate-400">
                Calculé sur la Prime Nette ({netPremium.toLocaleString()} F) au taux de {commissionRate}%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. RAPPROCHEMENT DE BORDEREAU */}
      {activeSubTab === 'reconciliation' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
            <span className="font-medium">{reconciliationResult.summaryNote}</span>
            <span className="font-mono font-bold text-red-700">
              Écart net : {reconciliationResult.totalVariance.toLocaleString()} FCFA
            </span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white font-semibold">
                <tr>
                  <th className="py-3 px-3">Police</th>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3 text-right">Com. Attendue</th>
                  <th className="py-3 px-3 text-right">Com. Déclarée</th>
                  <th className="py-3 px-3 text-right">Écart (FCFA)</th>
                  <th className="py-3 px-3 text-center">Diagnostic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reconciliationResult.reconciledLines.map((l) => (
                  <tr key={l.policyNumber} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{l.policyNumber}</td>
                    <td className="py-3 px-3 text-slate-700">{l.clientName}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-900">
                      {l.expectedCommission.toLocaleString()} F
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-900">
                      {l.declaredCommission.toLocaleString()} F
                    </td>
                    <td
                      className={`py-3 px-3 text-right font-mono font-bold ${
                        l.commissionVariance < 0
                          ? 'text-red-600'
                          : l.commissionVariance > 0
                          ? 'text-emerald-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {l.commissionVariance > 0 ? `+${l.commissionVariance.toLocaleString()}` : l.commissionVariance.toLocaleString()} F
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          l.status === 'CONFORME'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. CONFORMITÉ CIMA ARTICLE 13 */}
      {activeSubTab === 'cima' && (
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-900">
              Contrôle de l'Article 13 du Code CIMA révisé (« Pas de prime, pas d'assurance »)
            </h3>
            <p className="text-xs text-slate-500">
              Vérifiez si l'encaissement de la prime est intervenu dans le délai légal imparti (délai de grâce maximal de 30 jours).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Date de prise d'effet du contrat</label>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Date d'encaissement réel de la prime</label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono bg-white"
              />
            </div>
          </div>

          <div
            className={`p-4 rounded-xl text-xs space-y-1 border ${
              cimaCheck.isCompliant
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-red-50 border-red-200 text-red-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {cimaCheck.isCompliant ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Conforme à l'Article 13 CIMA
                </span>
              ) : (
                <span className="text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Infraction Réglementaire CIMA Détectée
                </span>
              )}
            </div>
            <p className="leading-relaxed">{cimaCheck.statusMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
