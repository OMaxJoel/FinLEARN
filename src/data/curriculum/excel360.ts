import { LearningPath360 } from '../../types/pedagogy360';

// ============================================================================
// PARCOURS 360° : MODÉLISATION FINANCIÈRE AVANCÉE SUR TABLEUR & EXCEL
// 8 Niveaux progressifs, laboratoire tableur interactif, formules matricielles et TCD
// ============================================================================

export const PATH_EXCEL_MODELING_360: LearningPath360 = {
  id: 'PATH_EXCEL_MODELING_360',
  domainId: 'excel',
  title: 'Modélisation Financière Avancée sur Tableur & Excel 360°',
  tagline: 'Construire des modèles financiers d\'entreprise dynamiques, auditables, sans constantes en dur, avec RECHERCHEX et TCD',
  description: 'Un cursus d\'excellence complet pour maîtriser l\'outil universel du financier. De la conception d\'une architecture propre à l\'audit des formules, en passant par les fonctions de recherche modernes, les tableaux croisés dynamiques et les modèles prévisionnels à 3 états intégrés.',
  targetRole: 'Financial Modeler / Analyste Modélisation Financière / Data Analyst Finance',
  levelBadge: 'Cursus Outils 8 Niveaux - Débutant à Expert',
  color: 'sky',
  iconName: 'FileSpreadsheet',
  version: '2.0.0',
  status: 'draft',
  estimatedHours: 45,
  prerequisites: [
    'Connaissance de base de l\'interface d\'un tableur (cellules, lignes, colonnes)',
    'Aptitude à manipuler des opérations arithmétiques (+, -, *, /)',
    'Aucune expérience préalable en formules complexes requise pour débuter',
  ],
  competenciesTargeted: [
    'EXCEL-MODELING',
    'ANAL-DIAGNOSTIC',
    'CTRL-PERFORMANCE',
  ],
  initialDiagnosticId: 'DIAG_EXCEL_01',
  completenessScore: 100,

  levels: [
    // ------------------------------------------------------------------------
    // NIVEAU 1 : ARCHITECTURE DE MODÈLE & RÈGLES DE MODÉLISATION PROPRE
    // ------------------------------------------------------------------------
    {
      id: 'EXC_NIV_1',
      pathId: 'PATH_EXCEL_MODELING_360',
      levelNumber: 1,
      title: 'Niveau 1 : Architecture Modulaire & Règle du Zéro Constante en Dur',
      description: 'Structurer un classeur professionnel selon les standards financiers : Hypothèses, Moteur de calcul, Restitution exécutive.',
      targetMastery: 'Construire un modèle lisible, pérenne et compréhensible par un tiers sans explication orale.',
      modules: [
        {
          id: 'EXC_MOD_1',
          levelId: 'EXC_NIV_1',
          pathId: 'PATH_EXCEL_MODELING_360',
          moduleNumber: 1,
          title: 'Module 1 : Les Bonnes Pratiques Mondiales de Modélisation Financière',
          description: 'Standard FAST (Flexible, Appropriate, Structured, Transparent), code couleur des cellules et élimination des chiffres codés en dur.',
          competencyCodes: ['EXCEL-MODELING'],
          durationHours: 5,
          chapters: [
            {
              id: 'EXC_CHAP_1_1',
              moduleId: 'EXC_MOD_1',
              title: 'Chapitre 1 : Les Fondations d\'un Modèle Financier Robuste',
              description: 'Pourquoi 90% des tableurs d\'entreprise contiennent des erreurs critiques et comment les éviter.',
              estimatedMinutes: 150,
              lessons: [
                {
                  id: 'L_EXC_01',
                  chapterId: 'EXC_CHAP_1_1',
                  moduleId: 'EXC_MOD_1',
                  pathId: 'PATH_EXCEL_MODELING_360',
                  title: 'Leçon 1 : Règle d\'Or Zéro Constante en Dur et Architecture en 3 Onglets',
                  durationMinutes: 45,
                  difficulty: 'Débutant',
                  objectives: [
                    'Comprendre le danger mortel des constantes codées en dur dans les formules (=A1*1.18 au lieu de =A1*(1+B$2)).',
                    'Structurer un modèle financier en 3 blocs étanches : Hypothèses (Inputs), Calculs (Engine), Restitution (Outputs).',
                    'Appliquer le code couleur international : Bleu pour les saisies utilisateur, Noir pour les formules, Vert pour les liens externes.',
                    'Documenter les unités monétaires (FCFA, %, jours) dans chaque en-tête.',
                  ],
                  prerequisites: ['Aucun prérequis.'],
                  contextIntro: 'Selon des études académiques de la London School of Economics, plus de 88% des feuilles de calcul utilisées dans les comités de direction contiennent des erreurs d\'arithmétique ou de formules masquées. La première compétence du financier d\'excellence est de concevoir des modèles transparents et auto-documentés.',
                  theorySections: [
                    {
                      title: '1. Le Principe du Zéro Chiffre en Dur dans les Formules',
                      content: 'Toute formule doit être une relation dynamique pure entre des cellules identifiées. Si un taux de TVA de 18% change ou si un taux d\'impôt passe de 25% à 28%, changer la valeur dans UNE SEULE cellule d\'hypothèse (l\'onglet Inputs) doit mettre à jour l\'ensemble des 500 formules du modèle instantanément sans avoir à modifier une seule formule.',
                      keyDefinitions: [
                        { term: 'Constante en Dur (Hardcoded Value)', definition: 'Valeur numérique fixe insérée directement à l\'intérieur d\'une formule de calcul (ex: =B4*0.18), source majeure d\'erreurs silencieuses.' },
                        { term: 'Standard FAST', definition: 'Référentiel mondial de modélisation financière : Flexible (adaptable), Appropriate (proportionné), Structured (ordonné), Transparent (simple et vérifiable).' },
                      ],
                      rulesAndPrinciples: [
                        'Règle d\'or : Aucun nombre autre que 0 ou 1 ne doit être tapé directement dans une formule.',
                        'Une formule par ligne : la structure d\'une formule doit être identique sur toutes les colonnes d\'une même ligne temporelle.',
                      ],
                      formulas: [
                        {
                          name: 'Calcul Dynamique sans Chiffre en Dur',
                          formula: '= CA_HT * (1 + TAUX_TVA)',
                          interpretation: 'Utilisation de cellules de paramètres nommées ou référencées pour une évolutivité totale.',
                          syscohadaRef: 'Standards FAST Modelling Standard',
                        },
                      ],
                      commonMistakes: [
                        'Mélanger les données d\'entrée (prix, volume) et les résultats de calcul sur la même ligne sans distinction visuelle.',
                        'Écrire des formules kilométriques de 10 lignes illisibles au lieu de décomposer en lignes de calculs intermédiaires claires.',
                      ],
                      professionalBestPractices: [
                        'Toujours colorer les cellules de saisie manuelle en fond jaune pâle avec texte bleu pour indiquer clairement où l\'utilisateur a le droit d\'écrire.',
                      ],
                      memorizationTips: [
                        'Si tu tapes un chiffre dans une formule, tu prépares une catastrophe.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Correction d\'une formule avec chiffre en dur',
                    scenario: 'Calcul du chiffre d\'affaires TTC. Erreur courante : formule `=B5*1.18`. Formule propre : cellule B1 contenant le taux 18% et formule `=B5*(1+$B$1)`.',
                    dataset: { montantHT: 10000000, tauxTVA: 0.18 },
                    stepByStepSolution: [
                      { step: 1, action: 'Identifier la mauvaise pratique', calculation: '`=10000000 * 1.18` ou `=B5 * 1.18`', justification: 'Si la loi de finances modifie le taux de TVA, le modèle devient faux.' },
                      { step: 2, action: 'Appliquer la bonne pratique', calculation: 'Placer 18% en cellule $B$1. Formule propre : `=B5*(1+$B$1)`', justification: 'Modèle dynamique et auditable.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Architecture 3 onglets d\'un compte de résultat',
                    scenario: 'Organisation d\'un modèle d\'entreprise : Onglet 1 [Hypothèses] : Prix, Coûts, Salaires. Onglet 2 [Calculs] : Projections mensuelles. Onglet 3 [Dashboard] : Bilan et SIG de synthèse.',
                    dataset: { onglets: 3 },
                    stepByStepSolution: [
                      { step: 1, action: 'Séparation physique des responsabilités', calculation: 'L\'utilisateur final ne modifie QUE l\'onglet 1', justification: 'Protection contre l\'écrasement accidentel de formules.' },
                      { step: 2, action: 'Traçabilité', calculation: 'Toutes les formules de l\'onglet 2 pointent exclusivement vers l\'onglet 1', justification: 'Audit immédiat en cas de contrôle.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Société Ivoirienne de Télécommunications (SITEL SA)',
                    locationContext: 'Abidjan, Plateau',
                    sector: 'Télécommunications et fibre optique',
                    currency: 'FCFA',
                    problemStatement: 'SITEL a perdu un appel d\'offres de 400 millions FCFA parce que le contrôleur avait codé en dur un taux d\'actualisation de 12% au milieu d\'une formule cachée en cellule F428, faussant la VAN du projet sans que personne ne s\'en aperçoive.',
                    financialStatements: {
                      montantAppelOffres: 400000000,
                      ecartVANErronee: 65000000,
                    },
                    realWorldResolution: 'Refonte complète du classeur sous le standard FAST : création d\'une table des paramètres généraux en haut de page, application de la règle zéro chiffre en dur et certification du modèle par un audit des antécédents. SITEL a remporté les 2 consultations suivantes.',
                    recommendationToBoard: 'Imposer une revue d\'audit automatique de formules sur tout classeur soumis au Conseil d\'Administration.',
                  },
                  guidedExercise: {
                    id: 'EX_EXC_GUIDED_01',
                    title: 'Exercice Guidé : Calcul dynamique du prix TTC',
                    instruction: 'Dans une feuille de calcul, la cellule B5 contient le prix HT de 2 000 000 FCFA. La cellule B1 contient le taux de TVA de 18% (0,18). Quel est le résultat de la formule `=B5*(1+B1)` ?',
                    dataset: { prixHT: 2000000, taux: 0.18 },
                    stepByStepHelp: [
                      '1. 1 + 0,18 = 1,18.',
                      '2. 2 000 000 x 1,18 = 2 360 000 FCFA.',
                    ],
                    expectedAnswer: 2360000,
                    detailedCorrection: 'Le prix TTC calculé dynamiquement est de 2 360 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_EXC_AUTO_01',
                    title: 'Exercice Autonome : Marge brute sans chiffre en dur',
                    instruction: 'La cellule C4 contient le chiffre d\'affaires de 50 000 000 FCFA. La cellule C5 contient le coût des ventes de 35 000 000 FCFA. Quel est le montant de la marge brute calculée par la formule `=C4-C5` en FCFA ?',
                    dataset: { c4: 50000000, c5: 35000000 },
                    hints: [
                      '50 000 000 - 35 000 000 FCFA.',
                    ],
                    expectedAnswer: 15000000,
                    detailedCorrection: 'Marge brute = 50 000 000 - 35 000 000 = 15 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_EXC_SIM_01',
                    title: 'Atelier Pratique : Construction d\'un Modèle Propre dans l\'Excel Lab',
                    type: 'simulator',
                    targetComponentId: 'excel_lab',
                    completionCriteria: {
                      metric: 'modelCleanNoHardcoding',
                      targetValue: 1,
                      description: 'Construire une table dynamique sans chiffre en dur.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_EXC_01',
                      question: 'Pourquoi le codage de chiffres en dur à l\'intérieur d\'une formule Excel est-il considéré comme une faute professionnelle en finance ?',
                      options: [
                        'Parce qu\'il rend les hypothèses invisibles, empêche les mises à jour globales et provoque des erreurs silencieuses indétectables',
                        'Parce qu\'Excel refuse d\'enregistrer le fichier',
                        'Parce que cela consomme trop de mémoire vive',
                        'C\'est autorisé pour les additions uniquement',
                      ],
                      correctIndex: 0,
                      explanation: 'Un chiffre en dur masqué dans une cellule ne se met pas à jour lors d\'un changement d\'hypothèse et induit la direction en erreur sans message d\'alerte.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Un modèle financier doit être dynamique, auditable et compréhensible par tout tiers.',
                    'La séparation Hypothèses / Calculs / Restitution est le standard mondial incontournable.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 2 pour maîtriser les références relatives, absolues ($) et les tests conditionnels.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_EXC_M1',
            moduleId: 'EXC_MOD_1',
            title: 'Évaluation Certifiante : Standards de Modélisation et Architecture Propre',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_EXC_1',
                question: 'Dans la convention internationale de couleur des modèles financiers, que signifie un texte écrit en bleu ?',
                options: [
                  'Une cellule de saisie manuelle d\'hypothèse (Input) modifiable par l\'utilisateur',
                  'Une formule de calcul mathématique',
                  'Un lien vers une base de données externe',
                  'Une erreur de division par zéro',
                ],
                correctIndex: 0,
                explanation: 'Le texte bleu sur fond clair signale universellement une donnée d\'entrée modifiable (Input), par opposition au texte noir qui signale une formule de calcul.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 2 : RÉFÉRENCES ABSOLUES ($) & TESTS CONDITIONNELS
    // ------------------------------------------------------------------------
    {
      id: 'EXC_NIV_2',
      pathId: 'PATH_EXCEL_MODELING_360',
      levelNumber: 2,
      title: 'Niveau 2 : Références Mixtes & Absolues ($) et Logique Conditionnelle',
      description: 'Maîtriser le verrouillage des colonnes et des lignes ($A$1, A$1, $A1) et bâtir des logiques décisionnelles (SI, SI.CONDITIONS, ET, OU).',
      targetMastery: 'Recopier une formule sur 100 lignes et colonnes sans décalage de référence.',
      modules: [
        {
          id: 'EXC_MOD_2',
          levelId: 'EXC_NIV_2',
          pathId: 'PATH_EXCEL_MODELING_360',
          moduleNumber: 2,
          title: 'Module 2 : Le Pouvoir du Dollar ($) et les Fonctions Logiques',
          description: 'Gérer la recopie incrémentale et construire des barèmes fiscaux progressifs et des primes commerciales.',
          competencyCodes: ['EXCEL-MODELING'],
          durationHours: 5,
          chapters: [
            {
              id: 'EXC_CHAP_2_1',
              moduleId: 'EXC_MOD_2',
              title: 'Chapitre 1 : Les 4 États d\'une Cellule et les Tests Conditionnels',
              description: 'A1 (relatif), $A$1 (absolu total), $A1 (colonne bloquée), A$1 (ligne bloquée).',
              estimatedMinutes: 150,
              lessons: [
                {
                  id: 'L_EXC_02',
                  chapterId: 'EXC_CHAP_2_1',
                  moduleId: 'EXC_MOD_2',
                  pathId: 'PATH_EXCEL_MODELING_360',
                  title: 'Leçon 1 : Références Mixtes ($), Tests Imbriqués et Fonction SI.CONDITIONS',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Comprendre le comportement du signe dollar ($) lors de la poignée de recopie.',
                    'Construire une table de multiplication ou de sensibilité avec une seule formule à référence mixte (`=$A2*B$1`).',
                    'Utiliser la fonction `SI(test; vrai; faux)` et combiner avec `ET()` et `OU()`.',
                    'Remplacer les SI imbriqués complexes par la fonction moderne `SI.CONDITIONS()`.',
                  ],
                  prerequisites: ['Maîtrise de la saisie de formules.'],
                  contextIntro: 'Le signe dollar ($) n\'a rien à voir avec la devise américaine : dans Excel, c\'est un cadenas qui verrouille soit une colonne, soit une ligne. Maîtriser les références mixtes permet d\'écrire UNE SEULE formule en haut à gauche d\'un tableau et de la glisser sur 1 000 cellules sans aucune retouche.',
                  theorySections: [
                    {
                      title: '1. Les 4 Niveaux de Verrouillage du Signe Dollar ($)',
                      content: '1. `A1` (Relatif total) : la colonne et la ligne se décalent lors de la copie. 2. `$A$1` (Absolu total) : la cellule est figée de manière immuable. 3. `$A1` (Mixte colonne figée) : lors d\'une copie vers la droite, la colonne reste A, mais la ligne change vers le bas. 4. `A$1` (Mixte ligne figée) : lors d\'une copie vers le bas, la ligne reste 1, mais la colonne change vers la droite. Raccourci magique : touche **F4** pour cycler entre les 4 états.',
                      keyDefinitions: [
                        { term: 'Référence Mixte', definition: 'Référence de cellule dont soit la ligne, soit la colonne est bloquée par un symbole dollar ($A1 ou A$1).' },
                        { term: 'SI.CONDITIONS', definition: 'Fonction Excel moderne évaluant plusieurs conditions ordonnées sans nécessiter d\'imbrications complexes de parenthèses.' },
                      ],
                      rulesAndPrinciples: [
                        'Pour une table à double entrée : figer la colonne du libellé de gauche (`$A2`) et la ligne de l\'en-tête du haut (`B$1`).',
                      ],
                      formulas: [
                        {
                          name: 'Table de Sensibilité à Référence Mixte',
                          formula: '= $A2 * (1 + B$1)',
                          interpretation: 'Formule unique valable pour tout un tableau croisé de prix et de volumes.',
                          syscohadaRef: 'Bonnes Pratiques de Modélisation Excel',
                        },
                      ],
                      commonMistakes: [
                        'Mettre des dollars partout par réflexe sans comprendre ce qui doit glisser.',
                        'Oublier les guillemets autour du texte dans les fonctions logiques (`"Validé"` et non `Validé`).',
                      ],
                      professionalBestPractices: [
                        'Tester systématiquement la formule dans les 4 coins du tableau après recopie pour valider les ancrages.',
                      ],
                      memorizationTips: [
                        'Le dollar bloque ce qui est écrit juste après lui : $A bloque A, $1 bloque 1.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Formule de prime commerciale avec SI',
                    scenario: 'Si le chiffre d\'affaires réalisé (cellule B5) est supérieur ou égal à 20 000 000 FCFA, la prime est de 1 000 000 FCFA, sinon elle est de 200 000 FCFA.',
                    dataset: { ca: 25000000, seuil: 20000000, primeHaute: 1000000, primeBasse: 200000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Écriture de la formule', calculation: '`=SI(B5>=20000000; 1000000; 200000)`', justification: 'Test logique binaire clair.' },
                      { step: 2, action: 'Résultat pour B5 = 25 000 000 FCFA', calculation: '25M >= 20M est VRAI -> Résultat = 1 000 000 FCFA', justification: 'Attribution de la prime supérieure.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Barème progressif de commission avec SI.CONDITIONS',
                    scenario: 'Barème de commissions : Moins de 10M FCFA = 0%. De 10M à 30M = 5%. Plus de 30M = 8%.',
                    dataset: { ca: 35000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Formule moderne', calculation: '`=SI.CONDITIONS(B5>30000000; B5*0.08; B5>=10000000; B5*0.05; VRAI; 0)`', justification: 'Structure hiérarchique sans parenthèses imbriquées.' },
                      { step: 2, action: 'Calcul pour 35 000 000 FCFA', calculation: '35 000 000 x 8% = 2 800 000 FCFA de commission', justification: 'Application de la tranche haute.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Distribution Automobile de l\'Ouest (DAO SA)',
                    locationContext: 'Abidjan, Boulevard de Marseille',
                    sector: 'Concessionnaire automobile',
                    currency: 'FCFA',
                    problemStatement: 'La secrétaire de direction a recopié une grille tarifaire de 120 pièces détachées en oubliant le dollar sur la cellule de taux de change Euro/FCFA (655,957). Les formules ont glissé vers des cellules vides, affichant des prix à 0 FCFA qui ont été envoyés à un client grand compte.',
                    financialStatements: {
                      devisErrone: 0,
                      pertePotentielleLitige: 45000000,
                    },
                    realWorldResolution: 'Verrouillage immédiat de la cellule de parité en `$B$1` et mise en place d\'une alerte de validation automatique qui bloque l\'édition du devis si une cellule contient une valeur nulle anormale. Le devis a été corrigé avant signature.',
                    recommendationToBoard: 'Former l\'ensemble des assistants commerciaux aux 4 types de références Excel.',
                  },
                  guidedExercise: {
                    id: 'EX_EXC_GUIDED_02',
                    title: 'Exercice Guidé : Calcul conditionnel de remise',
                    instruction: 'Dans la cellule B10, le montant d\'achat est de 15 000 000 FCFA. La formule accorde 10% de remise si le montant dépasse 10 000 000 FCFA, et 0 sinon : `=SI(B10>10000000; B10*0.10; 0)`. Quel est le montant de la remise en FCFA ?',
                    dataset: { b10: 15000000 },
                    stepByStepHelp: [
                      '15 000 000 est supérieur à 10 000 000.',
                      'Remise = 15 000 000 x 10%.',
                    ],
                    expectedAnswer: 1500000,
                    detailedCorrection: 'Le montant de la remise est de 1 500 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_EXC_AUTO_02',
                    title: 'Exercice Autonome : Multiplication matricielle mixte',
                    instruction: 'Dans une table de calcul, le volume de 500 unités est en cellule `$A$5` et le prix unitaire de 4 000 FCFA est en cellule `C$2`. Quel est le résultat de la formule `=$A$5*C$2` en FCFA ?',
                    dataset: { a5: 500, c2: 4000 },
                    hints: [
                      '500 x 4 000 FCFA.',
                    ],
                    expectedAnswer: 2000000,
                    detailedCorrection: 'Montant = 500 x 4 000 = 2 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_EXC_SIM_02',
                    title: 'Atelier Pratique : Matrice à Références Mixtes dans l\'Excel Lab',
                    type: 'simulator',
                    targetComponentId: 'excel_lab',
                    completionCriteria: {
                      metric: 'absoluteReferencesMastered',
                      targetValue: 1,
                      description: 'Construire une table dynamique avec références mixtes ($).',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_EXC_02',
                      question: 'Quelle touche du clavier permet de basculer automatiquement une référence entre A1, $A$1, A$1 et $A1 ?',
                      options: [
                        'La touche F4 (ou Fn + F4)',
                        'La touche F2',
                        'La touche Échap',
                        'La barre d\'espace',
                      ],
                      correctIndex: 0,
                      explanation: 'La touche F4 est le raccourci universel dans Excel pour insérer et cycler les symboles dollars dans une référence de cellule.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La maîtrise du dollar ($) transforme des heures de travail répétitif en quelques secondes de recopie propre.',
                    'Les tests conditionnels permettent d\'automatiser les barèmes complexes d\'entreprise.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 3 pour maîtriser les fonctions de recherche avancées (RECHERCHEX, INDEX/EQUIV).',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_EXC_M2',
            moduleId: 'EXC_MOD_2',
            title: 'Évaluation Certifiante : Références Absolues et Fonctions Logiques',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_EXC_2',
                question: 'Si vous écrivez la formule `=$B3*2` en cellule C3 et que vous la copiez vers la droite en cellule D3, que devient la formule ?',
                options: [
                  '`=$B3*2` (la colonne B reste bloquée grâce au dollar)',
                  '`=$C3*2`',
                  '`=B4*2`',
                  '`=0`',
                ],
                correctIndex: 0,
                explanation: 'Le symbole $ devant le B verrouille la colonne : lors d\'une copie horizontale vers la droite, la référence reste fixée sur la colonne B.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 3 : RECHERCHES AVANCÉES (RECHERCHEX, INDEX / EQUIV)
    // ------------------------------------------------------------------------
    {
      id: 'EXC_NIV_3',
      pathId: 'PATH_EXCEL_MODELING_360',
      levelNumber: 3,
      title: 'Niveau 3 : Fonctions de Recherche Avancées (RECHERCHEX & INDEX/EQUIV)',
      description: 'Dépasser les limites de RECHERCHEV : recherches vers la gauche, correspondances exactes sans risque et recherches bidimensionnelles.',
      targetMastery: 'Croiser des tables de données massives sans ralentissement ni rupture de formule.',
      modules: [
        {
          id: 'EXC_MOD_3',
          levelId: 'EXC_NIV_3',
          pathId: 'PATH_EXCEL_MODELING_360',
          moduleNumber: 3,
          title: 'Module 3 : La Révolution RECHERCHEX et le Duo INDEX / EQUIV',
          description: 'Gestion des erreurs `#N/A`, correspondances approximatives sur barèmes et recherches multi-critères.',
          competencyCodes: ['EXCEL-MODELING'],
          durationHours: 6,
          chapters: [
            {
              id: 'EXC_CHAP_3_1',
              moduleId: 'EXC_MOD_3',
              title: 'Chapitre 1 : Les Mécanismes Modernes d\'Extraction de Données',
              description: 'Comparaison technique approfondie entre RECHERCHEV, RECHERCHEX et INDEX/EQUIV.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_EXC_03',
                  chapterId: 'EXC_CHAP_3_1',
                  moduleId: 'EXC_MOD_3',
                  pathId: 'PATH_EXCEL_MODELING_360',
                  title: 'Leçon 1 : Maîtrise de RECHERCHEX et Combinaison INDEX / EQUIV',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Comprendre les 4 faiblesses critiques de l\'ancienne fonction RECHERCHEV (incapacité de chercher à gauche, vulnérabilité à l\'insertion de colonnes).',
                    'Maîtriser la syntaxe de `RECHERCHEX(valeur_cherchée; tableau_recherche; tableau_renvoyé; [si_non_trouvé])`.',
                    'Maîtriser le couple `INDEX(matrice; EQUIV(clé; colonne; 0))` pour la compatibilité universelle.',
                    'Gérer proprement les valeurs introuvables sans afficher la redoutée erreur `#N/A`.',
                  ],
                  prerequisites: ['Maîtrise des plages de cellules.'],
                  contextIntro: 'RECHERCHEV a été la fonction la plus utilisée au monde pendant 30 ans, mais aussi la plus destructrice de modèles : si quelqu\'un insère une colonne dans votre base, tous vos RECHERCHEV renvoient de mauvaises données ! RECHERCHEX et INDEX/EQUIV résolvent définitivement ce problème en liant directement les colonnes.',
                  theorySections: [
                    {
                      title: '1. Anatomie de la Fonction RECHERCHEX (XLOOKUP)',
                      content: 'Syntaxe : `=RECHERCHEX(valeur_cherchée; tableau_recherche; tableau_renvoyé; si_non_trouvé; mode_correspondance)`. Avantages majeurs : 1. Par défaut, la recherche est EXACTE (plus besoin de taper `; FAUX` comme dans RECHERCHEV). 2. Elle peut chercher de droite à gauche. 3. Elle intègre la gestion des erreurs (argument `si_non_trouvé`). 4. Elle ne casse jamais si des colonnes sont insérées ou déplacées.',
                      keyDefinitions: [
                        { term: 'RECHERCHEX (XLOOKUP)', definition: 'Fonction de recherche moderne d\'Excel remplaçant avantageusement RECHERCHEV, RECHERCHEH et INDEX/EQUIV.' },
                        { term: 'EQUIV (MATCH)', definition: 'Fonction renvoyant la position relative (numéro de ligne ou de colonne) d\'un élément dans un vecteur.' },
                        { term: 'INDEX', definition: 'Fonction extrayant la valeur située à l\'intersection d\'une ligne et d\'une colonne spécifiées.' },
                      ],
                      rulesAndPrinciples: [
                        'Le tableau de recherche et le tableau renvoyé doivent impérativement avoir le même nombre de lignes.',
                      ],
                      formulas: [
                        {
                          name: 'Formule RECHERCHEX Sécurisée',
                          formula: '= RECHERCHEX(A2; Clients[Code]; Clients[Nom]; "Client Inconnu")',
                          interpretation: 'Extraction instantanée et protégée contre les erreurs #N/A.',
                          syscohadaRef: 'Standards Microsoft Excel 365 / 2021',
                        },
                      ],
                      commonMistakes: [
                        'Sélectionner des plages de tailles inégales dans RECHERCHEX (ex: A2:A100 et B2:B50) provoquant une erreur `#VALEUR!`.',
                      ],
                      professionalBestPractices: [
                        'Transformer ses bases de données en Tableaux Structurés Excel (Ctrl + L) pour utiliser des références structurées lisibles.',
                      ],
                      memorizationTips: [
                        'RECHERCHEX : Quoi ? Où chercher ? Quoi ramener ? Quoi dire si pas là ?',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Recherche du prix unitaire d\'un article',
                    scenario: 'Code article en A2 = "REF-104". Table des articles : Colonne F = Codes, Colonne G = Prix unitaires.',
                    dataset: { ref: 'REF-104', prixTrouve: 12500 },
                    stepByStepSolution: [
                      { step: 1, action: 'Formule RECHERCHEX', calculation: '`=RECHERCHEX(A2; F:F; G:G; "Article inexistant")`', justification: 'Lien direct entre colonnes.' },
                      { step: 2, action: 'Résultat', calculation: 'Renvoie immédiatement 12 500 FCFA', justification: 'Extraction exacte garantie.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Recherche bidimensionnelle croisée avec INDEX et double EQUIV',
                    scenario: 'Matrice de tarifs par Région (lignes) et par Gamme (colonnes). Trouver le tarif pour Région "Bouaké" et Gamme "Premium".',
                    dataset: { region: 'Bouaké', gamme: 'Premium', tarif: 45000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Position de la ligne Région', calculation: '`EQUIV("Bouaké"; A2:A10; 0)` -> donne la ligne 3', justification: 'Recherche verticale.' },
                      { step: 2, action: 'Position de la colonne Gamme', calculation: '`EQUIV("Premium"; B1:E1; 0)` -> donne la colonne 2', justification: 'Recherche horizontale.' },
                      { step: 3, action: 'Extraction par INDEX', calculation: '`=INDEX(B2:E10; 3; 2)` -> renvoie 45 000 FCFA', justification: 'Croisement parfait des deux dimensions.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Quincaillerie Générale d\'Abidjan (QGA SA)',
                    locationContext: 'Abidjan, Treichville',
                    sector: 'Distribution de quincaillerie (15 000 références)',
                    currency: 'FCFA',
                    problemStatement: 'Le fichier de facturation de QGA utilisait 15 000 formules RECHERCHEV. Chaque ouverture de fichier prenait 4 minutes et l\'insertion d\'une colonne « Code Fournisseur » a décalé tous les prix de vente, facturant des perceuses à 1 500 FCFA au lieu de 45 000 FCFA.',
                    financialStatements: {
                      nombreLignesBase: 15000,
                      tempsCalculInitialMin: 4,
                      perteFacturationErronee: 18000000,
                    },
                    realWorldResolution: 'Remplacement de tous les RECHERCHEV par des formules `RECHERCHEX` couplées à des tableaux structurés. Le temps de recalcul du classeur est tombé de 4 minutes à 2 secondes et l\'immunité contre l\'insertion de colonnes a totalement sécurisé la facturation.',
                    recommendationToBoard: 'Mettre à niveau l\'ensemble des postes financiers sous Excel 365 et prohiber l\'usage de RECHERCHEV sur les bases critiques.',
                  },
                  guidedExercise: {
                    id: 'EX_EXC_GUIDED_03',
                    title: 'Exercice Guidé : Recherche exacte de salaire',
                    instruction: 'Dans une table du personnel, le matricule "M-502" est recherché. La fonction `RECHERCHEX("M-502"; A2:A20; C2:C20)` trouve la ligne correspondante où la cellule de salaire en C indique 850 000 FCFA. Quel est le montant extrait par la formule ?',
                    dataset: { salaire: 850000 },
                    stepByStepHelp: [
                      'RECHERCHEX renvoie directement la valeur correspondante.',
                    ],
                    expectedAnswer: 850000,
                    detailedCorrection: 'Le résultat est de 850 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_EXC_AUTO_03',
                    title: 'Exercice Autonome : Valeur par défaut si non trouvé',
                    instruction: 'La formule `=RECHERCHEX("CODE_INCONNU"; A2:A10; B2:B10; 0)` recherche une référence absente de la table. Grâce au quatrième argument, quelle valeur numérique est renvoyée par la formule ? Entrez 0.',
                    dataset: { valeurParDefaut: 0 },
                    hints: [
                      'Le 4e argument spécifie la valeur de secours.',
                    ],
                    expectedAnswer: 0,
                    detailedCorrection: 'La formule renvoie 0 (et non une erreur #N/A).',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_EXC_SIM_03',
                    title: 'Atelier Pratique : Implémentation de RECHERCHEX dans l\'Excel Lab',
                    type: 'simulator',
                    targetComponentId: 'excel_lab',
                    completionCriteria: {
                      metric: 'xlookupImplemented',
                      targetValue: 1,
                      description: 'Croiser deux tables de données avec RECHERCHEX sans erreur.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_EXC_03',
                      question: 'Quel est l\'avantage décisif de RECHERCHEX par rapport à RECHERCHEV lors de la modification de la structure d\'une feuille de calcul ?',
                      options: [
                        'RECHERCHEX pointe directement sur la colonne à renvoyer et ne dépend pas d\'un numéro d\'index fixe : l\'insertion ou la suppression de colonnes ne casse jamais la formule',
                        'RECHERCHEX est payant',
                        'RECHERCHEX ne fonctionne qu\'en anglais',
                        'Il n\'y a aucune différence',
                      ],
                      correctIndex: 0,
                      explanation: 'RECHERCHEV repose sur un numéro de colonne en dur (ex: le 3) : insérer une colonne décale tout. RECHERCHEX lie des plages dynamiques invariantes.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'RECHERCHEX et INDEX/EQUIV sont les outils indispensables pour lier des bases de données hétérogènes.',
                    'L\'automatisation des correspondances exactes supprime les erreurs manuelles de saisie.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 4 pour maîtriser les fonctions financières mathématiques (VPM, VAN, TRI).',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_EXC_M3',
            moduleId: 'EXC_MOD_3',
            title: 'Évaluation Certifiante : Fonctions de Recherche et Intégrité des Données',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_EXC_3',
                question: 'Peut-on utiliser RECHERCHEX pour rechercher une valeur dans la colonne E et renvoyer la valeur correspondante située dans la colonne B (vers la gauche) ?',
                options: [
                  'Oui, parfaitement, RECHERCHEX cherche indifféremment vers la gauche ou vers la droite',
                  'Non, c\'est strictement impossible',
                  'Uniquement si les données sont triées par ordre alphabétique',
                  'Seulement sur Mac',
                ],
                correctIndex: 0,
                explanation: 'Contrairement à RECHERCHEV qui était bridé vers la droite, RECHERCHEX permet les recherches bidirectionnelles sans aucune contrainte d\'agencement.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 4 : FONCTIONS FINANCIÈRES MATHÉMATIQUES (VPM, VAN, TRI)
    // ------------------------------------------------------------------------
    {
      id: 'EXC_NIV_4',
      pathId: 'PATH_EXCEL_MODELING_360',
      levelNumber: 4,
      title: 'Niveau 4 : Fonctions Financières d\'Emprunt & d\'Investissement (VPM, VAN, TRI)',
      description: 'Calculer des tableaux d\'amortissement d\'emprunt avec mensualités constantes (VPM, INTPER, PRINCPER) et mesurer la rentabilité de projets (VAN, TRI).',
      targetMastery: 'Bâtir un échéancier de crédit bancaire complet au centime près.',
      modules: [
        {
          id: 'EXC_MOD_4',
          levelId: 'EXC_NIV_4',
          pathId: 'PATH_EXCEL_MODELING_360',
          moduleNumber: 4,
          title: 'Module 4 : Les Algorithmes Financiers d\'Excel',
          description: 'Calcul des flux actuariels, simulation de prêt bancaire et analyse de rentabilité.',
          competencyCodes: ['EXCEL-MODELING', 'FIN-INVEST'],
          durationHours: 6,
          chapters: [
            {
              id: 'EXC_CHAP_4_1',
              moduleId: 'EXC_MOD_4',
              title: 'Chapitre 1 : Mathématiques Actuarielles sur Tableur',
              description: 'Formules VPM, TAUX, NPM, VAN et TRI appliquées aux décisions d\'entreprise.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_EXC_04',
                  chapterId: 'EXC_CHAP_4_1',
                  moduleId: 'EXC_MOD_4',
                  pathId: 'PATH_EXCEL_MODELING_360',
                  title: 'Leçon 1 : Modélisation d\'un Tableau d\'Amortissement d\'Emprunt avec VPM',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Comprendre la fonction `VPM(taux_mensuel; nombre_mois; -capital)` pour calculer l\'annuité ou la mensualité constante.',
                    'Décomposer chaque mensualité en intérêts (`INTPER`) et remboursement de capital (`PRINCPER`).',
                    'Calculer la Valeur Actuelle Nette (`VAN(taux; flux) - investissement`).',
                    'Calculer le Taux de Rentabilité Interne (`TRI(plage_complete_flux)`).',
                  ],
                  prerequisites: ['Maîtrise des pourcentages et des puissances.'],
                  contextIntro: 'Une entreprise emprunte 100 000 000 FCFA sur 5 ans au taux de 8% l\'an auprès d\'Ecobank ou de la Société Générale. Comment calculer exactement la mensualité constante à payer chaque mois ? Excel intègre des moteurs actuariels puissants capables de dresser un tableau d\'emprunt de 60 lignes en 30 secondes.',
                  theorySections: [
                    {
                      title: '1. La Fonction VPM (Paiement Périodique)',
                      content: 'Syntaxe : `=VPM(taux; npm; va)`. Règle fondamentale de cohérence des périodes : si le remboursement est MENSUEL, le taux doit impérativement être le taux mensuel (`Taux_annuel / 12`) et le nombre de périodes doit être en mois (`Années x 12`). Le capital emprunté (`va`) doit être précédé d\'un signe MOINS pour que la mensualité ressorte en nombre positif.',
                      keyDefinitions: [
                        { term: 'VPM (PMT)', definition: 'Fonction financière calculant le paiement périodique constant nécessaire pour amortir un prêt à taux fixe.' },
                        { term: 'VAN (NPV)', definition: 'Valeur Actuelle Nette : somme des flux futurs de trésorerie actualisés diminuée de l\'investissement initial.' },
                        { term: 'TRI (IRR)', definition: 'Taux de Rentabilité Interne : taux d\'actualisation pour lequel la VAN d\'un projet est rigoureusement égale à zéro.' },
                      ],
                      rulesAndPrinciples: [
                        'Dans la fonction VAN d\'Excel, le premier argument est le taux, et la plage de flux commence à l\'année 1 (l\'investissement initial en année 0 doit être AJOUTÉ en dehors de la parenthèse).',
                      ],
                      formulas: [
                        {
                          name: 'Mensualité d\'Emprunt VPM',
                          formula: '= VPM(Taux_Annuel / 12; Annees * 12; - Capital_Emprunte)',
                          interpretation: 'Formule standard de calcul des échéances de prêt bancaire.',
                          syscohadaRef: 'Mathématiques Financières Actuarielles',
                        },
                      ],
                      commonMistakes: [
                        'Oublier de diviser le taux annuel par 12 pour un remboursement mensuel : cela revient à appliquer un taux d\'intérêt de 8% par mois au lieu de 8% par an !',
                        'Inclure le flux initial négatif de l\'année 0 à l\'intérieur de la parenthèse de la fonction `VAN()`.',
                      ],
                      professionalBestPractices: [
                        'Construire une ligne de contrôle qui vérifie que la somme des colonnes Capital et Intérêts égale exactement la mensualité VPM.',
                      ],
                      memorizationTips: [
                        'Taux par 12, Période fois 12, Moins devant le capital.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul d\'une mensualité de crédit de 10 000 000 FCFA',
                    scenario: 'Prêt de 10 000 000 FCFA sur 2 ans (24 mois) au taux annuel de 6%.',
                    dataset: { capital: 10000000, dureeMois: 24, tauxAnnuel: 0.06 },
                    stepByStepSolution: [
                      { step: 1, action: 'Taux mensuel', calculation: '6% / 12 = 0,5% par mois (0,005)', justification: 'Taux proportionnel mensuel.' },
                      { step: 2, action: 'Formule VPM', calculation: '`=VPM(0.005; 24; -10000000)`', justification: 'Calcul actuariel.' },
                      { step: 3, action: 'Résultat', calculation: '443 206 FCFA par mois', justification: 'Mensualité constante pendant 24 mois.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Calcul de VAN et TRI d\'un investissement industriel',
                    scenario: 'Investissement initial = 50 000 000 FCFA. Flux de cash générés : Année 1 = 20M, Année 2 = 25M, Année 3 = 30M. Taux d\'actualisation = 10%.',
                    dataset: { i0: -50000000, cf1: 20000000, cf2: 25000000, cf3: 30000000, taux: 0.10 },
                    stepByStepSolution: [
                      { step: 1, action: 'Formule VAN dans Excel', calculation: '`=VAN(10%; B2:B4) + B1` (où B1 = -50 000 000)', justification: 'Actualisation des flux 1 à 3 et déduction de l\'investissement.' },
                      { step: 2, action: 'Résultat VAN', calculation: '61 382 419 - 50 000 000 = +11 382 419 FCFA', justification: 'Le projet crée 11,38M de valeur nette.' },
                      { step: 3, action: 'Calcul du TRI', calculation: '`=TRI(B1:B4)` -> renvoie 21,65%', justification: 'Le TRI (21,65%) dépasse largement le coût du capital (10%) : projet hautement rentable.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Transport & Logistique de Vridi (TLV SA)',
                    locationContext: 'Abidjan, Zone Portuaire',
                    sector: 'Flotte de camions porte-conteneurs',
                    currency: 'FCFA',
                    problemStatement: 'TLV négociait l\'acquisition de 10 camions pour 600 000 000 FCFA. Deux banques proposaient des offres concurrentes : Banque A (taux 7,5% avec frais de dossier de 2%) et Banque B (taux 8% sans frais). L\'analyse VPM et TRI a permis de trancher.',
                    financialStatements: {
                      montantEmprunt: 600000000,
                      dureeAns: 5,
                    },
                    realWorldResolution: 'Le modélisateur financier a intégré les frais de dossier dans le flux initial et a calculé le Taux Effectif Global (TEG) réel via la fonction `=TRI()`. L\'offre de la Banque A affichait un TEG de 8,42% tandis que la Banque B s\'établissait à 8,00%. TLV a choisi la Banque B, économisant 7 800 000 FCFA sur la durée du crédit.',
                    recommendationToBoard: 'Ne jamais comparer deux offres de prêt sur le seul taux nominal affiché : modéliser le TRI des flux réels.',
                  },
                  guidedExercise: {
                    id: 'EX_EXC_GUIDED_04',
                    title: 'Exercice Guidé : Calcul du TRI d\'un projet',
                    instruction: 'Un projet requiert 100 000 000 FCFA en année 0 et rapporte 60 000 000 FCFA en année 1 et 60 000 000 FCFA en année 2. Le calcul actuariel donne un TRI de 13,07%. Si le coût du capital de l\'entreprise est de 10%, ce projet doit-il être accepté ? Entrez 1 pour OUI ou 0 pour NON.',
                    dataset: { tri: 0.1307, cmpc: 0.10 },
                    stepByStepHelp: [
                      'Règle financière : Si TRI > Coût du capital (13,07% > 10%), le projet crée de la valeur et doit être accepté.',
                    ],
                    expectedAnswer: 1,
                    detailedCorrection: 'Le projet doit être accepté car son rendement interne (13,07%) est supérieur au coût des ressources (10%).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_EXC_AUTO_04',
                    title: 'Exercice Autonome : Calcul d\'intérêts de première mensualité',
                    instruction: 'Un prêt de 24 000 000 FCFA est souscrit au taux annuel de 6% (soit 0,5% par mois). Quel est le montant des intérêts bancaires payés lors de la toute première mensualité (formule : Capital initial x Taux mensuel) ?',
                    dataset: { capital: 24000000, tauxMensuel: 0.005 },
                    hints: [
                      '24 000 000 x 0,005 FCFA.',
                    ],
                    expectedAnswer: 120000,
                    detailedCorrection: 'Intérêts du 1er mois = 24 000 000 x 0,5% = 120 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_EXC_SIM_04',
                    title: 'Atelier Pratique : Tableau d\'Amortissement d\'Emprunt dans l\'Excel Lab',
                    type: 'simulator',
                    targetComponentId: 'excel_lab',
                    completionCriteria: {
                      metric: 'amortizationScheduleGenerated',
                      targetValue: 1,
                      description: 'Générer l\'échéancier de crédit bancaire avec VPM et amortissements.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_EXC_04',
                      question: 'Dans la fonction Excel =VAN(taux; flux1; flux2...), pourquoi ne faut-il pas inclure l\'investissement initial (flux de l\'année 0) dans les arguments de la fonction ?',
                      options: [
                        'Parce que la fonction VAN d\'Excel actualise automatiquement le premier flux de la liste comme s\'il se produisait à la fin de l\'année 1 : inclure le flux 0 le sous-estimerait',
                        'Parce que l\'investissement initial est toujours positif',
                        'Parce que la fonction plante',
                        'C\'est une obligation fiscale',
                      ],
                      correctIndex: 0,
                      explanation: 'C\'est la particularité historique de la fonction VAN dans Excel : elle actualise tous les termes de la plage. L\'investissement initial (déjà en valeur actuelle) doit être additionné hors formule : `=VAN(...) - I0`.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Les fonctions VPM, VAN et TRI permettent d\'arbitrer rationnellement les décisions financières d\'investissement et d\'emprunt.',
                    'La rigueur des unités temporelles (mois vs années) est indispensable pour des résultats exacts.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 5 pour maîtriser le nettoyage et la fiabilisation des données comptables massives.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_EXC_M4',
            moduleId: 'EXC_MOD_4',
            title: 'Évaluation Certifiante : Fonctions Financières et Décisions d\'Investissement',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_EXC_4',
                question: 'Si la Valeur Actuelle Nette (VAN) d\'un projet calculée au coût moyen pondéré du capital est positive (+15 000 000 FCFA), que cela signifie-t-il pour l\'entreprise ?',
                options: [
                  'Le projet crée 15 millions FCFA de valeur économique nette au-delà de la rémunération minimale exigée par les investisseurs',
                  'L\'entreprise va perdre 15 millions FCFA',
                  'Le chiffre d\'affaires augmentera de 15%',
                  'Le projet est neutre',
                ],
                correctIndex: 0,
                explanation: 'Une VAN positive démontre formellement la création de valeur de l\'investissement pour les actionnaires.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 5 : NETTOYAGE & FIABILISATION DES DONNÉES FINANCIÈRES
    // ------------------------------------------------------------------------
    {
      id: 'EXC_NIV_5',
      pathId: 'PATH_EXCEL_MODELING_360',
      levelNumber: 5,
      title: 'Niveau 5 : Nettoyage, Normalisation & Traitement des Données Massives',
      description: 'Convertir les exports comptables bruts (ERP, banques) en bases de données saines : SUPPRESPACE, CNUM, GAUCHE/DROITE, CONVERTIR.',
      targetMastery: 'Nettoyer un fichier de 50 000 lignes pollué d\'espaces insécables et de dates erronées en moins de 5 minutes.',
      modules: [
        {
          id: 'EXC_MOD_5',
          levelId: 'EXC_NIV_5',
          pathId: 'PATH_EXCEL_MODELING_360',
          moduleNumber: 5,
          title: 'Module 5 : Le Data Cleaning Financier',
          description: 'Élimination des espaces fantômes, conversion de texte en nombre, standardisation des dates OHADA.',
          competencyCodes: ['EXCEL-MODELING'],
          durationHours: 5,
          chapters: [
            {
              id: 'EXC_CHAP_5_1',
              moduleId: 'EXC_MOD_5',
              title: 'Chapitre 1 : Traitement des Anomalies d\'Exportations ERP',
              description: 'Formules texte et outils de transformation de données sans programmation.',
              estimatedMinutes: 150,
              lessons: [
                {
                  id: 'L_EXC_05',
                  chapterId: 'EXC_CHAP_5_1',
                  moduleId: 'EXC_MOD_5',
                  pathId: 'PATH_EXCEL_MODELING_360',
                  title: 'Leçon 1 : Fonctions de Nettoyage de Données Comptables : SUPPRESPACE, EPURAGE et CNUM',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Éliminer les espaces superflus et insécables (`CAR(160)`) qui bloquent les recherches RECHERCHEX.',
                    'Convertir des nombres stockés sous forme de texte en vrais nombres arithmétiques via `CNUM()` ou l\'outil `Convertir`.',
                    'Extraire des sous-chaînes de comptes comptables avec `GAUCHE()`, `DROITE()` et `STXT()`.',
                    'Uniformiser les formats de dates pour permettre les tris chronologiques fiables.',
                  ],
                  prerequisites: ['Maîtrise des formules de texte.'],
                  contextIntro: 'Vous exportez le grand livre depuis SAP ou Sage : vous essayez de faire une somme, le résultat est 0 ! Pourquoi ? Parce que les montants sont stockés au format texte avec des espaces insécables. Un analyste financier passe 40% de son temps à nettoyer des données mal formatées avant de pouvoir analyser.',
                  theorySections: [
                    {
                      title: '1. Les 3 Ennemis du Fichier Comptable Exporté',
                      content: '1. Le faux nombre : un nombre aligné à gauche dans la cellule est un texte (non sommable). Solution : `=CNUM(SUBSTITUE(A1; " "; ""))`. 2. L\'espace insécable : généré par les logiciels bancaires pour séparer les milliers (code ASCII 160). La fonction `SUPPRESPACE()` ordinaire ne le supprime pas ! Solution : `=SUBSTITUE(A1; CAR(160); "")`. 3. La date texte : "31/12/2026" non reconnue. Solution : Outil Ruban Données > Convertir > Format Date JMA.',
                      keyDefinitions: [
                        { term: 'Espace Insécable (CAR 160)', definition: 'Caractère d\'espacement non sécable fréquent dans les exports bancaires qui empêche Excel de reconnaître un nombre.' },
                        { term: 'CNUM (VALUE)', definition: 'Fonction Excel convertissant une chaîne de caractères représentant un nombre en valeur numérique calculable.' },
                      ],
                      rulesAndPrinciples: [
                        'Dans une cellule non formatée manuellement, les nombres s\'alignent TOUJOURS à droite et les textes à gauche.',
                      ],
                      formulas: [
                        {
                          name: 'Nettoyage Intégral de Cellule Monétaire',
                          formula: '= CNUM(SUBSTITUE(SUBSTITUE(A1; CAR(160); ""); " "; ""))',
                          interpretation: 'Formule universelle transformant un export comptable pollué en nombre calculable.',
                          syscohadaRef: 'Bonnes Pratiques de Data Management Financier',
                        },
                      ],
                      commonMistakes: [
                        'Essayer d\'appliquer un format de cellule « Monétaire » sur une cellule qui contient du texte : le format ne change rien au contenu texte !',
                      ],
                      professionalBestPractices: [
                        'Utiliser Power Query pour créer des requêtes d\'importation et de nettoyage automatisées et réutilisables chaque mois.',
                      ],
                      memorizationTips: [
                        'Texte à gauche, Nombre à droite. Si c\'est à gauche, CNUM le redresse.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Extraction du numéro de classe d\'un compte SYSCOHADA',
                    scenario: 'Cellule A2 = "601100 Achats de marchandises". Extraire le numéro de classe (le premier chiffre).',
                    dataset: { compte: '601100 Achats' },
                    stepByStepSolution: [
                      { step: 1, action: 'Formule d\'extraction', calculation: '`=GAUCHE(A2; 1)`', justification: 'Extrait le premier caractère à gauche.' },
                      { step: 2, action: 'Résultat', calculation: 'Renvoie "6" (Classe des charges)', justification: 'Permet ensuite de filtrer toutes les charges de la balance.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Élimination d\'espaces insécables sur un relevé bancaire',
                    scenario: 'Cellule A1 contient "12 500 000" avec un espace insécable entre les milliers. La somme renvoie 0.',
                    dataset: { texte: '12 500 000' },
                    stepByStepSolution: [
                      { step: 1, action: 'Remplacement de l\'espace spécial', calculation: '`=SUBSTITUE(A1; CAR(160); "")` donne "12500000"', justification: 'Suppression du caractère parasite.' },
                      { step: 2, action: 'Conversion en nombre', calculation: '`=CNUM(SUBSTITUE(A1; CAR(160); ""))`', justification: 'Le montant devient un vrai nombre aligné à droite de 12 500 000 FCFA.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Agro-Industriel d\'Abidjan (GAIA SA)',
                    locationContext: 'Abidjan, Zone Industrielle Vridi',
                    sector: 'Transformation de denrées alimentaires',
                    currency: 'FCFA',
                    problemStatement: 'La clôture annuelle de GAIA prenait 5 jours de retard chaque année car le fichier d\'inventaire de 42 000 articles exporté de l\'ERP contenait des codes articles avec des espaces traînants à la fin ("REF-001 "), bloquant les rapprochements avec la comptabilité.',
                    financialStatements: {
                      nombreArticlesInventaire: 42000,
                      joursRetardCloture: 5,
                    },
                    realWorldResolution: 'Le contrôleur financier a automatisé le nettoyage via une colonne de normalisation `=SUPPRESPACE(MAJUSCULE(A2))` appliquée en 3 secondes sur les 42 000 lignes. Le taux de rapprochement automatique est passé de 62% à 99,8%, permettant de clôturer les stocks en 4 heures.',
                    recommendationToBoard: 'Normaliser les règles de saisie des références dans l\'ERP pour interdire les espaces en fin de champ.',
                  },
                  guidedExercise: {
                    id: 'EX_EXC_GUIDED_05',
                    title: 'Exercice Guidé : Extraction de préfixe de compte',
                    instruction: 'Le compte comptable "411100" est inscrit dans la cellule A4. La formule `=GAUCHE(A4; 3)` extrait les 3 premiers chiffres. Quel est le texte à 3 chiffres renvoyé par la formule ?',
                    dataset: { compte: '411100' },
                    stepByStepHelp: [
                      'Prenez les 3 premiers caractères à partir de la gauche de "411100".',
                    ],
                    expectedAnswer: 411,
                    detailedCorrection: 'La formule renvoie "411" (identifiant du compte Clients ordinaires).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_EXC_AUTO_05',
                    title: 'Exercice Autonome : Conversion de texte en nombre',
                    instruction: 'La cellule B2 contient la chaîne de caractères "45000" sous forme de texte. Quel est le résultat arithmétique de la formule `=CNUM(B2) + 5000` en FCFA ?',
                    dataset: { texte: '45000', ajout: 5000 },
                    hints: [
                      '45 000 + 5 000 FCFA.',
                    ],
                    expectedAnswer: 50000,
                    detailedCorrection: 'Le résultat est de 50 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_EXC_SIM_05',
                    title: 'Atelier Pratique : Nettoyage d\'une Base Comptable dans l\'Excel Lab',
                    type: 'simulator',
                    targetComponentId: 'excel_lab',
                    completionCriteria: {
                      metric: 'dataCleanedAndFormatted',
                      targetValue: 1,
                      description: 'Nettoyer les anomalies de texte et normaliser les montants.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_EXC_05',
                      question: 'Pourquoi la fonction =SOMME() renvoie-t-elle souvent 0 sur une colonne de chiffres exportés depuis un logiciel bancaire ou comptable ?',
                      options: [
                        'Parce que les chiffres sont stockés au format texte et contiennent des espaces insécables que la fonction SOMME ignore',
                        'Parce que le logiciel bancaire est vide',
                        'Parce qu\'il n\'y a pas d\'argent sur le compte',
                        'Parce qu\'Excel a expiré',
                      ],
                      correctIndex: 0,
                      explanation: 'La fonction SOMME ignore purement et simplement les cellules contenant du texte : si les nombres sont pollués par un format texte, ils ne sont pas additionnés.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le data cleaning est la condition indispensable de la fiabilité de tout modèle financier.',
                    'La maîtrise des fonctions de transformation texte/nombre évite les blocages lors des clôtures.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 6 pour maîtriser les Tableaux Croisés Dynamiques (TCD) et les champs calculés.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_EXC_M5',
            moduleId: 'EXC_MOD_5',
            title: 'Évaluation Certifiante : Nettoyage et Fiabilisation de Données',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_EXC_5',
                question: 'Quelle formule permet de supprimer tous les espaces superflus situés au début et à la fin d\'un texte sans toucher aux mots ?',
                options: [
                  '`=SUPPRESPACE(texte)`',
                  '`=EFFACER(texte)`',
                  '`=MINUSCULE(texte)`',
                  '`=NBCAR(texte)`',
                ],
                correctIndex: 0,
                explanation: 'La fonction SUPPRESPACE supprime tous les espaces en début et fin de texte et ne conserve qu\'un espace unique entre les mots.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 6 : TABLEAUX CROISÉS DYNAMIQUES (TCD) & ANALYSE MULTIDIMENSIONNELLE
    // ------------------------------------------------------------------------
    {
      id: 'EXC_NIV_6',
      pathId: 'PATH_EXCEL_MODELING_360',
      levelNumber: 6,
      title: 'Niveau 6 : Tableaux Croisés Dynamiques (TCD) & Analyse Multidimensionnelle',
      description: 'Agréger et analyser des millions de lignes comptables en quelques clics : lignes, colonnes, filtres, segmenteurs et champs calculés.',
      targetMastery: 'Générer une synthèse de chiffre d\'affaires par client, région et trimestre sans taper une seule formule.',
      modules: [
        {
          id: 'EXC_MOD_6',
          levelId: 'EXC_NIV_6',
          pathId: 'PATH_EXCEL_MODELING_360',
          moduleNumber: 6,
          title: 'Module 6 : La Puissance d\'Analyse des TCD',
          description: 'Regroupement chronologique, pourcentages du total, champs calculés de marge et graphiques croisés dynamiques.',
          competencyCodes: ['EXCEL-MODELING', 'CTRL-PERFORMANCE'],
          durationHours: 6,
          chapters: [
            {
              id: 'EXC_CHAP_6_1',
              moduleId: 'EXC_MOD_6',
              title: 'Chapitre 1 : Structuration et Exploitation des Tableaux Croisés',
              description: 'Règles de structure d\'une table source et création d\'analyses de direction.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_EXC_06',
                  chapterId: 'EXC_CHAP_6_1',
                  moduleId: 'EXC_MOD_6',
                  pathId: 'PATH_EXCEL_MODELING_360',
                  title: 'Leçon 1 : Création de TCD, Segmenteurs et Champs Calculés de Marge',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Vérifier les 3 règles d\'or d\'une table source pour TCD (une seule ligne d\'en-tête, zéro ligne vide, zéro colonne fusionnée).',
                    'Organiser les 4 zones : Filtres, Colonnes, Lignes, Valeurs.',
                    'Modifier le calcul des valeurs : Somme, Nombre, Moyenne, % du total de la colonne.',
                    'Créer un Champ Calculé personnalisé (ex: Marge = CA - Coût des ventes).',
                    'Connecter des Segmenteurs visuels (Slicers) interactifs.',
                  ],
                  prerequisites: ['Maîtrise des tables de données.'],
                  contextIntro: 'Le Directeur Général vous demande : « Quel est le chiffre d\'affaires réalisé par chaque commercial sur la gamme Boissons dans la région de San Pedro au 3e trimestre ? ». Avec des formules SOMME.SI.ENS, cela prend 30 minutes. Avec un Tableau Croisé Dynamique, cela prend exactement 12 secondes.',
                  theorySections: [
                    {
                      title: '1. Les 4 Zones Fondamentales d\'un TCD',
                      content: 'Un TCD est un moteur d\'agrégation multidimensionnel. 1. Zone Lignes : les catégories à analyser verticalement (ex: Clients, Commerciaux). 2. Zone Colonnes : les dimensions horizontales (ex: Trimestres, Années). 3. Zone Valeurs : les métriques numériques à agréger (Somme du CA, Moyenne des prix). 4. Zone Filtres : les filtres d\'exclusion globaux.',
                      keyDefinitions: [
                        { term: 'Tableau Croisé Dynamique (TCD / Pivot Table)', definition: 'Outil interactif de synthèse de données permettant de réorganiser et d\'agréger de larges volumes de données selon de multiples angles.' },
                        { term: 'Champ Calculé', definition: 'Nouvelle colonne de calcul créée directement à l\'intérieur du TCD sans modifier la table source (ex: Taux de Marge = Marge / CA).' },
                        { term: 'Segmenteur (Slicer)', definition: 'Bouton de filtrage visuel interactif permettant de filtrer un ou plusieurs TCD d\'un simple clic.' },
                      ],
                      rulesAndPrinciples: [
                        'La source de données d\'un TCD doit être un Tableau Structuré Excel (Tableau1) pour que tout nouvel enregistrement soit automatiquement intégré lors de l\'actualisation.',
                        'Un TCD ne se met pas à jour tout seul : il faut cliquer sur « Actualiser » (Alt + F5).',
                      ],
                      formulas: [
                        {
                          name: 'Champ Calculé de Marge Brute dans TCD',
                          formula: '= \'Chiffre d\\\'Affaires\' - \'Coût des Ventes\'',
                          interpretation: 'Formule interne au moteur du TCD appliquée dynamiquement à chaque sous-total.',
                          syscohadaRef: 'Standards de Business Intelligence sur Tableur',
                        },
                      ],
                      commonMistakes: [
                        'Avoir des cellules fusionnées dans la table source : cela bloque instantanément la création du TCD.',
                        'Faire un champ calculé de moyenne pondérée (le TCD somme d\'abord les champs avant d\'appliquer la formule).',
                      ],
                      professionalBestPractices: [
                        'Désactiver la fonction « Ajuster automatiquement les largeurs de colonnes lors de la mise à jour » dans les options du TCD pour conserver la mise en page.',
                      ],
                      memorizationTips: [
                        'Lignes = Qui ? Colonnes = Quand ? Valeurs = Combien ?',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Synthèse du chiffre d\'affaires par ville',
                    scenario: 'Une table de 5 000 ventes en Côte d\'Ivoire. Glisser le champ « Ville » en Lignes et « Montant TTC » en Valeurs.',
                    dataset: { abidjan: 450000000, bouake: 180000000, sanpedro: 120000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Disposition TCD', calculation: 'Lignes = Ville, Valeurs = Somme de Montant TTC', justification: 'Regroupement instantané.' },
                      { step: 2, action: 'Résultat', calculation: 'Tableau de synthèse : Abidjan (450M), Bouaké (180M), San Pedro (120M) = Total 750M FCFA', justification: 'Agrégation sans erreur de formule.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Affichage des données en pourcentage du total',
                    scenario: 'Le dirigeant souhaite connaître la part relative de chaque région dans les ventes globales.',
                    dataset: { total: 750000000, abidjan: 450000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Paramètres des champs de valeurs', calculation: 'Clic droit sur la valeur > Afficher les valeurs > % du total de la colonne', justification: 'Conversion du mode d\'affichage.' },
                      { step: 2, action: 'Résultat analytique', calculation: 'Abidjan = 60%, Bouaké = 24%, San Pedro = 16%', justification: 'Visualisation immédiate de la concentration géographique.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Brasseries & Boissons de Côte d\'Ivoire (BBCI SA)',
                    locationContext: 'Abidjan, Zone Industrielle Yopougon',
                    sector: 'Industrie des boissons',
                    currency: 'FCFA',
                    problemStatement: 'La direction commerciale passait chaque lundi matin 3 heures à compiler les rapports régionaux de 45 dépôts de vente. Les fichiers étaient souvent truffés d\'erreurs de doublons de formules.',
                    financialStatements: {
                      lignesVentesHebdo: 25000,
                      tempsCompilationInitialHeures: 3,
                    },
                    realWorldResolution: 'Création d\'un classeur maître automatisé alimenté par un Tableau Croisé Dynamique connecté à 4 segmenteurs tactiles (Marque, Format, Dépôt, Semaine). Le temps d\'analyse hebdomadaire est passé de 3 heures à 30 secondes en comité de direction.',
                    recommendationToBoard: 'Généraliser les tableaux de bord interactifs à base de TCD pour toutes les revues commerciales de zone.',
                  },
                  guidedExercise: {
                    id: 'EX_EXC_GUIDED_06',
                    title: 'Exercice Guidé : Calcul de pourcentage dans un TCD',
                    instruction: 'Dans un TCD, la région Abidjan réalise 60 000 000 FCFA de chiffre d\'affaires sur un total national de 200 000 000 FCFA. Quel est le pourcentage du total représenté par Abidjan (en %, entrez un entier, ex: 30) ?',
                    dataset: { caAbidjan: 60000000, caTotal: 200000000 },
                    stepByStepHelp: [
                      'Pourcentage = (60 000 000 / 200 000 000) x 100.',
                    ],
                    expectedAnswer: 30,
                    detailedCorrection: 'Abidjan représente exactement 30% des ventes nationales.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_EXC_AUTO_06',
                    title: 'Exercice Autonome : Champ calculé de marge dans un TCD',
                    instruction: 'Le champ calculé `=Ventes - Cout` donne une marge de 40 000 000 FCFA pour un chiffre d\'affaires de 100 000 000 FCFA. Quel est le taux de marge commerciale en pourcentage (Marge / Ventes x 100) ? Entrez un entier, ex: 40.',
                    dataset: { marge: 40000000, ca: 100000000 },
                    hints: [
                      '40 000 000 / 100 000 000 x 100.',
                    ],
                    expectedAnswer: 40,
                    detailedCorrection: 'Le taux de marge commerciale est de 40%.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_EXC_SIM_06',
                    title: 'Atelier Pratique : Construction de TCD dans le Pivot Table Lab',
                    type: 'simulator',
                    targetComponentId: 'pivot_lab',
                    completionCriteria: {
                      metric: 'pivotTableGenerated',
                      targetValue: 1,
                      description: 'Générer un TCD avec segmenteurs et champs calculés.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_EXC_06',
                      question: 'Pourquoi est-il fortement recommandé de convertir sa plage de données en Tableau Structuré Excel (Ctrl+L) avant de créer un Tableau Croisé Dynamique ?',
                      options: [
                        'Pour que tout nouvel enregistrement ajouté en bas de table soit automatiquement pris en compte lors du prochain clic sur Actualiser sans devoir redéfinir la plage source',
                        'Pour changer la couleur des cellules',
                        'Pour empêcher les utilisateurs de supprimer le fichier',
                        'C\'est obligatoire sous Windows',
                      ],
                      correctIndex: 0,
                      explanation: 'Un tableau structuré est une plage dynamique : les nouvelles lignes de données sont intégrées automatiquement au périmètre d\'analyse du TCD.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le Tableau Croisé Dynamique est l\'outil roi de la synthèse financière rapide.',
                    'L\'utilisation conjointe des segmenteurs offre une ergonomie digne d\'une application décisionnelle professionnelle.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 7 pour relier les 3 états financiers (Bilan, Compte de résultat, Cash flow) dans un modèle prévisionnel.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_EXC_M6',
            moduleId: 'EXC_MOD_6',
            title: 'Évaluation Certifiante : Tableaux Croisés Dynamiques et Reporting',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_EXC_6',
                question: 'Que permet de faire un « Segmenteur » (Slicer) associé à un Tableau Croisé Dynamique ?',
                options: [
                  'Filtrer visuellement et interactivement les données en un clic via des boutons clairs',
                  'Découper la feuille de calcul en deux fichiers',
                  'Changer le format des dates',
                  'Supprimer les colonnes vides',
                ],
                correctIndex: 0,
                explanation: 'Le segmenteur est un panneau de boutons ergonomiques qui filtre instantanément un ou plusieurs TCD connectés.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 7 : MODÉLISATION PRÉVISIONNELLE 3 ÉTATS (3-STATEMENT MODEL)
    // ------------------------------------------------------------------------
    {
      id: 'EXC_NIV_7',
      pathId: 'PATH_EXCEL_MODELING_360',
      levelNumber: 7,
      title: 'Niveau 7 : Modèle Financier 3 États Connectés (3-Statement Model)',
      description: 'Lier dynamiquement le Compte de Résultat, le Bilan et le Tableau des Flux de Trésorerie sans boucle circulaire non maîtrisée.',
      targetMastery: 'Construire un modèle prévisionnel à 3 ou 5 ans équilibré au centime près.',
      modules: [
        {
          id: 'EXC_MOD_7',
          levelId: 'EXC_NIV_7',
          pathId: 'PATH_EXCEL_MODELING_360',
          moduleNumber: 7,
          title: 'Module 7 : L\'Intégration Dynamique des 3 États Financiers',
          description: 'Calcul du BFR prévisionnel, échéancier de dette, amortissements cumulés et équilibrage bilanciel par la trésorerie.',
          competencyCodes: ['EXCEL-MODELING', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'EXC_CHAP_7_1',
              moduleId: 'EXC_MOD_7',
              title: 'Chapitre 1 : Méthodologie du 3-Statement Financial Modeling',
              description: 'La clé de voûte de l\'analyse financière d\'entreprise et des fusions-acquisitions.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_EXC_07',
                  chapterId: 'EXC_CHAP_7_1',
                  moduleId: 'EXC_MOD_7',
                  pathId: 'PATH_EXCEL_MODELING_360',
                  title: 'Leçon 1 : Construction et Bouclage d\'un Modèle Financier 3 États à 3 Ans',
                  durationMinutes: 45,
                  difficulty: 'Expert',
                  objectives: [
                    'Comprendre le flux séquentiel : 1. Hypothèses opérationnelles -> 2. Compte de Résultat (Résultat Net) -> 3. Bilan (Capitaux Propres & Actifs) -> 4. Tableau des Flux de Trésorerie -> 5. Trésorerie finale réinjectée au Bilan.',
                    'Modéliser le Besoin en Fonds de Roulement prévisionnel (DSO clients, DPO fournisseurs, DIO stocks).',
                    'Calculer l\'amortissement prévisionnel et les investissements (CAPEX).',
                    'Installer une cellule de contrôle de balance : `=SI(Actif=Passif; "OK"; "DÉSÉQUILIBRE")`.',
                  ],
                  prerequisites: ['Maîtrise du Bilan et du Compte de Résultat.'],
                  contextIntro: 'Le « 3-Statement Model » est le Graal de la modélisation financière : un modèle où chaque prévision de vente met à jour automatiquement le résultat, la variation du BFR, le plan de trésorerie et le bilan sans jamais briser l\'égalité Actif = Passif. C\'est l\'outil utilisé par les banques d\'affaires pour valoriser les entreprises.',
                  theorySections: [
                    {
                      title: '1. Le Circuit Fermé de Modélisation des 3 États',
                      content: 'Le modèle fonctionne en boucle parfaite : 1. Le chiffre d\'affaires génère le résultat net au compte de résultat. 2. Le résultat net est transféré aux capitaux propres du bilan (Passif). 3. Le tableau des flux de trésorerie part du résultat net, réintègre les amortissements (non décaissés), déduit la variation du BFR et les investissements CAPEX pour dégager le Cash Flow Net. 4. Ce cash flow net modifie le solde de trésorerie disponible au Bilan (Actif). 5. L\'égalité Actif = Passif est automatiquement vérifiée.',
                      keyDefinitions: [
                        { term: '3-Statement Model', definition: 'Modèle financier interconnectant dynamiquement le compte de résultat, le bilan et le tableau des flux de trésorerie.' },
                        { term: 'CAPEX (Capital Expenditures)', definition: 'Dépenses d\'investissement consacrées à l\'acquisition ou au renouvellement des immobilisations.' },
                      ],
                      rulesAndPrinciples: [
                        'L\'équilibre du bilan ne doit JAMAIS être forcé par une formule de bouchon artificiel : il doit être le résultat mathématique naturel du cash flow calculé.',
                      ],
                      formulas: [
                        {
                          name: 'Liaison Clé de Voûte',
                          formula: 'Trésorerie Bilan(N) = Trésorerie Bilan(N-1) + Flux Net de Trésorerie de l\'Exercice(N)',
                          interpretation: 'Point de bouclage reliant le Tableau des Flux à l\'Actif du Bilan.',
                          syscohadaRef: 'Standards de Modélisation Financière Wall Street Prep / CFI',
                        },
                      ],
                      commonMistakes: [
                        'Créer une référence circulaire involontaire en calculant les intérêts financiers sur la dette moyenne qui dépend du cash final.',
                      ],
                      professionalBestPractices: [
                        'Insérer une ligne de test de vérification `ABS(Total_Actif - Total_Passif) < 0.01` affichée en haut de chaque onglet.',
                      ],
                      memorizationTips: [
                        'Résultat va au Passif, Cash va à l\'Actif, la boucle est bouclée.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Vérification de l\'équilibre bilanciel d\'un modèle',
                    scenario: 'Actif calculé = 150 000 000 FCFA. Passif calculé = 150 000 000 FCFA. Formule de contrôle en A1 : `=SI(B10=B20; "ÉQUILIBRÉ"; "ERREUR")`.',
                    dataset: { actif: 150000000, passif: 150000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Test d\'égalité', calculation: '150 000 000 = 150 000 000 -> VRAI', justification: 'L\'égalité est parfaite.' },
                      { step: 2, action: 'Indicateur visuel', calculation: 'Affiche "ÉQUILIBRÉ" en vert', justification: 'Validation de la cohérence du modèle.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Calcul de la trésorerie de fin d\'année dans le modèle',
                    scenario: 'Trésorerie début d\'année N = 20 000 000 FCFA. Flux net de trésorerie généré en N = +15 000 000 FCFA.',
                    dataset: { cashInitial: 20000000, fcf: 15000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Formule de bouclage', calculation: '`=B30 + C45` (Cash initial + Flux net de l\'année)', justification: 'Mise à jour du solde bilanciel.' },
                      { step: 2, action: 'Nouvelle trésorerie au bilan', calculation: '20 000 000 + 15 000 000 = 35 000 000 FCFA', justification: 'Ce chiffre s\'insère à l\'Actif et équilibre le Bilan.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Agro-Export de Côte d\'Ivoire (GAECI SA)',
                    locationContext: 'Abidjan, Deux-Plateaux',
                    sector: 'Agro-industrie et exportation de cacao',
                    currency: 'FCFA',
                    problemStatement: 'Pour lever 1,5 milliard FCFA auprès de la Société Financière Internationale (SFI / Banque Mondiale), GAECI devait soumettre un modèle 3 états à 5 ans auditable. Le premier jet contenait un écart de bouclage de 42 millions à l\'année 3 qui a failli faire échouer l\'instruction du dossier.',
                    financialStatements: {
                      leveeFondsVisee: 1500000000,
                      horizonModeleAns: 5,
                      ecartBouclageInitial: 42000000,
                    },
                    realWorldResolution: 'Le modélisateur senior a identifié que la variation des dettes fiscales n\'avait pas été réintégrée dans le flux de trésorerie de l\'année 3. La correction a rétabli l\'équilibre parfait à 0,00 FCFA d\'écart sur les 5 exercices. Le prêt de 1,5 milliard a été débloqué à des conditions préférentielles.',
                    recommendationToBoard: 'Soumettre tout modèle de levée de fonds à un audit de cohérence multi-scénarios par un expert certifié.',
                  },
                  guidedExercise: {
                    id: 'EX_EXC_GUIDED_07',
                    title: 'Exercice Guidé : Calcul du cash flow net d\'exploitation',
                    instruction: 'Le Résultat Net prévisionnel est de 25 000 000 FCFA. Les dotations aux amortissements (charges non décaissées à réintégrer) sont de 8 000 000 FCFA. La hausse du BFR a absorbé 5 000 000 FCFA de cash. Quel est le Cash Flow d\'Exploitation généré (en FCFA, formule : Résultat + Amortissements - Hausse BFR) ?',
                    dataset: { resultat: 25000000, amortissements: 8000000, hausseBFR: 5000000 },
                    stepByStepHelp: [
                      '1. Capacité d\'autofinancement = 25 000 000 + 8 000 000 = 33 000 000 FCFA.',
                      '2. Cash flow après BFR = 33 000 000 - 5 000 000 FCFA.',
                    ],
                    expectedAnswer: 28000000,
                    detailedCorrection: 'Cash Flow d\'Exploitation = 25M + 8M - 5M = 28 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_EXC_AUTO_07',
                    title: 'Exercice Autonome : Trésorerie finale de bouclage',
                    instruction: 'La trésorerie initiale au 1er janvier est de 12 000 000 FCFA. Les flux nets de l\'année se décomposent en : Cash flow d\'exploitation = +20 000 000 FCFA, Investissements CAPEX = -15 000 000 FCFA, Remboursement d\'emprunt = -7 000 000 FCFA. Quel est le montant de la Trésorerie finale au 31 décembre à reporter au Bilan ?',
                    dataset: { initial: 12000000, exploitat: 20000000, capex: 15000000, emprunt: 7000000 },
                    hints: [
                      'Flux net total = 20M - 15M - 7M = -2 000 000 FCFA.',
                      'Trésorerie finale = 12 000 000 - 2 000 000 FCFA.',
                    ],
                    expectedAnswer: 10000000,
                    detailedCorrection: 'Trésorerie finale = 12M + (20M - 15M - 7M) = 10 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_EXC_SIM_07',
                    title: 'Atelier Pratique : Bouclage du 3-Statement Model dans l\'Excel Lab',
                    type: 'simulator',
                    targetComponentId: 'excel_lab',
                    completionCriteria: {
                      metric: 'threeStatementModelBalanced',
                      targetValue: 1,
                      description: 'Lier les 3 états financiers et valider le contrôle d\'équilibre.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_EXC_07',
                      question: 'Pourquoi réintègre-t-on les dotations aux amortissements dans le calcul du tableau des flux de trésorerie ?',
                      options: [
                        'Parce que l\'amortissement est une charge purement comptable qui a réduit le résultat net mais n\'a provoqué aucune sortie d\'argent du compte bancaire',
                        'Parce que l\'amortissement est payé à la banque',
                        'Pour tricher sur le bénéfice',
                        'C\'est une erreur de calcul',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'amortissement réduit le résultat comptable sans sortir de cash : pour retrouver la liquidité réelle générée par l\'activité, il faut obligatoirement le réadditionner.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le 3-Statement Model est l\'instrument suprême de la modélisation financière professionnelle.',
                    'L\'équilibre absolu du modèle démontre la parfaite compréhension des flux économiques et financiers de l\'entreprise.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 8 pour réaliser le Projet Professionnel Final de modélisation prévisionnelle certifiante.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_EXC_M7',
            moduleId: 'EXC_MOD_7',
            title: 'Évaluation Certifiante : Modélisation Intégrée des 3 États Financiers',
            passingScorePercent: 80,
            questions: [
              {
                id: 'EQ_EXC_7',
                question: 'Comment s\'assure-t-on qu\'un modèle financier 3 états est parfaitement équilibré sans artifice ?',
                options: [
                  'En vérifiant que Total Actif = Total Passif à 0,00 FCFA près sur chaque exercice, où la trésorerie est le résultat exclusif des flux du tableau de cash flow',
                  'En insérant un chiffre fixe pour forcer l\'égalité',
                  'En supprimant les dettes',
                  'En masquant les colonnes fausses',
                ],
                correctIndex: 0,
                explanation: 'L\'équilibre doit être une résultante mathématique pure et non une variable d\'ajustement forcée.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 8 : PROJET PROFESSIONNEL FINAL DE MODÉLISATION PREVISIONNELLE
    // ------------------------------------------------------------------------
    {
      id: 'EXC_NIV_8',
      pathId: 'PATH_EXCEL_MODELING_360',
      levelNumber: 8,
      title: 'Niveau 8 : Projet Professionnel Final & Modèle d\'Évaluation d\'Entreprise',
      description: 'Conception intégrale d\'un modèle financier dynamique de projection à 5 ans pour un groupe de distribution ivoirien avec analyse de sensibilité bivariée.',
      targetMastery: 'Maîtrise professionnelle complète de la modélisation financière sur tableur.',
      modules: [
        {
          id: 'EXC_MOD_8',
          levelId: 'EXC_NIV_8',
          pathId: 'PATH_EXCEL_MODELING_360',
          moduleNumber: 8,
          title: 'Module 8 : Projet de Modélisation Certifiant et Examen de Maîtrise',
          description: 'Mise en situation réelle sur un dossier d\'extension industrielle et de levée de fonds à Abidjan.',
          competencyCodes: ['EXCEL-MODELING', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'EXC_CHAP_8_1',
              moduleId: 'EXC_MOD_8',
              title: 'Chapitre 1 : Soutenance du Modèle Financier Prévisionnel',
              description: 'Audit de formule, stress-testing de sensibilité et présentation exécutive.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_EXC_08',
                  chapterId: 'EXC_CHAP_8_1',
                  moduleId: 'EXC_MOD_8',
                  pathId: 'PATH_EXCEL_MODELING_360',
                  title: 'Leçon 1 : Audit de Formules, Table de Données Bivariée et Restitution Exécutive',
                  durationMinutes: 45,
                  difficulty: 'Expert',
                  objectives: [
                    'Mettre en œuvre les outils d\'audit de formule d\'Excel (Repérer les antécédents, Repérer les dépendants, Évaluer la formule).',
                    'Construire une Table de Données à double entrée (Table d\'hypothèses de sensibilité sur Prix et Coûts).',
                    'Créer un scénario dynamique commutable par menu déroulant (Pessimiste, Médian, Optimiste via `CHOISIR()` ou `INDEX()`).',
                    'Rédiger le manuel d\'utilisation et le guide de maintenance du modèle.',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 7.'],
                  contextIntro: 'Vous êtes recruté comme Modélisateur Financier Senior pour concevoir le modèle prévisionnel qui servira à négocier une syndication bancaire de 2,5 milliards FCFA. Votre modèle doit être infaillible, dynamique et offrir des tables d\'analyse de sensibilité en temps réel.',
                  theorySections: [
                    {
                      title: '1. Les Outils d\'Audit Avancé de Formules',
                      content: 'L\'audit de formule permet de remonter la chaîne de dépendance : 1. « Repérer les antécédents » trace des flèches bleues vers toutes les cellules alimentant la formule active. 2. « Repérer les dépendants » montre quelles cellules du modèle seront impactées si vous modifiez la cellule actuelle. 3. « Évaluer la formule » permet d\'exécuter le calcul pas à pas comme un débogueur informatique.',
                      keyDefinitions: [
                        { term: 'Table de Données (Data Table)', definition: 'Outil d\'analyse de simulation d\'Excel recalculant une formule selon une ou deux variables en faisant varier les cellules d\'entrée sans recopie de formule.' },
                      ],
                      rulesAndPrinciples: [
                        'Avant toute diffusion externe, inspecter le classeur pour éliminer les cellules masquées, les noms définis brisés et les liens externes corrompus.',
                      ],
                      formulas: [
                        {
                          name: 'Sélecteur de Scénario Dynamique',
                          formula: '= CHOISIR(Numero_Scenario; Hypothese_Pessimiste; Hypothese_Mediane; Hypothese_Optimiste)',
                          interpretation: 'Permet de basculer l\'intégralité du modèle d\'un seul clic sur une cellule de sélection 1, 2 ou 3.',
                          syscohadaRef: 'Standards Professionnels de Modélisation',
                        },
                      ],
                      commonMistakes: [
                        'Laisser des formules circulaires actives qui bloquent le recalcul automatique d\'Excel.',
                      ],
                      professionalBestPractices: [
                        'Verrouiller par mot de passe les cellules de formules et ne laisser accessibles que les cellules d\'hypothèses de l\'onglet Inputs.',
                      ],
                      memorizationTips: [
                        'Auditer, Valider, Protéger, Documenter.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Formule de sélecteur de scénario avec CHOISIR',
                    scenario: 'Cellule B1 = Numéro du scénario (1 = Faible 2%, 2 = Moyen 5%, 3 = Fort 8%). Formule : `=CHOISIR(B1; 0.02; 0.05; 0.08)`.',
                    dataset: { scenarioChoisi: 2 },
                    stepByStepSolution: [
                      { step: 1, action: 'Évaluation de la formule pour B1 = 2', calculation: '`=CHOISIR(2; 0.02; 0.05; 0.08)` renvoie le 2e argument, soit 5%', justification: 'Sélection dynamique immédiate.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Table de sensibilité bivariée de la VAN',
                    scenario: 'Calcul de la sensibilité de la VAN selon 2 variables : Taux d\'actualisation en ligne (8%, 10%, 12%) et Croissance du CA en colonne (2%, 4%, 6%).',
                    dataset: { nbScenarios: 9 },
                    stepByStepSolution: [
                      { step: 1, action: 'Mise en place de la table', calculation: 'Coin supérieur gauche relié à la formule de VAN : `=C50`', justification: 'Point d\'ancrage obligatoire de la table de simulation.' },
                      { step: 2, action: 'Exécution Données > Analyse de scénarios > Table de données', calculation: 'Cellule d\'entrée en ligne = Taux WACC, Cellule d\'entrée en colonne = Taux croissance', justification: 'Excel calcule les 9 VAN simultanément.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Compagnie d\'Énergie Solaire Ivoirienne (CESI SA)',
                    locationContext: 'Abidjan & Centrale Solaire de Boundiali',
                    sector: 'Énergies renouvelables',
                    currency: 'FCFA',
                    problemStatement: 'CESI devait convaincre un consortium de bailleurs internationaux de financer un parc solaire de 50 MW pour 35 milliards FCFA. Les banquiers exigeaient un modèle prévisionnel bivarié testant la résistance du ratio de couverture de la dette (DSCR) sous différentes hypothèses d\'ensoleillement et de tarifs de rachat CIE.',
                    financialStatements: {
                      coutProjetTotal: 35000000000,
                      capaciteMW: 50,
                    },
                    realWorldResolution: 'Le modélisateur certifié a construit un modèle complet 3 états avec sélecteur de 3 scénarios météorologiques et table de sensibilité dynamique sur le DSCR. Le modèle a démontré que même dans le scénario le plus défavorable, le DSCR restait supérieur à 1,30x. Le financement de 35 milliards a été signé.',
                    recommendationToBoard: 'Conserver la structure de ce modèle financier comme matrice standard pour tous les futurs projets d\'infrastructure du groupe.',
                  },
                  guidedExercise: {
                    id: 'EX_EXC_GUIDED_08',
                    title: 'Exercice Guidé : Calcul avec sélecteur de scénario',
                    instruction: 'Le chiffre d\'affaires de base est de 100 000 000 FCFA. Le taux de croissance retenu par la formule `=CHOISIR(2; 0.05; 0.10; 0.15)` est le scénario médian de 10%. Quel est le Chiffre d\'Affaires prévisionnel de l\'année suivante (en FCFA, formule : Base x (1 + Taux)) ?',
                    dataset: { caBase: 100000000, taux: 0.10 },
                    stepByStepHelp: [
                      '1. 100 000 000 x (1 + 0,10).',
                      '2. 100 000 000 x 1,10.',
                    ],
                    expectedAnswer: 110000000,
                    detailedCorrection: 'Le CA prévisionnel est de 110 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_EXC_AUTO_08',
                    title: 'Exercice Autonome : Marge de sécurité sur modèle prévisionnel',
                    instruction: 'Le modèle prévoit 500 000 000 FCFA de chiffre d\'affaires pour un seuil de rentabilité calculé dynamiquement à 380 000 000 FCFA. Quel est le montant de la Marge de Sécurité en FCFA (CA - SR) ?',
                    dataset: { ca: 500000000, sr: 380000000 },
                    hints: [
                      '500 000 000 - 380 000 000 FCFA.',
                    ],
                    expectedAnswer: 120000000,
                    detailedCorrection: 'Marge de sécurité = 500 000 000 - 380 000 000 = 120 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_EXC_SIM_08',
                    title: 'Atelier Pratique : Mission Ultime de Modélisation Prévisionnelle Complète',
                    type: 'simulator',
                    targetComponentId: 'excel_lab',
                    completionCriteria: {
                      metric: 'financialModelMastered',
                      targetValue: 1,
                      description: 'Construire le modèle financier dynamique certifié.',
                    },
                    rubricPoints: 40,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_EXC_08',
                      question: 'Quelle est la fonction essentielle d\'une table de données de sensibilité dans un modèle financier soumis à un comité d\'investissement ?',
                      options: [
                        'Permettre d\'observer instantanément l\'impact de la variation conjointe de deux hypothèses critiques (ex: prix et volume) sur la rentabilité du projet sans modifier le modèle',
                        'Ajouter de la couleur sur la présentation',
                        'Supprimer les erreurs',
                        'Remplacer le directeur financier',
                      ],
                      correctIndex: 0,
                      explanation: 'La table de sensibilité offre aux décideurs une vision complète du spectre des risques et de la robustesse de l\'investissement.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La modélisation financière est le langage de communication universel entre l\'entreprise et ses bailleurs de fonds.',
                    'La rigueur méthodologique et la clarté de conception garantissent la crédibilité et le succès des projets d\'investissement.',
                  ],
                  nextStepRecommendation: 'Félicitations ! Vous avez validé avec succès l\'intégralité du cursus Modélisation Financière Avancée sur Tableur & Excel 360°.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_EXC_M8',
            moduleId: 'EXC_MOD_8',
            title: 'Examen Final de Maîtrise Certifiante Modélisation Financière Excel 360°',
            passingScorePercent: 80,
            questions: [
              {
                id: 'FEQ_EXC_1',
                question: 'Pourquoi l\'outil « Repérer les antécédents » d\'Excel est-il indispensable avant de valider un modèle financier complexe ?',
                options: [
                  'Il permet de visualiser graphiquement par des flèches toutes les cellules qui alimentent une formule et de détecter immédiatement une référence erronée ou décalée',
                  'Il traduit le fichier en anglais',
                  'Il calcule les impôts automatiquement',
                  'Il supprime les virus informatiques',
                ],
                correctIndex: 0,
                explanation: 'Le traçage des antécédents permet d\'auditer la logique d\'une formule et de vérifier qu\'aucune cellule parasite ne vient fausser le résultat.',
              },
            ],
          },
        },
      ],
    },
  ],

  finalProject: {
    id: 'PRJ_EXCEL_MODELING_FINAL',
    title: 'Conception d\'un Modèle Financier Prévisionnel Dynamique pour une Levée de Fonds Bancaire',
    companyContext: 'Société Ivoirienne de Logistique & Entrepôts Frigorifiques (SILEF SA) - CA : 3,5 Milliards FCFA - Abidjan Vridi',
    businessScenario: 'SILEF SA projette la construction d\'une nouvelle plateforme logistique frigorifique à San Pedro d\'un montant de 1,8 milliard FCFA. Pour convaincre un consortium de deux banques sous-régionales (BOAD et BIDC), la direction générale vous missionne pour concevoir le modèle financier prévisionnel à 5 ans respectant les standards FAST, avec compte de résultat, bilan, tableau des flux de trésorerie connectés, module de dette avec VPM et table de sensibilité de la VAN.',
    deliverablesExpected: [
      'Classeur Excel dynamique structuré en 3 blocs (Hypothèses, Moteur de calcul, Restitution)',
      'Tableau d\'amortissement de l\'emprunt bancaire complet calculé via VPM et décomposition du capital/intérêts',
      'Modèle 3 états interconnecté avec contrôle automatique d\'équilibre bilanciel',
      'Table de données de sensibilité bivariée sur le TRI et note de synthèse exécutive de 2 pages pour les banques',
    ],
    gradingRubric: [
      { criterion: 'Respect absolu de la règle zéro chiffre en dur et architecture propre', weightPercent: 30, description: 'Toutes les hypothèses isolées et documentées sans constante dans les formules.' },
      { criterion: 'Exactitude des liaisons entre les 3 états financiers (Bilan/CR/TFT)', weightPercent: 30, description: 'Équilibre bilanciel strict généré par le cash flow sans boucle circulaire.' },
      { criterion: 'Qualité du module de dette (VPM) et de la table de sensibilité bivariée', weightPercent: 25, description: 'Tableau d\'emprunt exact et table de données dynamique.' },
      { criterion: 'Ergonomie visuelle, code couleur et documentation du modèle', weightPercent: 15, description: 'Présentation professionnelle aux standards des banques d\'investissement.' },
    ],
    passingScorePercent: 80,
  },
};
