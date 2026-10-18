import { LearningPath360 } from '../../types/pedagogy360';

// ============================================================================
// PARCOURS 360° : EXPERTISE ASSURANCE & COURTAGE PROFESSIONNEL (CODE CIMA)
// 8 Niveaux progressifs, cas réels de cabinets et compagnies en Afrique de l'Ouest
// ============================================================================

export const PATH_ASSURANCE_CIMA_360: LearningPath360 = {
  id: 'PATH_ASSURANCE_CIMA_360',
  domainId: 'assurance',
  title: 'Expertise Assurance & Courtage Professionnel Code CIMA 360°',
  tagline: 'Maîtriser la souscription, le règlement des sinistres, les commissions de courtage et le respect strict de l\'Article 13 CIMA',
  description: 'Un cursus d\'excellence pratique complet dédié au droit et à la gestion des assurances dans les 14 pays membres de la CIMA (Conférence Interafricaine des Marchés d\'Assurances). De l\'analyse actuarielle des primes et taxes au traitement contentieux des sinistres, à la comptabilité d\'agence et à la solvabilité réglementaire.',
  targetRole: 'Courtier d\'Assurance / Souscripteur IARD & Vie / Responsable Sinistres / Agent Général',
  levelBadge: 'Cursus Réglementaire 8 Niveaux - Débutant à Expert',
  color: 'purple',
  iconName: 'ShieldCheck',
  version: '2.0.0',
  status: 'draft',
  estimatedHours: 48,
  prerequisites: [
    'Connaissance de base des principes de la responsabilité civile et du contrat',
    'Aptitude au calcul arithmétique des pourcentages et taxes',
    'Aucune expérience préalable requise pour aborder le Niveau 1',
  ],
  competenciesTargeted: [
    'ASSUR-CIMA',
    'ANAL-DIAGNOSTIC',
    'COMPT-SYSCOHADA',
  ],
  initialDiagnosticId: 'DIAG_ASSUR_01',
  completenessScore: 100,

  levels: [
    // ------------------------------------------------------------------------
    // NIVEAU 1 : CADRE JURIDIQUE DU CODE CIMA & ARTICLE 13
    // ------------------------------------------------------------------------
    {
      id: 'ASSUR_NIV_1',
      pathId: 'PATH_ASSURANCE_CIMA_360',
      levelNumber: 1,
      title: 'Niveau 1 : Réglementation CIMA & Règle d\'Or de l\'Article 13',
      description: 'Assimiler les fondements juridiques du contrat d\'assurance et la règle "Pas de prime, pas de garantie".',
      targetMastery: 'Identifier les obligations contractuelles et appliquer sans faute l\'Article 13 du Code CIMA.',
      modules: [
        {
          id: 'ASSUR_MOD_1',
          levelId: 'ASSUR_NIV_1',
          pathId: 'PATH_ASSURANCE_CIMA_360',
          moduleNumber: 1,
          title: 'Module 1 : Le Contrat d\'Assurance et l\'Article 13 CIMA',
          description: 'Comprendre la formation du contrat, la proposition, la police et le principe impératif du paiement préalable de la prime.',
          competencyCodes: ['ASSUR-CIMA'],
          durationHours: 6,
          chapters: [
            {
              id: 'ASSUR_CHAP_1_1',
              moduleId: 'ASSUR_MOD_1',
              title: 'Chapitre 1 : Obligation de Paiement et Entrée en Vigueur de la Garantie',
              description: 'Le décret d\'application de l\'Article 13 révisé du Code CIMA.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_ASSUR_01',
                  chapterId: 'ASSUR_CHAP_1_1',
                  moduleId: 'ASSUR_MOD_1',
                  pathId: 'PATH_ASSURANCE_CIMA_360',
                  title: 'Leçon 1 : L\'Article 13 du Code CIMA et les Conditions d\'Entrée en Vigueur',
                  durationMinutes: 45,
                  difficulty: 'Débutant',
                  objectives: [
                    'Comprendre la portée historique et économique de l\'Article 13 révisé.',
                    'Identifier la date et l\'heure exactes d\'entrée en vigueur de la couverture.',
                    'Maîtriser les exceptions légales et les modes de règlement autorisés.',
                    'Sécuriser un cabinet de courtage contre le risque d\'attestation de complaisance.',
                  ],
                  prerequisites: ['Notions élémentaires de droit civil.'],
                  contextIntro: 'Avant la réforme de l\'Article 13 du Code CIMA, les arriérés de primes paralysaient les compagnies d\'assurance dans la zone franc CFA. La réforme stipule expressément que la prise d\'effet de la garantie est subordonnée au paiement effectif de la prime par le souscripteur.',
                  theorySections: [
                    {
                      title: '1. Le Principe Fondamental "Pas de prime, pas de garantie"',
                      content: 'L\'Article 13 alinéa 1er du Code CIMA dispose : "La prise d\'effet de la garantie est subordonnée au paiement de la prime par le souscripteur. Il ne peut être délivré d\'attestation ou de certificat d\'assurance avant le paiement effectif de la prime." Tout sinistre survenu avant encaissement de la prime n\'est pas garanti.',
                      keyDefinitions: [
                        { term: 'Article 13 CIMA', definition: 'Règle d\'ordre public conditionnant la garantie au paiement préalable et effectif de la prime.' },
                        { term: 'Attestation d\'Assurance', definition: 'Document légal délivré par l\'assureur ou le courtier attestant de l\'existence d\'un contrat valide.' },
                      ],
                      rulesAndPrinciples: [
                        'Interdiction formelle de délivrer une attestation sans paiement effectif préalable.',
                        'Les chèques sans provision n\'emportent pas extinction de la dette de prime.',
                        'Le paiement entre les mains d\'un courtier habilité libère l\'assuré envers la compagnie.',
                      ],
                      formulas: [
                        {
                          name: 'Prime TTC due',
                          formula: 'Prime Nette (Pure + Chargements) + Accessoires + Taxe Unique sur les Assurances (TUA / TVA)',
                          interpretation: 'L\'intégralité de la prime TTC doit être encaissée pour déclencher la garantie.',
                          syscohadaRef: 'Code CIMA - Livre I, Titre I, Art. 13',
                        },
                      ],
                      commonMistakes: [
                        'Délivrer une attestation auto sur simple promesse de virement client.',
                        'Confondre la date de signature de la police et la date de prise d\'effet de la couverture.',
                      ],
                      professionalBestPractices: [
                        'Exiger le paiement par virement instantané, chèque certifié ou Mobile Money avant émission.',
                        'Archiver l\'avis de crédit bancaire dans le dossier de souscription sous format numérisé.',
                      ],
                      memorizationTips: [
                        'Mnémonique 3P : Paiement Préalable = Protection.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Souscription d\'une police automobile avec date d\'effet décalée',
                    scenario: 'Un automobiliste signe son contrat le 1er mai. Il paie sa prime de 180 000 FCFA par virement reçu le 5 mai à 10h. Un accident a lieu le 4 mai.',
                    dataset: { dateSignature: '01/05', datePaiement: '05/05 10:00', dateSinistre: '04/05' },
                    stepByStepSolution: [
                      { step: 1, action: 'Vérifier la condition de l\'Article 13', calculation: 'Sinistre au 04/05 < Date d\'encaissement au 05/05', justification: 'La prime n\'était pas payée à la date du sinistre.' },
                      { step: 2, action: 'Conclusion juridique', calculation: 'Refus de garantie légitime', justification: 'Le contrat n\'avait pas pris effet en vertu de l\'Article 13 CIMA.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Paiement par chèque non provisionné',
                    scenario: 'Un transporteur remet un chèque de 1 200 000 FCFA pour assurer sa flotte. L\'attestation est émise. Le chèque revient impayé 6 jours plus tard.',
                    dataset: { montantCheque: 1200000, statut: 'Impayé pour défaut de provision' },
                    stepByStepSolution: [
                      { step: 1, action: 'Constat de l\'impayé', calculation: 'Encaissement réel = 0 FCFA', justification: 'La remise d\'un chèque sans provision ne constitue pas un paiement libératoire.' },
                      { step: 2, action: 'Procédure CIMA', calculation: 'Mise en demeure sous 8 jours avec suspension de garantie', justification: 'La compagnie doit suspendre la garantie et déclarer le chèque impayé.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Cabinet de Courtage SACOMA Assurances SARL',
                    locationContext: 'Abidjan Plateau, Côte d\'Ivoire - Courtier agréé CIMA',
                    sector: 'Courtage en assurances IARD et Santé',
                    currency: 'FCFA',
                    problemStatement: 'Un chargé de clientèle a remis des attestations d\'assurance pour un parc de 15 camions représentant 18 500 000 FCFA de prime TTC sur simple bon de commande. Deux camions ont été impliqués dans un carambolage avec dommages corporels s\'élevant à 42 000 000 FCFA avant tout encaissement. La compagnie d\'assurance décline sa garantie et met en cause la responsabilité civile professionnelle du courtier.',
                    financialStatements: { primeAttendue: 18500000, primeEncaissee: 0, coutSinistre: 42000000, franchiseRCP: 5000000 },
                    realWorldResolution: 'La compagnie confirme l\'opposabilité de l\'Article 13. Le courtier est déclaré personnellement responsable pour faute lourde et doit mobiliser sa police RCP avec franchise de 5 000 000 FCFA à sa charge exclusive.',
                    recommendationToBoard: 'Bloquer informatiquement l\'impression de toute attestation ou carte rose tant que la confirmation d\'encaissement bancaire n\'a pas été validée par la comptabilité.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_ASSUR_1',
                    title: 'Calcul de la prime totale d\'une police multirisque professionnelle',
                    instruction: 'Une police multirisque a une prime nette de 400 000 FCFA. Les accessoires s\'élèvent à 15 000 FCFA. La taxe sur les contrats d\'assurance (TUA) est de 14% sur le total hors taxe. Calculez la prime TTC totale à encaisser (en FCFA).',
                    dataset: { primeNette: 400000, accessoires: 15000, tauxTUA: 0.14 },
                    stepByStepHelp: [
                      '1. Calculez la base taxable = Prime nette + Accessoires = 400 000 + 15 000 = 415 000 FCFA.',
                      '2. Calculez la taxe = 415 000 * 0.14 = 58 100 FCFA.',
                      '3. Calculez la prime TTC = 415 000 + 58 100 FCFA.',
                    ],
                    expectedAnswer: 473100,
                    detailedCorrection: 'Base taxable = 415 000 FCFA. Taxe TUA (14%) = 58 100 FCFA. Prime TTC exigible = 473 100 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_ASSUR_1',
                    title: 'Vérification de seuil d\'acompte pour flotte automobile',
                    instruction: 'Le Code CIMA autorise pour les flottes supérieures à 10 véhicules un paiement fractionné avec un acompte initial obligatoire de 50% minimum. Une entreprise doit payer 8 600 000 FCFA TTC de prime annuelle pour 12 camions. Quel est le montant minimal de l\'acompte à encaisser avant toute émission (en FCFA) ?',
                    dataset: { primeTotale: 8600000, tauxAcompteMin: 0.50 },
                    hints: ['Acompte = Prime TTC * 0,50.'],
                    expectedAnswer: 4300000,
                    detailedCorrection: 'Acompte minimal obligatoire = 8 600 000 * 0,50 = 4 300 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_ASSUR_L1_SIM',
                    title: 'Simulateur de Souscription et Contrôle Article 13',
                    type: 'simulator',
                    targetComponentId: 'brokerage_simulator',
                    presetConfig: { action: 'VERIFY_ARTICLE_13', branch: 'IARD_AUTO' },
                    completionCriteria: {
                      metric: 'article_13_compliant',
                      targetValue: true,
                      description: 'Valider une souscription en bloquant les émissions non provisionnées et en certifiant l\'encaissement préalable.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_ASSUR_1_1',
                      question: 'Quelle est la sanction encourue par un courtier qui délivre une attestation d\'assurance avant encaissement de la prime ?',
                      options: [
                        'Une simple lettre de rappel sans conséquence',
                        'Une amende administrative de la CRCA, la mise en jeu de sa responsabilité personnelle pour les sinistres et le retrait possible de l\'agrément',
                        'Une réduction de son taux de commission de 1%',
                        'Aucune, la pratique est courante et légale',
                      ],
                      correctIndex: 1,
                      explanation: 'La violation de l\'Article 13 expose l\'intermédiaire à de lourdes sanctions disciplinaires de la Commission Régionale de Contrôle des Assurances (CRCA) et à devoir indemniser les sinistres sur ses propres deniers.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'Article 13 CIMA impose le principe absolu "Pas de prime, pas de garantie".',
                    'Aucune attestation ne peut être délivrée sans encaissement préalable effectif.',
                    'Le courtier est garant de l\'encaissement sous peine d\'engager sa responsabilité civile professionnelle.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 2 pour maîtriser la tarification actuarielle, les primes pures et les chargements commerciaux.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_ASSUR_MOD_1',
            moduleId: 'ASSUR_MOD_1',
            title: 'Évaluation Certifiante : Droit CIMA & Article 13',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EA_1',
                question: 'Quand prend effet la garantie d\'une police d\'assurance souscrite le 10 juin si la prime est virée et créditée le 14 juin à 15h00 ?',
                options: [
                  'Rétroactivement au 10 juin à minuit',
                  'Le 14 juin à 15h00 au moment du crédit effectif du compte',
                  'Le 1er juillet suivant',
                  'Le lendemain de la signature du contrat',
                ],
                correctIndex: 1,
                explanation: 'La garantie prend effet à la date et heure du paiement effectif de la prime, sans rétroactivité.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 2 : TARIFICATION ACTUARIELLE & CALCUL DES PRIMES
    // ------------------------------------------------------------------------
    {
      id: 'ASSUR_NIV_2',
      pathId: 'PATH_ASSURANCE_CIMA_360',
      levelNumber: 2,
      title: 'Niveau 2 : Tarification Actuarielle & Décomposition de la Prime',
      description: 'Calculer la prime pure basée sur la fréquence et le coût moyen, et appliquer les chargements commerciaux et taxes.',
      targetMastery: 'Décomposer une prime d\'assurance de la prime pure à la prime totale TTC.',
      modules: [
        {
          id: 'ASSUR_MOD_2',
          levelId: 'ASSUR_NIV_2',
          pathId: 'PATH_ASSURANCE_CIMA_360',
          moduleNumber: 2,
          title: 'Module 2 : Calcul Actuariel des Primes Pures et Commerciales',
          description: 'Espérance mathématique du sinistre, chargements de gestion, commissions de courtage et fiscalité d\'assurance.',
          competencyCodes: ['ASSUR-CIMA', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'ASSUR_CHAP_2_1',
              moduleId: 'ASSUR_MOD_2',
              title: 'Chapitre 1 : Méthodes Actuarielles de Tarification',
              description: 'De la prime technique à la prime commerciale.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_ASSUR_02',
                  chapterId: 'ASSUR_CHAP_2_1',
                  moduleId: 'ASSUR_MOD_2',
                  pathId: 'PATH_ASSURANCE_CIMA_360',
                  title: 'Leçon 1 : Calcul de la Prime Pure, des Chargements et de la Prime Commerciale',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Calculer la fréquence sinistre et le coût moyen d\'un risque.',
                    'Déterminer la prime pure (espérance mathématique).',
                    'Calculer les chargements pour frais d\'acquisition (commissions) et de gestion.',
                    'Établir le devis commercial conforme aux barèmes agréés.',
                  ],
                  prerequisites: ['Validation du Niveau 1.'],
                  contextIntro: 'La prime d\'assurance n\'est pas fixée au hasard. Elle repose sur la loi des grands nombres et le calcul des probabilités. L\'assureur doit collecter suffisamment de primes pour indemniser l\'ensemble des sinistres attendus tout en couvrant ses frais généraux.',
                  theorySections: [
                    {
                      title: '1. Composantes Fondamentales de la Prime',
                      content: 'La Prime Pure (ou technique) correspond au coût prévisionnel des sinistres : Prime Pure = Fréquence Sinistre * Coût Moyen. Pour obtenir la Prime Nette d\'Inventaire, on ajoute les chargements de gestion et d\'acquisition : Prime Nette = Prime Pure / (1 - Taux de chargement).',
                      formulas: [
                        {
                          name: 'Prime Pure',
                          formula: 'Prime Pure = Fréquence Sinistre (F) * Coût Moyen d\'un Sinistre (CM)',
                          interpretation: 'Représente le coût mathématique strict de la mutualisation du risque.',
                          syscohadaRef: 'Principes actuariels CIMA',
                        },
                        {
                          name: 'Prime Nette Commerciale',
                          formula: 'Prime Nette = Prime Pure / (1 - Chargements de gestion - Chargements d\'acquisition)',
                          interpretation: 'Permet de couvrir les frais de fonctionnement de la compagnie et la commission du courtier.',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul de la prime pure en assurance incendie',
                    scenario: 'Dans un parc de 1 000 entrepôts, les statistiques révèlent 15 incendies par an avec un coût moyen de réparation de 8 000 000 FCFA par sinistre.',
                    dataset: { nbRisques: 1000, nbSinistres: 15, coutMoyen: 8000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la fréquence', calculation: '15 / 1000 = 0,015 (soit 1,5%)', justification: 'Probabilité annuelle d\'incendie pour un entrepôt.' },
                      { step: 2, action: 'Calcul de la prime pure', calculation: '0,015 * 8 000 000 = 120 000 FCFA', justification: 'Chaque assuré doit verser 120 000 FCFA pour constituer la réserve de sinistres.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Ajout des chargements de courtage et de gestion',
                    scenario: 'La prime pure est de 120 000 FCFA. Les chargements totaux s\'élèvent à 25% (15% commission courtier + 10% frais généraux compagnie).',
                    dataset: { primePure: 120000, tauxChargement: 0.25 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la prime nette', calculation: '120 000 / (1 - 0.25) = 120 000 / 0.75 = 160 000 FCFA', justification: 'La prime nette couvre le risque et les coûts opérationnels.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Compagnie d\'Assurance UEMOA Risques SA',
                    locationContext: 'Dakar / Abidjan / Cotonou',
                    sector: 'Compagnie d\'assurances IARD régionale',
                    currency: 'FCFA',
                    problemStatement: 'Sur la branche transport maritime, le taux de sinistralité s\'est envolé à 95% suite à des pertes de conteneurs dans les ports. La prime pure actuelle de 250 000 FCFA par voyage ne couvre plus les sinistres moyens passés à 15 000 000 FCFA pour une fréquence de 2,2%.',
                    financialStatements: { frequenceReelle: 0.022, coutMoyenReel: 15000000, primePureActuelle: 250000, primeNetteActuelle: 333333 },
                    realWorldResolution: 'La nouvelle prime pure calculée s\'élève à : 0,022 * 15 000 000 = 330 000 FCFA. Avec 25% de chargements, la prime nette est réajustée à 440 000 FCFA (+32%).',
                    recommendationToBoard: 'Soumettre le nouveau barème tarifaire à la direction technique et introduire une franchise obligatoire de 2 000 000 FCFA par conteneur avarié.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_ASSUR_2',
                    title: 'Calcul de prime pure d\'une police santé entreprise',
                    instruction: 'Pour un groupe de 200 salariés, la fréquence de consultation annuelle est de 4 actes par personne et le coût moyen remboursé par acte est de 12 500 FCFA. Calculez la prime pure par salarié (en FCFA).',
                    dataset: { actesParPersonne: 4, coutMoyenActe: 12500 },
                    stepByStepHelp: [
                      'Prime Pure = Nombre d\'actes par an * Coût moyen par acte.',
                      'Prime Pure = 4 * 12 500 = 50 000 FCFA.',
                    ],
                    expectedAnswer: 50000,
                    detailedCorrection: 'Prime pure annuelle par salarié = 4 * 12 500 = 50 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_ASSUR_2',
                    title: 'Calcul de prime nette avec chargement',
                    instruction: 'Une prime pure s\'élève à 180 000 FCFA. Les chargements totaux représentent 20% de la prime nette. Calculez la prime nette commerciale (en FCFA).',
                    dataset: { primePure: 180000, chargement: 0.20 },
                    hints: ['Prime Nette = Prime Pure / (1 - 0.20) = Prime Pure / 0.80.'],
                    expectedAnswer: 225000,
                    detailedCorrection: 'Prime Nette = 180 000 / 0,80 = 225 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_ASSUR_L2_SIM',
                    title: 'Simulateur Actuariel de Tarification et Calcul de Primes',
                    type: 'simulator',
                    targetComponentId: 'brokerage_simulator',
                    presetConfig: { action: 'CALCULATE_PREMIUM', branch: 'IARD_INCENDIE' },
                    completionCriteria: {
                      metric: 'premium_calculated',
                      targetValue: true,
                      description: 'Calibrer le tarif d\'une police multirisque industrielle en respectant le taux de chargement minimal agréé.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_ASSUR_2_1',
                      question: 'Qu\'appelle-t-on la prime pure en actuariat d\'assurance ?',
                      options: [
                        'Le montant total payé par le client avec toutes les taxes',
                        'L\'espérance mathématique des sinistres (Fréquence x Coût Moyen), hors frais de gestion et taxes',
                        'La commission versée à l\'apporteur d\'affaires',
                        'Le dividende distribué aux actionnaires',
                      ],
                      correctIndex: 1,
                      explanation: 'La prime pure représente exactement le coût statistique prévisionnel des sinistres à indemniser, sans aucun frais de structure.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Prime Pure = Fréquence Sinistre * Coût Moyen.',
                    'Prime Nette = Prime Pure / (1 - Taux de Chargements).',
                    'La tarification doit être rigoureuse pour garantir la solvabilité future de la compagnie.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 3 pour maîtriser les polices IARD et la rédaction des conditions particulières.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_ASSUR_MOD_2',
            moduleId: 'ASSUR_MOD_2',
            title: 'Évaluation Certifiante : Tarification Actuarielle CIMA',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EA_2',
                question: 'Si les sinistres augmentent plus vite que les primes encaissées, que risque la compagnie d\'assurance ?',
                options: [
                  'Une dégradation de son ratio Sinistres à Primes (S/P) et une érosion de sa marge de solvabilité',
                  'Une augmentation immédiate de son capital social',
                  'Une exonération fiscale',
                  'Aucun risque car l\'État paie toujours les sinistres',
                ],
                correctIndex: 0,
                explanation: 'Une dérive de la sinistralité dégrade le ratio S/P (>100% signifie perte technique) et menace la survie de la compagnie.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 3 : SOUSCRIPTION & GESTION DES POLICES IARD
    // ------------------------------------------------------------------------
    {
      id: 'ASSUR_NIV_3',
      pathId: 'PATH_ASSURANCE_CIMA_360',
      levelNumber: 3,
      title: 'Niveau 3 : Souscription IARD & Analyse des Risques d\'Entreprise',
      description: 'Analyser les déclarations de risques, fixer les capitaux assurés et rédiger les clauses d\'exclusion.',
      targetMastery: 'Émettre un contrat IARD conforme avec identification précise des risques aggravants.',
      modules: [
        {
          id: 'ASSUR_MOD_3',
          levelId: 'ASSUR_NIV_3',
          pathId: 'PATH_ASSURANCE_CIMA_360',
          moduleNumber: 3,
          title: 'Module 3 : La Souscription des Risques Industriels et Commerciaux',
          description: 'Multirisque professionnelle, responsabilité civile exploitation, transport de marchandises et bris de machine.',
          competencyCodes: ['ASSUR-CIMA'],
          durationHours: 6,
          chapters: [
            {
              id: 'ASSUR_CHAP_3_1',
              moduleId: 'ASSUR_MOD_3',
              title: 'Chapitre 1 : Examen du Risque et Clauses Contractuelles',
              description: 'Déclaration du risque, franchises et garanties annexes.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_ASSUR_03',
                  chapterId: 'ASSUR_CHAP_3_1',
                  moduleId: 'ASSUR_MOD_3',
                  pathId: 'PATH_ASSURANCE_CIMA_360',
                  title: 'Leçon 1 : Clauses Essentielles du Contrat IARD et Règle Proportionnelle de Prime',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Maîtriser les obligations de déclaration de l\'assuré (Art. 15 CIMA).',
                    'Distinguer la fausse déclaration intentionnelle (Art. 18 CIMA) de la non-intentionnelle (Art. 19 CIMA).',
                    'Appliquer la règle proportionnelle de prime en cas de sous-déclaration de risque.',
                  ],
                  prerequisites: ['Validation des Niveaux 1 et 2.'],
                  contextIntro: 'La sincérité des déclarations lors de la souscription conditionne l\'indemnisation future. Si l\'assuré a sous-estimé son risque pour payer moins cher, le Code CIMA applique des sanctions proportionnelles sévères lors du règlement des sinistres.',
                  theorySections: [
                    {
                      title: '1. Fausse Déclaration Non Intentionnelle (Article 19 CIMA)',
                      content: 'Si la fausse déclaration ou omission n\'est pas frauduleuse, le contrat n\'est pas nul. En cas de sinistre, l\'indemnité est réduite en proportion du taux des primes payées par rapport au taux des primes qui auraient été dues si les risques avaient été complètement et exactement déclarés.',
                      formulas: [
                        {
                          name: 'Règle Proportionnelle de Prime (RPP - Art. 19 CIMA)',
                          formula: 'Indemnité Versée = Montant du Dommage Réel * (Prime Payée / Prime Réellement Due)',
                          interpretation: 'L\'assuré n\'est indemnisé qu\'au prorata de l\'effort de prime réellement consenti.',
                          syscohadaRef: 'Code CIMA - Livre I, Titre I, Art. 19',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Application de l\'Art. 19 pour omission d\'activité à risque',
                    scenario: 'Un commerçant déclare un magasin de vêtements (prime : 150 000 FCFA). En réalité, il stocke des solvants et peintures inflammables (prime normale : 300 000 FCFA). Un incendie cause 10 000 000 FCFA de dégâts.',
                    dataset: { primePayee: 150000, primeDue: 300000, dommage: 10000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du ratio de prime', calculation: '150 000 / 300 000 = 0,50 (50%)', justification: 'L\'assuré n\'a payé que la moitié de la prime correspondant au risque réel.' },
                      { step: 2, action: 'Calcul de l\'indemnité réduite', calculation: '10 000 000 * 0,50 = 5 000 000 FCFA', justification: 'Application stricte de l\'Article 19 CIMA.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Fausse déclaration intentionnelle (Art. 18 CIMA)',
                    scenario: 'L\'assuré a délibérément dissimulé deux sinistres incendies majeurs antérieurs pour obtenir un tarif préférentiel.',
                    dataset: { intentionnelle: true },
                    stepByStepSolution: [
                      { step: 1, action: 'Qualification juridique', calculation: 'Nullité absolue du contrat (Art. 18 CIMA)', justification: 'La mauvaise foi et la réticence intentionnelle entraînent la nullité du contrat.' },
                      { step: 2, action: 'Conséquences financières', calculation: 'Indemnité = 0 FCFA et primes échues conservées par l\'assureur', justification: 'Sanction légale du dol en droit CIMA.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Usine Textile des Savanes (UTS SA)',
                    locationContext: 'Bouaké, Côte d\'Ivoire - Zone Industrielle',
                    sector: 'Filature et tissage de coton',
                    currency: 'FCFA',
                    problemStatement: 'UTS SA a assuré son usine pour une prime de 4 500 000 FCFA en déclarant un système d\'extinction automatique par sprinklers fonctionnel. L\'expertise après incendie (dommages de 180 000 000 FCFA) prouve que les sprinklers étaient désactivés depuis 2 ans pour travaux. Sans sprinklers, la prime technique aurait été de 7 500 000 FCFA.',
                    financialStatements: { dommageReel: 180000000, primePayee: 4500000, primeDue: 7500000 },
                    realWorldResolution: 'La compagnie applique l\'Article 19 CIMA (RPP) : Ratio = 4 500 000 / 7 500 000 = 60%. Indemnité finale versée = 180 000 000 * 60% = 108 000 000 FCFA. La perte sèche non indemnisée pour UTS s\'élève à 72 000 000 FCFA.',
                    recommendationToBoard: 'Mettre en place un audit trimestriel de conformité des organes de sécurité incendie certifié par un bureau de contrôle indépendant.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_ASSUR_3',
                    title: 'Calcul de réduction proportionnelle de prime',
                    instruction: 'Un sinistre bris de machine cause 25 000 000 FCFA de dommages. L\'assuré avait payé une prime de 1 200 000 FCFA au lieu de 1 600 000 FCFA suite à une inexactitude non frauduleuse. Calculez l\'indemnité due par la compagnie (en FCFA).',
                    dataset: { dommage: 25000000, payee: 1200000, due: 1600000 },
                    stepByStepHelp: [
                      '1. Calculez le ratio de prime = 1 200 000 / 1 600 000 = 0.75.',
                      '2. Multipliez par le dommage = 25 000 000 * 0.75.',
                    ],
                    expectedAnswer: 18750000,
                    detailedCorrection: 'Indemnité = 25 000 000 * (1 200 000 / 1 600 000) = 18 750 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_ASSUR_3',
                    title: 'Impact d\'une sous-déclaration sur l\'indemnisation',
                    instruction: 'Dommage constaté : 60 000 000 FCFA. Prime payée : 3 000 000 FCFA. Prime qui aurait dû être payée : 5 000 000 FCFA. Quelle est l\'indemnité finale payée à l\'assuré (en FCFA) ?',
                    dataset: { dommage: 60000000, payee: 3000000, due: 5000000 },
                    hints: ['Indemnité = Dommage * (Prime Payée / Prime Due).'],
                    expectedAnswer: 36000000,
                    detailedCorrection: 'Indemnité = 60 000 000 * (3 000 000 / 5 000 000) = 60 000 000 * 0,60 = 36 000 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_ASSUR_L3_SIM',
                    title: 'Simulateur d\'Arbitrage Souscription et Clauses CIMA',
                    type: 'simulator',
                    targetComponentId: 'brokerage_simulator',
                    presetConfig: { action: 'AUDIT_POLICY_CLAUSES', branch: 'IARD_ENTREPRISE' },
                    completionCriteria: {
                      metric: 'clauses_validated',
                      targetValue: true,
                      description: 'Détecter les anomalies de déclaration et appliquer la clause de sanction proportionnelle adéquate.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_ASSUR_3_1',
                      question: 'Quelle est la sanction prévue par l\'Article 18 du Code CIMA en cas de réticence ou de fausse déclaration intentionnelle ?',
                      options: [
                        'La nullité absolue du contrat d\'assurance avec conservation des primes échues par l\'assureur',
                        'Une réduction de prime de 10%',
                        'Le paiement immédiat du double du sinistre',
                        'Une médiation à l\'amiable obligatoire',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'Article 18 sanctionne la mauvaise foi délibérée par la nullité totale du contrat : l\'assuré ne perçoit aucune indemnité et perd ses primes.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'Article 18 CIMA sanctionne le dol par la nullité absolue du contrat.',
                    'L\'Article 19 CIMA applique la règle proportionnelle de prime (RPP) en cas de bonne foi.',
                    'La rigueur du questionnaire de souscription protège l\'assuré contre toute surprise lors du sinistre.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 4 pour maîtriser l\'expertise et la liquidation des sinistres.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_ASSUR_MOD_3',
            moduleId: 'ASSUR_MOD_3',
            title: 'Évaluation Certifiante : Souscription & Droit des Contrats IARD',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EA_3',
                question: 'Pourquoi l\'assureur applique-t-il la règle proportionnelle de capitaux (RPC - Art. 35 CIMA) si le bien est sous-assuré à 50% de sa valeur réelle ?',
                options: [
                  'Parce que l\'assuré n\'a contribué au fonds commun de mutualisation qu\'à hauteur de la moitié de la valeur en risque',
                  'Pour pénaliser arbitrairement le souscripteur',
                  'Parce que les impôts l\'exigent',
                  'Pour augmenter les dividendes de la banque',
                ],
                correctIndex: 0,
                explanation: 'La sous-assurance prive la communauté des assurés des primes nécessaires pour couvrir la valeur réelle exposée ; l\'indemnité est donc réduite au prorata.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 4 : LIQUIDATION DES SINISTRES & RÈGLE PROPORTIONNELLE DE CAPITAUX
    // ------------------------------------------------------------------------
    {
      id: 'ASSUR_NIV_4',
      pathId: 'PATH_ASSURANCE_CIMA_360',
      levelNumber: 4,
      title: 'Niveau 4 : Règlement des Sinistres, Expertise & Franchises',
      description: 'Instruire un dossier sinistre, missionner un expert, calculer la franchise et appliquer l\'Article 35 CIMA.',
      targetMastery: 'Déterminer l\'indemnité exacte due à l\'assuré net de franchise et de vétusté.',
      modules: [
        {
          id: 'ASSUR_MOD_4',
          levelId: 'ASSUR_NIV_4',
          pathId: 'PATH_ASSURANCE_CIMA_360',
          moduleNumber: 4,
          title: 'Module 4 : L\'Instruction et le Règlement des Sinistres IARD',
          description: 'Rapport d\'expertise, franchise absolue ou proportionnelle, recours contre tiers et quittance subrogative.',
          competencyCodes: ['ASSUR-CIMA', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'ASSUR_CHAP_4_1',
              moduleId: 'ASSUR_MOD_4',
              title: 'Chapitre 1 : Mécanismes d\'Indemnisation et Règle Proportionnelle de Capitaux',
              description: 'Sous-assurance, franchise et recours subrogatoire.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_ASSUR_04',
                  chapterId: 'ASSUR_CHAP_4_1',
                  moduleId: 'ASSUR_MOD_4',
                  pathId: 'PATH_ASSURANCE_CIMA_360',
                  title: 'Leçon 1 : Règle Proportionnelle de Capitaux (Art. 35 CIMA) et Déduction des Franchises',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Maîtriser la formule de la Règle Proportionnelle de Capitaux (Art. 35 CIMA).',
                    'Distinguer franchise absolue, franchise proportionnelle et franchise en jours.',
                    'Calculer l\'indemnité finale nette de franchise et de vétusté.',
                    'Établir la quittance subrogative pour exercer le recours contre le tiers responsable.',
                  ],
                  prerequisites: ['Validation du Niveau 3.'],
                  contextIntro: 'Lors d\'un sinistre, l\'expert évalue deux montants capitaux : le montant des dommages réels et la valeur totale réelle des biens assurés au jour du sinistre. Si la valeur déclarée au contrat est inférieure à la valeur réelle, la règle proportionnelle de capitaux s\'applique automatiquement.',
                  theorySections: [
                    {
                      title: '1. Règle Proportionnelle de Capitaux (Article 35 CIMA)',
                      content: 'S\'il résulte des estimations que la valeur de la chose assurée excède la somme garantie au contrat, l\'assuré reste son propre assureur pour l\'excédent et supporte, en conséquence, une part proportionnelle du dommage.',
                      formulas: [
                        {
                          name: 'Indemnité selon RPC (Art. 35 CIMA)',
                          formula: 'Indemnité Brute = Montant du Dommage Réel * (Capital Garanti au Contrat / Valeur Réelle des Biens au Jour du Sinistre)',
                          interpretation: 'Si le capital garanti est inférieur à la valeur réelle, le sinistre n\'est payé que partiellement.',
                          syscohadaRef: 'Code CIMA - Livre I, Titre I, Art. 35',
                        },
                        {
                          name: 'Indemnité Nette',
                          formula: 'Indemnité Nette = Indemnité Brute - Franchise Contractuelle',
                          interpretation: 'La franchise reste toujours à la charge finale de l\'assuré.',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul de sous-assurance avec dommage partiel',
                    scenario: 'Un magasin déclare son stock pour un capital garanti de 20 000 000 FCFA. Lors d\'un dégât des eaux, l\'expert constate des dommages de 6 000 000 FCFA, mais évalue la valeur totale réelle du stock à 30 000 000 FCFA. Franchise absolue = 500 000 FCFA.',
                    dataset: { capitalGaranti: 20000000, valeurReelle: 30000000, dommage: 6000000, franchise: 500000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du taux de couverture', calculation: '20 000 000 / 30 000 000 = 2/3 (66,67%)', justification: 'Le stock n\'était assuré qu\'aux deux tiers de sa valeur.' },
                      { step: 2, action: 'Calcul de l\'indemnité brute', calculation: '6 000 000 * (20M / 30M) = 4 000 000 FCFA', justification: 'Application de l\'Art. 35 CIMA.' },
                      { step: 3, action: 'Déduction de la franchise', calculation: '4 000 000 - 500 000 = 3 500 000 FCFA', justification: 'Montant du chèque d\'indemnisation remis à l\'assuré.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Franchise proportionnelle avec minimum et maximum',
                    scenario: 'Contrat prévoyant une franchise de 10% du montant du sinistre avec un minimum de 200 000 FCFA et un maximum de 1 000 000 FCFA. Dommage calculé = 8 000 000 FCFA.',
                    dataset: { dommage: 8000000, tauxFranchise: 0.10, min: 200000, max: 1000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du montant théorique de franchise', calculation: '8 000 000 * 0.10 = 800 000 FCFA', justification: 'Entre 200 000 et 1 000 000 FCFA.' },
                      { step: 2, action: 'Calcul de l\'indemnité nette', calculation: '8 000 000 - 800 000 = 7 200 000 FCFA', justification: 'Franchise de 800 000 FCFA déduite.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Supermarché Étoile du Sud SARL',
                    locationContext: 'Abidjan Marcory - Grande distribution',
                    sector: 'Commerce de détail alimentaire',
                    currency: 'FCFA',
                    problemStatement: 'Un incendie dans l\'entrepôt central provoque 45 000 000 FCFA de pertes de denrées. Le contrat garantit 50 000 000 FCFA de stocks. L\'expert assermenté mandaté par la compagnie démontre, d\'après le grand livre des stocks à la veille du sinistre, que la valeur réelle présente dans l\'entrepôt était de 100 000 000 FCFA. Franchise contractuelle = 2 000 000 FCFA.',
                    financialStatements: { capitalContrat: 50000000, stockReelComptable: 100000000, dommages: 45000000, franchise: 2000000 },
                    realWorldResolution: 'Application de l\'Art. 35 CIMA : Indemnité Brute = 45 000 000 * (50M / 100M) = 22 500 000 FCFA. Après déduction de la franchise de 2M, le règlement net est de 20 500 000 FCFA. L\'assuré supporte 24 500 000 FCFA de perte non couverte par sa faute.',
                    recommendationToBoard: 'Souscrire une police d\'assurance avec clause de révision d\'indexation ou déclaration mensuelle de valeur de stock pour les entreprises de négoce à forte rotation.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_ASSUR_4',
                    title: 'Calcul guidé d\'indemnisation avec sous-assurance et franchise',
                    instruction: 'Bâtiment assuré pour 80 000 000 FCFA. Valeur réelle à neuf au jour du sinistre : 120 000 000 FCFA. Dommages chiffrés : 15 000 000 FCFA. Franchise absolue : 1 000 000 FCFA. Calculez le montant du chèque de règlement net (en FCFA).',
                    dataset: { garanti: 80000000, reel: 120000000, dommage: 15000000, franchise: 1000000 },
                    stepByStepHelp: [
                      '1. Indemnité Brute = 15 000 000 * (80 000 000 / 120 000 000) = 15 000 000 * (2/3) = 10 000 000 FCFA.',
                      '2. Déduire la franchise = 10 000 000 - 1 000 000 = 9 000 000 FCFA.',
                    ],
                    expectedAnswer: 9000000,
                    detailedCorrection: 'Indemnité nette = [15 000 000 * (80M / 120M)] - 1 000 000 = 10 000 000 - 1 000 000 = 9 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_ASSUR_4',
                    title: 'Calcul autonome de règlement net',
                    instruction: 'Matériel industriel assuré pour 30 000 000 FCFA. Valeur réelle : 40 000 000 FCFA. Dommage : 8 000 000 FCFA. Franchise : 500 000 FCFA. Quel est le montant net versé à l\'assuré (en FCFA) ?',
                    dataset: { garanti: 30000000, reel: 40000000, dommage: 8000000, franchise: 500000 },
                    hints: ['Indemnité Brute = 8 000 000 * (30 / 40) = 6 000 000 FCFA. Déduisez la franchise.'],
                    expectedAnswer: 5500000,
                    detailedCorrection: 'Indemnité brute = 8 000 000 * 0,75 = 6 000 000 FCFA. Indemnité nette = 6 000 000 - 500 000 = 5 500 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_ASSUR_L4_SIM',
                    title: 'Simulateur d\'Indemnisation et Liquidation de Sinistre',
                    type: 'simulator',
                    targetComponentId: 'brokerage_simulator',
                    presetConfig: { action: 'SETTLE_CLAIM', branch: 'IARD_SINISTRE' },
                    completionCriteria: {
                      metric: 'claim_settled_accurately',
                      targetValue: true,
                      description: 'Calculer la quittance finale de sinistre en appliquant la RPC et les franchises contractuelles.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_ASSUR_4_1',
                      question: 'Quand la règle proportionnelle de capitaux (Art. 35 CIMA) ne s\'applique-t-elle PAS ?',
                      options: [
                        'Lorsque la valeur réelle au jour du sinistre est égale ou inférieure au capital garanti au contrat',
                        'Quand le sinistre a lieu pendant le week-end',
                        'Quand la prime a été payée en espèces',
                        'Quand l\'assureur est une société étrangère',
                      ],
                      correctIndex: 0,
                      explanation: 'Si les capitaux souscrits couvrent 100% ou plus de la valeur réelle des biens, il n\'y a pas de sous-assurance, donc la RPC ne s\'applique pas (indemnisation intégrale du dommage sous déduction de la franchise).',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Article 35 CIMA : sous-assurance = réduction proportionnelle de l\'indemnité.',
                    'La franchise contractuelle est déduite après application éventuelle de la RPC.',
                    'La valeur réelle au jour du sinistre est établie par le rapport d\'expertise contradictoire.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 5 pour explorer les spécificités de l\'assurance vie, prévoyance et épargne retraite.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_ASSUR_MOD_4',
            moduleId: 'ASSUR_MOD_4',
            title: 'Évaluation Certifiante : Gestion et Règlement des Sinistres',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EA_4',
                question: 'Qu\'est-ce qu\'une quittance subrogative signée par l\'assuré lors de son indemnisation ?',
                options: [
                  'Un document par lequel l\'assuré reconnaît avoir reçu son indemnité et transfère à l\'assureur ses droits et actions contre le tiers responsable du sinistre',
                  'Une résiliation immédiate du contrat sans remboursement',
                  'Une décharge fiscale',
                  'Un reçu de paiement de prime',
                ],
                correctIndex: 0,
                explanation: 'La quittance subrogative permet à l\'assureur d\'exercer le recours légal contre le responsable pour récupérer l\'indemnité avancée (Art. 42 CIMA).',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 5 : ASSURANCE VIE, CAPITALISATION & PRÉVOYANCE
    // ------------------------------------------------------------------------
    {
      id: 'ASSUR_NIV_5',
      pathId: 'PATH_ASSURANCE_CIMA_360',
      levelNumber: 5,
      title: 'Niveau 5 : Assurance Vie, Épargne & Prévoyance Retraite',
      description: 'Tables de mortalité, taux technique garanti, valeur de rachat et clause bénéficiaire.',
      targetMastery: 'Modéliser l\'évolution d\'une police d\'épargne avec participation aux bénéfices.',
      modules: [
        {
          id: 'ASSUR_MOD_5',
          levelId: 'ASSUR_NIV_5',
          pathId: 'PATH_ASSURANCE_CIMA_360',
          moduleNumber: 5,
          title: 'Module 5 : Les Contrats d\'Assurance de Personnes et Capitalisation',
          description: 'Décès, mixte, retraite complémentaire, rachat total/partiel et avance sur police.',
          competencyCodes: ['ASSUR-CIMA', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'ASSUR_CHAP_5_1',
              moduleId: 'ASSUR_MOD_5',
              title: 'Chapitre 1 : Mécanismes Financiers de l\'Assurance Vie CIMA',
              description: 'Provision mathématique, rachat et fiscalité des rentes.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_ASSUR_05',
                  chapterId: 'ASSUR_CHAP_5_1',
                  moduleId: 'ASSUR_MOD_5',
                  pathId: 'PATH_ASSURANCE_CIMA_360',
                  title: 'Leçon 1 : Provision Mathématique, Valeur de Rachat et Participation aux Bénéfices',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Comprendre le rôle de la provision mathématique dans les contrats vie.',
                    'Calculer la valeur de rachat après 2 ans de cotisations (Art. 67 CIMA).',
                    'Maîtriser les règles d\'attribution de la participation aux bénéfices (PB minimale 85%).',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 4.'],
                  contextIntro: 'Contrairement aux assurances IARD qui fonctionnent par répartition annuelle, les contrats d\'assurance vie reposent sur la capitalisation à long terme. L\'assureur constitue pour chaque souscripteur une provision mathématique individualisée.',
                  theorySections: [
                    {
                      title: '1. Droit au Rachat et Provision Mathématique (Article 67 CIMA)',
                      content: 'Dès lors que deux années de primes ont été intégralement payées, l\'assuré a le droit légal et d\'ordre public d\'exiger le rachat de sa police ou de solliciter une avance. L\'assureur est tenu de verser la valeur de rachat dans un délai maximal de 60 jours.',
                      formulas: [
                        {
                          name: 'Participation aux Bénéfices Réglementaire',
                          formula: 'PB Minimale = 85% des bénéfices techniques et financiers réalisés sur les fonds gérés',
                          interpretation: 'Obligation légale CIMA pour protéger les épargnants.',
                          syscohadaRef: 'Code CIMA - Livre I, Titre II',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul de valeur de rachat après 5 ans',
                    scenario: 'Un assuré a accumulé 4 000 000 FCFA de provision mathématique. Le contrat prévoit une pénalité de rachat de 3% pendant les 10 premières années.',
                    dataset: { provisionMathematique: 4000000, penaliteTaux: 0.03 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la pénalité', calculation: '4 000 000 * 0,03 = 120 000 FCFA', justification: 'Frais de sortie anticipée prévus au contrat.' },
                      { step: 2, action: 'Calcul du chèque de rachat', calculation: '4 000 000 - 120 000 = 3 880 000 FCFA', justification: 'Montant versé au souscripteur.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Avance sur police d\'assurance vie',
                    scenario: 'L\'assuré a besoin temporairement de 2 000 000 FCFA sans résilier son contrat. Sa provision mathématique est de 3 500 000 FCFA. Le Code CIMA autorise les avances jusqu\'à 95% de la provision mathématique.',
                    dataset: { pm: 3500000, demande: 2000000, plafond: 0.95 },
                    stepByStepSolution: [
                      { step: 1, action: 'Vérifier l\'éligibilité', calculation: '3 500 000 * 0,95 = 3 325 000 FCFA de plafond', justification: 'Le montant demandé de 2M est inférieur au plafond autorisé.' },
                      { step: 2, action: 'Effet sur la police', calculation: 'La police reste active, l\'assuré remboursera le prêt avec un intérêt modéré', justification: 'Maintien de la garantie décès au profit des bénéficiaires.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Société Minière d\'Ity (SMI SA)',
                    locationContext: 'Zouan-Hounien, Côte d\'Ivoire - Exploitation aurifère',
                    sector: 'Industrie extractive',
                    currency: 'FCFA',
                    problemStatement: 'SMI SA a souscrit une police de prévoyance collective retraite pour 450 cadres avec un versement annuel de 120 000 000 FCFA. Au bout de 4 ans, 25 cadres partent en départ volontaire. La direction RH demande la liquidation de leurs droits individuels sans pénalité excessive.',
                    financialStatements: { cotisationsTotales: 480000000, provisionsPartants: 38500000, participationBenefices: 2800000 },
                    realWorldResolution: 'La compagnie établit le relevé des provisions mathématiques individuelles augmentées de la participation aux bénéfices de 2,8M FCFA. Les droits transférables sont versés sans pénalité sur le compte épargne de chaque cadre.',
                    recommendationToBoard: 'Inclure une convention de portabilité des droits à pension dans les contrats de travail des cadres conformément au Code du travail et au Code CIMA.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_ASSUR_5',
                    title: 'Calcul de participation aux bénéfices d\'un fonds épargne',
                    instruction: 'La compagnie a réalisé 18 000 000 FCFA de bénéfices financiers nets sur le portefeuille épargne. En vertu du Code CIMA, 85% de ce bénéfice doit être distribué aux assurés au prorata de leur provision. Quel est le montant global attribué aux assurés (en FCFA) ?',
                    dataset: { benefice: 18000000, tauxMinPB: 0.85 },
                    stepByStepHelp: [
                      'Montant distribué = 18 000 000 * 0.85 = 15 300 000 FCFA.',
                    ],
                    expectedAnswer: 15300000,
                    detailedCorrection: 'Le montant obligatoire attribué aux provisions des assurés est de 15 300 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_ASSUR_5',
                    title: 'Calcul de la valeur de rachat net',
                    instruction: 'Provision mathématique constituée : 6 500 000 FCFA. Frais de rachat contractuels : 2,5%. Quel est le montant net perçu par l\'assuré (en FCFA) ?',
                    dataset: { pm: 6500000, frais: 0.025 },
                    hints: ['Frais = 6 500 000 * 0,025 = 162 500. Rachat net = 6 500 000 - 162 500.'],
                    expectedAnswer: 6337500,
                    detailedCorrection: 'Valeur de rachat net = 6 500 000 - 162 500 = 6 337 500 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_ASSUR_L5_SIM',
                    title: 'Simulateur d\'Épargne Retraite et Rachat Vie',
                    type: 'simulator',
                    targetComponentId: 'brokerage_simulator',
                    presetConfig: { action: 'LIFE_SAVINGS_SIMULATION', branch: 'ASSURANCE_VIE' },
                    completionCriteria: {
                      metric: 'surrender_value_calculated',
                      targetValue: true,
                      description: 'Calculer la trajectoire d\'une police mixte vie avec taux technique et participation aux bénéfices.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_ASSUR_5_1',
                      question: 'Quelle est la condition légale minimale pour qu\'un contrat d\'assurance vie comporte une valeur de rachat exigible selon le Code CIMA ?',
                      options: [
                        'Le paiement d\'au moins deux années complètes de primes d\'assurance',
                        'Le paiement d\'une seule prime mensuelle',
                        'Avoir atteint l\'âge de 65 ans',
                        'L\'accord unanime de tous les bénéficiaires',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'Article 67 CIMA subordonne le droit au rachat au paiement effectif d\'au moins deux années entières de cotisations.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'assurance vie fonctionne par capitalisation et constitution de provisions mathématiques.',
                    'Droit au rachat et à l\'avance après 2 ans de primes (Art. 67 CIMA).',
                    'Participation aux bénéfices minimale de 85% des rendements financiers.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 6 pour maîtriser la comptabilité d\'agence et les commissions de courtage.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_ASSUR_MOD_5',
            moduleId: 'ASSUR_MOD_5',
            title: 'Évaluation Certifiante : Assurance Vie & Prévoyance CIMA',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EA_5',
                question: 'Pourquoi le capital versé au bénéficiaire désigné d\'une assurance décès n\'entre-t-il pas dans la succession de l\'assuré ?',
                options: [
                  'En vertu de la stipulation pour autrui qui attribue le capital directement au bénéficiaire hors succession',
                  'Parce que l\'argent est anonyme',
                  'Pour éviter les frais d\'obsèques',
                  'C\'est une décision discrétionnaire du courtier',
                ],
                correctIndex: 0,
                explanation: 'L\'assurance vie bénéficie d\'un régime civil et fiscal protecteur : le capital revient directement au bénéficiaire désigné hors masse successorale.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 6 : COMPTABILITÉ D'AGENCE & COMMISSIONS DE COURTAGE
    // ------------------------------------------------------------------------
    {
      id: 'ASSUR_NIV_6',
      pathId: 'PATH_ASSURANCE_CIMA_360',
      levelNumber: 6,
      title: 'Niveau 6 : Comptabilité d\'Intermédiation & Reversements aux Compagnies',
      description: 'Tenue des comptes de courtage, encaissements de primes, retenue des commissions et reversements nets.',
      targetMastery: 'Établir le bordereau mensuel de reversement compagnie et sécuriser les fonds de primes.',
      modules: [
        {
          id: 'ASSUR_MOD_6',
          levelId: 'ASSUR_NIV_6',
          pathId: 'PATH_ASSURANCE_CIMA_360',
          moduleNumber: 6,
          title: 'Module 6 : Les Flux Financiers de l\'Intermédiaire d\'Assurance',
          description: 'Compte spécial de primes, séparation des patrimoines, calcul des commissions (10% à 20%) et TVA d\'intermédiation.',
          competencyCodes: ['ASSUR-CIMA', 'COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'ASSUR_CHAP_6_1',
              moduleId: 'ASSUR_MOD_6',
              title: 'Chapitre 1 : Le Traitement Comptable des Primes et Commissions',
              description: 'Bordereaux de courtage, compte 471/401 et rapprochement des primes.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_ASSUR_06',
                  chapterId: 'ASSUR_CHAP_6_1',
                  moduleId: 'ASSUR_MOD_6',
                  pathId: 'PATH_ASSURANCE_CIMA_360',
                  title: 'Leçon 1 : Enregistrement des Primes Encaissées, Déduction des Commissions et Bordereau de Reversement',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Comprendre le statut juridique des fonds de primes détenus par le courtier (fonds de tiers).',
                    'Calculer la commission de courtage sur la prime nette (ex : 15% en auto, 20% en incendie).',
                    'Établir le bordereau de reversement net à la compagnie d\'assurance.',
                    'Comptabiliser les flux au journal selon le SYSCOHADA.',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 5.'],
                  contextIntro: 'Le courtier encaisse les primes pour le compte des compagnies d\'assurance. Ces fonds ne lui appartiennent pas : ils constituent des fonds de tiers qui doivent transiter par un compte bancaire dédié et être reversés dans les délais prescrits par le Code CIMA sous peine de poursuites pénales pour abus de confiance.',
                  theorySections: [
                    {
                      title: '1. Mécanisme du Reversement Net',
                      content: 'Le courtier encaisse la Prime Totale TTC du client. Il calcule sa commission contractuelle assise sur la Prime Nette d\'Inventaire. Il déduit sa commission et reverse le solde (Prime Nette restante + Accessoires + Taxes) à la compagnie d\'assurance.',
                      formulas: [
                        {
                          name: 'Commission de Courtage',
                          formula: 'Commission Brute = Prime Nette HT * Taux de Commission Agréé (10% à 20%)',
                          interpretation: 'Rémunération du courtier pour son devoir de conseil et d\'apport d\'affaires.',
                          syscohadaRef: 'Code CIMA - Livre V, Intermédiation',
                        },
                        {
                          name: 'Montant Net à Reverser à la Compagnie',
                          formula: 'Net Reversé = Prime Totale TTC Encaissée - Commission de Courtage Retenue',
                          interpretation: 'Montant effectivement viré sur le compte de la compagnie d\'assurance.',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Bordereau de reversement d\'une police automobile',
                    scenario: 'Prime nette = 200 000 FCFA. Accessoires = 10 000 FCFA. Taxe TUA (14%) = 29 400 FCFA. Total TTC encaissé du client = 239 400 FCFA. Commission du courtier = 15% sur la prime nette.',
                    dataset: { primeNette: 200000, commissionTaux: 0.15, primeTTC: 239400 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la commission', calculation: '200 000 * 0,15 = 30 000 FCFA', justification: 'Commission retenue par le courtier.' },
                      { step: 2, action: 'Calcul du net à reverser', calculation: '239 400 - 30 000 = 209 400 FCFA', justification: 'Montant à virer à la compagnie d\'assurance.' },
                      { step: 3, action: 'Contrôle de conformité', calculation: '(200 000 - 30 000) + 10 000 + 29 400 = 209 400 FCFA', justification: 'L\'égalité arithmétique est vérifiée.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Retenue à la source fiscale sur commissions d\'intermédiation',
                    scenario: 'En Côte d\'Ivoire, les commissions de courtage sont soumises à une retenue à la source au titre de l\'impôt sur les bénéfices non commerciaux (BNC / AIRSI) ou TVA selon le statut.',
                    dataset: { commissionBrute: 30000, tauxRetenue: 0.05 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la retenue', calculation: '30 000 * 0,05 = 1 500 FCFA', justification: 'Impôt versé au trésor public.' },
                      { step: 2, action: 'Commission nette encaissée', calculation: '30 000 - 1 500 = 28 500 FCFA', justification: 'Rémunération nette conservée par le cabinet.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Courtage & Assurances Conseils Ivoiriens (CACI SARL)',
                    locationContext: 'Abidjan Cocody Angré',
                    sector: 'Société de courtage d\'assurances',
                    currency: 'FCFA',
                    problemStatement: 'Lors du contrôle périodique de la CRCA, les inspecteurs découvrent un écart de trésorerie de 65 000 000 FCFA entre les primes encaissées auprès des souscripteurs et les montants reversés aux compagnies SUNU et NSIA. Le gérant a utilisé les primes encaissées pour financer les salaires et l\'agencement de nouveaux bureaux.',
                    financialStatements: { primesEncaisseesMois: 140000000, commissionsReelles: 21000000, montantReverse: 54000000, arriereDuAuxCompagnies: 65000000 },
                    realWorldResolution: 'La CRCA notifie une mise en demeure immédiate sous 30 jours sous peine de retrait d\'agrément et poursuites judiciaires. Les associés contractent un prêt d\'urgence et séparent strictement le compte "Primes d\'assurances encaissées" (compte de tiers bloqué) du compte d\'exploitation du cabinet.',
                    recommendationToBoard: 'Mettre en place une convention de virement automatique hebdomadaire vers les compagnies partenaires directement depuis le compte de séquestre des primes.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_ASSUR_6',
                    title: 'Calcul de bordereau de reversement mensuel',
                    instruction: 'Un cabinet de courtage encaisse 15 000 000 FCFA de primes TTC pour la branche Risques Divers (Prime nette HT = 12 500 000 FCFA). Le taux de commission contractuel est de 18% sur le net HT. Calculez le montant net à reverser à la compagnie (en FCFA).',
                    dataset: { primeTTC: 15000000, primeNette: 12500000, tauxCom: 0.18 },
                    stepByStepHelp: [
                      '1. Calculez la commission = 12 500 000 * 0.18 = 2 250 000 FCFA.',
                      '2. Calculez le net à reverser = Prime TTC - Commission = 15 000 000 - 2 250 000 FCFA.',
                    ],
                    expectedAnswer: 12750000,
                    detailedCorrection: 'Commission = 2 250 000 FCFA. Net à reverser à la compagnie = 15 000 000 - 2 250 000 = 12 750 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_ASSUR_6',
                    title: 'Calcul de commission de courtage',
                    instruction: 'Prime nette d\'un contrat transport maritime : 8 400 000 FCFA. Taux de commission de courtage : 12,5%. Quel est le montant de la commission brute revenant au courtier (en FCFA) ?',
                    dataset: { primeNette: 8400000, taux: 0.125 },
                    hints: ['Commission = Prime Nette * 0,125.'],
                    expectedAnswer: 1050000,
                    detailedCorrection: 'Commission = 8 400 000 * 0,125 = 1 050 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_ASSUR_L6_SIM',
                    title: 'Simulateur de Bordereaux de Courtage et Reversement Compagnie',
                    type: 'simulator',
                    targetComponentId: 'brokerage_simulator',
                    presetConfig: { action: 'GENERATE_BORDEREAU', branch: 'COURTAGE_REVERSEMENT' },
                    completionCriteria: {
                      metric: 'bordereau_balanced',
                      targetValue: true,
                      description: 'Établir un bordereau mensuel multi-compagnies avec contrôle d\'imputation de TVA et de commission.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_ASSUR_6_1',
                      question: 'Les primes d\'assurance encaissées par un courtier font-elles partie du chiffre d\'affaires de son cabinet ?',
                      options: [
                        'Non, les primes constituent des fonds de tiers destinés aux compagnies d\'assurance ; seul le montant des commissions constitue le produit d\'exploitation du courtier',
                        'Oui, la totalité des primes encaissées est enregistrée en classe 7 Ventes de services',
                        'Oui, à condition de payer la TVA',
                        'Cela dépend du bon vouloir du gérant',
                      ],
                      correctIndex: 0,
                      explanation: 'En comptabilité SYSCOHADA et selon le Code CIMA, les primes appartiennent aux compagnies d\'assurance (comptes de tiers). Seules les commissions acquises représentent le chiffre d\'affaires du cabinet.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Les primes encaissées sont des fonds de tiers protégés par la loi.',
                    'La commission de courtage s\'assied sur la prime nette d\'inventaire HT.',
                    'Le respect des délais de reversement aux compagnies est strictement surveillé par la CRCA.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 7 pour analyser les provisions techniques et le ratio S/P.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_ASSUR_MOD_6',
            moduleId: 'ASSUR_MOD_6',
            title: 'Évaluation Certifiante : Comptabilité d\'Agence & Gestion des Primes',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EA_6',
                question: 'Pourquoi la CIMA exige-t-elle l\'ouverture d\'un compte bancaire distinct pour les encaissements de primes ?',
                options: [
                  'Pour éviter la confusion des patrimoines entre les fonds des assurés/compagnies et les dépenses d\'exploitation du courtier',
                  'Pour payer moins de frais bancaires',
                  'Pour faciliter l\'octroi de crédits aux dirigeants',
                  'Ce n\'est pas exigé par la CIMA',
                ],
                correctIndex: 0,
                explanation: 'L\'obligation de ségrégation des comptes vise à protéger les primes contre tout détournement ou saisie en cas de défaillance du courtier.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 7 : PROVISIONS TECHNIQUES & RATIO S/P (SINISTRES À PRIMES)
    // ------------------------------------------------------------------------
    {
      id: 'ASSUR_NIV_7',
      pathId: 'PATH_ASSURANCE_CIMA_360',
      levelNumber: 7,
      title: 'Niveau 7 : Provisions Techniques & Indicateurs de Rentabilité (Ratio S/P)',
      description: 'Calculer les Provisions pour Sinistres à Payer (PSAP), les PREC et évaluer le ratio combiné.',
      targetMastery: 'Évaluer la solvabilité technique et financière d\'une société d\'assurance.',
      modules: [
        {
          id: 'ASSUR_MOD_7',
          levelId: 'ASSUR_NIV_7',
          pathId: 'PATH_ASSURANCE_CIMA_360',
          moduleNumber: 7,
          title: 'Module 7 : Les Provisions Techniques et le Ratio Combiné',
          description: 'PSAP dossier par dossier, méthodes statistiques (Chain Ladder), provisions pour risques en cours et marge de solvabilité.',
          competencyCodes: ['ASSUR-CIMA', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'ASSUR_CHAP_7_1',
              moduleId: 'ASSUR_MOD_7',
              title: 'Chapitre 1 : Évaluation des Engagements Techniques et Ratios Clés',
              description: 'Le ratio Sinistres / Primes (S/P) et le ratio combiné d\'exploitation.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_ASSUR_07',
                  chapterId: 'ASSUR_CHAP_7_1',
                  moduleId: 'ASSUR_MOD_7',
                  pathId: 'PATH_ASSURANCE_CIMA_360',
                  title: 'Leçon 1 : Calcul du Ratio S/P, des PSAP et du Ratio Combiné de Gestion',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Calculer le ratio Sinistres à Primes (S/P = Sinistres de l\'exercice / Primes acquises).',
                    'Calculer le ratio combiné : S/P + Ratio des Frais Généraux.',
                    'Interpréter la rentabilité technique : bénéfice si ratio combiné < 100%, perte si > 100%.',
                    'Calculer les provisions pour sinistres à payer (PSAP) avec chargement pour sinistres tardifs (IBNR).',
                  ],
                  prerequisites: ['Validation des Niveaux 1 à 6.'],
                  contextIntro: 'En assurance, le ratio S/P (Loss Ratio) est le thermomètre de la rentabilité. Associé au ratio de frais généraux, il forme le Ratio Combiné. Si le ratio combiné dépasse 100%, la compagnie perd de l\'argent sur son cœur de métier et ne survit qu\'au moyen de ses produits financiers.',
                  theorySections: [
                    {
                      title: '1. Les Indicateurs Clés de la Performance Technique',
                      content: 'Le ratio Sinistres à Primes (S/P) mesure la part des primes acquises consommée par l\'indemnisation des sinistres. Le ratio combiné ajoute les frais d\'acquisition et d\'administration.',
                      formulas: [
                        {
                          name: 'Ratio Sinistres à Primes (S/P)',
                          formula: 'Ratio S/P = (Sinistres Payés + Variation des Provisions PSAP) / Primes Acquises Nettes de Réassurance',
                          interpretation: 'Doit idéalement se situer entre 55% et 70% pour garantir l\'équilibre.',
                          syscohadaRef: 'Code CIMA - Livre III, Comptabilité des Assurances',
                        },
                        {
                          name: 'Ratio Combiné (Combined Ratio)',
                          formula: 'Ratio Combiné = Ratio S/P + (Frais Généraux d\'Exploitation / Primes Acquises)',
                          interpretation: 'Si < 100% : marge technique positive. Si > 100% : déficit technique d\'exploitation.',
                        },
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul de rentabilité technique d\'une branche auto',
                    scenario: 'Une compagnie a encaissé 500 000 000 FCFA de primes acquises. La charge totale de sinistres s\'élève à 320 000 000 FCFA. Les frais généraux représentent 125 000 000 FCFA.',
                    dataset: { primes: 500000000, sinistres: 320000000, frais: 125000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du ratio S/P', calculation: '320 000 000 / 500 000 000 = 64,0%', justification: 'Sinistralité modérée et maîtrisée.' },
                      { step: 2, action: 'Calcul du ratio de frais', calculation: '125 000 000 / 500 000 000 = 25,0%', justification: 'Poids des charges de structure.' },
                      { step: 3, action: 'Calcul du ratio combiné', calculation: '64,0% + 25,0% = 89,0%', justification: 'La compagnie dégage 11% de marge technique nette d\'exploitation.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Branche déficitaire et redressement tarifaire',
                    scenario: 'Sur la branche maladie collective, les sinistres atteignent 420 000 000 FCFA pour 400 000 000 FCFA de primes. Frais généraux = 80 000 000 FCFA.',
                    dataset: { primes: 400000000, sinistres: 420000000, frais: 80000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du S/P', calculation: '420M / 400M = 105,0%', justification: 'Les sinistres seuls dépassent déjà les primes.' },
                      { step: 2, action: 'Calcul du ratio combiné', calculation: '105% + 20% = 125,0%', justification: 'Déficit technique massif de 25% exigeant une hausse immédiate des tarifs.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Compagnie Panafricaine d\'Assurances IARD (CPA SA)',
                    locationContext: 'Abidjan / Ouagadougou / Bamako',
                    sector: 'Assurance dommages et santé',
                    currency: 'FCFA',
                    problemStatement: 'CPA SA affiche un ratio combiné consolidé de 114% en 2025. La branche automobile présente un S/P de 88% et la santé un S/P de 94%. L\'assemblée générale constate une perte d\'exploitation de 450 000 000 FCFA comblée uniquement par les plus-values d\'immeubles de placement. La CRCA menace de placer la compagnie sous surveillance renforcée.',
                    financialStatements: { primesTotales: 3200000000, sinistresTotaux: 2880000000, fraisGeneraux: 768000000, ratioCombine: 1.14 },
                    realWorldResolution: 'Plan de restructuration : 1. Résiliation des 15 polices de flottes déficitaires, 2. Hausse tarifaire de 18% sur le portefeuille santé avec introduction d\'un ticket modérateur de 20%, 3. Digitalisation des déclarations ramenant les frais généraux à 21%. Le ratio combiné redescend à 92% en 18 mois.',
                    recommendationToBoard: 'Interdire le renouvellement tacite de toute police d\'entreprise dont le S/P individuel sur les 24 derniers mois dépasse 75%.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_ASSUR_7',
                    title: 'Calcul de ratio combiné',
                    instruction: 'Primes acquises = 800 000 000 FCFA. Sinistres payés et provisionnés = 520 000 000 FCFA. Frais d\'acquisition et de gestion = 200 000 000 FCFA. Calculez le Ratio Combiné en pourcentage (ex: tapez 90 pour 90%).',
                    dataset: { primes: 800000000, sinistres: 520000000, frais: 200000000 },
                    stepByStepHelp: [
                      '1. Ratio S/P = 520 000 000 / 800 000 000 = 65%.',
                      '2. Ratio Frais = 200 000 000 / 800 000 000 = 25%.',
                      '3. Ratio Combiné = 65% + 25% = 90%.',
                    ],
                    expectedAnswer: 90,
                    detailedCorrection: 'Ratio Combiné = 65% + 25% = 90%. La marge technique s\'élève à 10%.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_ASSUR_7',
                    title: 'Calcul de ratio Sinistres à Primes (S/P)',
                    instruction: 'Une branche enregistre 240 000 000 FCFA de sinistres pour 300 000 000 FCFA de primes nettes acquises. Quel est son ratio S/P en pourcentage ?',
                    dataset: { sinistres: 240000000, primes: 300000000 },
                    hints: ['S/P = (240 000 000 / 300 000 000) * 100.'],
                    expectedAnswer: 80,
                    detailedCorrection: 'Ratio S/P = (240M / 300M) * 100 = 80%.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_ASSUR_L7_SIM',
                    title: 'Simulateur de Ratio Combiné et Solvabilité Technique',
                    type: 'simulator',
                    targetComponentId: 'brokerage_simulator',
                    presetConfig: { action: 'AUDIT_LOSS_RATIO', branch: 'ACTUARIAT_SOLVABILITE' },
                    completionCriteria: {
                      metric: 'combined_ratio_evaluated',
                      targetValue: true,
                      description: 'Diagnostiquer la profitabilité d\'un portefeuille d\'assurances et déterminer les ajustements de primes requis.',
                    },
                    rubricPoints: 50,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_ASSUR_7_1',
                      question: 'Que signifie un Ratio Combiné de 108% pour une société d\'assurance dommages ?',
                      options: [
                        'L\'activité technique d\'assurance génère une perte opérationnelle égale à 8% des primes encaissées',
                        'La compagnie est extrêmement rentable et verse 8% de dividende',
                        'Tous les sinistres ont été remboursés par la réassurance',
                        'Le capital social a doublé',
                      ],
                      correctIndex: 0,
                      explanation: 'Un ratio combiné supérieur à 100% indique que la somme des sinistres et des frais dépasse les primes collectées, matérialisant une perte technique.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Ratio S/P = Sinistres / Primes Acquises.',
                    'Ratio Combiné = S/P + Frais Généraux.',
                    'L\'équilibre technique durable impose un ratio combiné inférieur à 100%.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 8 pour préparer l\'audit de conformité CRCA et le projet professionnel certifiant.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_ASSUR_MOD_7',
            moduleId: 'ASSUR_MOD_7',
            title: 'Évaluation Certifiante : Provisions Techniques & Ratios d\'Assurance',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EA_7',
                question: 'Pourquoi la sous-évaluation délibérée des provisions pour sinistres à payer (PSAP) est-elle lourdement sanctionnée par la CIMA ?',
                options: [
                  'Parce qu\'elle masque les pertes réelles et fausse la représentation de la solvabilité de la compagnie vis-à-vis des assurés',
                  'Pour favoriser les courtiers',
                  'Pour réduire les impôts sur le revenu',
                  'Ce n\'est jamais sanctionné',
                ],
                correctIndex: 0,
                explanation: 'Sous-estimer les PSAP constitue une présentation de comptes infidèles destinée à dissimuler l\'insolvabilité de la société d\'assurance.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 8 : AUDIT RÉGLEMENTAIRE CRCA & CONTRÔLE INTERNE DU CABINET
    // ------------------------------------------------------------------------
    {
      id: 'ASSUR_NIV_8',
      pathId: 'PATH_ASSURANCE_CIMA_360',
      levelNumber: 8,
      title: 'Niveau 8 : Audit Réglementaire CIMA, Lutte Anti-Blanchiment & Projet Final',
      description: 'Audit des obligations légales, conformité LAB/FT, préparation aux contrôles de la CRCA et projet certifiant.',
      targetMastery: 'Piloter la conformité intégrale d\'un cabinet de courtage ou d\'une direction d\'assurance.',
      modules: [
        {
          id: 'ASSUR_MOD_8',
          levelId: 'ASSUR_NIV_8',
          pathId: 'PATH_ASSURANCE_CIMA_360',
          moduleNumber: 8,
          title: 'Module 8 : Contrôle Interne, Conformité CRCA et Projet Professionnel',
          description: 'Gouvernance, devoir de conseil, traçabilité des fonds, lutte contre la fraude à l\'assurance et soutenance.',
          competencyCodes: ['ASSUR-CIMA', 'ANAL-DIAGNOSTIC', 'COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'ASSUR_CHAP_8_1',
              moduleId: 'ASSUR_MOD_8',
              title: 'Chapitre 1 : Préparation aux Inspections et Audit des Procédures',
              description: 'Le guide méthodologique de contrôle des courtiers et agents généraux.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_ASSUR_08',
                  chapterId: 'ASSUR_CHAP_8_1',
                  moduleId: 'ASSUR_MOD_8',
                  pathId: 'PATH_ASSURANCE_CIMA_360',
                  title: 'Leçon 1 : Référentiel d\'Inspection de la CRCA et Examen Professionnel Certifiant',
                  durationMinutes: 45,
                  difficulty: 'Expert',
                  objectives: [
                    'Maîtriser les points de contrôle majeurs de la Commission Régionale de Contrôle des Assurances (CRCA).',
                    'Vérifier la garantie financière obligatoire et l\'assurance responsabilité civile professionnelle (RCP).',
                    'Valider les procédures de lutte contre le blanchiment de capitaux (KYC).',
                    'Achever le cursus 360° avec le projet de synthèse professionnelle.',
                  ],
                  prerequisites: ['Validation intégrale des Niveaux 1 à 7.'],
                  contextIntro: 'La CRCA veille à la protection des assurés et à la pérennité financière du marché africain. Ses inspecteurs disposent de pouvoirs d\'investigation étendus pour sanctionner les intermédiaires indélicats et suspendre les agréments ministériels.',
                  theorySections: [
                    {
                      title: '1. Les Exigences Réglementaires Fondamentales',
                      content: 'Tout intermédiaire doit justifier en permanence : 1. D\'un agrément en vigueur, 2. D\'une police d\'assurance de Responsabilité Civile Professionnelle, 3. D\'une caution financière légale, 4. Du reversement régulier des primes sans arriéré au-delà de 30 jours.',
                      rulesAndPrinciples: [
                        'Obligation d\'information précontractuelle et de conseil écrit au souscripteur.',
                        'Conservation obligatoire des dossiers de souscription et pièces comptables pendant 10 ans.',
                        'Déclaration de soupçon auprès de la CENTIF (Cellule Nationale de Traitement des Informations Financières) pour toute opération atypique.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul de la caution financière minimale obligatoire',
                    scenario: 'Le Code CIMA impose aux courtiers de souscrire une garantie financière ou caution d\'au moins 25 000 000 FCFA affectée au remboursement des fonds de primes.',
                    dataset: { cautionMin: 25000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Vérification', calculation: 'Garantie bancaire conforme si >= 25 000 000 FCFA', justification: 'Condition suspensive du maintien de l\'agrément CIMA.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Régularisation des arriérés avant inspection',
                    scenario: 'Le cabinet constate 8 000 000 FCFA de primes en retard de reversement depuis 45 jours. Il émet un virement d\'urgence avant l\'arrivée des commissaires-contrôleurs.',
                    dataset: { retard: 8000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Régularisation', calculation: 'Virement de 8 000 000 FCFA et rapprochement bancaire transmis à la compagnie', justification: 'Évite la notification d\'un grief majeur par la mission CRCA.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Cabinet Général de Gestion des Assurances (CGGA SARL)',
                    locationContext: 'Abidjan Treichville, Côte d\'Ivoire',
                    sector: 'Courtage d\'assurances entreprises',
                    currency: 'FCFA',
                    problemStatement: 'Une inspection de la CRCA pointe trois manquements critiques : absence de rapprochement bancaire hebdomadaire sur le compte primes, émission d\'attestations automobiles sans justificatif d\'encaissement préalable (violation Art. 13) et défaut de formation LAB/FT des chargés de clientèle.',
                    financialStatements: { primesAnnuelleGerees: 650000000, ecartCaisse: 4200000, sanctionsPotentielles: 15000000 },
                    realWorldResolution: 'Le cabinet mandate un auditeur senior pour déployer un système de gestion intégré conforme CIMA, forme 100% de ses équipes aux procédures KYC et dépose un rapport de conformité satisfaisant la CRCA.',
                    recommendationToBoard: 'Désigner un responsable de la conformité (Compliance Officer) indépendant rattaché directement à la gérance.',
                  },
                  guidedExercise: {
                    id: 'EX_GUIDED_ASSUR_8',
                    title: 'Calcul de couverture de la garantie financière',
                    instruction: 'Un cabinet de courtage encaisse en moyenne 80 000 000 FCFA de primes mensuelles. Sa caution bancaire actuelle est de 25 000 000 FCFA. La réglementation recommande une couverture d\'au moins 50% de l\'encours moyen mensuel. Quel est le montant recommandé de caution (en FCFA) ?',
                    dataset: { encoursMensuel: 80000000, ratioRecommande: 0.50 },
                    stepByStepHelp: [
                      'Caution recommandée = 80 000 000 * 0.50 = 40 000 000 FCFA.',
                    ],
                    expectedAnswer: 40000000,
                    detailedCorrection: 'Caution financière recommandée = 40 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_AUTO_ASSUR_8',
                    title: 'Contrôle de conformité de reversement',
                    instruction: 'Primes encaissées au cours du mois : 50 000 000 FCFA. Commissions acquises déductibles : 7 500 000 FCFA. Montant déjà viré : 38 000 000 FCFA. Quel est le solde restant à virer impérativement aux compagnies avant la clôture (en FCFA) ?',
                    dataset: { encaisses: 50000000, com: 7500000, dejaVire: 38000000 },
                    hints: ['Net dû = 50 000 000 - 7 500 000 = 42 500 000 FCFA. Solde = 42 500 000 - 38 000 000.'],
                    expectedAnswer: 4500000,
                    detailedCorrection: 'Solde restant dû = (50 000 000 - 7 500 000) - 38 000 000 = 4 500 000 FCFA.',
                    rubricPoints: 30,
                  },
                  practicalActivity: {
                    id: 'ACT_ASSUR_L8_SIM',
                    title: 'Mission Gamifiée / Cas Réel : Audit Intégral d\'un Cabinet de Courtage',
                    type: 'game_mission',
                    targetComponentId: 'game_mission',
                    missionId: 'MISSION_03', // Risque et Conformité Réglementaire
                    completionCriteria: {
                      metric: 'mission_score_percent',
                      targetValue: 80,
                      description: 'Réussir l\'audit de conformité réglementaire CIMA avec un score supérieur ou égal à 80%.',
                    },
                    rubricPoints: 100,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_ASSUR_8_1',
                      question: 'Quel est l\'organe souverain chargé de la régulation et du contrôle des sociétés et intermédiaires d\'assurance dans la zone CIMA ?',
                      options: [
                        'La CRCA (Commission Régionale de Contrôle des Assurances)',
                        'La Banque Centrale des États de l\'Afrique de l\'Ouest (BCEAO)',
                        'La Bourse Régionale des Valeurs Mobilières (BRVM)',
                        'Le Conseil de Sécurité de l\'ONU',
                      ],
                      correctIndex: 0,
                      explanation: 'La CRCA est l\'autorité unique de régulation et de supervision des assurances pour les 14 pays membres de la CIMA.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La CRCA contrôle le respect strict du Code CIMA et protège l\'épargne publique.',
                    'L\'intermédiaire doit maintenir une caution financière et une assurance RCP en permanence.',
                    'La séparation absolue des fonds de primes et la conformité LAB/FT sont non négociables.',
                  ],
                  nextStepRecommendation: 'Félicitations ! Vous avez achevé l\'ensemble des modules et êtes prêt pour le projet certifiant final.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_ASSUR_MOD_8',
            moduleId: 'ASSUR_MOD_8',
            title: 'Examen Final de Maîtrise Réglementaire et Technique CIMA',
            passingScorePercent: 80,
            questions: [
              {
                id: 'FEQ_ASSUR_1',
                question: 'Quelles sont les deux conséquences majeures d\'une attestation d\'assurance émise en violation de l\'Article 13 CIMA sans paiement effectif préalable ?',
                options: [
                  'Inopposabilité de la garantie en cas de sinistre par la compagnie et responsabilité personnelle civile et pénale de l\'émetteur',
                  'Une bonification de taux d\'intérêt bancaire',
                  'Une exonération de taxe sur les assurances',
                  'Aucune conséquence juridique',
                ],
                correctIndex: 0,
                explanation: 'La sanction est double : refus d\'indemnisation par la compagnie pour défaut de garantie et condamnation du courtier fautif sur ses fonds propres.',
              },
            ],
          },
        },
      ],
    },
  ],

  finalProject: {
    id: 'PRJ_ASSUR_CIMA_FINAL',
    title: 'Audit Réglementaire, Redressement Technique et Modélisation d\'un Cabinet de Courtage UEMOA',
    companyContext: 'Cabinet Ivoire Courtage & Assurances (ICA SARL) - Portefeuille géré : 1,4 Milliard FCFA - Zone CIMA',
    businessScenario: 'Le gérant d\'ICA SARL vous mandate pour réaliser l\'audit complet du portefeuille avant l\'arrivée des inspecteurs de la CRCA. Vous devez assainir les arriérés de primes en application de l\'Article 13, vérifier les taux de commissions perçus, recalculer les quittances de sinistres contestées sous l\'Article 35 (RPC) et modéliser le ratio combiné prévisionnel.',
    deliverablesExpected: [
      'Rapport d\'audit de conformité CIMA et revue des encaissements Article 13',
      'Tableau de bord de liquidation de 5 sinistres majeurs avec application de la RPC et des franchises',
      'Bordereau mensuel consolidé de reversement aux compagnies partenaires avec contrôle de trésorerie',
      'Plan stratégique de redressement du ratio combiné santé et auto sur 24 mois',
    ],
    gradingRubric: [
      { criterion: 'Rigueur juridique et citation exacte des articles du Code CIMA', weightPercent: 30, description: 'Application sans faille des Articles 13, 18, 19, 35 et 67.' },
      { criterion: 'Exactitude des calculs de primes, commissions et décomptes de sinistres', weightPercent: 30, description: 'Calculs de taxes, commissions et indemnités nettes vérifiables au centime près.' },
      { criterion: 'Pertinence du diagnostic actuariel et ratio combiné', weightPercent: 20, description: 'Identification précise des branches déficitaires et mesures correctives.' },
      { criterion: 'Qualité des recommandations exécutives au conseil de gérance', weightPercent: 20, description: 'Mesures actionnables pour sécuriser l\'agrément et la pérennité du cabinet.' },
    ],
    passingScorePercent: 80,
  },
};
