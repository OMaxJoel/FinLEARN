import React, { lazy, Suspense, useState, useEffect } from 'react';
import { UserProfile } from './types/pedagogy';
import { DEMO_PROFILES } from './data/mockDatasets';
import { GAME_MISSIONS } from './data/gameMissionsData';
import { Sidebar, NavigationTab } from './components/common/Sidebar';
import { TopHeader } from './components/common/TopHeader';
import { FinExpertDashboard } from './components/dashboard/FinExpertDashboard';
import { SearchModal } from './components/common/SearchModal';
import { DiagnosticModal } from './components/diagnostic/DiagnosticModal';
import { GameMissionModal } from './components/game/GameMissionModal';
import { PedagogicalTutorModal } from './components/common/PedagogicalTutorModal';
import { AccessGate } from './components/common/AccessGate';
import {
  Home,
  GraduationCap,
  Calculator,
  Gamepad2,
  FileSpreadsheet,
  Menu,
} from 'lucide-react';

const CourseReader = lazy(() => import('./components/courses/CourseReader').then((module) => ({ default: module.CourseReader })));
const CatalogView = lazy(() => import('./components/courses/CatalogView').then((module) => ({ default: module.CatalogView })));
const ExcelLab = lazy(() => import('./components/simulators/ExcelLab').then((module) => ({ default: module.ExcelLab })));
const SimulatorsHub = lazy(() => import('./components/simulators/SimulatorsHub').then((module) => ({ default: module.SimulatorsHub })));
const MissionsHub = lazy(() => import('./components/game/MissionsHub').then((module) => ({ default: module.MissionsHub })));
const PortfolioView = lazy(() => import('./components/portfolio/PortfolioView').then((module) => ({ default: module.PortfolioView })));
const ProgressionView = lazy(() => import('./components/dashboard/ProgressionView').then((module) => ({ default: module.ProgressionView })));
const AuthorStudio = lazy(() => import('./components/author/AuthorStudio').then((module) => ({ default: module.AuthorStudio })));

const SectionLoading: React.FC = () => (
  <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm" role="status">
    Chargement de cet espace…
  </div>
);

export const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<'checking' | 'signed_in' | 'demo' | 'signed_out'>('checking');
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
  const [selectedPathId, setSelectedPathId] = useState<string>('PATH_FIN_ANALYST_360');
  const [initialLessonId, setInitialLessonId] = useState<string | undefined>(undefined);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [headerSearchTerm, setHeaderSearchTerm] = useState('');
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/auth?action=me', { credentials: 'same-origin' })
      .then(async (response) => {
        if (!active) return;
        if (response.ok) {
          const data = await response.json();
          setProfile(data.profile);
          setAuthStatus('signed_in');
        } else if (import.meta.env.DEV) {
          setAuthStatus('demo');
        } else {
          setAuthStatus('signed_out');
        }
      })
      .catch(() => {
        if (active) setAuthStatus(import.meta.env.DEV ? 'demo' : 'signed_out');
      });
    return () => { active = false; };
  }, []);

  const handleAuthenticated = (nextProfile: UserProfile) => {
    setProfile(nextProfile);
    setAuthStatus('signed_in');
  };

  const handleSignOut = async () => {
    await fetch('/api/auth?action=logout', { method: 'POST', credentials: 'same-origin' }).catch(() => undefined);
    localStorage.removeItem('finlearn_profile');
    setProfile(DEMO_PROFILES.max || DEMO_PROFILES.koffi);
    setAuthStatus('signed_out');
  };

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

  if (authStatus === 'checking') {
    return <div className="min-h-screen grid place-items-center bg-[#F5F7FB] text-sm text-slate-500">Chargement de votre espace…</div>;
  }
  if (authStatus === 'signed_out') {
    return <AccessGate onAuthenticated={handleAuthenticated} onUseDemo={import.meta.env.DEV ? () => { setProfile(DEMO_PROFILES.max); setAuthStatus('demo'); } : undefined} />;
  }

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
    <div className="min-h-screen bg-[#F5F7FB] flex font-sans antialiased text-slate-800 selection:bg-blue-500 selection:text-white">
      {/* 1. Barre Latérale Gauche Sombre Style FinExpert (Fidélité 100% à la capture de référence) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        globalScorePercent={68}
        canAuthor={authStatus === 'signed_in' && profile.role === 'admin'}
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
          allowDemoProfiles={authStatus === 'demo'}
          onSignOut={authStatus === 'signed_in' ? handleSignOut : undefined}
        />

        {/* Zone de Visualisation avec Défilement Fluide */}
        <main className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
          {activeTab === 'dashboard' && (
            <FinExpertDashboard
              profile={profile}
              onNavigate={setActiveTab}
              onLaunchMission={(mId) => setActiveMissionId(mId)}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
              onSelectPath={(pId, lId) => {
                setSelectedPathId(pId);
                if (lId) setInitialLessonId(lId);
                setActiveTab('courses');
              }}
            />
          )}

          {activeTab === 'courses' && (
            <Suspense fallback={<SectionLoading />}>
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <CourseReader
                userId={profile.id}
                completedLessonIds={profile.completedLessons}
                onLessonCompleted={handleLessonCompleted}
                selectedPathId={selectedPathId}
                onSelectPath={(pId) => setSelectedPathId(pId)}
                initialLessonId={initialLessonId}
              />
            </div>
            </Suspense>
          )}

          {activeTab === 'catalogue' && (
            <Suspense fallback={<SectionLoading />}>
            <CatalogView
              userId={profile.id}
              completedLessonIds={profile.completedLessons}
              onSelectPath={(pId, lId) => {
                setSelectedPathId(pId);
                if (lId) setInitialLessonId(lId);
                setActiveTab('courses');
              }}
              onNavigate={setActiveTab}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            />
            </Suspense>
          )}

          {activeTab === 'author' && (
            <Suspense fallback={<SectionLoading />}><AuthorStudio /></Suspense>
          )}

          {activeTab === 'simulators' && (
            <Suspense fallback={<SectionLoading />}>
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <SimulatorsHub />
            </div>
            </Suspense>
          )}

          {activeTab === 'excel' && (
            <Suspense fallback={<SectionLoading />}>
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <ExcelLab />
            </div>
            </Suspense>
          )}

          {activeTab === 'missions' && (
            <Suspense fallback={<SectionLoading />}>
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <MissionsHub
                onLaunchMission={(mId) => setActiveMissionId(mId)}
                completedMissionIds={profile.completedMissions}
              />
            </div>
            </Suspense>
          )}

          {activeTab === 'evaluations' && (
            <Suspense fallback={<SectionLoading />}>
            <ProgressionView
              profile={profile}
              userId={profile.id}
              onNavigate={setActiveTab}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            />
            </Suspense>
          )}

          {activeTab === 'progression' && (
            <Suspense fallback={<SectionLoading />}>
            <ProgressionView
              profile={profile}
              userId={profile.id}
              onNavigate={setActiveTab}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            />
            </Suspense>
          )}

          {activeTab === 'portfolio' && (
            <Suspense fallback={<SectionLoading />}>
            <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto">
              <PortfolioView profile={profile} />
            </div>
            </Suspense>
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
            <Suspense fallback={<SectionLoading />}>
            <CatalogView
              userId={profile.id}
              completedLessonIds={profile.completedLessons}
              onSelectPath={() => setActiveTab('courses')}
              onNavigate={setActiveTab}
            />
            </Suspense>
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
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex items-center justify-around shadow-[0_-8px_24px_rgba(15,23,42,0.08)]"
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
