import React, { useState } from 'react';
import { GAME_MISSIONS } from '../../data/gameMissionsData';
import { GameMission } from '../../types/game';
import {
  Play,
  Building2,
  Clock,
  Award,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Search,
  Filter,
  Gamepad2,
  ChevronRight,
  TrendingUp,
  MapPin,
  Layers,
} from 'lucide-react';

interface MissionsHubProps {
  onLaunchMission: (missionId: string) => void;
  completedMissionIds: string[];
}

export const MissionsHub: React.FC<MissionsHubProps> = ({
  onLaunchMission,
  completedMissionIds,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'Toutes les 12 Missions (360°)' },
    { id: 'compta', label: 'Comptabilité & Audit' },
    { id: 'analyse', label: 'Analyse & Crédit' },
    { id: 'controle', label: 'Contrôle de Gestion' },
    { id: 'tresorerie', label: 'Trésorerie & Crise' },
    { id: 'excel', label: 'Modélisation Excel' },
    { id: 'finance', label: 'Investissement & M&A' },
    { id: 'assurance', label: 'Courtage & CIMA' },
    { id: 'consolidation', label: 'Consolidation Groupe' },
  ];

  const getMissionCategory = (mId: string): string => {
    switch (mId) {
      case 'MISSION_01':
      case 'MISSION_11':
        return 'compta';
      case 'MISSION_04':
        return 'analyse';
      case 'MISSION_05':
        return 'controle';
      case 'MISSION_10':
        return 'tresorerie';
      case 'MISSION_02':
      case 'MISSION_06':
        return 'excel';
      case 'MISSION_07':
      case 'MISSION_12':
        return 'finance';
      case 'MISSION_03':
      case 'MISSION_08':
        return 'assurance';
      case 'MISSION_09':
        return 'consolidation';
      default:
        return 'all';
    }
  };

  const filteredMissions = GAME_MISSIONS.filter((mission) => {
    const cat = getMissionCategory(mission.id);
    const matchesFilter = selectedFilter === 'all' || cat === selectedFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      mission.title.toLowerCase().includes(q) ||
      mission.subtitle.toLowerCase().includes(q) ||
      mission.companyName.toLowerCase().includes(q) ||
      mission.roleAssigned.toLowerCase().includes(q) ||
      mission.location.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* 1. En-tête Héroïque de l'espace Missions */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-gradient-to-r from-[#0E1A38] via-[#1A163B] to-[#0D152D] text-white p-4 sm:p-8">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold backdrop-blur-xs">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Simulateurs Immersifs 3D & Serious Games de Gestion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Missions Professionnelles Scénarisées & Cas d'Entreprises 360°
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Prenez les commandes de situations réelles d'entreprises ivoiriennes et ouest-africaines sous haute tension : clôture d'urgence, choc bancaire, audit de bordereaux CIMA, contrôle fiscal DGI et négociation de tour de table M&A.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>12 Missions d'Immersion Complètes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Conséquences Chiffrées en Temps Réel</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Débriefing Pédagogique Gold Standard</span>
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
                  ? 'bg-purple-600 text-white shadow-sm'
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
            placeholder="Rechercher une mission, entreprise, ville..."
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition"
          />
        </div>
      </div>

      {/* 3. Grille des 12 Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.map((mission) => {
          const isDone = completedMissionIds.includes(mission.id);

          return (
            <div
              key={mission.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-purple-300 transition-all group"
            >
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      mission.difficulty === 'Débutant'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : mission.difficulty === 'Opérationnel'
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}
                  >
                    {mission.difficulty}
                  </span>

                  {isDone ? (
                    <span className="text-xs font-bold font-mono text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Accomplie
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" /> {mission.timeLimitMinutes ?? 20} min
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-purple-700 transition-colors">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2">
                    {mission.subtitle}
                  </p>
                </div>

                {/* Fiche Entreprise & Localisation */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
                  <div className="font-bold text-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 truncate">
                      <Building2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="truncate">{mission.companyName}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0 font-normal">
                      <MapPin className="w-3 h-3" /> {mission.location.split(',')[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    <strong className="text-slate-700">Rôle : </strong>
                    {mission.roleAssigned}
                  </p>
                </div>

                {/* Objectifs opérationnels */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Objectifs opérationnels :
                  </span>
                  <ul className="space-y-1">
                    {mission.briefing.objectives.slice(0, 3).map((obj, oIdx) => (
                      <li key={oIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-purple-600 font-bold">•</span>
                        <span className="line-clamp-2">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bouton d'Action */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => onLaunchMission(mission.id)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs group-hover:shadow-md ${
                    isDone
                      ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isDone ? 'Rejouer la mission' : 'Lancer la mission'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
