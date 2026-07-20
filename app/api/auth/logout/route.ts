import { clearSessionCookie } from "../../../lib/account-auth";
export async function POST() { return Response.json({ ok: true }, { headers: { "Set-Cookie": clearSessionCookie() } }); }
