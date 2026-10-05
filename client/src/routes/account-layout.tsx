import type { Route } from "./+types/account-layout"
import { useState } from "react"
import {
	Form,
	Link,
	Outlet,
	redirect,
	useLocation,
	useNavigation,
} from "react-router"
import {
	Bell,
	ChevronsLeft,
	ChevronsRight,
	ClipboardList,
	LayoutDashboard,
	LogOut,
	Moon,
	Settings,
	Sun,
	UserRound,
} from "lucide-react"
import { useThemeMode } from "../context/ThemeModeContext"
import { getCurrentUser } from "../api/user"

const links = [
	{ to: "/home", label: "Dashboard", icon: LayoutDashboard },
	{ to: "/plan", label: "Plans", icon: ClipboardList },
	{ to: "/settings", label: "Settings", icon: Settings },
	{ to: "/profile", label: "Profile", icon: UserRound },
	{ to: "/notifications", label: "Notifications", icon: Bell },
]

const mobileLinks = [
	{ to: "/home", label: "Dashboard", icon: LayoutDashboard },
	{ to: "/plan", label: "Plans", icon: ClipboardList },
	{ to: "/profile", label: "Profile", icon: UserRound },
	{ to: "/settings", label: "Settings", icon: Settings },
	{ to: "/notifications", label: "Notifications", icon: Bell },
]
export async function loader({ request }: Route.LoaderArgs) {
	const response = await getCurrentUser(request.headers.get("Cookie"))
	const user = response.data?.data

	if (response.status !== "success" || !user) {
		throw redirect("/login")
	}

	return { user, isAuthenticated: true }
}

function AccountLayout({ loaderData }: Route.ComponentProps) {
	const { pathname } = useLocation()
	const { dark, toggle } = useThemeMode()
	const [collapsed, setCollapsed] = useState(true)
	const userName = loaderData.user.fullName || "Plannerly user"
	const userInitial = userName.trim().charAt(0).toUpperCase() || "U"
	const navigation = useNavigation()
	const loggingOut =
		navigation.state === "submitting" &&
		navigation.formData?.get("intent") === "logout"

	return (
		<>
			{/* header */}
			<header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur-md sm:px-6">
				<Link
					to="/plan"
					className="text-xl font-extrabold 
					dark:text-secondary tracking-tight text-primary">
					Plannerly
				</Link>

				<div className="ml-auto flex items-center gap-2">
					<button
						type="button"
						aria-label="Toggle light and dark mode"
						onClick={toggle}
						className="flex size-9 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground">
						{dark ? (
							<Sun className="size-4" />
						) : (
							<Moon className="size-4" />
						)}
					</button>
					<span
						aria-label={userName}
						title={userName}
						className="flex size-9 items-center justify-center rounded-full bg-primary-subtle text-xs font-bold text-primary">
						{userInitial}
					</span>
				</div>
			</header>

			<div className="flex">
				{/* sidebar */}
				<aside
					className={`hidden w-64 shrink-0 flex-col border-r border-border bg-surface p-4 transition-all duration-300 md:sticky md:top-16 md:flex md:h-[calc(100dvh-4rem)] lg:w-64 ${
						collapsed ? "md:w-[4.5rem]" : ""
					}`}>
					<div
						className={`mb-2 flex lg:hidden ${
							collapsed ? "justify-center" : "justify-end"
						}`}>
						<button
							type="button"
							aria-label={
								collapsed
									? "Expand sidebar"
									: "Collapse sidebar"
							}
							onClick={() => setCollapsed((value) => !value)}
							className="flex size-9 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground">
							{collapsed ? (
								<ChevronsRight className="size-5" />
							) : (
								<ChevronsLeft className="size-5" />
							)}
						</button>
					</div>

					<nav className="mt-2 lg:mt-0">
						<p
							className={`px-3 text-[11px] font-bold uppercase tracking-widest text-foreground-muted ${
								collapsed ? "hidden" : "block"
							} lg:block`}>
							Menu
						</p>
						<ul className="mt-2 space-y-1">
							{links.map((item) => (
								<li key={item.label}>
									<Link
										to={item.to}
										title={item.label}
										className={`flex items-center gap-3 rounded-xl py-2.5 text-sm transition-colors ${
											collapsed
												? "justify-center px-0"
												: "px-3"
										} lg:justify-start lg:px-3 ${
											pathname === item.to
												? "bg-primary-subtle font-bold text-primary"
												: "font-semibold text-foreground-muted hover:bg-surface-hover hover:text-foreground"
										}`}>
										<item.icon className="size-4 shrink-0" />
										<span
											className={`${collapsed ? "hidden" : "inline"} lg:inline`}>
											{item.label}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<Form
						method="post"
						action="/logout"
						className="mt-auto pt-4">
						<input type="hidden" name="intent" value="logout" />
						<button
							type="submit"
							disabled={loggingOut}
							className={`flex w-full items-center gap-3 rounded-xl py-2.5 text-sm font-bold text-error transition-colors disabled:opacity-50 ${
								collapsed ? "justify-center px-0" : "px-3"
							} lg:justify-start lg:px-3 hover:bg-error-muted`}>
							<LogOut className="size-4 shrink-0" />
							<span
								className={`${collapsed ? "hidden" : "inline"} lg:inline`}>
								{loggingOut ? "Logging out..." : "Logout"}
							</span>
						</button>
					</Form>
				</aside>

				{/* content */}
				<main className="flex min-h-[calc(100dvh-4rem)] min-w-0 flex-1 flex-col p-4 pb-24 sm:p-6 sm:pb-24 md:pb-6">
					<Outlet />

					<footer className="mt-auto hidden pt-6 text-xs text-foreground-muted lg:block">
						<div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-4 sm:flex-row">
							<p>
								© {new Date().getFullYear()} Plannerly. All
								rights reserved.
							</p>
							<p className="flex items-center gap-1.5">
								<span className="size-1.5 rounded-full bg-success" />
								All systems go
							</p>
						</div>
					</footer>
				</main>
			</div>

			{/* mobile tab bar */}
			<nav
				aria-label="Primary"
				className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
				<ul className="grid grid-cols-5">
					{mobileLinks.map((item) => (
						<li key={item.label}>
							<Link
								to={item.to}
								className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors ${
									pathname === item.to
										? "text-primary"
										: "text-foreground-muted"
								}`}>
								<item.icon className="size-5" />
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	)
}

export default AccountLayout
