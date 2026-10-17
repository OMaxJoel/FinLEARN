import { JournalEntry } from '../types/accounting';
import { InsurancePolicy } from '../core/insurance/commissions';
import { UserProfile } from '../types/pedagogy';

/**
 * Profils pré-configurés pour tester instantanément les différents rôles
 */
export const DEMO_PROFILES: Record<string, UserProfile> = {
  max: {
    id: 'user_max_01',
    name: 'Max Oura',
    email: 'max.oura@finexpert.ci',
    role: 'apprenant',
    careerGoal: 'analyste_financier',
    experienceLevel: 'avance',
    weeklyHours: 15,
    totalXp: 4850,
    completedLessons: ['C1_L1', 'C1_L2', 'C1_L3', 'C2_L1', 'C3_L1', 'C4_L1', 'C5_L1', 'C7_L1'],
    completedExercises: ['EX_C1_1', 'EX_C1_2', 'EX_C3_1', 'EX_C7_1'],
    completedMissions: ['MISSION_01', 'MISSION_02', 'MISSION_03', 'MISSION_04', 'MISSION_05', 'MISSION_06', 'MISSION_07'],
  },
  koffi: {
    id: 'user_koffi_01',
    name: 'Koffi Kouamé',
    email: 'koffi.kouame@finlearn.ci',
    role: 'apprenant',
    careerGoal: 'comptable_junior',
    experienceLevel: 'debutant',
    weeklyHours: 10,
    totalXp: 450,
    completedLessons: ['C1_L1'],
    completedExercises: ['EX_C1_1'],
    completedMissions: [],
  },
  aminata: {
    id: 'user_aminata_02',
    name: 'Aminata Traoré',
    email: 'aminata.traore@finlearn.ci',
    role: 'apprenant',
    careerGoal: 'analyste_financier',
    experienceLevel: 'intermediaire',
    weeklyHours: 8,
    totalXp: 1850,
    completedLessons: ['C1_L1', 'C1_L2', 'C1_L3', 'C3_L1'],
    completedExercises: ['EX_C1_1', 'EX_C1_2', 'EX_C3_1'],
    completedMissions: ['MISSION_01'],
  },
  fatou: {
    id: 'user_fatou_03',
    name: 'Fatou Diop',
    email: 'fatou.diop@finlearn.ci',
    role: 'apprenant',
    careerGoal: 'courtier_assurance',
    experienceLevel: 'avance',
    weeklyHours: 12,
    totalXp: 3200,
    completedLessons: ['C1_L1', 'C1_L2', 'C3_L1', 'C3_L2', 'C7_L1'],
    completedExercises: ['EX_C1_1', 'EX_C1_2', 'EX_C7_1'],
    completedMissions: ['MISSION_01', 'MISSION_02'],
  },
  toure: {
    id: 'user_toure_04',
    name: 'Dr. Souleymane Touré',
    email: 's.toure@finlearn.ci',
    role: 'formateur',
    careerGoal: 'directeur_pme',
    experienceLevel: 'avance',
    weeklyHours: 20,
    totalXp: 9999,
    completedLessons: ['C1_L1', 'C1_L2', 'C1_L3', 'C3_L1', 'C3_L2', 'C7_L1'],
    completedExercises: ['EX_C1_1', 'EX_C1_2', 'EX_C3_1', 'EX_C7_1'],
    completedMissions: ['MISSION_01', 'MISSION_02', 'MISSION_03'],
  },
};

/**
 * Jeu d'écritures réelles de la PME Ivoire Distribution SARL (Abidjan)
 */
export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'J01',
    date: '2026-01-02',
    label: 'Constitution PME - Apport initial en capital social',
    refPiece: 'ACTE-NOTAIRE-44',
    lines: [
      { id: 'L1', accountCode: '5211', accountLabel: 'Banques locales (SGBCI)', debit: 15000000, credit: 0 },
      { id: 'L2', accountCode: '1013', accountLabel: 'Capital souscrit, appelé, versé', debit: 0, credit: 15000000 },
    ],
  },
  {
    id: 'J02',
    date: '2026-01-05',
    label: 'Acquisition matériel informatique de bureau',
    refPiece: 'FAC-MICRO-089',
    lines: [
      { id: 'L3', accountCode: '2444', accountLabel: 'Matériel informatique', debit: 3500000, credit: 0 },
      { id: 'L4', accountCode: '5211', accountLabel: 'Banques locales (SGBCI)', debit: 0, credit: 3500000 },
    ],
  },
  {
    id: 'J03',
    date: '2026-01-10',
    label: 'Achat de marchandises à crédit auprès du fournisseur Sodirex',
    refPiece: 'FAC-SOD-221',
    lines: [
      { id: 'L5', accountCode: '6011', accountLabel: 'Achats de marchandises', debit: 6000000, credit: 0 },
      { id: 'L6', accountCode: '4011', accountLabel: 'Fournisseurs d\'exploitation locaux', debit: 0, credit: 6000000 },
    ],
  },
  {
    id: 'J04',
    date: '2026-01-15',
    label: 'Vente de marchandises au comptant par chèque',
    refPiece: 'FAC-V-001',
    lines: [
      { id: 'L7', accountCode: '5211', accountLabel: 'Banques locales (SGBCI)', debit: 9500000, credit: 0 },
      { id: 'L8', accountCode: '7011', accountLabel: 'Ventes de marchandises', debit: 0, credit: 9500000 },
    ],
  },
  {
    id: 'J05',
    date: '2026-01-25',
    label: 'Règlement partiel du fournisseur Sodirex par virement',
    refPiece: 'VIR-BNQ-09',
    lines: [
      { id: 'L9', accountCode: '4011', accountLabel: 'Fournisseurs d\'exploitation locaux', debit: 4000000, credit: 0 },
      { id: 'L10', accountCode: '5211', accountLabel: 'Banques locales (SGBCI)', debit: 0, credit: 4000000 },
    ],
  },
];

/**
 * Portefeuille de polices de courtage du cabinet Ivoire Courtage Conseil (ICC)
 */
export const ICC_POLICIES_DATASET: InsurancePolicy[] = [
  {
    policyNumber: 'POL-AUTO-8801',
    clientName: 'SOTRA Fictive Abidjan',
    insurerName: 'Sanlam Assurance CI',
    branch: 'AUTO',
    effectiveDate: '2026-01-01',
    expiryDate: '2026-12-31',
    netPremiumFCFA: 18000000,
    accessoriesFCFA: 150000,
    taxRatePercent: 14.5,
    commissionRatePercent: 12, // 2 160 000 FCFA attendus
    isRenewed: true,
    premiumPaymentDate: '2026-01-18',
  },
  {
    policyNumber: 'POL-SANTE-4412',
    clientName: 'Compagnie Ivoirienne de Cacao',
    insurerName: 'Allianz Côte d\'Ivoire',
    branch: 'SANTE',
    effectiveDate: '2026-01-01',
    expiryDate: '2026-12-31',
    netPremiumFCFA: 25000000,
    accessoriesFCFA: 200000,
    taxRatePercent: 0,
    commissionRatePercent: 10, // 2 500 000 FCFA attendus
    isRenewed: true,
    premiumPaymentDate: '2026-01-22',
  },
  {
    policyNumber: 'POL-IARD-3390',
    clientName: 'Entrepôts Frigorifiques de San Pedro',
    insurerName: 'NSIA Assurances',
    branch: 'IARD',
    effectiveDate: '2026-02-01',
    expiryDate: '2027-01-31',
    netPremiumFCFA: 12000000,
    accessoriesFCFA: 100000,
    taxRatePercent: 14.5,
    commissionRatePercent: 15, // 1 800 000 FCFA attendus
    isRenewed: false, // Résiliation client
    premiumPaymentDate: '2026-02-10',
  },
  {
    policyNumber: 'POL-RC-1099',
    clientName: 'Cabinet Médical du Plateau',
    insurerName: 'Sunu Assurances',
    branch: 'RC',
    effectiveDate: '2026-03-01',
    expiryDate: '2027-02-28',
    netPremiumFCFA: 4500000,
    accessoriesFCFA: 40000,
    taxRatePercent: 14.5,
    commissionRatePercent: 12.5, // 562 500 FCFA attendus
    isRenewed: true,
    premiumPaymentDate: '2026-03-12',
  },
  {
    policyNumber: 'POL-TRANS-5510',
    clientName: 'Ivoire Transit & Logistique',
    insurerName: 'NSIA Assurances',
    branch: 'TRANSPORT',
    effectiveDate: '2025-04-15',
    expiryDate: '2026-04-15',
    netPremiumFCFA: 32000000,
    accessoriesFCFA: 250000,
    taxRatePercent: 14.5,
    commissionRatePercent: 10, // 3 200 000 FCFA attendus
    isRenewed: false, // À renouveler d'urgence
    premiumPaymentDate: '2025-04-28',
  },
  {
    policyNumber: 'POL-SANTE-9921',
    clientName: 'Groupe Scolaire Riviera Palmeraie',
    insurerName: 'Sanlam Assurance CI',
    branch: 'SANTE',
    effectiveDate: '2025-04-20',
    expiryDate: '2026-04-20',
    netPremiumFCFA: 8500000,
    accessoriesFCFA: 60000,
    taxRatePercent: 0,
    commissionRatePercent: 10, // 850 000 FCFA attendus
    isRenewed: true,
    premiumPaymentDate: '2025-05-02',
  },
  {
    policyNumber: 'POL-AUTO-7714',
    clientName: 'Ivoire BTP & Carrières',
    insurerName: 'Allianz Côte d\'Ivoire',
    branch: 'AUTO',
    effectiveDate: '2025-05-10',
    expiryDate: '2026-05-10',
    netPremiumFCFA: 14000000,
    accessoriesFCFA: 120000,
    taxRatePercent: 14.5,
    commissionRatePercent: 12, // 1 680 000 FCFA attendus
    isRenewed: true,
    premiumPaymentDate: '2025-05-20',
  },
  {
    policyNumber: 'POL-VIE-1102',
    clientName: 'M. Jean-Marc Yao (Individuel)',
    insurerName: 'WAFA Assurance CI',
    branch: 'VIE',
    effectiveDate: '2025-06-30',
    expiryDate: '2026-06-30',
    netPremiumFCFA: 3000000,
    accessoriesFCFA: 30000,
    taxRatePercent: 0,
    commissionRatePercent: 8, // 240 000 FCFA attendus
    isRenewed: true,
    premiumPaymentDate: '2025-07-05',
  },
];
