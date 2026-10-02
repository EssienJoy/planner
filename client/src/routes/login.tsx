import { Form, Link, redirect, useNavigation } from "react-router"
import type { Route } from "./+types/login"

import { login } from "@/features/authentication/lib/auth"
import Image from "@/components/ui/Image"
import { Button } from "@/components"

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()

	const user = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	}

	const result = await login(user)
	// console.log("result:", result)
	if (result.status !== "success") {
		return { message: result.message }
	}

	if (!result.setCookie) {
		return {
			message:
				"Login succeeded, but the session cookie was not returned.",
		}
	}

	return redirect("/plan", {
		headers: { "Set-Cookie": result.setCookie },
	})
}

function LoginForm({ actionData }: Route.ComponentProps) {
	// console.log("Action data:", actionData)
	const navigation = useNavigation()

	const isSubmitting = navigation.state === "submitting"

	return (
		<section className="grid min-h-dvh place-items-center bg-background px-4 py-10">
			<div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface shadow-xl lg:grid-cols-2">
				<div className="relative hidden lg:block">
					<img
						src="/img/logo.jpg"
						alt="Plannerly brand"
						className="absolute inset-0 h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
					<div className="absolute bottom-0 p-8">
						<p className="text-2xl font-extrabold tracking-tight text-white">
							Plannerly
						</p>
						<p className="mt-1 text-sm text-white/70">
							Plan the work that matters.
						</p>
					</div>
				</div>

				<div className="p-8 sm:p-10">
				<Image
					src="/img/png/calendar-logo.avif"
					alt="Plannerly logo"
					className="mx-auto h-16 w-16 rounded-2xl object-cover lg:hidden"
				/>

				<h1 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-foreground">
					Welcome back
				</h1>
				<p className="mt-2 text-center text-sm text-foreground-muted">
					Log in to pick up right where you left off.
				</p>

				<Form method="post" className="mt-5 flex flex-col gap-5">
					<div>
						<label
							htmlFor="email"
							className="mb-1.5 block text-sm font-bold text-foreground">
							Email
						</label>
						<input
							id="email"
							className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
							type="email"
							name="email"
							placeholder="you@example.com"
							required
							autoComplete="email"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="mb-1.5 block text-sm font-bold text-foreground">
							Password
						</label>
						<input
							id="password"
							className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
							type="password"
							name="password"
							placeholder="Enter your password"
							required
							autoComplete="current-password"
						/>
					</div>

					<Button
						type="submit"
						size="lg"
						className="mt-2 w-full"
						disabled={isSubmitting}>
						{isSubmitting ? "Logging in..." : "Log in"}
					</Button>
					{actionData?.message && (
						<p
							role="alert"
							className="mt-6 rounded-xl border border-error/30 bg-error-muted px-4 py-3 text-center text-sm font-semibold text-error-foreground">
							{actionData.message}
						</p>
					)}
				</Form>

				<p className="mt-6 text-center text-sm text-foreground-muted">
					<Link
						className="font-semibold text-primary hover:underline"
						to="/reset-password">
						Forgot password?
					</Link>
					<span> · </span>
					<Link
						className="font-semibold text-primary hover:underline"
						to="/signup">
						Create account
					</Link>
				</p>
				</div>
			</div>
		</section>
	)
}

export default LoginForm
