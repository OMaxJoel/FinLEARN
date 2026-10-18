import { LearningPath360, CompetencyRef, CompletenessReport } from '../types/pedagogy360';
import { expandPilotPath } from './curriculum/pilotExpansion';

// ============================================================================
// RÉFÉRENTIEL DES COMPÉTENCES MÉTIER (FINANCE & GESTION OHADA / UEMOA / CIMA)
// ============================================================================

export const MASTER_COMPETENCIES_360: CompetencyRef[] = [
  {
    code: 'COMPT-SYSCOHADA',
    domain: 'comptabilite',
    title: 'Comptabilité Générale & Clôture SYSCOHADA Révisé',
    description: 'Enregistrement en partie double, grand livre, balance à 6 colonnes, amortissements, régularisations et liasse fiscale.',
    requiredScorePercent: 75,
    subCompetencies: [
      'Équation bilancielle (Actif = Passif)',
      'Écritures d\'achats, ventes, TVA et trésorerie',
      'Contrôle et lettrage de balance',
      'Opérations d\'inventaire et régularisations',
      'Établissement du bilan et compte de résultat SYSCOHADA',
    ],
  },
  {
    code: 'ANAL-DIAGNOSTIC',
    domain: 'finance',
    title: 'Analyse Financière & Diagnostic d\'Entreprise',
    description: 'Calcul du FRNG, BFR d\'exploitation, trésorerie nette, SIG, ratios de rentabilité et notation de crédit.',
    requiredScorePercent: 75,
    subCompetencies: [
      'Bilan fonctionnel et équilibre financier',
      'Calcul des délais de rotation (DSO, DPO, DIO)',
      'Soldes Intermédiaires de Gestion (EBE, VA, RE)',
      'Rentabilité économique (ROA) et financière (ROE) avec effet de levier',
      'Rédaction d\'une note exécutive au comité de crédit',
    ],
  },
  {
    code: 'TRES-PREVISION',
    domain: 'tresorerie',
    title: 'Gestion & Prévision de Trésorerie Opérationnelle',
    description: 'Plan de trésorerie glissant 13 semaines, stress tests de liquidité, optimisation des encaissements et arbitrages bancaires.',
    requiredScorePercent: 75,
    subCompetencies: [
      'Établissement du budget de trésorerie mensuel et hebdomadaire',
      'Stress testing sur retards clients et hausses des coûts',
      'Gestion des découverts et facilités de caisse',
      'Rapprochement bancaire et arbitrage de placement',
    ],
  },
  {
    code: 'CTRL-PERFORMANCE',
    domain: 'controle',
    title: 'Contrôle de Gestion & Pilotage des Marges',
    description: 'Seuil de rentabilité, point mort en jours, marge sur coût variable, budget flexible et analyse des écarts Volume/Prix/Coût.',
    requiredScorePercent: 75,
    subCompetencies: [
      'Ventilation des charges fixes et variables',
      'Point mort en valeur (FCFA) et en jours de chiffre d\'affaires',
      'Budget flexible et analyse des variances',
      'Mesure des rentabilités par ligne de produits',
    ],
  },
  {
    code: 'EXCEL-MODELING',
    domain: 'excel',
    title: 'Modélisation Financière Avancée sur Tableur',
    description: 'Références absolues ($), formules de recherche (RECHERCHEX, INDEX/EQUIV), Tableaux Croisés Dynamiques et audit sans constantes en dur.',
    requiredScorePercent: 80,
    subCompetencies: [
      'Architecture de modèle propre (saisie / calculs / restitution)',
      'Formules matricielles et tests logiques imbriqués',
      'Tableaux croisés dynamiques avec champs calculés',
      'Audit de formules et traçabilité des antécédents',
    ],
  },
  {
    code: 'FIN-INVEST',
    domain: 'finance',
    title: 'Choix d\'Investissement & Décisions Stratégiques',
    description: 'Actualisation des flux de trésorerie nets (Cash Flows), calcul du CMPC/WACC, VAN, TRI, Indice de Profitabilité et rationnement du capital.',
    requiredScorePercent: 75,
    subCompetencies: [
      'Estimation des flux de trésorerie disponibles (FCFF)',
      'Calcul du coût moyen pondéré du capital (CMPC)',
      'Arbitrage VAN / TRI sous contrainte de budget',
      'Sensibilité aux hypothèses macroéconomiques',
    ],
  },
  {
    code: 'ASSUR-CIMA',
    domain: 'assurance',
    title: 'Droit & Technique des Assurances Code CIMA',
    description: 'Réglementation de l\'Article 13, calcul des primes pures et commerciales, liquidation des sinistres avec franchise et RPC (Art. 35), solvabilité CRCA.',
    requiredScorePercent: 75,
    subCompetencies: [
      'Application de l\'Article 13 "Pas de prime, pas de garantie"',
      'Tarification actuarielle des primes et taxes',
      'Règle proportionnelle de capitaux (RPC Art. 35) et franchises',
      'Comptabilité d\'agence, commissions et reversements compagnies',
      'Calcul du ratio S/P et provisions pour sinistres à payer (PSAP)',
    ],
  },
  {
    code: 'CONSO-GROUPE',
    domain: 'consolidation',
    title: 'Consolidation des Comptes & Reporting Groupe SYSCOHADA / IFRS',
    description: 'Périmètre de consolidation, pourcentages d\'intérêt et contrôle, intégration globale, élimination des opérations réciproques, profits internes, Goodwill et devises.',
    requiredScorePercent: 75,
    subCompetencies: [
      'Périmètre de consolidation et typologie de contrôle',
      'Retraitements d\'homogénéisation et impôts différés (25%)',
      'Élimination des opérations réciproques sans marge et dividendes internes',
      'Neutralisation des marges internes en stock et sur immobilisations',
      'Calcul du Goodwill et test de dépréciation annuelle',
      'Partage des capitaux propres et droits des minoritaires',
      'Conversion des filiales hors zone CFA (cours de clôture)',
    ],
  },
];

// ============================================================================
// PARCOURS PILOTE COMPLET 360° : DEVENIR ANALYSTE FINANCIER CERTIFIÉ
// 10 Niveaux, 10 Modules, Chapitres détaillés, Leçons conformes aux 26 critères
// ============================================================================

const PILOT_FINANCIAL_ANALYST_BASE: LearningPath360 = {
  id: 'PATH_FIN_ANALYST_360',
  domainId: 'finance',
  title: 'Devenir Analyste Financier d\'Entreprise 360°',
  tagline: 'Programme professionnel intégral : des fondations comptables au diagnostic d\'entreprise, prévisions et recommandations au comité exécutif',
  description: 'Un parcours pilote de 10 modules progressifs, construit autour de cas pédagogiques fictifs et chiffrés en FCFA. Les leçons associent théorie, exemples résolus, exercices de transfert, ateliers métier et évaluations de module. Le projet final est défini comme sujet de synthèse ; sa soumission et sa notation formateur ne sont pas encore intégrées.',
  targetRole: 'Analyste Financier Senior / Contrôleur Financier / Chargé d\'Affaires Entreprises',
  levelBadge: 'Parcours pilote audité · 10 modules',
  color: 'blue',
  iconName: 'TrendingUp',
  version: '2.4.0',
  status: 'published',
  estimatedHours: 65,
  prerequisites: [
    'Notions de base en arithmétique et pourcentages',
    'Familiarité générale avec l\'environnement de l\'entreprise',
    'Aucune compétence comptable préalable requise pour débuter au Niveau 1',
  ],
  competenciesTargeted: [
    'COMPT-SYSCOHADA',
    'ANAL-DIAGNOSTIC',
    'TRES-PREVISION',
    'CTRL-PERFORMANCE',
    'EXCEL-MODELING',
    'FIN-INVEST',
  ],
  initialDiagnosticId: 'DIAG_FIN_01',
  completenessScore: 100,

  // ==========================================================================
  // LES 10 NIVEAUX DU PARCOURS
  // ==========================================================================
  levels: [
    // ------------------------------------------------------------------------
    // NIVEAU 1 : FONDAMENTAUX COMPTABLES ET ÉCRITURES (SYSCOHADA)
    // ------------------------------------------------------------------------
    {
      id: 'NIV_1',
      pathId: 'PATH_FIN_ANALYST_360',
      levelNumber: 1,
      title: 'Niveau 1 : Fondamentaux Comptables & Partie Double',
      description: 'Comprendre la structure du patrimoine, l\'équation fondamentale du bilan et maîtriser les écritures opérationnelles selon le Système Comptable OHADA révisé.',
      targetMastery: 'Capacité à imputer des opérations commerciales et bancaires sans erreur et comprendre leur impact sur le bilan.',
      modules: [
        {
          id: 'MOD_N1_M1',
          levelId: 'NIV_1',
          pathId: 'PATH_FIN_ANALYST_360',
          moduleNumber: 1,
          title: 'Module 1 : L\'Équation Comptable, Débit/Crédit et Flux Réels',
          description: 'Démystifier le mécanisme de la partie double et analyser le cycle achat-stock-vente-règlement.',
          competencyCodes: ['COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'CHAP_N1_M1_C1',
              moduleId: 'MOD_N1_M1',
              title: 'Chapitre 1 : L\'Équilibre Patrimonial et les Flux d\'Exploitation',
              description: 'Pourquoi l\'Actif égale toujours le Passif et comment circule la monnaie dans l\'entreprise.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_N1_M1_01',
                  chapterId: 'CHAP_N1_M1_C1',
                  moduleId: 'MOD_N1_M1',
                  pathId: 'PATH_FIN_ANALYST_360',
                  title: 'Leçon 1 : L\'Équation Fondamentale du Bilan et la Logique Débit/Crédit',
                  durationMinutes: 45,
                  difficulty: 'Débutant',
                  objectives: [
                    'Comprendre l\'équation bilancielle Actif = Passif (Emplois = Ressources).',
                    'Maîtriser le sens du Débit (destination/emploi) et du Crédit (origine/ressource).',
                    'Distinguer les flux de patrimoine (bilan) des flux d\'enrichissement/appauvrissement (résultat).',
                    'Savoir enregistrer une opération commerciale complète sous SYSCOHADA.',
                  ],
                  prerequisites: ['Aucun prérequis technique nécessaire.'],
                  contextIntro: 'Dans l\'espace OHADA (17 pays dont la Côte d\'Ivoire, le Sénégal, le Cameroun), chaque entreprise doit tenir une comptabilité sincère et régulière selon le SYSCOHADA Révisé. Comprendre la comptabilité n\'est pas mémoriser des numéros de compte : c\'est savoir retracer chaque flux économique de l\'entreprise.',
                  theorySections: [
                    {
                      title: '1. L\'Équation Fondamentale du Patrimoine',
                      content: 'Le bilan est la photographie du patrimoine de l\'entreprise à un instant donné. L\'Actif représente TOUT ce que l\'entreprise POSSÈDE et UTILISE (ses emplois : immobilisations, stocks, créances clients, trésorerie). Le Passif représente TOUT ce que l\'entreprise DOIT et comment ses actifs ont été FINANCÉS (ses ressources : capitaux propres des actionnaires, dettes bancaires, dettes fournisseurs). Par construction logique absolue : ACTIF = PASSIF.',
                      keyDefinitions: [
                        { term: 'Actif', definition: 'Ensemble des éléments du patrimoine ayant une valeur économique positive pour l\'entité (emplois durables et circulants).' },
                        { term: 'Passif', definition: 'Ensemble des obligations de l\'entité envers des tiers et des associés représentant les ressources financières mobilisées.' },
                        { term: 'Partie Double', definition: 'Principe universel stipulant que toute opération comptable affecte au moins deux comptes, avec un montant débité égal au montant crédité.' },
                      ],
                      rulesAndPrinciples: [
                        'Principe de la partie double : Total Débits = Total Crédits pour toute écriture.',
                        'Un compte d\'Actif augmente au Débit et diminue au Crédit.',
                        'Un compte de Passif augmente au Crédit et diminue au Débit.',
                        'Un compte de Charge (classe 6) augmente au Débit (appauvrissement économique).',
                        'Un compte de Produit (classe 7) augmente au Crédit (enrichissement économique).',
                      ],
                      formulas: [
                        {
                          name: 'Équilibre Bilanciel',
                          formula: 'Actif Immobilisé + Actif Circulant + Trésorerie-Actif = Capitaux Propres + Dettes Financières + Passif Circulant + Trésorerie-Passif',
                          interpretation: 'Tout ce qui est possédé (Emplois) doit trouver son origine exacte dans un financement (Ressources).',
                          syscohadaRef: 'Acte Uniforme relatif au Droit Comptable et à l\'Information Financière (AUDCIF) - Art. 14 à 19',
                        },
                      ],
                      commonMistakes: [
                        'Confondre le débit bancaire du relevé (point de vue de la banque) et le compte 521 Banque dans sa comptabilité (qui est un actif augmentant au débit).',
                        'Penser qu\'un achat réglé comptant est à la fois une charge et une dette : c\'est une charge au débit et une diminution de trésorerie au crédit.',
                        'Oublier d\'équilibrer la TVA récupérable ou facturée.',
                      ],
                      professionalBestPractices: [
                        'Toujours identifier d\'abord la Ressource (d\'où vient l\'argent ou l\'engagement ? -> Crédit) avant l\'Emploi (où va l\'argent ? -> Débit).',
                        'Vérifier l\'existence d\'une pièce justificative légale (facture conforme, bordereau bancaire) avant toute imputation.',
                      ],
                      memorizationTips: [
                        'Mnémonique D-E-C-R : Débit = Emploi, Crédit = Ressource.',
                        'Pour la trésorerie : l\'argent qui RENTRE arrive au DÉBIT de la caisse/banque.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Apport de capital initial en espèces',
                    scenario: 'Création d\'une SARL à Abidjan avec un apport des associés de 10 000 000 FCFA déposé sur un compte bancaire.',
                    dataset: { montant: 10000000, compteDebit: '521 Banque', compteCredit: '101 Capital social' },
                    stepByStepSolution: [
                      { step: 1, action: 'Identifier la ressource', calculation: 'Crédit compte 101 pour 10 000 000 FCFA', justification: 'Le capital social constitue la ressource initiale apportée par les actionnaires (Passif).' },
                      { step: 2, action: 'Identifier l\'emploi', calculation: 'Débit compte 521 pour 10 000 000 FCFA', justification: 'L\'argent est disponible sur le compte bancaire de la société (Actif).' },
                      { step: 3, action: 'Contrôle d\'égalité', calculation: '10 000 000 Débit = 10 000 000 Crédit', justification: 'La balance de l\'écriture est rigoureusement nulle.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Achat de marchandises à crédit avec TVA',
                    scenario: 'Achat de 5 000 000 FCFA HT de marchandises avec TVA 18% (900 000 FCFA), règlement prévu à 60 jours.',
                    dataset: { montantHT: 5000000, tvaTaux: 0.18, tvaMontant: 900000, montantTTC: 5900000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Constater la charge HT', calculation: 'Débit 601 Achats de marchandises : 5 000 000 FCFA', justification: 'Charge d\'exploitation consommée.' },
                      { step: 2, action: 'Constater la créance fiscale', calculation: 'Débit 4452 État, TVA récupérable sur achats : 900 000 FCFA', justification: 'La TVA payée aux fournisseurs est déductible de la TVA collectée.' },
                      { step: 3, action: 'Constater la dette fournisseur', calculation: 'Crédit 401 Fournisseurs : 5 900 000 FCFA', justification: 'L\'entreprise a une obligation de paiement envers le tiers à l\'échéance.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Société Ivoirienne de Négoce et Distribution (SIND SARL)',
                    locationContext: 'Abidjan, Zone Industrielle Treichville - PME Agro-alimentaire',
                    sector: 'Distribution de denrées',
                    currency: 'FCFA',
                    problemStatement: 'SIND SARL a réalisé 45 000 000 FCFA d\'achats HT au cours du mois de mars. Le comptable débutant a omis d\'enregistrer la TVA récupérable au débit et a crédité directement la banque au lieu du compte fournisseur, faussant l\'état de rapprochement bancaire de 53 100 000 FCFA.',
                    financialStatements: {
                      chiffreAffairesMensuel: 68000000,
                      achatsHT: 45000000,
                      tvaRecuperable: 8100000,
                      totalTTCFacture: 53100000,
                      soldeBanqueReel: 14200000,
                      soldeBanqueComptabiliseErrone: -38900000,
                    },
                    realWorldResolution: 'Extourne de l\'écriture erronée, réimputation au débit de 601 (45 000 000) et 4452 (8 100 000), et contrepartie au crédit du compte 401 Fournisseurs. La banque retrouve son solde réel positif de 14 200 000 FCFA.',
                    recommendationToBoard: 'Mettre en place une procédure de visa des factures fournisseurs et un rapprochement hebdomadaire pour éviter tout rejet bancaire injustifié.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_N1_L1',
                    title: 'Exercice Guidé : Enregistrement d\'une vente de services à crédit',
                    instruction: 'La société Ivoire Conseil facture à un client une prestation de conseil pour 2 000 000 FCFA HT. Le taux de TVA en vigueur est de 18%. Calculez le montant TTC imputé au compte 411 Clients.',
                    dataset: { montantHT: 2000000, tauxTVA: 0.18 },
                    stepByStepHelp: [
                      '1. Calculez le montant de la TVA : Montant HT * 0.18 = 360 000 FCFA.',
                      '2. Additionnez le montant HT et la TVA : 2 000 000 + 360 000 = 2 360 000 FCFA.',
                      '3. Le compte 411 Clients est débité du montant TTC dû par le client.',
                    ],
                    expectedAnswer: 2360000,
                    detailedCorrection: 'Le montant TTC imputé au compte 411 Clients est de 2 360 000 FCFA (2 000 000 FCFA HT + 360 000 FCFA de TVA collectée au compte 4431).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_N1_L1',
                    title: 'Exercice Autonome : Règlement d\'une dette fournisseur avec escompte de règlement',
                    instruction: 'Vous réglez par virement bancaire une facture fournisseur de 1 180 000 FCFA TTC. Le fournisseur vous accorde un escompte de règlement de 2% sur le TTC pour paiement sous 8 jours, soit un escompte financier de 23 600 FCFA. Quel est le montant exact décaissé au compte 521 Banque (en FCFA) ?',
                    dataset: { montantFactureTTC: 1180000, escompteFCFA: 23600 },
                    hints: [
                      'L\'escompte diminue le montant effectivement versé au fournisseur.',
                      'Montant décaissé = Facture TTC - Escompte accordé.',
                    ],
                    expectedAnswer: 1156400,
                    detailedCorrection: 'Montant décaissé = 1 180 000 - 23 600 = 1 156 400 FCFA. Au journal : Débit 401 Fournisseurs (1 180 000), Crédit 773 Escomptes obtenus (23 600), Crédit 521 Banque (1 156 400). L\'égalité Débit/Crédit est respectée.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_N1_L1_SIM',
                    title: 'Atelier Pratique : Saisie et Équilibrage au Journal SYSCOHADA',
                    type: 'simulator',
                    targetComponentId: 'accounting_simulator',
                    presetConfig: {
                      operationType: 'VENTE_SERVICES',
                      montantHT: 2500000,
                      tauxTVA: 0.18,
                    },
                    completionCriteria: {
                      metric: 'journal_balance_variance',
                      targetValue: 0,
                      description: 'Enregistrer l\'écriture complète au journal sans écart entre le total débit et crédit.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_N1_L1_1',
                      question: 'Dans le bilan comptable, où figure un emprunt bancaire contracté à 5 ans ?',
                      options: [
                        'À l\'Actif immobilisé',
                        'Au Passif (Ressources stables / Dettes financières)',
                        'Au Débit du compte de résultat',
                        'En Trésorerie-Actif',
                      ],
                      correctIndex: 1,
                      explanation: 'Un emprunt bancaire est une ressource financière externe due à un tiers prêteur : il figure au Passif du bilan (classe 16 en SYSCOHADA).',
                    },
                    {
                      id: 'Q_N1_L1_2',
                      question: 'Quelle est la conséquence directe d\'un achat de fournitures de bureau payé en espèces ?',
                      options: [
                        'Augmentation de l\'Actif et augmentation du Passif',
                        'Augmentation des charges (classe 6) et diminution de la Trésorerie-Actif (compte 571 Caisse)',
                        'Augmentation du capital social',
                        'Aucune incidence sur les états financiers',
                      ],
                      correctIndex: 1,
                      explanation: 'L\'achat est une charge consommée (Débit 605/608) et le paiement diminue les disponibilités liquides (Crédit 571 Caisse).',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'Actif recense les Emplois (ce que l\'entreprise possède), le Passif recense les Ressources (comment c\'est financé).',
                    'La partie double impose Total Débit = Total Crédit pour chaque écriture comptable.',
                    'Les comptes de charges (classe 6) et d\'actif augmentent au débit ; les comptes de produits (classe 7) et de passif augmentent au crédit.',
                    'La TVA n\'est ni une charge ni un produit pour l\'assujetti : c\'est une dette (TVA collectée) ou une créance (TVA récupérable) envers l\'État.',
                  ],
                  nextStepRecommendation: 'Passez à la Leçon 2 pour découvrir la mécanique de la balance générale à 6 colonnes et le grand livre.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_MOD_N1_M1',
            moduleId: 'MOD_N1_M1',
            title: 'Évaluation Certifiante du Module 1 : Maîtrise de la Partie Double',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_1',
                question: 'Une entreprise achète un véhicule de livraison pour 15 000 000 FCFA HT payé par emprunt bancaire. Quel est l\'impact sur le total du bilan ?',
                options: [
                  'Le bilan reste inchangé',
                  'Le total du bilan augmente de 15 000 000 FCFA (augmentation d\'actif immobilisé et augmentation de dette financière)',
                  'Le total du bilan diminue de 15 000 000 FCFA',
                  'Le compte de résultat subit une perte immédiate de 15 000 000 FCFA',
                ],
                correctIndex: 1,
                explanation: 'L\'acquisition d\'une immobilisation financée par dette augmente simultanément l\'actif immobilisé (compte 245) et le passif (compte 162). Le résultat n\'est pas impacté à la date d\'achat.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 2 : ANALYSE DES ÉTATS FINANCIERS & ÉQUILIBRE FONCTIONNEL
    // ------------------------------------------------------------------------
    {
      id: 'NIV_2',
      pathId: 'PATH_FIN_ANALYST_360',
      levelNumber: 2,
      title: 'Niveau 2 : Analyse des États Financiers & Bilan Fonctionnel',
      description: 'Retraiter le bilan comptable en bilan fonctionnel, calculer le FRNG, le BFR et la Trésorerie Nette.',
      targetMastery: 'Évaluer la santé financière structurelle d\'une entreprise et porter un diagnostic sur son autonomie financière.',
      modules: [
        {
          id: 'MOD_N2_M2',
          levelId: 'NIV_2',
          pathId: 'PATH_FIN_ANALYST_360',
          moduleNumber: 2,
          title: 'Module 2 : FRNG, BFR d\'Exploitation et Trésorerie Nette',
          description: 'L\'équation d\'équilibre financier universelle : TN = FRNG - BFR.',
          competencyCodes: ['ANAL-DIAGNOSTIC'],
          durationHours: 7,
          chapters: [
            {
              id: 'CHAP_N2_M2_C1',
              moduleId: 'MOD_N2_M2',
              title: 'Chapitre 1 : L\'Équilibre Fonctionnel Fondamental',
              description: 'Les cycles long (investissement/financement) et court (exploitation).',
              estimatedMinutes: 210,
              lessons: [
                {
                  id: 'L_N2_M2_01',
                  chapterId: 'CHAP_N2_M2_C1',
                  moduleId: 'MOD_N2_M2',
                  pathId: 'PATH_FIN_ANALYST_360',
                  title: 'Leçon 1 : Calcul et Interprétation du FRNG, du BFR et de la Trésorerie Nette',
                  durationMinutes: 50,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Calculer le Fonds de Roulement Net Global (FRNG) par le haut et par le bas du bilan.',
                    'Calculer le Besoin en Fonds de Roulement (BFR) d\'exploitation et hors exploitation.',
                    'Vérifier la cohérence de l\'égalité universelle : Trésorerie Nette = FRNG - BFR.',
                    'Diagnostiquer une crise de croissance ou une tension de liquidité.',
                  ],
                  prerequisites: ['Maîtrise des masses du bilan (Actif / Passif) du Niveau 1.'],
                  contextIntro: 'De nombreuses entreprises rentables en Côte d\'Ivoire font pourtant faillite. La cause majeure ? Une crise de liquidité causée par l\'explosion du BFR non financée par un FRNG suffisant. L\'analyste financier doit savoir dissocier rentabilité et solvabilité.',
                  theorySections: [
                    {
                      title: '1. Les Masses du Bilan Fonctionnel',
                      content: 'Le bilan fonctionnel reclasse les postes comptables selon leur rôle dans les cycles économiques : le Cycle Long (Investissements et Ressources Stables) et le Cycle Court (Exploitation : stocks, clients, fournisseurs). Le FRNG mesure l\'excédent des capitaux stables après financement des immobilisations brutes.',
                      formulas: [
                        {
                          name: 'FRNG (Fonds de Roulement Net Global)',
                          formula: 'FRNG = Ressources Durables (Capitaux Propres + Dettes Financières MLT) - Emplois Stables (Actif Immobilisé Brut)',
                          interpretation: 'Si FRNG > 0, l\'entreprise dispose d\'une marge de sécurité pour financer son cycle d\'exploitation.',
                          syscohadaRef: 'AUDCIF - Analyse financière fonctionnelle OHADA',
                        },
                        {
                          name: 'BFR (Besoin en Fonds de Roulement)',
                          formula: 'BFR = (Stocks + Créances Clients) - (Dettes Fournisseurs + Dettes Fiscales et Sociales)',
                          interpretation: 'Représente le montant net gelé dans le décalage temporel entre achats, stockage, ventes et encaissements.',
                        },
                        {
                          name: 'Trésorerie Nette (TN)',
                          formula: 'TN = Trésorerie Active - Trésorerie Passive = FRNG - BFR',
                          interpretation: 'L\'indicateur de solvabilité immédiate. Si BFR > FRNG, la trésorerie nette est négative (recours aux concours bancaires).',
                        },
                      ],
                      rulesAndPrinciples: [
                        'Règle d\'orthodoxie financière : les emplois durables doivent être financés par des ressources durables (FRNG > 0).',
                        'Une augmentation d\'activité engendre mécaniquement une hausse du BFR.',
                        'La Trésorerie Nette est la résultante et non la cause de l\'équilibre FRNG / BFR.',
                      ],
                      commonMistakes: [
                        'Confondre le résultat net (compte de résultat) et la trésorerie disponible (banque).',
                        'Croire qu\'un BFR positif est une bonne nouvelle : c\'est un BESOIN de liquidité que l\'entreprise doit combler !',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul de base de l\'équilibre fonctionnel',
                    scenario: 'PME disposant de Ressources Durables de 80 000 000 FCFA, Emplois Stables de 50 000 000 FCFA, et BFR de 20 000 000 FCFA.',
                    dataset: { ressourcesDurables: 80000000, emploisStables: 50000000, bfr: 20000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du FRNG', calculation: '80 000 000 - 50 000 000 = +30 000 000 FCFA', justification: 'Excédent de financement stable de 30 millions.' },
                      { step: 2, action: 'Calcul de la Trésorerie Nette', calculation: '30 000 000 (FRNG) - 20 000 000 (BFR) = +10 000 000 FCFA', justification: 'L\'entreprise est saine et dégage 10 millions d\'excédent de trésorerie.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Dérive du BFR et bascule en trésorerie négative',
                    scenario: 'Suite à une hausse des ventes, les créances clients grimpent de 35 000 000 FCFA. Le BFR passe à 55 000 000 FCFA sans modification du FRNG (30 000 000 FCFA).',
                    dataset: { frng: 30000000, bfrNouveau: 55000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la nouvelle Trésorerie Nette', calculation: '30 000 000 - 55 000 000 = -25 000 000 FCFA', justification: 'La trésorerie nette devient débitrice de 25 millions.' },
                      { step: 2, action: 'Diagnostic financier', calculation: 'Découvert bancaire requis de 25 000 000 FCFA', justification: 'Risque immédiat d\'asphyxie de liquidité.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Ivoire BTP & Matériaux SA',
                    locationContext: 'Yopougon Zone Industrielle, Abidjan - Entreprise de BTP',
                    sector: 'Bâtiment et Travaux Publics',
                    currency: 'FCFA',
                    problemStatement: 'L\'entreprise décroche un chantier d\'État de 400 000 000 FCFA. Pour démarrer, elle achète des matériaux (stocks +80 000 000) et fait face à des délais de mandatement public de 120 jours (créances clients +160 000 000). Son FRNG initial n\'est que de 60 000 000 FCFA. Ses banques refusent de couvrir le découvert au-delà de 50 000 000 FCFA.',
                    financialStatements: {
                      chiffreAffaires: 400000000,
                      stocks: 80000000,
                      creancesClients: 160000000,
                      dettesFournisseurs: 70000000,
                      bfrCalcule: 170000000,
                      frng: 60000000,
                      deficitTresorerie: -110000000,
                    },
                    realWorldResolution: 'Négociation d\'une ligne d\'affacturage sur créances publiques de 80 000 000 FCFA, rallongement des délais fournisseurs à 90 jours et apport en compte courant d\'associés de 30 000 000 FCFA pour rétablir l\'équilibre.',
                    recommendationToBoard: 'Ne jamais accepter de marché de taille supérieure à 30% du CA sans avoir contractualisé au préalable le préfinancement bancaire ou une avance forfaitaire de démarrage.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_N2_L1',
                    title: 'Calcul guidé du BFR d\'une société de négoce',
                    instruction: 'À partir des données suivantes : Stocks = 45 000 000 FCFA, Clients = 65 000 000 FCFA, Fournisseurs = 50 000 000 FCFA, Dettes fiscales = 10 000 000 FCFA. Calculez le BFR d\'exploitation.',
                    dataset: { stocks: 45000000, clients: 65000000, fournisseurs: 50000000, fiscales: 10000000 },
                    stepByStepHelp: [
                      '1. Calculez l\'Actif d\'exploitation : 45 000 000 + 65 000 000 = 110 000 000 FCFA.',
                      '2. Calculez le Passif d\'exploitation : 50 000 000 + 10 000 000 = 60 000 000 FCFA.',
                      '3. BFR = Actif d\'exploitation - Passif d\'exploitation = 110 000 000 - 60 000 000 FCFA.',
                    ],
                    expectedAnswer: 50000000,
                    detailedCorrection: 'Le BFR s\'élève à 50 000 000 FCFA. L\'entreprise doit financer 50 millions de décalage de trésorerie.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_N2_L1',
                    title: 'Calcul autonome de la Trésorerie Nette',
                    instruction: 'Une entreprise a un FRNG de 72 000 000 FCFA et un BFR de 88 500 000 FCFA. Quelle est sa Trésorerie Nette (en FCFA, indiquer le signe négatif si négatif) ?',
                    dataset: { frng: 72000000, bfr: 88500000 },
                    hints: ['Formule : TN = FRNG - BFR.'],
                    expectedAnswer: -16500000,
                    detailedCorrection: 'TN = 72 000 000 - 88 500 000 = -16 500 000 FCFA. La trésorerie est déficitaire de 16,5 millions de FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_N2_L1_SIM',
                    title: 'Laboratoire d\'Analyse Financière : Simulation FRNG / BFR / TN',
                    type: 'simulator',
                    targetComponentId: 'financial_analysis_lab',
                    presetConfig: {
                      scenario: 'PME_CRISE_CROISSANCE',
                      ca: 350000000,
                      stocks: 75000000,
                      clients: 90000000,
                      fournisseurs: 60000000,
                    },
                    completionCriteria: {
                      metric: 'ratios_calculated',
                      targetValue: true,
                      description: 'Calculer les ratios de rotation (DSO, DPO, DIO) et déterminer le besoin de trésorerie à 90 jours.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_N2_L1_1',
                      question: 'Que signifie un BFR négatif (ex : dans la grande distribution alimentaire) ?',
                      options: [
                        'Une faillite immédiate',
                        'Une ressource de trésorerie gratuite : les clients paient comptant alors que les fournisseurs sont payés à 60 jours',
                        'Une erreur dans le calcul du bilan comptable',
                        'Un excès d\'investissements matériels',
                      ],
                      correctIndex: 1,
                      explanation: 'Un BFR négatif constitue une ressource en fonds de roulement : le cycle d\'exploitation dégage de la liquidité avant même de payer les dettes.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'équilibre financier fondamental est régi par TN = FRNG - BFR.',
                    'Une croissance rapide des ventes augmente le BFR et peut provoquer une rupture de trésorerie.',
                    'Le FRNG doit être suffisant pour couvrir le BFR moyen d\'exploitation.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 3 pour analyser la formation de la rentabilité (SIG, EBE, ROE et effet de levier).',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_MOD_N2_M2',
            moduleId: 'MOD_N2_M2',
            title: 'Évaluation Certifiante : Diagnostic Bilan Fonctionnel',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_N2_1',
                question: 'Une PME augmente son délai de paiement client (DSO) de 45 à 90 jours. Quel en est l\'impact direct ?',
                options: [
                  'Augmentation du FRNG',
                  'Augmentation du BFR et dégradation de la trésorerie nette',
                  'Amélioration de la rentabilité des capitaux propres',
                  'Baisse des dettes fournisseurs',
                ],
                correctIndex: 1,
                explanation: 'Rallonger les délais accordés aux clients gèle davantage de fonds dans les créances, ce qui accroît le BFR et ponctionne la trésorerie.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 3 : ANALYSE DE LA RENTABILITÉ & SOLDES INTERMÉDIAIRES DE GESTION
    // ------------------------------------------------------------------------
    {
      id: 'NIV_3',
      pathId: 'PATH_FIN_ANALYST_360',
      levelNumber: 3,
      title: 'Niveau 3 : Analyse de la Rentabilité, SIG & Effet de Levier',
      description: 'Décomposer la formation du résultat (Marge commerciale, Valeur Ajoutée, EBE, Résultat d\'Exploitation) et maîtriser le levier d\'endettement (ROE vs ROA).',
      targetMastery: 'Identifier les gisements de rentabilité opérationnelle et modéliser l\'impact de la dette sur le rendement des fonds propres.',
      modules: [
        {
          id: 'MOD_N3_M3',
          levelId: 'NIV_3',
          pathId: 'PATH_FIN_ANALYST_360',
          moduleNumber: 3,
          title: 'Module 3 : Les Soldes Intermédiaires de Gestion (SIG) et le Levier Financier',
          description: 'Calculer la Valeur Ajoutée, l\'EBE (EBITDA), le Résultat d\'Exploitation et la formule de Modigliani-Miller.',
          competencyCodes: ['ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'CHAP_N3_M3_C1',
              moduleId: 'MOD_N3_M3',
              title: 'Chapitre 1 : La Cascade des Marges SYSCOHADA',
              description: 'De la marge commerciale au résultat net de l\'exercice.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_N3_M3_01',
                  chapterId: 'CHAP_N3_M3_C1',
                  moduleId: 'MOD_N3_M3',
                  pathId: 'PATH_FIN_ANALYST_360',
                  title: 'Leçon 1 : EBE, Résultat d\'Exploitation et Effet de Levier Financier',
                  durationMinutes: 50,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Calculer l\'Excédent Brut d\'Exploitation (EBE / EBITDA).',
                    'Calculer la rentabilité économique (ROA = Résultat d\'Exploitation / Actif Économique).',
                    'Calculer la rentabilité financière (ROE = Résultat Net / Capitaux Propres).',
                    'Maîtriser la formule de l\'effet de levier : ROE = ROA + (ROA - i) * (Dettes / Capitaux Propres).',
                  ],
                  prerequisites: ['Bilan fonctionnel du Niveau 2.'],
                  contextIntro: 'La rentabilité brute d\'exploitation (EBE) est le véritable poumon financier de l\'entreprise. C\'est sur cette base que les comités de crédit calculent la capacité de remboursement (Dette Nette / EBE < 3,5x).',
                  theorySections: [
                    {
                      title: '1. L\'EBE et l\'Effet de Levier Financier',
                      content: 'L\'EBE mesure la performance pure de l\'exploitation indépendamment de la politique d\'amortissement, du mode de financement (dette vs capital) et de la fiscalité.',
                      formulas: [
                        {
                          name: 'Excédent Brut d\'Exploitation (EBE)',
                          formula: 'EBE = Valeur Ajoutée + Subventions d\'exploitation - Charges de personnel - Impôts et taxes',
                          interpretation: 'Ressource fondamentale d\'autofinancement générée par l\'activité.',
                        },
                        {
                          name: 'Effet de Levier Financier',
                          formula: 'ROE = ROA + [ (ROA - Taux d\'intérêt de la dette i) * (Dettes Financières / Capitaux Propres) ]',
                          interpretation: 'Tant que la rentabilité économique ROA est supérieure au coût de la dette i, s\'endetter augmente le rendement des capitaux propres des actionnaires.',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul de l\'effet de levier positif',
                    scenario: 'Une entreprise a un ROA de 15%, un taux d\'emprunt i de 7%, et un ratio Dettes / Capitaux Propres de 1,5.',
                    dataset: { roa: 0.15, i: 0.07, gearing: 1.5 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du différentiel', calculation: '15% - 7% = +8%', justification: 'Le différentiel de levier est largement positif.' },
                      { step: 2, action: 'Calcul de l\'impact du bras de levier', calculation: '8% * 1.5 = +12%', justification: 'Gain de levier.' },
                      { step: 3, action: 'Calcul du ROE final', calculation: '15% + 12% = 27%', justification: 'Grâce à la dette, les actionnaires obtiennent 27% de rendement sur leurs fonds propres.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'L\'effet de massue (levier négatif)',
                    scenario: 'En période de récession, le ROA tombe à 4% alors que le taux d\'emprunt bancaire est de 8% pour un ratio D/CP de 2.',
                    dataset: { roa: 0.04, i: 0.08, gearing: 2 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du différentiel', calculation: '4% - 8% = -4%', justification: 'Différentiel négatif.' },
                      { step: 2, action: 'Calcul du ROE', calculation: '4% + (-4% * 2) = -4%', justification: 'L\'endettement détruit la valeur et plonge le ROE en territoire négatif.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Agro-Industriel des Lagunes (GAIL SA)',
                    locationContext: 'San Pedro, Côte d\'Ivoire - Usine de transformation de cacao',
                    sector: 'Agro-industrie exportatrice',
                    currency: 'FCFA',
                    problemStatement: 'GAIL SA souhaite financer une nouvelle ligne de broyage de 1 200 000 000 FCFA. Elle hésite entre une augmentation de capital de 600M + emprunt de 600M ou un emprunt bancaire à 100% à un taux de 8,5%. Le ROA attendu de l\'usine est de 14%.',
                    financialStatements: { coutProjet: 1200000000, roaPrevisionnel: 0.14, tauxEmprunt: 0.085 },
                    realWorldResolution: 'La simulation démontre un ROE de 19,5% avec la dette partielle contre 14% en autofinancement pur. La société retient le financement mixte tout en maintenant le ratio Dette Nette / EBE sous 2,8x.',
                    recommendationToBoard: 'Valider l\'emprunt bancaire en négociant une franchise d\'amortissement de capital de 12 mois pendant la construction de l\'usine.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_N3_L1',
                    title: 'Calcul guidé de l\'EBE',
                    instruction: 'À partir de : Valeur Ajoutée = 85 000 000 FCFA, Charges de personnel = 45 000 000 FCFA, Impôts et taxes = 6 000 000 FCFA. Calculez l\'EBE.',
                    dataset: { va: 85000000, salaires: 45000000, impots: 6000000 },
                    stepByStepHelp: ['EBE = Valeur Ajoutée - Charges de personnel - Impôts et taxes.'],
                    expectedAnswer: 34000000,
                    detailedCorrection: 'EBE = 85 000 000 - 45 000 000 - 6 000 000 = 34 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_N3_L1',
                    title: 'Calcul autonome du ROE avec effet de levier',
                    instruction: 'Une entreprise a un ROA de 12%, un coût de la dette i de 6%, et un ratio Dettes Financières / Capitaux Propres de 1,2. Quel est son ROE en pourcentage ? (ex : tapez 19.2 pour 19,2%)',
                    dataset: { roa: 0.12, i: 0.06, d_cp: 1.2 },
                    hints: ['Formule : ROE = ROA + (ROA - i) * (D/CP).'],
                    expectedAnswer: 19.2,
                    detailedCorrection: 'ROE = 12% + (12% - 6%) * 1,2 = 12% + 7,2% = 19,2%.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_N3_L1_SIM',
                    title: 'Simulateur d\'Effet de Levier et de Rentabilité',
                    type: 'simulator',
                    targetComponentId: 'financial_analysis_lab',
                    presetConfig: { mode: 'LEVERAGE_SIMULATION', roa: 0.14, i: 0.075 },
                    completionCriteria: {
                      metric: 'leverage_calculated',
                      targetValue: true,
                      description: 'Simuler 3 scénarios de taux d\'intérêt et identifier le point de rupture où le levier devient négatif.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_N3_L1_1',
                      question: 'Quand l\'effet de levier devient-il négatif ("effet de massue") ?',
                      options: [
                        'Quand le taux d\'impôt sur les sociétés augmente',
                        'Dès que la rentabilité économique (ROA) devient inférieure au taux d\'intérêt de la dette (i)',
                        'Quand le chiffre d\'affaires double',
                        'Quand les clients paient comptant',
                      ],
                      correctIndex: 1,
                      explanation: 'Si le coût de l\'argent emprunté dépasse ce que produit l\'actif économique, chaque franc emprunté appauvrit l\'actionnaire.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'EBE mesure la performance opérationnelle brute de l\'entreprise.',
                    'L\'effet de levier démultiplie la rentabilité des actionnaires si ROA > i.',
                    'L\'endettement excessif amplifie le risque de faillite en cas de retournement conjoncturel.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 4 pour maîtriser la gestion de la trésorerie sous stress.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_MOD_N3_M3',
            moduleId: 'MOD_N3_M3',
            title: 'Évaluation Certifiante : Maîtrise des SIG et du Levier',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_N3_1',
                question: 'Pourquoi l\'EBITDA (EBE) est-il l\'indicateur privilégié des banques pour évaluer la capacité d\'endettement ?',
                options: [
                  'Parce qu\'il inclut les subventions exceptionnelles',
                  'Parce qu\'il reflète le flux de cash opérationnel brut avant choix comptables d\'amortissement et de structure financière',
                  'Parce qu\'il est toujours égal au dividende versé',
                  'Parce qu\'il remplace le bilan comptable',
                ],
                correctIndex: 1,
                explanation: 'L\'EBE/EBITDA mesure la capacité réelle brute de l\'entreprise à générer du cash pour payer ses intérêts et rembourser son capital.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 4 : GESTION & PRÉVISION DE TRÉSORERIE SOUS STRESS
    // ------------------------------------------------------------------------
    {
      id: 'NIV_4',
      pathId: 'PATH_FIN_ANALYST_360',
      levelNumber: 4,
      title: 'Niveau 4 : Trésorerie Opérationnelle & Stress-Testing',
      description: 'Construire un budget de trésorerie glissant à 13 semaines, modéliser les scénarios de crise et négocier les découverts.',
      targetMastery: 'Anticiper les creux de trésorerie à 90 jours et structurer un plan d\'arbitrage de liquidité robuste.',
      modules: [
        {
          id: 'MOD_N4_M4',
          levelId: 'NIV_4',
          pathId: 'PATH_FIN_ANALYST_360',
          moduleNumber: 4,
          title: 'Module 4 : Le Plan de Trésorerie Glissant et les Stress Tests de Liquidité',
          description: 'Passer de la vision comptable à la réalité des flux de caisse datés au jour le jour.',
          competencyCodes: ['TRES-PREVISION'],
          durationHours: 6,
          chapters: [
            {
              id: 'CHAP_N4_M4_C1',
              moduleId: 'MOD_N4_M4',
              title: 'Chapitre 1 : Modélisation des Encaissements et Décaissements',
              description: 'Rythme des flux, décalages de TVA et stress-tests bancaires.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_N4_M4_01',
                  chapterId: 'CHAP_N4_M4_C1',
                  moduleId: 'MOD_N4_M4',
                  pathId: 'PATH_FIN_ANALYST_360',
                  title: 'Leçon 1 : Construction du Budget de Trésorerie et Stress Test 13 Semaines',
                  durationMinutes: 50,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Ventiler les encaissements selon les délais de règlement réels des clients.',
                    'Positionner les décaissements incontournables (salaires fin de mois, TVA le 15, fournisseurs).',
                    'Calculer le solde de trésorerie final par période.',
                    'Tester l\'impact d\'un retard de 30 jours du principal client.',
                  ],
                  prerequisites: ['Équilibre fonctionnel du Niveau 2.'],
                  contextIntro: 'En trésorerie, la règle d\'or est temporelle : 1 FCFA aujourd\'hui vaut mieux que 1 FCFA dans 60 jours. Un plan glissant 13 semaines permet d\'alerter la direction avant le rejet d\'un chèque ou d\'un virement de salaires.',
                  theorySections: [
                    {
                      title: '1. La Mécanique du Budget de Trésorerie',
                      content: 'Le budget de trésorerie transforme les charges et produits en flux de décaissements et d\'encaissements TTC à leurs dates effectives de valeur.',
                      formulas: [
                        {
                          name: 'Solde de Trésorerie de Fin de Période',
                          formula: 'Solde Fin = Solde Début + Total Encaissements TTC - Total Décaissements TTC',
                          interpretation: 'Si Solde Fin < 0, besoin de découvert ou de crédit de campagne immédiat.',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du solde fin de mois',
                    scenario: 'Solde initial de 5 000 000 FCFA, encaissements prévus de 18 000 000 FCFA, décaissements prévus de 20 000 000 FCFA.',
                    dataset: { debut: 5000000, encaissement: 18000000, decaissement: 20000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du flux net', calculation: '18 000 000 - 20 000 000 = -2 000 000 FCFA', justification: 'Déficit mensuel de 2 millions.' },
                      { step: 2, action: 'Solde final', calculation: '5 000 000 - 2 000 000 = +3 000 000 FCFA', justification: 'Le solde reste positif grâce à la réserve initiale.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Simulation d\'impayé client',
                    scenario: 'Le plus gros client (5 000 000 FCFA) repousse son règlement au mois suivant. Le solde final devient 5M - 7M = -2 000 000 FCFA.',
                    dataset: { deficit: -2000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Constater le trou de caisse', calculation: 'Solde prévisionnel : -2 000 000 FCFA', justification: 'Nécessité de négocier une facilité de caisse temporaire.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Ivoire Logistique & Fret Express',
                    locationContext: 'Port Autonome d\'Abidjan - Entreprise de transit et fret',
                    sector: 'Transport et logistique',
                    currency: 'FCFA',
                    problemStatement: 'L\'entreprise a 35 000 000 FCFA de salaires et charges sociales à payer le 28 du mois. Son solde bancaire au 20 est de 8 000 000 FCFA. Ses créances clients de 40 000 000 FCFA sont réparties sur 12 clients avec un retard moyen de 18 jours.',
                    financialStatements: { salairesDus: 35000000, soldeActuel: 8000000, creancesClients: 40000000 },
                    realWorldResolution: 'Action commando de recouvrement sur les 3 plus gros clients offrant un escompte de 1,5% pour paiement sous 48h, permettant de rentrer 28 000 000 FCFA avant le 27 et de payer l\'intégralité des salaires.',
                    recommendationToBoard: 'Mettre en place une relance automatique à J-5 de l\'échéance et interdire les livraisons à tout client ayant plus de 15 jours de retard.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_N4_L1',
                    title: 'Calcul guidé du solde de trésorerie hebdomadaire',
                    instruction: 'Solde au lundi matin = 12 000 000 FCFA. Encaissements de la semaine = 8 500 000 FCFA. Décaissements prévus = 15 200 000 FCFA. Calculez le solde au vendredi soir.',
                    dataset: { debut: 12000000, enc: 8500000, dec: 15200000 },
                    stepByStepHelp: ['Solde Fin = 12 000 000 + 8 500 000 - 15 200 000 FCFA.'],
                    expectedAnswer: 5300000,
                    detailedCorrection: 'Solde Fin = 20 500 000 - 15 200 000 = 5 300 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_N4_L1',
                    title: 'Calcul autonome du besoin de financement court terme',
                    instruction: 'Une entreprise démarre le mois avec 3 000 000 FCFA en banque. Les décaissements du mois s\'élèvent à 28 000 000 FCFA et les encaissements à 19 000 000 FCFA. De quel montant d\'autorisation de découvert bancaire minimale a-t-elle besoin pour ne pas être en rejet (en FCFA positif) ?',
                    dataset: { debut: 3000000, dec: 28000000, enc: 19000000 },
                    hints: ['Solde = 3M + 19M - 28M = -6 000 000 FCFA.'],
                    expectedAnswer: 6000000,
                    detailedCorrection: 'Le déficit de trésorerie est de 6 000 000 FCFA. L\'entreprise doit négocier au minimum 6 000 000 FCFA de découvert.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_N4_L1_SIM',
                    title: 'Simulateur de Stress Test de Trésorerie',
                    type: 'simulator',
                    targetComponentId: 'treasury_simulator',
                    presetConfig: { initialCash: 15000000, weeksCount: 13 },
                    completionCriteria: {
                      metric: 'liquidity_survival_weeks',
                      targetValue: 13,
                      description: 'Maintenir la trésorerie positive pendant 13 semaines sous un scénario de choc de -25% d\'encaissements.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_N4_L1_1',
                      question: 'Pourquoi le décaissement de TVA intervient-il avec un mois de décalage ?',
                      options: [
                        'Parce que l\'État fait un don à l\'entreprise',
                        'Parce que la déclaration et le paiement de la TVA collectée le mois M sont légalement exigibles au 15 du mois M+1',
                        'Parce que la TVA ne s\'applique pas aux entreprises',
                        'C\'est une option facultative',
                      ],
                      correctIndex: 1,
                      explanation: 'En droit fiscal ivoirien et UEMOA, la déclaration et le paiement de la TVA du mois M s\'effectuent au plus tard le 15 ou le 20 du mois M+1.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le budget de trésorerie raisonne en flux réels datés et en montants TTC.',
                    'L\'anticipation à 13 semaines permet d\'éviter les rejets bancaires et d\'agir sur le recouvrement.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 5 pour optimiser le BFR et le cycle d\'exploitation.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_MOD_N4_M4',
            moduleId: 'MOD_N4_M4',
            title: 'Évaluation Certifiante : Pilotage de la Liquidité',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_N4_1',
                question: 'Quel est l\'outil prioritaire d\'un trésorier pour combler un trou de caisse de 10 jours ?',
                options: [
                  'Une augmentation de capital',
                  'Une facilité de caisse ou un escompte d\'effets de commerce',
                  'Un emprunt obligataire à 10 ans',
                  'L\'arrêt de la production',
                ],
                correctIndex: 1,
                explanation: 'Pour un décalage court de quelques jours, la facilité de caisse bancaire ou la cession Dailly/escompte de traite est la solution adaptée.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 5 : OPTIMISATION DU BFR ET DÉLAIS DE ROTATION (DSO, DPO, DIO)
    // ------------------------------------------------------------------------
    {
      id: 'NIV_5',
      pathId: 'PATH_FIN_ANALYST_360',
      levelNumber: 5,
      title: 'Niveau 5 : Optimisation du BFR & Ratios de Rotation',
      description: 'Calculer le DSO (Days Sales Outstanding), DPO (Days Payables Outstanding), DIO (Days Inventory Outstanding) et libérer du cash.',
      targetMastery: 'Identifier les poches de cash cachées dans le bilan et mener un plan de désensibilisation du BFR.',
      modules: [
        {
          id: 'MOD_N5_M5',
          levelId: 'NIV_5',
          pathId: 'PATH_FIN_ANALYST_360',
          moduleNumber: 5,
          title: 'Module 5 : Les Ratios de Rotation et la Conversion en Cash (Cash Conversion Cycle)',
          description: 'Mesurer le cycle de conversion en jours de chiffre d\'affaires : CCC = DIO + DSO - DPO.',
          competencyCodes: ['ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'CHAP_N5_M5_C1',
              moduleId: 'MOD_N5_M5',
              title: 'Chapitre 1 : Les 3 Piliers du Cycle de Conversion du Cash',
              description: 'Gestion des stocks, politique de crédit client et négociation fournisseurs.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_N5_M5_01',
                  chapterId: 'CHAP_N5_M5_C1',
                  moduleId: 'MOD_N5_M5',
                  pathId: 'PATH_FIN_ANALYST_360',
                  title: 'Leçon 1 : Calcul du DSO, DPO, DIO et Optimisation du Cash Conversion Cycle',
                  durationMinutes: 50,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Calculer le délai moyen de paiement des clients (DSO en jours de CA TTC).',
                    'Calculer le délai moyen de rotation des stocks (DIO en jours d\'achats consommés).',
                    'Calculer le délai moyen de règlement fournisseurs (DPO en jours d\'achats TTC).',
                    'Calculer le Cash Conversion Cycle (CCC = DIO + DSO - DPO).',
                    'Quantifier le gain en FCFA d\'une réduction de 10 jours de DSO.',
                  ],
                  prerequisites: ['Module 2 (BFR d\'exploitation).'],
                  contextIntro: 'Dans une entreprise faisant 1,2 milliard FCFA de chiffre d\'affaires, chaque jour de délai client gagné représente 3,3 millions FCFA de liquidités fraîches immédiatement sur le compte bancaire, sans aucun emprunt.',
                  theorySections: [
                    {
                      title: '1. Formules des Ratios de Rotation',
                      content: 'Ces ratios expriment les postes du bilan en jours d\'activité.',
                      formulas: [
                        {
                          name: 'DSO (Days Sales Outstanding)',
                          formula: 'DSO = (Créances Clients TTC / Chiffre d\'Affaires TTC) * 360 jours',
                          interpretation: 'Délai moyen que mettent les clients pour payer leurs factures.',
                        },
                        {
                          name: 'DIO (Days Inventory Outstanding)',
                          formula: 'DIO = (Stock Moyen / Coût d\'Achat des Marchandises Vendues) * 360 jours',
                          interpretation: 'Durée moyenne de stationnement des marchandises en magasin.',
                        },
                        {
                          name: 'DPO (Days Payables Outstanding)',
                          formula: 'DPO = (Dettes Fournisseurs TTC / Achats Totaux TTC) * 360 jours',
                          interpretation: 'Délai accordé par les fournisseurs avant encaissement.',
                        },
                        {
                          name: 'Cash Conversion Cycle (CCC)',
                          formula: 'CCC = DIO + DSO - DPO',
                          interpretation: 'Nombre de jours pendant lesquels l\'entreprise doit financer ses opérations sur ses propres ressources.',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du CCC d\'une entreprise de distribution',
                    scenario: 'DIO = 45 jours, DSO = 60 jours, DPO = 50 jours.',
                    dataset: { dio: 45, dso: 60, dpo: 50 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du CCC', calculation: '45 + 60 - 50 = 55 jours', justification: 'L\'entreprise doit financer 55 jours de chiffre d\'affaires.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Impact financier d\'une négociation fournisseur',
                    scenario: 'L\'entreprise négocie un allongement de DPO de 50 à 70 jours. Le CCC passe de 55 à 35 jours (gain de 20 jours de cash).',
                    dataset: { gainJours: 20 },
                    stepByStepSolution: [
                      { step: 1, action: 'Économie de liquidité', calculation: '20 jours * 2 000 000 FCFA/jour = 40 000 000 FCFA libérés', justification: 'Le découvert bancaire diminue de 40 millions immédiatement.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Pharmacie Centrale des Savanes',
                    locationContext: 'Bouaké, Côte d\'Ivoire - Distribution pharmaceutique',
                    sector: 'Santé et distribution',
                    currency: 'FCFA',
                    problemStatement: 'La pharmacie a un chiffre d\'affaires annuel TTC de 720 000 000 FCFA (soit 2 000 000 FCFA par jour). Ses créances clients (mutuelles et assurances) atteignent 180 000 000 FCFA, soit un DSO catastrophique de 90 jours.',
                    financialStatements: { caTTC: 720000000, creancesTTC: 180000000, dsoActuel: 90 },
                    realWorldResolution: 'Refonte de la gestion du tiers-payant, télétransmission hebdomadaire des bordereaux mutuelles. Le DSO est ramené à 45 jours. Gain de trésorerie net : 45 jours * 2 000 000 = 90 000 000 FCFA.',
                    recommendationToBoard: 'Le découvert bancaire de 80 000 000 FCFA est intégralement remboursé, économisant 9 600 000 FCFA d\'agios annuels.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_N5_L1',
                    title: 'Calcul guidé du DSO',
                    instruction: 'Chiffre d\'affaires annuel TTC = 360 000 000 FCFA. Créances clients au bilan = 45 000 000 FCFA. Calculez le DSO en jours (année commerciale 360 jours).',
                    dataset: { ca: 360000000, clients: 45000000 },
                    stepByStepHelp: ['DSO = (45 000 000 / 360 000 000) * 360 = 45 jours.'],
                    expectedAnswer: 45,
                    detailedCorrection: 'Le délai client moyen est de 45 jours.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_N5_L1',
                    title: 'Calcul autonome du cycle de conversion du cash',
                    instruction: 'Une société a DIO = 30 jours, DSO = 50 jours et DPO = 40 jours. Quel est son Cash Conversion Cycle en jours ?',
                    dataset: { dio: 30, dso: 50, dpo: 40 },
                    hints: ['CCC = DIO + DSO - DPO.'],
                    expectedAnswer: 40,
                    detailedCorrection: 'CCC = 30 + 50 - 40 = 40 jours.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_N5_L1_SIM',
                    title: 'Atelier Tableur / Analyse : Optimisation du BFR',
                    type: 'simulator',
                    targetComponentId: 'financial_analysis_lab',
                    presetConfig: { mode: 'BFR_OPTIMIZATION', caAnnuel: 600000000 },
                    completionCriteria: {
                      metric: 'cash_released_calculated',
                      targetValue: true,
                      description: 'Identifier les leviers pour libérer 50 000 000 FCFA de trésorerie via les ratios de rotation.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_N5_L1_1',
                      question: 'Quelle action permet de réduire le BFR d\'une entreprise ?',
                      options: [
                        'Accorder 30 jours de crédit supplémentaires aux clients',
                        'Augmenter les stocks de sécurité de 50%',
                        'Accélérer la facturation et négocier de meilleurs délais auprès des fournisseurs',
                        'Distribuer plus de dividendes',
                      ],
                      correctIndex: 2,
                      explanation: 'Accélérer les encaissements et allonger les règlements fournisseurs réduit mathématiquement le BFR.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le CCC mesure le temps d\'immobilisation des capitaux dans le cycle d\'exploitation.',
                    'Optimiser le BFR est la méthode la plus économique pour générer du cash sans dette.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 6 pour mener un diagnostic financier complet d\'entreprise.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_MOD_N5_M5',
            moduleId: 'MOD_N5_M5',
            title: 'Évaluation Certifiante : Gestion du Cycle Client et Fournisseur',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_N5_1',
                question: 'Si le DSO passe de 60 à 90 jours dans une PME sans modification de marge, que se passe-t-il ?',
                options: [
                  'La rentabilité augmente',
                  'Le BFR augmente de 30 jours de CA et la trésorerie se dégrade',
                  'Les capitaux propres doublent',
                  'Aucun impact',
                ],
                correctIndex: 1,
                explanation: '30 jours de CA supplémentaires sont gelés chez les clients, nécessitant un financement bancaire accru.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAUX 6 À 10 : SUITE ET COURONNEMENT DU PROGRAMME CERTIFIANT
    // ------------------------------------------------------------------------
    {
      id: 'NIV_6',
      pathId: 'PATH_FIN_ANALYST_360',
      levelNumber: 6,
      title: 'Niveau 6 : Diagnostic Financier Global & Synthèse de Risque',
      description: 'Assembler les pièces du puzzle : rentabilité, solvabilité, structure et notations de risque de crédit.',
      targetMastery: 'Rédiger une note de synthèse financière complète avec avis d\'octroi de crédit.',
      modules: [
        {
          id: 'MOD_N6_M6',
          levelId: 'NIV_6',
          pathId: 'PATH_FIN_ANALYST_360',
          moduleNumber: 6,
          title: 'Module 6 : Le Diagnostic Financier 360° et la Grille de Scoring',
          description: 'Calcul des scores de défaillance (Altman Z-Score adapté aux pays émergents) et analyse SWOT financière.',
          competencyCodes: ['ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'CHAP_N6_M6_C1',
              moduleId: 'MOD_N6_M6',
              title: 'Chapitre 1 : Méthodologie du Diagnostic Financier',
              description: 'Grille d\'audit en 5 étapes.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_N6_M6_01',
                  chapterId: 'CHAP_N6_M6_C1',
                  moduleId: 'MOD_N6_M6',
                  pathId: 'PATH_FIN_ANALYST_360',
                  title: 'Leçon 1 : Méthodologie du Diagnostic Financier Intégré et Grille de Notation',
                  durationMinutes: 50,
                  difficulty: 'Avancé',
                  objectives: [
                    'Croiser analyse d\'activité, rentabilité, équilibre bilanciel et trésorerie.',
                    'Calculer les ratios de structure (Dette Nette / EBE, Gearing, Couverture des intérêts).',
                    'Poser un diagnostic argumenté sur la pérennité de l\'entreprise.',
                  ],
                  prerequisites: ['Niveaux 1 à 5 validés.'],
                  contextIntro: 'Le rôle de l\'analyste financier n\'est pas d\'aligner des chiffres, mais de raconter l\'histoire économique de l\'entreprise à travers ses chiffres pour éclairer la décision.',
                  theorySections: [
                    {
                      title: '1. La Grille des 4 Piliers du Diagnostic',
                      content: '1. Croissance et marge (SIG) -> 2. Équilibre fonctionnel (FRNG/BFR) -> 3. Rentabilité (ROA/ROE) -> 4. Solvabilité et liquidité (Dette/EBE, Ratios de couverture).',
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du ratio Dette Nette / EBE',
                    scenario: 'Dette financière brute = 50 000 000, Trésorerie active = 10 000 000, EBE = 20 000 000 FCFA.',
                    dataset: { detteBrute: 50000000, cash: 10000000, ebe: 20000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Dette Nette', calculation: '50M - 10M = 40 000 000 FCFA', justification: 'Dette nette de trésorerie.' },
                      { step: 2, action: 'Ratio Dette Nette / EBE', calculation: '40M / 20M = 2.0x', justification: 'L\'entreprise peut rembourser sa dette en 2 ans d\'EBE (seuil prudentiel < 3.5x).' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Alerte sur la couverture des frais financiers',
                    scenario: 'Résultat d\'Exploitation = 15 000 000 FCFA, Frais financiers annuels = 12 000 000 FCFA. Ratio = 15 / 12 = 1.25x (zone de danger critique sous 2x).',
                    dataset: { rex: 15000000, interets: 12000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Diagnostic de vulnérabilité', calculation: 'Ratio 1.25x', justification: 'La moindre baisse d\'activité met l\'entreprise en défaut sur ses intérêts.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Société des Plastiques et Emballages d\'Abidjan (SPEA SA)',
                    locationContext: 'Koumassi Zone Industrielle, Abidjan',
                    sector: 'Plasturgie',
                    currency: 'FCFA',
                    problemStatement: 'SPEA sollicite un crédit d\'investissement de 250 000 000 FCFA sur 5 ans. L\'analyste de la banque étudie son dossier.',
                    financialStatements: { ca: 850000000, ebe: 95000000, detteActuelle: 120000000 },
                    realWorldResolution: 'Avec le nouvel emprunt, la Dette Nette atteindra 370M pour un EBE de 95M (ratio 3,89x > 3,5x). L\'analyste préconise de réduire l\'emprunt à 180M et d\'exiger un apport en fonds propres de 70M.',
                    recommendationToBoard: 'Accord conditionné au respect d\'un covenant Dette Nette / EBE <= 3,2x.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_N6_L1',
                    title: 'Calcul du ratio de couverture des intérêts',
                    instruction: 'Résultat d\'Exploitation = 42 000 000 FCFA. Charges d\'intérêts bancaires = 14 000 000 FCFA. Calculez le ratio de couverture.',
                    dataset: { rex: 42000000, interets: 14000000 },
                    stepByStepHelp: ['Ratio = REX / Intérêts = 42 000 000 / 14 000 000 = 3.'],
                    expectedAnswer: 3,
                    detailedCorrection: 'Le ratio est de 3,0x. L\'entreprise couvre ses charges financières 3 fois.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_N6_L1',
                    title: 'Calcul du levier d\'endettement (Gearing)',
                    instruction: 'Dettes Financières Nettes = 60 000 000 FCFA. Capitaux Propres = 80 000 000 FCFA. Quel est le ratio Gearing en pourcentage (ex : 75 pour 75%) ?',
                    dataset: { detteNette: 60000000, cp: 80000000 },
                    hints: ['Gearing = Dette Nette / Capitaux Propres.'],
                    expectedAnswer: 75,
                    detailedCorrection: 'Gearing = 60M / 80M = 75%.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_N6_L1_SIM',
                    title: 'Laboratoire de Diagnostic Financier Complet',
                    type: 'simulator',
                    targetComponentId: 'financial_analysis_lab',
                    presetConfig: { mode: 'FULL_DIAGNOSTIC_CASE' },
                    completionCriteria: {
                      metric: 'diagnostic_score',
                      targetValue: 80,
                      description: 'Remplir la grille de diagnostic à 5 dimensions et émettre la recommandation de crédit.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_N6_L1_1',
                      question: 'Quelle est la norme bancaire généralement admise pour le ratio Dette Nette / EBE ?',
                      options: ['Inférieur à 3,0x à 3,5x', 'Supérieur à 10x', 'Négatif obligatoire', 'Égal au taux de TVA'],
                      correctIndex: 0,
                      explanation: 'Au-delà de 3,5x à 4x l\'EBE, la dette nette est jugée excessive par les comités de crédit.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Un bon diagnostic croise rentabilité, liquidité et structure d\'endettement.',
                    'Les covenants bancaires protègent les prêteurs en cas de dérive financière.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 7 pour construire des modèles de prévision financière sous Excel.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_MOD_N6_M6',
            moduleId: 'MOD_N6_M6',
            title: 'Évaluation Certifiante : Note de Synthèse Financière',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_N6_1',
                question: 'Quel est l\'indicateur le plus pertinent pour mesurer la solvabilité à long terme ?',
                options: ['Le ratio Capitaux Propres / Total Bilan (autonomie financière)', 'Le solde de la caisse espèces', 'Le montant de TVA déductible', 'Le nombre de salariés'],
                correctIndex: 0,
                explanation: 'L\'autonomie financière mesure la part des actifs financée par les actionnaires sans dépendre des banques.',
              },
            ],
          },
        },
      ],
    },

    // NIVEAU 7 : PRÉVISIONS ET MODÉLISATION EXCEL
    {
      id: 'NIV_7',
      pathId: 'PATH_FIN_ANALYST_360',
      levelNumber: 7,
      title: 'Niveau 7 : Prévisions Financières & Modélisation Excel',
      description: 'Construire un compte de résultat et un bilan prévisionnels dynamiques avec formules avancées.',
      targetMastery: 'Bâtir un modèle financier sans constante en dur et tester des scénarios de sensibilité.',
      modules: [
        {
          id: 'MOD_N7_M7',
          levelId: 'NIV_7',
          pathId: 'PATH_FIN_ANALYST_360',
          moduleNumber: 7,
          title: 'Module 7 : Modélisation des États Financiers Prévisionnels à 3 Ans',
          description: 'Lier les hypothèses de croissance, de marge et de BFR à la trésorerie future.',
          competencyCodes: ['EXCEL-MODELING', 'ANAL-DIAGNOSTIC'],
          durationHours: 7,
          chapters: [
            {
              id: 'CHAP_N7_M7_C1',
              moduleId: 'MOD_N7_M7',
              title: 'Chapitre 1 : Architecture d\'un Modèle Financier 3 États',
              description: 'Connexion automatique Compte de résultat -> Bilan -> Flux de trésorerie.',
              estimatedMinutes: 210,
              lessons: [
                {
                  id: 'L_N7_M7_01',
                  chapterId: 'CHAP_N7_M7_C1',
                  moduleId: 'MOD_N7_M7',
                  pathId: 'PATH_FIN_ANALYST_360',
                  title: 'Leçon 1 : Modélisation Prévisionnelle Excel et Scénarios de Stress',
                  durationMinutes: 50,
                  difficulty: 'Avancé',
                  objectives: [
                    'Structurer un modèle Excel avec onglets séparés (Hypothèses, P&L, Bilan, Cash Flow).',
                    'Utiliser les formules dynamiques sans constantes codées en dur.',
                    'Modéliser 3 scénarios (Pessimiste, Réaliste, Optimiste).',
                  ],
                  prerequisites: ['Maîtrise des ratios et SIG des niveaux précédents.'],
                  contextIntro: 'Un modèle financier dont les cellules contiennent des chiffres tapés en dur n\'est pas un outil d\'aide à la décision, c\'est un danger pour l\'entreprise.',
                  theorySections: [
                    {
                      title: '1. Règles de Modélisation Professionnelle',
                      content: 'Toute hypothèse (taux de croissance, DSO, marge) doit être isolée dans une zone de paramètres dédiée.',
                    },
                  ],
                  simpleExample: {
                    title: 'Projection de chiffre d\'affaires à 5%',
                    scenario: 'CA année N = 100 000 000 FCFA. Croissance N+1 = 5%.',
                    dataset: { ca: 100000000, taux: 0.05 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul', calculation: '100M * (1 + 0.05) = 105 000 000 FCFA', justification: 'Formule Excel =B2*(1+C2).' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Impact automatique sur le BFR prévisionnel',
                    scenario: 'Avec un BFR normatif de 15% du CA, le BFR passe de 15M à 15,75M (besoin de financement supplémentaire de 750 000 FCFA).',
                    dataset: { variation: 750000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du besoin additionnel', calculation: '105M * 15% - 15M = +750 000 FCFA', justification: 'Impact cash.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Mahi Distribution ETI',
                    locationContext: 'Abidjan, Marcory Zone 4',
                    sector: 'Grande consommation',
                    currency: 'FCFA',
                    problemStatement: 'La direction générale prévoit d\'ouvrir 3 nouveaux dépôts régionaux en Côte d\'Ivoire.',
                    financialStatements: { investissementInitial: 180000000 },
                    realWorldResolution: 'Construction d\'un modèle financier prévisionnel sur 36 mois avec 3 scénarios.',
                    recommendationToBoard: 'Le scénario pessimiste démontre la viabilité si le BFR reste inférieur à 40 jours de CA.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_N7_L1',
                    title: 'Formule Excel dynamique de projection',
                    instruction: 'Quelle formule Excel permet de projeter la cellule A1 (CA N) avec un taux de croissance situé en B1 ?',
                    dataset: { formule: '=A1*(1+B1)' },
                    stepByStepHelp: ['Écrivez =A1*(1+B1).'],
                    expectedAnswer: '=A1*(1+B1)',
                    detailedCorrection: 'La formule est =A1*(1+B1).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_N7_L1',
                    title: 'Calcul de marge brute prévisionnelle',
                    instruction: 'CA prévisionnel = 250 000 000 FCFA. Taux de marge brute = 32%. Quel est le montant de marge brute prévisionnelle en FCFA ?',
                    dataset: { ca: 250000000, marge: 0.32 },
                    hints: ['250M * 0.32.'],
                    expectedAnswer: 80000000,
                    detailedCorrection: 'Marge brute = 250 000 000 * 0,32 = 80 000 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_N7_L1_SIM',
                    title: 'Laboratoire Excel : Modélisation Prévisionnelle',
                    type: 'simulator',
                    targetComponentId: 'excel_lab',
                    presetConfig: { template: 'FINANCIAL_PROJECTIONS_3Y' },
                    completionCriteria: {
                      metric: 'excel_audit_errors',
                      targetValue: 0,
                      description: 'Construire le tableau prévisionnel sans aucune référence circulaire ni constante en dur.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_N7_L1_1',
                      question: 'Pourquoi interdit-on les constantes numériques codées en dur dans les formules de calcul d\'un modèle ?',
                      options: [
                        'Parce qu\'elles rendent impossible l\'analyse de sensibilité et masquent les hypothèses',
                        'Parce qu\'Excel refuse de calculer les nombres',
                        'C\'est une interdiction purement esthétique',
                        'Pour réduire la taille du fichier',
                      ],
                      correctIndex: 0,
                      explanation: 'Isoler les hypothèses permet de tester instantanément des variantes en modifiant une seule cellule.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Un modèle professionnel sépare STRICTEMENT hypothèses, calculs et restitution.',
                    'L\'analyse de sensibilité est indispensable avant tout engagement d\'investissement.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 8 pour évaluer les projets d\'investissement (VAN, TRI, CMPC).',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_MOD_N7_M7',
            moduleId: 'MOD_N7_M7',
            title: 'Évaluation Certifiante : Modélisation Financière',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_N7_1',
                question: 'Dans un modèle financier 3 états, comment le P&L se connecte-t-il au Bilan ?',
                options: [
                  'Via le Résultat Net qui s\'ajoute aux Capitaux Propres et les dotations aux amortissements qui alimentent le tableau des immobilisations',
                  'Par un simple virement bancaire',
                  'Le P&L et le Bilan ne sont jamais reliés',
                  'Par la TVA collectée uniquement',
                ],
                correctIndex: 0,
                explanation: 'Le résultat net de l\'exercice vient augmenter ou diminuer les capitaux propres au passif du bilan.',
              },
            ],
          },
        },
      ],
    },

    // NIVEAU 8 : CHOIX D'INVESTISSEMENT (VAN, TRI, CMPC)
    {
      id: 'NIV_8',
      pathId: 'PATH_FIN_ANALYST_360',
      levelNumber: 8,
      title: 'Niveau 8 : Finance d\'Entreprise & Choix d\'Investissement',
      description: 'Calculer la VAN, le TRI, l\'Indice de Profitabilité, le CMPC (WACC) et arbitrer entre projets concurrents.',
      targetMastery: 'Défendre la rentabilité d\'un investissement devant un conseil d\'administration.',
      modules: [
        {
          id: 'MOD_N8_M8',
          levelId: 'NIV_8',
          pathId: 'PATH_FIN_ANALYST_360',
          moduleNumber: 8,
          title: 'Module 8 : Critères de Décision d\'Investissement (VAN, TRI, Payback)',
          description: 'Actualisation des flux de trésorerie futurs et mesure de la création de valeur nette.',
          competencyCodes: ['FIN-INVEST'],
          durationHours: 7,
          chapters: [
            {
              id: 'CHAP_N8_M8_C1',
              moduleId: 'MOD_N8_M8',
              title: 'Chapitre 1 : Actualisation et Création de Valeur',
              description: 'Pourquoi 1 FCFA dans 5 ans ne vaut pas 1 FCFA aujourd\'hui.',
              estimatedMinutes: 210,
              lessons: [
                {
                  id: 'L_N8_M8_01',
                  chapterId: 'CHAP_N8_M8_C1',
                  moduleId: 'MOD_N8_M8',
                  pathId: 'PATH_FIN_ANALYST_360',
                  title: 'Leçon 1 : Calcul de la VAN, du TRI et Arbitrage d\'Investissement',
                  durationMinutes: 50,
                  difficulty: 'Avancé',
                  objectives: [
                    'Calculer les flux nets de trésorerie d\'un investissement (Cash Flows Disponibles).',
                    'Calculer la Valeur Actuelle Nette (VAN) au taux d\'actualisation CMPC.',
                    'Calculer le Taux de Rentabilité Interne (TRI).',
                    'Comparer VAN et TRI et gérer les situations de conflit de classement.',
                  ],
                  prerequisites: ['Modélisation prévisionnelle du Niveau 7.'],
                  contextIntro: 'Un investissement n\'est rentable que s\'il rapporte plus que le coût des capitaux mobilisés pour le financer. C\'est le rôle du taux d\'actualisation (CMPC).',
                  theorySections: [
                    {
                      title: '1. Formules de la VAN et du TRI',
                      content: 'La VAN mesure l\'enrichissement net apporté aux actionnaires en monnaie d\'aujourd\'hui.',
                      formulas: [
                        {
                          name: 'Valeur Actuelle Nette (VAN)',
                          formula: 'VAN = - I0 + Somme( [ Flux_t / (1 + k)^t ] )',
                          interpretation: 'Si VAN > 0, le projet crée de la valeur au-delà de la rémunération minimale exigée par les investisseurs (k).',
                        },
                        {
                          name: 'Taux de Rentabilité Interne (TRI)',
                          formula: 'Taux r tel que VAN(r) = 0',
                          interpretation: 'Taux de rentabilité maximal tolérable avant que le projet ne devienne destructeur de valeur.',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul d\'une VAN simple sur 1 an',
                    scenario: 'Investissement I0 = 100 000 000 FCFA. Flux encaissé dans 1 an = 115 000 000 FCFA. Taux d\'actualisation k = 10%.',
                    dataset: { i0: 100000000, cf1: 115000000, k: 0.10 },
                    stepByStepSolution: [
                      { step: 1, action: 'Actualisation du flux', calculation: '115 000 000 / 1.10 = 104 545 455 FCFA', justification: 'Valeur présente du flux.' },
                      { step: 2, action: 'Calcul de la VAN', calculation: '104 545 455 - 100 000 000 = +4 545 455 FCFA', justification: 'VAN positive : projet créateur de valeur.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Calcul du TRI',
                    scenario: 'Le TRI est le taux exact qui annule la VAN : 100M * (1 + TRI) = 115M -> TRI = 15%. Comme TRI (15%) > k (10%), le projet est rentable.',
                    dataset: { tri: 0.15 },
                    stepByStepSolution: [
                      { step: 1, action: 'Comparaison TRI vs CMPC', calculation: '15% > 10%', justification: 'Validation de l\'investissement.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Compagnie Minière et Métallurgique de l\'Ouest (CMMO)',
                    locationContext: 'Man, Côte d\'Ivoire',
                    sector: 'Mines et extraction',
                    currency: 'FCFA',
                    problemStatement: 'Acquisition d\'une centrale solaire pour réduire la facture de fioul. Investissement initial : 500 000 000 FCFA. Économies annuelles nettes d\'exploitation : 120 000 000 FCFA pendant 7 ans. CMPC de l\'entreprise : 11%.',
                    financialStatements: { cout: 500000000, economieAnnuelle: 120000000, duree: 7, cmpc: 0.11 },
                    realWorldResolution: 'La VAN s\'élève à +65 464 000 FCFA et le TRI est de 15,2%. Le projet est très rentable.',
                    recommendationToBoard: 'Adopter le projet d\'installation solaire dès le prochain trimestre.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_N8_L1',
                    title: 'Calcul de VAN sur 2 ans',
                    instruction: 'I0 = 10 000 000 FCFA. Flux an 1 = 6 000 000 FCFA. Flux an 2 = 6 000 000 FCFA. Taux d\'actualisation k = 10%. Calculez la VAN arrondie au FCFA.',
                    dataset: { i0: 10000000, cf: 6000000, k: 0.10 },
                    stepByStepHelp: [
                      'Flux an 1 actualisé = 6 000 000 / 1.10 = 5 454 545 FCFA.',
                      'Flux an 2 actualisé = 6 000 000 / (1.10^2) = 4 958 678 FCFA.',
                      'Somme = 10 413 223 FCFA.',
                      'VAN = 10 413 223 - 10 000 000 = 413 223 FCFA.',
                    ],
                    expectedAnswer: 413223,
                    detailedCorrection: 'La VAN est de 413 223 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_N8_L1',
                    title: 'Règle de décision VAN vs TRI',
                    instruction: 'Entre deux projets mutuellement exclusifs, le projet A a une VAN de 80 000 000 FCFA (TRI 18%) et le projet B a une VAN de 95 000 000 FCFA (TRI 15%). Quel projet l\'analyste doit-il recommander (écrire A ou B) ?',
                    dataset: { reponse: 'B' },
                    hints: ['En cas de conflit entre VAN et TRI pour des projets exclusifs, la VAN prime toujours car elle mesure l\'enrichissement absolu.'],
                    expectedAnswer: 'B',
                    detailedCorrection: 'Le projet B doit être retenu car sa VAN (+95M) maximise la richesse créée pour les actionnaires.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_N8_L1_SIM',
                    title: 'Simulateur de Choix d\'Investissement (VAN/TRI/CMPC)',
                    type: 'simulator',
                    targetComponentId: 'investment_simulator',
                    presetConfig: { initialInvestment: 250000000, discountRate: 0.115 },
                    completionCriteria: {
                      metric: 'appraisal_completed',
                      targetValue: true,
                      description: 'Modéliser les flux sur 5 ans et calculer le Payback actualisé.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_N8_L1_1',
                      question: 'Que représente le taux d\'actualisation k dans le calcul de la VAN ?',
                      options: [
                        'Le taux de l\'inflation uniquement',
                        'Le coût d\'opportunité du capital (CMPC), c\'est-à-dire le rendement minimal exigé par les actionnaires et créanciers compte tenu du risque',
                        'Le taux de marge commerciale',
                        'Le montant de la taxe professionnelle',
                      ],
                      correctIndex: 1,
                      explanation: 'Le CMPC est le taux de rentabilité exigé par les apporteurs de fonds pour financer le risque de l\'entreprise.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La VAN est le critère absolu d\'évaluation de la création de valeur.',
                    'Le TRI ne doit pas être utilisé seul pour comparer des projets de tailles différentes.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 9 pour l\'étude de cas intégrée multisectorielle.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_MOD_N8_M8',
            moduleId: 'MOD_N8_M8',
            title: 'Évaluation Certifiante : Évaluation d\'Investissements',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_N8_1',
                question: 'Pourquoi un projet avec un TRI de 25% peut-il être rejeté ?',
                options: [
                  'Si son CMPC est de 30% (coût du capital supérieur au rendement)',
                  'Si la TVA est payée',
                  'Si le projet a lieu en Côte d\'Ivoire',
                  'Ce n\'est jamais possible',
                ],
                correctIndex: 0,
                explanation: 'Si le coût du financement (ex : 30%) dépasse le rendement interne (25%), le projet détruit de la valeur nette.',
              },
            ],
          },
        },
      ],
    },

    // NIVEAU 9 : ÉTUDE DE CAS INTÉGRÉE MULTISECTORIELLE
    {
      id: 'NIV_9',
      pathId: 'PATH_FIN_ANALYST_360',
      levelNumber: 9,
      title: 'Niveau 9 : Étude de Cas Intégrée Multisectorielle & Consolidation',
      description: 'Audit financier complet d\'un groupe de distribution et courtage en Afrique de l\'Ouest.',
      targetMastery: 'Consolider les comptes, analyser les filiales et identifier les flux inter-compagnies.',
      modules: [
        {
          id: 'MOD_N9_M9',
          levelId: 'NIV_9',
          pathId: 'PATH_FIN_ANALYST_360',
          moduleNumber: 9,
          title: 'Module 9 : Audit et Diagnostic d\'un Groupe Régional UEMOA',
          description: 'Élimination des opérations réciproques et diagnostic des performances consolidées.',
          competencyCodes: ['ANAL-DIAGNOSTIC', 'COMPT-SYSCOHADA'],
          durationHours: 7,
          chapters: [
            {
              id: 'CHAP_N9_M9_C1',
              moduleId: 'MOD_N9_M9',
              title: 'Chapitre 1 : Intégration Globale et Vision Groupe',
              description: 'Passer des comptes individuels aux comptes consolidés de holding.',
              estimatedMinutes: 210,
              lessons: [
                {
                  id: 'L_N9_M9_01',
                  chapterId: 'CHAP_N9_M9_C1',
                  moduleId: 'MOD_N9_M9',
                  pathId: 'PATH_FIN_ANALYST_360',
                  title: 'Leçon 1 : Diagnostic Financier de Groupe et Éliminations Intragroupe',
                  durationMinutes: 50,
                  difficulty: 'Expert',
                  objectives: [
                    'Comprendre le principe de l\'entité consolidée unique.',
                    'Éliminer les créances et dettes réciproques entre filiales.',
                    'Calculer l\'EBE et le BFR consolidés réels.',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 8.'],
                  contextIntro: 'Dans un groupe d\'entreprises, le chiffre d\'affaires affiché peut être artificiellement gonflé par des refacturations internes. L\'analyste financier doit éliminer ces opérations miroirs.',
                  theorySections: [
                    {
                      title: '1. Les Retraitements de Consolidation',
                      content: 'Seuls les flux avec des tiers extérieurs au groupe créent de la véritable valeur économique.',
                    },
                  ],
                  simpleExample: {
                    title: 'Élimination d\'une créance interne',
                    scenario: 'La filiale A a une créance de 50 000 000 FCFA sur la filiale B. La filiale B a une dette identique envers A.',
                    dataset: { creance: 50000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Retraitement', calculation: 'Annulation au bilan consolidé (-50M clients, -50M fournisseurs)', justification: 'Le groupe ne peut pas avoir de dette envers lui-même.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Élimination de marge interne sur stocks',
                    scenario: 'La holding a vendu des marchandises à sa filiale avec 10 000 000 FCFA de marge. Les marchandises sont encore en stock à la clôture.',
                    dataset: { margeInterne: 10000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Neutralisation de la marge', calculation: '-10 000 000 FCFA sur les stocks et le résultat', justification: 'Le profit ne sera constaté que lors de la revente finale à un client tiers.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Holding Ouest-Africaine de Services (HOAS Group SA)',
                    locationContext: 'Abidjan / Dakar / Lomé',
                    sector: 'Services et courtage B2B',
                    currency: 'FCFA',
                    problemStatement: 'HOAS affiche 2,8 milliards FCFA de chiffre d\'affaires cumulé. L\'audit révèle 650 millions FCFA de refacturations d\'honoraires internes.',
                    financialStatements: { caCumule: 2800000000, intercos: 650000000, caReel: 2150000000 },
                    realWorldResolution: 'Retraitement consolidé : le CA externe réel est de 2,15 milliards FCFA. Le diagnostic de marge est recalibré sur les flux externes.',
                    recommendationToBoard: 'Mettre en place une convention d\'animation de groupe conforme aux règles fiscales de prix de transfert OHADA.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_N9_L1',
                    title: 'Calcul de CA consolidé',
                    instruction: 'Filiale 1 CA = 1 000 000 000 FCFA. Filiale 2 CA = 800 000 000 FCFA. Ventes de Filiale 1 à Filiale 2 = 250 000 000 FCFA. Quel est le CA consolidé (en FCFA) ?',
                    dataset: { ca1: 1000000000, ca2: 800000000, interco: 250000000 },
                    stepByStepHelp: ['CA Consolidé = 1 000M + 800M - 250M = 1 550 000 000 FCFA.'],
                    expectedAnswer: 1550000000,
                    detailedCorrection: 'Le CA consolidé s\'élève à 1 550 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_N9_L1',
                    title: 'Élimination de dividende intragroupe',
                    instruction: 'La filiale verse 120 000 000 FCFA de dividendes à sa maison-mère. Quel est l\'impact sur le résultat net consolidé du groupe (en FCFA) ?',
                    dataset: { dividende: 120000000 },
                    hints: ['Les dividendes internes s\'annulent intégralement entre produit financier et distribution.'],
                    expectedAnswer: 0,
                    detailedCorrection: 'Impact nul (0 FCFA) : le dividende interne est éliminé en consolidation.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_N9_L1_SIM',
                    title: 'Cockpit de Consolidation et Éliminations Intragroupe',
                    type: 'simulator',
                    targetComponentId: 'consolidation_cockpit',
                    presetConfig: { groupScenario: 'UEMOA_MULTI_ENTITIES' },
                    completionCriteria: {
                      metric: 'eliminations_balanced',
                      targetValue: true,
                      description: 'Équilibrer la balance de consolidation après élimination des comptes courants réciproques.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_N9_L1_1',
                      question: 'Quelle est la méthode de consolidation applicable à une filiale détenue à 80% avec contrôle exclusif ?',
                      options: ['Intégration globale', 'Mise en équivalence', 'Intégration proportionnelle', 'Aucune consolidation'],
                      correctIndex: 0,
                      explanation: 'En contrôle exclusif (>50% des droits de vote), l\'intégration globale s\'impose (100% des actifs et dettes avec part des minoritaires au passif).',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La consolidation élimine toutes les transactions réciproques entre entités du périmètre.',
                    'Elle donne la vision économique authentique du groupe face aux marchés extérieurs.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 10 : Projet professionnel final et soutenance certifiante.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_MOD_N9_M9',
            moduleId: 'MOD_N9_M9',
            title: 'Évaluation Certifiante : Analyse Financière de Groupe',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_N9_1',
                question: 'Pourquoi une transaction interne ne peut-elle pas générer de résultat dans les comptes consolidés ?',
                options: [
                  'Parce que le groupe forme une seule et même entité économique indivisible',
                  'Pour éviter de payer la TVA',
                  'Parce que les devises sont différentes',
                  'C\'est une interdiction bancaire',
                ],
                correctIndex: 0,
                explanation: 'Une entité ne peut pas réaliser de bénéfice sur elle-même tant que le bien n\'est pas sorti vers un tiers extérieur.',
              },
            ],
          },
        },
      ],
    },

    // NIVEAU 10 : PROJET PROFESSIONNEL FINAL ET SOUTENANCE CERTIFIANTE
    {
      id: 'NIV_10',
      pathId: 'PATH_FIN_ANALYST_360',
      levelNumber: 10,
      title: 'Niveau 10 : Projet Professionnel Final & Examen de Maîtrise',
      description: 'Dossier de synthèse transversal et rapport complet de diagnostic, valorisation et recommandations stratégiques pour le Comité Exécutif.',
      targetMastery: 'Démontrer l\'autonomie complète d\'un analyste financier senior certifié.',
      modules: [
        {
          id: 'MOD_N10_M10',
          levelId: 'NIV_10',
          pathId: 'PATH_FIN_ANALYST_360',
          moduleNumber: 10,
          title: 'Module 10 : Le Projet de Synthèse Professionnelle Certifiant',
          description: 'Étude d\'un cas réel d\'entreprise de 5 ans d\'historique, modélisation complète, calcul des covenants et soutenance.',
          competencyCodes: ['COMPT-SYSCOHADA', 'ANAL-DIAGNOSTIC', 'TRES-PREVISION', 'CTRL-PERFORMANCE', 'EXCEL-MODELING', 'FIN-INVEST'],
          durationHours: 8,
          chapters: [
            {
              id: 'CHAP_N10_M10_C1',
              moduleId: 'MOD_N10_M10',
              title: 'Chapitre 1 : Conduite et Restitution du Rapport Exécutif',
              description: 'Les livrables attendus d\'un analyste financier senior.',
              estimatedMinutes: 240,
              lessons: [
                {
                  id: 'L_N10_M10_01',
                  chapterId: 'CHAP_N10_M10_C1',
                  moduleId: 'MOD_N10_M10',
                  pathId: 'PATH_FIN_ANALYST_360',
                  title: 'Leçon 1 : Cahier des Charges du Projet Professionnel Final et Évaluation de Maîtrise',
                  durationMinutes: 60,
                  difficulty: 'Expert',
                  objectives: [
                    'Intégrer les 9 dimensions étudiées tout au long du parcours.',
                    'Délivrer une analyse financière critique avec avis d\'investissement chiffré.',
                    'Valider les 6 compétences métier certifiées.',
                  ],
                  prerequisites: ['Validation intégrale des Niveaux 1 à 9.'],
                  contextIntro: 'Vous êtes recruté comme Responsable de l\'Analyse Financière au sein d\'un fonds d\'investissement ou d\'une direction financière de groupe à Abidjan. Vous devez rendre votre diagnostic final sur un dossier d\'acquisition stratégique.',
                  theorySections: [
                    {
                      title: '1. Structure du Mémoire Financier',
                      content: 'Le livrable comprend : 1. Note de synthèse exécutive (Executive Summary 2 pages), 2. Diagnostic historique des états financiers (3 ans), 3. Modèle prévisionnel dynamique sur tableur, 4. Évaluation d\'investissement (VAN/TRI), 5. Matrice des risques et recommandations de covenants.',
                    },
                  ],
                  simpleExample: {
                    title: 'Structure d\'une recommandation exécutive',
                    scenario: 'Avis Favorable avec réserves suspensives.',
                    dataset: { avis: 'Favorable conditionné' },
                    stepByStepSolution: [
                      { step: 1, action: 'Formulation', calculation: 'Octroi sous condition d\'apport en fonds propres et covenant Dette Nette / EBE < 3,0x', justification: 'Sécurisation du risque prêteur/investisseur.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Calcul de la valorisation par les multiples d\'EBE',
                    scenario: 'EBE moyen = 150 000 000 FCFA. Multiple sectoriel = 6.0x. Dette Nette = 200 000 000 FCFA.',
                    dataset: { ebe: 150000000, multiple: 6.0, detteNette: 200000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Valeur d\'Entreprise (VE)', calculation: '150M * 6.0 = 900 000 000 FCFA', justification: 'Valeur globale de l\'outil d\'exploitation.' },
                      { step: 2, action: 'Valeur des Fonds Propres (Equity Value)', calculation: '900M - 200M (Dette Nette) = 700 000 000 FCFA', justification: 'Valeur revenant aux actionnaires.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Agro-Distribution Panafricain (GADP SA)',
                    locationContext: 'Abidjan / Bouaké / Korhogo / San Pedro',
                    sector: 'Agro-alimentaire & Logistique',
                    currency: 'FCFA',
                    problemStatement: 'Projet d\'acquisition de GADP SA par un fonds d\'investissement pour 1 200 000 000 FCFA. Vous devez rendre le diagnostic final confirmant ou infirmant le prix proposé.',
                    financialStatements: { caAnnuel: 4500000000, ebe: 420000000, detteNette: 850000000 },
                    realWorldResolution: 'La valorisation par les Cash Flows actualisés (DCF) donne 1 350 000 000 FCFA de valeur d\'équity. Le prix de 1,2 milliard FCFA offre une marge de sécurité de 11%.',
                    recommendationToBoard: 'Recommander l\'acquisition avec clause d\'earn-out indexée sur le maintien du DSO sous 60 jours.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_N10_L1',
                    title: 'Calcul guidé de la valeur des capitaux propres',
                    instruction: 'Valeur d\'Entreprise calculée = 800 000 000 FCFA. Dette financière = 250 000 000 FCFA. Trésorerie disponible = 50 000 000 FCFA. Calculez la Valeur des Capitaux Propres (Equity Value) en FCFA.',
                    dataset: { ve: 800000000, dette: 250000000, cash: 50000000 },
                    stepByStepHelp: [
                      'Dette Nette = 250 000 000 - 50 000 000 = 200 000 000 FCFA.',
                      'Valeur des Fonds Propres = Valeur d\'Entreprise - Dette Nette = 800 000 000 - 200 000 000 FCFA.',
                    ],
                    expectedAnswer: 600000000,
                    detailedCorrection: 'La Valeur des Capitaux Propres s\'élève à 600 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_N10_L1',
                    title: 'Calcul autonome de synthèse finale',
                    instruction: 'Un groupe a un EBE de 500 000 000 FCFA. Sa dette brute est de 1,8 milliard FCFA et sa trésorerie de 300 millions FCFA. Quel est son ratio Dette Nette / EBE exact ?',
                    dataset: { ebe: 500000000, detteBrute: 1800000000, cash: 300000000 },
                    hints: ['Dette Nette = 1,8M - 0,3M = 1,5 milliard. Ratio = 1 500 000 000 / 500 000 000.'],
                    expectedAnswer: 3,
                    detailedCorrection: 'Dette Nette = 1 500 000 000 FCFA. Ratio = 1,5Md / 500M = 3.0x.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_N10_L1_SIM',
                    title: 'Mission Ultime de Jeu / Cas Réel : Comité d\'Investissement Exécutif',
                    type: 'game_mission',
                    targetComponentId: 'game_mission',
                    missionId: 'MISSION_04', // M&A et Restructuration de Bilan
                    completionCriteria: {
                      metric: 'mission_score_percent',
                      targetValue: 80,
                      description: 'Réussir la mission de restructuration financière avec un score supérieur ou égal à 80%.',
                    },
                    rubricPoints: 100,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_N10_L1_1',
                      question: 'Quelle est la définition de la Valeur d\'Entreprise (Enterprise Value) ?',
                      options: [
                        'Valeur des Capitaux Propres (Market Cap) + Dettes Financières Nettes',
                        'Le total du bilan comptable',
                        'Le montant des stocks uniquement',
                        'Le chiffre d\'affaires multiplié par la TVA',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'Enterprise Value représente la valeur totale de l\'actif économique opérationnel de l\'entité indépendamment de sa structure financière.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'analyste financier senior maîtrise l\'ensemble de la chaîne : écritures, bilan, BFR, rentabilité, modélisation et valorisation.',
                    'Toute recommandation doit s\'accompagner d\'une matrice d\'identification et de couverture des risques.',
                  ],
                  nextStepRecommendation: 'Félicitations ! Vous avez achevé le parcours 360° et êtes prêt pour la certification professionnelle.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_MOD_N10_M10',
            moduleId: 'MOD_N10_M10',
            title: 'Examen Final de Maîtrise Certifiante FinExpert 360°',
            passingScorePercent: 80,
            questions: [
              {
                id: 'FEQ_1',
                question: 'Dans quelle situation une entreprise peut-elle afficher un résultat net positif tout en voyant sa trésorerie nette chuter drastiquement ?',
                options: [
                  'Lorsque l\'explosion du BFR (retards clients et surstockage) absorbe plus de liquidités que le résultat n\'en génère',
                  'Ce cas est impossible en comptabilité',
                  'Quand les impôts sont supprimés',
                  'Quand le taux de TVA baisse',
                ],
                correctIndex: 0,
                explanation: 'C\'est le piège classique de la crise de croissance : le résultat comptabilise les ventes facturées, mais le BFR absorbe le cash tant que les clients n\'ont pas payé.',
              },
            ],
          },
        },
      ],
    },
  ],

  finalProject: {
    id: 'PRJ_FIN_ANALYST_FINAL',
    title: 'Diagnostic Financier et Valorisation d\'un Groupe Agro-Industriel Ivoirien',
    companyContext: 'Société Agro-Industrielle du Bandama (SAIB SA) - CA : 3,2 Milliards FCFA - Espace OHADA',
    businessScenario: 'En tant qu\'analyste financier indépendant, le conseil d\'administration de SAIB SA vous missionne pour analyser la rentabilité historique des 3 derniers exercices, diagnostiquer la dégradation de la trésorerie et formuler un plan de restructuration de la dette avec prévisions à 3 ans.',
    deliverablesExpected: [
      'Note exécutive de 2 pages à l\'attention du Directeur Général et du Comité d\'Audit',
      'Tableau de bord de retraitements fonctionnels (FRNG, BFR, TN, DSO, DPO, DIO)',
      'Modèle prévisionnel dynamique à 3 scénarios (Pessimiste, Médian, Optimiste)',
      'Recommandations argumentées de covenants bancaires et plan d\'optimisation du BFR',
    ],
    gradingRubric: [
      { criterion: 'Exactitude des calculs comptables et ratios fonctionnels', weightPercent: 30, description: 'Zéro erreur arithmétique sur le bilan fonctionnel et les SIG.' },
      { criterion: 'Pertinence du diagnostic et détection des causes profondes', weightPercent: 25, description: 'Liaison démontrée entre dérive du BFR et tensions de trésorerie.' },
      { criterion: 'Qualité du modèle prévisionnel Excel', weightPercent: 25, description: 'Modèle dynamique sans constante en dur et analyse de sensibilité.' },
      { criterion: 'Clarté exécutive et faisabilité des recommandations', weightPercent: 20, description: 'Recommandations actionnables adaptées au contexte UEMOA.' },
    ],
    passingScorePercent: 80,
  },
};

export const PILOT_FINANCIAL_ANALYST_PATH = expandPilotPath(PILOT_FINANCIAL_ANALYST_BASE);

// ============================================================================
// CATALOGUE DE TOUS LES PARCOURS 360° DU SYSTÈME
// ============================================================================

import { PATH_COMPTA_SYSCOHADA_360 } from './curriculum/accounting360';
import { PATH_CONTROLE_GESTION_360 } from './curriculum/controlling360';
import { PATH_TRESORERIE_360 } from './curriculum/treasury360';
import { PATH_EXCEL_MODELING_360 } from './curriculum/excel360';
import { PATH_ASSURANCE_CIMA_360 } from './curriculum/insurance360';
import { PATH_CONSOLIDATION_360 } from './curriculum/consolidation360';

export const ALL_LEARNING_PATHS_360: LearningPath360[] = [
  PILOT_FINANCIAL_ANALYST_PATH,
  PATH_COMPTA_SYSCOHADA_360,
  PATH_CONTROLE_GESTION_360,
  PATH_TRESORERIE_360,
  PATH_EXCEL_MODELING_360,
  PATH_ASSURANCE_CIMA_360,
  PATH_CONSOLIDATION_360,
];
