import { useEffect, useState } from "react"
import { Link as NextLink } from "react-router"
import { Menu } from "lucide-react"
import {
	Link,
	Sheet,
	SheetContent,
	SheetTrigger,
	Container,
} from "@/components"
// import { cn } from "@/lib/utils"

const navItems = [
	{ to: "#overview", label: "Overview" },
	{ to: "#features", label: "Features" },
	{ to: "#how-it-works", label: "How it works" },
	{ to: "#pricing", label: "Pricing" },
]

function Header() {
	const [scrolled, setScrolled] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	return (
		<>
			<header
				className={`sticky top-0 z-50 transition-all duration-300 ${
					scrolled
						? " bg-background shadow-sm backdrop-blur-xl"
						: "bg-background"
				}`}>
				<Container className="flex items-center justify-between py-4">
					<NextLink
						to="/#top"
						className="flex items-center 
				text-primary gap-2 text-3xl 
				font-bold">
						{/* <CalendarDays className='size-5 text-primary' aria-hidden /> */}
						Plannerly
					</NextLink>

					<nav className="hidden items-center gap-20 md:flex">
						<ul className="flex font-semibold gap-10">
							{navItems.map((item) => (
								<li key={item.to}>
									<NextLink
										to={item.to}
										className="inline-block text-foreground-muted transition-colors duration-200 hover:text-primary">
										{item.label}
									</NextLink>
								</li>
							))}
						</ul>

						<div className="grid grid-cols-2 gap-3">
							<Link variant="outline" to="/login" size="lg">
								Login
							</Link>
							<Link to="/signup" size="lg">
								Start planning
							</Link>
						</div>
					</nav>

					<div className="flex items-center gap-2 md:hidden">
						<Link to="/signup" size="lg">
							Start free
						</Link>
						<Sheet open={menuOpen} onOpenChange={setMenuOpen}>
							<SheetTrigger
								aria-label="Open menu"
								className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-surface-hover">
								<Menu className="size-5" />
							</SheetTrigger>
							<SheetContent>
								<NextLink
									to="/#top"
									onClick={() => setMenuOpen(false)}
									className="text-2xl font-bold text-primary">
									Plannerly
								</NextLink>
								<nav className="mt-8">
									<ul className="space-y-1">
										{navItems.map((item) => (
											<li key={item.to}>
												<NextLink
													to={item.to}
													onClick={() =>
														setMenuOpen(false)
													}
													className="block rounded-lg px-4 py-3 font-semibold text-foreground transition-colors hover:bg-surface-hover hover:text-primary">
													{item.label}
												</NextLink>
											</li>
										))}
									</ul>
								</nav>
								<div className="mt-auto pt-6">
									<Link
										to="/login"
										variant="outline"
										size="lg"
										className="w-full"
										onClick={() => setMenuOpen(false)}>
										Login
									</Link>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</Container>
			</header>
		</>
	)
}

export default Header
