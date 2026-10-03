import type { Route } from "./+types/signup"
import { Button } from "@/components"
import { Form, Link, redirect, useNavigation } from "react-router"
import { signUp } from "@/features/authentication/lib/auth"
import Image from "@/components/Image"

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()

	const user = {
		fullName: formData.get("fullName"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword"),
	}

	try {
		const result = await signUp(user)
		if (result.status !== "success") return { message: result.message }
		if (!result.setCookie) {
			return {
				message:
					"Account created, but the session cookie was not returned.",
			}
		}

		return redirect("/plan", {
			headers: { "Set-Cookie": result.setCookie },
		})
	} catch (error) {
		return {
			message:
				error instanceof Error
					? error.message
					: "Unable to create account.",
		}
	}
}

function SignUp({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation()

	const isPending = navigation.state === "submitting"

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
							Join 2,000+ planners today.
						</p>
					</div>
				</div>

				<div className="p-8 sm:p-10">
					<Image
						src="/img/png/calendar-logo.avif"
						alt="Plannerly logo"
						className="mx-auto mb-6 h-16 w-16 rounded-2xl object-cover lg:hidden"
					/>
					<h1 className="text-center text-2xl font-extrabold tracking-tight text-foreground">
						Create your account
					</h1>
					<p className="mt-2 text-center text-sm text-foreground-muted">
						Free to start, no card required.
					</p>

					{actionData?.message && (
						<p
							role="alert"
							className="mt-6 rounded-xl border border-error/30 bg-error-muted px-4 py-3 text-center text-sm font-semibold text-error-foreground">
							{actionData.message}
						</p>
					)}

					<Form method="post" className="mt-5 flex flex-col gap-5">
						<div>
							<label
								htmlFor="fullName"
								className="mb-1.5 block text-sm font-bold text-foreground">
								Full name
							</label>
							<input
								id="fullName"
								name="fullName"
								placeholder="Ada Lovelace"
								className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
								type="text"
								required
								autoComplete="name"
							/>
						</div>

						<div>
							<label
								htmlFor="email"
								className="mb-1.5 block text-sm font-bold text-foreground">
								Email
							</label>
							<input
								id="email"
								name="email"
								placeholder="you@example.com"
								className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
								type="email"
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
								name="password"
								placeholder="At least 8 characters"
								className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
								type="password"
								required
								autoComplete="new-password"
							/>
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="mb-1.5 block text-sm font-bold text-foreground">
								Confirm password
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								placeholder="Repeat your password"
								className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
								type="password"
								required
								autoComplete="new-password"
							/>
						</div>

						<Button
							type="submit"
							size="lg"
							className="mt-2 w-full"
							disabled={isPending}>
							{isPending ? "Creating account..." : "Sign up"}
						</Button>
					</Form>

					<p className="mt-6 text-center text-sm text-foreground-muted">
						Already have an account?{" "}
						<Link
							className="font-semibold text-primary hover:underline"
							to="/login">
							Log in
						</Link>
					</p>
				</div>
			</div>
		</section>
	)
}

export default SignUp
