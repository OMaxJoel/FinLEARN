import React, { useState } from 'react';
import { CellGrid } from '../../types/excel';
import { evaluateFormula, getCellValue } from '../../core/excel/evaluator';
import { auditWorkbookSheet } from '../../core/excel/audit';
import { PivotTableLab } from './PivotTableLab';
import {
  Table,
  Sparkles,
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  HelpCircle,
  GraduationCap,
  ChevronRight,
  ArrowRight,
  Award,
  Zap,
  Layers,
  BookOpen,
} from 'lucide-react';

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const ROWS = Array.from({ length: 12 }, (_, i) => i + 1);

// Modèle 1 : Calcul de Facturation Propre
const PRESET_INVOICE: CellGrid = {
  A1: { raw: 'Taux TVA (CI)', computed: 'Taux TVA (CI)' },
  B1: { raw: '0.18', computed: 0.18, format: 'percent' },
  A3: { raw: 'Désignation', computed: 'Désignation' },
  B3: { raw: 'Montant HT', computed: 'Montant HT' },
  C3: { raw: 'TVA (FCFA)', computed: 'TVA (FCFA)' },
  D3: { raw: 'Total TTC', computed: 'Total TTC' },
  A4: { raw: 'Prestation Conseil', computed: 'Prestation Conseil' },
  B4: { raw: '5000000', computed: 5000000, format: 'currency' },
  C4: { raw: '=B4 * $B$1', computed: 900000, format: 'currency', isFormula: true },
  D4: { raw: '=B4 + C4', computed: 5900000, format: 'currency', isFormula: true },
  A5: { raw: 'Formation Équipe', computed: 'Formation Équipe' },
  B5: { raw: '2000000', computed: 2000000, format: 'currency' },
  C5: { raw: '=B5 * $B$1', computed: 360000, format: 'currency', isFormula: true },
  D5: { raw: '=B5 + C5', computed: 2360000, format: 'currency', isFormula: true },
  A6: { raw: 'Total Général', computed: 'Total Général' },
  B6: { raw: '=SOMME(B4:B5)', computed: 7000000, format: 'currency', isFormula: true },
  C6: { raw: '=SOMME(C4:C5)', computed: 1260000, format: 'currency', isFormula: true },
  D6: { raw: '=SOMME(D4:D5)', computed: 8260000, format: 'currency', isFormula: true },
};

// Modèle 2 : Reporting avec Erreurs (#DIV/0! & Hardcoding)
const PRESET_CORRUPTED: CellGrid = {
  A1: { raw: 'Zone Commerciale', computed: 'Zone Commerciale' },
  B1: { raw: 'Ventes Réalisées', computed: 'Ventes Réalisées' },
  C1: { raw: 'Objectif Prévu', computed: 'Objectif Prévu' },
  D1: { raw: 'Taux Réalisation', computed: 'Taux Réalisation' },
  E1: { raw: 'Marge Brute', computed: 'Marge Brute' },
  A2: { raw: 'Abidjan Sud', computed: 'Abidjan Sud' },
  B2: { raw: '45000000', computed: 45000000 },
  C2: { raw: '40000000', computed: 40000000 },
  D2: { raw: '=B2 / C2', computed: 1.125, isFormula: true },
  E2: { raw: '=B2 * 0.25', computed: 11250000, isFormula: true },
  A3: { raw: 'San Pedro', computed: 'San Pedro' },
  B3: { raw: '18000000', computed: 18000000 },
  C3: { raw: '0', computed: 0 },
  D3: { raw: '=B3 / C3', computed: '#DIV/0!', isFormula: true },
  E3: { raw: '=B3 * 0.25', computed: 4500000, isFormula: true },
};

// =========================================================================
// 9 ÉTAPES PROGRESSIVES DU PARCOURS EXCEL DU FINANCIER
// =========================================================================
interface AcademyStage {
  id: number;
  title: string;
  subtitle: string;
  roleContext: string;
  theorySummary: string;
  instruction: string;
  targetCell: string;
  expectedFormula: string[];
  initialGrid: CellGrid;
  hints: string[];
  explanation: string;
  xpReward: number;
}

const ACADEMY_STAGES: AcademyStage[] = [
  {
    id: 1,
    title: 'Étape 1 : Fondations & Références Absolues ($)',
    subtitle: 'Bannir le hardcoding et ancrer les paramètres de calcul',
    roleContext: 'Comptable Junior / Auditeur',
    theorySummary:
      'Dans un modèle financier propre, une constante (ex: taux de TVA à 18% en B1) ne doit JAMAIS être écrite en dur dans une formule. En étirant vers le bas, on bloque la cellule avec des dollars : $B$1.',
    instruction:
      'Écrivez la formule exacte en cellule C4 pour calculer le montant de la TVA sur la prestation conseil (cellule B4) en multipliant par le taux de TVA situé en B1 avec référence absolue.',
    targetCell: 'C4',
    expectedFormula: ['=B4*$B$1', '=B4*$B$1', '=$B$1*B4'],
    initialGrid: {
      A1: { raw: 'Taux TVA (CI)', computed: 'Taux TVA (CI)' },
      B1: { raw: '0.18', computed: 0.18 },
      A3: { raw: 'Prestation', computed: 'Prestation' },
      B3: { raw: 'Montant HT', computed: 'Montant HT' },
      C3: { raw: 'TVA (FCFA)', computed: 'TVA (FCFA)' },
      A4: { raw: 'Conseil Financier', computed: 'Conseil Financier' },
      B4: { raw: '5000000', computed: 5000000 },
      C4: { raw: '', computed: '' },
    },
    hints: [
      'Commencez par le signe égal =',
      'Multipliez la cellule du montant HT B4 par le taux en B1',
      'Bloquez B1 avec des dollars : $B$1',
    ],
    explanation:
      'La formule =B4 * $B$1 permet de calculer exactement 900 000 FCFA. Si le taux de TVA en B1 change, toute la feuille se recalculera instantanément !',
    xpReward: 50,
  },
  {
    id: 2,
    title: 'Étape 2 : Fonctions Arithmétiques (SOMME, MOYENNE)',
    subtitle: 'Agréger des séries sans additionner cellule par cellule',
    roleContext: 'Assistant Contrôleur de Gestion',
    theorySummary:
      'Ne tapez jamais =B2+B3+B4 quand vous avez des dizaines de lignes. Utilisez =SOMME(B2:B4) qui gère les plages dynamiquement et ne plante pas si une ligne est insérée.',
    instruction:
      'En cellule B5, écrivez la formule SOMME pour totaliser les ventes trimestrielles des cellules B2 à B4.',
    targetCell: 'B5',
    expectedFormula: ['=SOMME(B2:B4)', '=SUM(B2:B4)'],
    initialGrid: {
      A1: { raw: 'Mois', computed: 'Mois' },
      B1: { raw: 'Ventes (FCFA)', computed: 'Ventes (FCFA)' },
      A2: { raw: 'Janvier', computed: 'Janvier' },
      B2: { raw: '12000000', computed: 12000000 },
      A3: { raw: 'Février', computed: 'Février' },
      B3: { raw: '15000000', computed: 15000000 },
      A4: { raw: 'Mars', computed: 'Mars' },
      B4: { raw: '18000000', computed: 18000000 },
      A5: { raw: 'Total Trimestre', computed: 'Total Trimestre' },
      B5: { raw: '', computed: '' },
    },
    hints: [
      'Commencez par =SOMME(',
      'Spécifiez la plage avec deux-points : B2:B4',
      'Fermez la parenthèse : )',
    ],
    explanation:
      '=SOMME(B2:B4) additionne les trois mois pour un total exact de 45 000 000 FCFA.',
    xpReward: 50,
  },
  {
    id: 3,
    title: 'Étape 3 : Conditions Logiques (SI)',
    subtitle: 'Automatiser les alertes et seuils de rentabilité',
    roleContext: 'Analyste Crédit & Risque',
    theorySummary:
      'La fonction =SI(condition; valeur_si_vrai; valeur_si_faux) est le cerveau des décisions automatisées dans un tableur.',
    instruction:
      'En cellule C2, testez si la marge commerciale en B2 est supérieure ou égale à 5 000 000 FCFA. Si oui, renvoyez "BENEFICE", sinon renvoyez "DEFICIT".',
    targetCell: 'C2',
    expectedFormula: [
      '=SI(B2>=5000000;"BENEFICE";"DEFICIT")',
      '=SI(B2>=5000000; "BENEFICE"; "DEFICIT")',
      '=IF(B2>=5000000;"BENEFICE";"DEFICIT")',
    ],
    initialGrid: {
      A1: { raw: 'Entité', computed: 'Entité' },
      B1: { raw: 'Marge Réalisée', computed: 'Marge Réalisée' },
      C1: { raw: 'Statut', computed: 'Statut' },
      A2: { raw: 'Filiale Abidjan', computed: 'Filiale Abidjan' },
      B2: { raw: '7500000', computed: 7500000 },
      C2: { raw: '', computed: '' },
    },
    hints: [
      'Structure : =SI(test_logique; valeur_vrai; valeur_faux)',
      'Test logique : B2>=5000000',
      'Texte entre guillemets doubles : "BENEFICE" et "DEFICIT"',
    ],
    explanation:
      'Puisque 7 500 000 >= 5 000 000 est vrai, Excel affiche instantanément BENEFICE.',
    xpReward: 50,
  },
  {
    id: 4,
    title: 'Étape 4 : Neutralisation des Erreurs (SIERREUR)',
    subtitle: 'Protéger les comités de direction contre les #DIV/0!',
    roleContext: 'Responsable Reporting & Contrôle',
    theorySummary:
      'Une division par zéro non protégée (#DIV/0!) se propage et contamine tout le reporting. SIERREUR intercepte l\'anomalie et affiche une valeur propre par défaut (ex: 0).',
    instruction:
      'En cellule D2, calculez le taux de réalisation des ventes divisant le Réalisé (B2) par l\'Objectif (C2) en le sécurisant avec SIERREUR pour afficher 0 si l\'objectif est nul.',
    targetCell: 'D2',
    expectedFormula: [
      '=SIERREUR(B2/C2;0)',
      '=SIERREUR(B2/C2; 0)',
      '=IFERROR(B2/C2;0)',
    ],
    initialGrid: {
      A1: { raw: 'Projet', computed: 'Projet' },
      B1: { raw: 'Réalisé', computed: 'Réalisé' },
      C1: { raw: 'Objectif', computed: 'Objectif' },
      D1: { raw: 'Taux', computed: 'Taux' },
      A2: { raw: 'Projet Pilote', computed: 'Projet Pilote' },
      B2: { raw: '12000000', computed: 12000000 },
      C2: { raw: '0', computed: 0 },
      D2: { raw: '', computed: '' },
    },
    hints: [
      'Structure : =SIERREUR(calcul; valeur_si_erreur)',
      'Le calcul à tester est : B2/C2',
      'La valeur de secours après le point-virgule est : 0',
    ],
    explanation:
      '=SIERREUR(B2/C2; 0) évite le crash #DIV/0! et produit une cellule propre à 0.',
    xpReward: 50,
  },
  {
    id: 5,
    title: 'Étape 5 : Recherche Moderne de Données (RECHERCHEX)',
    subtitle: 'Rechercher sans contrainte d\'ordre de colonnes',
    roleContext: 'Analyste Financier Senior',
    theorySummary:
      'RECHERCHEX remplace avantageusement RECHERCHEV. Elle cherche une clé dans une colonne et renvoie la valeur d\'une autre colonne sans jamais planter en cas d\'insertion.',
    instruction:
      'En cellule D2, recherchez le nom du client dont le code est "CLI-002" en interrogeant la colonne des codes A2:A4 pour renvoyer la valeur de la colonne des noms B2:B4.',
    targetCell: 'D2',
    expectedFormula: [
      '=RECHERCHEX("CLI-002";A2:A4;B2:B4;"Non trouvé")',
      '=RECHERCHEX("CLI-002"; A2:A4; B2:B4; "Non trouvé")',
      '=XLOOKUP("CLI-002";A2:A4;B2:B4;"Non trouvé")',
    ],
    initialGrid: {
      A1: { raw: 'Code Client', computed: 'Code Client' },
      B1: { raw: 'Raison Sociale', computed: 'Raison Sociale' },
      C1: { raw: 'Encours', computed: 'Encours' },
      A2: { raw: 'CLI-001', computed: 'CLI-001' },
      B2: { raw: 'Ivoire Distribution SARL', computed: 'Ivoire Distribution SARL' },
      C2: { raw: '10000000', computed: 10000000 },
      A3: { raw: 'CLI-002', computed: 'CLI-002' },
      B3: { raw: 'BTP Ivoire SA', computed: 'BTP Ivoire SA' },
      C3: { raw: '25000000', computed: 25000000 },
      A4: { raw: 'CLI-003', computed: 'CLI-003' },
      B4: { raw: 'Cacao Export San Pedro', computed: 'Cacao Export San Pedro' },
      C4: { raw: '40000000', computed: 40000000 },
      D1: { raw: 'Recherche CLI-002', computed: 'Recherche CLI-002' },
      D2: { raw: '', computed: '' },
    },
    hints: [
      'Structure : =RECHERCHEX(valeur_cherchée; plage_recherche; plage_retour; [si_non_trouvé])',
      'Valeur cherchée : "CLI-002"',
      'Plage recherche : A2:A4, Plage retour : B2:B4',
    ],
    explanation:
      'RECHERCHEX trouve immédiatement "BTP Ivoire SA" de manière robuste et sécurisée.',
    xpReward: 50,
  },
  {
    id: 6,
    title: 'Étape 6 : Agrégations Multicritères (SOMME.SI.ENS)',
    subtitle: 'Totaliser sous plusieurs conditions simultanées',
    roleContext: 'Contrôleur Budgétaire',
    theorySummary:
      'SOMME.SI.ENS additionne une plage numérique si et seulement si plusieurs critères sont validés en même temps (ex: région ET produit).',
    instruction:
      'En cellule D2, totalisez les montants en C2:C4 lorsque la région en A2:A4 est égale à "Abidjan".',
    targetCell: 'D2',
    expectedFormula: [
      '=SOMME.SI.ENS(C2:C4;A2:A4;"Abidjan")',
      '=SOMME.SI.ENS(C2:C4; A2:A4; "Abidjan")',
      '=SUMIFS(C2:C4;A2:A4;"Abidjan")',
    ],
    initialGrid: {
      A1: { raw: 'Région', computed: 'Région' },
      B1: { raw: 'Agence', computed: 'Agence' },
      C1: { raw: 'Ventes (FCFA)', computed: 'Ventes (FCFA)' },
      A2: { raw: 'Abidjan', computed: 'Abidjan' },
      B2: { raw: 'Treichville', computed: 'Treichville' },
      C2: { raw: '15000000', computed: 15000000 },
      A3: { raw: 'San Pedro', computed: 'San Pedro' },
      B3: { raw: 'Port', computed: 'Port' },
      C3: { raw: '8000000', computed: 8000000 },
      A4: { raw: 'Abidjan', computed: 'Abidjan' },
      B4: { raw: 'Cocody', computed: 'Cocody' },
      C4: { raw: '20000000', computed: 20000000 },
      D1: { raw: 'Total Ventes Abidjan', computed: 'Total Ventes Abidjan' },
      D2: { raw: '', computed: '' },
    },
    hints: [
      'Structure : =SOMME.SI.ENS(plage_somme; plage_critère1; critère1)',
      'Plage somme : C2:C4',
      'Critère : A2:A4; "Abidjan"',
    ],
    explanation:
      'Totalise Treichville (15M) et Cocody (20M) pour un total exact de 35 000 000 FCFA.',
    xpReward: 50,
  },
  {
    id: 7,
    title: 'Étape 7 : Mathématiques d\'Emprunt (VPM)',
    subtitle: 'Calculer la mensualité constante d\'un prêt bancaire',
    roleContext: 'Trésorier / Gestionnaire de Financement',
    theorySummary:
      'La fonction =VPM(taux; nombre_périodes; montant_emprunté) calcule l\'annuité ou la mensualité constante amortissant strictement le capital à zéro.',
    instruction:
      'En cellule B4, calculez l\'annuité de remboursement constante d\'un prêt de 10 000 000 FCFA (B1) au taux annuel de 6% (B2) remboursé sur 5 ans (B3).',
    targetCell: 'B4',
    expectedFormula: [
      '=VPM(B2;B3;B1)',
      '=VPM(B2; B3; B1)',
      '=PMT(B2;B3;B1)',
    ],
    initialGrid: {
      A1: { raw: 'Capital Emprunté', computed: 'Capital Emprunté' },
      B1: { raw: '10000000', computed: 10000000 },
      A2: { raw: 'Taux Annuel', computed: 'Taux Annuel' },
      B2: { raw: '0.06', computed: 0.06 },
      A3: { raw: 'Durée (Années)', computed: 'Durée (Années)' },
      B3: { raw: '5', computed: 5 },
      A4: { raw: 'Annuité Constante', computed: 'Annuité Constante' },
      B4: { raw: '', computed: '' },
    },
    hints: [
      'Structure : =VPM(taux; périodes; montant)',
      'Taux : B2, Durée : B3, Capital : B1',
      '=VPM(B2; B3; B1)',
    ],
    explanation:
      'L\'annuité annuelle constante est calculée à 2 373 964 FCFA par an pendant 5 ans.',
    xpReward: 50,
  },
  {
    id: 8,
    title: 'Étape 8 : Choix d\'Investissement (VAN & Actualisation)',
    subtitle: 'Évaluer la rentabilité d\'un projet au coût du capital',
    roleContext: 'Directeur des Investissements / DAF',
    theorySummary:
      'La formule =VAN(taux; flux1:fluxN) actualise une série de flux nets de trésorerie futurs. Si la VAN dépasse l\'investissement initial, le projet crée de la valeur.',
    instruction:
      'En cellule B5, calculez la valeur actuelle des flux futurs situés en B2:B4 au taux d\'actualisation de 10% situé en B1.',
    targetCell: 'B5',
    expectedFormula: [
      '=VAN(B1;B2:B4)',
      '=VAN(B1; B2:B4)',
      '=NPV(B1;B2:B4)',
    ],
    initialGrid: {
      A1: { raw: 'Taux Actualisation', computed: 'Taux Actualisation' },
      B1: { raw: '0.10', computed: 0.10 },
      A2: { raw: 'Flux Année 1', computed: 'Flux Année 1' },
      B2: { raw: '4000000', computed: 4000000 },
      A3: { raw: 'Flux Année 2', computed: 'Flux Année 2' },
      B3: { raw: '5000000', computed: 5000000 },
      A4: { raw: 'Flux Année 3', computed: 'Flux Année 3' },
      B4: { raw: '6000000', computed: 6000000 },
      A5: { raw: 'Valeur Actualisée', computed: 'Valeur Actualisée' },
      B5: { raw: '', computed: '' },
    },
    hints: [
      'Structure : =VAN(taux; plage_flux)',
      'Taux : B1',
      'Plage des flux : B2:B4',
    ],
    explanation:
      '=VAN(B1; B2:B4) calcule la somme actualisée des flux à 12 276 484 FCFA.',
    xpReward: 50,
  },
  {
    id: 9,
    title: 'Étape 9 : Audit d\'Intégrité & Détection des Constantes',
    subtitle: 'Auditer le classeur et traquer les erreurs méthodologiques',
    roleContext: 'Auditeur Financier & Modélisateur Senior',
    theorySummary:
      'Le score de santé d\'un classeur doit être d\'au moins 80/100 avant d\'être présenté au Conseil d\'Administration. L\'auditeur traque les constantes cachées, formules circulaires et divisions non protégées.',
    instruction:
      'Lancez l\'audit méthodologique sur la feuille active ci-dessous en cliquant sur "Auditer le Classeur" et corrigez la constante en dur pour valider le niveau.',
    targetCell: 'E2',
    expectedFormula: ['AUDIT_COMPLETED'],
    initialGrid: PRESET_CORRUPTED,
    hints: [
      'Cliquez sur le bouton violet "Auditer le Classeur"',
      'Consultez les faiblesses détectées dans le rapport',
    ],
    explanation:
      'L\'audit méthodologique analyse l\'arbre syntaxique (AST) et garantit l\'intégrité des calculs.',
    xpReward: 100,
  },
];

export const ExcelLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'academy' | 'freegrid' | 'pivot'>('academy');

  // État de l'Académie Progressive
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [completedStageIds, setCompletedStageIds] = useState<number[]>([1]);
  const [academyFormulaInput, setAcademyFormulaInput] = useState<string>('');
  const [academyStatus, setAcademyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [academyHintIndex, setAcademyHintIndex] = useState<number>(0);

  // État du mode Grille Libre
  const [grid, setGrid] = useState<CellGrid>(PRESET_INVOICE);
  const [selectedCell, setSelectedCell] = useState<string>('C4');
  const [formulaInput, setFormulaInput] = useState<string>('=B4 * $B$1');
  const [auditResult, setAuditResult] = useState<any | null>(null);

  const activeStage = ACADEMY_STAGES[currentStageIndex];

  // Grille spécifique de l'étape courante de l'académie
  const [stageGrid, setStageGrid] = useState<CellGrid>(activeStage.initialGrid);

  const handleSelectStage = (idx: number) => {
    setCurrentStageIndex(idx);
    setStageGrid(ACADEMY_STAGES[idx].initialGrid);
    setAcademyFormulaInput('');
    setAcademyStatus('idle');
    setAcademyHintIndex(0);
  };

  const handleVerifyAcademyStage = () => {
    const rawInput = academyFormulaInput.trim();
    const cleanInput = rawInput.replace(/\s+/g, '').toUpperCase();

    // Vérifier si la formule commence par '='
    if (!rawInput.startsWith('=') && activeStage.id !== 9) {
      setAcademyStatus('error');
      return;
    }

    const matchesExpected = activeStage.expectedFormula.some((f) => {
      const cleanF = f.replace(/\s+/g, '').toUpperCase();
      return cleanInput === cleanF || cleanInput.includes(cleanF);
    });

    // Évaluation déterministe par notre moteur AST
    const computedVal = evaluateFormula(rawInput, stageGrid);
    const hasNoError = typeof computedVal !== 'string' || !computedVal.startsWith('#');

    if (matchesExpected || (hasNoError && activeStage.id !== 9)) {
      setAcademyStatus('success');

      // Mettre à jour la grille de l'étape avec la formule évaluée
      setStageGrid((prev) => ({
        ...prev,
        [activeStage.targetCell]: {
          raw: rawInput,
          computed: computedVal,
          isFormula: true,
        },
      }));

      if (!completedStageIds.includes(activeStage.id)) {
        setCompletedStageIds((prev) => [...prev, activeStage.id]);
      }
    } else {
      setAcademyStatus('error');
    }
  };

  const handleNextStage = () => {
    if (currentStageIndex < ACADEMY_STAGES.length - 1) {
      handleSelectStage(currentStageIndex + 1);
    }
  };

  // Gestion de la Grille Libre
  const handleSelectFreeCell = (cellId: string) => {
    setSelectedCell(cellId);
    const cell = grid[cellId];
    setFormulaInput(cell?.raw ?? '');
  };

  const handleApplyFreeFormula = (newVal: string) => {
    setFormulaInput(newVal);

    setGrid((prev) => {
      const nextGrid: CellGrid = { ...prev };
      nextGrid[selectedCell] = {
        raw: newVal,
        computed: newVal.startsWith('=') ? evaluateFormula(newVal, prev) : newVal,
        isFormula: newVal.startsWith('='),
      };

      // Recalculer toutes les formules dépendantes
      for (const cid of Object.keys(nextGrid)) {
        if (nextGrid[cid]?.raw?.startsWith('=')) {
          nextGrid[cid].computed = evaluateFormula(nextGrid[cid].raw, nextGrid);
        }
      }
      return nextGrid;
    });
  };

  const handleRunAudit = () => {
    const res = auditWorkbookSheet(activeTab === 'academy' ? stageGrid : grid);
    setAuditResult(res);
    if (activeStage.id === 9) {
      setAcademyStatus('success');
      if (!completedStageIds.includes(9)) {
        setCompletedStageIds((prev) => [...prev, 9]);
      }
    }
  };

  const handleLoadPreset = (preset: 'invoice' | 'corrupted') => {
    if (preset === 'invoice') {
      setGrid(PRESET_INVOICE);
      setSelectedCell('C4');
      setFormulaInput('=B4 * $B$1');
    } else {
      setGrid(PRESET_CORRUPTED);
      setSelectedCell('D3');
      setFormulaInput('=B3 / C3');
    }
    setAuditResult(null);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4 sm:space-y-6 animate-fadeIn">
      {/* 1. Sélecteur de Mode Principal */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
              Laboratoire Excel Professionnel
            </span>
            <span className="text-xs text-slate-400">Évaluateur AST Déterministe • Fonctions Françaises</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Laboratoire de Modélisation & Tableur Financier
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Du respect des dollars absolus ($A$1) aux fonctions de recherche (RECHERCHEX), calculs d'emprunt (VPM) et tableaux croisés.
          </p>
        </div>

        {/* Onglets des 3 modes */}
        <div className="flex overflow-x-auto sm:flex-nowrap gap-1.5 p-1.5 bg-slate-100 rounded-2xl w-full sm:w-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('academy')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'academy'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Académie ({completedStageIds.length}/9)</span>
          </button>

          <button
            onClick={() => setActiveTab('freegrid')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'freegrid'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Grille Libre & Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('pivot')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'pivot'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Studio TCD</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* MODE 1 : ACADÉMIE PROGRESSIVE PAR ÉTAPES */}
      {/* ================================================================= */}
      {activeTab === 'academy' && (
        <div className="space-y-6">
          {/* Timeline / Stepper des 9 Étapes */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 min-w-[850px]">
              {ACADEMY_STAGES.map((stg, i) => {
                const isSelected = i === currentStageIndex;
                const isDone = completedStageIds.includes(stg.id);

                return (
                  <button
                    key={stg.id}
                    onClick={() => handleSelectStage(i)}
                    className={`flex-1 p-2.5 rounded-xl border text-left transition flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : isDone
                        ? 'bg-white text-slate-800 border-emerald-300 hover:border-emerald-400'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="truncate">
                      <span className="text-[10px] font-extrabold uppercase block opacity-80">
                        Niveau {stg.id}
                      </span>
                      <span className="text-xs font-bold truncate block">{stg.title.split(':')[1]}</span>
                    </div>
                    {isDone && (
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-500'}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grille 2 Colonnes : Panneau d'Explication & Défi (Gauche) + Tableur Interactif (Droite) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Colonne Gauche : Briefing et Zone de Validation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 rounded-3xl p-4 sm:p-6 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                    {activeStage.roleContext}
                  </span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> +{activeStage.xpReward} XP
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{activeStage.title}</h3>
                <p className="text-xs text-slate-500">{activeStage.subtitle}</p>

                {/* Résumé Théorique */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-700 leading-relaxed space-y-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Principe Clé :
                  </span>
                  <p>{activeStage.theorySummary}</p>
                </div>

                {/* Consigne d'Action */}
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-950 space-y-2">
                  <span className="font-bold flex items-center gap-1.5 text-blue-900">
                    <Zap className="w-3.5 h-3.5 text-amber-500" /> Votre Mission :
                  </span>
                  <p className="leading-relaxed">{activeStage.instruction}</p>
                </div>

                {/* Saisie de la Formule */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-12 py-2 text-center font-mono font-bold text-xs bg-white border border-slate-300 rounded-xl text-slate-900 shadow-inner">
                      {activeStage.targetCell}
                    </div>
                    <input
                      type="text"
                      value={academyFormulaInput}
                      onChange={(e) => {
                        setAcademyFormulaInput(e.target.value);
                        if (academyStatus !== 'idle') setAcademyStatus('idle');
                      }}
                      placeholder="Ex: =B4 * $B$1 ou =SOMME(B2:B4)..."
                      className="flex-1 px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleVerifyAcademyStage}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm"
                    >
                      Tester & Valider la Formule
                    </button>
                    {activeStage.id === 9 && (
                      <button
                        onClick={handleRunAudit}
                        className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition flex items-center gap-1.5"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Auditer
                      </button>
                    )}
                  </div>
                </div>

                {/* Feedback Immédiat */}
                {academyStatus === 'success' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between font-bold text-sm text-emerald-700">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Étape {activeStage.id} Validée avec Succès !
                      </span>
                      <span>+{activeStage.xpReward} XP</span>
                    </div>
                    <p>{activeStage.explanation}</p>
                    {currentStageIndex < ACADEMY_STAGES.length - 1 && (
                      <button
                        onClick={handleNextStage}
                        className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <span>Passer à l'étape suivante</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {academyStatus === 'error' && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-1.5 font-bold text-rose-700">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Formule non reconnue ou syntaxe incorrecte.</span>
                    </div>
                    <p>
                      Vérifiez bien le signe égal '=', les références de cellules et les points-virgules.
                    </p>
                    {academyHintIndex < activeStage.hints.length && (
                      <button
                        onClick={() => setAcademyHintIndex((prev) => prev + 1)}
                        className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Afficher un indice ({academyHintIndex + 1}/{activeStage.hints.length})</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Indice Affiché */}
                {academyHintIndex > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <strong className="block font-bold">Indice :</strong>
                    <p>{activeStage.hints[academyHintIndex - 1]}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Colonne Droite : Tableur Visuel de l'Étape */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">Feuille de travail interactive (Étape {activeStage.id})</span>
                <span className="font-mono text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  Cellule cible : {activeStage.targetCell}
                </span>
              </div>

              <div className="border border-slate-300 rounded-2xl overflow-x-auto shadow-inner bg-slate-100">
                <table className="border-collapse table-fixed w-full text-xs">
                  <thead>
                    <tr className="bg-slate-200 text-slate-600 font-semibold select-none">
                      <th className="w-12 py-2 text-center border-b border-r border-slate-300 bg-slate-200"></th>
                      {COLS.slice(0, 5).map((col) => (
                        <th
                          key={col}
                          className={`w-32 py-2 text-center border-b border-r border-slate-300 font-bold font-mono ${
                            activeStage.targetCell.startsWith(col) ? 'bg-blue-200 text-blue-950' : ''
                          }`}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.slice(0, 8).map((row) => (
                      <tr key={row}>
                        <td
                          className={`py-1 text-center font-bold text-slate-500 border-b border-r border-slate-300 select-none font-mono ${
                            activeStage.targetCell.endsWith(String(row)) ? 'bg-blue-200 text-blue-950' : 'bg-slate-200'
                          }`}
                        >
                          {row}
                        </td>
                        {COLS.slice(0, 5).map((col) => {
                          const cellId = `${col}${row}`;
                          const cell = stageGrid[cellId];
                          const isTarget = activeStage.targetCell === cellId;
                          const isError =
                            typeof cell?.computed === 'string' && cell.computed.startsWith('#');

                          return (
                            <td
                              key={cellId}
                              className={`px-2 py-1.5 border-b border-r border-slate-300 bg-white font-mono transition-colors relative truncate max-w-[140px] ${
                                isTarget
                                  ? 'ring-2 ring-blue-500 z-10 bg-blue-50/70 font-bold'
                                  : ''
                              } ${isError ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800'}`}
                            >
                              {cell ? (
                                typeof cell.computed === 'number' ? (
                                  cell.computed.toLocaleString()
                                ) : (
                                  String(cell.computed ?? '')
                                )
                              ) : (
                                <span className="text-transparent">.</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODE 2 : GRILLE LIBRE & AUDIT DE CLASSEUR */}
      {/* ================================================================= */}
      {activeTab === 'freegrid' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Modèles pré-chargés :</span>
              <button
                onClick={() => handleLoadPreset('invoice')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Modèle Facturation Propre
              </button>
              <button
                onClick={() => handleLoadPreset('corrupted')}
                className="px-3 py-1.5 rounded-xl border border-red-200 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100"
              >
                Modèle Corrompu (#DIV/0!)
              </button>
            </div>

            <button
              onClick={handleRunAudit}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold text-xs shadow-sm hover:from-sky-500 hover:to-indigo-500 flex items-center gap-1.5 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Auditer le Classeur
            </button>
          </div>

          {/* Barre de Formule Excel */}
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <div className="w-14 px-2 py-1.5 text-center font-mono font-bold text-xs bg-white border border-slate-300 rounded-lg text-slate-900 shadow-inner">
              {selectedCell}
            </div>
            <span className="text-slate-400 font-serif font-bold text-sm italic select-none">fx</span>
            <input
              type="text"
              value={formulaInput}
              onChange={(e) => handleApplyFreeFormula(e.target.value)}
              placeholder="Entrez une formule (ex: =SOMME(B4:B5), =RECHERCHEX(...), =VPM(...))"
              className="flex-1 px-3 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
            />
          </div>

          {/* Grille Excel Interactive */}
          <div className="border border-slate-300 rounded-2xl overflow-x-auto shadow-inner bg-slate-100">
            <table className="border-collapse table-fixed w-full text-xs">
              <thead>
                <tr className="bg-slate-200 text-slate-600 font-semibold select-none">
                  <th className="w-12 py-2 text-center border-b border-r border-slate-300 bg-slate-200"></th>
                  {COLS.map((col) => (
                    <th
                      key={col}
                      className={`w-32 py-2 text-center border-b border-r border-slate-300 font-bold font-mono ${
                        selectedCell.startsWith(col) ? 'bg-sky-200 text-sky-950' : ''
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row}>
                    <td
                      className={`py-1 text-center font-bold text-slate-500 border-b border-r border-slate-300 select-none font-mono ${
                        selectedCell.endsWith(String(row)) ? 'bg-sky-200 text-sky-950' : 'bg-slate-200'
                      }`}
                    >
                      {row}
                    </td>
                    {COLS.map((col) => {
                      const cellId = `${col}${row}`;
                      const cell = grid[cellId];
                      const isSelected = selectedCell === cellId;
                      const isError =
                        typeof cell?.computed === 'string' && cell.computed.startsWith('#');
                      const isFormula = cell?.isFormula;

                      return (
                        <td
                          key={cellId}
                          onClick={() => handleSelectFreeCell(cellId)}
                          className={`px-2 py-1.5 border-b border-r border-slate-300 bg-white font-mono cursor-pointer transition-colors relative truncate max-w-[140px] ${
                            isSelected ? 'ring-2 ring-sky-500 z-10 bg-sky-50/50' : 'hover:bg-slate-50'
                          } ${isError ? 'bg-red-50 text-red-600 font-bold' : ''} ${
                            isFormula && !isError ? 'text-slate-900 font-medium' : 'text-slate-700'
                          }`}
                        >
                          {cell ? (
                            typeof cell.computed === 'number' ? (
                              cell.computed.toLocaleString()
                            ) : (
                              String(cell.computed ?? '')
                            )
                          ) : (
                            <span className="text-transparent">.</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rapport d'Audit de Classeur */}
          {auditResult && (
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-sm">Rapport d'Audit Méthodologique du Classeur</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Score de santé :</span>
                  <span
                    className={`font-mono font-bold text-sm px-2.5 py-0.5 rounded-full ${
                      auditResult.healthScore >= 80
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {auditResult.healthScore} / 100
                  </span>
                </div>
              </div>

              {auditResult.issues.length === 0 ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Aucune anomalie détectée ! Le modèle respecte scrupuleusement la séparation des paramètres et ne contient aucun hardcoding.
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-300">
                    {auditResult.issues.length} faiblesse(s) critique(s) identifiée(s) dans la feuille :
                  </p>
                  <div className="space-y-2">
                    {auditResult.issues.map((iss: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold font-mono text-amber-400">Cellule {iss.cellId}</span>
                          <span className="font-mono text-slate-400">{iss.formula}</span>
                        </div>
                        <p className="text-red-300">{iss.message}</p>
                        <p className="text-slate-400 text-[11px] italic">👉 {iss.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* MODE 3 : STUDIO TCD */}
      {/* ================================================================= */}
      {activeTab === 'pivot' && <PivotTableLab />}
    </div>
  );
};
