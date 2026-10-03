import {
	CalendarDays,
	CheckCircle2,
	ClipboardList,
	ListTodo,
	Target,
	UserRound,
} from "lucide-react"
import { Container } from "@/components"

const features = [
	{
		icon: ClipboardList,
		title: "Plans with a purpose",
		text: "Keep related work together and make the goal easy to find.",
	},
	{
		icon: ListTodo,
		title: "A task list that stays clear",
		text: "Turn each plan into a manageable set of concrete actions.",
	},
	{
		icon: CalendarDays,
		title: "Dates in view",
		text: "Add due dates so timing is part of the plan, not an afterthought.",
	},
	{
		icon: CheckCircle2,
		title: "Progress you can see",
		text: "Check off finished tasks and keep track of what remains.",
	},
	{
		icon: Target,
		title: "Space to focus",
		text: "Keep your attention on the next useful step.",
	},
	{
		icon: UserRound,
		title: "Your own account",
		text: "Keep your profile and preferences close to your planning flow.",
	},
]

function Features() {
	return (
		<section
			id="features"
			className="scroll-mt-16 border-t border-border bg-background py-20 sm:py-24">
			<Container className="block">
				<p
					data-reveal
					className="text-xs font-bold uppercase text-primary">
					Features
				</p>
				<h2
					data-reveal
					style={{ transitionDelay: "80ms" }}
					className="mt-3 max-w-2xl text-3xl font-extrabold text-foreground sm:text-4xl">
					The pieces of a plan, all in one place.
				</h2>
				<p
					data-reveal
					style={{ transitionDelay: "150ms" }}
					className="mt-3 max-w-xl text-sm leading-6 text-foreground-muted sm:text-base">
					Straightforward tools for turning an intention into a finish
					line.
				</p>

				<div className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<article
							key={feature.title}
							data-reveal
							style={{ transitionDelay: `${index * 65}ms` }}
							className="border-b border-border py-6 sm:px-6 lg:px-7 first:sm:pl-0">
							<span
								className={`grid size-9 place-items-center rounded-md ${index % 3 === 1 ? "bg-lime-100 text-lime-800" : index % 3 === 2 ? "bg-amber-100 text-amber-800" : "bg-primary-subtle text-primary"}`}>
								<feature.icon className="size-4.5" />
							</span>
							<h3 className="mt-4 font-bold text-foreground">
								{feature.title}
							</h3>
							<p className="mt-2 max-w-xs text-sm leading-6 text-foreground-muted">
								{feature.text}
							</p>
						</article>
					))}
				</div>
			</Container>
		</section>
	)
}

export default Features
