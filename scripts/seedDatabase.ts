import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import pg from 'pg';
import { ALL_LEARNING_PATHS_360, MASTER_COMPETENCIES_360 } from '../src/data/curriculum360Data';
import { CompletenessAuditor } from '../src/core/authoring/completenessAuditor';

async function seedDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL est requis. Aucun seed n’a été exécuté.');

  const pool = new pg.Pool({ connectionString, max: 1, connectionTimeoutMillis: 5000 });
  const client = await pool.connect();
  try {
    const migrationsDir = resolve(process.cwd(), 'migrations');
    const migrationFiles = (await readdir(migrationsDir)).filter((file) => /^\d+_.*\.sql$/.test(file)).sort();
    for (const file of migrationFiles) {
      await client.query(await readFile(resolve(migrationsDir, file), 'utf8'));
      console.log(`Migration exécutée : ${file}`);
    }

    await client.query('BEGIN');
    for (const competency of MASTER_COMPETENCIES_360) {
      await client.query(
        `INSERT INTO competencies (code, domain, title, description, required_score_percent, sub_competencies)
         VALUES ($1, $2, $3, $4, $5, $6::jsonb)
         ON CONFLICT (code) DO UPDATE SET domain = EXCLUDED.domain, title = EXCLUDED.title,
           description = EXCLUDED.description, required_score_percent = EXCLUDED.required_score_percent,
           sub_competencies = EXCLUDED.sub_competencies`,
        [competency.code, competency.domain, competency.title, competency.description,
          competency.requiredScorePercent, JSON.stringify(competency.subCompetencies)]
      );
    }

    for (const path of ALL_LEARNING_PATHS_360) {
      const audit = CompletenessAuditor.auditPath(path);
      const publishedStatus = path.status === 'published' && audit.isReadyForPublish ? 'published' : 'draft';
      const moduleCount = path.levels.reduce((sum, level) => sum + level.modules.length, 0);
      await client.query(
        `INSERT INTO learning_paths (
          id, domain_id, title, tagline, description, target_role, level_badge, version,
          status, estimated_hours, prerequisites, competencies_targeted, completeness_score, path_data
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12::jsonb,$13,$14::jsonb)
        ON CONFLICT (id) DO UPDATE SET domain_id = EXCLUDED.domain_id, title = EXCLUDED.title,
          tagline = EXCLUDED.tagline, description = EXCLUDED.description, target_role = EXCLUDED.target_role,
          level_badge = EXCLUDED.level_badge, version = EXCLUDED.version, status = EXCLUDED.status,
          estimated_hours = EXCLUDED.estimated_hours, prerequisites = EXCLUDED.prerequisites,
          competencies_targeted = EXCLUDED.competencies_targeted, completeness_score = EXCLUDED.completeness_score,
          path_data = EXCLUDED.path_data, updated_at = NOW()`,
        [path.id, path.domainId, path.title, path.tagline, path.description, path.targetRole, path.levelBadge,
          path.version, publishedStatus, path.estimatedHours, JSON.stringify(path.prerequisites),
          JSON.stringify(path.competenciesTargeted), audit.overallScorePercent, JSON.stringify(path)]
      );
      console.log(`${publishedStatus.toUpperCase()} · ${path.title} · ${path.levels.length} niveaux · ${moduleCount} modules · ${audit.totalLessonsCount} leçons · audit ${audit.overallScorePercent}%`);
      if (path.status === 'published' && !audit.isReadyForPublish) {
        console.warn(`  Publication suspendue : ${audit.missingElements.join(' | ')}`);
      }
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase().catch((error) => {
  console.error('Échec migration/seed :', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
