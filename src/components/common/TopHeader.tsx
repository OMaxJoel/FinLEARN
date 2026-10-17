import React, { useState } from 'react';
import { UserProfile } from '../../types/pedagogy';
import { DEMO_PROFILES } from '../../data/mockDatasets';
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  User,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface TopHeaderProps {
  currentProfile: UserProfile;
  onSelectProfile: (profileKey: string) => void;
  onOpenSearch: () => void;
  onOpenDiagnostic: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentProfile,
  onSelectProfile,
  onOpenSearch,
  onOpenDiagnostic,
  searchTerm,
  onSearchChange,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
      {/* 1. Barre de Recherche Flottante */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onOpenSearch}
            placeholder="Rechercher un cours, une compétence, un simulateur..."
            className="w-full bg-[#F8FAFC] border border-slate-200/80 hover:border-slate-300 focus:border-blue-500 rounded-2xl pl-10 pr-14 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded-md border border-slate-300/50">
              ⌘ K
            </span>
          </div>
        </div>
      </div>

      {/* 2. Actions Rapides à Droite */}
      <div className="flex items-center gap-4">
        {/* Cloche de Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-9 h-9 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center relative transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 text-xs z-50 animate-fadeIn">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">
                  Tout marquer comme lu
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Nouveau badge débloqué !</span>
                    <p className="text-[11px] text-slate-600">
                      Félicitations, vous avez complété l'analyse financière avancée.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Il y a 2 heures</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bouton Mode Sombre / Clair */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-9 h-9 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition"
          title="Mode sombre"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Profil Utilisateur & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-2xl hover:bg-slate-100 transition group"
          >
            {/* Avatar Photo Max Oura */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-700 text-white font-bold flex items-center justify-center text-xs overflow-hidden shadow-sm ring-2 ring-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80"
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback sur initiales
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="select-none font-extrabold">MO</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition leading-tight">
                {currentProfile.name}
              </div>
              <div className="text-[11px] text-slate-400 capitalize leading-tight">
                {currentProfile.role}
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition" />
          </button>

          {/* Menu Déroulant Profil */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 text-xs z-50 animate-fadeIn">
              <div className="p-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-slate-900 block">{currentProfile.name}</span>
                <span className="text-[11px] text-slate-400 block">{currentProfile.email}</span>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Niveau {currentProfile.experienceLevel.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                    {currentProfile.totalXp} XP
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onOpenDiagnostic();
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Repasser le Diagnostic Adaptatif
                </button>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-2 mb-1.5">
                  Changer de Profil Démo :
                </span>
                <div className="space-y-1">
                  {Object.entries(DEMO_PROFILES).map(([key, p]) => (
                    <button
                      key={key}
                      onClick={() => {
                        onSelectProfile(key);
                        setIsProfileMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex justify-between items-center transition ${
                        currentProfile.id === p.id
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{p.name}</span>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {p.experienceLevel}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
