"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
import { FormEvent, useEffect, useState } from "react";

type User = {
  id: string;
  login_code: string;
  display_name: string;
  level: string;
  active: number;
  must_change_password: number;
  is_minor: number;
  parent_consent_at: number | null;
};

type ApiError = { error?: string };

async function readError(response: Response, fallback: string) {
  try {
    const data = await response.json() as ApiError;
    return data.error || fallback;
  } catch {
    return fallback;
  }
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const response = await fetch("/api/admin/users");
    if (response.status === 403) {
      location.href = "/login";
      return;
    }
    if (!response.ok) {
      setMsg(await readError(response, "Không thể tải danh sách học viên. Kiểm tra D1 binding và deploy lại."));
      return;
    }
    const data = await response.json() as { users: User[] };
    setUsers(data.users || []);
  };

  useEffect(() => {
    load().catch(() => setMsg("Không thể tải trang quản trị. Vui lòng đăng nhập lại."));
  }, []);

  async function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const form = e.currentTarget;
    const f = new FormData(form);
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loginCode: f.get("loginCode"),
        displayName: f.get("displayName"),
        password: f.get("password"),
        level: f.get("level"),
        isMinor: f.get("isMinor") === "on",
        parentConsent: f.get("parentConsent") === "on",
      }),
    });

    setLoading(false);

    if (response.status === 403) {
      setMsg("Phiên admin đã hết hạn. Vui lòng đăng nhập lại.");
      location.href = "/login";
      return;
    }

    if (!response.ok) {
      setMsg(await readError(response, "Không thể tạo tài khoản. Kiểm tra D1 binding và thử lại."));
      return;
    }

    setMsg("Đã tạo tài khoản học viên.");
    form.reset();
    load();
  }

  async function toggle(u: User) {
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: u.id, active: !u.active }),
    });
    if (!response.ok) {
      setMsg(await readError(response, "Không thể cập nhật tài khoản."));
      return;
    }
    load();
  }

  return (
    <main className="admin-shell">
      <header>
        <div>
          <span className="kicker">QUẢN TRỊ HỌC VIÊN</span>
          <h1>Tài khoản được cấp</h1>
        </div>
        <a href="/">← Về trang học</a>
      </header>
      <section className="admin-grid">
        <form className="admin-form" onSubmit={create}>
          <h2>Tạo tài khoản mới</h2>
          <label>Mã đăng nhập<input name="loginCode" required placeholder="NK-A1-001" /></label>
          <label>Họ tên học viên<input name="displayName" required /></label>
          <label>Mật khẩu tạm<input name="password" type="password" minLength={8} required /></label>
          <label>Cấp độ<select name="level">{["Pre A1", "A1", "A2 Flyers", "A2 Key", "B1", "B2", "C1", "C2"].map(x => <option key={x}>{x}</option>)}</select></label>
          <label className="check"><input type="checkbox" name="isMinor" defaultChecked /> Học viên dưới 18 tuổi</label>
          <label className="check"><input type="checkbox" name="parentConsent" /> Đã có xác nhận phụ huynh</label>
          <button className="button primary" type="submit" disabled={loading}>{loading ? "Đang tạo..." : "Tạo và cấp tài khoản"}</button>
          {msg && <p>{msg}</p>}
        </form>
        <div className="user-list">
          <h2>Danh sách ({users.length})</h2>
          {users.map(u => <article key={u.id}>
            <div>
              <b>{u.display_name}</b>
              <code>{u.login_code}</code>
              <small>{u.level} · {u.is_minor ? u.parent_consent_at ? "Đã xác nhận phụ huynh" : "Chờ xác nhận phụ huynh" : "Người lớn"}</small>
            </div>
            <span className={u.active ? "status active" : "status"}>{u.active ? "Đang hoạt động" : "Đã khóa"}</span>
            <button onClick={() => toggle(u)}>{u.active ? "Khóa" : "Mở khóa"}</button>
          </article>)}
        </div>
      </section>
    </main>
  );
}
