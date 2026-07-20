import { adminConfig, createSession, ensureSchema, sessionCookie, verifyPassword } from "../../../lib/account-auth";

export async function POST(request: Request) {
  const body = await request.json() as { loginCode?: string; password?: string };
  const code = body.loginCode?.trim(); const password = body.password ?? "";
  if (!code || !password) return Response.json({ error: "Vui lòng nhập đầy đủ mã đăng nhập và mật khẩu." }, { status: 400 });
  const admin = adminConfig();
  if (code.toLowerCase() === admin.code?.toLowerCase() && password === admin.password) {
    const token = await createSession({ id: "admin", loginCode: admin.code, displayName: "Quản trị viên", role: "admin", level: "Admin", mustChangePassword: false });
    return Response.json({ ok: true, role: "admin" }, { headers: { "Set-Cookie": sessionCookie(token) } });
  }
  await ensureSchema();
  const { env } = await import("cloudflare:workers");
  const user = await env.DB.prepare("SELECT id, login_code, display_name, password_hash, password_salt, role, level, active, must_change_password FROM users WHERE lower(login_code)=lower(?)").bind(code).first<Record<string, string | number>>();
  if (!user || !user.active || !(await verifyPassword(password, String(user.password_salt), String(user.password_hash)))) return Response.json({ error: "Mã đăng nhập hoặc mật khẩu không đúng." }, { status: 401 });
  const token = await createSession({ id: String(user.id), loginCode: String(user.login_code), displayName: String(user.display_name), role: user.role === "admin" ? "admin" : "student", level: String(user.level), mustChangePassword: Boolean(user.must_change_password) });
  return Response.json({ ok: true, role: user.role }, { headers: { "Set-Cookie": sessionCookie(token) } });
}
