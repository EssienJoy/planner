import { Check } from "lucide-react"
import Container from "../../../components/ui/Container"
import { Link } from "@/components"

const plans = [
	{
		name: "Free",
		price: "$0",
		per: "forever",
		blurb: "A clear starting point for your personal planning.",
		features: [
			"Personal plans",
			"Plan-specific task lists",
			"Task due dates",
			"Completion tracking",
		],
		featured: false,
	},
]

function Pricing() {
	return (
		<section
			id="pricing"
			className="scroll-mt-16 border-t border-border bg-surface py-20 sm:py-24">
			<Container className="block">
				<p
					data-reveal
					className="mx-auto w-fit text-xs font-bold uppercase text-primary">
					A simple start
				</p>
				<h2
					data-reveal
					style={{ transitionDelay: "80ms" }}
					className="mt-4 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
					Make a little room for what matters.
				</h2>
				<p
					data-reveal
					style={{ transitionDelay: "150ms" }}
					className="mx-auto mt-3 max-w-xl text-center text-sm text-foreground-muted sm:text-base">
					Start with the tools available today. No plan tiers or
					upgrade decisions to slow you down.
				</p>

				<div
					data-reveal
					style={{ transitionDelay: "220ms" }}
					className="mx-auto mt-10 grid max-w-xl gap-6">
					{plans.slice(0, 1).map((plan) => (
						<div
							key={plan.name}
							className={
								plan.featured
									? "rounded-lg bg-primary p-8 text-white shadow-lg shadow-primary/20"
									: "rounded-lg border border-border bg-background p-8 shadow-sm"
							}>
							<div className="flex items-center justify-between">
								<h3
									className={`font-extrabold ${
										plan.featured
											? "text-white"
											: "text-foreground"
									}`}>
									{plan.name}
								</h3>
								{plan.featured && (
									<span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-primary">
										Most popular
									</span>
								)}
							</div>
							<p
								className={`mt-4 flex items-baseline gap-1 ${
									plan.featured
										? "text-white"
										: "text-foreground"
								}`}>
								<span className="text-4xl font-extrabold">
									{plan.price}
								</span>
								<span
									className={`text-sm ${
										plan.featured
											? "text-white/70"
											: "text-foreground-muted"
									}`}>
									{plan.per}
								</span>
							</p>
							<p
								className={`mt-2 text-sm ${
									plan.featured
										? "text-white/70"
										: "text-foreground-muted"
								}`}>
								{plan.blurb}
							</p>

							<ul className="mt-6 space-y-3">
								{plan.features.map((feature) => (
									<li
										key={feature}
										className="flex items-start gap-2.5 text-sm">
										<Check
											className={`mt-0.5 size-4 shrink-0 ${
												plan.featured
													? "text-white/80"
													: "text-primary"
											}`}
										/>
										<span
											className={
												plan.featured
													? "text-white"
													: "text-foreground"
											}>
											{feature}
										</span>
									</li>
								))}
							</ul>

							{plan.featured ? (
								<Link
									to="/signup"
									size="lg"
									className="mt-8 w-full bg-white text-primary hover:bg-white/90">
									Choose {plan.name}
								</Link>
							) : (
								<Link
									to="/signup"
									variant="outline"
									size="lg"
									className="mt-8 w-full">
									Choose {plan.name}
								</Link>
							)}
						</div>
					))}
				</div>
			</Container>
		</section>
	)
}

export default Pricing
