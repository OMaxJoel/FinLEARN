import { LearningPath360 } from '../../types/pedagogy360';

// ============================================================================
// PARCOURS 360° : GESTION & PRÉVISION DE TRÉSORERIE OPÉRATIONNELLE
// 8 Niveaux progressifs, simulateur de stress de liquidité, cas réels PME en FCFA
// ============================================================================

export const PATH_TRESORERIE_360: LearningPath360 = {
  id: 'PATH_TRESORERIE_360',
  domainId: 'tresorerie',
  title: 'Gestion & Prévision de Trésorerie Opérationnelle 360°',
  tagline: 'Maîtriser le plan glissant 13 semaines, le stress-testing de liquidité, les arbitrages de découverts et les instruments UEMOA',
  description: 'Un cursus d\'excellence complet pour piloter le nerf de la guerre de l\'entreprise : la liquidité disponible. De la prévision des encaissements/décaissements à la négociation des concours bancaires, au stress test de survie et au placement des excédents sur le marché monétaire sous-régional.',
  targetRole: 'Trésorier d\'Entreprise / Responsable Financements & Trésorerie / Adjoint DAF',
  levelBadge: 'Cursus Métier 8 Niveaux - Débutant à Avancé',
  color: 'rose',
  iconName: 'CreditCard',
  version: '2.0.0',
  status: 'draft',
  estimatedHours: 48,
  prerequisites: [
    'Compréhension des flux financiers et des opérations bancaires',
    'Familiarité avec les délais de règlement (DSO, DPO)',
    'Aisance sur tableur Excel',
  ],
  competenciesTargeted: [
    'TRES-PREVISION',
    'ANAL-DIAGNOSTIC',
    'EXCEL-MODELING',
  ],
  initialDiagnosticId: 'DIAG_TRES_01',
  completenessScore: 100,

  levels: [
    // ------------------------------------------------------------------------
    // NIVEAU 1 : DISTINCTION ESSENTIELLE RÉSULTAT COMPTABLE VS TRÉSORERIE
    // ------------------------------------------------------------------------
    {
      id: 'TRES_NIV_1',
      pathId: 'PATH_TRESORERIE_360',
      levelNumber: 1,
      title: 'Niveau 1 : Fondements de la Liquidité & Distinction Cash / Résultat',
      description: 'Comprendre pourquoi une entreprise rentable sur le papier peut faire faillite par manque de cash.',
      targetMastery: 'Expliquer l\'écart fondamental entre facturation et encaissement réel.',
      modules: [
        {
          id: 'TRES_MOD_1',
          levelId: 'TRES_NIV_1',
          pathId: 'PATH_TRESORERIE_360',
          moduleNumber: 1,
          title: 'Module 1 : Le Cash est Roi (Cash is King)',
          description: 'Démystifier le piège de la croissance non financée et analyser les flux monétaires réels.',
          competencyCodes: ['TRES-PREVISION'],
          durationHours: 6,
          chapters: [
            {
              id: 'TRES_CHAP_1_1',
              moduleId: 'TRES_MOD_1',
              title: 'Chapitre 1 : Mécanisme des Flux de Disponibilités',
              description: 'Différence entre flux économique (engagement) et flux financier (règlement effectif).',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_TRES_01',
                  chapterId: 'TRES_CHAP_1_1',
                  moduleId: 'TRES_MOD_1',
                  pathId: 'PATH_TRESORERIE_360',
                  title: 'Leçon 1 : La Divergence Fondamentale entre Bénéfice et Trésorerie',
                  durationMinutes: 45,
                  difficulty: 'Débutant',
                  objectives: [
                    'Comprendre la différence entre un produit comptabilisé et un cash encaissé.',
                    'Identifier l\'impact des délais de paiement clients (créances) sur la liquidité bancaire.',
                    'Analyser la crise de croissance classique : survente avec BFR non financé.',
                    'Calculer la Trésorerie Nette à partir des soldes de banque et caisse.',
                  ],
                  prerequisites: ['Notions de base sur les comptes d\'exploitation.'],
                  contextIntro: 'En Côte d\'Ivoire comme dans le monde, plus de 70% des dépôts de bilan d\'entreprises pourtant rentables sont causés par une rupture brutale de trésorerie. Le banquier ne paie pas les salaires avec des factures clients en attente : il exige des liquidités disponibles sur le compte.',
                  theorySections: [
                    {
                      title: '1. Facturation vs Encaissement Réel',
                      content: 'Lorsqu\'une entreprise facture 50 000 000 FCFA à un client, son compte de résultat enregistre immédiatement 50M de chiffre d\'affaires et un bénéfice comptable. Mais si le client paie à 90 jours, la trésorerie immédiate est de ZERO franc. Pendant ces 90 jours, l\'entreprise doit payer ses salaires à la fin du mois, sa TVA le 15 et ses fournisseurs : sans trésorerie de réserve ou découvert autorisé, elle est en cessation de paiements.',
                      keyDefinitions: [
                        { term: 'Trésorerie Disponible', definition: 'Ensemble des liquidités immédiatement mobilisables sans délai ni pénalité (comptes bancaires à vue, caisse, facilités de caisse confirmées).' },
                        { term: 'Cessation de Paiements', definition: 'Impossibilité pour l\'entreprise de faire face à son passif exigible (dettes arrivées à échéance) avec son actif disponible.' },
                      ],
                      rulesAndPrinciples: [
                        'Le résultat mesure l\'enrichissement théorique ; la trésorerie mesure la solvabilité immédiate.',
                        'Une vente n\'est achevée que lorsque les fonds sont crédités sur le compte bancaire.',
                      ],
                      formulas: [
                        {
                          name: 'Trésorerie Nette Immédiate',
                          formula: 'Trésorerie Nette = (Disponibilités en Banque + Caisse) - Concours Bancaires Courants',
                          interpretation: 'Solde net réel des liquidités après remboursement des découverts bancaires.',
                          syscohadaRef: 'AUDCIF - Art. 36 et 41',
                        },
                      ],
                      commonMistakes: [
                        'Confondre un carnet de commandes plein avec une trésorerie saine.',
                        'Calculer ses dépenses futures sur la base du chiffre d\'affaires facturé plutôt que des encaissements certains.',
                      ],
                      professionalBestPractices: [
                        'Suivre quotidiennement le solde de trésorerie réelle en date de valeur sur chaque banque.',
                      ],
                      memorizationTips: [
                        'Le chiffre d\'affaires est une vanité, le bénéfice est un avis, le cash est une réalité.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Paradoxe du bénéfice sans trésorerie',
                    scenario: 'Une entreprise vend pour 10 000 000 FCFA de marchandises achetées 6 000 000 FCFA. Bénéfice = 4 000 000 FCFA. Le client paie à 60 jours, mais le fournisseur exige d\'être payé au comptant.',
                    dataset: { vente: 10000000, achat: 6000000, benefice: 4000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Situation au compte de résultat', calculation: 'Produit (10M) - Charge (6M) = +4 000 000 FCFA de bénéfice', justification: 'L\'entreprise est rentable.' },
                      { step: 2, action: 'Situation de trésorerie le jour de la vente', calculation: 'Encaissement (0) - Décaissement fournisseur (6M) = -6 000 000 FCFA', justification: 'La trésorerie plonge dans le rouge de 6M !' },
                      { step: 3, action: 'Conclusion de trésorerie', calculation: 'Si l\'entreprise n\'a pas 6 000 000 FCFA en banque, elle ne peut pas payer le fournisseur et fait faillite malgré 4M de profit théorique', justification: 'Illustration magistrale du décalage trésorerie/résultat.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Calcul de la Trésorerie Nette globale d\'une société multi-bancaire',
                    scenario: 'Une société dispose de 3 comptes : SGCI (+12 000 000 FCFA), Ecobank (-8 000 000 FCFA de découvert utilisé), NSIA (+2 500 000 FCFA) et une caisse physique de 1 500 000 FCFA.',
                    dataset: { sgci: 12000000, ecobank: -8000000, nsia: 2500000, caisse: 1500000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Total Trésorerie-Actif', calculation: '12 000 000 + 2 500 000 + 1 500 000 = 16 000 000 FCFA', justification: 'Liquidités positives.' },
                      { step: 2, action: 'Total Trésorerie-Passif', calculation: '8 000 000 FCFA', justification: 'Dette bancaire à court terme.' },
                      { step: 3, action: 'Trésorerie Nette', calculation: '16 000 000 - 8 000 000 = +8 000 000 FCFA', justification: 'Position nette réelle de liquidité.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Distribution Pharmaceutique Ivoirienne (DPI SARL)',
                    locationContext: 'Abidjan, Zone Industrielle Treichville',
                    sector: 'Distribution de médicaments',
                    currency: 'FCFA',
                    problemStatement: 'DPI a vu son chiffre d\'affaires exploser de 150% en un an (de 200M à 500M FCFA). Le résultat net s\'est envolé à 45 000 000 FCFA. Pourtant, au mois d\'août, les banques ont bloqué les chèques de paie car le compte était à découvert de 65 000 000 FCFA (plafond dépassé de 15M).',
                    financialStatements: {
                      chiffreAffaires: 500000000,
                      resultatNetComptable: 45000000,
                      creancesClientsBloquees: 140000000,
                      stocksMedicaments: 90000000,
                      tresorerieBanqueReelle: -65000000,
                      plafondDecouvertAutorise: 50000000,
                    },
                    realWorldResolution: 'Le trésorier a identifié que la croissance effrénée avait absorbé 165 millions de FCFA dans le BFR (stocks et crédits accordés aux cliniques privées à 120 jours). Mise en place d\'un comité de recouvrement d\'urgence avec relance téléphonique quotidienne, escompte d\'effets de commerce pour 40 millions et négociation d\'une facilité de caisse saisonnière de 80M. La paie a été assurée.',
                    recommendationToBoard: 'Ne jamais autoriser une hausse d\'activité commerciale sans avoir sécurisé préalablement les lignes de financement du BFR additionnel.',
                  },
                  guidedExercise: {
                    id: 'EX_TRES_GUIDED_01',
                    title: 'Exercice Guidé : Calcul de la position nette de trésorerie',
                    instruction: 'Au 31 mars, une entreprise dispose de 25 000 000 FCFA sur son compte bancaire principal, 3 000 000 FCFA en caisse, mais utilise un découvert bancaire de 18 000 000 FCFA sur son compte secondaire. Quelle est sa Trésorerie Nette en FCFA ?',
                    dataset: { banque: 25000000, caisse: 3000000, decouvert: 18000000 },
                    stepByStepHelp: [
                      '1. Total disponibilités = 25 000 000 + 3 000 000 = 28 000 000 FCFA.',
                      '2. Trésorerie Nette = Disponibilités - Découvert = 28 000 000 - 18 000 000 FCFA.',
                    ],
                    expectedAnswer: 10000000,
                    detailedCorrection: 'Trésorerie Nette = 28 000 000 - 18 000 000 = 10 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_TRES_AUTO_01',
                    title: 'Exercice Autonome : Impact d\'un retard client sur le cash',
                    instruction: 'Le solde bancaire est de 5 000 000 FCFA. L\'entreprise doit régler 12 000 000 FCFA de salaires dans 2 jours. Un client devait virer 15 000 000 FCFA demain mais annonce un retard de 15 jours. De quel montant de découvert imprévu l\'entreprise a-t-elle besoin pour payer ses salaires (en FCFA) ?',
                    dataset: { solde: 5000000, salaires: 12000000, retardClient: 15000000 },
                    hints: [
                      'Déficit = Salaires à payer (12M) - Solde disponible (5M).',
                      '12 000 000 - 5 000 000 FCFA.',
                    ],
                    expectedAnswer: 7000000,
                    detailedCorrection: 'Besoin de trésorerie immédiat = 12 000 000 - 5 000 000 = 7 000 000 FCFA de découvert bancaire indispensable.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_TRES_SIM_01',
                    title: 'Atelier Pratique : Diagnostic de Trésorerie dans le Simulateur',
                    type: 'simulator',
                    targetComponentId: 'treasury_simulator',
                    completionCriteria: {
                      metric: 'liquidityGapIdentified',
                      targetValue: 1,
                      description: 'Identifier l\'impasse de trésorerie et ajuster les règlements.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_TRES_01',
                      question: 'Pourquoi une entreprise qui réalise un bénéfice comptable important peut-elle se retrouver en cessation de paiements ?',
                      options: [
                        'Parce que ses créances clients ne sont pas encore encaissées tandis que ses dettes d\'exploitation doivent être payées immédiatement',
                        'Parce que les bénéfices sont automatiquement confisqués par la banque centrale',
                        'Parce que la TVA est payée deux fois',
                        'C\'est impossible en comptabilité',
                      ],
                      correctIndex: 0,
                      explanation: 'Le décalage temporel entre la date de facturation (qui génère le bénéfice) et la date d\'encaissement effectif crée un trou de trésorerie qui peut conduire à la faillite.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La liquidité est la condition impérative de survie au jour le jour de l\'entreprise.',
                    'Le trésorier doit synchroniser les rythmes d\'encaissement et de décaissement.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 2 pour bâtir le budget de trésorerie mensuel et planifier les décaissements.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_TRES_M1',
            moduleId: 'TRES_MOD_1',
            title: 'Évaluation Certifiante : Fondements de la Liquidité & Divergence Cash/Profit',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_TRES_1',
                question: 'Quel indicateur mesure directement la capacité d\'une entreprise à payer ses dettes sans recourir à un nouvel emprunt ?',
                options: [
                  'La trésorerie immédiatement disponible (Banque + Caisse)',
                  'Le résultat net prévisionnel',
                  'Le montant total des factures émises',
                  'Le capital social déclaré dans les statuts',
                ],
                correctIndex: 0,
                explanation: 'Seul le cash disponible sur les comptes bancaires et en caisse permet d\'éteindre immédiatement les dettes arrivées à échéance.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 2 : BUDGET DE TRÉSORERIE MENSUEL & CALENDRIER FISCAL / SOCIAL
    // ------------------------------------------------------------------------
    {
      id: 'TRES_NIV_2',
      pathId: 'PATH_TRESORERIE_360',
      levelNumber: 2,
      title: 'Niveau 2 : Budget de Trésorerie Mensuel & Échéanciers d\'Exploitation',
      description: 'Construire le tableau des encaissements et des décaissements TTC et anticiper les soldes de fin de mois.',
      targetMastery: 'Modéliser les flux de TVA, de cotisations sociales CNPS et les règlements fournisseurs.',
      modules: [
        {
          id: 'TRES_MOD_2',
          levelId: 'TRES_NIV_2',
          pathId: 'PATH_TRESORERIE_360',
          moduleNumber: 2,
          title: 'Module 2 : L\'Échéancier Budgétaire des Flux de Cash',
          description: 'Transformation des charges/produits HT en flux financiers TTC calendaires.',
          competencyCodes: ['TRES-PREVISION'],
          durationHours: 6,
          chapters: [
            {
              id: 'TRES_CHAP_2_1',
              moduleId: 'TRES_MOD_2',
              title: 'Chapitre 1 : Méthodologie du Budget de Trésorerie Mensuel',
              description: 'Budget des encaissements, budget des décaissements et synthèse de trésorerie.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_TRES_02',
                  chapterId: 'TRES_CHAP_2_1',
                  moduleId: 'TRES_MOD_2',
                  pathId: 'PATH_TRESORERIE_360',
                  title: 'Leçon 1 : Construction du Budget des Encaissements et Décaissements TTC',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Transformer les prévisions de ventes HT en encaissements TTC selon les délais clients (comptant, 30j, 60j).',
                    'Planifier les décaissements incompressibles : salaires (fin de mois), TVA (15 du mois), CNPS (15 du mois), loyers.',
                    'Dresser le tableau récapitulatif : Solde initial + Encaissements - Décaissements = Solde final.',
                    'Détecter les mois à solde négatif nécessitant la mise en place d\'un financement.',
                  ],
                  prerequisites: ['Maîtrise des principes de TVA et des délais de paiement.'],
                  contextIntro: 'Le budget de trésorerie est le seul document prévisionnel rédigé obligatoirement en MONTANTS TTC (Toutes Taxes Comprises), car l\'entreprise décaisse et encaisse la taxe avec ses partenaires. C\'est l\'instrument qui permet d\'anticiper un creux de trésorerie 3 mois avant qu\'il n\'arrive.',
                  theorySections: [
                    {
                      title: '1. La Structure en 3 Sous-Budgets',
                      content: '1. Budget des encaissements : Ventes TTC réparties selon l\'historique d\'encaissement (ex: 40% au comptant, 50% à 30 jours, 10% à 60 jours) + encaissements divers. 2. Budget des décaissements : Achats TTC selon délais fournisseurs + Frais généraux TTC + Salaires nets + Charges sociales CNPS + Impôts (TVA, acomptes BIC). 3. Synthèse de trésorerie : Solde de début de mois + Total encaissements - Total décaissements = Solde de fin de mois.',
                      keyDefinitions: [
                        { term: 'Impasse de Trésorerie', definition: 'Période prévisionnelle au cours de laquelle les décaissements obligatoires dépassent les encaissements et les réserves disponibles, générant un solde négatif.' },
                        { term: 'Décaissements Réglementaires Incompressibles', definition: 'Dépenses dont l\'échéance est fixée par la loi sous peine de pénalités immédiates (TVA au 15, CNPS au 15, salaires le 30).' },
                      ],
                      rulesAndPrinciples: [
                        'Le budget de trésorerie se calcule toujours en flux TTC.',
                        'Le solde de fin d\'un mois devient rigoureusement le solde de début du mois suivant.',
                      ],
                      formulas: [
                        {
                          name: 'Équation Fondamentale de Trésorerie',
                          formula: 'Solde Final(Mois N) = Solde Initial(Mois N) + Encaissements(Mois N) - Décaissements(Mois N)',
                          interpretation: 'Règle de récurrence du compte bancaire prévisionnel.',
                          syscohadaRef: 'Principes de Gestion Prévisionnelle de Trésorerie',
                        },
                      ],
                      commonMistakes: [
                        'Établir le budget de trésorerie avec des montants Hors Taxes : cela fausse la prévision de 18% !',
                        'Oublier de décaisser les impôts annuels (solde de l\'impôt sur les bénéfices au 30 avril en Côte d\'Ivoire).',
                      ],
                      professionalBestPractices: [
                        'Prévoir systématiquement un coussin de sécurité de trésorerie d\'au moins 15 jours de charges d\'exploitation.',
                      ],
                      memorizationTips: [
                        'Tout est TTC. Le solde final devient le solde initial du mois d\'après.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul des encaissements échelonnés d\'une vente',
                    scenario: 'Vente de 11 800 000 FCFA TTC réalisée en janvier. Conditions : 50% au comptant en janvier, 50% à 30 jours en février.',
                    dataset: { totalTTC: 11800000, pctJanv: 0.50, pctFev: 0.50 },
                    stepByStepSolution: [
                      { step: 1, action: 'Encaissement de janvier', calculation: '11 800 000 x 50% = 5 900 000 FCFA', justification: 'Fonds reçus en janvier.' },
                      { step: 2, action: 'Encaissement de février', calculation: '11 800 000 x 50% = 5 900 000 FCFA', justification: 'Fonds reçus en février.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Détection d\'une impasse de trésorerie mensuelle',
                    scenario: 'Solde initial au 1er mai = 4 000 000 FCFA. Encaissements prévus en mai = 18 000 000 FCFA. Décaissements obligatoires en mai = 26 000 000 FCFA.',
                    dataset: { soldeInitial: 4000000, encaissements: 18000000, decaissements: 26000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Variation de trésorerie du mois', calculation: '18 000 000 - 26 000 000 = -8 000 000 FCFA', justification: 'Déficit opérationnel du mois de mai.' },
                      { step: 2, action: 'Solde final au 31 mai', calculation: '4 000 000 + (-8 000 000) = -4 000 000 FCFA', justification: 'Impasse de trésorerie de 4M FCFA.' },
                      { step: 3, action: 'Action corrective', calculation: 'Solliciter une autorisation de découvert de 5 millions FCFA auprès de la banque avant le 10 mai', justification: 'Anticipation professionnelle évitant les rejets de chèques.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Bâtiment & Travaux Publics de l\'Est (BTPE SA)',
                    locationContext: 'Abengourou, Côte d\'Ivoire',
                    sector: 'BTP et voirie',
                    currency: 'FCFA',
                    problemStatement: 'BTPE a remporté un marché public de 350 000 000 FCFA. L\'entreprise a engagé 80 000 000 FCFA de travaux en mars et avril. L\'État ne payant les décomptes qu\'à 90 jours (en juillet), BTPE s\'est retrouvée sans trésorerie pour payer le carburant et les salaires en mai, risquant l\'abandon de chantier et des pénalités de retard de 1M/jour.',
                    financialStatements: {
                      marcheTotalTTC: 350000000,
                      depensesAvrilMai: 80000000,
                      tresorerieDebutMai: 6000000,
                      impasseMaiJuin: -55000000,
                    },
                    realWorldResolution: 'Le trésorier a monté un dossier de « Crédit de Campagne / Avance sur Décompte Public » auprès de la BNI (Banque Nationale d\'Investissement). Sur nantissement de la créance publique certifiée, la banque a débloqué une ligne de mobilisation de créances de 60 millions FCFA à 8% l\'an. Le chantier s\'est poursuivi sans arrêt.',
                    recommendationToBoard: 'Obliger la contractualisation d\'une ligne de crédit de mobilisation de marché public avant de démarrer tout chantier public de plus de 100M FCFA.',
                  },
                  guidedExercise: {
                    id: 'EX_TRES_GUIDED_02',
                    title: 'Exercice Guidé : Calcul du solde de trésorerie de fin de mois',
                    instruction: 'Le solde de trésorerie au 1er juin est de 14 000 000 FCFA. Les encaissements prévus en juin s\'élèvent à 35 000 000 FCFA. Les décaissements prévus sont de 41 000 000 FCFA. Quel sera le solde de trésorerie au 30 juin (en FCFA) ?',
                    dataset: { initial: 14000000, enc: 35000000, dec: 41000000 },
                    stepByStepHelp: [
                      '1. Variation du mois = 35 000 000 - 41 000 000 = -6 000 000 FCFA.',
                      '2. Solde final = 14 000 000 - 6 000 000 FCFA.',
                    ],
                    expectedAnswer: 8000000,
                    detailedCorrection: 'Solde final au 30 juin = 14 000 000 + 35 000 000 - 41 000 000 = 8 000 000 FCFA (solde positif).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_TRES_AUTO_02',
                    title: 'Exercice Autonome : Encaissement des créances à 30 jours',
                    instruction: 'Une entreprise vend pour 30 000 000 FCFA TTC en janvier, 40 000 000 FCFA TTC en février et 50 000 000 FCFA TTC en mars. Les clients paient tous à 30 jours (le mois suivant la vente). Quel est le montant total des encaissements clients du mois de MARS (provenant des ventes de février) ?',
                    dataset: { venteFev: 40000000 },
                    hints: [
                      'Les ventes de février sont encaissées en mars.',
                    ],
                    expectedAnswer: 40000000,
                    detailedCorrection: 'L\'encaissement de mars correspond à 100% des ventes de février, soit 40 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_TRES_SIM_02',
                    title: 'Atelier Pratique : Construction du Budget Mensuel de Trésorerie',
                    type: 'simulator',
                    targetComponentId: 'treasury_simulator',
                    completionCriteria: {
                      metric: 'monthlyBudgetBalanced',
                      targetValue: 1,
                      description: 'Établir la prévision des encaissements et décaissements sur 3 mois.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_TRES_02',
                      question: 'Pourquoi le budget de trésorerie doit-il obligatoirement être établi en montants TTC et non en montants HT ?',
                      options: [
                        'Parce que les flux bancaires réels décaissés et encaissés intègrent la TVA',
                        'Parce que le HT est réservé aux banques',
                        'Pour faire plaisir au fisc',
                        'C\'est une tradition sans raison financière',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'entreprise règle des factures TTC et reçoit des paiements clients TTC : seul le montant TTC correspond à la monnaie réelle qui entre ou sort du compte bancaire.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le budget de trésorerie mensuel permet de prévoir les tensions de liquidité plusieurs mois à l\'avance.',
                    'L\'anticipation permet de négocier les financements bancaires au meilleur taux.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 3 pour maîtriser le plan de trésorerie glissant 13 semaines.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_TRES_M2',
            moduleId: 'TRES_MOD_2',
            title: 'Évaluation Certifiante : Budget Mensuel et Échéanciers de Trésorerie',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_TRES_2',
                question: 'Si le solde initial d\'un mois est de 10 millions FCFA, les encaissements de 20 millions et les décaissements de 35 millions, quel est le solde de fin de mois ?',
                options: [
                  '-5 millions FCFA (déficit de 5 millions FCFA)',
                  '+5 millions FCFA',
                  '+15 millions FCFA',
                  '0 franc',
                ],
                correctIndex: 0,
                explanation: 'Solde final = 10M + 20M - 35M = -5 millions FCFA.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 3 : PLAN DE TRÉSORERIE GLISSANT 13 SEMAINES (13-WEEK CASH FLOW)
    // ------------------------------------------------------------------------
    {
      id: 'TRES_NIV_3',
      pathId: 'PATH_TRESORERIE_360',
      levelNumber: 3,
      title: 'Niveau 3 : Plan de Trésorerie Glissant 13 Semaines (13-Week Cash Flow)',
      description: 'Le standard mondial de gestion de crise et de pilotage tactique de la liquidité hebdomadaire.',
      targetMastery: 'Construire et actualiser un modèle 13 semaines avec prévisions glissantes et analyse des écarts.',
      modules: [
        {
          id: 'TRES_MOD_3',
          levelId: 'TRES_NIV_3',
          pathId: 'PATH_TRESORERIE_360',
          moduleNumber: 3,
          title: 'Module 3 : Le Standard du 13-Week Cash Flow Model',
          description: 'Pilotage hebdomadaire au jour le jour, priorisation des décaissements et actualisation continue (Rolling Forecast).',
          competencyCodes: ['TRES-PREVISION', 'EXCEL-MODELING'],
          durationHours: 6,
          chapters: [
            {
              id: 'TRES_CHAP_3_1',
              moduleId: 'TRES_MOD_3',
              title: 'Chapitre 1 : Architecture et Roulage du Modèle 13 Semaines',
              description: 'Gestion du cycle trimestriel glissant et cadrage avec les relevés bancaires réels.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_TRES_03',
                  chapterId: 'TRES_CHAP_3_1',
                  moduleId: 'TRES_MOD_3',
                  pathId: 'PATH_TRESORERIE_360',
                  title: 'Leçon 1 : Construction et Roulage Hebdomadaire du 13-Week Cash Flow',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Comprendre pourquoi le cycle de 13 semaines (un trimestre) est le standard mondial des trésoriers et des banques.',
                    'Détailler les flux semaine par semaine (Semaine 1 à Semaine 13).',
                    'Mettre à jour le modèle chaque vendredi soir : figer le Réel de la semaine écoulée et décaler la prévision d\'une semaine.',
                    'Gérer la chambre de compensation des paiements en période de tension aiguë.',
                  ],
                  prerequisites: ['Maîtrise du budget de trésorerie mensuel.'],
                  contextIntro: 'Le budget mensuel est trop macroscopique : si un paiement de 50 millions tombe le 3 du mois et que l\'encaissement correspondant arrive le 28, l\'entreprise est en cessation de paiement pendant 25 jours ! Le plan 13 semaines décompose le cash semaine par semaine pour éviter tout accident de liquidité.',
                  theorySections: [
                    {
                      title: '1. Pourquoi 13 Semaines ?',
                      content: '13 semaines correspondent exactement à un trimestre complet (52 semaines / 4). C\'est l\'horizon temporel idéal : suffisamment court pour être très précis sur les 4 premières semaines (factures déjà émises, commandes confirmées) et suffisamment long pour donner à la direction générale le temps de négocier un crédit bancaire ou de différer un investissement avant la rupture de trésorerie.',
                      keyDefinitions: [
                        { term: '13-Week Cash Flow (TWCF)', definition: 'Modèle prévisionnel dynamique à horizon glissant de 13 semaines, mis à jour hebdomadairement pour sécuriser les liquidités.' },
                        { term: 'Rolling Forecast (Prévision Glissante)', definition: 'Technique consistant à ajouter une semaine prévisionnelle à l\'horizon chaque fois qu\'une semaine réelle est clôturée.' },
                      ],
                      rulesAndPrinciples: [
                        'Les 2 premières semaines du modèle doivent être fiables à 95% (fondées sur des pièces comptables tangibles).',
                        'Chaque écart entre la prévision de la semaine et le réel constaté doit être analysé le lundi matin.',
                      ],
                      formulas: [
                        {
                          name: 'Règle du Roulage Hebdomadaire',
                          formula: 'Solde Début Semaine S+1 = Solde Clôture Semaine S Réel',
                          interpretation: 'Bouclage rigoureux sur les relevés bancaires du vendredi.',
                          syscohadaRef: 'Standards Corporate Treasury Association',
                        },
                      ],
                      commonMistakes: [
                        'Faire un plan 13 semaines statique sans le mettre à jour chaque semaine.',
                        'Ignorer les dates de valeur bancaires (un chèque déposé le vendredi n\'est souvent disponible que le mardi).',
                      ],
                      professionalBestPractices: [
                        'Créer un code couleur de confiance sur les encaissements : Vert (client grand compte fiable), Orange (client moyen), Rouge (client en retard).',
                      ],
                      memorizationTips: [
                        '13 semaines = 1 trimestre. Mise à jour chaque vendredi.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Simulation d\'un creux de trésorerie à Semaine 3',
                    scenario: 'Solde S0 = 10 000 000 FCFA. Semaine 1 : +2M. Semaine 2 : -4M. Semaine 3 : Décaissement impôt BIC de -15M pour seulement +3M d\'encaissements.',
                    dataset: { s0: 10000000, fluxS1: 2000000, fluxS2: -4000000, fluxS3: -12000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Solde fin Semaine 1', calculation: '10 000 000 + 2 000 000 = 12 000 000 FCFA', justification: 'Position confortable.' },
                      { step: 2, action: 'Solde fin Semaine 2', calculation: '12 000 000 - 4 000 000 = 8 000 000 FCFA', justification: 'Baisse de liquidité.' },
                      { step: 3, action: 'Solde fin Semaine 3', calculation: '8 000 000 - 12 000 000 = -4 000 000 FCFA', justification: 'Alerte rouge détectée 3 semaines à l\'avance permettant d\'anticiper un tirage de ligne.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Roulage du modèle : passage de la Semaine 1 au Réel',
                    scenario: 'La Semaine 1 prévoyait un encaissement de 15 000 000 FCFA. En réalité, le client n\'a viré que 10 000 000 FCFA. Le solde réel du vendredi est inférieur de 5 000 000 FCFA.',
                    dataset: { prevision: 15000000, reel: 10000000, ecart: -5000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Constat d\'écart', calculation: 'Écart de trésorerie = 10 000 000 - 15 000 000 = -5 000 000 FCFA', justification: 'Retard de paiement.' },
                      { step: 2, action: 'Mise à jour glissante', calculation: 'Le solde de départ de la Semaine 2 est diminué de 5M FCFA et l\'encaissement manquant est décalé en Semaine 3', justification: 'La prévision reste parfaitement ajustée à la réalité.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Compagnie Fruitière du Sassandra (CFS SA)',
                    locationContext: 'San Pedro, Côte d\'Ivoire',
                    sector: 'Exportation de bananes et mangues',
                    currency: 'FCFA',
                    problemStatement: 'CFS subissait des fluctuations massives de cash dues aux affrètements de navires cargos (80 millions FCFA par escale). Faute de prévision hebdomadaire, l\'entreprise a manqué une escale faute de pouvoir payer l\'acompte armateur de 40M, entraînant la perte de 200 tonnes de fruits périssables.',
                    financialStatements: {
                      chiffreAffairesAnnuel: 1400000000,
                      perteFruitsGaches: 90000000,
                      penalitesArmateur: 15000000,
                    },
                    realWorldResolution: 'Mise en place immédiate d\'un modèle 13-Week Cash Flow couplé au planning des navires. Chaque jeudi, le comité de trésorerie arbitre les règlements fournisseurs pour sanctuariser les provisions de fret maritime 10 jours avant l\'accostage. Zéro escale manquée depuis 2 ans.',
                    recommendationToBoard: 'Interdire tout décaissement fournisseur non stratégique si le solde prévisionnel à S+2 passe sous le seuil d\'alerte de 50 millions FCFA.',
                  },
                  guidedExercise: {
                    id: 'EX_TRES_GUIDED_03',
                    title: 'Exercice Guidé : Projection à 4 semaines',
                    instruction: 'Solde bancaire actuel (S0) = 20 000 000 FCFA. Les flux nets hebdomadaires prévus sont : Semaine 1 = +5 000 000 FCFA, Semaine 2 = -12 000 000 FCFA, Semaine 3 = -8 000 000 FCFA, Semaine 4 = +15 000 000 FCFA. Quel est le solde de trésorerie prévu à la fin de la Semaine 3 (en FCFA) ?',
                    dataset: { s0: 20000000, s1: 5000000, s2: -12000000, s3: -8000000 },
                    stepByStepHelp: [
                      'S1 = 20M + 5M = 25M.',
                      'S2 = 25M - 12M = 13M.',
                      'S3 = 13M - 8M FCFA.',
                    ],
                    expectedAnswer: 5000000,
                    detailedCorrection: 'Solde fin Semaine 3 = 20M + 5M - 12M - 8M = 5 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_TRES_AUTO_03',
                    title: 'Exercice Autonome : Détection du point bas de trésorerie',
                    instruction: 'Les soldes prévus sur 4 semaines sont : S1 = +8 000 000 FCFA, S2 = +2 000 000 FCFA, S3 = -3 500 000 FCFA, S4 = +4 000 000 FCFA. Quel est le montant du trou de trésorerie maximal à financer (entrez la valeur absolue du déficit, ex: 3500000) ?',
                    dataset: { s3Deficit: -3500000 },
                    hints: [
                      'Le creux est atteint en Semaine 3.',
                    ],
                    expectedAnswer: 3500000,
                    detailedCorrection: 'Le trou de trésorerie maximal est de 3 500 000 FCFA en Semaine 3.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_TRES_SIM_03',
                    title: 'Atelier Pratique : Roulage du 13-Week Cash Flow dans le Simulateur',
                    type: 'simulator',
                    targetComponentId: 'treasury_simulator',
                    completionCriteria: {
                      metric: 'thirteenWeeksModelled',
                      targetValue: 1,
                      description: 'Simuler le roulage hebdomadaire sur 13 semaines.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_TRES_03',
                      question: 'Quelle est la principale force du modèle de trésorerie 13 semaines par rapport à un budget annuel classique ?',
                      options: [
                        'Sa granularité hebdomadaire et son actualisation continue qui permettent de détecter les creux de liquidité intra-mensuels',
                        'Le fait qu\'il est plus court à rédiger',
                        'Il ne contient aucun chiffre',
                        'Il remplace le bilan comptable',
                      ],
                      correctIndex: 0,
                      explanation: 'La maille hebdomadaire révèle les déséquilibres de court terme que la moyenne mensuelle masque complètement.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le 13-Week Cash Flow est l\'outil souverain de gestion de trésorerie moderne.',
                    'Il apporte une visibilité tactique indispensable pour piloter les relations avec les banquiers.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 4 pour maîtriser les lignes de financement à court terme et le découvert.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_TRES_M3',
            moduleId: 'TRES_MOD_3',
            title: 'Évaluation Certifiante : Modélisation du 13-Week Cash Flow',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_TRES_3',
                question: 'À quelle fréquence le modèle de trésorerie 13 semaines doit-il être réactualisé ?',
                options: [
                  'Chaque semaine (généralement le vendredi après la clôture des banques)',
                  'Une fois par an lors de l\'assemblée générale',
                  'Tous les 5 ans',
                  'Uniquement en cas de faillite',
                ],
                correctIndex: 0,
                explanation: 'Le principe même du 13-Week Cash Flow est le roulage hebdomadaire : intégrer le réel de la semaine et ajouter une nouvelle semaine prévisionnelle à l\'horizon.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 4 : FINANCEMENTS COURT TERME, DÉCOUVERT & LIGNES BANCAIRES
    // ------------------------------------------------------------------------
    {
      id: 'TRES_NIV_4',
      pathId: 'PATH_TRESORERIE_360',
      levelNumber: 4,
      title: 'Niveau 4 : Financements Bancaires Court Terme & Concours de Trésorerie',
      description: 'Négocier, optimiser et arbitrer entre facilité de caisse, découvert autorisé, escompte commercial et crédit spot.',
      targetMastery: 'Minimiser le coût financier des concours bancaires et éviter les commissions de dépassement.',
      modules: [
        {
          id: 'TRES_MOD_4',
          levelId: 'TRES_NIV_4',
          pathId: 'PATH_TRESORERIE_360',
          moduleNumber: 4,
          title: 'Module 4 : L\'Arsenal des Concours Bancaires à Court Terme',
          description: 'Coût effectif global (TEG), agios, commissions de plus fort découvert (CPFD) et garanties.',
          competencyCodes: ['TRES-PREVISION'],
          durationHours: 6,
          chapters: [
            {
              id: 'TRES_CHAP_4_1',
              moduleId: 'TRES_MOD_4',
              title: 'Chapitre 1 : Typologie et Calcul du Coût Réel des Crédits de Trésorerie',
              description: 'Calcul des agios débiteurs et comparaison des instruments de financement du BFR.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_TRES_04',
                  chapterId: 'TRES_CHAP_4_1',
                  moduleId: 'TRES_MOD_4',
                  pathId: 'PATH_TRESORERIE_360',
                  title: 'Leçon 1 : Calcul des Agios, Commissions CPFD et Arbitrage des Financements',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Calculer les agios proportionnels (Nombre Débiteur x Taux / 360).',
                    'Calculer la Commission de Plus Fort Découvert (CPFD, usuellement 0,05% à 0,2% du solde débiteur maximal du mois).',
                    'Calculer le Taux Effectif Global (TEG) réel intégrant agios, CPFD et taxes (TOB).',
                    'Comparer le coût du découvert avec l\'escompte commercial et l\'affacturage.',
                  ],
                  prerequisites: ['Maîtrise des soldes bancaires débiteurs.'],
                  contextIntro: 'Un découvert bancaire n\'est pas un crédit anodin : dans la zone UEMOA, avec un taux nominal de 10% à 14%, la Commission de Plus Fort Découvert et la Taxe sur les Opérations Bancaires (TOB), le coût effectif annuel d\'un découvert peut dépasser 18% ! Le trésorier doit négocier chaque ligne pour réduire la facture financière.',
                  theorySections: [
                    {
                      title: '1. La Décomposition des Agios Bancaires',
                      content: 'Le relevé d\'échelle d\'intérêts bancaires comprend 3 composantes de coût : 1. Les intérêts débiteurs calculés sur le nombre de jours débiteurs réels en date de valeur : Nombres débiteurs x Taux / 360. 2. La Commission de Plus Fort Découvert (CPFD) : appliquée une fois par mois sur la pointe maximale de découvert atteint, même si elle n\'a duré qu\'une journée ! 3. La Taxe sur les Opérations Bancaires (TOB) perçue pour le compte de l\'État.',
                      keyDefinitions: [
                        { term: 'Commission de Plus Fort Découvert (CPFD)', definition: 'Commission bancaire prélevée mensuellement calculée en pourcentage du solde débiteur le plus élevé constaté au cours du mois.' },
                        { term: 'Nombre Débiteur', definition: 'Produit du solde débiteur par le nombre de jours pendant lequel ce solde est resté inchangé en date de valeur.' },
                      ],
                      rulesAndPrinciples: [
                        'Éviter à tout prix les pointes de découvert isolées en fin de mois qui déclenchent une CPFD disproportionnée.',
                        'L\'escompte commercial d\'effets de commerce est souvent moins coûteux que le découvert car il repose sur une créance commerciale sous-jacente.',
                      ],
                      formulas: [
                        {
                          name: 'Calcul des Intérêts Débiteurs',
                          formula: 'Intérêts = (Somme des Nombres Débiteurs x Taux Annuel) / 360 jours',
                          interpretation: 'Règle bancaire standard dans l\'espace OHADA / UEMOA.',
                          syscohadaRef: 'Réglementation Bancaire BCEAO',
                        },
                      ],
                      commonMistakes: [
                        'Laisser un compte à découvert alors qu\'un autre compte de l\'entreprise dans la même banque est largement créditeur.',
                      ],
                      professionalBestPractices: [
                        'Mettre en place un nivellement de trésorerie automatique (Cash Pooling) entre comptes de la même entreprise.',
                      ],
                      memorizationTips: [
                        'CPFD = Frappé sur la pointe maximale.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul de la CPFD sur une pointe de découvert',
                    scenario: 'Le compte a été à découvert pendant 3 jours à hauteur de 50 000 000 FCFA. Le reste du mois, le découvert n\'était que de 10 000 000 FCFA. Taux de CPFD = 0,10%.',
                    dataset: { pointeMax: 50000000, tauxCPFD: 0.001 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la CPFD', calculation: '50 000 000 x 0,10% = 50 000 FCFA', justification: 'La commission s\'applique sur la pointe de 50M, même pour 3 jours.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Calcul des agios trimestriels sur échelle d\'intérêts',
                    scenario: 'Somme des nombres débiteurs du trimestre = 180 000 000 FCFA. Taux d\'intérêt annuel de découvert = 12%.',
                    dataset: { nombresDebiteurs: 180000000, taux: 0.12 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul des intérêts débiteurs', calculation: '(180 000 000 x 12%) / 360 = 21 600 000 / 360 = 60 000 FCFA', justification: 'Coût des intérêts purs.' },
                      { step: 2, action: 'Taxe TOB (ex: 10% sur frais bancaires)', calculation: '60 000 x 10% = 6 000 FCFA', justification: 'Taxe fiscale.' },
                      { step: 3, action: 'Total prélevé', calculation: '60 000 + 6 000 = 66 000 FCFA', justification: 'Débit total sur le compte.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Négoce et Matériaux de Côte d\'Ivoire (NMCI SA)',
                    locationContext: 'Abidjan, Zone Industrielle Yopougon',
                    sector: 'Distribution de fer à béton',
                    currency: 'FCFA',
                    problemStatement: 'NMCI payait plus de 24 000 000 FCFA d\'agios et commissions de découvert par an auprès de 3 banques différentes. Le trésorier a découvert que l\'entreprise avait simultanément 60 millions créditeurs chez SGCI et 55 millions débiteurs chez Ecobank !',
                    financialStatements: {
                      agiosAnnuelsPayes: 24000000,
                      soldeCrediteurSGCI: 60000000,
                      soldeDebiteurEcobank: -55000000,
                      perteFinanciereInutile: 6600000,
                    },
                    realWorldResolution: 'Le trésorier a instauré un virement d\'équilibrage quotidien automatique dès que le solde d\'un compte passe sous 2 millions FCFA. La suppression des découverts croisés a réduit la facture d\'agios de 7 200 000 FCFA dès la première année.',
                    recommendationToBoard: 'Mettre en place une convention de fusion d\'échelles d\'intérêts pour les comptes tenus dans le même établissement.',
                  },
                  guidedExercise: {
                    id: 'EX_TRES_GUIDED_04',
                    title: 'Exercice Guidé : Calcul des intérêts de découvert',
                    instruction: 'Une entreprise a utilisé un découvert de 20 000 000 FCFA pendant 18 jours. Le taux annuel négocié est de 10%. Quel est le montant des intérêts débiteurs purs (en FCFA, formule : Découvert x Taux x Jours / 360) ?',
                    dataset: { decouvert: 20000000, jours: 18, taux: 0.10 },
                    stepByStepHelp: [
                      '1. Intérêts = (20 000 000 x 0,10 x 18) / 360.',
                      '2. 36 000 000 / 360 = 100 000 FCFA.',
                    ],
                    expectedAnswer: 100000,
                    detailedCorrection: 'Intérêts débiteurs = (20 000 000 x 10% x 18) / 360 = 100 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_TRES_AUTO_04',
                    title: 'Exercice Autonome : Économie d\'agios par virement d\'équilibrage',
                    instruction: 'En virant 15 000 000 FCFA d\'un compte excédentaire vers un compte à découvert à 12% pendant 30 jours, quelle économie d\'intérêts débiteurs l\'entreprise réalise-t-elle en FCFA (15M x 12% x 30 / 360) ?',
                    dataset: { montant: 15000000, taux: 0.12, jours: 30 },
                    hints: [
                      '15 000 000 x 0,12 x (30 / 360).',
                    ],
                    expectedAnswer: 150000,
                    detailedCorrection: 'Économie réalisée = 15 000 000 x 12% x (30 / 360) = 150 000 FCFA pour ce mois.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_TRES_SIM_04',
                    title: 'Atelier Pratique : Négociation et Arbitrage de Découverts Bancaires',
                    type: 'simulator',
                    targetComponentId: 'treasury_simulator',
                    completionCriteria: {
                      metric: 'creditLinesOptimized',
                      targetValue: 1,
                      description: 'Optimiser la répartition des découverts et réduire les agios.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_TRES_04',
                      question: 'Sur quelle base la Commission de Plus Fort Découvert (CPFD) est-elle calculée par la banque ?',
                      options: [
                        'Sur le solde débiteur maximal atteint au cours du mois (la pointe la plus élevée)',
                        'Sur la moyenne arithmétique de tous les jours',
                        'Sur le chiffre d\'affaires de l\'entreprise',
                        'Sur le capital social',
                      ],
                      correctIndex: 0,
                      explanation: 'La CPFD sanctionne la pointe maximale de découvert enregistrée dans le mois, même si cette pointe n\'a duré que 24 heures.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le découvert bancaire est le financement le plus flexible mais le plus onéreux.',
                    'L\'équilibrage actif entre comptes bancaires est le premier réflexe d\'économie de trésorerie.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 5 pour concevoir des stress tests de liquidité et gérer les scénarios de crise.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_TRES_M4',
            moduleId: 'TRES_MOD_4',
            title: 'Évaluation Certifiante : Financements Courts et Gestion des Agios',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_TRES_4',
                question: 'Quel est l\'avantage de l\'escompte d\'un effet de commerce par rapport à une utilisation de découvert simple ?',
                options: [
                  'Le taux d\'escompte est généralement inférieur au taux de découvert et ne génère pas de CPFD',
                  'L\'escompte est gratuit',
                  'L\'escompte n\'apparaît pas dans la comptabilité',
                  'L\'effet de commerce ne peut jamais être impayé',
                ],
                correctIndex: 0,
                explanation: 'L\'escompte s\'appuie sur une créance commerciale vérifiée, ce qui rassure le banquier et permet d\'obtenir un taux plus avantageux sans subir la pénalité de la CPFD.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 5 : STRESS TESTING DE LIQUIDITÉ & SCÉNARIOS DE CRISE
    // ------------------------------------------------------------------------
    {
      id: 'TRES_NIV_5',
      pathId: 'PATH_TRESORERIE_360',
      levelNumber: 5,
      title: 'Niveau 5 : Stress Testing de Liquidité & Scénarios de Crise Majeure',
      description: 'Tester la résistance financière face aux chocs exogènes : défaillance d\'un client majeur, hausse des taux ou blocage portuaire.',
      targetMastery: 'Déterminer le nombre de jours de survie (Cash Runway) sous stress extrême.',
      modules: [
        {
          id: 'TRES_MOD_5',
          levelId: 'TRES_NIV_5',
          pathId: 'PATH_TRESORERIE_360',
          moduleNumber: 5,
          title: 'Module 5 : La Résilience et le Stress-Testing Financier',
          description: 'Modélisation de scénarios de rupture, calcul du Cash Runway et plan de contingence.',
          competencyCodes: ['TRES-PREVISION', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'TRES_CHAP_5_1',
              moduleId: 'TRES_MOD_5',
              title: 'Chapitre 1 : Méthodologie du Stress Test de Trésorerie',
              description: 'Simulation déterministe des chocs de liquidité et plan de sauvegarde.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_TRES_05',
                  chapterId: 'TRES_CHAP_5_1',
                  moduleId: 'TRES_MOD_5',
                  pathId: 'PATH_TRESORERIE_360',
                  title: 'Leçon 1 : Modélisation des Chocs de Liquidité et Mesure du Cash Runway',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Définir les hypothèses de stress test (ex: retard de 30 jours de 40% des clients, hausse de 20% des matières, blocage d\'un découvert).',
                    'Calculer le Cash Runway (nombre de mois ou semaines de survie avec les liquidités actuelles sous flux dégradés).',
                    'Identifier le point d\'inflexion de cessation de paiements.',
                    'Activer le plan de contingence de trésorerie (gel des investissements, chômage technique partiel, moratoire bancaire).',
                  ],
                  prerequisites: ['Maîtrise du 13-Week Cash Flow.'],
                  contextIntro: 'Gérer la trésorerie par temps calme est simple. Mais qu\'advient-il si le principal client de l\'entreprise (représentant 35% du chiffre d\'affaires) dépose le bilan ou suspend ses paiements ? Le stress-testing de liquidité permet de quantifier avec précision combien de temps l\'entreprise peut tenir avant la rupture.',
                  theorySections: [
                    {
                      title: '1. Le Calcul du Cash Runway en Contexte de Crise',
                      content: 'Le Cash Runway (ou horizon de survie) mesure la durée pendant laquelle l\'entreprise peut continuer à opérer avec sa trésorerie actuelle et ses lignes confirmées, sous l\'hypothèse d\'un arrêt brutal ou d\'un ralentissement critique des encaissements. Cash Runway (en mois) = (Trésorerie Disponible + Lignes de Découvert Non Tirées) / Burn Rate Mensuel Net.',
                      keyDefinitions: [
                        { term: 'Cash Runway', definition: 'Nombre de mois ou semaines pendant lesquels l\'entreprise peut financer ses charges incompressibles avant épuisement total des liquidités.' },
                        { term: 'Net Burn Rate', definition: 'Rythme mensuel de consommation nette de trésorerie (Décaissements incompressibles - Encaissements certains).' },
                      ],
                      rulesAndPrinciples: [
                        'Le trésorier doit toujours maintenir un Cash Runway minimal de 3 mois en environnement économique volatil.',
                        'Un stress test doit combiner au moins deux chocs simultanés (ex: retard client + fermeture d\'une ligne bancaire).',
                      ],
                      formulas: [
                        {
                          name: 'Formule du Cash Runway',
                          formula: 'Cash Runway (mois) = Liquidités Totales Disponibles / Consommation Nette Mensuelle (Burn Rate)',
                          interpretation: 'Durée de survie sans nouveaux financements.',
                          syscohadaRef: 'Gestion des Risques Financiers et Réglementation Bancaire',
                        },
                      ],
                      commonMistakes: [
                        'Considérer les lignes de crédit non confirmées comme du cash certain : en cas de crise, la banque peut révoquer une facilité non confirmée à 30 jours de préavis !',
                      ],
                      professionalBestPractices: [
                        'Faire valider par le Conseil d\'Administration un protocole d\'urgence déclenché automatiquement dès que le Runway passe sous 60 jours.',
                      ],
                      memorizationTips: [
                        'Runway = Piste d\'atterrissage. Moins il y en a, plus le crash approche.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du Cash Runway d\'une jeune entreprise',
                    scenario: 'Une entreprise dispose de 24 000 000 FCFA de trésorerie en banque. Ses charges fixes incompressibles (salaires, loyers, abonnements) sont de 8 000 000 FCFA par mois. En cas d\'arrêt total des ventes, combien de mois peut-elle survivre ?',
                    dataset: { cashDisponible: 24000000, burnRate: 8000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du Runway', calculation: '24 000 000 / 8 000 000 = 3 mois', justification: 'L\'entreprise a exactement 3 mois de visibilité devant elle.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Stress test : défaillance d\'un client représentant 30% du CA',
                    scenario: 'Prévision d\'encaissements mensuels normaux = 50 000 000 FCFA. Décaissements = 45 000 000 FCFA (excédent mensuel de +5M). Le gros client (15M/mois) cesse de payer.',
                    dataset: { encNormal: 50000000, decaissement: 45000000, defaillanceClient: 15000000, cashInitial: 20000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Nouveaux encaissements sous stress', calculation: '50 000 000 - 15 000 000 = 35 000 000 FCFA', justification: 'Chute brutale des rentrées.' },
                      { step: 2, action: 'Nouveau solde mensuel (Burn Rate)', calculation: '35 000 000 - 45 000 000 = -10 000 000 FCFA par mois', justification: 'L\'entreprise brûle 10 millions par mois.' },
                      { step: 3, action: 'Cash Runway résiduel', calculation: '20 000 000 / 10 000 000 = 2 mois', justification: 'Sans action corrective, cessation de paiement dans 60 jours.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Industries Métallurgiques d\'Abidjan (IMA SA)',
                    locationContext: 'Abidjan, Zone Industrielle Vridi',
                    sector: 'Profilage d\'acier',
                    currency: 'FCFA',
                    problemStatement: 'Pendant la crise sanitaire et logistique, les délais de livraison maritime sont passés de 30 à 90 jours. Pour ne pas arrêter son laminoir, IMA a dû tripler ses stocks de bobines d\'acier, immobilisant 180 000 000 FCFA de cash imprévu. Le stress test a révélé que la trésorerie allait s\'effondrer en 4 semaines.',
                    financialStatements: {
                      tresorerieAvantChoc: 95000000,
                      surcoutStockageMois: 60000000,
                      decouvertMaxAutorise: 80000000,
                      runwayAvantIntervention: 4,
                    },
                    realWorldResolution: 'Grâce au stress test réalisé dès la deuxième semaine, le trésorier a négocié un crédit documentaire de refinancement import (Lettre de crédit à 120 jours) auprès de la Banque Ouest-Africaine de Développement (BOAD) et a différé de 6 mois le paiement des acomptes sur machines neuves. Le choc a été absorbé sans rupture bancaire.',
                    recommendationToBoard: 'Simuler deux fois par an un stress test de fermeture logistique pour calibrer les réserves de précaution.',
                  },
                  guidedExercise: {
                    id: 'EX_TRES_GUIDED_05',
                    title: 'Exercice Guidé : Calcul du Cash Runway',
                    instruction: 'Une PME dispose de 45 000 000 FCFA de trésorerie disponible. En situation de crise, ses encaissements tombent à 10 000 000 FCFA/mois tandis que ses décaissements incompressibles s\'élèvent à 25 000 000 FCFA/mois. Combien de mois de Cash Runway possède-t-elle ?',
                    dataset: { cash: 45000000, enc: 10000000, dec: 25000000 },
                    stepByStepHelp: [
                      '1. Burn Rate net mensuel = 25 000 000 - 10 000 000 = 15 000 000 FCFA/mois.',
                      '2. Runway = 45 000 000 / 15 000 000 mois.',
                    ],
                    expectedAnswer: 3,
                    detailedCorrection: 'Cash Runway = 45 000 000 / 15 000 000 = 3 mois de survie.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_TRES_AUTO_05',
                    title: 'Exercice Autonome : Déficit cumulé sous stress',
                    instruction: 'Sous un scénario de crise, une entreprise perd 8 000 000 FCFA de liquidités chaque mois pendant 4 mois consécutifs. Elle disposait d\'une trésorerie initiale de 18 000 000 FCFA. Quel sera son solde de trésorerie à l\'issue des 4 mois (si négatif, entrez un nombre négatif, ex: -14000000) ?',
                    dataset: { initial: 18000000, perteMensuelle: 8000000, mois: 4 },
                    hints: [
                      'Perte totale = 8 000 000 x 4 = 32 000 000 FCFA.',
                      'Solde final = 18 000 000 - 32 000 000 FCFA.',
                    ],
                    expectedAnswer: -14000000,
                    detailedCorrection: 'Solde final = 18 000 000 - (8 000 000 x 4) = -14 000 000 FCFA (besoin de financement d\'urgence de 14M).',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_TRES_SIM_05',
                    title: 'Atelier Pratique : Simulation d\'un Choc de Liquidité Majeur',
                    type: 'simulator',
                    targetComponentId: 'treasury_simulator',
                    completionCriteria: {
                      metric: 'stressTestCompleted',
                      targetValue: 1,
                      description: 'Exécuter le scénario de stress et mettre en œuvre le plan de sauvegarde.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_TRES_05',
                      question: 'Que mesure le Cash Runway d\'une entreprise ?',
                      options: [
                        'Le nombre de mois ou semaines pendant lesquels l\'entité peut continuer à honorer ses charges sans nouveau financement avant rupture de liquidité',
                        'La longueur des pistes d\'atterrissage de fret aérien',
                        'Le montant total des dividendes distribuables',
                        'La valeur marchande des bâtiments',
                      ],
                      correctIndex: 0,
                      explanation: 'Le Cash Runway quantifie la fenêtre temporelle de survie opérationnelle disponible pour redresser la situation.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le stress testing permet d\'anticiper les crises avant qu\'elles ne surviennent.',
                    'Connaître son Cash Runway permet de prendre des décisions courageuses de réduction des coûts à temps.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 6 pour maîtriser les négociations bancaires et les dates de valeur.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_TRES_M5',
            moduleId: 'TRES_MOD_5',
            title: 'Évaluation Certifiante : Stress Testing de Trésorerie & Gestion de Crise',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_TRES_5',
                question: 'Pourquoi ne faut-il pas intégrer les lignes de découvert non confirmées dans le calcul du Cash Runway de sécurité ?',
                options: [
                  'Parce que la banque a le droit contractuel de suspendre une facilité non confirmée dès les premiers signes de tension financière',
                  'Parce que les découverts sont interdits par l\'OHADA',
                  'Parce que le taux est de 0%',
                  'Parce que l\'argent n\'existe pas',
                ],
                correctIndex: 0,
                explanation: 'Une ligne non confirmée est révocable à tout moment par la banque : en période de crise, c\'est précisément lorsque vous en avez besoin que la banque retire la ligne.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 6 : NÉGOCIATION BANCAIRE & DATES DE VALEUR
    // ------------------------------------------------------------------------
    {
      id: 'TRES_NIV_6',
      pathId: 'PATH_TRESORERIE_360',
      levelNumber: 6,
      title: 'Niveau 6 : Dates de Valeur, Jours de Banque & Négociation des Conditions',
      description: 'Déjouer les pièges des dates de valeur (J+2, J-1) et auditer les échelles d\'intérêts prélevées par les banques.',
      targetMastery: 'Récupérer les agios indus et négocier les conditions tarifaires bancaires.',
      modules: [
        {
          id: 'TRES_MOD_6',
          levelId: 'TRES_NIV_6',
          pathId: 'PATH_TRESORERIE_360',
          moduleNumber: 6,
          title: 'Module 6 : L\'Audit des Conditions de Banque et les Dates de Valeur',
          description: 'Mécanisme des dates de valeur d\'encaissement et de décaissement, contestation des erreurs bancaires.',
          competencyCodes: ['TRES-PREVISION'],
          durationHours: 6,
          chapters: [
            {
              id: 'TRES_CHAP_6_1',
              moduleId: 'TRES_MOD_6',
              title: 'Chapitre 1 : Les Règles des Dates de Valeur dans l\'UEMOA',
              description: 'Pourquoi un compte créditeur en date d\'opération peut être débiteur en date de valeur.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_TRES_06',
                  chapterId: 'TRES_CHAP_6_1',
                  moduleId: 'TRES_MOD_6',
                  pathId: 'PATH_TRESORERIE_360',
                  title: 'Leçon 1 : Maîtrise des Dates de Valeur et Contrôle des Échelles d\'Intérêts',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Comprendre la différence entre Date d\'Opération et Date de Valeur.',
                    'Identifier la règle bancaire asymétrique : Décaissements au débit avancés (J-1) et Encaissements au crédit retardés (J+2 ou J+3).',
                    'Détecter un découvert technique invisible sur le relevé d\'opération.',
                    'Rédiger une lettre de réclamation pour agios injustifiés.',
                  ],
                  prerequisites: ['Maîtrise du rapprochement bancaire.'],
                  contextIntro: 'Vous consultez votre relevé bancaire : le solde n\'a jamais été négatif en date d\'opération. Pourtant, à la fin du trimestre, la banque vous prélève 850 000 FCFA d\'agios ! Ce phénomène est causé par les DATES DE VALEUR, qui avancent les débits et retardent les crédits.',
                  theorySections: [
                    {
                      title: '1. Le Piège des Dates de Valeur Asymétriques',
                      content: 'Pour la banque, le temps c\'est de l\'argent. Lorsqu\'un chèque est déposé le mardi 10, la banque le crédite en date de valeur au jeudi 12 (J+2). Mais si vous émettez un chèque débité le mardi 10, elle l\'impute en date de valeur au lundi 9 (J-1). Pendant 3 jours (du 9 au 12), votre compte a été virtuellement à découvert en date de valeur, déclenchant des agios et des CPFD à votre insu !',
                      keyDefinitions: [
                        { term: 'Date d\'Opération', definition: 'Date calendaire réelle à laquelle l\'opération comptable ou le dépôt a été enregistré par la banque.' },
                        { term: 'Date de Valeur', definition: 'Date juridique et financière à partir de laquelle les fonds portent intérêt (ou cessent de porter intérêt pour les débits).' },
                      ],
                      rulesAndPrinciples: [
                        'Le calcul des intérêts débiteurs repose EXCLUSIVEMENT sur les dates de valeur, jamais sur les dates d\'opération.',
                        'Les jours fériés et week-ends augmentent artificiellement la durée des découverts en date de valeur.',
                      ],
                      formulas: [
                        {
                          name: 'Découvert en Date de Valeur',
                          formula: 'Solde Valeur(Date t) = Total Crédits en Valeur <= t - Total Débits en Valeur <= t',
                          interpretation: 'Solde réel pris en compte par l\'algorithme de facturation des agios de la banque.',
                          syscohadaRef: 'Décisions du Conseil des Ministres de l\'UMOA sur la Transparence Bancaire',
                        },
                      ],
                      commonMistakes: [
                        'Déposer un gros chèque client le vendredi après-midi et émettre immédiatement un virement fournisseur le jour même.',
                      ],
                      professionalBestPractices: [
                        'Négocier dans la convention de compte bancaire la suppression des dates de valeur sur les virements électroniques (date de valeur = date d\'opération).',
                      ],
                      memorizationTips: [
                        'Crédit recule, Débit avance : la banque gagne toujours si on ne surveille pas.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Découvert technique créé par les dates de valeur',
                    scenario: 'Le lundi, solde = 0. Vous déposez 10 000 000 FCFA de chèques (valeur J+2 = mercredi). Le lundi même, un virement de 10 000 000 FCFA est débité (valeur J-0 = lundi).',
                    dataset: { depot: 10000000, virement: 10000000, joursDecouvert: 2 },
                    stepByStepSolution: [
                      { step: 1, action: 'Solde en date d\'opération', calculation: '10 000 000 - 10 000 000 = 0 FCFA', justification: 'Le compte semble équilibré.' },
                      { step: 2, action: 'Solde en date de valeur lundi et mardi', calculation: '0 - 10 000 000 = -10 000 000 FCFA pendant 2 jours', justification: 'Découvert de 10 millions pendant 48 heures.' },
                      { step: 3, action: 'Impact agios', calculation: 'La banque facturera 2 jours d\'agios et une CPFD sur 10M FCFA', justification: 'Coût évitable par une meilleure gestion des dates.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Réclamation et rétrocession d\'agios indus',
                    scenario: 'L\'audit de l\'échelle d\'intérêts révèle que la banque a appliqué une valeur J+4 sur des virements interbancaires au lieu de J+1 convenu dans le contrat. Agios facturés à tort = 450 000 FCFA.',
                    dataset: { agiosIndus: 450000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Établissement du relevé de contestation', calculation: 'Démonstration des 3 jours de valeur indûment appliqués sur 15 opérations', justification: 'Preuve documentaire irréfutable.' },
                      { step: 2, action: 'Courrier à la direction des engagements', calculation: 'Demande de recrédit de 450 000 FCFA + TOB afférente', justification: 'Régularisation obtenue sur le relevé suivant.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Grands Moulins d\'Abidjan (GMA SA)',
                    locationContext: 'Abidjan, Zone Portuaire',
                    sector: 'Industrie meunière',
                    currency: 'FCFA',
                    problemStatement: 'GMA traitait plus de 500 chèques clients par mois pour un flux annuel de 8 milliards FCFA. Les banques appliquaient systématiquement des dates de valeur de J+3 ouvré. Le coût annuel des agios techniques s\'élevait à 38 000 000 FCFA sans aucun besoin réel de découvert !',
                    financialStatements: {
                      fluxAnnuelCheques: 8000000000,
                      agiosTechniquesPayes: 38000000,
                      gainNegociationObtenu: 26000000,
                    },
                    realWorldResolution: 'Le trésorier a mis en concurrence les 4 banques de la place en proposant de domicilier 60% des flux d\'exportation dans la banque qui accorderait la date de valeur J+1 sur les remises de chèques et J+0 sur les virements. La BICICI a accepté l\'offre : économie immédiate de 26 millions FCFA dès la première année.',
                    recommendationToBoard: 'Soumettre les conditions tarifaires bancaires à un appel d\'offres biannuel.',
                  },
                  guidedExercise: {
                    id: 'EX_TRES_GUIDED_06',
                    title: 'Exercice Guidé : Calcul des nombres débiteurs d\'un découvert technique',
                    instruction: 'Un découvert en date de valeur de 15 000 000 FCFA dure 3 jours (du vendredi au dimanche inclus). Quel est le montant des Nombres Débiteurs générés (Solde x Jours) ?',
                    dataset: { solde: 15000000, jours: 3 },
                    stepByStepHelp: [
                      'Nombres débiteurs = 15 000 000 x 3.',
                    ],
                    expectedAnswer: 45000000,
                    detailedCorrection: 'Nombres débiteurs = 15 000 000 x 3 = 45 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_TRES_AUTO_06',
                    title: 'Exercice Autonome : Calcul de l\'économie sur jours de banque',
                    instruction: 'En négociant une réduction de date de valeur de 2 jours sur une remise de 100 000 000 FCFA au taux débiteur de 12%, quelle économie d\'agios l\'entreprise réalise-t-elle en FCFA (100M x 12% x 2 / 360) ?',
                    dataset: { montant: 100000000, taux: 0.12, gainJours: 2 },
                    hints: [
                      '100 000 000 x 0,12 x (2 / 360).',
                    ],
                    expectedAnswer: 66667,
                    detailedCorrection: 'Économie d\'agios = (100 000 000 x 12% x 2) / 360 = 66 667 FCFA sur cette seule opération.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_TRES_SIM_06',
                    title: 'Atelier Pratique : Audit des Dates de Valeur dans le Simulateur',
                    type: 'simulator',
                    targetComponentId: 'treasury_simulator',
                    completionCriteria: {
                      metric: 'valueDatesReconciled',
                      targetValue: 1,
                      description: 'Identifier et éliminer les découverts techniques.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_TRES_06',
                      question: 'Quelle est la différence fondamentale entre la date d\'opération et la date de valeur d\'une écriture bancaire ?',
                      options: [
                        'La date d\'opération est le jour de la saisie comptable, tandis que la date de valeur est celle qui sert au calcul des intérêts débiteurs ou créditeurs',
                        'Elles sont toujours identiques',
                        'La date de valeur ne concerne que les impôts',
                        'La date d\'opération est fixée par le juge',
                      ],
                      correctIndex: 0,
                      explanation: 'La date de valeur est la date financière contractuelle à partir de laquelle la somme porte intérêt ou commence à coûter des agios.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La maîtrise des dates de valeur permet d\'économiser des millions d\'agios chaque année.',
                    'L\'audit systématique des relevés d\'échelle d\'intérêts est une obligation professionnelle du trésorier.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 7 pour maîtriser le placement des excédents de trésorerie sur le marché UEMOA.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_TRES_M6',
            moduleId: 'TRES_MOD_6',
            title: 'Évaluation Certifiante : Dates de Valeur et Négociations Bancaires',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_TRES_6',
                question: 'Pourquoi un chèque remis à l\'encaissement le vendredi après-midi est-il particulièrement pénalisé par les dates de valeur ?',
                options: [
                  'Parce que le samedi et le dimanche s\'ajoutent aux jours ouvrés de compensation bancaire, différant la date de valeur au mardi ou mercredi suivant',
                  'Parce que la banque ferme le week-end',
                  'Parce que les chèques sont interdits le vendredi',
                  'Cela n\'a aucun impact',
                ],
                correctIndex: 0,
                explanation: 'Les week-ends ne sont pas des jours ouvrés : le délai de J+2 ouvré repousse la valeur au milieu de la semaine suivante.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 7 : PLACEMENT DES EXCÉDENTS & MARCHÉ MONÉTAIRE UEMOA
    // ------------------------------------------------------------------------
    {
      id: 'TRES_NIV_7',
      pathId: 'PATH_TRESORERIE_360',
      levelNumber: 7,
      title: 'Niveau 7 : Placement des Excédents de Liquidité & Instruments Monétaires UEMOA',
      description: 'Rentabiliser les surplus de trésorerie en conciliant Sécurité, Liquidité et Rendement (Dépôts à terme DAT, Bons du Trésor UEMOA-Titres, OPCVM monétaires).',
      targetMastery: 'Sélectionner le support de placement optimal sans bloquer la flexibilité opérationnelle.',
      modules: [
        {
          id: 'TRES_MOD_7',
          levelId: 'TRES_NIV_7',
          pathId: 'PATH_TRESORERIE_360',
          moduleNumber: 7,
          title: 'Module 7 : La Gestion Active des Excédents et le Marché Sous-Régional',
          description: 'Arbitrage entre Dépôt à Terme (DAT), Bons et Obligations Assimilables du Trésor (BAT/OAT) et SICAV monétaires.',
          competencyCodes: ['TRES-PREVISION', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'TRES_CHAP_7_1',
              moduleId: 'TRES_MOD_7',
              title: 'Chapitre 1 : Les Véhicules de Placement Court Terme en Afrique de l\'Ouest',
              description: 'Rendements nets, fiscalité de l\'IRVM et critères de liquidité.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_TRES_07',
                  chapterId: 'TRES_CHAP_7_1',
                  moduleId: 'TRES_MOD_7',
                  pathId: 'PATH_TRESORERIE_360',
                  title: 'Leçon 1 : Arbitrage des Placements de Trésorerie : DAT vs Bons du Trésor UEMOA',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Appliquer le triangle d\'or du placement : Sécurité (zéro perte en capital), Liquidité (disponibilité rapide), Rendement.',
                    'Calculer les intérêts nets d\'un Dépôt à Terme (DAT) après déduction de l\'Impôt sur le Revenu des Valeurs Mobilières (IRVM).',
                    'Comprendre le fonctionnement des Bons du Trésor (BAT) émis via UMOA-Titres (durées 3, 6, 12 mois avec intérêts précomptés).',
                    'Construire une échelle de placement échelonnée par maturités.',
                  ],
                  prerequisites: ['Maîtrise du budget de trésorerie et identification des surplus durables.'],
                  contextIntro: 'Laisser dormir 100 millions FCFA sur un compte courant bancaire non rémunéré est un manque à gagner financier coupable. Sur le marché financier sous-régional de l\'UEMOA, des titres d\'État souverains ou des DAT bien négociés offrent des rendements de 5,5% à 7% par an en toute sécurité.',
                  theorySections: [
                    {
                      title: '1. Le Triangle d\'Or des Placements de Trésorerie',
                      content: 'Le trésorier d\'entreprise n\'est pas un spéculateur : sa priorité absolue est la SÉCURITÉ DU CAPITAL (interdiction formelle de perdre 1 franc d\'argent d\'exploitation). Sa deuxième priorité est la LIQUIDITÉ (pouvoir récupérer les fonds si un imprévu survient). Le RENDEMENT n\'intervient qu\'en troisième critère pour départager les solutions sécurisées.',
                      keyDefinitions: [
                        { term: 'Dépôt à Terme (DAT)', definition: 'Compte bloqué auprès d\'une banque commerciale pour une durée fixée (1 à 12 mois) rémunéré à un taux d\'intérêt contractuel garanti.' },
                        { term: 'Bon Assimilable du Trésor (BAT)', definition: 'Titre de dette souveraine émis par adjudication par les États membres de l\'UEMOA (Côte d\'Ivoire, Sénégal, etc.) via l\'agence UMOA-Titres, d\'une durée inférieure ou égale à 1 an.' },
                      ],
                      rulesAndPrinciples: [
                        'Ne jamais placer sur une durée supérieure à l\'horizon d\'inactivité prévisible des fonds.',
                        'Échelonner les maturités (ex: 20M à 1 mois, 30M à 3 mois, 50M à 6 mois) pour assurer un retour de liquidité régulier.',
                      ],
                      formulas: [
                        {
                          name: 'Intérêts Nets d\'un DAT',
                          formula: 'Intérêts Nets = Capital x Taux Brut x (Jours / 360) x (1 - Taux IRVM)',
                          interpretation: 'Rendement net réellement perçu sur le compte bancaire après retenue fiscale à la source.',
                          syscohadaRef: 'Code Général des Impôts UEMOA (IRVM usuellement 10% à 15%)',
                        },
                      ],
                      commonMistakes: [
                        'Bloquer de la trésorerie sur un DAT à 12 mois non résiliable alors que l\'entreprise doit payer un acompte fiscal dans 3 mois.',
                      ],
                      professionalBestPractices: [
                        'Négocier une clause de sortie anticipée avec pénalité réduite en cas d\'urgence opérationnelle majeure.',
                      ],
                      memorizationTips: [
                        '1. Sécurité, 2. Liquidité, 3. Rendement.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul des intérêts nets d\'un DAT à 6 mois',
                    scenario: 'Placement de 50 000 000 FCFA à 6% brut l\'an pendant 180 jours. Taux de retenue fiscale IRVM = 10%.',
                    dataset: { capital: 50000000, tauxBrut: 0.06, jours: 180, irvm: 0.10 },
                    stepByStepSolution: [
                      { step: 1, action: 'Intérêts bruts', calculation: '50 000 000 x 6% x (180 / 360) = 1 500 000 FCFA', justification: 'Rémunération contractuelle brute.' },
                      { step: 2, action: 'Retenue fiscale IRVM (10%)', calculation: '1 500 000 x 10% = 150 000 FCFA', justification: 'Impôt retenu à la source par la banque.' },
                      { step: 3, action: 'Intérêts nets perçus', calculation: '1 500 000 - 150 000 = 1 350 000 FCFA', justification: 'Produit financier net encaissé (compte 771).' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Rendement précompté d\'un Bon du Trésor UMOA-Titres',
                    scenario: 'Achat d\'un Bon du Trésor de valeur nominale 10 000 000 FCFA à 1 an émis au prix d\'adjudication de 9 400 000 FCFA (intérêts précomptés de 600 000 FCFA).',
                    dataset: { nominal: 10000000, prixAchat: 9400000, interet: 600000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Décaissement immédiat', calculation: '9 400 000 FCFA décaissés à l\'achat', justification: 'Intérêts déduits d\'avance.' },
                      { step: 2, action: 'Remboursement à maturité', calculation: '10 000 000 FCFA encaissés à l\'échéance', justification: 'Remboursement au pair sans risque souverain régional.' },
                      { step: 3, action: 'Taux de rendement effectif', calculation: '600 000 / 9 400 000 = 6,38% net d\'impôt (les titres publics sont souvent exonérés d\'IRVM)', justification: 'Rendement supérieur aux dépôts bancaires ordinaires.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Société Ivoirienne de Ciment & Béton (SICB SA)',
                    locationContext: 'San Pedro, Côte d\'Ivoire',
                    sector: 'Industrie des matériaux',
                    currency: 'FCFA',
                    problemStatement: 'SICB disposait de 400 000 000 FCFA de trésorerie dormante suite à une augmentation de capital en attente de démarrage de chantier prévu dans 9 mois. Les fonds étaient sur un compte à vue rémunéré à 0%.',
                    financialStatements: {
                      tresorerieDormante: 400000000,
                      dureeDisponibiliteMois: 9,
                      tauxMarcheBAT: 0.065,
                      gainPotentielPerdu: 19500000,
                    },
                    realWorldResolution: 'Le trésorier a souscrit un Bon du Trésor de Côte d\'Ivoire à 6 mois pour 250 millions (taux 6,2% exonéré d\'impôt) et placé 150 millions sur un DAT à 3 mois renouvelable à 5,5%. L\'opération a généré 18 200 000 FCFA de produits financiers nets en toute sécurité.',
                    recommendationToBoard: 'Adopter une politique formelle de placement de trésorerie interdisant plus de 50 millions non rémunérés plus de 7 jours consécutifs.',
                  },
                  guidedExercise: {
                    id: 'EX_TRES_GUIDED_07',
                    title: 'Exercice Guidé : Calcul d\'intérêts de placement',
                    instruction: 'Une entreprise place 100 000 000 FCFA sur un Dépôt à Terme (DAT) à 3 mois (90 jours) au taux annuel brut de 6%. Quel est le montant des intérêts bruts générés (en FCFA, formule : Capital x Taux x 90 / 360) ?',
                    dataset: { capital: 100000000, taux: 0.06, jours: 90 },
                    stepByStepHelp: [
                      '1. 100 000 000 x 0,06 = 6 000 000 FCFA par an.',
                      '2. Pour 90 jours : 6 000 000 x (90 / 360) = 6 000 000 / 4.',
                    ],
                    expectedAnswer: 1500000,
                    detailedCorrection: 'Intérêts bruts = 100 000 000 x 6% x (90 / 360) = 1 500 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_TRES_AUTO_07',
                    title: 'Exercice Autonome : Intérêts nets après impôt IRVM',
                    instruction: 'Les intérêts bruts d\'un placement s\'élèvent à 2 000 000 FCFA. Le taux de la taxe IRVM retenue à la source est de 10% (soit 200 000 FCFA d\'impôt). Quel est le montant net encaissé par l\'entreprise ?',
                    dataset: { brut: 2000000, taxe: 200000 },
                    hints: [
                      'Net = Brut - Taxe IRVM.',
                    ],
                    expectedAnswer: 1800000,
                    detailedCorrection: 'Intérêts nets = 2 000 000 - 200 000 = 1 800 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_TRES_SIM_07',
                    title: 'Atelier Pratique : Allocation et Arbitrage des Placements',
                    type: 'simulator',
                    targetComponentId: 'treasury_simulator',
                    completionCriteria: {
                      metric: 'investmentsAllocated',
                      targetValue: 1,
                      description: 'Répartir les excédents selon le triangle de liquidité.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_TRES_07',
                      question: 'Quelle est la priorité absolue d\'un trésorier d\'entreprise lors du placement des surplus de liquidités d\'exploitation ?',
                      options: [
                        'La sécurité absolue du capital et la disponibilité des fonds (liquidité) avant la recherche du rendement',
                        'Prendre des risques élevés sur des cryptomonnaies',
                        'Bloquer les fonds pendant 20 ans',
                        'Prêter l\'argent aux concurrents',
                      ],
                      correctIndex: 0,
                      explanation: 'La trésorerie d\'exploitation sert à payer les salaires et fournisseurs : le trésorier ne peut jamais tolérer un risque de perte en capital.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le marché monétaire de l\'UEMOA offre des instruments sûrs et liquides pour valoriser les excédents.',
                    'L\'échelonnement des maturités garantit la sécurité sans bloquer la flexibilité opérationnelle.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 8 pour réaliser le Projet Professionnel Final de restructuration de la trésorerie.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_TRES_M7',
            moduleId: 'TRES_MOD_7',
            title: 'Évaluation Certifiante : Placements de Trésorerie et Instruments Financiers',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_TRES_7',
                question: 'Pourquoi les Bons du Trésor émis via UMOA-Titres sont-ils particulièrement prisés par les directeurs financiers de la sous-région ?',
                options: [
                  'Parce qu\'ils sont garantis par les États membres, très liquides et bénéficient d\'exonérations fiscales avantageuses',
                  'Parce qu\'ils rapportent 50% par mois',
                  'Parce qu\'ils sont obligatoires par décret',
                  'Parce qu\'ils remplacent les salaires',
                ],
                correctIndex: 0,
                explanation: 'Les titres publics souverains de l\'UEMOA conjuguent sécurité de signature, rendement net attractif et liquidité sur le marché secondaire.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 8 : PROJET PROFESSIONNEL FINAL DE RESTRUCTURATION DE TRÉSORERIE
    // ------------------------------------------------------------------------
    {
      id: 'TRES_NIV_8',
      pathId: 'PATH_TRESORERIE_360',
      levelNumber: 8,
      title: 'Niveau 8 : Projet Professionnel Final & Restructuration de Liquidité',
      description: 'Sauvetage d\'une PME ivoirienne en rupture de liquidité : diagnostic BFR, montage du 13-Week Cash Flow, restructuration de la dette bancaire.',
      targetMastery: 'Maîtrise intégrale de la négociation bancaire et du redressement de trésorerie.',
      modules: [
        {
          id: 'TRES_MOD_8',
          levelId: 'TRES_NIV_8',
          pathId: 'PATH_TRESORERIE_360',
          moduleNumber: 8,
          title: 'Module 8 : Projet de Restructuration Financière et Examen de Maîtrise',
          description: 'Mise en situation de crise réelle sur une entreprise de distribution agro-alimentaire à Abidjan.',
          competencyCodes: ['TRES-PREVISION', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'TRES_CHAP_8_1',
              moduleId: 'TRES_MOD_8',
              title: 'Chapitre 1 : Conduite du Plan de Sauvetage de Liquidité',
              description: 'Négociation du moratoire bancaire et rétablissement du Cash Runway.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_TRES_08',
                  chapterId: 'TRES_CHAP_8_1',
                  moduleId: 'TRES_MOD_8',
                  pathId: 'PATH_TRESORERIE_360',
                  title: 'Leçon 1 : Restructuration de Passif Court Terme, Moratoires et Rétablissement du Cash',
                  durationMinutes: 45,
                  difficulty: 'Expert',
                  objectives: [
                    'Analyser l\'impasse de trésorerie d\'une PME au bord du dépôt de bilan.',
                    'Transformer les découverts toxiques en crédit à moyen terme amortissable (Consolidation de dettes à court terme).',
                    'Accélérer les encaissements par un plan de recouvrement commando (réduction du DSO de 30 jours).',
                    'Rédiger le protocole d\'accord bancaire à présenter au pool de banques.',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 7.'],
                  contextIntro: 'Vous intervenez comme Trésorier de Crise dans une PME ivoirienne de 50 salariés dont les comptes sont gelés par les banques pour dépassement de découvert de 95 millions FCFA. Votre mission : débloquer la paie sous 72 heures et restaurer une trésorerie positive sous 6 mois.',
                  theorySections: [
                    {
                      title: '1. Les 4 Leviers d\'Urgence du Sauvetage de Trésorerie',
                      content: '1. Gel immédiat de tout décaissement non vital pour l\'activité. 2. Consolidation bancaire : négocier la transformation des 95M de découverts étouffants (taux 14% + CPFD) en un emprunt à moyen terme sur 3 ans (taux 8%), libérant immédiatement la ligne de crédit opérationnelle. 3. Campagne commando d\'encaissement client avec escompte de 2% pour paiement sous 48h. 4. Pilotage strict au 13-Week Cash Flow présenté chaque quinzaine au pool bancaire.',
                      keyDefinitions: [
                        { term: 'Consolidation de Dette Court Terme', definition: 'Opération financière consistant à remplacer des découverts bancaires exigibles immédiatement par un prêt bancaire amortissable sur plusieurs années.' },
                      ],
                      rulesAndPrinciples: [
                        'Le banquier accepte de soutenir une entreprise en crise si, et seulement si, elle lui présente un plan de trésorerie hebdomadaire rigoureux et transparent.',
                      ],
                      formulas: [
                        {
                          name: 'Cash Libéré par Réduction du DSO',
                          formula: 'Cash Libéré = Chiffre d\'Affaires Annuel TTC x (Jours de DSO gagnés / 360)',
                          interpretation: 'Impact massif de l\'accélération des encaissements sur le solde bancaire.',
                          syscohadaRef: 'Restructuration Financière des Entreprises en Difficulté',
                        },
                      ],
                      commonMistakes: [
                        'Attendre que les comptes soient bloqués pour contacter son banquier : le préavis et la transparence sont la clé de la confiance.',
                      ],
                      professionalBestPractices: [
                        'Toujours désigner un interlocuteur unique et crédible face au pool bancaire.',
                      ],
                      memorizationTips: [
                        'Consolider, Relancer, Stabiliser, Piloter.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du cash libéré par une réduction de 20 jours de DSO',
                    scenario: 'Chiffre d\'affaires annuel TTC = 720 000 000 FCFA. Le DSO passe de 80 jours à 60 jours (gain de 20 jours de vente).',
                    dataset: { caTTC: 720000000, gainDSO: 20 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du CA journalier', calculation: '720 000 000 / 360 = 2 000 000 FCFA par jour', justification: 'Vente moyenne quotidienne.' },
                      { step: 2, action: 'Cash injecté dans les comptes', calculation: '2 000 000 x 20 jours = 40 000 000 FCFA de liquidités immédiates !', justification: 'Le BFR diminue de 40M au profit direct de la banque.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Impact de la consolidation d\'un découvert en emprunt amortissable',
                    scenario: 'Découvert de 60 000 000 FCFA transformé en crédit amortissable sur 3 ans (remboursement de capital = 20M/an, soit 1,67M/mois au lieu d\'un blocage total).',
                    dataset: { decouvert: 60000000, dureeAns: 3 },
                    stepByStepSolution: [
                      { step: 1, action: 'Soulagement immédiat du compte courant', calculation: 'Le compte courant bancaire revient à 0 FCFA', justification: 'Suppression immédiate des agios de découvert et de la CPFD.' },
                      { step: 2, action: 'Régénération de la ligne opérationnelle', calculation: 'La banque réouvre une facilité de caisse de 20M pour les besoins courants', justification: 'L\'entreprise retrouve sa capacité de paiement.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Société Ivoirienne de Négoce & Logistique (SINL SA)',
                    locationContext: 'Abidjan, Zone Portuaire',
                    sector: 'Logistique et entreposage',
                    currency: 'FCFA',
                    problemStatement: 'SINL avait accumulé 120 000 000 FCFA de découverts non autorisés auprès de la SGCI et d\'Ecobank. Les banques menaçaient d\'assigner l\'entreprise en liquidation judiciaire. Le plan de sauvetage a permis de sortir de l\'impasse en 90 jours.',
                    financialStatements: {
                      chiffreAffaires: 900000000,
                      detteDecouvertTotale: 120000000,
                      creancesClientsEnAttente: 180000000,
                      accordMoratoireObtenu: 100000000,
                    },
                    realWorldResolution: 'Le trésorier a obtenu la consolidation de 100M sur 4 ans à 7,5% et a récupéré 65M de créances en 30 jours grâce à une remise commerciale d\'escompte de 2%. Les pénalités bancaires ont été suspendues. L\'entreprise est aujourd\'hui profitable et désendettée.',
                    recommendationToBoard: 'Mettre en place un audit de trésorerie trimestriel présenté au Comité d\'Audit.',
                  },
                  guidedExercise: {
                    id: 'EX_TRES_GUIDED_08',
                    title: 'Exercice Guidé : Calcul du cash libéré sur le BFR',
                    instruction: 'Le chiffre d\'affaires annuel TTC d\'une entreprise est de 360 000 000 FCFA. Grâce à une cellule de recouvrement renforcée, le délai moyen de paiement des clients (DSO) est réduit de 15 jours. Quel est le montant exact de trésorerie libéré en FCFA (CA TTC x 15 / 360) ?',
                    dataset: { ca: 360000000, joursGagnes: 15 },
                    stepByStepHelp: [
                      '1. CA journalier = 360 000 000 / 360 = 1 000 000 FCFA/jour.',
                      '2. Cash libéré = 1 000 000 x 15 jours.',
                    ],
                    expectedAnswer: 15000000,
                    detailedCorrection: 'Cash libéré = 360 000 000 x (15 / 360) = 15 000 000 FCFA injectés directement sur les comptes bancaires.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_TRES_AUTO_08',
                    title: 'Exercice Autonome : Allègement de charge financière',
                    instruction: 'Un découvert de 50 000 000 FCFA coûtait 14% d\'agios par an (soit 7 000 000 FCFA d\'agios). En le transformant en crédit à moyen terme négocié à 8% l\'an (coût 4 000 000 FCFA la première année), quelle est l\'économie annuelle réalisée en FCFA ?',
                    dataset: { coutInitial: 7000000, coutNouveau: 4000000 },
                    hints: [
                      'Économie = 7 000 000 - 4 000 000 FCFA.',
                    ],
                    expectedAnswer: 3000000,
                    detailedCorrection: 'Économie annuelle sur frais financiers = 7 000 000 - 4 000 000 = 3 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_TRES_SIM_08',
                    title: 'Atelier Pratique : Mission Ultime de Sauvetage de Trésorerie',
                    type: 'simulator',
                    targetComponentId: 'treasury_simulator',
                    completionCriteria: {
                      metric: 'treasuryTurnaroundAchieved',
                      targetValue: 1,
                      description: 'Rétablir un solde de trésorerie positif sur l\'ensemble des 13 semaines.',
                    },
                    rubricPoints: 40,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_TRES_08',
                      question: 'Quelle est la mesure la plus efficace pour injecter rapidement des liquidités sans contracter de nouvelle dette financière ?',
                      options: [
                        'Accélérer le recouvrement des créances clients en retard (réduire le DSO)',
                        'Augmenter les prix de vente pour l\'année prochaine',
                        'Embaucher de nouveaux commerciaux',
                        'Changer de logo',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'argent des factures déjà émises appartient déjà à l\'entreprise : le recouvrer rapidement libère du cash immédiat sans aucun intérêt bancaire à payer.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le trésorier est le garant de la survie physique et de la solvabilité de l\'entreprise.',
                    'L\'anticipation et la rigueur dans le suivi des flux transforment une situation de crise en opportunité de restructuration saine.',
                  ],
                  nextStepRecommendation: 'Félicitations ! Vous avez validé avec succès l\'intégralité du cursus Gestion & Prévision de Trésorerie Opérationnelle 360°.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_TRES_M8',
            moduleId: 'TRES_MOD_8',
            title: 'Examen Final de Maîtrise Certifiante Gestion de Trésorerie 360°',
            passingScorePercent: 80,
            questions: [
              {
                id: 'FEQ_TRES_1',
                question: 'Pourquoi la consolidation d\'un découvert bancaire en emprunt à moyen terme est-elle souvent salutaire pour une PME en crise de trésorerie ?',
                options: [
                  'Parce qu\'elle étale le remboursement du capital sur plusieurs années et libère immédiatement la ligne de crédit pour les opérations quotidiennes',
                  'Parce qu\'elle efface définitivement la dette',
                  'Parce que le taux passe à zéro',
                  'Parce que l\'État rembourse le prêt',
                ],
                correctIndex: 0,
                explanation: 'La consolidation supprime la pression d\'exigibilité immédiate et transforme une dette court terme asphyxiante en mensualités programmées supportables.',
              },
            ],
          },
        },
      ],
    },
  ],

  finalProject: {
    id: 'PRJ_TRESORERIE_FINAL',
    title: 'Plan de Sauvetage de Trésorerie et Négociation d\'un Pool Bancaire pour une PME Ivoirienne',
    companyContext: 'Société Ivoirienne de Distribution Alimentaire (SIDA SA) - CA : 2,4 Milliards FCFA - Abidjan Vridi',
    businessScenario: 'SIDA SA fait face à une crise de liquidité sans précédent : suite à l\'insolvabilité temporaire de deux grands supermarchés partenaires (85M FCFA de créances gelées), le compte bancaire principal accuse un découvert non autorisé de 72 000 000 FCFA. Les banques menacent de rejeter les salaires du personnel dans 5 jours. Le Conseil d\'Administration vous confie la mission de bâtir le 13-Week Cash Flow d\'urgence, négocier avec le pool de 3 banques et rétablir la solvabilité de l\'entreprise.',
    deliverablesExpected: [
      'Diagnostic complet de la crise de liquidité et calcul du Cash Runway résiduel',
      'Plan de trésorerie glissant 13 semaines (13-Week Cash Flow) avec scénarios de stress',
      'Protocole d\'accord bancaire détaillant la consolidation des découverts et les garanties proposées',
      'Tableau de bord hebdomadaire de pilotage du cash et plan commando de recouvrement du DSO',
    ],
    gradingRubric: [
      { criterion: 'Exactitude des calculs de flux de trésorerie TTC et du 13-Week Cash Flow', weightPercent: 30, description: 'Zéro erreur de projection sur les flux hebdomadaires.' },
      { criterion: 'Pertinence du plan de consolidation et calcul des agios économisés', weightPercent: 30, description: 'Négociation réaliste et allègement financier mesurable.' },
      { criterion: 'Efficacité des mesures de recouvrement du DSO et libération de cash', weightPercent: 25, description: 'Chiffrage rigoureux du cash libéré sur le BFR.' },
      { criterion: 'Qualité du rapport de synthèse pour le pool bancaire', weightPercent: 15, description: 'Crédibilité, professionnalisme et respect des exigences BCEAO.' },
    ],
    passingScorePercent: 80,
  },
};
