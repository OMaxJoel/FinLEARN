import React from 'react';
import {
  Home,
  GraduationCap,
  Layers,
  Calculator,
  Gamepad2,
  FileSpreadsheet,
  ClipboardCheck,
  TrendingUp,
  Briefcase,
  Sparkles,
  BookOpen,
  X,
} from 'lucide-react';

export type NavigationTab =
  | 'dashboard'
  | 'courses'
  | 'catalogue'
  | 'simulators'
  | 'missions'
  | 'excel'
  | 'evaluations'
  | 'progression'
  | 'portfolio'
  | 'tutor'
  | 'resources';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  globalScorePercent?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  globalScorePercent = 68,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; isNew?: boolean }[] = [
    { id: 'dashboard', label: 'Accueil', icon: <Home className="w-4 h-4" /> },
    { id: 'courses', label: 'Mes parcours', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'catalogue', label: 'Catalogue', icon: <Layers className="w-4 h-4" /> },
    { id: 'simulators', label: 'Simulateurs', icon: <Calculator className="w-4 h-4" /> },
    { id: 'missions', label: 'Jeux & Missions', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'excel', label: 'Laboratoire Excel', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> },
    { id: 'evaluations', label: 'Évaluations', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'progression', label: 'Ma progression', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'tutor', label: 'Assistant IA', icon: <Sparkles className="w-4 h-4 text-amber-300" /> },
    { id: 'resources', label: 'Ressources', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* 0. Arrière-plan sombre semi-transparent (Backdrop) sur mobile */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-label="Fermer le menu de navigation"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#0B132B] text-slate-300 flex flex-col justify-between shrink-0 h-screen select-none border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-64 lg:min-h-screen lg:sticky lg:top-0 lg:z-30 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* 1. Header & Logo FinExpert */}
        <div className="p-5 pb-3 flex items-center justify-between">
          <div
            onClick={() => {
              onSelectTab('dashboard');
              onCloseMobile?.();
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
          {/* Logo Graphique Multi-couleurs */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-900 via-slate-900 to-indigo-950 p-2 flex items-center justify-center border border-indigo-500/30 shadow-md shadow-indigo-500/20 group-hover:border-indigo-400 transition">
            <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
              <path
                d="M4 24 L10 18 L16 22 L28 8"
                stroke="url(#chartGrad1)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 28 L12 21 L18 24 L28 14"
                stroke="#FF6B00"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
              <circle cx="28" cy="8" r="3" fill="#00D2FF" />
              <circle cx="16" cy="22" r="2.5" fill="#FACC15" />
              <defs>
                <linearGradient id="chartGrad1" x1="4" y1="24" x2="28" y2="8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0066FF" />
                  <stop offset="0.5" stopColor="#00D2FF" />
                  <stop offset="1" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                Fin<span className="text-sky-400">Expert</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-tight">
              Apprendre • Pratiquer • Réussir
            </p>
          </div>
        </div>

        {/* Bouton Fermer sur Mobile */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
          aria-label="Fermer le menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Liste de Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto no-scrollbar text-xs">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                onCloseMobile?.();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-[#0070F3] text-white font-bold shadow-md shadow-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* 3. Section Bas de Sidebar "Mes Compétences" & Silhouette Abidjan */}
      <div className="p-4 pt-2 border-t border-slate-800/80 bg-gradient-to-b from-transparent to-[#070D1E] relative overflow-hidden">
        <div className="mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Mes Compétences
          </span>

          {/* Jauge Circulaire 68% */}
          <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80 backdrop-blur-xs">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="19"
                  stroke="#1E293B"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="19"
                  stroke="#10B981"
                  strokeWidth="3.5"
                  strokeDasharray={2 * Math.PI * 19}
                  strokeDashoffset={(2 * Math.PI * 19) * (1 - globalScorePercent / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute font-mono font-bold text-xs text-white">
                {globalScorePercent}%
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block leading-tight">
                Niveau global
              </span>
              <span className="text-xs font-bold text-emerald-400 block">
                Avancé
              </span>
            </div>
          </div>
        </div>

        {/* Citation Inspirante */}
        <p className="text-[10px] italic text-sky-200/80 mt-2 mb-3 leading-snug px-1">
          « La connaissance est le plus grand des pouvoirs. »
        </p>

        {/* Silhouette Vectorielle Plateau Abidjan */}
        <div className="w-full h-14 opacity-40 pointer-events-none mt-1">
          <svg viewBox="0 0 200 60" className="w-full h-full" fill="none">
            {/* Silhouettes de tours (Plateau) */}
            <rect x="20" y="20" width="14" height="40" fill="#38BDF8" opacity="0.3" rx="1" />
            <rect x="38" y="10" width="16" height="50" fill="#38BDF8" opacity="0.5" rx="1" />
            <rect x="58" y="25" width="12" height="35" fill="#38BDF8" opacity="0.4" rx="1" />
            <rect x="74" y="15" width="18" height="45" fill="#38BDF8" opacity="0.6" rx="1" />
            <rect x="96" y="28" width="14" height="32" fill="#38BDF8" opacity="0.3" rx="1" />
            <rect x="114" y="8" width="18" height="52" fill="#38BDF8" opacity="0.5" rx="1" />
            <rect x="136" y="22" width="12" height="38" fill="#38BDF8" opacity="0.4" rx="1" />
            {/* Palmiers stylisés */}
            <path d="M165 60 C 165 45, 170 38, 172 32" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="172" cy="32" r="5" fill="#38BDF8" opacity="0.6" />
            <path d="M185 60 C 185 42, 188 35, 192 28" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="192" cy="28" r="6" fill="#38BDF8" opacity="0.7" />
            {/* Lagune / Vagues */}
            <path d="M0 58 Q 50 56, 100 58 T 200 58" stroke="#0284C7" strokeWidth="2" opacity="0.5" />
          </svg>
        </div>
      </div>
    </aside>
    </>
  );
};
