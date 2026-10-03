import { Form, Link, useLocation, useNavigation } from "react-router"
import { Collapsible } from "@base-ui/react/collapsible"
import { FiChevronDown, FiLock } from "react-icons/fi"
import { Button } from "@/components"
import { MdAutoDelete, MdManageAccounts } from "react-icons/md"
import { FaUserCog } from "react-icons/fa"

function MobileSideBar({ setIsToggleMenu }) {
	const { pathname } = useLocation()
	const navigation = useNavigation()
	const isPending = navigation.state === "submitting"
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
		<nav
			className="min-w-[200px] px-5 
                              bg-primary rounded-tl-2xl h-full rounded-bl-2xl text-white
                              py-3 sm:hidden absolute top-0 left-0">
			<button
				className="text-xl mb-3 sm:hidden"
				onClick={() => {
					setIsToggleMenu(false)
				}}>
				✖
			</button>
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
									<Collapsible.Trigger className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white">
										<Icon className="text-lg" />
										<span>{s.text}</span>
										<FiChevronDown className="ml-auto" />
									</Collapsible.Trigger>
									<Collapsible.Panel>
										<ul className="ml-5 mt-1 space-y-1 border-l border-white/20 pl-2">
											{s.children.map((c) => {
												const ChildIcon = c.icon
												const active =
													pathname === c.url

												return (
													<li key={c.text}>
														<Link
															to={c.url}
															onClick={() =>
																setIsToggleMenu(
																	false,
																)
															}
															className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
																active
																	? "bg-white/20 text-white"
																	: "text-white/70 hover:bg-white/10 hover:text-white"
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
								onClick={() => setIsToggleMenu(false)}
								className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${
									active
										? "bg-white/20 text-white"
										: "text-white/70 hover:bg-white/10 hover:text-white"
								}`}>
								<Icon className="text-lg" />
								<span>{s.text}</span>
							</Link>
						</li>
					)
				})}
			</ul>
			<Form action="/logout" method="post">
				<Button type="submit">
					{isPending ? "Logging out..." : "Logout"}
				</Button>
			</Form>
		</nav>
	)
}

export default MobileSideBar
