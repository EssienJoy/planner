import { Link, Container } from "@/components"
import { ArrowRight } from "lucide-react"

function Hero() {
	return (
		<section
			id="top"
			className="relative isolate flex min-h-150 items-center overflow-hidden border-b border-border md:min-h-162.5">
			<img
				src="/img/hero.jpg"
				alt="A study desk with a planner, notebook, and reminders"
				data-reveal="image"
				className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_58%]"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 -z-10 bg-white/65 dark:bg-black/60"
			/>

			<Container className="py-16 sm:py-20">
				<div className="max-w-3xl">
					<p
						data-reveal
						className="inline-flex items-center gap-2 border-l-4
						 border-primary pl-3 text-xs font-bold uppercase 
						 text-foreground">
						A calmer way to plan
					</p>
					<h1
						data-reveal
						style={{ transitionDelay: "70ms" }}
						className="mt-5 text-5xl font-extrabold text-foreground sm:text-6xl lg:text-7xl">
						Plannerly
					</h1>
					<p
						data-reveal
						style={{ transitionDelay: "140ms" }}
						className="mt-4 max-w-2xl text-2xl font-semibold text-primary sm:text-3xl dark:text-foreground-primary">
						Make room for the work that matters.
					</p>
					<p
						data-reveal
						style={{ transitionDelay: "210ms" }}
						className="mt-5 max-w-xl text-base leading-7 text-foreground sm:text-lg">
						One clear place for your plans, tasks, and next steps.
						Spend less time sorting your day and more time moving it
						forward.
					</p>

					<div
						data-reveal
						style={{ transitionDelay: "280ms" }}
						className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Link to="/signup" size="lg">
							Start planning
							<ArrowRight className="size-4" />
						</Link>
						<a
							href="#how-it-works"
							className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface/90 px-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface">
							See how it works
						</a>
					</div>

					<ul
						data-reveal
						style={{ transitionDelay: "350ms" }}
						className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-xs font-semibold text-foreground-muted">
						<li>Personal plans</li>
						<li>Clear task lists</li>
						<li>Visible progress</li>
					</ul>
				</div>
			</Container>
		</section>
	)
}

export default Hero
