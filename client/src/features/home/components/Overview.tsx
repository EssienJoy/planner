import { CalendarCheck, Crosshair, TrendingUp } from "lucide-react"
import { Container } from "@/components"

const items = [
	{
		icon: CalendarCheck,
		title: "Name the priority",
		text: "Give the work a home with a plan you can return to.",
	},
	{
		icon: TrendingUp,
		title: "Make it manageable",
		text: "Break the plan into tasks with clear due dates.",
	},
	{
		icon: Crosshair,
		title: "Move it forward",
		text: "Mark progress as you go and keep the next step visible.",
	},
]

function Overview() {
	return (
		<section
			id="overview"
			className="scroll-mt-16 border-b border-border bg-surface py-20 sm:py-24">
			<Container className="block">
				<div
					data-reveal
					className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
					<div>
						<p className="text-xs font-bold uppercase text-primary">
							A simple rhythm
						</p>
						<h2 className="mt-3 max-w-lg text-3xl font-extrabold text-foreground sm:text-4xl">
							From a busy mind to a clear next step.
						</h2>
					</div>
					<p className="max-w-xl text-base leading-7 text-foreground-muted">
						Keep your plans and tasks together. Decide what matters,
						break it into steps, and see your progress without extra
						noise.
					</p>
				</div>

				<div className="mt-10 grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
					{items.map((item, index) => (
						<div
							key={item.title}
							data-reveal
							style={{ transitionDelay: `${index * 90}ms` }}
							className="py-6 md:px-6 md:py-7 first:md:pl-0 last:md:pr-0">
							<div className="flex items-center gap-3">
								<span
									className={`grid size-10 place-items-center rounded-md ${index === 1 ? "bg-lime-100 text-lime-800" : index === 2 ? "bg-amber-100 text-amber-800" : "bg-primary-subtle text-primary"}`}>
									<item.icon className="size-5" />
								</span>
								<span className="text-xs font-bold text-foreground-muted">
									0{index + 1}
								</span>
							</div>
							<h3 className="mt-4 font-bold text-foreground">
								{item.title}
							</h3>
							<p className="mt-2 max-w-xs text-sm leading-6 text-foreground-muted">
								{item.text}
							</p>
						</div>
					))}
				</div>
			</Container>
		</section>
	)
}

export default Overview
