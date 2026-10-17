import { useState } from 'react';
import {
  computeFinancialRatios,
  FinancialRatiosResult,
} from '../../core/finance/ratios';
import {
  TrendingUp,
  Activity,
  Layers,
  Scale,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Sliders,
  DollarSign,
  PieChart,
  FileText,
  BadgeAlert,
  ShieldCheck,
  Building,
} from 'lucide-react';

interface CompanyFinancials {
  fixedAssets: number;
  stableResources: number;
  currentAssetsNonCash: number;
  currentLiabNonCash: number;
  cashAssets: number;
  cashLiabilities: number;
  totalAssets: number;
  equity: number;
  financialDebts: number;
  turnoverHT: number;
  purchasesHT: number;
  operatingIncome: number;
  netIncome: number;
  receivables: number;
  payables: number;
  stocks: number;
}

const DEFAULT_COMPANY_N: CompanyFinancials = {
  fixedAssets: 65000000,
  stableResources: 95000000,
  currentAssetsNonCash: 58000000,
  currentLiabNonCash: 38000000,
  cashAssets: 25000000,
  cashLiabilities: 5000000,
  totalAssets: 148000000,
  equity: 70000000,
  financialDebts: 25000000,
  turnoverHT: 240000000,
  purchasesHT: 130000000,
  operatingIncome: 32000000,
  netIncome: 22000000,
  receivables: 35000000,
  payables: 25000000,
  stocks: 23000000,
};

const DEFAULT_COMPANY_N_MINUS_1: CompanyFinancials = {
  fixedAssets: 50000000,
  stableResources: 75000000,
  currentAssetsNonCash: 45000000,
  currentLiabNonCash: 32000000,
  cashAssets: 18000000,
  cashLiabilities: 6000000,
  totalAssets: 113000000,
  equity: 55000000,
  financialDebts: 20000000,
  turnoverHT: 190000000,
  purchasesHT: 105000000,
  operatingIncome: 24000000,
  netIncome: 16000000,
  receivables: 28000000,
  payables: 20000000,
  stocks: 17000000,
};

export const FinancialAnalysisLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ratios' | 'workingCapitalCycle' | 'horizontal' | 'creditCommittee'>('ratios');
  const [financials, setFinancials] = useState<CompanyFinancials>(DEFAULT_COMPANY_N);

  // Curseurs personnalisés pour le cycle d'exploitation
  const [dsoSlider, setDsoSlider] = useState<number>(45); // Jours clients
  const [dpoSlider, setDpoSlider] = useState<number>(60); // Jours fournisseurs
  const [dioSlider, setDioSlider] = useState<number>(55); // Jours stocks

  // Calcul des ratios
  const ratiosResult: FinancialRatiosResult = computeFinancialRatios(financials);

  // Simulation dynamique du cycle d'exploitation :
  // CA TTC journalier = (turnoverHT * 1.18) / 360
  const dailySalesTTC = (financials.turnoverHT * 1.18) / 360;
  const simulatedReceivables = Math.round(dailySalesTTC * dsoSlider);

  const dailyPurchasesTTC = (financials.purchasesHT * 1.18) / 360;
  const simulatedPayables = Math.round(dailyPurchasesTTC * dpoSlider);

  const dailyCostOfSales = financials.purchasesHT / 360;
  const simulatedStocks = Math.round(dailyCostOfSales * dioSlider);

  const simulatedBFR = simulatedReceivables + simulatedStocks - simulatedPayables;
  const simulatedTN = ratiosResult.workingCapital.fr - simulatedBFR;

  // Calcul du Z-Score adapté PME OHADA/UEMOA
  // Formule type Altman / Banque de France adaptée PME :
  // Z = 1.2*(BFR/TotalActif) + 1.4*(Résultat Net/TotalActif) + 3.3*(EBIT/TotalActif) + 0.6*(Capitaux Propres/Dettes Totales) + 1.0*(CA/TotalActif)
  const totalDebts = financials.financialDebts + financials.currentLiabNonCash + financials.cashLiabilities;
  const x1 = ratiosResult.workingCapital.bfr / financials.totalAssets;
  const x2 = financials.netIncome / financials.totalAssets;
  const x3 = financials.operatingIncome / financials.totalAssets;
  const x4 = totalDebts > 0 ? financials.equity / totalDebts : 1;
  const x5 = financials.turnoverHT / financials.totalAssets;
  const zScore = Math.round((1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 1.0 * x5) * 100) / 100;

  const formatFCFA = (val: number) => `${Math.round(val).toLocaleString('fr-FR')} FCFA`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* En-tête Pédagogique */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl border border-amber-900/40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
              <Activity className="w-3.5 h-3.5" /> Compétence 2 — Analyse Financière (ANAL-01 à ANAL-04)
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Laboratoire d'Analyse Financière & Diagnostic PME
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Analysez la solvabilité, l'équilibre fonctionnel (FR, BFR, TN), simulez le cycle d'exploitation et évaluez
              le risque de contrepartie pour le comité de crédit bancaire.
            </p>
          </div>
          <div className="px-4 py-2 bg-slate-800/90 rounded-2xl border border-slate-700 text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Dossier Examiné</span>
            <span className="text-xs font-black text-amber-400">Ivoire Agro-Distribution SARL</span>
          </div>
        </div>
      </div>

      {/* Navigation entre sous-modules */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/80 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('ratios')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'ratios'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Scale className="w-4 h-4 text-amber-400" />
          1. Équilibre Fonctionnel & Ratios
        </button>

        <button
          onClick={() => setActiveTab('workingCapitalCycle')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'workingCapitalCycle'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Sliders className="w-4 h-4 text-emerald-400" />
          2. Cycle d'Exploitation (DSO / DPO / DIO)
        </button>

        <button
          onClick={() => setActiveTab('horizontal')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'horizontal'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-sky-400" />
          3. Analyse Horizontale & Verticale
        </button>

        <button
          onClick={() => setActiveTab('creditCommittee')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'creditCommittee'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Building className="w-4 h-4 text-indigo-400" />
          4. Comité de Crédit & Scoring Z
        </button>
      </div>

      {/* TAB 1 : ÉQUILIBRE FONCTIONNEL & RATIOS */}
      {activeTab === 'ratios' && (
        <div className="space-y-6">
          {/* L'Équation Fondamentale du Bilan Fonctionnel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Fonds de Roulement (FR)
              </span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {formatFCFA(ratiosResult.workingCapital.fr)}
              </p>
              <p className="text-[11px] text-slate-500 mt-2 font-mono">
                Ressources Stables ({formatFCFA(financials.stableResources)}) - Emplois Stables ({formatFCFA(financials.fixedAssets)})
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Besoin en Fonds de Roulement (BFR)
              </span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {formatFCFA(ratiosResult.workingCapital.bfr)}
              </p>
              <p className="text-[11px] text-slate-500 mt-2 font-mono">
                Actif Circulant ({formatFCFA(financials.currentAssetsNonCash)}) - Passif Circulant ({formatFCFA(financials.currentLiabNonCash)})
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border shadow-sm ${
                ratiosResult.workingCapital.tn >= 0
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Trésorerie Nette (TN = FR - BFR)
              </span>
              <p className="text-2xl font-black mt-1">
                {formatFCFA(ratiosResult.workingCapital.tn)}
              </p>
              <p className="text-[11px] mt-2 opacity-80 font-mono">
                {ratiosResult.workingCapital.isCoherent ? 'Équilibre FR - BFR = TN vérifié ✓' : 'Incohérence'}
              </p>
            </div>
          </div>

          {/* Grille des Ratios Stratégiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Liquidité */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Ratios de Liquidité
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Liquidité Générale</span>
                  <span className="font-mono font-bold text-slate-900">
                    {ratiosResult.liquidity.currentRatio}x (Norme ≥ 1.2)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      ratiosResult.liquidity.currentRatio >= 1.2 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, (ratiosResult.liquidity.currentRatio / 2) * 100)}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-slate-600">Liquidité Réduite (Quick)</span>
                  <span className="font-mono font-bold text-slate-900">
                    {ratiosResult.liquidity.quickRatio}x (Norme ≥ 0.8)
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-slate-600">Liquidité Immédiate (Cash)</span>
                  <span className="font-mono font-bold text-slate-900">{ratiosResult.liquidity.cashRatio}x</span>
                </div>
              </div>
            </div>

            {/* Solvabilité */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                Ratios de Solvabilité & Endettement
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Autonomie Financière</span>
                  <span className="font-mono font-bold text-slate-900">
                    {ratiosResult.solvency.financialAutonomy}x (Norme ≥ 1.0)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      ratiosResult.solvency.financialAutonomy >= 1.0 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, (ratiosResult.solvency.financialAutonomy / 3) * 100)}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-slate-600">Gearing (Dette Nette / CP)</span>
                  <span className="font-mono font-bold text-slate-900">{ratiosResult.solvency.gearing}x</span>
                </div>
              </div>
            </div>

            {/* Rentabilité */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Ratios de Rentabilité
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Marge Opérationnelle</span>
                  <span className="font-mono font-bold text-emerald-600">
                    {ratiosResult.profitability.operatingMargin}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-600">Marge Nette</span>
                  <span className="font-mono font-bold text-slate-900">
                    {ratiosResult.profitability.netMargin}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-600">ROA (Rentabilité Actifs)</span>
                  <span className="font-mono font-bold text-slate-900">
                    {ratiosResult.profitability.roa}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-600">ROE (Rentabilité Fonds Propres)</span>
                  <span className="font-mono font-bold text-indigo-600">
                    {ratiosResult.profitability.roe}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Alertes Diagnostiques */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Synthèse Diagnostique Déterministe
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ratiosResult.diagnosticNotes.map((note, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 : CYCLE D'EXPLOITATION (DSO, DPO, DIO) */}
      {activeTab === 'workingCapitalCycle' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Simulateur Interactif de Rotation du BFR & Cycle de Cash
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Faites glisser les délais de paiement pour visualiser l'impact direct en FCFA sur le BFR et la
                trésorerie nette de la PME.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* DSO */}
              <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-900">Délai Client (DSO)</span>
                  <span className="text-sm font-mono font-black text-amber-700">{dsoSlider} jours</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={dsoSlider}
                  onChange={(e) => setDsoSlider(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
                <div className="text-[11px] text-amber-800 space-y-0.5">
                  <p>Créances induites : <strong>{formatFCFA(simulatedReceivables)}</strong></p>
                  <p className="opacity-80">Plus le délai s'allonge, plus le cash reste immobilisé chez le client.</p>
                </div>
              </div>

              {/* DIO */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-indigo-900">Rotation Stocks (DIO)</span>
                  <span className="text-sm font-mono font-black text-indigo-700">{dioSlider} jours</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={dioSlider}
                  onChange={(e) => setDioSlider(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="text-[11px] text-indigo-800 space-y-0.5">
                  <p>Stocks induits : <strong>{formatFCFA(simulatedStocks)}</strong></p>
                  <p className="opacity-80">Le stock dormant pèse lourdement sur le besoin de financement.</p>
                </div>
              </div>

              {/* DPO */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-900">Délai Fournisseur (DPO)</span>
                  <span className="text-sm font-mono font-black text-emerald-700">{dpoSlider} jours</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={dpoSlider}
                  onChange={(e) => setDpoSlider(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="text-[11px] text-emerald-800 space-y-0.5">
                  <p>Dettes fournisseurs : <strong>{formatFCFA(simulatedPayables)}</strong></p>
                  <p className="opacity-80">Ressource gratuite financée par les fournisseurs.</p>
                </div>
              </div>
            </div>

            {/* Impact calculé en direct */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">
                  Cycle de Conversion du Cash (CCC)
                </span>
                <p className="text-3xl font-black text-amber-400 mt-1">
                  {dsoSlider + dioSlider - dpoSlider} jours de CA
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Formule : DSO ({dsoSlider}j) + DIO ({dioSlider}j) - DPO ({dpoSlider}j)
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 block uppercase">
                  Nouveau BFR Simulé
                </span>
                <p className="text-2xl font-black text-white mt-1">{formatFCFA(simulatedBFR)}</p>
                <span className="text-xs font-bold text-slate-400 block uppercase mt-2">
                  Trésorerie Nette Résultante (TN = FR - BFR)
                </span>
                <p
                  className={`text-xl font-bold font-mono ${
                    simulatedTN >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {formatFCFA(simulatedTN)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3 : ANALYSE HORIZONTALE & VERTICALE */}
      {activeTab === 'horizontal' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Tableau d'Analyse Comparative Pluriannuelle (N vs N-1)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Évolution des postes majeurs du Bilan et du Compte de Résultat en valeur absolue et en pourcentage.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <th className="p-3">Poste Comptable</th>
                  <th className="p-3 text-right">Exercice N-1</th>
                  <th className="p-3 text-right">Exercice N</th>
                  <th className="p-3 text-right">Variation (FCFA)</th>
                  <th className="p-3 text-right">Taux (%)</th>
                  <th className="p-3 text-right">Poids en N</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold text-slate-900">Chiffre d'Affaires HT</td>
                  <td className="p-3 text-right font-mono">{formatFCFA(DEFAULT_COMPANY_N_MINUS_1.turnoverHT)}</td>
                  <td className="p-3 text-right font-mono">{formatFCFA(DEFAULT_COMPANY_N.turnoverHT)}</td>
                  <td className="p-3 text-right font-mono text-emerald-600 font-bold">
                    +{formatFCFA(DEFAULT_COMPANY_N.turnoverHT - DEFAULT_COMPANY_N_MINUS_1.turnoverHT)}
                  </td>
                  <td className="p-3 text-right font-mono text-emerald-600 font-bold">+26.3%</td>
                  <td className="p-3 text-right font-mono">100.0%</td>
                </tr>

                <tr>
                  <td className="p-3 text-slate-800">Achats & Consommations</td>
                  <td className="p-3 text-right font-mono">{formatFCFA(DEFAULT_COMPANY_N_MINUS_1.purchasesHT)}</td>
                  <td className="p-3 text-right font-mono">{formatFCFA(DEFAULT_COMPANY_N.purchasesHT)}</td>
                  <td className="p-3 text-right font-mono text-rose-600">
                    +{formatFCFA(DEFAULT_COMPANY_N.purchasesHT - DEFAULT_COMPANY_N_MINUS_1.purchasesHT)}
                  </td>
                  <td className="p-3 text-right font-mono text-rose-600">+23.8%</td>
                  <td className="p-3 text-right font-mono">54.2%</td>
                </tr>

                <tr>
                  <td className="p-3 font-bold text-slate-900">Résultat d'Exploitation</td>
                  <td className="p-3 text-right font-mono">{formatFCFA(DEFAULT_COMPANY_N_MINUS_1.operatingIncome)}</td>
                  <td className="p-3 text-right font-mono">{formatFCFA(DEFAULT_COMPANY_N.operatingIncome)}</td>
                  <td className="p-3 text-right font-mono text-emerald-600 font-bold">
                    +{formatFCFA(DEFAULT_COMPANY_N.operatingIncome - DEFAULT_COMPANY_N_MINUS_1.operatingIncome)}
                  </td>
                  <td className="p-3 text-right font-mono text-emerald-600 font-bold">+33.3%</td>
                  <td className="p-3 text-right font-mono">13.3%</td>
                </tr>

                <tr>
                  <td className="p-3 font-bold text-indigo-950">Résultat Net</td>
                  <td className="p-3 text-right font-mono">{formatFCFA(DEFAULT_COMPANY_N_MINUS_1.netIncome)}</td>
                  <td className="p-3 text-right font-mono">{formatFCFA(DEFAULT_COMPANY_N.netIncome)}</td>
                  <td className="p-3 text-right font-mono text-emerald-600 font-bold">
                    +{formatFCFA(DEFAULT_COMPANY_N.netIncome - DEFAULT_COMPANY_N_MINUS_1.netIncome)}
                  </td>
                  <td className="p-3 text-right font-mono text-emerald-600 font-bold">+37.5%</td>
                  <td className="p-3 text-right font-mono">9.2%</td>
                </tr>

                <tr className="bg-slate-50 font-bold">
                  <td className="p-3 text-slate-900">Total Bilan</td>
                  <td className="p-3 text-right font-mono">{formatFCFA(DEFAULT_COMPANY_N_MINUS_1.totalAssets)}</td>
                  <td className="p-3 text-right font-mono">{formatFCFA(DEFAULT_COMPANY_N.totalAssets)}</td>
                  <td className="p-3 text-right font-mono">
                    +{formatFCFA(DEFAULT_COMPANY_N.totalAssets - DEFAULT_COMPANY_N_MINUS_1.totalAssets)}
                  </td>
                  <td className="p-3 text-right font-mono">+31.0%</td>
                  <td className="p-3 text-right font-mono">100.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4 : COMITÉ DE CRÉDIT & SCORING Z */}
      {activeTab === 'creditCommittee' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-indigo-600" />
                  Évaluation du Dossier de Crédit PME (Demande : 50 000 000 FCFA)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Grille multicritères de risque de contrepartie et décision argumentée pour le comité des engagements.
                </p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200 text-center">
                <span className="text-[10px] font-bold text-indigo-700 uppercase">Score Z de Santé Financière</span>
                <p className="text-3xl font-black text-indigo-950 mt-0.5">{zScore}</p>
                <span className="inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Zone Saine (Z &gt; 2.6)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">Capacité de Remboursement</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  L'excédent brut d'exploitation (EBITDA estimé à 38M FCFA) permet de couvrir confortablement
                  l'annuité du prêt sollicité (environ 12.8M FCFA/an sur 5 ans à 7%). Le ratio Dette Nette / EBITDA
                  reste inférieur à 1.5x.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">Structure des Garanties Proposées</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Nantissement du matériel professionnel à acquérir, caution personnelle solidaire du gérant (M. Konan)
                  et délégation d'assurance incendie au profit de la banque.
                </p>
              </div>
            </div>

            {/* Décision du Comité */}
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-emerald-950">
                  Avis Recommandé : FAVORABLE SOUS CONDITIONS
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Octroi du prêt d'investissement de 50 000 000 FCFA amortissable sur 60 mois à 7.5%. Condition préalable :
                  signature de la convention de domiciliation bancaire irrévocable d'au moins 60% des flux d'encaissement
                  commerciaux sur notre compte.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
