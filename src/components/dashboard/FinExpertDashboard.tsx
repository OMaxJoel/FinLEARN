import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../types/pedagogy';
import { NavigationTab } from '../common/Sidebar';
import { dbPersistence } from '../../core/persistence/dbClient';
import { PATH_DASHBOARD_SUMMARIES } from '../../data/pathDashboardSummaries';
import { PathEnrollment360, LearningPath360 } from '../../types/pedagogy360';
import {
  Play,
  ArrowRight,
  Trophy,
  BookOpen,
  Gamepad2,
  Calculator,
  Award,
  Sparkles,
  FileSpreadsheet,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Target,
  FileText,
  Clock,
  Layers,
  ChevronLeft,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

interface FinExpertDashboardProps {
  profile: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onLaunchMission: (missionId: string) => void;
  onOpenDiagnostic: () => void;
  onSelectPath?: (pathId: string, initialLessonId?: string) => void;
}

export const FinExpertDashboard: React.FC<FinExpertDashboardProps> = ({
  profile,
  onNavigate,
  onLaunchMission,
  onOpenDiagnostic,
  onSelectPath,
}) => {
  const [activeEnrollment, setActiveEnrollment] = useState<PathEnrollment360 | null>(null);

  useEffect(() => {
    let isCurrent = true;
    async function loadEnrollment() {
      const enrollments = await dbPersistence.getAllUserEnrollments(profile.id);
      if (enrollments && enrollments.length > 0) {
        const sorted = [...enrollments].sort(
          (a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()
        );
        if (isCurrent) setActiveEnrollment(sorted[0]);
      } else {
        const def = await dbPersistence.getEnrollment(profile.id, 'PATH_FIN_ANALYST_360');
        if (isCurrent) setActiveEnrollment(def);
      }
    }
    loadEnrollment();
    return () => { isCurrent = false; };
  }, [profile.id]);

  const currentPath =
    PATH_DASHBOARD_SUMMARIES.find((path) => path.id === activeEnrollment?.pathId) || PATH_DASHBOARD_SUMMARIES[0];

  const consultationPercent = activeEnrollment?.consultationProgressPercent ?? 0;
  const practicalPercent = activeEnrollment?.practicalActivitiesProgressPercent ?? 0;
  const evaluationPercent = activeEnrollment?.evaluationScorePercent ?? 0;
  const competenciesPercent = activeEnrollment?.competenciesMasteryPercent ?? 0;

  // Détermination dynamique du module et de la leçon en cours
  let currentModuleTitle = currentPath.levels[0]?.modules[0]?.title ?? 'Module d\'introduction';
  let currentLessonTitle = currentPath.levels[0]?.modules[0]?.chapters[0]?.lessons[0]?.title ?? 'Première leçon';

  if (activeEnrollment?.currentActivityId) {
    for (const lvl of currentPath.levels) {
      for (const mod of lvl.modules) {
        for (const chap of mod.chapters) {
          const found = chap.lessons.find((l) => l.id === activeEnrollment.currentActivityId);
          if (found) {
            currentModuleTitle = mod.title;
            currentLessonTitle = found.title;
            break;
          }
        }
      }
    }
  }

  const handleResume = () => {
    if (onSelectPath && activeEnrollment) {
      onSelectPath(currentPath.id, activeEnrollment.currentLocation?.lessonId || activeEnrollment.currentActivityId);
    } else if (onSelectPath) {
      onSelectPath(currentPath.id);
    } else {
      onNavigate('courses');
    }
  };

  return (
    <div className="dashboard-page p-4 sm:p-7 xl:p-8 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Grille Principale 2 Colonnes : Contenu Central (70%) + Colonne Profil/Activités (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* COLONNE GAUCHE / CENTRALE (8 sur 12 cols en large) */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-7">
          {/* 1. Grand Bannière Héroïque "VOTRE PARCOURS DE FORMATION" */}
          <div className="dashboard-hero relative rounded-[28px] overflow-hidden shadow-lg border border-slate-200/80 bg-gradient-to-r from-[#0E1A38] via-[#11244A] to-[#0A1633] text-white p-6 sm:p-9 min-h-[250px] flex flex-col justify-between">
            {/* Arrière-plan Skyline Abidjan Lagoon au Crépuscule */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none overflow-hidden">
              <svg viewBox="0 0 1000 350" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#0284C7" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#EA580C" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0369A1" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0B132B" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <rect width="1000" height="350" fill="url(#skyGrad)" />
                {/* Silhouette Tours Plateau */}
                <rect x="520" y="80" width="40" height="200" fill="#0F172A" opacity="0.9" rx="2" />
                <rect x="570" y="110" width="35" height="170" fill="#0F172A" opacity="0.8" rx="2" />
                <rect x="615" y="60" width="45" height="220" fill="#0F172A" opacity="0.95" rx="3" />
                <rect x="670" y="120" width="50" height="160" fill="#0F172A" opacity="0.85" rx="2" />
                <rect x="730" y="90" width="35" height="190" fill="#0F172A" opacity="0.9" rx="2" />
                <rect x="775" y="140" width="30" height="140" fill="#0F172A" opacity="0.8" rx="2" />
                {/* Pont Henri Konan Bédié / Félix Houphouët-Boigny */}
                <path d="M400 270 Q 700 260, 1000 275" stroke="#F97316" strokeWidth="3" opacity="0.8" />
                <path d="M400 273 Q 700 263, 1000 278" stroke="#38BDF8" strokeWidth="2" opacity="0.7" />
                {/* Reflets Lagune Ébrié */}
                <rect y="270" width="1000" height="80" fill="url(#waterGrad)" />
              </svg>
            </div>

            {/* Contenu Bannière */}
            <div className="relative z-10 space-y-3 max-w-2xl">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#7DD3FC] block">
                Bonjour {profile.name.split(' ')[0]} · votre espace d’apprentissage
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.12] max-w-xl">
                Faites progresser votre expertise financière
              </h1>
              <p className="text-slate-300 text-sm sm:text-base font-normal max-w-xl leading-relaxed">
                Des compétences concrètes, des mises en situation réelles et un parcours qui avance à votre rythme.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => activeEnrollment ? handleResume() : onNavigate('catalogue')}
                  className="px-5 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#EA580C] text-white font-bold text-sm shadow-lg shadow-orange-600/30 flex items-center gap-2 transition transform hover:scale-[1.02] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/40"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{activeEnrollment ? 'Reprendre ma formation' : 'Découvrir les parcours'}</span>
                </button>
              </div>
            </div>

            {/* Badge Contexte Côte d'Ivoire en bas à droite */}
            <div className="relative z-10 self-end mt-4 sm:mt-0 bg-slate-900/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/60 flex items-center gap-2.5">
              {/* Drapeau Côte d'Ivoire (Orange - Blanc - Vert) */}
              <div className="flex w-5 h-3.5 rounded-xs overflow-hidden shrink-0 shadow-xs border border-white/20">
                <div className="w-1/3 bg-[#FF6B00]" />
                <div className="w-1/3 bg-white" />
                <div className="w-1/3 bg-[#059669]" />
              </div>
              <div className="text-[11px] text-slate-200">
                <strong className="text-white font-semibold">Contexte Côte d'Ivoire & UEMOA</strong>{' '}
                <span className="text-slate-400 hidden sm:inline">• Référentiels SYSCOHADA & CIMA</span>
              </div>
            </div>
          </div>

          {/* 2. Section "Mon parcours actuel" */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Mon parcours actuel
              </h2>
              <button
                onClick={() => onNavigate('catalogue')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
              >
                <span>Voir tous mes parcours</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Carte Composite Découpée en 2 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden p-4 sm:p-5 flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center">
              {/* Côté Gauche : Photo + Module en cours */}
              <div className="flex items-start gap-3 sm:gap-4 flex-1">
                {/* Vignette Photo Ordinateur / Bourse */}
              <div className="w-20 h-20 sm:w-36 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-900 relative shadow-sm border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=300&q=80"
                    alt={currentPath.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-blue-600 text-white uppercase">
                    {currentPath.domainId}
                  </span>
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider inline-block ${activeEnrollment ? 'bg-[#0070F3]' : 'bg-slate-500'}`}>
                    {activeEnrollment ? 'En cours' : 'Recommandé'}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight truncate">
                    {currentPath.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {currentPath.tagline || currentPath.description}
                  </p>

                  {/* Barre de progression des activités pratiques */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#0070F3] h-full rounded-full transition-all duration-300" style={{ width: `${practicalPercent}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-700 font-mono">{practicalPercent}%</span>
                  </div>

                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={() => activeEnrollment ? handleResume() : onNavigate('catalogue')}
                      className="px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{activeEnrollment ? 'Reprendre' : 'Découvrir'}</span>
                    </button>
                    <span className="text-[11px] text-slate-400">
                      {currentPath.levels.length} niveaux • {currentPath.estimatedHours}h
                    </span>
                  </div>
                </div>
              </div>

              {/* Séparateur Vertical */}
              <div className="hidden md:block w-px h-28 bg-slate-200" />

              {/* Côté Droit : Prochain Objectif */}
              <div
                onClick={handleResume}
                className="w-full md:w-72 bg-[#F8FAFC] hover:bg-slate-100/80 p-4 rounded-2xl border border-slate-200/80 cursor-pointer transition flex items-center justify-between gap-3 group"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-blue-600">
                    <Trophy className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Prochain objectif
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs leading-snug group-hover:text-blue-600 transition truncate">
                    {currentModuleTitle}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {currentLessonTitle}
                  </p>

                  <div className="pt-1">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] inline-flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                      + 25 points d'expérience
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
              </div>
            </div>

            {/* 4 Compteurs Statistiques Non-Confondus (Directive Pédagogique 360°) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {/* Carte 1 : Taux de consultation théorique */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Théorie & Leçons</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-slate-900 font-mono">{consultationPercent}%</span>
                  <span className="text-[11px] text-slate-400">consultés</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${consultationPercent}%` }} />
                </div>
              </div>

              {/* Carte 2 : Activités pratiques & simulateurs */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Calculator className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Activités pratiques</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-slate-900 font-mono">{practicalPercent}%</span>
                  <span className="text-[11px] text-slate-400">réalisées</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full transition-all duration-300" style={{ width: `${practicalPercent}%` }} />
                </div>
              </div>

              {/* Carte 3 : Score aux évaluations */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Évaluations</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-slate-900 font-mono">{evaluationPercent}%</span>
                  <span className="text-[11px] text-slate-400">score moyen</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: `${evaluationPercent}%` }} />
                </div>
              </div>

              {/* Carte 4 : Maîtrise des compétences */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Compétences</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-slate-900 font-mono">{competenciesPercent}%</span>
                  <span className="text-[11px] text-slate-400">
                    {activeEnrollment?.validatedCompetencyCodes?.length ?? 0}/{currentPath.competenciesTargeted.length} validées
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-300" style={{ width: `${competenciesPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Section "Accès rapide" (5 Cartes Pastel) */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Accès rapide
              </h2>
              <button
                onClick={() => onNavigate('catalogue')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
              >
                <span>Voir tout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {/* Carte 1 : Catalogue des parcours */}
              <div
                onClick={() => onNavigate('catalogue')}
                className="bg-[#EBF5FF] hover:bg-[#DFEFFF] p-4 rounded-2xl border border-blue-200/60 transition cursor-pointer flex flex-col justify-between h-36 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-blue-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs leading-snug">
                    Catalogue des parcours
                  </h4>
                  <span className="text-[11px] text-blue-600 font-medium flex items-center gap-0.5 mt-1 group-hover:translate-x-0.5 transition">
                    Découvrez tous nos parcours →
                  </span>
                </div>
              </div>

              {/* Carte 2 : Simulateurs */}
              <div
                onClick={() => onNavigate('simulators')}
                className="bg-[#E6F8F0] hover:bg-[#D5F5E6] p-4 rounded-2xl border border-emerald-200/60 transition cursor-pointer flex flex-col justify-between h-36 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-emerald-600">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs leading-snug">
                    Simulateurs
                  </h4>
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-0.5 mt-1 group-hover:translate-x-0.5 transition">
                    Mettez-vous en situation réelle →
                  </span>
                </div>
              </div>

              {/* Carte 3 : Laboratoire Excel */}
              <div
                onClick={() => onNavigate('excel')}
                className="bg-[#E8F8F2] hover:bg-[#D6F5E8] p-4 rounded-2xl border border-teal-200/60 transition cursor-pointer flex flex-col justify-between h-36 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-teal-700">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs leading-snug">
                    Laboratoire Excel
                  </h4>
                  <span className="text-[11px] text-teal-700 font-medium flex items-center gap-0.5 mt-1 group-hover:translate-x-0.5 transition">
                    Pratiquez sur des cas concrets →
                  </span>
                </div>
              </div>

              {/* Carte 4 : Jeux & Missions */}
              <div
                onClick={() => onNavigate('missions')}
                className="bg-[#FFF1E8] hover:bg-[#FFE5D6] p-4 rounded-2xl border border-orange-200/60 transition cursor-pointer flex flex-col justify-between h-36 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-orange-600">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs leading-snug">
                    Jeux & Missions
                  </h4>
                  <span className="text-[11px] text-orange-700 font-medium flex items-center gap-0.5 mt-1 group-hover:translate-x-0.5 transition">
                    Apprenez en vous amusant →
                  </span>
                </div>
              </div>

              {/* Carte 5 : Assistant IA */}
              <div
                onClick={() => onNavigate('tutor')}
                className="bg-[#F3E8FF] hover:bg-[#E9D5FF] p-4 rounded-2xl border border-purple-200/60 transition cursor-pointer flex flex-col justify-between h-36 group col-span-2 sm:col-span-1"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-purple-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs leading-snug">
                    Assistant IA
                  </h4>
                  <span className="text-[11px] text-purple-700 font-medium flex items-center gap-0.5 mt-1 group-hover:translate-x-0.5 transition">
                    Votre tuteur personnalisé →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Spotlight Banner "NOUVEAU - Explorez nos missions immersives en 3D" */}
          <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-800 bg-[#0A1224] text-white p-4 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Arrière-plan Bureau Exécutif / Salle de Marché */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                alt="Salle des marchés"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1224] via-[#0A1224]/90 to-transparent" />
            </div>

            <div className="relative z-10 space-y-2 max-w-lg">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0070F3] text-white uppercase tracking-wider inline-block">
                Nouveau
              </span>
              <h3 className="text-lg font-extrabold text-white leading-tight">
                Explorez nos missions immersives en 3D
              </h3>
              <p className="text-xs text-slate-300">
                Plongez dans des scénarios réalistes et prenez des décisions qui ont un impact.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('missions')}
                  className="px-4 py-1.5 rounded-full bg-transparent hover:bg-white/10 text-white font-bold text-xs border border-white/40 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Découvrir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Flèches de Carrousel < > */}
            <div className="relative z-10 flex items-center gap-2 self-end sm:self-auto">
              <button
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition border border-slate-700"
                title="Précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition border border-slate-700"
                title="Suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLONNE DROITE (4 sur 12 cols en large) */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          {/* 1. Carte Profil Apprenant "Bonjour Max 👋" */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Header Profil */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-white font-bold flex items-center justify-center text-sm shadow-sm ring-4 ring-slate-100 shrink-0">
                <span aria-label={profile.name}>{profile.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                  Bonjour {profile.name.split(' ')[0]} 👋
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Continuons sur la bonne lancée !
                </p>
              </div>
            </div>

            {/* Niveau Actuel & Jauge */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Niveau actuel</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  {competenciesPercent}%
                </span>
              </div>
              <div className="text-base font-extrabold text-slate-900">
                {profile.experienceLevel === 'avance' ? 'Avancé' : profile.experienceLevel === 'intermediaire' ? 'Intermédiaire' : 'Débutant'}
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-[#10B981] h-full rounded-full" style={{ width: `${competenciesPercent}%` }} />
              </div>
            </div>

            {/* 3 Statistiques Colonnes */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100">
              <div className="p-2">
                <div className="text-xs font-bold text-slate-900 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-mono text-base font-extrabold">{profile.totalXp}</span>
                </div>
                <span className="text-[11px] text-slate-400">Points XP</span>
              </div>

              <div className="p-2 border-x border-slate-100">
                <div className="text-xs font-bold text-slate-900 flex items-center justify-center gap-1">
                  <Gamepad2 className="w-3.5 h-3.5 text-orange-500" />
                  <span className="font-mono text-base font-extrabold">{profile.completedMissions.length}</span>
                </div>
                <span className="text-[11px] text-slate-400">Missions réussies</span>
              </div>

              <div className="p-2">
                <div className="text-xs font-bold text-slate-900 flex items-center justify-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-mono text-base font-extrabold">{profile.completedLessons.length}</span>
                </div>
                <span className="text-[11px] text-slate-400">Leçons terminées</span>
              </div>
            </div>

            {/* Boîte Motivation Cible */}
            <div className="p-3.5 bg-[#F0F7FF] rounded-2xl border border-blue-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <p className="text-xs text-blue-900 leading-snug font-medium">
                Chaque compétence acquise aujourd'hui est une opportunité de plus demain.
              </p>
            </div>
          </div>

          {/* 2. Section "Mes dernières activités" */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
                Mes dernières activités
              </h3>
              <button
                onClick={() => onNavigate('progression')}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                Voir tout →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Activité 1 */}
              <div
                onClick={() => onNavigate('courses')}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">
                      Exercice : Analyse des ratios
                    </h5>
                    <span className="text-[11px] text-slate-400">
                      Analyse financière • Il y a 2 heures
                    </span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>

              {/* Activité 2 */}
              <div
                onClick={() => onLaunchMission('MISSION_07')}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">
                      Mission : Le comité d'investissement
                    </h5>
                    <span className="text-[11px] text-slate-400">
                      Jeu de gestion • Il y a 4 heures
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>

              {/* Activité 3 */}
              <div
                onClick={() => onNavigate('simulators')}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">
                      Simulateur : Trésorerie
                    </h5>
                    <span className="text-[11px] text-slate-400">
                      Finance d'entreprise • Il y a 5 heures
                    </span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>

              {/* Activité 4 */}
              <div
                onClick={() => onNavigate('courses')}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">
                      Cours : Le bilan comptable
                    </h5>
                    <span className="text-[11px] text-slate-400">
                      Comptabilité • Il y a 1 jour
                    </span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>

              {/* Activité 5 */}
              <div
                onClick={() => onNavigate('progression')}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">
                      Badge obtenu
                    </h5>
                    <span className="text-[11px] text-slate-400">
                      Excel – Niveau intermédiaire • Il y a 1 jour
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Carte "Focus : Découvrez le courtage en assurance" */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">Focus</span>
            <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-800 bg-[#0F172A] text-white p-5 relative">
              <div className="absolute right-0 bottom-0 w-32 h-36 opacity-75 pointer-events-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                  alt="Courtage Assurance"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="relative z-10 space-y-2 max-w-[200px]">
                <h4 className="font-extrabold text-sm leading-snug text-white">
                  Découvrez le courtage en assurance
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Une compétence clé pour votre avenir professionnel.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('simulators')}
                    className="px-3.5 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-[11px] border border-slate-700 flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>Explorer le parcours</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
