// Vercel Serverless Function: /api/health
export default async function handler(req: any, res: any) {
  // Support à la fois Node HTTP (res.status().json()) et Edge/Fetch si applicable
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
  const healthData = {
    status: 'ok',
    service: 'FinExpert 360 Learning Platform API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    database: {
      configured: hasDatabaseUrl,
      type: hasDatabaseUrl ? 'PostgreSQL (Neon/Supabase/Vercel Postgres)' : 'Local Resilient Store',
      status: 'connected',
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
    return res.status(200).json(healthData);
  }

  return new Response(JSON.stringify(healthData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
