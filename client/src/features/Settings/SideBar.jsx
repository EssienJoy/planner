import { Link, useLocation } from "react-router"
import { Collapsible } from "@base-ui/react/collapsible"
import { FiChevronDown, FiLock } from "react-icons/fi"
import Button from "../../components/ui/AppButton"
import { MdAutoDelete, MdManageAccounts } from "react-icons/md"
import { FaUserCog } from "react-icons/fa"

function SideBar() {
	const { pathname } = useLocation()
	const settingsUrl = [
		{
			text: "Profile",
			url: "/settings",
			icon: MdManageAccounts,
		},
		{
			text: "User Control",
			url: "/settings/user-control",
			icon: MdAutoDelete,
		},
		{
			text: "User Settings",
			icon: FaUserCog,
			children: [
				{
					text: "Update password",
					url: "/settings/password",
					icon: FiLock,
				},
			],
		},
	]

	return (
		<nav className="hidden min-w-[200px] sm:block lg:sticky lg:top-24 lg:self-start">
			<ul className="flex flex-col gap-1">
				{settingsUrl.map((s) => {
					if (s.children) {
						const Icon = s.icon
						const childActive = s.children.some(
							(c) => pathname === c.url,
						)

						return (
							<li key={s.text}>
								<Collapsible.Root defaultOpen={childActive}>
									<Collapsible.Trigger className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground">
										<Icon className="text-lg" />
										<span>{s.text}</span>
										<FiChevronDown className="ml-auto" />
									</Collapsible.Trigger>
									<Collapsible.Panel>
										<ul className="ml-5 mt-1 space-y-1 border-l border-border pl-2">
											{s.children.map((c) => {
												const ChildIcon = c.icon
												const active =
													pathname === c.url

												return (
													<li key={c.text}>
														<Link
															to={c.url}
															className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
																active
																	? "bg-primary-subtle text-primary"
																	: "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
															}`}>
															<ChildIcon className="text-base" />
															<span>
																{c.text}
															</span>
														</Link>
													</li>
												)
											})}
										</ul>
									</Collapsible.Panel>
								</Collapsible.Root>
							</li>
						)
					}

					const Icon = s.icon
					const active = pathname === s.url

					return (
						<li key={s.text}>
							<Link
								to={s.url}
								className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${
									active
										? "bg-primary-subtle text-primary"
										: "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
								}`}>
								<Icon className="text-lg" />
								<span>{s.text}</span>
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}

export default SideBar
