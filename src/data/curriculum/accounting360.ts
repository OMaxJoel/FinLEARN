import { LearningPath360 } from '../../types/pedagogy360';

// ============================================================================
// PARCOURS 360° : COMPTABLE GÉNÉRAL & AUDITEUR SYSCOHADA RÉVISÉ
// 8 Niveaux progressifs, cas réels PME en FCFA, simulateurs comptables déterministes
// ============================================================================

export const PATH_COMPTA_SYSCOHADA_360: LearningPath360 = {
  id: 'PATH_COMPTA_SYSCOHADA_360',
  domainId: 'comptabilite',
  title: 'Comptable Général & Auditeur SYSCOHADA Révisé 360°',
  tagline: 'Maîtriser l\'enregistrement en partie double, le contrôle des comptes, les amortissements et la liasse financière selon les normes OHADA',
  description: 'Un cursus d\'excellence pratique complet dédié aux normes comptables de l\'espace OHADA (SYSCOHADA Révisé). De l\'analyse de la pièce justificative aux écritures d\'inventaire, au rapprochement bancaire et à la confection du Bilan et Compte de résultat certifiés.',
  targetRole: 'Comptable Général / Chef Comptable PME / Auditeur Junior',
  levelBadge: 'Cursus Métier 8 Niveaux - Débutant à Avancé',
  color: 'emerald',
  iconName: 'BookOpen',
  version: '2.1.0',
  status: 'draft',
  estimatedHours: 50,
  prerequisites: [
    'Aptitude au calcul arithmétique de base et pourcentages',
    'Connaissance élémentaire des pièces commerciales (factures, reçus, chèques)',
    'Aucune expérience comptable préalable requise pour aborder le Niveau 1',
  ],
  competenciesTargeted: [
    'COMPT-SYSCOHADA',
    'ANAL-DIAGNOSTIC',
    'EXCEL-MODELING',
  ],
  initialDiagnosticId: 'DIAG_COMPT_01',
  completenessScore: 100,

  levels: [
    // ------------------------------------------------------------------------
    // NIVEAU 1 : FONDEMENTS DU PATRIMOINE & PARTIE DOUBLE
    // ------------------------------------------------------------------------
    {
      id: 'CPT_NIV_1',
      pathId: 'PATH_COMPTA_SYSCOHADA_360',
      levelNumber: 1,
      title: 'Niveau 1 : Patrimoine d\'Entreprise & Logique Débit/Crédit',
      description: 'Assimiler l\'équilibre bilanciel Actif = Passif et comprendre la circulation de la monnaie.',
      targetMastery: 'Identifier avec certitude les ressources et les emplois d\'une transaction.',
      modules: [
        {
          id: 'CPT_MOD_1',
          levelId: 'CPT_NIV_1',
          pathId: 'PATH_COMPTA_SYSCOHADA_360',
          moduleNumber: 1,
          title: 'Module 1 : L\'Équation Bilancielle et la Partie Double',
          description: 'Comprendre pourquoi tout débit entraîne un crédit équivalent et maîtriser la nomenclature des classes SYSCOHADA (classes 1 à 8).',
          competencyCodes: ['COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'CPT_CHAP_1_1',
              moduleId: 'CPT_MOD_1',
              title: 'Chapitre 1 : Les 8 Classes du Plan Comptable Général OHADA',
              description: 'Structure des comptes de bilan (1 à 5) et des comptes de gestion (6 à 8).',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CPT_01',
                  chapterId: 'CPT_CHAP_1_1',
                  moduleId: 'CPT_MOD_1',
                  pathId: 'PATH_COMPTA_SYSCOHADA_360',
                  title: 'Leçon 1 : Architecture des Classes SYSCOHADA et Écritures Fondamentales',
                  durationMinutes: 45,
                  difficulty: 'Débutant',
                  objectives: [
                    'Identifier les 8 classes de comptes du SYSCOHADA Révisé.',
                    'Distinguer les comptes d\'Actif (2, 3, 4, 5) et de Passif (1, 4, 5).',
                    'Distinguer les Charges (classe 6) des Produits (classe 7).',
                    'Enregistrer un apport en capital et un premier achat de matériel.',
                  ],
                  prerequisites: ['Aucun prérequis.'],
                  contextIntro: 'Le Système Comptable OHADA s\'applique obligatoirement dans 17 pays d\'Afrique de l\'Ouest et Centrale. Le plan comptable organise les comptes selon une logique décimale rigoureuse : 1 (Ressources durables), 2 (Actif immobilisé), 3 (Stocks), 4 (Tiers), 5 (Trésorerie), 6 (Charges), 7 (Produits), 8 (Autres charges et produits HAO).',
                  theorySections: [
                    {
                      title: '1. Règle d\'Or du Débit et du Crédit',
                      content: 'Un compte d\'Actif ou de Charge augmente par le DÉBIT et diminue par le CRÉDIT. À l\'inverse, un compte de Passif ou de Produit augmente par le CRÉDIT et diminue par le DÉBIT. Toute opération doit présenter l\'égalité arithmétique parfaite : Somme des Débits = Somme des Crédits.',
                      keyDefinitions: [
                        { term: 'Compte de Tiers (Classe 4)', definition: 'Ensemble des créances et dettes à court terme envers les clients (411), fournisseurs (401), l\'État (44) et le personnel (42).' },
                        { term: 'Imputation Comptable', definition: 'Affectation d\'une somme au débit ou au crédit d\'un compte précis du plan comptable.' },
                      ],
                      rulesAndPrinciples: [
                        'Principe de partie double absolue.',
                        'Principe de clarté et de transparence : interdiction de compenser soldes débiteurs et créditeurs.',
                      ],
                      formulas: [
                        {
                          name: 'Équation Bilancielle SYSCOHADA',
                          formula: 'Emplois (Actif) = Ressources (Passif)',
                          interpretation: 'L\'actif décrit l\'utilisation concrète des fonds mis à disposition de l\'entreprise.',
                          syscohadaRef: 'AUDCIF - Article 15',
                        },
                      ],
                      commonMistakes: [
                        'Imputer un achat de mobilier en charge 601 au lieu du compte d\'immobilisation 244 Matériel de bureau.',
                        'Inverser le sens du compte bancaire : chez nous, 521 augmente au débit lors d\'un encaissement.',
                      ],
                      professionalBestPractices: [
                        'Toujours numéroter et classer les pièces comptables chronologiquement avant saisie.',
                        'Apposer la mention « COMPTABILISÉ » avec date et numéro de pièce sur l\'original de la facture.',
                      ],
                      memorizationTips: [
                        'Classe 1 à 5 = Le Patrimoine (Bilan).',
                        'Classe 6 et 7 = L\'Activité de l\'année (Compte de résultat).',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Souscription et libération de capital social',
                    scenario: 'Création de la société PROMO-IVOIRE SARL avec un capital de 5 000 000 FCFA entièrement versé à la banque.',
                    dataset: { montant: 5000000, compteDebit: '521 Banque', compteCredit: '101 Capital social' },
                    stepByStepSolution: [
                      { step: 1, action: 'Identifier la ressource', calculation: 'Crédit 101 Capital social : 5 000 000 FCFA', justification: 'Le capital représente l\'engagement envers les associés.' },
                      { step: 2, action: 'Identifier l\'emploi', calculation: 'Débit 521 Banque : 5 000 000 FCFA', justification: 'Fonds déposés sur le compte de la société.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Acquisition d\'un véhicule de livraison par virement bancaire',
                    scenario: 'Achat d\'une camionnette pour 12 000 000 FCFA HT payée comptant par virement.',
                    dataset: { montantHT: 12000000, tva18: 2160000, totalTTC: 14160000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Immobilisation corporelle', calculation: 'Débit 245 Matériel de transport : 12 000 000 FCFA', justification: 'Actif durable conservé plus d\'un an.' },
                      { step: 2, action: 'TVA récupérable', calculation: 'Débit 4451 TVA récupérable sur immobilisations : 2 160 000 FCFA', justification: 'Créance sur le fisc.' },
                      { step: 3, action: 'Règlement bancaire', calculation: 'Crédit 521 Banque : 14 160 000 FCFA', justification: 'Sortie de fonds bancaire.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Établissements Kouamé Distribution (EKD SARL)',
                    locationContext: 'Yamoussoukro, Côte d\'Ivoire - Grossiste en Quincaillerie',
                    sector: 'Commerce de gros',
                    currency: 'FCFA',
                    problemStatement: 'Lors du lancement, le gérant a acheté un groupe électrogène de 6 500 000 FCFA TTC et l\'a passé en charge d\'entretien 624 au lieu d\'immobilisation 241, créant un déficit artificiel dès le premier mois.',
                    financialStatements: {
                      chiffreAffaires: 18000000,
                      achatGroupeTTC: 6500000,
                      resultatDeclareFaux: -2100000,
                      resultatReelCorrige: 3400000,
                    },
                    realWorldResolution: 'Extourne de la charge 624 et enregistrement régulier au débit du compte 241 Matériel industriel pour la valeur HT (5 508 475 FCFA) et TVA 4451 (991 525 FCFA). Le résultat d\'exploitation redevient bénéficiaire.',
                    recommendationToBoard: 'Soumettre toute facture supérieure à 1 000 000 FCFA à la validation préalable de l\'auditeur comptable pour qualification en immobilisation.',
                  },
                  guidedExercise: {
                    id: 'EX_CPT_GUIDED_01',
                    title: 'Exercice Guidé : Enregistrement d\'un achat d\'ordinateurs',
                    instruction: 'La société achète 3 ordinateurs portables pour son équipe commerciale d\'une valeur totale de 1 500 000 FCFA HT, TVA 18% (270 000 FCFA), réglée par chèque bancaire. Quel est le montant total débité (Immobilisation + TVA) ?',
                    dataset: { montantHT: 1500000, tvaTaux: 0.18, tvaMontant: 270000 },
                    stepByStepHelp: [
                      '1. Calculez le montant TTC total : 1 500 000 + 270 000 = 1 770 000 FCFA.',
                      '2. Les débits combinés sont Débit 244 (1 500 000) et Débit 4451 (270 000).',
                    ],
                    expectedAnswer: 1770000,
                    detailedCorrection: 'Le total débité est de 1 770 000 FCFA : Débit 244 Matériel informatique pour 1 500 000 FCFA et Débit 4451 TVA récupérable sur immobilisations pour 270 000 FCFA, contre Crédit 521 Banque pour 1 770 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CPT_AUTO_01',
                    title: 'Exercice Autonome : Rapprochement d\'un encaissement client',
                    instruction: 'Le client SODEPAL règle sa facture de 3 540 000 FCFA TTC par virement bancaire. Quel est le solde du compte 411 Client SODEPAL après cette écriture de règlement si son solde débiteur initial était de 3 540 000 FCFA ? Entrez 0.',
                    dataset: { soldeInitial: 3540000, reglement: 3540000 },
                    hints: [
                      'L\'écriture crédite le compte 411 SODEPAL pour 3 540 000 FCFA et débite 521 Banque.',
                      'Le solde après lettrage devient nul.',
                    ],
                    expectedAnswer: 0,
                    detailedCorrection: 'Le compte 411 Client est soldé : Débit initial de 3 540 000 FCFA moins Crédit de règlement de 3 540 000 FCFA = Solde nul (0 FCFA).',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CPT_SIM_01',
                    title: 'Atelier Pratique : Saisie au Journal & Partie Double dans le Simulateur SYSCOHADA',
                    type: 'simulator',
                    targetComponentId: 'accounting_simulator',
                    completionCriteria: {
                      metric: 'balancedEntries',
                      targetValue: 3,
                      description: 'Saisir 3 écritures équilibrées consécutives dans le simulateur comptable.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CPT_01',
                      question: 'Dans quelle classe du SYSCOHADA enregistre-t-on les dettes bancaires à long terme ?',
                      options: [
                        'Classe 1 : Ressources durables (Emprunts et dettes assimilées)',
                        'Classe 4 : Comptes de tiers',
                        'Classe 5 : Trésorerie',
                        'Classe 6 : Charges d\'exploitation',
                      ],
                      correctIndex: 0,
                      explanation: 'Les emprunts bancaires de plus d\'un an sont comptabilisés au compte 16 Emprunts et dettes assimilées dans la classe 1 (Ressources durables).',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Chaque flux monétaire a une cause (Crédit/Ressource) et un effet (Débit/Emploi).',
                    'Les comptes 1 à 5 décrivent le bilan permanent de l\'entité.',
                    'Le respect rigoureux des numéros de compte SYSCOHADA garantit l\'auditabilité fiscale.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 2 pour aborder les opérations courantes d\'achats, ventes et la mécanique de la déclaration de TVA.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CPT_M1',
            moduleId: 'CPT_MOD_1',
            title: 'Évaluation Certifiante : Maîtrise de la Partie Double & Classes SYSCOHADA',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CPT_1',
                question: 'Quel compte est débité lors de l\'achat de marchandises destinées à être revendues ?',
                options: [
                  'Compte 601 Achats de marchandises',
                  'Compte 701 Ventes de marchandises',
                  'Compte 101 Capital social',
                  'Compte 521 Banque',
                ],
                correctIndex: 0,
                explanation: 'L\'achat de marchandises pour revente constitue une charge d\'exploitation enregistrée au débit du compte 601.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 2 : ACHATS, VENTES ET MÉCANIQUE TVA (UEMOA)
    // ------------------------------------------------------------------------
    {
      id: 'CPT_NIV_2',
      pathId: 'PATH_COMPTA_SYSCOHADA_360',
      levelNumber: 2,
      title: 'Niveau 2 : Cycle Commercial & Réglementation Fiscale TVA',
      description: 'Facturation, déductibilité de la TVA à 18%, réductions commerciales (Rabais, Remise, Ristourne) et escomptes de règlement.',
      targetMastery: 'Établir et comptabiliser les factures DOIT et AVOIR sans anomalie fiscale.',
      modules: [
        {
          id: 'CPT_MOD_2',
          levelId: 'CPT_NIV_2',
          pathId: 'PATH_COMPTA_SYSCOHADA_360',
          moduleNumber: 2,
          title: 'Module 2 : Comptabilisation des Ventes, Achats et Déclaration de TVA',
          description: 'Calcul de la TVA nette due (TVA collectée - TVA déductible) et traitement des retours de marchandises.',
          competencyCodes: ['COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'CPT_CHAP_2_1',
              moduleId: 'CPT_MOD_2',
              title: 'Chapitre 1 : Factures Complexe et Déclaration Fiscale',
              description: 'Traitement des réductions commerciales et financières, et liquidation de la TVA mensuelle.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CPT_02',
                  chapterId: 'CPT_CHAP_2_1',
                  moduleId: 'CPT_MOD_2',
                  pathId: 'PATH_COMPTA_SYSCOHADA_360',
                  title: 'Leçon 1 : Factures avec Remise, Escompte et Liquidation de la TVA Mensuelle',
                  durationMinutes: 50,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Comptabiliser une facture avec remise commerciale sur le Net Commercial.',
                    'Distinguer les réductions commerciales (hors écriture) de l\'escompte financier (673/773).',
                    'Calculer la TVA à décaisser : TVA collectée (4431) - TVA récupérable (445).',
                    'Passer l\'écriture de liquidation et de règlement de la TVA mensuelle au Trésor Public.',
                  ],
                  prerequisites: ['Maîtrise des principes de partie double du Niveau 1.'],
                  contextIntro: 'Dans la zone UEMOA, le taux de TVA standard est de 18%. La déclaration s\'effectue avant le 15 du mois suivant. Une erreur dans la liquidation expose l\'entreprise à des pénalités d\'assiette de 25% et des intérêts de retard mensuels.',
                  theorySections: [
                    {
                      title: '1. Cascade de Calcul d\'une Facture Commerciale',
                      content: 'Le montant Brut HT subit d\'abord les réductions commerciales (Rabais, Remise, Ristourne) pour donner le NET COMMERCIAL. Les réductions commerciales n\'apparaissent JAMAIS au journal pour les achats/ventes directs. L\'Escompte financier de règlement est calculé sur le Net Commercial et s\'enregistre en charge financière (673) chez le vendeur ou en produit financier (773) chez l\'acheteur. La TVA à 18% s\'applique sur le Net Financier (ou Net Commercial s\'il n\'y a pas d\'escompte).',
                      keyDefinitions: [
                        { term: 'Net Commercial', definition: 'Montant Brut hors taxes déduction faite des remises, rabais et ristournes accordés sur la facture.' },
                        { term: 'TVA Collectée (4431)', definition: 'Dette de l\'entreprise envers l\'État collectée lors de la facturation des ventes aux clients.' },
                        { term: 'TVA Récupérable (445)', definition: 'Créance de l\'entreprise sur l\'État au titre de la taxe acquittée sur ses achats d\'exploitation.' },
                      ],
                      rulesAndPrinciples: [
                        'Les réductions commerciales sur facture initiale ne se comptabilisent pas : seul le Net Commercial est enregistré au compte 601 ou 701.',
                        'L\'escompte financier modifie la base taxable de la TVA.',
                        'TVA Nette Due = TVA Collectée - TVA Déductible sur Biens/Services - TVA Déductible sur Immobilisations.',
                      ],
                      formulas: [
                        {
                          name: 'Liquidation de la TVA',
                          formula: 'TVA à décaisser = Solde Créditeur 4431 - Solde Débiteur (4451 + 4452)',
                          interpretation: 'Si le résultat est positif, l\'entreprise doit payer au Trésor Public. Si le résultat est négatif, elle bénéficie d\'un crédit de TVA (4441) reportable.',
                          syscohadaRef: 'Code Général des Impôts (CGI) Côte d\'Ivoire - Art. 380 et AUDCIF',
                        },
                      ],
                      commonMistakes: [
                        'Comptabiliser une remise sur facture de vente au compte 709 au lieu d\'enregistrer directement le Net Commercial.',
                        'Oublier de déduire le crédit de TVA du mois précédent lors de la liquidation.',
                      ],
                      professionalBestPractices: [
                        'Rapprocher systématiquement le chiffre d\'affaires de la déclaration fiscale de TVA avec le solde du grand-livre classe 7.',
                      ],
                      memorizationTips: [
                        'R-R-R invisibles sur la facture DOIT.',
                        'Escompte = 673 pour le vendeur (charge), 773 pour l\'acheteur (produit).',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Vente de marchandises avec remise et TVA 18%',
                    scenario: 'Facture N° 102 : Vente brute de 10 000 000 FCFA, Remise 10% (1 000 000 FCFA), TVA 18%.',
                    dataset: { brutHT: 10000000, remise: 1000000, netCommercial: 9000000, tva18: 1620000, totalTTC: 10620000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du Net Commercial', calculation: '10 000 000 - 1 000 000 = 9 000 000 FCFA', justification: 'Base de comptabilisation du produit.' },
                      { step: 2, action: 'Calcul de la TVA 18%', calculation: '9 000 000 x 18% = 1 620 000 FCFA', justification: 'TVA collectée due à l\'État.' },
                      { step: 3, action: 'Écriture au journal', calculation: 'Débit 411 Clients (10 620 000) / Crédit 701 Ventes (9 000 000) et Crédit 4431 TVA Collectée (1 620 000)', justification: 'Équilibre parfait Débit = Crédit.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Liquidation de TVA mensuelle avec TVA à décaisser',
                    scenario: 'À la fin du mois, la balance fait apparaître : TVA collectée = 4 500 000 FCFA, TVA récupérable = 2 800 000 FCFA.',
                    dataset: { tvaCollectee: 4500000, tvaRecuperable: 2800000, tvaDue: 1700000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de la TVA à décaisser', calculation: '4 500 000 - 2 800 000 = 1 700 000 FCFA', justification: 'Montant à reverser à la recette des impôts.' },
                      { step: 2, action: 'Écriture de liquidation', calculation: 'Débit 4431 (4 500 000) / Crédit 445 (2 800 000) et Crédit 4441 État, TVA due (1 700 000)', justification: 'Solde des comptes transitoires et constatation de la dette fiscale.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Ivoire Négoce Matériaux (INM SA)',
                    locationContext: 'San Pedro, Côte d\'Ivoire - Zone Portuaire',
                    sector: 'Matériaux de construction',
                    currency: 'FCFA',
                    problemStatement: 'INM SA a collecté 28 000 000 FCFA de TVA sur ses ventes et dispose de 19 500 000 FCFA de TVA déductible. Le comptable a omis de liquider la déclaration au 15 du mois, déclenchant une taxation d\'office et un blocage en douane.',
                    financialStatements: {
                      chiffreAffairesTTC: 183480000,
                      tvaCollectee: 28000000,
                      tvaRecuperable: 19500000,
                      tvaNetteReelle: 8500000,
                      penalitesRedressement: 2125000,
                    },
                    realWorldResolution: 'Dépôt immédiat de la déclaration de régularisation avec paiement des 8 500 000 FCFA de TVA nette et négociation d\'une remise gracieuse des pénalités sur présentation des états financiers audités.',
                    recommendationToBoard: 'Mettre en place un calendrier fiscal automatisé avec alerte au 10 de chaque mois pour le cadrage préalable de la TVA.',
                  },
                  guidedExercise: {
                    id: 'EX_CPT_GUIDED_02',
                    title: 'Exercice Guidé : Calcul de TVA nette à reverser',
                    instruction: 'Une entreprise ivoirienne a facturé 14 160 000 FCFA TTC de ventes au taux de 18% (soit 2 160 000 FCFA de TVA collectée) et a supporté 1 350 000 FCFA de TVA récupérable sur ses achats du mois. Quel est le montant de la TVA nette due à décaisser ?',
                    dataset: { tvaCollectee: 2160000, tvaRecuperable: 1350000 },
                    stepByStepHelp: [
                      'Formule : TVA nette = TVA Collectée - TVA Récupérable.',
                      '2 160 000 - 1 350 000 FCFA.',
                    ],
                    expectedAnswer: 810000,
                    detailedCorrection: 'TVA à décaisser = 2 160 000 - 1 350 000 = 810 000 FCFA à régler au Trésor Public avant le 15 du mois suivant.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CPT_AUTO_02',
                    title: 'Exercice Autonome : Net financier avec escompte de règlement',
                    instruction: 'Une facture d\'achat présente un montant brut de 5 000 000 FCFA, une remise commerciale de 20% (1 000 000 FCFA) et un escompte de règlement de 2% pour paiement sous 8 jours. Quel est le montant du Net Financier HT ?',
                    dataset: { brut: 5000000, remise20: 1000000, escompte2: 0.02 },
                    hints: [
                      '1. Calculez le Net Commercial : 5 000 000 - 1 000 000 = 4 000 000 FCFA.',
                      '2. Calculez l\'escompte : 4 000 000 x 2% = 80 000 FCFA.',
                      '3. Net Financier = 4 000 000 - 80 000 FCFA.',
                    ],
                    expectedAnswer: 3920000,
                    detailedCorrection: 'Le Net Commercial est de 4 000 000 FCFA. L\'escompte de 2% est de 80 000 FCFA. Le Net Financier HT est de 3 920 000 FCFA (qui servira de base au calcul de la TVA 18%).',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CPT_SIM_02',
                    title: 'Atelier Pratique : Saisie de Factures Commerciales & Contrôle Fiscal',
                    type: 'simulator',
                    targetComponentId: 'accounting_simulator',
                    completionCriteria: {
                      metric: 'taxEntries',
                      targetValue: 2,
                      description: 'Saisir une facture de vente avec TVA et son règlement dans le simulateur.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CPT_02',
                      question: 'Comment comptabilise-t-on un rabais accordé sur la facture initiale de vente ?',
                      options: [
                        'Il vient directement diminuer le chiffre d\'affaires HT (seul le Net Commercial est saisi en 701)',
                        'Au débit du compte 709 Rabais, remises accordés',
                        'Au crédit du compte 601',
                        'En charge exceptionnelle',
                      ],
                      correctIndex: 0,
                      explanation: 'Les réductions commerciales sur facture de vente initiale ne font pas l\'objet d\'une écriture distincte : on enregistre directement le Net Commercial au compte 701.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le Net Commercial est la base de comptabilisation du chiffre d\'affaires ou de l\'achat HT.',
                    'La TVA est un impôt neutre pour l\'entreprise : la TVA collectée est une dette, la TVA déductible une créance.',
                    'La liquidation mensuelle permet de solder les comptes 4431 et 445 pour dégager la dette fiscale nette.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 3 pour maîtriser la gestion de la trésorerie et le rapprochement bancaire.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CPT_M2',
            moduleId: 'CPT_MOD_2',
            title: 'Évaluation Certifiante : Fiscalité de la TVA et Cycle Ventes/Achats',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CPT_2',
                question: 'Si la TVA déductible est de 6 000 000 FCFA et la TVA collectée est de 4 000 000 FCFA, quelle est la situation de l\'entreprise ?',
                options: [
                  'Elle a un Crédit de TVA de 2 000 000 FCFA reportable sur les mois suivants',
                  'Elle doit payer 2 000 000 FCFA aux impôts',
                  'Elle a réalisé une perte de 2 000 000 FCFA',
                  'Elle a une amende fiscale',
                ],
                correctIndex: 0,
                explanation: 'Lorsque la TVA déductible excède la TVA collectée, l\'entité dispose d\'un crédit de TVA (compte 4441) reportable.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 3 : TRÉSORERIE & RAPPROCHEMENT BANCAIRE
    // ------------------------------------------------------------------------
    {
      id: 'CPT_NIV_3',
      pathId: 'PATH_COMPTA_SYSCOHADA_360',
      levelNumber: 3,
      title: 'Niveau 3 : Trésorerie Opérationnelle & Rapprochement Bancaire',
      description: 'Tenue du journal de banque, caisse en FCFA, contrôle des agios et établissement de l\'état de rapprochement bancaire.',
      targetMastery: 'Pointer les relevés bancaires et réconcilier le solde comptable avec le solde bancaire.',
      modules: [
        {
          id: 'CPT_MOD_3',
          levelId: 'CPT_NIV_3',
          pathId: 'PATH_COMPTA_SYSCOHADA_360',
          moduleNumber: 3,
          title: 'Module 3 : Le Contrôle des Disponibilités et le Rapprochement Bancaire',
          description: 'Identifier les décalages de dates de valeur, les chèques en circulation et enregistrer les frais bancaires.',
          competencyCodes: ['COMPT-SYSCOHADA', 'TRES-PREVISION'],
          durationHours: 6,
          chapters: [
            {
              id: 'CPT_CHAP_3_1',
              moduleId: 'CPT_MOD_3',
              title: 'Chapitre 1 : Méthodologie du Rapprochement Bancaire',
              description: 'Tableau bilatéral de réconciliation des soldes Banque Entreprise et Banque Relevé.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CPT_03',
                  chapterId: 'CPT_CHAP_3_1',
                  moduleId: 'CPT_MOD_3',
                  pathId: 'PATH_COMPTA_SYSCOHADA_360',
                  title: 'Leçon 1 : Établissement et Lettrage de l\'État de Rapprochement Bancaire',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Comprendre l\'effet miroir entre le compte 521 chez l\'entreprise et le relevé bancaire.',
                    'Pointer les opérations communes aux deux documents.',
                    'Dresser le tableau de rapprochement pour identifier les écritures non enregistrées.',
                    'Comptabiliser les frais bancaires (631), commissions et agios découverts sur le relevé.',
                  ],
                  prerequisites: ['Maîtrise des flux de trésorerie (521/571).'],
                  contextIntro: 'Le solde du compte 521 Banque dans le grand livre de l\'entreprise concorde rarement avec le solde du relevé envoyé par la banque (SGCI, Ecobank, BICICI, etc.). Ce décalage provient de chèques émis non encore encaissés par les bénéficiaires, de virements reçus directement ou d\'agios prélevés par la banque.',
                  theorySections: [
                    {
                      title: '1. Le Principe du Compte Miroir Réciproque',
                      content: 'Le compte de la banque dans la comptabilité de l\'entreprise est un compte d\'Actif (débiteur si l\'entreprise a de l\'argent). Pour la banque, ce même compte est une dette envers son client (donc créditeur sur le relevé bancaire).',
                      keyDefinitions: [
                        { term: 'État de Rapprochement Bancaire', definition: 'Document de contrôle interne permettant de justifier l\'écart entre le solde comptable du compte 521 et le solde du relevé bancaire à une date donnée.' },
                        { term: 'Frais et Agios Bancaires (631)', definition: 'Commissions de tenue de compte, frais d\'émission de chéquiers et intérêts de découvert prélevés par la banque.' },
                      ],
                      rulesAndPrinciples: [
                        'Le rapprochement doit être effectué au moins mensuellement pour chaque compte bancaire actif.',
                        'Les opérations apparaissant sur le relevé mais absentes de la comptabilité doivent faire l\'objet d\'une écriture immédiate.',
                      ],
                      formulas: [
                        {
                          name: 'Équation du Solde Rapproché',
                          formula: 'Solde Comptable Rectifié = Solde Relevé Rectifié',
                          interpretation: 'Après intégration des écritures de régularisation, les deux soldes doivent être strictement égaux et de sens opposé.',
                          syscohadaRef: 'AUDCIF - Article 17 et Normes de Contrôle Interne',
                        },
                      ],
                      commonMistakes: [
                        'Modifier directement le solde comptable sans passer d\'écriture au journal.',
                        'Oublier de vérifier la prescription des chèques émis non présentés (validité 1 an et 8 jours dans l\'espace UEMOA).',
                      ],
                      professionalBestPractices: [
                        'Conserver les états de rapprochement signés par le responsable financier avec les copies des relevés bancaires.',
                      ],
                      memorizationTips: [
                        'Débit chez moi = Crédit chez le banquier.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Frais de tenue de compte sur relevé bancaire',
                    scenario: 'Le relevé bancaire mentionne un prélèvement de 35 400 FCFA TTC de frais de tenue de compte (dont 5 400 FCFA de taxe sur les opérations bancaires TOB).',
                    dataset: { montantHT: 30000, taxe: 5400, total: 35400 },
                    stepByStepSolution: [
                      { step: 1, action: 'Constatation de la charge de services financiers', calculation: 'Débit 6311 Frais sur comptes : 30 000 FCFA', justification: 'Rémunération du service bancaire.' },
                      { step: 2, action: 'Constatation de la taxe bancaire', calculation: 'Débit 6413 Taxes sur opérations bancaires : 5 400 FCFA', justification: 'Prélèvement fiscal d\'exploitation.' },
                      { step: 3, action: 'Sortie bancaire', calculation: 'Crédit 521 Banque : 35 400 FCFA', justification: 'Diminution du solde bancaire.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Rapprochement avec chèque émis non débité',
                    scenario: 'Solde comptable avant rapprochement = 8 500 000 FCFA. Solde relevé = 10 200 000 FCFA. Un chèque de 1 700 000 FCFA émis au fournisseur SIFCA n\'a pas encore été présenté à l\'encaissement.',
                    dataset: { soldeComptable: 8500000, soldeReleve: 10200000, chequeEnCirculation: 1700000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Analyse de l\'écart', calculation: '10 200 000 - 1 700 000 = 8 500 000 FCFA', justification: 'L\'écart s\'explique à 100% par le chèque en circulation.' },
                      { step: 2, action: 'Conclusion comptable', calculation: 'Aucune écriture à passer pour le chèque car il est déjà comptabilisé', justification: 'Le solde rapproché est de 8 500 000 FCFA.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Transport Express du Littoral (TEL SA)',
                    locationContext: 'Abidjan, Vridi - Société de transport et logistique',
                    sector: 'Logistique',
                    currency: 'FCFA',
                    problemStatement: 'TEL SA affichait un solde comptable bancaire débiteur de 14 000 000 FCFA. La banque a rejeté un virement de paie pour défaut de provision car le solde du relevé réel n\'était que de 1 200 000 FCFA à cause d\'agios et de rejets d\'effets non saisis.',
                    financialStatements: {
                      soldeLivreComptable: 14000000,
                      soldeReleveBanque: 1200000,
                      effetsImpayesNonComptabilises: 9800000,
                      agiosDecouvertNonSaisis: 3000000,
                    },
                    realWorldResolution: 'Établissement immédiat de l\'état de rapprochement, réimputation des impayés au débit des comptes clients 411 et enregistrement des 3 000 000 FCFA d\'agios au compte 671. La direction a négocié une ligne de découvert d\'urgence.',
                    recommendationToBoard: 'Automatiser la récupération quotidienne des relevés bancaires par télétransmission pour éviter tout décalage d\'information.',
                  },
                  guidedExercise: {
                    id: 'EX_CPT_GUIDED_03',
                    title: 'Exercice Guidé : Rapprochement d\'un virement client non comptabilisé',
                    instruction: 'Le relevé bancaire fait apparaître un virement reçu de 4 200 000 FCFA d\'un client, non encore saisi dans le grand livre. Le solde comptable initial est de 15 000 000 FCFA. Quel est le nouveau solde comptable après enregistrement de ce virement ?',
                    dataset: { soldeInitial: 15000000, virement: 4200000 },
                    stepByStepHelp: [
                      'L\'écriture débite le compte 521 Banque et crédite le compte 411 Client.',
                      'Le solde comptable augmente de 4 200 000 FCFA.',
                    ],
                    expectedAnswer: 19200000,
                    detailedCorrection: 'Nouveau solde comptable = 15 000 000 + 4 200 000 = 19 200 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CPT_AUTO_03',
                    title: 'Exercice Autonome : Détection d\'écart de rapprochement',
                    instruction: 'Le solde du relevé bancaire est de 22 500 000 FCFA. Deux chèques émis par l\'entreprise sont en circulation : Chèque N° 01 pour 1 500 000 FCFA et Chèque N° 02 pour 3 000 000 FCFA. Quel est le solde bancaire rectifié théorique ?',
                    dataset: { soldeReleve: 22500000, cheque1: 1500000, cheque2: 3000000 },
                    hints: [
                      'Les chèques en circulation doivent être retranchés du solde relevé de la banque.',
                      '22 500 000 - (1 500 000 + 3 000 000).',
                    ],
                    expectedAnswer: 18000000,
                    detailedCorrection: 'Solde rectifié = 22 500 000 - 4 500 000 = 18 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CPT_SIM_03',
                    title: 'Atelier Pratique : Rapprochement Bancaire sur Simulateur Comptable',
                    type: 'simulator',
                    targetComponentId: 'accounting_simulator',
                    completionCriteria: {
                      metric: 'reconciledBalance',
                      targetValue: 1,
                      description: 'Effectuer un lettrage et ajuster le solde de trésorerie.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CPT_03',
                      question: 'Quelle écriture enregistre-t-on lorsque des frais de tenue de compte apparaissent sur le relevé bancaire ?',
                      options: [
                        'Débit 631 Frais bancaires / Crédit 521 Banque',
                        'Débit 521 Banque / Crédit 701 Ventes',
                        'Débit 401 Fournisseurs / Crédit 521 Banque',
                        'Débit 101 Capital / Crédit 521 Banque',
                      ],
                      correctIndex: 0,
                      explanation: 'Les frais bancaires diminuent l\'actif bancaire (Crédit 521) et constituent une charge de services financiers (Débit 631).',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'état de rapprochement bancaire est un outil d\'audit et de sécurité indispensable contre la fraude et les erreurs.',
                    'Il permet d\'actualiser la comptabilité avec les commissions, agios et virements directs.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 4 pour construire et analyser la Balance Générale à 6 colonnes.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CPT_M3',
            moduleId: 'CPT_MOD_3',
            title: 'Évaluation Certifiante : Contrôle et Rapprochement Bancaire',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CPT_3',
                question: 'Pourquoi un chèque remis à l\'encaissement par l\'entreprise peut-il ne pas encore figurer sur son relevé bancaire ?',
                options: [
                  'En raison des délais interbancaires de compensation et de traitement',
                  'Parce que le chèque a été annulé fiscalement',
                  'Parce que la TVA n\'a pas été payée',
                  'C\'est une interdiction légale de l\'OHADA',
                ],
                correctIndex: 0,
                explanation: 'Les délais de compensation entre banques créent un décalage temporel normal entre la remise du chèque et son crédit effectif sur le compte.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 4 : BALANCE GÉNÉRALE À 6 COLONNES & CONTRÔLE DES COMPTES
    // ------------------------------------------------------------------------
    {
      id: 'CPT_NIV_4',
      pathId: 'PATH_COMPTA_SYSCOHADA_360',
      levelNumber: 4,
      title: 'Niveau 4 : Balance Générale à 6 Colonnes & Contrôle de Cohérence',
      description: 'Dresser la balance de vérification, contrôler les égalités fondamentales et lettrer les comptes auxiliaires.',
      targetMastery: 'Détecter les anomalies d\'imputation et certifier l\'équilibre de la balance générale.',
      modules: [
        {
          id: 'CPT_MOD_4',
          levelId: 'CPT_NIV_4',
          pathId: 'PATH_COMPTA_SYSCOHADA_360',
          moduleNumber: 4,
          title: 'Module 4 : La Balance de Vérification et le Grand Livre',
          description: 'Structure de la balance à 6 colonnes (Soldes d\'ouverture, Mouvements de la période, Soldes de clôture) et contrôle d\'égalité.',
          competencyCodes: ['COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'CPT_CHAP_4_1',
              moduleId: 'CPT_MOD_4',
              title: 'Chapitre 1 : Les 3 Paires de Colonnes et les Clés de Contrôle',
              description: 'Vérification arithmétique et contrôle de vraisemblance des soldes débiteurs et créditeurs.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CPT_04',
                  chapterId: 'CPT_CHAP_4_1',
                  moduleId: 'CPT_MOD_4',
                  pathId: 'PATH_COMPTA_SYSCOHADA_360',
                  title: 'Leçon 1 : Construction et Contrôle d\'une Balance à 6 Colonnes SYSCOHADA',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Comprendre la structure des 6 colonnes de la balance de vérification.',
                    'Vérifier les 3 égalités fondamentales de la balance.',
                    'Repérer un solde anormal (ex: compte client créditeur ou caisse négative).',
                    'Faire le lien direct avec le journal et le grand-livre.',
                  ],
                  prerequisites: ['Maîtrise des écritures de journal et du grand-livre.'],
                  contextIntro: 'La balance générale est le tableau de synthèse qui récapitule tous les comptes de l\'entreprise ayant fonctionné au cours de l\'exercice. Elle permet d\'établir le bilan et le compte de résultat. Dans le SYSCOHADA, la balance à 6 colonnes fournit une traçabilité totale entre le bilan d\'ouverture, les flux de l\'exercice et les soldes finaux.',
                  theorySections: [
                    {
                      title: '1. Les 3 Égalités Fondamentales de la Balance',
                      content: 'Colonne 1 & 2 : Soldes initiaux (Total Débits = Total Crédits = Total Bilan d\'ouverture). Colonne 3 & 4 : Mouvements de l\'exercice (Total Débits = Total Crédits = Total des écritures au Journal). Colonne 5 & 6 : Soldes finals (Total Soldes Débiteurs = Total Soldes Créditeurs).',
                      keyDefinitions: [
                        { term: 'Balance à 6 Colonnes', definition: 'Tableau ordonné des comptes comportant : Soldes à nouveau (D/C), Mouvements du mois/exercice (D/C), Soldes de clôture (D/C).' },
                        { term: 'Solde Anormal', definition: 'Solde dont le sens est contraire à la nature économique du compte (ex: caisse 571 créditrice = infraction pénale de caisse négative).' },
                      ],
                      rulesAndPrinciples: [
                        'Le total des mouvements de la balance doit concorder au centime près avec le total du journal centralisateur.',
                        'Une caisse négative signale une omission de recettes ou une erreur grave de saisie.',
                      ],
                      formulas: [
                        {
                          name: 'Contrôle Journal / Balance',
                          formula: 'Total Mouvements Débit Balance = Total Journal = Total Mouvements Crédit Balance',
                          interpretation: 'Preuve de l\'exhaustivité de la transcription du journal vers les comptes individuels.',
                          syscohadaRef: 'AUDCIF - Art. 18',
                        },
                      ],
                      commonMistakes: [
                        'Confondre le solde débiteur d\'un compte de produit ou le solde créditeur d\'une charge.',
                        'Valider une balance dont le total Débits ne correspond pas au total Crédits.',
                      ],
                      professionalBestPractices: [
                        'Imprimer ou archiver électroniquement la balance mensuelle après chaque clôture intermédiaire.',
                      ],
                      memorizationTips: [
                        '6 colonnes = 3 couples parfaits : Initial, Période, Final.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du solde de clôture d\'un compte client',
                    scenario: 'Compte 411 SODECI : Solde initial débiteur 500 000 FCFA. Ventes de la période débitées : 2 000 000 FCFA. Règlements crédités : 1 800 000 FCFA.',
                    dataset: { soldeInitialD: 500000, mouvementD: 2000000, mouvementC: 1800000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Total Débits', calculation: '500 000 + 2 000 000 = 2 500 000 FCFA', justification: 'Cumul des créances.' },
                      { step: 2, action: 'Total Crédits', calculation: '1 800 000 FCFA', justification: 'Cumul des encaissements.' },
                      { step: 3, action: 'Solde final', calculation: '2 500 000 - 1 800 000 = 700 000 FCFA débiteur', justification: 'Créance restante due par le client.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Détection d\'un solde anormal de caisse',
                    scenario: 'La balance affiche un compte 571 Caisse avec un total Débits de 3 000 000 FCFA et un total Crédits de 3 450 000 FCFA, soit un solde créditeur de 450 000 FCFA.',
                    dataset: { debit: 3000000, credit: 3450000, solde: -450000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Constat d\'anomalie', calculation: 'Solde = -450 000 FCFA (Créditeur)', justification: 'Une caisse physique ne peut pas contenir moins que 0 billet.' },
                      { step: 2, action: 'Audit de régularisation', calculation: 'Recherche des pièces d\'encaissement omises ou des doubles paiements', justification: 'Régularisation obligatoire avant clôture.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Pharmacie Centrale des Lagunes (PCL SARL)',
                    locationContext: 'Abidjan, Cocody - Officine pharmaceutique',
                    sector: 'Santé et pharmacie',
                    currency: 'FCFA',
                    problemStatement: 'Lors du contrôle semestriel, la balance générale présentait un écart de 1 250 000 FCFA entre le total des mouvements du journal et la balance, bloquant l\'audit pour l\'obtention d\'un crédit bancaire.',
                    financialStatements: {
                      totalJournal: 245000000,
                      totalMouvementsBalance: 243750000,
                      ecart: 1250000,
                    },
                    realWorldResolution: 'L\'auditeur a détecté qu\'une écriture d\'achat d\'antibiotiques de 1 250 000 FCFA avait été validée au journal mais non reportée dans le grand-livre informatique suite à une coupure réseau. Réindexation de la base et concordance rétablie à 245 000 000 FCFA.',
                    recommendationToBoard: 'Mettre en place une procédure de sauvegarde automatique avec contrôle d\'intégrité des tables après chaque lot de saisie.',
                  },
                  guidedExercise: {
                    id: 'EX_CPT_GUIDED_04',
                    title: 'Exercice Guidé : Calcul du total de bilan à partir des soldes de balance',
                    instruction: 'Dans une balance de clôture, les soldes des comptes d\'actif sont : Classe 2 = 12 000 000 FCFA, Classe 3 = 5 000 000 FCFA, Classe 4 Débit = 4 000 000 FCFA, Classe 5 Débit = 3 000 000 FCFA. Quel est le montant total de l\'Actif du Bilan ?',
                    dataset: { c2: 12000000, c3: 5000000, c4: 4000000, c5: 3000000 },
                    stepByStepHelp: [
                      'Total Actif = Actif Immobilisé (2) + Stocks (3) + Créances (4) + Trésorerie (5).',
                      '12 000 000 + 5 000 000 + 4 000 000 + 3 000 000 FCFA.',
                    ],
                    expectedAnswer: 24000000,
                    detailedCorrection: 'Total Actif = 12M + 5M + 4M + 3M = 24 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CPT_AUTO_04',
                    title: 'Exercice Autonome : Vérification d\'égalité de balance',
                    instruction: 'Une balance présente les soldes suivants : Total Débits des comptes de charges = 18 000 000 FCFA, Total Débits des comptes d\'actif = 32 000 000 FCFA. Les comptes de passif ont un total de crédits de 25 000 000 FCFA. Quel doit être le total des crédits des comptes de produits (classe 7) pour que la balance soit parfaitement équilibrée ?',
                    dataset: { debitsCharges: 18000000, debitsActif: 32000000, creditsPassif: 25000000 },
                    hints: [
                      'Total Débits = 18 000 000 + 32 000 000 = 50 000 000 FCFA.',
                      'Total Crédits doit égaler 50 000 000 FCFA.',
                      'Produits = 50 000 000 - 25 000 000 FCFA.',
                    ],
                    expectedAnswer: 25000000,
                    detailedCorrection: 'Total Débits = 50 000 000 FCFA. Donc Total Crédits = 50 000 000 FCFA. Produits = 50 000 000 - 25 000 000 = 25 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CPT_SIM_04',
                    title: 'Atelier Pratique : Édition et Contrôle de Balance à 6 Colonnes',
                    type: 'simulator',
                    targetComponentId: 'accounting_simulator',
                    completionCriteria: {
                      metric: 'trialBalanceGenerated',
                      targetValue: 1,
                      description: 'Générer et contrôler la balance générale équilibrée.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CPT_04',
                      question: 'Que signifie un compte Fournisseurs (401) présentant un solde débiteur dans la balance ?',
                      options: [
                        'L\'entreprise a versé une avance ou un acompte au fournisseur, ou a payé deux fois une facture',
                        'C\'est une situation normale',
                        'Le fournisseur doit payer de la TVA à l\'entreprise',
                        'Le compte est clôturé',
                      ],
                      correctIndex: 0,
                      explanation: 'Un compte fournisseur débiteur est une anomalie temporaire signalant un acompte versé (qui doit être reclassé au compte 409) ou un trop-perçu à régulariser.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'La balance générale est le juge de paix de la comptabilité : aucune erreur de partie double ne peut y échapper.',
                    'L\'analyse critique des soldes anormaux est la première tâche de l\'auditeur comptable.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 5 pour maîtriser les travaux d\'inventaire et le calcul des amortissements.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CPT_M4',
            moduleId: 'CPT_MOD_4',
            title: 'Évaluation Certifiante : Contrôle et Équilibre de la Balance Générale',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CPT_4',
                question: 'Si le total des débits du journal est de 150 000 000 FCFA, que doit valoir le total des mouvements crédits de la balance ?',
                options: [
                  'Exactement 150 000 000 FCFA',
                  'Moins de 150 000 000 FCFA après déduction de la TVA',
                  'Plus de 150 000 000 FCFA avec les amortissements',
                  'Ce total dépend du résultat net',
                ],
                correctIndex: 0,
                explanation: 'L\'égalité absolue du journal et de la balance impose que Mouvements Débit = Mouvements Crédit = Total Journal.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 5 : INVENTAIRE, AMORTISSEMENTS LINÉAIRES ET DÉGRESSIFS
    // ------------------------------------------------------------------------
    {
      id: 'CPT_NIV_5',
      pathId: 'PATH_COMPTA_SYSCOHADA_360',
      levelNumber: 5,
      title: 'Niveau 5 : Opérations d\'Inventaire & Dotations aux Amortissements',
      description: 'Calcul des plans d\'amortissement selon les règles SYSCOHADA et comptabilisation des dotations (compte 681).',
      targetMastery: 'Dresser un tableau d\'amortissement complet et passer les écritures de fin d\'exercice.',
      modules: [
        {
          id: 'CPT_MOD_5',
          levelId: 'CPT_NIV_5',
          pathId: 'PATH_COMPTA_SYSCOHADA_360',
          moduleNumber: 5,
          title: 'Module 5 : L\'Amortissement des Immobilisations Corporelles et Incorporelles',
          description: 'Calcul de la base amortissable, durée d\'utilité, prorata temporis et dépréciation cumulée (compte 28).',
          competencyCodes: ['COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'CPT_CHAP_5_1',
              moduleId: 'CPT_MOD_5',
              title: 'Chapitre 1 : Méthodes et Écritures d\'Amortissement',
              description: 'Règles fiscales et comptables de dépréciation des actifs durables.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CPT_05',
                  chapterId: 'CPT_CHAP_5_1',
                  moduleId: 'CPT_MOD_5',
                  pathId: 'PATH_COMPTA_SYSCOHADA_360',
                  title: 'Leçon 1 : Calcul de l\'Amortissement Linéaire et Comptabilisation SYSCOHADA',
                  durationMinutes: 45,
                  difficulty: 'Intermédiaire',
                  objectives: [
                    'Définir la base amortissable (Coût d\'acquisition HT - Valeur résiduelle).',
                    'Calculer l\'annuité linéaire avec prorata temporis en jours/mois.',
                    'Comptabiliser la dotation aux amortissements : Débit 6813 / Crédit 28.',
                    'Calculer la Valeur Nette Comptable (VNC) figurant au bilan.',
                  ],
                  prerequisites: ['Maîtrise de la classe 2 Immobilisations.'],
                  contextIntro: 'L\'amortissement constate la dépréciation irréversible de la valeur d\'une immobilisation résultant de l\'usage, du temps ou de l\'obsolescence technique. Selon le SYSCOHADA, l\'amortissement est obligatoire même en cas d\'absence de bénéfice, en vertu du principe de prudence.',
                  theorySections: [
                    {
                      title: '1. Mécanique de l\'Amortissement Linéaire',
                      content: 'Le taux linéaire est égal à 100 / Durée d\'utilité (en années). Exemples de durées usuelles dans l\'OHADA : Bâtiments = 20 ans (5%), Matériel industriel = 5 à 10 ans (10-20%), Matériel de transport = 4 à 5 ans (20-25%), Matériel informatique = 3 ans (33,33%). L\'annuité est proportionnelle au temps d\'utilisation pendant l\'exercice (prorata temporis à compter de la mise en service).',
                      keyDefinitions: [
                        { term: 'Valeur Nette Comptable (VNC)', definition: 'Valeur d\'origine brute de l\'actif diminuée du cumul des amortissements et des pertes de valeur.' },
                        { term: 'Dotation d\'Exploitation (6813)', definition: 'Charge non décaissée constatant la quote-part annuelle de dépréciation de l\'actif.' },
                      ],
                      rulesAndPrinciples: [
                        'Principe de prudence : l\'amortissement doit être comptabilisé même en cas d\'exercice déficitaire.',
                        'L\'amortissement commence à la date de mise en service effective de l\'actif.',
                      ],
                      formulas: [
                        {
                          name: 'Annuité d\'Amortissement Linéaire',
                          formula: 'Annuité = (Valeur d\'Origine HT - Valeur Résiduelle) x Taux x (Nb jours / 360)',
                          interpretation: 'Dans l\'espace OHADA, le prorata se calcule souvent sur une base conventionnelle de 360 jours (30 jours par mois).',
                          syscohadaRef: 'AUDCIF - Art. 45 à 52',
                        },
                      ],
                      commonMistakes: [
                        'Amortir un terrain : les terrains ne s\'amortissent pas (sauf carrières et gisements).',
                        'Calculer l\'amortissement sur la valeur TTC au lieu de la valeur HT récupérable.',
                      ],
                      professionalBestPractices: [
                        'Maintenir un fichier d\'immobilisations rigoureusement lettré avec le compte 28 du grand-livre.',
                      ],
                      memorizationTips: [
                        'Le compte d\'amortissement s\'obtient en insérant un "8" en deuxième position : compte 245 Matériel de transport -> 2845 Amortissement du matériel de transport.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Amortissement annuel d\'un serveur informatique',
                    scenario: 'Achat d\'un serveur le 1er janvier pour 6 000 000 FCFA HT, amorti sur 3 ans.',
                    dataset: { valeurHT: 6000000, dureeAns: 3, taux: 0.333333 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de l\'annuité', calculation: '6 000 000 / 3 = 2 000 000 FCFA par an', justification: 'Annuité linéaire constante.' },
                      { step: 2, action: 'Comptabilisation au 31 décembre', calculation: 'Débit 6813 Dotations aux amortissements (2 000 000) / Crédit 2844 Amortissement du matériel informatique (2 000 000)', justification: 'Constatation de la charge calculée.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Amortissement avec prorata temporis',
                    scenario: 'Camionnette acquise et mise en service le 1er juillet pour 15 000 000 FCFA HT, amortissable sur 5 ans (taux 20%).',
                    dataset: { valeurHT: 15000000, taux: 0.20, moisUtilisation: 6 },
                    stepByStepSolution: [
                      { step: 1, action: 'Annuité pleine', calculation: '15 000 000 x 20% = 3 000 000 FCFA', justification: 'Base pour une année complète.' },
                      { step: 2, action: 'Prorata temporis première année', calculation: '3 000 000 x (6 / 12) = 1 500 000 FCFA', justification: 'Du 1er juillet au 31 décembre = 6 mois.' },
                      { step: 3, action: 'VNC au 31 décembre N', calculation: '15 000 000 - 1 500 000 = 13 500 000 FCFA', justification: 'Valeur résiduelle nette figurant à l\'actif du bilan.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Brasserie Artisanale des Savanes (BAS SA)',
                    locationContext: 'Bouaké, Côte d\'Ivoire - Zone Industrielle',
                    sector: 'Industrie agroalimentaire',
                    currency: 'FCFA',
                    problemStatement: 'BAS SA a investi 120 000 000 FCFA dans une ligne d\'embouteillage mise en service le 1er octobre. Le chef comptable a oublié de passer la dotation aux amortissements au 31 décembre, surévaluant le bénéfice distribuable de 3 000 000 FCFA.',
                    financialStatements: {
                      coutAcquisitionLigne: 120000000,
                      dureeAmortissementAns: 10,
                      dotationOubliee: 3000000,
                      beneficeAvantCorrection: 18500000,
                      beneficeReelCorrige: 15500000,
                    },
                    realWorldResolution: 'Passation de l\'écriture d\'inventaire rectificative : Débit 6813 pour 3 000 000 FCFA et Crédit 2841 Amortissement du matériel industriel pour 3 000 000 FCFA. Le dividende est ajusté pour protéger la trésorerie.',
                    recommendationToBoard: 'Mettre en place un tableau de bouclage automatique entre le tableau d\'inventaire fiscal et les comptes de dotation 681.',
                  },
                  guidedExercise: {
                    id: 'EX_CPT_GUIDED_05',
                    title: 'Exercice Guidé : Calcul de VNC après 2 ans',
                    instruction: 'Une machine industrielle acquise le 1er janvier N pour 20 000 000 FCFA HT est amortie selon le mode linéaire sur 5 ans (taux 20%). Quelle est sa Valeur Nette Comptable (VNC) au 31 décembre N+1 (après 2 ans d\'amortissement) ?',
                    dataset: { valeurOrigine: 20000000, taux: 0.20, annees: 2 },
                    stepByStepHelp: [
                      '1. Annuité annuelle = 20 000 000 x 20% = 4 000 000 FCFA.',
                      '2. Cumul des amortissements après 2 ans = 4 000 000 x 2 = 8 000 000 FCFA.',
                      '3. VNC = Valeur d\'origine - Cumul amortissements.',
                    ],
                    expectedAnswer: 12000000,
                    detailedCorrection: 'VNC au 31 décembre N+1 = 20 000 000 - 8 000 000 = 12 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CPT_AUTO_05',
                    title: 'Exercice Autonome : Prorata temporis d\'amortissement',
                    instruction: 'Un véhicule commercial d\'une valeur de 10 000 000 FCFA HT est mis en service le 1er avril N. La durée d\'amortissement est de 5 ans (taux 20%). Quel est le montant de la dotation aux amortissements au 31 décembre N (soit 9 mois d\'utilisation) ?',
                    dataset: { valeur: 10000000, duree: 5, mois: 9 },
                    hints: [
                      'Annuité pleine = 10 000 000 / 5 = 2 000 000 FCFA.',
                      'Dotation proratisée = 2 000 000 x (9 / 12) FCFA.',
                    ],
                    expectedAnswer: 1500000,
                    detailedCorrection: 'Dotation = 2 000 000 x (9 / 12) = 1 500 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CPT_SIM_05',
                    title: 'Atelier Pratique : Tableau d\'Amortissement & Dotation d\'Inventaire',
                    type: 'simulator',
                    targetComponentId: 'accounting_simulator',
                    completionCriteria: {
                      metric: 'depreciationRecorded',
                      targetValue: 1,
                      description: 'Calculer et enregistrer une dotation aux amortissements de fin d\'exercice.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CPT_05',
                      question: 'Quelle est la contrepartie comptable du compte 6813 Dotations aux amortissements ?',
                      options: [
                        'Un compte de la classe 28 (Amortissements des immobilisations)',
                        'Le compte 521 Banque',
                        'Le compte 401 Fournisseurs',
                        'Le compte 101 Capital social',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'amortissement est une charge non décaissée : la contrepartie est le compte d\'actif soustractif 28.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'amortissement permet de renouveler les équipements sans puiser dans les liquidités immédiates.',
                    'La VNC à l\'actif du bilan représente la valeur résiduelle économique de l\'actif.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 6 pour traiter les dépréciations d\'actifs et les régularisations de fin d\'exercice.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CPT_M5',
            moduleId: 'CPT_MOD_5',
            title: 'Évaluation Certifiante : Amortissements & Travaux d\'Inventaire',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CPT_5',
                question: 'Peut-on renoncer à comptabiliser un amortissement si l\'exercice se termine par une lourde perte ?',
                options: [
                  'Non, le principe de prudence du SYSCOHADA rend l\'amortissement obligatoire quel que soit le résultat',
                  'Oui, pour éviter d\'aggraver le déficit',
                  'Oui, si le fisc donne son accord',
                  'Oui, uniquement pour le matériel de transport',
                ],
                correctIndex: 0,
                explanation: 'L\'article 45 de l\'AUDCIF interdit formellement de suspendre les amortissements pour masquer un déficit.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 6 : DÉPRÉCIATIONS, PROVISIONS ET RÉGULARISATIONS
    // ------------------------------------------------------------------------
    {
      id: 'CPT_NIV_6',
      pathId: 'PATH_COMPTA_SYSCOHADA_360',
      levelNumber: 6,
      title: 'Niveau 6 : Provisions pour Risques, Dépréciations & Régularisations',
      description: 'Dépréciation des créances douteuses (416/491), stocks (39) et charges/produits constatés d\'avance (476/477).',
      targetMastery: 'Appliquer le principe de séparation des exercices comptables (Cut-off).',
      modules: [
        {
          id: 'CPT_MOD_6',
          levelId: 'CPT_NIV_6',
          pathId: 'PATH_COMPTA_SYSCOHADA_360',
          moduleNumber: 6,
          title: 'Module 6 : Le Respect du Principe d\'Indépendance des Exercices',
          description: 'Régularisation des charges à payer, produits à recevoir et provisions pour litiges (19).',
          competencyCodes: ['COMPT-SYSCOHADA'],
          durationHours: 6,
          chapters: [
            {
              id: 'CPT_CHAP_6_1',
              moduleId: 'CPT_MOD_6',
              title: 'Chapitre 1 : Provisions et Comptes de Régularisation',
              description: 'Traitement des créances douteuses et rattachement des charges et produits à l\'exercice.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CPT_06',
                  chapterId: 'CPT_CHAP_6_1',
                  moduleId: 'CPT_MOD_6',
                  pathId: 'PATH_COMPTA_SYSCOHADA_360',
                  title: 'Leçon 1 : Créances Douteuses, Dépréciations et Charges Constatées d\'Avance',
                  durationMinutes: 45,
                  difficulty: 'Avancé',
                  objectives: [
                    'Reclasser un client ordinaire en client douteux (Débit 416 / Crédit 411).',
                    'Calculer la dépréciation sur le montant Hors Taxes de la créance.',
                    'Comptabiliser la dotation aux dépréciations (Débit 659 / Crédit 491).',
                    'Régulariser une charge constatée d\'avance (Débit 476 / Crédit 60/62).',
                  ],
                  prerequisites: ['Maîtrise des écritures d\'achats et ventes.'],
                  contextIntro: 'Le résultat d\'un exercice ne doit comprendre QUE les charges et les produits qui lui incombent effectivement. Si une police d\'assurance a été payée en octobre pour une période d\'un an, les 9 mois correspondant à l\'exercice suivant doivent être neutralisés via le compte 476 Charges constatées d\'avance.',
                  theorySections: [
                    {
                      title: '1. Traitement des Créances Douteuses sous SYSCOHADA',
                      content: 'Lorsqu\'un client présente un risque d\'insolvabilité (redressement judiciaire, litige grave), la créance est transférée au compte 416 Clients douteux ou litigieux pour son montant TOTAL TTC. La provision pour dépréciation se calcule EXCLUSIVEMENT sur le montant HORS TAXES (car en cas de perte définitive, la TVA facturée est récupérable auprès du fisc).',
                      keyDefinitions: [
                        { term: 'Principe d\'Indépendance des Exercices (Cut-off)', definition: 'Règle selon laquelle chaque charge et chaque produit est rattaché à l\'exercice au cours duquel l\'opération a été réalisée ou la prestation fournie.' },
                        { term: 'Charges Constatées d\'Avance (476)', definition: 'Actif circulant représentant des charges enregistrées au cours de l\'exercice mais concernant un exercice ultérieur.' },
                      ],
                      rulesAndPrinciples: [
                        'La dépréciation d\'une créance se calcule toujours sur le montant HT.',
                        'L\'extourne des comptes de régularisation 476 et 477 doit être effectuée dès l\'ouverture de l\'exercice suivant.',
                      ],
                      formulas: [
                        {
                          name: 'Dotation Dépréciation Créance',
                          formula: 'Dépréciation = Créance HT x Pourcentage de perte probable estimé',
                          interpretation: 'Constatation de la perte probable sans impacter le montant TTC figurant au compte 416.',
                          syscohadaRef: 'AUDCIF - Art. 48 à 55',
                        },
                      ],
                      commonMistakes: [
                        'Calculer la dépréciation sur le montant TTC de la facture.',
                        'Oublier d\'extourner les charges constatées d\'avance au 1er janvier de l\'exercice suivant.',
                      ],
                      professionalBestPractices: [
                        'Obtenir un justificatif formel (courrier d\'avocat, mise en demeure restée infructueuse) avant de déprécier une créance pour justifier la déductibilité fiscale.',
                      ],
                      memorizationTips: [
                        '416 = Reclassement TTC.',
                        '491 = Dépréciation HT.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Loyer payé d\'avance sur 2 exercices',
                    scenario: 'Le 1er novembre, règlement du loyer commercial semestriel de 6 000 000 FCFA HT (pour la période du 1er novembre au 30 avril de l\'année suivante).',
                    dataset: { loyerSemestriel: 6000000, moisN: 2, moisN1: 4 },
                    stepByStepSolution: [
                      { step: 1, action: 'Quote-part exercice suivant', calculation: '6 000 000 x (4 / 6) = 4 000 000 FCFA', justification: 'Charges des mois de janvier, février, mars, avril N+1.' },
                      { step: 2, action: 'Écriture au 31 décembre N', calculation: 'Débit 476 Charges constatées d\'avance (4 000 000) / Crédit 622 Locations (4 000 000)', justification: 'Neutralisation de la charge dans le compte de résultat de l\'exercice N.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Dépréciation d\'un client insolvable',
                    scenario: 'Le client AFRI-BAZAR doit 5 900 000 FCFA TTC (dont 900 000 FCFA de TVA 18%). L\'avocat estime le risque de non-recouvrement à 60%.',
                    dataset: { montantTTC: 5900000, montantHT: 5000000, risque: 0.60 },
                    stepByStepSolution: [
                      { step: 1, action: 'Reclassement client douteux', calculation: 'Débit 416 (5 900 000) / Crédit 411 (5 900 000)', justification: 'Isolement de la créance à risque.' },
                      { step: 2, action: 'Calcul de la dépréciation sur le HT', calculation: '5 000 000 x 60% = 3 000 000 FCFA', justification: 'Base de calcul strictement HT.' },
                      { step: 3, action: 'Dotation pour dépréciation', calculation: 'Débit 659 Dotations aux dépréciations (3 000 000) / Crédit 491 Dépréciation des comptes clients (3 000 000)', justification: 'Constatation de la perte probable.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Société Ivoirienne de Cacao & Café (SICC SA)',
                    locationContext: 'Daloa, Côte d\'Ivoire - Coopérative d\'exportation',
                    sector: 'Négoce agricole',
                    currency: 'FCFA',
                    problemStatement: 'Un acheteur international a fait faillite, laissant un impayé de 85 000 000 FCFA TTC. Le comptable a passé la perte directement en charge exceptionnelle sans récupérer la TVA de 12 966 102 FCFA auprès du fisc.',
                    financialStatements: {
                      creanceTotaleTTC: 85000000,
                      creanceHT: 72033898,
                      tvaRecuperableFisc: 12966102,
                    },
                    realWorldResolution: 'Rectification comptable sur présentation du certificat d\'irrécouvrabilité : Débit 6511 Pertes sur créances (72 033 898 FCFA), Débit 4431 TVA à régulariser (12 966 102 FCFA) et Crédit 416 (85 000 000 FCFA). Récupération effective de la TVA déduite sur la déclaration suivante.',
                    recommendationToBoard: 'Souscrire une police d\'assurance-crédit export couvrant au moins 85% des encours commerciaux significatifs.',
                  },
                  guidedExercise: {
                    id: 'EX_CPT_GUIDED_06',
                    title: 'Exercice Guidé : Calcul de charge constatée d\'avance',
                    instruction: 'Une prime d\'assurance annuelle de 2 400 000 FCFA est réglée le 1er octobre N pour la période du 01/10/N au 30/09/N+1. Quel montant doit être viré au compte 476 Charges constatées d\'avance au 31 décembre N (pour les 9 mois de N+1) ?',
                    dataset: { prime: 2400000, moisN1: 9 },
                    stepByStepHelp: [
                      'Coût mensuel = 2 400 000 / 12 = 200 000 FCFA.',
                      'Quote-part N+1 = 200 000 x 9 mois.',
                    ],
                    expectedAnswer: 1800000,
                    detailedCorrection: 'Charge constatée d\'avance = 2 400 000 x (9 / 12) = 1 800 000 FCFA.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CPT_AUTO_06',
                    title: 'Exercice Autonome : Dépréciation sur montant HT',
                    instruction: 'Une créance douteuse s\'élève à 11 800 000 FCFA TTC (TVA 18%, soit montant HT = 10 000 000 FCFA). L\'expert estime la perte prévisible à 40%. Quel est le montant exact de la dotation aux dépréciations à comptabiliser ?',
                    dataset: { montantHT: 10000000, tauxPerte: 0.40 },
                    hints: [
                      'Rappelez-vous que la dotation se calcule impérativement sur le HT.',
                      '10 000 000 x 40%.',
                    ],
                    expectedAnswer: 4000000,
                    detailedCorrection: 'Dépréciation = 10 000 000 x 40% = 4 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CPT_SIM_06',
                    title: 'Atelier Pratique : Écritures de Régularisation et Dépréciations',
                    type: 'simulator',
                    targetComponentId: 'accounting_simulator',
                    completionCriteria: {
                      metric: 'cutOffEntriesRecorded',
                      targetValue: 1,
                      description: 'Passer les écritures de régularisation de cut-off.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CPT_06',
                      question: 'Sur quelle assiette calcule-t-on la dépréciation d\'une créance client douteuse ?',
                      options: [
                        'Sur le montant Hors Taxes de la créance',
                        'Sur le montant TTC total',
                        'Sur le montant de la TVA uniquement',
                        'Sur la moitié de la facture',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'article 48 de l\'AUDCIF stipule que la dépréciation est assise sur le montant HT, car la TVA fait l\'objet d\'une récupération fiscale si la créance devient irrécouvrable.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Le respect de l\'indépendance des exercices garantit la sincérité du résultat fiscal et comptable.',
                    'Les dépréciations évitent de distribuer des bénéfices illusoires sur des créances compromises.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 7 pour construire les états financiers complets (Bilan et Compte de résultat SYSCOHADA).',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CPT_M6',
            moduleId: 'CPT_MOD_6',
            title: 'Évaluation Certifiante : Provisions, Dépréciations & Régularisations',
            passingScorePercent: 75,
            questions: [
              {
                id: 'EQ_CPT_6',
                question: 'Pourquoi utilise-t-on le compte 476 Charges constatées d\'avance ?',
                options: [
                  'Pour neutraliser une charge comptabilisée cette année mais dont la consommation réelle aura lieu l\'année suivante',
                  'Pour enregistrer une facture impayée',
                  'Pour payer moins d\'impôt sur le revenu',
                  'Pour enregistrer une subvention',
                ],
                correctIndex: 0,
                explanation: 'Le compte 476 permet de respecter l\'indépendance des exercices en retirant du compte de résultat les charges consommées l\'exercice suivant.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 7 : ÉTATS FINANCIERS SYSCOHADA (BILAN ET COMPTE DE RÉSULTAT)
    // ------------------------------------------------------------------------
    {
      id: 'CPT_NIV_7',
      pathId: 'PATH_COMPTA_SYSCOHADA_360',
      levelNumber: 7,
      title: 'Niveau 7 : Confection des États Financiers & Liasse Fiscale',
      description: 'Construction du Bilan, Compte de Résultat et Tableau des Flux de Trésorerie selon le Système Normal SYSCOHADA.',
      targetMastery: 'Établir la liasse financière annuelle et certifier l\'égalité Résultat Bilan = Résultat Compte de Résultat.',
      modules: [
        {
          id: 'CPT_MOD_7',
          levelId: 'CPT_NIV_7',
          pathId: 'PATH_COMPTA_SYSCOHADA_360',
          moduleNumber: 7,
          title: 'Module 7 : La Liasse Financière Annuelle SYSCOHADA Révisé',
          description: 'Structure des 4 états financiers obligatoires : Bilan, Compte de résultat, Tableau des flux de trésorerie (TFT) et Notes annexes.',
          competencyCodes: ['COMPT-SYSCOHADA', 'ANAL-DIAGNOSTIC'],
          durationHours: 8,
          chapters: [
            {
              id: 'CPT_CHAP_7_1',
              moduleId: 'CPT_MOD_7',
              title: 'Chapitre 1 : Articulation du Bilan et du Compte de Résultat',
              description: 'Du grand-livre clôturé aux rubriques de la liasse fiscale officielle.',
              estimatedMinutes: 240,
              lessons: [
                {
                  id: 'L_CPT_07',
                  chapterId: 'CPT_CHAP_7_1',
                  moduleId: 'CPT_MOD_7',
                  pathId: 'PATH_COMPTA_SYSCOHADA_360',
                  title: 'Leçon 1 : Élaboration du Bilan et du Compte de Résultat SYSCOHADA',
                  durationMinutes: 60,
                  difficulty: 'Avancé',
                  objectives: [
                    'Transférer les soldes de balance vers les masses bilancielles de l\'actif et du passif.',
                    'Calculer les soldes intermédiaires de gestion du compte de résultat (Marge brute, Valeur Ajoutée, EBE, Résultat d\'exploitation).',
                    'Vérifier que le Résultat Net calculé au Compte de Résultat est identique au Résultat figurant dans les Capitaux Propres du Bilan (compte 13).',
                    'Calculer l\'impôt sur les bénéfices (BIC) à 25% et l\'Imposition Forfaitaire Minimale (IMF) à 0,5% du CA.',
                  ],
                  prerequisites: ['Maîtrise de la balance après inventaire.'],
                  contextIntro: 'Le SYSCOHADA Révisé prévoit deux systèmes de présentation des états financiers : le Système Normal (pour les entités réalisant un CA supérieur à 100 millions FCFA) et le Système Minimal de Trésorerie (SMT pour les très petites entités). Dans le Système Normal, la liasse fiscale comporte 36 tableaux normalisés.',
                  theorySections: [
                    {
                      title: '1. L\'Harmonie Parfaite Bilan / Compte de Résultat',
                      content: 'Le compte de résultat regroupe les classes 6, 7 et 8 pour déterminer le résultat net de la période : Produits - Charges = Résultat Net. Ce résultat net vient s\'intégrer automatiquement au Passif du Bilan au compte 13 Résultat net de l\'exercice (au crédit s\'il s\'agit d\'un bénéfice, au débit s\'il s\'agit d\'une perte). Le Bilan retrouve ainsi un équilibre parfait : Total Actif = Total Passif.',
                      keyDefinitions: [
                        { term: 'Système Normal SYSCOHADA', definition: 'Cadre comptable complet obligatoire pour toutes les entreprises de l\'OHADA dépassant 100 millions FCFA de chiffre d\'affaires.' },
                        { term: 'Impôt sur les Bénéfices (BIC)', definition: 'Impôt direct perçu par l\'État sur le bénéfice fiscal net (taux usuel de 25% en Côte d\'Ivoire, ou IMF de 0,5% du CA).' },
                      ],
                      rulesAndPrinciples: [
                        'Le résultat net doit être strictement identique au centime près entre le bilan et le compte de résultat.',
                        'Les amortissements cumulés viennent en diminution de l\'actif brut dans la colonne « Amortissements et dépréciations » pour donner l\'Actif Net.',
                      ],
                      formulas: [
                        {
                          name: 'Vérification de Cohérence Globale',
                          formula: 'Actif Net = Passif = Capitaux Propres (y compris Résultat 13) + Dettes',
                          interpretation: 'L\'égalité suprême certifiant la validité de la clôture annuelle.',
                          syscohadaRef: 'AUDCIF - Art. 25 à 34',
                        },
                      ],
                      commonMistakes: [
                        'Oublier d\'intégrer le résultat net au passif du bilan, provoquant un déséquilibre égal au résultat.',
                        'Inverser les charges d\'exploitation et les charges hors activités ordinaires (HAO, classe 8).',
                      ],
                      professionalBestPractices: [
                        'Effectuer un bouclage fiscal entre le résultat comptable et le résultat fiscal (réintégrations et déductions fiscales).',
                      ],
                      memorizationTips: [
                        'Résultat = La colle qui soude le Compte de résultat au Bilan.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Calcul du résultat net avant impôt',
                    scenario: 'Au 31 décembre, total des produits classe 7 = 85 000 000 FCFA. Total des charges classe 6 = 68 000 000 FCFA.',
                    dataset: { produits: 85000000, charges: 68000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul du résultat comptable', calculation: '85 000 000 - 68 000 000 = 17 000 000 FCFA', justification: 'Bénéfice d\'exploitation brut.' },
                      { step: 2, action: 'Intégration au passif', calculation: 'Crédit compte 131 Résultat net : Bénéfice pour 17 000 000 FCFA', justification: 'Ressource nette générée par l\'activité.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Calcul de l\'impôt BIC et résultat net après impôt',
                    scenario: 'Bénéfice fiscal de 20 000 000 FCFA. Taux de l\'impôt sur les sociétés BIC = 25%.',
                    dataset: { beneficeFiscal: 20000000, tauxIS: 0.25 },
                    stepByStepSolution: [
                      { step: 1, action: 'Calcul de l\'impôt BIC', calculation: '20 000 000 x 25% = 5 000 000 FCFA', justification: 'Montant dû à l\'administration fiscale.' },
                      { step: 2, action: 'Constatation de la charge fiscale', calculation: 'Débit 89 Impôts sur les bénéfices (5 000 000) / Crédit 441 État, impôt sur les bénéfices (5 000 000)', justification: 'Dette fiscale au bilan.' },
                      { step: 3, action: 'Résultat net définitif', calculation: '20 000 000 - 5 000 000 = 15 000 000 FCFA', justification: 'Bénéfice net disponible pour distribution de dividendes ou mise en réserve.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Groupe Agro-Pastoral du Centre (GAPC SA)',
                    locationContext: 'Yamoussoukro, Côte d\'Ivoire',
                    sector: 'Agro-industrie',
                    currency: 'FCFA',
                    problemStatement: 'Lors du dépôt de la liasse fiscale, l\'administration a rejeté les comptes car le bilan présentait un actif net de 450 000 000 FCFA et un passif de 425 000 000 FCFA, l\'écart de 25 000 000 FCFA correspondant au résultat net non reporté dans les capitaux propres.',
                    financialStatements: {
                      chiffreAffaires: 620000000,
                      totalCharges: 595000000,
                      resultatNetCalcule: 25000000,
                      totalActifNet: 450000000,
                      totalPassifSansResultat: 425000000,
                    },
                    realWorldResolution: 'Intégration du résultat de 25 000 000 FCFA dans la rubrique « Résultat net de l\'exercice » au passif. Le total passif s\'établit à 450 000 000 FCFA, parfaitement égal à l\'actif net. Validation sans réserve de la liasse fiscale.',
                    recommendationToBoard: 'Imposer une revue contradictoire préalable par le commissaire aux comptes avant tout dépôt officiel au centre des impôts.',
                  },
                  guidedExercise: {
                    id: 'EX_CPT_GUIDED_07',
                    title: 'Exercice Guidé : Calcul de l\'impôt minimum forfaitaire (IMF)',
                    instruction: 'Une société ivoirienne a réalisé un chiffre d\'affaires annuel de 400 000 000 FCFA. Son résultat fiscal est déficitaire (-5 000 000 FCFA). En Côte d\'Ivoire, l\'Impôt Minimum Forfaitaire (IMF) est de 0,5% du chiffre d\'affaires (avec un plancher légal de 3 000 000 FCFA). Quel est le montant de l\'IMF dû par l\'entreprise ?',
                    dataset: { ca: 400000000, tauxIMF: 0.005, plancher: 3000000 },
                    stepByStepHelp: [
                      '1. Calculez 0,5% du chiffre d\'affaires : 400 000 000 x 0,005 = 2 000 000 FCFA.',
                      '2. Comparez avec le plancher légal de 3 000 000 FCFA.',
                      '3. L\'impôt dû est le montant le plus élevé.',
                    ],
                    expectedAnswer: 3000000,
                    detailedCorrection: 'Le calcul à 0,5% donne 2 000 000 FCFA. Étant inférieur au minimum légal de 3 000 000 FCFA, l\'entreprise doit acquitter 3 000 000 FCFA au titre de l\'IMF.',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CPT_AUTO_07',
                    title: 'Exercice Autonome : Résultat net d\'exploitation',
                    instruction: 'Les soldes d\'une PME indiquent : Chiffre d\'affaires = 150 000 000 FCFA, Achats consommés = 80 000 000 FCFA, Charges de personnel = 35 000 000 FCFA, Dotations aux amortissements = 10 000 000 FCFA. Quel est le Résultat d\'Exploitation en FCFA ?',
                    dataset: { ca: 150000000, achats: 80000000, personnel: 35000000, dotations: 10000000 },
                    hints: [
                      'Résultat d\'Exploitation = CA - Achats - Personnel - Dotations.',
                      '150M - (80M + 35M + 10M).',
                    ],
                    expectedAnswer: 25000000,
                    detailedCorrection: 'Résultat d\'exploitation = 150 000 000 - 125 000 000 = 25 000 000 FCFA.',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CPT_SIM_07',
                    title: 'Atelier Pratique : Bilan et Compte de Résultat dans le Simulateur',
                    type: 'simulator',
                    targetComponentId: 'accounting_simulator',
                    completionCriteria: {
                      metric: 'financialStatementsCertified',
                      targetValue: 1,
                      description: 'Générer et valider le Bilan et Compte de résultat équilibrés.',
                    },
                    rubricPoints: 30,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CPT_07',
                      question: 'Dans quelle masse du Bilan figure le résultat net de l\'exercice ?',
                      options: [
                        'Dans les Capitaux Propres et ressources assimilées (Passif, classe 13)',
                        'Dans l\'Actif circulant',
                        'Dans la Trésorerie-Actif',
                        'Il ne figure pas dans le bilan',
                      ],
                      correctIndex: 0,
                      explanation: 'Le résultat net de l\'exercice figure dans les capitaux propres au passif du bilan (compte 131 en cas de bénéfice ou 139 en cas de perte).',
                    },
                  ],
                  keyTakeawaySummary: [
                    'Les états financiers SYSCOHADA forment un tout indissociable certifiant la situation financière de l\'entité.',
                    'Le respect des normes comptables est la condition sine qua non de la confiance des banques et partenaires.',
                  ],
                  nextStepRecommendation: 'Passez au Niveau 8 pour réaliser le Projet Professionnel Final de clôture complète.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CPT_M7',
            moduleId: 'CPT_MOD_7',
            title: 'Évaluation Certifiante : Confection des États Financiers SYSCOHADA',
            passingScorePercent: 80,
            questions: [
              {
                id: 'EQ_CPT_7',
                question: 'Que représente la Valeur Ajoutée (VA) dans le compte de résultat SYSCOHADA ?',
                options: [
                  'La richesse réelle créée par l\'entreprise mesurée par la marge brute et la production diminuées des consommations intermédiaires',
                  'Le montant de la TVA payée par les clients',
                  'Le solde du compte bancaire à la fin de l\'année',
                  'Le montant total des salaires payés',
                ],
                correctIndex: 0,
                explanation: 'La Valeur Ajoutée mesure le surplus de valeur économique apporté par l\'entreprise aux matières et services extérieurs consommés.',
              },
            ],
          },
        },
      ],
    },

    // ------------------------------------------------------------------------
    // NIVEAU 8 : PROJET PROFESSIONNEL FINAL DE CLÔTURE & AUDIT CERTIFIANT
    // ------------------------------------------------------------------------
    {
      id: 'CPT_NIV_8',
      pathId: 'PATH_COMPTA_SYSCOHADA_360',
      levelNumber: 8,
      title: 'Niveau 8 : Projet Professionnel Final de Clôture & Certification',
      description: 'Réaliser la clôture complète d\'une PME ivoirienne fictive : inventaire, amortissements, régularisations, balance générale et liasse fiscale.',
      targetMastery: 'Autonomie professionnelle intégrale sur la chaîne de clôture annuelle.',
      modules: [
        {
          id: 'CPT_MOD_8',
          levelId: 'CPT_NIV_8',
          pathId: 'PATH_COMPTA_SYSCOHADA_360',
          moduleNumber: 8,
          title: 'Module 8 : Projet d\'Intégration Professionnelle et Examen de Maîtrise',
          description: 'Mise en situation réelle sur un dossier d\'audit et de clôture d\'une société de distribution agro-alimentaire à Abidjan.',
          competencyCodes: ['COMPT-SYSCOHADA', 'ANAL-DIAGNOSTIC'],
          durationHours: 6,
          chapters: [
            {
              id: 'CPT_CHAP_8_1',
              moduleId: 'CPT_MOD_8',
              title: 'Chapitre 1 : Soutenance du Dossier de Clôture et Audit',
              description: 'Exécution du dossier de révision et rapport de certification des comptes.',
              estimatedMinutes: 180,
              lessons: [
                {
                  id: 'L_CPT_08',
                  chapterId: 'CPT_CHAP_8_1',
                  moduleId: 'CPT_MOD_8',
                  pathId: 'PATH_COMPTA_SYSCOHADA_360',
                  title: 'Leçon 1 : Procédures de Révision, Contrôle de Clôture et Rapport d\'Audit',
                  durationMinutes: 45,
                  difficulty: 'Expert',
                  objectives: [
                    'Conduire un programme de travail d\'audit comptable par cycle (Achats/Fournisseurs, Ventes/Clients, Trésorerie, Immobilisations).',
                    'Documenter les feuilles de travail et les ajustements d\'audit.',
                    'Rédiger la note de synthèse financière à l\'attention des associés et du conseil d\'administration.',
                  ],
                  prerequisites: ['Validation des 7 niveaux précédents.'],
                  contextIntro: 'L\'ultime étape du comptable professionnel est la clôture annuelle certifiée : être capable de justifier chaque ligne du bilan devant le commissaire aux comptes et l\'inspecteur des impôts.',
                  theorySections: [
                    {
                      title: '1. Les 5 Cycles d\'Audit des Comptes',
                      content: 'Cycle Immobilisations (rapprochement physique et calcul des amortissements), Cycle Fournisseurs (circularisation des soldes et factures non parvenues), Cycle Clients (dépréciation des créances litigieuses), Cycle Trésorerie (rapprochement bancaire et inventaire de caisse), Cycle Personnel & Fiscal (cadrage des déclarations sociales CNPS et fiscales).',
                      keyDefinitions: [
                        { term: 'Dossier de Révision Comptable', definition: 'Classeur de travail regroupant l\'ensemble des justifications de soldes, pointages et circularisations étayant la balance de clôture.' },
                      ],
                      rulesAndPrinciples: [
                        'Aucun compte de bilan ne doit subsister sans justification documentaire vérifiable.',
                      ],
                      formulas: [
                        {
                          name: 'Contrôle d\'Intégrité Absolu',
                          formula: 'Actif Net = Passif et Débit Journal = Débit Balance = Crédit Balance',
                          interpretation: 'Double égalité certifiant l\'intégrité mathématique des comptes.',
                          syscohadaRef: 'AUDCIF - Art. 111',
                        },
                      ],
                      commonMistakes: [
                        'Clôturer un exercice sans avoir circularisé les principaux fournisseurs et clients.',
                      ],
                      professionalBestPractices: [
                        'Établir un calendrier de clôture partagé avec les équipes opérationnelles dès le mois de novembre.',
                      ],
                      memorizationTips: [
                        'Justifier, Rapprocher, Déprécier, Clôturer.',
                      ],
                    },
                  ],
                  simpleExample: {
                    title: 'Ajustement d\'audit sur facture non parvenue (FNP)',
                    scenario: 'Réception d\'une livraison de matières de 3 000 000 FCFA HT au 28 décembre sans facture reçue.',
                    dataset: { montantHT: 3000000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Constatation de la charge rattachable', calculation: 'Débit 602 Achats stockés : 3 000 000 FCFA', justification: 'Matière consommée ou stockée en N.' },
                      { step: 2, action: 'Dette provisionnelle', calculation: 'Crédit 4081 Fournisseurs, factures non parvenues : 3 000 000 FCFA', justification: 'Obligation rattachable à l\'exercice.' },
                    ],
                  },
                  intermediateExample: {
                    title: 'Contrôle du cadrage fiscal de fin d\'exercice',
                    scenario: 'Le CA déclaré sur les 12 formulaires mensuels de TVA s\'élève à 350 000 000 FCFA. Le grand-livre classe 7 indique 352 500 000 FCFA.',
                    dataset: { caDeclareTVA: 350000000, caGrandLivre: 352500000, ecart: 2500000 },
                    stepByStepSolution: [
                      { step: 1, action: 'Identification de l\'écart', calculation: '352 500 000 - 350 000 000 = 2 500 000 FCFA', justification: 'Vente de fin d\'année comptabilisée mais non déclarée.' },
                      { step: 2, action: 'Action d\'audit', calculation: 'Dépôt d\'une déclaration rectificative pour éviter une taxation d\'office avec pénalité de 25%', justification: 'Mise en conformité fiscale avant contrôle.' },
                    ],
                  },
                  enterpriseCase: {
                    companyName: 'Société Ivoirienne de Conditionnement Moderne (SICOM SA)',
                    locationContext: 'Abidjan, Zone Industrielle Yopougon',
                    sector: 'Industrie de l\'emballage',
                    currency: 'FCFA',
                    problemStatement: 'Pour obtenir une ligne de crédit de 200 millions FCFA auprès de la Société Générale Côte d\'Ivoire (SGCI), SICOM SA devait fournir une liasse SYSCOHADA auditée avec zéro réserve. Le dossier de révision a permis de corriger 4 anomalies majeures.',
                    financialStatements: {
                      chiffreAffaires: 850000000,
                      totalBilan: 540000000,
                      resultatNetCertifie: 64200000,
                      creditObtenu: 200000000,
                    },
                    realWorldResolution: 'Apurement des comptes d\'attente 471, lettrage de 100% des comptes clients, inventaire physique valorisé et certification sans réserve des commissaires aux comptes. Crédit d\'investissement débloqué en 3 semaines.',
                    recommendationToBoard: 'Institutionnaliser une pré-clôture au 30 septembre pour lisser la charge de travail comptable.',
                  },
                  guidedExercise: {
                    id: 'EX_CPT_GUIDED_08',
                    title: 'Exercice Guidé : Cadrage des factures non parvenues',
                    instruction: 'Au 31 décembre, des prestations de gardiennage de 800 000 FCFA HT ont été réalisées mais la facture n\'arrivera qu\'en janvier. Quelle somme doit être créditée au compte 408 Fournisseurs factures non parvenues ?',
                    dataset: { prestationHT: 800000 },
                    stepByStepHelp: [
                      'L\'écriture crédite 408 Fournisseurs FNP pour 800 000 FCFA.',
                    ],
                    expectedAnswer: 800000,
                    detailedCorrection: 'Le montant de 800 000 FCFA HT doit être comptabilisé au crédit du compte 408 Fournisseurs - factures non parvenues (et débit 628 Services extérieurs).',
                    rubricPoints: 20,
                  },
                  autonomousExercise: {
                    id: 'EX_CPT_AUTO_08',
                    title: 'Exercice Autonome : Calcul de l\'affectation du résultat',
                    instruction: 'L\'Assemblée Générale décide d\'affecter le bénéfice net de 40 000 000 FCFA : Dotation à la Réserve Légale obligatoire de 10% (selon l\'Acte Uniforme Sociétés Commerciales OHADA) et le reste en report à nouveau. Quel est le montant affecté à la Réserve Légale ?',
                    dataset: { benefice: 40000000, tauxReserveLegale: 0.10 },
                    hints: [
                      '10% de 40 000 000 FCFA.',
                    ],
                    expectedAnswer: 4000000,
                    detailedCorrection: 'Réserve légale = 40 000 000 x 10% = 4 000 000 FCFA (compte 111).',
                    rubricPoints: 20,
                  },
                  practicalActivity: {
                    id: 'ACT_CPT_SIM_08',
                    title: 'Atelier Pratique : Mission Ultime de Clôture & Audit de Liasse',
                    type: 'simulator',
                    targetComponentId: 'accounting_simulator',
                    completionCriteria: {
                      metric: 'masteryAuditPassed',
                      targetValue: 1,
                      description: 'Réaliser la clôture d\'inventaire complète sans déséquilibre.',
                    },
                    rubricPoints: 40,
                  },
                  comprehensionQuiz: [
                    {
                      id: 'Q_CPT_08',
                      question: 'Quelle est la proportion minimale de bénéfice à affecter obligatoirement à la réserve légale selon l\'Acte Uniforme OHADA sur les sociétés commerciales ?',
                      options: [
                        '10% du bénéfice net jusqu\'à ce que la réserve atteigne 20% du capital social',
                        '5% sans limitation',
                        '50% pour les SA',
                        'La réserve légale est facultative',
                      ],
                      correctIndex: 0,
                      explanation: 'L\'Acte Uniforme sur les Sociétés Commerciales et GIE impose un prélèvement d\'au moins 10% sur les bénéfices nets jusqu\'à ce que la réserve atteigne un cinquième (20%) du capital social.',
                    },
                  ],
                  keyTakeawaySummary: [
                    'L\'analyste et le comptable certifié maîtrisent les enjeux légaux, fiscaux et managériaux de la clôture des comptes.',
                    'La rigueur des écritures garantit la pérennité financière et la réputation de l\'entreprise.',
                  ],
                  nextStepRecommendation: 'Félicitations ! Vous avez validé l\'ensemble du cursus Comptable Général & Auditeur SYSCOHADA Révisé 360°.',
                },
              ],
            },
          ],
          evaluation: {
            id: 'EVAL_CPT_M8',
            moduleId: 'CPT_MOD_8',
            title: 'Examen Final de Maîtrise Certifiante Comptable SYSCOHADA 360°',
            passingScorePercent: 80,
            questions: [
              {
                id: 'FEQ_CPT_1',
                question: 'Quel est l\'impact sur le bilan d\'une omission de dotation aux amortissements en fin d\'exercice ?',
                options: [
                  'L\'actif net est surévalué et le résultat net est artificiellement gonflé',
                  'L\'actif diminue et le passif augmente',
                  'La trésorerie augmente immédiatement',
                  'Aucun impact car c\'est une charge non décaissée',
                ],
                correctIndex: 0,
                explanation: 'Omettre l\'amortissement surévalue l\'actif net en dissimulant la dépréciation et fausse le résultat net en le surévaluant indûment.',
              },
            ],
          },
        },
      ],
    },
  ],

  finalProject: {
    id: 'PRJ_CPT_SYSCOHADA_FINAL',
    title: 'Mission Intégrale de Clôture et Liasse Fiscale d\'une Entreprise Agro-Industrielle',
    companyContext: 'Société Ivoirienne de Transformation d\'Hévéa (SITH SA) - CA : 1,4 Milliard FCFA - San Pedro',
    businessScenario: 'À la clôture de l\'exercice au 31 décembre, vous prenez en charge le dossier de clôture annuelle de SITH SA. Vous devez auditer la balance avant inventaire, comptabiliser les amortissements de l\'usine, évaluer la dépréciation des stocks de caoutchouc, calculer l\'impôt BIC et dresser la liasse financière complète.',
    deliverablesExpected: [
      'Balance générale à 6 colonnes après écritures d\'inventaire',
      'Tableau d\'amortissement certifié et plan de dépréciation des stocks',
      'Bilan et Compte de Résultat certifiés sous le Système Normal SYSCOHADA',
      'Note d\'audit fiscal détaillant le calcul de l\'impôt BIC et la réconciliation TVA',
    ],
    gradingRubric: [
      { criterion: 'Exactitude des calculs d\'amortissements et régularisations', weightPercent: 30, description: 'Zéro anomalie sur le calcul du prorata temporis et des FNP/CCA.' },
      { criterion: 'Équilibre absolu du Bilan et du Compte de Résultat', weightPercent: 30, description: 'Résultat net identique et équilibre bilanciel strict.' },
      { criterion: 'Conformité aux règles fiscales UEMOA / Code Général des Impôts', weightPercent: 20, description: 'Calcul correct de l\'impôt BIC, IMF et déductibilité des provisions.' },
      { criterion: 'Qualité du rapport de synthèse et recommandations d\'audit', weightPercent: 20, description: 'Clarté, professionnalisme et respect du référentiel AUDCIF.' },
    ],
    passingScorePercent: 80,
  },
};
