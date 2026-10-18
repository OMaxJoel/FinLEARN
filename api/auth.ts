import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { getDatabase } from './_lib/database';
import { clearSessionCookie, createSessionToken, isSameOriginRequest, readSession, setSessionCookie } from './_lib/session';

const scrypt = promisify(scryptCallback);
const HASH_BYTES = 64;

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = (await scrypt(password, salt, HASH_BYTES)) as Buffer;
  return `scrypt$${salt.toString('base64url')}$${hash.toString('base64url')}`;
}

async function verifyPassword(password: string, encoded: string): Promise<boolean> {
  const [algorithm, saltText, hashText] = encoded.split('$');
  if (algorithm !== 'scrypt' || !saltText || !hashText) return false;
  try {
    const salt = Buffer.from(saltText, 'base64url');
    const expected = Buffer.from(hashText, 'base64url');
    const actual = (await scrypt(password, salt, expected.length)) as Buffer;
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

function parseBody(req: any): any {
  if (typeof req.body === 'string') return JSON.parse(req.body);
  return req.body || {};
}

function toProfile(row: any) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    careerGoal: row.career_goal,
    experienceLevel: row.experience_level,
    weeklyHours: Number(row.weekly_hours || 5),
    totalXp: Number(row.total_xp || 0),
    completedLessons: [],
    completedExercises: [],
    completedMissions: [],
  };
}

export default async function handler(req: any, res: any) {
  const action = new URL(req.url, `http://${req.headers?.host || 'localhost'}`).searchParams.get('action');
  const method = req.method || 'GET';
  if (method === 'GET' && action === 'me') {
    const session = readSession(req);
    if (!session) return res.status(401).json({ error: 'Session absente ou expirée.' });
    const db = getDatabase();
    if (!db) return res.status(503).json({ error: 'La base de données persistante n’est pas configurée.' });
    try {
      const result = await db.query('SELECT id, name, email, role, career_goal, experience_level, weekly_hours, total_xp FROM users WHERE id = $1', [session.id]);
      if (!result.rows[0]) {
        clearSessionCookie(res);
        return res.status(401).json({ error: 'Ce compte n’existe plus.' });
      }
      return res.status(200).json({ profile: toProfile(result.rows[0]) });
    } catch (error) {
      console.error('[auth] Impossible de lire le compte:', error);
      return res.status(503).json({ error: 'Le service de compte est momentanément indisponible.' });
    }
  }

  if (method === 'POST' && action === 'logout') {
    clearSessionCookie(res);
    return res.status(200).json({ success: true });
  }
  if (method !== 'POST' || !['login', 'register'].includes(action || '')) {
    return res.status(405).json({ error: 'Action ou méthode non prise en charge.' });
  }
  if (!isSameOriginRequest(req)) return res.status(403).json({ error: 'Origine de requête non autorisée.' });

  let body: any;
  try {
    body = parseBody(req);
  } catch {
    return res.status(400).json({ error: 'Corps de requête JSON invalide.' });
  }
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Saisissez une adresse e-mail valide.' });
  }
  if (password.length < 10 || password.length > 200) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir entre 10 et 200 caractères.' });
  }

  const db = getDatabase();
  if (!db) return res.status(503).json({ error: 'La base de données persistante n’est pas configurée.' });

  try {
    if (action === 'register') {
      const name = typeof body.name === 'string' ? body.name.trim().replace(/\s+/g, ' ') : '';
      if (name.length < 2 || name.length > 120) return res.status(400).json({ error: 'Le nom doit contenir entre 2 et 120 caractères.' });
      const passwordHash = await hashPassword(password);
      const id = `usr_${randomBytes(18).toString('base64url')}`;
      const result = await db.query(
        `INSERT INTO users (id, name, email, role, career_goal, experience_level, weekly_hours, password_hash)
         VALUES ($1, $2, $3, 'apprenant', 'analyste_financier', 'debutant', 5, $4)
         RETURNING id, name, email, role, career_goal, experience_level, weekly_hours, total_xp`,
        [id, name, email, passwordHash]
      );
      const profile = toProfile(result.rows[0]);
      setSessionCookie(res, createSessionToken({ id, role: 'apprenant' }));
      return res.status(201).json({ profile });
    }

    const result = await db.query(
      'SELECT id, name, email, role, career_goal, experience_level, weekly_hours, total_xp, password_hash FROM users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    if (!user || !(await verifyPassword(password, user.password_hash || ''))) {
      return res.status(401).json({ error: 'Adresse e-mail ou mot de passe incorrect.' });
    }
    setSessionCookie(res, createSessionToken({ id: user.id, role: user.role }));
    return res.status(200).json({ profile: toProfile(user) });
  } catch (error: any) {
    if (error?.code === '23505') return res.status(409).json({ error: 'Un compte existe déjà avec cette adresse e-mail.' });
    console.error('[auth] Erreur de compte:', error);
    return res.status(503).json({ error: 'Impossible de créer ou ouvrir le compte pour le moment.' });
  }
}
