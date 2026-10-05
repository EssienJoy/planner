import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes"

export default [
	index("./routes/home.tsx"),

	layout("./routes/account-layout.tsx", [
		route("home", "./routes/dashboard.tsx"),
		route("plan", "./routes/plan.tsx"),
		route("plan/:planId", "./routes/task.tsx"),
		route("settings", "./routes/settings.tsx", [
			index("./routes/settings-index.tsx"),
			route("password", "./routes/password.tsx"),
			route("user-control", "./routes/user-control.tsx"),
		]),
		route("profile", "./routes/profile.tsx"),
		route("notifications", "./routes/notifications.tsx"),
		route("logout", "./routes/logout.ts"),
	]),
	route("login", "./routes/login.tsx"),
	route("signup", "./routes/signup.tsx"),
	route("ai-planner", "./routes/ai-planner.tsx"),
	route("*", "./routes/not-found-page.tsx"),
] satisfies RouteConfig
