import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/login/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		setError("");
		const f = new FormData(e.currentTarget);
		const r = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				loginCode: f.get("loginCode"),
				password: f.get("password")
			})
		});
		const d = await r.json();
		setLoading(false);
		if (!r.ok) {
			setError(d.error || "Không thể đăng nhập.");
			return;
		}
		location.href = d.role === "admin" ? "/admin" : "/dashboard";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "account-shell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "account-card",
			onSubmit: submit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "account-brand",
					children: "▥ SpeakUp Cambridge"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "kicker",
					children: "TÀI KHOẢN HỌC TẬP"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Đăng nhập" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sử dụng mã và mật khẩu do quản trị viên cấp." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Mã đăng nhập", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "loginCode",
					autoComplete: "username",
					required: true,
					placeholder: "Ví dụ: NK-A1-001"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Mật khẩu", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "password",
					type: "password",
					autoComplete: "current-password",
					required: true
				})] }),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "form-error",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button primary",
					disabled: loading,
					children: loading ? "Đang kiểm tra..." : "Đăng nhập →"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Không chia sẻ mã và mật khẩu của bạn cho người khác." })
			]
		})
	});
}
//#endregion
export { LoginPage as default };
