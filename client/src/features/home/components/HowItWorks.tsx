import { Container } from "@/components"

const steps = [
	{
		step: "01",
		title: "Create a plan",
		text: "Start with the outcome you want to make progress on.",
	},
	{
		step: "02",
		title: "Add the next steps",
		text: "Write down the tasks and dates that will move it forward.",
	},
	{
		step: "03",
		title: "Mark your progress",
		text: "Complete tasks as you go and see what is left to do.",
	},
]

function HowItWorks() {
	return (
		<section
			id="how-it-works"
			className="scroll-mt-16 border-y border-border bg-surface py-20 sm:py-24">
			<Container className="block">
				<p
					data-reveal
					className="text-xs font-bold uppercase text-primary">
					How it works
				</p>
				<h2
					data-reveal
					style={{ transitionDelay: "80ms" }}
					className="mt-3 max-w-2xl text-3xl font-extrabold text-foreground sm:text-4xl">
					A useful plan starts small.
				</h2>
				<p
					data-reveal
					style={{ transitionDelay: "150ms" }}
					className="mt-3 max-w-xl text-sm leading-6 text-foreground-muted sm:text-base">
					Move from a broad intention to one manageable action at a
					time.
				</p>

				<ol className="mt-10 grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
					{steps.map((item, index) => (
						<li
							key={item.step}
							data-reveal
							style={{ transitionDelay: `${index * 100}ms` }}
							className="py-6 md:px-6 md:py-8 first:md:pl-0 last:md:pr-0">
							<span
								className={`text-sm font-extrabold ${index === 1 ? "text-lime-700" : index === 2 ? "text-amber-700" : "text-primary"}`}>
								{item.step}
							</span>
							<h3 className="mt-5 text-lg font-bold text-foreground">
								{item.title}
							</h3>
							<p className="mt-2 max-w-xs text-sm leading-6 text-foreground-muted">
								{item.text}
							</p>
						</li>
					))}
				</ol>
			</Container>
		</section>
	)
}

export default HowItWorks
