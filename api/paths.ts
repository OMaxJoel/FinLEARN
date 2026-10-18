// Vercel Serverless Function: /api/paths
import { PILOT_FINANCIAL_ANALYST_PATH } from '../src/data/curriculum360Data';

export default async function handler(req: any, res: any) {
  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const pathId = url.searchParams.get('id');
  const domain = url.searchParams.get('domain');

  if (req.method === 'GET') {
    if (pathId) {
      if (pathId === PILOT_FINANCIAL_ANALYST_PATH.id) {
        return res.status(200).json({ path: PILOT_FINANCIAL_ANALYST_PATH });
      }
      return res.status(404).json({ error: `Parcours introuvable pour l'identifiant ${pathId}` });
    }

    let paths = [PILOT_FINANCIAL_ANALYST_PATH];
    if (domain) {
      paths = paths.filter((p) => p.domainId === domain);
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
        version: p.version,
        status: p.status,
        estimatedHours: p.estimatedHours,
        levelsCount: p.levels.length,
        modulesCount: p.levels.reduce((acc, l) => acc + l.modules.length, 0),
        competenciesTargeted: p.competenciesTargeted,
        completenessScore: p.completenessScore,
      })),
    });
  }

  return res.status(405).json({ error: `Méthode ${req.method} non supportée.` });
}
