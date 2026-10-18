import React, { useState } from 'react';
import { LEARNING_PATHS } from '../../data/coursesData';
import { PILOT_FINANCIAL_ANALYST_PATH } from '../../data/curriculum360Data';
import { PathEnrollmentModal } from './PathEnrollmentModal';
import { PathEnrollment360 } from '../../types/pedagogy360';
import { NavigationTab } from '../common/Sidebar';
import {
  BookOpen,
  Clock,
  Award,
  Layers,
  ChevronRight,
  Search,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  Shield,
  Sliders,
  Sparkles,
  CreditCard,
  Filter,
  Play,
  RotateCcw,
} from 'lucide-react';

interface CatalogViewProps {
  completedLessonIds: string[];
  onSelectPath: (pathId: string) => void;
  onNavigate: (tab: NavigationTab) => void;
  onOpenDiagnostic?: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  completedLessonIds,
  onSelectPath,
  onNavigate,
  onOpenDiagnostic,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal de démarrage / reprise de parcours
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [activeEnrollment, setActiveEnrollment] = useState<PathEnrollment360 | null>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('finlearn_360_enrollment_max_oura_PATH_FIN_ANALYST_360');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return null;
  });

  const filterTabs = [
    { id: 'all', label: 'Toutes les Formations' },
    { id: 'finance', label: 'Finance & Analyste 360°' },
    { id: 'comptabilite', label: 'Comptabilité & OHADA' },
    { id: 'analyse', label: 'Analyse Financière' },
    { id: 'controle', label: 'Contrôle de Gestion' },
    { id: 'tresorerie', label: 'Trésorerie Opérationnelle' },
    { id: 'excel', label: 'Modélisation Excel' },
    { id: 'assurance', label: 'Courtage & CIMA' },
    { id: 'consolidation', label: 'Consolidation Groupe' },
  ];

  const handleOpenEnrollmentModal = () => {
    setEnrollModalOpen(true);
  };

  const handleEnrollmentConfirmed = (enrollment: PathEnrollment360, targetLessonId?: string) => {
    setActiveEnrollment(enrollment);
    onSelectPath(PILOT_FINANCIAL_ANALYST_PATH.id);
    onNavigate('courses');
  };

  return (
    <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Header Bannière Héroïque du Catalogue */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-gradient-to-r from-[#0E1A38] via-[#122853] to-[#0B152E] text-white p-6 sm:p-10">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue 360° • Formations Professionnelles Certifiantes</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Parcours Complets par Métier & Laboratoires Déterministes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Chaque compétence est structurée selon la hiérarchie officielle : <strong>Domaine → Parcours → Niveau → Module → Chapitre → Leçon → Pratique → Simulateur → Évaluation</strong>.
            Reprise exacte au point d'arrêt et persistance multi-appareils.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="font-semibold text-white">Parcours Pilote 10 Niveaux 360° Prêt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <span>10 Simulateurs & Moteurs Déterministes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>Normes SYSCOHADA Révisé / UEMOA / CIMA</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MISE EN AVANT DU PARCOURS PILOTE 360° (Directement Démarrable) */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-blue-500/80 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold shadow-xs">
                PROGRAMME PILOTE D'EXCELLENCE 360°
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                100% Conforme aux 26 Critères Pédagogiques
              </span>
              <span className="text-xs text-slate-500">v{PILOT_FINANCIAL_ANALYST_PATH.version}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {PILOT_FINANCIAL_ANALYST_PATH.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {PILOT_FINANCIAL_ANALYST_PATH.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
              <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Niveaux Hiérarchiques</span>
                <span className="text-base font-extrabold text-blue-700">10 Niveaux</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Modules Progressifs</span>
                <span className="text-base font-extrabold text-slate-900">10 Modules</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Durée Totale</span>
                <span className="text-base font-extrabold text-emerald-700">65 Heures</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Projet Certifiant</span>
                <span className="text-base font-extrabold text-amber-700">Audit & Soutenance</span>
              </div>
            </div>
          </div>

          {/* Bouton Majeur "Démarrer" ou "Reprendre le parcours" */}
          <div className="flex flex-col gap-3 shrink-0 lg:min-w-[280px]">
            <button
              onClick={handleOpenEnrollmentModal}
              className="py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white font-extrabold text-sm shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2.5 transition transform hover:scale-[1.02] cursor-pointer"
            >
              {activeEnrollment ? (
                <>
                  <RotateCcw className="w-5 h-5" />
                  <span>Reprendre le parcours</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Démarrer le parcours 360°</span>
                </>
              )}
            </button>

            {activeEnrollment && (
              <div className="text-center text-[11px] text-slate-500">
                Progression actuelle : <strong>{activeEnrollment.practicalActivitiesProgressPercent}% d'activités</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Barre d'outils : Filtres Métiers et Recherche Avancée */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filtres par Onglet */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Champ de Recherche Local */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher compétence, module, ratio..."
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition"
          />
        </div>
      </div>

      {/* 4. Catalogue des 8 autres Parcours Métiers de la Plateforme */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Autres Spécialisations Métier Disponibles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_PATHS.map((path) => {
            const totalLessons = path.modules.reduce((acc, m) => acc + m.lessonsCount, 0);
            const totalHours = path.modules.reduce((acc, m) => acc + m.durationHours, 0);

            return (
              <div
                key={path.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border bg-blue-50 text-blue-700 border-blue-200">
                      {path.levelBadge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md truncate max-w-[180px]">
                      {path.targetRole}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {path.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {path.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {path.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                    <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Modules</span>
                      <span className="text-xs font-bold text-slate-800">{path.modules.length}</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Leçons</span>
                      <span className="text-xs font-bold text-slate-800">{totalLessons}</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Volume</span>
                      <span className="text-xs font-bold text-slate-800">{totalHours}h</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onSelectPath(path.id);
                      onNavigate('courses');
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#0070F3] hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-xs"
                  >
                    <span>Explorer le programme</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal d'Inscription & Diagnostic */}
      <PathEnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        path={PILOT_FINANCIAL_ANALYST_PATH}
        existingEnrollment={activeEnrollment}
        onEnrollmentConfirmed={handleEnrollmentConfirmed}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </div>
  );
};
