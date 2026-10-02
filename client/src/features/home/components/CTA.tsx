import Container from "../../../components/ui/Container"
import { Link } from "@/components"

function CTA() {
	return (
		<section className="bg-primary py-14 text-white sm:py-16">
			<Container className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
				<div data-reveal className="max-w-2xl">
					<p className="text-xs font-bold uppercase text-white/70">
						Your next step starts here
					</p>
					<h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
						Ready to make a little more room?
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
						Start with one plan. Add the next task when you&apos;re
						ready.
					</p>
				</div>
				<div
					data-reveal
					style={{ transitionDelay: "120ms" }}
					className="flex flex-col gap-3 sm:shrink-0 sm:flex-row">
					<Link
						to="/signup"
						size="lg"
						className="bg-white text-primary hover:bg-white/90">
						Start planning
					</Link>
					<a
						href="#features"
						className="inline-flex h-9 items-center justify-center rounded-md border border-white/40 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10">
						Explore features
					</a>
				</div>
			</Container>
		</section>
	)
}

export default CTA
