import { Check } from "lucide-react"
import Container from "../../../components/ui/Container"

const points = [
	"Keep related tasks together under one plan",
	"Add due dates where timing matters",
	"See completed work at a glance",
	"Return to the next step without rebuilding your list",
]

function Benefits() {
	return (
		<section
			id="about"
			className="scroll-mt-16 border-y border-border bg-lime-50 py-20 sm:py-24">
			<Container className="grid items-center gap-12 lg:grid-cols-2">
				<div data-reveal>
					<p className="text-xs font-bold uppercase text-lime-800">
						A little more headspace
					</p>
					<h2 className="mt-3 max-w-lg text-3xl font-extrabold text-foreground sm:text-4xl">
						Keep the next step closer than the noise.
					</h2>
					<p className="mt-4 max-w-lg text-base leading-7 text-foreground-muted">
						A plan gives your tasks context. A clear list helps you
						spend less energy remembering and more energy moving
						forward.
					</p>

					<ul className="mt-8 space-y-4">
						{points.map((point) => (
							<li key={point} className="flex items-start gap-3">
								<span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-lime-800">
									<Check className="size-3.5" />
								</span>
								<span className="text-sm font-medium text-foreground sm:text-base">
									{point}
								</span>
							</li>
						))}
					</ul>
				</div>

				<div
					data-reveal
					style={{ transitionDelay: "120ms" }}
					className="border-y border-border bg-surface px-5 sm:px-7">
					<div className="flex items-end justify-between gap-4 border-b border-border py-5">
						<div>
							<p className="text-xs font-bold uppercase text-primary">
								In focus
							</p>
							<h3 className="mt-1 text-lg font-bold text-foreground">
								A clear list for today
							</h3>
						</div>
						<span className="text-sm font-semibold text-foreground-muted">
							3 tasks
						</span>
					</div>
					<ul className="divide-y divide-border">
						<li className="flex items-center gap-3 py-4">
							<span className="grid size-5 place-items-center rounded-full bg-success text-white">
								<Check className="size-3.5" />
							</span>
							<span className="text-sm text-foreground-muted line-through">
								Review the project outline
							</span>
						</li>
						<li className="flex items-center gap-3 py-4">
							<span className="size-5 rounded-full border-2 border-primary" />
							<span className="text-sm font-semibold text-foreground">
								Send the first draft
							</span>
							<span className="ml-auto text-xs text-amber-800">
								Today
							</span>
						</li>
						<li className="flex items-center gap-3 py-4">
							<span className="size-5 rounded-full border-2 border-border" />
							<span className="text-sm text-foreground">
								Plan tomorrow&apos;s first step
							</span>
						</li>
					</ul>
				</div>
			</Container>
		</section>
	)
}

export default Benefits
