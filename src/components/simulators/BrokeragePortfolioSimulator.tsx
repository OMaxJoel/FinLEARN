import React, { useState, useMemo } from 'react';
import {
  InsuranceBranch,
  InsurancePolicy,
  computePortfolioKPIs,
  simulatePortfolioRenewal,
  computeClientAccountProfitability,
  getExpiringPoliciesTimeline,
  checkCIMAArticle13Compliance,
  computePolicyFinancials,
} from '../../core/insurance/commissions';
import { ICC_POLICIES_DATASET } from '../../data/mockDatasets';
import {
  Shield,
  Clock,
  TrendingDown,
  TrendingUp,
  Percent,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  Building,
  Users,
  Filter,
} from 'lucide-react';

export const BrokeragePortfolioSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'renewals' | 'profitability'>('overview');
  const [policies, setPolicies] = useState<InsurancePolicy[]>(ICC_POLICIES_DATASET);
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Paramètres de simulation prospective
  const [targetRetentionRate, setTargetRetentionRate] = useState<number>(85);
  const [santeAdjustment, setSanteAdjustment] = useState<number>(-10);
  const [autoAdjustment, setAutoAdjustment] = useState<number>(5);
  const [premiumInflation, setPremiumInflation] = useState<number>(3);

  // KPIs consolidés réels
  const kpis = useMemo(() => computePortfolioKPIs(policies), [policies]);

  // Chronologie des échéances au 31/03/2026
  const timeline = useMemo(() => getExpiringPoliciesTimeline(policies, '2026-03-31'), [policies]);

  // Simulation prospective de renouvellement
  const renewalSimulation = useMemo(() => {
    return simulatePortfolioRenewal(policies, {
      defaultRenewalRatePercent: targetRetentionRate,
      branchAdjustments: {
        SANTE: santeAdjustment,
        AUTO: autoAdjustment,
      },
      premiumInflationPercent: premiumInflation,
    });
  }, [policies, targetRetentionRate, santeAdjustment, autoAdjustment, premiumInflation]);

  // Rentabilité par compte client
  const clientProfitability = useMemo(() => {
    return computeClientAccountProfitability(policies, {
      'SOTRA Fictive Abidjan': {
        claimsHandledCount: 18,
        managementHours: 120, // 120h * 15k = 1.8M FCFA
        costPerHourFCFA: 15000,
      },
      'Compagnie Ivoirienne de Cacao': {
        claimsHandledCount: 12,
        managementHours: 40,
        costPerHourFCFA: 15000,
      },
      'Entrepôts Frigorifiques de San Pedro': {
        claimsHandledCount: 4,
        managementHours: 15,
        costPerHourFCFA: 15000,
      },
      'Ivoire Transit & Logistique': {
        claimsHandledCount: 8,
        managementHours: 50,
        costPerHourFCFA: 15000,
      },
    });
  }, [policies]);

  // Filtrage des contrats
  const filteredPolicies = useMemo(() => {
    return policies.filter((p) => {
      const matchBranch = selectedBranch === 'ALL' || p.branch === selectedBranch;
      const matchSearch =
        p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.insurerName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBranch && matchSearch;
    });
  }, [policies, selectedBranch, searchQuery]);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* En-tête */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
              Spécialisation Courtage d'Assurance (COURT-04 à COURT-06)
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Code CIMA & Rétention
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Gestion de Portefeuille & Rétention Courtage CIMA
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-1 leading-relaxed">
            Cabinet Ivoire Courtage Conseil (ICC) à Abidjan. Pilotez le renouvellement de vos contrats Santé, Auto, IARD et Transport, appliquez l'Article 13 CIMA et auditez la rentabilité nette de chaque compte client.
          </p>
        </div>

        {/* Boutons d'onglets */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-purple-600" />
            1. Portefeuille & CIMA Art. 13
          </button>
          <button
            onClick={() => setActiveTab('renewals')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'renewals'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            2. Échéances & Simulateur Rétention
          </button>
          <button
            onClick={() => setActiveTab('profitability')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'profitability'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            3. Rentabilité Analytique par Compte
          </button>
        </div>
      </div>

      {/* Cartes KPIs Communes */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Primes Émises TTC
          </span>
          <span className="text-sm font-black font-mono text-slate-900">
            {kpis.totalGrossPremiumsTTC.toLocaleString()} FCFA
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Primes Nettes (Assiette)
          </span>
          <span className="text-sm font-black font-mono text-indigo-700">
            {kpis.totalNetPremiums.toLocaleString()} FCFA
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Commissions Courtier
          </span>
          <span className="text-sm font-black font-mono text-emerald-700">
            {kpis.totalCommissions.toLocaleString()} FCFA
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Taux Moyen Comm.
          </span>
          <span className="text-sm font-black font-mono text-purple-700">
            {kpis.averageCommissionRate.toFixed(1)} %
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Taux de Rétention
          </span>
          <span className="text-sm font-black font-mono text-sky-700">
            {kpis.retentionRatePercent.toFixed(1)} %
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Taux de Churn
          </span>
          <span className="text-sm font-black font-mono text-rose-600">
            {kpis.churnRatePercent.toFixed(1)} %
          </span>
        </div>
      </div>

      {/* ONGLET 1 : PORTEFEUILLE & CIMA ART. 13 */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Barre de recherche et filtre de branche */}
          <div className="bg-white rounded-3xl p-4 md:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un client, contrat ou assureur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {['ALL', 'SANTE', 'AUTO', 'IARD', 'RC', 'TRANSPORT', 'VIE'].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBranch(b)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedBranch === b
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {b === 'ALL' ? 'Toutes branches' : b}
                </button>
              ))}
            </div>
          </div>

          {/* Table des contrats */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">
                Polices d'Assurance du Portefeuille ({filteredPolicies.length} contrats)
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Règle CIMA Art. 13 : Délai d'encaissement légal ≤ 30 jours
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                    <th className="p-3.5">N° Police</th>
                    <th className="p-3.5">Client Assuré</th>
                    <th className="p-3.5">Branche</th>
                    <th className="p-3.5">Assureur</th>
                    <th className="p-3.5 text-right">Prime Nette</th>
                    <th className="p-3.5 text-right">Taux Comm.</th>
                    <th className="p-3.5 text-right">Commission</th>
                    <th className="p-3.5 text-center">Conformité CIMA Art. 13</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium">
                  {filteredPolicies.map((p) => {
                    const fin = computePolicyFinancials(p);
                    const cimaCheck = checkCIMAArticle13Compliance(
                      p.effectiveDate,
                      p.premiumPaymentDate
                    );

                    return (
                      <tr key={p.policyNumber} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-purple-700">
                          {p.policyNumber}
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">{p.clientName}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                            {p.branch}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600">{p.insurerName}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-slate-800">
                          {fin.netPremium.toLocaleString()} FCFA
                        </td>
                        <td className="p-3.5 text-right font-mono text-slate-600">
                          {p.commissionRatePercent}%
                        </td>
                        <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                          {fin.expectedCommission.toLocaleString()} FCFA
                        </td>
                        <td className="p-3.5 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              cimaCheck.isCompliant
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {cimaCheck.isCompliant ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" /> Conforme ({cimaCheck.daysToPayment}j)
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-3 h-3" /> Suspension ({cimaCheck.daysToPayment}j)
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ONGLET 2 : CALENDRIER D'ÉCHÉANCES & SIMULATEUR DE RÉTENTION */}
      {activeTab === 'renewals' && (
        <div className="space-y-6">
          {/* Alertes d'échéances urgentes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-rose-50/70 border border-rose-200 rounded-3xl p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-rose-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Échéances Critiques (&lt; 30 Jours)
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-rose-200 text-rose-900">
                  {timeline.critical30Days.policies.length} polices
                </span>
              </div>
              <p className="text-xs text-rose-700 leading-snug">
                {timeline.critical30Days.totalPremiumsFCFA.toLocaleString()} FCFA de primes nettes à reconduire d'urgence.
              </p>
              <div className="space-y-1.5">
                {timeline.critical30Days.policies.map((p) => (
                  <div
                    key={p.policyNumber}
                    className="p-2 bg-white/90 rounded-xl border border-rose-200 text-xs flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">{p.clientName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {p.policyNumber} | {p.branch}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-rose-600 font-mono">
                      Dans {p.daysToExpiry}j
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-amber-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  À Préparer (31 à 60 Jours)
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-200 text-amber-900">
                  {timeline.upcoming60Days.policies.length} polices
                </span>
              </div>
              <p className="text-xs text-amber-700 leading-snug">
                {timeline.upcoming60Days.totalPremiumsFCFA.toLocaleString()} FCFA de primes en préparation de renouvellement.
              </p>
              <div className="space-y-1.5">
                {timeline.upcoming60Days.policies.map((p) => (
                  <div
                    key={p.policyNumber}
                    className="p-2 bg-white/90 rounded-xl border border-amber-200 text-xs flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">{p.clientName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {p.policyNumber} | {p.branch}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 font-mono">
                      Dans {p.daysToExpiry}j
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-500" />
                  Échéances Lointaines (&gt; 60 Jours)
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-slate-200 text-slate-700">
                  {timeline.laterPolicies.policies.length} polices
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-snug">
                {timeline.laterPolicies.totalPremiumsFCFA.toLocaleString()} FCFA de primes sécurisées pour le moment.
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block">Actions recommandées :</span>
                <span className="text-[11px] text-slate-500 block">
                  • Effectuer un point de sinistralité semestriel avec le client.
                </span>
                <span className="text-[11px] text-slate-500 block">
                  • Surveiller l'encaissement des quittances CIMA intermédiaires.
                </span>
              </div>
            </div>
          </div>

          {/* Simulateur Prospectif de Churn & Rétention */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Percent className="w-5 h-5 text-indigo-600" />
              Simulateur Prospectif de Rétention & Projection de Commissions N+1
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Taux de Rétention Global Visé :</span>
                  <span className="font-mono text-indigo-700">{targetRetentionRate}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={targetRetentionRate}
                  onChange={(e) => setTargetRetentionRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Stress Branche Santé (Concurrence) :</span>
                  <span className="font-mono text-rose-600">{santeAdjustment}%</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="10"
                  step="1"
                  value={santeAdjustment}
                  onChange={(e) => setSanteAdjustment(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Indexation Tarifaire Moyenne :</span>
                  <span className="font-mono text-emerald-700">+{premiumInflation}%</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="15"
                  step="1"
                  value={premiumInflation}
                  onChange={(e) => setPremiumInflation(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            {/* Bilan simulé */}
            <div className="p-5 bg-indigo-50/60 rounded-2xl border border-indigo-200 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-indigo-800 font-bold block">Primes Projetées N+1 :</span>
                <span className="text-base font-extrabold font-mono text-indigo-950">
                  {renewalSimulation.projectedTotalPremiums.toLocaleString()} FCFA
                </span>
                <span className="text-[10px] text-indigo-600 block mt-0.5">
                  vs {renewalSimulation.currentTotalPremiums.toLocaleString()} FCFA (Actuel)
                </span>
              </div>

              <div>
                <span className="text-indigo-800 font-bold block">Commissions Projetées N+1 :</span>
                <span className="text-base font-extrabold font-mono text-emerald-700">
                  {renewalSimulation.projectedCommissions.toLocaleString()} FCFA
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">
                  Revenu net estimé du cabinet
                </span>
              </div>

              <div>
                <span className="text-indigo-800 font-bold block">Chiffre d'Affaires Perdu (Churn) :</span>
                <span className="text-base font-extrabold font-mono text-rose-600">
                  -{renewalSimulation.commissionsLostFCFA.toLocaleString()} FCFA
                </span>
                <span className="text-[10px] text-rose-600 block mt-0.5">
                  Commissions érodées par l'attrition
                </span>
              </div>

              <div>
                <span className="text-indigo-800 font-bold block">Taux de Churn Projeté :</span>
                <span className="text-base font-extrabold font-mono text-slate-800">
                  {renewalSimulation.projectedChurnRatePercent.toFixed(1)} %
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  ~{renewalSimulation.lostPoliciesCount} contrat(s) en perte
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ONGLET 3 : RENTABILITÉ ANALYTIQUE PAR COMPTE CLIENT */}
      {activeTab === 'profitability' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Tableau Analytique de Rentabilité par Compte Client
              </h3>
              <p className="text-xs text-slate-500">
                La rentabilité réelle d'un compte de courtage doit déduire le coût des heures de gestion des sinistres (coût moyen : 15 000 FCFA/heure).
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                    <th className="p-3.5">Compte Client</th>
                    <th className="p-3.5 text-center">Nb Contrats</th>
                    <th className="p-3.5 text-right">Primes Nettes</th>
                    <th className="p-3.5 text-right">Commissions Brutes</th>
                    <th className="p-3.5 text-center">Sinistres Traités</th>
                    <th className="p-3.5 text-right">Coût Gestion Sinistres</th>
                    <th className="p-3.5 text-right">Marge Nette Courtage</th>
                    <th className="p-3.5 text-center">Diagnostic de Marge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium">
                  {clientProfitability.map((client) => (
                    <tr key={client.clientName} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{client.clientName}</td>
                      <td className="p-3.5 text-center font-mono">{client.policiesCount}</td>
                      <td className="p-3.5 text-right font-mono text-slate-700">
                        {client.totalNetPremiums.toLocaleString()} FCFA
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                        {client.totalCommissions.toLocaleString()} FCFA
                      </td>
                      <td className="p-3.5 text-center font-mono text-slate-600">
                        {client.claimsCount} ({client.managementHours}h)
                      </td>
                      <td className="p-3.5 text-right font-mono text-rose-600">
                        {client.managementCostFCFA.toLocaleString()} FCFA
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold">
                        <span
                          className={
                            client.netBrokerMarginFCFA >= 0 ? 'text-emerald-700' : 'text-rose-600'
                          }
                        >
                          {client.netBrokerMarginFCFA.toLocaleString()} FCFA
                        </span>
                        <span className="block text-[10px] text-slate-400">
                          ({client.marginRatioPercent.toFixed(1)}%)
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            client.status === 'TRES_RENTABLE'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : client.status === 'EQUILIBRE'
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {client.status === 'TRES_RENTABLE' && 'Très Rentable'}
                          {client.status === 'EQUILIBRE' && 'Équilibré'}
                          {client.status === 'DEFICITAIRE' && 'Déficitaire (Action Requise)'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3 mt-4">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  Recommandation managériale sur les comptes à forte sinistralité :
                </span>
                <p className="mt-0.5 text-amber-800 leading-relaxed">
                  Lorsqu'un compte client absorbe un volume d'heures de gestion disproportionné par rapport à sa prime (ex. gestion quotidienne d'une flotte automobile avec 18 sinistres), le courtier doit impérativement renégocier un honoraire de gestion de sinistres dédié (fee forfaitaire) ou rehausser le taux de commissionnement auprès de la compagnie d'assurance partenaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
