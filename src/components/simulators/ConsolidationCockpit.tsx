import React, { useState, useMemo } from 'react';
import {
  EntityData,
  ExchangeRates,
  GroupCurrency,
  consolidateGroup,
  DEFAULT_EXCHANGE_RATES,
} from '../../core/consolidation/engine';
import {
  Globe,
  Building2,
  TrendingUp,
  Scale,
  ShieldCheck,
  AlertCircle,
  Percent,
  Sliders,
  Layers,
  ArrowRightLeft,
  BookOpen,
  PieChart,
  HelpCircle,
  FileSpreadsheet,
} from 'lucide-react';

const INITIAL_ENTITIES: EntityData[] = [
  {
    id: 'ENT_HOLDING',
    name: 'Holding Agro-Food Abidjan SA',
    country: "Côte d'Ivoire (Siège Groupe)",
    currency: 'XOF',
    ownershipPercentage: 100,
    balanceSheet: {
      fixedAssets: 200000000,
      currentAssets: 120000000,
      cashAndEquivalents: 35000000,
      intercompanyReceivables: {
        ENT_DAKAR: 40000000,
        ENT_PARIS: 50000000,
      },
      equity: 300000000,
      financialDebts: 80000000,
      currentLiabilities: 65000000,
      intercompanyPayables: {},
    },
    incomeStatement: {
      revenue: 400000000,
      operatingExpenses: 320000000,
      operatingIncome: 80000000,
      financialResult: 5000000,
      incomeTax: 21250000,
      netIncome: 63750000,
      intercompanySales: {
        ENT_PARIS: 50000000,
      },
    },
  },
  {
    id: 'ENT_DAKAR',
    name: 'Sénégal Agro-Processing SARL',
    country: 'Sénégal (Filiale Usine)',
    currency: 'XOF',
    ownershipPercentage: 80,
    balanceSheet: {
      fixedAssets: 90000000,
      currentAssets: 60000000,
      cashAndEquivalents: 15000000,
      intercompanyReceivables: {},
      equity: 70000000,
      financialDebts: 25000000,
      currentLiabilities: 30000000,
      intercompanyPayables: {
        ENT_HOLDING: 40000000,
      },
    },
    incomeStatement: {
      revenue: 180000000,
      operatingExpenses: 145000000,
      operatingIncome: 35000000,
      financialResult: -2000000,
      incomeTax: 8250000,
      netIncome: 24750000,
      intercompanySales: {},
    },
  },
  {
    id: 'ENT_PARIS',
    name: 'Agro-Europe Distribution SAS',
    country: 'France (Filiale Commerciale UE)',
    currency: 'EUR',
    ownershipPercentage: 100,
    balanceSheet: {
      fixedAssets: 150000,
      currentAssets: 350000,
      cashAndEquivalents: 80000,
      intercompanyReceivables: {},
      equity: 280000,
      financialDebts: 100000,
      currentLiabilities: 123776,
      intercompanyPayables: {
        ENT_HOLDING: 76224,
      },
    },
    incomeStatement: {
      revenue: 850000,
      operatingExpenses: 720000,
      operatingIncome: 130000,
      financialResult: -5000,
      incomeTax: 31250,
      netIncome: 93750,
      intercompanySales: {},
    },
  },
];

export const ConsolidationCockpit: React.FC = () => {
  const [entities] = useState<EntityData[]>(INITIAL_ENTITIES);
  const [eurClosingRate, setEurClosingRate] = useState<number>(655.957);
  const [eurAvgRate, setEurAvgRate] = useState<number>(655.957);
  const [eliminateIntercompany, setEliminateIntercompany] = useState<boolean>(true);
  const [reportingCurrency, setReportingCurrency] = useState<GroupCurrency>('XOF');
  const [activeTab, setActiveTab] = useState<'overview' | 'balancesheet' | 'incomestatement' | 'intercompany' | 'pedagogy'>('overview');

  const exchangeRates: ExchangeRates = useMemo(() => {
    return {
      closingRates: {
        XOF: 1,
        EUR: eurClosingRate,
        USD: 605.5,
      },
      averageRates: {
        XOF: 1,
        EUR: eurAvgRate,
        USD: 600.0,
      },
    };
  }, [eurClosingRate, eurAvgRate]);

  const result = useMemo(() => {
    return consolidateGroup(entities, exchangeRates, {
      reportingCurrency,
      eliminateIntercompany,
    });
  }, [entities, exchangeRates, reportingCurrency, eliminateIntercompany]);

  const formatMoney = (val: number) => {
    const unit = reportingCurrency === 'XOF' ? 'FCFA' : '€';
    return `${Math.round(val).toLocaleString('fr-FR')} ${unit}`;
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-800">
      {/* En-tête Cockpit */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-indigo-500/30 border border-indigo-400/40 rounded-full text-indigo-200 text-xs font-semibold tracking-wide flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                SYSCOHADA & IFRS / IAS 21
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-semibold">
                Groupe Multinational Régional
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Cockpit de Consolidation & Reporting Multi-Devises
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Agrégation des comptes du groupe Agro-Food (Abidjan, Dakar, Paris), conversion de devises selon IAS 21,
              élimination automatique des flux réciproques et calcul de la réserve de conversion.
            </p>
          </div>

          {/* Sélecteur de Devise de Reporting */}
          <div className="flex items-center gap-3 bg-slate-800/80 p-2 rounded-2xl border border-slate-700">
            <span className="text-xs text-slate-300 font-medium pl-2">Devise du Groupe :</span>
            <button
              onClick={() => setReportingCurrency('XOF')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reportingCurrency === 'XOF'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FCFA (XOF)
            </button>
            <button
              onClick={() => setReportingCurrency('EUR')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reportingCurrency === 'EUR'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Euros (€)
            </button>
          </div>
        </div>

        {/* Barre de KPI Express */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50">
            <div className="text-xs text-slate-400">CA Consolidé Net</div>
            <div className="text-lg font-bold text-white mt-1">
              {formatMoney(result.aggregatedIncomeStatement.consolidatedRevenue)}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <span>Marge op. : {result.groupKPIs.operatingMarginPercent}%</span>
            </div>
          </div>

          <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50">
            <div className="text-xs text-slate-400">Résultat Net Part Groupe</div>
            <div className="text-lg font-bold text-indigo-300 mt-1">
              {formatMoney(result.aggregatedIncomeStatement.groupShareNetIncome)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Minoritaires : {formatMoney(result.aggregatedIncomeStatement.minorityShareNetIncome)}
            </div>
          </div>

          <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50">
            <div className="text-xs text-slate-400">Capitaux Propres Consolidés</div>
            <div className="text-lg font-bold text-emerald-300 mt-1">
              {formatMoney(result.aggregatedBalanceSheet.totalConsolidatedEquity)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Part Groupe : {formatMoney(result.aggregatedBalanceSheet.groupEquity)}
            </div>
          </div>

          <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50">
            <div className="text-xs text-slate-400">Équilibre Bilanciel</div>
            <div className="flex items-center gap-1.5 mt-1">
              {result.aggregatedBalanceSheet.isBalanced ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold text-sm">Actif = Passif</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                  <span className="text-rose-400 font-bold text-sm">Déséquilibre</span>
                </>
              )}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Réserve conv. : {formatMoney(result.aggregatedBalanceSheet.totalTranslationReserve)}
            </div>
          </div>
        </div>
      </div>

      {/* Paramètres Dynamiques de Consolidation */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-3">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Paramètres de Simulation & Marché des Devises</h3>
              <p className="text-xs text-slate-500">
                Ajustez le taux de change EUR/XOF pour mesurer la sensibilité de la réserve de conversion (IAS 21).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
            {/* Slider Taux de clôture EUR */}
            <div className="flex-1 lg:w-56">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Cours Clôture EUR/XOF :</span>
                <span className="text-indigo-600">{eurClosingRate.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="590"
                max="720"
                step="0.5"
                value={eurClosingRate}
                onChange={(e) => setEurClosingRate(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>590 (Appréciation XOF)</span>
                <span>655.957 (Parité)</span>
                <span>720 (Dépréciation)</span>
              </div>
            </div>

            {/* Toggle Élimination Intragroupe */}
            <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={eliminateIntercompany}
                  onChange={(e) => setEliminateIntercompany(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Élimination Intragroupe</span>
                <span className="text-slate-500 text-[11px]">
                  {eliminateIntercompany ? 'Flux réciproques neutralisés' : 'Comptes simplement cumulés'}
                </span>
              </div>
            </div>

            {/* Reset Parité Fixe */}
            <button
              onClick={() => {
                setEurClosingRate(655.957);
                setEurAvgRate(655.957);
              }}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Rétablir Parité Officielle
            </button>
          </div>
        </div>
      </div>

      {/* Navigation par Onglets */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'overview'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Cartographie du Périmètre ({entities.length} entités)
        </button>

        <button
          onClick={() => setActiveTab('balancesheet')}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'balancesheet'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Scale className="w-4 h-4" />
          Bilan Consolidé Agrégé
        </button>

        <button
          onClick={() => setActiveTab('incomestatement')}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'incomestatement'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Compte de Résultat Consolidé
        </button>

        <button
          onClick={() => setActiveTab('intercompany')}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'intercompany'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          Audit des Éliminations ({formatMoney(result.totalIntercompanyReceivablesEliminated)})
        </button>

        <button
          onClick={() => setActiveTab('pedagogy')}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'pedagogy'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          Méthodologie SYSCOHADA & IAS 21
        </button>
      </div>

      {/* CONTENU ONGLET 1 : VUE D'ENSEMBLE DU PÉRIMÈTRE */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.entitiesConverted.map((ent) => (
              <div
                key={ent.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {ent.country}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base mt-1">{ent.name}</h4>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                    {ent.ownershipPercentage}% détenu
                  </span>
                </div>

                <div className="text-xs text-slate-500 mb-4">
                  Devise d'origine : <strong className="text-slate-700">{ent.originalCurrency}</strong> →
                  Converti en : <strong className="text-slate-700">{ent.reportingCurrency}</strong>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Bilan :</span>
                    <span className="font-semibold text-slate-900">
                      {formatMoney(ent.balanceSheet.totalAssets)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chiffre d'Affaires :</span>
                    <span className="font-semibold text-slate-900">
                      {formatMoney(ent.incomeStatement.revenue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Résultat Net :</span>
                    <span className="font-semibold text-emerald-700">
                      {formatMoney(ent.incomeStatement.netIncome)}
                    </span>
                  </div>
                  {ent.balanceSheet.translationReserve !== 0 && (
                    <div className="flex justify-between bg-amber-50 p-1.5 rounded-lg text-amber-800">
                      <span>Écart de conversion :</span>
                      <span className="font-bold">
                        {formatMoney(ent.balanceSheet.translationReserve)}
                      </span>
                    </div>
                  )}
                </div>

                {ent.ownershipPercentage < 100 && (
                  <div className="mt-3 p-2 bg-slate-50 rounded-xl text-[11px] text-slate-600 flex justify-between">
                    <span>Intérêts minoritaires (20%) :</span>
                    <span className="font-semibold text-indigo-700">
                      {formatMoney((ent.incomeStatement.netIncome * (100 - ent.ownershipPercentage)) / 100)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Analyse de Structure du Groupe */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-600" />
              Indicateurs Financiers Consolidés du Groupe
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500">Endettement Net Consolidé</span>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  {formatMoney(result.groupKPIs.netDebt)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Dettes financières - Trésorerie active globale</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500">Ratio de Gearing (Dette Nette / FP)</span>
                <div className="text-xl font-bold text-indigo-600 mt-1">
                  {result.groupKPIs.gearingRatioPercent}%
                </div>
                <p className="text-[11px] text-emerald-600 mt-1">Niveau d'endettement très maîtrisé (&lt; 50%)</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500">Rentabilité des Fonds Propres (ROE Groupe)</span>
                <div className="text-xl font-bold text-emerald-600 mt-1">
                  {result.groupKPIs.returnOnConsolidatedEquityPercent}%
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Résultat net part du groupe / FP groupe</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENU ONGLET 2 : BILAN CONSOLIDÉ */}
      {activeTab === 'balancesheet' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Scale className="w-4 h-4 text-indigo-600" />
              Bilan Consolidé au 31 Décembre ({reportingCurrency})
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Contrôle de bouclage :</span>
              <span
                className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  result.aggregatedBalanceSheet.isBalanced
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {result.aggregatedBalanceSheet.isBalanced ? 'Parfaitement Équilibré (Actif = Passif)' : 'Déséquilibre détecté'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Actif */}
            <div className="p-6 space-y-4">
              <h5 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider text-indigo-600 border-b pb-2">
                Actif Consolidé
              </h5>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Actif Immobilisé (Immobilisations nettes)</span>
                  <span className="font-semibold text-slate-900">
                    {formatMoney(result.aggregatedBalanceSheet.fixedAssets)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Actif Circulant (Stocks, Clients hors groupe)</span>
                  <span className="font-semibold text-slate-900">
                    {formatMoney(result.aggregatedBalanceSheet.currentAssets)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Trésorerie & Équivalents (Disponibilités Groupe)</span>
                  <span className="font-semibold text-slate-900">
                    {formatMoney(result.aggregatedBalanceSheet.cashAndEquivalents)}
                  </span>
                </div>
                <div className="flex justify-between py-1 text-slate-500">
                  <span>Créances Intragroupe éliminées :</span>
                  <span className="line-through text-rose-600">
                    - {formatMoney(result.totalIntercompanyReceivablesEliminated)}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t-2 border-slate-900 font-extrabold text-sm text-slate-900">
                  <span>TOTAL ACTIF CONSOLIDÉ</span>
                  <span className="text-indigo-600">
                    {formatMoney(result.aggregatedBalanceSheet.totalAssets)}
                  </span>
                </div>
              </div>
            </div>

            {/* Passif & Capitaux Propres */}
            <div className="p-6 space-y-4">
              <h5 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider text-emerald-600 border-b pb-2">
                Passif & Fonds Propres Consolidés
              </h5>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Capitaux Propres (Part du Groupe)</span>
                  <span className="font-semibold text-slate-900">
                    {formatMoney(result.aggregatedBalanceSheet.groupEquity)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Intérêts Minoritaires (Part des tiers)</span>
                  <span className="font-semibold text-slate-900">
                    {formatMoney(result.aggregatedBalanceSheet.minorityInterestsEquity)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 bg-amber-50/60 p-2 rounded-lg">
                  <span className="text-amber-900 font-medium">Réserve de Conversion (IAS 21)</span>
                  <span className="font-bold text-amber-900">
                    {formatMoney(result.aggregatedBalanceSheet.totalTranslationReserve)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Dettes Financières Long/Moyen Terme</span>
                  <span className="font-semibold text-slate-900">
                    {formatMoney(result.aggregatedBalanceSheet.financialDebts)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Dettes Circulantes d'Exploitation</span>
                  <span className="font-semibold text-slate-900">
                    {formatMoney(result.aggregatedBalanceSheet.currentLiabilities)}
                  </span>
                </div>
                <div className="flex justify-between py-1 text-slate-500">
                  <span>Dettes Intragroupe éliminées :</span>
                  <span className="line-through text-rose-600">
                    - {formatMoney(result.totalIntercompanyReceivablesEliminated)}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t-2 border-slate-900 font-extrabold text-sm text-slate-900">
                  <span>TOTAL PASSIF & CAPITAUX PROPRES</span>
                  <span className="text-emerald-600">
                    {formatMoney(result.aggregatedBalanceSheet.totalEquityAndLiabilities)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENU ONGLET 3 : COMPTE DE RÉSULTAT CONSOLIDÉ */}
      {activeTab === 'incomestatement' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Compte de Résultat Consolidé Groupe ({reportingCurrency})
              </h4>
              <p className="text-xs text-slate-500">
                Élimination intégrale des marges et flux de facturation réciproques intra-sociétés.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Taux moyen EUR/XOF appliqué :</span>
              <div className="text-xs font-bold text-slate-700">{eurAvgRate} FCFA</div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100 font-semibold text-slate-900 text-sm">
              <span>Chiffre d'Affaires Consolidé (Tiers uniquement)</span>
              <span className="text-indigo-600 font-bold">
                {formatMoney(result.aggregatedIncomeStatement.consolidatedRevenue)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 text-slate-600">
              <span>Charges d'Exploitation Consolidées</span>
              <span className="text-rose-600">
                - {formatMoney(result.aggregatedIncomeStatement.consolidatedOperatingExpenses)}
              </span>
            </div>

            <div className="flex justify-between py-2.5 bg-slate-50 px-3 rounded-xl font-bold text-slate-900">
              <span>Résultat d'Exploitation Consolidé (EBIT)</span>
              <span>{formatMoney(result.aggregatedIncomeStatement.consolidatedOperatingIncome)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 text-slate-600">
              <span>Résultat Financier Net</span>
              <span>{formatMoney(result.aggregatedIncomeStatement.consolidatedFinancialResult)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 text-slate-600">
              <span>Impôt sur les Sociétés Consolidé</span>
              <span className="text-rose-600">
                - {formatMoney(result.aggregatedIncomeStatement.consolidatedIncomeTax)}
              </span>
            </div>

            <div className="flex justify-between py-3 border-t-2 border-slate-900 font-extrabold text-base text-slate-900">
              <span>RÉSULTAT NET TOTAL CONSOLIDÉ</span>
              <span className="text-emerald-600">
                {formatMoney(result.aggregatedIncomeStatement.consolidatedNetIncome)}
              </span>
            </div>

            {/* Répartition Part du Groupe vs Minoritaires */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200">
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
                <span className="text-indigo-900 font-bold block">Part du Groupe</span>
                <span className="text-base font-extrabold text-indigo-700">
                  {formatMoney(result.aggregatedIncomeStatement.groupShareNetIncome)}
                </span>
                <span className="text-[11px] text-indigo-600 block mt-0.5">
                  Attribuable aux actionnaires de la holding
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-800 font-bold block">Intérêts Minoritaires</span>
                <span className="text-base font-extrabold text-slate-700">
                  {formatMoney(result.aggregatedIncomeStatement.minorityShareNetIncome)}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Dont 20% filiale Sénégal Agro-Processing
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENU ONGLET 4 : AUDIT DES ÉLIMINATIONS INTRAGROUPE */}
      {activeTab === 'intercompany' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base">Piste d'Audit des Éliminations Intragroupe</h4>
              <p className="text-xs text-slate-500">
                Détail des flux réciproques neutralisés pour éviter tout double comptage dans les états financiers du groupe.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-indigo-900">
                    Ventes Internes Produits Finis : Holding Abidjan → Filiale Paris
                  </span>
                  <p className="text-[11px] text-indigo-700 mt-0.5">
                    Élimination de 50 000 000 FCFA du Chiffre d'affaires et des achats consommés.
                  </p>
                </div>
                <span className="font-extrabold text-sm text-indigo-700">
                  {formatMoney(result.totalIntercompanyRevenueEliminated)}
                </span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-emerald-900">
                    Prêt de Trésorerie Inter-Sociétés : Holding Abidjan ↔ Filiale Dakar
                  </span>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Élimination symétrique : Créance chez Abidjan (40M) contre Dette chez Dakar (40M).
                  </p>
                </div>
                <span className="font-extrabold text-sm text-emerald-700">
                  {formatMoney(40000000)}
                </span>
              </div>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-amber-900">
                    Dette Commerciale d'Approvisionnement : Filiale Paris ↔ Holding Abidjan
                  </span>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    Élimination de 76 224 EUR (50M FCFA) au cours de clôture de 655.957 FCFA.
                  </p>
                </div>
                <span className="font-extrabold text-sm text-amber-700">
                  {formatMoney(50000000)}
                </span>
              </div>
            </div>
          </div>

          {result.intercompanyDiscrepancies.length > 0 ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
              <h5 className="font-bold text-xs text-rose-800 flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                Écarts de Rapprochement Intragroupe Détectés :
              </h5>
              <div className="space-y-1 text-xs text-rose-700">
                {result.intercompanyDiscrepancies.map((disc, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {disc.entityFrom} ↔ {disc.entityTo}
                    </span>
                    <span>Écart : {formatMoney(disc.difference)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Audit Conforme :</strong> Aucune divergence non réconciliée. Toutes les balances réciproques concordent au centime près.
              </span>
            </div>
          )}
        </div>
      )}

      {/* CONTENU ONGLET 5 : MÉTHODOLOGIE & RÈGLES DE CONSOLIDATION */}
      {activeTab === 'pedagogy' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Normes IAS 21 & SYSCOHADA Révisé : Guide Pédagogique
              </h4>
              <p className="text-xs text-slate-500">
                Maîtrisez les concepts clés de la consolidation de comptes pour des groupes panafricains et internationaux.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h5 className="font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                1. Méthode des Cours de Clôture (IAS 21)
              </h5>
              <p>
                Pour convertir une filiale autonome étrangère (ex: Paris SAS en EUR) :
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li><strong>Actifs & Passifs :</strong> Convertis au cours de clôture du 31 décembre.</li>
                <li><strong>Produits & Charges :</strong> Convertis au cours moyen de la période.</li>
                <li><strong>Capitaux Propres :</strong> Maintenus aux cours historiques.</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h5 className="font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-600" />
                2. La Réserve de Conversion (Translation Reserve)
              </h5>
              <p>
                La différence entre le bilan converti au cours de clôture et le compte de résultat converti au cours moyen génère un écart d'évaluation appelé <strong>écart de conversion</strong>.
              </p>
              <p className="text-slate-600">
                Cet écart est comptabilisé directement dans les capitaux propres consolidés (OCI) sans affecter le résultat net de l'exercice.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h5 className="font-bold text-slate-900 flex items-center gap-2">
                <Percent className="w-4 h-4 text-amber-600" />
                3. Intérêts Minoritaires (Participation ne donnant pas le contrôle)
              </h5>
              <p>
                Lorsque la société mère détient moins de 100% du capital (ex: 80% à Dakar), les 20% restants appartiennent à des actionnaires tiers.
              </p>
              <p className="text-slate-600">
                Leurs droits sont isolés au passif dans une ligne distincte des capitaux propres et au compte de résultat sous « Intérêts Minoritaires ».
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h5 className="font-bold text-slate-900 flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-purple-600" />
                4. Élimination des Opérations Réciproques
              </h5>
              <p>
                Le groupe forme une entité économique unique. Une entreprise ne peut faire de profit en se vendant des biens à elle-même.
              </p>
              <p className="text-slate-600">
                Les créances/dettes réciproques et les ventes/achats internes sont neutralisés à 100% quel que soit le pourcentage d'intégration globale.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
