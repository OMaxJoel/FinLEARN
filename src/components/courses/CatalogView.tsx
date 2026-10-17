import React, { useState } from 'react';
import { LEARNING_PATHS } from '../../data/coursesData';
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
} from 'lucide-react';

interface CatalogViewProps {
  completedLessonIds: string[];
  onSelectPath: (pathId: string) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  completedLessonIds,
  onSelectPath,
  onNavigate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'Tous les 8 métiers' },
    { id: 'comptabilite', label: 'Comptabilité & OHADA' },
    { id: 'analyse', label: 'Analyse Financière' },
    { id: 'controle', label: 'Contrôle de Gestion' },
    { id: 'tresorerie', label: 'Trésorerie Opérationnelle' },
    { id: 'excel', label: 'Modélisation Excel' },
    { id: 'finance', label: 'Finance d\'Entreprise & DAF' },
    { id: 'assurance', label: 'Courtage & CIMA' },
    { id: 'consolidation', label: 'Consolidation Groupe' },
  ];

  const getPathLevelStyle = (pathId: string): { level: string; color: string } => {
    switch (pathId) {
      case 'PATH_COMPT':
        return { level: 'Fondations à Opérationnel', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'PATH_EXCEL':
        return { level: 'Débutant à Expert', color: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 'PATH_ANALYSIS':
        return { level: 'Intermédiaire à Avancé', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'PATH_CONTROLLING':
        return { level: 'Opérationnel Avancé', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'PATH_TREASURY':
        return { level: 'Opérationnel à Expert', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'PATH_FINANCE':
        return { level: 'Avancé / Décisionnel', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'PATH_INSURANCE':
        return { level: 'Expert Réglementaire CIMA', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'PATH_CONSOLIDATION':
        return { level: 'Expertise Groupe & Devises', color: 'bg-teal-50 text-teal-700 border-teal-200' };
      default:
        return { level: 'Tous niveaux', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const filteredPaths = LEARNING_PATHS.filter((path) => {
    const matchesFilter = selectedFilter === 'all' || path.metierCategory === selectedFilter;
    const matchesSearch =
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.targetRole.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
      {/* 1. Header Bannière du Catalogue */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-gradient-to-r from-[#0E1A38] via-[#122853] to-[#0B152E] text-white p-4 sm:p-8">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue Officiel de Formations Certifiantes par Métier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Couverture 360° des Métiers de la Finance d'Entreprise
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Des parcours professionnels structurés par métier, appuyés sur des moteurs déterministes et des cas pratiques réels d'entreprises de l'espace OHADA, UEMOA et CIMA.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>8 Parcours Métiers Complets</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span>18 Modules Pédagogiques Opérationnels</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>100% Déterministe & Conforme Réglementations</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Barre d'outils : Filtres par Métier et Recherche */}
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
            placeholder="Rechercher un parcours ou un métier..."
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition"
          />
        </div>
      </div>

      {/* 3. Grille des 8 Parcours Métiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => {
          const { level, color } = getPathLevelStyle(path.id);
          const totalLessons = path.modules.reduce((acc, m) => acc + m.lessonsCount, 0);
          const totalHours = path.modules.reduce((acc, m) => acc + m.durationHours, 0);

          return (
            <div
              key={path.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                {/* En-tête de Carte */}
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${color}`}
                  >
                    {level}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md truncate max-w-[180px]">
                    {path.targetRole}
                  </span>
                </div>

                {/* Titre & Tagline */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {path.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {path.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {path.description}
                </p>

                {/* Métriques Clés */}
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

                {/* Liste des Modules Clés */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Programme d'apprentissage :
                  </span>
                  {path.modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="flex items-center gap-2 text-[11px] text-slate-600 truncate"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                      <span className="truncate">{mod.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton d'Action en Pied de Carte */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    onSelectPath(path.id);
                    onNavigate('courses');
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#0070F3] hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-xs group-hover:shadow-md"
                >
                  <span>Démarrer ce parcours métier</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
