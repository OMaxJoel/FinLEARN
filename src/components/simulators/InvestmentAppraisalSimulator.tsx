import React, { useState, useMemo } from 'react';
import {
  computeNPV,
  computeIRR,
  computePayback,
  computeDiscountedPayback,
  computeFisherCrossoverRate,
  computeWACC,
  computeSensitivityMatrix,
  rankProjectsUnderCapitalRationing,
  ProjectRankingItem,
} from '../../core/finance/investment';
import {
  TrendingUp,
  Percent,
  Clock,
  Layers,
  Scale,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Sliders,
  Award,
} from 'lucide-react';

interface ProjectData {
  id: string;
  name: string;
  location: string;
  initialInvestment: number;
  cashFlows: number[]; // 5 années
  color: string;
}

const DEFAULT_PROJECTS: ProjectData[] = [
  {
    id: 'PROJ_A',
    name: 'Projet A — Usine Cacao San Pedro',
    location: 'Zone Industrielle de San Pedro',
    initialInvestment: 150000000,
    cashFlows: [35000000, 45000000, 60000000, 70000000, 85000000],
    color: '#0284c7', // Sky 600
  },
  {
    id: 'PROJ_B',
    name: 'Projet B — Flotte Logistique Abidjan-Bouaké',
    location: 'Corridor Abidjan - Bouaké',
    initialInvestment: 85000000,
    cashFlows: [32000000, 34000000, 28000000, 24000000, 20000000],
    color: '#059669', // Emerald 600
  },
  {
    id: 'PROJ_C',
    name: 'Projet C — Centrale Solaire & Efficacité',
    location: 'Toitures Usine Treichville',
    initialInvestment: 50000000,
    cashFlows: [15000000, 16000000, 17000000, 18000000, 19000000],
    color: '#d97706', // Amber 600
  },
];

export const InvestmentAppraisalSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'sensitivity' | 'wacc'>('comparison');
  const [discountRate, setDiscountRate] = useState<number>(10.5); // Taux d'actualisation k en %
  const [projects, setProjects] = useState<ProjectData[]>(DEFAULT_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('PROJ_A');

  // Paramètres CMPC / WACC
  const [equityValue, setEquityValue] = useState<number>(120000000);
  const [costOfEquity, setCostOfEquity] = useState<number>(14.0);
  const [debtValue, setDebtValue] = useState<number>(80000000);
  const [costOfDebt, setCostOfDebt] = useState<number>(8.0);
  const [corporateTaxRate, setCorporateTaxRate] = useState<number>(25.0); // 25% UEMOA

  // Rationnement du capital
  const [budgetLimit, setBudgetLimit] = useState<number>(160000000);

  // Projets actifs sélectionnés
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Calculs pour chaque projet
  const projectsEvaluated = useMemo(() => {
    return projects.map((p) => {
      const npv = computeNPV(discountRate, p.initialInvestment, p.cashFlows);
      const irr = computeIRR(p.initialInvestment, p.cashFlows);
      const payback = computePayback(p.initialInvestment, p.cashFlows);
      const discountedPayback = computeDiscountedPayback(p.initialInvestment, p.cashFlows, discountRate);
      const totalDiscountedFlows = npv + p.initialInvestment;
      const profitabilityIndex =
        p.initialInvestment > 0 ? Math.round((totalDiscountedFlows / p.initialInvestment) * 100) / 100 : 0;

      return {
        ...p,
        npv,
        irr,
        payback,
        discountedPayback,
        profitabilityIndex,
        isAccepted: npv > 0,
      };
    });
  }, [projects, discountRate]);

  // Point de Fisher entre Projet A et Projet B
  const fisherRateAB = useMemo(() => {
    const projA = projects.find((p) => p.id === 'PROJ_A');
    const projB = projects.find((p) => p.id === 'PROJ_B');
    if (projA && projB) {
      return computeFisherCrossoverRate(projA, projB);
    }
    return null;
  }, [projects]);

  // Matrice de sensibilité pour le projet sélectionné
  const sensitivityData = useMemo(() => {
    const rates = [8, 10, 12, 14, 16];
    const mults = [0.8, 0.9, 1.0, 1.1, 1.2];
    return computeSensitivityMatrix(
      currentProject.initialInvestment,
      currentProject.cashFlows,
      rates,
      mults
    );
  }, [currentProject]);

  // CMPC calculé
  const waccResult = useMemo(() => {
    return computeWACC(equityValue, costOfEquity, debtValue, costOfDebt, corporateTaxRate);
  }, [equityValue, costOfEquity, debtValue, costOfDebt, corporateTaxRate]);

  // Rationnement du capital calculé
  const rationingResult = useMemo(() => {
    const projs = projects.map((p) => ({
      id: p.id,
      name: p.name,
      initialInvestment: p.initialInvestment,
      cashFlows: p.cashFlows,
      discountRatePercent: discountRate,
    }));
    return rankProjectsUnderCapitalRationing(projs, budgetLimit);
  }, [projects, discountRate, budgetLimit]);

  // Données pour le tracé SVG du profil de VAN (taux de 0% à 24%)
  const npvCurves = useMemo(() => {
    const sampleRates: number[] = [];
    for (let r = 0; r <= 24; r += 1) {
      sampleRates.push(r);
    }

    return projects.map((p) => {
      const points = sampleRates.map((r) => ({
        rate: r,
        npv: computeNPV(r, p.initialInvestment, p.cashFlows),
      }));
      return {
        id: p.id,
        name: p.name,
        color: p.color,
        points,
      };
    });
  }, [projects]);

  // Modification dynamique d'un flux de cash
  const handleFlowChange = (projId: string, yearIdx: number, val: number) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projId) return p;
        const newFlows = [...p.cashFlows];
        newFlows[yearIdx] = val;
        return { ...p, cashFlows: newFlows };
      })
    );
  };

  const handleInitialInvChange = (projId: string, val: number) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projId ? { ...p, initialInvestment: val } : p))
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* En-tête */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
              Finance d'Entreprise & Choix d'Investissement (FIN-01 à FIN-04)
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Méthodes VAN, TRI & CMPC
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Laboratoire d'Évaluation des Investissements
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-1 leading-relaxed">
            Comparez des projets industriels concurrents en Côte d'Ivoire. Analysez les arbitrages entre VAN et TRI, décelez les points d'intersection de Fisher et optimisez la rentabilité sous contrainte budgétaire.
          </p>
        </div>

        {/* Boutons d'onglets */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'comparison'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-sky-500" />
            1. Arbitrage Projets & Profil VAN
          </button>
          <button
            onClick={() => setActiveTab('sensitivity')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'sensitivity'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-500" />
            2. Matrice de Sensibilité 2D
          </button>
          <button
            onClick={() => setActiveTab('wacc')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'wacc'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            3. Coût du Capital & Rationnement
          </button>
        </div>
      </div>

      {/* ONGLET 1 : COMPARATEUR & PROFIL DE VAN */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          {/* Barre de contrôle du Taux d'Actualisation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-full md:w-2/3 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-sky-600" />
                  Taux d'Actualisation de Référence (CMPC / WACC) :
                </span>
                <span className="font-mono text-base text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-lg border border-sky-200">
                  {discountRate.toFixed(1)} %
                </span>
              </div>
              <input
                type="range"
                min="2.0"
                max="22.0"
                step="0.5"
                value={discountRate}
                onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>2.0% (Coût faible)</span>
                <span>10.5% (Moyen UEMOA)</span>
                <span>22.0% (Risque élevé)</span>
              </div>
            </div>

            {/* Note pédagogique sur le point de Fisher */}
            {fisherRateAB && (
              <div className="w-full md:w-1/3 p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1 text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Point de Fisher (A vs B) : {fisherRateAB.toFixed(2)} %
                </div>
                <p className="text-[11px] text-amber-700 leading-snug">
                  {discountRate < fisherRateAB
                    ? `À ce taux (${discountRate.toFixed(1)}% < ${fisherRateAB.toFixed(1)}%), le Projet A est supérieur par la VAN grâce à son effet de volume.`
                    : `À ce taux (${discountRate.toFixed(1)}% > ${fisherRateAB.toFixed(1)}%), le Projet B est supérieur par la VAN car ses flux sont plus précoces.`}
                </p>
              </div>
            )}
          </div>

          {/* Grille des 3 Projets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsEvaluated.map((proj) => (
              <div
                key={proj.id}
                className={`bg-white rounded-3xl border transition-all p-6 space-y-4 shadow-sm flex flex-col justify-between ${
                  selectedProjectId === proj.id
                    ? 'border-sky-500 ring-2 ring-sky-100 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block mr-1.5"
                        style={{ backgroundColor: proj.color }}
                      />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {proj.id}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                        {proj.name}
                      </h3>
                      <p className="text-[11px] text-slate-500">{proj.location}</p>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        proj.isAccepted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {proj.isAccepted ? 'VAN > 0 (Rentable)' : 'VAN < 0 (Rejeté)'}
                    </span>
                  </div>

                  {/* Tableau des Métriques Clés */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-500 block">VAN ({discountRate}%)</span>
                      <span
                        className={`text-sm font-extrabold font-mono ${
                          proj.npv >= 0 ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {proj.npv.toLocaleString()} FCFA
                      </span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-500 block">TRI (IRR)</span>
                      <span className="text-sm font-extrabold font-mono text-indigo-700">
                        {proj.irr !== null ? `${proj.irr.toFixed(1)} %` : 'N/A'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-500 block">Indice Profitabilité</span>
                      <span className="text-sm font-extrabold font-mono text-slate-800">
                        {proj.profitabilityIndex.toFixed(2)}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-500 block">Payback Actualisé</span>
                      <span className="text-sm font-extrabold font-mono text-slate-800">
                        {proj.discountedPayback} ans
                      </span>
                    </div>
                  </div>

                  {/* Flux annuels */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Investissement (I₀) :</span>
                      <span className="font-mono font-bold text-slate-800">
                        {proj.initialInvestment.toLocaleString()} FCFA
                      </span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                        Flux Nets (Années 1 à 5) :
                      </span>
                      <div className="grid grid-cols-5 gap-1 text-[11px] font-mono text-center">
                        {proj.cashFlows.map((cf, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-100 p-1 rounded-md text-slate-700 border border-slate-200/60"
                          >
                            <span className="block text-[9px] text-slate-400">A{idx + 1}</span>
                            <span>{Math.round(cf / 1000000)}M</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      selectedProjectId === proj.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    {selectedProjectId === proj.id
                      ? 'Projet Sélectionné pour Analyse'
                      : 'Sélectionner pour Analyse'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Graphique SVG dynamique des Profils de VAN */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                  Courbes des Profils de VAN : VAN = f(k)
                </h3>
                <p className="text-xs text-slate-500">
                  Visualisation de la sensibilité au taux d'actualisation et du point d'indifférence de Fisher
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="text-slate-700">{p.id}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas / SVG graphique */}
            <div className="h-64 w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 relative overflow-hidden flex flex-col justify-between">
              {/* SVG vectoriel tracé */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 240">
                {/* Ligne du zéro (VAN = 0) */}
                <line
                  x1="50"
                  y1="160"
                  x2="780"
                  y2="160"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text x="55" y="155" fill="#64748b" fontSize="10" fontWeight="bold">
                  VAN = 0 (Seuil de rentabilité)
                </text>

                {/* Axe horizontal des taux (0% à 24%) */}
                {[0, 4, 8, 12, 16, 20, 24].map((rate) => {
                  const x = 50 + (rate / 24) * 720;
                  return (
                    <g key={rate}>
                      <line x1={x} y1="155" x2={x} y2="165" stroke="#cbd5e1" strokeWidth="1" />
                      <text x={x - 8} y="180" fill="#64748b" fontSize="10" fontFamily="monospace">
                        {rate}%
                      </text>
                    </g>
                  );
                })}

                {/* Tracé de chaque courbe */}
                {npvCurves.map((curve) => {
                  // Échelle : VAN max ~ 150M FCFA -> y=20, VAN = 0 -> y=160, VAN min ~ -50M -> y=220
                  const maxNPV = 160000000;
                  const minNPV = -60000000;
                  const range = maxNPV - minNPV;

                  const pointsString = curve.points
                    .map((pt) => {
                      const x = 50 + (pt.rate / 24) * 720;
                      const normalized = (maxNPV - pt.npv) / range;
                      const y = Math.max(15, Math.min(225, 20 + normalized * 200));
                      return `${x},${y}`;
                    })
                    .join(' ');

                  return (
                    <polyline
                      key={curve.id}
                      fill="none"
                      stroke={curve.color}
                      strokeWidth="2.5"
                      points={pointsString}
                    />
                  );
                })}

                {/* Indicateur vertical du taux d'actualisation sélectionné */}
                {(() => {
                  const curX = 50 + (discountRate / 24) * 720;
                  return (
                    <g>
                      <line
                        x1={curX}
                        y1="10"
                        x2={curX}
                        y2="210"
                        stroke="#0f172a"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                      />
                      <rect
                        x={curX - 35}
                        y="10"
                        width="70"
                        height="20"
                        rx="4"
                        fill="#0f172a"
                      />
                      <text
                        x={curX}
                        y="24"
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        k = {discountRate.toFixed(1)}%
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-xs text-sky-900 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  Règle d'arbitrage professionnelle (Théorie financière moderne) :
                </span>
                <p className="mt-0.5 text-sky-800 leading-relaxed">
                  En cas de conflit de classement entre la VAN et le TRI (fréquent lorsque les projets ont des tailles différentes ou des profils de cash-flows asymétriques), <strong>le critère de la VAN prévaut toujours</strong>. La VAN mesure l'enrichissement net absolu des actionnaires en FCFA, tandis que le TRI est un taux relatif qui ignore l'effet d'échelle du capital investi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ONGLET 2 : MATRICE DE SENSIBILITÉ 2D */}
      {activeTab === 'sensitivity' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-indigo-600" />
                  Matrice de Sensibilité Croisée : {currentProject.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Impact conjoint de l'évolution du taux d'actualisation et du niveau des cash-flows annuels
                </p>
              </div>

              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="text-xs font-bold bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tableau 2D */}
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 text-xs font-bold text-slate-500 bg-slate-100 rounded-tl-xl border border-slate-200">
                      Taux \ Flux
                    </th>
                    {sensitivityData.flowMultipliers.map((m, idx) => (
                      <th
                        key={idx}
                        className="p-3 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 font-mono"
                      >
                        {m === 1.0 ? 'Flux Central' : `${Math.round((m - 1) * 100)} %`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sensitivityData.discountRates.map((rate, rIdx) => (
                    <tr key={rate}>
                      <td className="p-3 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 font-mono">
                        k = {rate} %
                      </td>
                      {sensitivityData.matrix[rIdx].map((npvVal, cIdx) => {
                        const isPositive = npvVal >= 0;
                        const isCentral = rate === 10 && sensitivityData.flowMultipliers[cIdx] === 1.0;

                        return (
                          <td
                            key={cIdx}
                            className={`p-3 text-xs font-mono font-bold border transition-all ${
                              isCentral ? 'ring-2 ring-slate-900 z-10' : ''
                            } ${
                              isPositive
                                ? npvVal > 25000000
                                  ? 'bg-emerald-100/70 text-emerald-900 border-emerald-200'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-100'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {npvVal.toLocaleString()} FCFA
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded" />
                  VAN Très Favorable
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-emerald-50 border border-emerald-200 rounded" />
                  VAN Positive
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-rose-50 border border-rose-200 rounded" />
                  Destruction de Valeur (VAN &lt; 0)
                </span>
              </div>
              <span className="font-mono text-slate-400">
                Cellule encadrée = Hypothèse centrale
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ONGLET 3 : COÛT DU CAPITAL & RATIONNEMENT */}
      {activeTab === 'wacc' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calculateur de CMPC / WACC */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Percent className="w-5 h-5 text-sky-600" />
              Calculateur de CMPC (Coût Moyen Pondéré du Capital)
            </h3>
            <p className="text-xs text-slate-500">
              Déterminez le taux d'actualisation théorique de votre entreprise selon sa structure de financement.
            </p>

            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Capitaux Propres (FCFA) :
                  </label>
                  <input
                    type="number"
                    value={equityValue}
                    onChange={(e) => setEquityValue(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Coût des Fonds Propres (k_cp %) :
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={costOfEquity}
                    onChange={(e) => setCostOfEquity(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Dettes Financières (FCFA) :
                  </label>
                  <input
                    type="number"
                    value={debtValue}
                    onChange={(e) => setDebtValue(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Taux d'Intérêt Dette (k_d %) :
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={costOfDebt}
                    onChange={(e) => setCostOfDebt(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Taux d'Impôt sur les Sociétés (IS Côte d'Ivoire) :
                </label>
                <div className="flex gap-2">
                  {[25, 30].map((t) => (
                    <button
                      key={t}
                      onClick={() => setCorporateTaxRate(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                        corporateTaxRate === t
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {t} % {t === 25 ? '(Droit commun CI)' : '(Secteur minier/spécial)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Résultat CMPC */}
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-sky-800 block">
                    CMPC / WACC Calculé :
                  </span>
                  <span className="text-[11px] text-sky-600">
                    Pondération : {(waccResult.equityWeight * 100).toFixed(1)}% CP /{' '}
                    {(waccResult.debtWeight * 100).toFixed(1)}% Dette
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-sky-800">
                    {waccResult.waccPercent.toFixed(2)} %
                  </span>
                  <button
                    onClick={() => setDiscountRate(waccResult.waccPercent)}
                    className="block text-[11px] font-bold text-sky-700 underline hover:text-sky-900 mt-0.5"
                  >
                    Appliquer comme taux d'actualisation
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Rationnement du Capital */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Sélection sous Contrainte Budgétaire (Rationnement)
            </h3>
            <p className="text-xs text-slate-500">
              Lorsque l'enveloppe de financement est plafonnée, le critère optimal de sélection est l'Indice de Profitabilité (IP).
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                  <span>Plafond Budgétaire d'Investissement :</span>
                  <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {budgetLimit.toLocaleString()} FCFA
                  </span>
                </div>
                <input
                  type="range"
                  min="50000000"
                  max="300000000"
                  step="10000000"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Classement des projets */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Classement par Indice de Profitabilité (IP) décroissant :
                </span>

                {rationingResult.ranking.map((proj, rankIdx) => (
                  <div
                    key={proj.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                      proj.selected
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          proj.selected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {rankIdx + 1}
                      </span>
                      <div>
                        <span className="font-extrabold text-slate-900 block">{proj.name}</span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          I₀ : {proj.initialInvestment.toLocaleString()} FCFA | IP :{' '}
                          {proj.profitabilityIndex.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          proj.selected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {proj.selected ? 'Retenu' : 'Non financé'}
                      </span>
                      <span className="block text-[11px] font-mono font-bold mt-0.5 text-slate-700">
                        VAN : {proj.npv.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bilan du panier retenu */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 block">Enveloppe Utilisée :</span>
                  <span className="font-mono font-extrabold text-white text-sm">
                    {rationingResult.totalInvestment.toLocaleString()} / {budgetLimit.toLocaleString()} FCFA
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">VAN Cumulée Maximale :</span>
                  <span className="font-mono font-extrabold text-emerald-400 text-sm">
                    +{rationingResult.totalNPV.toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
