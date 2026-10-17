import { SyscohadaAccount } from '../../types/accounting';

/**
 * Référentiel du Plan Comptable Général SYSCOHADA Révisé
 * Extraits des comptes fondamentaux d'usage courant pour entreprises et cabinets.
 */
export const SYSCOHADA_PLAN: SyscohadaAccount[] = [
  // CLASSE 1 : COMPTES DE RESSOURCES DURABLES
  { code: '1011', label: 'Capital souscrit, non appelé', classNum: 1, type: 'PASSIF' },
  { code: '1013', label: 'Capital souscrit, appelé, versé, non amorti', classNum: 1, type: 'PASSIF' },
  { code: '1110', label: 'Réserve légale', classNum: 1, type: 'PASSIF' },
  { code: '1210', label: 'Report à nouveau créditeur', classNum: 1, type: 'PASSIF' },
  { code: '1301', label: 'Résultat en instance d\'affectation : Bénéfice', classNum: 1, type: 'PASSIF' },
  { code: '1310', label: 'Résultat net : Bénéfice', classNum: 1, type: 'PASSIF' },
  { code: '1390', label: 'Résultat net : Perte', classNum: 1, type: 'PASSIF' },
  { code: '1620', label: 'Emprunts et dettes auprès des établissements de crédit', classNum: 1, type: 'PASSIF' },

  // CLASSE 2 : COMPTES DE L'ACTIF IMMOBILISÉ
  { code: '2110', label: 'Terrains nus', classNum: 2, type: 'ACTIF' },
  { code: '2130', label: 'Bâtiments d\'exploitation', classNum: 2, type: 'ACTIF' },
  { code: '2411', label: 'Matériel industriel', classNum: 2, type: 'ACTIF' },
  { code: '2441', label: 'Matériel de bureau', classNum: 2, type: 'ACTIF' },
  { code: '2444', label: 'Matériel informatique', classNum: 2, type: 'ACTIF' },
  { code: '2450', label: 'Matériel de transport', classNum: 2, type: 'ACTIF' },
  { code: '2844', label: 'Amortissements du matériel informatique', classNum: 2, type: 'ACTIF' },
  { code: '2845', label: 'Amortissements du matériel de transport', classNum: 2, type: 'ACTIF' },

  // CLASSE 3 : COMPTES DE STOCKS
  { code: '3110', label: 'Marchandises A', classNum: 3, type: 'ACTIF' },
  { code: '3120', label: 'Marchandises B', classNum: 3, type: 'ACTIF' },
  { code: '3210', label: 'Matières premières', classNum: 3, type: 'ACTIF' },
  { code: '3910', label: 'Dépréciations des stocks de marchandises', classNum: 3, type: 'ACTIF' },

  // CLASSE 4 : COMPTES DE TIERS
  { code: '4011', label: 'Fournisseurs d\'exploitation locaux', classNum: 4, type: 'PASSIF' },
  { code: '4012', label: 'Fournisseurs d\'exploitation étrangers', classNum: 4, type: 'PASSIF' },
  { code: '4081', label: 'Fournisseurs - Factures non parvenues', classNum: 4, type: 'PASSIF' },
  { code: '4111', label: 'Clients locaux', classNum: 4, type: 'ACTIF' },
  { code: '4160', label: 'Créances clients douteuses ou litigieuses', classNum: 4, type: 'ACTIF' },
  { code: '4181', label: 'Clients - Factures à établir', classNum: 4, type: 'ACTIF' },
  { code: '4220', label: 'Personnel - Rémunérations dues', classNum: 4, type: 'PASSIF' },
  { code: '4310', label: 'Sécurité Sociale (CNPS Côte d\'Ivoire)', classNum: 4, type: 'PASSIF' },
  { code: '4431', label: 'État - TVA facturée sur ventes', classNum: 4, type: 'PASSIF' },
  { code: '4452', label: 'État - TVA récupérable sur achats', classNum: 4, type: 'ACTIF' },
  { code: '4454', label: 'État - TVA récupérable sur immobilisations', classNum: 4, type: 'ACTIF' },
  { code: '4441', label: 'État - Impôt sur les bénéfices (IBIC)', classNum: 4, type: 'PASSIF' },

  // CLASSE 5 : COMPTES DE TRÉSORERIE
  { code: '5211', label: 'Banques locales (SGBCI, BICICI, Ecobank...)', classNum: 5, type: 'ACTIF' },
  { code: '5711', label: 'Caisse principale (FCFA)', classNum: 5, type: 'ACTIF' },
  { code: '5610', label: 'Crédits de trésorerie (Découvert bancaire)', classNum: 5, type: 'PASSIF' },

  // CLASSE 6 : COMPTES DE CHARGES DES ACTIVITÉS ORDINAIRES
  { code: '6011', label: 'Achats de marchandises', classNum: 6, type: 'CHARGE' },
  { code: '6021', label: 'Achats de matières premières', classNum: 6, type: 'CHARGE' },
  { code: '6051', label: 'Fournitures non stockables (Eau, Électricité CIE/SODECI)', classNum: 6, type: 'CHARGE' },
  { code: '6120', label: 'Transports sur ventes', classNum: 6, type: 'CHARGE' },
  { code: '6220', label: 'Locations et charges locatives', classNum: 6, type: 'CHARGE' },
  { code: '6241', label: 'Assurances multirisques et flottes', classNum: 6, type: 'CHARGE' },
  { code: '6281', label: 'Frais de télécommunications', classNum: 6, type: 'CHARGE' },
  { code: '6320', label: 'Rémunérations d\'intermédiaires et commissions', classNum: 6, type: 'CHARGE' },
  { code: '6411', label: 'Impôts et taxes directs locaux (Patente, etc.)', classNum: 6, type: 'CHARGE' },
  { code: '6611', label: 'Appointements et salaires du personnel national', classNum: 6, type: 'CHARGE' },
  { code: '6641', label: 'Charges sociales patronales (CNPS)', classNum: 6, type: 'CHARGE' },
  { code: '6711', label: 'Intérêts des emprunts bancaires', classNum: 6, type: 'CHARGE' },
  { code: '6812', label: 'Dotations aux amortissements des immobilisations corporelles', classNum: 6, type: 'CHARGE' },

  // CLASSE 7 : COMPTES DE PRODUITS DES ACTIVITÉS ORDINAIRES
  { code: '7011', label: 'Ventes de marchandises dans la région', classNum: 7, type: 'PRODUIT' },
  { code: '7061', label: 'Prestations de services et commissions de courtage', classNum: 7, type: 'PRODUIT' },
  { code: '7711', label: 'Intérêts de placements et créances', classNum: 7, type: 'PRODUIT' },
  { code: '7810', label: 'Reprises d\'amortissements et de provisions', classNum: 7, type: 'PRODUIT' }
];

export function findAccount(code: string): SyscohadaAccount | undefined {
  return SYSCOHADA_PLAN.find((a) => a.code === code);
}
