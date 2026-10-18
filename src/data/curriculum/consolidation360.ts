import { LearningPath360 } from '../../types/pedagogy360';

// ============================================================================
// PARCOURS 360° : CONSOLIDATION DES COMPTES & REPORTING GROUPE (SYSCOHADA / IFRS)
// 8 Niveaux progressifs, cas réels de groupes holdings régionaux UEMOA en FCFA
// ============================================================================

export const PATH_CONSOLIDATION_360: LearningPath360 = {
  id: 'PATH_CONSOLIDATION_360',
  domainId: 'consolidation',
  title: 'Consolidation des Comptes & Reporting Financier de Groupe 360°',
  tagline: 'De la détermination du périmètre aux retraitements d\'homogénéisation, éliminations intragroupe et états financiers consolidés SYSCOHADA / IFRS',
  description: 'Une formation d\'excellence pratique et complète pour directeurs comptables, responsables consolidation et auditeurs de groupes opérant en Afrique de l\'Ouest et Centrale. Maîtriser l\'intégration globale, la mise en équivalence, l\'élimination des profits internes sur stocks et immobilisations, le calcul de l\'écart d\'acquisition (Goodwill) et la conversion des filiales hors zone CFA.',
  targetRole: 'Responsable Consolidation / Auditeur Senior / Directeur Financier de Groupe / Expert-Comptable Mémorialiste',
  levelBadge: 'Cursus Haute Expertise 8 Niveaux - Intermédiaire à Expert',
  color: 'indigo',
  iconName: 'Layers',
  version: '2.0.0',
  status: 'draft',
  estimatedHours: 52,
  prerequisites: [
    'Maîtrise de la comptabilité générale SYSCOHADA et analyse financière fondamentale',
    'Compréhension des comptes individuels d\'une société de capitaux (SA, SAS, SARL)',
    'Pratique courante des états financiers (Bilan, Compte de résultat, Balance générale)',
  ],
  competenciesTargeted: [
    'CONSO-GROUPE',
    'COMPT-SYSCOHADA',
    'ANAL-DIAGNOSTIC',
  ],
  initialDiagnosticId: 'DIAG_CONSO_01',
  completenessScore: 100,

  levels: [
    // ------------------------------------------------------------------------
    // NIVEAU 1 : PÉRIMÈTRE & POURCENTAGES DE CONTRÔLE ET D'INTÉRÊT
    // ------------------------------------------------------------------------
    {
      id: 'CONSO_NIV_1',
      pathId: 'PATH_CONSOLIDATION_360',
      levelNumber: 1,
      title: 'Niveau 1 : Périmètre de Consolidation, Contrôle & Intérêts',
      description: 'Déterminer le périmètre du groupe, calculer les pourcentages d\'intérêt et de contrôle et choisir la méthode de consolidation.',
      targetMastery: 'Classifier toute entité fille entre intégration globale, mise en équivalence ou exclusion légitime.',
      modules: [
        {
          id: 'CONSO_MOD_1',
          levelId: 'CONSO_NIV_1',
          pathId: 'PATH_CONSOLIDATION_360',
          moduleNumber: 1,
          title: 'Module 1 : Typologie des Contrôles et Définition du Périmètre',
          description: 'Contrôle exclusif de droit et de fait, contrôle conjoint, influence notable et liaisons directes/indirectes.',
          competencyCodes: ['CONSO-GROUPE'],
          durationHours: 6,
          chapters: [
            {
              id: 'CONSO_CHAP_1_1',
              moduleId: 'CONSO_MOD_1',
              title: 'Chapitre 1 : Pourcentage de Contrôle versus Pourcentage d\'Intérêt',
              description: 'Différence mathématique et économique fondamentale entre contrôle et participation financière.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CONSO_01',
                  chapterId: 'CONSO_CHAP_1_1',
                  moduleId: 'CONSO_MOD_1',
                  pathId: 'PATH_CONSOLIDATION_360',
                  title: 'Leçon 1 : Calcul des Pourcentages de Contrôle, d\'Intérêt et Choix de la Méthode',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Distinguer le pourcentage de contrôle (%C) et le pourcentage d\'intérêt financier (%I).',
                    'Calculer les droits de vote dans les structures en cascade (filiales et sous-filiales).',
                    'Identifier le type de contrôle : Exclusif (%C > 50%), Conjoint (partage contractuel), Notable (20% <= %C <= 50%).',
                    'Attribuer la méthode obligatoire selon le SYSCOHADA : Intégration Globale (IG) ou Mise en Équivalence (ME).',
                  ],
                  prerequisites: ['Bases de droit des sociétés OHADA et comptabilité générale.'],
                  contextIntro: 'Dans l\'espace OHADA, dès lors qu\'une société mère contrôle de manière exclusive ou conjointe d\'autres entités ou exerce une influence notable, elle doit établir des comptes consolidés. L\'acte fondateur de toute consolidation est la délimitation du périmètre et le calcul rigoureux des liens capitalistiques.',
                  theorySections: [
                    {
                      title: '1. Distinction Fondamentale entre Contrôle et Intérêt',
                      content: 'Le pourcentage de contrôle (%C) mesure le pouvoir politique de décision à l\'assemblée générale (droits de vote). Il détermine la méthode de consolidation. Le pourcentage d\'intérêt (%I) mesure la fraction des bénéfices et des capitaux propres revenant financièrement à la société mère.',
                      keyDefinitions: [
                        { term: 'Pourcentage de Contrôle (%C)', definition: 'Somme des droits de vote détenus directement par la mère et par ses filiales contrôlées exclusivement.' },
                        { term: 'Pourcentage d\'Intérêt (%I)', definition: 'Produit des fractions de capital détenues le long de chaque chaîne de participation (mesure de la quote-part patrimoniale).' },
                        { term: 'Intégration Globale (IG)', definition: 'Méthode intégrant 100% des actifs et dettes de la filiale au bilan consolidé avec constatation des intérêts minoritaires.' },
                      ],
                      rulesAndPrinciples: [
                        'Dans une chaîne de filiales, le contrôle est conservé si chaque maillon détient plus de 50% des droits de vote.',
                        'Si un maillon intermédiaire n\'est pas contrôlé de façon exclusive (%C <= 50%), la chaîne de contrôle direct est rompue pour les sous-filiales.',
                        'Le pourcentage d\'intérêt se calcule toujours en multipliant les fractions de capital (% direct * % sous-filiale).',
                      ],
                      formulas: [
                        {
                          name: 'Pourcentage d\'Intérêt en Cascade',
                          formula: '%I(Mère -> Sous-filiale B) = %I(Mère -> Filiale A) * %I(Filiale A -> Sous-filiale B)',
                          interpretation: 'Représente la part économique réelle de la mère dans les résultats de la sous-filiale.',
                          syscohadaRef: 'AUDCIF - Titre VIII, Comptes Consolidés (Art. 74 à 102)',
                        },
                      ],
                      commonMistakes: [
                        'Additionner les pourcentages d\'intérêt au lieu de les multiplier dans une chaîne séquentielle.',
                        'Confondre le taux de détention du capital et le taux des droits de vote (actions à droit de vote double).',
                      ],
                      professionalBestPractices: [
                        'Toujours dresser un organigramme juridique validé par le service juridique avant toute consolidation.',
                        'Identifier les droits de vote potentiels (obligations convertibles, bons de souscription).',
                      ],
                      memorizationTips: [
                        'Le Contrôle commande la MÉTHODE, l\'Intérêt commande le PARTAGE.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul sur une structure mère-filiale-sous-filiale',
                    scenario: 'La holding H détient 80% de la société F1. La société F1 détient 60% de la société SF2.',
                    dataset: { h_f1: 0.80, f1_sf2: 0.60 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du pourcentage de contrôle dans SF2', calculation: 'F1 détient 60% > 50% et H contrôle exclusivement F1 (80%) -> %C = 60%', justification: 'Contrôle exclusif indirect dans SF2.' },
                      { step: 2, action: 'Méthode de consolidation retenue', calculation: '%C = 60% > 50% -> Intégration Globale (IG)', justification: 'H détient le pouvoir souverain sur SF2 via F1.' },
                      { step: 3, action: 'Calcul du pourcentage d\'intérêt financier', calculation: '%I = 80% * 60% = 48,0%', justification: 'La holding a droit à 48% des résultats de SF2 ; les intérêts minoritaires s\'élèvent à 52%.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Rupture de chaîne de contrôle et mise en équivalence',
                    scenario: 'Holding H détient 40% de F3 (contrôle notable). F3 détient 70% de SF4.',
                    dataset: { h_f3: 0.40, f3_sf4: 0.70 },
                    stepByStepSolution: [
                      { step: 1, action: 'Analyse du contrôle de F3', calculation: '%C = 40% -> Influence notable -> F3 en Mise en Équivalence', justification: 'H n\'a pas le contrôle exclusif de F3.' },
                      { step: 2, action: 'Analyse du contrôle de SF4', calculation: 'La chaîne de contrôle est rompue. H n\'exerce aucun contrôle direct sur SF4.', justification: 'SF4 n\'est pas consolidée directement par H (ses résultats transitent via la mise en équivalence de F3).' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Agro-Industriel Panafricain (GAIP SA)',
                    locationContext: 'Abidjan / Dakar / Douala - Siège à Abidjan Plateau',
                    sector: 'Plantations, raffinage d\'huile et distribution',
                    currency: 'FCFA',
                    problemStatement: 'GAIP SA détient 75% d\'une filiale ivoirienne de conditionnement (FIL-CI) et 30% d\'une société de transport logistique au Sénégal (LOG-SN). FIL-CI détient elle-même 40% de LOG-SN. L\'équipe comptable s\'interroge sur la méthode applicable à LOG-SN.',
                    financialStatements: { capitalLOG: 500000000, resultatNetLOG: 120000000, caLOG: 1800000000 },
                    realWorldResolution: 'Calcul des pourcentages pour LOG-SN : 1. Contrôle : GAIP détient 30% direct + 40% via FIL-CI (qu\'elle contrôle exclusivement à 75%), soit %C = 30% + 40% = 70% des droits de vote ! Conclusion : Contrôle exclusif -> Intégration Globale. 2. Intérêt : %I = 30% + (75% * 40%) = 30% + 30% = 60%. Les minoritaires détiennent 40%.',
                    recommendationToBoard: 'Intégrer globalement LOG-SN à 100% de ses actifs et dettes et attribuer 40% du résultat net (48 000 000 FCFA) aux participations ne donnant pas le contrôle.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_CONSO_1',
                    title: 'Calcul de pourcentage d\'intérêt et contrôle combiné',
                    instruction: 'Holding A détient directement 55% de B et 25% de C. La filiale B détient 35% de C. Calculez le Pourcentage de Contrôle (%C) et le Pourcentage d\'Intérêt (%I) de la Holding A dans la société C (en pourcentage).',
                    dataset: { a_b: 0.55, a_c: 0.25, b_c: 0.35 },
                    stepByStepHelp: [
                      '1. Contrôle : A contrôle exclusivement B (55% > 50%). Donc le contrôle de A dans C = 25% + 35% = 60%.',
                      '2. Intérêt : %I = 25% + (55% * 35%) = 25% + 19.25% = 44.25%.',
                    ],
                    expectedAnswer: 44.25,
                    detailedCorrection: '%C = 25% + 35% = 60% (Contrôle exclusif -> Intégration Globale). %I = 25% + (0.55 * 35%) = 44,25%.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_CONSO_1',
                    title: 'Calcul d\'intérêt financier dans une sous-filiale',
                    instruction: 'Une société mère M détient 90% d\'une filiale F1. F1 détient 80% d\'une sous-filiale SF2. SF2 détient 50% d\'une entité E3. Quel est le pourcentage d\'intérêt financier de la mère M dans l\'entité E3 en pourcentage ? (ex : tapez 36 pour 36%)',
                    dataset: { m_f1: 0.90, f1_sf2: 0.80, sf2_e3: 0.50 },
                    hints: ['%I = 0.90 * 0.80 * 0.50 * 100.'],
                    expectedAnswer: 36,
                    detailedCorrection: '%I = 0,90 * 0,80 * 0,50 = 0,36, soit 36%.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_CONSO_L1_SIM',
                    title: 'Cockpit de Consolidation : Périmètre et Pourcentages d\'Intérêt',
                    type: 'simulator',
                    targetComponentId: 'consolidation_cockpit',
                    presetConfig: { action: 'MAP_GROUP_PERIMETER', group: 'HOLDING_UEMOA' },
                    completionCriteria: {
                      metric: 'perimeter_validated',
                      targetValue: true,
                      description: 'Construire la matrice des pourcentages de contrôle et d\'intérêt pour un groupe de 4 entités.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CONSO_1_1',
                      question: 'Quelle est la méthode de consolidation obligatoire sous le SYSCOHADA pour une filiale détenue à 65% avec contrôle exclusif ?',
                      options: [
                        'L\'Intégration Globale (IG)',
                        'La Mise en Équivalence (ME)',
                        'L\'Intégration Proportionnelle',
                        'La simple comptabilisation au coût historique',
                      ],
                      correctIndex: 0,
                      explanation: 'Le contrôle exclusif (>50% des droits de vote) impose obligatoirement l\'intégration globale de l\'entité.',
                    },
                  ],
                  keyTakeawaySummary: [
                    '%C détermine la méthode de consolidation (IG si > 50%, ME si 20% à 50%).',
                    '%I détermine la quote-part des capitaux propres et résultats revenant à la mère.',
                    'L\'intégration globale reprend 100% du bilan et résultat de la filiale.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 2 pour aborder les retraitements d\'homogénéisation des comptes individuels.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CONSO_MOD_1',
            moduleId: 'CONSO_MOD_1',
            title: 'Évaluation Certifiante : Périmètre et Pourcentages de Contrôle',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CONSO_1',
                question: 'Pourquoi les pourcentages d\'intérêt et de contrôle diffèrent-ils souvent dans un groupe ?',
                options: [
                  'Parce que le contrôle mesure le pouvoir de vote pour diriger l\'entité alors que l\'intérêt mesure les flux économiques réels perçus à travers les détentions en chaîne',
                  'Parce que les devises changent',
                  'À cause de la TVA',
                  'Pour tromper le fisc',
                ],
                correctIndex: 0,
                explanation: 'Une mère peut contrôler à 100% les décisions d\'une sous-filiale tout en ne détenant économiquement que 40% de ses flux financiers après dilution le long de la chaîne.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 2 : RETRAITEMENTS D'HOMOGÉNÉISATION & CONVERSION
    // ------------------------------------------------------------------------
    {
      id: 'CONSO_NIV_2',
      pathId: 'PATH_CONSOLIDATION_360',
      levelNumber: 2,
      title: 'Niveau 2 : Retraitements d\'Homogénéisation & Harmonisation Comptable',
      description: 'Harmoniser les méthodes comptables des filiales (stocks, amortissements, crédit-bail) et calculer les impôts différés.',
      targetMastery: 'Convertir les balances individuelles des filiales en référentiel groupe unique.',
      modules: [
        {
          id: 'CONSO_MOD_2',
          levelId: 'CONSO_NIV_2',
          pathId: 'PATH_CONSOLIDATION_360',
          moduleNumber: 2,
          title: 'Module 2 : Les Retraitements d\'Homogénéisation Obligatoires',
          description: 'Méthodes d\'évaluation des stocks (FIFO vs CMP), retraitements de crédit-bail et méthode du report d\'impôt variable.',
          competencyCodes: ['CONSO-GROUPE', 'COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'CONSO_CHAP_2_1',
              moduleId: 'CONSO_MOD_2',
              title: 'Chapitre 1 : Harmonisation des Principes Comptables du Groupe',
              description: 'Passage des règles fiscales locales aux règles économiques consolidées.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CONSO_02',
                  chapterId: 'CONSO_CHAP_2_1',
                  moduleId: 'CONSO_MOD_2',
                  pathId: 'PATH_CONSOLIDATION_360',
                  title: 'Leçon 1 : Retraitements de Crédit-Bail, Amortissements et Impôts Différés',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Retraiter les contrats de crédit-bail (leasing) en immobilisation et dette d\'emprunt.',
                    'Harmoniser les plans d\'amortissement selon les durées d\'utilité économique du groupe.',
                    'Calculer l\'impôt différé actif (IDA) et passif (IDP) au taux d\'IS en vigueur (25% en UEMOA).',
                  ],
                  prerequisites: ['Validation du Niveau 1.'],
                  contextIntro: 'Dans les comptes individuels, les choix comptables sont souvent dictés par l\'optimisation fiscale locale (amortissements dégressifs, loyers de leasing passés en charges 623). En consolidation, la prééminence de la réalité économique sur l\'apparence juridique (substance over form) impose d\'harmoniser toutes les filiales selon les règles du groupe.',
                  theorySections: [
                    {
                      title: '1. Retraitement du Crédit-Bail (Leasing)',
                      content: 'En consolidation SYSCOHADA / IFRS, le bien pris en crédit-bail est inscrit à l\'Actif immobilisé pour sa valeur initiale et une dette financière équivalente est inscrite au Passif. Les redevances payées sont ventilées entre amortissement financier du capital et charge d\'intérêt financier.',
                      formulas: [
                        {
                          name: 'Impôt Différé',
                          formula: 'Impôt Différé = Écart Temporaire d\'Évaluation * Taux d\'Impôt sur les Sociétés (25%)',
                          interpretation: 'Constatation de la créance ou dette d\'impôt future résultant du décalage fiscal.',
                          syscohadaRef: 'AUDCIF - Art. 83',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Retraitement d\'un véhicule en crédit-bail',
                    scenario: 'Une filiale utilise un camion d\'une valeur de 40 000 000 FCFA pris en leasing sur 5 ans. Elle a payé 10 000 000 FCFA de loyers comptabilisés au compte 623.',
                    dataset: { valeurInitiale: 40000000, dureeAns: 5, loyerAnnuel: 10000000, partCapital: 7500000, partInteret: 2500000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Constatation à l\'actif', calculation: 'Débit 245 Matériel de transport = 40 000 000 FCFA', justification: 'Le bien est contrôlé économiquement par le groupe.' },
                      { step: 2, action: 'Amortissement économique', calculation: 'Dotation = 40 000 000 / 5 = 8 000 000 FCFA au débit de charges d\'amortissement', justification: 'Usure économique normale.' },
                      { step: 3, action: 'Annulation du loyer', calculation: 'Crédit 623 pour 10 000 000 FCFA et Débit 16x Dettes de leasing (7,5M) + 67x Frais financiers (2,5M)', justification: 'Rétablissement de la réalité financière du financement.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Calcul de l\'impôt différé sur provision non déductible',
                    scenario: 'Une filiale a doté une provision pour litige de 20 000 000 FCFA non déductible fiscalement l\'année N. Taux d\'IS = 25%.',
                    dataset: { provision: 20000000, tauxIS: 0.25 },
                    stepByStepSolution: [
                      { step: 1, action: 'Qualification fiscale', calculation: 'Écart temporaire déductible futur de 20 000 000 FCFA', justification: 'L\'entreprise déduira la charge au moment du paiement effectif du litige.' },
                      { step: 2, action: 'Constatation de l\'impôt différé actif', calculation: '20 000 000 * 0,25 = 5 000 000 FCFA au débit de créance fiscale (Actif)', justification: 'Économie d\'impôt future certaine.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Brasseries Réunies du Littoral (BRL SA)',
                    locationContext: 'San Pedro / Abidjan - Filiale d\'un groupe de boissons',
                    sector: 'Agro-alimentaire & Embouteillage',
                    currency: 'FCFA',
                    problemStatement: 'BRL SA a acquis une ligne d\'embouteillage de 600 000 000 FCFA amortie en dégressif fiscal sur 3 ans dans ses comptes individuels (dotation N1 = 200 000 000 FCFA). Le référentiel groupe impose un amortissement linéaire sur la durée d\'utilité économique de 10 ans (soit 60 000 000 FCFA).',
                    financialStatements: { valeurLigne: 600000000, amortissementFiscal: 200000000, amortissementEco: 60000000, tauxIS: 0.25 },
                    realWorldResolution: 'Retraitement de consolidation : 1. Annulation du surplus d\'amortissement = 200M - 60M = 140 000 000 FCFA au crédit des charges. 2. Constatation d\'un impôt différé passif = 140 000 000 * 25% = 35 000 000 FCFA au crédit du passif. Le résultat net consolidé est bonifié de 105 000 000 FCFA net d\'impôt.',
                    recommendationToBoard: 'Mettre à jour le manuel de procédures comptables groupe pour caler l\'inventaire physique sur les durées d\'utilité économique IFRS/SYSCOHADA.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_CONSO_2',
                    title: 'Calcul d\'impôt différé sur amortissement économique',
                    instruction: 'Un matériel est amorti de 50 000 000 FCFA au plan fiscal et de 30 000 000 FCFA au plan économique consolidé. Taux d\'IS = 25%. Calculez le montant de l\'Impôt Différé Passif généré par ce retraitement (en FCFA).',
                    dataset: { fiscal: 50000000, eco: 30000000, tauxIS: 0.25 },
                    stepByStepHelp: [
                      '1. Écart temporaire imposable = 50 000 000 - 30 000 000 = 20 000 000 FCFA.',
                      '2. Impôt différé = 20 000 000 * 0.25 = 5 000 000 FCFA.',
                    ],
                    expectedAnswer: 5000000,
                    detailedCorrection: 'L\'impôt différé passif s\'élève à 5 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_CONSO_2',
                    title: 'Impact net sur le résultat consolidé',
                    instruction: 'Suite à l\'annulation d\'une charge fiscale de 40 000 000 FCFA avec un impôt différé de 25% (10 000 000 FCFA), quel est l\'impact net positif sur le résultat consolidé (en FCFA) ?',
                    dataset: { annulationCharge: 40000000, impotDiffere: 10000000 },
                    hints: ['Impact net = Annulation de charge - Charge d\'impôt différé.'],
                    expectedAnswer: 30000000,
                    detailedCorrection: 'Impact net positif = 40 000 000 - 10 000 000 = 30 000 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_CONSO_L2_SIM',
                    title: 'Cockpit de Retraitements d\'Homogénéisation et Impôts Différés',
                    type: 'simulator',
                    targetComponentId: 'consolidation_cockpit',
                    presetConfig: { action: 'HOMOGENIZATION_ADJUSTMENTS', standard: 'SYSCOHADA_IFRS' },
                    completionCriteria: {
                      metric: 'adjustments_balanced',
                      targetValue: true,
                      description: 'Enregistrer les écritures de retraitement de leasing et de stocks et vérifier la balance d\'impôt différé.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CONSO_2_1',
                      question: 'Pourquoi annule-t-on les provisions réglementées (ex : amortissements dérogatoires) lors de la consolidation ?',
                      options: [
                        'Parce qu\'elles constituent de pures écritures fiscales sans réalité économique, qui faussent la comparaison entre filiales',
                        'Pour payer moins d\'impôt',
                        'Parce que le commissaire aux comptes l\'interdit',
                        'C\'est une option facultative réservée aux banques',
                      ],
                      correctIndex: 0,
                      explanation: 'Les amortissements dérogatoires sont des subventions fiscales déguisées sans correspondance avec l\'usure réelle des biens ; ils doivent être reclassés en réserves consolidées sous déduction de l\'impôt différé.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Les comptes individuels sont retraités pour refléter la réalité économique du groupe.',
                    'Le crédit-bail est requalifié en investissement financé par dette.',
                    'Tout décalage temporaire entre résultat fiscal et résultat consolidé génère un impôt différé.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 3 pour éliminer les créances, dettes et flux réciproques entre filiales.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CONSO_MOD_2',
            moduleId: 'CONSO_MOD_2',
            title: 'Évaluation Certifiante : Retraitements d\'Homogénéisation',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CONSO_2',
                question: 'Quel est l\'effet de la comptabilisation d\'un impôt différé actif (IDA) ?',
                options: [
                  'Augmentation de l\'actif du bilan consolidé et produit au compte de résultat consolidé',
                  'Diminution des capitaux propres',
                  'Paiement immédiat au Trésor Public',
                  'Aucun impact sur le résultat',
                ],
                correctIndex: 0,
                explanation: 'Un IDA est une créance d\'impôt futur qui crédite le compte de résultat consolidé en allégeant la charge d\'impôt de l\'exercice.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 3 : ÉLIMINATION DES OPÉRATIONS RÉCIPROQUES SANS MARGE
    // ------------------------------------------------------------------------
    {
      id: 'CONSO_NIV_3',
      pathId: 'PATH_CONSOLIDATION_360',
      levelNumber: 3,
      title: 'Niveau 3 : Élimination des Opérations Réciproques Bilan & Résultat',
      description: 'Éliminer les comptes courants intragroupe, créances/dettes et ventes/achats internes sans marge.',
      targetMastery: 'Nettoyer intégralement les flux miroirs entre sociétés intégrées.',
      modules: [
        {
          id: 'CONSO_MOD_3',
          levelId: 'CONSO_NIV_3',
          pathId: 'PATH_CONSOLIDATION_360',
          moduleNumber: 3,
          title: 'Module 3 : Les Éliminations Intragroupe à Somme Nulle',
          description: 'Cadrage des comptes réciproques, traitement des écarts de rapprochement et élimination des dividendes internes.',
          competencyCodes: ['CONSO-GROUPE', 'COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'CONSO_CHAP_3_1',
              moduleId: 'CONSO_MOD_3',
              title: 'Chapitre 1 : Élimination des Soldes et Flux Inter-Compagnies',
              description: 'Pourquoi le groupe ne peut avoir de créance sur lui-même ni se vendre à lui-même.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CONSO_03',
                  chapterId: 'CONSO_CHAP_3_1',
                  moduleId: 'CONSO_MOD_3',
                  pathId: 'PATH_CONSOLIDATION_360',
                  title: 'Leçon 1 : Rapprochement et Élimination des Créances/Dettes et Achats/Ventes Intragroupe',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Comprendre le principe de l\'entité économique unique.',
                    'Éliminer les créances clients et dettes fournisseurs intragroupe.',
                    'Éliminer les ventes et achats internes pour ne présenter que le CA réalisé avec les tiers extérieurs.',
                    'Neutraliser les dividendes distribués par les filiales à la société mère.',
                  ],
                  prerequisites: ['Validation des Niveaux 1 et 2.'],
                  contextIntro: 'Si une société mère vend des prestations à sa filiale, le chiffre d\'affaires cumulé des deux entités double artificiellement l\'activité réelle. De même, les dettes et créances entre filiales constituent de la monnaie interne qui doit disparaître du bilan consolidé.',
                  theorySections: [
                    {
                      title: '1. Élimination des Opérations de Bilan et de Résultat',
                      content: 'Toutes les créances et dettes réciproques entre entités intégrées globalement sont éliminées à 100%. Au compte de résultat, les achats réciproques sont annulés contre les ventes réciproques à hauteur du même montant, sans impact sur le résultat net.',
                      formulas: [
                        {
                          name: 'Chiffre d\'Affaires Consolidé',
                          formula: 'CA Consolidé = CA(Entité A) + CA(Entité B) - Ventes Réciproques de A vers B',
                          interpretation: 'Seul le chiffre d\'affaires facturé à des clients tiers extérieurs au groupe est reconnu.',
                          syscohadaRef: 'AUDCIF - Art. 85',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Élimination d\'une facture intragroupe',
                    scenario: 'La filiale A vend des matières premières à la filiale B pour 50 000 000 FCFA. À la clôture, B doit 50 000 000 FCFA à A.',
                    dataset: { flux: 50000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Élimination Bilan', calculation: 'Débit Fournisseurs 401 (-50M) / Crédit Clients 411 (-50M)', justification: 'Annulation intégrale de la créance et de la dette réciproque.' },
                      { step: 2, action: 'Élimination Résultat', calculation: 'Débit Ventes 701 (-50M) / Crédit Achats 601 (-50M)', justification: 'Le résultat net consolidé reste rigoureusement inchangé.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Élimination de dividendes distribués par une filiale',
                    scenario: 'Une filiale détenue à 80% verse 100 000 000 FCFA de dividendes à sa mère. La mère a comptabilisé 80 000 000 FCFA en produits financiers 771.',
                    dataset: { dividendeTotal: 100000000, partMere: 80000000, partMinoritaires: 20000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Annulation du produit financier chez la mère', calculation: 'Débit 771 Produits financiers pour 80 000 000 FCFA', justification: 'Le groupe ne peut pas faire de profit financier sur ses filiales.' },
                      { step: 2, action: 'Rétablissement des réserves consolidées', calculation: 'Crédit Réserves consolidées pour 80 000 000 FCFA', justification: 'Le flux de trésorerie reste à l\'intérieur du groupe.' },
                      { step: 3, action: 'Traitement des 20M minoritaires', calculation: 'Sortie de trésorerie envers des tiers réels (Passif)', justification: 'Les 20 millions vont à des tiers actionnaires externes.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Cimentier & Logistique Ouest-Africain (GCLO SA)',
                    locationContext: 'Abidjan / Lomé - Groupe cimentier',
                    sector: 'Industrie lourde et matériaux',
                    currency: 'FCFA',
                    problemStatement: 'GCLO présente un chiffre d\'affaires brut cumulé de 12,4 milliards FCFA. L\'audit révèle que l\'usine de clinker de Lomé a vendu 3,8 milliards FCFA de ciment à la filiale de distribution d\'Abidjan, qui lui doit encore 1,2 milliard FCFA en compte courant bloqué.',
                    financialStatements: { caCumule: 12400000000, ventesInternes: 3800000000, creanceInterne: 1200000000 },
                    realWorldResolution: 'Retraitement de consolidation : 1. Annulation de 3,8 milliards de FCFA sur les ventes et sur les achats. Le CA consolidé authentique est rectifié à 8,6 milliards FCFA. 2. Annulation de 1,2 milliard de FCFA sur les comptes clients et fournisseurs.',
                    recommendationToBoard: 'Mettre en place un outil de réconciliation automatique inter-compagnies à J-5 de chaque clôture trimestrielle.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_CONSO_3',
                    title: 'Calcul de chiffre d\'affaires consolidé avec refacturations internes',
                    instruction: 'Entité Mère CA = 4 500 000 000 FCFA. Filiale 1 CA = 2 800 000 000 FCFA. Filiale 2 CA = 1 900 000 000 FCFA. Les refacturations internes de services de la Mère vers les deux filiales totalisent 600 000 000 FCFA. Quel est le CA consolidé (en FCFA) ?',
                    dataset: { caMere: 4500000000, caF1: 2800000000, caF2: 1900000000, intercos: 600000000 },
                    stepByStepHelp: [
                      'CA Cumulé = 4 500M + 2 800M + 1 900M = 9 200 000 000 FCFA.',
                      'CA Consolidé = 9 200 000 000 - 600 000 000 = 8 600 000 000 FCFA.',
                    ],
                    expectedAnswer: 8600000000,
                    detailedCorrection: 'CA Consolidé = 8 600 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_CONSO_3',
                    title: 'Impact de l\'élimination d\'un compte courant réciproque',
                    instruction: 'La filiale A a une créance de 350 000 000 FCFA sur la filiale B. Quel est l\'impact de cette élimination sur le total du bilan consolidé (en FCFA, indiquer la variation avec signe négatif) ?',
                    dataset: { montant: 350000000 },
                    hints: ['Le total du bilan diminue du montant de la créance à l\'actif et de la dette au passif.'],
                    expectedAnswer: -350000000,
                    detailedCorrection: 'Le total du bilan consolidé diminue de 350 000 000 FCFA à l\'actif et au passif.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_CONSO_L3_SIM',
                    title: 'Cockpit d\'Élimination des Soldes et Flux Intragroupe',
                    type: 'simulator',
                    targetComponentId: 'consolidation_cockpit',
                    presetConfig: { action: 'ELIMINATE_RECIPROCALS', perimeter: 'ALL_SUBSIDIARIES' },
                    completionCriteria: {
                      metric: 'reciprocals_cleared',
                      targetValue: true,
                      description: 'Lettrer et éliminer les flux intragroupe sans générer d\'écart de balance.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CONSO_3_1',
                      question: 'Pourquoi l\'élimination des ventes et achats internes n\'a-t-elle aucun impact sur le résultat net consolidé ?',
                      options: [
                        'Parce que le débit (diminution des ventes) compense exactement le crédit (diminution des charges d\'achats)',
                        'Parce que l\'impôt n\'est pas payé',
                        'Parce que les deux filiales sont situées dans le même pays',
                        'C\'est le résultat net qui augmente de 50%',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'écriture annule un produit et une charge pour un montant identique ; le solde arithmétique sur le résultat est rigoureusement nul.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Toutes les créances et dettes intragroupe doivent être rigoureusement lettrées et éliminées.',
                    'Le CA consolidé ne comptabilise que les opérations avec des tiers externes au groupe.',
                    'Les dividendes internes sont éliminés pour reconstituer les capitaux propres d\'origine.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 4 pour neutraliser les profits internes sur stocks et immobilisations.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CONSO_MOD_3',
            moduleId: 'CONSO_MOD_3',
            title: 'Évaluation Certifiante : Éliminations des Opérations Réciproques',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CONSO_3',
                question: 'Comment traite-t-on un écart de rapprochement intragroupe de 5 000 000 FCFA dû à un chèque en cours d\'acheminement postal ?',
                options: [
                  'On comptabilise l\'écriture de régularisation pour amener les deux comptes au même solde avant d\'éliminer',
                  'On ignore la filiale dans le périmètre',
                  'On passe la différence en perte définitive',
                  'On modifie les comptes individuels certifiés',
                ],
                correctIndex: 0,
                explanation: 'L\'écart d\'acheminement est soldé par une écriture de trésorerie en transit dans les journaux de consolidation pour équilibrer la balance avant élimination.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 4 : NEUTRALISATION DES PROFITS INTERNES SUR STOCKS ET ACTIFS
    // ------------------------------------------------------------------------
    {
      id: 'CONSO_NIV_4',
      pathId: 'PATH_CONSOLIDATION_360',
      levelNumber: 4,
      title: 'Niveau 4 : Neutralisation des Profits Internes (Stocks & Cessions d\'Actifs)',
      description: 'Éliminer la marge interne sur stocks invendus et neutraliser les plus-values de cession interne d\'immobilisations.',
      targetMastery: 'Corriger la valeur des actifs consolidés et recalculer l\'impact fiscal différé.',
      modules: [
        {
          id: 'CONSO_MOD_4',
          levelId: 'CONSO_NIV_4',
          pathId: 'PATH_CONSOLIDATION_360',
          moduleNumber: 4,
          title: 'Module 4 : Traitement des Marges Non Réalisées dans le Périmètre',
          description: 'Marge en stock à la clôture, cessions internes d\'actifs amortissables et ajustements d\'impôts différés.',
          competencyCodes: ['CONSO-GROUPE', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'CONSO_CHAP_4_1',
              moduleId: 'CONSO_MOD_4',
              title: 'Chapitre 1 : Annulation de la Marge Interne en Stocks',
              description: 'Principe fondamental : aucun bénéfice ne peut être dégagé tant que le bien n\'est pas vendu à un tiers.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CONSO_04',
                  chapterId: 'CONSO_CHAP_4_1',
                  moduleId: 'CONSO_MOD_4',
                  pathId: 'PATH_CONSOLIDATION_360',
                  title: 'Leçon 1 : Calcul et Élimination de la Marge Interne en Stocks et Fiscalité Différée',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Calculer le montant de la marge interne incluse dans les stocks de clôture.',
                    'Comptabiliser l\'élimination de la marge au bilan (stocks) et au compte de résultat (variation de stocks).',
                    'Constater l\'impôt différé actif (IDA) sur la marge éliminée (taux IS 25%).',
                    'Comprendre le débouclement lors de la revente ultérieure aux clients tiers.',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 3.'],
                  contextIntro: 'Lorsqu\'une filiale industrielle vend des produits à sa filiale commerciale en dégageant 20% de marge, et que ces produits sont encore dans les entrepôts à la date du 31 décembre, le groupe ne peut pas enregistrer ce profit. Pour le groupe, le stock doit être valorisé à son coût de production historique d\'origine.',
                  theorySections: [
                    {
                      title: '1. Mécanisme d\'Annulation de la Marge en Stock',
                      content: 'La marge interne comprise dans les stocks de clôture est éliminée en totalité. Les stocks sont ramenés à leur coût d\'achat ou de fabrication pour le groupe. La réduction du résultat avant impôt génère la constatation d\'un Impôt Différé Actif.',
                      formulas: [
                        {
                          name: 'Marge Interne sur Stocks',
                          formula: 'Marge Interne = Valeur du Stock Acheté en Interne * Taux de Marge de la Filiale Vendeuse',
                          interpretation: 'Part du bénéfice fictif qui doit être neutralisée.',
                          syscohadaRef: 'AUDCIF - Art. 86',
                        },
                        {
                          name: 'Impact Net sur Résultat Consolidé',
                          formula: 'Impact Net = - Marge Interne Brute * (1 - Taux d\'Impôt IS)',
                          interpretation: 'Effet réducteur sur les capitaux propres et le résultat net de l\'exercice.',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Neutralisation d\'une marge en stock simple',
                    scenario: 'Filiale A vend pour 100 000 000 FCFA de marchandises à Filiale B avec 30% de marge brute. Au 31/12, B détient encore 40 000 000 FCFA de ce lot en stock.',
                    dataset: { stockRestant: 40000000, tauxMarge: 0.30, tauxIS: 0.25 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la marge interne', calculation: '40 000 000 * 0,30 = 12 000 000 FCFA', justification: 'Bénéfice non réalisé vis-à-vis des tiers.' },
                      { step: 2, action: 'Élimination sur les stocks', calculation: 'Crédit 3x Stocks pour 12 000 000 FCFA / Débit Variation de stocks', justification: 'Le stock est ramené à son coût d\'origine de 28 000 000 FCFA.' },
                      { step: 3, action: 'Constatation de l\'impôt différé', calculation: '12 000 000 * 0,25 = 3 000 000 FCFA en Impôt Différé Actif', justification: 'Produit d\'impôt différé au compte de résultat.' },
                      { step: 4, action: 'Impact net consolidé', calculation: '-12M + 3M = -9 000 000 FCFA sur le résultat', justification: 'Le résultat consolidé est ajusté de la perte de marge non réalisée.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Cession interne d\'immobilisation avec plus-value',
                    scenario: 'La mère vend un terrain acquis 50 000 000 FCFA à sa filiale pour 80 000 000 FCFA, constatant une plus-value de 30 000 000 FCFA.',
                    dataset: { prixVente: 80000000, valeurOrigine: 50000000, plusValue: 30000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Élimination de la plus-value', calculation: 'Débit 7x Produits de cession (-30M) / Crédit 2x Terrains (-30M)', justification: 'Le terrain est réévalué à sa valeur historique de 50 millions dans le bilan consolidé.' },
                      { step: 2, action: 'Impôt différé', calculation: '30 000 000 * 25% = 7 500 000 FCFA (IDA)', justification: 'Ajustement fiscal de la transaction interne.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Meunier & Boulangerie d\'Abidjan (GMBA SA)',
                    locationContext: 'Zone Portuaire Vridi, Abidjan',
                    sector: 'Moulins et agro-transformation',
                    currency: 'FCFA',
                    problemStatement: 'La filiale meunerie vend de la farine à la filiale boulangerie industrielle pour 850 000 000 FCFA avec une marge sur coût de revient de 25%. Au 31 décembre, la filiale boulangerie a en stock 200 000 000 FCFA de farine et 60 000 000 FCFA de produits finis intégrant cette farine à hauteur de 50%.',
                    financialStatements: { stockFarine: 200000000, stockProduitsFinis: 60000000, partFarineEnPF: 0.50, tauxMarge: 0.25, tauxIS: 0.25 },
                    realWorldResolution: 'Calcul de la base de marge interne : Stock farine brut = 200M + (60M * 50%) = 230 000 000 FCFA. Marge interne éliminée = 230 000 000 * 25% = 57 500 000 FCFA. Impôt différé actif constaté = 57 500 000 * 25% = 14 375 000 FCFA. Impact net sur le résultat consolidé = -43 125 000 FCFA.',
                    recommendationToBoard: 'Mettre en place un outil de valorisation des transferts au prix de cession interne pour tracer automatiquement les marges en stock à chaque fin de mois.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_CONSO_4',
                    title: 'Calcul guidé de la marge interne et de l\'impôt différé',
                    instruction: 'Le stock de clôture issu de ventes intragroupe s\'élève à 80 000 000 FCFA. Le taux de marge appliqué par la société vendeuse est de 20%. Le taux d\'IS est de 25%. Calculez le montant net de la réduction du résultat consolidé après impôt différé (en FCFA).',
                    dataset: { stock: 80000000, marge: 0.20, is: 0.25 },
                    stepByStepHelp: [
                      '1. Marge brute = 80 000 000 * 0.20 = 16 000 000 FCFA.',
                      '2. Impôt différé actif = 16 000 000 * 0.25 = 4 000 000 FCFA.',
                      '3. Réduction nette du résultat = 16 000 000 - 4 000 000 = 12 000 000 FCFA.',
                    ],
                    expectedAnswer: 12000000,
                    detailedCorrection: 'Réduction nette du résultat consolidé = 16 000 000 - 4 000 000 = 12 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_CONSO_4',
                    title: 'Calcul autonome de marge interne en stock',
                    instruction: 'Une filiale a 50 000 000 FCFA de marchandises en stock achetées à sa sœur qui réalise 35% de marge. Quel est le montant brut de marge à éliminer du stock (en FCFA) ?',
                    dataset: { stock: 50000000, tauxMarge: 0.35 },
                    hints: ['Marge = Stock * 0,35.'],
                    expectedAnswer: 17500000,
                    detailedCorrection: 'Marge interne brute éliminée = 50 000 000 * 0,35 = 17 500 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_CONSO_L4_SIM',
                    title: 'Cockpit d\'Élimination des Marges Internes sur Stocks et Actifs',
                    type: 'simulator',
                    targetComponentId: 'consolidation_cockpit',
                    presetConfig: { action: 'NEUTRALIZE_INTERNAL_MARGINS', scope: 'INVENTORY_AND_FA' },
                    completionCriteria: {
                      metric: 'margins_eliminated_and_taxed',
                      targetValue: true,
                      description: 'Neutraliser les marges sur stocks et générer les écritures d\'impôts différés d\'actif.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CONSO_4_1',
                      question: 'Que devient la marge en stock éliminée à l\'exercice N lorsque les stocks sont revendus à des clients tiers lors de l\'exercice N+1 ?',
                      options: [
                        'Elle est réintégrée au résultat de l\'exercice N+1, car le bénéfice est désormais définitivement réalisé vis-à-vis de l\'extérieur du groupe',
                        'Elle est définitivement perdue',
                        'Elle est versée aux impôts',
                        'Elle est transférée au compte de capital social',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'élimination de la marge en stock est purement temporaire : dès la revente finale au client tiers, le profit est libéré dans les comptes consolidés.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Les marges sur stocks non vendus aux tiers doivent être intégralement éliminées.',
                    'L\'élimination génère un Impôt Différé Actif qui atténue l\'impact sur le résultat.',
                    'Le profit se déboucle naturellement lors de l\'exercice suivant à la revente finale.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 5 pour calculer l\'écart d\'acquisition (Goodwill) et réaliser les tests d\'impairment.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CONSO_MOD_4',
            moduleId: 'CONSO_MOD_4',
            title: 'Évaluation Certifiante : Neutralisation des Profits Internes',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CONSO_4',
                question: 'Si une société mère vend une machine amortissable à sa filiale avec 10 000 000 FCFA de plus-value, que doit-on retraiter chaque année suivante ?',
                options: [
                  'On doit éliminer la plus-value résiduelle et corriger le surcroît de dotation aux amortissements comptabilisé par la filiale',
                  'On ne fait plus rien',
                  'On augmente le dividende',
                  'On revend la machine immédiatement',
                ],
                correctIndex: 0,
                explanation: 'La filiale amortit la machine sur son prix d\'achat majoré ; il faut donc annuler la quote-part de sur-amortissement annuel pour revenir à la dotation historique.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 5 : ÉCART DE PREMIÈRE CONSOLIDATION & GOODWILL
    // ------------------------------------------------------------------------
    {
      id: 'CONSO_NIV_5',
      pathId: 'PATH_CONSOLIDATION_360',
      levelNumber: 5,
      title: 'Niveau 5 : Écart d\'Acquisition (Goodwill), Juste Valeur & Dépréciation',
      description: 'Évaluer les actifs nets à la juste valeur, calculer l\'écart d\'acquisition et tester les pertes de valeur.',
      targetMastery: 'Déterminer le goodwill d\'une acquisition et réaliser un test de dépréciation annuel (impairment test).',
      modules: [
        {
          id: 'CONSO_MOD_5',
          levelId: 'CONSO_NIV_5',
          pathId: 'PATH_CONSOLIDATION_360',
          moduleNumber: 5,
          title: 'Module 5 : Le Traitement du Goodwill et des Écarts d\'Évaluation',
          description: 'Coût d\'acquisition des titres, valorisation à la juste valeur des actifs/passifs acquis et méthode d\'évaluation du goodwill.',
          competencyCodes: ['CONSO-GROUPE', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'CONSO_CHAP_5_1',
              moduleId: 'CONSO_MOD_5',
              title: 'Chapitre 1 : Calcul de l\'Écart d\'Acquisition à la Date de Prise de Contrôle',
              description: 'De la valeur comptable à la juste valeur des capitaux propres acquis.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CONSO_05',
                  chapterId: 'CONSO_CHAP_5_1',
                  moduleId: 'CONSO_MOD_5',
                  pathId: 'PATH_CONSOLIDATION_360',
                  title: 'Leçon 1 : Calcul du Goodwill, Écarts d\'Évaluation et Test Annuel de Perte de Valeur',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Déterminer le coût d\'acquisition des titres de participation.',
                    'Calculer la Juste Valeur de l\'Actif Net Identifiable (JVANI) de la cible.',
                    'Calculer le Goodwill : Coût d\'acquisition - (% Intérêt * JVANI).',
                    'Distinguer le goodwill positif (actif incorporel) du badwill (écart négatif en produit).',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 4.'],
                  contextIntro: 'Lorsqu\'une holding acquiert une entreprise, le prix payé est généralement supérieur à la valeur comptable de ses fonds propres, car la cible possède un savoir-faire, une clientèle, des brevets ou une position dominante sur son marché. Cet excédent constitue l\'écart d\'acquisition ou Goodwill.',
                  theorySections: [
                    {
                      title: '1. Formule Fondamentale du Goodwill',
                      content: 'Le Goodwill représente le surprix payé pour acquérir le contrôle des flux futurs de l\'entreprise. Il s\'inscrit à l\'Actif incorporel du bilan consolidé. En normes IFRS/SYSCOHADA révisé, le goodwill ne s\'amortit plus de manière linéaire mais fait l\'objet d\'un test de dépréciation annuel obligatoire.',
                      formulas: [
                        {
                          name: 'Goodwill (Écart d\'Acquisition)',
                          formula: 'Goodwill = Coût d\'Acquisition des Titres - [ % d\'Intérêt Détenu * Juste Valeur des Actifs Nets Identifiables ]',
                          interpretation: 'Si > 0 : Actif incorporel consolidé. Si < 0 : Badwill comptabilisé immédiatement en résultat.',
                          syscohadaRef: 'AUDCIF - Art. 88 & IFRS 3 Regroupements d\'entreprises',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du Goodwill lors d\'un rachat à 80%',
                    scenario: 'Holding H achète 80% des actions de la société Cible pour 1 200 000 000 FCFA. Les capitaux propres comptables de la Cible sont de 1 000 000 000 FCFA. Une réévaluation d\'un brevet apporte 250 000 000 FCFA de plus-value (après impôt différé).',
                    dataset: { prixAchat: 1200000000, cpComptables: 1000000000, plusValueJusteValeur: 250000000, pourcent: 0.80 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la Juste Valeur de l\'Actif Net', calculation: '1 000 000 000 + 250 000 000 = 1 250 000 000 FCFA', justification: 'Actif net réévalué à la date de prise de contrôle.' },
                      { step: 2, action: 'Quote-part acquise par la mère', calculation: '1 250 000 000 * 0,80 = 1 000 000 000 FCFA', justification: 'Valeur patrimoniale réelle acquise.' },
                      { step: 3, action: 'Calcul du Goodwill', calculation: '1 200 000 000 (Prix payé) - 1 000 000 000 = +200 000 000 FCFA', justification: 'Goodwill inscrit à l\'actif incorporel du bilan consolidé.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Constatation d\'un Badwill (Acquisition à des conditions avantageuses)',
                    scenario: 'Rachat d\'une filiale en difficulté pour 400 000 000 FCFA alors que son actif net réévalué s\'élève à 600 000 000 FCFA pour 100% du capital.',
                    dataset: { prix: 400000000, jvani: 600000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de l\'écart', calculation: '400M - 600M = -200 000 000 FCFA', justification: 'Écart d\'acquisition négatif.' },
                      { step: 2, action: 'Traitement comptable', calculation: 'Constatation d\'un profit immédiat de 200 000 000 FCFA au compte de résultat consolidé', justification: 'Norme IFRS 3 / SYSCOHADA : profit sur acquisition avantageuse.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Agro-Chimie & Semences Tropicales (GAST SA)',
                    locationContext: 'Abidjan / Yamoussoukro, Côte d\'Ivoire',
                    sector: 'Fertilisants et intrants agricoles',
                    currency: 'FCFA',
                    problemStatement: 'GAST SA a acquis 70% d\'une usine d\'engrais au Sénégal pour 3,5 milliards FCFA en 2023, avec un Goodwill initial de 600 000 000 FCFA. En 2025, suite à la perte d\'un grand contrat d\'État, le test d\'impairment (actualisation des flux DCF) indique que la valeur recouvrable de l\'entité n\'est plus que de 2,4 milliards FCFA.',
                    financialStatements: { goodwillBilan: 600000000, valeurComptableEntite: 3200000000, valeurRecouvrable: 2400000000 },
                    realWorldResolution: 'Perte de valeur globale = 3,2 Md - 2,4 Md = 800 000 000 FCFA. Le Goodwill de 600 000 000 FCFA est intégralement déprécié à zéro au compte de résultat. Le solde de 200 000 000 FCFA est imputé au prorata sur les immobilisations corporelles.',
                    recommendationToBoard: 'Constater la charge exceptionnelle de dépréciation de 600M au bilan consolidé et renégocier les covenants avec les banques préteurs.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_CONSO_5',
                    title: 'Calcul de Goodwill avec actif net réévalué',
                    instruction: 'Prix d\'acquisition pour 100% des actions = 2 500 000 000 FCFA. Capitaux propres comptables = 1 800 000 000 FCFA. Plus-value sur terrains réévalués nette d\'impôt = 300 000 000 FCFA. Calculez le montant du Goodwill (en FCFA).',
                    dataset: { prix: 2500000000, cp: 1800000000, pv: 300000000 },
                    stepByStepHelp: [
                      '1. Juste valeur de l\'actif net = 1 800 000 000 + 300 000 000 = 2 100 000 000 FCFA.',
                      '2. Goodwill = 2 500 000 000 - 2 100 000 000 = 400 000 000 FCFA.',
                    ],
                    expectedAnswer: 400000000,
                    detailedCorrection: 'Le Goodwill s\'élève à 400 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_CONSO_5',
                    title: 'Calcul autonome de Goodwill partiel',
                    instruction: 'Une mère rachète 75% d\'une société pour 900 000 000 FCFA. L\'actif net réévalué total de la cible est de 1 000 000 000 FCFA. Quel est le montant du Goodwill constaté (en FCFA) ?',
                    dataset: { prix: 900000000, jvani: 1000000000, pourcent: 0.75 },
                    hints: ['Quote-part acquise = 1 000 000 000 * 0,75 = 750 000 000 FCFA. Goodwill = 900M - 750M.'],
                    expectedAnswer: 150000000,
                    detailedCorrection: 'Goodwill = 900 000 000 - 750 000 000 = 150 000 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_CONSO_L5_SIM',
                    title: 'Cockpit de Calcul du Goodwill et Test d\'Impairment',
                    type: 'simulator',
                    targetComponentId: 'consolidation_cockpit',
                    presetConfig: { action: 'CALCULATE_GOODWILL_AND_IMPAIRMENT', transaction: 'M_AND_A_UEMOA' },
                    completionCriteria: {
                      metric: 'goodwill_and_test_passed',
                      targetValue: true,
                      description: 'Déterminer le goodwill d\'entrée et simuler le test d\'impairment sous différents scénarios de cash flows.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CONSO_5_1',
                      question: 'Peut-on amortir un goodwill de manière linéaire forfaitaire sous les normes comptables modernes IFRS et SYSCOHADA Révisé ?',
                      options: [
                        'Non, le goodwill a une durée d\'utilité indéfinie : il ne s\'amortit pas mais doit faire l\'objet d\'un test de dépréciation annuel obligatoire (impairment test)',
                        'Oui, sur une durée de 3 mois',
                        'Oui, au taux de 50% par an',
                        'Cela dépend de la volonté du directeur général',
                      ],
                      correctIndex: 0,
                      explanation: 'Les normes internationales et SYSCOHADA ont abandonné l\'amortissement systématique au profit de tests de valeur basés sur les flux futurs de trésorerie.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Goodwill = Prix d\'acquisition - Part acquise de l\'actif net réévalué.',
                    'Le goodwill figure à l\'actif incorporel du bilan consolidé.',
                    'Un test de dépréciation annuel doit vérifier que sa valeur recouvrable n\'est pas inférieure à sa valeur comptable.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 6 pour partager les capitaux propres et déterminer les intérêts minoritaires.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CONSO_MOD_5',
            moduleId: 'CONSO_MOD_5',
            title: 'Évaluation Certifiante : Écarts d\'Acquisition et Goodwill',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CONSO_5',
                question: 'Où est comptabilisé un écart d\'acquisition négatif (Badwill) constaté lors d\'une acquisition ?',
                options: [
                  'Directement en produit exceptionnel au compte de résultat consolidé de l\'exercice de l\'acquisition',
                  'En dette à long terme au passif',
                  'En diminution des stocks',
                  'En créance sur l\'État',
                ],
                correctIndex: 0,
                explanation: 'Le badwill est considéré comme un gain d\'opportunité constaté immédiatement au résultat de l\'exercice.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 6 : PARTAGE DES CAPITAUX PROPRES & INTÉRÊTS MINORITAIRES
    // ------------------------------------------------------------------------
    {
      id: 'CONSO_NIV_6',
      pathId: 'PATH_CONSOLIDATION_360',
      levelNumber: 6,
      title: 'Niveau 6 : Partage des Capitaux Propres & Intérêts Minoritaires',
      description: 'Ventiler les réserves et le résultat net entre la part du groupe et les participations ne donnant pas le contrôle.',
      targetMastery: 'Équilibrer le tableau de variation des capitaux propres consolidés.',
      modules: [
        {
          id: 'CONSO_MOD_6',
          levelId: 'CONSO_NIV_6',
          pathId: 'PATH_CONSOLIDATION_360',
          moduleNumber: 6,
          title: 'Module 6 : Le Partage Patrimonial et les Minoritaires',
          description: 'Élimination des titres de participation, ventilation des réserves consolidées et résultat part du groupe versus intérêts minoritaires.',
          competencyCodes: ['CONSO-GROUPE', 'COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'CONSO_CHAP_6_1',
              moduleId: 'CONSO_MOD_6',
              title: 'Chapitre 1 : Mécanisme d\'Élimination des Titres et Partage',
              description: 'Remplacement des titres de participation par les actifs et passifs de la filiale.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CONSO_06',
                  chapterId: 'CONSO_CHAP_6_1',
                  moduleId: 'CONSO_MOD_6',
                  pathId: 'PATH_CONSOLIDATION_360',
                  title: 'Leçon 1 : Élimination des Titres, Réserves Consolidées et Droits des Minoritaires',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Comprendre le principe d\'élimination des titres de participation de la société mère.',
                    'Calculer la part du groupe et la part des intérêts minoritaires dans le résultat net de chaque filiale.',
                    'Calculer les réserves consolidées du groupe depuis la date d\'acquisition.',
                    'Présenter la structure exacte des capitaux propres consolidés au bilan.',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 5.'],
                  contextIntro: 'Dans les comptes individuels de la société mère, les filiales apparaissent sous forme de titres de participation à l\'actif (compte 261). En consolidation, ces titres disparaissent : ils sont remplacés par 100% des actifs et dettes de la filiale, et les capitaux propres sont scindés entre Part du Groupe et Part des Minoritaires.',
                  theorySections: [
                    {
                      title: '1. Équation Fondamentale du Partage des Capitaux Propres',
                      content: 'Les titres de participation sont soldés contre les capitaux propres de la filiale à la date d\'acquisition. Les variations ultérieures de capitaux propres (réserves accumulées et résultat de l\'exercice) sont réparties selon le pourcentage d\'intérêt financier (%I) : %I au Groupe et (1 - %I) aux Intérêts Minoritaires.',
                      formulas: [
                        {
                          name: 'Résultat Net Part du Groupe',
                          formula: 'RN Groupe = RN(Mère) + Somme [ %I(Filiale i) * RN Retraité(Filiale i) ]',
                          interpretation: 'Fraction du bénéfice consolidé revenant exclusivement aux actionnaires de la holding.',
                          syscohadaRef: 'AUDCIF - Art. 90',
                        },
                        {
                          name: 'Intérêts Minoritaires (PNDPC)',
                          formula: 'Minoritaires = Somme [ (1 - %I(Filiale i)) * Capitaux Propres Retraités(Filiale i) ]',
                          interpretation: 'Ligne spécifique des capitaux propres du bilan consolidé revenant aux actionnaires externes des filiales.',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Partage du résultat d\'une filiale détenue à 70%',
                    scenario: 'La mère M a réalisé un résultat individuel de 500 000 000 FCFA. Sa filiale F (détenue à 70%) a réalisé un résultat net retraité de 200 000 000 FCFA.',
                    dataset: { rnMere: 500000000, rnFiliale: 200000000, pourcentI: 0.70 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la part du groupe dans la filiale', calculation: '200 000 000 * 0,70 = 140 000 000 FCFA', justification: 'Part revenant à la holding.' },
                      { step: 2, action: 'Calcul de la part des minoritaires', calculation: '200 000 000 * 0,30 = 60 000 000 FCFA', justification: 'Part des actionnaires minoritaires de la filiale.' },
                      { step: 3, action: 'Résultat net consolidé total', calculation: '500M (mère) + 200M (filiale) = 700 000 000 FCFA, dont Part du Groupe = 640 000 000 FCFA et Minoritaires = 60 000 000 FCFA', justification: 'Présentation obligatoire au compte de résultat consolidé.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Élimination des titres et constatation des minoritaires au bilan',
                    scenario: 'Filiale ayant 800 000 000 FCFA de capitaux propres. La mère détient 75% acquis à la valeur comptable (600 000 000 FCFA de titres).',
                    dataset: { cpFiliale: 800000000, titres: 600000000, pourcent: 0.75 },
                    stepByStepSolution: [
                      { step: 1, action: 'Élimination des titres', calculation: 'Crédit 261 Titres (-600M) / Débit Capitaux propres filiale (+600M)', justification: 'Les titres sont annulés contre les fonds propres acquis.' },
                      { step: 2, action: 'Constatation des intérêts minoritaires', calculation: '800 000 000 * 0,25 = 200 000 000 FCFA au crédit des capitaux propres consolidés', justification: 'Les 25% restants constituent la créance patrimoniale des minoritaires.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Hôtelier & Tourisme Ouest-Africain (GHTO SA)',
                    locationContext: 'Grand-Bassam / Assinie / Dakar',
                    sector: 'Hôtellerie et loisirs',
                    currency: 'FCFA',
                    problemStatement: 'GHTO SA détient 60% d\'un complexe balnéaire dont les capitaux propres s\'élèvent à 2,4 milliards FCFA et le résultat net à 350 000 000 FCFA. Le comptable a omis d\'isoler les intérêts minoritaires, présentant un résultat consolidé part du groupe surévalué de 140 000 000 FCFA.',
                    financialStatements: { cpFiliale: 2400000000, rnFiliale: 350000000, pourcentI: 0.60 },
                    realWorldResolution: 'Rectification : 1. Part du Groupe dans le résultat = 350M * 60% = 210 000 000 FCFA. 2. Intérêts minoritaires dans le résultat = 350M * 40% = 140 000 000 FCFA. 3. Intérêts minoritaires au bilan dans les capitaux propres = 2,4 Md * 40% = 960 000 000 FCFA.',
                    recommendationToBoard: 'Présenter la ventilation exacte du résultat net aux actionnaires lors de l\'Assemblée Générale pour éviter toute distribution abusive de dividendes non revenant au groupe.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_CONSO_6',
                    title: 'Calcul de la part du groupe dans le résultat net',
                    instruction: 'Holding résultat propre = 1 200 000 000 FCFA. Filiale A (80%) résultat = 400 000 000 FCFA. Filiale B (60%) résultat = -100 000 000 FCFA (perte). Calculez le Résultat Net Consolidé Part du Groupe (en FCFA).',
                    dataset: { rnMere: 1200000000, rnA: 400000000, rnB: -100000000, iA: 0.80, iB: 0.60 },
                    stepByStepHelp: [
                      '1. Quote-part A = 400 000 000 * 0.80 = +320 000 000 FCFA.',
                      '2. Quote-part B = -100 000 000 * 0.60 = -60 000 000 FCFA.',
                      '3. RN Groupe = 1 200 000 000 + 320 000 000 - 60 000 000 = 1 460 000 000 FCFA.',
                    ],
                    expectedAnswer: 1460000000,
                    detailedCorrection: 'Le Résultat Net Part du Groupe s\'élève à 1 460 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_CONSO_6',
                    title: 'Calcul des intérêts minoritaires au bilan',
                    instruction: 'Une filiale intégrée globalement a 1 500 000 000 FCFA de capitaux propres consolidés. Le pourcentage d\'intérêt de la mère est de 70%. Quel est le montant des intérêts minoritaires inscrit au passif du bilan consolidé (en FCFA) ?',
                    dataset: { cp: 1500000000, pourcentMere: 0.70 },
                    hints: ['Minoritaires = 1 500 000 000 * (1 - 0,70) = 1 500 000 000 * 0,30.'],
                    expectedAnswer: 450000000,
                    detailedCorrection: 'Intérêts minoritaires = 1 500 000 000 * 0,30 = 450 000 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_CONSO_L6_SIM',
                    title: 'Cockpit de Partage des Capitaux Propres et Intérêts Minoritaires',
                    type: 'simulator',
                    targetComponentId: 'consolidation_cockpit',
                    presetConfig: { action: 'EQUITY_PARTITIONING', mode: 'MINORITY_INTERESTS' },
                    completionCriteria: {
                      metric: 'equity_partitioned_accurately',
                      targetValue: true,
                      description: 'Répartir les réserves et le résultat net entre Part du Groupe et Minoritaires et vérifier le bouclage du bilan.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CONSO_6_1',
                      question: 'Où figurent les intérêts minoritaires dans le bilan consolidé selon le SYSCOHADA et les normes IFRS ?',
                      options: [
                        'Au sein des Capitaux Propres consolidés, sur une ligne distincte de la Part du Groupe',
                        'Dans les dettes à court terme',
                        'À l\'actif immobilisé',
                        'Dans les comptes de régularisation passif',
                      ],
                      correctIndex: 0,
                      explanation: 'Les minoritaires font partie intégrante des fonds propres totaux de l\'entité consolidée, mais sont présentés séparément de la part revenant à la société mère.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Les titres de participation sont éliminés contre les fonds propres de la filiale.',
                    'Le résultat net consolidé est ventilé entre Part du Groupe et Intérêts Minoritaires.',
                    'Les intérêts minoritaires au bilan représentent la part des actionnaires externes dans les actifs nets.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 7 pour maîtriser la conversion des comptes des filiales étrangères hors zone CFA.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CONSO_MOD_6',
            moduleId: 'CONSO_MOD_6',
            title: 'Évaluation Certifiante : Partage des Capitaux Propres',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CONSO_6',
                question: 'Si une filiale réalise une perte de 80 000 000 FCFA et que la mère détient 75%, quel impact sur les intérêts minoritaires ?',
                options: [
                  'Leur part est réduite de 20 000 000 FCFA (25% de la perte)',
                  'Leur part augmente de 80 000 000 FCFA',
                  'Aucun impact car ils sont protégés contractuellement',
                  'La mère doit payer la perte aux minoritaires en espèces',
                ],
                correctIndex: 0,
                explanation: 'Les minoritaires partagent les pertes de l\'entité au prorata de leur détention (25% de 80M = 20M).',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 7 : CONVERSION DES COMPTES DES FILIALES ÉTRANGÈRES
    // ------------------------------------------------------------------------
    {
      id: 'CONSO_NIV_7',
      pathId: 'PATH_CONSOLIDATION_360',
      levelNumber: 7,
      title: 'Niveau 7 : Conversion des Devises Étrangères & Écart de Conversion',
      description: 'Convertir les comptes des filiales hors zone franc CFA (Cedi, Naira, Dollar, Euro) par la méthode du cours de clôture.',
      targetMastery: 'Calculer l\'écart de conversion consolidé et neutraliser le risque de change structurel.',
      modules: [
        {
          id: 'CONSO_MOD_7',
          levelId: 'CONSO_NIV_7',
          pathId: 'PATH_CONSOLIDATION_360',
          moduleNumber: 7,
          title: 'Module 7 : La Méthode du Cours de Clôture et la Gestion du Risque de Change',
          description: 'Conversion des bilans au cours de clôture, du compte de résultat au cours moyen et imputation de l\'écart de conversion dans les capitaux propres.',
          competencyCodes: ['CONSO-GROUPE', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'CONSO_CHAP_7_1',
              moduleId: 'CONSO_MOD_7',
              title: 'Chapitre 1 : Les Règles de Conversion Monétaire SYSCOHADA / IAS 21',
              description: 'Passage de la monnaie fonctionnelle locale à la monnaie de présentation du groupe (FCFA).',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CONSO_07',
                  chapterId: 'CONSO_CHAP_7_1',
                  moduleId: 'CONSO_MOD_7',
                  pathId: 'PATH_CONSOLIDATION_360',
                  title: 'Leçon 1 : Application de la Méthode du Cours de Clôture et Calcul de l\'Écart de Conversion',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Identifier la monnaie fonctionnelle de chaque entité du groupe.',
                    'Convertir l\'actif et le passif au cours de clôture au 31 décembre.',
                    'Convertir les produits et charges au cours moyen de la période.',
                    'Calculer l\'écart de conversion et l\'enregistrer directement en capitaux propres consolidés.',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 6.'],
                  contextIntro: 'Les grands groupes ouest-africains s\'étendent fréquemment au Ghana voisin (Ghana Cedi - GHS) ou au Nigeria (Naira - NGN). La fluctuation des parités monétaires vis-à-vis du franc CFA engendre des écarts de conversion qui ne doivent pas impacter le résultat d\'exploitation mais les fonds propres du groupe.',
                  theorySections: [
                    {
                      title: '1. La Méthode du Cours de Clôture (Closing Rate Method)',
                      content: 'Tous les éléments d\'actif et de passif sont convertis au cours de change en vigueur à la date de clôture. Les éléments du compte de résultat sont convertis au cours moyen de l\'exercice. L\'écart mathématique résultant de l\'utilisation de deux cours différents est inscrit au bilan consolidé en Écart de conversion dans les capitaux propres.',
                      formulas: [
                        {
                          name: 'Écart de Conversion Global',
                          formula: 'Écart de Conversion = Variation des Capitaux Propres due au Cours de Clôture + Différence de Cours sur Résultat (Cours Moyen vs Cours Clôture)',
                          interpretation: 'Réserve latente de change positive ou négative enregistrée au passif.',
                          syscohadaRef: 'AUDCIF - Art. 92 & IAS 21 Effets des variations des cours des monnaies',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Conversion d\'une filiale au Ghana (en Cedis ghanéens)',
                    scenario: 'Filiale à Accra ayant un Actif de 10 000 000 GHS et un Passif externe de 6 000 000 GHS. Capitaux propres = 4 000 000 GHS. Cours de clôture : 1 GHS = 42 FCFA.',
                    dataset: { actifGHS: 10000000, passifGHS: 6000000, coursCloture: 42 },
                    stepByStepSolution: [
                      { step: 1, action: 'Conversion de l\'actif', calculation: '10 000 000 * 42 = 420 000 000 FCFA', justification: 'Actifs consolidés au cours de clôture.' },
                      { step: 2, action: 'Conversion du passif externe', calculation: '6 000 000 * 42 = 252 000 000 FCFA', justification: 'Dettes consolidées au cours de clôture.' },
                      { step: 3, action: 'Capitaux propres convertis', calculation: '420 000 000 - 252 000 000 = 168 000 000 FCFA', justification: 'Fonds propres équilibrés au cours du 31 décembre.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Impact d\'une dévaluation monétaire sur l\'écart de conversion',
                    scenario: 'Le cours du Cedi passe de 50 FCFA à 40 FCFA au cours de l\'exercice. Les capitaux propres d\'ouverture étaient de 2 000 000 GHS (valant 100 000 000 FCFA au 01/01).',
                    dataset: { cpGHS: 2000000, coursOuv: 50, coursClot: 40 },
                    stepByStepSolution: [
                      { step: 1, action: 'Valeur à la clôture', calculation: '2 000 000 * 40 = 80 000 000 FCFA', justification: 'Dépréciation de la monnaie de la filiale.' },
                      { step: 2, action: 'Calcul de l\'écart de conversion', calculation: '80 000 000 - 100 000 000 = -20 000 000 FCFA', justification: 'Perte de change latente imputée en diminution des réserves consolidées.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Agro-Exportateur Panafricain (GAEP SA)',
                    locationContext: 'Abidjan / Accra / Lagos',
                    sector: 'Négoce international de café-cacao',
                    currency: 'FCFA',
                    problemStatement: 'La filiale nigériane de GAEP SA subit une dépréciation brutale du Naira (NGN) de 45% en 2024. Le directeur financier s\'inquiète de voir cette perte impacter directement le résultat d\'exploitation du groupe.',
                    financialStatements: { cpNaira: 800000000, coursOuv: 0.85, coursClot: 0.47, perteLatenteFCFA: 304000000 },
                    realWorldResolution: 'En vertu de la méthode du cours de clôture (IAS 21 / SYSCOHADA), la perte latente de 304 000 000 FCFA est logée en "Écart de conversion" dans les capitaux propres consolidés. Le résultat d\'exploitation consolidé reste préservé.',
                    recommendationToBoard: 'Mettre en place une couverture de change à terme (forward contracts) pour les transferts de dividendes prévus depuis les filiales hors zone CFA.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_CONSO_7',
                    title: 'Calcul de chiffre d\'affaires converti au cours moyen',
                    instruction: 'Une filiale au Ghana réalise un chiffre d\'affaires de 15 000 000 GHS. Le cours moyen annuel est de 1 GHS = 44 FCFA. Le cours de clôture au 31/12 est de 1 GHS = 41 FCFA. À quel montant (en FCFA) ce CA doit-il figurer dans le compte de résultat consolidé ?',
                    dataset: { caGHS: 15000000, coursMoyen: 44, coursCloture: 41 },
                    stepByStepHelp: [
                      'Selon les règles de consolidation, les flux de produits et charges se convertissent au cours moyen de l\'exercice.',
                      'CA Consolidé = 15 000 000 * 44 = 660 000 000 FCFA.',
                    ],
                    expectedAnswer: 660000000,
                    detailedCorrection: 'Le CA consolidé s\'élève à 660 000 000 FCFA (converti au cours moyen de 44 FCFA).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_CONSO_7',
                    title: 'Calcul de l\'écart de conversion sur capitaux propres d\'ouverture',
                    instruction: 'Capitaux propres d\'ouverture : 500 000 000 FCFA. Avec le cours de clôture, ces mêmes capitaux propres ne valent plus que 430 000 000 FCFA. Quel est l\'écart de conversion généré (en FCFA, indiquer le signe négatif) ?',
                    dataset: { valOuv: 500000000, valClot: 430000000 },
                    hints: ['Écart = Valeur de clôture - Valeur d\'ouverture.'],
                    expectedAnswer: -70000000,
                    detailedCorrection: 'Écart de conversion = 430 000 000 - 500 000 000 = -70 000 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_CONSO_L7_SIM',
                    title: 'Cockpit de Conversion des Filiales en Monnaies Étrangères',
                    type: 'simulator',
                    targetComponentId: 'consolidation_cockpit',
                    presetConfig: { action: 'CONVERT_FOREIGN_SUBSIDIARIES', currencies: ['GHS', 'NGN', 'USD'] },
                    completionCriteria: {
                      metric: 'currency_translation_balanced',
                      targetValue: true,
                      description: 'Convertir la balance d\'une filiale anglophone et vérifier le solde de l\'écart de conversion au bilan.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CONSO_7_1',
                      question: 'Pourquoi les postes de bilan sont-ils convertis au cours de clôture alors que les postes de résultat sont convertis au cours moyen ?',
                      options: [
                        'Parce que le bilan est une photographie instantanée au 31 décembre alors que le résultat retrace des flux économiques échelonnés tout au long de l\'année',
                        'Parce que la banque centrale l\'impose pour payer moins de frais',
                        'Pour équilibrer artificiellement la TVA',
                        'C\'est une erreur mathématique tolérée',
                      ],
                      correctIndex: 0,
                      explanation: 'La logique économique impose d\'évaluer le patrimoine à la valeur du jour d\'inventaire (cours de clôture) et les opérations au taux effectif moyen au fil de l\'exercice.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Méthode du cours de clôture : Actif/Passif au cours du 31/12, Résultat au cours moyen.',
                    'L\'écart de conversion est imputé dans les capitaux propres consolidés.',
                    'Le résultat d\'exploitation du groupe est ainsi protégé des fluctuations de change pures.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 8 pour confectionner la plaquette consolidée finale et soutenir le projet certifiant.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CONSO_MOD_7',
            moduleId: 'CONSO_MOD_7',
            title: 'Évaluation Certifiante : Conversion des Monnaies Étrangères',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CONSO_7',
                question: 'Que devient l\'écart de conversion cumulé inscrit dans les capitaux propres lors de la cession définitive d\'une filiale étrangère ?',
                options: [
                  'Il est recyclé (reclassé) au compte de résultat consolidé pour faire partie du calcul de la plus ou moins-value de cession',
                  'Il est supprimé sans aucune trace',
                  'Il est versé aux salariés sous forme de prime',
                  'Il reste indéfiniment au bilan',
                ],
                correctIndex: 0,
                explanation: 'Lors de la sortie du périmètre, le risque de change latent devient définitif et doit être transféré au compte de résultat.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 8 : ÉTABLISSEMENT DE LA PLAQUETTE CONSOLIDÉE & PROJET FINAL
    // ------------------------------------------------------------------------
    {
      id: 'CONSO_NIV_8',
      pathId: 'PATH_CONSOLIDATION_360',
      levelNumber: 8,
      title: 'Niveau 8 : Plaquette Financière Consolidée, TFT & Projet Professionnel Final',
      description: 'Assembler le Bilan consolidé, le Compte de résultat, le Tableau des Flux de Trésorerie (TFT) et soutenir le projet certifiant.',
      targetMastery: 'Délivrer une liasse consolidée certifiée conforme SYSCOHADA / IFRS avec note aux commissaires aux comptes.',
      modules: [
        {
          id: 'CONSO_MOD_8',
          levelId: 'CONSO_NIV_8',
          pathId: 'PATH_CONSOLIDATION_360',
          moduleNumber: 8,
          title: 'Module 8 : La Synthèse des Comptes Consolidés et l\'Audit de Groupe',
          description: 'Plaquette de publication, tableau de variation des capitaux propres, flux de trésorerie consolidés et rapport de gestion.',
          competencyCodes: ['CONSO-GROUPE', 'COMPT-SYSCOHADA', 'ANAL-DIAGNOSTIC'],
          durationHours: 8,
          chapters: [
            {
              id: 'CONSO_CHAP_8_1',
              moduleId: 'CONSO_MOD_8',
              title: 'Chapitre 1 : Restitution Exécutive et Certification des Comptes de Groupe',
              description: 'Les livrables réglementaires de consolidation.',
              estimatedMinutes: 240,
              lessons: [
                {
                  id: 'L_CONSO_08',
                  chapterId: 'CONSO_CHAP_8_1',
                  moduleId: 'CONSO_MOD_8',
                  pathId: 'PATH_CONSOLIDATION_360',
                  title: 'Leçon 1 : Montage de la Liasse Consolidée, Tableau des Flux et Examen de Maîtrise',
                  durationMinutes: 60,
                  difficulty: 'Expert',
                  objectives: [
                    'Intégrer les 7 étapes de consolidation dans la plaquette finale.',
                    'Construire le Tableau des Flux de Trésorerie (TFT) consolidé.',
                    'Rédiger les notes annexes obligatoires sur le périmètre et les méthodes.',
                    'Défendre les retraitements devant le collège des commissaires aux comptes.',
                  ],
                  prerequisites: ['Validation intégrale des Niveaux 1 à 7.'],
                  contextIntro: 'Vous arrivez au terme du processus de consolidation. La direction générale et le conseil d\'administration attendent la liasse financière consolidée certifiée pour publication auprès de la BRVM, des actionnaires et des partenaires bancaires internationaux.',
                  theorySections: [
                    {
                      title: '1. Les Documents de la Plaquette Consolidée',
                      content: 'La plaquette consolidée comprend obligatoirement : 1. Le Bilan consolidé, 2. Le Compte de résultat consolidé (avec résultat part du groupe et part des minoritaires), 3. Le Tableau de variation des capitaux propres consolidés, 4. Le Tableau des flux de trésorerie consolidé, 5. Les Notes annexes explicatives.',
                      rulesAndPrinciples: [
                        'Contrôle absolu d\'équilibre bilanciel (Total Actif = Total Passif).',
                        'Rapprochement strict entre la variation de trésorerie du bilan et le solde final du tableau des flux.',
                        'Transparence sur les transactions avec les parties liées (conventions réglementées).',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Contrôle de bouclage de la trésorerie consolidée',
                    scenario: 'Trésorerie active consolidée = 850 000 000 FCFA. Trésorerie passive (découverts) = 150 000 000 FCFA. Trésorerie nette = 700 000 000 FCFA.',
                    dataset: { actif: 850000000, passif: 150000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la Trésorerie Nette Consolidée', calculation: '850M - 150M = +700 000 000 FCFA', justification: 'Le tableau des flux doit aboutir exactement à ce solde final de trésorerie nette.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Tableau de variation des capitaux propres consolidés',
                    scenario: 'Capitaux propres d\'ouverture : 5 000 000 000 FCFA. Résultat net de l\'exercice : +800 000 000 FCFA. Dividendes versés aux actionnaires de la mère : -200 000 000 FCFA. Écart de conversion de l\'exercice : -50 000 000 FCFA.',
                    dataset: { ouv: 5000000000, rn: 800000000, div: 200000000, ecart: -50000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul des capitaux propres de clôture', calculation: '5 000M + 800M - 200M - 50M = 5 550 000 000 FCFA', justification: 'Bouclage exact de la colonne Capitaux Propres du bilan.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Holding Industrielle & Financière d\'Afrique de l\'Ouest (HIFAO SA)',
                    locationContext: 'Abidjan / Ouagadougou / Bamako / Lomé',
                    sector: 'Conglomérat multi-activités coté à la BRVM',
                    currency: 'FCFA',
                    problemStatement: 'HIFAO SA doit publier ses comptes consolidés audités sous 90 jours sous peine de suspension de sa cotation à la BRVM. Le collège de commissaires aux comptes émet une réserve sur l\'évaluation du goodwill de la filiale burkinabè et sur une divergence de 180 000 000 FCFA dans les éliminations de créances réciproques.',
                    financialStatements: { caConsolide: 42000000000, totalBilan: 58000000000, rnGroupe: 3400000000 },
                    realWorldResolution: 'L\'équipe de consolidation déploie le protocole de conciliation d\'urgence : les créances réciproques sont reconciliées avec PV de clôture signé par les deux filiales, et un test d\'impairment certifié par un cabinet indépendant lève la réserve sur le goodwill. Les comptes sont certifiés sans réserve.',
                    recommendationToBoard: 'Mettre en place un calendrier de reporting mensuel contraignant ("Hard Close" au 31 octobre) pour fluidifier la clôture annuelle.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_CONSO_8',
                    title: 'Calcul de la variation des capitaux propres consolidés',
                    instruction: 'Capitaux propres d\'ouverture = 3 000 000 000 FCFA. Résultat consolidé Part du Groupe = +450 000 000 FCFA. Dividendes distribués = -120 000 000 FCFA. Écart de conversion positif = +30 000 000 FCFA. Calculez les capitaux propres de clôture (en FCFA).',
                    dataset: { ouv: 3000000000, rn: 450000000, div: 120000000, ecart: 30000000 },
                    stepByStepHelp: [
                      'Capitaux propres clôture = 3 000M + 450M - 120M + 30M = 3 360 000 000 FCFA.',
                    ],
                    expectedAnswer: 3360000000,
                    detailedCorrection: 'Capitaux propres consolidés de clôture = 3 360 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_CONSO_8',
                    title: 'Calcul du flux net de trésorerie consolidé',
                    instruction: 'Flux de trésorerie lié à l\'exploitation : +600 000 000 FCFA. Flux lié aux investissements : -350 000 000 FCFA. Flux lié aux opérations de financement : -100 000 000 FCFA. Quelle est la variation nette de trésorerie de l\'exercice (en FCFA) ?',
                    dataset: { fte: 600000000, fti: -350000000, ftf: -100000000 },
                    hints: ['Variation = FTE + FTI + FTF.'],
                    expectedAnswer: 150000000,
                    detailedCorrection: 'Variation nette de trésorerie = 600M - 350M - 100M = +150 000 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_CONSO_L8_SIM',
                    title: 'Mission Ultime de Jeu / Cas Réel : Comité d\'Audit et Soutenance Consolidée',
                    type: 'game_mission',
                    targetComponentId: 'game_mission',
                    missionId: 'MISSION_04', // M&A et Restructuration Financière
                    completionCriteria: {
                      metric: 'mission_score_percent',
                      targetValue: 80,
                      description: 'Réussir la mission de consolidation et de reporting financier avec un score supérieur ou égal à 80%.',
                    },
                    rubricPoints: 100,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CONSO_8_1',
                      question: 'Quelle est la finalité première des comptes consolidés par rapport aux comptes individuels de la société mère ?',
                      options: [
                        'Présenter la situation financière et les résultats réels du groupe comme s\'il ne formait qu\'une seule et même entreprise indivisible',
                        'Calculer l\'impôt sur les sociétés de la holding',
                        'Éviter de publier les comptes annuels',
                        'Remplacer les déclarations fiscales des filiales',
                      ],
                      correctIndex: 0,
                      explanation: 'La consolidation vise à donner une image fidèle de la réalité économique globale du groupe en éliminant toutes les illusions d\'optique résultant des frontières juridiques internes.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La liasse consolidée donne la vision authentique de la richesse et des risques du groupe.',
                    'L\'équilibre rigoureux du bilan, du compte de résultat et du tableau des flux est obligatoire.',
                    'La transparence des annexes conditionne la certification sans réserve des auditeurs.',
                  ],
                  nextStepRecommendation: 'Félicitations ! Vous avez validé l\'ensemble des modules et êtes prêt pour le projet professionnel final certifiant.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CONSO_MOD_8',
            moduleId: 'CONSO_MOD_8',
            title: 'Examen Final de Maîtrise en Consolidation SYSCOHADA / IFRS',
            passingScorePercent: 80,
            questions: [
              {
                id: 'FEQ_CONSO_1',
                question: 'Pourquoi le chiffre d\'affaires consolidé d\'un groupe est-il presque toujours inférieur à la somme brute des chiffres d\'affaires de ses filiales ?',
                options: [
                  'Parce que toutes les ventes internes entre filiales du périmètre sont rigoureusement éliminées pour ne conserver que les ventes aux tiers',
                  'Parce qu\'on applique une taxe de 10% sur la consolidation',
                  'À cause de l\'inflation',
                  'C\'est une anomalie comptable',
                ],
                correctIndex: 0,
                explanation: 'L\'élimination des opérations réciproques neutralise les refacturations miroirs internes qui gonflent artificiellement le cumul arithmétique.',
              },
            ],
          },
        },
      ],
    },
  ],

  finalProject: {
    id: 'PRJ_CONSOLIDATION_FINAL',
    title: 'Consolidation Intégrale et Reporting Financier d\'un Groupe Agro-Industriel UEMOA de 4 Filiales',
    companyContext: 'Holding Panafricaine des Plantations & Négoce (HPPN SA) - Chiffre d\'Affaires Consolidé : 18 Milliards FCFA - Espace OHADA / UEMOA',
    businessScenario: 'En tant que Responsable Consolidation du Groupe HPPN SA, vous devez mener à bien la clôture consolidée annuelle d\'un groupe composé de la société mère (Abidjan), d\'une filiale industrielle (San Pedro, détenue à 80%), d\'une filiale logistique (Dakar, détenue à 60%) et d\'une filiale commerciale (Accra, Ghana, détenue à 70% en devises Cedis). Vous devez opérer les retraitements d\'homogénéisation, éliminer les flux intragroupe, neutraliser les marges en stock, calculer le goodwill d\'une acquisition récente, convertir la filiale ghanéenne et produire la plaquette consolidée finale certifiée.',
    deliverablesExpected: [
      'Matrice de cadrage du périmètre avec calcul des pourcentages de contrôle (%C) et d\'intérêt (%I)',
      'Feuille de travail de consolidation avec journal des écritures de retraitement et d\'élimination',
      'Tableau de calcul du Goodwill et revue de la marge interne sur stocks avec impôts différés',
      'Plaquette financière consolidée complète (Bilan, Compte de résultat avec minoritaires, Tableau des flux, Tableau de variation des capitaux propres)',
    ],
    gradingRubric: [
      { criterion: 'Justesse technique des retraitements et éliminations réciproques', weightPercent: 30, description: 'Zéro déséquilibre sur les comptes courants et éliminations d\'achats/ventes.' },
      { criterion: 'Précision du traitement du Goodwill et des marges en stock', weightPercent: 25, description: 'Calcul exact de l\'actif net réévalué et impôts différés au taux de 25%.' },
      { criterion: 'Maîtrise de la conversion des devises (Ghana Cedis)', weightPercent: 25, description: 'Application stricte de la méthode du cours de clôture et équilibre de l\'écart de conversion.' },
      { criterion: 'Clarté exécutive et présentation de la plaquette consolidée', weightPercent: 20, description: 'Présentation professionnelle conforme aux exigences des auditeurs et du Conseil.' },
    ],
    passingScorePercent: 80,
  },
};
