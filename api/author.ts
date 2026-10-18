// Vercel Serverless Function: /api/author
import { PILOT_FINANCIAL_ANALYST_PATH } from '../src/data/curriculum360Data';
import { CompletenessAuditor } from '../src/core/authoring/completenessAuditor';

export default async function handler(req: any, res: any) {
  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const action = url.searchParams.get('action') || (req.body && req.body.action);

  if (req.method === 'POST' || req.method === 'GET') {
    if (action === 'audit') {
      const pathId = url.searchParams.get('pathId') || req.body?.pathId || PILOT_FINANCIAL_ANALYST_PATH.id;
      const targetPath = pathId === PILOT_FINANCIAL_ANALYST_PATH.id ? PILOT_FINANCIAL_ANALYST_PATH : req.body?.path;

      if (!targetPath) {
        return res.status(404).json({ error: `Parcours non trouvé pour l'audit : ${pathId}` });
      }

      const report = CompletenessAuditor.auditPath(targetPath);
      return res.status(200).json({ report });
    }

    if (action === 'publish') {
      const pathId = req.body?.pathId;
      if (!pathId) {
        return res.status(400).json({ error: 'pathId requis pour la publication.' });
      }

      const report = CompletenessAuditor.auditPath(PILOT_FINANCIAL_ANALYST_PATH);
      if (!report.isReadyForPublish) {
        return res.status(422).json({
          error: 'Le parcours ne satisfait pas tous les critères de complétude pour être publié.',
          report,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Parcours ${pathId} certifié et publié avec succès en version ${PILOT_FINANCIAL_ANALYST_PATH.version}`,
        publishedAt: new Date().toISOString(),
        score: report.overallScorePercent,
      });
    }

    return res.status(400).json({ error: `Action '${action}' inconnue.` });
  }

  return res.status(405).json({ error: `Méthode ${req.method} non autorisée.` });
}
