import React from 'react';
import { UserProfile } from '../../types/pedagogy';
import { BookOpen, Table, Play, User, Award, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentProfile: UserProfile;
  onSelectProfile: (profileKey: string) => void;
  activeTab: 'dashboard' | 'courses' | 'excel' | 'simulators' | 'missions' | 'portfolio';
  onSelectTab: (tab: 'dashboard' | 'courses' | 'excel' | 'simulators' | 'missions' | 'portfolio') => void;
  onOpenDiagnostic: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  onSelectProfile,
  activeTab,
  onSelectTab,
  onOpenDiagnostic,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Marque */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">
                  FINLEARN
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Immersion 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">SYSCOHADA • Excel • Finance • Courtage CIMA</p>
            </div>
          </div>

          {/* Navigation Principale */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-sky-400 shadow-sm border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Tableau de bord
            </button>
            <button
              onClick={() => onSelectTab('courses')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'courses'
                  ? 'bg-slate-800 text-sky-400 shadow-sm border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Parcours & Cours
            </button>
            <button
              onClick={() => onSelectTab('simulators')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'simulators'
                  ? 'bg-slate-800 text-sky-400 shadow-sm border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              Simulateurs
            </button>
            <button
              onClick={() => onSelectTab('excel')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'excel'
                  ? 'bg-slate-800 text-sky-400 shadow-sm border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Table className="w-4 h-4 text-sky-400" />
              Laboratoire Excel
            </button>
            <button
              onClick={() => onSelectTab('missions')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'missions'
                  ? 'bg-slate-800 text-sky-400 shadow-sm border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              Jeux & Missions
            </button>
            <button
              onClick={() => onSelectTab('portfolio')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'portfolio'
                  ? 'bg-slate-800 text-sky-400 shadow-sm border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-4 h-4 text-purple-400" />
              Portfolio
            </button>
          </nav>

          {/* Profils & Actions Droite */}
          <div className="flex items-center gap-3">
            {/* Diagnostic rapide */}
            <button
              onClick={onOpenDiagnostic}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Diagnostic Adaptatif
            </button>

            {/* Sélecteur de Persona */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700">
              <User className="w-4 h-4 text-sky-400" />
              <select
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                value={
                  currentProfile.id === 'user_koffi_01'
                    ? 'koffi'
                    : currentProfile.id === 'user_aminata_02'
                    ? 'aminata'
                    : currentProfile.id === 'user_fatou_03'
                    ? 'fatou'
                    : 'toure'
                }
                onChange={(e) => onSelectProfile(e.target.value)}
              >
                <option value="koffi" className="bg-slate-900 text-white">
                  Koffi (Débutant - Abidjan)
                </option>
                <option value="aminata" className="bg-slate-900 text-white">
                  Aminata (Comptable junior)
                </option>
                <option value="fatou" className="bg-slate-900 text-white">
                  Fatou (Courtage assurance)
                </option>
                <option value="toure" className="bg-slate-900 text-white">
                  Dr. Touré (Formateur)
                </option>
              </select>
              <span className="text-[11px] font-bold text-amber-400 px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                {currentProfile.totalXp} XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
