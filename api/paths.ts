// Vercel Serverless Function: /api/paths
import { ALL_LEARNING_PATHS_360 } from '../src/data/curriculum360Data';
import { getDatabase } from './_lib/database';

export default async function handler(req: any, res: any) {
  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const pathId = url.searchParams.get('id');
  const domain = url.searchParams.get('domain');
  const query = url.searchParams.get('q')?.toLowerCase();

  if (req.method === 'GET') {
    const db = getDatabase();
    if (pathId) {
      if (db) {
        try {
          const result = await db.query("SELECT path_data FROM learning_paths WHERE id = $1 AND status = 'published'", [pathId]);
          if (result.rows[0]) return res.status(200).json({ path: result.rows[0].path_data });
        } catch (error) {
          console.error('[paths] Lecture du parcours publié impossible:', error);
        }
      }
      const foundPath = ALL_LEARNING_PATHS_360.find((path) => path.id === pathId);
      if (foundPath) return res.status(200).json({ path: foundPath });
      return res.status(404).json({ error: `Parcours introuvable pour l'identifiant ${pathId}` });
    }

    let paths: any[] = [...ALL_LEARNING_PATHS_360];
    if (db) {
      try {
        const result = await db.query(`
          SELECT id, domain_id AS "domainId", title, tagline, description,
            target_role AS "targetRole", level_badge AS "levelBadge", version, status,
            estimated_hours AS "estimatedHours", competencies_targeted AS "competenciesTargeted",
            path_data->>'color' AS color, path_data->>'iconName' AS "iconName",
            completeness_score AS "completenessScore",
            jsonb_array_length(COALESCE(path_data->'levels', '[]'::jsonb)) AS "levelsCount",
            COALESCE((SELECT SUM(jsonb_array_length(COALESCE(level_data->'modules', '[]'::jsonb)))
              FROM jsonb_array_elements(COALESCE(path_data->'levels', '[]'::jsonb)) AS levels(level_data)), 0) AS "modulesCount"
          FROM learning_paths WHERE status = 'published'
        `);
        const publishedById = new Map(result.rows.map((row: any) => [row.id, row]));
        paths = paths.map((path) => publishedById.get(path.id) || path);
        for (const [id, path] of publishedById) {
          if (!paths.some((candidate) => candidate.id === id)) paths.push(path);
        }
      } catch (error) {
        // Catalog remains available from the bundled, reviewed curriculum when the DB is unavailable.
        console.error('[paths] Lecture des versions publiées impossible:', error);
      }
    }
    if (domain) {
      paths = paths.filter((p) => p.domainId === domain);
    }
    if (query) {
      paths = paths.filter(
        (p) =>
          String(p.title || '').toLowerCase().includes(query) ||
          String(p.tagline || '').toLowerCase().includes(query) ||
          String(p.targetRole || '').toLowerCase().includes(query) ||
          String(p.description || '').toLowerCase().includes(query)
      );
    }

    return res.status(200).json({
      total: paths.length,
      paths: paths.map((p) => ({
        id: p.id,
        domainId: p.domainId,
        title: p.title,
        tagline: p.tagline,
        targetRole: p.targetRole,
        levelBadge: p.levelBadge,
        color: p.color,
        iconName: p.iconName,
        version: p.version,
        status: p.status,
        estimatedHours: p.estimatedHours,
        levelsCount: p.levelsCount ?? p.levels.length,
        modulesCount: p.modulesCount ?? p.levels.reduce((acc: number, level: any) => acc + level.modules.length, 0),
        competenciesTargeted: p.competenciesTargeted,
        completenessScore: p.completenessScore ?? 100,
      })),
    });
  }

  return res.status(405).json({ error: `Méthode ${req.method} non supportée.` });
}

