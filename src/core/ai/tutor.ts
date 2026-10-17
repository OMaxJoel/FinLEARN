/**
 * MOTEUR PÉDAGOGIQUE DU TUTEUR IA AVEC GARDE-FOUS DÉTERMINISTES (US-701)
 *
 * Ce module implémente une assistance pédagogique socratique sans hallucination :
 * - Détection automatique des confusions conceptuelles classiques (Trésorerie vs Résultat, FRNG vs BFR, etc.)
 * - Fourniture d'indices progressifs (Scaffolding pédagogique) sans donner la réponse brute.
 * - Références officielles explicites aux normes SYSCOHADA Révisé, Code CIMA et IAS/IFRS.
 * - Refus systématique des requêtes hors périmètre financier ou non conformes.
 */

export type FinanceDomain =
  | 'accounting_syscohada'
  | 'cost_controlling'
  | 'corporate_finance'
  | 'treasury_cash'
  | 'insurance_cima'
  | 'excel_modeling'
  | 'consolidation_ias21';

export interface PedagogicalConcept {
  id: string;
  name: string;
  domain: FinanceDomain;
  standardReference: string;
  officialDefinition: string;
  formula?: string;
  commonMisconceptions: {
    trap: string;
    correction: string;
  }[];
  socraticQuestions: string[];
}

export interface TutorResponse {
  domain: FinanceDomain;
  matchedConcept?: string;
  identifiedMisconception?: string;
  socraticGuidance: string;
  standardReference?: string;
  formula?: string;
  suggestedAction: string;
  confidenceScore: number;
}

/**
 * Base de connaissances ontologique déterministe
 */
export const KNOWLEDGE_BASE: Record<string, PedagogicalConcept> = {
  cash_vs_profit: {
    id: 'cash_vs_profit',
    name: 'Résultat Net vs Trésorerie Nette',
    domain: 'accounting_syscohada',
    standardReference: 'SYSCOHADA Révisé (Art. 29 à 34)',
    officialDefinition:
      "Le Résultat net mesure l'enrichissement ou l'appauvrissement sur une période (Produits - Charges, comptabilité d'engagement). La Trésorerie mesure la liquidité immédiatement disponible (Encaissements - Décaissements).",
    formula: 'Trésorerie Nette = Trésorerie Active (Classe 5) - Trésorerie Passive',
    commonMisconceptions: [
      {
        trap: 'Confondre une entreprise très rentable avec une entreprise qui a du cash disponible.',
        correction:
          'Une société peut réaliser un résultat net de 100M FCFA tout en faisant faillite demain si ses clients ne paient pas (BFR trop élevé absorbant tout le cash).',
      },
    ],
    socraticQuestions: [
      "Quelle est la différence entre une vente facturée à 60 jours et un encaissement sur le compte bancaire ?",
      "Où se trouve le décalage temporel entre la facture client et le virement bancaire effectif ?",
    ],
  },

  frng_vs_bfr: {
    id: 'frng_vs_bfr',
    name: "Fonds de Roulement Net Global (FRNG) vs Besoin en Fonds de Roulement (BFR)",
    domain: 'accounting_syscohada',
    standardReference: 'SYSCOHADA Révisé — Tableau des Flux de Trésorerie & Bilan Fonctionnel',
    officialDefinition:
      "Le FRNG représente l'excédent de ressources stables finançant les investissements durables. Le BFR représente le besoin de financement généré par le décalage des opérations d'exploitation.",
    formula: 'Trésorerie Nette = FRNG - BFR (avec FRNG = Ressources Durables - Emplois Stables)',
    commonMisconceptions: [
      {
        trap: 'Penser qu\'un BFR positif est une bonne nouvelle ou un surplus de cash.',
        correction:
          'Un BFR positif est un BESOIN de financement : il signifie que vos stocks et créances clients dépassent vos dettes fournisseurs, immobilisant ainsi votre trésorerie.',
      },
    ],
    socraticQuestions: [
      "Si vos clients vous paient à 90 jours et que vos fournisseurs exigent d'être payés à 30 jours, que devient votre BFR ?",
      "Par quelle ressource durable votre entreprise finance-t-elle ce décalage d'exploitation ?",
    ],
  },

  npv_vs_irr: {
    id: 'npv_vs_irr',
    name: "Valeur Actuelle Nette (VAN) vs Taux de Rentabilité Interne (TRI)",
    domain: 'corporate_finance',
    standardReference: 'Théorie Financière d’Entreprise & Analyse d’Investissement',
    officialDefinition:
      "La VAN mesure l'enrichissement absolu en valeur monétaire (FCFA) créé par l'investissement après rémunération du capital (CMPC). Le TRI est le taux d'actualisation exact pour lequel la VAN s'annule.",
    formula: 'VAN = \\sum_{t=1}^n \\frac{CF_t}{(1+k)^t} - I_0',
    commonMisconceptions: [
      {
        trap: 'Toujours préférer le projet avec le plus fort TRI sans regarder la VAN.',
        correction:
          'En cas de projets mutuellement exclusifs de tailles différentes, un projet à 30% de TRI sur 10M FCFA enrichit moins les actionnaires qu\'un projet à 20% de TRI sur 500M FCFA.',
      },
    ],
    socraticQuestions: [
      "Si vous devez choisir un seul projet entre un investissement de 10 millions à 35% de TRI et un investissement de 200 millions à 22% de TRI, lequel apporte le plus de richesse en FCFA ?",
      "À quel niveau se situe le taux de Fisher où les deux projets ont la même VAN ?",
    ],
  },

  cima_art13: {
    id: 'cima_art13',
    name: "Article 13 du Code CIMA (Paiement préalable de la prime)",
    domain: 'insurance_cima',
    standardReference: 'Code CIMA — Article 13 & Règlementations des Intermédiaires',
    officialDefinition:
      "La prise d'effet de la garantie est subordonnée au paiement intégral de la prime par le souscripteur. Les primes encaissées par le courtier appartiennent à l'assureur et doivent être reversées dans les 30 jours.",
    formula: 'Commission Courtier = Prime Nette HT \\times Taux Commission Réglementaire',
    commonMisconceptions: [
      {
        trap: 'Considérer que les primes d\'assurance reçues des clients font partie du chiffre d\'affaires ou du cash propre du courtier.',
        correction:
          'C\'est une faute lourde pénalement réprimée : la prime est une dette envers la compagnie d\'assurance (Compte 46 / Tiers). Seule la commission constitue le produit du courtier.',
      },
    ],
    socraticQuestions: [
      "À qui appartient juridiquement la somme versée par l'assuré lorsqu'elle arrive sur le compte bancaire du cabinet de courtage ?",
      "Quel est le délai légal CIMA impératif pour reverser cette prime à la compagnie mandante ?",
    ],
  },

  consolidation_translation: {
    id: 'consolidation_translation',
    name: "Écart de Conversion & Élimination Intragroupe (IAS 21 / SYSCOHADA)",
    domain: 'consolidation_ias21',
    standardReference: 'IAS 21 / Acte Uniforme OHADA portant sur la Comptabilité',
    officialDefinition:
      "Pour consolider une filiale étrangère, le bilan est converti au cours de clôture et le compte de résultat au cours moyen. La différence est portée en 'Écart de conversion' dans les capitaux propres.",
    formula: 'Réserve de Conversion = Total Actif Clôture - (Passif Clôture + Capitaux Propres Historiques)',
    commonMisconceptions: [
      {
        trap: 'Considérer que l\'écart de conversion bilanciel doit impacter le compte de résultat de l\'exercice.',
        correction:
          'Selon IAS 21, l\'écart de conversion lié à la conversion des états financiers d\'une entité étrangère autonome est imputé directement dans les Autres Éléments du Résultat Global (OCI / Capitaux propres).',
      },
    ],
    socraticQuestions: [
      "Pourquoi convertit-on le chiffre d'affaires au cours moyen de l'année alors que la trésorerie est convertie au cours du 31 décembre ?",
      "Pourquoi doit-on éliminer les ventes internes à 100% même si la filiale n'est détenue qu'à 80% ?",
    ],
  },
};

/**
 * Analyse une requête textuelle d'un apprenant et retourne une réponse socratique guidée
 */
export function askTutor(query: string, currentContextDomain?: FinanceDomain): TutorResponse {
  const normalizedQuery = query.toLowerCase().trim();

  // 1. Garde-fou : Détection des questions hors sujet
  const nonFinancialTriggers = [
    'recette de cuisine',
    'football',
    'meteo',
    'film',
    'politique',
    'jeu video de tir',
    'blague',
  ];
  if (nonFinancialTriggers.some((t) => normalizedQuery.includes(t))) {
    return {
      domain: currentContextDomain || 'accounting_syscohada',
      socraticGuidance:
        "Je suis votre Tuteur Spécialisé en Gestion Financière, Comptabilité OHADA et Ingénierie Financière. Je ne peux traiter que des questions relatives à vos cours, simulateurs et cas pratiques de finance.",
      suggestedAction: "Posez-moi une question sur le SYSCOHADA, le BFR, la VAN, le Code CIMA ou la consolidation.",
      confidenceScore: 0.1,
    };
  }

  // 2. Détection de confusion Trésorerie vs Résultat
  const hasCashIndicator =
    normalizedQuery.includes('cash') ||
    normalizedQuery.includes('trésorerie') ||
    normalizedQuery.includes('tresorerie') ||
    normalizedQuery.includes('compte bancaire') ||
    normalizedQuery.includes('banque') ||
    normalizedQuery.includes('découvert') ||
    normalizedQuery.includes('liquidité');

  const hasProfitIndicator =
    normalizedQuery.includes('résultat') ||
    normalizedQuery.includes('resultat') ||
    normalizedQuery.includes('bénéfice') ||
    normalizedQuery.includes('benefice') ||
    normalizedQuery.includes('profit') ||
    normalizedQuery.includes('rentable');

  if (hasCashIndicator && hasProfitIndicator) {
    const concept = KNOWLEDGE_BASE.cash_vs_profit;
    return {
      domain: concept.domain,
      matchedConcept: concept.name,
      identifiedMisconception: concept.commonMisconceptions[0].trap,
      socraticGuidance:
        "Attention au piège fondamental en finance d'entreprise : la Trésorerie et le Résultat net ne mesurent pas la même chose ! " +
        concept.commonMisconceptions[0].correction +
        " " +
        concept.socraticQuestions.join(' '),
      standardReference: concept.standardReference,
      formula: concept.formula,
      suggestedAction: "Vérifiez l'impact des créances clients en attente de règlement sur votre trésorerie dans le simulateur.",
      confidenceScore: 0.95,
    };
  }

  // 3. Détection de confusion FRNG vs BFR
  if (
    normalizedQuery.includes('frng') ||
    normalizedQuery.includes('fonds de roulement') ||
    normalizedQuery.includes('bfr') ||
    normalizedQuery.includes('besoin en fonds de roulement')
  ) {
    const concept = KNOWLEDGE_BASE.frng_vs_bfr;
    return {
      domain: concept.domain,
      matchedConcept: concept.name,
      identifiedMisconception: concept.commonMisconceptions[0].trap,
      socraticGuidance:
        "Rappel méthodologique : " +
        concept.officialDefinition +
        " " +
        concept.commonMisconceptions[0].correction +
        " " +
        concept.socraticQuestions[0],
      standardReference: concept.standardReference,
      formula: concept.formula,
      suggestedAction: "Testez l'effet d'une réduction du délai de paiement client (DSO) sur la trésorerie nette.",
      confidenceScore: 0.95,
    };
  }

  // 4. Détection de question sur VAN vs TRI
  if (
    normalizedQuery.includes('van') ||
    normalizedQuery.includes('tri') ||
    normalizedQuery.includes('rentabilité') ||
    normalizedQuery.includes('cmpc') ||
    normalizedQuery.includes('wacc') ||
    normalizedQuery.includes('fisher')
  ) {
    const concept = KNOWLEDGE_BASE.npv_vs_irr;
    return {
      domain: concept.domain,
      matchedConcept: concept.name,
      identifiedMisconception: concept.commonMisconceptions[0].trap,
      socraticGuidance:
        "En arbitrage d'investissement : " +
        concept.officialDefinition +
        " " +
        concept.commonMisconceptions[0].correction +
        " " +
        concept.socraticQuestions[0] +
        " " +
        concept.socraticQuestions[1],
      standardReference: concept.standardReference,
      formula: concept.formula,
      suggestedAction: "Calculez le taux de Fisher pour déterminer à partir de quel coût du capital un projet surpasse l'autre.",
      confidenceScore: 0.92,
    };
  }

  // 5. Détection de question CIMA / Courtage d'assurance
  if (
    normalizedQuery.includes('cima') ||
    normalizedQuery.includes('article 13') ||
    normalizedQuery.includes('courtage') ||
    normalizedQuery.includes('prime') ||
    normalizedQuery.includes('commission')
  ) {
    const concept = KNOWLEDGE_BASE.cima_art13;
    return {
      domain: concept.domain,
      matchedConcept: concept.name,
      identifiedMisconception: concept.commonMisconceptions[0].trap,
      socraticGuidance:
        "Point juridique et comptable capital sous le Code CIMA : " +
        concept.officialDefinition +
        " " +
        concept.commonMisconceptions[0].correction +
        " " +
        concept.socraticQuestions[0],
      standardReference: concept.standardReference,
      formula: concept.formula,
      suggestedAction: "Isolez les primes encaissées au compte tiers 467 et constatez uniquement vos 10-15% de commission au compte 706.",
      confidenceScore: 0.94,
    };
  }

  // 6. Détection de question sur la Consolidation & IAS 21
  if (
    normalizedQuery.includes('consolidation') ||
    normalizedQuery.includes('ias 21') ||
    normalizedQuery.includes('conversion') ||
    normalizedQuery.includes('minoritaire') ||
    normalizedQuery.includes('intragroupe')
  ) {
    const concept = KNOWLEDGE_BASE.consolidation_translation;
    return {
      domain: concept.domain,
      matchedConcept: concept.name,
      identifiedMisconception: concept.commonMisconceptions[0].trap,
      socraticGuidance:
        "En consolidation internationale : " +
        concept.officialDefinition +
        " " +
        concept.commonMisconceptions[0].correction +
        " " +
        concept.socraticQuestions[0],
      standardReference: concept.standardReference,
      formula: concept.formula,
      suggestedAction: "Rendez-vous sur le Cockpit de Consolidation pour tester la sensibilité au cours EUR/XOF.",
      confidenceScore: 0.93,
    };
  }

  // Réponse par défaut cadrée
  return {
    domain: currentContextDomain || 'accounting_syscohada',
    socraticGuidance:
      "Pour vous aider au mieux : quel est l'indicateur ou la pièce comptable que vous analysez actuellement ? " +
      "Identifiez d'abord si votre problème concerne le compte de résultat (flux d'activité), le bilan (patrimoine) ou la trésorerie (liquidité).",
    suggestedAction: "Précisez votre question avec les termes du référentiel (SYSCOHADA, CIMA, ou Finance).",
    confidenceScore: 0.6,
  };
}
