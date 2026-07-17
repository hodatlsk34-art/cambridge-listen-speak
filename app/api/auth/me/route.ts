import { readSession } from "../../../lib/account-auth";
export async function GET(request: Request) { const user = await readSession(request); return user ? Response.json({ user }) : Response.json({ user: null }, { status: 401 }); }
