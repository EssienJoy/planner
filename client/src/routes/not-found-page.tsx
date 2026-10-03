import { useNavigate } from "react-router"
import Container from "../components/Container"
import { Button, Link as UiLink } from "@/components"

function NotFoundPage() {
	const navigate = useNavigate()

	return (
		<section>
			<Container className="grid min-h-dvh place-items-center py-20">
				<div className="text-center">
					<p className="text-xs font-bold uppercase tracking-widest text-primary">
						Error 404
					</p>
					<p className="mt-2 text-7xl font-extrabold tracking-tight text-foreground sm:text-8xl">
						404
					</p>
					<p className="mt-4 text-lg font-bold text-foreground">
						This page does not exist
					</p>
					<p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-foreground-muted">
						The page you&apos;re looking for wandered off.
						Let&apos;s get you back on track.
					</p>
					<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<UiLink to="/" size="lg">
							Go home
						</UiLink>
						<Button
							variant="outline"
							size="lg"
							type="button"
							onClick={() => navigate(-1)}>
							Go back
						</Button>
					</div>
				</div>
			</Container>
		</section>
	)
}

export default NotFoundPage
