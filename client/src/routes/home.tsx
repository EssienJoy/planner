import { useEffect, useRef } from "react"
import {
	Benefits,
	CTA,
	Features,
	Footer,
	Header,
	Hero,
	HowItWorks,
	Overview,
	Pricing,
} from "../features/home/components"
import AiChatPopup from "../features/ai/components/AiChatPopup"

function Home() {
	const landingRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const landing = landingRef.current
		if (
			!landing ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			return
		}

		if (!("IntersectionObserver" in window)) return

		landing.classList.add("landing-motion")
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible")
						observer.unobserve(entry.target)
					}
				}
			},
			{ threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
		)

		landing.querySelectorAll("[data-reveal]").forEach((element) => {
			observer.observe(element)
		})

		return () => {
			observer.disconnect()
			landing.classList.remove("landing-motion")
		}
	}, [])

	return (
		<div ref={landingRef}>
			<Header />

			<main>
				<Hero />
				<Overview />
				<Features />
				<HowItWorks />
				<Benefits />
				<Pricing />
				<CTA />
			</main>

			<Footer />
			<AiChatPopup />
		</div>
	)
}

export default Home
