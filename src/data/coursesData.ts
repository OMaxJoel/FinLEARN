import { LearningPathInfo, LessonContent } from '../types/pedagogy';

export interface MetierPathInfo extends LearningPathInfo {
  metierCategory:
    | 'comptabilite'
    | 'analyse'
    | 'controle'
    | 'tresorerie'
    | 'excel'
    | 'finance'
    | 'assurance'
    | 'consolidation';
  levelBadge: string;
}

export const LEARNING_PATHS: MetierPathInfo[] = [
  // =========================================================================
  // MÉTIER 1 : COMPTABLE GÉNÉRAL & AUDITEUR (SYSCOHADA RÉVISÉ)
  // =========================================================================
  {
    id: 'PATH_COMPT',
    metierCategory: 'comptabilite',
    levelBadge: 'Fondations à Opérationnel',
    title: 'Comptabilité Générale & États Financiers (SYSCOHADA)',
    tagline: 'Maîtriser la partie double, le grand livre et la liasse financière selon les normes OHADA',
    description: "Ce parcours métier vous emmène depuis les principes fondamentaux du patrimoine jusqu'à la réalisation autonome de clôtures mensuelles et l'établissement des états de synthèse bilanciels et fiscaux.",
    targetRole: 'Comptable Junior / Assistant RAF',
    iconName: 'BookOpen',
    color: 'emerald',
    modules: [
      {
        id: 'MOD_C1_1',
        pathId: 'PATH_COMPT',
        title: "Module 1 : L'Équation Comptable et la Partie Double",
        description: 'Démystifier le débit/crédit, la structure du bilan et l\'impact de chaque transaction sur le patrimoine.',
        lessonsCount: 2,
        durationHours: 4,
        competencies: ['COMPT-01', 'COMPT-02'],
      },
      {
        id: 'MOD_C1_2',
        pathId: 'PATH_COMPT',
        title: 'Module 2 : Journal, Grand Livre et Balance Générale',
        description: 'Enregistrer des écritures réelles, reporter dans les comptes en T et dresser la balance à 6 colonnes.',
        lessonsCount: 1,
        durationHours: 5,
        competencies: ['COMPT-03', 'COMPT-04'],
      },
      {
        id: 'MOD_C1_3',
        pathId: 'PATH_COMPT',
        title: 'Module 3 : Inventaire, Amortissements et États Financiers',
        description: 'Calculer les dotations, régulariser les charges et construire le compte de résultat et le bilan SYSCOHADA.',
        lessonsCount: 1,
        durationHours: 6,
        competencies: ['COMPT-05', 'COMPT-06', 'COMPT-07'],
      },
    ],
  },

  // =========================================================================
  // MÉTIER 2 : ANALYSTE FINANCIER & DIAGNOSTIC D'ENTREPRISE
  // =========================================================================
  {
    id: 'PATH_ANALYSIS',
    metierCategory: 'analyse',
    levelBadge: 'Intermédiaire à Avancé',
    title: "Analyse Financière & Diagnostic d'Entreprise",
    tagline: 'Interpréter les ratios, optimiser le BFR et rédiger des recommandations exécutives',
    description: "Comprendre la structure financière d'une PME ou ETI, diagnostiquer les tensions de liquidité, évaluer la rentabilité économique (ROA/ROE) et soutenir un dossier de crédit bancaire.",
    targetRole: 'Analyste Crédit / Analyste Financier M&A',
    iconName: 'TrendingUp',
    color: 'amber',
    modules: [
      {
        id: 'MOD_C2_1',
        pathId: 'PATH_ANALYSIS',
        title: "Module 1 : Équilibre Fonctionnel, BFR et Cycle d'Exploitation",
        description: 'Calculer le Fonds de Roulement Net Global (FRNG), le BFR et mesurer les délais DSO, DPO et DIO.',
        lessonsCount: 1,
        durationHours: 5,
        competencies: ['ANAL-01', 'ANAL-03'],
      },
      {
        id: 'MOD_C2_2',
        pathId: 'PATH_ANALYSIS',
        title: 'Module 2 : Ratios de Solvabilité, Rentabilité et Note de Synthèse',
        description: 'Évaluer le levier financier (gearing), la rentabilité des capitaux propres et soutenir un comité de crédit.',
        lessonsCount: 1,
        durationHours: 6,
        competencies: ['ANAL-02', 'ANAL-04'],
      },
    ],
  },

  // =========================================================================
  // MÉTIER 3 : CONTRÔLEUR DE GESTION & BUSINESS PARTNER
  // =========================================================================
  {
    id: 'PATH_CONTROLLING',
    metierCategory: 'controle',
    levelBadge: 'Opérationnel Avancé',
    title: 'Contrôle de Gestion & Pilotage de la Performance',
    tagline: 'Maîtriser le seuil de rentabilité, l\'analyse des écarts et le budget flexible',
    description: "De la distinction coûts fixes / coûts variables à la décomposition fine des écarts de chiffre d'affaires et de marge (effets volume, prix, coût matière et mix).",
    targetRole: 'Contrôleur de Gestion / Responsable Budgétaire',
    iconName: 'Sliders',
    color: 'emerald',
    modules: [
      {
        id: 'MOD_C4_1',
        pathId: 'PATH_CONTROLLING',
        title: 'Module 1 : Typologie des Coûts & Seuil de Rentabilité',
        description: 'Classifier charges fixes et variables, calculer la marge sur coût variable et le point mort en jours.',
        lessonsCount: 1,
        durationHours: 5,
        competencies: ['GEST-01', 'GEST-02'],
      },
      {
        id: 'MOD_C4_2',
        pathId: 'PATH_CONTROLLING',
        title: 'Module 2 : Budgets et Analyse Factorielle des Écarts',
        description: 'Construire un budget flexible, isoler l\'effet volume de l\'effet prix et déceler les dérives matières.',
        lessonsCount: 1,
        durationHours: 6,
        competencies: ['GEST-03', 'GEST-04'],
      },
    ],
  },

  // =========================================================================
  // MÉTIER 4 : TRÉSORIER D'ENTREPRISE & GESTIONNAIRE DE LIQUIDITÉ
  // =========================================================================
  {
    id: 'PATH_TREASURY',
    metierCategory: 'tresorerie',
    levelBadge: 'Opérationnel à Expert',
    title: 'Gestion & Prévision de Trésorerie Opérationnelle',
    tagline: 'Construire un plan 13 semaines, stresser les liquidités et négocier avec les banques',
    description: 'Piloter les flux quotidiens, anticiper les impasses de trésorerie sous choc de retards de paiement, calculer les agios et arbitrer entre découvert et escompte bancaire.',
    targetRole: 'Trésorier d\'Entreprise / Cash Manager',
    iconName: 'CreditCard',
    color: 'rose',
    modules: [
      {
        id: 'MOD_C6_1',
        pathId: 'PATH_TREASURY',
        title: 'Module 1 : Le Plan de Trésorerie Glissant 13 Semaines',
        description: 'Établir les flux d\'encaissements TTC, les décaissements certains et caler le solde de fin de semaine.',
        lessonsCount: 1,
        durationHours: 5,
        competencies: ['TRES-01', 'TRES-02'],
      },
      {
        id: 'MOD_C6_2',
        pathId: 'PATH_TREASURY',
        title: 'Module 2 : Stress Tests de Liquidité & Arbitrages Bancaires',
        description: 'Simuler un défaut client de 30%, modéliser les agios et négocier des lignes court terme.',
        lessonsCount: 1,
        durationHours: 5,
        competencies: ['TRES-03', 'TRES-04'],
      },
    ],
  },

  // =========================================================================
  // MÉTIER 5 : EXPERT MODÉLISATION EXCEL FINANCIER
  // =========================================================================
  {
    id: 'PATH_EXCEL',
    metierCategory: 'excel',
    levelBadge: 'Débutant à Expert',
    title: "Laboratoire Excel du Débutant à l'Expert",
    tagline: 'Construire des modèles financiers fiables, auditer des classeurs et automatiser les reportings',
    description: "De l'usage irréprochable des références absolues ($A$1) aux formules de recherche modernes (RECHERCHEX), calculs conditionnels multicritères (SOMME.SI.ENS) et Tableaux Croisés Dynamiques.",
    targetRole: 'Analyste Financier / Modélisateur Excel',
    iconName: 'Table',
    color: 'sky',
    modules: [
      {
        id: 'MOD_C3_1',
        pathId: 'PATH_EXCEL',
        title: 'Module 1 : Fondations, Formats et Références Absolues',
        description: 'Éliminer les constantes écrites en dur, maîtriser les dollars ($) et les fonctions de base.',
        lessonsCount: 1,
        durationHours: 4,
        competencies: ['EXCEL-01', 'EXCEL-02'],
      },
      {
        id: 'MOD_C3_2',
        pathId: 'PATH_EXCEL',
        title: 'Module 2 : Fonctions Avancées, Recherche et Sécurisation',
        description: 'Maîtriser RECHERCHEX, INDEX/EQUIV, SIERREUR et le traitement des anomalies.',
        lessonsCount: 1,
        durationHours: 5,
        competencies: ['EXCEL-03', 'EXCEL-04'],
      },
      {
        id: 'MOD_C3_3',
        pathId: 'PATH_EXCEL',
        title: 'Module 3 : Tableaux Croisés Dynamiques et Audit de Classeur',
        description: 'Construire des synthèses multidimensionnelles et auditer les modèles compromis.',
        lessonsCount: 1,
        durationHours: 5,
        competencies: ['EXCEL-05', 'EXCEL-06'],
      },
    ],
  },

  // =========================================================================
  // MÉTIER 6 : FINANCE D'ENTREPRISE, INVESTISSEMENT & DAF
  // =========================================================================
  {
    id: 'PATH_FINANCE',
    metierCategory: 'finance',
    levelBadge: 'Avancé / Décisionnel',
    title: "Finance d'Entreprise & Choix d'Investissement",
    tagline: 'Maîtriser la VAN, le TRI, l\'Indice de Profitabilité, le CMPC et le rationnement du capital',
    description: 'De l\'actualisation des flux de trésorerie à l\'arbitrage multi-projets, l\'analyse de sensibilité et la négociation devant le Conseil d\'Administration.',
    targetRole: 'Directeur des Investissements / DAF',
    iconName: 'Award',
    color: 'indigo',
    modules: [
      {
        id: 'MOD_C5_1',
        pathId: 'PATH_FINANCE',
        title: 'Module 1 : Critères de Rentabilité (VAN, TRI, Payback)',
        description: 'Construire l\'échéancier des flux nets, actualiser au CMPC et arbitrer les conflits méthodologiques.',
        lessonsCount: 1,
        durationHours: 6,
        competencies: ['FIN-01', 'FIN-02'],
      },
      {
        id: 'MOD_C5_2',
        pathId: 'PATH_FINANCE',
        title: 'Module 2 : Coût du Capital, Sensibilité & Rationnement',
        description: 'Calculer le CMPC/WACC, tester la robustesse des hypothèses et allouer un budget contraint.',
        lessonsCount: 1,
        durationHours: 6,
        competencies: ['FIN-03', 'FIN-04'],
      },
    ],
  },

  // =========================================================================
  // MÉTIER 7 : FINANCE DU COURTAGE EN ASSURANCE (CADRE CIMA)
  // =========================================================================
  {
    id: 'PATH_INSURANCE',
    metierCategory: 'assurance',
    levelBadge: 'Expert Réglementaire CIMA',
    title: 'Finance du Courtage en Assurance (Cadre CIMA)',
    tagline: 'Gérer un portefeuille de polices, calculer les commissions et auditer les bordereaux assureurs',
    description: 'Spécialisation professionnelle approfondie sur les flux financiers du courtier, la règle CIMA Art. 13 et la rétention de portefeuille.',
    targetRole: 'Chargé de Compte / Responsable Courtage CIMA',
    iconName: 'Shield',
    color: 'indigo',
    modules: [
      {
        id: 'MOD_C7_1',
        pathId: 'PATH_INSURANCE',
        title: 'Module 1 : Modèle Économique & Conventions de Commission',
        description: 'Distinguer prime nette, taxes et commission. Calculer la rémunération par branche.',
        lessonsCount: 1,
        durationHours: 5,
        competencies: ['COURT-01', 'COURT-02'],
      },
      {
        id: 'MOD_C7_2',
        pathId: 'PATH_INSURANCE',
        title: 'Module 2 : Encaissements CIMA, Rapprochement et Rétention',
        description: 'Appliquer l\'Article 13 CIMA, réconcilier les bordereaux et maximiser la fidélisation.',
        lessonsCount: 1,
        durationHours: 6,
        competencies: ['COURT-03', 'COURT-04', 'COURT-06'],
      },
    ],
  },

  // =========================================================================
  // MÉTIER 8 : CONSOLIDATION GROUPE & REPORTING RÉGIONAL
  // =========================================================================
  {
    id: 'PATH_CONSOLIDATION',
    metierCategory: 'consolidation',
    levelBadge: 'Expertise Groupe & Devises',
    title: 'Consolidation Groupe & Reporting Multi-Entités',
    tagline: 'Intégration globale, élimination des flux réciproques et conversion multi-devises (IAS 21)',
    description: "Méthodologie de consolidation pour groupes ouest-africains ayant des filiales en zone UEMOA (XOF) et hors zone (EUR, USD). Traitement des intérêts minoritaires et des écarts de conversion.",
    targetRole: 'Consolidateur Groupe / Contrôleur Financier Régional',
    iconName: 'Layers',
    color: 'teal',
    modules: [
      {
        id: 'MOD_C8_1',
        pathId: 'PATH_CONSOLIDATION',
        title: 'Module 1 : Périmètre, Intégration Globale & Éliminations',
        description: 'Éliminer les créances et dettes réciproques, annuler les marges internes et équilibrer le bilan consolidé.',
        lessonsCount: 1,
        durationHours: 6,
        competencies: ['INTL-01', 'INTL-02'],
      },
      {
        id: 'MOD_C8_2',
        pathId: 'PATH_CONSOLIDATION',
        title: 'Module 2 : Conversion Multi-Devises (IAS 21) & Minoritaires',
        description: 'Appliquer les cours de clôture et cours moyens, calculer la réserve de conversion et isoler la part des tiers.',
        lessonsCount: 1,
        durationHours: 6,
        competencies: ['INTL-03', 'INTL-04'],
      },
    ],
  },
];

// ===========================================================================
// CONTENU DÉTAILLÉ, INTUITIF ET COMPLET DE TOUTES LES LEÇONS DE LA PLATEFORME
// ===========================================================================
export const DETAILED_LESSONS: Record<string, LessonContent> = {
  // -------------------------------------------------------------------------
  // C1_L1 : L'Équation Fondamentale et l'Anatomie du Bilan SYSCOHADA
  // -------------------------------------------------------------------------
  C1_L1: {
    id: 'C1_L1',
    moduleId: 'MOD_C1_1',
    pathId: 'PATH_COMPT',
    title: "L'Équation Fondamentale et l'Anatomie du Bilan SYSCOHADA",
    durationMinutes: 25,
    difficulty: 'Débutant',
    objectives: [
      "Comprendre la distinction intuitive entre Actif (emplois) et Passif (ressources).",
      "Vérifier à tout moment l'égalité fondamentale : Actif = Passif + Capitaux Propres.",
      "Classifier les éléments de patrimoine dans le plan comptable SYSCOHADA révisé.",
    ],
    theorySections: [
      {
        title: "1. L'Analogie Fondamentale : Le Réservoir et la Source",
        content: `Pour comprendre la comptabilité sans se perdre dans le jargon, imaginez une entreprise comme un réservoir d'eau :
- **Le Passif (Les Ressources) :** C'est la provenance de l'eau. D'où est venu l'argent ? Des associés (Capital social) ou des prêteurs (Dettes bancaires et fournisseurs).
- **L'Actif (Les Emplois) :** C'est la destination de l'eau. Où est passé l'argent ? Dans des bâtiments, des véhicules de livraison, des stocks de marchandises ou sur le compte bancaire.

L'égalité est absolue : une entreprise ne peut pas dépenser un franc CFA qui ne provienne pas d'une ressource identifiée.`,
        syscohadaRef: 'Acte Uniforme OHADA portant organisation et harmonisation des comptabilités des entreprises, Articles 29 à 34.',
      },
      {
        title: "2. L'Équation d'Équilibre Absolu",
        content: `Toute ressource a un emploi. Mathématiquement :
$$\\text{Total Actif} = \\text{Total Passif} + \\text{Capitaux Propres}$$

Dans le SYSCOHADA révisé :
- **Classe 1 :** Ressources durables (Capitaux propres, emprunts à long terme).
- **Classe 2 :** Actif immobilisé (Terrains, matériel industriel, logiciels).
- **Classe 3 :** Stocks (Marchandises, matières premières).
- **Classe 4 :** Tiers (Créances clients à l'actif, dettes fournisseurs au passif).
- **Classe 5 :** Trésorerie (Banque compte 521, Caisse compte 571).`,
        keyTakeaway: "L'équilibre bilanciel ne tolère aucun centime d'écart. Tout déséquilibre signale une omission ou une double saisie.",
      },
    ],
    solvedExample: {
      context: "Création de la société 'Ivoire Distribution SARL' à Abidjan-Treichville : Les deux associés apportent 10 000 000 FCFA déposés en banque. La société contracte un emprunt bancaire de 5 000 000 FCFA.",
      data: {
        apportAssocies: '10 000 000 FCFA',
        empruntBancaire: '5 000 000 FCFA',
        tresorerieBanque: '15 000 000 FCFA',
      },
      stepByStepSolution: [
        {
          step: 1,
          action: "Identifier les ressources (Passif et Capitaux Propres)",
          justification: "Capital social (Compte 1013) = 10 000 000 FCFA. Emprunt bancaire (Compte 1620) = 5 000 000 FCFA. Total Ressources = 15 000 000 FCFA.",
        },
        {
          step: 2,
          action: "Identifier les emplois (Actif)",
          justification: "La totalité des fonds est déposée sur le compte bancaire (Compte 5211). Total Emplois = 15 000 000 FCFA.",
        },
        {
          step: 3,
          action: "Vérifier l'égalité bilancielle",
          calculation: "Actif (15 000 000 FCFA) == Capitaux Propres (10 000 000 FCFA) + Dettes (5 000 000 FCFA)",
          justification: "L'équation est équilibrée à 15 000 000 FCFA de part et d'autre.",
        },
      ],
    },
    exercise: {
      id: 'EX_C1_1',
      instruction: "Calculez le montant manquant des Capitaux Propres pour une PME dont l'Actif total s'élève à 28 000 000 FCFA et dont le total des dettes (fournisseurs + emprunts) est de 12 500 000 FCFA.",
      dataset: { totalActif: 28000000, totalDettes: 12500000 },
      expectedAnswer: 15500000,
      hints: [
        "Rappelez-vous l'équation fondamentale : Actif = Capitaux Propres + Dettes.",
        "Isolez les Capitaux Propres : Capitaux Propres = Actif - Dettes.",
        "Calculez 28 000 000 - 12 500 000.",
      ],
      explanation: "Capitaux Propres = 28 000 000 - 12 500 000 = 15 500 000 FCFA.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Dans le bilan SYSCOHADA, quel compte enregistre les disponibilités déposées à la banque ?",
        options: [
          "Compte 101 - Capital social",
          "Compte 521 - Banques et établissements financiers",
          "Compte 411 - Clients",
          "Compte 601 - Achats de marchandises",
        ],
        correctIndex: 1,
        explanation: "Le compte 521 enregistre les avoirs en banque (Actif circulant de trésorerie). Le 101 est au passif, le 411 est une créance client et le 601 est une charge.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C1_L2 : La Partie Double, le Journal et le Grand Livre
  // -------------------------------------------------------------------------
  C1_L2: {
    id: 'C1_L2',
    moduleId: 'MOD_C1_1',
    pathId: 'PATH_COMPT',
    title: 'La Partie Double, le Journal et le Grand Livre',
    durationMinutes: 30,
    difficulty: 'Débutant',
    objectives: [
      "Maîtriser la mécanique universelle du Débit et du Crédit.",
      "Enregistrer une facture d'achat et une facture de vente avec TVA 18%.",
      "Reporter les écritures dans les comptes en T du Grand Livre.",
    ],
    theorySections: [
      {
        title: "1. La Règle d'Or de la Partie Double",
        content: `Inventée par le moine Luca Pacioli au XVe siècle, la partie double repose sur un principe inviolable :
**Pour chaque écriture comptable, le total des débits doit être rigoureusement égal au total des crédits.**

- **Débiter un compte**, c'est constater :
  - Une augmentation d'Actif (ex: entrée d'argent en banque, achat d'ordinateur).
  - Une Charge (ex: consommation d'électricité, frais de transport).
  - Une diminution de Passif (ex: remboursement de dette fournisseur).
- **Créditer un compte**, c'est constater :
  - Une augmentation de Passif (ex: nouvelle dette fournisseur, apport en capital).
  - Un Produit (ex: vente de marchandises, prestation de services).
  - Une diminution d'Actif (ex: sortie d'argent de la banque).`,
        syscohadaRef: 'Acte Uniforme OHADA, Articles 17 à 22 sur la tenue des livres légaux.',
      },
      {
        title: '2. Exemple type : Achat de Marchandises avec TVA 18%',
        content: `En Côte d'Ivoire et dans l'UEMOA, le taux normal de TVA est de 18%.
Lors d'un achat de marchandises de 1 000 000 FCFA HT payé par chèque :
- Débit 601 (Achats de marchandises) : 1 000 000 FCFA (la charge hors taxe)
- Débit 4452 (État, TVA récupérable) : 180 000 FCFA (la créance fiscale sur l'État)
- Crédit 521 (Banque) : 1 180 000 FCFA (la sortie de trésorerie totale TTC)

Total Débit = 1 180 000 FCFA == Total Crédit = 1 180 000 FCFA. L'équilibre est parfait.`,
        keyTakeaway: "La TVA payée sur les achats n'est pas une charge : c'est une créance sur l'État (débit 4452), car l'entreprise va la récupérer en la déduisant de la TVA qu'elle facture à ses clients.",
      },
    ],
    solvedExample: {
      context: "Ivoire Distribution SARL vend des marchandises pour un montant de 2 000 000 FCFA HT à un client, avec TVA de 18%. Le client règle 50% immédiatement par virement bancaire et paiera le solde dans 30 jours.",
      data: {
        venteHT: '2 000 000 FCFA',
        tauxTVA: '18%',
        montantTVA: '360 000 FCFA',
        totalTTC: '2 360 000 FCFA',
      },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer les montants",
          calculation: "Vente HT = 2 000 000 FCFA. TVA 18% = 360 000 FCFA. TTC = 2 360 000 FCFA. Règlement 50% = 1 180 000 FCFA. Solde client = 1 180 000 FCFA.",
          justification: "La vente génère un produit (Crédit 701) et une dette de TVA envers l'État (Crédit 4431).",
        },
        {
          step: 2,
          action: "Passer les crédits (Produit et TVA facturée)",
          justification: "Crédit 701 (Vente de marchandises) = 2 000 000 FCFA. Crédit 4431 (État, TVA facturée) = 360 000 FCFA. Total Crédit = 2 360 000 FCFA.",
        },
        {
          step: 3,
          action: "Passer les débits (Règlement banque et créance client)",
          justification: "Débit 521 (Banque) = 1 180 000 FCFA. Débit 411 (Clients) = 1 180 000 FCFA. Total Débit = 2 360 000 FCFA.",
        },
      ],
    },
    exercise: {
      id: 'EX_C1_2',
      instruction: "Une entreprise achète des fournitures de bureau pour 500 000 FCFA HT avec une TVA à 18% réglée au comptant par chèque bancaire. Quel montant exact est crédité sur le compte 521 (Banque) ?",
      dataset: { montantHT: 500000, tauxTVA: 0.18 },
      expectedAnswer: 590000,
      hints: [
        "Calculez le montant TTC total.",
        "TVA = 500 000 * 0.18 = 90 000 FCFA.",
        "Total TTC = 500 000 + 90 000 = 590 000 FCFA.",
      ],
      explanation: "La banque paie la totalité TTC : 500 000 * 1.18 = 590 000 FCFA.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Lorsqu'une entreprise rembourse 3 000 000 FCFA de prêt bancaire par virement, quelle est l'écriture exacte ?",
        options: [
          "Débit Banque 521 / Crédit Emprunt 162",
          "Débit Emprunt 162 / Crédit Banque 521",
          "Débit Charges financières 671 / Crédit Caisse 571",
          "Débit Ventes 701 / Crédit Banque 521",
        ],
        correctIndex: 1,
        explanation: "La dette envers la banque diminue (Débit 162) et les disponibilités bancaires diminuent (Crédit 521).",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C1_L3 : La Balance à 6 Colonnes, l'Inventaire & les Régularisations
  // -------------------------------------------------------------------------
  C1_L3: {
    id: 'C1_L3',
    moduleId: 'MOD_C1_2',
    pathId: 'PATH_COMPT',
    title: "La Balance à 6 Colonnes, l'Inventaire & les Régularisations",
    durationMinutes: 35,
    difficulty: 'Intermédiaire',
    objectives: [
      "Comprendre la structure d'une balance à 6 colonnes (Soldes d'ouverture, Mouvements, Soldes de clôture).",
      "Calculer et enregistrer la dotation aux amortissements d'une immobilisation.",
      "Construire le Compte de Résultat et déterminer le Résultat Net.",
    ],
    theorySections: [
      {
        title: "1. La Balance à 6 Colonnes : L'Outil Suprême de Contrôle",
        content: `La balance générale récapitule tous les comptes du Grand Livre. Dans sa version à 6 colonnes :
1. **Colonnes 1 & 2 :** Soldes au 1er janvier (Débiteur / Créditeur).
2. **Colonnes 3 & 4 :** Mouvements cumulés de l'exercice (Débit / Crédit).
3. **Colonnes 5 & 6 :** Soldes finals avant inventaire (Débiteur / Créditeur).

Règle absolue : Pour chaque paire de colonnes, **Total Débit = Total Crédit**. Si ces totaux divergent, il y a une erreur dans le journal.`,
        syscohadaRef: 'SYSCOHADA Révisé, Normes de clôture d\'exercice.',
      },
      {
        title: "2. Les Amortissements : Refléter l'Usure Réelle",
        content: `Un véhicule acheté 15 000 000 FCFA utilisable pendant 5 ans perd de la valeur chaque année.
En vertu du principe d'indépendance des exercices, on constate une dotation annuelle :
$$\\text{Dotation} = \\frac{\\text{Valeur d'origine}}{\\text{Durée}} = \\frac{15\\,000\\,000}{5} = 3\\,000\\,000\\text{ FCFA}$$

Écriture au 31 décembre :
- **Débit 681** (Dotations aux amortissements) : 3 000 000 FCFA (Charge d'exploitation).
- **Crédit 2845** (Amortissement du matériel de transport) : 3 000 000 FCFA (Diminution de la valeur de l'actif).`,
        keyTakeaway: "L'amortissement n'entraîne aucune sortie de trésorerie ! C'est une charge calculée qui réduit le bénéfice imposable et permet de constituer des fonds pour renouveler l'équipement.",
      },
    ],
    solvedExample: {
      context: "Une camionnette de livraison a été acquise le 01/01/N pour 12 000 000 FCFA HT. Durée d'utilité : 4 ans (amortissement linéaire).",
      data: {
        valeurOrigine: '12 000 000 FCFA',
        duree: '4 ans',
        tauxLineaire: '25% par an',
      },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer la dotation annuelle",
          calculation: "12 000 000 / 4 = 3 000 000 FCFA",
          justification: "Chaque année N, N+1, N+2, N+3 supporte une charge de 3 000 000 FCFA.",
        },
        {
          step: 2,
          action: "Passer l'écriture de dotation",
          justification: "Débit compte 6812 (Dotations) = 3 000 000 FCFA. Crédit compte 2845 (Amortissement véhicule) = 3 000 000 FCFA.",
        },
        {
          step: 3,
          action: "Calculer la Valeur Nette Comptable (VNC) après 2 ans",
          calculation: "12 000 000 - (3 000 000 * 2) = 6 000 000 FCFA",
          justification: "Au bilan de l'année N+1, la camionnette figurera pour une VNC de 6 000 000 FCFA.",
        },
      ],
    },
    exercise: {
      id: 'EX_C1_3',
      instruction: "Calculez la Valeur Nette Comptable (VNC) au 31 décembre N+2 d'un serveur informatique acquis pour 6 000 000 FCFA amorti en linéaire sur 3 ans (taux 33,33% par an, soit 2 000 000 FCFA de dotation annuelle), après 2 ans complets d'amortissement.",
      dataset: { vo: 6000000, dotationAnnuelle: 2000000, annees: 2 },
      expectedAnswer: 2000000,
      hints: [
        "Calculez le cumul des amortissements : 2 ans * 2 000 000 FCFA = 4 000 000 FCFA.",
        "VNC = Valeur d'origine (6 000 000) - Cumul des amortissements (4 000 000).",
      ],
      explanation: "VNC = 6 000 000 - (2 * 2 000 000) = 2 000 000 FCFA.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Lequel de ces comptes appartient à la classe 6 (Charges) dans le SYSCOHADA ?",
        options: [
          "Compte 601 - Achats de marchandises",
          "Compte 701 - Ventes de marchandises",
          "Compte 411 - Clients",
          "Compte 101 - Capital social",
        ],
        correctIndex: 0,
        explanation: "La classe 6 regroupe les charges d'exploitation, financières et HAO.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C2_L1 : L'Équilibre Fonctionnel : FRNG, BFR et Trésorerie Nette
  // -------------------------------------------------------------------------
  C2_L1: {
    id: 'C2_L1',
    moduleId: 'MOD_C2_1',
    pathId: 'PATH_ANALYSIS',
    title: "L'Équilibre Fonctionnel : FRNG, BFR et Trésorerie Nette",
    durationMinutes: 30,
    difficulty: 'Intermédiaire',
    objectives: [
      "Calculer le Fonds de Roulement Net Global (FRNG).",
      "Calculer le Besoin en Fonds de Roulement (BFR).",
      "Vérifier et interpréter l'identité fondamentale : FRNG - BFR = Trésorerie Nette.",
    ],
    theorySections: [
      {
        title: "1. L'Analogie : Pourquoi une PME rentable peut-elle faire faillite ?",
        content: `Une entreprise peut avoir un carnet de commandes plein, réaliser d'excellents bénéfices sur le papier, et pourtant mourir faute de liquidités.
Pourquoi ? À cause du décalage temporel :
- L'entreprise paie ses ouvriers à la fin du mois et achète des matières premières.
- Mais ses clients ne la paieront que dans 60 ou 90 jours.

Ce décalage de trésorerie s'appelle le **Besoin en Fonds de Roulement (BFR)**. Si l'entreprise n'a pas mis de côté un matelas financier durable (**le FRNG**), elle se retrouve en cessation de paiement.`,
        syscohadaRef: "Analyse fonctionnelle du Bilan SYSCOHADA (Bilan condensé par grandes masses).",
      },
      {
        title: "2. Les Formules Mathématiques Fondamentales",
        content: `$$\\text{FRNG} = \\text{Ressources Stables} - \\text{Emplois Stables}$$
$$\\text{BFR} = \\text{Actif Circulant (Stocks + Créances clients)} - \\text{Passif Circulant (Dettes fournisseurs + fiscales)}$$
$$\\text{Trésorerie Nette (TN)} = \\text{FRNG} - \\text{BFR}$$

Interprétation de la Trésorerie Nette :
- **Si $TN > 0$ :** Le FRNG finance l'intégralité du BFR et dégage un excédent d'argent placé en banque. L'entreprise est sereine.
- **Si $TN < 0$ :** Le FRNG est insuffisant. L'entreprise comble le trou par des découverts bancaires coûteux. Elle est en risque de liquidité.`,
        keyTakeaway: "FRNG - BFR = TN est la loi de la gravité en finance d'entreprise.",
      },
    ],
    solvedExample: {
      context: "La société BTP Ivoire SARL présente les données bilancielles suivantes : Ressources stables = 85 000 000 FCFA, Emplois stables (machines, camions) = 60 000 000 FCFA, Stocks + Créances clients = 40 000 000 FCFA, Dettes fournisseurs = 25 000 000 FCFA.",
      data: {
        ressourcesStables: 85000000,
        emploisStables: 60000000,
        actifCirculant: 40000000,
        passifCirculant: 25000000,
      },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer le FRNG",
          calculation: "85 000 000 - 60 000 000 = 25 000 000 FCFA",
          justification: "L'entreprise dispose d'un matelas durable de 25M FCFA.",
        },
        {
          step: 2,
          action: "Calculer le BFR",
          calculation: "40 000 000 - 25 000 000 = 15 000 000 FCFA",
          justification: "Le cycle d'exploitation réclame 15M FCFA de financement.",
        },
        {
          step: 3,
          action: "Calculer la Trésorerie Nette (TN)",
          calculation: "FRNG (25 000 000) - BFR (15 000 000) = +10 000 000 FCFA",
          justification: "La trésorerie nette est positive de 10M FCFA. La structure est saine.",
        },
      ],
    },
    exercise: {
      id: 'EX_C2_1',
      instruction: "Une société industrielle dispose d'un FRNG de 32 000 000 FCFA. Son stock est de 18 000 000 FCFA, ses créances clients de 24 000 000 FCFA et ses dettes fournisseurs de 16 000 000 FCFA. Calculez sa Trésorerie Nette exacte en FCFA.",
      dataset: { frng: 32000000, stocks: 18000000, clients: 24000000, fournisseurs: 16000000 },
      expectedAnswer: 6000000,
      hints: [
        "Calculez le BFR : (Stocks + Clients) - Fournisseurs = (18M + 24M) - 16M = 42M - 16M = 26M FCFA.",
        "Calculez la Trésorerie Nette : TN = FRNG - BFR = 32M - 26M FCFA.",
      ],
      explanation: "BFR = 42 000 000 - 16 000 000 = 26 000 000 FCFA. TN = 32 000 000 - 26 000 000 = +6 000 000 FCFA.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Que se passe-t-il si une entreprise accorde 90 jours de crédit à ses clients au lieu de 30 jours, sans changer ses dettes fournisseurs ?",
        options: [
          "Le BFR diminue et la trésorerie augmente",
          "Le BFR augmente fortement et la trésorerie nette plonge",
          "Le FRNG augmente immédiatement",
          "Cela n'a aucun impact sur la trésorerie",
        ],
        correctIndex: 1,
        explanation: "Allonger le crédit client gonfle les créances à l'actif circulant, ce qui augmente le BFR et draine la trésorerie nette.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C2_L2 : Délais de Rotation (DSO, DPO, DIO) & Analyse de Rentabilité
  // -------------------------------------------------------------------------
  C2_L2: {
    id: 'C2_L2',
    moduleId: 'MOD_C2_2',
    pathId: 'PATH_ANALYSIS',
    title: 'Délais de Rotation (DSO, DPO, DIO) & Analyse de Rentabilité',
    durationMinutes: 30,
    difficulty: 'Intermédiaire',
    objectives: [
      "Calculer le délai moyen de paiement des clients (DSO en jours de CA TTC).",
      "Calculer la rotation des stocks (DIO) et le délai fournisseur (DPO).",
      "Évaluer la rentabilité des capitaux propres (ROE) et l'effet de levier financier.",
    ],
    theorySections: [
      {
        title: "1. Les Ratios d'Efficacité du BFR en Jours",
        content: `Pour comparer des entreprises de tailles différentes, on exprime les composantes du BFR en **jours de chiffre d'affaires ou d'achats** :
- **DSO (Days Sales Outstanding) :** Délai de crédit accordé aux clients :
$$\\text{DSO} = \\frac{\\text{Créances Clients}}{\\text{Chiffre d'Affaires TTC}} \\times 360\\text{ jours}$$
- **DIO (Days Inventory Outstanding) :** Durée de stockage :
$$\\text{DIO} = \\frac{\\text{Stock Moyen}}{\\text{Coût d'Achat des Marchandises Vendues}} \\times 360\\text{ jours}$$
- **DPO (Days Payable Outstanding) :** Délai obtenu auprès des fournisseurs :
$$\\text{DPO} = \\frac{\\text{Dettes Fournisseurs}}{\\text{Achats TTC}} \\times 360\\text{ jours}$$

La durée du cycle de conversion du cash est : **DIO + DSO - DPO**. Plus ce cycle est court, plus l'entreprise est performante.`,
        syscohadaRef: "Ratios prudentiels d'analyse financière UEMOA / BCEAO.",
      },
      {
        title: "2. La Rentabilité Financière (ROE) et le Levier",
        content: `La rentabilité financière mesure l'efficacité des capitaux investis par les actionnaires :
$$\\text{ROE} = \\frac{\\text{Résultat Net}}{\\text{Capitaux Propres}}$$

Si la rentabilité économique (résultat avant intérêts / actif total) est supérieure au taux d'intérêt de la dette, l'endettement booste le ROE : c'est l'**effet de levier**.`,
        keyTakeaway: "Un DSO supérieur à 90 jours dans l'espace UEMOA est le premier signal précurseur d'impayés et de crise de trésorerie.",
      },
    ],
    solvedExample: {
      context: "Société agroalimentaire à Bouaké : Chiffre d'affaires annuel TTC = 720 000 000 FCFA. Encours moyen des créances clients au bilan = 120 000 000 FCFA.",
      data: {
        caTTC: 720000000,
        clients: 120000000,
        baseJours: 360,
      },
      stepByStepSolution: [
        {
          step: 1,
          action: "Appliquer la formule du DSO",
          calculation: "(120 000 000 / 720 000 000) * 360 = 0.1667 * 360 = 60 jours",
          justification: "Les clients paient en moyenne à 60 jours.",
        },
        {
          step: 2,
          action: "Diagnostiquer la conformité",
          justification: "Si les conditions de vente stipulent un paiement à 30 jours, un DSO de 60 jours révèle 30 jours de retard moyen.",
        },
      ],
    },
    exercise: {
      id: 'EX_C2_2',
      instruction: "Calculez le DSO en jours pour une entreprise dont le CA annuel TTC est de 360 000 000 FCFA et le solde des créances clients s'élève à 45 000 000 FCFA (base 360 jours).",
      dataset: { caTTC: 360000000, clients: 45000000 },
      expectedAnswer: 45,
      hints: [
        "DSO = (Créances Clients / CA TTC) * 360.",
        "(45 000 000 / 360 000 000) = 0.125.",
        "0.125 * 360 = 45 jours.",
      ],
      explanation: "DSO = (45 000 000 / 360 000 000) * 360 = 45 jours.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Pour améliorer immédiatement sa trésorerie nette, que doit faire le directeur financier ?",
        options: [
          "Augmenter le délai client (DSO) et réduire le délai fournisseur (DPO)",
          "Réduire le délai client (DSO), réduire les stocks (DIO) et négocier un délai fournisseur plus long (DPO)",
          "Acheter des machines comptant",
          "Distribuer 100% des bénéfices en dividendes",
        ],
        correctIndex: 1,
        explanation: "Encaisser plus vite les clients, faire tourner les stocks plus rapidement et payer plus tard les fournisseurs réduit le BFR.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C3_L1 : Excel : Fondations, Formats et Références Absolues ($)
  // -------------------------------------------------------------------------
  C3_L1: {
    id: 'C3_L1',
    moduleId: 'MOD_C3_1',
    pathId: 'PATH_EXCEL',
    title: 'Excel : Fondations, Formats et Références Absolues ($)',
    durationMinutes: 25,
    difficulty: 'Débutant',
    objectives: [
      "Comprendre la différence critique entre référence relative (A1) et absolue ($A$1).",
      "Bannir définitivement les constantes numériques écrites en dur dans les formules.",
      "Construire un tableau de calcul dynamique avec TVA et remises.",
    ],
    theorySections: [
      {
        title: "1. L'Analogie : L'Aimant et la Poignée de Tiroir ($)",
        content: "Dans Excel, lorsque vous écrivez '=A1*B1' et que vous étirez la formule vers le bas, Excel adapte automatiquement les indices : '=A2*B2', '=A3*B3'. Ce sont des références relatives.\n\nMais imaginez que le taux de TVA (18%) soit rangé dans la cellule unique '$B$1' :\n- Si vous étirez '=A4*B1', la ligne suivante tentera de lire '=A5*B2' qui est vide ou contient du texte !\n- Pour clouer la cellule au mur avec un aimant géant, on place des dollars : '$B$1'.\n- Le premier dollar bloque la colonne B, le second bloque la ligne 1. Quand vous étirez la formule, '$B$1' ne bouge jamais.",
        keyTakeaway: "Ne tapez JAMAIS =A4*0.18 dans une formule ! Si le taux de TVA change demain dans la loi fiscale, vous devrez modifier 5 000 cellules à la main. Rangez 0.18 dans une cellule d'hypothèses et faites référence à $B$1.",
      },
    ],
    solvedExample: {
      context: "Calcul du montant de la TVA pour 3 prestations de service : Prestation 1 = 1 000 000 FCFA, Prestation 2 = 2 500 000 FCFA, Prestation 3 = 4 000 000 FCFA. Le taux de TVA (18%) est inscrit en cellule B1.",
      data: {
        tauxCell: 'B1 = 0.18',
        prestations: 'Lignes 4 à 6 en colonne B',
      },
      stepByStepSolution: [
        {
          step: 1,
          action: "Écrire la formule en C4 pour la première prestation",
          calculation: "=B4 * $B$1",
          justification: "B4 est relatif (devient B5 et B6 en étirant), $B$1 est absolu (reste toujours fixé sur la cellule de taux).",
        },
        {
          step: 2,
          action: "Étirer jusqu'à C6",
          calculation: "C5 = =B5 * $B$1 (450 000 FCFA) ; C6 = =B6 * $B$1 (720 000 FCFA)",
          justification: "Tous les calculs se mettent à jour automatiquement si l'on modifie B1.",
        },
      ],
    },
    exercise: {
      id: 'EX_C3_1',
      instruction: "Dans une feuille de calcul, la cellule B1 contient le taux de remise de 5% (0.05). La cellule B5 contient le prix initial de 800 000 FCFA. Quelle formule exacte saisissez-vous en C5 pour calculer le montant de la remise avec référence absolue ?",
      dataset: { prix: 800000, remiseRate: 0.05 },
      expectedAnswer: '=B5 * $B$1',
      hints: [
        "Commencez par le signe égal '='.",
        "Multipliez le prix en B5 par le taux en B1.",
        "Bloquez la cellule B1 avec des dollars : $B$1.",
      ],
      explanation: "La formule conforme aux règles de modélisation financière est =B5 * $B$1.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Quel risque majeur fait courir l'écriture d'une formule telle que `=B4 * 0.18` dans un modèle financier ?",
        options: [
          "Excel refuse d'exécuter la formule et renvoie #NOM?",
          "Le hardcoding crée une dette technique : en cas de changement légal du taux, le classeur contiendra des chiffres obsolètes et faux",
          "La formule consomme deux fois plus de mémoire vive",
          "Aucun risque, c'est la méthode recommandée par les auditeurs",
        ],
        correctIndex: 1,
        explanation: "Le hardcoding est la première cause d'erreurs financières dans les entreprises : les constantes doivent toujours être isolées dans un onglet d'hypothèses.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C3_L2 : Fonctions Avancées : RECHERCHEX, INDEX/EQUIV et SIERREUR
  // -------------------------------------------------------------------------
  C3_L2: {
    id: 'C3_L2',
    moduleId: 'MOD_C3_2',
    pathId: 'PATH_EXCEL',
    title: 'Fonctions Avancées : RECHERCHEX, INDEX/EQUIV et SIERREUR',
    durationMinutes: 30,
    difficulty: 'Intermédiaire',
    objectives: [
      "Maîtriser la fonction reine RECHERCHEX (XLOOKUP).",
      "Comprendre pourquoi RECHERCHEV est obsolète.",
      "Sécuriser les divisions à risque avec SIERREUR pour éliminer les #DIV/0!.",
    ],
    theorySections: [
      {
        title: "1. La Révolution RECHERCHEX",
        content: `Pendant 30 ans, les financiers ont utilisé ` + "`RECHERCHEV`" + `, qui avait un défaut mortel : elle cherchait obligatoirement dans la première colonne de gauche et plantait dès qu'on insérait une colonne dans le tableau.

` + "`RECHERCHEX`" + ` résout tout :
` + "`=RECHERCHEX(valeur_cherchée ; colonne_recherche ; colonne_retour ; [valeur_si_non_trouvé])`" + `

Exemple : Retrouver le nom d'un client à partir de son code :
` + "`=RECHERCHEX(\"CLI-002\" ; A2:A100 ; B2:B100 ; \"Non trouvé\")`" + ``,
        keyTakeaway: "RECHERCHEX ne plante jamais si des colonnes sont insérées ou supprimées entre la recherche et le retour.",
      },
      {
        title: "2. Neutraliser les Erreurs avec SIERREUR",
        content: "Lors du calcul d'un taux de réalisation '=Ventes / Objectif', si un commercial n'a pas encore d'objectif fixé (cellule à 0 ou vide), Excel affiche la terrible erreur '#DIV/0!'.\nSi cette cellule est ensuite additionnée dans un total général '=SOMME(...)', tout le tableau se contamine et affiche #DIV/0!.\n\nLa parade professionnelle :\n=SIERREUR(Ventes / Objectif ; 0)",
        keyTakeaway: "Un reporting exécutif destiné au Comité de Direction ne doit jamais afficher le moindre message d'erreur rouge ou #DIV/0!.",
      },
    ],
    solvedExample: {
      context: "Table de correspondance des polices d'assurance : Colonne A = Numéro de police (POL-101, POL-102), Colonne B = Nom de l'assuré (SOTRA, SIPLAST), Colonne C = Prime annuelle.",
      data: {
        policeCherchee: 'POL-102',
        colRecherche: 'A2:A10',
        colRetour: 'B2:B10',
      },
      stepByStepSolution: [
        {
          step: 1,
          action: "Rédiger la formule RECHERCHEX",
          calculation: '=RECHERCHEX("POL-102"; A2:A10; B2:B10; "Inconnu")',
          justification: "Excel parcourt A2:A10, trouve POL-102 en ligne 3 et renvoie instantanément la valeur de la ligne 3 en B2:B10 (SIPLAST).",
        },
      ],
    },
    exercise: {
      id: 'EX_C3_2',
      instruction: "Sécurisez la division de la cellule B2 (Chiffre d'Affaires) par C2 (Nombre de clients) avec la fonction SIERREUR pour qu'elle renvoie 0 en cas de division par zéro ou cellule vide.",
      dataset: { b2: 15000000, c2: 0 },
      expectedAnswer: '=SIERREUR(B2 / C2; 0)',
      hints: [
        "Commencez par =SIERREUR(...",
        "Le premier argument est l'opération : B2 / C2.",
        "Le second argument après le point-virgule est la valeur de secours : 0.",
      ],
      explanation: "La syntaxe exacte est =SIERREUR(B2 / C2; 0).",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Quel avantage fondamental possède RECHERCHEX par rapport à l'ancienne fonction RECHERCHEV ?",
        options: [
          "Elle est plus rapide et peut chercher vers la gauche sans être bloquée par l'ordre des colonnes",
          "Elle n'exige aucun argument",
          "Elle ne fonctionne que sur les chiffres",
          "Elle n'est disponible que sur calculatrice",
        ],
        correctIndex: 0,
        explanation: "RECHERCHEX permet des recherches bidirectionnelles (gauche/droite, haut/bas) et intègre un gestionnaire d'absence sans formule imbriquée.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C3_L3 : Tableaux Croisés Dynamiques (TCD) & SOMME.SI.ENS
  // -------------------------------------------------------------------------
  C3_L3: {
    id: 'C3_L3',
    moduleId: 'MOD_C3_3',
    pathId: 'PATH_EXCEL',
    title: 'Tableaux Croisés Dynamiques (TCD) & SOMME.SI.ENS',
    durationMinutes: 30,
    difficulty: 'Avancé',
    objectives: [
      "Agréger des millions de transactions sans écrire de formule complexe grâce aux TCD.",
      "Maîtriser la formule multicritère SOMME.SI.ENS.",
      "Auditer un modèle financier pour détecter les anomalies et références circulaires.",
    ],
    theorySections: [
      {
        title: "1. La Formule Multicritère SOMME.SI.ENS",
        content: `Pour totaliser le chiffre d'affaires réalisé par un commercial précis sur une région précise, on utilise ` + "`SOMME.SI.ENS`" + ` :
` + "`=SOMME.SI.ENS(plage_somme ; plage_critère1 ; critère1 ; plage_critère2 ; critère2)`" + `

Exemple : Total des ventes du commercial "Konan" en région "Abidjan" :
` + "`=SOMME.SI.ENS(C2:C500 ; A2:A500 ; \"Konan\" ; B2:B500 ; \"Abidjan\")`" + ``,
        keyTakeaway: "SOMME.SI.ENS est l'alternative programmée aux TCD lorsque vous devez injecter des totaux conditionnels dans une liasse bilancielle figée.",
      },
    ],
    solvedExample: {
      context: "Base de données de 500 ventes : Colonne C = Montant, Colonne A = Vendeur, Colonne B = Zone.",
      data: { plageMontant: 'C2:C500', plageZone: 'B2:B500', zoneCible: 'San Pedro' },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer la somme des ventes pour la zone San Pedro",
          calculation: '=SOMME.SI.ENS(C2:C500; B2:B500; "San Pedro")',
          justification: "Totalise toutes les cellules de C2:C500 où la cellule correspondante de B2:B500 est égale à San Pedro.",
        },
      ],
    },
    exercise: {
      id: 'EX_C3_3',
      instruction: "Rédigez la formule SOMME.SI.ENS pour additionner les montants de la plage C2:C100 lorsque la branche en colonne A2:A100 est égale à \"Automobile\".",
      dataset: {},
      expectedAnswer: '=SOMME.SI.ENS(C2:C100; A2:A100; "Automobile")',
      hints: [
        "Plage à additionner en premier : C2:C100.",
        "Plage du critère en second : A2:A100.",
        "Critère entre guillemets : \"Automobile\".",
      ],
      explanation: "La syntaxe exacte est =SOMME.SI.ENS(C2:C100; A2:A100; \"Automobile\").",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Dans un Tableau Croisé Dynamique, que se passe-t-il si les données sources changent ?",
        options: [
          "Le TCD se met à jour par un clic droit 'Actualiser' ou lors de l'ouverture du classeur",
          "Il faut recréer tout le TCD depuis le début",
          "Les données s'effacent automatiquement",
          "Excel bloque le fichier",
        ],
        correctIndex: 0,
        explanation: "Un TCD est alimenté par un cache mémoire ; il suffit de cliquer sur 'Actualiser' pour intégrer les nouvelles lignes.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C4_L1 : Typologie des Coûts & Seuil de Rentabilité
  // -------------------------------------------------------------------------
  C4_L1: {
    id: 'C4_L1',
    moduleId: 'MOD_C4_1',
    pathId: 'PATH_CONTROLLING',
    title: 'Typologie des Coûts & Seuil de Rentabilité',
    durationMinutes: 30,
    difficulty: 'Intermédiaire',
    objectives: [
      "Classifier rigoureusement les charges fixes et les charges variables.",
      "Calculer la Marge sur Coût Variable (MSCV) et son taux.",
      "Déterminer le Seuil de Rentabilité en valeur (FCFA) et le Point Mort en jours calendaires.",
    ],
    theorySections: [
      {
        title: "1. L'Analogie : Le Compteur Kilométrique et le Loyer",
        content: `Pour piloter la rentabilité, il faut scinder les dépenses en deux catégories :
- **Charges Variables :** Elles varient proportionnellement à l'activité (matières premières, emballages, carburant des livreurs, commissions des commerciaux). Si vous produisez zéro unité, elles valent zéro.
- **Charges Fixes :** Elles restent constantes quel que soit le niveau de vente (loyer de l'entrepôt, salaires administratifs, assurance, amortissement des machines). Même si vous ne vendez rien du mois, vous devez les payer.`,
      },
      {
        title: "2. Les Formules Mathématiques du Point Mort",
        content: `$$\\text{Marge sur Coût Variable (MSCV)} = \\text{Chiffre d'Affaires} - \\text{Charges Variables}$$
$$\\text{Taux de MSCV} = \\frac{\\text{MSCV}}{\\text{Chiffre d'Affaires}}$$
$$\\text{Seuil de Rentabilité (SR)} = \\frac{\\text{Charges Fixes}}{\\text{Taux de MSCV}}$$
$$\\text{Point Mort (jours)} = \\frac{\\text{Seuil de Rentabilité}}{\\text{Chiffre d'Affaires Annuel}} \\times 360$$

Le **Point Mort** est le jour précis de l'année où l'entreprise a fini de payer l'intégralité de ses charges fixes de l'année. À partir du lendemain matin, chaque franc CFA de marge tombe directement dans les poches de l'entreprise sous forme de bénéfice pur !`,
        keyTakeaway: "Plus le point mort survient tôt dans l'année (ex: en mai plutôt qu'en novembre), plus l'entreprise est résiliente en cas de baisse d'activité.",
      },
    ],
    solvedExample: {
      context: "PME industrielle à Yopougon : Chiffre d'affaires annuel = 100 000 000 FCFA. Charges variables = 60 000 000 FCFA. Charges fixes annuelles = 24 000 000 FCFA.",
      data: { ca: 100000000, cv: 60000000, cf: 24000000 },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer la MSCV et son taux",
          calculation: "MSCV = 100M - 60M = 40 000 000 FCFA. Taux de MSCV = 40M / 100M = 40% (0.40).",
          justification: "Chaque vente de 100 FCFA dégage 40 FCFA de marge nette après paiement des coûts variables.",
        },
        {
          step: 2,
          action: "Calculer le Seuil de Rentabilité (SR)",
          calculation: "SR = 24 000 000 / 0.40 = 60 000 000 FCFA.",
          justification: "L'entreprise doit réaliser au minimum 60M FCFA de chiffre d'affaires pour ne pas faire de perte.",
        },
        {
          step: 3,
          action: "Calculer le Point Mort en jours",
          calculation: "Point Mort = (60 000 000 / 100 000 000) * 360 = 216 jours (soit début août).",
          justification: "À partir du 217e jour, tout chiffre d'affaires génère du bénéfice net.",
        },
      ],
    },
    exercise: {
      id: 'EX_C4_1',
      instruction: "Une boulangerie moderne d'Abidjan réalise 50 000 000 FCFA de CA avec des charges variables de 30 000 000 FCFA. Ses charges fixes sont de 12 000 000 FCFA. Calculez son Seuil de Rentabilité exact en FCFA.",
      dataset: { ca: 50000000, cv: 30000000, cf: 12000000 },
      expectedAnswer: 30000000,
      hints: [
        "MSCV = 50M - 30M = 20M FCFA.",
        "Taux de MSCV = 20M / 50M = 0.40 (40%).",
        "SR = Charges Fixes / Taux de MSCV = 12M / 0.40.",
      ],
      explanation: "SR = 12 000 000 / 0.40 = 30 000 000 FCFA.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Si une entreprise augmente son prix de vente sans changer ses coûts, quel est l'impact sur le seuil de rentabilité ?",
        options: [
          "Le taux de MSCV augmente et le seuil de rentabilité en FCFA baisse (l'entreprise devient rentable plus vite)",
          "Le seuil de rentabilité augmente",
          "Les charges fixes augmentent automatiquement",
          "Aucun impact sur la rentabilité",
        ],
        correctIndex: 0,
        explanation: "Augmenter la marge unitaire permet d'amortir les charges fixes avec moins de volume de vente.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C4_L2 : Budgets Flexibles & Analyse Factorielle des Écarts
  // -------------------------------------------------------------------------
  C4_L2: {
    id: 'C4_L2',
    moduleId: 'MOD_C4_2',
    pathId: 'PATH_CONTROLLING',
    title: 'Budgets Flexibles & Analyse Factorielle des Écarts',
    durationMinutes: 35,
    difficulty: 'Avancé',
    objectives: [
      "Construire un budget flexible adapté au niveau d'activité réel.",
      "Décomposer l'écart de chiffre d'affaires en Effet Volume et Effet Prix.",
      "Isoler la dérive des coûts matières de la dérive des coûts de main-d'œuvre.",
    ],
    theorySections: [
      {
        title: "1. L'Erreur Mortelle du Budget Fixe",
        content: `Comparer un budget prévu pour 10 000 pièces avec une réalité à 8 000 pièces n'a aucun sens : il est évident que vous aurez consommé moins de matière, tout simplement parce que vous avez moins produit !
Le **Budget Flexible** recalcule les charges prévues en les appliquant au **volume d'activité réellement constaté**.`,
      },
      {
        title: "2. La Décomposition de l'Écart sur Chiffre d'Affaires",
        content: `$$\\text{Écart Total} = \\text{CA Réel} - \\text{CA Prévu}$$
$$\\text{Effet Volume} = (Q_{\\text{réelle}} - Q_{\\text{prévue}}) \\times P_{\\text{prévu}}$$
$$\\text{Effet Prix} = (P_{\\text{réel}} - P_{\\text{prévu}}) \\times Q_{\\text{réelle}}$$

Additivité stricte vérifiée :
$$\\text{Effet Volume} + \\text{Effet Prix} = \\text{Écart Total sur CA}$$`,
        keyTakeaway: "Un chiffre d'affaires en hausse peut cacher une catastrophe commerciale si l'effet volume s'effondre et n'a été masqué que par une inflation artificielle de prix.",
      },
    ],
    solvedExample: {
      context: "Usine d'emballage plastique : Prévision = 1 000 cartons à 5 000 FCFA (5 000 000 FCFA). Réalisé = 1 200 cartons à 4 500 FCFA (5 400 000 FCFA).",
      data: { qPrev: 1000, pPrev: 5000, qReel: 1200, pReel: 4500 },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer l'écart total",
          calculation: "5 400 000 - 5 000 000 = +400 000 FCFA (Favorable).",
          justification: "Le chiffre d'affaires a progressé de 400 000 FCFA.",
        },
        {
          step: 2,
          action: "Calculer l'Effet Volume",
          calculation: "(1 200 - 1 000) * 5 000 = +200 * 5 000 = +1 000 000 FCFA (Favorable).",
          justification: "Le gain de volume a apporté 1M FCFA de revenu potentiel supplémentaire.",
        },
        {
          step: 3,
          action: "Calculer l'Effet Prix",
          calculation: "(4 500 - 5 000) * 1 200 = -500 * 1 200 = -600 000 FCFA (Défavorable).",
          justification: "La baisse de prix de 500 FCFA a détruit 600 000 FCFA de marge.",
        },
        {
          step: 4,
          action: "Vérifier l'additivité",
          calculation: "+1 000 000 - 600 000 = +400 000 FCFA.",
          justification: "L'égalité mathématique est rigoureusement confirmée.",
        },
      ],
    },
    exercise: {
      id: 'EX_C4_2',
      instruction: "Calculez l'Effet Volume sur le chiffre d'affaires pour une entreprise qui prévoyait de vendre 5 000 sacs d'engrais à 10 000 FCFA, mais qui en a finalement vendu 5 500 sacs au prix unitaire réel de 9 500 FCFA.",
      dataset: { qPrev: 5000, pPrev: 10000, qReel: 5500, pReel: 9500 },
      expectedAnswer: 5000000,
      hints: [
        "Effet Volume = (Q_réelle - Q_prévue) * P_prévu.",
        "(5 500 - 5 000) * 10 000 = 500 * 10 000.",
      ],
      explanation: "Effet Volume = (5 500 - 5 000) * 10 000 = +5 000 000 FCFA (favorable).",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Dans l'analyse factorielle des écarts, comment s'appelle le calcul qui isole l'impact de la déviation de prix de vente ?",
        options: ["L'Effet Volume", "L'Effet Prix", "L'Effet Matière", "L'Amortissement"],
        correctIndex: 1,
        explanation: "L'Effet Prix multiplie l'écart de prix unitaire par la quantité réelle vendue.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C5_L1 : Choix d'Investissement : VAN, TRI, Payback et Indice de Profitabilité
  // -------------------------------------------------------------------------
  C5_L1: {
    id: 'C5_L1',
    moduleId: 'MOD_C5_1',
    pathId: 'PATH_FINANCE',
    title: "Choix d'Investissement : VAN, TRI, Payback et Indice de Profitabilité",
    durationMinutes: 35,
    difficulty: 'Avancé',
    objectives: [
      "Maîtriser le concept d'actualisation des flux de trésorerie (valeur temps de l'argent).",
      "Calculer la Valeur Actuelle Nette (VAN) d'un projet industriel.",
      "Comprendre la convergence itérative du Taux de Rentabilité Interne (TRI).",
      "Résoudre le conflit méthodologique entre VAN et TRI grâce au Taux d'indifférence de Fisher.",
    ],
    theorySections: [
      {
        title: "1. Pourquoi 1 000 000 FCFA aujourd'hui valent plus que 1 000 000 FCFA dans 3 ans ?",
        content: `Pour trois raisons fondamentales :
1. **L'inflation :** Le pouvoir d'achat futur diminue.
2. **Le risque / l'incertitude :** Une promesse de paiement dans 3 ans comporte un risque de défaillance.
3. **Le coût d'opportunité :** Un franc CFA disponible aujourd'hui peut être placé et rapporter des intérêts.

Pour comparer des flux futurs avec l'investissement initial payé aujourd'hui, on les **actualise** à un taux $k$ (le coût du capital) :
$$\\text{Flux Actualisé} = \\frac{CF_t}{(1 + k)^t}$$`,
      },
      {
        title: "2. Les Critères Décisionnels",
        content: `$$\\text{VAN} = -I_0 + \\sum_{t=1}^n \\frac{CF_t}{(1+k)^t}$$
- **Règle de la VAN :** Si $VAN > 0$, le projet crée de la valeur au-delà du coût du capital. On l'adopte.
- **Taux de Rentabilité Interne (TRI) :** C'est le taux d'actualisation exact pour lequel $VAN = 0$.
- **Le Conflit VAN vs TRI :** Le TRI favorise artificiellement les petits projets avec de forts retours immédiats, alors que la VAN privilégie la création de valeur absolue en FCFA. **En cas de désaccord, la VAN est le critère souverain.**`,
        keyTakeaway: "Ne choisissez jamais un projet uniquement sur son TRI : un projet qui rapporte 50% sur 100 000 FCFA crée moins de richesse qu'un projet qui rapporte 15% sur 500 000 000 FCFA.",
      },
    ],
    solvedExample: {
      context: "Achat d'une ligne d'ensachage de cacao à San Pedro : Investissement initial $I_0$ = 100 000 000 FCFA. Flux annuels constants générés pendant 3 ans = 45 000 000 FCFA par an. Coût du capital $k$ = 10%.",
      data: { i0: 100000000, cf: 45000000, k: 0.10 },
      stepByStepSolution: [
        {
          step: 1,
          action: "Actualiser les flux annuels à 10%",
          calculation: "Année 1 = 45M / 1.10 = 40.91M FCFA ; Année 2 = 45M / 1.10^2 = 37.19M FCFA ; Année 3 = 45M / 1.10^3 = 33.81M FCFA.",
          justification: "Somme des flux actualisés = 40.91M + 37.19M + 33.81M = 111.91M FCFA.",
        },
        {
          step: 2,
          action: "Calculer la VAN",
          calculation: "VAN = 111.91M - 100.00M = +11.91M FCFA (soit 11 912 100 FCFA).",
          justification: "La VAN est positive : le projet dégage un enrichissement net de près de 12 millions de FCFA.",
        },
      ],
    },
    exercise: {
      id: 'EX_C5_1',
      instruction: "Calculez la valeur actualisée à 10% d'un flux unique de 121 000 000 FCFA attendu dans exactement 2 ans (arrondi au million supérieur).",
      dataset: { flux: 121000000, k: 0.10, t: 2 },
      expectedAnswer: 100000000,
      hints: [
        "Formule : Flux / (1 + k)^t.",
        "121 000 000 / (1.10^2) = 121 000 000 / 1.21.",
      ],
      explanation: "121 000 000 / 1.21 = 100 000 000 FCFA.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Lorsque deux projets concurrents sont mutuellement exclusifs et que le projet A a une VAN supérieure mais un TRI inférieur au projet B, quel projet devez-vous choisir ?",
        options: [
          "Le projet B car son TRI est plus élevé",
          "Le projet A car la VAN maximise la valeur actionnariale absolue en FCFA",
          "Aucun des deux projets",
          "Lancer un dé à jouer",
        ],
        correctIndex: 1,
        explanation: "La VAN est le critère financier absolu recommandé par la théorie financière moderne et les comités d'investissement.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C5_L2 : Coût du Capital (CMPC / WACC) & Rationnement Budgétaire
  // -------------------------------------------------------------------------
  C5_L2: {
    id: 'C5_L2',
    moduleId: 'MOD_C5_2',
    pathId: 'PATH_FINANCE',
    title: 'Coût du Capital (CMPC / WACC) & Rationnement Budgétaire',
    durationMinutes: 30,
    difficulty: 'Avancé',
    objectives: [
      "Calculer le Coût Moyen Pondéré du Capital (CMPC / WACC).",
      "Intégrer le bouclier fiscal des intérêts de la dette (IS 25% en Côte d'Ivoire).",
      "Sélectionner le portefeuille de projets optimal sous plafond budgétaire grâce à l'Indice de Profitabilité (IP).",
    ],
    theorySections: [
      {
        title: "1. La Formule du CMPC avec Déductibilité Fiscale",
        content: `Une entreprise finance ses projets avec un cocktail de capitaux propres (actionnaires) et de dettes bancaires :
$$\\text{CMPC} = \\left( \\frac{E}{E + D} \\times K_e \\right) + \\left( \\frac{D}{E + D} \\times K_d \\times (1 - T_{\\text{IS}}) \\right)$$
Où :
- $E$ = Capitaux propres, $D$ = Dettes financières.
- $K_e$ = Rentabilité exigée par les actionnaires (ex: 14%).
- $K_d$ = Taux d'intérêt bancaire brut (ex: 8%).
- $T_{\\text{IS}}$ = Taux de l'impôt sur les sociétés (25% en Côte d'Ivoire / zone UEMOA).`,
        syscohadaRef: "Code Général des Impôts de Côte d'Ivoire (Régime fiscal des charges financières).",
      },
      {
        title: "2. Le Rationnement de Capital par l'Indice de Profitabilité (IP)",
        content: `Si votre enveloppe d'investissement est plafonnée à 500M FCFA alors que vos équipes proposent pour 1,2 milliard de projets à VAN positive, comment choisir ?
On classe les projets par **Indice de Profitabilité décroissant** :
$$\\text{IP} = \\frac{\\text{Somme des Flux Actualisés}}{I_0} = 1 + \\frac{\\text{VAN}}{I_0}$$
L'IP mesure la rentabilité par franc CFA investi. On sélectionne les projets du haut vers le bas jusqu'à épuisement du budget.`,
        keyTakeaway: "La déductibilité fiscale de la dette réduit son coût net : un prêt à 8% ne coûte en réalité que 6% net d'impôt avec un IS à 25%.",
      },
    ],
    solvedExample: {
      context: "Structure financière : Fonds propres E = 60 000 000 FCFA (exigence 12%), Dettes D = 40 000 000 FCFA (taux 8%, IS 25%).",
      data: { E: 60000000, D: 40000000, Ke: 0.12, Kd: 0.08, IS: 0.25 },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer les pondérations",
          calculation: "Total = 100M FCFA. Poids des capitaux propres = 60%, Poids de la dette = 40%.",
          justification: "Part relative de chaque source de financement.",
        },
        {
          step: 2,
          action: "Calculer le coût net de la dette",
          calculation: "8% * (1 - 0.25) = 8% * 0.75 = 6.0%.",
          justification: "Grâce à l'économie d'IS, la dette revient à 6%.",
        },
        {
          step: 3,
          action: "Calculer le CMPC",
          calculation: "CMPC = (0.60 * 12%) + (0.40 * 6%) = 7.2% + 2.4% = 9.60%.",
          justification: "Le coût moyen du capital de l'entreprise est de 9.60%. Tout projet devra rapporter au moins 9.60% pour être viable.",
        },
      ],
    },
    exercise: {
      id: 'EX_C5_2',
      instruction: "Calculez l'Indice de Profitabilité (IP) d'un projet dont l'investissement initial est de 50 000 000 FCFA et qui dégage une VAN de 15 000 000 FCFA.",
      dataset: { i0: 50000000, van: 15000000 },
      expectedAnswer: 1.3,
      hints: [
        "Formule : IP = 1 + (VAN / I0).",
        "VAN / I0 = 15 000 000 / 50 000 000 = 0.30.",
        "IP = 1 + 0.30 = 1.30.",
      ],
      explanation: "IP = 1 + (15M / 50M) = 1.30 (chaque franc investi rapporte 1,30 FCFA en valeur actualisée).",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Pourquoi la dette bancaire a-t-elle généralement un coût inférieur à celui des capitaux propres ?",
        options: [
          "Parce que les prêteurs sont prioritaires en cas de liquidation et bénéficient d'un bouclier fiscal sur les intérêts",
          "Parce que les banques ne prêtent jamais d'argent",
          "Parce que les actionnaires ne demandent aucun dividende",
          "C'est une obligation fixée par la BCEAO",
        ],
        correctIndex: 0,
        explanation: "Le risque du créancier est inférieur à celui de l'actionnaire, et les intérêts sont déductibles de l'impôt sur les sociétés.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C6_L1 : Le Plan de Trésorerie Glissant 13 Semaines
  // -------------------------------------------------------------------------
  C6_L1: {
    id: 'C6_L1',
    moduleId: 'MOD_C6_1',
    pathId: 'PATH_TREASURY',
    title: 'Le Plan de Trésorerie Glissant 13 Semaines',
    durationMinutes: 30,
    difficulty: 'Intermédiaire',
    objectives: [
      "Construire un budget de trésorerie glissant semaine par semaine.",
      "Distinguer les montants TTC des montants HT pour les encaissements et décaissements.",
      "Détecter les impasses de fin de mois et caler les dates de règlement.",
    ],
    theorySections: [
      {
        title: "1. La Règle d'Or du Trésorier : Le TTC Impératif",
        content: `Contrairement au compte de résultat qui ne raisonne qu'en hors taxes (HT), **le plan de trésorerie ne manipule STRICTEMENT que des flux TTC réels** :
- Quand vous encaissez un client, vous encaissez le montant TTC avec la TVA.
- Quand vous payez un fournisseur ou versez les salaires et charges CNPS, vous décaissez le montant total TTC.
- Le 15 de chaque mois, vous décaissez le chèque de TVA nette reversée au fisc (TVA facturée moins TVA déductible).`,
      },
      {
        title: "2. Pourquoi 13 Semaines ?",
        content: `13 semaines correspondent exactement à un trimestre complet (91 jours). C'est l'horizon idéal :
- Suffisamment court pour être certain des échéances clients et fournisseurs.
- Suffisamment long pour anticiper un besoin de trésorerie et négocier une ligne de découvert bancaire ou un billet de trésorerie avant d'être au pied du mur.`,
        keyTakeaway: "Demander un découvert à son banquier quand le compte est déjà dans le rouge est un aveu d'imprévoyance ; l'anticiper 6 semaines à l'avance est une preuve de professionnalisme.",
      },
    ],
    solvedExample: {
      context: "Solde initial en banque au 1er mai = 15 000 000 FCFA. Encaissements clients prévus en semaine 1 = 20 000 000 FCFA TTC. Décaissements prévus (salaires + loyers) = 28 000 000 FCFA TTC.",
      data: { soldeInitial: 15000000, encaissements: 20000000, decaissements: 28000000 },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer le flux net de la semaine",
          calculation: "20 000 000 - 28 000 000 = -8 000 000 FCFA",
          justification: "Déficit opérationnel net de 8M FCFA sur la semaine.",
        },
        {
          step: 2,
          action: "Calculer le solde de fin de semaine",
          calculation: "15 000 000 - 8 000 000 = +7 000 000 FCFA",
          justification: "Le solde reste positif. Aucune autorisation de découvert n'est sollicitée.",
        },
      ],
    },
    exercise: {
      id: 'EX_C6_1',
      instruction: "Une entreprise démarre le mois avec 5 000 000 FCFA en banque. Elle encaisse 12 000 000 FCFA de règlements clients et paie 19 000 000 FCFA de dettes fournisseurs et salaires. Quel est son solde de clôture exact en FCFA (indiquez le signe négatif si débiteur) ?",
      dataset: { debut: 5000000, in: 12000000, out: 19000000 },
      expectedAnswer: -2000000,
      hints: [
        "Solde final = Solde initial + Encaissements - Décaissements.",
        "5 000 000 + 12 000 000 = 17 000 000 FCFA.",
        "17 000 000 - 19 000 000 = -2 000 000 FCFA.",
      ],
      explanation: "Solde final = 5 000 000 + 12 000 000 - 19 000 000 = -2 000 000 FCFA (découvert).",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Quelle somme enregistre-t-on dans le plan de trésorerie lors d'une vente de 10 000 000 FCFA HT soumise à la TVA de 18% ?",
        options: [
          "10 000 000 FCFA",
          "11 800 000 FCFA",
          "1 800 000 FCFA",
          "8 200 000 FCFA",
        ],
        correctIndex: 1,
        explanation: "Le plan de trésorerie enregistre les flux de cash réels décaissés et encaissés, donc toujours TTC (10M * 1.18 = 11.8M FCFA).",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C6_L2 : Stress Tests de Liquidité & Arbitrages Bancaires
  // -------------------------------------------------------------------------
  C6_L2: {
    id: 'C6_L2',
    moduleId: 'MOD_C6_2',
    pathId: 'PATH_TREASURY',
    title: 'Stress Tests de Liquidité & Arbitrages Bancaires',
    durationMinutes: 30,
    difficulty: 'Avancé',
    objectives: [
      "Simuler des scénarios de crise de liquidité (choc client, retard de paiement État).",
      "Calculer les agios bancaires sur découvert et le taux effectif global (TEG).",
      "Arbitrer entre découvert bancaire, escompte d'effets de commerce et affacturage.",
    ],
    theorySections: [
      {
        title: "1. Le Coût Caché du Découvert Bancaire",
        content: `Le découvert bancaire est la source de financement la plus chère pour une entreprise :
$$\\text{Agios} = \\frac{\\text{Montant du Découvert} \\times \\text{Taux Débiteur Annuel} \\times \\text{Nombre de Jours}}{360}$$
À cela s'ajoute la Commission de Plus Fort Découvert (CPFD) de 0.05% à 0.1% prélevée sur le pic maximal du mois.`,
      },
      {
        title: "2. Les Leviers de Résilience en Période de Crise",
        content: `Lorsqu'un stress test révèle une impasse de trésorerie :
1. **L'escompte d'effets :** Céder des traites clients à la banque avant échéance moyennant intérêt.
2. **L'affacturage (Factoring) :** Vendre ses factures à un factor qui avance 85% à 90% du montant sous 48h.
3. **Le rééchelonnement fournisseur :** Négocier un moratoire de 30 jours supplémentaires avant incident de paiement.`,
        keyTakeaway: "Un trésorier averti maintient toujours des lignes de crédit confirmées non utilisées comme airbag de sécurité.",
      },
    ],
    solvedExample: {
      context: "Découvert de 20 000 000 FCFA maintenu pendant 18 jours au taux débiteur de 12% l'an.",
      data: { montant: 20000000, jours: 18, taux: 0.12 },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer les agios d'intérêts",
          calculation: "(20 000 000 * 0.12 * 18) / 360 = 43 200 000 / 360 = 120 000 FCFA.",
          justification: "Le coût direct du découvert pour ces 18 jours est de 120 000 FCFA.",
        },
      ],
    },
    exercise: {
      id: 'EX_C6_2',
      instruction: "Calculez le montant des agios débiteurs pour un découvert bancaire de 10 000 000 FCFA utilisé pendant 36 jours au taux annuel de 10% (base 360 jours).",
      dataset: { m: 10000000, j: 36, t: 0.10 },
      expectedAnswer: 100000,
      hints: [
        "Formule : (Montant * Taux * Jours) / 360.",
        "(10 000 000 * 0.10 * 36) / 360 = 36 000 000 / 360.",
      ],
      explanation: "Agios = (10 000 000 * 0.10 * 36) / 360 = 100 000 FCFA.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Quelle technique permet d'encaisser immédiatement 85% d'une facture client sans attendre son échéance à 90 jours ?",
        options: ["L'affacturage (Factoring)", "L'augmentation de capital", "La dotation aux amortissements", "Le dividende"],
        correctIndex: 0,
        explanation: "L'affacturage permet de mobiliser les créances clients immédiatement auprès d'un établissement financier spécialisé.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C7_L1 : Finance du Courtage d'Assurance, Portefeuille & Code CIMA
  // -------------------------------------------------------------------------
  C7_L1: {
    id: 'C7_L1',
    moduleId: 'MOD_C7_1',
    pathId: 'PATH_INSURANCE',
    title: 'Finance du Courtage d\'Assurance, Portefeuille & Code CIMA',
    durationMinutes: 30,
    difficulty: 'Intermédiaire',
    objectives: [
      "Décomposer l'anatomie d'une quittance d'assurance : Prime Nette, Accessoires, Taxes et Prime Totale TTC.",
      "Calculer les commissions de courtage par branche (Santé, Auto, IARD, RC, Transport, Vie).",
      "Appliquer les règles conventionnelles du marché ivoirien et de la zone CIMA.",
    ],
    theorySections: [
      {
        title: "1. Modèle Économique : Comment gagne de l'argent un courtier ?",
        content: `Le courtier d'assurance est un intermédiaire indépendant mandaté par son client (l'assuré) pour négocier les meilleurs contrats auprès des compagnies d'assurance.
Sa rémunération principale est la **commission d'apport et de gestion**, calculée en pourcentage de la **Prime Nette** (hors taxes et accessoires) :

$$\\text{Commission Brute} = \\text{Prime Nette} \\times \\text{Taux de Commission}$$

Taux indicatifs usuels en zone CIMA (marché ivoirien) :
- Santé & Prévoyance : 10%
- Responsabilité Civile : 15%
- Flotte Automobile : 10% à 12%
- Incendie & IARD Entreprises : 15% à 20%
- Risques Maritimes & Transport : 10%`,
        syscohadaRef: "Code des Assurances CIMA (Conférence Interafricaine des Marchés d'Assurances).",
      },
      {
        title: "2. Anatomie d'une Quittance d'Assurance en Côte d'Ivoire",
        content: `Une quittance se décompose en 4 blocs :
1. **Prime Nette :** Le prix du risque calculé par la compagnie.
2. **Accessoires :** Frais de gestion de dossier facturés à l'assuré (soumis à commission pour le courtier selon les conventions).
3. **Taxe Unique sur les Contrats d'Assurance (TUA) :** Taux de **14.5%** en Côte d'Ivoire.
4. **Prime Totale TTC :** Montant total décaissé par le client :
$$\\text{Prime TTC} = (\\text{Prime Nette} + \\text{Accessoires}) \\times (1 + \\text{Taxe d'Assurance})$$`,
        keyTakeaway: "La commission du courtier se calcule EXCLUSIVEMENT sur la Prime Nette (et accessoires selon accords), JAMAIS sur la taxe fiscale !",
      },
    ],
    solvedExample: {
      context: "Émission d'une police d'assurance incendie industrielle pour la chocolaterie CEMOI à Abidjan : Prime Nette = 20 000 000 FCFA. Accessoires de police = 500 000 FCFA. Taux de commission convenu avec la compagnie Sanlam = 15%. Taxe d'assurance CI = 14.5%.",
      data: { primeNette: 20000000, accessoires: 500000, tauxCommission: 0.15, taxeTaux: 0.145 },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer la commission du cabinet de courtage",
          calculation: "20 000 000 * 15% = 3 000 000 FCFA",
          justification: "Le courtier percevra 3M FCFA d'honoraires de commission.",
        },
        {
          step: 2,
          action: "Calculer la taxe fiscale reversée au Trésor Public",
          calculation: "(20 000 000 + 500 000) * 14.5% = 20 500 000 * 0.145 = 2 972 500 FCFA",
          justification: "La taxe sur les assurances est reversée à la Direction Générale des Impôts (DGI).",
        },
        {
          step: 3,
          action: "Calculer la quittance totale TTC à payer par le client",
          calculation: "20 500 000 + 2 972 500 = 23 472 500 FCFA",
          justification: "Montant total réclamé à l'assuré.",
        },
      ],
    },
    exercise: {
      id: 'EX_C7_1',
      instruction: "Calculez la commission revenant au courtier pour une police d'assurance responsabilité civile dont la Prime Nette est de 8 000 000 FCFA, au taux de commission conventionnel de 15%.",
      dataset: { primeNette: 8000000, taux: 0.15 },
      expectedAnswer: 1200000,
      hints: [
        "Commission = Prime Nette * Taux de commission.",
        "8 000 000 * 0.15 = 1 200 000 FCFA.",
      ],
      explanation: "Commission = 8 000 000 * 15% = 1 200 000 FCFA.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Sur quelle assiette est calculée la commission du courtier d'assurance ?",
        options: [
          "Sur la Prime Totale TTC incluant les taxes",
          "Sur la Prime Nette hors taxes",
          "Uniquement sur les impôts d'assurance",
          "Sur le montant du capital assuré en cas de sinistre",
        ],
        correctIndex: 1,
        explanation: "La commission de courtage est assise sur la prime nette de taxes.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C7_L2 : Règle CIMA Article 13 & Rétention de Portefeuille
  // -------------------------------------------------------------------------
  C7_L2: {
    id: 'C7_L2',
    moduleId: 'MOD_C7_2',
    pathId: 'PATH_INSURANCE',
    title: 'Règle CIMA Article 13 & Rétention de Portefeuille',
    durationMinutes: 30,
    difficulty: 'Avancé',
    objectives: [
      "Comprendre et faire respecter l'Article 13 du Code CIMA : 'Pas de prime, pas de garantie'.",
      "Éviter les sanctions disciplinaires et pénales de la CRCA (Commission Régionale de Contrôle des Assurances).",
      "Calculer le taux de rétention d'un portefeuille et modéliser la rentabilité nette par compte.",
    ],
    theorySections: [
      {
        title: "1. L'Article 13 du Code CIMA : Une Règle d'Ordre Public Inviolable",
        content: `Avant la réforme de l'Article 13 CIMA, les courtiers délivraient des attestations d'assurance sans avoir encaissé la prime, créant des milliards d'impayés dans le secteur.
Depuis la réforme historique :
**La prise d'effet de la garantie est subordonnée au paiement préalable de la prime par le souscripteur.**

- L'assuré a **30 jours maximum** pour payer sa prime.
- À défaut de paiement dans les 30 jours, la police est suspendue de plein droit.
- Si un sinistre survient alors que la prime n'a pas été encaissée, la compagnie d'assurance applique la déchéance et refuse d'indemniser ! La responsabilité civile professionnelle du courtier est alors engagée.`,
        syscohadaRef: "Code CIMA révisé, Article 13 (Dispositions générales sur le paiement de la prime).",
      },
      {
        title: "2. La Rentabilité Nette par Compte Client",
        content: `Un client qui génère 1 000 000 FCFA de commissions semble rentable.
Mais si ce client déclare 15 sinistres par an et exige 120 heures d'intervention de vos chargés de compte (coût interne de gestion = 15 000 FCFA/heure, soit 1 800 000 FCFA de charge) :
$$\\text{Marge Nette} = 1\\,000\\,000 - 1\\,800\\,000 = -800\\,000\\text{ FCFA}$$
Ce client détruit de la valeur ! Le courtier doit soit revaloriser ses honoraires, soit résilier le contrat.`,
        keyTakeaway: "Un gros portefeuille n'est pas synonyme de profit : analysez toujours la sinistralité et le coût de gestion par client.",
      },
    ],
    solvedExample: {
      context: "Compte client Transporteur SOTRA : Prime nette annuelle = 50 000 000 FCFA (Commission 10% = 5 000 000 FCFA). Temps passé en gestion des sinistres = 400 heures à 15 000 FCFA/h.",
      data: { comm: 5000000, heures: 400, tauxHoraire: 15000 },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer le coût de gestion interne",
          calculation: "400 h * 15 000 FCFA/h = 6 000 000 FCFA",
          justification: "Le coût de traitement des dossiers de sinistres s'élève à 6M FCFA.",
        },
        {
          step: 2,
          action: "Calculer la marge nette du compte",
          calculation: "5 000 000 - 6 000 000 = -1 000 000 FCFA",
          justification: "Ce compte est déficitaire de 1M FCFA. Une renégociation tarifaire s'impose.",
        },
      ],
    },
    exercise: {
      id: 'EX_C7_2',
      instruction: "Un cabinet de courtage gérait 200 polices au 1er janvier. Au cours de l'année, 170 polices ont été renouvelées et 30 ont résilié (churn). Calculez le taux de rétention du cabinet en pourcentage (%).",
      dataset: { total: 200, renouvele: 170 },
      expectedAnswer: 85,
      hints: [
        "Taux de rétention = (Polices renouvelées / Total initial) * 100.",
        "(170 / 200) * 100 = 0.85 * 100 = 85%.",
      ],
      explanation: "Taux de rétention = (170 / 200) * 100 = 85%.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Que risque un courtier d'assurance qui délivre une attestation automobile sans avoir encaissé la prime auprès du client (violation Art. 13 CIMA) ?",
        options: [
          "Une prime bonus de la compagnie d'assurance",
          "Des sanctions disciplinaires de la CRCA, le retrait d'agrément et sa responsabilité financière personnelle en cas d'accident non couvert",
          "Une réduction de ses impôts",
          "Aucun risque légal",
        ],
        correctIndex: 1,
        explanation: "La violation de l'Article 13 expose le courtier au retrait d'agrément ministériel et au paiement des sinistres sur ses fonds propres.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C8_L1 : Consolidation & Élimination des Opérations Réciproques
  // -------------------------------------------------------------------------
  C8_L1: {
    id: 'C8_L1',
    moduleId: 'MOD_C8_1',
    pathId: 'PATH_CONSOLIDATION',
    title: 'Consolidation & Élimination des Opérations Réciproques',
    durationMinutes: 30,
    difficulty: 'Avancé',
    objectives: [
      "Définir le périmètre de consolidation et choisir la méthode (Intégration Globale).",
      "Éliminer symétriquement les créances et dettes intra-groupe.",
      "Neutraliser les ventes internes et marges en stock sans fausser l'équilibre bilanciel.",
    ],
    theorySections: [
      {
        title: "1. L'Analogie : On ne peut pas se vendre à soi-même !",
        content: `Imaginez que vous preniez 10 000 FCFA de votre poche gauche pour les mettre dans votre poche droite.
Avez-vous réalisé un chiffre d'affaires ? Non. Votre patrimoine global n'a pas augmenté d'un centime.

Dans un groupe d'entreprises :
- Si la maison-mère à Abidjan vend pour 50 000 000 FCFA de marchandises à sa filiale de Dakar, au niveau consolidé, il n'y a pas eu de vente à un tiers extérieur.
- **La consolidation consiste à effacer toutes les opérations internes pour ne présenter aux investisseurs que les transactions réelles réalisées avec le monde extérieur.**`,
      },
      {
        title: "2. Les Éliminations Bilancielles",
        content: `Pour chaque vente interne non encore payée :
- La filiale A a une créance client (Débit 411).
- La filiale B a une dette fournisseur (Crédit 401).
- En consolidation, on passe l'écriture :
  - **Débit 401 (Dette fournisseur groupe)**
  - **Crédit 411 (Créance client groupe)**
L'équilibre bilanciel reste parfait car actif et passif diminuent du même montant exact.`,
        keyTakeaway: "Ne jamais consolider des comptes sans avoir préalablement fait signer un protocole de réconciliation réciproque des soldes entre les comptables des deux filiales.",
      },
    ],
    solvedExample: {
      context: "Holding Abidjan détient une créance de 30 000 000 FCFA sur Filiale Dakar. Filiale Dakar a enregistré une dette de 30 000 000 FCFA envers la Holding.",
      data: { montantReciproque: 30000000 },
      stepByStepSolution: [
        {
          step: 1,
          action: "Identifier les comptes réciproques",
          justification: "Créances intra-groupe = 30M FCFA à l'actif. Dettes intra-groupe = 30M FCFA au passif.",
        },
        {
          step: 2,
          action: "Passer l'écriture d'élimination",
          calculation: "Débit Dettes (30 000 000 FCFA) ; Crédit Créances (30 000 000 FCFA)",
          justification: "Les flux internes sont neutralisés à zéro. Le bilan consolidé n'affiche aucune créance fictive.",
        },
      ],
    },
    exercise: {
      id: 'EX_C8_1',
      instruction: "Holding Abidjan vend 40 000 000 FCFA de services à sa filiale de Bamako. La filiale de Bamako a vendu pour 100 000 000 FCFA de marchandises à des clients extérieurs et la Holding a vendu pour 200 000 000 FCFA à des clients extérieurs. Quel est le Chiffre d'Affaires consolidé exact du groupe en FCFA ?",
      dataset: { caExtH: 200000000, caExtF: 100000000, intra: 40000000 },
      expectedAnswer: 300000000,
      hints: [
        "Additionnez les chiffres d'affaires bruts : 200M + 100M + 40M = 340M FCFA.",
        "Éliminez la vente interne intra-groupe de 40M FCFA.",
        "CA Consolidé = 340M - 40M = 300M FCFA.",
      ],
      explanation: "Le CA consolidé ne retient que les ventes à des tiers extérieurs : 200M + 100M = 300 000 000 FCFA.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Pourquoi élimine-t-on les opérations intra-groupe lors de la consolidation ?",
        options: [
          "Pour éviter de gonfler artificiellement le chiffre d'affaires et la taille du bilan avec des opérations internes",
          "Pour payer moins d'impôts de façon illégale",
          "Pour simplifier le travail de l'expert-comptable",
          "C'est une option facultative que l'on n'applique jamais",
        ],
        correctIndex: 0,
        explanation: "La consolidation doit présenter l'image fidèle du groupe comme s'il ne formait qu'une seule et même entreprise face aux tiers.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // C8_L2 : Conversion Multi-Devises (IAS 21) & Intérêts Minoritaires
  // -------------------------------------------------------------------------
  C8_L2: {
    id: 'C8_L2',
    moduleId: 'MOD_C8_2',
    pathId: 'PATH_CONSOLIDATION',
    title: 'Conversion Multi-Devises (IAS 21) & Intérêts Minoritaires',
    durationMinutes: 30,
    difficulty: 'Avancé',
    objectives: [
      "Appliquer la norme IAS 21 pour convertir les comptes d'une filiale étrangère en monnaie de consolidation (XOF).",
      "Calculer l'écart de conversion et l'imputer en réserves consolidées.",
      "Isoler les intérêts minoritaires (Part des tiers) au passif et au compte de résultat.",
    ],
    theorySections: [
      {
        title: "1. La Règle de Conversion IAS 21 (Méthode du Cours de Clôture)",
        content: `Lorsqu'une holding basée à Abidjan (monnaie fonctionnelle FCFA / XOF) possède une filiale en France ou aux États-Unis :
- **Tous les postes de l'Actif et du Passif** sont convertis au **cours de clôture** au 31 décembre.
- **Tous les postes du Compte de Résultat** (produits et charges) sont convertis au **cours moyen** de l'année.

La différence mathématique entre la conversion du bilan et celle du résultat net s'appelle l'**Écart de conversion**. Il est inscrit directement dans les capitaux propres consolidés (Réserve de conversion) sans affecter le résultat net.`,
        syscohadaRef: "Norme comptable internationale IAS 21 & Règles de consolidation SYSCOHADA.",
      },
      {
        title: "2. Les Intérêts Minoritaires",
        content: `Si la holding détient **80%** du capital de sa filiale de Dakar, les 20% restants appartiennent à d'autres actionnaires locaux.
En intégration globale :
- On intègre 100% des actifs, passifs, ventes et charges de la filiale.
- Au bilan, on crée une ligne de passif : **Intérêts minoritaires (20% des capitaux propres)**.
- Au compte de résultat, on scinde le bénéfice net : **Part du Groupe (80%)** et **Part des minoritaires (20%)**.`,
        keyTakeaway: "Les intérêts minoritaires ne sont pas une dette : ce sont des capitaux propres appartenant aux associés extérieurs au groupe.",
      },
    ],
    solvedExample: {
      context: "Filiale sénégalaise détenue à 80% par la holding ivoirienne. Capitaux propres de la filiale = 100 000 000 FCFA. Résultat net de l'année = 25 000 000 FCFA.",
      data: { partDetention: 0.80, cp: 100000000, rn: 25000000 },
      stepByStepSolution: [
        {
          step: 1,
          action: "Calculer les intérêts minoritaires au bilan",
          calculation: "100 000 000 * 20% = 20 000 000 FCFA",
          justification: "20M FCFA de fonds propres reviennent aux actionnaires minoritaires.",
        },
        {
          step: 2,
          action: "Calculer la part du groupe sur le résultat",
          calculation: "25 000 000 * 80% = 20 000 000 FCFA",
          justification: "Le résultat net consolidé part du groupe est de 20M FCFA ; la part des minoritaires est de 5M FCFA.",
        },
      ],
    },
    exercise: {
      id: 'EX_C8_2',
      instruction: "Une holding d'Abidjan détient 75% d'une filiale à Cotonou dont les capitaux propres s'élèvent à 80 000 000 FCFA. Quel montant exact figure au passif du bilan consolidé sous la ligne 'Intérêts Minoritaires' en FCFA ?",
      dataset: { detention: 0.75, cp: 80000000 },
      expectedAnswer: 20000000,
      hints: [
        "Part minoritaire = 100% - 75% = 25%.",
        "80 000 000 * 25% = 20 000 000 FCFA.",
      ],
      explanation: "Intérêts minoritaires = 80 000 000 * 25% = 20 000 000 FCFA.",
      rubricPoints: 10,
    },
    quiz: [
      {
        question: "Selon la norme IAS 21, à quel cours de change convertit-on les postes de bilan (hors capitaux propres) d'une filiale étrangère ?",
        options: [
          "Au cours de clôture à la date d'arrêté des comptes (31 décembre)",
          "Au cours moyen annuel",
          "Au cours historique du jour de création de la société",
          "Au cours le plus favorable fixé par le directeur financier",
        ],
        correctIndex: 0,
        explanation: "L'actif et le passif sont convertis au cours de clôture en vigueur à la date du bilan.",
      },
    ],
  },
};
