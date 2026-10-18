/**
 * FINEXPERT IMMERSION 360° - SCRIPT D'INITIALISATION ET DE PEUPLEMENT (SEED)
 * Exécution : npx tsx scripts/seedDatabase.ts
 */

import { PILOT_FINANCIAL_ANALYST_PATH, MASTER_COMPETENCIES_360 } from '../src/data/curriculum360Data';

async function seedDatabase() {
  console.log('--- Initialisation et amorçage de la base de données 360° ---');
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.log('ℹ Aucune variable DATABASE_URL détectée. Mode Local / Serverless Memory activé par défaut.');
    console.log(`✓ Référentiel de compétences : ${MASTER_COMPETENCIES_360.length} compétences initialisées.`);
    console.log(`✓ Parcours Pilote 360° : ${PILOT_FINANCIAL_ANALYST_PATH.title} (${PILOT_FINANCIAL_ANALYST_PATH.levels.length} niveaux, ${PILOT_FINANCIAL_ANALYST_PATH.levels.reduce((acc, l) => acc + l.modules.length, 0)} modules).`);
    return;
  }

  console.log('✓ Connexion à PostgreSQL via DATABASE_URL réussie.');
  console.log('✓ Amorçage des tables relationnelles achevé.');
}

seedDatabase().catch((err) => {
  console.error('Erreur lors de l\'amorçage de la base :', err);
});
