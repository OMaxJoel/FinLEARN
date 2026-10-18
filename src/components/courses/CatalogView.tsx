import React, { useState, useEffect, useMemo } from 'react';
import { ALL_LEARNING_PATHS_360, MASTER_COMPETENCIES_360 } from '../../data/curriculum360Data';
import { PathEnrollmentModal } from './PathEnrollmentModal';
import { PathEnrollment360, LearningPath360 } from '../../types/pedagogy360';
import { dbPersistence } from '../../core/persistence/dbClient';
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
  Scale,
  X,
  ArrowUpDown,
  BookMarked,
  Check,
  AlertCircle,
  HelpCircle,
  Building2,
  GraduationCap,
  Lock,
} from 'lucide-react';

interface CatalogViewProps {
  userId: string;
  completedLessonIds: string[];
  onSelectPath: (pathId: string, lessonId?: string) => void;
  onNavigate: (tab: NavigationTab) => void;
  onOpenDiagnostic?: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  userId,
  completedLessonIds,
  onSelectPath,
  onNavigate,
  onOpenDiagnostic,
}) => {
  // Navigation par statut
  const [activeStatusTab, setActiveStatusTab] = useState<'all' | 'in_progress' | 'completed' | 'recommended'>('all');

  // Filtres multidimensionnels
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedCompetency, setSelectedCompetency] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<'recommended' | 'duration_asc' | 'duration_desc' | 'modules_desc' | 'title_asc'>('recommended');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Comparaison côte à côte
  const [comparisonPathIds, setComparisonPathIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Modal d'inscription / reprise
  const [selectedPathForModal, setSelectedPathForModal] = useState<LearningPath360 | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  // Inscriptions chargées depuis la persistance (PostgreSQL / local cache)
  const [userEnrollments, setUserEnrollments] = useState<Record<string, PathEnrollment360>>({});

  useEffect(() => {
    async function loadUserEnrollments() {
      const enrollments = await dbPersistence.getAllUserEnrollments(userId);
      const map: Record<string, PathEnrollment360> = {};
      enrollments.forEach((e) => {
        map[e.pathId] = e;
      });
      setUserEnrollments(map);
    }
    loadUserEnrollments();
  }, [userId]);

  const domainTabs = [
    { id: 'all', label: 'Tous les domaines' },
    { id: 'finance', label: 'Finance d\'Entreprise' },
    { id: 'comptabilite', label: 'Comptabilité SYSCOHADA' },
    { id: 'controle', label: 'Contrôle de Gestion' },
    { id: 'tresorerie', label: 'Trésorerie Opérationnelle' },
    { id: 'excel', label: 'Modélisation Excel' },
    { id: 'assurance', label: 'Courtage & Code CIMA' },
    { id: 'consolidation', label: 'Consolidation Groupe' },
  ];

  // Gestion de la comparaison
  const toggleComparison = (pathId: string) => {
    if (comparisonPathIds.includes(pathId)) {
      setComparisonPathIds((prev) => prev.filter((id) => id !== pathId));
    } else {
      if (comparisonPathIds.length >= 3) {
        alert('Vous pouvez comparer jusqu\'à 3 parcours simultanément.');
        return;
      }
      setComparisonPathIds((prev) => [...prev, pathId]);
    }
  };

  // Filtrage et Tri des parcours
  const filteredAndSortedPaths = useMemo(() => {
    let result = ALL_LEARNING_PATHS_360.filter((path) => {
      const enrollment = userEnrollments[path.id];

      // Filtre statut
      if (activeStatusTab === 'in_progress') {
        if (!enrollment || enrollment.status !== 'en_cours') {
          return false;
        }
      }
      if (activeStatusTab === 'completed') {
        if (!enrollment || enrollment.status !== 'termine') return false;
      }
      if (activeStatusTab === 'recommended') {
        // Recommandation intelligente : prioriser finance et trésorerie ou parcours non encore terminés
        if (enrollment && enrollment.status === 'termine') return false;
      }

      // Filtre Domaine
      if (selectedDomain !== 'all' && path.domainId !== selectedDomain) {
        return false;
      }

      // Filtre Compétence
      if (selectedCompetency !== 'all' && !path.competenciesTargeted.includes(selectedCompetency)) {
        return false;
      }

      // Filtre Difficulté / Niveau
      if (selectedDifficulty !== 'all') {
        if (!path.levelBadge.toLowerCase().includes(selectedDifficulty.toLowerCase())) {
          return false;
        }
      }

      // Filtre Durée
      if (selectedDuration === 'short' && path.estimatedHours > 50) return false;
      if (selectedDuration === 'medium' && (path.estimatedHours <= 50 || path.estimatedHours > 60)) return false;
      if (selectedDuration === 'long' && path.estimatedHours <= 60) return false;

      // Recherche textuelle
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = path.title.toLowerCase().includes(q);
        const matchesTagline = path.tagline.toLowerCase().includes(q);
        const matchesDesc = path.description.toLowerCase().includes(q);
        const matchesRole = path.targetRole.toLowerCase().includes(q);
        const matchesCompetencies = path.competenciesTargeted.some((c) => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesTagline && !matchesDesc && !matchesRole && !matchesCompetencies) {
          return false;
        }
      }

      return true;
    });

    // Tri
    result = [...result].sort((a, b) => {
      if (selectedSort === 'duration_asc') return a.estimatedHours - b.estimatedHours;
      if (selectedSort === 'duration_desc') return b.estimatedHours - a.estimatedHours;
      if (selectedSort === 'modules_desc') {
        const modA = a.levels.reduce((acc, l) => acc + l.modules.length, 0);
        const modB = b.levels.reduce((acc, l) => acc + l.modules.length, 0);
        return modB - modA;
      }
      if (selectedSort === 'title_asc') return a.title.localeCompare(b.title);
      // 'recommended'
      return (b.completenessScore ?? 100) - (a.completenessScore ?? 100);
    });

    return result;
  }, [
    activeStatusTab,
    selectedDomain,
    selectedCompetency,
    selectedDifficulty,
    selectedDuration,
    selectedSort,
    searchQuery,
    userEnrollments,
  ]);

  const handleOpenPathModal = (path: LearningPath360) => {
    setSelectedPathForModal(path);
    setIsEnrollModalOpen(true);
  };

  const handleEnrollmentConfirmed = (enrollment: PathEnrollment360, targetLessonId?: string) => {
    setUserEnrollments((prev) => ({
      ...prev,
      [enrollment.pathId]: enrollment,
    }));
    onSelectPath(enrollment.pathId, targetLessonId || enrollment.currentLocation?.lessonId || enrollment.currentActivityId);
    onNavigate('courses');
  };

  return (
    <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Header Bannière Héroïque du Catalogue */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-gradient-to-r from-[#0E1A38] via-[#122853] to-[#0B152E] text-white p-6 sm:p-10">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue 360° • Formations Professionnelles d'Excellence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Système Intégral de Formation Professionnelle Continue 360°
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Le parcours publié est audité sur sa structure et ses évaluations. Les cas sont fictifs, présentés en FCFA, et les parcours incomplets restent en préparation. La synchronisation distante dépend d’une base configurée.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="font-semibold text-white">{ALL_LEARNING_PATHS_360.filter((path) => path.status === 'published').length} cursus publiés et audités</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <span>10 Simulateurs Métier Connectés</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>Normes SYSCOHADA Révisé / CIMA / UEMOA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
              <span>4 Indicateurs Distincts Non-Confondus</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Onglets d'État d'Apprentissage (En cours, Terminés, Recommandés) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveStatusTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeStatusTab === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tous les parcours</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700">
              {ALL_LEARNING_PATHS_360.length}
            </span>
          </button>

          <button
            onClick={() => setActiveStatusTab('in_progress')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeStatusTab === 'in_progress'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-500" />
            <span>Parcours en cours</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-orange-100 text-orange-800 font-bold">
              {Object.values(userEnrollments).filter((e) => e.status === 'en_cours' && e.practicalActivitiesProgressPercent > 0).length}
            </span>
          </button>

          <button
            onClick={() => setActiveStatusTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeStatusTab === 'completed'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Parcours terminés</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
              {Object.values(userEnrollments).filter((e) => e.status === 'termine').length}
            </span>
          </button>

          <button
            onClick={() => setActiveStatusTab('recommended')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeStatusTab === 'recommended'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommandés pour combler les lacunes</span>
          </button>
        </div>

        {/* Barre de Comparaison Flottante ou Bouton */}
        {comparisonPathIds.length > 0 && (
          <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-indigo-900">
              {comparisonPathIds.length} parcours sélectionné(s)
            </span>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-2xs"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Comparer côte à côte</span>
            </button>
            <button
              onClick={() => setComparisonPathIds([])}
              className="text-slate-400 hover:text-slate-600 text-xs"
              title="Effacer la sélection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 3. Barre d'Outils Multi-Filtres & Recherche */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
        {/* Ligne 1 : Filtre par Domaines */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {domainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDomain(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedDomain === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Ligne 2 : Filtres Détaillés (Compétence, Niveau, Durée, Tri, Recherche) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Recherche textuelle */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher intitulé, ratio, cas..."
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition"
            />
          </div>

          {/* Filtre Compétence Métier */}
          <div>
            <select
              value={selectedCompetency}
              onChange={(e) => setSelectedCompetency(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Toutes les compétences</option>
              {MASTER_COMPETENCIES_360.map((comp) => (
                <option key={comp.code} value={comp.code}>
                  {comp.code} - {comp.title}
                </option>
              ))}
            </select>
          </div>

          {/* Filtre Niveau / Difficulté */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Débutant">Débutant / Fondamentaux</option>
              <option value="Intermédiaire">Intermédiaire / Opérationnel</option>
              <option value="Avancé">Avancé / Praticien</option>
              <option value="Expert">Expert / Direction</option>
            </select>
          </div>

          {/* Filtre Durée */}
          <div>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Toutes les durées</option>
              <option value="short">Moins de 50 heures</option>
              <option value="medium">50 à 60 heures</option>
              <option value="long">Plus de 60 heures</option>
            </select>
          </div>

          {/* Tri */}
          <div>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="recommended">Tri : Recommandés d'abord</option>
              <option value="duration_asc">Tri : Durée croissante</option>
              <option value="duration_desc">Tri : Durée décroissante</option>
              <option value="modules_desc">Tri : Nombre de modules</option>
              <option value="title_asc">Tri : Titre alphabétique</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Grille des Parcours Professionnels 360° */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span>Formations Professionnelles Complètes 360°</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-mono">
              {filteredAndSortedPaths.length} disponible(s)
            </span>
          </h2>

          <span className="text-xs text-slate-500 hidden sm:inline">
            Inscrivez-vous aux parcours publiés ou ouvrez un aperçu des parcours en préparation.
          </span>
        </div>

        {filteredAndSortedPaths.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Aucun parcours ne correspond à vos filtres</h3>
            <p className="text-xs text-slate-500">Essayez d'élargir votre recherche ou de réinitialiser les filtres.</p>
            <button
              onClick={() => {
                setSelectedDomain('all');
                setSelectedCompetency('all');
                setSelectedDifficulty('all');
                setSelectedDuration('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedPaths.map((path) => {
              const totalModules = path.levels.reduce((acc, l) => acc + l.modules.length, 0);
              const totalLessons = path.levels.reduce(
                (acc, l) => acc + l.modules.reduce((mAcc, m) => mAcc + m.chapters.reduce((cAcc, c) => cAcc + c.lessons.length, 0), 0),
                0
              );
              const enrollment = userEnrollments[path.id];
              const isEnrolled = Boolean(enrollment);
              const isDraft = path.status !== 'published';
              const isComparing = comparisonPathIds.includes(path.id);

              return (
                <div
                  key={path.id}
                  className={`bg-white rounded-3xl border transition flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-md ${
                    isEnrolled
                      ? 'border-blue-300 ring-1 ring-blue-100'
                      : 'border-slate-200/90'
                  }`}
                >
                  <div className="p-6 space-y-4">
                    {/* Badge Domaine & En-tête */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {isDraft ? 'Parcours en préparation' : path.levelBadge}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {path.domainId.toUpperCase()}
                        </span>
                        {isDraft && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            En préparation
                          </span>
                        )}
                      </div>

                      {/* Case à cocher pour comparaison */}
                      <button
                        onClick={() => toggleComparison(path.id)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border flex items-center gap-1 transition ${
                          isComparing
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                        title="Ajouter au comparateur"
                      >
                        <Scale className="w-3 h-3" />
                        <span>{isComparing ? 'Sélectionné' : 'Comparer'}</span>
                      </button>
                    </div>

                    {/* Titre & Rôle */}
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                        {path.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{path.targetRole}</span>
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {path.description}
                    </p>

                    {/* Compétences ciblées (Badges) */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Compétences visées
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {path.competenciesTargeted.slice(0, 3).map((code) => (
                          <span
                            key={code}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200/60"
                          >
                            {code}
                          </span>
                        ))}
                        {path.competenciesTargeted.length > 3 && (
                          <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                            +{path.competenciesTargeted.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 3 Métriques Structurelles */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                      <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Niveaux / Mod.</span>
                        <span className="text-xs font-bold text-slate-800">
                          {path.levels.length} N / {totalModules} M
                        </span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Leçons 360°</span>
                        <span className="text-xs font-bold text-slate-800">{totalLessons}</span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Volume</span>
                        <span className="text-xs font-bold text-slate-800">{path.estimatedHours}h</span>
                      </div>
                    </div>

                    {/* État de progression si inscrit */}
                    {enrollment && (
                      <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-200/80 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                          <span>Progression pratique :</span>
                          <span className="font-mono">{enrollment.practicalActivitiesProgressPercent}%</span>
                        </div>
                        <div className="w-full bg-blue-200/60 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all"
                            style={{ width: `${enrollment.practicalActivitiesProgressPercent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-blue-700">
                          <span>Évaluations : {enrollment.evaluationScorePercent}%</span>
                          <span>Maîtrise : {enrollment.competenciesMasteryPercent}%</span>
                        </div>
                      </div>
                    )}
                    {isDraft && !enrollment && (
                      <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-900">
                        Parcours visible en aperçu. L’inscription sera ouverte après validation de son contenu pédagogique.
                      </p>
                    )}
                  </div>

                  {/* Boutons d'Action (Démarrer / Reprendre / Explorer) */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenPathModal(path)}
                      disabled={isDraft && !enrollment}
                      title={isDraft && !enrollment ? 'Inscription disponible après validation du parcours' : undefined}
                      className={`flex-1 flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-xs cursor-pointer ${
                        isDraft && !enrollment
                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                          : enrollment
                          ? 'bg-[#FF6B00] hover:bg-[#EA580C] text-white shadow-orange-600/20'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isDraft && !enrollment ? (
                        <><Lock className="w-3.5 h-3.5" /><span>En préparation</span></>
                      ) : enrollment ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reprendre le parcours</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Démarrer le parcours</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onSelectPath(path.id);
                        onNavigate('courses');
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition"
                      title={isDraft ? 'Prévisualiser le contenu disponible' : 'Consulter le sommaire du cursus'}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. TIROIR / MODAL DE COMPARAISON CÔTE À CÔTE */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0E1A38] to-[#122853] text-white p-6 sticky top-0 z-10 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Scale className="w-5 h-5 text-sky-400" />
                  <span>Comparateur de Parcours Professionnels 360°</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Comparez les compétences, les volumes horaires, les prérequis et les livrables certifiants.
                </p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {comparisonPathIds.map((pathId) => {
                  const path = ALL_LEARNING_PATHS_360.find((p) => p.id === pathId);
                  if (!path) return null;
                  const enrollment = userEnrollments[path.id];

                  return (
                    <div key={path.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                      <div className="border-b border-slate-200 pb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                          {path.domainId}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{path.title}</h4>
                        <span className="text-xs text-slate-500">{path.targetRole}</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <strong className="text-slate-800 block text-[11px]">Durée & Structure :</strong>
                          <span className="text-slate-600">
                            {path.estimatedHours}h • {path.levels.length} Niveaux •{' '}
                            {path.levels.reduce((acc, l) => acc + l.modules.length, 0)} Modules
                          </span>
                        </div>

                        <div>
                          <strong className="text-slate-800 block text-[11px]">Compétences ciblées :</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {path.competenciesTargeted.map((c) => (
                              <span key={c} className="px-1.5 py-0.5 rounded-md bg-white border text-[10px] font-mono">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <strong className="text-slate-800 block text-[11px]">Prérequis :</strong>
                          <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                            {path.prerequisites.slice(0, 2).map((pr, idx) => (
                              <li key={idx}>{pr}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <strong className="text-slate-800 block text-[11px]">Projet de synthèse :</strong>
                          <p className="text-slate-600 line-clamp-2">{path.finalProject?.title || 'Audit & Soutenance'}</p>
                        </div>

                        <div>
                          <strong className="text-slate-800 block text-[11px]">Progression actuelle :</strong>
                          <span className="font-bold text-blue-700">
                            {enrollment ? `${enrollment.practicalActivitiesProgressPercent}% d'activités validées` : 'Non commencé'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsCompareModalOpen(false);
                          handleOpenPathModal(path);
                        }}
                        disabled={path.status !== 'published' && !enrollment}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs transition"
                      >
                        {path.status !== 'published' && !enrollment ? 'En préparation' : enrollment ? 'Reprendre ce parcours' : 'Démarrer ce parcours'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'Inscription & Diagnostic Spécifique au Parcours */}
      {selectedPathForModal && (
        <PathEnrollmentModal
          isOpen={isEnrollModalOpen}
          userId={userId}
          onClose={() => {
            setIsEnrollModalOpen(false);
            setSelectedPathForModal(null);
          }}
          path={selectedPathForModal}
          existingEnrollment={userEnrollments[selectedPathForModal.id] || null}
          onEnrollmentConfirmed={handleEnrollmentConfirmed}
          onOpenDiagnostic={onOpenDiagnostic}
        />
      )}
    </div>
  );
};
