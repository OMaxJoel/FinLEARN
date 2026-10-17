import React, { useState } from 'react';
import { AccountingSimulator } from './AccountingSimulator';
import { BreakevenSimulator } from './BreakevenSimulator';
import { VarianceAnalysisSimulator } from './VarianceAnalysisSimulator';
import { FinancialAnalysisLab } from './FinancialAnalysisLab';
import { TreasuryStressSimulator } from './TreasuryStressSimulator';
import { PivotTableLab } from './PivotTableLab';
import { InsuranceBrokerSimulator } from './InsuranceBrokerSimulator';
import { InvestmentAppraisalSimulator } from './InvestmentAppraisalSimulator';
import { BrokeragePortfolioSimulator } from './BrokeragePortfolioSimulator';
import { ConsolidationCockpit } from './ConsolidationCockpit';
import {
  BookOpen,
  Scale,
  Shield,
  TrendingUp,
  Activity,
  Sliders,
  Table,
  Zap,
  DollarSign,
  Users,
  Globe,
} from 'lucide-react';

type SimulatorTab =
  | 'accounting'
  | 'variance'
  | 'breakeven'
  | 'analysis'
  | 'treasury'
  | 'pivot'
  | 'brokerage'
  | 'investment'
  | 'portfolio'
  | 'consolidation';

export const SimulatorsHub: React.FC = () => {
  const [selectedSimulator, setSelectedSimulator] = useState<SimulatorTab>('accounting');

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Barre de Navigation des Simulateurs */}
      <div className="flex overflow-x-auto sm:flex-wrap gap-2 p-2 bg-slate-200/80 rounded-2xl w-full scrollbar-none">
        <button
          onClick={() => setSelectedSimulator('accounting')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            selectedSimulator === 'accounting'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          1. Comptabilité SYSCOHADA
        </button>

        <button
          onClick={() => setSelectedSimulator('variance')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            selectedSimulator === 'variance'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Sliders className="w-4 h-4 text-indigo-400" />
          2. Détecteur d'Écarts Budgétaires
        </button>

        <button
          onClick={() => setSelectedSimulator('breakeven')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            selectedSimulator === 'breakeven'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Scale className="w-4 h-4 text-amber-400" />
          3. Seuil de Rentabilité & Point Mort
        </button>

        <button
          onClick={() => setSelectedSimulator('analysis')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            selectedSimulator === 'analysis'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          4. Analyse Financière & Ratios
        </button>

        <button
          onClick={() => setSelectedSimulator('treasury')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            selectedSimulator === 'treasury'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Zap className="w-4 h-4 text-rose-400" />
          5. Trésorerie & Stress Testing
        </button>

        <button
          onClick={() => setSelectedSimulator('pivot')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            selectedSimulator === 'pivot'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Table className="w-4 h-4 text-sky-400" />
          6. Tableaux Croisés Dynamiques (TCD)
        </button>

        <button
          onClick={() => setSelectedSimulator('investment')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            selectedSimulator === 'investment'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-400" />
          7. Décision d'Investissement & Sensibilité
        </button>

        <button
          onClick={() => setSelectedSimulator('brokerage')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            selectedSimulator === 'brokerage'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Shield className="w-4 h-4 text-purple-400" />
          8. Courtage & Bordereaux Assureurs
        </button>

        <button
          onClick={() => setSelectedSimulator('portfolio')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            selectedSimulator === 'portfolio'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-indigo-400" />
          9. Portefeuille & Rétention CIMA
        </button>

        <button
          onClick={() => setSelectedSimulator('consolidation')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
            selectedSimulator === 'consolidation'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-300/60'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          10. Consolidation Groupe & IAS 21
        </button>
      </div>

      {/* Rendu du Simulateur Actif */}
      <div>
        {selectedSimulator === 'accounting' && <AccountingSimulator />}
        {selectedSimulator === 'variance' && <VarianceAnalysisSimulator />}
        {selectedSimulator === 'breakeven' && <BreakevenSimulator />}
        {selectedSimulator === 'analysis' && <FinancialAnalysisLab />}
        {selectedSimulator === 'treasury' && <TreasuryStressSimulator />}
        {selectedSimulator === 'pivot' && <PivotTableLab />}
        {selectedSimulator === 'investment' && <InvestmentAppraisalSimulator />}
        {selectedSimulator === 'brokerage' && <InsuranceBrokerSimulator />}
        {selectedSimulator === 'portfolio' && <BrokeragePortfolioSimulator />}
        {selectedSimulator === 'consolidation' && <ConsolidationCockpit />}
      </div>
    </div>
  );
};
