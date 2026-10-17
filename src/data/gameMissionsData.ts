import { GameMission } from '../types/game';

export const GAME_MISSIONS: GameMission[] = [
  {
    id: 'MISSION_01',
    title: 'La Première Journée du Comptable',
    subtitle: 'Équilibrer les flux fondateurs de la PME Ivoire Distribution à Abidjan',
    companyName: 'Ivoire Distribution SARL',
    companyContext: 'Société commerciale nouvellement créée à Abidjan-Treichville, spécialisée dans la distribution de produits de grande consommation.',
    location: 'Abidjan, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Comptable Junior stagiaire',
    difficulty: 'Débutant',
    timeLimitMinutes: 15,
    briefing: {
      situation: "C'est votre premier jour chez Ivoire Distribution SARL. Le gérant, M. Konan, vous accueille avec trois dossiers urgents posés sur le bureau. La société vient d'être constituée mais les opérations de départ n'ont pas encore été correctement imputées.",
      objectives: [
        "Examiner les pièces justificatives d'apport initial et d'emprunt.",
        "Imputer les opérations en respectant la stricte égalité Débit = Crédit.",
        "Présenter un bilan d'ouverture parfaitement équilibré à M. Konan avant midi.",
      ],
      risks: [
        "Attention à ne pas confondre le compte de banque (actif) et les dettes bancaires (passif).",
        "Ne validez aucune écriture dont l'égalité mathématique n'est pas vérifiée.",
      ],
    },
    documents: [
      {
        id: 'DOC_01',
        title: 'Acte Notarié de Constitution',
        type: 'contract',
        content: `RÉPUBLIQUE DE CÔTE D'IVOIRE
ÉTUDE DE MAÎTRE BAKAYOKO, NOTAIRE À ABIDJAN
ACTE DE CONSTITUTION DE SOCIÉTÉ
Dénomination : IVOIRE DISTRIBUTION SARL
Capital social : 15 000 000 FCFA divisé en 1 500 parts de 10 000 FCFA chacune, intégralement souscrites et libérées en numéraire, déposées à la banque SGBCI agence Treichville le 02/01/2026.`,
      },
      {
        id: 'DOC_02',
        title: 'Facture Fournisseur Micro-Bureau',
        type: 'invoice',
        content: `SOCIÉTÉ MICRO-BUREAU ABIDJAN
DOIT : IVOIRE DISTRIBUTION SARL
Facture n° FAC-2026-089 du 05/01/2026
Objet : 3 Ordinateurs de gestion + 1 Serveur + Onduleur
Montant Net à payer : 3 500 000 FCFA TTC
Modalité : Payé par chèque bancaire n° 00412 à la livraison.`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Enregistrement de l\'apport en capital',
        speaker: {
          name: 'M. Konan',
          role: 'Gérant et Fondateur',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Bienvenue dans l'équipe ! Voici l'acte notarié de constitution. Les associés ont apporté 15 000 000 FCFA déposés sur notre compte bancaire SGBCI. Comment enregistrez-vous cette première écriture dans notre journal ?",
        taskInstruction: 'Choisissez l\'écriture comptable conforme au plan SYSCOHADA.',
        documentIdsToInspect: ['DOC_01'],
        options: [
          {
            id: 'OPT_1A',
            label: 'Débit Compte 5211 (Banque : 15M FCFA) / Crédit Compte 1013 (Capital social : 15M FCFA)',
            explanation: 'Imputation parfaite ! L\'actif bancaire augmente par le débit, et les capitaux propres de la société augmentent par le crédit.',
            pointsDelta: 25,
            cashImpactFCFA: 15000000,
            feedbackImmediate: 'M. Konan sourit : « Excellent réflexe, le compte en banque est approvisionné et le capital est tracé ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_1B',
            label: 'Débit Compte 1013 (Capital social : 15M FCFA) / Crédit Compte 5211 (Banque : 15M FCFA)',
            explanation: 'Erreur d\'inversion ! Créditer la banque signifierait que l\'entreprise paie 15M FCFA à quelqu\'un.',
            pointsDelta: 0,
            cashImpactFCFA: -15000000,
            feedbackImmediate: 'M. Konan fronce les sourcils : « Attention ! Si vous créditez la banque, vous videz notre compte au lieu de le créditer ! »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Achat du matériel informatique',
        speaker: {
          name: 'M. Konan',
          role: 'Gérant et Fondateur',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Nous venons de recevoir la facture de Micro-Bureau pour nos ordinateurs (3 500 000 FCFA), payés comptant par chèque bancaire. Comment enregistrez-vous cela ?",
        taskInstruction: 'Sélectionnez l\'écriture qui constate l\'entrée du matériel et la sortie des fonds.',
        documentIdsToInspect: ['DOC_02'],
        options: [
          {
            id: 'OPT_2A',
            label: 'Débit Compte 2444 (Matériel informatique : 3.5M FCFA) / Crédit Compte 5211 (Banque : 3.5M FCFA)',
            explanation: 'Exact ! Un bien durable entre à l\'actif immobilisé (classe 2) et la trésorerie diminue d\'autant (classe 5).',
            pointsDelta: 25,
            cashImpactFCFA: -3500000,
            feedbackImmediate: 'M. Konan valide : « Parfait. Notre actif s\'enrichit de machines et notre banque reflète le chèque. »',
            isOptimal: true,
          },
          {
            id: 'OPT_2B',
            label: 'Débit Compte 6011 (Achats de marchandises : 3.5M FCFA) / Crédit Compte 5211 (Banque : 3.5M FCFA)',
            explanation: 'Confusion d\'imputation ! Des ordinateurs de bureau pour l\'équipe ne sont pas des marchandises destinées à être revendues, mais des immobilisations corporelles.',
            pointsDelta: 5,
            cashImpactFCFA: -3500000,
            feedbackImmediate: 'M. Konan hésite : « Attention, nous n\'allons pas revendre ces PC aux clients, ils vont nous servir pendant 3 ans ! C\'est une immobilisation. »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_3',
        title: 'Étape 3 : Contrôle de l\'équilibre final du Bilan',
        speaker: {
          name: 'M. Konan',
          role: 'Gérant et Fondateur',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Après ces deux opérations, quel est le montant exact de notre Trésorerie en Banque et le Total de notre Bilan ?",
        taskInstruction: 'Faites le point arithmétique pour conclure la mission.',
        documentIdsToInspect: ['DOC_01', 'DOC_02'],
        options: [
          {
            id: 'OPT_3A',
            label: 'Banque = 11 500 000 FCFA | Total Bilan = 15 000 000 FCFA (Actif: Immo 3.5M + Banque 11.5M == Passif: Capital 15M)',
            explanation: 'Calcul sans faille : 15 000 000 - 3 500 000 = 11 500 000 FCFA en banque. Actif total (3.5M + 11.5M = 15M) = Passif total (15M).',
            pointsDelta: 50,
            feedbackImmediate: 'M. Konan tape dans ses mains : « Chapeau bas ! Votre bilan d\'ouverture est prêt pour l\'expert-comptable. Mission accomplie avec mention ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_3B',
            label: 'Banque = 15 000 000 FCFA | Total Bilan = 18 500 000 FCFA',
            explanation: 'Faux : Vous avez oublié de déduire le paiement des ordinateurs du compte en banque.',
            pointsDelta: 0,
            feedbackImmediate: 'M. Konan secoue la tête : « Non, nous avons déjà décaissé les 3.5M FCFA pour les PC ! Le solde banque ne peut pas être resté à 15M. »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "L'apport initial crédite le capital social (1013) et débite la banque (5211). L'achat d'équipement constitue un investissement durable (compte 2444) qui réduit les disponibilités bancaires sans impacter le résultat immédiat.",
      commonPitfalls: [
        "Confondre matériel de bureau durable (immobilisation classe 2) et fournitures consommables (charges classe 6).",
        "Oublier de déduire les décaissements du solde bancaire.",
      ],
      keyTakeaway: "Chaque opération transforme la structure du bilan sans jamais rompre l'égalité fondamentale Actif = Passif.",
    },
  },
  {
    id: 'MISSION_02',
    title: 'Répare le Tableau de Bord de 16 Heures',
    subtitle: 'Sauver le reporting de direction avant la réunion du comité exécutif',
    companyName: 'Société Ivoirienne de Prestations (SIP)',
    companyContext: 'Entreprise de services B2B à Abidjan-Cocody. Le contrôleur de gestion a quitté précipitamment l\'entreprise en laissant un classeur corrompu.',
    location: 'Abidjan, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Analyste Modélisateur Excel',
    difficulty: 'Opérationnel',
    timeLimitMinutes: 20,
    briefing: {
      situation: "Il est 15h15. Le Directeur Général réunit le comité exécutif à 16h00 pour arbitrer les budgets des trois filiales régionales. Le classeur Excel transmis affiche des erreurs #DIV/0! et #VALEUR! qui empêchent la lecture des marges.",
      objectives: [
        "Auditer la grille de calcul et repérer les formules défaillantes.",
        "Remplacer les formules erronées par des formules dynamiques et sécurisées (SIERREUR, références absolues).",
        "Transmettre une synthèse exécutive propre et irréprochable au DG.",
      ],
      risks: [
        "Interdiction formelle de remplacer les formules par des chiffres tapés en dur !",
        "Le DG posera des questions sur la sensibilité des marges.",
      ],
    },
    documents: [
      {
        id: 'DOC_SIP_01',
        title: 'Extrait du Classeur Corrompu',
        type: 'spreadsheet',
        content: `TABLEAU DE BORD COMMERCIAL SIP
Cellule B4 (Ventes Réalisées) : 45 000 000 FCFA
Cellule B5 (Ventes Prévues) : 0 FCFA (donnée manquante)
Cellule B6 (Taux de Réalisation) : =B4 / B5  ---> Erreur #DIV/0!
Cellule C4 (Marge Brute) : =B4 * 0.25        ---> Alerte Hardcoding (taux 25% codé en dur)`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Corriger l\'erreur #DIV/0! du taux de réalisation',
        speaker: {
          name: 'Mme Bamba',
          role: 'Directrice Générale',
          avatar: '👩🏾‍💼',
        },
        dialogue: "Regardez la ligne 6 : dès que la prévision d'une région est à zéro ou non renseignée, tout mon tableau affiche #DIV/0! et bloque les totaux ! Quelle formule propre devez-vous insérer en cellule B6 ?",
        taskInstruction: 'Choisissez la formule Excel robuste qui neutralise la division par zéro.',
        documentIdsToInspect: ['DOC_SIP_01'],
        options: [
          {
            id: 'OPT_B6_A',
            label: '=SIERREUR(B4 / B5; 0)',
            explanation: 'Formule professionnelle idéale : si B5 est égal à zéro ou vide, SIERREUR renvoie 0% proprement sans briser la chaîne de calcul.',
            pointsDelta: 40,
            feedbackImmediate: 'Mme Bamba sourit : « Parfait ! La colonne affiche désormais 0% au lieu d\'un message d\'erreur disgracieux. »',
            isOptimal: true,
          },
          {
            id: 'OPT_B6_B',
            label: 'Écrire "0" directement au clavier dans la cellule B6',
            explanation: 'Faute professionnelle grave ! Écrire une valeur fixe détruit l\'automatisation de la formule pour les mois futurs.',
            pointsDelta: -10,
            feedbackImmediate: 'Mme Bamba proteste : « Non ! Si nous mettons à jour la prévision le mois prochain, le chiffre ne se recalculera plus ! Utilisez une formule. »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Éliminer la constante hardcodée sur la marge',
        speaker: {
          name: 'Mme Bamba',
          role: 'Directrice Générale',
          avatar: '👩🏾‍💼',
        },
        dialogue: "En cellule C4, l'ancien contrôleur a écrit '=B4 * 0.25'. Si le conseil d'administration décide de réviser notre taux de marge cible à 28%, nous allons devoir modifier 50 formules à la main ! Que préconisez-vous ?",
        taskInstruction: 'Appliquez la bonne pratique de modélisation financière.',
        documentIdsToInspect: ['DOC_SIP_01'],
        options: [
          {
            id: 'OPT_C4_A',
            label: 'Placer le taux cible dans la cellule de paramètre $B$1 et écrire en C4 : =B4 * $B$1',
            explanation: 'Règle de l\'art : une cellule de paramètre unique référencée en absolu ($B$1). La modification du taux en B1 mettra à jour l\'ensemble du modèle instantanément.',
            pointsDelta: 60,
            feedbackImmediate: 'Mme Bamba est conquise : « C\'est exactement ce que j\'attendais. Le modèle est désormais agile et auditable. »',
            isOptimal: true,
          },
          {
            id: 'OPT_C4_B',
            label: 'Faire un "Rechercher / Remplacer" de 0.25 par 0.28 dans toutes les cellules',
            explanation: 'Pratique artisanale risquée pouvant corrompre d\'autres valeurs ou formules.',
            pointsDelta: 10,
            feedbackImmediate: 'Mme Bamba secoue la tête : « Trop risqué. Si un autre chiffre comporte 0.25, il sera corrompu par mégarde. »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "Un modèle financier professionnel ne contient aucune constante en dur dans ses formules et protège toutes ses divisions par la fonction SIERREUR ou un test préalable.",
      commonPitfalls: [
        "Remplacer une formule par une valeur fixe pour masquer une erreur ponctuelle.",
        "Oublier de figer les cellules de paramètres avec les dollars ($A$1).",
      ],
      keyTakeaway: "La robustesse d'un classeur financier se mesure à sa capacité à absorber des données manquantes sans jamais afficher d'erreurs techniques.",
    },
  },
  {
    id: 'MISSION_03',
    title: 'Le Bordereau Contesté du Courtier',
    subtitle: 'Rapprocher les commissions et faire respecter les conventions d\'assurance',
    companyName: 'Ivoire Courtage Conseil (ICC)',
    companyContext: 'Cabinet de courtage d\'assurance de premier rang à Abidjan-Plateau, gérant un portefeuille de 2 milliards FCFA de primes annuelles.',
    location: 'Abidjan, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Analyste Gestion de Portefeuille',
    difficulty: 'Expert',
    timeLimitMinutes: 25,
    briefing: {
      situation: "Le cabinet ICC vient de recevoir le relevé trimestriel de commissions de la compagnie Sanlam Assurances. Le montant global viré semble inférieur de plusieurs millions à nos projections contractuelles.",
      objectives: [
        "Importer le bordereau et le rapprocher contrat par contrat de notre base de polices.",
        "Identifier les polices présentant un taux erroné ou une assiette contestée.",
        "Établir la note de réclamation officielle chiffrée destinée à la direction générale de l'assureur.",
      ],
      risks: [
        "Ne contestez pas une ligne sans disposer de la référence conventionnelle exacte.",
        "Vérifiez si les taxes d'assurance (14.5%) ont été exclues de l'assiette de commissionnement.",
      ],
    },
    documents: [
      {
        id: 'DOC_ICC_01',
        title: 'Convention de Courtage ICC / Compagnie Sanlam',
        type: 'contract',
        content: `CONVENTION DE COURTAGE DU 01/01/2025
Entre Ivoire Courtage Conseil (ICC) et Sanlam Assurance CI
Barème des commissions applicables sur Primes Nettes d'Émission :
- Branche Automobile (Flottes Entreprises) : 12.0 %
- Branche Santé & Prévoyance Groupe : 10.0 %
- Branche Incendie & Risques Industriels (IARD) : 15.0 %
- Branche Responsabilité Civile : 12.5 %`,
      },
      {
        id: 'DOC_ICC_02',
        title: 'Bordereau de Règlement Trimestriel Reçu',
        type: 'spreadsheet',
        content: `BORDEREAU SANLAM T1-2026
Police POL-AUTO-8801 (SOTRA Fictive) : Prime Nette = 18 000 000 FCFA | Commission Déclarée = 1 800 000 FCFA (Taux appliqué : 10.0%)
Police POL-SANTE-4412 (Cacao CI) : Prime Nette = 25 000 000 FCFA | Commission Déclarée = 2 500 000 FCFA (Taux appliqué : 10.0%)`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Rapprochement de la police POL-AUTO-8801',
        speaker: {
          name: 'M. Diallo',
          role: 'Directeur Technique Courtage',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Regardez la ligne de la flotte automobile de la SOTRA (Prime nette : 18 000 000 FCFA). Sanlam nous a versé 1 800 000 FCFA. Que remarquez-vous par rapport à notre convention ?",
        taskInstruction: 'Analysez l\'écart de commission et chiffrez la sous-commission.',
        documentIdsToInspect: ['DOC_ICC_01', 'DOC_ICC_02'],
        options: [
          {
            id: 'OPT_ICC_1A',
            label: 'Sous-commission de 360 000 FCFA : Sanlam a appliqué 10% au lieu du taux conventionnel Flotte de 12% (Attendu : 2 160 000 FCFA)',
            explanation: 'Diagnostic parfait : 18 000 000 * 12% = 2 160 000 FCFA. Sanlam n\'a payé que 1 800 000 FCFA, soit un manque à gagner de 360 000 FCFA sur ce seul contrat.',
            pointsDelta: 50,
            feedbackImmediate: 'M. Diallo s\'exclame : « Bien vu ! L\'assureur a appliqué par erreur le taux standard particulier au lieu du barème Flotte Entreprise ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_ICC_1B',
            label: 'Le calcul est correct car le taux légal CIMA est de 10% pour toutes les polices',
            explanation: 'Faux : Le Code CIMA fixe des plafonds mais laisse les conventions de courtage de place définir les taux contractuels par branche.',
            pointsDelta: 0,
            feedbackImmediate: 'M. Diallo réagit : « Non, notre convention signée stipule formellement 12.0% pour les flottes ! Nous ne devons pas renoncer à nos droits contractuels. »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Action de recouvrement et réclamation',
        speaker: {
          name: 'M. Diallo',
          role: 'Directeur Technique Courtage',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Comment formulez-vous notre réclamation officielle auprès du directeur commercial de la compagnie d'assurance ?",
        taskInstruction: 'Sélectionnez la démarche professionnelle appropriée.',
        documentIdsToInspect: ['DOC_ICC_01', 'DOC_ICC_02'],
        options: [
          {
            id: 'OPT_ICC_2A',
            label: 'Émettre un état de réconciliation contradictoire citant l\'article 4 de la convention et réclamer le versement du reliquat de 360 000 FCFA sous quinzaine',
            explanation: 'Procédure professionnelle standard : appui sur les pièces contractuelles, chiffrage exact de l\'écart et fixation d\'une échéance d\'apurement.',
            pointsDelta: 50,
            feedbackImmediate: 'M. Diallo valide : « Lettre signée et envoyée avec le tableau des écarts. Sanlam a confirmé la régularisation sous 72h. Excellent travail ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_ICC_2B',
            label: 'Suspendre immédiatement toutes les polices d\'assurance de nos clients chez cet assureur',
            explanation: 'Action disproportionnée et illégale pénalisant gravement les assurés innocents.',
            pointsDelta: -20,
            feedbackImmediate: 'M. Diallo s\'inquiète : « Absolument pas ! Ce serait une faute lourde qui engagerait notre responsabilité civile professionnelle. Il faut suivre la voie contractuelle. »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "Le contrôle des bordereaux de courtage est l'une des tâches à plus haute valeur ajoutée d'un cabinet : les erreurs d'assiette ou de taux de commissionnement par les compagnies sont courantes et représentent souvent 3% à 5% de marge nette additionnelle récupérée.",
      commonPitfalls: [
        "Accepter les bordereaux assureurs sans rapprochement systématique police par police.",
        "Confondre prime brute TTC et assiette de commissionnement hors taxes.",
      ],
      keyTakeaway: "Un courtier d'assurance performant protège rigoureusement ses revenus en automatisant le lettrage de ses bordereaux.",
    },
  },
  {
    id: 'MISSION_04',
    title: 'Le Comité de Crédit PME',
    subtitle: 'Évaluer une demande de prêt de 50 millions FCFA pour la SIPLAST à Yopougon',
    companyName: 'Société Ivoirienne de Plastiques (SIPLAST)',
    companyContext: 'PME industrielle installée dans la zone industrielle de Yopougon, fabriquant des emballages recyclables pour l\'agro-alimentaire.',
    location: 'Abidjan-Yopougon, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Analyste Risques & Engagements Bancaires',
    difficulty: 'Opérationnel',
    timeLimitMinutes: 20,
    briefing: {
      situation: "Le directeur d'agence vous transmet la demande de prêt de 50 000 000 FCFA sollicitée par SIPLAST pour acheter une nouvelle ligne d'extrusion. Vous devez analyser les états financiers N et N-1, calculer les ratios de solvabilité et de liquidité, et soutenir votre recommandation devant le comité des engagements.",
      objectives: [
        "Examiner le bilan fonctionnel : calculer le Fonds de Roulement, le BFR et la Trésorerie Nette.",
        "Vérifier la capacité d'endettement et le ratio de couverture des annuités par l'EBITDA.",
        "Rédiger un avis argumenté (favorable ou défavorable) en précisant les garanties exigibles.",
      ],
      risks: [
        "Un BFR trop lourd qui asphyxie la trésorerie est la première cause de défaut des PME en croissance.",
        "Ne donnez pas d'accord sans exiger la domiciliation irrévocable des flux commerciaux.",
      ],
    },
    documents: [
      {
        id: 'DOC_SIPLAST_01',
        title: 'Bilan & Compte de Résultat Simplifié (Exercice N)',
        type: 'trial_balance',
        content: `SIPLAST SARL - ZONE INDUSTRIELLE YOPOUGON
ÉTATS FINANCIERS SYSCOHADA (EXERCICE N)
Actif Immobilisé net : 65 000 000 FCFA
Stocks matières & finis : 23 000 000 FCFA
Créances clients (DSO = 52j) : 35 000 000 FCFA
Disponibilités bancaires : 25 000 000 FCFA
TOTAL ACTIF : 148 000 000 FCFA

Capitaux Propres : 70 000 000 FCFA
Dettes Financières LT : 25 000 000 FCFA
Dettes Fournisseurs (DPO = 60j) : 25 000 000 FCFA
Dettes Fiscales & Sociales : 13 000 000 FCFA
Découverts bancaires : 5 000 000 FCFA
TOTAL PASSIF : 148 000 000 FCFA

Chiffre d'Affaires HT : 240 000 000 FCFA | Résultat Exploitation : 32 000 000 FCFA | Résultat Net : 22 000 000 FCFA`,
      },
      {
        id: 'DOC_SIPLAST_02',
        title: 'Devis Machine Fournisseur & Plan de Financement',
        type: 'contract',
        content: `DEVIS ÉQUIPEMENT INDUSTRIEL - SARL TECH-EXTRUSION
Objet : Ligne d'extrusion thermoformée haute cadence
Prix d'acquisition : 60 000 000 FCFA HT
Apport personnel de SIPLAST en fonds propres : 10 000 000 FCFA
Emprunt bancaire sollicité : 50 000 000 FCFA amortissable sur 5 ans à 7.5% annuel.
Annuité prévisionnelle constante : 12 400 000 FCFA / an.`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Diagnostic de l\'équilibre fonctionnel (FR, BFR, TN)',
        speaker: {
          name: 'Mme Bamba',
          role: 'Directrice des Risques Bancaires',
          avatar: '👩🏾‍💼',
        },
        dialogue: "Bonjour ! Avant d'entrer en comité, j'ai besoin de vos chiffres sur la structure financière de SIPLAST. Quel est leur Fonds de Roulement, leur BFR et leur Trésorerie Nette ?",
        taskInstruction: 'Calculez le FR, le BFR et la Trésorerie Nette à partir du bilan N.',
        documentIdsToInspect: ['DOC_SIPLAST_01'],
        options: [
          {
            id: 'OPT_CR_1A',
            label: 'FR = +30 000 000 FCFA | BFR = +20 000 000 FCFA | Trésorerie Nette = +20 000 000 FCFA (ou +10M selon découverts)',
            explanation: 'Calcul rigoureux : Ressources stables (70M + 25M = 95M) - Emplois stables (65M) = FR de 30M FCFA. Actif circulant hors trésorerie (58M) - Passif circulant hors trésorerie (38M) = BFR de 20M FCFA. La trésorerie nette bilan (25M - 5M = 20M) et FR - BFR = 10M FCFA montrent une structure saine.',
            pointsDelta: 35,
            feedbackImmediate: 'Mme Bamba note : « Très bien. Le FR est positif (+30M) et couvre l\'intégralité du BFR (+20M). La structure de départ est solide. »',
            isOptimal: true,
          },
          {
            id: 'OPT_CR_1B',
            label: 'FR = -15 000 000 FCFA et BFR négatif, la société est en faillite imminente',
            explanation: 'Erreur grave de calcul : Les capitaux propres (70M) et dettes long terme (25M) dépassent largement l\'actif immobilisé (65M). Le FR est largement positif.',
            pointsDelta: 0,
            feedbackImmediate: 'Mme Bamba sursaute : « Vos calculs sont erronés ! 95 millions de ressources stables face à 65 millions d\'actifs, cela fait +30M et non -15M ! »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Analyse de la capacité de remboursement de l\'emprunt de 50M',
        speaker: {
          name: 'Mme Bamba',
          role: 'Directrice des Risques Bancaires',
          avatar: '👩🏾‍💼',
        },
        dialogue: "La nouvelle machine coûte 60M FCFA dont 50M d'emprunt à 7.5% sur 5 ans (annuité de 12.4M FCFA). Le résultat d'exploitation actuel est de 32M FCFA. L'entreprise peut-elle supporter cette charge annuelle ?",
        taskInstruction: 'Évaluez la couverture de l\'annuité par l\'EBITDA et l\'endettement.',
        documentIdsToInspect: ['DOC_SIPLAST_01', 'DOC_SIPLAST_02'],
        options: [
          {
            id: 'OPT_CR_2A',
            label: 'Oui : L\'EBITDA de 32M FCFA couvre plus de 2.5 fois l\'annuité de 12.4M FCFA, et la dette financière totale après prêt (75M) reste inférieure ou égale aux capitaux propres (70M-80M)',
            explanation: 'Exactement : Le ratio EBITDA / Annuité est de 32 / 12.4 = 2.58x (très au-dessus du plancher prudentiel de 1.5x). L\'effet de levier est maîtrisé.',
            pointsDelta: 35,
            feedbackImmediate: 'Mme Bamba acquiesce : « Parfait. La marge de sécurité sur les flux de trésorerie d\'exploitation est confortable pour assurer le service de la dette. »',
            isOptimal: true,
          },
          {
            id: 'OPT_CR_2B',
            label: 'Non : L\'annuité de 12.4M FCFA absorbe plus de 80% du chiffre d\'affaires de l\'entreprise',
            explanation: 'Confusion grossière : Le chiffre d\'affaires est de 240 millions FCFA, l\'annuité de 12.4M n\'en représente que 5.1% !',
            pointsDelta: 0,
            feedbackImmediate: 'Mme Bamba secoue la tête : « Vous confondez le chiffre d\'affaires de 240M avec le résultat net ! Il faut comparer avec la rentabilité réelle. »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_3',
        title: 'Étape 3 : Délibération finale du comité de crédit',
        speaker: {
          name: 'M. Touré',
          role: 'Président du Comité des Engagements',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Chers collègues, nous devons voter sur ce dossier SIPLAST de 50M FCFA. Quelle est votre décision finale et quelles exigences de sûretés posez-vous ?",
        taskInstruction: 'Formulez la décision finale professionnelle.',
        documentIdsToInspect: ['DOC_SIPLAST_01', 'DOC_SIPLAST_02'],
        options: [
          {
            id: 'OPT_CR_3A',
            label: 'Avis Favorable sous conditions : Domiciliation irrévocable de 60% du CA, nantissement de la machine acquise et caution personnelle du gérant',
            explanation: 'Décision bancaire d\'école : Le projet est économiquement viable, mais la banque se prémunit contre le risque de détournement de flux et garantit son rang de créancier.',
            pointsDelta: 30,
            feedbackImmediate: 'M. Touré tape sur la table : « Décision adoptée à l\'unanimité ! Prêt accordé avec les sûretés conventionnelles. Excellent dossier d\'instruction. »',
            isOptimal: true,
          },
          {
            id: 'OPT_CR_3B',
            label: 'Refus catégorique : Aucune PME ivoirienne ne doit emprunter plus de 10 millions FCFA',
            explanation: 'Approche arbitraire et non professionnelle : Les ratios financiers objectifs justifient pleinement le montant sollicité.',
            pointsDelta: -10,
            feedbackImmediate: 'M. Touré est déçu : « Nous perdrions un excellent client industriel au profit d\'une banque concurrente sans justification financière. »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "L'instruction d'un crédit PME repose sur le triptyque : 1) Structure bilancielle saine (FR > BFR), 2) Capacité de remboursement éprouvée (EBITDA / Annuité > 2x), 3) Maîtrise des flux (domiciliation bancaire et sûretés réelles).",
      commonPitfalls: [
        "Confondre chiffre d'affaires et capacité d'autofinancement disponible.",
        "Oublier d'imposer la domiciliation bancaire des règlements clients.",
      ],
      keyTakeaway: "Un bon banquier ne prête pas sur des promesses mais sur la capacité démontrée de l'entreprise à transformer son résultat d'exploitation en cash disponible.",
    },
  },
  {
    id: 'MISSION_05',
    title: 'Le Mois Rouge',
    subtitle: 'Élucider l\'effondrement de la marge d\'Ivoire Agro-Industrie à Bouaké',
    companyName: 'Ivoire Agro-Industrie SARL',
    companyContext: 'Unité de transformation agro-alimentaire à Bouaké (fabrication de nectars de fruits et confitures tropicales).',
    location: 'Bouaké, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Contrôleur de Gestion Régional',
    difficulty: 'Opérationnel',
    timeLimitMinutes: 20,
    briefing: {
      situation: "Réunion de crise chez Ivoire Agro-Industrie. Le rapport mensuel vient de sortir : les volumes de vente ont progressé de 20% par rapport au budget, mais le résultat d'exploitation a chuté de 45% ! Le Directeur Général est furieux et accuse le service comptable d'incompétence. Vous devez décomposer les écarts pour expliquer la vérité des chiffres.",
      objectives: [
        "Reconstituer le budget flexible au niveau d'activité réel.",
        "Isoler l'effet volume, l'effet prix et la dérive des coûts variables.",
        "Présenter les causes racines et proposer 3 mesures correctives immédiates.",
      ],
      risks: [
        "Ne confondez pas une hausse de chiffre d'affaires avec une création de marge.",
        "Prenez en compte les remises tarifaires massives accordées par les équipes commerciales pour gonfler leurs volumes.",
      ],
    },
    documents: [
      {
        id: 'DOC_AGRO_01',
        title: 'Tableau Budgétaire vs Réalisé du Mois',
        type: 'spreadsheet',
        content: `IVOIRE AGRO-INDUSTRIE - SUIVI MENSUEL BOUAKÉ
PRODUIT : Brique Jus d'Ananas 1L

BUDGET INITIAL :
Quantité prévue : 15 000 unités
Prix unitaire HT prévu : 1 200 FCFA
Coût variable unitaire HT standard : 700 FCFA (Marge unitaire = 500 FCFA)
Coûts fixes de structure budgétés : 4 500 000 FCFA
Résultat d'Exploitation Budgété : (15 000 * 500) - 4 500 000 = +3 000 000 FCFA

RÉALISÉ DU MOIS :
Quantité vendue : 18 000 unités (+20% de volume !)
Prix unitaire HT moyen réalisé : 1 050 FCFA (-150 FCFA de remise moyenne !)
Coût variable unitaire HT constaté : 780 FCFA (+80 FCFA de surcoût matière et emballage !)
Coûts fixes réels : 4 800 000 FCFA (+300 000 FCFA de frais de transport d'urgence)
Résultat d'Exploitation Réalisé : (18 000 * (1 050 - 780)) - 4 800 000 = (18 000 * 270) - 4 800 000 = +60 000 FCFA !! (Plongeon de 2 940 000 FCFA)`,
      },
      {
        id: 'DOC_AGRO_02',
        title: 'Note Interne Direction Commerciale & Achats',
        type: 'email',
        content: `De : Directeur Commercial
À : Directeur Général
Objet : Succès commercial du mois !
"Monsieur le Directeur, nos équipes ont cartonné ce mois-ci avec 18 000 briques écoulées contre 15 000 prévues, grâce à une promotion agressive de -12% accordée aux demi-grossistes d'Adjamé et Bouaké !"

De : Responsable Achats
À : Directeur Général
Objet : Rupture matière et achats de dépannage
"Face à la hausse brutale des commandes commerciales non planifiée, nous avons dû acheter du carton d'emballage en urgence par fret aérien au prix fort, générant un surcoût de 80 FCFA par brique."`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Calcul de l\'effet ciseau (Effet Volume vs Effet Prix)',
        speaker: {
          name: 'M. Yao',
          role: 'Directeur Général',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Mes commerciaux affirment avoir fait un carton avec +3 000 briques vendues (+20%). Pourquoi mon résultat d'exploitation ne reflète-t-il pas ce succès ?",
        taskInstruction: 'Décomposez l\'effet volume et l\'effet prix sur la marge.',
        documentIdsToInspect: ['DOC_AGRO_01', 'DOC_AGRO_02'],
        options: [
          {
            id: 'OPT_MR_1A',
            label: 'Effet Volume Favorable (+1 500 000 FCFA) mais anéanti par l\'Effet Prix Défavorable (-2 700 000 FCFA) : Les remises commerciales ont détruit plus de valeur que le gain de volume !',
            explanation: 'Démonstration mathématique irréfutable : Effet Volume = (18 000 - 15 000) * 500 FCFA = +1 500 000 FCFA. Effet Prix = (1 050 - 1 200) * 18 000 = -2 700 000 FCFA. Le solde commercial net est une perte de 1 200 000 FCFA !',
            pointsDelta: 40,
            feedbackImmediate: 'M. Yao ouvre de grands yeux : « Incroyable ! En voulant faire du volume à tout prix, ils ont détruit 2.7 millions de marge avec leurs remises sauvages ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_MR_1B',
            label: 'L\'effet prix est positif car vendre plus rapporte obligatoirement plus de bénéfice',
            explanation: 'Erreur conceptuelle majeure : Vendre à perte ou avec une remise excessive détruit la marge unitaire.',
            pointsDelta: 0,
            feedbackImmediate: 'M. Yao s\'agace : « Regardez les chiffres ! Le prix moyen est passé de 1200 à 1050 FCFA, c\'est une baisse de prix nette ! »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Analyse de la dérive des coûts d\'approvisionnement',
        speaker: {
          name: 'M. Yao',
          role: 'Directeur Général',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Et du côté de l'usine ? Les achats prétendent qu'ils ont dû gérer l'urgence. Quel a été l'impact financier de cette hausse de coût variable unitaire ?",
        taskInstruction: 'Chiffrez l\'écart sur coût variable unitaire et surcoût de structure.',
        documentIdsToInspect: ['DOC_AGRO_01', 'DOC_AGRO_02'],
        options: [
          {
            id: 'OPT_MR_2A',
            label: 'Surcoût variable de 1 440 000 FCFA ((780 - 700) * 18 000) + 300 000 FCFA de surcoût fixe, portant la dérive industrielle à 1 740 000 FCFA',
            explanation: 'Calcul rigoureux : Dérive coût variable = 80 FCFA * 18 000 = 1 440 000 FCFA. Dérive coûts fixes = 4.8M - 4.5M = 300 000 FCFA. Total dérive industrielle = 1 740 000 FCFA. Ajouté à la perte commerciale de 1.2M, on retrouve exactement la chute de résultat de 2 940 000 FCFA !',
            pointsDelta: 40,
            feedbackImmediate: 'M. Yao valide : « La réconciliation est parfaite : -1.2M de perte commerciale et -1.74M de surcoût usine = -2.94M de baisse de résultat. Tout s\'éclaire ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_MR_2B',
            label: 'L\'usine n\'a aucun surcoût car 80 FCFA par brique est une somme négligeable',
            explanation: 'Erreur d\'échelle : Multiplié par 18 000 unités, 80 FCFA représente près d\'un million et demi de FCFA !',
            pointsDelta: 0,
            feedbackImmediate: 'M. Yao vous reprend : « 80 FCFA fois 18 000 briques, cela fait près d\'un million et demi de FCFA ! En industrie, les centimes font les millions. »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_3',
        title: 'Étape 3 : Plan d\'action managérial pour redresser la barre',
        speaker: {
          name: 'M. Yao',
          role: 'Directeur Général',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Maintenant que nous savons pourquoi le mois est rouge, que décidons-nous pour le mois prochain ?",
        taskInstruction: 'Sélectionnez les mesures correctives de saine gestion.',
        documentIdsToInspect: ['DOC_AGRO_01', 'DOC_AGRO_02'],
        options: [
          {
            id: 'OPT_MR_3A',
            label: 'Verrouiller les remises commerciales avec un prix plancher à 1 180 FCFA et synchroniser les prévisions de ventes avec les approvisionnements pour éviter les achats d\'urgence',
            explanation: 'Plan d\'action exemplaire : Restauration de la marge unitaire et alignement logistique S&OP (Sales and Operations Planning).',
            pointsDelta: 20,
            feedbackImmediate: 'M. Yao signe la note de service : « Excellente décision. Fin des remises sauvages sans validation préalable. Le mois prochain sera bénéficiaire ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_MR_3B',
            label: 'Doubler les remises à -30% pour écouler 30 000 briques au lieu de 18 000',
            explanation: 'Stratégie suicidaire qui aggraverait massivement les pertes d\'exploitation.',
            pointsDelta: -20,
            feedbackImmediate: 'M. Yao s\'étrangle : « Mais vous voulez notre faillite ? Plus nous vendrions à ce tarif dégradé, plus nous creuserions notre tombe ! »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "L'analyse des écarts avec budget flexible est l'arme maîtresse du contrôleur de gestion : elle permet de dissocier la performance commerciale (prix/volume) de la performance opérationnelle (rendement matières/frais généraux) et d'éviter les faux diagnostics.",
      commonPitfalls: [
        "Célébrer une hausse de volume de vente sans vérifier la marge unitaire réellement encaissée.",
        "Négliger l'impact d'une hausse 'minime' de coût unitaire sur de gros volumes.",
      ],
      keyTakeaway: "Le chiffre d'affaires flatte l'ego, mais seul le résultat d'exploitation nourrit l'entreprise. Ne sacrifiez jamais les prix sans mesurer l'effet volume de compensation requis.",
    },
  },
  {
    id: 'MISSION_06',
    title: 'Le Reporting de 16 Heures',
    subtitle: 'Construire une synthèse multidimensionnelle fiable avant le conseil d\'administration',
    companyName: 'Ivoire Distribution SARL',
    companyContext: 'Société de négoce et distribution régionale basée à Abidjan-Treichville, desservant 5 zones commerciales en Côte d\'Ivoire.',
    location: 'Abidjan, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Analyste Financier & BI Junior',
    difficulty: 'Opérationnel',
    timeLimitMinutes: 20,
    briefing: {
      situation: "Il est 15h15. Le Directeur Général vous appelle en urgence : le Conseil d'Administration se réunit à 16h00 précises. Il a besoin d'une synthèse claire des ventes du trimestre par région (Abidjan, San Pedro, Bouaké, Yamoussoukro) et par canal de distribution (Grossistes, Supermarchés, Boutiques), avec la marge dégagée par chaque segment. Le fichier brut extrait de l'ERP comporte des anomalies.",
      objectives: [
        "Nettoyer les données brutes (supprimer doublons et corriger erreurs d'affectation).",
        "Construire le Tableau Croisé Dynamique avec les bons axes d'analyse.",
        "Choisir un graphique représentatif sans échelle trompeuse pour la présentation exécutive.",
      ],
      risks: [
        "Le temps presse : ne vous lancez pas dans des calculs manuels ligne par ligne, utilisez le moteur de TCD.",
        "Attention aux graphiques à axe tronqué qui exagèrent artificiellement les écarts de performance.",
      ],
    },
    documents: [
      {
        id: 'DOC_TCD_01',
        title: 'Extrait Fichier ERP Ventes T1-2026',
        type: 'spreadsheet',
        content: `EXTRAIT FICHIER VENTES T1-2026 - IVOIRE DISTRIBUTION
Lignes brutes :
T01 | Abidjan Sud | Boissons | Grossistes | 12 500 000 FCFA | Marge : 5 000 000 FCFA
T02 | Abidjan Sud | Cosmétiques | Supermarchés | 6 000 000 FCFA | Marge : 2 800 000 FCFA
T03 | Abidjan Nord | Boissons | Grossistes | 15 000 000 FCFA | Marge : 6 000 000 FCFA
T04 | San Pedro | Agro-alimentaire | Grossistes | 8 750 000 FCFA | Marge : 3 500 000 FCFA
T05 | San Pedro | Boissons | Boutiques | 4 500 000 FCFA | Marge : 1 800 000 FCFA
T06 | Bouaké | Agro-alimentaire | Grossistes | 11 250 000 FCFA | Marge : 4 500 000 FCFA
T07 | Bouaké | Cosmétiques | Boutiques | 3 600 000 FCFA | Marge : 1 680 000 FCFA
T08 | Abidjan Nord | Cosmétiques | Supermarchés | 9 000 000 FCFA | Marge : 4 200 000 FCFA
T09 | Abidjan Sud | Agro-alimentaire | Supermarchés | 10 000 000 FCFA | Marge : 4 000 000 FCFA
T10 | Yamoussoukro | Boissons | Grossistes | 8 000 000 FCFA | Marge : 3 200 000 FCFA
T11 | Yamoussoukro | Agro-alimentaire | Boutiques | 3 750 000 FCFA | Marge : 1 500 000 FCFA
T12 | Abidjan Nord | Agro-alimentaire | Grossistes | 12 500 000 FCFA | Marge : 5 000 000 FCFA`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Structuration des axes du Tableau Croisé Dynamique',
        speaker: {
          name: 'M. Konan',
          role: 'Directeur Général',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Il est 15h25. Le Conseil d'Administration veut voir immédiatement la performance de nos 4 régions croisée par canal de distribution. Comment configurez-vous votre tableau croisé dans l'outil ?",
        taskInstruction: 'Choisissez la structure de TCD répondant exactement au besoin.',
        documentIdsToInspect: ['DOC_TCD_01'],
        options: [
          {
            id: 'OPT_REP_1A',
            label: 'Lignes = Région | Colonnes = Canal de Vente | Valeurs = SOMME du Chiffre d\'Affaires et SOMME de la Marge',
            explanation: 'Configuration optimale : Cette matrice permet en un coup d\'œil de comparer le poids de chaque région et de mesurer l\'apport des grossistes face aux supermarchés et boutiques.',
            pointsDelta: 40,
            feedbackImmediate: 'M. Konan hoche la tête : « Impeccable ! La grille 2D est limpide et les totaux s\'additionnent fidèlement. »',
            isOptimal: true,
          },
          {
            id: 'OPT_REP_1B',
            label: 'Mettre tous les champs en vrac dans une seule colonne sans aucun regroupement',
            explanation: 'Illisible pour un conseil d\'administration qui attend une synthèse décisionnelle.',
            pointsDelta: 0,
            feedbackImmediate: 'M. Konan proteste : « C\'est illisible ! Les administrateurs n\'ont pas le temps de déchiffrer une liste brute. Il faut agréger ! »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Identification du canal de distribution le plus contributeur',
        speaker: {
          name: 'M. Konan',
          role: 'Directeur Général',
          avatar: '👨🏾‍💼',
        },
        dialogue: "En regardant le TCD généré, quel est notre premier canal de vente en chiffre d'affaires et quelle marge totale génère-t-il ?",
        taskInstruction: 'Interprétez les totaux de colonnes du TCD.',
        documentIdsToInspect: ['DOC_TCD_01'],
        options: [
          {
            id: 'OPT_REP_2A',
            label: 'Canal Grossistes : CA total de 60 000 000 FCFA (57% du total) et Marge de 24 200 000 FCFA (Marge moyenne de 40.3%)',
            explanation: 'Lecture exacte : Somme Grossistes = 12.5M + 15M + 8.75M + 11.25M + 8M + 12.5M = 60 000 000 FCFA. C\'est le moteur historique du négoce ivoirien.',
            pointsDelta: 30,
            feedbackImmediate: 'M. Konan sourit : « Chiffre exact. Le canal grossistes reste notre vache à lait historique, mais les supermarchés montent en puissance à Abidjan. »',
            isOptimal: true,
          },
          {
            id: 'OPT_REP_2B',
            label: 'Canal Boutiques avec 85 000 000 FCFA de CA',
            explanation: 'Erreur d\'inversion : Les boutiques de quartier ne représentent que 11.85M FCFA dans cet extrait.',
            pointsDelta: 0,
            feedbackImmediate: 'M. Konan fronce les sourcils : « Non, les boutiques représentent moins de 12 millions ! Vérifiez votre filtre de colonne. »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_3',
        title: 'Étape 3 : Choix du graphique pour la présentation au Conseil',
        speaker: {
          name: 'M. Konan',
          role: 'Directeur Général',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Il est 15h45. Je dois projeter un slide de synthèse. Quel graphique intégrons-nous pour illustrer la performance régionale sans tromper l'assemblée ?",
        taskInstruction: 'Choisissez la visualisation éthique et efficace.',
        documentIdsToInspect: ['DOC_TCD_01'],
        options: [
          {
            id: 'OPT_REP_3A',
            label: 'Histogramme groupé avec axe des ordonnées débutant à zéro, affichant clairement le CA et la Marge par région avec étiquettes en FCFA',
            explanation: 'Règle d\'or de la visualisation financière : L\'axe à zéro préserve les proportions réelles et évite d\'induire le conseil en erreur.',
            pointsDelta: 30,
            feedbackImmediate: 'M. Konan félicite : « Parfait ! C\'est clair, élégant et intègre. Je monte en salle de réunion avec votre rapport. Bravo ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_REP_3B',
            label: 'Graphique 3D avec axe tronqué démarrant à 30 millions pour faire croire qu\'Abidjan écrase totalement l\'intérieur du pays',
            explanation: 'Pratique de manipulation graphique proscrite qui détruit la crédibilité de l\'analyste.',
            pointsDelta: -20,
            feedbackImmediate: 'M. Konan refuse : « Surtout pas d\'effet trompe-l\'œil ! Les administrateurs détectent immédiatement ces artifices et nous perdrions toute crédibilité. »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "Dans l'urgence d'une présentation de direction, la rigueur prime : 1) Structure de données propre, 2) TCD avec axes cohérents, 3) Visualisations fidèles débutant à zéro sans fioritures 3D déformantes.",
      commonPitfalls: [
        "Présenter un tableau brut sans sous-totaux de synthèse.",
        "Tronquer l'axe des ordonnées pour amplifier artificiellement des variations mineures.",
      ],
      keyTakeaway: "Un analyste financier de haut niveau produit des reportings non seulement rapides et exacts, mais visuellement éthiques et immédiatement exploitables pour la décision stratégique.",
    },
  },
  {
    id: 'MISSION_07',
    title: "Le Comité d'Investissement",
    subtitle: "Arbitrer les projets d'expansion de la SIAT à San Pedro sous contrainte budgétaire",
    companyName: "Société Ivoirienne d'Agro-Transformation (SIAT SA)",
    companyContext: "Important complexe agro-industriel basé à San Pedro et Abidjan, spécialisé dans le broyage de fèves de cacao et l'exportation de beurre de cacao.",
    location: 'San Pedro / Abidjan, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Analyste d\'Investissement & Modélisateur Financier',
    difficulty: 'Opérationnel',
    timeLimitMinutes: 20,
    briefing: {
      situation: "Le Conseil d'Administration de SIAT SA se réunit cet après-midi pour allouer une enveloppe d'investissement plafonnée à 120 000 000 FCFA. Trois projets compétitifs sont proposés totalisant 185 000 000 FCFA. Deux directeurs s'opposent farouchement : l'un ne jure que par le TRI le plus élevé, l'autre par la VAN absolue.",
      objectives: [
        "Calculer et comparer la VAN, le TRI et l'Indice de Profitabilité (IP) des projets A, B et C.",
        "Expliquer au Conseil pourquoi le TRI le plus haut ne maximise pas nécessairement la création de richesse en FCFA (effet d'échelle et taux de Fisher).",
        "Sélectionner le panier optimal de projets sous contrainte budgétaire de 120M FCFA.",
      ],
      risks: [
        "Attention au piège classique du TRI : un projet à fort TRI de petite taille crée souvent moins de valeur absolue qu'un projet plus grand.",
        "Respectez impérativement le plafond de 120M FCFA sans proposer un endettement bancaire non validé.",
      ],
    },
    documents: [
      {
        id: 'DOC_INV_01',
        title: 'Fiche Synthétique des 3 Projets d\'Investissement',
        type: 'spreadsheet',
        content: `SIAT SA — DIRECTION GÉNÉRALE
FICHE TECHNIQUE DES PROJETS D'EXPANSION (HORIZON 4 ANS) :
• Projet A (Ligne d'ensachage automatisé) :
  - Investissement initial (I₀) : 70 000 000 FCFA
  - Flux nets annuels : A1=25M, A2=28M, A3=32M, A4=35M FCFA
  - TRI calculé : 24.3% | VAN (à 10.5%) : +24 810 000 FCFA | IP : 1.35
• Projet B (Plateforme logistique & transport San Pedro) :
  - Investissement initial (I₀) : 45 000 000 FCFA
  - Flux nets annuels : A1=18M, A2=20M, A3=22M, A4=25M FCFA
  - TRI calculé : 28.1% | VAN (à 10.5%) : +20 450 000 FCFA | IP : 1.45
• Projet C (Centrale Solaire Toitures Usine) :
  - Investissement initial (I₀) : 35 000 000 FCFA
  - Flux nets annuels : A1=10M, A2=11M, A3=12M, A4=12M FCFA
  - TRI calculé : 10.2% | VAN (à 10.5%) : -320 000 FCFA | IP : 0.99
ENVELOPPE TOTALE DISPONIBLE : 120 000 000 FCFA (Fonds propres + ligne de crédit autorisée).`,
      },
      {
        id: 'DOC_INV_02',
        title: 'Note de Synthèse sur le Coût du Capital (CMPC / WACC)',
        type: 'contract',
        content: `NOTE INTERNE DIRECTION FINANCIÈRE SIAT SA
Objet : Taux d'actualisation de référence pour l'exercice 2026
Structure cible de financement :
- Capitaux propres : 60% à un coût de 13.5%
- Dettes bancaires : 40% à un taux nominal de 8.0%
- Taux d'impôt sur les sociétés (IS) : 25% (Côte d'Ivoire)
Coût de la dette après impôt : 8.0% * (1 - 0.25) = 6.0%
CMPC (WACC) = 0.60 * 13.5% + 0.40 * 6.0% = 8.1% + 2.4% = 10.5%.
Tout projet doit impérativement afficher une VAN > 0 au taux de 10.5% pour créer de la valeur.`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Arbitrage méthodologique entre VAN et TRI',
        speaker: {
          name: 'M. Touré',
          role: 'Directeur Technique',
          avatar: '👨🏾‍🔧',
        },
        dialogue: "Le Projet B a un TRI de 28.1% alors que le Projet A n'a que 24.3%. Choisissons uniquement le Projet B sans hésiter, le TRI est indiscutablement la vérité absolue en finance !",
        taskInstruction: 'Quelle est la position méthodologique rigoureuse à soutenir devant le Conseil ?',
        documentIdsToInspect: ['DOC_INV_01', 'DOC_INV_02'],
        options: [
          {
            id: 'OPT_INV_1A',
            label: 'Réfuter poliment : Le TRI est un indicateur de taux qui ignore la taille du projet. Le Projet A génère +24.8M FCFA de richesse absolue contre +20.4M FCFA pour le Projet B. La VAN est le seul critère souverain d\'enrichissement des actionnaires.',
            explanation: 'La théorie financière moderne démontre la suprématie de la VAN : maximiser la somme monétaire en FCFA créée, et non un taux relatif qui pénalise les investissements plus ambitieux.',
            pointsDelta: 30,
            feedbackImmediate: 'Le Directeur Financier acquiesce vigoureusement : « Exactement. Le TRI ignore l\'effet d\'échelle. Notre objectif est de créer un montant maximal de FCFA pour nos actionnaires. »',
            isOptimal: true,
          },
          {
            id: 'OPT_INV_1B',
            label: 'Accepter l\'argument du Directeur Technique : Choisir le TRI le plus élevé garantit le meilleur retour sur investissement dans tous les cas.',
            explanation: 'Biais financier majeur : le TRI ne prend pas en compte le montant investi ni le taux de réinvestissement réel des flux.',
            pointsDelta: -20,
            feedbackImmediate: 'Le Directeur Financier intervient : « Attention, vous confondez rentabilité relative et création de valeur absolue en FCFA ! »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Élimination du projet non rentable',
        speaker: {
          name: 'Mme Bamba',
          role: 'Directrice RSE & Développement Durable',
          avatar: '👩🏾‍💼',
        },
        dialogue: "Et qu'en est-il du Projet C (Centrale Solaire à 35M FCFA) ? Il est très écologique, pouvons-nous l'inclure dans la sélection ?",
        taskInstruction: 'Analysez la rentabilité financière du Projet C au regard du CMPC.',
        documentIdsToInspect: ['DOC_INV_01', 'DOC_INV_02'],
        options: [
          {
            id: 'OPT_INV_2A',
            label: 'Le Projet C détruit de la valeur avec une VAN de -320 000 FCFA et un TRI de 10.2% inférieur au CMPC (10.5%). Il doit être rejeté ou réajusté avec une subvention verte avant tout engagement.',
            explanation: 'Tout projet dont le TRI est inférieur au CMPC détruit la valeur du capital engagé et ne couvre pas le coût des ressources financières.',
            pointsDelta: 30,
            feedbackImmediate: 'Le Conseil approuve : « C\'est une décision responsable. Si un projet détruit de la valeur financière, il nous fragilisera. Nous chercherons des cofinancements verts pour le rendre viable. »',
            isOptimal: true,
          },
          {
            id: 'OPT_INV_2B',
            label: 'Valider le Projet C car son TRI est de 10.2%, ce qui est positif et donc forcément créateur de richesse.',
            explanation: 'Erreur critique : un TRI positif ne suffit pas s\'il est inférieur au coût moyen pondéré du capital (10.5%).',
            pointsDelta: -25,
            feedbackImmediate: 'Le Directeur Financier fronce les sourcils : « À 10.2%, nous empruntons et mobilisons des capitaux à 10.5% pour un projet qui rapporte moins que ce coût. C\'est une perte nette ! »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_3',
        title: 'Étape 3 : Sélection du panier optimal sous contrainte budgétaire (120M FCFA)',
        speaker: {
          name: 'M. Konan',
          role: 'Président du Conseil d\'Administration',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Notre budget est strictement borné à 120 000 000 FCFA. Quelle recommandation finale présentez-vous au vote du Conseil ?",
        taskInstruction: 'Choisissez la combinaison de projets qui respecte le budget et maximise la VAN globale.',
        documentIdsToInspect: ['DOC_INV_01'],
        options: [
          {
            id: 'OPT_INV_3A',
            label: 'Retenir conjointement le Projet A (70M) et le Projet B (45M) : Investissement total = 115 000 000 FCFA (≤ 120M), VAN totale record de +45 260 000 FCFA, et 5M FCFA de réserve de sécurité.',
            explanation: 'L\'enveloppe de 120M permet d\'absorber simultanément A et B, combinant l\'effet de taille de A et le fort rendement de B pour une création de richesse maximale.',
            pointsDelta: 40,
            feedbackImmediate: 'Applaudissements unanimes du Conseil : « Démonstration limpide. Nous maximisons la création de valeur tout en conservant une marge de liquidité de 5 millions. Recommandation adoptée ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_INV_3B',
            label: 'Ne choisir que le Projet A (70M) et laisser 50M FCFA inutilisés sur le compte courant pour éviter tout risque.',
            explanation: 'Sous-optimisation majeure qui laisse des capitaux oisifs alors qu\'un projet B à très forte rentabilité (IP 1.45) est disponible.',
            pointsDelta: -15,
            feedbackImmediate: 'Le Président commente : « Laisser 50 millions dormir sur un compte sans rémunération alors que le Projet B nous tend les bras ? C\'est un manque flagrant d\'ambition ! »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "La décision d'investissement moderne repose sur trois piliers : 1) La souveraineté de la VAN pour mesurer l'enrichissement en monnaie réelle, 2) Le CMPC comme filtre d'acceptabilité (TRI > CMPC), 3) L'optimisation combinée sous rationnement du capital grâce à l'Indice de Profitabilité (IP).",
      commonPitfalls: [
        "Préférer un projet à fort TRI mais de petite taille au détriment d'un grand projet créant beaucoup plus de VAN.",
        "Confondre TRI positif et création de valeur sans comparer au coût du capital de l'entreprise.",
      ],
      keyTakeaway: "Un modélisateur financier de talent sait marier rigueur mathématique et sens managérial pour éclairer le Conseil d'Administration sans céder aux intuitions trompeuses.",
    },
  },
  {
    id: 'MISSION_08',
    title: 'La Semaine des Renouvellements',
    subtitle: 'Sauver la marge et sécuriser la conformité CIMA Art. 13 du portefeuille d\'ICC',
    companyName: 'Ivoire Courtage Conseil (ICC)',
    companyContext: 'Cabinet de courtage d\'assurance de premier rang situé à Abidjan-Plateau, intermédiaire de référence auprès des assureurs Sanlam, Allianz et NSIA.',
    location: 'Abidjan-Plateau, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Chargé de Portefeuille & Rétention Client',
    difficulty: 'Expert',
    timeLimitMinutes: 20,
    briefing: {
      situation: "C'est la semaine la plus intense de l'année chez ICC. Trois contrats majeurs arrivent à échéance simultanément. Entre un grand compte automobile très sinistré qui réclame un rabais, une attestation d'assurance demandée sans chèque encaissé et une menace de débauchage par un concurrent, vos décisions engagent la responsabilité juridique et la rentabilité du cabinet.",
      objectives: [
        "Auditer la rentabilité nette du compte flotte SOTRA (commissions perçues vs heures de gestion sinistres) et refuser le rabais injustifié.",
        "Faire respecter la règle impérative du paiement préalable de l'Article 13 du Code CIMA pour l'assurance Santé.",
        "Renégocier le renouvellement du contrat transport maritime pour préserver un taux de rétention de 87% sans éroder la commission.",
      ],
      risks: [
        "Accorder une réduction de prime sur un contrat dont les coûts de gestion dépassent déjà la commission plonge le compte dans un déficit lourd.",
        "Délivrer une attestation d'assurance avant encaissement effectif de la prime viole l'Article 13 du Code CIMA et engage la responsabilité civile et pénale du courtier.",
      ],
    },
    documents: [
      {
        id: 'DOC_REN_01',
        title: 'Audit Analytique de Rentabilité du Compte SOTRA Fictive',
        type: 'spreadsheet',
        content: `IVOIRE COURTAGE CONSEIL — CONTRÔLE DE GESTION
ANALYSE DU COMPTE FLOTTE AUTOMOBILE SOTRA FICTIVE (EXERCICE N-1) :
• Prime nette annuelle : 18 000 000 FCFA
• Taux de commission courtier conventionné : 12%
• Commissions brutes perçues : 2 160 000 FCFA
• Activité sinistres constatée sur l'exercice :
  - 18 sinistres déclarés et instruits par notre équipe
  - 120 heures de gestion administrative et expertise
  - Coût horaire moyen chargé d'un gestionnaire sinistres : 15 000 FCFA/h
• Coût opérationnel de service : 120 h * 15 000 FCFA = 1 800 000 FCFA
• Marge nette réelle du cabinet : 2 160 000 - 1 800 000 = +360 000 FCFA (Marge = 16.7%).
DEMANDE DU CLIENT POUR N : Exige un rabais de 10% sur la prime ou part à la concurrence.`,
      },
      {
        id: 'DOC_REN_02',
        title: 'Extrait Officiel du Code CIMA — Article 13 & Dispositions Légales',
        type: 'contract',
        content: `CONFÉRENCE INTERAFRICAINE DES MARCHÉS D'ASSURANCES (CIMA)
CODE DES ASSURANCES — ARTICLE 13 (MODIFIÉ) :
« La prise d'effet du contrat est subordonnée au paiement de la prime par le souscripteur.
Il est interdit aux entreprises d'assurances et aux courtiers de délivrer une attestation ou un certificat d'assurance avant l'encaissement effectif de la prime ou de la portion de prime exigible.
Toute violation de cette disposition entraîne la nullité de plein droit de la couverture pour défaut de paiement et expose l'intermédiaire à des sanctions disciplinaires pouvant aller jusqu'au retrait d'agrément. »`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Négociation du compte très sinistré (Flotte SOTRA)',
        speaker: {
          name: 'M. Diomandé',
          role: 'Directeur Logistique SOTRA',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Nous exigeons une baisse immédiate de 10% sur notre prime d'assurance de 18 millions pour renouveler, sinon un courtier concurrent reprend notre flotte dès lundi !",
        taskInstruction: 'Comment répondez-vous en vous appuyant sur l\'audit analytique de rentabilité ?',
        documentIdsToInspect: ['DOC_REN_01'],
        options: [
          {
            id: 'OPT_REN_1A',
            label: 'Refuser fermement le rabais : Démontrer avec l\'audit que les 18 sinistres ont nécessité 120 heures de travail, ne laissant que 360 000 FCFA de marge au cabinet. Proposer plutôt un plan de prévention et un intéressement sur la baisse de sinistralité.',
            explanation: 'Un rabais de 10% amputerait la prime de 1.8M FCFA et la commission de 216 000 FCFA, rendant le compte quasiment déficitaire sans résoudre la cause racine : la forte sinistralité.',
            pointsDelta: 30,
            feedbackImmediate: 'M. Diomandé est surpris par la précision de vos chiffres : « Je ne réalisais pas que nos chauffeurs provoquaient autant d\'heures de travail pour votre équipe. Votre proposition de plan de prévention est sérieuse. Maintenons le contrat. »',
            isOptimal: true,
          },
          {
            id: 'OPT_REN_1B',
            label: 'Accorder immédiatement les 10% de rabais pour sauver le client à tout prix, en espérant compenser la perte sur un autre contrat.',
            explanation: 'Erreur commerciale classique : préserver le chiffre d\'affaires brut au détriment de la marge nette réelle.',
            pointsDelta: -25,
            feedbackImmediate: 'La Directrice d\'ICC intervient : « En accordant ce rabais, nous travaillons désormais à perte pour ce client. Ce n\'est pas du développement commercial, c\'est de l\'hémorragie ! »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Pression sur l\'attestation Santé et Code CIMA Art. 13',
        speaker: {
          name: 'M. Kouassi',
          role: 'DRH Compagnie Ivoirienne de Cacao',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Le renouvellement de notre couverture Santé de 250 salariés démarre demain à minuit. Notre directeur financier est en déplacement et le chèque de 25 millions ne sera signé que dans 10 jours. Délivrez-nous immédiatement les cartes d'assurance pour nos employés !",
        taskInstruction: 'Appliquez les dispositions impératives du Code CIMA.',
        documentIdsToInspect: ['DOC_REN_02'],
        options: [
          {
            id: 'OPT_REN_2A',
            label: 'Refuser poliment la délivrance anticipée en vertu de l\'Article 13 CIMA : Proposer une solution intermédiaire conforme (virement bancaire express ou cautionnement) et avertir que la garantie est suspendue tant que la prime n\'est pas encaissée.',
            explanation: 'L\'Article 13 CIMA interdit formellement toute couverture d\'assurance avant encaissement réel sous peine de nullité de plein droit et de retrait d\'agrément.',
            pointsDelta: 35,
            feedbackImmediate: 'M. Kouassi comprend la gravité juridique : « Vous avez raison de respecter la loi CIMA. Le DRH débloque un virement bancaire instantané par ordre de délégation ce matin. Les attestations peuvent être émises légalement. Bravo pour votre rigueur ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_REN_2B',
            label: 'Émettre les cartes d\'assurance Santé sans attendre le paiement pour ne pas froisser ce gros client de 25 millions.',
            explanation: 'Faute professionnelle grave violant directement l\'Article 13 du Code CIMA. En cas d\'accident grave avant encaissement, l\'assureur refusera d\'indemniser et la responsabilité du courtier sera engagée.',
            pointsDelta: -30,
            feedbackImmediate: 'Alerte juridique majeure ! La Direction générale d\'ICC bloque la transaction : « L\'Article 13 CIMA ne tolère aucune exception. Si un sinistre survient, notre cabinet risque la faillite et la perte d\'agrément ministériel ! »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_3',
        title: 'Étape 3 : Consolidation du portefeuille et plan de fidélisation',
        speaker: {
          name: 'Mme Bamba',
          role: 'Directrice Générale ICC',
          avatar: '👩🏾‍💼',
        },
        dialogue: "Grâce à vos arbitrages fermes, nous avons sauvé la flotte SOTRA et sécurisé le virement de la CIC. Pour clôturer le trimestre, quelle politique de rétention institutionnalisons-nous au sein du cabinet ?",
        taskInstruction: 'Définissez la stratégie professionnelle pérenne de gestion de portefeuille.',
        documentIdsToInspect: ['DOC_REN_01', 'DOC_REN_02'],
        options: [
          {
            id: 'OPT_REN_3A',
            label: 'Systématiser : 1) Audit analytique de rentabilité 60 jours avant échéance, 2) Respect absolu de la règle CIMA Art. 13 dès la pré-émission, 3) Honoraires de gestion contractuels sur les comptes à forte sinistralité.',
            explanation: 'Cette triple pratique garantit un portefeuille sain, un taux de rétention durablement supérieur à 85% et une parfaite sécurité réglementaire.',
            pointsDelta: 35,
            feedbackImmediate: 'Mme Bamba conclut avec fierté : « C\'est exactement la culture d\'excellence que je souhaite pour Ivoire Courtage Conseil. Vous êtes promu au grade de Responsable de Portefeuille Senior ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_REN_3B',
            label: 'Attendre le dernier jour avant expiration pour relancer les clients par téléphone et accorder des remises systématiques si le client menace de résilier.',
            explanation: 'Politique réactive destructrice de marge et source de stress permanent.',
            pointsDelta: -20,
            feedbackImmediate: 'Mme Bamba secoue la tête : « C\'est la recette assurée pour détruire notre rentabilité et perdre nos meilleurs comptes. »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "La gestion d'un portefeuille de courtage CIMA repose sur deux principes non négociables : 1) La conformité juridique absolue avec l'Article 13 (pas de couverture sans prime préalablement encaissée), 2) La rentabilité nette réelle (une commission brute élevée peut cacher un compte déficitaire si la sinistralité mobilise trop d'heures de gestion).",
      commonPitfalls: [
        "Confondre chiffre d'affaires et marge nette en accordant des rabais sur des comptes hyper-sinistrés.",
        "Céder à la pression d'un client pour émettre des attestations en violation du Code CIMA.",
      ],
      keyTakeaway: "Un courtier d'assurance performant est à la fois un négociateur commercial perspicace, un gestionnaire analytique vigilant et un garant inflexible de la conformité réglementaire.",
    },
  },
  {
    id: 'MISSION_09',
    title: 'La Consolidation du Groupe Régional',
    subtitle: 'Réconcilier les flux transfrontaliers, convertir les devises selon IAS 21 et certifier les comptes consolidés',
    companyName: 'Groupe Agro-Food West Africa SA',
    companyContext: 'Groupe agro-industriel panafricain coté à la BRVM, comprenant le siège à Abidjan (Côte d\'Ivoire), une filiale de transformation à Dakar (Sénégal, 80%) et une filiale commerciale de distribution en Europe à Paris (France, EUR, 100%).',
    location: 'Abidjan (Plateau) • Dakar • Paris',
    currency: 'FCFA (XOF) & EUR',
    roleAssigned: 'Directeur de la Consolidation Groupe & Normes IFRS',
    difficulty: 'Expert',
    timeLimitMinutes: 25,
    briefing: {
      situation: "C'est la clôture annuelle des comptes consolidés du groupe Agro-Food West Africa. Le Comité d'Audit se réunit demain matin pour valider les états financiers avant publication à la BRVM. Deux problèmes majeurs bloquent l'arrêté : une divergence sur des facturations réciproques entre Abidjan et Paris (ventes internes non réconciliées), et l'impact de la parité de conversion de la filiale parisienne en euros sur les capitaux propres consolidés (réserve de conversion IAS 21).",
      objectives: [
        "Rapprocher les soldes réciproques et éliminer les flux intragroupe (ventes et créances/dettes) sans déséquilibrer le bilan.",
        "Convertir la filiale européenne selon la méthode du cours de clôture (IAS 21) et isoler l'écart de conversion.",
        "Attribuer avec exactitude les capitaux propres et le résultat net entre la Part du Groupe et les Intérêts Minoritaires (20% Dakar).",
      ],
      risks: [
        "Conserver des ventes internes gonflerait artificiellement le chiffre d'affaires consolidé du groupe, ce qui constituerait une fausse déclaration financière passible de sanctions AMF-UMOA.",
        "Imputer l'écart de conversion bilanciel en compte de résultat fausserait le résultat net et violerait IAS 21.",
      ],
    },
    documents: [
      {
        id: 'DOC_CONS_01',
        title: 'Matrice des Soldes et Flux Intragroupe T4',
        type: 'spreadsheet',
        content: `MATRICE DES FLUX INTRAGROUPE - GROUPE AGRO-FOOD WEST AFRICA
--------------------------------------------------------------------------------
1. Flux Commerciaux (Compte de résultat) :
- Holding Abidjan → Paris SAS : 50 000 000 FCFA de ventes de cacao transformé.
  Paris SAS a comptabilisé 76 224 EUR d'achats consommés (au cours moyen de 655,957).
  Statut : Facturé et expédié. À ÉLIMINER À 100% du CA consolidé.

2. Prêts & Trésorerie Intragroupe (Bilan) :
- Holding Abidjan (Prêteur) : Créance financière de 40 000 000 FCFA sur Filiale Dakar.
- Filiale Dakar (Emprunteur) : Dette financière de 40 000 000 FCFA envers la Holding.
  Statut : Parfaitement concordant. À ÉLIMINER SYMÉTRIQUEMENT.

3. Solde Commercial en Cours :
- Paris SAS a une dette fournisseur de 76 224 EUR envers Holding Abidjan.
- Holding Abidjan a une créance client de 50 000 000 FCFA sur Paris SAS.
  Conversion au cours de clôture (655,957 FCFA) = 50 000 000 FCFA. Concordance validée.`,
      },
      {
        id: 'DOC_CONS_02',
        title: 'Note Technique CAC : Traitement IAS 21 & Minoritaires',
        type: 'trial_balance',
        content: `NOTE D'AUDIT COMMISSAIRE AUX COMPTES - SYNTHÈSE DES NORMES
--------------------------------------------------------------------------------
A. Traitement de la Filiale Paris SAS (Monnaie fonctionnelle : EUR) :
- Actifs et passifs : Convertis au cours de clôture du 31/12 (655,957 FCFA).
- Produits et charges : Convertis au cours moyen de l'exercice (655,957 FCFA).
- Écart d'évaluation résultant : Réserve de conversion comptabilisée en capitaux propres consolidés (OCI). INTERDICTION FORMELLE d'impacter le compte de résultat.

B. Intérêts Minoritaires - Sénégal Agro-Processing SARL :
- Contrôle exclusif à 80% : Intégration globale à 100% de tous les actifs et passifs.
- Quotité minoritaire (20%) : Doit être isolée au passif du bilan consolidé ('Intérêts minoritaires') et au compte de résultat ('Part des minoritaires').`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Élimination des opérations réciproques intragroupe',
        speaker: {
          name: 'Mme Touré',
          role: 'Directrice Financière Groupe',
          avatar: '👩🏾‍💼',
        },
        dialogue: "Bienvenue sur ce dossier sensible. Le rapport préliminaire affiche un chiffre d'affaires brut consolidé de 630 millions FCFA. Cependant, Abidjan a facturé 50 millions FCFA de produits finis à notre filiale de Paris, et Dakar a un prêt de 40 millions accordé par le siège. Quel traitement d'élimination appliquez-vous pour l'arrêté consolidé ?",
        taskInstruction: 'Choisissez le traitement rigoureux des éliminations bilancielles et de compte de résultat.',
        documentIdsToInspect: ['DOC_CONS_01', 'DOC_CONS_02'],
        options: [
          {
            id: 'OPT_CONS_1A',
            label: 'Éliminer 50 millions FCFA de ventes internes du CA et des charges d\'exploitation, et neutraliser symétriquement 40 millions de créances/dettes financières et 50 millions de créances/dettes commerciales réciproques.',
            explanation: 'Conforme aux règles de l\'intégration globale (SYSCOHADA et IFRS 10) : le groupe ne réalise des ventes et ne contracte de dettes qu\'avec des tiers externes.',
            pointsDelta: 35,
            feedbackImmediate: 'Mme Touré approuve : « Parfaitement exact. Notre chiffre d\'affaires consolidé passe de 630M à 580M FCFA, reflétant fidèlement les ventes effectives aux clients externes. »',
            isOptimal: true,
          },
          {
            id: 'OPT_CONS_1B',
            label: 'Conserver les 50 millions dans le chiffre d\'affaires pour valoriser la dynamique commerciale du groupe lors de la présentation aux investisseurs.',
            explanation: 'Faute comptable majeure et délit de diffusion de fausses informations financières : une entité ne peut réaliser de chiffre d\'affaires en se vendant des biens à elle-même.',
            pointsDelta: -30,
            feedbackImmediate: 'Le Commissaire aux comptes intervient : « Absolument irrecevable ! Conserver des ventes internes gonfle artificiellement le CA et entraînerait un refus de certification des comptes. »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Conversion de la filiale étrangère et réserve de conversion (IAS 21)',
        speaker: {
          name: 'M. Vasseur',
          role: 'Auditeur Associé Cabinet PwC',
          avatar: '👨🏼‍💼',
        },
        dialogue: "Examinons maintenant la conversion de la filiale Paris SAS, tenue en euros. La méthode des cours de clôture selon IAS 21 génère une réserve de conversion dans les capitaux propres. Le contrôleur de gestion propose d'inscrire cette variation directement dans le résultat financier pour booster le résultat net. Quelle est votre décision technique ?",
        taskInstruction: 'Déterminez le traitement normatif de l\'écart de conversion bilanciel.',
        documentIdsToInspect: ['DOC_CONS_02'],
        options: [
          {
            id: 'OPT_CONS_2A',
            label: 'Rejeter fermement la proposition : imputer l\'écart de conversion en capitaux propres consolidés (Réserve de conversion / OCI) sans jamais impacter le compte de résultat de l\'exercice.',
            explanation: 'Règle impérative d\'IAS 21 pour les entités étrangères autonomes : les variations de change bilancielles ne résultent pas de l\'exploitation courante et ne doivent pas polluer le résultat net distribuable.',
            pointsDelta: 35,
            feedbackImmediate: 'M. Vasseur hoche la tête : « Excellente maîtrise normative. La réserve de conversion est strictement un poste de fonds propres. Le résultat net consolidé reste intègre. »',
            isOptimal: true,
          },
          {
            id: 'OPT_CONS_2B',
            label: 'Accepter d\'enregistrer l\'écart de conversion en produit financier exceptionnel pour améliorer le dividende distribuable.',
            explanation: 'Violation frontale d\'IAS 21. Fausse déclaration de résultat pouvant induire les actionnaires en erreur.',
            pointsDelta: -25,
            feedbackImmediate: 'M. Vasseur réagit vivement : « C\'est une violation caractérisée d\'IAS 21 ! Les Commissaires aux comptes émettraient une réserve substantielle sur les comptes consolidés. »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_3',
        title: 'Étape 3 : Traitement des intérêts minoritaires et présentation au Comité d\'Audit',
        speaker: {
          name: 'M. Diop',
          role: 'Président du Comité d\'Audit',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Nous entrons en séance de Comité d'Audit. La filiale sénégalaise est détenue à 80% par notre holding. Comment présentez-vous son résultat net de 24,75 millions FCFA et ses fonds propres consolidés dans la communication financière officielle ?",
        taskInstruction: 'Présentez la décomposition réglementaire entre Part du Groupe et Intérêts Minoritaires.',
        documentIdsToInspect: ['DOC_CONS_01', 'DOC_CONS_02'],
        options: [
          {
            id: 'OPT_CONS_3A',
            label: 'Intégrer 100% des flux dans les états financiers, puis scinder explicitement : 80% (19,8M FCFA) en Part du Groupe et 20% (4,95M FCFA) en Intérêts Minoritaires, tant au passif du bilan qu\'au compte de résultat.',
            explanation: 'Méthode rigoureuse de l\'intégration globale : elle reflète le contrôle opérationnel exclusif du groupe tout en respectant scrupuleusement les droits patrimoniaux des actionnaires minoritaires tiers.',
            pointsDelta: 35,
            feedbackImmediate: 'M. Diop conclut avec enthousiasme : « Clarté, rigueur et parfaite transparence financière. Les comptes consolidés du groupe Agro-Food West Africa sont validés à l\'unanimité du Comité d\'Audit ! Félicitations ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_CONS_3B',
            label: 'Attribuer 100% du résultat net à la holding au motif que nous contrôlons la majorité des droits de vote au conseil d\'administration.',
            explanation: 'Spoliation des actionnaires minoritaires et présentation comptable trompeuse.',
            pointsDelta: -25,
            feedbackImmediate: 'M. Diop fronce les sourcils : « Les actionnaires minoritaires sénégalais détiennent légalement 20% des bénéfices. On ne peut pas confisquer leurs droits ! »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "La consolidation d'un groupe multi-entités et multi-devises repose sur trois piliers : 1) La neutralisation absolue des flux et balances réciproques (les profits ne se font qu'avec les tiers), 2) La stricte application de la méthode des cours de clôture (IAS 21) avec réserve de conversion isolée en capitaux propres, 3) La séparation limpide entre la Part du Groupe et les Intérêts Minoritaires garantissant les droits de tous les actionnaires.",
      commonPitfalls: [
        "Confondre chiffre d'affaires consolidé et somme des chiffres d'affaires individuels en oubliant d'éliminer les facturations internes.",
        "Comptabiliser les écarts de conversion bilanciels au compte de résultat en violant IAS 21.",
        "Négliger l'isolement des intérêts minoritaires dans les filiales non détenues à 100%.",
      ],
      keyTakeaway: "Les comptes consolidés ne sont pas une simple addition arithmétique : ils traduisent la réalité économique d'une entité unique au-delà des frontières juridiques et des devises.",
    },
  },
  {
    id: 'MISSION_10',
    title: 'Le Sauvetage de Trésorerie à 13 Semaines',
    subtitle: 'Éviter la cessation de paiement sous choc de liquidité bancaire à San Pedro',
    companyName: 'Cacao Export SA',
    companyContext: 'Société coopérative et d\'exportation de fèves de cacao basée à San Pedro, traitant 15 000 tonnes par campagne.',
    location: 'San Pedro, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Trésorier de Crise / Cash Manager',
    difficulty: 'Expert',
    timeLimitMinutes: 20,
    briefing: {
      situation: "Un retard de paiement de 120 000 000 FCFA d'un acheteur international combiné à un blocage portuaire plonge Cacao Export SA dans une impasse critique de cash. Le directeur de la banque locale menace de rejeter les chèques de paie dans 5 jours si le découvert de 85 000 000 FCFA n'est pas régularisé.",
      objectives: [
        "Établir le plan de trésorerie glissant 13 semaines en flux TTC stricts.",
        "Arbitrer les décaissements vitaux (salaires et coopératives) vs dettes étalables.",
        "Négocier une ligne d'escompte ou de cession de créances sécurisée avec le banquier.",
      ],
      risks: [
        "Rejet de chèque bancaire entraînant l'interdiction bancaire immédiate.",
        "Rupture d'approvisionnement des planteurs si les acomptes ne sont pas honorés.",
      ],
    },
    documents: [
      {
        id: 'DOC_TRES_01',
        title: 'Relevé de Banque SGBCI - Position au 12 Mai',
        type: 'bank_statement',
        content: `SOCIÉTÉ GÉNÉRALE CÔTE D'IVOIRE (SGBCI) - AGENCE SAN PEDRO
Titulaire : CACAO EXPORT SA
Solde comptable au 12/05/2026 : -84 650 000 FCFA (DÉBITEUR)
Autorisation de découvert officielle : 50 000 000 FCFA
Dépassement non autorisé constaté : 34 650 000 FCFA
Avis d'impayé imminent sur 15 chèques en compensation (Total : 42 000 000 FCFA).`,
      },
      {
        id: 'DOC_TRES_02',
        title: 'Échéancier des Flux Clients & Fournisseurs',
        type: 'spreadsheet',
        content: `CACAO EXPORT SA - ÉCHÉANCIER D'URGENCE (13 SEMAINES)
- Créance négociable sur Cargill Europe : 120 000 000 FCFA (Échéance contractuelle à J+45).
- Paie des 140 ouvriers de manutention portuaire : 25 000 000 FCFA (Impératif le 25 du mois).
- Facture transporteurs routiers : 18 000 000 FCFA (Négociable avec acompte de 30%).
- TVA nette à reverser à la DGI : 14 500 000 FCFA (Échéance le 15).`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Arbitrage des priorités de décaissement',
        speaker: {
          name: 'M. Soro',
          role: 'Directeur Général',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Nous n'avons que 10 millions en caisse et notre découvert bancaire dépasse le plafond autorisé de 35 millions. Le 15 arrive : nous avons la TVA, les transporteurs et la paie dans 10 jours. Quels règlements priorisez-vous immédiatement pour éviter l'explosion sociale et la saisie ?",
        taskInstruction: 'Établissez la hiérarchie légale et opérationnelle des paiements sous contrainte de liquidité.',
        documentIdsToInspect: ['DOC_TRES_01', 'DOC_TRES_02'],
        options: [
          {
            id: 'OPT_TRES_1A',
            label: 'Sanctuariser la paie des ouvriers et les acomptes planteurs, solliciter un moratoire de 15 jours auprès de la DGI pour la TVA, et proposer 30% d\'acompte immédiat aux transporteurs avec solde à 30 jours.',
            explanation: 'Règle d\'or du redressement de trésorerie : préserver l\'outil productif humain, éviter l\'arrêt des machines et engager une négociation bilatérale transparente avec les créanciers compréhensifs.',
            pointsDelta: 35,
            feedbackImmediate: 'M. Soro approuve : « Décision courageuse et lucide. Les ouvriers restent au travail et nous gagnons 15 jours d\'oxygène sans arrêt d\'exploitation. »',
            isOptimal: true,
          },
          {
            id: 'OPT_TRES_1B',
            label: 'Payer l\'intégralité des transporteurs et de la TVA en laissant les ouvriers sans salaire jusqu\'au mois prochain.',
            explanation: 'Déclenche une grève sauvage immédiate et le blocage total des entrepôts.',
            pointsDelta: -30,
            feedbackImmediate: 'M. Soro alerte : « Les dockers se mettent en grève ! Les camions sont bloqués au port et les pénalités maritimes s\'envolent ! »',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Mobilisation bancaire de la créance Cargill',
        speaker: {
          name: 'Mme Bamba',
          role: 'Directrice de Clientèle Entreprises Banque',
          avatar: '👩🏾‍💼',
        },
        dialogue: "Vous avez une créance confirmée de 120 millions sur Cargill avec connaissement maritime conforme. La banque ne peut pas augmenter votre découvert, mais nous pouvons vous proposer une cession Dailly ou un escompte d'effet export. Quelle structure de refinancement choisissez-vous ?",
        taskInstruction: 'Sélectionnez l\'outil de refinancement court terme le plus rapide et le moins coûteux.',
        documentIdsToInspect: ['DOC_TRES_02'],
        options: [
          {
            id: 'OPT_TRES_2A',
            label: 'Céder immédiatement la créance Cargill par escompte d\'effet export avec tirage immédiat de 85% (102 millions FCFA) pour combler le découvert et restaurer une trésorerie positive de 17 millions.',
            explanation: 'L\'escompte de traite documentaire sur signature de premier ordre permet d\'injecter 102M FCFA sous 48h, de solder le dépassement et de régulariser la situation bancaire sans endettement à long terme.',
            pointsDelta: 35,
            feedbackImmediate: 'Mme Bamba sourit : « Parfait. La signature Cargill est validée par notre comité. 102 millions FCFA sont crédités ce soir sur votre compte. Votre découvert est effacé ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_TRES_2B',
            label: 'Refuser l\'escompte pour économiser 2% de frais financiers et attendre 45 jours le paiement direct de Cargill.',
            explanation: 'Attendre 45 jours alors que les chèques sont rejetés dans 48h conduit directement à la faillite.',
            pointsDelta: -35,
            feedbackImmediate: 'Mme Bamba soupire : « Sans rentrée de fonds d\'ici demain, je suis dans l\'obligation légale de rejeter vos chèques. C\'est l\'interdiction bancaire assurée. »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "La gestion de trésorerie en période de crise exige : 1) La priorité absolue au maintien de l'exploitation (salaires et approvisionnements clés), 2) La négociation proactive d'échéanciers avant incident de paiement, 3) La mobilisation rapide des créances saines (escompte ou factor) pour transformer le papier commercial en cash disponible.",
      commonPitfalls: [
        "Attendre le rejet de chèque pour avertir son banquier.",
        "Raisonner en résultat comptable HT au lieu de piloter les flux réels TTC.",
        "Négliger le coût des agios débiteurs et des commissions de plus fort découvert.",
      ],
      keyTakeaway: "En finance d'entreprise, la rentabilité est une opinion, mais la trésorerie est un fait impitoyable.",
    },
  },
  {
    id: 'MISSION_11',
    title: 'Le Contrôle Fiscal & TVA SYSCOHADA',
    subtitle: 'Auditer la conformité fiscale d\'une PME ivoirienne avant vérification générale',
    companyName: 'Ivoire Télécom & Prestations SARL',
    companyContext: 'Société de services informatiques et d\'infrastructures réseaux au Plateau, Abidjan (CA : 850M FCFA).',
    location: 'Abidjan, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Auditeur Fiscal & Comptable',
    difficulty: 'Opérationnel',
    timeLimitMinutes: 20,
    briefing: {
      situation: "La Direction Générale des Impôts (DGI) de Côte d'Ivoire a notifié un avis de vérification générale de comptabilité portant sur les exercices N-2 et N-1. Le gérant vous mandate pour auditer les dossiers de TVA déductible, la retenue AIRSI 5% et la réintégration des amortissements excédentaires.",
      objectives: [
        "Vérifier la validité des factures fournisseurs pour le droit à déduction de la TVA 18%.",
        "Auditer la conformité des retenues à la source AIRSI (Acompte d'Impôt sur le Revenu du Secteur Informel).",
        "Calculer la réintégration fiscale sur l'amortissement d'un véhicule de direction plafonné à 25M FCFA.",
      ],
      risks: [
        "Rejet de la déduction de TVA avec pénalités de mauvaise foi de 25% à 100%.",
        "Redressement fiscal lourd sur charges non justifiées par des pièces probantes.",
      ],
    },
    documents: [
      {
        id: 'DOC_FISC_01',
        title: 'Avis de Passage DGI - Direction des Grandes Entreprises',
        type: 'contract',
        content: `RÉPUBLIQUE DE CÔTE D'IVOIRE - MINISTÈRE DU BUDGET ET DU PORTEFEUILLE DE L'ÉTAT
DIRECTION GÉNÉRALE DES IMPÔTS (DGI)
Avis n° VERIF-2026-441 du 04/05/2026
Société visée : IVOIRE TÉLÉCOM & PRESTATIONS SARL (CC n° 1204891 X)
Objet : Vérification générale portant sur la TVA, l'Impôt sur les Bénéfices (IBIC), l'AIRSI et les retenues BNC.
Documents réclamés : Journaux d'achats, factures d'origine, tableau des amortissements, déclarations mensuelles.`,
      },
      {
        id: 'DOC_FISC_02',
        title: 'Tableau d\'Amortissement du Véhicule de Direction',
        type: 'spreadsheet',
        content: `IMMOBILISATION : Véhicule Mercedes GLE de direction (Plaque 4412 JH 01)
Date d'acquisition : 02/01/N-1
Prix d'achat TTC : 45 000 000 FCFA
Durée d'amortissement : 5 ans (taux 20%)
Dotation comptable annuelle passée en charge : 9 000 000 FCFA
Article 39 du CGI CI : Le plafond de déductibilité des véhicules de tourisme est de 25 000 000 FCFA TTC (dotation max déductible : 5 000 000 FCFA/an).`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Audit de la déductibilité de l\'amortissement du véhicule',
        speaker: {
          name: 'M. Touré',
          role: 'Directeur Général',
          avatar: '👨🏾‍💼',
        },
        dialogue: "L'inspecteur des impôts arrive lundi matin. Notre comptable a déduit l'intégralité des 9 000 000 FCFA d'amortissement de notre Mercedes de direction. Le fisc va-t-il accepter cette charge dans notre résultat fiscal ?",
        taskInstruction: 'Appliquez le plafonnement fiscal de l\'Article 39 du Code Général des Impôts de Côte d\'Ivoire.',
        documentIdsToInspect: ['DOC_FISC_02'],
        options: [
          {
            id: 'OPT_FISC_1A',
            label: 'Réintégrer fiscalement 4 000 000 FCFA au tableau 2058-A de la liasse fiscale : le plafond légal étant de 25M FCFA (dotation max déductible de 5M FCFA), l\'excédent de 4M FCFA doit être réintégré au bénéfice imposable.',
            explanation: 'Règle stricte du CGI ivoirien : les véhicules particuliers ne sont déductibles qu\'à concurrence de 25 millions FCFA. La fraction excédentaire (4M FCFA) est non déductible et soumise à l\'IS de 25%.',
            pointsDelta: 35,
            feedbackImmediate: 'M. Touré note immédiatement : « Rigueur exemplaire ! Nous rectifions la liasse spontanément avant le contrôle, évitant ainsi la pénalité de redressement de 25%. »',
            isOptimal: true,
          },
          {
            id: 'OPT_FISC_1B',
            label: 'Maintenir la déduction totale des 9 000 000 FCFA en prétendant que le véhicule sert à transporter du matériel informatique.',
            explanation: 'Fraude caractérisée qui déclenche le redressement d\'office avec pénalité de mauvaise foi.',
            pointsDelta: -30,
            feedbackImmediate: 'L\'inspecteur des impôts découvre la carte grise : véhicule particulier 5 places. Redressement immédiat de 1 000 000 FCFA d\'IS + 400 000 FCFA de pénalités !',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Contrôle des factures fournisseurs et mentions légales de TVA',
        speaker: {
          name: 'Mme N\'Guessan',
          role: 'Inspectrice Vérificatrice des Impôts',
          avatar: '👩🏾‍💼',
        },
        dialogue: "J'examine votre journal des achats. Vous avez déduit 12 600 000 FCFA de TVA sur des factures de sous-traitance émises par l'entreprise 'Presta-Rapide'. Or, ces factures ne comportent aucun Numéro de Compte Contribuable (NCC) valide ni mention du régime réel d'imposition. Quelle est votre réponse technique ?",
        taskInstruction: 'Défendez ou régularisez la TVA déductible selon les dispositions de l\'Article 383 du CGI.',
        documentIdsToInspect: ['DOC_FISC_01'],
        options: [
          {
            id: 'OPT_FISC_2A',
            label: 'Reconnaître l\'irrégularité formelle, accepter le rejet de la TVA déductible de 12,6M FCFA, mais démontrer la réalité physique de la prestation pour préserver la déductibilité de la charge hors taxe au titre des dépenses nécessaires à l\'exploitation.',
            explanation: 'L\'absence de NCC interdit la déduction de la TVA (règle formelle absolue), mais la réalité prouvée du service permet d\'éviter le rejet de la charge en impôt sur les sociétés.',
            pointsDelta: 35,
            feedbackImmediate: 'Mme N\'Guessan valide le compromis : « C\'est une argumentation solide et conforme au Livre de Procédures Fiscales. La charge HT est admise, seule la TVA est rappelée. »',
            isOptimal: true,
          },
          {
            id: 'OPT_FISC_2B',
            label: 'Refuser catégoriquement le rejet en affirmant que le client n\'est pas responsable des manquements fiscaux de ses sous-traitants.',
            explanation: 'La loi fiscale impose la vigilance de l\'acheteur : sans NCC vérifié, aucune TVA n\'est déductible.',
            pointsDelta: -25,
            feedbackImmediate: 'Mme N\'Guessan rejette la charge ET la TVA avec pénalité de 50% pour manquement délibéré !',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "La conformité fiscale d'une entreprise en zone OHADA repose sur : 1) La validation préalable du Numéro de Compte Contribuable (NCC) de tous les fournisseurs avant déduction de TVA, 2) Le respect rigoureux des plafonds légaux de déductibilité (amortissement des véhicules de tourisme à 25M FCFA), 3) La conservation probante des justificatifs d'exploitation pendant la durée légale de prescription (3 ans).",
      commonPitfalls: [
        "Déduire de la TVA sur des factures d'entreprises assujetties au régime synthétique ou sans mention fiscale obligatoire.",
        "Oublier de réintégrer l'amortissement non déductible sur les véhicules de direction.",
        "Confondre la contestation contentieuse avec la régularisation amiable sous le bénéfice du droit à l'erreur.",
      ],
      keyTakeaway: "Un bon directeur financier gagne plus d'argent en sécurisant sa conformité fiscale qu'en tentant des optimisations hasardeuses sanctionnées à 100%.",
    },
  },
  {
    id: 'MISSION_12',
    title: 'Le Tour de Table & Rachat d\'Entreprise (M&A)',
    subtitle: 'Négocier une levée de fonds de 600 millions FCFA avec un fonds de capital-investissement',
    companyName: 'Sahel-Lagune Logistique SA',
    companyContext: 'PME ivoirienne de transport frigorifique et d\'entreposage sous douane en forte croissance sur le corridor Abidjan-Ouagadougou.',
    location: 'Abidjan, Côte d\'Ivoire',
    currency: 'FCFA (XOF)',
    roleAssigned: 'Directeur Général & Fondateur',
    difficulty: 'Expert',
    timeLimitMinutes: 25,
    briefing: {
      situation: "Pour acquérir 25 nouveaux camions frigorifiques et construire un hub logistique à Bouaké, Sahel-Lagune Logistique SA a besoin de 600 000 000 FCFA. Le fonds ouest-africain 'AFIG Capital Partners' propose une prise de participation minoritaire mais exige une valorisation pre-money stricte et des clauses de gouvernance serrées.",
      objectives: [
        "Valoriser l'entreprise par la méthode des flux futurs actualisés (DCF) et des multiples d'EBITDA.",
        "Négocier le pourcentage de capital cédé pour préserver le contrôle du fondateur (plus de 50%).",
        "Arbitrer les clauses clés du pacte d'actionnaires (Tag-along, Drag-along, Liquidation préférentielle).",
      ],
      risks: [
        "Dilution excessive faisant perdre le contrôle de la gouvernance au fondateur.",
        "Accepter une clause de liquidation préférentielle spoliatrice en cas de revente future.",
      ],
    },
    documents: [
      {
        id: 'DOC_MA_01',
        title: 'Term Sheet d\'Investissement - AFIG Capital Partners',
        type: 'contract',
        content: `TERM SHEET PROSPECTIVE - PROJET CORRIDOR 2026
Investisseur : AFIG CAPITAL WEST AFRICA
Cible : SAHEL-LAGUNE LOGISTIQUE SA
Montant de l'injection : 600 000 000 FCFA en augmentation de capital par émission d'actions nouvelles.
Proposition 1 de l'investisseur : Valorisation Pre-Money retenue à 1 400 000 000 FCFA (soit Post-Money à 2 000 000 000 FCFA).
Quote-part cédée : 30% du capital social.
Gouvernance : 2 sièges au Conseil d'Administration sur 5, droit de veto sur tout investissement > 50M FCFA.`,
      },
      {
        id: 'DOC_MA_02',
        title: 'Modèle de Valorisation DCF & Multiples Sectoriels',
        type: 'spreadsheet',
        content: `RAPPORT D'ÉVALUATION FINANCIÈRE INDÉPENDANTE (PwC ABIDJAN)
1. Méthode DCF (Flux de trésorerie libres 2026-2030 actualisés au CMPC de 11.5%) :
   - Valeur d'Entreprise : 2 250 000 000 FCFA
   - Dette nette déduite : 350 000 000 FCFA
   - Valeur des Fonds Propres (Equity Value) : 1 900 000 000 FCFA
2. Méthode des Multiples d'EBITDA (Transaction comparables zone UEMOA) :
   - EBITDA récurrent N-1 : 380 000 000 FCFA
   - Multiple médian du secteur logistique : 5.5x EBITDA = 2 090 000 000 FCFA
Fourchette de valeur pre-money justifiée : 1 800 000 000 FCFA à 1 950 000 000 FCFA.`,
      },
    ],
    steps: [
      {
        id: 'STEP_1',
        title: 'Étape 1 : Négociation de la valorisation Pre-Money',
        speaker: {
          name: 'M. Mensah',
          role: 'Managing Partner Fonds AFIG Capital',
          avatar: '👨🏾‍💼',
        },
        dialogue: "Nous croyons au corridor ivoiro-burkinabé. Mais les taux d'intérêt BCEAO sont élevés et le risque pays existe. Notre offre est ferme : nous injectons 600 millions FCFA sur une valorisation pre-money de 1,4 milliard, ce qui nous confère 30% du capital. Êtes-vous prêt à signer sur cette base ?",
        taskInstruction: 'Défendez la valorisation intrinsèque de votre entreprise face aux exigences de l\'investisseur.',
        documentIdsToInspect: ['DOC_MA_01', 'DOC_MA_02'],
        options: [
          {
            id: 'OPT_MA_1A',
            label: 'Contre-proposer une valorisation Pre-Money de 1,8 milliard FCFA (fondée sur la moyenne DCF/EBITDA de l\'audit PwC), ce qui confère à AFIG 25% du capital (Post-Money de 2,4 milliards) tout en apportant l\'intégralité des 600M FCFA nécessaires.',
            explanation: 'Une pre-money à 1,8 milliard reflète la juste valeur des flux futurs, limite la dilution du fondateur à 25% (conservation de 75% du capital) et respecte le rendement cible de 20% du fonds.',
            pointsDelta: 35,
            feedbackImmediate: 'M. Mensah consulte ses analystes : « Votre modèle DCF est inattaquable et les multiples de 5.5x EBITDA sont réalistes. Nous acceptons la pre-money à 1,8 milliard FCFA avec 25% du capital. »',
            isOptimal: true,
          },
          {
            id: 'OPT_MA_1B',
            label: 'Accepter immédiatement la valorisation bradée à 1,4 milliard FCFA de peur que le fonds ne retire son offre.',
            explanation: 'Dilution inutile de 5% du capital représentant une perte patrimoniale sèche de 100 millions FCFA pour le fondateur.',
            pointsDelta: -25,
            feedbackImmediate: 'M. Mensah sourit : « Affaire conclue à 1,4 milliard ! » Vos associés vous reprochent d\'avoir cédé trop vite sans négocier.',
            isOptimal: false,
          },
        ],
      },
      {
        id: 'STEP_2',
        title: 'Étape 2 : Négociation du pacte d\'actionnaires et gouvernance',
        speaker: {
          name: 'Maître Koffi',
          role: 'Avocat Conseil d\'Affaires',
          avatar: '👨🏾‍⚖️',
        },
        dialogue: "Le fonds exige d'inscrire dans le pacte d'actionnaires un droit de veto sur toutes les décisions de gestion et une clause de liquidation préférentielle non-participante de rang 1x. Comment arbitrez-vous ces clauses stratégiques ?",
        taskInstruction: 'Équilibrez la gouvernance et protégez la valeur patrimoniale du dirigeant.',
        documentIdsToInspect: ['DOC_MA_01'],
        options: [
          {
            id: 'OPT_MA_2A',
            label: 'Accorder un droit de veto strictement circonscrit aux décisions extraordinaires (fusion, cession d\'actifs majeurs, endettement > 200M FCFA) tout en préservant l\'autonomie opérationnelle du DG, et valider la liquidation préférentielle 1x non-participante standard.',
            explanation: 'Équilibre parfait : l\'investisseur protège son capital contre les abus graves sans paralyser la gestion quotidienne, et la clause 1x non-participante évite que l\'investisseur ne perçoive deux fois son investissement lors de la sortie.',
            pointsDelta: 35,
            feedbackImmediate: 'Maître Koffi s\'exclame : « C\'est un pacte d\'actionnaires de niveau international ! La signature officielle du tour de table de 600 millions FCFA est actée ! »',
            isOptimal: true,
          },
          {
            id: 'OPT_MA_2B',
            label: 'Refuser tout droit de veto et exiger qu\'AFIG n\'ait aucun droit d\'information financière trimestrielle.',
            explanation: 'Fait capoter la transaction : aucun fonds d\'investissement professionnel ne déploie de capitaux sans droit d\'audit et de gouvernance.',
            pointsDelta: -30,
            feedbackImmediate: 'AFIG Capital rompt immédiatement les négociations : « Sans gouvernance partagée, notre comité d\'investissement refuse de libérer les fonds. »',
            isOptimal: false,
          },
        ],
      },
    ],
    debriefing: {
      goldStandard: "Une levée de fonds ou une opération de fusion-acquisition réussie s'appuie sur : 1) Une valorisation objective croisant la méthode intrinsèque (DCF) et les multiples de marché, 2) Une négociation ferme de la valorisation pre-money préservant le contrôle du fondateur, 3) Un pacte d'actionnaires équilibré séparant la protection légitime du capital de la liberté opérationnelle du management.",
      commonPitfalls: [
        "Confondre valorisation Pre-Money et Post-Money (la post-money inclut le cash injecté : Post = Pre + Cash).",
        "Céder une majorité de blocage dès le premier tour de table.",
        "Signer des clauses de liquidation préférentielle sur-dimensionnées (2x ou 3x) qui spolient le fondateur lors de la revente.",
      ],
      keyTakeaway: "Une bonne levée de fonds ne consiste pas à obtenir le plus d'argent possible, mais à s'associer aux bons partenaires tout en conservant la maîtrise de son destin entrepreneurial.",
    },
  },
];


