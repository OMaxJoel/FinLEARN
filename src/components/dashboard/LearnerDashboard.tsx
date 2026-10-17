import React from 'react';
import { UserProfile } from '../../types/pedagogy';
import {
  BookOpen,
  Table,
  Play,
  Award,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
} from 'lucide-react';

interface LearnerDashboardProps {
  profile: UserProfile;
  onNavigate: (tab: 'dashboard' | 'courses' | 'excel' | 'simulators' | 'missions' | 'portfolio') => void;
  onStartDiagnostic: () => void;
  onLaunchMission: (missionId: string) => void;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({
  profile,
  onNavigate,
  onStartDiagnostic,
  onLaunchMission,
}) => {
  // Matrice des 9 grandes compétences et leur niveau d'acquisition pour le profil courant
  const competencies = [
    { code: 'COMPT-01', title: 'Comptabilité Générale SYSCOHADA', domain: 'Comptabilité', level: 65, color: 'emerald' },
    { code: 'EXCEL-01', title: 'Laboratoire Excel & Modélisation', domain: 'Excel', level: 50, color: 'sky' },
    { code: 'ANAL-01', title: 'Analyse Financière & BFR', domain: 'Finance', level: 40, color: 'amber' },
    { code: 'GEST-01', title: 'Contrôle de Gestion & Seuil de Rentabilité', domain: 'Contrôle', level: 30, color: 'indigo' },
    { code: 'FIN-01', title: 'Finance d\'Entreprise, VAN & TRI', domain: 'Finance', level: 25, color: 'purple' },
    { code: 'TRES-01', title: 'Gestion & Prévision de Trésorerie', domain: 'Trésorerie', level: 45, color: 'teal' },
    { code: 'COURT-01', title: 'Finance du Courtage en Assurance (CIMA)', domain: 'Courtage', level: 70, color: 'blue' },
    { code: 'OHADA-01', title: 'Fiscalité & Droit Régional UEMOA', domain: 'Réglementaire', level: 35, color: 'rose' },
    { code: 'INTL-01', title: 'Reporting Multi-Devises & Consolidation', domain: 'International', level: 20, color: 'slate' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Bandeau de Bienvenue & Statut de l'Apprenant */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-32 -mb-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Parcours Actif • {profile.careerGoal.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {profile.weeklyHours}h / semaine
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Ravi de vous retrouver, <span className="text-sky-400">{profile.name}</span> !
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Votre feuille de route opérationnelle est synchronisée. Vous avez validé{' '}
              <strong className="text-white font-semibold">{profile.completedLessons.length} leçons</strong> et{' '}
              <strong className="text-white font-semibold">{profile.completedMissions.length} missions professionnelles</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('courses')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Reprendre le Cours
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={onStartDiagnostic}
              className="px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 text-amber-300 border border-amber-500/30 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              Recalculer le Diagnostic
            </button>
          </div>
        </div>

        {/* Statistiques Rapides */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Expérience Totale</span>
            <p className="text-xl font-bold font-mono text-amber-400 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {profile.totalXp} XP
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Leçons Terminées</span>
            <p className="text-xl font-bold font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {profile.completedLessons.length} / 24
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Missions Gamifiées</span>
            <p className="text-xl font-bold font-mono text-sky-400 flex items-center gap-1">
              <Play className="w-4 h-4 text-sky-400" />
              {profile.completedMissions.length} / 10
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Devise de Référence</span>
            <p className="text-xl font-bold font-mono text-purple-400">FCFA (XOF)</p>
          </div>
        </div>
      </div>

      {/* 2. Cartes d'Accès Rapide aux 4 Environnements Clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onNavigate('courses')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            Comptabilité SYSCOHADA
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Équation comptable, partie double, journal général, grand livre et balance à 6 colonnes.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            Explorer les modules <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('excel')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Table className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
            Laboratoire Excel
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Grille interactive, formules financières, RECHERCHEX, détection de hardcoding et audit.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-sky-600">
            Ouvrir la grille <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('simulators')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
            Simulateurs Financiers
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Rapprochement bancaire, batterie de ratios, BFR, seuil de rentabilité et calcul de commissions.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-600">
            Lancer les calculs <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('missions')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Play className="w-6 h-6 fill-purple-600" />
          </div>
          <h3 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
            Jeux & Missions Métier
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Scénarios immersifs : clôture mensuelle en PME, réparation de classeur et litige de courtage.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-600">
            Choisir une mission <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 3. Carte des 9 Compétences Clés & Taux de Maîtrise */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Carte de Maîtrise des Compétences</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Évaluation dynamique calculée d'après vos exercices réussis, simulateurs et missions validées.
            </p>
          </div>
          <button
            onClick={() => onNavigate('portfolio')}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 self-start sm:self-auto"
          >
            Consulter le portfolio de preuves <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competencies.map((comp) => (
            <div key={comp.code} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {comp.domain}
                </span>
                <span className="text-xs font-bold font-mono text-slate-800">{comp.level}%</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
                {comp.title}
              </h4>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    comp.level >= 60
                      ? 'bg-emerald-500'
                      : comp.level >= 35
                      ? 'bg-amber-500'
                      : 'bg-slate-400'
                  }`}
                  style={{ width: `${comp.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Missions Recommandées Immédiates */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 text-white space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Action Prioritaire
              </span>
            </div>
            <h2 className="text-xl font-bold mt-1">Missions Métier Scénarisées Recommandées</h2>
          </div>
          <button
            onClick={() => onNavigate('missions')}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            Toutes les missions <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-400">Mission 1 • Débutant</span>
              <h4 className="font-bold text-white text-base">La Première Journée du Comptable</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                PME Ivoire Distribution (Abidjan) : Enregistrer les flux de création, manipuler les pièces et équilibrer le bilan.
              </p>
            </div>
            <button
              onClick={() => onLaunchMission('MISSION_01')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs text-white transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Jouer la Mission (15 min)
            </button>
          </div>

          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-sky-400">Mission 2 • Opérationnel</span>
              <h4 className="font-bold text-white text-base">Répare le Tableau de Bord</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Société Ivoirienne de Prestations : Auditer un classeur corrompu, éliminer les erreurs #DIV/0! et le hardcoding avant 16h.
              </p>
            </div>
            <button
              onClick={() => onLaunchMission('MISSION_02')}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 font-semibold text-xs text-white transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Jouer la Mission (20 min)
            </button>
          </div>

          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-400">Mission 3 • Expert</span>
              <h4 className="font-bold text-white text-base">Le Bordereau Contesté</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cabinet Ivoire Courtage Conseil (ICC) : Rapprocher le bordereau de Sanlam, chiffrer la sous-commission de 360 000 FCFA et rédiger la réclamation.
              </p>
            </div>
            <button
              onClick={() => onLaunchMission('MISSION_03')}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 font-semibold text-xs text-white transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Jouer la Mission (25 min)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
