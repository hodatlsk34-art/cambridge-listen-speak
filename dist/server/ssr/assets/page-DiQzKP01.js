import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/dashboard/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const [user, setUser] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		fetch("/api/auth/me").then(async (r) => {
			if (!r.ok) {
				location.href = "/login";
				return;
			}
			setUser((await r.json()).user);
		});
	}, []);
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "account-shell",
		children: "Đang tải hồ sơ..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "dashboard-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "kicker",
					children: "HỒ SƠ HỌC TẬP"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Xin chào, ", user.displayName] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					user.loginCode,
					" · Cấp độ ",
					user.level
				] })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "button primary",
				href: "/#lessons",
				children: "Tiếp tục học →"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "profile-stats",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bài hoàn thành" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "0 phút" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Thời gian nghe" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "—" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Điểm phát âm" })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "empty-progress",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎧" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Bắt đầu bài học đầu tiên" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Kết quả nghe, nói và bản ghi của bạn sẽ xuất hiện tại đây." })
				]
			})
		]
	});
}
//#endregion
export { Dashboard as default };
