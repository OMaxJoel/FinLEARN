import { ALL_LEARNING_PATHS_360, PILOT_FINANCIAL_ANALYST_PATH } from '../src/data/curriculum360Data';
import { CompletenessAuditor } from '../src/core/authoring/completenessAuditor';
import { getDatabase } from './_lib/database';
import { isSameOriginRequest, readSession } from './_lib/session';

function nextPatchVersion(current: string): string | null {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(current);
  if (!match) return null;
  return `${match[1]}.${match[2]}.${Number(match[3]) + 1}`;
}

export default async function handler(req: any, res: any) {
  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const action = url.searchParams.get('action') || req.body?.action;
  const pathId = url.searchParams.get('pathId') || req.body?.pathId || PILOT_FINANCIAL_ANALYST_PATH.id;
  const canonicalPath = ALL_LEARNING_PATHS_360.find((candidate) => candidate.id === pathId);
  if (!canonicalPath) return res.status(404).json({ error: `Parcours non trouvé : ${pathId}` });

  if (req.method === 'GET' && action === 'audit') {
    return res.status(200).json({ report: CompletenessAuditor.auditPath(canonicalPath) });
  }

  if (req.method === 'GET' && action === 'draft') {
    const session = readSession(req);
    if (!session) return res.status(401).json({ error: 'Authentification requise.' });
    if (session.role !== 'admin') return res.status(403).json({ error: 'Le rôle administrateur est requis pour accéder aux brouillons.' });
    const db = getDatabase();
    if (!db) return res.status(503).json({ error: 'La base de données persistante n’est pas configurée.' });
    try {
      const result = await db.query('SELECT path_data, updated_at FROM learning_path_drafts WHERE path_id = $1', [pathId]);
      return res.status(200).json({ draft: result.rows[0]?.path_data || null, updatedAt: result.rows[0]?.updated_at || null });
    } catch (error) {
      console.error('[author] Lecture du brouillon impossible:', error);
      return res.status(503).json({ error: 'Le brouillon n’a pas pu être chargé.' });
    }
  }

  if (req.method !== 'POST' || !['save-draft', 'publish'].includes(action)) {
    return res.status(405).json({ error: 'Action ou méthode non prise en charge.' });
  }
  const session = readSession(req);
  if (!session) return res.status(401).json({ error: 'Authentification requise.' });
  if (session.role !== 'admin') return res.status(403).json({ error: 'Le rôle administrateur est requis pour publier un parcours.' });
  if (!isSameOriginRequest(req)) return res.status(403).json({ error: 'Origine de requête non autorisée.' });

  const path = req.body?.path;
  if (!path || typeof path !== 'object' || path.id !== pathId || !Array.isArray(path.levels)) {
    return res.status(400).json({ error: 'Le brouillon du parcours est invalide.' });
  }

  const db = getDatabase();
  if (!db) return res.status(503).json({ error: 'La base de données persistante n’est pas configurée.' });

  if (action === 'save-draft') {
    try {
      await db.query(
        `INSERT INTO learning_path_drafts (path_id, path_data, updated_by, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (path_id) DO UPDATE SET path_data = EXCLUDED.path_data,
           updated_by = EXCLUDED.updated_by, updated_at = NOW()`,
        [path.id, JSON.stringify(path), session.id]
      );
      return res.status(200).json({ success: true, pathId: path.id, savedAt: new Date().toISOString() });
    } catch (error) {
      console.error('[author] Sauvegarde du brouillon impossible:', error);
      return res.status(503).json({ error: 'Le brouillon n’a pas été enregistré. Vérifiez les migrations puis réessayez.' });
    }
  }

  const report = CompletenessAuditor.auditPath(path);
  if (!report.isReadyForPublish) {
    return res.status(422).json({ error: 'Le parcours ne satisfait pas les critères de publication.', report });
  }
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT id FROM learning_paths WHERE id = $1 FOR UPDATE', [path.id]);
    const previous = await client.query(
      'SELECT version FROM learning_path_versions WHERE path_id = $1 ORDER BY created_at DESC LIMIT 1',
      [path.id]
    );
    const publishedVersion = previous.rows[0] ? nextPatchVersion(previous.rows[0].version) : path.version;
    if (!publishedVersion) {
      await client.query('ROLLBACK');
      return res.status(422).json({ error: 'Version invalide : utilisez le format majeur.mineur.correctif.' });
    }
    const publishedPath = { ...path, version: publishedVersion, status: 'published' };
    await client.query(
      `INSERT INTO learning_paths (
        id, domain_id, title, tagline, description, target_role, level_badge,
        version, status, estimated_hours, prerequisites, competencies_targeted,
        completeness_score, path_data
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'published',$9,$10,$11,$12,$13)
      ON CONFLICT (id) DO UPDATE SET
        domain_id = EXCLUDED.domain_id, title = EXCLUDED.title, tagline = EXCLUDED.tagline,
        description = EXCLUDED.description, target_role = EXCLUDED.target_role,
        level_badge = EXCLUDED.level_badge, version = EXCLUDED.version,
        status = EXCLUDED.status, estimated_hours = EXCLUDED.estimated_hours,
        prerequisites = EXCLUDED.prerequisites, competencies_targeted = EXCLUDED.competencies_targeted,
        completeness_score = EXCLUDED.completeness_score, path_data = EXCLUDED.path_data,
        updated_at = NOW()`,
      [publishedPath.id, publishedPath.domainId, publishedPath.title, publishedPath.tagline, publishedPath.description, publishedPath.targetRole, publishedPath.levelBadge,
        publishedPath.version, publishedPath.estimatedHours, JSON.stringify(publishedPath.prerequisites), JSON.stringify(publishedPath.competenciesTargeted),
        report.overallScorePercent, JSON.stringify(publishedPath)]
    );
    await client.query(
      `INSERT INTO learning_path_versions (path_id, version, status, path_data, created_by)
       VALUES ($1, $2, 'published', $3, $4)
       ON CONFLICT (path_id, version) DO NOTHING`,
      [publishedPath.id, publishedPath.version, JSON.stringify(publishedPath), session.id]
    );
    await client.query(
      `INSERT INTO content_audit_logs (path_id, author_id, action, version, details, snapshot_meta)
       VALUES ($1, $2, 'publish_version', $3, $4, $5)`,
      [publishedPath.id, session.id, publishedPath.version, 'Publication du référentiel de parcours vérifié côté serveur.', JSON.stringify({ completenessScore: report.overallScorePercent })]
    );
    await client.query('DELETE FROM learning_path_drafts WHERE path_id = $1', [publishedPath.id]);
    await client.query('COMMIT');
    return res.status(200).json({ success: true, pathId: publishedPath.id, version: publishedPath.version, score: report.overallScorePercent });
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    console.error('[author] Publication impossible:', error);
    return res.status(503).json({ error: 'La publication n’a pas été enregistrée. Vérifiez les migrations puis réessayez.' });
  } finally {
    client.release();
  }
}
