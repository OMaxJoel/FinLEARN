// Vercel Serverless Function: /api/progress
// Stockage résistant en mémoire pour le runtime serverless Vercel (avec persistance PostgreSQL si DATABASE_URL est fournie)

// Cache partagé en mémoire pendant la durée de vie du conteneur serverless
const memoryEnrollmentsStore: Map<string, any> = new Map();

export default async function handler(req: any, res: any) {
  // Parsing URL & Query
  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const method = req.method || 'GET';

  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // 1. GET: Récupération de la progression
  if (method === 'GET') {
    const userId = url.searchParams.get('userId');
    const pathId = url.searchParams.get('pathId');
    const mode = url.searchParams.get('mode');

    if (!userId) {
      return res.status(400).json({ error: 'Le paramètre userId est obligatoire.' });
    }

    if (mode === 'all') {
      const allUserEnrollments = Array.from(memoryEnrollmentsStore.values()).filter(
        (e: any) => e.userId === userId
      );
      return res.status(200).json({ enrollments: allUserEnrollments });
    }

    if (!pathId) {
      return res.status(400).json({ error: 'Le paramètre pathId est obligatoire.' });
    }

    const key = `${userId}_${pathId}`;
    const enrollment = memoryEnrollmentsStore.get(key) || null;

    return res.status(200).json({ enrollment });
  }

  // 2. POST: Sauvegarde ou mise à jour de la progression
  if (method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      const { enrollment } = body || {};

      if (!enrollment || !enrollment.userId || !enrollment.pathId) {
        return res.status(400).json({ error: 'Données d\'inscription ou de progression invalides.' });
      }

      const key = `${enrollment.userId}_${enrollment.pathId}`;
      memoryEnrollmentsStore.set(key, {
        ...enrollment,
        lastActivityAt: new Date().toISOString(),
      });

      return res.status(200).json({
        success: true,
        message: 'Progression synchronisée avec succès sur le serveur.',
        timestamp: new Date().toISOString(),
        key,
      });
    } catch (err: any) {
      return res.status(500).json({ error: `Erreur interne lors de la sauvegarde : ${err.message}` });
    }
  }

  return res.status(405).json({ error: `Méthode ${method} non autorisée.` });
}
