import React, { useState, useEffect } from 'react';
import { UserProfile } from './types/pedagogy';
import { DEMO_PROFILES } from './data/mockDatasets';
import { GAME_MISSIONS } from './data/gameMissionsData';
import { Sidebar, NavigationTab } from './components/common/Sidebar';
import { TopHeader } from './components/common/TopHeader';
import { FinExpertDashboard } from './components/dashboard/FinExpertDashboard';
import { CourseReader } from './components/courses/CourseReader';
import { CatalogView } from './components/courses/CatalogView';
import { ExcelLab } from './components/simulators/ExcelLab';
import { SimulatorsHub } from './components/simulators/SimulatorsHub';
import { MissionsHub } from './components/game/MissionsHub';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { ProgressionView } from './components/dashboard/ProgressionView';
import { SearchModal } from './components/common/SearchModal';
import { DiagnosticModal } from './components/diagnostic/DiagnosticModal';
import { GameMissionModal } from './components/game/GameMissionModal';
import { PedagogicalTutorModal } from './components/common/PedagogicalTutorModal';
import {
  Home,
  GraduationCap,
  Calculator,
  Gamepad2,
  FileSpreadsheet,
  Menu,
} from 'lucide-react';

export const App: React.FC = () => {
  // Profil de l'utilisateur actif (initialisé par défaut sur Max Oura pour correspondre à la maquette de référence)
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('finlearn_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback en cas d'erreur de parsing
      }
    }
    return DEMO_PROFILES.max || DEMO_PROFILES.koffi;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [headerSearchTerm, setHeaderSearchTerm] = useState('');
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sauvegarde automatique du profil lors des changements
  useEffect(() => {
    localStorage.setItem('finlearn_profile', JSON.stringify(profile));
  }, [profile]);

  // Raccourci global ⌘ K / Ctrl + K pour ouvrir la recherche rapide
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleSelectProfileKey = (key: string) => {
    if (DEMO_PROFILES[key]) {
      setProfile(DEMO_PROFILES[key]);
    }
  };

  const handleLessonCompleted = (lessonId: string, xpEarned: number) => {
    setProfile((prev) => {
      const alreadyDone = prev.completedLessons.includes(lessonId);
      return {
        ...prev,
        totalXp: alreadyDone ? prev.totalXp : prev.totalXp + xpEarned,
        completedLessons: alreadyDone ? prev.completedLessons : [...prev.completedLessons, lessonId],
      };
    });
  };

  const handleMissionCompleted = (missionId: string, scorePercent: number) => {
    setProfile((prev) => {
      const alreadyDone = prev.completedMissions.includes(missionId);
      return {
        ...prev,
        totalXp: alreadyDone ? prev.totalXp : prev.totalXp + scorePercent * 5,
        completedMissions: alreadyDone ? prev.completedMissions : [...prev.completedMissions, missionId],
      };
    });
  };

  const handleDiagnosticComplete = (globalScore: number) => {
    setProfile((prev) => ({
      ...prev,
      totalXp: prev.totalXp + 150,
      experienceLevel: globalScore >= 70 ? 'avance' : globalScore >= 45 ? 'intermediaire' : 'debutant',
    }));
  };

  const activeMission = activeMissionId ? GAME_MISSIONS.find((m) => m.id === activeMissionId) || null : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-800 selection:bg-blue-500 selection:text-white">
      {/* 1. Barre Latérale Gauche Sombre Style FinExpert (Fidélité 100% à la capture de référence) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        globalScorePercent={68}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Contenu Principal de l'Application avec En-tête Supérieur */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* En-tête Supérieur Moderne FinExpert */}
        <TopHeader
          currentProfile={profile}
          onSelectProfile={handleSelectProfileKey}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
          searchTerm={headerSearchTerm}
          onSearchChange={(val) => {
            setHeaderSearchTerm(val);
            if (val.trim() && !isSearchOpen) {
              setIsSearchOpen(true);
            }
          }}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          onNavigateHome={() => setActiveTab('dashboard')}
        />

        {/* Zone de Visualisation avec Défilement Fluide */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {activeTab === 'dashboard' && (
            <FinExpertDashboard
              profile={profile}
              onNavigate={setActiveTab}
              onLaunchMission={(mId) => setActiveMissionId(mId)}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            />
          )}

          {activeTab === 'courses' && (
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <CourseReader
                completedLessonIds={profile.completedLessons}
                onLessonCompleted={handleLessonCompleted}
              />
            </div>
          )}

          {activeTab === 'catalogue' && (
            <CatalogView
              completedLessonIds={profile.completedLessons}
              onSelectPath={() => setActiveTab('courses')}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'simulators' && (
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <SimulatorsHub />
            </div>
          )}

          {activeTab === 'excel' && (
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <ExcelLab />
            </div>
          )}

          {activeTab === 'missions' && (
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <MissionsHub
                onLaunchMission={(mId) => setActiveMissionId(mId)}
                completedMissionIds={profile.completedMissions}
              />
            </div>
          )}

          {activeTab === 'evaluations' && (
            <ProgressionView
              profile={profile}
              onNavigate={setActiveTab}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            />
          )}

          {activeTab === 'progression' && (
            <ProgressionView
              profile={profile}
              onNavigate={setActiveTab}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            />
          )}

          {activeTab === 'portfolio' && (
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <PortfolioView profile={profile} />
            </div>
          )}

          {activeTab === 'tutor' && (
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm text-center space-y-4 max-w-xl mx-auto mt-8 sm:mt-12">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-500 shadow-sm">
                  <span className="text-3xl">✨</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">Assistant IA & Tuteur Pédagogique</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  L'assistant pédagogique est prêt à vous guider sur vos calculs comptables, vos formules Excel ou vos ratios financiers sous les normes OHADA et CIMA.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const tutorBtn = document.querySelector('button[title*="Tuteur"]') as HTMLElement;
                      if (tutorBtn) tutorBtn.click();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    Ouvrir la session avec l'Assistant IA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <CatalogView
              completedLessonIds={profile.completedLessons}
              onSelectPath={() => setActiveTab('courses')}
              onNavigate={setActiveTab}
            />
          )}

          {/* Pied de Page Subtil */}
          <footer className="border-t border-slate-200/80 bg-white/50 py-6 text-xs text-slate-500 mt-12 px-4 sm:px-6">
            <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-bold text-slate-700">FinExpert Immersion</span>
                <span className="hidden sm:inline">•</span>
                <span>Plateforme de Formation Financière Professionnelle (Espace OHADA / UEMOA / CIMA)</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Moteurs arithmétiques certifiés déterministes • Données 100% sécurisées
              </div>
            </div>
          </footer>
        </main>

        {/* 3. Barre de Navigation Inférieure Mobile (Ergonomie Smartphone au Pouce) */}
        <nav
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1 flex items-center justify-around shadow-lg"
          aria-label="Navigation principale mobile"
        >
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
              activeTab === 'dashboard' ? 'text-[#0070F3] font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Accueil</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
              activeTab === 'courses' ? 'text-[#0070F3] font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Parcours</span>
          </button>

          <button
            onClick={() => setActiveTab('simulators')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
              activeTab === 'simulators' ? 'text-[#0070F3] font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Simulateurs</span>
          </button>

          <button
            onClick={() => setActiveTab('missions')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
              activeTab === 'missions' ? 'text-[#0070F3] font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Jeux</span>
          </button>

          <button
            onClick={() => setActiveTab('excel')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
              activeTab === 'excel' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] mt-0.5">Excel</span>
          </button>

          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-500 hover:text-slate-900 transition"
            aria-label="Ouvrir le menu complet"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Menu</span>
          </button>
        </nav>
      </div>

      {/* Modale de Recherche Rapide ⌘ K */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => {
          setIsSearchOpen(false);
          setHeaderSearchTerm('');
        }}
        onNavigate={setActiveTab}
        onLaunchMission={(mId) => setActiveMissionId(mId)}
        initialQuery={headerSearchTerm}
      />

      {/* Modale de Diagnostic Adaptatif */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        onComplete={handleDiagnosticComplete}
      />

      {/* Modale de Mission de Jeu Vidéo Sérieux */}
      <GameMissionModal
        isOpen={Boolean(activeMissionId)}
        mission={activeMission}
        onClose={() => setActiveMissionId(null)}
        onMissionCompleted={handleMissionCompleted}
      />

      {/* Tuteur Pédagogique Intelligent Flottant (US-701) */}
      <PedagogicalTutorModal />
    </div>
  );
};

export default App;
