import React, { useState } from 'react';
import { computeBreakeven } from '../../core/finance/investment';
import { TrendingUp, Scale, AlertCircle, CheckCircle2, Sliders } from 'lucide-react';

export const BreakevenSimulator: React.FC = () => {
  const [turnover, setTurnover] = useState<number>(150000000); // 150M FCFA
  const [fixedCosts, setFixedCosts] = useState<number>(36000000); // 36M FCFA
  const [variableCosts, setVariableCosts] = useState<number>(90000000); // 90M FCFA

  const result = computeBreakeven(turnover, fixedCosts, variableCosts);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            Contrôle de Gestion Déterministe
          </span>
          <span className="text-xs text-slate-400">PME Ivoirienne • Seuil de Rentabilité</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
          Simulateur de Seuil de Rentabilité & Point Mort
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Ajustez les charges fixes, variables et le volume d'activité pour observer l'évolution de la marge de sécurité et du point mort en jours.
        </p>
      </div>

      {/* Curseurs Dynamiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
        {/* Chiffre d'Affaires */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Chiffre d'Affaires (CA)</span>
            <span className="font-mono text-sky-600">{turnover.toLocaleString()} FCFA</span>
          </div>
          <input
            type="range"
            min={50000000}
            max={300000000}
            step={5000000}
            value={turnover}
            onChange={(e) => setTurnover(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400">Volume des ventes prévisionnelles</p>
        </div>

        {/* Charges Variables */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Charges Variables (CV)</span>
            <span className="font-mono text-amber-600">{variableCosts.toLocaleString()} FCFA</span>
          </div>
          <input
            type="range"
            min={20000000}
            max={turnover - 10000000}
            step={2000000}
            value={variableCosts}
            onChange={(e) => setVariableCosts(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400">Achats consommés, matières, commissions variables</p>
        </div>

        {/* Charges Fixes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Charges Fixes (CF)</span>
            <span className="font-mono text-red-600">{fixedCosts.toLocaleString()} FCFA</span>
          </div>
          <input
            type="range"
            min={10000000}
            max={100000000}
            step={2000000}
            value={fixedCosts}
            onChange={(e) => setFixedCosts(Number(e.target.value))}
            className="w-full accent-red-600 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400">Loyers, salaires administratifs, amortissements</p>
        </div>
      </div>

      {/* Métriques Clés Calculées */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Marge sur Coût Variable</span>
          <p className="text-xl font-bold font-mono text-slate-900">{result.contributionMargin.toLocaleString()} F</p>
          <span className="text-xs text-sky-600 font-bold">Taux MCV : {result.contributionMarginRatio * 100}%</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Seuil de Rentabilité (SR)</span>
          <p className="text-xl font-bold font-mono text-amber-600">{result.breakevenRevenue.toLocaleString()} F</p>
          <span className="text-xs text-slate-500">CA minimum pour résultat nul</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Marge de Sécurité</span>
          <p className="text-xl font-bold font-mono text-emerald-600">{result.marginOfSafety.toLocaleString()} F</p>
          <span className="text-xs text-emerald-600 font-bold">Indice : {result.safetyIndex}%</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Date du Point Mort</span>
          <p className="text-xl font-bold font-mono text-purple-600">{result.breakevenDays} jours</p>
          <span className="text-xs text-purple-600 font-semibold">
            {result.breakevenDays <= 360 ? `Atteint vers le ${Math.round(result.breakevenDays / 30)}e mois` : 'Non atteint !'}
          </span>
        </div>
      </div>

      {/* Visualisation Comparée */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span>Positionnement du CA par rapport au Seuil de Rentabilité :</span>
          <span className="font-mono text-emerald-400">
            {result.marginOfSafety >= 0 ? 'Zone de Bénéfice (+)' : 'Zone de Déficit (-)'}
          </span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden flex relative">
          <div
            className="bg-amber-500 h-full transition-all duration-300"
            style={{ width: `${Math.min(100, (result.breakevenRevenue / turnover) * 100)}%` }}
            title="Seuil de Rentabilité"
          />
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${Math.max(0, (result.marginOfSafety / turnover) * 100)}%` }}
            title="Marge de Sécurité"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>0 FCFA</span>
          <span className="text-amber-400 font-bold">SR : {result.breakevenRevenue.toLocaleString()} FCFA</span>
          <span className="text-emerald-400 font-bold">CA : {turnover.toLocaleString()} FCFA</span>
        </div>
      </div>
    </div>
  );
};
