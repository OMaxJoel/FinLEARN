import { LearningPath360 } from '../../types/pedagogy360';

// ============================================================================
// PARCOURS 360° : CONTRÔLEUR DE GESTION & PILOTAGE DE LA PERFORMANCE
// 8 Niveaux progressifs, simulateurs d'écarts et seuil de rentabilité, cas réels
// ============================================================================

export const PATH_CONTROLE_GESTION_360: LearningPath360 = {
  id: 'PATH_CONTROLE_GESTION_360',
  domainId: 'controle',
  title: 'Contrôleur de Gestion & Pilotage de la Performance 360°',
  tagline: 'Maîtriser le seuil de rentabilité, les budgets flexibles, la décomposition des écarts et le reporting opérationnel de direction',
  description: 'Un cursus d\'excellence complet pour devenir le business partner stratégique de la direction générale. De la modélisation des coûts fixes et variables au calcul du point mort, à l\'audit des écarts de production et à la rentabilité par ligne de produits.',
  targetRole: 'Contrôleur de Gestion Industriel & Commercial / Responsable du Contrôle Budgétaire',
  levelBadge: 'Cursus Métier 8 Niveaux - Débutant à Avancé',
  color: 'purple',
  iconName: 'Sliders',
  version: '2.0.0',
  status: 'draft',
  estimatedHours: 52,
  prerequisites: [
    'Connaissance des états financiers de base (Compte de résultat)',
    'Maîtrise des pourcentages et des proportions',
    'Aisance sur tableur Excel',
  ],
  competenciesTargeted: [
    'CTRL-PERFORMANCE',
    'EXCEL-MODELING',
    'ANAL-DIAGNOSTIC',
  ],
  initialDiagnosticId: 'DIAG_CTRL_01',
  completenessScore: 100,

  levels: [
    // ------------------------------------------------------------------------
    // NIVEAU 1 : TYPOLOGIE DES CHARGES & COMPORTEMENT DES COÛTS
    // ------------------------------------------------------------------------
    {
      id: 'CTRL_NIV_1',
      pathId: 'PATH_CONTROLE_GESTION_360',
      levelNumber: 1,
      title: 'Niveau 1 : Typologie des Coûts & Comportement des Charges',
      description: 'Distinguer les charges fixes des charges variables et modéliser la fonction de coût total.',
      targetMastery: 'Classifier toute charge d\'exploitation et formaliser l\'équation CT = CF + (cv x Q).',
      modules: [
        {
          id: 'CTRL_MOD_1',
          levelId: 'CTRL_NIV_1',
          pathId: 'PATH_CONTROLE_GESTION_360',
          moduleNumber: 1,
          title: 'Module 1 : Charges Fixes, Variables et Semi-Variables',
          description: 'Comprendre l\'élasticité des coûts par rapport au volume d\'activité.',
          competencyCodes: ['CTRL-PERFORMANCE'],
          durationHours: 6,
          chapters: [
            {
              id: 'CTRL_CHAP_1_1',
              moduleId: 'CTRL_MOD_1',
              title: 'Chapitre 1 : Modélisation Linéaire des Coûts d\'Exploitation',
              description: 'Ventilation analytique des postes du compte de résultat SYSCOHADA.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CTRL_01',
                  chapterId: 'CTRL_CHAP_1_1',
                  moduleId: 'CTRL_MOD_1',
                  pathId: 'PATH_CONTROLE_GESTION_360',
                  title: 'Leçon 1 : Comportement des Coûts et Séparation Fixe / Variable',
                  durationMinutes: 45,
                  difficulty: 'Débutant',
                  objectives: [
                    'Identifier la nature d\'une charge (fixe de structure vs variable opérationnelle).',
                    'Modéliser le coût variable unitaire et la charge fixe totale.',
                    'Comprendre le phénomène d\'économies d\'échelle (dilution des charges fixes par unité produite).',
                    'Traiter les charges mixtes ou semi-variables (ex: électricité industrielle).',
                  ],
                  prerequisites: ['Notions d\'algèbre élémentaire (droite y = ax + b).'],
                  contextIntro: 'Le contrôle de gestion ne s\'intéresse pas seulement à ce que l\'entreprise dépense, mais à COMMENT ses dépenses réagissent aux variations de vente. Une PME industrielle à Abidjan qui voit sa production doubler ne verra pas son loyer doubler, mais ses achats de matières premières oui.',
                  theorySections: [
                    {
                      title: '1. Équation Linéaire du Coût Total d\'Exploitation',
                      content: 'Le Coût Total (CT) se décompose en : Coût Fixe Total (CF) indépendant du volume d\'activité à court terme (loyers, amortissements, salaires administratifs) et Coût Variable Total (CV = cv x Q) strictement proportionnel aux quantités produites (matières premières, emballages, commissions sur vente). Le coût unitaire moyen décroît donc mécaniquement avec le volume.',
                      keyDefinitions: [
                        { term: 'Charges Fixes de Structure', definition: 'Coûts engagés pour maintenir la capacité de production de l\'entité, constants quel que soit le niveau d\'activité réel.' },
                        { term: 'Charges Variables d\'Exploitation', definition: 'Coûts dont le montant total varie en proportion directe du volume de production ou de vente.' },
                      ],
                      rulesAndPrinciples: [
                        'À court terme, les charges fixes sont rigides (loyer d\'usine, salaires fixes).',
                        'Le coût variable moyen unitaire (cv) est supposé constant dans la zone de pertinence.',
                      ],
                      formulas: [
                        {
                          name: 'Fonction de Coût Total',
                          formula: 'CT(Q) = Charges Fixes Totales + (Coût Variable Unitaire x Quantité)',
                          interpretation: 'Droite affine permettant de simuler le budget total pour tout niveau d\'activité Q.',
                          syscohadaRef: 'Principes de Comptabilité de Gestion et Normes CIMA/IFAC',
                        },
                      ],
                      commonMistakes: [
                        'Considérer la main-d\'œuvre directe comme variable lorsque le droit du travail impose des contrats CDI à temps plein sans flexibilité horaire.',
                        'Oublier les paliers de charges fixes lors d\'un saut de capacité (embauche d\'un contremaître supplémentaire).',
                      ],
                      professionalBestPractices: [
                        'Toujours documenter l\'analyse de corrélation statistique entre l\'inducteur d\'activité (heures machine, tonnes produites) et la dépense.',
                      ],
                      memorizationTips: [
                        'Fixe = Ne bouge pas avec les unités. Variable = Épouse les volumes.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du coût unitaire selon le volume de production',
                    scenario: 'Une boulangerie industrielle supporte 4 000 000 FCFA de charges fixes mensuelles. Le coût variable d\'un sac de farine et ingrédients est de 500 FCFA par baguette.',
                    dataset: { chargesFixes: 4000000, coutVarUnit: 500 },
                    stepByStepSolution: [
                      { step: 1, action: 'Pour 20 000 baguettes', calculation: 'Coût total = 4 000 000 + (500 x 20 000) = 14 000 000 FCFA. Coût unitaire = 14 000 000 / 20 000 = 700 FCFA/baguette', justification: 'Le coût fixe pèse 200 FCFA par unité.' },
                      { step: 2, action: 'Pour 40 000 baguettes', calculation: 'Coût total = 4 000 000 + (500 x 40 000) = 24 000 000 FCFA. Coût unitaire = 24 000 000 / 40 000 = 600 FCFA/baguette', justification: 'Économie d\'échelle : le coût unitaire baisse de 100 FCFA.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Séparation d\'une charge mixte par la méthode des extrêmes',
                    scenario: 'La facture d\'électricité d\'une usine à Vridi s\'élève à 2 800 000 FCFA pour 10 000 heures de machine (mois de basse saison) et à 4 000 000 FCFA pour 16 000 heures (mois de pointe).',
                    dataset: { ptBasQ: 10000, ptBasC: 2800000, ptHautQ: 1600000, ptHautC: 4000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du coût variable par heure machine', calculation: 'cv = (4 000 000 - 2 800 000) / (16 000 - 10 000) = 1 200 000 / 6 000 = 200 FCFA / heure', justification: 'Variation du coût divisée par la variation d\'activité.' },
                      { step: 2, action: 'Déduction de la part fixe (abonnement)', calculation: 'CF = 4 000 000 - (200 x 16 000) = 4 000 000 - 3 200 000 = 800 000 FCFA', justification: 'Part fixe incompressible indépendante des machines.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Plastiques Modernes de Côte d\'Ivoire (PMCI SARL)',
                    locationContext: 'Abidjan, Zone Industrielle Yopougon',
                    sector: 'Fabrication de bidons et emballages plastiques',
                    currency: 'FCFA',
                    problemStatement: 'PMCI vendait ses bidons de 20L au prix de 1 200 FCFA en pensant réaliser 200 FCFA de marge par unité (coût estimé à 1 000 FCFA sur la base de 100 000 bidons). Lorsque la demande est tombée à 50 000 unités, l\'entreprise a plongé dans le rouge avec un coût unitaire réel monté à 1 400 FCFA.',
                    financialStatements: {
                      chargesFixesTotales: 40000000,
                      coutVariableUnitaire: 600,
                      prixVente: 1200,
                      volumeInitial: 100000,
                      volumeReelChute: 50000,
                    },
                    realWorldResolution: 'Le contrôleur de gestion a décomposé le coût unitaire : 600 FCFA de variable + (40 000 000 / 50 000 = 800 FCFA de fixe) = 1 400 FCFA de coût réel unitaire. Pour 50 000 unités, chaque bidon générait 200 FCFA de perte. PMCI a réorienté une partie de sa capacité vers le flaconnage pharmaceutique à plus forte marge pour réabsorber ses charges fixes.',
                    recommendationToBoard: 'Ne jamais fixer un prix de vente sur un coût complet statique : piloter par la marge sur coût variable et le seuil de rentabilité.',
                  },
                  guidedExercise: {
                    id: 'EX_CTRL_GUIDED_01',
                    title: 'Exercice Guidé : Calcul du coût total prévisionnel',
                    instruction: 'Une PME industrielle a 15 000 000 FCFA de charges fixes par an. Son coût variable unitaire est de 1 200 FCFA par article. Quel sera le Coût Total de fabrication pour une série de 10 000 articles ?',
                    dataset: { cf: 15000000, cvu: 1200, q: 10000 },
                    stepByStepHelp: [
                      '1. Coût variable total = 1 200 x 10 000 = 12 000 000 FCFA.',
                      '2. Coût total = Charges fixes (15 000 000) + Coût variable (12 000 000).',
                    ],
                    expectedAnswer: 27000000,
                    detailedCorrection: 'Coût total = 15 000 000 + (1 200 x 10 000) = 27 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CTRL_AUTO_01',
                    title: 'Exercice Autonome : Économie d\'échelle sur coût unitaire',
                    instruction: 'Les charges fixes sont de 30 000 000 FCFA. Le coût variable unitaire est de 2 000 FCFA. Quel est le coût unitaire moyen de fabrication si la production est portée à 30 000 unités ?',
                    dataset: { cf: 30000000, cvu: 2000, q: 30000 },
                    hints: [
                      'Charge fixe unitaire = 30 000 000 / 30 000 = 1 000 FCFA.',
                      'Coût unitaire total = Coût variable (2 000) + Charge fixe unitaire (1 000).',
                    ],
                    expectedAnswer: 3000,
                    detailedCorrection: 'Coût unitaire = 2 000 + (30 000 000 / 30 000) = 3 000 FCFA par unité.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CTRL_SIM_01',
                    title: 'Atelier Pratique : Modélisation des Coûts Fixes et Variables dans le Simulateur',
                    type: 'simulator',
                    targetComponentId: 'breakeven_simulator',
                    completionCriteria: {
                      metric: 'costFunctionModelled',
                      targetValue: 1,
                      description: 'Configurer la structure de coûts et observer l\'évolution du coût unitaire.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CTRL_01',
                      question: 'Que devient le coût fixe unitaire lorsque le volume d\'activité de l\'entreprise augmente ?',
                      options: [
                        'Il diminue mécaniquement car le coût fixe total est réparti sur un plus grand nombre d\'unités',
                        'Il augmente proportionnellement',
                        'Il reste strictement constant',
                        'Il double automatiquement',
                      ],
                      correctIndex: 0,
                      explanation: 'C\'est le principe fondamental de la dilution des charges fixes (économies d\'échelle) : plus on produit, plus la quote-part fixe par unité diminue.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La distinction Fixe / Variable est le socle de toute la comptabilité de gestion décisionnelle.',
                    'Le coût complet unitaire varie avec l\'activité, tandis que le coût variable unitaire reste stable.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 2 pour calculer le seuil de rentabilité et le point mort en jours de chiffre d\'affaires.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CTRL_M1',
            moduleId: 'CTRL_MOD_1',
            title: 'Évaluation Certifiante : Typologie et Comportement des Coûts',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CTRL_1',
                question: 'Parmi ces charges, laquelle est indiscutablement une charge fixe d\'exploitation à court terme ?',
                options: [
                  'Le loyer mensuel du siège social et des entrepôts de stockage',
                  'Les emballages cartonnés consommés pour l\'expédition',
                  'La commission de 3% versée aux commerciaux sur les ventes',
                  'La matière première de cacao consommée en usine',
                ],
                correctIndex: 0,
                explanation: 'Le loyer commercial d\'un bail professionnel est indépendant du volume d\'activité réalisé par l\'entreprise.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 2 : SEUIL DE RENTABILITÉ & POINT MORT
    // ------------------------------------------------------------------------
    {
      id: 'CTRL_NIV_2',
      pathId: 'PATH_CONTROLE_GESTION_360',
      levelNumber: 2,
      title: 'Niveau 2 : Seuil de Rentabilité, Marge sur Coût Variable & Point Mort',
      description: 'Calculer le chiffre d\'affaires critique (SR), le taux de marge sur coût variable et la date du point mort en jours.',
      targetMastery: 'Déterminer le volume minimal d\'activité pour couvrir les charges fixes et dégager du profit.',
      modules: [
        {
          id: 'CTRL_MOD_2',
          levelId: 'CTRL_NIV_2',
          pathId: 'PATH_CONTROLE_GESTION_360',
          moduleNumber: 2,
          title: 'Module 2 : Le Modèle Coût-Volume-Profit (CVP)',
          description: 'Marge sur coût variable (MSCV), indice de sécurité, levier opérationnel et point mort calendaire.',
          competencyCodes: ['CTRL-PERFORMANCE'],
          durationHours: 6,
          chapters: [
            {
              id: 'CTRL_CHAP_2_1',
              moduleId: 'CTRL_MOD_2',
              title: 'Chapitre 1 : Formules et Indicateurs de Risque d\'Exploitation',
              description: 'Calcul mathématique et interprétation managériale du Seuil de Rentabilité.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CTRL_02',
                  chapterId: 'CTRL_CHAP_2_1',
                  moduleId: 'CTRL_MOD_2',
                  pathId: 'PATH_CONTROLE_GESTION_360',
                  title: 'Leçon 1 : Calcul du Seuil de Rentabilité, Taux de MSCV et Point Mort',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Calculer la Marge sur Coût Variable (MSCV = CA - CV).',
                    'Calculer le Taux de Marge sur Coût Variable (Tx MSCV = MSCV / CA).',
                    'Calculer le Seuil de Rentabilité en valeur (SR = CF / Tx MSCV) et en volume.',
                    'Calculer le Point Mort en jours calendaires (PM = (SR / CA) x 360).',
                    'Interpréter la Marge de Sécurité et l\'Indice de Sécurité.',
                  ],
                  prerequisites: ['Maîtrise de la séparation charges fixes / variables.'],
                  contextIntro: 'À quel moment de l\'année une entreprise commence-t-elle véritablement à gagner de l\'argent ? Le Seuil de Rentabilité est le chiffre d\'affaires pour lequel l\'entreprise ne réalise ni bénéfice ni perte (Résultat = 0). C\'est l\'indicateur de survie fondamental de tout chef d\'entreprise.',
                  theorySections: [
                    {
                      title: '1. Les Équations du Modèle Coût-Volume-Profit',
                      content: 'La Marge sur Coût Variable (MSCV) représente la part du chiffre d\'affaires qui reste disponible après avoir payé tous les coûts variables pour financer les charges fixes. Dès que la somme cumulée des MSCV égale le montant des charges fixes, le seuil de rentabilité est atteint. Au-delà, chaque franc supplémentaire de MSCV devient directement un franc de bénéfice net d\'exploitation.',
                      keyDefinitions: [
                        { term: 'Seuil de Rentabilité (SR)', definition: 'Niveau de chiffre d\'affaires hors taxes pour lequel le résultat d\'exploitation est exactement égal à zéro.' },
                        { term: 'Point Mort (PM)', definition: 'Date calendaire à laquelle le seuil de rentabilité est franchi au cours de l\'exercice.' },
                        { term: 'Indice de Sécurité', definition: 'Pourcentage de baisse de chiffre d\'affaires que l\'entreprise peut supporter avant de tomber en perte : (CA - SR) / CA.' },
                      ],
                      rulesAndPrinciples: [
                        'Plus le taux de MSCV est élevé, plus le seuil de rentabilité est bas et facile à atteindre.',
                        'Une entreprise avec de fortes charges fixes a un risque d\'exploitation élevé : son résultat chute très vite si le CA baisse (effet de levier opérationnel).',
                      ],
                      formulas: [
                        {
                          name: 'Seuil de Rentabilité en FCFA',
                          formula: 'SR = Charges Fixes Totales / Taux de Marge sur Coût Variable',
                          interpretation: 'Chiffre d\'affaires critique indispensable pour éviter la faillite opérationnelle.',
                          syscohadaRef: 'Contrôle de Gestion Industriel & Commercial',
                        },
                        {
                          name: 'Point Mort en Jours',
                          formula: 'Point Mort = (Seuil de Rentabilité / Chiffre d\'Affaires Réel) x 360 jours',
                          interpretation: 'Nombre de jours d\'activité nécessaires pour amortir l\'ensemble des coûts fixes de l\'exercice.',
                        },
                      ],
                      commonMistakes: [
                        'Calculer le seuil de rentabilité en intégrant la TVA : le seuil se calcule TOUJOURS en chiffre d\'affaires Hors Taxes.',
                        'Penser que franchir le point mort garantit d\'avoir de la trésorerie en banque : si les clients ne paient pas, le BFR absorbe le cash !',
                      ],
                      professionalBestPractices: [
                        'Calculer un seuil de rentabilité mensuel glissant pour alerter la direction dès le 15 du mois.',
                      ],
                      memorizationTips: [
                        'SR = Fixe / Taux de Marge. Point Mort = La date où le bénéfice commence.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul basique du Seuil de Rentabilité',
                    scenario: 'Une entreprise de distribution réalise un CA HT de 100 000 000 FCFA. Ses charges variables sont de 60 000 000 FCFA. Ses charges fixes sont de 20 000 000 FCFA.',
                    dataset: { ca: 100000000, cv: 60000000, cf: 20000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la MSCV', calculation: '100 000 000 - 60 000 000 = 40 000 000 FCFA', justification: 'Marge générée par les ventes.' },
                      { step: 2, action: 'Taux de MSCV', calculation: '40 000 000 / 100 000 000 = 40% (0,40)', justification: 'Chaque 100 FCFA de vente génère 40 FCFA de marge.' },
                      { step: 3, action: 'Calcul du Seuil de Rentabilité', calculation: 'SR = 20 000 000 / 0,40 = 50 000 000 FCFA', justification: 'L\'entreprise commence à faire du bénéfice dès 50M de CA.' },
                      { step: 4, action: 'Point Mort en jours', calculation: '(50 000 000 / 100 000 000) x 360 = 180 jours (soit le 30 juin)', justification: 'L\'entreprise équilibre ses comptes au bout de 6 mois.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Impact d\'une baisse de prix de 10% sur le Seuil de Rentabilité',
                    scenario: 'Le gérant décide d\'accorder une remise permanente de 10% sur les prix de vente pour contrer un concurrent, sans réduire ses coûts variables ni ses charges fixes.',
                    dataset: { caInitial: 100000000, caRemise: 90000000, cv: 60000000, cf: 20000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Nouvelle MSCV', calculation: '90 000 000 - 60 000 000 = 30 000 000 FCFA', justification: 'La marge chute de 25%.' },
                      { step: 2, action: 'Nouveau Taux de MSCV', calculation: '30 000 000 / 90 000 000 = 33,33%', justification: 'L\'érosion de la marge affaiblit l\'efficacité commerciale.' },
                      { step: 3, action: 'Nouveau Seuil de Rentabilité', calculation: '20 000 000 / (1/3) = 60 000 000 FCFA', justification: 'Le seuil saute de 50M à 60M (+20% de ventes exigées pour ne pas perdre d\'argent).' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Société Ivoirienne de Biscuiterie (SIB SA)',
                    locationContext: 'Abidjan, Zone Industrielle Koumassi',
                    sector: 'Agroalimentaire',
                    currency: 'FCFA',
                    problemStatement: 'SIB SA a investi dans une nouvelle halle de fabrication augmentant ses charges fixes de 36 000 000 à 60 000 000 FCFA par an. Avec un taux de MSCV de 30%, son seuil de rentabilité est passé de 120M à 200M FCFA. La crise des approvisionnements ayant limité le CA à 180M FCFA, l\'entreprise est entrée en déficit.',
                    financialStatements: {
                      chiffreAffairesReel: 180000000,
                      chargesFixesNouvelles: 60000000,
                      tauxMSCV: 0.30,
                      seuilRentabiliteNouveau: 200000000,
                      perteConstatee: -6000000,
                    },
                    realWorldResolution: 'Le contrôleur de gestion a renégocié les contrats de sous-traitance pour transformer 12 000 000 FCFA de charges fixes en charges variables et a optimisé la recette des biscuits pour porter le taux de MSCV à 34%. Nouveau SR = 48 000 000 / 0,34 = 141 176 470 FCFA. L\'entreprise redevient profitable avec 13,2M de bénéfice.',
                    recommendationToBoard: 'Soumettre tout plan d\'investissement à un stress test du seuil de rentabilité sous hypothèse de CA dégradé de -25%.',
                  },
                  guidedExercise: {
                    id: 'EX_CTRL_GUIDED_02',
                    title: 'Exercice Guidé : Calcul du point mort en jours',
                    instruction: 'Une entreprise a un chiffre d\'affaires annuel de 240 000 000 FCFA. Ses charges fixes sont de 48 000 000 FCFA et son taux de marge sur coût variable est de 40%. Quel est le Seuil de Rentabilité en FCFA ?',
                    dataset: { ca: 240000000, cf: 48000000, tauxMSCV: 0.40 },
                    stepByStepHelp: [
                      'Formule : SR = Charges Fixes / Taux MSCV.',
                      '48 000 000 / 0,40.',
                    ],
                    expectedAnswer: 120000000,
                    detailedCorrection: 'Seuil de Rentabilité = 48 000 000 / 0,40 = 120 000 000 FCFA (soit exactement 50% de l\'activité annuelle, point mort au 180e jour).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CTRL_AUTO_02',
                    title: 'Exercice Autonome : Marge de sécurité',
                    instruction: 'Le chiffre d\'affaires réel d\'une société de services est de 300 000 000 FCFA. Son seuil de rentabilité calculé est de 225 000 000 FCFA. Quel est le montant de sa Marge de Sécurité en FCFA (CA - SR) ?',
                    dataset: { ca: 300000000, sr: 225000000 },
                    hints: [
                      'Marge de sécurité = Chiffre d\'affaires réel - Seuil de rentabilité.',
                      '300 000 000 - 225 000 000 FCFA.',
                    ],
                    expectedAnswer: 75000000,
                    detailedCorrection: 'Marge de sécurité = 300 000 000 - 225 000 000 = 75 000 000 FCFA (l\'activité peut baisser de 25% sans tomber dans le déficit).',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CTRL_SIM_02',
                    title: 'Atelier Pratique : Simulateur de Seuil de Rentabilité & Sensibilité',
                    type: 'simulator',
                    targetComponentId: 'breakeven_simulator',
                    completionCriteria: {
                      metric: 'breakevenSolved',
                      targetValue: 1,
                      description: 'Calculer le point mort et simuler l\'impact d\'une variation des prix.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CTRL_02',
                      question: 'Que se passe-t-il lorsque le chiffre d\'affaires réel dépasse le Seuil de Rentabilité ?',
                      options: [
                        'Chaque franc de marge sur coût variable supplémentaire devient directement un franc de résultat d\'exploitation',
                        'Les charges fixes se remettent à augmenter',
                        'L\'entreprise doit payer une pénalité',
                        'Le résultat retombe à zéro',
                      ],
                      correctIndex: 0,
                      explanation: 'Puisque la totalité des charges fixes est déjà absorbée au seuil de rentabilité, tout surplus de MSCV constitue intégralement du bénéfice d\'exploitation.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le Seuil de Rentabilité est la boussole de sécurité d\'exploitation de toute entreprise.',
                    'Le pilotage par le taux de MSCV permet d\'anticiper les dégradations de rentabilité avant la clôture.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 3 pour maîtriser l\'architecture du budget flexible et l\'ajustement à l\'activité réelle.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CTRL_M2',
            moduleId: 'CTRL_MOD_2',
            title: 'Évaluation Certifiante : Seuil de Rentabilité et Modèle Coût-Volume-Profit',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CTRL_2',
                question: 'Si le chiffre d\'affaires est de 80 millions FCFA et le seuil de rentabilité est de 100 millions FCFA, quelle est la situation de l\'entreprise ?',
                options: [
                  'Elle est en déficit d\'exploitation car elle n\'a pas encore couvert la totalité de ses charges fixes',
                  'Elle fait un bénéfice de 20 millions FCFA',
                  'Son point mort est atteint au mois d\'août',
                  'Sa marge de sécurité est positive',
                ],
                correctIndex: 0,
                explanation: 'Tant que le CA reste inférieur au seuil de rentabilité (80M < 100M), les charges fixes ne sont pas entièrement couvertes et l\'entité subit une perte.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 3 : BUDGETS FLEXIBLES & AJUSTEMENT D'ACTIVITÉ
    // ------------------------------------------------------------------------
    {
      id: 'CTRL_NIV_3',
      pathId: 'PATH_CONTROLE_GESTION_360',
      levelNumber: 3,
      title: 'Niveau 3 : Architecture Budgétaire & Budget Flexible',
      description: 'Construire un budget flexible capable d\'ajuster automatiquement les prévisions de charges au volume d\'activité réel.',
      targetMastery: 'Éviter le piège du budget fixe et isoler l\'impact de l\'activité sur les coûts.',
      modules: [
        {
          id: 'CTRL_MOD_3',
          levelId: 'CTRL_NIV_3',
          pathId: 'PATH_CONTROLE_GESTION_360',
          moduleNumber: 3,
          title: 'Module 3 : Du Budget Fixe au Budget Flexible',
          description: 'Calcul des coûts préétablis ajustés au volume réel et calcul de l\'écart global d\'activité.',
          competencyCodes: ['CTRL-PERFORMANCE'],
          durationHours: 6,
          chapters: [
            {
              id: 'CTRL_CHAP_3_1',
              moduleId: 'CTRL_MOD_3',
              title: 'Chapitre 1 : Mécanisme du Budget Flexible',
              description: 'Formule budgétaire standardisée B(Q) = CF_budget + (cv_budget x Q_réelle).',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CTRL_03',
                  chapterId: 'CTRL_CHAP_3_1',
                  moduleId: 'CTRL_MOD_3',
                  pathId: 'PATH_CONTROLE_GESTION_360',
                  title: 'Leçon 1 : Construction et Utilisation du Budget Flexible',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Comprendre l\'injustice managériale d\'un budget fixe face à des variations de volume.',
                    'Construire le budget flexible pour le niveau d\'activité réel.',
                    'Distinguer l\'Écart d\'Activité (lié aux volumes) de l\'Écart sur Coûts (lié à la performance industrielle).',
                  ],
                  prerequisites: ['Maîtrise des charges fixes et variables.'],
                  contextIntro: 'Comparer les dépenses réelles d\'une usine qui a fabriqué 12 000 unités avec un budget prévisionnel établi sur la base de 10 000 unités est une faute de gestion majeure : il est normal que les coûts variables soient plus élevés ! Le budget flexible recalcule ce que les dépenses AURAIENT DÛ être pour 12 000 unités.',
                  theorySections: [
                    {
                      title: '1. Le Principe du Budget Flexible',
                      content: 'Le budget flexible représente le coût prévisionnel ajusté au volume d\'activité réellement constaté. Il maintient les charges fixes prévues constantes et recalcule les charges variables en multipliant le coût variable unitaire standard par la quantité réelle produite : Budget Flexible = CF_budget + (cv_standard x Q_réelle).',
                      keyDefinitions: [
                        { term: 'Budget Fixe', definition: 'Budget initial établi pour un volume de production prévu unique sans possibilité d\'ajustement.' },
                        { term: 'Budget Flexible', definition: 'Budget dynamique recalculant les charges autorisées pour le niveau réel d\'activité constaté.' },
                      ],
                      rulesAndPrinciples: [
                        'Toute analyse de performance opérationnelle doit comparer le Réel au Budget Flexible (et non au Budget Fixe).',
                      ],
                      formulas: [
                        {
                          name: 'Budget Flexible',
                          formula: 'Budget Flexible = Charges Fixes Budgétées + (Coût Variable Unitaire Standard x Production Réelle)',
                          interpretation: 'Dépense théorique autorisée pour le volume réel fabriqué.',
                          syscohadaRef: 'Standards Internationaux de Contrôle de Gestion',
                        },
                      ],
                      commonMistakes: [
                        'Ajuster les charges fixes au volume : les charges fixes restent fixes dans le budget flexible !',
                      ],
                      professionalBestPractices: [
                        'Définir clairement les unités d\'œuvre (heures machine, kg produits) servant d\'inducteurs pour le budget flexible.',
                      ],
                      memorizationTips: [
                        'Flexible = Fixes initiales + Variables au réel.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du budget flexible pour une usine d\'assemblage',
                    scenario: 'Budget initial : 10 000 unités prévues. CF = 5 000 000 FCFA, cv standard = 1 000 FCFA/unité (Budget Fixe = 15 000 000 FCFA). Production réelle constatée : 12 000 unités.',
                    dataset: { qReelle: 12000, cfBudget: 5000000, cvuStandard: 1000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul des charges variables autorisées', calculation: '1 000 FCFA x 12 000 = 12 000 000 FCFA', justification: 'Coût variable pour le volume réel.' },
                      { step: 2, action: 'Ajout des charges fixes', calculation: '12 000 000 + 5 000 000 = 17 000 000 FCFA', justification: 'Les charges fixes ne changent pas.' },
                      { step: 3, action: 'Budget flexible', calculation: 'Le budget flexible s\'élève à 17 000 000 FCFA', justification: 'Si les dépenses réelles sont de 16 500 000 FCFA, l\'usine a en réalité réalisé une économie de 500 000 FCFA (malgré le dépassement apparent du budget fixe de 15M).' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Décomposition Écart Total = Écart d\'Activité + Écart sur Budget',
                    scenario: 'Budget fixe = 15 000 000 FCFA (pour 10 000 u). Budget flexible = 17 000 000 FCFA (pour 12 000 u). Coût réel constaté = 17 400 000 FCFA.',
                    dataset: { budgetFixe: 15000000, budgetFlexible: 17000000, coutReel: 17400000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Écart d\'Activité (Volume)', calculation: 'Budget Flexible - Budget Fixe = 17 000 000 - 15 000 000 = +2 000 000 FCFA', justification: 'Surcoût normal imputable à la hausse de 20% de la production.' },
                      { step: 2, action: 'Écart sur Budget (Performance)', calculation: 'Coût Réel - Budget Flexible = 17 400 000 - 17 000 000 = +400 000 FCFA (Défavorable)', justification: 'Dérive réelle de consommation ou de prix unitaire.' },
                      { step: 3, action: 'Écart Total', calculation: '2 000 000 + 400 000 = +2 400 000 FCFA', justification: 'L\'écart réel est parfaitement décomposé.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Huilerie Moderne de San Pedro (HMSP SA)',
                    locationContext: 'San Pedro, Côte d\'Ivoire',
                    sector: 'Raffinage d\'huile de palme',
                    currency: 'FCFA',
                    problemStatement: 'La direction générale reprochait au directeur d\'usine d\'avoir dépassé son budget d\'exploitation de 45 000 000 FCFA (dépenses réelles de 295M contre un budget de 250M). L\'usine avait pourtant produit 30% d\'huile de plus que prévu.',
                    financialStatements: {
                      budgetFixeInitial: 250000000,
                      depensesReelles: 295000000,
                      productionPrevueTonnes: 10000,
                      productionReelleTonnes: 13000,
                      budgetFlexibleCalcule: 310000000,
                    },
                    realWorldResolution: 'Le contrôleur de gestion a dressé le budget flexible pour 13 000 tonnes : 310 000 000 FCFA autorisés. L\'usine ayant dépensé 295M, elle a en réalité généré une économie industrielle de 15 000 000 FCFA par rapport au standard. Le directeur d\'usine a reçu ses félicitations et sa prime de performance.',
                    recommendationToBoard: 'Bannir formellement les revues budgétaires sur budget fixe pour toutes les entités industrielles du groupe.',
                  },
                  guidedExercise: {
                    id: 'EX_CTRL_GUIDED_03',
                    title: 'Exercice Guidé : Calcul du budget flexible',
                    instruction: 'Le budget fixe d\'un atelier comprend 8 000 000 FCFA de charges fixes et 500 FCFA de coût variable par unité pour 20 000 unités prévues. Quel est le montant du Budget Flexible si la production réelle s\'élève à 25 000 unités ?',
                    dataset: { cf: 8000000, cvu: 500, qReelle: 25000 },
                    stepByStepHelp: [
                      '1. Coût variable flexible = 500 x 25 000 = 12 500 000 FCFA.',
                      '2. Budget flexible = 8 000 000 + 12 500 000 FCFA.',
                    ],
                    expectedAnswer: 20500000,
                    detailedCorrection: 'Budget flexible = 8 000 000 + (500 x 25 000) = 20 500 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CTRL_AUTO_03',
                    title: 'Exercice Autonome : Calcul de l\'écart sur budget',
                    instruction: 'Le budget flexible calculé pour la production réelle est de 45 000 000 FCFA. Les dépenses réelles constatées dans les comptes sont de 43 200 000 FCFA. Quel est le montant de l\'écart sur budget en valeur absolue (économie réalisée) ?',
                    dataset: { budgetFlexible: 45000000, coutReel: 43200000 },
                    hints: [
                      'Économie = Budget Flexible - Coût Réel.',
                      '45 000 000 - 43 200 000 FCFA.',
                    ],
                    expectedAnswer: 1800000,
                    detailedCorrection: 'Économie réalisée = 45 000 000 - 43 200 000 = 1 800 000 FCFA (écart favorable).',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CTRL_SIM_03',
                    title: 'Atelier Pratique : Budget Flexible dans le Simulateur de Variance',
                    type: 'simulator',
                    targetComponentId: 'variance_simulator',
                    completionCriteria: {
                      metric: 'flexibleBudgetConfigured',
                      targetValue: 1,
                      description: 'Ajuster les paramètres de volume et calculer le budget flexible.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CTRL_03',
                      question: 'Pourquoi comparer le coût réel directement avec le budget fixe initial est-il considéré comme une erreur d\'évaluation ?',
                      options: [
                        'Parce que cette comparaison confond la performance opérationnelle des équipes avec les variations de volume commercial',
                        'Parce que le budget fixe est toujours faux',
                        'Parce que la loi fiscale l\'interdit',
                        'Parce que les coûts variables ne changent jamais',
                      ],
                      correctIndex: 0,
                      explanation: 'Le budget fixe ne tient pas compte des quantités réelles : une usine qui produit plus aura des coûts totaux supérieurs sans que cela ne constitue une faute de gestion.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le budget flexible est le seul instrument équitable et rigoureux de contrôle des coûts d\'exploitation.',
                    'Il permet d\'isoler l\'impact du marché (volume) de la performance des ateliers (consommations).',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 4 pour décomposer les écarts en sous-écarts de Volume, Prix et Rendement.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CTRL_M3',
            moduleId: 'CTRL_MOD_3',
            title: 'Évaluation Certifiante : Budgets Flexibles et Performance d\'Atelier',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CTRL_3',
                question: 'Dans un budget flexible, comment évolue le montant des charges fixes budgétées ?',
                options: [
                  'Elles restent strictement inchangées par rapport au budget initial',
                  'Elles augmentent proportionnellement au volume',
                  'Elles sont divisées par le nombre de mois',
                  'Elles sont supprimées',
                ],
                correctIndex: 0,
                explanation: 'Par définition, les charges fixes ne varient pas avec le niveau d\'activité : elles restent au montant voté dans le budget.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 4 : ANALYSE DES ÉCARTS (VOLUME / PRIX / RENDEMENT)
    // ------------------------------------------------------------------------
    {
      id: 'CTRL_NIV_4',
      pathId: 'PATH_CONTROLE_GESTION_360',
      levelNumber: 4,
      title: 'Niveau 4 : Analyse des Écarts & Décomposition Volume / Prix / Rendement',
      description: 'Décomposer l\'écart global sur matières et main-d\'œuvre en écart sur prix (P_réel - P_std) et écart sur quantité (Q_réelle - Q_std).',
      targetMastery: 'Identifier les responsables opérationnels des dérives budgétaires (Achats vs Production).',
      modules: [
        {
          id: 'CTRL_MOD_4',
          levelId: 'CTRL_NIV_4',
          pathId: 'PATH_CONTROLE_GESTION_360',
          moduleNumber: 4,
          title: 'Module 4 : La Décomposition Standard des Variances',
          description: 'Calcul mathématique des sous-écarts sur coûts directs et analyse causale.',
          competencyCodes: ['CTRL-PERFORMANCE'],
          durationHours: 6,
          chapters: [
            {
              id: 'CTRL_CHAP_4_1',
              moduleId: 'CTRL_MOD_4',
              title: 'Chapitre 1 : Mécanisme de Décomposition Algébrique',
              description: 'Écart sur Prix = (Pr - Ps) x Qr. Écart sur Quantité = (Qr - Qs) x Ps.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CTRL_04',
                  chapterId: 'CTRL_CHAP_4_1',
                  moduleId: 'CTRL_MOD_4',
                  pathId: 'PATH_CONTROLE_GESTION_360',
                  title: 'Leçon 1 : Décomposition de l\'Écart sur Coûts Directs (Matières & MO)',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Calculer l\'Écart sur Prix d\'achat des matières premières.',
                    'Calculer l\'Écart sur Quantité / Rendement matière.',
                    'Vérifier que Écart Total = Écart sur Prix + Écart sur Quantité.',
                    'Attribuer la responsabilité de chaque écart : Responsable Achats (prix) vs Directeur Usine (rendement/gaspillage).',
                  ],
                  prerequisites: ['Maîtrise du budget flexible.'],
                  contextIntro: 'Constater qu\'un atelier a dépensé 5 000 000 FCFA de trop en matière première est insuffisant. Est-ce parce que le service Achats a payé la matière plus cher que prévu sur le marché international, ou parce que les ouvriers ont fait du gaspillage et des rebuts ? La décomposition des écarts répond précisément à cette question.',
                  theorySections: [
                    {
                      title: '1. Formules Standards de Décomposition des Écarts',
                      content: 'Coût Réel = Qr x Pr. Coût Préétabli / Standard = Qs x Ps. L\'écart total (Qr x Pr - Qs x Ps) se scinde en deux effets : 1. Écart sur Prix = (Pr - Ps) x Qr (mesure l\'effet de la négociation des achats valorisée sur les quantités réelles consommées). 2. Écart sur Quantité / Rendement = (Qr - Qs) x Ps (mesure l\'efficacité technique de l\'atelier valorisée au prix standard pour ne pas être polluée par les variations de prix).',
                      keyDefinitions: [
                        { term: 'Écart sur Prix', definition: 'Différence entre le prix unitaire réel payé et le prix standard budgété, multipliée par la quantité réelle.' },
                        { term: 'Écart sur Rendement / Quantité', definition: 'Différence entre la quantité réelle consommée et la quantité standard autorisée, multipliée par le prix unitaire standard.' },
                      ],
                      rulesAndPrinciples: [
                        'La somme des sous-écarts doit redonner exactement l\'écart global : Écart Global = Écart Prix + Écart Quantité.',
                        'Un écart est dit défavorable s\'il augmente les coûts par rapport au budget (signe positif ou mention D), et favorable s\'il les réduit (signe négatif ou mention F).',
                      ],
                      formulas: [
                        {
                          name: 'Décomposition Fondamentale',
                          formula: 'Écart Prix = (Pr - Ps) x Qr et Écart Quantité = (Qr - Qs) x Ps',
                          interpretation: 'Formule universelle de la comptabilité analytique de gestion.',
                          syscohadaRef: 'Standards Contrôle de Gestion Industriel',
                        },
                      ],
                      commonMistakes: [
                        'Multiplier l\'écart de quantité par le prix réel au lieu du prix standard : cela réintroduit un effet croisé et fausse l\'évaluation de l\'atelier.',
                      ],
                      professionalBestPractices: [
                        'Présenter les écarts sous forme de graphique en cascade (Waterfall chart) pour les comités de direction.',
                      ],
                      memorizationTips: [
                        'Prix = Écart de P x Q réel. Quantité = Écart de Q x P standard.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Décomposition d\'un surcoût de farine en biscuiterie',
                    scenario: 'Pour fabriquer 10 000 paquets de biscuits : Standard = 2 000 kg à 500 FCFA/kg (soit 1 000 000 FCFA). Réel = 2 200 kg consommés à 550 FCFA/kg (soit 1 210 000 FCFA). Écart total = +210 000 FCFA défavorable.',
                    dataset: { ps: 500, qs: 2000, pr: 550, qr: 2200 },
                    stepByStepSolution: [
                      { step: 1, action: 'Écart sur Prix', calculation: '(550 - 500) x 2 200 = +50 x 2 200 = +110 000 FCFA (Défavorable)', justification: 'Surcoût dû à la hausse du prix d\'achat du sac de farine.' },
                      { step: 2, action: 'Écart sur Quantité', calculation: '(2 200 - 2 000) x 500 = +200 x 500 = +100 000 FCFA (Défavorable)', justification: 'Surconsommation de 200 kg en atelier valorisée au prix standard.' },
                      { step: 3, action: 'Vérification de bouclage', calculation: '110 000 + 100 000 = +210 000 FCFA', justification: 'L\'écart total de 210 000 FCFA est parfaitement expliqué.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Écart de prix favorable masquant un gaspillage matière',
                    scenario: 'Standard : 5 000 mètres de tissu à 1 000 FCFA/m (5 000 000 FCFA). Réel : 5 500 mètres achetés à 900 FCFA/m (4 950 000 FCFA). Écart global apparent = -50 000 FCFA (Favorable).',
                    dataset: { ps: 1000, qs: 5000, pr: 900, qr: 5500 },
                    stepByStepSolution: [
                      { step: 1, action: 'Écart sur Prix', calculation: '(900 - 1 000) x 5 500 = -100 x 5 500 = -550 000 FCFA (Favorable)', justification: 'L\'acheteur a obtenu un tissu au rabais.' },
                      { step: 2, action: 'Écart sur Quantité', calculation: '(5 500 - 5 000) x 1 000 = +500 x 1 000 = +500 000 FCFA (Défavorable)', justification: 'Le tissu de mauvaise qualité s\'est déchiré, provoquant 500m de déchets supplémentaires !' },
                      { step: 3, action: 'Conclusion d\'audit', calculation: 'L\'économie apparente de 50 000 FCFA cachait un défaut de qualité matière critique', justification: 'L\'analyse décomposée révèle la vraie performance opérationnelle.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Chocolaterie d\'Abidjan (CHOC-CI SA)',
                    locationContext: 'Abidjan, Zone Industrielle Vridi',
                    sector: 'Transformation de cacao',
                    currency: 'FCFA',
                    problemStatement: 'CHOC-CI affichait une dérive budgétaire de 28 000 000 FCFA sur le beurre de cacao. Le directeur des achats et le chef d\'usine se renvoyaient la responsabilité.',
                    financialStatements: {
                      quantiteStandardKg: 100000,
                      prixStandardKg: 2000,
                      quantiteReelleKg: 108000,
                      prixReelKg: 2111.11,
                      coutReelTotal: 228000000,
                      ecartTotalDefavorable: 28000000,
                    },
                    realWorldResolution: 'Le contrôleur de gestion a calculé : Écart sur Prix = (2 111,11 - 2 000) x 108 000 = +12 000 000 FCFA (hausse des cours mondiaux). Écart sur Quantité = (108 000 - 100 000) x 2 000 = +16 000 000 FCFA (mauvais réglage des presses à beurre entraînant 8 000 kg de rebuts). Responsabilité partagée mais prépondérante de la maintenance des machines.',
                    recommendationToBoard: 'Mettre en place un plan de maintenance préventive des presses pour stopper les 16 millions de pertes par rebuts.',
                  },
                  guidedExercise: {
                    id: 'EX_CTRL_GUIDED_04',
                    title: 'Exercice Guidé : Calcul de l\'écart sur prix',
                    instruction: 'Pour la fabrication d\'un lot, 5 000 kg de plastique ont été achetés à 850 FCFA/kg au lieu du prix standard prévu de 800 FCFA/kg. Quel est le montant de l\'Écart sur Prix en FCFA (Pr - Ps) x Qr ?',
                    dataset: { qr: 5000, pr: 850, ps: 800 },
                    stepByStepHelp: [
                      '1. Écart unitaire de prix = 850 - 800 = +50 FCFA.',
                      '2. Écart sur prix total = 50 x 5 000 FCFA.',
                    ],
                    expectedAnswer: 250000,
                    detailedCorrection: 'Écart sur Prix = (850 - 800) x 5 000 = +250 000 FCFA (défavorable pour les achats).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CTRL_AUTO_04',
                    title: 'Exercice Autonome : Calcul de l\'écart sur quantité',
                    instruction: 'Le standard prévoyait 1 200 heures de travail au taux horaire standard de 2 500 FCFA/heure. L\'équipe a consommé 1 350 heures réelles. Quel est le montant de l\'Écart sur Quantité / Rendement de main-d\'œuvre en FCFA (Qr - Qs) x Ps ?',
                    dataset: { qs: 1200, qr: 1350, ps: 2500 },
                    hints: [
                      'Surconsommation d\'heures = 1 350 - 1 200 = 150 heures.',
                      'Multipliez par le taux standard : 150 x 2 500 FCFA.',
                    ],
                    expectedAnswer: 375000,
                    detailedCorrection: 'Écart sur Quantité = (1 350 - 1 200) x 2 500 = +375 000 FCFA (défavorable, baisse de productivité de 150 heures).',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CTRL_SIM_04',
                    title: 'Atelier Pratique : Décomposition Complète dans le Simulateur d\'Écarts',
                    type: 'simulator',
                    targetComponentId: 'variance_simulator',
                    completionCriteria: {
                      metric: 'variancesDecomposed',
                      targetValue: 1,
                      description: 'Isoler l\'écart prix et l\'écart quantité et interpréter les résultats.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CTRL_04',
                      question: 'Dans la formule de l\'Écart sur Quantité (Qr - Qs) x Ps, pourquoi valorise-t-on la différence au prix standard Ps plutôt qu\'au prix réel Pr ?',
                      options: [
                        'Pour isoler strictement la performance technique de l\'atelier sans qu\'elle soit faussée par les variations de prix négociées par les achats',
                        'Parce que le prix réel est inconnu',
                        'Pour réduire artificiellement l\'écart',
                        'Parce que le SYSCOHADA l\'exige',
                      ],
                      correctIndex: 0,
                      explanation: 'La valorisation au prix standard permet d\'évaluer la productivité de l\'atelier de manière pure et indépendante des conditions de marché obtenues par le service des achats.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'analyse des écarts transforme la comptabilité de gestion en outil de responsabilisation des managers.',
                    'L\'écart sur prix incombe aux achats, l\'écart sur quantité incombe à l\'encadrement de production.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 5 pour maîtriser la comptabilité analytique et la répartition des charges indirectes.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CTRL_M4',
            moduleId: 'CTRL_MOD_4',
            title: 'Évaluation Certifiante : Analyse et Décomposition des Écarts de Coûts',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CTRL_4',
                question: 'Si le prix réel est inférieur au prix standard, comment qualifie-t-on l\'écart sur prix ?',
                options: [
                  'Favorable (car l\'entreprise a payé moins cher que prévu)',
                  'Défavorable (car cela signale un produit de mauvaise qualité)',
                  'Neutre',
                  'Impossible',
                ],
                correctIndex: 0,
                explanation: 'Un coût réel inférieur au standard constitue une économie financière directe, qualifiée d\'écart favorable.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 5 : COMPTABILITÉ ANALYTIQUE & CENTRES D'ANALYSE
    // ------------------------------------------------------------------------
    {
      id: 'CTRL_NIV_5',
      pathId: 'PATH_CONTROLE_GESTION_360',
      levelNumber: 5,
      title: 'Niveau 5 : Comptabilité Analytique & Répartition des Charges Indirectes',
      description: 'Méthode des centres d\'analyse (centres auxiliaires et principaux), clés de répartition et calcul des coûts d\'unités d\'œuvre.',
      targetMastery: 'Déterminer le coût de revient complet d\'un produit ou service sans distorsion.',
      modules: [
        {
          id: 'CPT_MOD_5_CTRL',
          levelId: 'CTRL_NIV_5',
          pathId: 'PATH_CONTROLE_GESTION_360',
          moduleNumber: 5,
          title: 'Module 5 : Affectation des Charges Indirectes et Tableau de Répartition',
          description: 'Répartition primaire et secondaire, prestations croisées et coût des unités d\'œuvre.',
          competencyCodes: ['CTRL-PERFORMANCE'],
          durationHours: 6,
          chapters: [
            {
              id: 'CTRL_CHAP_5_1',
              moduleId: 'CPT_MOD_5_CTRL',
              title: 'Chapitre 1 : Méthodologie des Centres de Responsabilité',
              description: 'Du grand livre financier aux sections analytiques d\'exploitation.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CTRL_05',
                  chapterId: 'CTRL_CHAP_5_1',
                  moduleId: 'CPT_MOD_5_CTRL',
                  pathId: 'PATH_CONTROLE_GESTION_360',
                  title: 'Leçon 1 : Répartition Primaire, Secondaire et Coût d\'Unité d\'Œuvre',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Distinguer charges directes (affectables sans ambiguïté) et indirectes (nécessitant une clé de répartition).',
                    'Dresser le tableau de répartition primaire des charges indirectes par centre.',
                    'Effectuer la répartition secondaire des centres auxiliaires (Administration, Entretien) vers les centres principaux (Atelier, Vente).',
                    'Calculer le Coût de l\'Unité d\'Œuvre (CUO = Coût total du centre / Nombre d\'unités d\'œuvre).',
                  ],
                  prerequisites: ['Maîtrise des charges d\'exploitation.'],
                  contextIntro: 'Comment imputer la facture d\'électricité de 10 millions FCFA ou le salaire du Directeur Général sur une bouteille de jus d\'ananas ou un bidon d\'huile ? La comptabilité analytique structure l\'entreprise en centres de coût et utilise des clés de répartition objectives.',
                  theorySections: [
                    {
                      title: '1. Le Processus en 2 Étapes du Tableau de Répartition',
                      content: '1. Répartition primaire : Les charges indirectes de la classe 6 sont ventilées dans tous les centres (auxiliaires et principaux) à l\'aide de pourcentages ou de mètres carrés. 2. Répartition secondaire : Les centres auxiliaires (qui travaillent pour les autres services, comme la DRH ou la maintenance) sont vidés et déversés dans les centres opérationnels principaux (Atelier Usine, Distribution). 3. Coût de l\'Unité d\'Œuvre = Total après répartition secondaire / Quantité d\'unités d\'œuvre du centre.',
                      keyDefinitions: [
                        { term: 'Unité d\'Œuvre (UO)', definition: 'Inducteur physique mesurant l\'activité d\'un centre analytique (ex: heure machine, heure de main-d\'œuvre directe, tonne transportée).' },
                        { term: 'Centre Auxiliaire', definition: 'Centre de coût fournissant des services d\'appui aux autres départements (ex: informatique, maintenance).' },
                      ],
                      rulesAndPrinciples: [
                        'Après répartition secondaire, le total des centres auxiliaires doit être strictement égal à zéro.',
                      ],
                      formulas: [
                        {
                          name: 'Coût d\'Unité d\'Œuvre (CUO)',
                          formula: 'CUO = Coût Définitif du Centre Principal / Nombre Total d\'Unités d\'Œuvre',
                          interpretation: 'Tarif unitaire à appliquer à chaque produit ayant utilisé les services de ce centre.',
                          syscohadaRef: 'Méthode des Sections Homogènes',
                        },
                      ],
                      commonMistakes: [
                        'Choisir une clé de répartition arbitraire qui pénalise injustement une ligne de produit.',
                      ],
                      professionalBestPractices: [
                        'Auditer les clés de répartition chaque année pour s\'assurer qu\'elles reflètent l\'organisation réelle des flux.',
                      ],
                      memorizationTips: [
                        'Primaire = Vers tous. Secondaire = Auxiliaires vers Principaux.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du coût d\'une heure machine dans un atelier de découpe',
                    scenario: 'Le centre principal « Atelier Découpe » totalise 12 000 000 FCFA de charges après répartition secondaire. Le nombre d\'heures machine programmées est de 3 000 heures.',
                    dataset: { totalCentre: 12000000, nbHeures: 3000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du coût d\'UO', calculation: '12 000 000 / 3 000 = 4 000 FCFA par heure machine', justification: 'Taux de valorisation des prestations du centre.' },
                      { step: 2, action: 'Imputation sur un lot de fabrication', calculation: 'Si un lot a nécessité 5 heures de découpe, il recevra 5 x 4 000 = 20 000 FCFA de charges indirectes', justification: 'Imputation rigoureuse et proportionnelle.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Répartition secondaire d\'un centre Entretien',
                    scenario: 'Le centre auxiliaire Entretien totalise 6 000 000 FCFA. Il travaille à 70% pour l\'Atelier 1 et à 30% pour l\'Atelier 2.',
                    dataset: { totalEntretien: 6000000, cleAtelier1: 0.70, cleAtelier2: 0.30 },
                    stepByStepSolution: [
                      { step: 1, action: 'Déversement sur Atelier 1', calculation: '6 000 000 x 70% = 4 200 000 FCFA', justification: 'Quote-part affectée à l\'Atelier 1.' },
                      { step: 2, action: 'Déversement sur Atelier 2', calculation: '6 000 000 x 30% = 1 800 000 FCFA', justification: 'Quote-part affectée à l\'Atelier 2.' },
                      { step: 3, action: 'Solde du centre Entretien', calculation: '6 000 000 - 4 200 000 - 1 800 000 = 0 FCFA', justification: 'Le centre auxiliaire est parfaitement vidé.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Menuiserie Industrielle d\'Abidjan (MIA SA)',
                    locationContext: 'Abidjan, Zone Industrielle Treichville',
                    sector: 'Fabrication de meubles et portes',
                    currency: 'FCFA',
                    problemStatement: 'MIA répartissait ses 40 millions FCFA de charges d\'atelier au prorata du chiffre d\'affaires de chaque produit. Les portes massives en teck semblaient très rentables alors que les chaises de bureau semblaient déficitaires. La méthode des unités d\'œuvre a révélé le contraire.',
                    financialStatements: {
                      chargesIndirectesAtelier: 40000000,
                      heuresMachineTeck: 1500,
                      heuresMachineChaises: 500,
                      cuoReelHeureMachine: 20000,
                    },
                    realWorldResolution: 'La méthode des UO a démontré que les portes en teck consommaient 75% du temps machine (30 millions de charges réelles contre 15 millions imputés auparavant). Leur coût réel dépassait leur prix de vente de 15%. Révision immédiate du catalogue de prix et redressement de la rentabilité.',
                    recommendationToBoard: 'Adopter la comptabilité analytique par centre d\'analyse pour toute commande sur mesure.',
                  },
                  guidedExercise: {
                    id: 'EX_CTRL_GUIDED_05',
                    title: 'Exercice Guidé : Calcul du coût d\'une unité d\'œuvre',
                    instruction: 'Le centre principal « Assemblage » regroupe 18 000 000 FCFA de charges après répartition secondaire. L\'unité d\'œuvre retenue est l\'heure de main-d\'œuvre directe (MOD). Le total des heures de MOD travaillées est de 6 000 heures. Quel est le Coût de l\'Unité d\'Œuvre (CUO) en FCFA ?',
                    dataset: { totalCharges: 18000000, nbHeuresMOD: 6000 },
                    stepByStepHelp: [
                      'Formule : CUO = Total des charges du centre / Nombre d\'heures MOD.',
                      '18 000 000 / 6 000.',
                    ],
                    expectedAnswer: 3000,
                    detailedCorrection: 'CUO = 18 000 000 / 6 000 = 3 000 FCFA par heure de MOD.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CTRL_AUTO_05',
                    title: 'Exercice Autonome : Coût de revient complet d\'un produit',
                    instruction: 'Pour fabriquer une table, il faut : 15 000 FCFA de bois (matière directe), 8 000 FCFA de salaire d\'ébéniste (MOD directe) et 2 heures d\'atelier dont le coût d\'unité d\'œuvre est de 3 500 FCFA/heure. Quel est le Coût de Revient Complet de la table ?',
                    dataset: { matiere: 15000, mod: 8000, heuresAtelier: 2, cuo: 3500 },
                    hints: [
                      'Charge indirecte = 2 x 3 500 = 7 000 FCFA.',
                      'Coût complet = 15 000 + 8 000 + 7 000 FCFA.',
                    ],
                    expectedAnswer: 30000,
                    detailedCorrection: 'Coût complet = 15 000 + 8 000 + (2 x 3 500) = 30 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CTRL_SIM_05',
                    title: 'Atelier Pratique : Répartition des Charges & Coût de Revient',
                    type: 'simulator',
                    targetComponentId: 'variance_simulator',
                    completionCriteria: {
                      metric: 'costAllocationsComputed',
                      targetValue: 1,
                      description: 'Effectuer la répartition secondaire et calculer le coût de revient.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CTRL_05',
                      question: 'Quelle est la caractéristique d\'une charge directe en comptabilité analytique ?',
                      options: [
                        'Elle peut être affectée immédiatement et sans calcul intermédiaire à un produit ou service déterminé',
                        'Elle est toujours égale à zéro',
                        'Elle ne concerne que la direction',
                        'Elle dépend du taux de TVA',
                      ],
                      correctIndex: 0,
                      explanation: 'Une charge directe (ex: le tissu pour une chemise, le bois pour une table) s\'impute sans clé de répartition sur le coût du produit.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La comptabilité analytique permet de calculer les coûts réels de revient pour fixer des prix de vente rentables.',
                    'Le choix pertinent des unités d\'œuvre évite les subventionnements croisés entre produits.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 6 pour comparer Coûts Complets et Direct Costing et arbitrer la rentabilité des gammes.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CTRL_M5',
            moduleId: 'CPT_MOD_5_CTRL',
            title: 'Évaluation Certifiante : Centres d\'Analyse et Coûts de Revient',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CTRL_5',
                question: 'Que devient le solde d\'un centre auxiliaire (ex: Service Informatique) après la répartition secondaire ?',
                options: [
                  'Son solde devient rigoureusement égal à 0 car il est entièrement transféré aux centres principaux',
                  'Son solde est reporté au bilan',
                  'Il reste inchangé',
                  'Il est payé par chèque',
                ],
                correctIndex: 0,
                explanation: 'La répartition secondaire vide intégralement les centres auxiliaires pour affecter leurs coûts aux centres principaux opérationnels.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 6 : COÛTS COMPLETS VS DIRECT COSTING & MARGES PAR GAMME
    // ------------------------------------------------------------------------
    {
      id: 'CTRL_NIV_6',
      pathId: 'PATH_CONTROLE_GESTION_360',
      levelNumber: 6,
      title: 'Niveau 6 : Direct Costing vs Coûts Complets & Décisions de Gamme',
      description: 'Arbitrer l\'abandon ou le développement d\'une gamme de produits sur la base de la Marge sur Coûts Spécifiques.',
      targetMastery: 'Éviter le piège de la suppression d\'un produit rentable en marge variable qui absorbe des charges fixes.',
      modules: [
        {
          id: 'CTRL_MOD_6',
          levelId: 'CTRL_NIV_6',
          pathId: 'PATH_CONTROLE_GESTION_360',
          moduleNumber: 6,
          title: 'Module 6 : Le Direct Costing Évolué et l\'Analyse des Marges',
          description: 'Marge sur coût variable, charges fixes spécifiques et marge sur coût spécifique.',
          competencyCodes: ['CTRL-PERFORMANCE'],
          durationHours: 6,
          chapters: [
            {
              id: 'CTRL_CHAP_6_1',
              moduleId: 'CTRL_MOD_6',
              title: 'Chapitre 1 : Méthodes d\'Arbitrage de Rentabilité',
              description: 'Pourquoi supprimer un produit apparemment déficitaire en coût complet peut aggraver la perte globale.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CTRL_06',
                  chapterId: 'CTRL_CHAP_6_1',
                  moduleId: 'CTRL_MOD_6',
                  pathId: 'PATH_CONTROLE_GESTION_360',
                  title: 'Leçon 1 : Direct Costing Évolué et Décisions Stratégiques de Gamme',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Distinguer charges fixes communes (siège) et charges fixes spécifiques (machine dédiée).',
                    'Calculer la Marge sur Coût Spécifique (MCS = MSCV - Charges Fixes Spécifiques).',
                    'Démontrer qu\'un produit dégageant une MCS positive contribue à la couverture des frais généraux.',
                    'Prendre des décisions d\'abandon ou de sous-traitance rationnelles.',
                  ],
                  prerequisites: ['Maîtrise de la marge sur coût variable.'],
                  contextIntro: 'Un dirigeant examine le résultat analytique de ses 3 gammes : Produit A (+10M), Produit B (+5M), Produit C (-3M). Sa première réaction est de supprimer le produit C. Or, après suppression, la perte globale de l\'entreprise augmente ! Pourquoi ? Parce que le produit C absorbait 5 millions de charges fixes du siège social.',
                  theorySections: [
                    {
                      title: '1. La Règle d\'Or du Direct Costing Évolué',
                      content: 'Le compte de résultat par produit se structure en cascade : Chiffre d\'Affaires - Coûts Variables = Marge sur Coût Variable (MSCV). MSCV - Charges Fixes Spécifiques de la gamme = Marge sur Coût Spécifique (MCS ou marge contributive). Total des MCS de tous les produits - Charges Fixes Communes = Résultat Net Global. Tout produit ayant une MCS > 0 doit être CONSERVÉ car il apporte une contribution nette positive.',
                      keyDefinitions: [
                        { term: 'Charges Fixes Spécifiques', definition: 'Charges de structure directement imputables à un seul produit (ex: amortissement de la machine dédiée au produit A).' },
                        { term: 'Charges Fixes Communes', definition: 'Charges de structure globales indispensables à l\'ensemble de l\'entreprise qui ne disparaissent pas si un produit est supprimé (ex: loyer du siège, DG).' },
                      ],
                      rulesAndPrinciples: [
                        'Tant qu\'un produit dégage une Marge sur Coût Spécifique positive, sa suppression dégrade le résultat global de l\'entité.',
                      ],
                      formulas: [
                        {
                          name: 'Marge sur Coût Spécifique (MCS)',
                          formula: 'MCS = (CA - CV) - Charges Fixes Spécifiques = MSCV - CFS',
                          interpretation: 'Contribution réelle du produit à la couverture des charges communes du siège.',
                          syscohadaRef: 'Principes de Gestion Stratégique des Coûts',
                        },
                      ],
                      commonMistakes: [
                        'Supprimer un produit dont le résultat en coût complet est négatif sans vérifier sa marge sur coûts spécifiques.',
                      ],
                      professionalBestPractices: [
                        'Ne répartir les charges fixes communes que pour les états réglementaires, mais piloter les décisions par la MCS.',
                      ],
                      memorizationTips: [
                        'Si MCS > 0 : On garde le produit !',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Démonstration du piège de l\'abandon d\'un produit',
                    scenario: 'Produit C : CA = 20 000 000 FCFA, CV = 12 000 000 FCFA, Charges fixes spécifiques = 3 000 000 FCFA, Charges communes allouées arbitrairement = 8 000 000 FCFA. Résultat comptable complet = -3 000 000 FCFA.',
                    dataset: { ca: 20000000, cv: 12000000, cfs: 3000000, cfc: 8000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la MSCV', calculation: '20 000 000 - 12 000 000 = 8 000 000 FCFA', justification: 'Marge variable positive.' },
                      { step: 2, action: 'Calcul de la MCS', calculation: '8 000 000 - 3 000 000 = +5 000 000 FCFA', justification: 'Le produit C apporte 5 millions nets pour payer le siège.' },
                      { step: 3, action: 'Conséquence de la suppression', calculation: 'Si on supprime C, l\'entreprise perd les 5 millions de contribution : le résultat global diminue de 5 000 000 FCFA !', justification: 'Démonstration irréfutable du danger du coût complet.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Arbitrage sous contrainte de capacité (goulot d\'étranglement)',
                    scenario: 'Une machine tourne au maximum de sa capacité (1 000 heures). Produit 1 : MSCV unitaire = 5 000 FCFA, temps = 2h. Produit 2 : MSCV unitaire = 3 000 FCFA, temps = 1h.',
                    dataset: { mscv1: 5000, t1: 2, mscv2: 3000, t2: 1 },
                    stepByStepSolution: [
                      { step: 1, action: 'MSCV par heure de machine pour Produit 1', calculation: '5 000 / 2 = 2 500 FCFA / heure', justification: 'Rendement de la ressource rare.' },
                      { step: 2, action: 'MSCV par heure de machine pour Produit 2', calculation: '3 000 / 1 = 3 000 FCFA / heure', justification: 'Le produit 2 génère 500 FCFA de plus par heure machine.' },
                      { step: 3, action: 'Décision de production', calculation: 'Privilégier la fabrication du Produit 2', justification: 'Maximisation du profit global sous contrainte.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Laiterie du Banco (LAB SA)',
                    locationContext: 'Abidjan, Banco Nord',
                    sector: 'Produits laitiers et yaourts',
                    currency: 'FCFA',
                    problemStatement: 'LAB SA vendait du lait pasteurisé en sachet avec une marge nette en coût complet de -2 FCFA par sachet. Le nouveau directeur commercial voulait stopper cette gamme pour ne garder que les crèmes desserts. Le contrôleur de gestion s\'y est opposé.',
                    financialStatements: {
                      chiffreAffairesLait: 350000000,
                      chargesVariables: 280000000,
                      mscvLait: 70000000,
                      chargesFixesSpecifiquesLait: 25000000,
                      mcsLait: 45000000,
                      perteComptableApparente: -8000000,
                    },
                    realWorldResolution: 'Le direct costing a prouvé que la gamme de lait dégageait 45 000 000 FCFA de Marge sur Coût Spécifique. Sa suppression aurait privé l\'entreprise de 45 millions de contribution, faisant basculer la laiterie tout entière dans le rouge. La gamme a été maintenue et les coûts logistiques optimisés.',
                    recommendationToBoard: 'Obliger toute proposition d\'abandon de produit à être validée par une note de direct costing évolué.',
                  },
                  guidedExercise: {
                    id: 'EX_CTRL_GUIDED_06',
                    title: 'Exercice Guidé : Calcul de Marge sur Coût Spécifique',
                    instruction: 'Une gamme de produits génère un chiffre d\'affaires de 50 000 000 FCFA. Ses coûts variables sont de 30 000 000 FCFA et ses charges fixes spécifiques s\'élèvent à 8 000 000 FCFA. Quel est le montant de sa Marge sur Coût Spécifique (MCS) en FCFA ?',
                    dataset: { ca: 50000000, cv: 30000000, cfs: 8000000 },
                    stepByStepHelp: [
                      '1. MSCV = 50 000 000 - 30 000 000 = 20 000 000 FCFA.',
                      '2. MCS = MSCV - Charges fixes spécifiques = 20 000 000 - 8 000 000 FCFA.',
                    ],
                    expectedAnswer: 12000000,
                    detailedCorrection: 'MCS = 20 000 000 - 8 000 000 = 12 000 000 FCFA (la gamme contribue à hauteur de 12M aux frais du siège).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CTRL_AUTO_06',
                    title: 'Exercice Autonome : Décision d\'abandon de produit',
                    instruction: 'Le produit Delta présente les chiffres suivants : CA = 15 000 000 FCFA, Coûts variables = 11 000 000 FCFA, Charges fixes spécifiques = 6 000 000 FCFA. Quel est le montant de sa Marge sur Coût Spécifique (si elle est négative, entrez un nombre négatif, ex: -2000000) ?',
                    dataset: { ca: 15000000, cv: 11000000, cfs: 6000000 },
                    hints: [
                      'MSCV = 15 000 000 - 11 000 000 = 4 000 000 FCFA.',
                      'MCS = 4 000 000 - 6 000 000 FCFA.',
                    ],
                    expectedAnswer: -2000000,
                    detailedCorrection: 'MCS = 4 000 000 - 6 000 000 = -2 000 000 FCFA. Ce produit est destructeur de valeur même sans tenir compte du siège : il doit être restructuré ou abandonné.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CTRL_SIM_06',
                    title: 'Atelier Pratique : Matrice de Décision Produits dans le Simulateur',
                    type: 'simulator',
                    targetComponentId: 'variance_simulator',
                    completionCriteria: {
                      metric: 'productPortfolioArbitrated',
                      targetValue: 1,
                      description: 'Classer les lignes de produits par taux de MCS décroissant.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CTRL_06',
                      question: 'Que risque une entreprise qui supprime un produit affichant un résultat négatif en coût complet mais une Marge sur Coût Spécifique positive ?',
                      options: [
                        'Son résultat global va se dégrader car les charges fixes communes du siège resteront et devront être supportées par les produits restants',
                        'Son bénéfice va augmenter immédiatement',
                        'Sa trésorerie va doubler',
                        'Rien de particulier',
                      ],
                      correctIndex: 0,
                      explanation: 'C\'est l\'effet pervers classique du coût complet : les charges communes ne disparaissent pas avec le produit, elles se reportent sur les autres produits et réduisent leur rentabilité.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le Direct Costing Évolué est l\'outil décisionnel par excellence pour le pilotage des gammes.',
                    'Toute suppression de produit doit être jugée sur sa Marge sur Coût Spécifique.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 7 pour construire des tableaux de bord de gestion et des KPIs de direction.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CTRL_M6',
            moduleId: 'CTRL_MOD_6',
            title: 'Évaluation Certifiante : Direct Costing et Arbitrage de Gamme',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CTRL_6',
                question: 'Quelle est la définition exacte de la Marge sur Coût Spécifique ?',
                options: [
                  'Chiffre d\'affaires - Charges Variables - Charges Fixes Spécifiques de la gamme',
                  'Chiffre d\'affaires - Toutes les charges fixes du siège',
                  'Le résultat net d\'exploitation après impôts',
                  'La marge brute commerciale divisée par la TVA',
                ],
                correctIndex: 0,
                explanation: 'La MCS déduit les coûts variables et les charges fixes propres au produit, mesurant sa contribution nette aux charges communes.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 7 : TABLEAUX DE BORD & REPORTING DE DIRECTION
    // ------------------------------------------------------------------------
    {
      id: 'CTRL_NIV_7',
      pathId: 'PATH_CONTROLE_GESTION_360',
      levelNumber: 7,
      title: 'Niveau 7 : Tableaux de Bord de Gestion & Indicateurs Clés (KPIs)',
      description: 'Concevoir un reporting mensuel de direction orienté action avec des indicateurs financiers, opérationnels et commerciaux.',
      targetMastery: 'Synthétiser les alertes d\'exploitation et formuler des plans d\'action correctifs.',
      modules: [
        {
          id: 'CTRL_MOD_7',
          levelId: 'CTRL_NIV_7',
          pathId: 'PATH_CONTROLE_GESTION_360',
          moduleNumber: 7,
          title: 'Module 7 : L\'Architecture du Tableau de Bord de Pilotage',
          description: 'Choix des KPIs, seuils d\'alerte, fréquence de diffusion et animation des revues de performance.',
          competencyCodes: ['CTRL-PERFORMANCE', 'EXCEL-MODELING'],
          durationHours: 6,
          chapters: [
            {
              id: 'CTRL_CHAP_7_1',
              moduleId: 'CTRL_MOD_7',
              title: 'Chapitre 1 : Méthodologie du Tableau de Bord de Gestion',
              description: 'Du relevé de données à la prise de décision managériale.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CTRL_07',
                  chapterId: 'CTRL_CHAP_7_1',
                  moduleId: 'CTRL_MOD_7',
                  pathId: 'PATH_CONTROLE_GESTION_360',
                  title: 'Leçon 1 : Conception d\'un Tableau de Bord de Pilotage et Synthèse Exécutive',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Sélectionner les indicateurs d\'alerte pertinents (Leading vs Lagging indicators).',
                    'Structurer un reporting en 3 dimensions : Financière, Opérationnelle, Commerciale.',
                    'Fixer des seuils de tolérance et des feux tricolores (Vert/Orange/Rouge).',
                    'Rédiger une note de synthèse exécutive de 1 page avec recommandations d\'arbitrage.',
                  ],
                  prerequisites: ['Maîtrise de l\'ensemble des concepts de gestion des niveaux 1 à 6.'],
                  contextIntro: 'Un tableau de bord de direction générale n\'est pas un catalogue de 150 chiffres. C\'est un instrument de navigation synthétique qui met en lumière les écarts critiques, explique leurs causes et propose des actions immédiates avant la clôture.',
                  theorySections: [
                    {
                      title: '1. Les 4 Règles d\'Or du Bon Tableau de Bord',
                      content: '1. Pertinence : 10 à 15 KPIs maximum par responsable. 2. Rapidité : diffusion au plus tard le 5 du mois suivant (la fraîcheur prime sur la précision au centime près). 3. Visibilité : comparaison systématique Réel / Budget / N-1. 4. Orientation Action : chaque voyant rouge doit s\'accompagner d\'un plan d\'action nominatif avec date d\'échéance.',
                      keyDefinitions: [
                        { term: 'Indicateur Clé de Performance (KPI)', definition: 'Mesure quantitative permettant d\'évaluer l\'atteinte d\'un objectif stratégique ou opérationnel critique.' },
                        { term: 'Leading Indicator', definition: 'Indicateur précurseur mesurant une cause en amont (ex: carnet de commandes, réclamations clients).' },
                      ],
                      rulesAndPrinciples: [
                        'Le tableau de bord doit être validé avec les opérationnels pour qu\'ils en acceptent la légitimité.',
                      ],
                      formulas: [
                        {
                          name: 'Taux de Réalisation Budgétaire',
                          formula: 'Taux de Réalisation = (Chiffre Réel / Chiffre Budgété) x 100',
                          interpretation: 'Mesure du degré d\'accomplissement de la trajectoire prévue.',
                          syscohadaRef: 'Bonnes Pratiques de Pilotage Financier',
                        },
                      ],
                      commonMistakes: [
                        'Créer un tableau de bord surchargé de détails techniques que le Directeur Général n\'a pas le temps de lire.',
                      ],
                      professionalBestPractices: [
                        'Automatiser les flux d\'extraction de données depuis l\'ERP pour éliminer les erreurs de ressaisie manuelle.',
                      ],
                      memorizationTips: [
                        'Mesurer pour décider, pas pour contempler.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du taux de réalisation du chiffre d\'affaires',
                    scenario: 'Budget mensuel fixé à 50 000 000 FCFA. CA réel constaté au 30 du mois : 47 500 000 FCFA.',
                    dataset: { budget: 50000000, reel: 47500000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du taux de réalisation', calculation: '(47 500 000 / 50 000 000) x 100 = 95%', justification: 'L\'objectif est atteint à 95%.' },
                      { step: 2, action: 'Écart absolu', calculation: '47 500 000 - 50 000 000 = -2 500 000 FCFA (Écart défavorable)', justification: 'Manque à gagner de 2,5 millions FCFA.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Tableau de bord de synthèse avec feux d\'alerte',
                    scenario: 'Suivi de 3 indicateurs : CA (95% -> Orange), Marge brute (42% vs cible 40% -> Vert), Taux de rebut usine (4,5% vs tolérance 2% -> Rouge vif).',
                    dataset: { caPct: 0.95, marge: 0.42, rebut: 0.045 },
                    stepByStepSolution: [
                      { step: 1, action: 'Diagnostic de l\'alerte rouge', calculation: 'Rebut à 4,5% : dérive anormale de fabrication qui détruit 4 000 000 FCFA de marge par mois', justification: 'Point critique prioritaire.' },
                      { step: 2, action: 'Plan d\'action immédiat', calculation: 'Arrêt de ligne 2 pour recalibrage des moules et formation des opérateurs intérimaires', justification: 'Décision managériale déclenchée par le KPI.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Société Ivoirienne de Boissons Rafraîchissantes (SIBR SA)',
                    locationContext: 'Abidjan, Zone Portuaire',
                    sector: 'Boissons et sodas',
                    currency: 'FCFA',
                    problemStatement: 'SIBR recevait ses rapports financiers avec 45 jours de retard. La direction ne s\'est aperçue d\'une hausse des prix du sucre de 20% qu\'après 2 mois, entraînant une perte cumulée de 80 000 000 FCFA.',
                    financialStatements: {
                      chiffreAffairesMensuel: 400000000,
                      surcoutSucreMensuel: 40000000,
                      delaiReportingInitial: 45,
                      delaiReportingCible: 4,
                    },
                    realWorldResolution: 'Le nouveau contrôleur de gestion a instauré un « Flash Reporting » hebdomadaire diffusé chaque lundi matin à 8h avec 5 indicateurs clés (CA, prix d\'achat du sucre, stocks d\'emballage, trésorerie et absentéisme). L\'augmentation suivante a été répercutée en 48h sur les prix de gros.',
                    recommendationToBoard: 'Lier la part variable de la rémunération des directeurs opérationnels aux KPIs du tableau de bord mensuel.',
                  },
                  guidedExercise: {
                    id: 'EX_CTRL_GUIDED_07',
                    title: 'Exercice Guidé : Calcul d\'écart sur chiffre d\'affaires',
                    instruction: 'Le budget mensuel prévoyait la vente de 40 000 caisses de jus au prix de 5 000 FCFA/caisse (soit 200 000 000 FCFA). Les ventes réelles se sont élevées à 42 000 caisses au prix moyen de 4 800 FCFA (soit 201 600 000 FCFA). Quel est le montant de l\'écart global sur chiffre d\'affaires en FCFA ?',
                    dataset: { caPrevu: 200000000, caReel: 201600000 },
                    stepByStepHelp: [
                      'Écart global = CA Réel - CA Prévu.',
                      '201 600 000 - 200 000 000 FCFA.',
                    ],
                    expectedAnswer: 1600000,
                    detailedCorrection: 'Écart sur CA = 201 600 000 - 200 000 000 = +1 600 000 FCFA (écart favorable de 0,8%).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CTRL_AUTO_07',
                    title: 'Exercice Autonome : Calcul du taux de marge brute',
                    instruction: 'Une entreprise réalise 600 000 000 FCFA de chiffre d\'affaires HT avec un coût d\'achat des marchandises vendues de 420 000 000 FCFA. Quel est son Taux de Marge Brute en pourcentage (entrez un entier, ex: 30) ?',
                    dataset: { ca: 600000000, camv: 420000000 },
                    hints: [
                      'Marge brute = 600 000 000 - 420 000 000 = 180 000 000 FCFA.',
                      'Taux = (180 000 000 / 600 000 000) x 100.',
                    ],
                    expectedAnswer: 30,
                    detailedCorrection: 'Marge brute = 180 000 000 FCFA. Taux de marge brute = 180M / 600M = 30%.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CTRL_SIM_07',
                    title: 'Atelier Pratique : Construction d\'un Cockpit de Contrôle Budgétaire',
                    type: 'simulator',
                    targetComponentId: 'variance_simulator',
                    completionCriteria: {
                      metric: 'kpisConsolidated',
                      targetValue: 1,
                      description: 'Consolider les KPIs et produire le tableau de bord exécutif.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CTRL_07',
                      question: 'Quelle est la principale qualité d\'un bon tableau de bord de direction ?',
                      options: [
                        'La rapidité de diffusion et la clarté visuelle des alertes permettant d\'agir immédiatement',
                        'Contenir le plus de pages possible',
                        'Être rempli uniquement de termes comptables complexes',
                        'Être secret pour les opérationnels',
                      ],
                      correctIndex: 0,
                      explanation: 'Un tableau de bord doit être un outil d\'action rapide : un chiffre transmis à J+30 ne permet plus de corriger les dérives du mois.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le tableau de bord transforme les données financières brutes en intelligence opérationnelle.',
                    'L\'art du contrôleur réside dans la capacité à faire parler les chiffres pour guider les décisions.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 8 pour réaliser le Projet Professionnel Final de redressement de la rentabilité.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CTRL_M7',
            moduleId: 'CTRL_MOD_7',
            title: 'Évaluation Certifiante : Tableaux de Bord et Reporting Managérial',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CTRL_7',
                question: 'Pourquoi associe-t-on des indicateurs précurseurs (leading) aux indicateurs de résultat (lagging) ?',
                options: [
                  'Pour pouvoir anticiper les dégradations financières futures avant qu\'elles n\'apparaissent dans le compte de résultat',
                  'Pour faire plaisir aux auditeurs',
                  'Pour payer moins d\'impôt',
                  'C\'est obligatoire selon le code du travail',
                ],
                correctIndex: 0,
                explanation: 'Les indicateurs précurseurs (commandes en baisse, démissions d\'opérateurs qualifiés) permettent d\'agir avant que la perte financière ne soit consommée.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 8 : PROJET PROFESSIONNEL FINAL DE REDRESSEMENT DES MARGES
    // ------------------------------------------------------------------------
    {
      id: 'CTRL_NIV_8',
      pathId: 'PATH_CONTROLE_GESTION_360',
      levelNumber: 8,
      title: 'Niveau 8 : Projet Professionnel Final & Diagnostic de Performance',
      description: 'Audit budgétaire complet, diagnostic des dérives d\'une usine en difficulté et soutenance des recommandations au comité de direction.',
      targetMastery: 'Capacité à redresser la rentabilité d\'une entité industrielle sous contrainte de marché.',
      modules: [
        {
          id: 'CTRL_MOD_8',
          levelId: 'CTRL_NIV_8',
          pathId: 'PATH_CONTROLE_GESTION_360',
          moduleNumber: 8,
          title: 'Module 8 : Projet de Restructuration Budgétaire et Examen de Maîtrise',
          description: 'Mise en situation complète sur une usine de transformation agroalimentaire à Abidjan.',
          competencyCodes: ['CTRL-PERFORMANCE', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'CTRL_CHAP_8_1',
              moduleId: 'CTRL_MOD_8',
              title: 'Chapitre 1 : Conduite du Plan de Redressement et Rapport d\'Audit',
              description: 'Élaboration du plan d\'économies chiffré et restitution exécutive.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CTRL_08',
                  chapterId: 'CTRL_CHAP_8_1',
                  moduleId: 'CTRL_MOD_8',
                  pathId: 'PATH_CONTROLE_GESTION_360',
                  title: 'Leçon 1 : Restructuration Analytique, Plan de Compétitivité et Restitution',
                  durationMinutes: 45,
                  difficulty: 'Expert',
                  objectives: [
                    'Auditer la rentabilité d\'un portefeuille de 5 lignes de produits.',
                    'Quantifier les gisements d\'économies sur coûts fixes et coûts variables.',
                    'Modéliser le nouveau seuil de rentabilité après plan de compétitivité.',
                    'Rédiger la note stratégique au Conseil d\'Administration.',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 7.'],
                  contextIntro: 'Vous êtes recruté comme Responsable du Contrôle de Gestion dans une usine agro-industrielle qui perd 60 millions FCFA par an. Votre mission : identifier les causes racines, éliminer les gaspillages et restaurer une marge opérationnelle de 10% en 12 mois.',
                  theorySections: [
                    {
                      title: '1. Méthodologie d\'un Plan de Compétitivité Analytique',
                      content: '1. Diagnostic des marges par produit (Direct Costing). 2. Traque des gaspillages de matières premières par décomposition des variances. 3. Reconfiguration des charges de structure (renégociation des contrats, variabilisation des coûts fixes). 4. Établissement d\'un nouveau seuil de rentabilité abaissé de 25%. 5. Mise en place du reporting hebdomadaire d\'alerte.',
                      keyDefinitions: [
                        { term: 'Plan de Compétitivité', definition: 'Ensemble coordonné de mesures opérationnelles visant à réduire les coûts de revient et restaurer la rentabilité de l\'entité sans dégrader la qualité.' },
                      ],
                      rulesAndPrinciples: [
                        'Chaque proposition d\'économie doit être chiffrée avec son responsable opérationnel et son échéance de mise en œuvre.',
                      ],
                      formulas: [
                        {
                          name: 'Gain Opérationnel Net',
                          formula: 'Gain Net = Économies Charges Fixes + (Gain Taux MSCV x Chiffre d\'Affaires)',
                          interpretation: 'Amélioration globale du résultat d\'exploitation annuel.',
                          syscohadaRef: 'Management de la Performance Industrielle',
                        },
                      ],
                      commonMistakes: [
                        'Couper aveuglément dans les charges de maintenance ou de qualité, provoquant des pannes d\'usine bien plus coûteuses.',
                      ],
                      professionalBestPractices: [
                        'Associer les chefs d\'équipe d\'atelier à l\'identification des gaspillages pour garantir l\'adhésion au changement.',
                      ],
                      memorizationTips: [
                        'Auditer, Quantifier, Prioriser, Transformer.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Impact d\'une réduction de 5% du coût variable sur le résultat',
                    scenario: 'Chiffre d\'affaires = 500 000 000 FCFA. Coûts variables actuels = 350 000 000 FCFA. Charges fixes = 140 000 000 FCFA (Résultat actuel = +10 000 000 FCFA).',
                    dataset: { ca: 500000000, cv: 350000000, gain5: 0.05, cf: 140000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du gain sur coûts variables', calculation: '350 000 000 x 5% = 17 500 000 FCFA d\'économies', justification: 'Optimisation des achats et réduction des chutes de matière.' },
                      { step: 2, action: 'Impact sur le résultat', calculation: 'Nouveau résultat = 10 000 000 + 17 500 000 = 27 500 000 FCFA', justification: 'Le bénéfice net est multiplié par 2,75 grâce à un effort ciblé de 5%.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Abaisser le point mort d\'une usine de 45 jours',
                    scenario: 'CA = 600 000 000 FCFA. Charges fixes = 180 000 000 FCFA, Taux MSCV = 40%. SR initial = 450M (PM au 270e jour). L\'objectif est de ramener le PM au 225e jour.',
                    dataset: { ca: 600000000, cfInitial: 180000000, tauxMSCV: 0.40, pmCibleJours: 225 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du SR cible', calculation: '(225 / 360) x 600 000 000 = 375 000 000 FCFA', justification: 'Seuil nécessaire pour franchir le point mort au 15 août.' },
                      { step: 2, action: 'Charges fixes autorisées au seuil cible', calculation: '375 000 000 x 40% = 150 000 000 FCFA', justification: 'Niveau maximal de charges de structure tolérées.' },
                      { step: 3, action: 'Économies de charges fixes à réaliser', calculation: '180 000 000 - 150 000 000 = 30 000 000 FCFA de réductions', justification: 'Objectif précis assigné au plan de compétitivité.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Industries de Meunerie de Côte d\'Ivoire (IMCI SA)',
                    locationContext: 'Abidjan, Zone Portuaire',
                    sector: 'Meunerie et minoterie',
                    currency: 'FCFA',
                    problemStatement: 'IMCI accumulait 75 000 000 FCFA de pertes annuelles suite à la hausse du blé importé et des frais de transport maritime. Le comité de restructuration a confié au contrôleur de gestion la modélisation d\'un plan de sauvetage.',
                    financialStatements: {
                      chiffreAffaires: 1200000000,
                      perteInitiale: -75000000,
                      gainsAchatsNegocies: 45000000,
                      gainsEfficaciteMoulins: 38000000,
                      economiesChargesFixes: 22000000,
                      beneficeAtteintAn1: 30000000,
                    },
                    realWorldResolution: 'Mise en œuvre du plan triennal : optimisation du mélange de blés (+45M), réduction des pertes de son (+38M) et mutualisation des navettes logistiques (+22M). L\'entreprise est revenue aux bénéfices dès la première année avec 30 millions de résultat.',
                    recommendationToBoard: 'Mettre en place une couverture à terme sur les cours des céréales et formaliser un audit semestriel des rendements d\'extraction.',
                  },
                  guidedExercise: {
                    id: 'EX_CTRL_GUIDED_08',
                    title: 'Exercice Guidé : Calcul du résultat après restructuration',
                    instruction: 'Une usine réalise un chiffre d\'affaires de 800 000 000 FCFA. Ses charges fixes sont réduites de 20 000 000 FCFA (passant de 220M à 200M FCFA). Son taux de marge sur coût variable passe de 25% à 30% grâce à la diminution des gaspillages. Quel est le Nouveau Résultat d\'Exploitation en FCFA (CA x Taux MSCV - Charges fixes) ?',
                    dataset: { ca: 800000000, tauxMSCV: 0.30, cf: 200000000 },
                    stepByStepHelp: [
                      '1. Nouvelle MSCV = 800 000 000 x 30% = 240 000 000 FCFA.',
                      '2. Nouveau résultat = 240 000 000 - 200 000 000 FCFA.',
                    ],
                    expectedAnswer: 40000000,
                    detailedCorrection: 'Nouveau résultat d\'exploitation = (800 000 000 x 30%) - 200 000 000 = 40 000 000 FCFA (soit une amélioration nette de +60M par rapport au déficit antérieur).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CTRL_AUTO_08',
                    title: 'Exercice Autonome : Calcul du gain de productivité',
                    instruction: 'Le coût unitaire de fabrication d\'une pièce passe de 1 500 FCFA à 1 350 FCFA. La production annuelle est de 200 000 pièces. Quel est le gain financier annuel total généré par cette amélioration en FCFA ?',
                    dataset: { gainUnitaire: 150, q: 200000 },
                    hints: [
                      'Gain unitaire = 1 500 - 1 350 = 150 FCFA.',
                      'Multipliez par 200 000 pièces.',
                    ],
                    expectedAnswer: 30000000,
                    detailedCorrection: 'Gain total = 150 x 200 000 = 30 000 000 FCFA par an.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CTRL_SIM_08',
                    title: 'Atelier Pratique : Mission Ultime de Restructuration Budgétaire',
                    type: 'simulator',
                    targetComponentId: 'variance_simulator',
                    completionCriteria: {
                      metric: 'turnaroundPlanValidated',
                      targetValue: 1,
                      description: 'Modéliser et valider le plan de redressement budgétaire complet.',
                    },
                    rubricPoints: 40,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CTRL_08',
                      question: 'Quel est l\'impact combiné d\'une hausse du taux de marge sur coût variable et d\'une baisse des charges fixes sur le seuil de rentabilité ?',
                      options: [
                        'Le seuil de rentabilité chute considérablement, abaissant fortement le risque d\'exploitation de l\'entreprise',
                        'Le seuil de rentabilité augmente',
                        'Le point mort est retardé vers décembre',
                        'Cela n\'a aucun effet',
                      ],
                      correctIndex: 0,
                      explanation: 'En augmentant le dénominateur (taux MSCV) et en réduisant le numérateur (charges fixes), le seuil de rentabilité diminue très rapidement, rendant l\'entreprise résiliente.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le contrôleur de gestion senior est un architecte de la rentabilité d\'entreprise.',
                    'La maîtrise combinée des coûts, des écarts et des seuils permet de transformer durablement les résultats opérationnels.',
                  ],
                  nextStepRecommendation: 'Félicitations ! Vous avez complété avec succès le cursus Contrôleur de Gestion & Pilotage de la Performance 360°.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CTRL_M8',
            moduleId: 'CTRL_MOD_8',
            title: 'Examen Final de Maîtrise Certifiante Contrôle de Gestion 360°',
            passingScorePercent: 80,
            questions: [
              {
                id: 'FEQ_CTRL_1',
                question: 'Pourquoi un dirigeant ne doit-il jamais décider de supprimer un produit uniquement sur la base d\'un coût complet négatif ?',
                options: [
                  'Parce que le produit peut dégager une Marge sur Coût Spécifique positive qui aide à absorber les charges fixes communes du siège',
                  'Parce que la loi commerciale l\'interdit',
                  'Parce que les coûts variables doublent',
                  'Parce que les clients vont tous partir',
                ],
                correctIndex: 0,
                explanation: 'Le coût complet intègre des charges fixes communes qui ne disparaissent pas avec le produit : supprimer un produit à contribution positive reporte ses charges fixes sur les autres produits.',
              },
            ],
          },
        },
      ],
    },
  ],

  finalProject: {
    id: 'PRJ_CTRL_GESTION_FINAL',
    title: 'Audit Budgétaire et Plan de Redressement des Marges d\'une Usine de Boissons',
    companyContext: 'Société Ivoirienne de Jus & Nectars Tropicaux (SIJNT SA) - CA : 1,8 Milliard FCFA - Zone Industrielle Vridi',
    businessScenario: 'SIJNT SA subit une érosion continue de sa rentabilité : malgré une hausse de 15% de ses ventes en volume, son résultat d\'exploitation est tombé de +80M à -25M FCFA. La direction générale vous mandate pour auditer les coûts de production des 4 gammes (Ananas, Mangue, Passion, Cocktail), identifier les dérives d\'achats et de rebuts, et présenter au Comité Exécutif un plan de compétitivité chiffré.',
    deliverablesExpected: [
      'Diagnostic analytique des marges sur coûts variables et spécifiques par gamme',
      'Tableau de décomposition des écarts de coûts industriels (Matières, Main-d\'œuvre, Énergie)',
      'Budget flexible ajusté à l\'activité réelle et nouveau calcul du Seuil de Rentabilité',
      'Rapport exécutif de 3 pages avec plan d\'économies chiffré et tableau de bord mensuel de pilotage',
    ],
    gradingRubric: [
      { criterion: 'Exactitude des calculs de coûts complets, MSCV et marges spécifiques', weightPercent: 30, description: 'Zéro erreur arithmétique sur les calculs de rentabilité par gamme.' },
      { criterion: 'Rigueur de la décomposition des variances (Prix / Rendement)', weightPercent: 30, description: 'Isolement correct des responsabilités achats vs production.' },
      { criterion: 'Faisabilité et pertinence stratégique du plan de redressement', weightPercent: 25, description: 'Recommandations réalistes adaptées au tissu industriel de l\'UEMOA.' },
      { criterion: 'Clarté exécutive et ergonomie du tableau de bord de pilotage', weightPercent: 15, description: 'Qualité visuelle, choix des KPIs et synthèse pour la direction.' },
    ],
    passingScorePercent: 80,
  },
};
