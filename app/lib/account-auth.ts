const enc = new TextEncoder();
const cfg = () => process.env as Record<string, string>;
async function getDb() { return (await import("cloudflare:workers")).env.DB; }
const b64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
const fromB64 = (value: string) => Uint8Array.from(atob(value.replaceAll("-", "+").replaceAll("_", "/")), c => c.charCodeAt(0));

export type SessionUser = { id: string; loginCode: string; displayName: string; role: "admin" | "student"; level: string; mustChangePassword: boolean };

export async function ensureSchema() {
  const db = await getDb();
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, login_code TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL, password_hash TEXT NOT NULL, password_salt TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'student', level TEXT NOT NULL DEFAULT 'Pre A1', active INTEGER NOT NULL DEFAULT 1, must_change_password INTEGER NOT NULL DEFAULT 1, is_minor INTEGER NOT NULL DEFAULT 1, parent_consent_at INTEGER, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS progress (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, lesson_id TEXT NOT NULL, listening_score INTEGER, pronunciation_score INTEGER, completed_at INTEGER, updated_at INTEGER NOT NULL, UNIQUE(user_id, lesson_id))"),
    db.prepare("CREATE TABLE IF NOT EXISTS recordings (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, lesson_id TEXT NOT NULL, object_key TEXT NOT NULL, content_type TEXT NOT NULL, size_bytes INTEGER NOT NULL, pronunciation_score INTEGER, created_at INTEGER NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS pilot_feedback (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, rating INTEGER NOT NULL, tester_role TEXT NOT NULL, message TEXT NOT NULL, created_at INTEGER NOT NULL)"),
  ]);
}

export async function hashPassword(password: string, salt = crypto.getRandomValues(new Uint8Array(16))) {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" }, key, 256);
  return { hash: b64(new Uint8Array(bits)), salt: b64(salt) };
}

export async function verifyPassword(password: string, salt: string, expected: string) {
  const result = await hashPassword(password, fromB64(salt));
  return result.hash === expected;
}

export async function createSession(user: SessionUser) {
  const payload = b64(enc.encode(JSON.stringify({ ...user, exp: Date.now() + 1000 * 60 * 60 * 12 })));
  const key = await crypto.subtle.importKey("raw", enc.encode(cfg().SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = b64(new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(payload))));
  return `${payload}.${signature}`;
}

export async function readSession(request: Request): Promise<SessionUser | null> {
  const token = request.headers.get("cookie")?.match(/(?:^|; )speakup_session=([^;]+)/)?.[1];
  if (!token) return null;
  const [payload, signature] = token.split("."); if (!payload || !signature) return null;
  const key = await crypto.subtle.importKey("raw", enc.encode(cfg().SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const valid = await crypto.subtle.verify("HMAC", key, fromB64(signature), enc.encode(payload)); if (!valid) return null;
  const data = JSON.parse(new TextDecoder().decode(fromB64(payload))) as SessionUser & { exp: number };
  return data.exp > Date.now() ? data : null;
}

export function sessionCookie(token: string) { return `speakup_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=43200`; }
export function clearSessionCookie() { return "speakup_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"; }
export function adminConfig() { return { code: cfg().ADMIN_LOGIN_CODE, password: cfg().ADMIN_INITIAL_PASSWORD }; }
