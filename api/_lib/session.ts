import { createHmac, timingSafeEqual } from 'node:crypto';

export interface SessionUser {
  id: string;
  role: 'apprenant' | 'formateur' | 'admin';
}

const COOKIE_NAME = 'finexpert_session';
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function secret(): string {
  const value = process.env.JWT_SECRET;
  if (!value || value.length < 32) throw new Error('JWT_SECRET doit contenir au moins 32 caractères.');
  return value;
}

function signature(value: string): string {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

export function createSessionToken(user: SessionUser): string {
  const payload = Buffer.from(JSON.stringify({ ...user, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS })).toString('base64url');
  return `${payload}.${signature(payload)}`;
}

export function readSession(req: any): SessionUser | null {
  let token: string | undefined;
  const cookieHeader = String(req.headers?.cookie || '');
  for (const part of cookieHeader.split(';')) {
    const [key, ...valueParts] = part.trim().split('=');
    if (key === COOKIE_NAME) token = valueParts.join('=');
  }
  if (!token) return null;

  const [payload, suppliedSignature] = token.split('.');
  if (!payload || !suppliedSignature) return null;
  try {
    const expected = Buffer.from(signature(payload));
    const supplied = Buffer.from(suppliedSignature);
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null;
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (typeof parsed.id !== 'string' || !['apprenant', 'formateur', 'admin'].includes(parsed.role)) return null;
    if (typeof parsed.exp !== 'number' || parsed.exp <= Math.floor(Date.now() / 1000)) return null;
    return { id: parsed.id, role: parsed.role };
  } catch {
    return null;
  }
}

export function setSessionCookie(res: any, token: string): void {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_SECONDS}${secure}`);
}

export function clearSessionCookie(res: any): void {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`);
}

export function isSameOriginRequest(req: any): boolean {
  const origin = req.headers?.origin;
  const host = req.headers?.['x-forwarded-host'] || req.headers?.host;
  if (!origin || !host) return process.env.NODE_ENV !== 'production';
  try {
    return new URL(origin).host.toLowerCase() === String(host).toLowerCase();
  } catch {
    return false;
  }
}
