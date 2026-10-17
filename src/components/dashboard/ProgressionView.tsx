import React, { useState } from 'react';
import { UserProfile } from '../../types/pedagogy';
import { NavigationTab } from '../common/Sidebar';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  Clock,
  Target,
  BarChart3,
  Calendar,
  Layers,
} from 'lucide-react';

interface ProgressionViewProps {
  profile: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenDiagnostic: () => void;
}

export const ProgressionView: React.FC<ProgressionViewProps> = ({
  profile,
  onNavigate,
  onOpenDiagnostic,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'competencies' | 'badges'>('overview');

  // Les 9 Compétences Clés de la Plateforme (Cahiers des charges)
  const competencies = [
    {
      id: 'COMPT_OHADA',
      title: 'Comptabilité Générale & SYSCOHADA',
      domain: 'Comptabilité',
      progress: profile.completedLessons.filter((l) => l.startsWith('C1')).length >= 2 ? 85 : 40,
      level: 'Avancé',
      description: 'Partie double, balance générale, liasse fiscale, clôture mensuelle et régularisations.',
      skills: ['Équation bilancielle', 'Grand Livre & Balances', 'Amortissements & Provisions', 'États financiers OHADA'],
      color: 'emerald',
    },
    {
      id: 'ANAL_FIN',
      title: 'Analyse Financière & Diagnostic',
      domain: 'Finance',
      progress: profile.completedLessons.filter((l) => l.startsWith('C2')).length >= 1 ? 75 : 30,
      level: 'Avancé',
      description: 'FRNG, BFR, Trésorerie nette, SIG, ratios de rentabilité et note de synthèse bancaire.',
      skills: ['Équilibre fonctionnel', 'Ratios de liquidité', 'Rentabilité économique (ROA/ROE)', 'Comité de crédit'],
      color: 'blue',
    },
    {
      id: 'EXCEL_LAB',
      title: 'Modélisation Excel du Débutant à l\'Expert',
      domain: 'Outils & Données',
      progress: profile.completedLessons.filter((l) => l.startsWith('C3')).length >= 1 ? 80 : 35,
      level: 'Expert',
      description: 'Références absolues ($), RECHERCHEX, INDEX/EQUIV, Tableaux Croisés Dynamiques et audit de formules.',
      skills: ['Architecture sans constante en dur', 'Formules matricielles & lookup', 'TCD multidimensionnels', 'Audit de formules cycliques'],
      color: 'sky',
    },
    {
      id: 'GEST_PERF',
      title: 'Contrôle de Gestion & Pilotage Budgétaire',
      domain: 'Pilotage',
      progress: profile.completedLessons.filter((l) => l.startsWith('C4')).length >= 1 ? 65 : 20,
      level: 'Opérationnel',
      description: 'Seuil de rentabilité, point mort en jours, marge sur coût variable, budget flexible et analyse des écarts.',
      skills: ['Typologie des coûts (Fixes/Variables)', 'Calcul du point mort', 'Budget flexible', 'Décomposition Volume/Prix/Coût'],
      color: 'purple',
    },
    {
      id: 'FIN_INVEST',
      title: 'Finance d\'Entreprise & Choix d\'Investissement',
      domain: 'Finance',
      progress: profile.completedLessons.filter((l) => l.startsWith('C5')).length >= 1 ? 70 : 25,
      level: 'Avancé',
      description: 'VAN, TRI, Indice de Profitabilité, Payback actualisé, CMPC/WACC et rationnement du capital.',
      skills: ['Flux nets de trésorerie', 'Calcul du CMPC/WACC', 'VAN & TRI comparés', 'Rationnement sous contrainte'],
      color: 'amber',
    },
    {
      id: 'TRES_STRESS',
      title: 'Gestion & Prévision de Trésorerie',
      domain: 'Trésorerie',
      progress: profile.completedMissions.includes('MISSION_05') ? 70 : 30,
      level: 'Intermédiaire',
      description: 'Plan de trésorerie glissant 13 semaines, stress tests de liquidité, négociation de découverts.',
      skills: ['Plan glissant 13 semaines', 'Stress-testing BFR', 'Gestion des tirages bancaires', 'Arbitrage encaissements'],
      color: 'rose',
    },
    {
      id: 'COURT_CIMA',
      title: 'Finance du Courtage en Assurance (CIMA)',
      domain: 'Assurance & Risque',
      progress: profile.completedLessons.filter((l) => l.startsWith('C7')).length >= 1 ? 60 : 15,
      level: 'Opérationnel',
      description: 'Modèle économique du courtier, commissions d\'apport, Article 13 CIMA, réconciliation des bordereaux.',
      skills: ['Décomposition prime brute / nette', 'Taux de commission par branche', 'Règle CIMA Art. 13 (encaissement)', 'Rapprochement comptable'],
      color: 'indigo',
    },
    {
      id: 'ZONE_OHADA',
      title: 'Contexte Économique CI & Espace UEMOA',
      domain: 'Réglementaire',
      progress: 65,
      level: 'Opérationnel',
      description: 'Réglementation fiscale ivoirienne (TVA 18%, AIRSI), secteur bancaire BCEAO et marché financier BRVM.',
      skills: ['Fiscalité des entreprises CI', 'Ratios prudentiels BCEAO', 'Mécanique de cotation BRVM', 'Conformité douanière & devises'],
      color: 'teal',
    },
    {
      id: 'REPORT_MULTI',
      title: 'Reporting Multi-Entités & Consolidation',
      domain: 'Comptabilité Groupe',
      progress: profile.completedMissions.includes('MISSION_06') ? 55 : 20,
      level: 'Intermédiaire',
      description: 'Intégration globale, élimination des opérations intra-groupe et conversion de devises ouest-africaines.',
      skills: ['Périmètre de consolidation', 'Élimination des créances/dettes réciproques', 'Calcul des minoritaires', 'Harmonisation comptable'],
      color: 'cyan',
    },
  ];

  // Badges Réalisés et À Débloquer
  const badges = [
    {
      id: 'badge_syscohada',
      name: 'Maître SYSCOHADA',
      domain: 'Comptabilité',
      desc: 'A clôturé avec succès un exercice complet sous le référentiel SYSCOHADA révisé.',
      unlocked: profile.completedLessons.filter((l) => l.startsWith('C1')).length >= 2,
      rarity: 'Or',
      icon: 'BookOpen',
    },
    {
      id: 'badge_excel_ninja',
      name: 'Génie d\'Excel',
      domain: 'Modélisation',
      desc: 'A construit un modèle financier complexe sans constante en dur avec RECHERCHEX et TCD.',
      unlocked: profile.completedLessons.filter((l) => l.startsWith('C3')).length >= 1,
      rarity: 'Platine',
      icon: 'Sparkles',
    },
    {
      id: 'badge_financial_analyst',
      name: 'Diagnostiqueur d\'Élite',
      domain: 'Finance',
      desc: 'A identifié les causes racines de crise de trésorerie sur une PME ivoirienne en expansion.',
      unlocked: profile.completedLessons.filter((l) => l.startsWith('C2')).length >= 1,
      rarity: 'Or',
      icon: 'TrendingUp',
    },
    {
      id: 'badge_cima_guardian',
      name: 'Garant CIMA',
      domain: 'Assurance',
      desc: 'A appliqué sans faille les règles strictes de l\'Article 13 du Code CIMA sur les encaissements.',
      unlocked: profile.completedLessons.filter((l) => l.startsWith('C7')).length >= 1,
      rarity: 'Argent',
      icon: 'Award',
    },
    {
      id: 'badge_invest_master',
      name: 'Arbitre des Investissements',
      domain: 'Finance',
      desc: 'A optimisé l\'allocation de capital d\'une enveloppe de 800M FCFA avec analyse de sensibilité.',
      unlocked: profile.completedLessons.filter((l) => l.startsWith('C5')).length >= 1,
      rarity: 'Or',
      icon: 'Target',
    },
    {
      id: 'badge_variance_detective',
      name: 'Détective des Écarts',
      domain: 'Contrôle',
      desc: 'A décomposé avec exactitude les effets volume, prix et matière sur un budget flexible.',
      unlocked: profile.completedLessons.filter((l) => l.startsWith('C4')).length >= 1,
      rarity: 'Argent',
      icon: 'BarChart3',
    },
    {
      id: 'badge_mission_veteran',
      name: 'Vétéran des Missions',
      domain: 'Jeux Sérieux',
      desc: 'A complété plus de 5 missions de simulation en environnement d\'entreprise 3D.',
      unlocked: profile.completedMissions.length >= 5,
      rarity: 'Diamant',
      icon: 'Zap',
    },
    {
      id: 'badge_treasury_shield',
      name: 'Bouclier de Trésorerie',
      domain: 'Trésorerie',
      desc: 'A survécu à un stress test de liquidité extrême sans cessation de paiements.',
      unlocked: profile.completedMissions.includes('MISSION_05'),
      rarity: 'Or',
      icon: 'CheckCircle2',
    },
  ];

  const totalProgressAverage = Math.round(
    competencies.reduce((acc, c) => acc + c.progress, 0) / competencies.length
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6 animate-fadeIn">
      {/* 1. Header Hero Bannière Progression */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-gradient-to-r from-[#0E1A38] via-[#122853] to-[#0B152E] text-white p-7 sm:p-9">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold backdrop-blur-xs">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Tableau de Bord des Compétences & Progression</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Progression Opérationnelle de {profile.name}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Suivi déterministe et vérifié de vos acquis à travers les 9 piliers fondamentaux de la finance d'entreprise, de la modélisation comptable aux arbitrages d'investissement.
            </p>
          </div>

          {/* Jauge Globale Circulaire */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 flex items-center gap-6 shrink-0 shadow-lg">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#00D2FF"
                  strokeWidth="8"
                  strokeDasharray={`${totalProgressAverage * 2.51} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-2xl font-black">{totalProgressAverage}%</span>
                <span className="text-[10px] uppercase font-bold text-sky-300">Global</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs text-slate-300">Niveau actuel</div>
              <div className="text-lg font-bold text-white capitalize">{profile.experienceLevel}</div>
              <div className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{profile.totalXp.toLocaleString('fr-FR')} XP accumulés</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Onglets de Navigation Intérieure */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Vue d'ensemble</span>
        </button>

        <button
          onClick={() => setActiveTab('competencies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'competencies'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Détail des 9 Compétences</span>
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'badges'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Badges & Trophées ({badges.filter((b) => b.unlocked).length}/{badges.length})</span>
        </button>
      </div>

      {/* 3. Contenu de l'onglet actif */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Cartes Métriques Clés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 block mb-1">Leçons Terminées</span>
              <div className="text-2xl font-black text-slate-800">{profile.completedLessons.length} / 12</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Validation continue</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 block mb-1">Missions Validées</span>
              <div className="text-2xl font-black text-slate-800">{profile.completedMissions.length} / 9</div>
              <div className="text-[11px] text-blue-600 font-medium mt-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulations réelles</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 block mb-1">Rythme Hebdomadaire</span>
              <div className="text-2xl font-black text-slate-800">{profile.weeklyHours}h / sem</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Objectif recommandé : 12h</div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 block mb-1">Badges Débloqués</span>
              <div className="text-2xl font-black text-amber-500">
                {badges.filter((b) => b.unlocked).length} / {badges.length}
              </div>
              <div className="text-[11px] text-amber-600 font-medium mt-1 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>Niveau d'excellence</span>
              </div>
            </div>
          </div>

          {/* Grille Rapide des Compétences */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Vue synthétique des 9 référentiels de compétences
                </h3>
                <p className="text-xs text-slate-500">
                  Évaluation basée sur les exercices réussis, les quiz et les résolutions dans les simulateurs.
                </p>
              </div>
              <button
                onClick={onOpenDiagnostic}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold transition border border-blue-200/60"
              >
                Passer un test diagnostic
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {competencies.map((comp) => (
                <div
                  key={comp.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 hover:bg-slate-100/70 transition"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 truncate pr-2">{comp.title}</span>
                    <span className="font-extrabold text-blue-600 shrink-0">{comp.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${comp.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>{comp.domain}</span>
                    <span className="font-semibold text-slate-700">{comp.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Détail des 9 Compétences */}
      {activeTab === 'competencies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competencies.map((comp) => (
            <div
              key={comp.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
                    {comp.domain}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{comp.level}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{comp.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{comp.description}</p>

                {/* Barre de Progression */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">Niveau de maîtrise</span>
                    <span className="text-blue-600">{comp.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${comp.progress}%` }}
                    />
                  </div>
                </div>

                {/* Sous-compétences Clés */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 block">Savoir-faire clés :</span>
                  {comp.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('courses')}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>S'entraîner sur ce pilier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Badges et Trophées */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`rounded-3xl p-6 border transition flex flex-col justify-between space-y-4 ${
                b.unlocked
                  ? 'bg-white border-amber-200/80 shadow-md shadow-amber-500/5'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      b.unlocked
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {b.rarity}
                  </span>
                  {b.unlocked ? (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Obtenu</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Verrouillé</span>
                    </span>
                  )}
                </div>

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-amber-500 to-amber-300 text-white shadow-md shadow-amber-500/20">
                  <Award className="w-7 h-7" />
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900">{b.name}</h4>
                  <span className="text-[11px] font-medium text-slate-500 block">{b.domain}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>

              {b.unlocked && (
                <div className="text-[10px] text-amber-700 bg-amber-50 rounded-xl p-2 font-medium border border-amber-200/50">
                  Certificat d'accomplissement inclus dans le portfolio officiel.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
