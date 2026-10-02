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
	ClipboardList,
	LayoutDashboard,
	LogOut,
	Menu,
	Moon,
	Settings,
	Sun,
	UserRound,
	X,
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
	const [sidebarOpen, setSidebarOpen] = useState(false)
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
				<button
					type="button"
					aria-label="Open menu"
					onClick={() => setSidebarOpen(true)}
					className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-hover lg:hidden">
					<Menu className="size-5" />
				</button>

				<Link
					to="/plan"
					className="text-xl font-extrabold tracking-tight text-primary">
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
				{sidebarOpen && (
					<div
						aria-hidden="true"
						onClick={() => setSidebarOpen(false)}
						className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					/>
				)}

				{/* sidebar */}
				<aside
					className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-border bg-surface p-4 transition-transform duration-300 lg:sticky lg:top-16 lg:h-[calc(100dvh-4rem)] lg:translate-x-0 ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full"
					}`}>
					<div className="flex items-center justify-between lg:hidden">
						<span className="text-lg font-extrabold text-primary">
							Plannerly
						</span>
						<button
							type="button"
							aria-label="Close menu"
							onClick={() => setSidebarOpen(false)}
							className="flex size-9 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground">
							<X className="size-5" />
						</button>
					</div>

					<nav className="mt-2 lg:mt-0">
						<p className="px-3 text-[11px] font-bold uppercase tracking-widest text-foreground-muted">
							Menu
						</p>
						<ul className="mt-2 space-y-1">
							{links.map((item) => (
								<li key={item.label}>
									<Link
										to={item.to}
										onClick={() => setSidebarOpen(false)}
										className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
											pathname === item.to
												? "bg-primary-subtle font-bold text-primary"
												: "font-semibold text-foreground-muted hover:bg-surface-hover hover:text-foreground"
										}`}>
										<item.icon className="size-4" />
										{item.label}
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
							className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-error transition-colors hover:bg-error-muted disabled:opacity-50">
							<LogOut className="size-4" />
							{loggingOut ? "Logging out..." : "Logout"}
						</button>
					</Form>
				</aside>

				{/* content */}
				<main className="flex min-h-[calc(100dvh-4rem)] min-w-0 flex-1 flex-col p-4 sm:p-6">
					<Outlet />

					<footer className="mt-auto pt-6 text-xs text-foreground-muted">
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
		</>
	)
}

export default AccountLayout
