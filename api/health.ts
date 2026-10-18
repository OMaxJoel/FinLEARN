// Vercel Serverless Function: /api/health
import { getDatabase } from './_lib/database';

export default async function handler(req: any, res: any) {
  const db = getDatabase();
  let databaseStatus: 'connected' | 'not_configured' | 'unavailable' | 'schema_missing' = db ? 'unavailable' : 'not_configured';
  let missingTables: string[] = [];
  if (db) {
    try {
      const result = await db.query(`
        SELECT required.name FROM unnest(ARRAY[
          'users', 'learning_paths', 'user_path_enrollments', 'activity_progress',
          'evaluation_submissions', 'content_audit_logs', 'learning_path_versions',
          'learning_path_drafts'
        ]) AS required(name)
        WHERE to_regclass('public.' || required.name) IS NULL
      `);
      missingTables = result.rows.map((row: { name: string }) => row.name);
      databaseStatus = missingTables.length ? 'schema_missing' : 'connected';
    } catch (error) {
      console.error('[health] Database probe failed:', error);
    }
  }
  const isHealthy = databaseStatus === 'connected';
  const healthData = {
    status: isHealthy ? 'ok' : 'degraded',
    service: 'FinExpert 360 Learning Platform API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    database: {
      configured: Boolean(process.env.DATABASE_URL),
      type: 'PostgreSQL',
      status: databaseStatus,
      ...(missingTables.length ? { missingTables } : {}),
    },
    features: {
      progression360: true,
      authorStudio: true,
      deterministicCalculators: true,
      offlineSync: true,
    },
  };

  if (res && typeof res.status === 'function') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    const statusCode = isHealthy || process.env.NODE_ENV !== 'production' ? 200 : 503;
    return res.status(statusCode).json(healthData);
  }

  return new Response(JSON.stringify(healthData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
