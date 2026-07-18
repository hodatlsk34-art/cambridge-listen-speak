import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/admin/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
async function readError(response, fallback) {
	try {
		return (await response.json()).error || fallback;
	} catch {
		return fallback;
	}
}
function AdminPage() {
	const [users, setUsers] = (0, import_react.useState)([]);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
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
		setUsers((await response.json()).users || []);
	};
	(0, import_react.useEffect)(() => {
		load().catch(() => setMsg("Không thể tải trang quản trị. Vui lòng đăng nhập lại."));
	}, []);
	async function create(e) {
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
				parentConsent: f.get("parentConsent") === "on"
			})
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
	async function toggle(u) {
		const response = await fetch("/api/admin/users", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: u.id,
				active: !u.active
			})
		});
		if (!response.ok) {
			setMsg(await readError(response, "Không thể cập nhật tài khoản."));
			return;
		}
		load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "admin-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "kicker",
			children: "QUẢN TRỊ HỌC VIÊN"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Tài khoản được cấp" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/",
			children: "← Về trang học"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "admin-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "admin-form",
				onSubmit: create,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Tạo tài khoản mới" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Mã đăng nhập", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "loginCode",
						required: true,
						placeholder: "NK-A1-001"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Họ tên học viên", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "displayName",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Mật khẩu tạm", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "password",
						type: "password",
						minLength: 8,
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Cấp độ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						name: "level",
						children: [
							"Pre A1",
							"A1",
							"A2 Flyers",
							"A2 Key",
							"B1",
							"B2",
							"C1",
							"C2"
						].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "check",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							name: "isMinor",
							defaultChecked: true
						}), " Học viên dưới 18 tuổi"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "check",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							name: "parentConsent"
						}), " Đã có xác nhận phụ huynh"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "button primary",
						type: "submit",
						disabled: loading,
						children: loading ? "Đang tạo..." : "Tạo và cấp tài khoản"
					}),
					msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: msg })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "user-list",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					"Danh sách (",
					users.length,
					")"
				] }), users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: u.display_name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: u.login_code }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							u.level,
							" · ",
							u.is_minor ? u.parent_consent_at ? "Đã xác nhận phụ huynh" : "Chờ xác nhận phụ huynh" : "Người lớn"
						] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: u.active ? "status active" : "status",
						children: u.active ? "Đang hoạt động" : "Đã khóa"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => toggle(u),
						children: u.active ? "Khóa" : "Mở khóa"
					})
				] }, u.id))]
			})]
		})]
	});
}
//#endregion
export { AdminPage as default };
