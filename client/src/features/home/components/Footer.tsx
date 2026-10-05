import { Link as NextLink } from "react-router"
import { Container } from "@/components"

const columns = [
	{
		heading: "Explore",
		links: [
			{ to: "/#top", label: "Home" },
			{ to: "/#overview", label: "Overview" },
			{ to: "/#features", label: "Features" },
			{ to: "/#pricing", label: "Pricing" },
			{ to: "/ai-planner", label: "AI Planner" },
		],
	},
	{
		heading: "Account",
		links: [
			{ to: "/login", label: "Login" },
			{ to: "/signup", label: "Get started" },
		],
	},
]
function Footer() {
	return (
		<footer className="border-t border-border bg-surface">
			<Container className="block py-12">
				<div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
					<div>
						<NextLink
							to="/#top"
							className="text-2xl font-bold text-primary">
							Plannerly
						</NextLink>
						<p className="mt-3 max-w-xs text-sm leading-6 text-foreground-muted">
							Plan the work that matters and move with clarity —
							for individuals and small teams.
						</p>
					</div>

					{columns.map((column) => (
						<div key={column.heading}>
							<h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
								{column.heading}
							</h3>
							<ul className="mt-4 space-y-3">
								{column.links.map((link) => (
									<li key={link.to + link.label}>
										<NextLink
											to={link.to}
											className="text-sm text-foreground-muted transition-colors hover:text-primary">
											{link.label}
										</NextLink>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-foreground-muted sm:flex-row">
					<p>
						© {new Date().getFullYear()} Plannerly. All rights
						reserved.
					</p>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
