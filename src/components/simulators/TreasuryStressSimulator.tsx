import { useState } from 'react';
import {
  computeTreasuryPlan,
  TreasuryPlanInput,
  TreasuryPlanResult,
} from '../../core/finance/treasury';
import {
  DollarSign,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  Sliders,
  ShieldAlert,
  Zap,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const BASE_TREASURY_INPUT: TreasuryPlanInput = {
  initialCash: 6000000, // 6M FCFA
  overdraftFacility: 12000000, // 12M FCFA autorisé
  annualOverdraftRate: 12, // 12% agios
  months: [
    {
      monthName: 'Janvier',
      forecastTurnoverTTC: 32000000,
      cashSalesRatio: 0.3,
      credit30dRatio: 0.5,
      credit60dRatio: 0.2,
      forecastPurchasesTTC: 16000000,
      salariesNet: 4500000,
      operatingExpenses: 2200000,
      taxesAndDuties: 1600000,
      loanRepayment: 1200000,
    },
    {
      monthName: 'Février',
      forecastTurnoverTTC: 38000000,
      cashSalesRatio: 0.3,
      credit30dRatio: 0.5,
      credit60dRatio: 0.2,
      forecastPurchasesTTC: 20000000,
      salariesNet: 4500000,
      operatingExpenses: 2200000,
      taxesAndDuties: 1800000,
      loanRepayment: 1200000,
    },
    {
      monthName: 'Mars',
      forecastTurnoverTTC: 42000000,
      cashSalesRatio: 0.3,
      credit30dRatio: 0.5,
      credit60dRatio: 0.2,
      forecastPurchasesTTC: 22000000,
      salariesNet: 4500000,
      operatingExpenses: 2200000,
      taxesAndDuties: 2000000,
      loanRepayment: 1200000,
      capexInvestment: 5000000, // Acquisition véhicule utilitaire
    },
    {
      monthName: 'Avril',
      forecastTurnoverTTC: 35000000,
      cashSalesRatio: 0.3,
      credit30dRatio: 0.5,
      credit60dRatio: 0.2,
      forecastPurchasesTTC: 18000000,
      salariesNet: 4500000,
      operatingExpenses: 2200000,
      taxesAndDuties: 1700000,
      loanRepayment: 1200000,
    },
    {
      monthName: 'Mai',
      forecastTurnoverTTC: 28000000,
      cashSalesRatio: 0.3,
      credit30dRatio: 0.5,
      credit60dRatio: 0.2,
      forecastPurchasesTTC: 15000000,
      salariesNet: 4500000,
      operatingExpenses: 2200000,
      taxesAndDuties: 1500000,
      loanRepayment: 1200000,
    },
    {
      monthName: 'Juin',
      forecastTurnoverTTC: 36000000,
      cashSalesRatio: 0.3,
      credit30dRatio: 0.5,
      credit60dRatio: 0.2,
      forecastPurchasesTTC: 19000000,
      salariesNet: 4500000,
      operatingExpenses: 2200000,
      taxesAndDuties: 1800000,
      loanRepayment: 1200000,
    },
  ],
};

export const TreasuryStressSimulator: React.FC = () => {
  const [customerDelayPct, setCustomerDelayPct] = useState<number>(0); // 0 à 50%
  const [salesShockPct, setSalesShockPct] = useState<number>(0); // -30 à +10%
  const [purchasesSurgePct, setPurchasesSurgePct] = useState<number>(0); // 0 à 25%

  // Leviers de remédiation
  const [applyFactoring, setApplyFactoring] = useState<boolean>(false); // Mobilisation immédiate de créances
  const [deferCapex, setDeferCapex] = useState<boolean>(false); // Décalage investissement

  // Construction de l'input modifié
  const currentInput: TreasuryPlanInput = {
    ...BASE_TREASURY_INPUT,
    months: BASE_TREASURY_INPUT.months.map((m) => ({
      ...m,
      capexInvestment: deferCapex && m.capexInvestment ? 0 : m.capexInvestment,
      otherInflow: applyFactoring && m.monthName === 'Mars' ? 8000000 : 0, // Apport de trésorerie par cession Dailly
    })),
    stressTest: {
      customerDefaultOrDelayRatio: customerDelayPct / 100,
      salesShockRatio: salesShockPct / 100,
      purchasesSurgeRatio: purchasesSurgePct / 100,
    },
  };

  const planResult: TreasuryPlanResult = computeTreasuryPlan(currentInput);

  const formatFCFA = (val: number) => `${Math.round(val).toLocaleString('fr-FR')} FCFA`;

  const handleReset = () => {
    setCustomerDelayPct(0);
    setSalesShockPct(0);
    setPurchasesSurgePct(0);
    setApplyFactoring(false);
    setDeferCapex(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* En-tête Pédagogique */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl border border-rose-900/40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-2">
              <Zap className="w-3.5 h-3.5" /> Compétence 6 — Gestion & Trésorerie (TRES-01 & TRES-02)
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Salle de Contrôle de Trésorerie & Simulateur de Stress Test
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Simulez la trajectoire des encaissements et décaissements sur 6 mois, injectez des retards clients ou des chocs
              d'activité, et testez les leviers de redressement (mobilisation Dailly, négociation fournisseur).
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser Chocs
          </button>
        </div>
      </div>

      {/* Cartes KPI Synthétiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trésorerie Initiale</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{formatFCFA(planResult.summary.initialCash)}</p>
          <p className="text-xs text-slate-500 mt-1">Ligne Découvert : {formatFCFA(BASE_TREASURY_INPUT.overdraftFacility)}</p>
        </div>

        <div
          className={`p-5 rounded-2xl border shadow-sm ${
            planResult.summary.lowestCashPoint >= 0
              ? 'bg-white border-slate-200'
              : planResult.summary.isCessationRisk
              ? 'bg-rose-100 border-rose-300 text-rose-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wider opacity-80">Creux Maximal (Worst Dip)</p>
          <p className="text-2xl font-black mt-1">{formatFCFA(planResult.summary.lowestCashPoint)}</p>
          <p className="text-xs mt-1 opacity-80">Atteint en {planResult.summary.lowestCashMonth}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Coût Estimé des Agios</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{formatFCFA(planResult.summary.totalAgiosCost)}</p>
          <p className="text-xs text-slate-500 mt-1">{planResult.summary.monthsInDeficit} mois en découvert</p>
        </div>

        <div
          className={`p-5 rounded-2xl border shadow-sm ${
            !planResult.summary.isCessationRisk
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wider opacity-80">Statut de Solvabilité</p>
          <div className="flex items-center gap-2 mt-1">
            {!planResult.summary.isCessationRisk ? (
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-rose-600" />
            )}
            <p className="text-xl font-black">
              {!planResult.summary.isCessationRisk ? 'Couverte' : 'Impasse Critique'}
            </p>
          </div>
          <p className="text-xs mt-1 opacity-80">
            {!planResult.summary.isCessationRisk ? 'Dans la ligne de crédit' : 'Découvert dépassé !'}
          </p>
        </div>
      </div>

      {/* Module de Stress Testing Interactif */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-rose-600" />
          Injecteur de Stress Test & Leviers d'Action
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Retard client */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Retard de Règlement Clients</span>
              <span className="font-mono font-black text-rose-600">{customerDelayPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={customerDelayPct}
              onChange={(e) => setCustomerDelayPct(Number(e.target.value))}
              className="w-full accent-rose-600"
            />
            <p className="text-[11px] text-slate-500">
              Pourcentage des créances reportées au mois suivant par les clients en difficulté.
            </p>
          </div>

          {/* Baisse de ventes */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Choc sur le Chiffre d'Affaires</span>
              <span className="font-mono font-black text-amber-600">{salesShockPct}%</span>
            </div>
            <input
              type="range"
              min="-30"
              max="10"
              step="5"
              value={salesShockPct}
              onChange={(e) => setSalesShockPct(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
            <p className="text-[11px] text-slate-500">
              Contraction inattendue de l'activité ou perte d'un compte client stratégique.
            </p>
          </div>

          {/* Hausse coûts */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Inflation Approvisionnements</span>
              <span className="font-mono font-black text-indigo-600">+{purchasesSurgePct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="5"
              value={purchasesSurgePct}
              onChange={(e) => setPurchasesSurgePct(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500">
              Hausse subite des cours des matières premières ou fret maritime.
            </p>
          </div>
        </div>

        {/* Leviers de remédiation activables */}
        <div className="pt-2 flex flex-wrap gap-4 items-center border-t border-slate-100">
          <span className="text-xs font-bold text-slate-700">Actions de Remédiation :</span>
          <button
            onClick={() => setApplyFactoring(!applyFactoring)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              applyFactoring
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            {applyFactoring ? '✓ Cession Dailly Activée (+8M FCFA en Mars)' : '+ Mobiliser Créances Dailly (+8M FCFA en Mars)'}
          </button>

          <button
            onClick={() => setDeferCapex(!deferCapex)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              deferCapex
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            {deferCapex ? '✓ Investissement Véhicule Décalé' : 'Reporter l\'Investissement de Mars (-5M FCFA)'}
          </button>
        </div>
      </div>

      {/* Tableau Mensuel Détaillé du Plan de Trésorerie */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Plan Mensuel des Flux de Trésorerie (Semestre Prévisionnel)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="p-3">Mois</th>
                <th className="p-3 text-right">Encaissements</th>
                <th className="p-3 text-right">Décaissements</th>
                <th className="p-3 text-right">Variation Nette</th>
                <th className="p-3 text-right">Solde Fin de Mois</th>
                <th className="p-3 text-center">Découvert Utilisé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {planResult.monthlyCashFlows.map((m) => (
                <tr key={m.monthIndex} className={m.isDeficit ? 'bg-rose-50/40' : ''}>
                  <td className="p-3 font-bold text-slate-900">{m.monthName}</td>
                  <td className="p-3 text-right font-mono text-emerald-700 font-bold">{formatFCFA(m.totalInflows)}</td>
                  <td className="p-3 text-right font-mono text-slate-800">{formatFCFA(m.totalOutflows)}</td>
                  <td
                    className={`p-3 text-right font-mono font-bold ${
                      m.netMonthlyChange >= 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {m.netMonthlyChange >= 0 ? '+' : ''}
                    {formatFCFA(m.netMonthlyChange)}
                  </td>
                  <td
                    className={`p-3 text-right font-mono font-black ${
                      m.closingCashBalance >= 0 ? 'text-slate-900' : 'text-rose-600'
                    }`}
                  >
                    {formatFCFA(m.closingCashBalance)}
                  </td>
                  <td className="p-3 text-center">
                    {m.overdraftUsed > 0 ? (
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          m.overdraftLimitExceeded
                            ? 'bg-rose-600 text-white'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {formatFCFA(m.overdraftUsed)} {m.overdraftLimitExceeded && '(DÉPASSEMENT !)'}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diagnostic et Recommandation */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg space-y-3">
        <h3 className="text-base font-bold flex items-center gap-2 text-rose-400">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          Avis & Préconisation du Trésorier
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
          {planResult.summary.recommendedAction}
        </p>
      </div>
    </div>
  );
};
