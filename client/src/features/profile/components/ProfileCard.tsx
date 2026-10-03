import { CalendarDays, Mail, Pencil } from "lucide-react"

import { Link } from "@/components"

type ProfileUser = {
	fullName?: string
	email?: string
	photo?: string
	createdAt?: string
}

function formatJoined(value) {
	if (!value) return ""
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return ""
	return date.toLocaleDateString(undefined, {
		month: "long",
		year: "numeric",
	})
}

function ProfileCard({
	user,
	isLoading,
}: {
	user?: ProfileUser | null
	isLoading: boolean
}) {
	if (isLoading) {
		return (
			<div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
				<div className="h-24 animate-pulse bg-surface-muted sm:h-32" />
				<div className="space-y-3 px-6 pb-6 sm:px-8">
					<div className="-mt-10 size-20 animate-pulse rounded-full bg-surface-muted sm:-mt-12 sm:size-24" />
					<div className="h-6 w-48 max-w-full animate-pulse rounded-md bg-surface-muted" />
					<div className="h-4 w-64 max-w-full animate-pulse rounded-md bg-surface-muted" />
				</div>
			</div>
		)
	}

	const joined = formatJoined(user?.createdAt)

	return (
		<section
			className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
			<div className="h-24 bg-linear-to-r from-primary to-accent sm:h-32" />

			<div className="px-4 pb-5 sm:px-8 sm:pb-6">
				<div className="-mt-10 mb-4 size-20 overflow-hidden rounded-full border-4 border-surface bg-primary-subtle sm:-mt-12 sm:size-24">
					<img
						src={user?.photo || "/img/png/default.jpg"}
						alt={`${user?.fullName ?? "User"} profile photo`}
						className="h-full  w-full object-cover"
					/>
				</div>

				<h2
					className="text-xl font-extrabold break-words capitalize tracking-tight text-foreground sm:text-2xl">
					{user?.fullName ?? "Planner"}
				</h2>
				<p className="mt-1.5 flex min-w-0 items-center gap-1.5 break-all text-sm text-foreground-muted">
					<Mail className="size-4 shrink-0" />
					{user?.email}
				</p>
				{joined && (
					<p className="mt-1.5 flex min-w-0 items-center gap-1.5 break-all text-sm text-foreground-muted">
						<CalendarDays className="size-4 shrink-0" />
						Joined {joined}
					</p>
				)}

				<div className="mt-6 flex flex-col gap-3 sm:flex-row">
					<Link to="/settings" variant="outline" size="lg" className="w-full justify-center sm:w-auto">
						<Pencil className="size-4" />
						Edit profile
					</Link>
				</div>
			</div>
		</section>
	)
}

export default ProfileCard
