import { Outlet } from "react-router"
import { useState } from "react"
import MobileSideBar from "./MobileSideBar"
import SideBar from "./SideBar"
import { HarmburgerMenu } from "@/components"

function SettingsLayout({ user }) {
	const [toggleMenu, setIsToggleMenu] = useState(false)

	return (
		<section className="mt-5 pb-16">
			<div className="max-w-2xl">
				<p className="w-fit rounded-full bg-primary-subtle px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
					Account
				</p>
				<h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
					Settings
				</h1>
				<p className="mt-2 text-sm text-foreground-muted sm:text-base">
					Manage your profile, password, and preferences.
				</p>
			</div>

			<div className="mt-8 grid gap-6 rounded-3xl border border-border bg-surface p-4 text-foreground shadow-sm sm:p-6 lg:grid-cols-[240px_minmax(0,1fr)] relative">
				<HarmburgerMenu
					toggleMenu={toggleMenu}
					setIsToggleMenu={setIsToggleMenu}
				/>
				{toggleMenu && (
					<MobileSideBar setIsToggleMenu={setIsToggleMenu} />
				)}
				<SideBar />
				<div className="min-w-0 flex-1 rounded-2xl border border-border bg-background p-4 sm:p-6">
					<Outlet context={user} />
				</div>
			</div>
		</section>
	)
}

export default SettingsLayout
