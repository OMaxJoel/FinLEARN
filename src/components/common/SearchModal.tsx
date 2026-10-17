import React, { useState, useEffect, useRef } from 'react';
import { NavigationTab } from './Sidebar';
import {
  Search,
  BookOpen,
  Calculator,
  Gamepad2,
  FileSpreadsheet,
  X,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  title: string;
  category: 'course' | 'simulator' | 'mission' | 'tool';
  categoryLabel: string;
  description: string;
  tab: NavigationTab;
  missionId?: string;
  simulatorId?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
  onLaunchMission?: (missionId: string) => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onLaunchMission,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Catalogue complet des éléments indexés
  const searchIndex: SearchResultItem[] = [
    // Cours & Parcours
    {
      id: 'course_compt',
      title: 'Comptabilité Générale & États Financiers (SYSCOHADA)',
      category: 'course',
      categoryLabel: 'Parcours de formation',
      description: 'Partie double, grand livre, balance à 6 colonnes, clôture et liasse financière OHADA.',
      tab: 'courses',
    },
    {
      id: 'course_excel',
      title: 'Laboratoire Excel du Débutant à l\'Expert',
      category: 'course',
      categoryLabel: 'Parcours de formation',
      description: 'Références absolues ($), RECHERCHEX, INDEX/EQUIV, Tableaux Croisés Dynamiques.',
      tab: 'excel',
    },
    {
      id: 'course_analysis',
      title: 'Analyse Financière & Diagnostic d\'Entreprise',
      category: 'course',
      categoryLabel: 'Parcours de formation',
      description: 'Fonds de roulement (FRNG), BFR, Trésorerie Nette, ratios de solvabilité et rentabilité.',
      tab: 'courses',
    },
    {
      id: 'course_controlling',
      title: 'Contrôle de Gestion & Pilotage de la Performance',
      category: 'course',
      categoryLabel: 'Parcours de formation',
      description: 'Seuil de rentabilité, point mort en jours, marge sur coûts variables, budget flexible.',
      tab: 'courses',
    },
    {
      id: 'course_finance',
      title: 'Finance d\'Entreprise & Choix d\'Investissement',
      category: 'course',
      categoryLabel: 'Parcours de formation',
      description: 'VAN, TRI, CMPC/WACC, Indice de Profitabilité et arbitrage d\'enveloppes de capital.',
      tab: 'courses',
    },
    {
      id: 'course_insurance',
      title: 'Finance du Courtage en Assurance (Cadre CIMA)',
      category: 'course',
      categoryLabel: 'Parcours de formation',
      description: 'Commissions d\'apport, règle stricte CIMA Art. 13 et rapprochement des bordereaux assureurs.',
      tab: 'courses',
    },

    // Simulateurs Déterministes (10)
    {
      id: 'sim_accounting',
      title: 'Simulateur Comptable & États Financiers (SYSCOHADA)',
      category: 'simulator',
      categoryLabel: 'Simulateur Certifié',
      description: 'Passation d\'écritures en temps réel, équilibrage immédiat du bilan et compte de résultat.',
      tab: 'simulators',
      simulatorId: 'accounting',
    },
    {
      id: 'sim_breakeven',
      title: 'Simulateur Seuil de Rentabilité & Marge',
      category: 'simulator',
      categoryLabel: 'Simulateur Certifié',
      description: 'Modélisation interactive des coûts fixes et variables, calcul du point mort en jours.',
      tab: 'simulators',
      simulatorId: 'breakeven',
    },
    {
      id: 'sim_variance',
      title: 'Simulateur Analyse des Écarts & Budget Flexible',
      category: 'simulator',
      categoryLabel: 'Simulateur Certifié',
      description: 'Décomposition factorielle fine des écarts de chiffre d\'affaires, de marge et de matières.',
      tab: 'simulators',
      simulatorId: 'variance',
    },
    {
      id: 'sim_analysis',
      title: 'Laboratoire d\'Analyse Financière & Diagnostic BFR',
      category: 'simulator',
      categoryLabel: 'Simulateur Certifié',
      description: 'Analyse de structure, calcul automatique des délais clients/fournisseurs (DSO, DPO, DIO).',
      tab: 'simulators',
      simulatorId: 'analysis',
    },
    {
      id: 'sim_investment',
      title: 'Simulateur d\'Investissement & Rentabilité (VAN / TRI / CMPC)',
      category: 'simulator',
      categoryLabel: 'Simulateur Certifié',
      description: 'Actualisation de flux de trésorerie sur 5 ans, calcul de la VAN et du TRI exacts.',
      tab: 'simulators',
      simulatorId: 'investment',
    },
    {
      id: 'sim_treasury',
      title: 'Simulateur de Stress Test de Trésorerie',
      category: 'simulator',
      categoryLabel: 'Simulateur Certifié',
      description: 'Projection 13 semaines sous scénarios de choc de liquidité et défauts clients.',
      tab: 'simulators',
      simulatorId: 'treasury',
    },
    {
      id: 'sim_insurance_broker',
      title: 'Simulateur de Courtage d\'Assurance (Cadre CIMA)',
      category: 'simulator',
      categoryLabel: 'Simulateur Certifié',
      description: 'Calcul des commissions par branche, taxes d\'assurance et application de l\'Art. 13.',
      tab: 'simulators',
      simulatorId: 'insurance',
    },
    {
      id: 'sim_brokerage_portfolio',
      title: 'Simulateur de Portefeuille de Courtage Multi-Branches',
      category: 'simulator',
      categoryLabel: 'Simulateur Certifié',
      description: 'Gestion d\'un portefeuille de 50 polices, suivi du taux d\'impayés et de rétention.',
      tab: 'simulators',
      simulatorId: 'portfolio',
    },
    {
      id: 'sim_consolidation',
      title: 'Cockpit de Consolidation & Reporting Multi-Entités',
      category: 'simulator',
      categoryLabel: 'Simulateur Certifié',
      description: 'Élimination des opérations réciproques et intégration globale pour groupe régional UEMOA.',
      tab: 'simulators',
      simulatorId: 'consolidation',
    },
    {
      id: 'sim_excel_pivots',
      title: 'Laboratoire Tableaux Croisés Dynamiques & Fonctions Modernes',
      category: 'simulator',
      categoryLabel: 'Simulateur Certifié',
      description: 'Agrégation interactive de données de ventes et de paie avec filtres multidimensionnels.',
      tab: 'excel',
    },

    // Jeux Sérieux & Missions
    {
      id: 'm1_sifca',
      title: 'Mission 1 : Clôture Comptable d\'Urgence - SIFCA Agro',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Régulariser les écritures d\'inventaire et arrêter les comptes avant l\'audit externe.',
      tab: 'missions',
      missionId: 'MISSION_01',
    },
    {
      id: 'm2_btp',
      title: 'Mission 2 : Diagnostic de Crise de Trésorerie - BTP Ivoire',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Identifier les dérives de BFR et rétablir la liquidité d\'un champion national du BTP.',
      tab: 'missions',
      missionId: 'MISSION_02',
    },
    {
      id: 'm3_audit_excel',
      title: 'Mission 3 : Audit & Restauration de Modèle Excel Corrompu',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Détecter les erreurs de références circulaires, de constantes en dur et restaurer le modèle.',
      tab: 'missions',
      missionId: 'MISSION_03',
    },
    {
      id: 'm4_invest_ca',
      title: 'Mission 4 : Conseil d\'Administration & Arbitrage d\'Investissement',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Arbitrer une enveloppe de 800M FCFA entre 3 projets industriels concurrents.',
      tab: 'missions',
      missionId: 'MISSION_04',
    },
    {
      id: 'm5_treasury_save',
      title: 'Mission 5 : Sauvetage de Trésorerie sous Stress Bancaire',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Éviter la cessation de paiement sous un choc brutal de retards de paiement de l\'État.',
      tab: 'missions',
      missionId: 'MISSION_05',
    },
    {
      id: 'm6_consolidation_uemoa',
      title: 'Mission 6 : Consolidation & Intégration Groupe UEMOA',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Consolider les comptes de 3 filiales (Abidjan, Dakar, Bamako) et éliminer les flux internes.',
      tab: 'missions',
      missionId: 'MISSION_06',
    },
    {
      id: 'course_treasury',
      title: 'Gestion & Prévision de Trésorerie Opérationnelle (13 Semaines)',
      category: 'course',
      categoryLabel: 'Parcours Métier Trésorier',
      description: 'Budget glissant, arbitrages de découverts, agios et stress tests de choc de liquidité.',
      tab: 'courses',
    },
    {
      id: 'course_consolidation',
      title: 'Consolidation Groupe & Reporting Régional (UEMOA / IAS 21)',
      category: 'course',
      categoryLabel: 'Parcours Métier Consolidateur',
      description: 'Intégration globale, élimination des opérations réciproques et conversion multi-devises.',
      tab: 'courses',
    },
    {
      id: 'm7_cima_audit',
      title: 'Mission 7 : Le Comité d\'Investissement - SIAT SA San Pedro',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Arbitrage budgétaire d\'une enveloppe de 120M FCFA entre VAN, TRI et taux de Fisher.',
      tab: 'missions',
      missionId: 'MISSION_07',
    },
    {
      id: 'm8_renewals',
      title: 'Mission 8 : La Semaine des Renouvellements de Portefeuille CIMA',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Audit de compte déficitaire, respect strict CIMA Art. 13 et fidélisation de clientèle.',
      tab: 'missions',
      missionId: 'MISSION_08',
    },
    {
      id: 'm9_consolidation',
      title: 'Mission 9 : La Consolidation du Groupe Régional UEMOA',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Consolider les comptes de 3 filiales (Abidjan, Dakar, Paris), éliminer les flux internes et appliquer IAS 21.',
      tab: 'missions',
      missionId: 'MISSION_09',
    },
    {
      id: 'm10_treasury_save',
      title: 'Mission 10 : Le Sauvetage de Trésorerie à 13 Semaines',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Éviter la cessation de paiement sous choc de liquidité bancaire à San Pedro (Cacao Export SA).',
      tab: 'missions',
      missionId: 'MISSION_10',
    },
    {
      id: 'm11_fisc_control',
      title: 'Mission 11 : Le Contrôle Fiscal & TVA SYSCOHADA',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Auditer la conformité fiscale d\'une PME ivoirienne avant vérification générale DGI.',
      tab: 'missions',
      missionId: 'MISSION_11',
    },
    {
      id: 'm12_ma_round',
      title: 'Mission 12 : Le Tour de Table & Rachat d\'Entreprise (M&A)',
      category: 'mission',
      categoryLabel: 'Mission Jeu 3D',
      description: 'Négocier une levée de fonds de 600M FCFA avec un fonds de capital-investissement ouest-africain.',
      tab: 'missions',
      missionId: 'MISSION_12',
    },
  ];


  const filteredResults = searchIndex.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q)
    );
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'course':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'simulator':
        return <Calculator className="w-4 h-4 text-sky-600" />;
      case 'mission':
        return <Gamepad2 className="w-4 h-4 text-amber-600" />;
      default:
        return <FileSpreadsheet className="w-4 h-4 text-purple-600" />;
    }
  };

  const getBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'course':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'simulator':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'mission':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  const handleSelectItem = (item: SearchResultItem) => {
    onClose();
    if (item.category === 'mission' && item.missionId && onLaunchMission) {
      onLaunchMission(item.missionId);
    } else {
      onNavigate(item.tab);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-3 sm:px-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[75vh]">
        {/* Barre de Recherche Principale */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un cours, un simulateur, une mission..."
            className="flex-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Liste des Résultats */}
        <div className="overflow-y-auto p-3 space-y-1.5">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-semibold">Aucun résultat trouvé pour « {query} »</p>
              <p className="text-[11px] text-slate-400">
                Essayez avec des termes comme "SYSCOHADA", "VAN", "BFR", "CIMA", "Écarts"...
              </p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className="p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-white group-hover:shadow-xs transition shrink-0 mt-0.5">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition truncate">
                        {item.title}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(
                          item.category
                        )} shrink-0`}
                      >
                        {item.categoryLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition shrink-0 group-hover:translate-x-0.5" />
              </div>
            ))
          )}
        </div>

        {/* Pied de la Modale avec Raccourcis Clavier */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-600 font-bold">
                Échap
              </kbd>{' '}
              pour fermer
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-600 font-bold">
                ↵
              </kbd>{' '}
              pour sélectionner
            </span>
          </div>
          <span className="font-medium text-slate-500">
            {filteredResults.length} ressource(s) disponible(s)
          </span>
        </div>
      </div>
    </div>
  );
};
