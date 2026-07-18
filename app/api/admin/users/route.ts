import { ensureSchema, hashPassword, readSession } from "../../../lib/account-auth";
const allowed = async (request: Request) => (await readSession(request))?.role === "admin";

export async function GET(request: Request) {
  if (!(await allowed(request))) return Response.json({ error: "Không có quyền." }, { status: 403 });
  await ensureSchema(); const { env } = await import("cloudflare:workers");
  const result = await env.DB.prepare("SELECT id, login_code, display_name, level, active, must_change_password, is_minor, parent_consent_at, created_at FROM users ORDER BY created_at DESC").all();
  return Response.json({ users: result.results });
}

export async function POST(request: Request) {
  if (!(await allowed(request))) return Response.json({ error: "Không có quyền." }, { status: 403 });
  await ensureSchema(); const { env } = await import("cloudflare:workers");
  const b = await request.json() as {loginCode?:string;displayName?:string;password?:string;level?:string;isMinor?:boolean;parentConsent?:boolean};
  if (!b.loginCode || !b.displayName || !b.password || b.password.length < 8) return Response.json({error:"Thông tin chưa đầy đủ hoặc mật khẩu dưới 8 ký tự."},{status:400});
  const p=await hashPassword(b.password); const now=Date.now();
  try {
    await env.DB.prepare("INSERT INTO users (id,login_code,display_name,password_hash,password_salt,role,level,active,must_change_password,is_minor,parent_consent_at,created_at,updated_at) VALUES (?,?,?,?,?,'student',?,1,1,?,?,?,?)").bind(crypto.randomUUID(),b.loginCode.trim(),b.displayName.trim(),p.hash,p.salt,b.level||"Pre A1",b.isMinor===false?0:1,b.parentConsent?now:null,now,now).run();
    return Response.json({ok:true});
  } catch { return Response.json({error:"Mã đăng nhập đã tồn tại."},{status:409}); }
}

export async function PATCH(request: Request) {
  if (!(await allowed(request))) return Response.json({ error: "Không có quyền." }, { status: 403 });
  await ensureSchema();
  const { env } = await import("cloudflare:workers");
  const b=await request.json() as {id?:string;active?:boolean;password?:string;parentConsent?:boolean};
  if(!b.id)return Response.json({error:"Thiếu tài khoản."},{status:400});
  if(b.password){const p=await hashPassword(b.password);await env.DB.prepare("UPDATE users SET password_hash=?,password_salt=?,must_change_password=1,updated_at=? WHERE id=?").bind(p.hash,p.salt,Date.now(),b.id).run();}
  else if(typeof b.active==="boolean")await env.DB.prepare("UPDATE users SET active=?,updated_at=? WHERE id=?").bind(b.active?1:0,Date.now(),b.id).run();
  else if(typeof b.parentConsent==="boolean")await env.DB.prepare("UPDATE users SET parent_consent_at=?,updated_at=? WHERE id=?").bind(b.parentConsent?Date.now():null,Date.now(),b.id).run();
  return Response.json({ok:true});
}
